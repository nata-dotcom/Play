const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://www.bjornaxen.se/"
    },
    env: {
        username: 'nataliia.ostberg+testz@vaimo.com',
        password: 'helloThere23'
    }
})