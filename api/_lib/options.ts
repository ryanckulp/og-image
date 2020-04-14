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

    var customArgs = [
       '--disable-background-timer-throttling',
       '--disable-breakpad',
       '--disable-client-side-phishing-detection',
       '--disable-cloud-import',
       '--disable-default-apps',
       '--disable-dev-shm-usage',
       '--disable-extensions',
       '--disable-gesture-typing',
       '--disable-hang-monitor',
       '--disable-infobars',
       '--disable-notifications',
       '--disable-offer-store-unmasked-wallet-cards',
       '--disable-offer-upload-credit-cards',
       '--disable-popup-blocking',
       '--disable-print-preview',
       '--disable-prompt-on-repost',
       '--disable-setuid-sandbox',
       '--disable-speech-api',
       '--disable-sync',
       '--disable-tab-for-desktop-share',
       '--disable-translate',
       '--disable-voice-input',
       '--disable-wake-on-wifi',
       '--disk-cache-size=33554432',
       // '--enable-async-dns',
       // '--enable-simple-cache-backend',
       // '--enable-tcp-fast-open',
       // '--enable-webgl',
       // '--hide-scrollbars',
       // '--ignore-gpu-blacklist',
       // '--media-cache-size=33554432',
       // '--metrics-recording-only',
       // '--mute-audio',
       // '--no-default-browser-check',
       // '--no-first-run',
       // '--no-pings',
       // '--no-sandbox',
       // '--no-zygote',
       // '--password-store=basic',
       // '--prerender-from-omnibox=disabled',
       // '--use-gl=swiftshader',
       // '--use-mock-keychain',
       // '--memory-pressure-off',
       // '--single-process'
    ]

    if (isDev) {
        options = {
            args: customArgs, // was [], then ['--disable-web-security']
            executablePath: exePath,
            headless: false // was true
        };
    } else {
        // var newArgs = chrome.args;
        // newArgs.push('--disable-web-security'); // added to render hangul in prod

        options = {
            args: customArgs, // before: chrome.args
            executablePath: await chrome.executablePath,
            headless: false, // was chrome.headless
        };
    }

    console.dir(options);
    return options;
}
