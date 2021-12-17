package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/utils"
	"net/http"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//reqToken := c.Request.Header.Get("Authorization")
		//splitToken := strings.Split(reqToken, "Bearer")
		//if len(splitToken) != 2 {
		//	c.JSON(http.StatusUnauthorized, "Unauthorized")
		//	c.Abort()
		//	return
		//}
		//reqToken = strings.TrimSpace(splitToken[1])
		//fmt.Println(reqToken)
		reqCookie, err := c.Cookie("Eat_My_Cookie")
		if err !=nil {
			fmt.Println(utils.Wrap(err, "I need a Cookie ;__;"))
			c.JSON(http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}
		fmt.Println(reqCookie)
		c.Next()
	}
}
