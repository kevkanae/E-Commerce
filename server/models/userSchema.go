package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Name      string
	Email     string
	Password  string
	Username  string
	TimeStamp primitive.Timestamp
}
