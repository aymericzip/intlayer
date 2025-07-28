import { PagesRoutes } from '@/Routes';
import type { Period, Plans } from '@components/PricingPage/data.content';
import {
  Button,
  Container,
  H2,
  H3,
  Label,
  Loader,
} from '@intlayer/design-system';
import { useAuth, useGetSubscription } from '@intlayer/design-system/hooks';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { Check, ShoppingCart } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC, type FormEvent, useState } from 'react';
import type Stripe from 'stripe';
import { retrievePriceId } from '../retrievePriceId';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';

type PaymentStepContentProps = {
  plan: Plans;
  period: Period;
  invoice: Stripe.Invoice;
};

const PaymentDetails: FC<PaymentStepContentProps> = ({
  plan,
  period,
  invoice,
}) => {
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
        <span className="relative m-auto text-center text-4xl font-bold">
          <span itemProp="price" className="hidden">
            {total.toFixed(2)}
          </span>
          <span>{total.toFixed(2).split('.')[0]}</span>
          <span className="text-2xl">
            {'.' + total.toFixed(2).split('.')[1]}
          </span>
          <span className="text-lg" itemProp="priceCurrency">
            $
          </span>

          {hasDiscount && (
            <span className="text-neutral top-1/5 scale-80 absolute left-full m-auto text-center text-2xl font-bold">
              <span className="bg-neutral absolute left-0 top-1/2 h-[2px] w-full" />

              <span itemProp="price" className="hidden">
                {subtotal.toFixed(2)}
              </span>
              <span>{subtotal.toFixed(2).split('.')[0]}</span>
              <span className="text-xl">
                {'.' + subtotal.toFixed(2).split('.')[1]}
              </span>
              <span className="text-base" itemProp="priceCurrency">
                $
              </span>
            </span>
          )}
        </span>

        <span
          className="text-neutral text-center text-lg"
          itemProp="priceValidUntil"
        >
          {periodContent[period]}
        </span>
      </div>

      <span
        className="text-neutral justify-center text-xs"
        itemProp="description"
      >
        {description}
      </span>
    </>
  );
};

export const PaymentStepContent: FC<PaymentStepContentProps> = ({
  plan,
  period,
  invoice,
}) => {
  const { goNextStep, goPreviousStep, setState, nextUrl } = useStep(
    Steps.Payment
  );
  const { youReOrganizationIsAlreadySubscribed, pickANewProductButton } =
    useIntlayer('payment-step');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { session } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const planData = session?.organization?.plan;

  const isPlanValid =
    planData &&
    planData?.type.toUpperCase() === plan.toUpperCase() &&
    planData.status === 'active';

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <form onSubmit={onSubmit} autoComplete="on" className="flex flex-col gap-6">
      <StepLayout onGoToPreviousStep={goPreviousStep} isLoading={isLoading}>
        <Label>Payment details</Label>
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
            <div className="bg-success/30 m-auto aspect-square rounded-full p-5">
              <Check className="text-success" size={50} />
            </div>
            <span className="text-center text-base">
              {youReOrganizationIsAlreadySubscribed.title}
            </span>
            <Button
              label={pickANewProductButton.label.value}
              color="text"
              Icon={ShoppingCart}
              onClick={() => router.push(PagesRoutes.Pricing)}
            >
              {pickANewProductButton.text}
            </Button>
          </>
        ) : (
          <PaymentElement />
        )}
      </StepLayout>
    </form>
  );
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const PaymentStepForm: FC<PaymentStepContentProps> = ({
  plan,
  period,
}) => {
  const {
    title,
    incorrectProductMessage,
    invalidPaymentRequestMessage,
    pickANewProductButton,
  } = useIntlayer('payment-step');

  const { theme } = useTheme();
  const router = useRouter();
  const params = useSearchParams();
  const promoCode = params.get('promoCode') ?? undefined;
  const priceId = retrievePriceId(plan, period);

  if (!priceId) {
    return <>Error</>;
  }

  const { data, isLoading } = useGetSubscription({
    autoFetch: true,
    enable: true,
    args: [
      {
        priceId,
        promoCode,
      },
    ],
  });

  const invoice = data?.data?.subscription?.latest_invoice as Stripe.Invoice & {
    confirmation_secret?: { client_secret: string };
  };
  const clientSecret = invoice?.confirmation_secret?.client_secret;

  const isDarkMode = theme === 'dark';

  const appearance = isDarkMode ? appearanceDark : appearanceLight;

  return (
    <>
      <H2 className="mb-4 mt-0">{title}</H2>
      {!priceId && <span>{incorrectProductMessage}</span>}
      <Loader isLoading={isLoading}>
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
            className="text-error gap-6 p-6 text-sm"
            background="none"
            border
            roundedSize="xl"
          >
            <span>{invalidPaymentRequestMessage}</span>
            <Button
              label={pickANewProductButton.label.value}
              color="text"
              Icon={ShoppingCart}
              onClick={() => router.push(PagesRoutes.Pricing)}
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
    fontFamily: 'Inter Variable, sans-serif',
    fontSizeBase: '1rem',
    borderRadius: '0.75rem',
    colorBackground: 'rgba(255, 255, 255, 1)',
    colorText: 'rgba(18, 18, 18, 1)',
    colorDanger: 'rgba(181, 24, 13, 1)', // Invalid border color
  },
  rules: {
    '.Input': {
      border: '2px solid rgba(246, 246, 246, 1)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
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
      borderColor: 'rgba(231, 231, 231, 1)',
    },
    '.Input:focus': {
      borderColor: 'rgba(209, 209, 209, 1)',
      boxShadow: 'none',
      outline: 'none',
    },
    '.Input:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    '.Label': {
      fontSize: '1rem', // text-sm
      fontWeight: '700', // font-medium
      lineHeight: '1', // leading-none
      color: 'rgba(18, 18, 18, 1)', // Match input text color
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
    fontFamily: 'Inter Variable, sans-serif',
    fontSizeBase: '1rem',
    borderRadius: '0.75rem',
    colorBackground: 'rgba(61, 61, 61, 1)',
    colorText: 'rgba(246, 246, 246, 1)',
    colorDanger: 'rgba(255, 88, 77, 1)', // Invalid border color
  },
  rules: {
    '.Input': {
      border: '2px solid rgba(79, 79, 79, 1)',
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
      borderColor: 'rgba(93, 93, 93, 1)',
    },
    '.Input:focus': {
      borderColor: 'rgba(176, 176, 176, 1)',
      boxShadow: 'none',
      outline: 'none',
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
    },
    '.Label--disabled': {
      cursor: 'not-allowed',
      opacity: '0.7',
    },
  },
};
