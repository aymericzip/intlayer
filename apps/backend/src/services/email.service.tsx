/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InviteUserEmailEN,
  InviteUserEmailFR,
  InviteUserEmailES,
} from '@emails/InviteUserEmail';
import {
  PasswordChangeConfirmationEmailEN,
  PasswordChangeConfirmationEmailFR,
  PasswordChangeConfirmationEmailES,
} from '@emails/PasswordChangeConfirmation';
import {
  ResetPasswordEmailEN,
  ResetPasswordEmailFR,
  ResetPasswordEmailES,
} from '@emails/ResetUserPassword';

import {
  SubscriptionPaymentCancellationEN,
  SubscriptionPaymentCancellationFR,
  SubscriptionPaymentCancellationES,
} from '@emails/SubscriptionPaymentCancellation';
import {
  SubscriptionPaymentErrorEN,
  SubscriptionPaymentErrorFR,
  SubscriptionPaymentErrorES,
} from '@emails/SubscriptionPaymentError';
import {
  SubscriptionPaymentSuccessEN,
  SubscriptionPaymentSuccessFR,
  SubscriptionPaymentSuccessES,
} from '@emails/SubscriptionPaymentSuccess';
import {
  ValidateUserEmailEN,
  ValidateUserEmailFR,
  ValidateUserEmailES,
} from '@emails/ValidateUserEmail';
import {
  WelcomeEmailEN,
  WelcomeEmailFR,
  WelcomeEmailES,
} from '@emails/Welcome';

import { logger } from '@logger';
import { t } from 'express-intlayer';
import { Locales } from 'intlayer';
import { ComponentProps, JSX } from 'react';
import { Resend } from 'resend';

type EmailComponentsType = (...props: any) => JSX.Element;
type EmailComponents = {
  [key: string]: {
    template: EmailComponentsType;
    subject: string;
  };
};

const getEmailComponents = (locale?: Locales) =>
  ({
    invite: {
      template: t(
        {
          en: InviteUserEmailEN,
          fr: InviteUserEmailFR,
          es: InviteUserEmailES,
        },
        locale
      ),
      subject: t(
        {
          en: 'You have been invited to join Intlayer',
          fr: 'Vous êtes invité à rejoindre Intlayer',
          es: 'Has sido invitado a unirte a Intlayer',
        },
        locale
      ),
    },
    validate: {
      template: t(
        {
          en: ValidateUserEmailEN,
          fr: ValidateUserEmailFR,
          es: ValidateUserEmailES,
        },
        locale
      ),
      subject: t(
        {
          en: 'Validate your email for Intlayer',
          fr: 'Validez votre email pour Intlayer',
          es: 'Valida tu correo electrónico para Intlayer',
        },
        locale
      ),
    },
    resetPassword: {
      template: t(
        {
          en: ResetPasswordEmailEN,
          fr: ResetPasswordEmailFR,
          es: ResetPasswordEmailES,
        },
        locale
      ),
      subject: t(
        {
          en: 'Reset your password for Intlayer',
          fr: 'Réinitialisez votre mot de passe pour Intlayer',
          es: 'Restablece tu contraseña para Intlayer',
        },
        locale
      ),
    },
    welcome: {
      template: t(
        {
          en: WelcomeEmailEN,
          fr: WelcomeEmailFR,
          es: WelcomeEmailES,
        },
        locale
      ),
      subject: t(
        {
          en: 'Welcome to Intlayer!',
          fr: 'Bienvenue chez Intlayer!',
          es: '¡Bienvenido a Intlayer!',
        },
        locale
      ),
    },
    passwordChangeConfirmation: {
      template: t(
        {
          en: PasswordChangeConfirmationEmailEN,
          fr: PasswordChangeConfirmationEmailFR,
          es: PasswordChangeConfirmationEmailES,
        },
        locale
      ),
      subject: t(
        {
          en: 'Your Intlayer password has been changed',
          fr: 'Votre mot de passe Intlayer a été modifié',
          es: 'Tu contraseña de Intlayer ha sido cambiada',
        },
        locale
      ),
    },
    subscriptionPaymentSuccess: {
      template: t({
        en: SubscriptionPaymentSuccessEN,
        fr: SubscriptionPaymentSuccessFR,
        es: SubscriptionPaymentSuccessES,
      }),
      subject: t({
        en: 'Your payment for Intlayer subscription is confirmed',
        fr: "Votre paiement pour l'abonnement Intlayer est confirmé",
        es: 'Tu pago por la suscripción de Intlayer ha sido confirmado',
      }),
    },
    subscriptionPaymentCancellation: {
      template: t({
        en: SubscriptionPaymentCancellationEN,
        fr: SubscriptionPaymentCancellationFR,
        es: SubscriptionPaymentCancellationES,
      }),
      subject: t({
        en: 'Your Intlayer subscription has been canceled',
        fr: 'Votre abonnement Intlayer a été annulé',
        es: 'Tu suscripción de Intlayer ha sido cancelada',
      }),
    },
    subscriptionPaymentError: {
      template: t({
        en: SubscriptionPaymentErrorEN,
        fr: SubscriptionPaymentErrorFR,
        es: SubscriptionPaymentErrorES,
      }),
      subject: t({
        en: 'There was an issue with your Intlayer subscription payment',
        fr: "Un problème est survenu avec votre paiement pour l'abonnement Intlayer",
        es: 'Hubo un problema con el pago de tu suscripción de Intlayer',
      }),
    },
  }) satisfies EmailComponents;

type EmailType = keyof ReturnType<typeof getEmailComponents>;

export type SendEmailProps<T extends EmailType> = {
  type: T;
  to: string;
  subject?: string;
  locale?: Locales;
} & ComponentProps<ReturnType<typeof getEmailComponents>[T]['template']>;

export const sendEmail = async <T extends EmailType>({
  type,
  to,
  subject,
  locale,
  ...props
}: SendEmailProps<T>) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailComponents = getEmailComponents(locale);

  const { template, subject: baseSubject } = emailComponents[type];

  type EmailComponentType = (typeof emailComponents)[T]['template'];

  const EmailComponent: EmailComponentType = template;

  const react = <EmailComponent {...(props as any)} />;

  await resend.emails
    .send({
      from: 'Intlayer <no-replay@intlayer.org>',
      to,
      subject: subject ?? baseSubject,
      react,
    })
    .catch((err) => logger.error(err));

  logger.info(`Email sent ${type} to ${to}`);
};
