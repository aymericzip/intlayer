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

export type SubscriptionPaymentCancellationProps = {
  username: string; // The name of the user receiving the email
  email: string; // The email address of the user
  planName: string; // The name of the subscription plan
  organizationName: string; // The name of the organization
  cancellationDate: string; // The date when the subscription will end
  reactivateLink: string; // A link for the user to reactivate their subscription
  billingLink?: string; // A link for the user to see their billing
};

export const SubscriptionPaymentCancellationEN = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Your ${planName} subscription has been canceled`;

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
              Subscription Canceled
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              We’re sorry to see you go! Your subscription to the{' '}
              <strong>{planName}</strong> plan has been canceled. You will still
              have access until <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organization: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Reactivate Your Subscription
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

export const SubscriptionPaymentCancellationFR = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Votre abonnement ${planName} a été annulé`;

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
              Abonnement Annulé
            </Heading>
            <Text className="text-black text-sm leading-6">
              Bonjour {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Nous sommes désolés de vous voir partir ! Votre abonnement au plan{' '}
              <strong>{planName}</strong> a été annulé. Vous aurez toujours
              accès jusqu'au <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Réactiver votre abonnement
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

export const SubscriptionPaymentCancellationES = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Tu suscripción ${planName} ha sido cancelada`;

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
              Suscripción Cancelada
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hola {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Lamentamos verte partir. Tu suscripción al plan{' '}
              <strong>{planName}</strong> ha sido cancelada. Tendrás acceso
              hasta <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organización : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Reactivar tu suscripción
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

export const SubscriptionPaymentCancellationRU = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Ваша подписка на ${planName} была отменена`;

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
              Подписка отменена
            </Heading>
            <Text className="text-black text-sm leading-6">
              Здравствуйте, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Нам жаль, что вы уходите! Ваша подписка на тарифный план{' '}
              <strong>{planName}</strong> была отменена. У вас по-прежнему будет
              доступ до <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Организация: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Возобновить подписку
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

export const SubscriptionPaymentCancellationJA = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `${planName}のサブスクリプションがキャンセルされました`;

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
              サブスクリプションがキャンセルされました
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}様、こんにちは。
            </Text>
            <Text className="text-black text-sm leading-6">
              ご利用ありがとうございました。あなたの<strong>{planName}</strong>
              プランのサブスクリプションがキャンセルされました。
              <strong>{cancellationDate}</strong>
              まで引き続きご利用いただけます。
            </Text>
            <Text className="text-black text-sm leading-6">
              組織: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                サブスクリプションを再開する
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

export const SubscriptionPaymentCancellationKO = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `${planName} 구독이 취소되었습니다`;

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
              구독이 취소되었습니다
            </Heading>
            <Text className="text-black text-sm leading-6">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-black text-sm leading-6">
              함께해주셔서 감사했습니다! 귀하의 <strong>{planName}</strong> 플랜
              구독이 취소되었습니다. <strong>{cancellationDate}</strong>까지는
              계속 이용하실 수 있습니다.
            </Text>
            <Text className="text-black text-sm leading-6">
              조직: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                구독 재활성화하기
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

export const SubscriptionPaymentCancellationZH = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `您的 ${planName} 订阅已取消`;

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
              订阅已取消
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}，您好！
            </Text>
            <Text className="text-black text-sm leading-6">
              很遗憾看到您离开！您的 <strong>{planName}</strong>{' '}
              计划订阅已取消。在 <strong>{cancellationDate}</strong>{' '}
              之前，您仍可访问相关服务。
            </Text>
            <Text className="text-black text-sm leading-6">
              组织：<strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                重新激活您的订阅
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

export const SubscriptionPaymentCancellationDE = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Ihr ${planName}-Abonnement wurde gekündigt`;

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
              Abonnement gekündigt
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hallo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              wir bedauern, dass Sie uns verlassen! Ihr Abonnement für den{' '}
              <strong>{planName}</strong>-Plan wurde gekündigt. Sie haben noch
              bis zum <strong>{cancellationDate}</strong> Zugriff.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Ihr Abonnement reaktivieren
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

export const SubscriptionPaymentCancellationAR = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `تم إلغاء اشتراكك في ${planName}`;

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
              تم إلغاء الاشتراك
            </Heading>
            <Text className="text-black text-sm leading-6">
              أهلاً {username}،
            </Text>
            <Text className="text-black text-sm leading-6">
              نحن ناسف لرحيلك! لقد تم إلغاء اشتراكك في خطة{' '}
              <strong>{planName}</strong>. سيظل بإمكانك الوصول حتى تاريخ{' '}
              <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              المنظمة: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                إعادة تفعيل اشتراكك
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

export const SubscriptionPaymentCancellationIT = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Il tuo abbonamento ${planName} è stato annullato`;

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
              Abbonamento Annullato
            </Heading>
            <Text className="text-black text-sm leading-6">
              Ciao {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Ci dispiace vederti andare via! Il tuo abbonamento al piano{' '}
              <strong>{planName}</strong> è stato annullato. Avrai ancora
              accesso fino al <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organizzazione: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Riattiva il tuo abbonamento
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

export const SubscriptionPaymentCancellationEN_GB = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Your ${planName} subscription has been cancelled`;

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
              Subscription Cancelled
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              We’re sorry to see you go! Your subscription to the{' '}
              <strong>{planName}</strong> plan has been cancelled. You will
              still have access until <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisation: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Reactivate Your Subscription
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

export const SubscriptionPaymentCancellationPT = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Sua assinatura ${planName} foi cancelada`;

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
              Assinatura Cancelada
            </Heading>
            <Text className="text-black text-sm leading-6">
              Olá {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Lamentamos ver você partir! Sua assinatura do plano{' '}
              <strong>{planName}</strong> foi cancelada. Você ainda terá acesso
              até <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organização: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Reativar sua assinatura
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

export const SubscriptionPaymentCancellationHI = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `आपकी ${planName} सदस्यता रद्द कर दी गई है`;

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
              सदस्यता रद्द कर दी गई
            </Heading>
            <Text className="text-black text-sm leading-6">
              नमस्ते {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              हमें आपको जाते हुए देखकर दुख हो रहा है! आपकी <strong>{planName}</strong>{' '}
              योजना की सदस्यता रद्द कर दी गई है। आपके पास अभी भी{' '}
              <strong>{cancellationDate}</strong> तक पहुँच होगी।
            </Text>
            <Text className="text-black text-sm leading-6">
              संगठन: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                अपनी सदस्यता को फिर से सक्रिय करें
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

export const SubscriptionPaymentCancellationTR = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `${planName} aboneliğiniz iptal edildi`;

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
              Abonelik İptal Edildi
            </Heading>
            <Text className="text-black text-sm leading-6">
              Merhaba {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Ayrıldığınız için üzgünüz! <strong>{planName}</strong> planına
              olan aboneliğiniz iptal edildi.{' '}
              <strong>{cancellationDate}</strong> tarihine kadar erişiminiz
              devam edecektir.
            </Text>
            <Text className="text-black text-sm leading-6">
              Kuruluş: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Aboneliğinizi Yeniden Etkinleştirin
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

export const SubscriptionPaymentCancellationPL = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Twoja subskrypcja ${planName} została anulowana`;

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
              Subskrypcja Anulowana
            </Heading>
            <Text className="text-black text-sm leading-6">
              Witaj {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Przykro nam, że odchodzisz! Twoja subskrypcja planu{' '}
              <strong>{planName}</strong> została anulowana. Nadal będziesz mieć
              dostęp do <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organizacja: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Reaktywuj swoją subskrypcję
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

export const SubscriptionPaymentCancellationID = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Langganan ${planName} Anda telah dibatalkan`;

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
              Langganan Dibatalkan
            </Heading>
            <Text className="text-black text-sm leading-6">
              Halo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Kami sedih melihat Anda pergi! Langganan Anda ke paket{' '}
              <strong>{planName}</strong> telah dibatalkan. Anda masih akan
              memiliki akses hingga <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Organisasi: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Aktifkan Kembali Langganan Anda
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

export const SubscriptionPaymentCancellationVI = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Gói thuê bao ${planName} của bạn đã bị hủy`;

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
              Thuê Bao Đã Bị Hủy
            </Heading>
            <Text className="text-black text-sm leading-6">
              Xin chào {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Chúng tôi rất tiếc khi thấy bạn rời đi! Gói thuê bao{' '}
              <strong>{planName}</strong> của bạn đã bị hủy. Bạn vẫn sẽ có quyền
              truy cập cho đến ngày <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Tổ chức: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Kích hoạt lại gói thuê bao của bạn
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

export const SubscriptionPaymentCancellationUK = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
  billingLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Вашу підписку на ${planName} скасовано`;

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
              Підписку скасовано
            </Heading>
            <Text className="text-black text-sm leading-6">
              Вітаємо, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Нам шкода, що ви йдете! Вашу підписку на тарифний план{' '}
              <strong>{planName}</strong> скасовано. У вас все ще буде доступ до{' '}
              <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-black text-sm leading-6">
              Організація: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={reactivateLink}
              >
                Відновити підписку
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

const PreviewProps: SubscriptionPaymentCancellationProps = {
  username: 'John Doe',
  email: 'john.doe@example.com',
  planName: 'Pro Plan',
  organizationName: 'My Organization',
  cancellationDate: 'November 30, 2024',
  reactivateLink: 'https://intlayer.org/reactivate-subscription',
};

SubscriptionPaymentCancellationEN.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationFR.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationES.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationRU.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationJA.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationKO.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationZH.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationDE.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationAR.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationIT.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationEN_GB.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationPT.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationHI.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationTR.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationPL.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationID.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationVI.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationUK.PreviewProps = PreviewProps;
