package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID            primitive.ObjectID `bson:"_id"`
	Name          string
	Slug          string
	Category      string
	Image         string
	Price         float64
	Brand         string
	Rating        float64
	NumReviews    int
	CountInStock  int
	Description   string
	Reviews       []Reviews
	FeaturedImage string
	IsFeatured    bool
	TimeStamp     primitive.Timestamp
}
