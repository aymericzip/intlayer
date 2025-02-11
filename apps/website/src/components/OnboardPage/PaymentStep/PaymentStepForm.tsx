import type { Period, Plans } from '@components/PricingPage/data.content';
import {
  Button,
  Container,
  H2,
  H3,
  Label,
  Loader,
  useAuth,
} from '@intlayer/design-system';
import { useGetSubscription } from '@intlayer/design-system/hooks';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { Check, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import { type FormEvent, useState, type FC } from 'react';
import { retrievePriceId } from '../retrievePriceId';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import { PagesRoutes } from '@/Routes';

type PaymentStepContentProps = {
  plan: Plans;
  period: Period;
};

const PaymentDetails: FC<PaymentStepContentProps> = ({ plan, period }) => {
  const { pricing, period: periodContent } = useIntlayer('pricing');
  const { title, price, description } = pricing[period][plan];

  return (
    <>
      <H3 className="mt-4 text-center" itemProp="name">
        {title}
      </H3>
      <div className="mb-6 flex flex-col justify-center gap-3">
        <span className="text-center text-4xl font-bold">
          <span itemProp="price" className="hidden">
            {price.value.toFixed(2)}
          </span>
          <span>{price.value.toFixed(2).split('.')[0]}</span>
          <span className="text-2xl">
            {'.' + price.value.toFixed(2).split('.')[1]}
          </span>
          <span className="text-lg" itemProp="priceCurrency">
            $
          </span>
        </span>
        <span
          className="text-neutral dark:text-neutral-dark text-center text-lg"
          itemProp="priceValidUntil"
        >
          {periodContent[period]}
        </span>
      </div>

      <span
        className="text-neutral dark:text-neutral-dark justify-center text-xs"
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
          <PaymentDetails plan={plan} period={period} />
        </Container>

        {isPlanValid ? (
          <>
            <div className="bg-success/30 dark:bg-success-dark/30 m-auto aspect-square rounded-full p-5">
              <Check
                className="text-success dark:text-success-dark"
                size={50}
              />
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

export const PaymentStepForm: FC<PaymentStepContentProps> = ({
  plan,
  period,
}) => {
  const { title, incorrectProductMessage } = useIntlayer('payment-step');
  const { theme } = useTheme();
  const priceId = retrievePriceId(plan, period);

  const { data, isLoading } = useGetSubscription({
    autoFetch: true,
    enable: true,
    args: {
      priceId,
    },
  });

  const isDarkMode = theme === 'dark';

  const appearance = isDarkMode ? appearanceDark : appearanceLight;

  return (
    <>
      <H2 className="mb-4">{title}</H2>
      {!priceId && <span>{incorrectProductMessage}</span>}

      <Loader isLoading={isLoading}>
        {data?.data?.clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: data.data.clientSecret,
              appearance,
            }}
          >
            <PaymentStepContent plan={plan} period={period} />
          </Elements>
        )}
      </Loader>
    </>
  );
};
