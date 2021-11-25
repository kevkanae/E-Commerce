package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	Name          string             `bson:"name,omitempty"`
	Slug          string             `bson:"slug,omitempty"`
	Image         string             `bson:"image,omitempty"`
	Price         int                `bson:"price,omitempty"`
	Brand         string             `bson:"brand,omitempty"`
	Rating        int                `bson:"rating,omitempty"`
	NumReviews    int                `bson:"numReviews,omitempty"`
	CountInStock  int                `bson:"countInStock,omitempty"`
	Description   string             `bson:"description,omitempty"`
	Reviews       []Reviews          `bson:"reviews,omitempty"`
	FeaturedImage string             `bson:"featuredImage,omitempty"`
	IsFeatured    bool               `bson:"isFeatured,omitempty"`
	TimeStamp     primitive.DateTime `bson:"timeStamp,omitempty"`
}
