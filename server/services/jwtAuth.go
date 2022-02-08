package services

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(email string) (string, error) {
	var mySigningKey = []byte(os.Getenv("KONNICHIWA"))

	claims := &jwt.MapClaims{
		"authorized": true,
		"expiry":     time.Now().Add(time.Hour * 1).Unix(),
		"email":      email,
	}

	tokenWithClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenFinal, err := tokenWithClaims.SignedString(mySigningKey)

	if err != nil {
		fmt.Println("Couldnt Generate Token")
		return "", err
	}
	return tokenFinal, nil
}
