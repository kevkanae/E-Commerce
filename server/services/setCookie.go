package services

import (
	"github.com/gin-gonic/gin"
)

func CookieSet(c *gin.Context, token string) {
	c.SetCookie("Eat_My_Cookie", token, (60 * 60 * 24), "/", "localhost", false, true)
}
