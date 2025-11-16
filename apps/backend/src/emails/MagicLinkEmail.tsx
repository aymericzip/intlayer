import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type MagicLinkEmailProps = {
  username: string;
  magicLink: string;
};

export const MagicLinkEmailEN = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Sign in to Intlayer`;

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
              Sign in to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Click the button below to sign in to your{' '}
              <strong>Intlayer</strong> account. This link will expire in 10
              minutes.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={magicLink}
              >
                Sign In
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This sign-in link was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request this link, you can safely ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailFR = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Connectez-vous à Intlayer`;

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
              Connectez-vous à <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Cliquez sur le bouton ci-dessous pour vous connecter à votre
              compte <strong>Intlayer</strong>. Ce lien expirera dans 10
              minutes.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={magicLink}
              >
                Se connecter
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Ce lien de connexion était destiné à{' '}
              <span className="text-black">{username}</span>. Si vous n'avez pas
              demandé ce lien, vous pouvez ignorer cet email en toute sécurité.
              Si vous êtes préoccupé par la sécurité de votre compte, veuillez
              répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailES = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Inicia sesión en Intlayer`;

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
              Inicia sesión en <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Haz clic en el botón de abajo para iniciar sesión en tu cuenta de{' '}
              <strong>Intlayer</strong>. Este enlace expirará en 10 minutos.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={magicLink}
              >
                Iniciar Sesión
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Este enlace de inicio de sesión estaba destinado a{' '}
              <span className="text-black">{username}</span>. Si no solicitaste
              este enlace, puedes ignorar este correo de forma segura. Si estás
              preocupado por la seguridad de tu cuenta, por favor responde a
              este correo para ponerte en contacto con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: MagicLinkEmailProps = {
  username: 'alanturing',
  magicLink: 'https://intlayer.org/auth/magic-link/verify?token=foo',
};

MagicLinkEmailEN.PreviewProps = PreviewProps;
MagicLinkEmailFR.PreviewProps = PreviewProps;
MagicLinkEmailES.PreviewProps = PreviewProps;
