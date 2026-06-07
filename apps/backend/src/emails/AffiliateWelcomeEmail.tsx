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

export type AffiliateWelcomeEmailProps = {
  dashboardLink: string;
  commissionRate: number;
};

const AffiliateWelcomeEmail = ({
  dashboardLink,
  commissionRate,
}: AffiliateWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to the Intlayer Affiliate Program — complete your setup
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
            Welcome to the <strong>Intlayer Affiliate Program</strong>
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            You've successfully joined the Intlayer Affiliate Program.
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            You'll earn a <strong>{commissionRate}%</strong> commission for
            every customer you refer. To start sharing your referral link and
            receive payouts, complete your Stripe account setup in your
            dashboard.
          </Text>
          <Section className="mt-[32px] mb-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] text-white no-underline"
              href={dashboardLink}
            >
              Complete your account setup
            </Button>
          </Section>
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            Once you complete the Stripe onboarding, your referral link will be
            active and commissions will be tracked automatically.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            Intlayer · Developer-friendly i18n platform
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const AffiliateWelcomeEmailEN = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailEN_GB = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailFR = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailES = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailRU = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailJA = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailKO = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailZH = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailDE = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailAR = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailIT = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailPT = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailHI = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailTR = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailPL = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailID = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailVI = AffiliateWelcomeEmail;
export const AffiliateWelcomeEmailUK = AffiliateWelcomeEmail;
