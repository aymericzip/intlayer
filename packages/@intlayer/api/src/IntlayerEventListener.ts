// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI, MessageEventData } from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';

import { getIntlayerAPI } from './getIntlayerAPI';

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
  private eventSource: EventSource | null = null;

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

  constructor(private intlayerConfig: IntlayerConfig = configuration) {}

  /**
   * Initializes the EventSource connection using the given intlayerConfig
   * (or the default config if none was provided).
   */
  public async initialize(): Promise<void> {
    const backendURL = this.intlayerConfig.editor.backendURL;

    // Retrieve the access token
    const oAuth2TokenResult = await getIntlayerAPI(
      {},
      this.intlayerConfig
    ).auth.getOAuth2AccessToken();
    const accessToken = oAuth2TokenResult.data?.accessToken;

    if (!accessToken) {
      throw new Error('Failed to retrieve access token');
    }

    if (oAuth2TokenResult.data?.organization.plan?.type !== 'ENTERPRISE') {
      throw new Error(
        'Hot reload is enabled, but is only available for enterprise plans'
      );
    }

    const API_ROUTE = `${backendURL}/api/event-listener`;
    const url = `${API_ROUTE}/${accessToken}`;

    this.eventSource = new EventSource(url);
    this.eventSource.onmessage = (event) => this.handleMessage(event);
    this.eventSource.onerror = (event) => this.handleError(event);
  }

  /**
   * Cleans up (closes) the EventSource connection.
   */
  public cleanup(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
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
                console.error('Unhandled dictionary status:', dataEl.status);
                break;
            }
            break;
          default:
            console.error('Unknown object type:', dataEl.object);
            break;
        }
      }
    } catch (error) {
      console.error('Error processing dictionary update:', error);
    }
  }

  /**
   * Handles any SSE errors and then performs cleanup.
   */
  private handleError(event: Event): void {
    console.error('EventSource error:', event);
    this.cleanup();
  }
}
