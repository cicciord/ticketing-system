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
	FOREIGN KEY("ticket_id") REFERENCES "Tickets"("id"),
	FOREIGN KEY("author_id") REFERENCES "Users"("id")
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
INSERT INTO "Users" VALUES (1,'Satoshi Nakamoto','3d5f992920f67307351c789b518f493a1172a0c83e2d6aa54c7f975bea6a0a601a3251b01f801350d0678f523e6fd5399e6239cbce74d82ab0520fd4abbe25bb','f0ff557f14d7c20319440f8169e4a614',1);
INSERT INTO "Users" VALUES (2,'Hal Finney','644c26df43cc810f3f0a26cc10349cf9a60c011cc6514653283ccc7aca3a2b992e0b93d5c1949ac432beee30f794e5cb00f8628a3ef073f534c08c4c2f81b38c','a8ff7ce29eac7628842fea9ada700459',0);
INSERT INTO "Users" VALUES (3,'Peter Todd','e1443bc262e705fa711ac1c2872f01d735803b44b45d97d0abe0511a68143b3a33468376aa6a7975a24b474fc6fd69376987120e8835bee2374bce3549d3ca0b','b50f6dc81e75cb8241030d5b190d438e',1);
INSERT INTO "Users" VALUES (4,'Vitalik Buterin','eec94228febda03121ca14a97cb2eb0dba4d3bb99e9690a9ccee000f31e079aa48a9e07f80da88337200a3f63e04efcdaffb67e6b1d94c9585bc862d7b3bff5f','52bec72ce7c7a7149f052e4175eee899',0);
INSERT INTO "Users" VALUES (5,'Maxim Orlovsky','c2f8ac4b78a37d44d57f5ceb7af029a450de69a1e4f4a19176d68f5d2c4528e54695a7ed04ebfe88fa9cdefb53d5b56a1af87c0f05a6b341eab3e5a7a7677cbc','554ccd3f8e2b0debb9689603c9b51d20',0);
INSERT INTO "AdditionalContents" VALUES (1,1,2,1231053825,'Satoshi,

I''ve reviewed the code and executed the software successfully. The Proof of Work mechanism is intriguing and appears robust. I''m particularly interested in its long-term sustainability and potential vulnerabilities. Any insights on these aspects?

Best,
Hal');
INSERT INTO "AdditionalContents" VALUES (2,1,1,1231163821,'Hal,

The Proof of Work mechanism is designed to secure the network by requiring computational effort, making it difficult to manipulate. While it''s energy-intensive, it ensures the integrity and security of the blockchain. We''ll need to monitor its performance and make adjustments as necessary.

Regards,
Satoshi');
INSERT INTO "AdditionalContents" VALUES (3,2,2,1231812757,'Satoshi,

I have reviewed the initial transaction and it appears to be successful. The decentralized nature of this system is truly groundbreaking. I encourage everyone to conduct their own transactions to better understand the mechanics and potential of Bitcoin.

Best,
Hal Finney');
INSERT INTO "AdditionalContents" VALUES (4,2,3,1231958722,'I’ve been analyzing the Bitcoin code and the recent transaction. The cryptographic principles and peer-to-peer network structure are solid. However, we need to keep a close watch on potential security vulnerabilities as more transactions occur.

Regards,
Peter Todd');
INSERT INTO "AdditionalContents" VALUES (5,2,1,1232053988,'To all,

Great to see the positive feedback and initial transactions. As we move forward, let''s focus on scalability and ensuring robust security measures. Our community''s vigilance will be key to Bitcoin''s success.

Regards,
Satoshi Nakamoto');
INSERT INTO "AdditionalContents" VALUES (6,4,3,1416116973,'Vitalik,

That''s a... colorful idea. But Bitcoin''s strength lies in its simplicity and security. Adding shitcoins could be like inviting chaos to a peaceful picnic. Let''s keep Bitcoin focused and robust.

Cheers,
Peter');
INSERT INTO "AdditionalContents" VALUES (7,4,3,1416220225,'Hal,

I see your point, but think of the innovation potential! We could have decentralized memes and cat currencies. It would be like the Internet, but with value. Anyway, food for thought!

Regards,
Vitalik');
INSERT INTO "AdditionalContents" VALUES (8,4,5,1647903779,'Vitalik,

The idea of integrating various cryptocurrencies is interesting. But what if we could transform Bitcoin itself to have the same capabilities as Ethereum, using RGB? It could be revolutionary.

Regards,
Maxim');
INSERT INTO "AdditionalContents" VALUES (9,5,4,1648109866,'Maxim,

  As someone who believes in Ethereum''s capabilities, I think bringing those features to Bitcoin is a great idea. It could bridge the gap between two powerful blockchain technologies.

  Regards,
  Vitalik');
INSERT INTO "AdditionalContents" VALUES (10,5,5,1648219092,'Hal, Vitalik,

  I understand your concerns and excitement. We can maintain Bitcoin''s core principles while expanding its functionality. It''s like upgrading from a bicycle to a rocket ship. Let''s collaborate to make this happen.

  Regards,
  Maxim');
INSERT INTO "AdditionalContents" VALUES (11,6,2,1703019544,'Maxim,

While I understand your concerns, I would like to remind you that the technology built within our ecosystem is open source. This means that it is freely available for anyone to use, modify, and distribute. The open-source nature of our work is what drives innovation and collaboration. Therefore, there should be no expectation of payment for the use of open-source contributions.

Regards,
Peter');
INSERT INTO "Tickets" VALUES (1,1,1,'administrative','Initial Bitcoin Code',1230953298,'To all,

I have released the initial version of the Bitcoin code. This marks the beginning of a decentralized financial system. Please review the code and share any questions or concerns you might have regarding its implementation and security.

Regards,
Satoshi Nakamoto');
INSERT INTO "Tickets" VALUES (2,1,0,'maintenance','First Transaction',1231764429,'To all,

I have completed the first Bitcoin transaction, sending 10 BTC to Hal Finney. This milestone demonstrates the practical application of the decentralized financial system we are building. Please review the transaction details and share any questions or concerns you might have regarding its process and implications.

Regards,
Satoshi Nakamoto');
INSERT INTO "Tickets" VALUES (3,4,0,'inquiry','Smart Contracts Blockchain',1333356695,'To all,

I''ve been exploring the concept of a decentralized platform that goes beyond currency, enabling the creation and deployment of smart contracts and decentralized applications (dApps). This platform would utilize a new cryptocurrency to facilitate these functions. I''m eager to hear your thoughts and feedback on this proposal.

Regards,
Vitalik Buterin');
INSERT INTO "Tickets" VALUES (4,4,1,'new feature','Proposal for Shitcoin Integration',1416065998,'Hi everyone,

I''ve been pondering the possibility of integrating other cryptocurrencies, affectionately known as "shitcoins," into the Bitcoin ecosystem. Imagine a world where Dogecoin and Bitcoin live in harmony! Thoughts?

Regards,
Vitalik');
INSERT INTO "Tickets" VALUES (5,5,1,'new feature','Transforming Bitcoin with RGB',1647922482,'Hi everyone,

  I''ve been working on an innovative idea to transform Bitcoin using RGB technology. Think of it as turning Bitcoin into a more versatile Ethereum. We could have smart contracts, tokens, and more, all on the Bitcoin network!

  Regards,
  Maxim');
INSERT INTO "Tickets" VALUES (6,5,0,'payment','Missing payment for services',1702920391,'To all,

I have noticed that the RGB technology I developed is being utilized within the Bitcoin network without proper attribution or compensation. This technology required significant effort and resources to create, and it is only fair that its use includes appropriate payment or licensing arrangements.

I kindly request that those using RGB technology in their implementations contact me to discuss fair compensation. Let''s ensure that innovation continues to be rewarded in our community.

Regards,
Maxim Orlovsky');
COMMIT;
