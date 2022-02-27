package controllers

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

type updateCartRequestBody struct {
	ProductId string `json:"id"`
	Update    string   `json:"update"`
}

func getCartDetails(c *gin.Context, req updateCartRequestBody, userEmail string) {


	var result cartProduct
	cartColl := services.Client.Database("ecom").Collection("cart")
	productFindErr := cartColl.FindOne(context.TODO(), bson.M{"user": userEmail, "productcart.productid": req.ProductId}).Decode(&result)
	if productFindErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(productFindErr, "Product Not in Cart"))
		c.JSON(200, gin.H{
			"Status":  "Success",
			"Message": "Product Doesnt Exist in Cart",
		})
	}
}

func updateValue(c *gin.Context,userEmail string , req updateCartRequestBody,updateType string){
	matchUser := bson.D{{
		Key: "$match", Value: bson.D{{
			Key: "user", Value: userEmail,
		}},
	}}
	matchProductID := bson.D{{
		Key: "$match", Value: bson.D{{
			Key: "productcart.productid", Value: req.ProductId,
		}},
	}}
	splitObjects := bson.D{{
		Key: "$unwind", Value: "$productcart",
	}}

	cartColl := services.Client.Database("ecom").Collection("cart")
	showSpecificProduct, err := cartColl.Aggregate(context.TODO(),
		mongo.Pipeline{matchUser, splitObjects, matchProductID})
	if err != nil {
		panic(err)
	}
	type AggregationResult struct {
		ID          primitive.ObjectID `bson:"_id"`
		User        string             `bson:"user"`
		ProductCart cartProduct        `bson:"productcart"`
	}
	var aggregationResult []AggregationResult
	if err = showSpecificProduct.All(context.TODO(), &aggregationResult); err != nil {
		panic(err)
	}

	// Update Value
	var newQTYCount int
	if updateType == "Increment" {
		newQTYCount = aggregationResult[0].ProductCart.Count + 1
	} else {
		newQTYCount = aggregationResult[0].ProductCart.Count - 1
	}

	filter := bson.M{"user": userEmail, "productcart.productid": req.ProductId}
	update := bson.M{
		"$set": bson.M{
			"productcart.$.count": newQTYCount,
		},
	}
	_, incrementErr := cartColl.UpdateOne(context.TODO(), filter, update)
	if incrementErr != nil {
		fmt.Println(utils.Wrap(incrementErr, "QTY Increment Failed"))
		c.JSON(200, gin.H{
			"Status": "QTY "+updateType+" Failed",
		})
	} else {
		c.JSON(200, gin.H{
			"Status":  "Success",
			"Message": "QTY "+updateType+" Success",
		})
	}
}

func UpdateCart(c *gin.Context) {

	var requestBody updateCartRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(utils.Wrap(err, "Request Body Read Error"))
	}

	//Get User Email
	claims := utils.GetClaims(c)
	userEmail := claims["email"].(string)

	//Connect to DB
	services.ConnectToMongoDB()

	//Check if product exists
	getCartDetails(c,requestBody,userEmail)

	if requestBody.Update == "inc" {
		//Increment Quantity
		updateValue(c,userEmail,requestBody,"Increment")
	} else {
		//Decrement Quantity
		updateValue(c,userEmail,requestBody,"Decrement")
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
