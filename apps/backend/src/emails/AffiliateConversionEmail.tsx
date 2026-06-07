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

export type AffiliateConversionEmailProps = {
  commissionRate: number;
  commissionAmount: number; // in cents
  commissionCurrency: string;
  organizationName: string;
  dashboardLink: string;
};

const formatAmount = (cents: number, currency: string) => {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  }
};

const AffiliateConversionEmail = ({
  commissionRate,
  commissionAmount,
  commissionCurrency,
  organizationName,
  dashboardLink,
}: AffiliateConversionEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You earned a commission — someone just subscribed via your link!
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
            New referral conversion!
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Great news — <strong>{organizationName}</strong> just subscribed to
            Intlayer through your referral link.
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            You've earned a <strong>{commissionRate}% commission</strong>
            {commissionAmount > 0
              ? ` worth ${formatAmount(commissionAmount, commissionCurrency)}`
              : ''}
            . Commissions are accumulated and paid out on a monthly basis.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Section className="mt-[16px] mb-[8px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] text-white no-underline"
              href={dashboardLink}
            >
              View your dashboard
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default AffiliateConversionEmail;

// Single template — no locale variants needed for commission notifications
export const AffiliateConversionEmailEN = AffiliateConversionEmail;
export const AffiliateConversionEmailFR = AffiliateConversionEmail;
export const AffiliateConversionEmailES = AffiliateConversionEmail;
export const AffiliateConversionEmailRU = AffiliateConversionEmail;
export const AffiliateConversionEmailJA = AffiliateConversionEmail;
export const AffiliateConversionEmailKO = AffiliateConversionEmail;
export const AffiliateConversionEmailZH = AffiliateConversionEmail;
export const AffiliateConversionEmailDE = AffiliateConversionEmail;
export const AffiliateConversionEmailAR = AffiliateConversionEmail;
export const AffiliateConversionEmailIT = AffiliateConversionEmail;
export const AffiliateConversionEmailEN_GB = AffiliateConversionEmail;
export const AffiliateConversionEmailPT = AffiliateConversionEmail;
export const AffiliateConversionEmailHI = AffiliateConversionEmail;
export const AffiliateConversionEmailTR = AffiliateConversionEmail;
export const AffiliateConversionEmailPL = AffiliateConversionEmail;
export const AffiliateConversionEmailID = AffiliateConversionEmail;
export const AffiliateConversionEmailVI = AffiliateConversionEmail;
export const AffiliateConversionEmailUK = AffiliateConversionEmail;
