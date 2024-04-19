export type NoteStackTraceInfo = {
  file?: string;
  line?: string;
  column?: string;
};

/**
 * Get the file path, line number, and column number of the caller of this function
 * Return an object containing file, line, and column numbers
 */
export const getStackTraceInfo = (): NoteStackTraceInfo => {
  // Create a new Error object to capture the stack trace
  const err = new Error();
  const stack = err.stack ?? '';

  // Split the stack trace into lines and find the line where this function was called
  // Adjust the line index as necessary based on how your environment's stack trace format
  const stackLines = stack.split('\n');
  const callerLine = stackLines[2] ?? ''; // Adjust the index 2 if needed

  // Extract file path, line number, and column number using a regular expression
  // This regex pattern might need adjustments based on your environment
  const match = callerLine.match(/at\s[^(:]+\([^:]+:(\d+):(\d+)\)?/);

  // const file = match?.[1];
  const line = match?.[1];
  const column = match?.[2];

  if (match) {
    return {
      // file,
      line,
      column,
    };
  }

  // Return empty object if parsing fails
  return {};
};
