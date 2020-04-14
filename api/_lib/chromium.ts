// import { launch, Page } from 'puppeteer-core';
// import { getOptions } from './options';
import { FileType } from './types';
import chromeOld from 'chrome-aws-lambda';
// let _page: Page | null;

// SELENIUM strategy
const webdriver = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
// require('chromedriver');

// async function getPage(isDev: boolean) {
//     if (_page) {
//         return _page;
//     }
//     const options = await getOptions(isDev);
//     const browser = await launch(options);
//
//     _page = await browser.newPage();
//     return _page;
// }

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
    // prevents 'declared but never used lint'
    console.log(isDev);
    console.log(html);
    console.log('fileType: ', type);

    // SELENIUM strategy - https://medium.com/@Moatazeldebsy/ui-testing-using-selenium-webdriver-and-chrome-inside-aws-lambda-77a17ec64862
    var options = new chrome.Options();

    // options.setChromeBinaryPath('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
    var ep = await chromeOld.executablePath;
    console.log('executable path: ', ep);

    // options.addArguments(['--no-sandbox', '--headless', '--disable-dev-shm-usage']); // working
    options.addArguments(chromeOld.args);
    await console.log("chrome OPTIONS: ");
    await console.dir(options);

    // EXPERIMENT - delete all 3 lines
    // var path = '/tmp/chromium'; /usr/local/bin/chromedriver; '/Users/ryankulp/Dropbox/code/og-image/node_modules/chromedriver'; require('chromedriver').path;
    var service = new chrome.ServiceBuilder('/tmp/chromium').build();
    chrome.setDefaultService(service);

    var driver = new webdriver.Builder().withCapabilities(options).build();
    driver.manage().window().setRect({width: 2048, height: 1170, x: 0, y: 0});

    var html2 = '<p>Selenium 실험</p><img src="https://hanrhymes.com/hanrhymes-avatar.png">';
    await driver.get(`data:text/html;charset=utf-8,${html2}`);

    var title = await driver.getTitle();
    console.log('PAGE TITLE: ', title);

    var file;
    await driver.takeScreenshot().then(data => {
      file = Buffer.from(data, 'base64');
    })

    return file;
}
