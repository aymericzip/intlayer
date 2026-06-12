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
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type AffiliateActivatedEmailProps = {
  dashboardLink: string;
  commissionRate: number;
  referralLink: string;
};

const AffiliateActivatedEmail = ({
  dashboardLink,
  commissionRate,
  referralLink,
}: AffiliateActivatedEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your Intlayer affiliate account is now active — start earning!
    </Preview>
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
            Your affiliate account is <strong>active</strong>!
          </Heading>
          <Text className="text-black text-sm leading-6">
            Your Stripe payout account has been verified. You can now start
            sharing your referral link and earning commissions.
          </Text>
          <Text className="text-black text-sm leading-6">
            You'll earn a <strong>{commissionRate}%</strong> commission for
            every customer you refer. Commissions are tracked automatically as
            soon as someone signs up using your link.
          </Text>
          <Section className="mt-8 mb-2 text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-white text-xs no-underline"
              href={referralLink}
            >
              Share your referral link
            </Button>
          </Section>
          <Text className="text-center text-[#666666] text-xs leading-[20px]">
            {referralLink}
          </Text>
          <Section className="mt-4 mb-8 text-center">
            <Button
              className="rounded border border-[#000000] border-solid bg-white px-5 py-3 text-center text-black text-xs no-underline"
              href={dashboardLink}
            >
              Go to your affiliate dashboard
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
            Intlayer · Developer-friendly i18n platform
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const AffiliateActivatedEmailEN = AffiliateActivatedEmail;
export const AffiliateActivatedEmailEN_GB = AffiliateActivatedEmail;
export const AffiliateActivatedEmailFR = AffiliateActivatedEmail;
export const AffiliateActivatedEmailES = AffiliateActivatedEmail;
export const AffiliateActivatedEmailRU = AffiliateActivatedEmail;
export const AffiliateActivatedEmailJA = AffiliateActivatedEmail;
export const AffiliateActivatedEmailKO = AffiliateActivatedEmail;
export const AffiliateActivatedEmailZH = AffiliateActivatedEmail;
export const AffiliateActivatedEmailDE = AffiliateActivatedEmail;
export const AffiliateActivatedEmailAR = AffiliateActivatedEmail;
export const AffiliateActivatedEmailIT = AffiliateActivatedEmail;
export const AffiliateActivatedEmailPT = AffiliateActivatedEmail;
export const AffiliateActivatedEmailHI = AffiliateActivatedEmail;
export const AffiliateActivatedEmailTR = AffiliateActivatedEmail;
export const AffiliateActivatedEmailPL = AffiliateActivatedEmail;
export const AffiliateActivatedEmailID = AffiliateActivatedEmail;
export const AffiliateActivatedEmailVI = AffiliateActivatedEmail;
export const AffiliateActivatedEmailUK = AffiliateActivatedEmail;
