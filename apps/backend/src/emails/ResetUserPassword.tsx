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

export type ResetPasswordEmailProps = {
  username: string;
  resetLink: string;
};

export const ResetPasswordEmailEN = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your password for Intlayer`;

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
              Reset your password for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We received a request to reset your password for your{' '}
              <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This password reset request was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request a password reset, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailFR = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Réinitialisez votre mot de passe pour Intlayer`;

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
              Réinitialisez votre mot de passe pour <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Nous avons reçu une demande de réinitialisation de votre mot de
              passe pour votre compte <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={resetLink}
              >
                Réinitialiser le mot de passe
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Cette demande de réinitialisation de mot de passe était destinée à{' '}
              <span className="text-black">{username}</span>. Si vous n'avez pas
              demandé une réinitialisation de mot de passe, vous pouvez ignorer
              cet email. Si vous êtes préoccupé par la sécurité de votre compte,
              veuillez répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailES = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Restablece tu contraseña para Intlayer`;

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
              Restablece tu contraseña para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Hemos recibido una solicitud para restablecer tu contraseña de tu
              cuenta en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={resetLink}
              >
                Restablecer Contraseña
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Esta solicitud de restablecimiento de contraseña estaba destinada
              a <span className="text-black">{username}</span>. Si no
              solicitaste un restablecimiento de contraseña, puedes ignorar este
              correo. Si estás preocupado por la seguridad de tu cuenta, por
              favor responde a este correo para ponerte en contacto con
              nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: ResetPasswordEmailProps = {
  username: 'alanturing',
  resetLink: 'https://intlayer.org/reset/foo',
};

ResetPasswordEmailEN.PreviewProps = PreviewProps;
ResetPasswordEmailFR.PreviewProps = PreviewProps;
ResetPasswordEmailES.PreviewProps = PreviewProps;
