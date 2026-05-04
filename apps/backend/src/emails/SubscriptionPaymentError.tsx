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

// Payment Error Email - Russian (RU)
export const SubscriptionPaymentErrorRU = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Возникла проблема с оплатой вашей подписки на ${planName}`;

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
              Обнаружена проблема с оплатой
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              При обработке вашего платежа за тарифный план{' '}
              <strong>{planName}</strong> от <strong>{errorDate}</strong>{' '}
              возникла проблема. Пожалуйста, обновите свою платежную информацию,
              чтобы обеспечить непрерывный доступ к вашей подписке.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Организация: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Повторить попытку оплаты
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Japanese (JA)
export const SubscriptionPaymentErrorJA = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `${planName}のサブスクリプション支払いに問題が発生しました`;

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
              支払いの問題が検出されました
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{errorDate}</strong>に行われた<strong>{planName}</strong>
              プランのお支払い処理中に問題が発生しました。サブスクリプションへのアクセスを継続するために、お支払い情報を更新してください。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              組織: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                支払いを再試行する
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Korean (KO)
export const SubscriptionPaymentErrorKO = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `${planName} 구독 결제에 문제가 발생했습니다`;

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
              결제 문제 발생
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{errorDate}</strong>에 귀하의 <strong>{planName}</strong>{' '}
              플랜 결제를 처리하는 도중 문제가 발생했습니다. 구독을 계속
              유지하시려면 결제 정보를 업데이트해 주세요.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              조직: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                결제 재시도하기
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Chinese (ZH)
export const SubscriptionPaymentErrorZH = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `您的 ${planName} 订阅支付出现问题`;

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
              检测到支付问题
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              我们在处理您 <strong>{errorDate}</strong> 的{' '}
              <strong>{planName}</strong>{' '}
              计划支付时遇到问题。请更新您的支付信息，
              以确保能够持续访问您的订阅。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              组织：<strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                重试支付
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - German (DE)
export const SubscriptionPaymentErrorDE = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Es gab ein Problem mit Ihrer Zahlung für das ${planName}-Abonnement`;

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
              Zahlungsproblem erkannt
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              beim Verarbeiten Ihrer Zahlung für den <strong>{planName}</strong>
              -Plan am <strong>{errorDate}</strong> ist ein Problem aufgetreten.
              Bitte aktualisieren Sie Ihre Zahlungsinformationen, um den
              fortlaufenden Zugriff auf Ihr Abonnement zu gewährleisten.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organisation: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Zahlung erneut versuchen
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Arabic (AR)
export const SubscriptionPaymentErrorAR = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `كانت هناك مشكلة في دفع اشتراكك في ${planName}`;

  return (
    <Html dir="rtl">
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
              تم اكتشاف مشكلة في الدفع
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              لقد واجهنا مشكلة في معالجة دفعتك لخطة <strong>{planName}</strong>{' '}
              بتاريخ <strong>{errorDate}</strong>. يرجى تحديث معلومات الدفع
              الخاصة بك لضمان استمرار الوصول إلى اشتراكك.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              المنظمة: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                إعادة محاولة الدفع
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Italian (IT)
export const SubscriptionPaymentErrorIT = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Si è verificato un problema con il pagamento del tuo abbonamento ${planName}`;

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
              Problema di Pagamento Rilevato
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Abbiamo riscontrato un problema durante l'elaborazione del tuo
              pagamento per il piano <strong>{planName}</strong> il{' '}
              <strong>{errorDate}</strong>. Aggiorna le tue informazioni di
              pagamento per garantire l'accesso continuo al tuo abbonamento.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organizzazione: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Riprova il Pagamento
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - English (UK) (EN_GB)
export const SubscriptionPaymentErrorEN_GB = ({
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
              Organisation: <strong>{organizationName}</strong>
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

// Payment Error Email - Portuguese (PT)
export const SubscriptionPaymentErrorPT = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Houve um problema com o pagamento da sua assinatura ${planName}`;

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
              Problema de Pagamento Detetado
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Encontramos um problema ao processar o seu pagamento para o plano{' '}
              <strong>{planName}</strong> em <strong>{errorDate}</strong>. Por
              favor, atualize as suas informações de pagamento para garantir o
              acesso contínuo à sua assinatura.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organização: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Repetir Pagamento
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Hindi (HI)
export const SubscriptionPaymentErrorHI = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `आपकी ${planName} सदस्यता के भुगतान में समस्या आई थी`;

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
              भुगतान समस्या का पता चला
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              हमें <strong>{errorDate}</strong> को आपके <strong>{planName}</strong>{' '}
              प्लान के भुगतान को संसाधित करने में एक समस्या आई। अपनी सदस्यता तक निरंतर पहुँच
              सुनिश्चित करने के लिए कृपया अपनी भुगतान जानकारी अपडेट करें।
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              संगठन: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                भुगतान पुनः प्रयास करें
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Turkish (TR)
export const SubscriptionPaymentErrorTR = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `${planName} abonelik ödemenizde bir sorun oluştu`;

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
              Ödeme Sorunu Tespit Edildi
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{errorDate}</strong> tarihinde <strong>{planName}</strong>{' '}
              planı için ödemenizi işleme koyarken bir sorunla karşılaştık.
              Aboneliğinize kesintisiz erişim sağlamak için lütfen ödeme
              bilgilerinizi güncelleyin.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Kuruluş: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Ödemeyi Tekrar Dene
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Polish (PL)
export const SubscriptionPaymentErrorPL = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Wystąpił problem z płatnością za Twoją subskrypcję ${planName}`;

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
              Wykryto Problem z Płatnością
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Witaj {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Napotkaliśmy problem podczas przetwarzania płatności za plan{' '}
              <strong>{planName}</strong> w dniu <strong>{errorDate}</strong>.
              Zaktualizuj swoje dane płatnicze, aby zapewnić nieprzerwany dostęp
              do subskrypcji.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organizacja: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Ponów Płatność
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Preview Props Example
// Payment Error Email - Indonesian (ID)
export const SubscriptionPaymentErrorID = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Ada masalah dengan pembayaran langganan ${planName} Anda`;

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
              Masalah Pembayaran Terdeteksi
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Kami mengalami masalah saat memproses pembayaran Anda untuk paket{' '}
              <strong>{planName}</strong> pada <strong>{errorDate}</strong>.
              Harap perbarui informasi pembayaran Anda untuk memastikan akses
              berlanjut ke langganan Anda.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organisasi: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Coba Lagi Pembayaran
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Vietnamese (VI)
export const SubscriptionPaymentErrorVI = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Đã xảy ra vấn đề với thanh toán gói thuê bao ${planName} của bạn`;

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
              Phát Hiện Vấn Đề Thanh Toán
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Chúng tôi đã gặp sự cố khi xử lý thanh toán của bạn cho gói{' '}
              <strong>{planName}</strong> vào ngày <strong>{errorDate}</strong>.
              Vui lòng cập nhật thông tin thanh toán của bạn để đảm bảo quyền
              truy cập liên tục vào gói thuê bao của bạn.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Tổ chức: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Thử lại Thanh toán
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Payment Error Email - Ukrainian (UK)
export const SubscriptionPaymentErrorUK = ({
  username,
  planName,
  organizationName,
  errorDate,
  retryPaymentLink,
}: SubscriptionPaymentErrorProps) => {
  const previewText = `Виникла проблема з оплатою вашої підписки на ${planName}`;

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
              Виявлено проблему з оплатою
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Ми зіткнулися з проблемою під час обробки вашого платежу за
              тарифний план <strong>{planName}</strong> від{' '}
              <strong>{errorDate}</strong>. Будь ласка, оновіть свою платіжну
              інформацію, щоб забезпечити безперервний доступ до вашої підписки.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Організація: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={retryPaymentLink}
              >
                Повторити спробу оплати
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

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
SubscriptionPaymentErrorRU.PreviewProps = PreviewProps;
SubscriptionPaymentErrorJA.PreviewProps = PreviewProps;
SubscriptionPaymentErrorKO.PreviewProps = PreviewProps;
SubscriptionPaymentErrorZH.PreviewProps = PreviewProps;
SubscriptionPaymentErrorDE.PreviewProps = PreviewProps;
SubscriptionPaymentErrorAR.PreviewProps = PreviewProps;
SubscriptionPaymentErrorIT.PreviewProps = PreviewProps;
SubscriptionPaymentErrorEN_GB.PreviewProps = PreviewProps;
SubscriptionPaymentErrorPT.PreviewProps = PreviewProps;
SubscriptionPaymentErrorHI.PreviewProps = PreviewProps;
SubscriptionPaymentErrorTR.PreviewProps = PreviewProps;
SubscriptionPaymentErrorPL.PreviewProps = PreviewProps;
SubscriptionPaymentErrorID.PreviewProps = PreviewProps;
SubscriptionPaymentErrorVI.PreviewProps = PreviewProps;
SubscriptionPaymentErrorUK.PreviewProps = PreviewProps;
