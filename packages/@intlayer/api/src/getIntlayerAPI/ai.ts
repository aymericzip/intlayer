import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from '../fetcher';
import type {
  AskDocQuestionResult,
  AuditContentDeclarationBody,
  AuditContentDeclarationFieldBody,
  AuditContentDeclarationFieldResult,
  AuditContentDeclarationMetadataBody,
  AuditContentDeclarationMetadataResult,
  AuditContentDeclarationResult,
  AuditTagBody,
  AuditTagResult,
  AutocompleteBody,
  AutocompleteResponse,
  ChatCompletionRequestMessage,
  CustomQueryBody,
  CustomQueryResult,
  TranslateJSONBody,
  TranslateJSONResult,
} from '../types';

export type AskDocQuestionBody = {
  messages: ChatCompletionRequestMessage[];
  discutionId: string;
  onMessage?: (chunk: string) => void;
  onDone?: (response: AskDocQuestionResult) => void;
};

export type { AskDocQuestionResult };

export const getAiAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const AI_API_ROUTE = `${backendURL}/api/ai`;

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
      AI_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AI_API_ROUTE}/translate/json`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AI_API_ROUTE}/audit/dictionary`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AI_API_ROUTE}/audit/dictionary/field`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AI_API_ROUTE}/audit/dictionary/metadata`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AI_API_ROUTE}/audit/tag`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      const response = await fetch(`${AI_API_ROUTE}/ask`, {
        method: 'POST',
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
      });

      if (!response.ok) {
        // Align error handling with generic `fetcher` utility so that callers receive
        // meaningful messages (e.g. for 429 "Too Many Requests" responses).
        let errorMessage: string = 'An error occurred';

        try {
          // Attempt to parse JSON error payload produced by backend
          const errorData = await response.json();
          errorMessage = JSON.stringify(errorData.error) ?? 'An error occurred';
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

  const autocomplete = async (
    body?: AutocompleteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AutocompleteResponse>(
      `${AI_API_ROUTE}/autocomplete`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
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
    autocomplete,
  };
};
