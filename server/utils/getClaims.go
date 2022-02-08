package utils

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

func GetClaims(token string) jwt.MapClaims {
	var mySigningKey = []byte(os.Getenv("KONNICHIWA"))

	checkedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
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
