package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/routes"
	"github.com/kevkanae/e-com-use-kart/server/services"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func main() {

	_, envExists := os.LookupEnv("APP_ENV")

	if !envExists {
		os.Setenv("APP_ENV", "DEV")
		os.Setenv("KONNICHIWA", "KamiWaJinseiDes")
		os.Setenv("MONGOURI", "mongodb+srv://kevkanae:crysis123@cluster0.etamm.mongodb.net/ecom?retryWrites=true&w=majority")
	}

	//Database
	services.ConnectToMongoDB()

	//Gin Server
	server := routes.SetupRouter()

	if os.Getenv("APP_ENV") == "DEV" {
		err := server.Run(":8080")
		if err != nil {
			fmt.Println(utils.Wrap(err, "Couldn't Start Gin Server in DEV"))
			return
		}
	} else {
		gin.SetMode(gin.ReleaseMode)
		err := server.Run()
		if err != nil {
			fmt.Println(utils.Wrap(err, "Couldn't Start Gin Server in PROD"))
			return
		}
	}
}
