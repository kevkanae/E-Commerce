package services

import (
	"github.com/gin-gonic/gin"
	"time"
)

func CookieSet(c *gin.Context, token string) {
	c.SetCookie("Eat_My_Cookie", token, int(time.Now().Add(time.Hour*168).Unix()), "/", "*", true, true)
}
