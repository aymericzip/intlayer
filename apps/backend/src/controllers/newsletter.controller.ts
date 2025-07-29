import type { EmailsList, UserAPI } from '@/types/user.types';
import { logger } from '@logger';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { mapUserToAPI } from '@utils/mapper/user';
import { hasPermission } from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';

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
  req: Request<any, any, NewsletterSubscriptionBody>,
  res: ResponseWithSession<NewsletterSubscriptionResult>,
  _next: NextFunction
): Promise<void> => {
  const { roles } = res.locals;
  const { email, emailList } = req.body;

  if (!email) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
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
          roles,
          'user:write'
        )({
          ...res.locals,
          targetUsers: [user],
        })
      ) {
        ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
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
  req: Request<any, any, NewsletterUnsubscriptionBody>,
  res: ResponseWithSession<NewsletterSubscriptionResult>,
  _next: NextFunction
): Promise<void> => {
  const { userId, emailList } = req.body;
  const { roles } = res.locals;

  if (!userId) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
    return;
  }

  try {
    // Check if user exists
    const user = await userService.getUserById(userId);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    if (
      !hasPermission(
        roles,
        'user:write'
      )({
        ...res.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

/**
 * Gets the newsletter subscription status for a user.
 */
export const getNewsletterStatus = async (
  _req: Request<{ email: string }>,
  res: ResponseWithSession<NewsletterSubscriptionResult>,
  _next: NextFunction
): Promise<void> => {
  const email = res.locals.user?.email;
  const { roles } = res.locals;

  if (!email) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
    return;
  }

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    if (
      !hasPermission(
        roles,
        'user:read'
      )({
        ...res.locals,
        targetUsers: [user],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(res, 'PERMISSION_DENIED');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
