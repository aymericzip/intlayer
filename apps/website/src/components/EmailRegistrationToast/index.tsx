'use client';

import { type EmailsList } from '@intlayer/backend';
import { Container, Form, useForm, useUser } from '@intlayer/design-system';
import {
  usePersistedStore,
  useSubscribeToNewsletter,
} from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { Mail, X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { FC, useEffect, useState } from 'react';
import { EmailSchemaValue, useEmailSchema } from './useEmailSchema';

const MIN_VISITS_TO_SHOW = 3;
const VISIT_TIMEOUT = 6 * 60 * 60 * 1000; // 6 hours
const VISIBLE_DELAY_TIME = 20 * 1000; // 20 seconds
const AUTO_UN_CLOSED_DELAY_TIME = 30 * 24 * 60 * 60 * 1000; // 1 months
const NEWS_LETTER_KEY: EmailsList = 'newsLetter' as EmailsList;

interface VisitData {
  visits: number;
  lastVisit: Date;
  hasRegistered: boolean;
  isClosed: boolean;
}

// Check if enough time has passed since last visit
const hasEnoughTimePassedSinceLastVisit = (lastVisit: Date): boolean => {
  const timeDifference = Date.now() - new Date(lastVisit).getTime();
  return timeDifference > VISIT_TIMEOUT;
};

// Check if the toast should be automatically closed
const shouldAutoUnClose = (lastVisit: Date): boolean => {
  const timeDifference = Date.now() - new Date(lastVisit).getTime();

  return timeDifference > AUTO_UN_CLOSED_DELAY_TIME;
};

export const EmailRegistrationToast: FC = () => {
  const { user, isAuthenticated } = useUser();
  const [visitData, setVisitData] = usePersistedStore<VisitData | null>(
    'email-registration-toast-visit-data',
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const { isLoading, subscribeToNewsletter } = useSubscribeToNewsletter();
  const { content, closeLabel, registerLabel, emailInput } = useIntlayer(
    'email-registration-toast'
  );
  const EmailSchema = useEmailSchema();
  const { form } = useForm(EmailSchema, {
    defaultValues: {
      email: user?.email ?? '',
    },
  });

  const isRegistered =
    user?.emailsList?.[NEWS_LETTER_KEY as keyof typeof user.emailsList] ??
    false;

  // Initialize visit tracking and determine if toast should show
  useEffect(() => {
    if (!visitData) {
      // First visit - initialize data
      setVisitData({
        visits: 1,
        lastVisit: new Date(),
        hasRegistered: false,
        isClosed: false,
      });
      setShouldShow(false);
      return;
    }

    // Check if we should increment the visit counter
    if (hasEnoughTimePassedSinceLastVisit(visitData.lastVisit)) {
      setVisitData((prev) => ({
        ...(prev as VisitData),
        visits: prev?.visits ?? 0 + 1,
        lastVisit: new Date(),
      }));
    }

    if (shouldAutoUnClose(visitData.lastVisit)) {
      setVisitData((prev) => ({
        ...(prev as VisitData),
        isClosed: false,
      }));
    }

    // Determine if toast should be visible
    const shouldShowToast =
      !isRegistered && visitData.visits >= MIN_VISITS_TO_SHOW;

    setShouldShow(shouldShowToast);
  }, [visitData, setVisitData, isRegistered]);

  // Handle the 30-second delay before showing the toast
  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, VISIBLE_DELAY_TIME);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShow]);

  // Handle close button click - reset all data
  const handleClose = () => {
    setVisitData((prev) => ({
      ...(prev as VisitData),
      isClosed: true,
    }));
    setIsVisible(false);
    setShouldShow(false);
  };

  // Handle email registration
  const handleRegister = async (data: EmailSchemaValue) => {
    try {
      await subscribeToNewsletter({
        email: data.email,
        emailList: NEWS_LETTER_KEY,
      });
      // After successful registration, hide the toast
      setIsVisible(false);
      setShouldShow(false);
      setVisitData((prev) => ({
        ...(prev as VisitData),
        hasRegistered: true,
      }));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Don't render if not visible or user is authenticated
  if (isRegistered || visitData?.isClosed) return null;

  return (
    <Container
      className={cn([
        'border-text group fixed bottom-5 right-0 translate-x-0 z-[100] mx-8 border-[2px] py-6 px-8 transition-all duration-500',
        !isVisible && 'translate-x-[120%]',
      ])}
      roundedSize="2xl"
    >
      <div className="flex gap-6 rounded-lg items-center">
        <Mail className="size-6" />
        <Form
          schema={EmailSchema}
          onSubmitSuccess={handleRegister}
          autoComplete
          {...form}
        >
          <span className="text-sm font-medium">{content.value}</span>
          {!isAuthenticated && (
            <Form.Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder={emailInput.placeholder.value}
              className="w-full"
              isRequired
            />
          )}
          <Form.Button
            label={registerLabel.value}
            type="submit"
            color="text"
            className="cursor-pointer"
            isFullWidth
            size="md"
            isLoading={isLoading}
          >
            {registerLabel.value}
          </Form.Button>
        </Form>
        <Form.Button
          Icon={X}
          label={closeLabel.value}
          onClick={handleClose}
          color="text"
          variant="hoverable"
          className="!absolute right-2 top-2 cursor-pointer"
          size="icon-md"
        />
      </div>
    </Container>
  );
};
