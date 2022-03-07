package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var Client *mongo.Client

func ConnectToMongoDB() {
	//Connect to MongoClient
	var err error
	Client, err = mongo.NewClient(options.Client().ApplyURI(ENV("MONGOURI")))
	if err != nil {
		fmt.Println("Error Connecting to MongoClient", err)
		log.Fatal(err)
	}

	//Timeout duration that we want to use when trying to connect
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	err = Client.Connect(ctx)
	if err != nil {
		fmt.Println("Error Connecting to DB", err)
		log.Fatal(err)
	}

	defer cancel()

	//Check if your're really connected
	err = Client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Println("Error Connecting to Client", err)
		log.Fatal(err)
	}
}
