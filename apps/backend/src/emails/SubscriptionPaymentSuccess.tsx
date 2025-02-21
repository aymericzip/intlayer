import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Section,
  Img,
  Heading,
  Container,
  Button,
  Text,
} from '@react-email/components';

export type SubscriptionPaymentSuccessProps = {
  username: string; // The name of the user receiving the email
  email: string; // The email address of the user
  planName: string; // The name of the subscription plan
  subscriptionStartDate: string; // The start date of the subscription
  manageSubscriptionLink: string; // A link for the user to manage their subscription
};

export const SubscriptionPaymentSuccessEN = ({
  username,
  planName,
  subscriptionStartDate,
  manageSubscriptionLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Your payment for ${planName} subscription is confirmed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Payment Confirmed
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for your payment! Your subscription to the{' '}
              <strong>{planName}</strong> plan is now active.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Start Date: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={manageSubscriptionLink}
              >
                Manage Your Subscription
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessFR = ({
  username,
  planName,
  subscriptionStartDate,
  manageSubscriptionLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Votre paiement pour l'abonnement ${planName} est confirmé`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Paiement Confirmé
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Merci pour votre paiement ! Votre abonnement au plan{' '}
              <strong>{planName}</strong> est maintenant actif.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Date de début : <strong>{subscriptionStartDate}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={manageSubscriptionLink}
              >
                Gérer votre abonnement
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessES = ({
  username,
  planName,
  subscriptionStartDate,
  manageSubscriptionLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Tu pago por la suscripción ${planName} ha sido confirmado`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Pago Confirmado
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              ¡Gracias por tu pago! Tu suscripción al plan{' '}
              <strong>{planName}</strong> ya está activa.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Fecha de inicio: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={manageSubscriptionLink}
              >
                Gestionar tu suscripción
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: SubscriptionPaymentSuccessProps = {
  username: 'John Doe',
  email: 'john.doe@example.com',
  planName: 'Pro Plan',
  subscriptionStartDate: 'November 20, 2024',
  manageSubscriptionLink: 'https://intlayer.org/manage-subscription',
};

SubscriptionPaymentSuccessEN.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessFR.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessES.PreviewProps = PreviewProps;
