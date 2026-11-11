import { getModelContext } from './getModelContext';
import type {
  ModelContext,
  WebMCPTool,
  WebMCPToolExecuteOptions,
  WebMCPToolResult,
} from './types';

/** Serializes a tool result the way the browser would, for logging and errors. */
export const formatToolResult = (result: WebMCPToolResult): string =>
  typeof result === 'string' ? result : JSON.stringify(result, null, 2);

/**
 * Wraps `execute` so a thrown error reaches the agent as a readable message
 * instead of a rejected promise the browser may surface opaquely.
 */
const toSafeTool = <TInput>(tool: WebMCPTool<TInput>): WebMCPTool<TInput> => ({
  ...tool,
  execute: async (input: TInput, options?: WebMCPToolExecuteOptions) => {
    try {
      return await tool.execute(input, options);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return `Tool "${tool.name}" failed: ${message}`;
    }
  },
});

/** Rejection raised when the `tools` permissions policy is denied (iframes). */
const isPermissionDeniedError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'NotAllowedError';

/**
 * Runs a WebMCP call that may throw synchronously or return a rejecting
 * promise (Chrome rejects asynchronously), routing both to `onError` so no
 * rejection goes unhandled.
 *
 * @returns `false` when the call threw synchronously.
 */
const runModelContextCall = (
  call: () => void | Promise<void>,
  onError: (error: unknown) => void
): boolean => {
  try {
    const result = call();

    if (result instanceof Promise) result.catch(onError);

    return true;
  } catch (error) {
    onError(error);

    return false;
  }
};

/**
 * Registers tools with the WebMCP API and returns a function undoing it.
 *
 * Unregistration goes through `unregisterTool(name)` when the browser has it,
 * and through the `AbortSignal` handed to `registerTool` otherwise. Without a
 * model context the call is a no-op returning a no-op, so callers do not need
 * to feature-detect.
 *
 * @param tools - Tools to expose. Names must be unique within the page.
 * @param modelContext - Defaults to the entry point of the current browser.
 * @returns A cleanup function removing every tool this call registered.
 */
export const registerWebMCPTools = (
  tools: WebMCPTool<never>[],
  modelContext: ModelContext | null = getModelContext()
): (() => void) => {
  if (!modelContext?.registerTool) return () => {};

  const abortController = new AbortController();
  const registeredNames: string[] = [];

  const registerTool = modelContext.registerTool.bind(modelContext);
  let isPermissionDenied = false;

  const handleRegistrationError = (toolName: string, error: unknown): void => {
    // A denied policy rejects every tool: stay silent, it is not a bug.
    if (isPermissionDeniedError(error)) {
      isPermissionDenied = true;
      return;
    }

    console.warn(`[WebMCP] Could not register tool "${toolName}"`, error);
  };

  for (const tool of tools) {
    if (isPermissionDenied) break;

    const isCallAccepted = runModelContextCall(
      () => registerTool(toSafeTool(tool), { signal: abortController.signal }),
      (error) => handleRegistrationError(tool.name, error)
    );

    if (isCallAccepted) registeredNames.push(tool.name);
  }

  return () => {
    abortController.abort();

    if (typeof modelContext.unregisterTool !== 'function') return;

    const unregisterTool = modelContext.unregisterTool.bind(modelContext);

    for (const name of registeredNames) {
      // Already gone (page-level clearContext, abort handled it, …).
      runModelContextCall(
        () => unregisterTool(name),
        () => {}
      );
    }
  };
};
