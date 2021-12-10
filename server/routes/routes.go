package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/controllers"
)

func SetupRouter() *gin.Engine {
	server := gin.Default()
	server.Use(cors.Default())
	v1 := server.Group("/v1")
	{
		v1.GET("/products", controllers.GetProducts, AuthMiddleware())
		v1.POST("/register", controllers.Register)
		v1.POST("/login", controllers.Login)
	}

	return server
}
