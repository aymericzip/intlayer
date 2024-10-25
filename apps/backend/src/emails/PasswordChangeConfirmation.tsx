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
  Text,
  Tailwind,
} from '@react-email/components';

export type PasswordChangeConfirmationEmailProps = {
  username: string;
};

export const PasswordChangeConfirmationEmail = ({
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
                src={`https://intlayer.org/assets/favicon-32x32.png`}
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

PasswordChangeConfirmationEmail.PreviewProps = {
  username: 'alanturing',
} as PasswordChangeConfirmationEmailProps;

export default PasswordChangeConfirmationEmail;
