package controllers

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

type RequestBody struct {
	Arr []string
}

func AddToCart(c *gin.Context) {
	var req RequestBody
	type ObjectID struct {
		ID string
	}
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(utils.Wrap(err, "Error in Request Body"))
	}
	fmt.Println(req.Arr)
	//Connect to DB
	utils.ConnectToMongoDB()

	for i := 0; i < len(req.Arr); i++ {
		oneDoc := ObjectID{
			ID: req.Arr[i],
		}
		_, addErr := utils.Client.Database("ecom").Collection("cart").InsertOne(context.TODO(), oneDoc)
		if addErr != nil {
			fmt.Println(utils.Wrap(addErr, "Insert to DB Failed"))
			return
		}

	}

	c.JSON(200, gin.H{
		"Status": "Success",
	})

	//Close Connection to DB
	var ctx context.Context
	defer func(Client *mongo.Client, ctx context.Context) {
		err := Client.Disconnect(ctx)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
		}
	}(utils.Client, ctx)
}
