package controllers

import (
	"context"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/models"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func Register(c *gin.Context) {
	name := c.PostForm("name")
	email := c.PostForm("email")
	username := c.PostForm("username")
	password := c.PostForm("password")

	//DB Access
	utils.ConnectToMongoDB()
	coll := utils.Client.Database("ecom").Collection("users")
	var result models.User
	err := coll.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)

	if err == mongo.ErrNoDocuments {
		fmt.Println("User Doesn't Exist")

		hashedPass, hashError := utils.Hash([]byte(password))
		if hashError != nil {
			fmt.Println("Couldn't Hash Password")
		}
		createUser(&name, &email, &username, string(hashedPass), coll, c)
	} else {
		fmt.Println("User Already Exists")
		c.JSON(200, gin.H{
			"Status": "User Exists",
		})
	}

	//Close Connection to DB
	var ctx context.Context
	defer utils.Client.Disconnect(ctx)
}

func createUser(newName *string, newEmail *string, newUserID *string, newPassword string, collection *mongo.Collection, c *gin.Context) {
	userModel := models.User{
		Name:      *newName,
		Email:     *newEmail,
		Password:  newPassword,
		Username:  *newUserID,
		TimeStamp: primitive.Timestamp{T: uint32(time.Now().Unix())},
	}
	_, err := collection.InsertOne(context.TODO(), userModel)
	if err != nil {
		fmt.Println("Insert Error")
		c.JSON(200, gin.H{
			"Status": "Insert to DB Failed",
		})
	} else {
		fmt.Println("Insert Success")
		token, _ := utils.GenerateJWT(*newEmail)
		c.JSON(200, gin.H{
			"Message":  "New User Created",
			"Status":   "Sign Up Successful",
			"Token":    token,
			"Username": *newUserID,
		})
	}
}
