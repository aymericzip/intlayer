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
  Tailwind,
  Text,
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

export const InviteUserEmailEN = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Join <strong>{organizationName}</strong> on{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{organizationName}</strong> team
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
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

export const InviteUserEmailFR = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Rejoignez ${invitedByUsername} sur Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Rejoignez <strong>{organizationName}</strong> sur{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) vous a invité à rejoindre l'équipe de{' '}
              <strong>{organizationName}</strong> sur <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Rejoindre l'équipe
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :{' '}
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Cette invitation était destinée à{' '}
              <span className="text-black">{username}</span>. Cette invitation a
              été envoyée depuis{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', située à '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Si vous n'attendiez pas cette invitation, vous pouvez ignorer
              cet email. Si vous êtes préoccupé par la sécurité de votre compte,
              veuillez répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailES = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Únete a ${invitedByUsername} en Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Únete a <strong>{organizationName}</strong> en{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) te ha invitado a unirte al equipo de{' '}
              <strong>{organizationName}</strong> en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Unirse al equipo
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:{' '}
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Esta invitación estaba destinada para{' '}
              <span className="text-black">{username}</span>. Esta invitación
              fue enviada desde{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', ubicada en '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Si no esperabas esta invitación, puedes ignorar este correo. Si
              estás preocupado por la seguridad de tu cuenta, por favor responde
              a este correo para contactarte con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: InviteUserEmailProps = {
  username: 'alanturing',
  invitedByUsername: 'Alan',
  invitedByEmail: 'alan.turing@example.com',
  organizationName: 'Enigma',
  inviteLink: 'https://intlayer.org/teams/invite/foo',
  inviteFromIp: '204.13.x.x',
  inviteFromLocation: 'São Paulo, Brazil',
};

InviteUserEmailEN.PreviewProps = PreviewProps;
InviteUserEmailFR.PreviewProps = PreviewProps;
InviteUserEmailES.PreviewProps = PreviewProps;
