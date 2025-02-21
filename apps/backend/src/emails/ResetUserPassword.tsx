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
  Text,
  Tailwind,
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
              Reset your password for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We received a request to reset your password for your{' '}
              <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={resetLink} className="text-[#E879BA] no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
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
              Réinitialisez votre mot de passe pour <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Nous avons reçu une demande de réinitialisation de votre mot de
              passe pour votre compte <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={resetLink}
              >
                Réinitialiser le mot de passe
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              ou copiez et collez cette URL dans votre navigateur :{' '}
              <Link href={resetLink} className="text-[#E879BA] no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
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
              Restablece tu contraseña para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Hemos recibido una solicitud para restablecer tu contraseña de tu
              cuenta en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={resetLink}
              >
                Restablecer Contraseña
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              o copia y pega esta URL en tu navegador:{' '}
              <Link href={resetLink} className="text-[#E879BA] no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
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
