package controllers

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/structs"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type getCartProduct struct {
	models.Product
	Quantity int
}

func GetCart(c *gin.Context) {
	var ctx context.Context

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
		c.JSON(200, gin.H{
			"Status":  "Error",
			"Message": "User Has No Cart",
		})
	}

	// Retrieve Cart Data
	var product structs.Cart
	cartColl := services.Client.Database("ecom").Collection("cart")
	productFindErr := cartColl.FindOne(context.TODO(), bson.M{"user": userEmail}).Decode(&product)

	// No Product in User Cart
	if productFindErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(findErr, "No Product in User Cart"))
		c.JSON(200, gin.H{
			"Status":  "Error",
			"Message": "No Product in User Cart",
		})
	}

	// Beautify and Map Cart Data
	var data []getCartProduct
	for i := 0; i < len(product.ProductCart); i++ {

		// Convert id to _id
		objectId, convertError := primitive.ObjectIDFromHex(product.ProductCart[i].ProductId)
		if convertError != nil {
			fmt.Println(utils.Wrap(convertError, "Couldnt Convert to Object ID"))
		}

		//Retrieve Product Data
		var result models.Product
		col := services.Client.Database("ecom").Collection("items")
		findErr2 := col.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)
		if findErr2 == mongo.ErrNoDocuments {
			fmt.Println(utils.Wrap(findErr2, "Couldn't Fetch Document"))
			c.JSON(500, gin.H{
				"Status":  "Server Error",
				"Message": "Couldn't Fetch Product",
			})
		}

		// Add QTY Field
		temp := getCartProduct{
			result,
			product.ProductCart[i].Count,
		}
		data = append(data, temp)
	}

	c.JSON(200, gin.H{
		"Status": "Cart Retrieved",
		"Data":   data,
	})

	//Close Connection to DB
	defer func(Client *mongo.Client, ctx context.Context) {
		err := Client.Disconnect(ctx)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
		}
	}(services.Client, ctx)
}
