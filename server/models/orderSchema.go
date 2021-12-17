package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID            primitive.ObjectID `bson:"_id"`
	User          string
	OrderItems    []OrderItems
	PaymentMethod string
	PaymentResult struct {
		ID           primitive.ObjectID `bson:"_id"`
		Status       string
		EmailAddress string
	}
	ItemPrice     int
	ShippingPrice int
	TaxPrice      int
	TotalPrice    int
	IsPaid        bool
	IsDelivered   bool
	PaidAt        time.Time
	DeliveredAt   time.Time
	TimeStamp     primitive.Timestamp
}
