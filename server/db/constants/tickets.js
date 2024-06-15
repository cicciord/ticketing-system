const dayjs = require("dayjs");
const categories = require("../constants/categories");

module.exports = [
  {
    owner_id: 1,
    state: "closed",
    category: categories.INQUIRY,
    title: "Initial Bitcoin Code Inquiry",
    timestamp: dayjs("2009-01-03").unix(),
    text: `To all,

I have released the initial version of the Bitcoin code. This marks the beginning of a decentralized financial system. Please review the code and share any questions or concerns you might have regarding its implementation and security.

Regards,
Satoshi Nakamoto
`,
  },
  {
    owner_id: 2,
    state: "closed",
    category: categories.MAINTENANCE,
    title: "Maintenance of Early Bitcoin Network",
    timestamp: dayjs("2009-02-01").unix(),
    text: `Team,

I've observed some instability in the network. It seems to struggle under certain conditions, affecting transaction reliability. We need to address these issues promptly to ensure a stable and secure network. Any suggestions for immediate fixes?

Regards,
Hal
`,
  },
  {
    owner_id: 3,
    state: "open",
    category: categories.NEW_FEATURE,
    title: "Proposal for Shitcoin Integration",
    timestamp: dayjs("2012-11-15").unix(),
    text: `Hi everyone,

I've been pondering the possibility of integrating other cryptocurrencies, affectionately known as "shitcoins," into the Bitcoin ecosystem. Imagine a world where Dogecoin and Bitcoin live in harmony! Thoughts?

Regards,
Vitalik
`,
  },
  {
    owner_id: 4,
    state: "closed",
    category: categories.ADMINISTRATIVE,
    title: "SEC Inquiry about Bitcoin",
    timestamp: dayjs("2023-05-15").unix(),
    text: `Dear Bitcoin Team,

The SEC is conducting an inquiry into Bitcoin's regulatory status. We need detailed information on the initial distribution and use cases. Consider this a formal knock on your digital door.

Regards,
SEC Compliance Team
`,
  },
  {
    owner_id: 5,
    state: "open",
    category: categories.NEW_FEATURE,
    title: "Transforming Bitcoin with RGB",
    timestamp: dayjs("2022-03-22").unix(),
    text: `Hi everyone,

I've been working on an innovative idea to transform Bitcoin using RGB technology. Think of it as turning Bitcoin into a more versatile Ethereum. We could have smart contracts, tokens, and more, all on the Bitcoin network!

Regards,
Maxim
`,
  },
  {
    owner_id: 2,
    state: "open",
    category: categories.MAINTENANCE,
    title: "Network Upgrade Proposal",
    timestamp: dayjs("2023-01-10").unix(),
    text: `Hey team,

Considering the advancements in blockchain technology, I propose we upgrade the Bitcoin network to enhance its security and scalability. We need to keep up with the times and ensure Bitcoin remains the gold standard.

Cheers,
Hal
`,
  },
];
