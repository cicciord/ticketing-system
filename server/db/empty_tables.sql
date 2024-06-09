BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Users" (
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL,
	"admin"	INTEGER DEFAULT 0 CHECK("admin" IN (0, 1)),
	PRIMARY KEY("username")
);
CREATE TABLE IF NOT EXISTS "Tickets" (
	"id"	INTEGER NOT NULL UNIQUE,
	"owner"	TEXT NOT NULL,
	"state"	INTEGER DEFAULT 1 CHECK("state" IN (0, 1)),
	"category"	TEXT NOT NULL CHECK("category" IN ("inquiry", "maintenance", "new feature", "administrative", "payment")),
	"title"	TEXT NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	FOREIGN KEY("owner") REFERENCES "Users"("username"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "TicketContents" (
	"id"	INTEGER NOT NULL UNIQUE,
	"ticket_id"	INTEGER NOT NULL,
	"author"	TEXT NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"text"	TEXT NOT NULL,
	FOREIGN KEY("ticket_id") REFERENCES "Tickets"("id"),
	FOREIGN KEY("author") REFERENCES "Users"("username"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
