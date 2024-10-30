import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
} from '@react-email/components';

export type WelcomeEmailProps = {
  username: string;
  loginLink: string;
};

export const WelcomeEmailEN = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Welcome to Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/assets/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Welcome to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We're excited to have you on board! Get started by logging in to
              your <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={loginLink}
              >
                Log In to Your Account
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={loginLink} className="text-[#E879BA] no-underline">
                {loginLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you have any questions or need help getting started, feel free
              to reply to this email. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailFR = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Bienvenue chez Intlayer !`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/assets/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Bienvenue chez <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Nous sommes ravis de vous avoir parmi nous ! Commencez par vous
              connecter à votre compte <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={loginLink}
              >
                Connectez-vous à votre compte
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              ou copiez et collez cette URL dans votre navigateur :{' '}
              <Link href={loginLink} className="text-[#E879BA] no-underline">
                {loginLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si vous avez des questions ou besoin d'aide pour commencer,
              n'hésitez pas à répondre à cet e-mail. Nous sommes là pour vous
              aider !
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailES = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `¡Bienvenido a Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/assets/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Bienvenido a <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              ¡Estamos emocionados de tenerte a bordo! Comienza iniciando sesión
              en tu cuenta de <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={loginLink}
              >
                Inicia sesión en tu cuenta
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              o copia y pega esta URL en tu navegador:{' '}
              <Link href={loginLink} className="text-[#E879BA] no-underline">
                {loginLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si tienes preguntas o necesitas ayuda para comenzar, no dudes en
              responder a este correo electrónico. ¡Estamos aquí para ayudarte!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: WelcomeEmailProps = {
  username: 'alanturing',
  loginLink: 'https://intlayer.org/login',
};

WelcomeEmailEN.PreviewProps = PreviewProps;
WelcomeEmailFR.PreviewProps = PreviewProps;
WelcomeEmailES.PreviewProps = PreviewProps;
