import { exec } from 'node:child_process';
import { platform } from 'node:os';

export const openBrowser = (url: string) => {
  const osPlatform = platform();
  let command = '';

  if (osPlatform === 'darwin') {
    command = `open "${url}"`;
  } else if (osPlatform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Failed to open browser: ${error.message}`);
    }
  });
};
