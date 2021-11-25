package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Reviews struct {
	User      string             `bson:"user,omitempty"`
	Name      string             `bson:"name,omitempty"`
	Rating    int                `bson:"rating,omitempty"`
	Comment   string             `bson:"comment,omitempty"`
	TimeStamp primitive.DateTime `bson:"timeStamp,omitempty"`
}
