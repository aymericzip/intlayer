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
  const { roles } = request.session || {};
  const { email, emailList } = request.body;

  if (!email) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_DATA_NOT_FOUND'
    );
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
          ...request.session,
          targetUsers: [user],
        })
      ) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          'PERMISSION_DENIED'
        );
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
        'en-GB': 'Successfully subscribed to newsletter',
        fr: 'Abonnement à la newsletter réussi',
        es: 'Suscripción al boletín exitosa',
        ru: 'Вы успешно подписались на рассылку',
        ja: 'ニュースレターの購読に成功しました',
        ko: '뉴스레터 구독에 성공했습니다',
        zh: '成功订阅通讯',
        de: 'Erfolgreich zum Newsletter angemeldet',
        ar: 'تم الاشتراك في النشرة الإخبارية بنجاح',
        it: 'Iscrizione alla newsletter riuscita',
        pt: 'Inscrição na newsletter realizada com sucesso',
        hi: 'न्यूज़लेटर की सदस्यता सफलतापूर्वक ली गई',
        tr: 'Bültene başarıyla abone olundu',
        pl: 'Pomyślnie zasubskrybowano newsletter',
        id: 'Berhasil berlangganan buletin',
        vi: 'Đăng ký nhận bản tin thành công',
        uk: 'Ви успішно підписалися на розсилку',
      }),
      description: t({
        en: 'You have been successfully subscribed to our newsletter',
        'en-GB': 'You have been successfully subscribed to our newsletter',
        fr: 'Vous avez été abonné avec succès à notre newsletter',
        es: 'Te has suscrito exitosamente a nuestro boletín',
        ru: 'Вы были успешно подписаны на нашу рассылку',
        ja: '当社のニュースレターに正常に登録されました',
        ko: '뉴스레터에 성공적으로 구독되었습니다',
        zh: '您已成功订阅我们的通讯',
        de: 'Sie wurden erfolgreich für unseren Newsletter angemeldet',
        ar: 'لقد تم اشتراكك بنجاح في نشرتنا الإخبارية',
        it: 'Ti sei iscritto con successo alla nostra newsletter',
        pt: 'Você foi inscrito com sucesso em nossa newsletter',
        hi: 'आप हमारे न्यूज़लेटर के लिए सफलतापूर्वक पंजीकृत हो गए हैं',
        tr: 'Bültenimize başarıyla abone oldunuz',
        pl: 'Zostałeś pomyślnie zapisany do naszego newslettera',
        id: 'Anda telah berhasil berlangganan buletin kami',
        vi: 'Bạn đã đăng ký nhận bản tin của chúng tôi thành công',
        uk: 'Ви успішно підписалися на нашу розсилку',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
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
  const { roles } = request.session || {};

  if (!userId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_DATA_NOT_FOUND'
    );
  }

  try {
    // Check if user exists
    const user = await userService.getUserById(userId);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    if (
      !hasPermission(
        roles || [],
        'user:write'
      )({
        ...request.session,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
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
        'en-GB': 'Successfully unsubscribed from newsletter',
        fr: 'Désabonnement de la newsletter réussi',
        es: 'Cancelación de suscripción al boletín exitosa',
        ru: 'Вы успешно отписались от рассылки',
        ja: 'ニュースレターの解約に成功しました',
        ko: '뉴스레터 구독 해지에 성공했습니다',
        zh: '成功取消订阅通讯',
        de: 'Erfolgreich vom Newsletter abgemeldet',
        ar: 'تم إلغاء الاشتراك في النشرة الإخبارية بنجاح',
        it: 'Disiscrizione dalla newsletter riuscita',
        pt: 'Cancelamento da inscrição na newsletter realizado com sucesso',
        hi: 'न्यूज़लेटर की सदस्यता सफलतापूर्वक समाप्त की गई',
        tr: 'Bülten aboneliğinden başarıyla çıkıldı',
        pl: 'Pomyślnie wypisano się z newslettera',
        id: 'Berhasil membatalkan langganan buletin',
        vi: 'Hủy đăng ký nhận bản tin thành công',
        uk: 'Ви успішно відписалися від розсилки',
      }),
      description: t({
        en: 'You have been successfully unsubscribed from our newsletter',
        'en-GB': 'You have been successfully unsubscribed from our newsletter',
        fr: 'Vous avez été désabonné avec succès de notre newsletter',
        es: 'Te has desuscrito exitosamente de nuestro boletín',
        ru: 'Вы успешно отписались от нашей рассылки',
        ja: '当社のニュースレターから正常に登録解除されました',
        ko: '뉴스레터에서 성공적으로 해지되었습니다',
        zh: '您已成功取消订阅我们的通讯',
        de: 'Sie wurden erfolgreich von unserem Newsletter abgemeldet',
        ar: 'لقد تم إلغاء اشتراكك بنجاح من نشرتنا الإخبارية',
        it: 'Ti sei disiscritto con successo dalla nostra newsletter',
        pt: 'Você foi cancelado com sucesso da nossa newsletter',
        hi: 'आपने हमारे न्यूज़लेटर से सफलतापूर्वक अपनी सदस्यता समाप्त कर ली है',
        tr: 'Bülten aboneliğinden başarıyla ayrıldınız',
        pl: 'Zostałeś pomyślnie wypisany z naszego newslettera',
        id: 'Anda telah berhasil membatalkan langganan buletin kami',
        vi: 'Bạn đã hủy đăng ký nhận bản tin của chúng tôi thành công',
        uk: 'Ви успішно відписалися від нашої розсилки',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Gets the newsletter subscription status for a user.
 */
export const getNewsletterStatus = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const email = _request.session?.user?.email;
  const { roles } = _request.session || {};

  if (!email) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_DATA_NOT_FOUND'
    );
  }

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    if (
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ..._request.session,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const formattedUser = mapUserToAPI(user);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'Newsletter subscription status retrieved',
        'en-GB': 'Newsletter subscription status retrieved',
        fr: "Statut d'abonnement à la newsletter récupéré",
        es: 'Estado de suscripción al boletín obtenido',
        ru: 'Статус подписки на рассылку получен',
        ja: 'ニュースレターの購読ステータスが取得されました',
        ko: '뉴스레터 구독 상태가 조회되었습니다',
        zh: '通讯订阅状态已检索',
        de: 'Status des Newsletter-Abonnements abgerufen',
        ar: 'تم استرداد حالة الاشتراك في النشرة الإخبارية',
        it: 'Stato iscrizione newsletter recuperato',
        pt: 'Status da inscrição na newsletter recuperado',
        hi: 'न्यूज़लेटर सदस्यता स्थिति प्राप्त की गई',
        tr: 'Bülten abonelik durumu alındı',
        pl: 'Pobrano status subskrypcji newslettera',
        id: 'Status langganan buletin diambil',
        vi: 'Đã truy xuất trạng thái đăng ký nhận bản tin',
        uk: 'Статус підписки на розсилку отримано',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
