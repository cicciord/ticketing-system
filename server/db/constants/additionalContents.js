const dayjs = require("dayjs");
module.exports = [
  {
    author_id: 2,
    ticket_id: 1,
    timestamp: dayjs("2009-01-04").unix(),
    text: `Satoshi,

I've reviewed the code and executed the software successfully. The Proof of Work mechanism is intriguing and appears robust. I'm particularly interested in its long-term sustainability and potential vulnerabilities. Any insights on these aspects?

Best,
Hal
`,
  },
  {
    author_id: 1,
    ticket_id: 1,
    timestamp: dayjs("2009-01-05").unix(),
    text: `Hal,

The Proof of Work mechanism is designed to secure the network by requiring computational effort, making it difficult to manipulate. While it's energy-intensive, it ensures the integrity and security of the blockchain. We'll need to monitor its performance and make adjustments as necessary.

Regards,
Satoshi
`,
  },
  {
    author_id: 1,
    ticket_id: 2,
    timestamp: dayjs("2009-02-02").unix(),
    text: `Hal,

To address the network instability, I recommend increasing the block generation time. This should alleviate the current stress and enhance overall network stability. I'll proceed with these adjustments immediately.

Regards,
Satoshi
`,
  },
  {
    author_id: 2,
    ticket_id: 2,
    timestamp: dayjs("2009-02-03").unix(),
    text: `Satoshi,

The adjustments have improved network stability significantly. We'll continue to monitor its performance and implement further optimizations as needed. Thank you for the swift action.

Regards,
Hal
`,
  },
  {
    author_id: 2,
    ticket_id: 3,
    timestamp: dayjs("2012-11-16").unix(),
    text: `Vitalik,

That's a... colorful idea. But Bitcoin's strength lies in its simplicity and security. Adding shitcoins could be like inviting chaos to a peaceful picnic. Let's keep Bitcoin focused and robust.

Cheers,
Hal
`,
  },
  {
    author_id: 3,
    ticket_id: 3,
    timestamp: dayjs("2012-11-17").unix(),
    text: `Hal,

I see your point, but think of the innovation potential! We could have decentralized memes and cat currencies. It would be like the Internet, but with value. Anyway, food for thought!

Regards,
Vitalik
`,
  },
  {
    author_id: 5,
    ticket_id: 3,
    timestamp: dayjs("2022-03-22").unix(),
    text: `Vitalik,

The idea of integrating various cryptocurrencies is interesting. But what if we could transform Bitcoin itself to have the same capabilities as Ethereum, using RGB? It could be revolutionary.

Regards,
Maxim
`,
  },
  {
    author_id: 2,
    ticket_id: 4,
    timestamp: dayjs("2023-05-16").unix(),
    text: `SEC Team,

Bitcoin is like the ultimate decentralized bake sale—everyone contributes, and transparency is our secret ingredient. The initial distribution was handled by a fair mining process. It's all open-source, feel free to dig in!

Cheers,
Hal
`,
  },
  {
    author_id: 4,
    ticket_id: 4,
    timestamp: dayjs("2023-05-17").unix(),
    text: `Thank you for the information provided. We appreciate the transparency and will review the materials in detail. Think of us as the regulatory referees in the game of crypto. More questions might follow!

Regards,
SEC Compliance Team
`,
  },
  {
    author_id: 2,
    ticket_id: 5,
    timestamp: dayjs("2022-03-23").unix(),
    text: `Maxim,

That sounds revolutionary! But turning Bitcoin into Ethereum might be like teaching a cat to bark. Bitcoin's strength is in its stability and security. Let's proceed with caution.

Cheers,
Hal
`,
  },
  {
    author_id: 3,
    ticket_id: 5,
    timestamp: dayjs("2022-03-24").unix(),
    text: `Maxim,

As someone who believes in Ethereum's capabilities, I think bringing those features to Bitcoin is a great idea. It could bridge the gap between two powerful blockchain technologies.

Regards,
Vitalik
`,
  },
  {
    author_id: 5,
    ticket_id: 5,
    timestamp: dayjs("2022-03-25").unix(),
    text: `Hal, Vitalik,

I understand your concerns and excitement. We can maintain Bitcoin's core principles while expanding its functionality. It's like upgrading from a bicycle to a rocket ship. Let's collaborate to make this happen.

Regards,
Maxim
`,
  },
];
