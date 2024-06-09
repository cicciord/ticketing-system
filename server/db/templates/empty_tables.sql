BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Users" (
	"id"	INTEGER NOT NULL UNIQUE,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL,
	"admin"	INTEGER DEFAULT 0 CHECK("admin" IN (0, 1)),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "AdditionalContents" (
	"id"	INTEGER NOT NULL UNIQUE,
	"ticket_id"	INTEGER NOT NULL,
	"author_id"	INTEGER NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"text"	TEXT NOT NULL,
	FOREIGN KEY("ticket_id") REFERENCES "Tickets"("id"),
	FOREIGN KEY("author_id") REFERENCES "Users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Tickets" (
	"id"	INTEGER NOT NULL UNIQUE,
	"owner_id"	INTEGER NOT NULL,
	"state"	INTEGER DEFAULT 1 CHECK("state" IN (0, 1)),
	"category"	TEXT NOT NULL CHECK("category" IN ("inquiry", "maintenance", "new feature", "administrative", "payment")),
	"title"	TEXT NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"text"	TEXT NOT NULL,
	FOREIGN KEY("owner_id") REFERENCES "Users"("id"),
	PRIMARY KEY("id")
);
COMMIT;
