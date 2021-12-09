package controllers

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
)

func GetProducts(c *gin.Context) {
	var ctx context.Context

	//Connect to DB
	utils.ConnectToMongoDB()
	var res models.Product
	col, err := utils.Client.Database("ecom").Collection("items").Find(context.TODO(), bson.D{})
	if err != nil {
		fmt.Println("DB Fetch Error")
	}

	//Parse Result
	var data []models.Product
	for col.Next(ctx) {
		err := col.Decode(&res)
		if err != nil {
			fmt.Println("Cant Parse Result", err)
		}
		data = append(data, res)

	}
	c.JSON(200, data)
	//Close Connection to DB
	defer utils.Client.Disconnect(ctx)
}
