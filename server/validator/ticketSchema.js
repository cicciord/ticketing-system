module.exports = {
  category: {
    isIn: {
      options: [
        ["inquiry", "maintenance", "new feature", "administrative", "payment"],
      ],
    },
  },
  title: { isString: true, notEmpty: true },
  text: { isString: true, notEmpty: true },
};
