/* eslint-disable @typescript-eslint/no-explicit-any */
import { InviteUserEmail } from '@emails/InviteUserEmail';
import PasswordChangeConfirmationEmail from '@emails/PasswordChangeConfirmation';
import ResetPasswordEmail from '@emails/ResetUserPassword';
import { ValidateUserEmail } from '@emails/ValidateUserEmail';
import WelcomeEmail from '@emails/Welcome';
import { logger } from '@logger';
import { ComponentProps } from 'react';
import { Resend } from 'resend';

const emailComponents = {
  invite: {
    template: InviteUserEmail,
    subject: 'You have been invited to join Intlayer',
  },
  validate: {
    template: ValidateUserEmail,
    subject: 'Validate your email for Intlayer',
  },
  resetPassword: {
    template: ResetPasswordEmail,
    subject: 'Reset your password for Intlayer',
  },
  welcome: { template: WelcomeEmail, subject: 'Welcome to Intlayer!' },
  passwordChangeConfirmation: {
    template: PasswordChangeConfirmationEmail,
    subject: 'Your Intlayer password has been changed',
  },
} as const;

type EmailType = keyof typeof emailComponents;

export type SendEmailProps<T extends EmailType> = {
  type: T;
  to: string;
  subject?: string;
} & ComponentProps<(typeof emailComponents)[T]['template']>;

export const sendEmail = async <T extends EmailType>({
  type,
  to,
  subject,
  ...props
}: SendEmailProps<T>) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { template, subject: baseSubject } = emailComponents[type];

  type EmailComponentType = (typeof emailComponents)[T]['template'];

  const EmailComponent: EmailComponentType = template;

  const react = <EmailComponent {...(props as any)} />;

  await resend.emails
    .send({
      from: 'no-replay@intlayer.org',
      to,
      subject: subject ?? baseSubject,
      react,
    })
    .catch((err) => console.log(err));

  logger.info(`Email sent ${type} to ${to}`);
};
