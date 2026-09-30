/**
 * Whether the process can prompt: both stdin and stdout are attached to a
 * terminal. False for AI agents, CI and piped runs, where a prompt would print
 * and exit without an answer.
 */
export const isInteractiveTerminal = (): boolean =>
  Boolean(process.stdin.isTTY && process.stdout.isTTY);
