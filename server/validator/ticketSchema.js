module.exports = {
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
