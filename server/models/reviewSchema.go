package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Reviews struct {
	ID        primitive.ObjectID `bson:"_id"`
	User      string
	Name      string
	Rating    int
	Comment   string
	TimeStamp primitive.Timestamp
}
