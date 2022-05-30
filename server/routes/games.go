package routes

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/tigrouland/eventsstats/server/mongo"
	"github.com/tigrouland/eventsstats/server/mongo/entities"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

func GetGames() []entities.Game {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := mongo.Get().Collection("games").Find(ctx, bson.M{"archiveDate": -1}, options.Find().SetSort(bson.D{{"startDate", -1}}))
	if err != nil {
		log.Fatal("an error occurred while retrieving the games: ", err)
	}
	games := []entities.Game{}
	for cursor.Next(ctx) {
		var game entities.Game
		err = cursor.Decode(&game)
		if err != nil {
			log.Fatal(err)
		}

		for i := range game.Players {
			var playerUUID uuid.UUID
			if !game.Players[i].IsZero() {
				playerUUID, err = uuid.FromBytes(game.Players[i].Data)
				if err != nil {
					log.Fatal(err)
				}
				game.PlayersUUID = append(game.PlayersUUID, playerUUID)
			}
		}

		games = append(games, game)
	}
	return games
}

func GetArchivedGames() []entities.ArchivedGame {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := mongo.Get().Collection("games").Find(ctx, bson.M{"archiveDate": bson.M{"$ne": -1}}, options.Find().SetSort(bson.D{{"startDate", -1}}))
	if err != nil {
		log.Fatal("an error occurred while retrieving the games: ", err)
	}
	games := []entities.ArchivedGame{}
	for cursor.Next(ctx) {
		var game entities.ArchivedGame
		err = cursor.Decode(&game)
		if err != nil {
			log.Fatal(err)
		}

		for i := range game.Players {
			var playerUUID uuid.UUID
			if !game.Players[i].IsZero() {
				playerUUID, err = uuid.FromBytes(game.Players[i].Data)
				if err != nil {
					log.Fatal(err)
				}
				game.PlayersUUID = append(game.PlayersUUID, playerUUID)
			}
		}

		for i := range game.Alive {
			var playerUUID uuid.UUID
			if !game.Alive[i].IsZero() {
				playerUUID, err = uuid.FromBytes(game.Alive[i].Data)
				if err != nil {
					log.Fatal(err)
				}
				game.AliveUUID = append(game.AliveUUID, playerUUID)
			}
		}

		games = append(games, game)
	}
	return games
}

func Games(c *gin.Context) {
	c.JSON(200, bson.M{"games": GetGames(), "archivedGames": GetArchivedGames()})
}
