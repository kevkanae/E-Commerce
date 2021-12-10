package main

import (
	"fmt"
	"github.com/kevkanae/e-com-use-kart/server/routes"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func main() {
	//Database
	utils.ConnectToMongoDB()

	//Gin Server
	server := routes.SetupRouter()
	err := server.Run()
	if err != nil {
		fmt.Println(utils.Wrap(err, "Couldn't Start Gin Server"))
		return
	}
}
