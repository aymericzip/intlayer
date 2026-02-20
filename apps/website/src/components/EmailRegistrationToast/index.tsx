'use client';

import type { EmailsList } from '@intlayer/backend';
import { Container, Form, useForm } from '@intlayer/design-system';
import {
  usePersistedStore,
  useSubscribeToNewsletter,
  useUser,
} from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { Mail, X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useReducer, useRef } from 'react';
import { type EmailSchemaValue, useEmailSchema } from './useEmailSchema';

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

type ToastState = {
  isReady: boolean;
};

type ToastAction = { type: 'SET_READY'; payload: boolean };

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'SET_READY':
      return { ...state, isReady: action.payload };
    default:
      return state;
  }
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
  const [state, dispatch] = useReducer(toastReducer, { isReady: false });
  const initializedRef = useRef(false);

  const { isPending: isLoading, mutateAsync: subscribeToNewsletter } =
    useSubscribeToNewsletter();
  const { content, closeLabel, registerLabel, emailInput } = useIntlayer(
    'email-registration-toast'
  );
  const EmailSchema = useEmailSchema();
  const { form } = useForm(EmailSchema, {
    mode: 'onSubmit',
    defaultValues: {
      email: user?.email ?? '',
    },
  });

  const isRegistered =
    user?.emailsList?.[NEWS_LETTER_KEY as keyof typeof user.emailsList] ??
    false;

  // Derive shouldShow from current state
  const shouldShow =
    !isRegistered &&
    !!visitData &&
    visitData.visits >= MIN_VISITS_TO_SHOW &&
    !visitData.isClosed;

  const isVisible = shouldShow && state.isReady;

  // Initialize visit tracking and determine if toast should show
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!visitData) {
      // First visit - initialize data
      setVisitData({
        visits: 1,
        lastVisit: new Date(),
        hasRegistered: false,
        isClosed: false,
      });
      return;
    }

    let newData = { ...visitData };
    let hasChanged = false;

    // Check if we should increment the visit counter
    if (hasEnoughTimePassedSinceLastVisit(visitData.lastVisit)) {
      newData = {
        ...newData,
        visits: (newData.visits ?? 0) + 1,
        lastVisit: new Date(),
      };
      hasChanged = true;
    }

    if (shouldAutoUnClose(visitData.lastVisit)) {
      newData = {
        ...newData,
        isClosed: false,
      };
      hasChanged = true;
    }

    if (hasChanged) {
      setVisitData(newData);
    }
  }, [visitData, setVisitData]);

  // Handle the 20-second delay before showing the toast
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (shouldShow) {
      timer = setTimeout(() => {
        dispatch({ type: 'SET_READY', payload: true });
      }, VISIBLE_DELAY_TIME);
    } else {
      dispatch({ type: 'SET_READY', payload: false });
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [shouldShow]);

  // Handle close button click - reset all data
  const handleClose = () => {
    setVisitData((prev) => ({
      ...(prev as VisitData),
      isClosed: true,
    }));
  };

  // Handle email registration
  const handleRegister = async (data: EmailSchemaValue) => {
    try {
      await subscribeToNewsletter({
        email: data.email,
        emailList: NEWS_LETTER_KEY,
      });
      // After successful registration, hide the toast
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
        'group fixed right-0 bottom-5 z-[100] mx-8 translate-x-0 border-[2px] border-text px-8 py-6 transition-all duration-500',
        !isVisible && 'translate-x-[120%]',
      ])}
      roundedSize="2xl"
    >
      <div className="flex items-center gap-6 rounded-lg">
        <Mail className="size-6" />
        <Form
          schema={EmailSchema}
          onSubmitSuccess={handleRegister}
          autoComplete
          {...form}
        >
          <span className="font-medium text-sm">{content.value}</span>
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
          className="!absolute top-2 right-2 cursor-pointer"
          size="icon-md"
        />
      </div>
    </Container>
  );
};
