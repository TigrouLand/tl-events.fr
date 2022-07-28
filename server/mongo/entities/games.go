package entities

import (
	"github.com/google/uuid"
	"github.com/tigrouland/eventsstats/server/mongo"
)

type ArchivedGame struct {
	ID   int8   `bson:"id" json:"id"`
	Name string `bson:"name" json:"name"`

	Type   string `bson:"_t" json:"type"`
	Status string `bson:"status" json:"status"`

	Alive     []mongo.DBRef `bson:"alive" json:"-"`
	AliveUUID []uuid.UUID   `json:"alive"`

	Players     []mongo.DBRef `bson:"players" json:"-"`
	PlayersUUID []uuid.UUID   `json:"players"`

	Modifiers []string `bson:"modifiers" json:"modifiers"`

	Logs []string `bson:"logs" json:"logs"`

	Hours   int8 `bson:"hours" json:"hours"`
	Minutes int8 `bson:"minutes" json:"minutes"`
	Seconds int8 `bson:"seconds" json:"seconds"`

	StartDate    int64 `bson:"startDate" json:"startDate"`
	ScheduleDate int64 `bson:"scheduleDate" json:"scheduleDate"`
	ArchiveDate  int64 `bson:"archiveDate" json:"archiveDate"`
}

type Game struct {
	ID   int8   `bson:"id" json:"id"`
	Name string `bson:"name" json:"name"`

	Type   string `bson:"type" json:"type"`
	Status string `bson:"status" json:"status"`

	// Alive     []primitive.Binary `bson:"alive" json:"-"`
	// AliveUUID []uuid.UUID        `json:"alive"`

	Players     []mongo.DBRef `bson:"players" json:"-"`
	PlayersUUID []uuid.UUID   `json:"players"`

	Modifiers []string `bson:"modifiers" json:"modifiers"`

	// Logs []string `bson:"logs" json:"logs"`

	Hours   int8 `bson:"hours" json:"hours"`
	Minutes int8 `bson:"minutes" json:"minutes"`
	Seconds int8 `bson:"seconds" json:"seconds"`

	StartDate    int64 `bson:"startDate" json:"startDate"`
	ScheduleDate int64 `bson:"scheduleDate" json:"scheduleDate"`
	ArchiveDate  int64 `bson:"archiveDate" json:"archiveDate"`
}
