package controllers

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/helpers"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/structs"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

func RemoveProduct(c *gin.Context) {
	var requestBody structs.DeleteProductFromCartReqBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(utils.Wrap(err, "Request Body Read Error"))
	}

	//Get User Email
	claims := utils.GetClaims(c)
	userEmail := claims["email"].(string)

	//Connect to DB
	services.ConnectToMongoDB()

	//Check if product exists
	helpers.DoesProductExist(c, requestBody.ProductId, userEmail)

	//Close Connection to DB
	var ctx context.Context
	defer func(Client *mongo.Client, ctx context.Context) {
		err := Client.Disconnect(ctx)
		if err != nil {
			fmt.Println(utils.Wrap(err, "Mongo Client Disconnect Error"))
		}
	}(services.Client, ctx)
}
