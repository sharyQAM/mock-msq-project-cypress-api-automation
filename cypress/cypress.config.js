const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://8fba507c-e550-43b4-a575-facf6b599386.mock.pstmn.io",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
