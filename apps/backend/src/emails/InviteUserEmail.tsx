import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

export type InviteUserEmailProps = {
  username: string;
  invitedByUsername: string;
  invitedByEmail: string;
  organizationName: string;
  inviteLink: string;
  inviteFromIp: string;
  inviteFromLocation: string;
};

export const InviteUserEmail = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-black px-2 font-sans">
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
              Join <strong>{organizationName}</strong> on{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#E879BA] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{organizationName}</strong> team
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-[#E879BA] no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{' '}
              {inviteFromLocation && (
                <>
                  {' located in '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteUserEmail.PreviewProps = {
  username: 'alanturing',
  invitedByUsername: 'Alan',
  invitedByEmail: 'alan.turing@example.com',
  organizationName: 'Enigma',
  inviteLink: 'https://vercel.com/teams/invite/foo',
  inviteFromIp: '204.13.x.x',
  inviteFromLocation: 'São Paulo, Brazil',
} as InviteUserEmailProps;

export default InviteUserEmail;
