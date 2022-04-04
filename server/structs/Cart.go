package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

type AddCartReqBody struct {
	ProductId string `json:"productId"`
	Quantity  string `json:"quantity"`
	Timestamp int    `json:"timeStamp"`
}

type UpdateCartReqBody struct {
	ProductId string `json:"id"`
	Update    string `json:"update"`
}

type DeleteProductFromCartReqBody struct {
	ProductId string `json:"id"`
}

type CartDB struct {
	ProductId string
	Timestamp int64
	Count     int
}

type Cart struct {
	User        string
	ProductCart []CartDB
}

func (cartArray *Cart) AddItem(item CartDB) {
	cartArray.ProductCart = append(cartArray.ProductCart, item)
}

type AggregationResult struct {
	ID          primitive.ObjectID `bson:"_id"`
	User        string             `bson:"user"`
	ProductCart CartDB             `bson:"productcart"`
}
