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

export type ValidateUserEmailProps = {
  username: string;
  validationLink: string;
};

export const ValidateUserEmailEN = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validate your email for Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Validate your email for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Please validate your email address to complete your registration
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={validationLink}
              >
                Validate Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link
                href={validationLink}
                className="text-[#E879BA] no-underline"
              >
                {validationLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email was intended for{' '}
              <span className="text-black">{username}</span>. If you were not
              expecting this email, you can ignore it. If you are concerned
              about your account's safety, please reply to this email to get in
              touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailFR = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validez votre e-mail pour Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Validez votre e-mail pour <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Veuillez valider votre adresse e-mail pour compléter votre
              inscription sur <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={validationLink}
              >
                Valider l'e-mail
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              ou copiez et collez cette URL dans votre navigateur :{' '}
              <Link
                href={validationLink}
                className="text-[#E879BA] no-underline"
              >
                {validationLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Cet e-mail était destiné à{' '}
              <span className="text-black">{username}</span>. Si vous
              n'attendiez pas cet e-mail, vous pouvez l'ignorer. Si vous êtes
              préoccupé par la sécurité de votre compte, veuillez répondre à cet
              e-mail pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailES = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Valida tu correo electrónico para Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://intlayer.org/favicon-32x32.png`}
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Valida tu correo electrónico para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Por favor valida tu dirección de correo electrónico para completar
              tu registro en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={validationLink}
              >
                Validar Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              o copia y pega esta URL en tu navegador:{' '}
              <Link
                href={validationLink}
                className="text-[#E879BA] no-underline"
              >
                {validationLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Este correo fue enviado a{' '}
              <span className="text-black">{username}</span>. Si no esperabas
              este correo, puedes ignorarlo. Si estás preocupado por la
              seguridad de tu cuenta, por favor responde a este correo para
              contactarte con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const previewProps: ValidateUserEmailProps = {
  username: 'alanturing',
  validationLink: 'https://intlayer.org/validate/foo',
};

ValidateUserEmailEN.PreviewProps = previewProps;
ValidateUserEmailFR.PreviewProps = previewProps;
ValidateUserEmailES.PreviewProps = previewProps;
