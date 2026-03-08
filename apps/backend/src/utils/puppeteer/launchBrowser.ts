import puppeteer, {
  type Browser,
  type PuppeteerLaunchOptions,
} from 'puppeteer';

const defaultArgs = [
  '--headless',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--no-zygote',
  '--disable-software-rasterizer',
  '--disable-features=Translate,BackForwardCache',
];

export const launchBrowser = (
  overrides?: PuppeteerLaunchOptions
): Promise<Browser> =>
  puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: defaultArgs,
    pipe: true,
    dumpio: true,
    ...overrides,
  });
