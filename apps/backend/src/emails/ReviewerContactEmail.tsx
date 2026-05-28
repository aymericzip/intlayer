import {
  Body,
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

export type ReviewerContactEmailProps = {
  reviewerUsername: string;
  clientName: string;
  message: string;
};

export const ReviewerContactEmailEN = ({
  reviewerUsername,
  clientName,
  message,
}: ReviewerContactEmailProps) => (
  <Html>
    <Head />
    <Preview>{clientName} sent you a message on Intlayer</Preview>
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
            New <strong>message</strong> from {clientName}
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Hello {reviewerUsername},
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>{clientName}</strong> sent you a message on{' '}
            <strong>Intlayer</strong>:
          </Text>
          <Container className="rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-[16px]">
            <Text className="m-0 text-[14px] text-black leading-[24px]">
              {message}
            </Text>
          </Container>
          <Text className="text-[#666] text-[14px] leading-[24px]">
            Log in to Intlayer to reply to this message.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
