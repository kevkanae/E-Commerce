package utils

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(email string) (string, error) {
	var mySigningKey = []byte(os.Getenv("KONNICHIWA"))
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["email"] = email
	//Expires in a week
	claims["exp"] = time.Now().Add(time.Hour * 168).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		fmt.Println("Couldnt Generate Token")
		return "", err
	}
	return tokenString, nil
}
