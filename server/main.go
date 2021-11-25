package main

import (
	"github.com/kevkanae/e-com-use-kart/server/routes"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func main() {
	//Database
	utils.ConnectToMongoDB()

	//Gin Server
	server := routes.SetupRouter()
	server.Run()
}
