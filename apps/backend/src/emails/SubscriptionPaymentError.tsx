import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type SubscriptionPaymentErrorProps = {
  username: string; // The name of the user receiving the email
  email: string; // The email address of the user
  planName: string; // The name of the subscription plan
  organizationName: string; // The name of the organization
  errorDate: string; // The date the payment error occurred
  retryPaymentLink: string; // A link for the user to retry their payment
};

// Payment Error Email - English (EN)
export const SubscriptionPaymentErrorEN = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `There was an issue with your ${planName} subscription payment`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Payment Issue Detected
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We encountered an issue processing your payment for the{' '}
              <strong>{planName}</strong> plan on <strong>{errorDate}</strong>.
              Please update your payment information to ensure continued access
              to your subscription.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organization: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Retry Payment
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - French (FR)
export const SubscriptionPaymentErrorFR = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Un problème est survenu avec votre paiement pour l'abonnement ${planName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Problème de Paiement
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Nous avons rencontré un problème lors du traitement de votre
              paiement pour le plan <strong>{planName}</strong> le{' '}
              <strong>{errorDate}</strong>. Veuillez mettre à jour vos
              informations de paiement pour garantir un accès continu à votre
              abonnement.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organisation : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Réessayer le Paiement
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Spanish (ES)
export const SubscriptionPaymentErrorES = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Hubo un problema con el pago de tu suscripción ${planName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Problema de Pago
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Hubo un problema al procesar tu pago para el plan{' '}
              <strong>{planName}</strong> el <strong>{errorDate}</strong>. Por
              favor, actualiza tu información de pago para garantizar el acceso
              continuo a tu suscripción.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organización : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Reintentar el Pago
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Preview Props Example
const PreviewProps: SubscriptionPaymentErrorProps = {
  username: 'John Doe',
  email: 'john.doe@example.com',
  planName: 'Pro Plan',
  organizationName: 'My Organization',
  errorDate: 'November 18, 2024',
  retryPaymentLink: 'https://intlayer.org/retry-payment',
};

SubscriptionPaymentErrorEN.PreviewProps = PreviewProps;
SubscriptionPaymentErrorFR.PreviewProps = PreviewProps;
SubscriptionPaymentErrorES.PreviewProps = PreviewProps;
