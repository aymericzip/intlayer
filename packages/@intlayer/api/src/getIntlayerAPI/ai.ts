import type {
  AIOptions,
  AIRoutes,
  AskDocQuestionResult,
  AuditContentDeclarationBody,
  AuditContentDeclarationFieldBody,
  AuditContentDeclarationFieldResult,
  AuditContentDeclarationMetadataBody,
  AuditContentDeclarationMetadataResult,
  AuditContentDeclarationResult,
  AuditTagBody,
  AuditTagResult,
  AutocompleteResponse,
  aiContract,
  ChatCompletionRequestMessage,
  ChatResult,
  CustomQueryBody,
  CustomQueryResult,
  GetAIStatsResult,
  GetDiscussionsParams,
  GetDiscussionsResult,
  TranslateJSONBody,
  TranslateJSONResult,
} from '@intlayer/backend-contract/ai';
import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type AutocompleteBody = {
  text: string;
  aiOptions?: AIOptions;
  contextBefore?: string;
  currentLine?: string;
  contextAfter?: string;
};

export type AskDocQuestionBody = {
  messages: ChatCompletionRequestMessage[];
  discussionId: string;
  onMessage?: (chunk: string) => void;
  onDone?: (response: AskDocQuestionResult) => void;
};

export type ClientAction =
  | { type: 'navigate'; path: string }
  | { type: 'invalidate_queries' };

export type ChatBody = {
  messages: ChatCompletionRequestMessage[];
  discussionId: string;
  onMessage?: (chunk: string) => void;
  onDone?: (response: ChatResult) => void;
  onAction?: (action: ClientAction) => void;
};

export type { AskDocQuestionResult, ChatResult };

/** Prefix of the routes, checked against the backend contract. */
const aiGroup = {
  prefix: '/api/ai',
} as const satisfies Pick<typeof aiContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const aiEndpoints = {
  customQuery: { method: 'POST', path: '/' },
  translateJSON: { method: 'POST', path: '/translate/json' },
  auditContentDeclaration: { method: 'POST', path: '/audit/dictionary' },
  auditContentDeclarationField: {
    method: 'POST',
    path: '/audit/dictionary/field',
  },
  auditContentDeclarationMetadata: {
    method: 'POST',
    path: '/audit/dictionary/metadata',
  },
  auditTag: { method: 'POST', path: '/audit/tag' },
  ask: { method: 'POST', path: '/ask' },
  chat: { method: 'POST', path: '/chat' },
  autocomplete: { method: 'POST', path: '/autocomplete' },
  getDiscussions: { method: 'GET', path: '/discussions' },
  getAIStats: { method: 'GET', path: '/stats' },
} as const satisfies RouteEndpoints<AIRoutes>;

export const getAiAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Custom query
   * @param body - Custom query parameters.
   * @returns Custom query result.
   */
  const customQuery = async (
    body?: CustomQueryBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<CustomQueryResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.customQuery),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.customQuery.method,
        body: body,
      }
    );

  /**
   * Translate a JSON
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const translateJSON = async (
    body?: TranslateJSONBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<TranslateJSONResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.translateJSON),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.translateJSON.method,
        body: body,
      }
    );

  /**
   * Audits a content declaration file
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclaration = async (
    body?: AuditContentDeclarationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.auditContentDeclaration),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.auditContentDeclaration.method,
        body: body,
      }
    );

  /**
   * Audits a content declaration field
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclarationField = async (
    body?: AuditContentDeclarationFieldBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationFieldResult>(
      buildRouteURL(
        backendURL,
        aiGroup,
        aiEndpoints.auditContentDeclarationField
      ),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.auditContentDeclarationField.method,
        body: body,
      }
    );

  /**
   * Audits a content declaration file to retrieve title, description and tags
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclarationMetadata = async (
    body?: AuditContentDeclarationMetadataBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationMetadataResult>(
      buildRouteURL(
        backendURL,
        aiGroup,
        aiEndpoints.auditContentDeclarationMetadata
      ),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.auditContentDeclarationMetadata.method,
        body: body,
      }
    );

  /**
   * Audits a tag
   * @param body - Audit tag parameters.
   * @returns Audited tag content.
   */
  const auditTag = async (
    body?: AuditTagBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditTagResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.auditTag),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.auditTag.method,
        body: body,
      }
    );

  /**
   * Asks a question to the AI related to the documentation **and streams the
   * answer as Server‑Sent Events (SSE)**.
   *
   * The function **returns immediately** with a handle exposing:
   * - `promise` → resolves when the stream completes (or rejects on error)
   * - `abort()` → allows canceling the request on demand
   *
   * Usage example:
   * ```ts
   * const { promise, abort } = ai.askDocQuestion({
   *   ...body,
   *   onMessage: console.log,
   *   onDone: (full) => console.log("✔", full),
   * });
   * // later → abort();
   * await promise; // waits for completion if desired
   * ```
   */
  const askDocQuestion = async (
    body?: AskDocQuestionBody,
    otherOptions: FetcherOptions = {}
  ) => {
    if (!body) return;

    const { onMessage, onDone, ...rest } = body;
    const abortController = new AbortController();

    try {
      const response = await fetch(
        buildRouteURL(backendURL, aiGroup, aiEndpoints.ask),
        {
          method: aiEndpoints.ask.method,
          headers: {
            'Content-Type': 'application/json',
            ...authAPIOptions.headers,
            ...otherOptions.headers,
          },
          body: JSON.stringify({
            ...rest,
            ...authAPIOptions.body,
            ...otherOptions.body,
          }),
          signal: abortController.signal,
          credentials: 'include',
        }
      );

      if (!response.ok) {
        // Align error handling with generic `fetcher` utility so that callers receive
        // meaningful messages (e.g. for 429 "Too Many Requests" responses).
        let errorMessage: string = 'An error occurred';

        try {
          // Attempt to parse JSON error payload produced by backend
          const errorData = await response.json();
          const errorObj = errorData.error ?? errorData;
          errorMessage = JSON.stringify(errorObj) ?? 'An error occurred';
        } catch {
          // Fallback to plain-text body or HTTP status text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
          } catch {
            // ignore – we already have a default message
          }
        }

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                onMessage?.(data.chunk);
              }
              if (data.done && data.response) {
                onDone?.(data.response);
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in askDocQuestion:', error);
      throw error;
    }
  };

  const chat = async (body?: ChatBody, otherOptions: FetcherOptions = {}) => {
    if (!body) return;

    const { onMessage, onDone, onAction, ...rest } = body;
    const abortController = new AbortController();

    try {
      const response = await fetch(
        buildRouteURL(backendURL, aiGroup, aiEndpoints.chat),
        {
          method: aiEndpoints.chat.method,
          headers: {
            'Content-Type': 'application/json',
            ...authAPIOptions.headers,
            ...otherOptions.headers,
          },
          body: JSON.stringify({
            ...rest,
            ...authAPIOptions.body,
            ...otherOptions.body,
          }),
          signal: abortController.signal,
          credentials: 'include',
        }
      );

      if (!response.ok) {
        let errorMessage: string = 'An error occurred';

        try {
          const errorData = await response.json();
          const errorObj = errorData.error ?? errorData;
          errorMessage = JSON.stringify(errorObj) ?? 'An error occurred';
        } catch {
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
          } catch {
            // ignore
          }
        }

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                onMessage?.(data.chunk);
              }
              if (data.action) {
                onAction?.(data.action);
              }
              if (data.done && data.response) {
                onDone?.(data.response);
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in chat:', error);
      throw error;
    }
  };

  const autocomplete = async (
    body?: AutocompleteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AutocompleteResponse>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.autocomplete),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.autocomplete.method,
        body: body,
      }
    );

  /**
   * Retrieves discussions with filters and pagination. Only user or admin can access.
   */
  const getDiscussions = async (
    params?: GetDiscussionsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetDiscussionsResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.getDiscussions),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.getDiscussions.method,
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params,
      }
    );

  /**
   * Retrieves aggregated AI token-usage statistics for the currently selected
   * project.
   */
  const getAIStats = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAIStatsResult>(
      buildRouteURL(backendURL, aiGroup, aiEndpoints.getAIStats),
      authAPIOptions,
      otherOptions,
      {
        method: aiEndpoints.getAIStats.method,
      }
    );

  return {
    customQuery,
    translateJSON,
    auditContentDeclaration,
    auditContentDeclarationField,
    auditContentDeclarationMetadata,
    auditTag,
    askDocQuestion,
    chat,
    autocomplete,
    getDiscussions,
    getAIStats,
  };
};

/**
 * Authenticated `ai` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const aiEndpoint = createEndpoint(getAiAPI);
