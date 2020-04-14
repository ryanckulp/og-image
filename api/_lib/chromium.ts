import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: Page | null;

// const delay = ms => new Promise(res => setTimeout(res, ms));

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
    await page.evaluateHandle('document.fonts.ready');
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);
    // await delay(2000); // check if font loads in prod
    const file = await page.screenshot({ type });
    return file;
}
