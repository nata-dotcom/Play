const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,	
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    baseUrl: "https://www.bjornaxen.se",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
