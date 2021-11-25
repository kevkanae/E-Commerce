package utils

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func ConnectToMongoDB() {
	//.env Variable
	MongoURI := "mongodb+srv://kevkanae:crysis123@cluster0.etamm.mongodb.net/ecom?retryWrites=true&w=majority"

	//Connect to MongoClient
	client, err := mongo.NewClient(options.Client().ApplyURI(MongoURI))
	if err != nil {
		fmt.Println("Error Connecting to MongoClient", err)
		log.Fatal(err)
	}

	//Timeout duration that we want to use when trying to connect
	ctx, cancel := context.WithTimeout(context.Background(), 14*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		fmt.Println("Error Connecting to DB", err)
		log.Fatal(err)
	}

	//keep the connection to the DB open until we're done
	defer client.Disconnect(ctx)
	defer cancel()

	//Check if your're really connected
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Println("Error Connecting to Client", err)
		log.Fatal(err)
	}

	//return a list of DB's
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		fmt.Println("Error Finding DB's", err)
		log.Fatal(err)
	}
	fmt.Println(databases)
}
