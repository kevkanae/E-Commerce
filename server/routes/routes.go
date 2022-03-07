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
	server.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE NOT FOUND ╯︿╰", "message": "Page Not Found"})
	})
	v1 := server.Group("/v1")
	{
		//Default
		v1.GET("/",controllers.DefaultRoute)

		//Auth
		v1.POST("/register", controllers.Register)
		v1.POST("/login", controllers.Login)

		//Products
		v1.GET("/products", controllers.GetProducts)
		v1.GET("/:productid", AuthMiddleware(), controllers.GetSingleProduct)

		//Cart
		v1.POST("/addcart", AuthMiddleware(), controllers.AddToCart)
		v1.GET("/getcart", AuthMiddleware(), controllers.GetCart)
		v1.PATCH("/updatecart", AuthMiddleware(), controllers.UpdateCart)
		v1.DELETE("/deleteproduct", AuthMiddleware(), controllers.RemoveProduct)
	}

	return server
}
