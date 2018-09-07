Automated Performance Testing With WebDriver
============================================

This project contains an example test suite written in [WebdriverIO](http://webdriver.io/) to showcase performance tests using [WebDriver](https://www.w3.org/TR/webdriver1/). It uses an example application based on the tutorial [_"Optimize Website Speed With Chrome DevTools"_](https://developers.google.com/web/tools/chrome-devtools/speed/get-started) from the Google Developers page. After you've followed the steps on how to optimize the loading speed for that application you can run the test suite and will notice that all test pass. After that you can undo the changes and see how this affects the performance metrics and causes the test to fail.

[![Video to the tutorial](http://img.youtube.com/vi/5fLW5Q5ODiE/maxresdefault.jpg "Video to the tutorial")](https://www.youtube.com/watch?v=5fLW5Q5ODiE)

## Setup

To run this demo you need to have Node.js (v8 or higher) installed on your machine. Then clone the repo and install dependencies:

```sh
$ git clone git@github.com:christian-bromann/webdriverio-performance-testing.git
$ cd webdriverio-performance-testing
$ npm install
```

Now you are good to go to run the scenarios.

## Page Weight Scenario

To optimize for page weight the [tutorial author](https://twitter.com/kaycebasques) did the following steps:

- in `server.js` add compression to your Express.js server so images are being served compressed:
    
    ```js
    const compression = require('compression');
    app.use(compression())
    ```

- in `src/model.js` change the variable `dir` in line 3 from `big` to `small` in order to load optimized images
- in `webpack.config.js` change the mode from `development` to `production` to enable tree shaking and serve less script payload

## Script Blocking Scenario

To optimize the page load speed further the author did some optimizations to the application logic:

- in `template.html` remove the LoDash and jQuery scripts since they are not used at all and block the page from being loaded
- in `src/App.jsx` remove the function call `this.mineBitcoin(1500);` in the constructor which was responsible for a lot of CPU heavy computation during page load.

---

This project is a demo for [my talk](https://jsi2018.sched.com/event/F76M/automated-performance-testing-with-webdriver-christian-bromann-sauce-labs) at [#NodeJSInteractive](https://events.linuxfoundation.org/events/js-interactive-2018/) on _"Automated Performance Testing With WebDriver"_.