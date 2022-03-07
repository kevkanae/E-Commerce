package controllers

import (
	"context"
	"fmt"
	"github.com/kevkanae/e-com-use-kart/server/helpers"
	"github.com/kevkanae/e-com-use-kart/server/structs"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddToCart(c *gin.Context) {
	var requestBody structs.AddCartReqBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(utils.Wrap(err, "RequestBody Read Error"))
	}

	//Get User Email
	claims := utils.GetClaims(c)
	userEmail := claims["email"].(string)

	//Connect to DB
	services.ConnectToMongoDB()

	// Check if User has a cart
	var result structs.Cart
	itemColl := services.Client.Database("ecom").Collection("cart")
	findErr := itemColl.FindOne(context.TODO(), bson.M{"user": userEmail}).Decode(&result)

	//If User doesnt have a cart
	if findErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(findErr, "Couldnt Find User's Cart"))

		// Create Product
		productModel := &structs.CartDB{
			ProductId: requestBody.ProductId,
			Timestamp: time.Now().Unix(),
			Count:     1,
		}
		// Create Cart
		cartModel := &structs.Cart{
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
		var result2 structs.CartDB
		cartColl := services.Client.Database("ecom").Collection("cart")
		productFindErr := cartColl.FindOne(context.TODO(), bson.M{"user": userEmail, "productcart.productid": requestBody.ProductId}).Decode(&result2)

		//If product isnt present
		if productFindErr == mongo.ErrNoDocuments {
			//Update User Cart with new Product
			fmt.Println(utils.Wrap(findErr, "Adding Product to Cart"))
			filter := bson.M{"user": userEmail}

			// Create Product
			productModel := &structs.CartDB{
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
			helpers.UpdateValue(c, userEmail, requestBody.ProductId, "Increment")

		}

		//Close Connection to DB
		var ctx context.Context
		defer func(Client *mongo.Client, ctx context.Context) {
			err := Client.Disconnect(ctx)
			if err != nil {
				fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
			}
		}(services.Client, ctx)
	}
}
