import { config as common } from './wdio.conf.js'

const sauceOptions = {
  'sauce:options': {
    seleniumVersion: '3.141.59',
    name: 'Performance Test for Jaspers Page',
    build: `Build ${Date.now()}`.slice(0, -3),
    extendedDebugging: true,
    capturePerformance: true
  }
}

const chromeOptions = {
  'goog:chromeOptions': {
    'w3c': true
  }
}

export const config = {
    ...common,
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
        ...sauceOptions,
        ...chromeOptions
    }]
}
