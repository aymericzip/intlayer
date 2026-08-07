import type { RoutingStorageInput } from '@intlayer/types/config';

export const HEADER_NAME = 'x-intlayer-locale';

export const COOKIE_NAME = 'INTLAYER_LOCALE';
export const LOCALE_STORAGE_NAME = 'INTLAYER_LOCALE';

export const BASE_PATH = '';

export const SERVER_SET_COOKIE = 'always';

export const ROUTING_MODE = 'prefix-no-default';

/**
 * Left `undefined` on purpose: it selects the proxy's *auto* mode, which keeps
 * locale routing URL-driven on development and preview servers while behaving
 * like `true` in production. `true` and `false` are the explicit opt-in and
 * opt-out. See `resolveProxyMode` in `@intlayer/core/localization`.
 */
export const ENABLE_PROXY: boolean | undefined = undefined;

export const STORAGE: RoutingStorageInput = ['cookie', 'header'];
