package controllers

import "github.com/gin-gonic/gin"

func DefaultRoute(c *gin.Context) {
	c.JSON(404, gin.H{"code": "Login Bro", "message": "Dont use a route thats useless -Kevin,2022"})
}
