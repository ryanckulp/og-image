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
    const page = await getPage(isDev);
    await page.setViewport({ width: 2048, height: 1170 });

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ko'
    });

    await page.setContent(html);
    // await page.setContent('<div class="heading">delete-me</div>');

    console.log("HTML: ", html);
    // await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' });
    // await page.goto('data:text/html,' + html, {waitUntil: 'networkidle2'});

    // await page.evaluate(function() {
    //   // document.getElementsByClassName('heading')[0].innerHTML = '<bold>hah</bold> unbold 경찰'
    //   document.getElementsByClassName('heading')[0].innerHTML = decodeURI("%EC%95%88"); // insert encoded '안'
    // })

    const file = await page.screenshot({ type });
    return file;
}
