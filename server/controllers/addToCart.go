package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Product struct {
	ProductId string
	Timestamp int64
	Count     int
}
type Cart struct {
	User        string
	ProductCart []Product
}

func (cartArray *Cart) AddItem(item Product) {
	cartArray.ProductCart = append(cartArray.ProductCart, item)
}

type requestBody struct {
	ProductId string `json:"productId"`
	Timestamp string
}

func AddToCart(c *gin.Context) {
	var requestBody requestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(utils.Wrap(err, "RequestBody Read Error"))
	}

	//Get User Email
	cookie, cookieErr := c.Cookie("Eat_My_Cookie")
	if cookieErr != nil {
		fmt.Println(utils.Wrap(cookieErr, "Couldn't Find Cookie"))
		c.JSON(http.StatusUnauthorized, gin.H{
			"Status":  "Unauthorized",
			"Message": "Couldnt Find Cookie",
		})
	}
	claims := utils.GetClaims(cookie)
	userEmail := claims["email"].(string)

	//Connect to DB
	services.ConnectToMongoDB()

	// Check if User has a cart
	var result Cart
	itemColl := services.Client.Database("ecom").Collection("cart")
	findErr := itemColl.FindOne(context.TODO(), bson.M{"user": userEmail}).Decode(&result)

	//If User doesnt have a cart
	if findErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(findErr, "Couldnt Find User's Cart"))

		// Create Product
		productModel := &Product{
			ProductId: requestBody.ProductId,
			Timestamp: time.Now().Unix(),
			Count:     1,
		}
		// Create Cart
		cartModel := &Cart{
			User: userEmail,
		}
		cartModel.AddItem(*productModel)

		// Create Cart for User
		cartColl := services.Client.Database("ecom").Collection("cart")
		_, err := cartColl.InsertOne(context.TODO(), cartModel)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Insert to DB Failed"))
			c.JSON(500, gin.H{
				"Status": "Insert to DB Failed",
			})
		} else {
			c.JSON(200, gin.H{
				"Status":  "Success",
				"Message": "Added to Cart",
			})
		}
	} else {
		fmt.Println(utils.Wrap(findErr, "User Cart Found"))
		//User already has a cart
		//Check if product is already present
		var result2 Product
		cartColl := services.Client.Database("ecom").Collection("cart")
		productFindErr := cartColl.FindOne(context.TODO(), bson.M{"user": userEmail, "productcart.productid": requestBody.ProductId}).Decode(&result2)

		//If product isnt present
		if productFindErr == mongo.ErrNoDocuments {
			//Update User Cart with new Product
			fmt.Println(utils.Wrap(findErr, "Adding Product to Cart"))
			filter := bson.M{"user": userEmail}

			// Create Product
			productModel := &Product{
				ProductId: requestBody.ProductId,
				Timestamp: time.Now().Unix(),
				Count:     1,
			}
			update := bson.M{
				"$push": bson.M{
					"productcart": productModel,
				},
			}
			_, err := cartColl.UpdateOne(context.TODO(), filter, update)
			if err != nil {
				fmt.Println(utils.Wrap(err, "Update to DB Failed"))
				c.JSON(200, gin.H{
					"Status": "Update to DB Failed",
				})
			} else {
				c.JSON(200, gin.H{
					"Status":  "Success",
					"Message": "Product Added to User Cart",
				})
			}

		} else {
			// Increment quantity count of product
			fmt.Println(utils.Wrap(findErr, "Incrementing Product QTY"))
			matchUser := bson.D{{
				Key: "$match", Value: bson.D{{
					Key: "user", Value: userEmail,
				}},
			}}
			matchProductID := bson.D{{
				Key: "$match", Value: bson.D{{
					Key: "productcart.productid", Value: requestBody.ProductId,
				}},
			}}
			splitObjects := bson.D{{
				Key: "$unwind", Value: "$productcart",
			}}

			showSpecificProduct, err := cartColl.Aggregate(context.TODO(),
				mongo.Pipeline{matchUser, splitObjects, matchProductID})
			if err != nil {
				panic(err)
			}
			type AggregationResult struct {
				ID          primitive.ObjectID `bson:"_id"`
				User        string             `bson:"user"`
				ProductCart Product            `bson:"productcart"`
			}
			var aggregationResult []AggregationResult
			if err = showSpecificProduct.All(context.TODO(), &aggregationResult); err != nil {
				panic(err)
			}
			newQTYCount := aggregationResult[0].ProductCart.Count + 1

			filter := bson.M{"user": userEmail, "productcart.productid": requestBody.ProductId}
			update := bson.M{
				"$set": bson.M{
					"productcart.$.count": newQTYCount,
				},
			}
			_, incrementErr := cartColl.UpdateOne(context.TODO(), filter, update)
			if incrementErr != nil {
				fmt.Println(utils.Wrap(incrementErr, "QTY Increment Failed"))
				c.JSON(200, gin.H{
					"Status": "QTY Increment Failed",
				})
			} else {
				c.JSON(200, gin.H{
					"Status":  "Success",
					"Message": "QTY Incremented",
				})
			}
		}
	}
}
