import chrome from 'chrome-aws-lambda';
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    let options: Options;

    if (isDev) {
        options = {
            args: [], // was [], then ['--disable-web-security']
            executablePath: exePath,
            headless: false // was true
        };
    } else {
        var newArgs = chrome.args;
        newArgs.push('--disable-web-security'); // added to render hangul in prod
        newArgs.push('--lang=ko-KR,ko');

        options = {
            args: newArgs, // before: chrome.args
            executablePath: await chrome.executablePath,
            headless: false, // was chrome.headless
        };
    }

    console.dir(options);
    return options;
}
