package controllers

import "github.com/gin-gonic/gin"

func DefaultRoute(c *gin.Context) {
	c.JSON(404, gin.H{"code": "Login Bro",
		"message": "One Shall NOT use a route that is deemeed useless -Kevin,2022"})
}
