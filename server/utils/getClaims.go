package utils

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func GetClaims(c *gin.Context) jwt.MapClaims {

	//Get Cookie
	cookie, cookieErr := c.Cookie("Eat_My_Cookie")
	if cookieErr != nil {
		fmt.Println(Wrap(cookieErr, "Couldn't Find Cookie"))
		c.JSON(http.StatusUnauthorized, gin.H{
			"Status":  "Unauthorized",
			"Message": "Couldnt Find Cookie",
		})
	}

	var mySigningKey = []byte(os.Getenv("KONNICHIWA"))

	checkedToken, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return mySigningKey, nil
	})

	claims := checkedToken.Claims.(jwt.MapClaims)
	if claims, ok := checkedToken.Claims.(jwt.MapClaims); ok && checkedToken.Valid {
		fmt.Println(claims)
	} else {
		fmt.Println(err)
	}

	return claims
}
