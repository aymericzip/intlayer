import { loadingContentPlaceholder } from '@intlayer/core/dictionaryManipulator';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from './installIntlayer';

/**
 * Proxy type returned by every `use*` hook in `lit-intlayer`.
 *
 * Wraps the translated content object with a reactive `.observe()` method so
 * Lit elements participate in the reactive update cycle via a
 * {@link IntlayerBinding} `ReactiveController`.
 *
 * ```ts
 * private content = useIntlayer('app').observe(this);
 * private content = useDictionary(_hash).observe(this);
 * private content = useDictionaryDynamic(_dyn, 'app').observe(this);
 * ```
 */
export type IntlayerLitProxy<T> = T & {
  observe: (host: ReactiveControllerHost) => IntlayerLitProxy<T>;
};

/**
 * `ReactiveController` that keeps a Lit element in sync with Intlayer locale
 * changes and, optionally, async dictionary load events.
 *
 * Registered automatically by `.observe(this)` — you should never need to
 * instantiate it directly.
 *
 * @param host         - The Lit element to update.
 * @param onConnect    - Called inside `hostConnected` (after locale subscription
 *                       is set up). Useful for triggering an immediate update
 *                       when the dictionary is already cached.
 * @param onDisconnect - Called inside `hostDisconnected`. Useful for removing
 *                       the host from a dictionary's update-host registry.
 */
export class IntlayerBinding implements ReactiveController {
  private host: ReactiveControllerHost;
  private unsubscribeLocale: (() => void) | null = null;
  private readonly onConnect?: () => void;
  private readonly onDisconnect?: () => void;

  constructor(
    host: ReactiveControllerHost,
    onConnect?: () => void,
    onDisconnect?: () => void
  ) {
    this.host = host;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this.unsubscribeLocale = client.subscribe(() => {
      this.host.requestUpdate();
    });
    this.onConnect?.();
  }

  hostDisconnected(): void {
    this.unsubscribeLocale?.();
    this.unsubscribeLocale = null;
    this.onDisconnect?.();
  }
}

/** The client context a content proxy reads for. */
export type ContentReadContext = {
  contextLocale: LocalesValues;
  contextVariant: ProviderVariant | undefined;
};

/**
 * Reads the content of a context: `{ content }` when available right away,
 * else `undefined`, calling `onLoad` once the content lands.
 */
export type ContentReader = (
  context: ContentReadContext,
  onLoad: (content: unknown) => void
) => { content: unknown } | undefined;

/**
 * Wraps content read for the client's locale and variant (read again whenever
 * either changes) in an {@link IntlayerLitProxy}. Chain `.observe(this)` so
 * the host re-renders on locale changes and once loading content lands; while
 * the first content loads, every access renders `''`. Shared by `useDictionary`,
 * `useIntlayer` and `useDictionaryDynamic`.
 */
export const createContentProxy = <Content>(
  readContent: ContentReader
): IntlayerLitProxy<Content> => {
  const client = getIntlayerClient();
  const hosts = new Set<ReactiveControllerHost>();

  let current: { content: unknown } | undefined;
  let readLocale: LocalesValues | undefined;
  let readVariant: ProviderVariant | undefined;
  let hasRead = false;

  const getContent = (): { content: unknown } | undefined => {
    if (
      !hasRead ||
      readLocale !== client.locale ||
      readVariant !== client.variant
    ) {
      hasRead = true;
      readLocale = client.locale;
      readVariant = client.variant;

      // A pending read keeps the previous content on screen until it lands
      const settled = readContent(
        { contextLocale: client.locale, contextVariant: client.variant },
        (content) => {
          current = { content };
          for (const host of hosts) host.requestUpdate();
        }
      );

      if (settled) current = settled;
    }

    return current;
  };

  getContent();

  const proxy: IntlayerLitProxy<Content> = new Proxy({} as any, {
    get(_target, property) {
      if (property === 'observe') {
        return (host: ReactiveControllerHost) => {
          hosts.add(host);
          new IntlayerBinding(
            host,
            // Content that landed before the host connected
            () => {
              if (current) host.requestUpdate();
            },
            () => hosts.delete(host)
          );

          return proxy;
        };
      }

      // Lit detects directives / template results via `_$`-prefixed keys
      if (
        property === 'then' ||
        (typeof property === 'string' && property.startsWith('_$'))
      ) {
        return undefined;
      }

      const loaded = getContent();

      if (!loaded) return loadingContentPlaceholder[property];

      const content = loaded.content as any;

      if (property === Symbol.toPrimitive) {
        return () => content?.[Symbol.toPrimitive]?.() ?? '';
      }
      if (property === 'toString') {
        return () => String(content?.toString?.() ?? '');
      }

      return content?.[property];
    },
  });

  return proxy;
};
