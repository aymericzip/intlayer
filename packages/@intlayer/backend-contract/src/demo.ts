import { z } from 'zod/mini';
import { defineRoute, defineRouteGroup } from './defineRoute';

/** REST contract of the `/api/demo` routes (cloud only). */
export const demoContract = defineRouteGroup({
  prefix: '/api/demo',
  tag: 'Demo',
  routes: {
    getDemoSession: defineRoute({
      method: 'GET',
      path: '/session',
      summary: 'Sign the browser into the shared read-only demo account',
      schemas: {
        /** Sets the demo session cookie. */
        response: { 200: z.object({ ok: z.boolean() }) },
      },
    }),
  },
});

/** Route definitions of the `/api/demo` group, by name. */
export type DemoRoutes = (typeof demoContract)['routes'];

export type GetDemoSessionResult = { ok: boolean };
