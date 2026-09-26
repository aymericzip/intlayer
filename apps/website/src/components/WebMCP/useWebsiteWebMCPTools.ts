import {
  getLocalizedUrl,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import { useSearchAPI, useUser } from '@intlayer/design-system/api';
import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import {
  App_Auth_Demo_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Dashboard,
  LlmsTxt_Path,
} from '@intlayer/design-system/routes';
import type { DocMetadata } from '@intlayer/docs';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import {
  createDocSearchIndex,
  getSearchableDocs,
  searchDocIndex,
} from '~/components/DocPage/Search/docSearchIndex';

const DEFAULT_SEARCH_LIMIT = 8;
const MAX_SEARCH_LIMIT = 30;

type SearchDocumentationInput = { query: string; limit?: number };
type GetDocumentationPageInput = { path: string };
type NavigateToPageInput = { path: string };
type SetLocaleInput = { locale: string };
type OpenAuthenticationInput = {
  mode?: 'login' | 'register' | 'demo';
  redirectPath?: string;
};

const AUTHENTICATION_PATHS: Record<
  NonNullable<OpenAuthenticationInput['mode']>,
  string
> = {
  login: App_Auth_SignIn_Path,
  register: App_Auth_SignUp_Path,
  demo: App_Auth_Demo_Path,
};

/** Strips the site origin so a metadata URL becomes a router path. */
const toRelativeDocPath = (url: string): string =>
  url.replace(import.meta.env.VITE_URL ?? '', '') || '/';

/** Rejects anything an injected page could aim at another host. */
const resolveSameOriginPath = (path: string): URL | null => {
  const target = new URL(path, window.location.origin);
  return target.origin === window.location.origin ? target : null;
};

/**
 * Every documentation page is also published as raw markdown under the same
 * path with a `.md` extension (`/blog/intlayer-with-react-i18next.md`).
 */
const toMarkdownPathname = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '') || '/';
  return trimmed.endsWith('.md') ? trimmed : `${trimmed}.md`;
};

const toSearchResult = (doc: DocMetadata) => ({
  title: doc.title,
  description: doc.description,
  path: toRelativeDocPath(doc.url),
  url: doc.url,
  docKey: doc.docKey,
});

/**
 * Site-wide tools exposed to browser agents on every page of intlayer.org:
 * documentation discovery, navigation, locale switching and the hand-off to
 * the dashboard's authentication.
 */
export const useWebsiteWebMCPTools = (): AnyWebMCPTool[] => {
  const { locale, availableLocales, setLocale } = useLocale();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const searchAPI = useSearchAPI();

  /** Re-localizes a path an agent may pass with or without a locale prefix. */
  const localizePath = (path: string): string =>
    getLocalizedUrl(getPathWithoutLocale(path, availableLocales), locale);

  const searchDocumentation: AnyWebMCPTool = {
    name: 'searchIntlayerDocumentation',
    description:
      "Search Intlayer's documentation, blog posts and FAQ by keywords or a question. Returns the most relevant pages with their title, description and path; read a page with `getIntlayerDocumentationPage` or open it with `openPage`.",
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords or a question.' },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: MAX_SEARCH_LIMIT,
          description: `Maximum number of results (default ${DEFAULT_SEARCH_LIMIT}).`,
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async ({ query, limit }: SearchDocumentationInput, options) => {
      const resultLimit = Math.min(
        Math.max(limit ?? DEFAULT_SEARCH_LIMIT, 1),
        MAX_SEARCH_LIMIT
      );
      const docs = await getSearchableDocs(locale);
      const results = searchDocIndex(createDocSearchIndex(docs), query);

      // The semantic backend search complements the fuzzy title match; it is
      // best effort and must not take the whole search down.
      try {
        const response = await searchAPI.searchDoc(
          { input: query },
          { signal: options?.signal }
        );
        const seenDocKeys = new Set(results.map((doc) => doc.docKey));

        for (const docKey of response.data ?? []) {
          const doc = docs.find((candidate) => candidate.docKey === docKey);
          if (doc && !seenDocKeys.has(doc.docKey)) {
            seenDocKeys.add(doc.docKey);
            results.push(doc);
          }
        }
      } catch {
        // Offline or unavailable backend: the fuzzy results still stand.
      }

      if (results.length === 0) {
        return `No documentation matches "${query}".`;
      }

      return {
        query,
        results: results.slice(0, resultLimit).map(toSearchResult),
      };
    },
  };

  const listDocumentation: AnyWebMCPTool = {
    name: 'listIntlayerDocumentation',
    description:
      "List every page of Intlayer's documentation available to agents, as a markdown index of titles and URLs.",
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async (_input, options) => {
      const response = await fetch(LlmsTxt_Path, {
        headers: { Accept: 'text/plain' },
        signal: options?.signal,
      });

      if (!response.ok) {
        return `Could not load the documentation index (HTTP ${response.status}).`;
      }

      return await response.text();
    },
  };

  const getDocumentationPage: AnyWebMCPTool = {
    name: 'getIntlayerDocumentationPage',
    description:
      "Fetch a single page of Intlayer's documentation, blog or FAQ as markdown. Accepts a page path such as `/doc/why`, `/doc/concept/cms` or `/blog/intlayer-with-react-i18next`, with or without a locale prefix or `.md` extension.",
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description:
            'Documentation path beginning with /doc, /blog or /frequent-questions.',
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async ({ path }: GetDocumentationPageInput, options) => {
      const target = resolveSameOriginPath(path);

      if (!target) {
        return 'Only Intlayer documentation paths can be read.';
      }

      const markdownPathname = toMarkdownPathname(
        localizePath(target.pathname)
      );
      const response = await fetch(markdownPathname, {
        headers: { Accept: 'text/markdown' },
        signal: options?.signal,
      });

      if (!response.ok) {
        return `No documentation found at ${markdownPathname} (HTTP ${response.status}).`;
      }

      return await response.text();
    },
  };

  const getCurrentPage: AnyWebMCPTool = {
    name: 'getCurrentPage',
    description:
      'Describe the page the user is currently viewing on intlayer.org: URL, title, locale and the locales the site is available in.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => ({
      url: window.location.href,
      path: getPathWithoutLocale(pathname, availableLocales),
      title: document.title,
      locale,
      availableLocales,
      isAuthenticated,
    }),
  };

  const openPage: AnyWebMCPTool = {
    name: 'openPage',
    description:
      'Navigate the current tab to a page of intlayer.org, given its path (for example `/doc/why`, `/blog`, `/icu-message-formatter`, `/i18n-message-converter`, `/i18n-seo-scanner`). The path is localized to the current locale automatically.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Path on intlayer.org.' },
      },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: async ({ path }: NavigateToPageInput) => {
      const target = resolveSameOriginPath(path);

      if (!target) {
        return 'Only intlayer.org paths can be opened with this tool.';
      }

      const localizedPath = `${localizePath(target.pathname)}${target.search}${target.hash}`;

      await navigate({ to: localizedPath });

      return `Navigated to ${localizedPath}.`;
    },
  };

  const setSiteLocale: AnyWebMCPTool = {
    name: 'updateLocale',
    description:
      'Switch the language of intlayer.org for the current page and the rest of the visit.',
    inputSchema: {
      type: 'object',
      properties: {
        locale: {
          type: 'string',
          enum: availableLocales,
          description: 'Target locale code.',
        },
      },
      required: ['locale'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: async ({ locale: requestedLocale }: SetLocaleInput) => {
      const targetLocale = availableLocales.find(
        (candidate) => candidate === requestedLocale
      );

      if (!targetLocale) {
        return `Unsupported locale "${requestedLocale}". Available: ${availableLocales.join(', ')}.`;
      }

      setLocale(targetLocale);
      await navigate({
        to: getLocalizedUrl(
          getPathWithoutLocale(pathname, availableLocales),
          targetLocale
        ),
        replace: true,
      });

      return `Locale switched to ${targetLocale}.`;
    },
  };

  const sendUserToAuthentication: AnyWebMCPTool = {
    name: 'sendUserToAuthentication',
    description:
      'Send the user to the Intlayer dashboard (app.intlayer.org) to sign in, create an account, or try a read-only demo. An already signed-in user is taken straight to the dashboard. Leaves intlayer.org.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
          enum: ['login', 'register', 'demo'],
          description: 'Which flow to open (default `login`).',
        },
        redirectPath: {
          type: 'string',
          description:
            'Dashboard path to land on once authenticated, such as `/projects` or `/dictionary`.',
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, openWorldHint: true },
    execute: ({ mode = 'login', redirectPath }: OpenAuthenticationInput) => {
      const dashboardUrl = new URL(App_Dashboard);
      const redirectTarget = redirectPath
        ? new URL(redirectPath, dashboardUrl)
        : undefined;

      if (redirectTarget && redirectTarget.origin !== dashboardUrl.origin) {
        return 'redirectPath must be a path on the Intlayer dashboard.';
      }

      const destination = new URL(
        isAuthenticated
          ? (redirectTarget?.pathname ?? '/')
          : AUTHENTICATION_PATHS[mode],
        dashboardUrl
      );

      if (!isAuthenticated && redirectTarget) {
        destination.searchParams.set('redirect_url', redirectTarget.pathname);
      }

      window.location.assign(destination.toString());

      return `Opening ${destination.toString()}.`;
    },
  };

  return [
    searchDocumentation,
    listDocumentation,
    getDocumentationPage,
    getCurrentPage,
    openPage,
    setSiteLocale,
    sendUserToAuthentication,
  ];
};
