import { ANSIColors, colorize } from '../logger';

export const logStack = (
  message: string,
  options: { limit: number } = { limit: 50 }
) => {
  Error.stackTraceLimit = options.limit;

  try {
    throw new Error('test');
  } catch (error) {
    console.log(colorize(message, ANSIColors.YELLOW));
    console.log(colorize((error as Error).stack ?? '', ANSIColors.BLUE));
  }
};
