import puppeteer, { type Browser } from 'puppeteer';

export const launchBrowser = (): Promise<Browser> =>
  puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
      '--disable-software-rasterizer',
      '--disable-features=Translate,BackForwardCache',
    ],
    pipe: true,
    dumpio: true,
  });
