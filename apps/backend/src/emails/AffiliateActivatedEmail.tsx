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
    <Tailwind>
      <Body className="m-auto px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
            Your affiliate account is <strong>active</strong>!
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Your Stripe payout account has been verified. You can now start
            sharing your referral link and earning commissions.
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            You'll earn a <strong>{commissionRate}%</strong> commission for
            every customer you refer. Commissions are tracked automatically as
            soon as someone signs up using your link.
          </Text>
          <Section className="mt-[32px] mb-[8px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] text-white no-underline"
              href={referralLink}
            >
              Share your referral link
            </Button>
          </Section>
          <Text className="text-center text-[#666666] text-[11px] leading-[20px]">
            {referralLink}
          </Text>
          <Section className="mt-[16px] mb-[32px] text-center">
            <Button
              className="rounded border border-[#000000] border-solid bg-white px-5 py-3 text-center text-[12px] text-black no-underline"
              href={dashboardLink}
            >
              Go to your affiliate dashboard
            </Button>
          </Section>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
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
