import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type SubscriptionPaymentSuccessProps = {
  username: string; // The name of the user receiving the email
  email: string; // The email address of the user
  planName: string; // The name of the subscription plan
  organizationName: string; // The name of the organization
  subscriptionStartDate: string; // The start date of the subscription
  manageSubscriptionLink: string; // A link for the user to manage their subscription
  billingLink?: string; // A link for the user to see their billing
};

export const SubscriptionPaymentSuccessEN = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Your payment for ${planName} subscription is confirmed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Payment Confirmed
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Thank you for your payment! Your subscription to the{' '}
              <strong>{planName}</strong> plan is now active.
            </Text>
            <Text className="text-black text-sm leading-6">
              Start Date: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organization: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Manage Your Subscription
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessFR = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Votre paiement pour l'abonnement ${planName} est confirmé`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Paiement Confirmé
            </Heading>
            <Text className="text-black text-sm leading-6">
              Bonjour {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Merci pour votre paiement ! Votre abonnement au plan{' '}
              <strong>{planName}</strong> est maintenant actif.
            </Text>
            <Text className="text-black text-sm leading-6">
              Date de début : <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Gérer votre abonnement
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessES = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Tu pago por la suscripción ${planName} ha sido confirmado`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Pago Confirmado
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hola {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              ¡Gracias por tu pago! Tu suscripción al plan{' '}
              <strong>{planName}</strong> ya está activa.
            </Text>
            <Text className="text-black text-sm leading-6">
              Fecha de inicio: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organización: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Gestionar tu suscripción
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessRU = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Ваш платеж за подписку на ${planName} подтвержден`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Платеж подтвержден
            </Heading>
            <Text className="text-black text-sm leading-6">
              Здравствуйте, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Спасибо за оплату! Ваша подписка на тарифный план{' '}
              <strong>{planName}</strong> теперь активна.
            </Text>
            <Text className="text-black text-sm leading-6">
              Дата начала: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Организация: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Управление подпиской
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessJA = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `${planName}のサブスクリプション支払いが確認されました`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              お支払いが確認されました
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}様、こんにちは。
            </Text>
            <Text className="text-black text-sm leading-6">
              お支払いいありがとうございました！あなたの
              <strong>{planName}</strong>
              プランのサブスクリプションが有効になりました。
            </Text>
            <Text className="text-black text-sm leading-6">
              開始日: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              組織: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                サブスクリプションを管理する
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessKO = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `${planName} 구독 결제가 확인되었습니다`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              결제 확인됨
            </Heading>
            <Text className="text-black text-sm leading-6">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-black text-sm leading-6">
              결제해 주셔서 감사합니다! 귀하의 <strong>{planName}</strong> 플랜
              구독이 이제 활성화되었습니다.
            </Text>
            <Text className="text-black text-sm leading-6">
              시작일: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              조직: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                구독 관리하기
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessZH = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `您的 ${planName} 订阅支付已确认`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              支付已确认
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}，您好！
            </Text>
            <Text className="text-black text-sm leading-6">
              感谢您的支付！您的 <strong>{planName}</strong> 计划订阅现已激活。
            </Text>
            <Text className="text-black text-sm leading-6">
              开始日期：<strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              组织：<strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                管理您的订阅
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessDE = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Ihre Zahlung für das ${planName}-Abonnement wurde bestätigt`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Zahlung bestätigt
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hallo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              vielen Dank für Ihre Zahlung! Ihr Abonnement für den{' '}
              <strong>{planName}</strong>-Plan ist nun aktiv.
            </Text>
            <Text className="text-black text-sm leading-6">
              Startdatum: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Ihr Abonnement verwalten
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessAR = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `تم تأكيد دفعتك لاشتراك ${planName}`;

  return (
    <Html dir="rtl">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              تم تأكيد الدفع
            </Heading>
            <Text className="text-black text-sm leading-6">
              أهلاً {username}،
            </Text>
            <Text className="text-black text-sm leading-6">
              شكراً لك على الدفع! اشتراكك في خطة <strong>{planName}</strong> أصبح
              نشطاً الآن.
            </Text>
            <Text className="text-black text-sm leading-6">
              تاريخ البدء: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              المنظمة: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                إدارة اشتراكك
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessIT = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Il tuo pagamento per l'abbonamento ${planName} è confermato`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Pagamento Confermato
            </Heading>
            <Text className="text-black text-sm leading-6">
              Ciao {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Grazie per il tuo pagamento! Il tuo abbonamento al piano{' '}
              <strong>{planName}</strong> è ora attivo.
            </Text>
            <Text className="text-black text-sm leading-6">
              Data di inizio: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organizzazione: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Gestisci il tuo abbonamento
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessEN_GB = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Your payment for ${planName} subscription is confirmed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Payment Confirmed
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Thank you for your payment! Your subscription to the{' '}
              <strong>{planName}</strong> plan is now active.
            </Text>
            <Text className="text-black text-sm leading-6">
              Start Date: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Manage Your Subscription
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessPT = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Seu pagamento para a assinatura ${planName} está confirmado`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Pagamento Confirmado
            </Heading>
            <Text className="text-black text-sm leading-6">
              Olá {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Obrigado pelo seu pagamento! Sua assinatura do plano{' '}
              <strong>{planName}</strong> está agora ativa.
            </Text>
            <Text className="text-black text-sm leading-6">
              Data de início: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organização: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Gerencie sua assinatura
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessHI = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `${planName} सदस्यता के लिए आपका भुगतान पुष्ट हो गया है`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              भुगतान पुष्ट
            </Heading>
            <Text className="text-black text-sm leading-6">
              नमस्ते {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              आपके भुगतान के लिए धन्यवाद! <strong>{planName}</strong> योजना की आपकी
              सदस्यता अब सक्रिय है।
            </Text>
            <Text className="text-black text-sm leading-6">
              प्रारंभ तिथि: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              संगठन: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                अपनी सदस्यता प्रबंधित करें
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessTR = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `${planName} aboneliği için ödemeniz onaylandı`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Ödeme Onaylandı
            </Heading>
            <Text className="text-black text-sm leading-6">
              Merhaba {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Ödemeniz için teşekkür ederiz! <strong>{planName}</strong> planına
              olan aboneliğiniz artık aktif.
            </Text>
            <Text className="text-black text-sm leading-6">
              Başlangıç Tarihi: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Kuruluş: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Aboneliğinizi Yönetin
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessPL = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Twoja płatność za subskrypcję ${planName} została potwierdzona`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Płatność Potwierdzona
            </Heading>
            <Text className="text-black text-sm leading-6">
              Witaj {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Dziękujemy za płatność! Twoja subskrypcja planu{' '}
              <strong>{planName}</strong> jest teraz aktywna.
            </Text>
            <Text className="text-black text-sm leading-6">
              Data rozpoczęcia: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organizacja: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Zarządzaj swoją subskrypcją
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessID = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Pembayaran Anda untuk langganan ${planName} telah dikonfirmasi`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Pembayaran Dikonfirmasi
            </Heading>
            <Text className="text-black text-sm leading-6">
              Halo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Terima kasih atas pembayaran Anda! Langganan Anda ke paket{' '}
              <strong>{planName}</strong> sekarang sudah aktif.
            </Text>
            <Text className="text-black text-sm leading-6">
              Tanggal Mulai: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisasi: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Kelola Langganan Anda
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessVI = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Thanh toán cho gói thuê bao ${planName} của bạn đã được xác nhận`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Thanh Toán Đã Được Xác Nhận
            </Heading>
            <Text className="text-black text-sm leading-6">
              Xin chào {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Cảm ơn bạn đã thanh toán! Gói thuê bao <strong>{planName}</strong>{' '}
              của bạn hiện đã được kích hoạt.
            </Text>
            <Text className="text-black text-sm leading-6">
              Ngày bắt đầu: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Tổ chức: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Quản lý gói thuê bao của bạn
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentSuccessUK = ({
  username,
  planName,
  organizationName,
  subscriptionStartDate,
  manageSubscriptionLink,
  billingLink,
}: SubscriptionPaymentSuccessProps) => {
  const previewText = `Ваш платіж за підписку на ${planName} підтверджено`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-5">
            <Section className="mt-8">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-2xl text-black">
              Платіж підтверджено
            </Heading>
            <Text className="text-black text-sm leading-6">
              Вітаємо, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Дякуємо за оплату! Ваша підписка на тарифний план{' '}
              <strong>{planName}</strong> тепер активна.
            </Text>
            <Text className="text-black text-sm leading-6">
              Дата початку: <strong>{subscriptionStartDate}</strong>
            </Text>
            <Text className="text-black text-sm leading-6">
              Організація: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={manageSubscriptionLink}
              >
                Керувати підпискою
              </Button>
            </Section>
            {billingLink && (
              <Section className="mt-8 text-center">
                <Text className="text-[#666666] text-xs leading-6">
                  <Link href={billingLink} className="text-black underline">
                    See your billing
                  </Link>
                </Text>
              </Section>
            )}
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
  organizationName: 'My Organization',
  subscriptionStartDate: 'November 20, 2024',
  manageSubscriptionLink: 'https://intlayer.org/manage-subscription',
};

SubscriptionPaymentSuccessEN.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessFR.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessES.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessRU.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessJA.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessKO.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessZH.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessDE.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessAR.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessIT.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessEN_GB.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessPT.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessHI.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessTR.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessPL.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessID.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessVI.PreviewProps = PreviewProps;
SubscriptionPaymentSuccessUK.PreviewProps = PreviewProps;
