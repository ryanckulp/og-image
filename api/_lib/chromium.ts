require('now-logs')('my-secret-key');

// import { launch, Page } from 'puppeteer-core';
// import { getOptions } from './options';
import { FileType } from './types';
// let _page: Page | null;
// const b64buffer = require('base64-arraybuffer');

// SELENIUM strategy
const webdriver = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// const atob = require("atob");
// const Blob = require("cross-blob");
// var toBuffer = require('blob-to-buffer');

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

    // PUPPETEER strategy
    // const page = await getPage(isDev);
    //
    // await page.setViewport({ width: 2048, height: 1170 });
    // console.log(html);
    //
    // await page.setContent(html, { waitUntil: 'networkidle0' });
    // // await page.setContent('<iframe src="https://024a7516.ngrok.io/iframe_words?q=경찰" width="100" height="100" frameBorder="0"></iframe>');
    //
    // // await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' });
    //
    // // await page.evaluate(function() {
    // //   document.getElementsByClassName('heading')[0].innerHTML = '<bold>hah</bold> unbold 경찰'
    // //   document.getElementsByClassName('heading')[0].innerHTML = decodeURI("%EC%95%88"); // insert encoded '안'
    // // })
    //
    // const file = await page.screenshot({ type });

    // SELENIUM strategy - https://medium.com/@Moatazeldebsy/ui-testing-using-selenium-webdriver-and-chrome-inside-aws-lambda-77a17ec64862
    var options = new chrome.Options();
    options.setChromeBinaryPath(exePath);
    options.addArguments(['--headless']);
    await console.log("chrome OPTIONS: ");
    await console.dir(options);

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

// function base64toBlob(base64Data, contentType) {
//     contentType = contentType || '';
//     var sliceSize = 1024;
//     var byteCharacters = atob(base64Data);
//     var bytesLength = byteCharacters.length;
//     var slicesCount = Math.ceil(bytesLength / sliceSize);
//     var byteArrays = new Array(slicesCount);
//
//     for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//         var begin = sliceIndex * sliceSize;
//         var end = Math.min(begin + sliceSize, bytesLength);
//
//         var bytes = new Array(end - begin);
//         for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
//             bytes[i] = byteCharacters[offset].charCodeAt(0);
//         }
//         byteArrays[sliceIndex] = new Uint8Array(bytes);
//     }
//     var blobber = new Blob(byteArrays, { type: contentType });
//     // var buffer = new Buffer(blobber, "binary");
//     var buffer = toBuffer(blobber);
//
//     return buffer;
// }
