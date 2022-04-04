package helpers

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/structs"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SelectParticularproductFromCart(userEmail string, id string) []structs.AggregationResult {
	matchUser := bson.D{{
		Key: "$match", Value: bson.D{{
			Key: "user", Value: userEmail,
		}},
	}}
	matchProductID := bson.D{{
		Key: "$match", Value: bson.D{{
			Key: "productcart.productid", Value: id,
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

	var aggregationResult []structs.AggregationResult
	if err = showSpecificProduct.All(context.TODO(), &aggregationResult); err != nil {
		panic(err)
	}
	return aggregationResult
}

func UpdateValue(c *gin.Context, userEmail string, id string, updateType string) {
	fmt.Println("Updating Product QTY")
	aggRes := SelectParticularproductFromCart(userEmail, id)

	// Update Value
	var newQTYCount int
	if updateType == "Increment" {
		newQTYCount = aggRes[0].ProductCart.Count + 1
	} else {
		newQTYCount = aggRes[0].ProductCart.Count - 1
	}

	filter := bson.M{"user": userEmail, "productcart.productid": id}
	update := bson.M{
		"$set": bson.M{
			"productcart.$.count": newQTYCount,
		},
	}
	fmt.Println("Updating DB")
	cartColl := services.Client.Database("ecom").Collection("cart")
	_, incrementErr := cartColl.UpdateOne(context.TODO(), filter, update)
	if incrementErr != nil {
		fmt.Println(utils.Wrap(incrementErr, "QTY Update Failed"))
		c.JSON(200, gin.H{
			"Status": "QTY " + updateType + " Failed",
		})
	}
	c.JSON(200, gin.H{
		"Status":  "Success",
		"Message": "QTY " + updateType + " Success",
	})

}
