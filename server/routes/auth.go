package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		_, err := c.Cookie("Eat_My_Cookie")
		if err != nil {
			fmt.Println(utils.Wrap(err, "I need a Cookie ;__;"))
			c.JSON(http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}
		c.Next()
	}
}
