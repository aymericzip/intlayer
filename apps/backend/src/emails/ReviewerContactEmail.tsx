import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  pixelBasedPreset,
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
            New <strong>message</strong> from {clientName}
          </Heading>
          <Text className="text-black text-sm leading-6">
            Hello {reviewerUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>{clientName}</strong> sent you a message on{' '}
            <strong>Intlayer</strong>:
          </Text>
          <Container className="rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-4">
            <Text className="m-0 text-black text-sm leading-6">{message}</Text>
          </Container>
          <Text className="text-[#666] text-sm leading-6">
            Log in to Intlayer to reply to this message.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
