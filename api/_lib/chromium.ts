
// import { launch, Page } from 'puppeteer-core';
// import { getOptions } from './options';
import { FileType } from './types';
// let _page: Page | null;
// const b64buffer = require('base64-arraybuffer');

// SELENIUM strategy
const webdriver = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");

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
    console.log(isDev);
    console.log(html);

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

    // SELENIUM strategy
    console.log('type: ', type); // prevents 'declared but never used lint'
    var options = new chrome.Options();
    await console.log("chrome OPTIONS: ");
    await console.dir(options);

    var driver = new webdriver.Builder().withCapabilities(options).build();

    // driver.manage().window().setSize('500', '300');
    driver.manage().window().setRect({width: 2048, height: 1170, x: 0, y: 0});

    await driver.get('https://example.com');
    var html2 = '<p>Selenium 실험</p><img src="https://hanrhymes.com/hanrhymes-avatar.png">';
//     var html3 = `<!DOCTYPE html>
// <html>
//     <meta charset="utf-8">
//     <title>Generated Image</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
//     <style>
//
//     @font-face {
//         font-family: 'Arial';
//         font-style:  normal;
//         font-weight: normal;
//     }
//
//     @font-face {
//         font-family: 'Arial';
//         font-style:  normal;
//         font-weight: bold;
//     }
//
//     @font-face {
//         font-family: 'Arial';
//         font-style: normal;
//         font-weight: normal;
//       }
//
//     body {
//         background: white;
//         background-image: radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%);
//         background-size: 100px 100px;
//         height: 100vh;
//         display: flex;
//         text-align: center;
//         align-items: center;
//         justify-content: center;
//     }
//
//     code {
//         color: #D400FF;
//         font-family: 'Arial';
//         white-space: pre-wrap;
//         letter-spacing: -5px;
//     }
//
//     .logo-wrapper {
//         display: flex;
//         align-items: center;
//         align-content: center;
//         justify-content: center;
//         justify-items: center;
//     }
//
//     .logo {
//         margin: 0 75px;
//     }
//
//     .plus {
//         color: #BBB;
//         font-family: Arial, Times New Roman, Verdana;
//         font-size: 100px;
//     }
//
//     .spacer {
//         margin: 150px;
//     }
//
//     .emoji {
//         height: 1em;
//         width: 1em;
//         margin: 0 .05em 0 .1em;
//         vertical-align: -0.1em;
//     }
//
//     .heading {
//         font-family: 'Arial', sans-serif;
//         font-size: 100px;
//         font-style: normal;
//         color: black;
//         line-height: 1.8;
//     }
//     </style>
//     <body>
//         <div>
//             <div class="spacer">
//             <div class="logo-wrapper">
//                 <img
//         class="logo"
//         alt="Generated Image"
//         src=""
//         width="auto"
//         height="225"
//     />
//             </div>
//             <div class="spacer">
//             <div class="heading">test-<code>시험</code>-test
//                 <p>경차</p>
//
//             </div>
//         </div>
//     </body>
// </html>`;

    await driver.get(`data:text/html;charset=utf-8,${html2}`);
    var title = await driver.getTitle();
    console.log('PAGE TITLE: ', title);

    var file;
    await driver.takeScreenshot().then(data => {
      // file = base64toBlob(data, 'png'); // Blob
      // file = b64buffer.decode(data); // ArrayBuffer, needs to be Buffer
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
