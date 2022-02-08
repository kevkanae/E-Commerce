package services

import (
	"time"

	"github.com/gin-gonic/gin"
)

func CookieSet(c *gin.Context, token string) {
	c.SetCookie("Eat_My_Cookie", token, int(time.Now().Add(time.Hour*1).Unix()), "/", "localhost", false, true)
}
