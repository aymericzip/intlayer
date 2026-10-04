import { z } from 'zod/mini';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import { type ResponseData, responseDataSchema } from './responseData';
import { emailsListSchema, type UserAPI, userSchema } from './user';

/** One mailing list or several. */
const emailListSchema = z.union([emailsListSchema, z.array(emailsListSchema)]);

/** REST contract of the `/api/newsletter` routes. */
export const newsletterContract = defineRouteGroup({
  prefix: '/api/newsletter',
  tag: 'Newsletter',
  routes: {
    subscribeToNewsletter: defineRoute({
      method: 'POST',
      path: '/subscribe',
      summary: 'Subscribe an email to mailing lists',
      schemas: {
        body: z.object({
          email: z.string().check(z.minLength(1)),
          emailList: emailListSchema,
        }),
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    unsubscribeFromNewsletter: defineRoute({
      method: 'POST',
      path: '/unsubscribe',
      summary: 'Unsubscribe a user from mailing lists',
      schemas: {
        body: z.object({
          userId: z.string(),
          emailList: emailListSchema,
        }),
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    getNewsletterStatus: defineRoute({
      method: 'GET',
      path: '/status',
      summary: 'Mailing list subscriptions of the signed-in user',
      schemas: {
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/newsletter` group, by name. */
export type NewsletterRoutes = (typeof newsletterContract)['routes'];

export type NewsletterSubscriptionBody = RouteBodyInput<
  NewsletterRoutes['subscribeToNewsletter']
>;
export type NewsletterSubscriptionResult = ResponseData<UserAPI>;
export type NewsletterUnsubscriptionBody = RouteBodyInput<
  NewsletterRoutes['unsubscribeFromNewsletter']
>;
export type NewsletterUnsubscriptionResult = ResponseData<UserAPI>;
export type GetNewsletterStatusResult = ResponseData<UserAPI>;
