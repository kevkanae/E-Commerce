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
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(utils.Wrap(err, "Error in Request Body"))
	}
	fmt.Println(req.Arr)
	//Connect to DB
	utils.ConnectToMongoDB()
	//col, err := utils.Client.Database("ecom").Collection("cart").Find(context.TODO(), bson.D{})
	//if err != nil {
	//	fmt.Println(utils.Wrap(err, "DB Fetch Error"))
	//}
	c.JSON(200, gin.H{
		"Status": "SSUP BITCH",
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
