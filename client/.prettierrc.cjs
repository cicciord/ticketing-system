module.exports = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: [
    "^react(.*)",
    "bootstrap/(.*)",
    "<THIRD_PARTY_MODULES>",
    "@/(.*)",
    "^[./]",
  ],
  importOrderSeparation: true,
};
