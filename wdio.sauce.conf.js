const { config: common } = require('./wdio.conf')

const sauceOptions = {
  'sauce:options': {
    seleniumVersion: '3.141.59',
    build: `Build ${Date.now()}`.slice(0, -3)
  }
}

const chromeOptions = {
  'goog:chromeOptions': {
    'w3c': true
  }
}

exports.config = Object.assign(common, {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,

    specs: [
        './tests/sauce.e2e.js'
    ],

    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        extendedDebugging: true,
        name: 'Performance Check for Jaspers Page',
        ...sauceOptions,
        ...chromeOptions
    }]
})
