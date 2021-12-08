package controllers

import (
	"context"
	"fmt"

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
	utils.ConnectToMongoDB()
	coll := utils.Client.Database("ecom").Collection("users")
	var result models.User
	err := coll.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)
	if err != nil {
		fmt.Println("User Not Found")
		c.JSON(200, gin.H{
			"Status": "User Not Found",
		})
	}
	hashErr := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
	if hashErr != nil {
		fmt.Println("Password Incorrect")
		c.JSON(200, gin.H{
			"Status": "Password Incorrect",
		})
	} else {
		token, _ := utils.GenerateJWT(email)
		c.JSON(200, gin.H{
			"Status": "Login Success",
			"Token":  token,
		})
	}

	//Close Connection to DB
	var ctx context.Context
	defer utils.Client.Disconnect(ctx)
}
