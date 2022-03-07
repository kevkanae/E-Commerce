package routes

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kevkanae/e-com-use-kart/server/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		//Get Cookie
		cookie, cookieErr := c.Cookie("Eat_My_Cookie")
		if cookieErr != nil {
			fmt.Println(utils.Wrap(cookieErr, "Couldn't Find Cookie"))
			c.JSON(http.StatusUnauthorized, gin.H{
				"Status":  "Unauthorized",
				"Message": "Couldnt Find Cookie",
			})
			c.Abort()
			return
		}

		var mySigningKey = []byte(os.Getenv("KONNICHIWA"))

		checkedToken, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return mySigningKey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				fmt.Println(utils.Wrap(err, "Invalid Signature"))
				c.JSON(http.StatusUnauthorized, gin.H{
					"Status":  "Unauthorized",
					"Message": "Signature Invalid",
				})
				c.Abort()
				return
			}

		}
		if !checkedToken.Valid {

			c.JSON(http.StatusUnauthorized, gin.H{
				"Status":  "Unauthorized",
				"Message": "Invalid Token",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
