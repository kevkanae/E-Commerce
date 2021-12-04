package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID            primitive.ObjectID `bson:"_id"`
	Name          string
	Slug          string
	Image         string
	Price         int
	Brand         string
	Rating        int
	NumReviews    int
	CountInStock  int
	Description   string
	Reviews       []Reviews
	FeaturedImage string
	IsFeatured    bool
	TimeStamp     primitive.Timestamp
}
