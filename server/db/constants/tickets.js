const dayjs = require("dayjs");
const categories = require("../constants/categories");

module.exports = [
  {
    owner_id: 1,
    state: "open",
    category: categories.ADMINISTRATIVE,
    title: "Initial Bitcoin Code",
    timestamp: dayjs("2009-01-03T04:28:18").unix(),
    text: `To all,

I have released the initial version of the Bitcoin code. This marks the beginning of a decentralized financial system. Please review the code and share any questions or concerns you might have regarding its implementation and security.

Regards,
Satoshi Nakamoto`,
  },
  {
    owner_id: 1,
    state: "closed",
    category: categories.MAINTENANCE,
    title: "First Transaction",
    timestamp: dayjs("2009-01-12T13:47:09").unix(),
    text: `To all,

I have completed the first Bitcoin transaction, sending 10 BTC to Hal Finney. This milestone demonstrates the practical application of the decentralized financial system we are building. Please review the transaction details and share any questions or concerns you might have regarding its process and implications.

Regards,
Satoshi Nakamoto`,
  },
  {
    owner_id: 4,
    state: "closed",
    category: categories.INQUIRY,
    title: "Smart Contracts Blockchain",
    timestamp: dayjs("2012-04-02T10:51:35").unix(),
    text: `To all,

I've been exploring the concept of a decentralized platform that goes beyond currency, enabling the creation and deployment of smart contracts and decentralized applications (dApps). This platform would utilize a new cryptocurrency to facilitate these functions. I'm eager to hear your thoughts and feedback on this proposal.

Regards,
Vitalik Buterin`,
  },
  {
    owner_id: 4,
    state: "open",
    category: categories.NEW_FEATURE,
    title: "Proposal for Shitcoin Integration",
    timestamp: dayjs("2014-11-15T16:39:58").unix(),
    text: `Hi everyone,

I've been pondering the possibility of integrating other cryptocurrencies, affectionately known as "shitcoins," into the Bitcoin ecosystem. Imagine a world where Dogecoin and Bitcoin live in harmony! Thoughts?

Regards,
Vitalik`,
  },
  {
    owner_id: 5,
    state: "open",
    category: categories.NEW_FEATURE,
    title: "Transforming Bitcoin with RGB",
    timestamp: dayjs("2022-03-22T05:14:42").unix(),
    text: `Hi everyone,

  I've been working on an innovative idea to transform Bitcoin using RGB technology. Think of it as turning Bitcoin into a more versatile Ethereum. We could have smart contracts, tokens, and more, all on the Bitcoin network!

  Regards,
  Maxim`,
  },
  {
    owner_id: 5,
    state: "closed",
    category: categories.PAYMENT,
    title: "Missing payment for services",
    timestamp: dayjs("2023-12-18T18:26:31").unix(),
    text: `To all,

I have noticed that the RGB technology I developed is being utilized within the Bitcoin network without proper attribution or compensation. This technology required significant effort and resources to create, and it is only fair that its use includes appropriate payment or licensing arrangements.

I kindly request that those using RGB technology in their implementations contact me to discuss fair compensation. Let's ensure that innovation continues to be rewarded in our community.

Regards,
Maxim Orlovsky`,
  },
];
