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

func DoesProductExist(c *gin.Context, id string, userEmail string) {

	var result structs.CartDB
	cartColl := services.Client.Database("ecom").Collection("cart")
	productFindErr := cartColl.FindOne(context.TODO(), bson.M{"user": userEmail, "productcart.productid": id}).Decode(&result)
	if productFindErr == mongo.ErrNoDocuments {
		fmt.Println(utils.Wrap(productFindErr, "Product Not in Cart"))
		c.JSON(200, gin.H{
			"Status":  "Success",
			"Message": "Product Doesnt Exist in Cart",
		})
	}
}
