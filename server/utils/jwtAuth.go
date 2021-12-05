package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(email string) (string, error) {
	var mySigningKey = []byte("KamiWaJinseiDes")
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
