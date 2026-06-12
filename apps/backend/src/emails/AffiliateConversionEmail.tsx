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
            New referral conversion!
          </Heading>
          <Text className="text-black text-sm leading-6">
            Great news — <strong>{organizationName}</strong> just subscribed to
            Intlayer through your referral link.
          </Text>
          <Text className="text-black text-sm leading-6">
            You've earned a <strong>{commissionRate}% commission</strong>
            {commissionAmount > 0
              ? ` worth ${formatAmount(commissionAmount, commissionCurrency)}`
              : ''}
            . Commissions are accumulated and paid out on a monthly basis.
          </Text>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Section className="mt-4 mb-2 text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-white text-xs no-underline"
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
