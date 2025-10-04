import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type PasswordChangeConfirmationEmailProps = {
  username: string;
};

export const PasswordChangeConfirmationEmailEN = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Your Intlayer password has been changed`;

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
              Your password has been changed
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              This email is to confirm that your password for your{' '}
              <strong>Intlayer</strong> account has been successfully changed.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              If you did not make this change or believe an unauthorized person
              has accessed your account, please contact us immediately by
              replying to this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you have any questions or need further assistance, feel free to
              reach out to us. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailFR = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Votre mot de passe Intlayer a été modifié`;

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
              Votre mot de passe a été modifié
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Cet email confirme que votre mot de passe pour votre compte{' '}
              <strong>Intlayer</strong> a été changé avec succès.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Si vous n'avez pas effectué ce changement ou si vous pensez qu'une
              personne non autorisée a accédé à votre compte, veuillez nous
              contacter immédiatement en répondant à cet email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si vous avez des questions ou avez besoin d'assistance
              supplémentaire, n'hésitez pas à nous contacter. Nous sommes là
              pour vous aider !
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailES = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Tu contraseña de Intlayer ha sido cambiada`;

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
              Tu contraseña ha sido cambiada
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Este correo es para confirmar que la contraseña de tu cuenta en{' '}
              <strong>Intlayer</strong> ha sido cambiada exitosamente.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Si no realizaste este cambio o crees que una persona no autorizada
              ha accedido a tu cuenta, por favor contáctanos inmediatamente
              respondiendo a este correo electrónico.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si tienes alguna pregunta o necesitas asistencia adicional, no
              dudes en ponerte en contacto con nosotros. ¡Estamos aquí para
              ayudarte!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: PasswordChangeConfirmationEmailProps = {
  username: 'alanturing',
};

PasswordChangeConfirmationEmailEN.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailFR.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailES.PreviewProps = PreviewProps;
