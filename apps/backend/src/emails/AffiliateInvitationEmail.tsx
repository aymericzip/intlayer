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

export type AffiliateInvitationEmailProps = {
  inviteLink: string;
  commissionRate: number;
};

const AffiliateInvitationEmail = ({
  inviteLink,
  commissionRate,
}: AffiliateInvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>
      You've been invited to join the Intlayer Affiliate Program
    </Preview>
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
            Join the <strong>Intlayer Affiliate Program</strong>
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            You've been personally invited to become an Intlayer affiliate.
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            As an affiliate you'll earn a <strong>{commissionRate}%</strong>{' '}
            commission for every customer you refer. Simply share your unique
            referral link and get paid automatically via Stripe.
          </Text>
          <Section className="mt-[32px] mb-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] text-white no-underline"
              href={inviteLink}
            >
              Accept invitation &amp; set up your account
            </Button>
          </Section>
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            This invitation expires in 7 days. If you did not expect this email
            you can safely ignore it.
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

// All locale variants point to the same English template
export const AffiliateInvitationEmailEN = AffiliateInvitationEmail;
export const AffiliateInvitationEmailEN_GB = AffiliateInvitationEmail;
export const AffiliateInvitationEmailFR = AffiliateInvitationEmail;
export const AffiliateInvitationEmailES = AffiliateInvitationEmail;
export const AffiliateInvitationEmailRU = AffiliateInvitationEmail;
export const AffiliateInvitationEmailJA = AffiliateInvitationEmail;
export const AffiliateInvitationEmailKO = AffiliateInvitationEmail;
export const AffiliateInvitationEmailZH = AffiliateInvitationEmail;
export const AffiliateInvitationEmailDE = AffiliateInvitationEmail;
export const AffiliateInvitationEmailAR = AffiliateInvitationEmail;
export const AffiliateInvitationEmailIT = AffiliateInvitationEmail;
export const AffiliateInvitationEmailPT = AffiliateInvitationEmail;
export const AffiliateInvitationEmailHI = AffiliateInvitationEmail;
export const AffiliateInvitationEmailTR = AffiliateInvitationEmail;
export const AffiliateInvitationEmailPL = AffiliateInvitationEmail;
export const AffiliateInvitationEmailID = AffiliateInvitationEmail;
export const AffiliateInvitationEmailVI = AffiliateInvitationEmail;
export const AffiliateInvitationEmailUK = AffiliateInvitationEmail;
