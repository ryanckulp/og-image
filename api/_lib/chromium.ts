import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await launch(options);

    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
    // chrome - default
    const page = await getPage(isDev);

    // ideas: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagescreenshotoptions

    await page.setViewport({ width: 2048, height: 1170 });
    console.log(html);
    
    // await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.setContent('<iframe src="https://024a7516.ngrok.io/iframe_words?q=경찰" width="100" height="100" frameBorder="0"></iframe>');
    // console.log("HTML: ", html);

    // await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' });
    // await page.goto('data:text/html,' + html, {waitUntil: 'networkidle2'});

    // await page.evaluate(function() {
    //   // document.getElementsByClassName('heading')[0].innerHTML = '<bold>hah</bold> unbold 경찰'
    //   document.getElementsByClassName('heading')[0].innerHTML = decodeURI("%EC%95%88"); // insert encoded '안'
    // })

    // const file = await page.screenshot({ type });
    //await page.screenshot({path: 'example-hangul.png'});

    const file = await page.screenshot({ type });
    return file;
}
