import { getIntlayerAPIProxy } from '@intlayer/api';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI, MessageEventData } from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { type IntlayerConfig, getAppLogger } from '@intlayer/config/client';
import { EventSource } from 'eventsource';

export type IntlayerMessageEvent = MessageEvent;

/**
 * IntlayerEventListener class to listen for dictionary changes via SSE (Server-Sent Events).
 *
 * Usage example:
 *
 *   import { buildIntlayerDictionary } from './transpiler/declaration_file_to_dictionary/intlayer_dictionary';
 *   import { IntlayerEventListener } from '@intlayer/api';
 *
 *   export const checkDictionaryChanges = async () => {
 *     // Instantiate the listener
 *     const eventListener = new IntlayerEventListener();
 *
 *     // Set up your callbacks
 *     eventListener.onDictionaryChange = async (dictionary) => {
 *       await buildIntlayerDictionary(dictionary);
 *     };
 *
 *     // Initialize the listener
 *     await eventListener.initialize();
 *
 *     // Optionally, clean up later when you’re done
 *     // eventListener.cleanup();
 *   };
 */
export class IntlayerEventListener {
  private appLogger = getAppLogger(configuration);

  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private isManuallyDisconnected = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  /**
   * Callback triggered when a Dictionary is ADDED.
   */
  public onDictionaryAdded?: (dictionary: DictionaryAPI) => any;

  /**
   * Callback triggered when a Dictionary is UPDATED.
   */
  public onDictionaryChange?: (dictionary: DictionaryAPI) => any;

  /**
   * Callback triggered when a Dictionary is DELETED.
   */
  public onDictionaryDeleted?: (dictionary: DictionaryAPI) => any;

  /**
   * Callback triggered when connection is established or re-established.
   */
  public onConnectionOpen?: () => any;

  /**
   * Callback triggered when connection encounters an error.
   */
  public onConnectionError?: (error: Event) => any;

  constructor(private intlayerConfig: IntlayerConfig = configuration) {
    this.appLogger = getAppLogger(this.intlayerConfig);
  }

  /**
   * Initializes the EventSource connection using the given intlayerConfig
   * (or the default config if none was provided).
   */
  public async initialize(): Promise<void> {
    this.isManuallyDisconnected = false;
    await this.connect();
  }

  /**
   * Establishes the EventSource connection with automatic reconnection support.
   */
  private async connect(): Promise<void> {
    try {
      const backendURL = this.intlayerConfig.editor.backendURL;

      // Retrieve the access token via proxy
      const accessToken = await getIntlayerAPIProxy(
        undefined,
        this.intlayerConfig
      ).oAuth.getOAuth2AccessToken();

      if (!accessToken) {
        throw new Error('Failed to retrieve access token');
      }

      const API_ROUTE = `${backendURL}/api/event-listener`;

      // Close existing connection if any
      if (this.eventSource) {
        this.eventSource.close();
      }

      this.eventSource = new EventSource(API_ROUTE, {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            headers: {
              ...(init?.headers ?? {}),
              Authorization: `Bearer ${accessToken.data?.accessToken}`,
            },
          }),
      });

      this.eventSource.onopen = () => {
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000; // Reset delay
        this.onConnectionOpen?.();
      };

      this.eventSource.onmessage = (event) => this.handleMessage(event);
      this.eventSource.onerror = (event) => this.handleError(event);
    } catch (error) {
      this.appLogger('Failed to establish EventSource connection:', {
        level: 'error',
      });
      this.scheduleReconnect();
    }
  }

  /**
   * Cleans up (closes) the EventSource connection.
   */
  public cleanup(): void {
    this.isManuallyDisconnected = true;

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  /**
   * Schedules a reconnection attempt with exponential backoff.
   */
  private scheduleReconnect(): void {
    if (
      this.isManuallyDisconnected ||
      this.reconnectAttempts >= this.maxReconnectAttempts
    ) {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.appLogger(
          [
            `Max reconnection attempts (${this.maxReconnectAttempts}) reached. Giving up.`,
          ],
          {
            level: 'error',
          }
        );
      }
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

    this.appLogger(
      `Scheduling reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`
    );

    this.reconnectTimeout = setTimeout(async () => {
      if (!this.isManuallyDisconnected) {
        await this.connect();
      }
    }, delay);
  }

  /**
   * Handles incoming SSE messages, parses the event data,
   * and invokes the appropriate callback.
   */
  private async handleMessage(event: IntlayerMessageEvent): Promise<void> {
    try {
      const { data } = event;

      const dataJSON: MessageEventData[] = JSON.parse(data);

      for (const dataEl of dataJSON) {
        switch (dataEl.object) {
          case 'DICTIONARY':
            switch (dataEl.status) {
              case 'ADDED':
                await this.onDictionaryAdded?.(dataEl.data);
                break;
              case 'UPDATED':
                await this.onDictionaryChange?.(dataEl.data);
                break;
              case 'DELETED':
                await this.onDictionaryDeleted?.(dataEl.data);
                break;
              default:
                this.appLogger(
                  ['Unhandled dictionary status:', dataEl.status],
                  {
                    level: 'error',
                  }
                );
                break;
            }
            break;
          default:
            this.appLogger(['Unknown object type:', dataEl.object], {
              level: 'error',
            });
            break;
        }
      }
    } catch (error) {
      this.appLogger(['Error processing dictionary update:', error], {
        level: 'error',
      });
    }
  }

  /**
   * Handles any SSE errors and attempts reconnection if appropriate.
   */
  private handleError(event: Event): void {
    const errorEvent = event as any;

    // Log detailed error information
    this.appLogger(
      [
        'EventSource error:',
        {
          type: errorEvent.type,
          message: errorEvent.message,
          code: errorEvent.code,
          readyState: this.eventSource?.readyState,
          url: this.eventSource?.url,
        },
      ],
      {
        level: 'error',
      }
    );

    // Notify error callback
    this.onConnectionError?.(event);

    // Check if this is a connection close error
    const isConnectionClosed =
      errorEvent.type === 'error' &&
      (errorEvent.message?.includes('terminated') ||
        errorEvent.message?.includes('closed') ||
        this.eventSource?.readyState === EventSource.CLOSED);

    if (isConnectionClosed && !this.isManuallyDisconnected) {
      this.appLogger(
        'Connection was terminated by server, attempting to reconnect...'
      );
      this.scheduleReconnect();
    } else {
      // For other types of errors, close the connection
      this.cleanup();
    }
  }
}
