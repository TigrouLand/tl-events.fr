package main

import (
	"github.com/gin-gonic/gin"
	"github.com/tigrouland/eventsstats/server/mongo"
	"github.com/tigrouland/eventsstats/server/routes"
	"log"
)

func main() {
	// connect the mongodb database
	mongo.Connect()

	// setup web server
	r := gin.Default()
	r.GET("/", routes.Main)
	r.GET("/members", routes.Members)
	r.GET("/modifiers", routes.Modifiers)
	r.GET("/games", routes.Games)
	r.GET("/stats", routes.Stats)

	err := r.Run()
	if err != nil {
		log.Fatal(err)
	}
}
