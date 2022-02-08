package controllers

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetSingleProduct(c *gin.Context) {
	var ctx context.Context

	var id = c.Param("productid")
	objectId, error := primitive.ObjectIDFromHex(id)
	if error != nil {
		fmt.Println(utils.Wrap(error, "Couldnt Convert to Object ID"))
	}

	//Connect to DB
	services.ConnectToMongoDB()

	//Retrieve Product Data
	var result models.Product
	col := services.Client.Database("ecom").Collection("items")
	findErr := col.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)
	if findErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(findErr, "Couldn't Fetch Document"))
		c.JSON(500, gin.H{
			"Status":  "Server Error",
			"Message": "Couldn't Fetch Product",
		})
	}

	c.JSON(200, gin.H{
		"Status":  "Procuct Retrieved",
		"Product": result,
	})

	//Close Connection to DB
	defer func(Client *mongo.Client, ctx context.Context) {
		err := Client.Disconnect(ctx)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
		}
	}(services.Client, ctx)
}
