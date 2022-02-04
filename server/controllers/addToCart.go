package controllers

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SaveToCart struct {
	ProductId string `json:"productId"`
	Timestamp string
	Count     int
}

func AddToCart(c *gin.Context) {
	var requestBody SaveToCart

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(utils.Wrap(err, "RequestBody Read Error"))
	}

	//Connect to DB
	utils.ConnectToMongoDB()

	// Check if Product is already present
	var result SaveToCart
	itemColl := utils.Client.Database("ecom").Collection("cart")
	findErr := itemColl.FindOne(context.TODO(), bson.M{"productid": requestBody.ProductId}).Decode(&result)

	//If Product isnt in the cart
	if findErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(findErr, "Couldnt Find Product"))

		//Save Object ID to Cart
		cartModel := SaveToCart{
			ProductId: requestBody.ProductId,
			Timestamp: requestBody.Timestamp,
			Count:     1,
		}
		cartColl := utils.Client.Database("ecom").Collection("cart")
		_, err := cartColl.InsertOne(context.TODO(), cartModel)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Insert to DB Failed"))
			c.JSON(200, gin.H{
				"Status": "Insert to DB Failed",
			})
		}

	} else {
		//Product is present
		cartColl := utils.Client.Database("ecom").Collection("cart")
		filter := bson.M{"productid": requestBody.ProductId}
		update := bson.M{
			"$set": bson.M{
				"count": result.Count + 1,
			},
		}
		_, err := cartColl.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Update to DB Failed"))
			c.JSON(200, gin.H{
				"Status": "Update to DB Failed",
			})
		}
	}
	c.JSON(200, gin.H{
		"Status": "Success",
	})

}
