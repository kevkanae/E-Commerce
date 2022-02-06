package controllers

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCart(c *gin.Context) {
	var ctx context.Context

	//Connect to DB
	utils.ConnectToMongoDB()
	var res models.Product
	col, err := utils.Client.Database("ecom").Collection("cart").Find(context.TODO(), bson.D{})
	if err != nil {
		fmt.Println(utils.Wrap(err, "DB Fetch Error"))
	}

	//Parse Result
	var data []models.Product
	for col.Next(ctx) {
		err := col.Decode(&res)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Cant Parse Result"))
		}
		data = append(data, res)
	}

	//Send Response
	c.JSON(200, data)

	//Close Connection to DB
	defer func(Client *mongo.Client, ctx context.Context) {
		err := Client.Disconnect(ctx)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
		}
	}(utils.Client, ctx)
}
