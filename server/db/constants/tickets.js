const categories = require("../constants/categories");

module.exports = [
  {
    owner_id: 1,
    state: "open",
    category: categories.NEW_FEATURE,
    title: "Add a new feature",
    timestamp: new Date("2019-01-02T00:00:00Z").valueOf(),
    text: "This is a new feature that needs to be added.",
  },
  {
    owner_id: 1,
    state: "closed",
    category: categories.NEW_FEATURE,
    title: "Add a old feature",
    timestamp: new Date("2019-01-01T00:00:00Z").valueOf(),
    text: "This is an old feature that doesn't need to be added.",
  },
  {
    owner_id: 3,
    state: "open",
    category: categories.INQUIRY,
    title: "Ask a question",
    timestamp: new Date("2019-01-03T00:00:00Z").valueOf(),
    text: "I have a question.",
  },
  {
    owner_id: 3,
    state: "closed",
    category: categories.MAINTENANCE,
    title: "Fix a bug",
    timestamp: new Date("2019-01-04T00:00:00Z").valueOf(),
    text: "There is a bug that needs to be fixed.",
  },
  {
    owner_id: 4,
    state: "open",
    category: categories.PAYMENT,
    title: "Pay for a service",
    timestamp: new Date("2019-01-05T00:00:00Z").valueOf(),
    text: "I need to pay for a service.",
  },
  {
    owner_id: 4,
    state: "closed",
    category: categories.PAYMENT,
    title: "Error in payment",
    timestamp: new Date("2019-01-06T00:00:00Z").valueOf(),
    text: "There is an error in the payment.",
  },
];
