package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		reqToken := c.Request.Header.Get("Authorization")

		splitToken := strings.Split(reqToken, "Bearer")
		if len(splitToken) != 2 {
			c.JSON(http.StatusUnauthorized, "unauthorized")
			c.Abort()
			return
		}
		reqToken = strings.TrimSpace(splitToken[1])
		fmt.Println(reqToken)
		c.Next()
	}
}
