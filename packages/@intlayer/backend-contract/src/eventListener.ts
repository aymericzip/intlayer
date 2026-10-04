import { defineRoute, defineRouteGroup } from './defineRoute';
import type { DictionaryAPI } from './dictionary';

/** Live dictionary change stream (server-sent events). */
export const eventListenerContract = defineRouteGroup({
  prefix: '/api/event-listener',
  tag: 'Event listener',
  routes: {
    checkDictionaryChangeSSE: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'Stream dictionary changes of the project (server-sent events)',
      schemas: {},
    }),
  },
});

/** Route definitions of the event listener group, by name. */
export type EventListenerRoutes = (typeof eventListenerContract)['routes'];

/** Message pushed on the dictionary change stream. */
export type MessageEventData = {
  object: 'DICTIONARY';
  status: 'ADDED' | 'UPDATED' | 'DELETED' | 'CREATED';
  data: DictionaryAPI;
};
