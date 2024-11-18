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
import { ComponentProps } from 'react';
import { Resend } from 'resend';

type EmailComponentsType = (...props: any) => JSX.Element;
type EmailComponents = {
  [key: string]: {
    template: EmailComponentsType;
    subject: string;
  };
};

const getEmailComponents = () =>
  ({
    invite: {
      template: t({
        en: InviteUserEmailEN,
        fr: InviteUserEmailFR,
        es: InviteUserEmailES,
      }),
      subject: t({
        en: 'You have been invited to join Intlayer',
        fr: 'Vous êtes invité à rejoindre Intlayer',
        es: 'Has sido invitado a unirte a Intlayer',
      }),
    },
    validate: {
      template: t({
        en: ValidateUserEmailEN,
        fr: ValidateUserEmailFR,
        es: ValidateUserEmailES,
      }),
      subject: t({
        en: 'Validate your email for Intlayer',
        fr: 'Validez votre email pour Intlayer',
        es: 'Valida tu correo electrónico para Intlayer',
      }),
    },
    resetPassword: {
      template: t({
        en: ResetPasswordEmailEN,
        fr: ResetPasswordEmailFR,
        es: ResetPasswordEmailES,
      }),
      subject: t({
        en: 'Reset your password for Intlayer',
        fr: 'Réinitialisez votre mot de passe pour Intlayer',
        es: 'Restablece tu contraseña para Intlayer',
      }),
    },
    welcome: {
      template: t({
        en: WelcomeEmailEN,
        fr: WelcomeEmailFR,
        es: WelcomeEmailES,
      }),
      subject: t({
        en: 'Welcome to Intlayer!',
        fr: 'Bienvenue chez Intlayer!',
        es: '¡Bienvenido a Intlayer!',
      }),
    },
    passwordChangeConfirmation: {
      template: t({
        en: PasswordChangeConfirmationEmailEN,
        fr: PasswordChangeConfirmationEmailFR,
        es: PasswordChangeConfirmationEmailES,
      }),
      subject: t({
        en: 'Your Intlayer password has been changed',
        fr: 'Votre mot de passe Intlayer a été modifié',
        es: 'Tu contraseña de Intlayer ha sido cambiada',
      }),
    },
  }) satisfies EmailComponents;

type EmailType = keyof ReturnType<typeof getEmailComponents>;

export type SendEmailProps<T extends EmailType> = {
  type: T;
  to: string;
  subject?: string;
} & ComponentProps<ReturnType<typeof getEmailComponents>[T]['template']>;

export const sendEmail = async <T extends EmailType>({
  type,
  to,
  subject,
  ...props
}: SendEmailProps<T>) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailComponents = getEmailComponents();

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
