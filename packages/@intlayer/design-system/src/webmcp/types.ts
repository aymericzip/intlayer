/**
 * Minimal typings for the WebMCP browser API.
 *
 * The API is still evolving: Chrome's early preview exposes
 * `navigator.modelContext` (with `registerTool` / `unregisterTool` /
 * `provideContext` / `clearContext`), the `chrome://flags/#enable-webmcp-testing`
 * flag adds `navigator.modelContextTesting`, and the W3C draft moves the entry
 * point to `document.modelContext` with an `AbortSignal` based unregistration.
 * Every member is optional so a single adapter can drive all three shapes.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 */

/** JSON Schema describing a tool's input object. */
export type WebMCPJsonSchema = Record<string, unknown>;

/** Hints letting an agent decide whether a call needs user confirmation. */
export type WebMCPToolAnnotations = {
  /** The tool does not modify anything. */
  readOnlyHint?: boolean;
  /** The result carries content the page does not control (user data, remote text). */
  untrustedContentHint?: boolean;
  /** The tool performs an action that is hard to undo. */
  consequentialHint?: boolean;
};

export type WebMCPToolExecuteOptions = {
  signal?: AbortSignal;
};

/**
 * The value returned by a tool. Strings are handed to the agent verbatim,
 * anything else is JSON-serialized by the browser.
 */
export type WebMCPToolResult = string | Record<string, unknown> | unknown[];

/** A tool an agent can invoke through the WebMCP browser API. */
export type WebMCPTool<TInput = Record<string, unknown>> = {
  /** 1–128 chars, ASCII alphanumeric plus `_`, `-` and `.`. */
  name: string;
  title?: string;
  description: string;
  inputSchema?: WebMCPJsonSchema;
  annotations?: WebMCPToolAnnotations;
  execute: (
    input: TInput,
    options?: WebMCPToolExecuteOptions
  ) => Promise<WebMCPToolResult> | WebMCPToolResult;
};

export type WebMCPRegisterToolOptions = {
  /** Aborting unregisters the tool (W3C draft shape). */
  signal?: AbortSignal;
};

/** The subset of the `ModelContext` interface this package relies on. */
export type ModelContext = {
  registerTool?: (
    tool: WebMCPTool<never>,
    options?: WebMCPRegisterToolOptions
  ) => void | Promise<void>;
  unregisterTool?: (name: string) => void | Promise<void>;
  provideContext?: (context: { tools: WebMCPTool<never>[] }) => void;
  clearContext?: () => void;
};

/** `Navigator` and `Document` as extended by the WebMCP proposals. */
export type ModelContextHost = {
  modelContextTesting?: ModelContext;
  modelContext?: ModelContext;
};
