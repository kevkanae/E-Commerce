package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/controllers"
)

func SetupRouter() *gin.Engine {
	server := gin.Default()

	//CORS
	config := cors.DefaultConfig()
	config.AllowHeaders = []string{"Authorization", "Origin", "X-Requested-With", "Content-Type", "Accept"}
	config.AllowAllOrigins = true
	server.Use(cors.New(config))

	//GIN Extras
	server.Use(gin.Recovery())

	//Routes
	v1 := server.Group("/v1")
	{
		v1.POST("/register", controllers.Register)
		v1.POST("/login", controllers.Login)
		v1.GET("/products", controllers.GetProducts)
		v1.POST("/addcart", AuthMiddleware(), controllers.AddToCart)
	}

	return server
}
