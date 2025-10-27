import type { RoutingConfig } from '@intlayer/types';

export const HEADER_NAME = 'x-intlayer-locale';

export const COOKIE_NAME = 'INTLAYER_LOCALE';
export const LOCALE_STORAGE_NAME = 'INTLAYER_LOCALE';

export const BASE_PATH = '';

export const SERVER_SET_COOKIE = 'always';

export const ROUTING_MODE = 'prefix-no-default';

export const STORAGE: RoutingConfig['storage'] = ['cookie', 'header'];
