export const logStack = (
  message: string,
  options: { limit: number } = { limit: 50 }
) => {
  Error.stackTraceLimit = options.limit;

  try {
    throw new Error('test');
  } catch (error) {
    console.log(message);
    console.log((error as Error).stack);
  }
};
