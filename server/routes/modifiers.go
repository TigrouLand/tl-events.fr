package routes

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/tigrouland/eventsstats/server/mongo"
	"github.com/tigrouland/eventsstats/server/mongo/entities"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"time"
)

func Modifiers(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := mongo.Get().Collection("modifiers").Find(ctx, bson.D{})
	if err != nil {
		log.Fatal("an error occurred while retrieving the modifiers: ", err)
	}
	var modifiers []entities.Modifier
	for cursor.Next(ctx) {
		var modifier entities.Modifier
		err = cursor.Decode(&modifier)
		if err != nil {
			log.Fatal(err)
		}
		modifiers = append(modifiers, modifier)
	}
	c.JSON(200, modifiers)
}
