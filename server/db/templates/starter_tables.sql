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
INSERT INTO "Users" VALUES (1,'Satoshi Nakamoto','92f441ab6ef6bf72c1e957caa20ca083893cfeeccbbe24c6225f80343c656276b38cc9d224408464390351d13495b2a77c9a5358ca4402ba06cb1d1c07d4e2c9','bee6fd040c6bc7dcddbdebdba4e71bd2',1);
INSERT INTO "Users" VALUES (2,'Hal Finney','1932d5557fc597dd384fcc5bc9d11cc11539cd2b1d9617ed5551a3da0d11495d9e94d6db283969753ba91149b7b7decb6bf949e4d72c76e89204fe79438ea57e','136c9265bcbd28a3125beef26cdd1a23',0);
INSERT INTO "Users" VALUES (3,'Peter Todd','154f02a61a111350d79b5151c4a02c4bbb1bcb66637b538e397f27e769204293a76cb672fe99fc3a43a600c2f540c527d72fea1c0c3cc2e40a12530d94489ee1','5a19089f9afec67c2f82a068ec1d1ba4',1);
INSERT INTO "Users" VALUES (4,'Vitalik Buterin','5701ad0c51017cf5d36c51707115b9c2cff12a36d018ac375ea9e4afaa04cea54ed834e2cfc3d3238ca3f98ade3dd6437b97bb4ee27ef3087431f7b4e8ca353b','1b4b0f7ae924220d9a08a8f9cb442986',0);
INSERT INTO "Users" VALUES (5,'Maxim Orlovsky','c4974d8feb5483ed44b8f15e540e3682f30ca8d22e2fac56fcf80c9fbee66803a854c20f23a4674dec8db4879ea34af4dfbb6959fa963759888b49a678b643d7','331a94663fb3793110691319eb4df4c2',0);
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
INSERT INTO "AdditionalContents" VALUES (7,4,4,1416220225,'Peter,

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
INSERT INTO "AdditionalContents" VALUES (10,5,5,1648219092,'Vitalik,

  I understand your concerns and excitement. We can maintain Bitcoin''s core principles while expanding its functionality. It''s like upgrading from a bicycle to a rocket ship. Let''s collaborate to make this happen.

  Regards,
  Maxim');
INSERT INTO "AdditionalContents" VALUES (11,6,3,1703019544,'Maxim,

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
