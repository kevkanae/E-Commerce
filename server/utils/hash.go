package utils

import "golang.org/x/crypto/bcrypt"

func Hash(password []byte) ([]byte, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	return hashedPassword, err
}
