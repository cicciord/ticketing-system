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
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("author_id") REFERENCES "Users"("id"),
	FOREIGN KEY("ticket_id") REFERENCES "Tickets"("id")
);
CREATE TABLE IF NOT EXISTS "Tickets" (
	"id"	INTEGER NOT NULL UNIQUE,
	"owner_id"	INTEGER NOT NULL,
	"state"	INTEGER DEFAULT 1 CHECK("state" IN (0, 1)),
	"category"	TEXT NOT NULL CHECK("category" IN ("inquiry", "maintenance", "new feature", "administrative", "payment")),
	"title"	TEXT NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"text"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("owner_id") REFERENCES "Users"("id")
);
INSERT INTO "Users" VALUES (1,'admin1','feb753b6a2ee02bf3124af5e0de72b72e4a8409a7cb9e9f15215ec532c239f7855d55da40ddcab52f64cc4feb043b916fd7762f56c0d5666d1304aaedc106270','ec4970daf26c653ab4b105cbceb15b28',1);
INSERT INTO "Users" VALUES (2,'admin2','dc7f448c4b13919451251483029c4e99c3b04a703b3828408e2022163976fae0ac7fc5625000b27c88a729ad096cf66dcb8adfad5d14f12656c3cf0c158f7011','6557b017b6d09ad6a23c5fb441be4af6',1);
INSERT INTO "Users" VALUES (3,'user1','4091621efbfca69d66c0dedc1f66bc118c1f1f2210cc2ccf7dae5720eaf9f956698a64cc1b1c80150b05025ca277aafeef760656970b9d6dd9b35cf8d1c1a014','37075f0afb4134288af204b7870dd218',0);
INSERT INTO "Users" VALUES (4,'user2','db5b91894dff008f721a63c854d1c730fb4df7d40d4596b9793ac223e7c96b53116549c5737eca5f9548214e1c0b0981a8db59ea2f37f94d049ca65dc6d20972','5e203550eedda3120adf0a93eb07f297',0);
INSERT INTO "Users" VALUES (5,'user3','6b3e34b230d812cc0a054bf8458e274c1ad199aa83bf45ff98f382235862fde0912e8a17e0a54c6b6e02e0425840ec92958e9e3163fbe8346cad1525171896c8','437c8f597ddc287762506f4977975a2e',0);
INSERT INTO "AdditionalContents" VALUES (1,1,1,1549065600000,'This is a test text');
INSERT INTO "AdditionalContents" VALUES (2,3,2,1549152000000,'This is a test text');
INSERT INTO "AdditionalContents" VALUES (3,3,3,1549238400000,'This is another test text');
INSERT INTO "AdditionalContents" VALUES (4,3,4,1549324800000,'This is yet another test text');
INSERT INTO "AdditionalContents" VALUES (5,6,2,1549411200000,'This is a test text');
INSERT INTO "AdditionalContents" VALUES (6,6,3,1549497600000,'This is another test text');
INSERT INTO "AdditionalContents" VALUES (7,6,4,1549497600000,'This is yet another test text');
INSERT INTO "Tickets" VALUES (1,1,1,'new feature','Add a new feature',1546387200000,'This is a new feature that needs to be added.');
INSERT INTO "Tickets" VALUES (2,1,0,'new feature','Add a old feature',1546300800000,'This is an old feature that doesn''t need to be added.');
INSERT INTO "Tickets" VALUES (3,3,1,'inquiry','Ask a question',1546473600000,'I have a question.');
INSERT INTO "Tickets" VALUES (4,3,0,'maintenance','Fix a bug',1546560000000,'There is a bug that needs to be fixed.');
INSERT INTO "Tickets" VALUES (5,4,1,'payment','Pay for a service',1546646400000,'I need to pay for a service.');
INSERT INTO "Tickets" VALUES (6,4,0,'payment','Error in payment',1546732800000,'There is an error in the payment.');
COMMIT;
