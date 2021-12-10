package main

import (
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/routes"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func main() {
	//Database
	utils.ConnectToMongoDB()

	//Gin Server
	server := routes.SetupRouter()
	server.Use(gin.Logger())
	server.Use(gin.Recovery())
	server.Run()
}
