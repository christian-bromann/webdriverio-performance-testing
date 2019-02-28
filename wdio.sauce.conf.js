const { config: common } = require('./wdio.conf')

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
        platform: 'Windows 10',
        version: 'latest',
        extendedDebugging: true,
        name: 'Performance Check for Jaspers Page',
        excludeDriverLogs: ['driver', 'browser', 'performance']
    }]
})
