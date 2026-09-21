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

  for (const tool of tools) {
    try {
      void modelContext.registerTool(toSafeTool(tool), {
        signal: abortController.signal,
      });
      registeredNames.push(tool.name);
    } catch (error) {
      console.warn(`[WebMCP] Could not register tool "${tool.name}"`, error);
    }
  }

  return () => {
    abortController.abort();

    if (typeof modelContext.unregisterTool !== 'function') return;

    for (const name of registeredNames) {
      try {
        void modelContext.unregisterTool(name);
      } catch {
        // Already gone (page-level clearContext, abort handled it, …).
      }
    }
  };
};
