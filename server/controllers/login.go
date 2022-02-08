package controllers

import (
	"context"
	"fmt"

	"github.com/kevkanae/e-com-use-kart/server/services"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")

	//DB Access
	services.ConnectToMongoDB()
	coll := services.Client.Database("ecom").Collection("users")
	var result models.User
	err := coll.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)
	if err != nil {
		fmt.Println(utils.Wrap(err, "User Doesn't Exist"))
		c.JSON(200, gin.H{
			"Status": "User Doesn't Exist",
		})
	} else {
		hashErr := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
		if hashErr != nil {
			fmt.Println(utils.Wrap(hashErr, "Password Incorrect"))
			c.JSON(200, gin.H{
				"Status": "Password Incorrect",
			})
		} else {
			token, _ := services.GenerateJWT(email)
			services.CookieSet(c, token)
			c.JSON(200, gin.H{
				"Status":   "Login Success",
				"Username": result.Username,
			})
		}
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
