import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2, H3 } from '@intlayer/design-system/headers';
import { useGetSubscription, useSession } from '@intlayer/design-system/hooks';
import { Label } from '@intlayer/design-system/label';
import { Loader } from '@intlayer/design-system/loader';
import { App_Pricing_Path } from '@intlayer/design-system/routes';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { useSearch } from '@tanstack/react-router';
import { Check, ShoppingCart } from 'lucide-react';
import { type FC, type SubmitEvent, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import type Stripe from 'stripe';
import { useTheme } from '#/providers/ThemeProvider';
import type { Period, Plans } from '#components/PricingPage/data.content';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { retrievePriceId } from '../retrievePriceId';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';

type PaymentDetailsProps = {
  plan: Plans;
  period: Period;
  invoice: Stripe.Invoice;
};

const PaymentDetails: FC<PaymentDetailsProps> = ({ plan, period, invoice }) => {
  const { pricing, period: periodContent } = useIntlayer('pricing');
  const { title, description } = pricing[period][plan];
  const subtotal = invoice.subtotal / 100;
  const total = invoice.total / 100;

  const hasDiscount = subtotal !== total;

  return (
    <>
      <H3 className="mt-4 text-center" itemProp="name">
        {title}
      </H3>
      <div className="mb-6 flex flex-col justify-center gap-3">
        <span className="relative m-auto text-center font-bold text-4xl">
          <span itemProp="price" className="hidden">
            {total.toFixed(2)}
          </span>
          <span>{total.toFixed(2).split('.')[0]}</span>
          <span className="text-2xl">
            {`.${total.toFixed(2).split('.')[1]}`}
          </span>
          <span className="text-lg" itemProp="priceCurrency">
            $
          </span>

          {hasDiscount && (
            <span className="absolute top-1/5 left-full m-auto scale-80 text-center font-bold text-2xl text-neutral">
              <span className="absolute top-1/2 left-0 h-[2px] w-full bg-neutral" />

              <span itemProp="price" className="hidden">
                {subtotal.toFixed(2)}
              </span>
              <span>{subtotal.toFixed(2).split('.')[0]}</span>
              <span className="text-xl">
                {`.${subtotal.toFixed(2).split('.')[1]}`}
              </span>
              <span className="text-base" itemProp="priceCurrency">
                $
              </span>
            </span>
          )}
        </span>

        <span
          className="text-center text-lg text-neutral"
          itemProp="priceValidUntil"
        >
          {periodContent[period]}
        </span>
      </div>

      <span
        className="justify-center text-neutral text-xs"
        itemProp="description"
      >
        {description}
      </span>
    </>
  );
};

export const PaymentStepContent: FC<PaymentDetailsProps> = ({
  plan,
  period,
  invoice,
}) => {
  const { goNextStep, goPreviousStep, setState, nextUrl } = useStep(
    Steps.Payment
  );
  const {
    youReOrganizationIsAlreadySubscribed,
    pickANewProductButton,
    paymentDetails,
  } = useIntlayer('payment-step');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);
  const navigate = useLocalizedNavigate();
  const { session } = useSession();

  const stripe = useStripe();
  const elements = useElements();

  const planData = session?.organization?.plan;

  const isPlanValid =
    planData &&
    planData?.type.toUpperCase() === plan.toUpperCase() &&
    planData.status === 'active';

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPlanValid) {
      goNextStep();
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Ensure the Payment Element is mounted before confirming
    const mountedPaymentElement = elements.getElement(PaymentElement);
    if (!mountedPaymentElement) {
      console.error('PaymentElement is not mounted yet.');
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${nextUrl}`,
        },
      })
      .then((result) => {
        if (result.error) {
          console.error(result.error);
        } else {
          setState({
            isPaymentSuccessful: true,
          });
          goNextStep();
        }
      });

    setIsLoading(false);
  };

  const isSubmitDisabled =
    isLoading || (!isPlanValid && !isPaymentElementReady);

  return (
    <form onSubmit={onSubmit} autoComplete="on" className="flex flex-col gap-6">
      <StepLayout
        onGoToPreviousStep={goPreviousStep}
        isLoading={isLoading}
        disabled={isSubmitDisabled}
      >
        <Label>{paymentDetails.title}</Label>
        <Container
          border={true}
          padding="xl"
          roundedSize="xl"
          transparency="full"
          gap="xl"
        >
          <PaymentDetails plan={plan} period={period} invoice={invoice} />
        </Container>

        {isPlanValid ? (
          <>
            <div className="m-auto aspect-square rounded-full bg-success/30 p-5">
              <Check className="text-success" size={50} />
            </div>
            <span className="text-center text-base">
              {youReOrganizationIsAlreadySubscribed.title}
            </span>
            <Button
              label={pickANewProductButton.label.value}
              color="text"
              Icon={ShoppingCart}
              onClick={() => navigate({ to: App_Pricing_Path })}
            >
              {pickANewProductButton.text}
            </Button>
          </>
        ) : (
          <PaymentElement onReady={() => setIsPaymentElementReady(true)} />
        )}
      </StepLayout>
    </form>
  );
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

type PaymentStepContentProps = {
  plan: Plans;
  period: Period;
};

export const PaymentStepForm: FC<PaymentStepContentProps> = ({
  plan,
  period,
}) => {
  const {
    title,
    incorrectProductMessage,
    invalidPaymentRequestMessage,
    pickANewProductButton,
    error,
  } = useIntlayer('payment-step');

  const { resolvedTheme } = useTheme();
  const navigate = useLocalizedNavigate();
  const search = useSearch({ strict: false }) as any;
  const promoCode = search.promoCode ?? undefined;
  const priceId = retrievePriceId(plan, period);

  const { data, isLoading } = useGetSubscription({
    priceId: priceId!,
    promoCode,
  });

  if (!priceId) {
    return <>{error}</>;
  }

  const invoice = data?.data?.subscription?.latest_invoice as Stripe.Invoice & {
    confirmation_secret?: { client_secret: string };
  };
  const clientSecret = invoice?.confirmation_secret?.client_secret;

  const isDarkMode = resolvedTheme === 'dark';

  const appearance = isDarkMode ? appearanceDark : appearanceLight;

  return (
    <>
      <H2 className="mt-0 mb-4">{title}</H2>
      <Loader isLoading={isLoading}>
        {!priceId && <span>{incorrectProductMessage}</span>}
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance,
            }}
          >
            <PaymentStepContent plan={plan} period={period} invoice={invoice} />
          </Elements>
        ) : (
          <Container
            className="gap-6 p-6 text-error text-sm"
            background="none"
            border
            roundedSize="xl"
          >
            <span>{invalidPaymentRequestMessage}</span>
            <Button
              label={pickANewProductButton.label.value}
              color="text"
              Icon={ShoppingCart}
              onClick={() => navigate({ to: App_Pricing_Path })}
            >
              {pickANewProductButton.text}
            </Button>
          </Container>
        )}
      </Loader>
    </>
  );
};

const appearanceLight: Appearance = {
  theme: 'flat',
  variables: {
    fontFamily: 'Inter, sans-serif',
    fontSizeBase: '1rem',
    borderRadius: '0.75rem',

    colorBackground: 'transparent',
    colorText: 'rgba(18, 18, 18, 1)',
    colorDanger: 'rgba(181, 24, 13, 1)',
  },
  rules: {
    '.AccordionItem': {
      backgroundColor: 'transparent',
      color: 'rgba(18, 18, 18, 1)',
      border: '1px solid rgba(18, 18, 18, 1)',
    },
    '.AccordionItem--selected': {
      backgroundColor: 'transparent',
      color: 'rgba(18, 18, 18, 1)',
    },
    '.TabIcon': {
      fill: 'rgba(18, 18, 18, 1)',
    },

    '.Block': {
      backgroundColor: 'transparent',
    },
    '.Input': {
      border: 'none',
      backgroundColor: 'rgba(249, 249, 249, 1)',
      color: 'rgba(18, 18, 18, 1)',
      borderRadius: '0.75rem',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      boxShadow: 'none',
      outline: 'none',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    '.Input:hover': {
      boxShadow: '0 0 0 3px rgba(18, 18, 18, 0.2)',
    },
    '.Input:focus': {
      boxShadow: '0 0 0 4px rgba(18, 18, 18, 0.2)',
    },
    '.Input:focus-visible': {
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(18, 18, 18, 0.2)',
    },

    '.Input:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    '.Label': {
      fontSize: '1rem',
      fontWeight: '700',
      lineHeight: '1',
      color: 'rgba(18, 18, 18, 1)',
      margin: '1rem 0',
    },
    '.Label--disabled': {
      cursor: 'not-allowed',
      opacity: '0.7',
    },
  },
};

const appearanceDark: Appearance = {
  theme: 'flat',
  variables: {
    fontFamily: 'Inter, sans-serif',
    fontSizeBase: '1rem',
    borderRadius: '0.75rem',
    colorBackground: 'transparent',
    colorText: 'rgba(246, 246, 246, 1)',
    colorDanger: 'rgba(255, 88, 77, 1)',
  },
  rules: {
    '.AccordionItem': {
      backgroundColor: 'transparent',
      color: 'rgba(93, 93, 93, 1)',
    },
    '.AccordionItem--selected': {
      backgroundColor: 'transparent',
      color: 'rgba(246, 246, 246, 1)',
    },
    '.TabIcon': {
      fill: 'rgba(246, 246, 246, 1)',
    },

    '.Block': {
      backgroundColor: 'transparent',
    },
    '.Input': {
      border: 'none',
      backgroundColor: 'rgba(61, 61, 61, 1)',
      color: 'rgba(246, 246, 246, 1)',
      borderRadius: '0.75rem',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      boxShadow: 'none',
      outline: 'none',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },

    '.Input:hover': {
      // Matches hover:ring-3 ring-text/20
      boxShadow: '0 0 0 3px rgba(255, 245, 237, 0.2)',
    },
    '.Input:focus': {
      // Matches focus-within:ring-4 ring-text/20
      boxShadow: '0 0 0 4px rgba(255, 245, 237, 0.2)',
    },
    '.Input:focus-visible': {
      // Catches browsers that apply default blue rings
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(255, 245, 237, 0.2)',
    },

    '.Input:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    '.Label': {
      fontSize: '1rem', // text-sm
      fontWeight: '700', // font-medium
      lineHeight: '1', // leading-none
      color: 'rgba(255, 245, 237, 1)', // Match input text color
      margin: '1rem 0',
    },
    '.Label--disabled': {
      cursor: 'not-allowed',
      opacity: '0.7',
    },
  },
};
