module.exports = {
  owner_id: { isInt: { min: 1 } },
  category: {
    isIn: {
      options: [
        ["inquiry", "maintenance", "new feature", "administrative", "payment"],
      ],
    },
  },
  title: { isString: true },
  text: { isString: true },
};
