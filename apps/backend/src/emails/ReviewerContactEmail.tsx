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
        <Container className="mx-auto my-10 max-w-116.25 rounded-xl border border-solid border-[#eaeaea] bg-white p-5">
          <Section className="mt-8">
            <Img
              src="https://intlayer.org/apple-touch-icon.png"
              width="40"
              height="37"
              alt="Intlayer"
              className="mx-auto my-0"
            />
          </Section>
          <Heading className="mx-0 my-7.5 p-0 text-center text-2xl font-normal text-black">
            New <strong>message</strong> from {clientName}
          </Heading>
          <Text className="text-sm leading-6 text-black">
            Hello {reviewerUsername},
          </Text>
          <Text className="text-sm leading-6 text-black">
            <strong>{clientName}</strong> sent you a message on{' '}
            <strong>Intlayer</strong>:
          </Text>
          <Container className="rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-4">
            <Text className="m-0 text-sm leading-6 text-black">{message}</Text>
          </Container>
          <Text className="text-sm leading-6 text-[#666]">
            Log in to Intlayer to reply to this message.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
