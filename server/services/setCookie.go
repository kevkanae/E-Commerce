package services

import (
	"github.com/gin-gonic/gin"
)

func CookieSet(c *gin.Context, token string) {
	if ENV("APP_ENV") == "DEV" {
		c.SetCookie("Eat_My_Cookie", token, 60*60*24, "/", "localhost", false, true)
	} else {
		c.SetCookie("Eat_My_Cookie", token, 60*60*24, "/", "localhost", false, true)
	}
}
