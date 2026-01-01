import { logger } from '@logger';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { mapUserToAPI } from '@utils/mapper/user';
import { hasPermission } from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { EmailsList, UserAPI } from '@/types/user.types';

export type NewsletterSubscriptionBody = {
  email: string;
  emailList: EmailsList | EmailsList[];
};
export type NewsletterSubscriptionResult = ResponseData<UserAPI>;

/**
 * Subscribes a user to the newsletter.
 * If the user doesn't exist, creates a new user.
 * If the user exists, updates their newsletter subscription to true.
 */
export const subscribeToNewsletter = async (
  request: FastifyRequest<{ Body: NewsletterSubscriptionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { roles } = request.locals || {};
  const { email, emailList } = request.body;

  if (!email) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_DATA_NOT_FOUND');
    return;
  }

  const emailLists = Array.isArray(emailList) ? emailList : [emailList];

  // Create new user with newsletter subscription enabled
  const emailsListObject = Object.fromEntries(
    emailLists.map((list) => [list, true])
  ) as Record<EmailsList, boolean>;

  try {
    // Check if user exists
    let user = await userService.getUserByEmail(email);

    if (!user) {
      user = await userService.createUser({
        email,
        emailsList: emailsListObject,
      });

      logger.info(`New user created and subscribed to newsletter: ${email}`);
    } else {
      if (
        !hasPermission(
          roles || [],
          'user:write'
        )({
          ...request.locals,
          targetUsers: [user],
        })
      ) {
        ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
        return;
      }

      // Update existing user's newsletter subscription
      user = await userService.updateUserById(user.id, {
        emailsList: { ...user.emailsList, ...emailsListObject },
      });

      logger.info(`User subscribed to newsletter: ${email}`);
    }

    const formattedUser = mapUserToAPI(user);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'Successfully subscribed to newsletter',
        fr: 'Abonnement à la newsletter réussi',
        es: 'Suscripción al boletín exitosa',
      }),
      description: t({
        en: 'You have been successfully subscribed to our newsletter',
        fr: 'Vous avez été abonné avec succès à notre newsletter',
        es: 'Te has suscrito exitosamente a nuestro boletín',
      }),
      data: formattedUser,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

export type NewsletterUnsubscriptionBody = {
  userId: string;
  emailList: EmailsList | EmailsList[];
};

/**
 * Unsubscribes a user from the newsletter.
 * Only works if the user exists.
 */
export const unsubscribeFromNewsletter = async (
  request: FastifyRequest<{ Body: NewsletterUnsubscriptionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId, emailList } = request.body;
  const { roles } = request.locals || {};

  if (!userId) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_DATA_NOT_FOUND');
    return;
  }

  try {
    // Check if user exists
    const user = await userService.getUserById(userId);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
      return;
    }

    if (
      !hasPermission(
        roles || [],
        'user:write'
      )({
        ...request.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    const emailLists = Array.isArray(emailList) ? emailList : [emailList];

    // Create new user with newsletter subscription enabled
    const emailsListObject = Object.fromEntries(
      emailLists.map((list) => [list, false])
    ) as Record<EmailsList, boolean>;

    // Update user's newsletter subscription to false
    const updatedUser = await userService.updateUserById(user.id, {
      emailsList: { ...user.emailsList, ...emailsListObject },
    });

    logger.info(`User unsubscribed from newsletter: ${updatedUser.email}`);

    const formattedUser = mapUserToAPI(updatedUser);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'Successfully unsubscribed from newsletter',
        fr: 'Désabonnement de la newsletter réussi',
        es: 'Cancelación de suscripción al boletín exitosa',
      }),
      description: t({
        en: 'You have been successfully unsubscribed from our newsletter',
        fr: 'Vous avez été désabonné avec succès de notre newsletter',
        es: 'Te has desuscrito exitosamente de nuestro boletín',
      }),
      data: formattedUser,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};

/**
 * Gets the newsletter subscription status for a user.
 */
export const getNewsletterStatus = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const email = _request.locals?.user?.email;
  const { roles } = _request.locals || {};

  if (!email) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_DATA_NOT_FOUND');
    return;
  }

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
      return;
    }

    if (
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ..._request.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    const formattedUser = mapUserToAPI(user);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'Newsletter subscription status retrieved',
        fr: "Statut d'abonnement à la newsletter récupéré",
        es: 'Estado de suscripción al boletín obtenido',
      }),
      data: formattedUser,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};
