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
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type ReviewerApplicationEmailProps = {
  username: string;
  userEmail: string;
  profileLink: string;
};

export const ReviewerApplicationEmailEN = ({
  username,
  userEmail,
  profileLink,
}: ReviewerApplicationEmailProps) => {
  const previewText = `New reviewer application from ${username}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              New <strong>Reviewer</strong> Application
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello Intlayer Team,
            </Text>
            <Text className="text-black text-sm leading-6">
              A new user has registered as a reviewer and is awaiting
              validation:
            </Text>
            <Text className="text-black text-sm leading-6">
              <strong>Name:</strong> {username}
              <br />
              <strong>Email:</strong> {userEmail}
            </Text>
            <Text className="text-black text-sm leading-6">
              Please review their profile and approve or reject their
              application.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={profileLink}
              >
                Review Application
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={profileLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {profileLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              This is an automated notification from the Intlayer platform. The
              user's profile status is currently <strong>pending</strong>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApplicationEmailFR = ({
  username,
  userEmail,
  profileLink,
}: ReviewerApplicationEmailProps) => {
  const previewText = `Nouvelle candidature traducteur de ${username}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Nouvelle candidature <strong>traducteur</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Bonjour équipe Intlayer,
            </Text>
            <Text className="text-black text-sm leading-6">
              Un nouvel utilisateur s'est inscrit en tant que traducteur et
              attend une validation :
            </Text>
            <Text className="text-black text-sm leading-6">
              <strong>Nom :</strong> {username}
              <br />
              <strong>Email :</strong> {userEmail}
            </Text>
            <Text className="text-black text-sm leading-6">
              Veuillez examiner leur profil et approuver ou rejeter leur
              candidature.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={profileLink}
              >
                Examiner la candidature
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={profileLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {profileLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Il s'agit d'une notification automatique de la plateforme
              Intlayer. Le statut du profil de l'utilisateur est actuellement{' '}
              <strong>en attente</strong>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApplicationEmailES = ({
  username,
  userEmail,
  profileLink,
}: ReviewerApplicationEmailProps) => {
  const previewText = `Nueva solicitud de traductor de ${username}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Nueva solicitud de <strong>traductor</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hola equipo de Intlayer,
            </Text>
            <Text className="text-black text-sm leading-6">
              Un nuevo usuario se ha registrado como traductor y está esperando
              validación:
            </Text>
            <Text className="text-black text-sm leading-6">
              <strong>Nombre:</strong> {username}
              <br />
              <strong>Email:</strong> {userEmail}
            </Text>
            <Text className="text-black text-sm leading-6">
              Por favor, revise su perfil y apruebe o rechace su solicitud.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={profileLink}
              >
                Revisar solicitud
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              o copie y pegue esta URL en su navegador:
            </Text>
            <Link
              href={profileLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {profileLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Esta es una notificación automática de la plataforma Intlayer. El
              estado del perfil del usuario es actualmente{' '}
              <strong>pendiente</strong>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// For the remaining locales we reuse the English template
// (this is an internal admin-only email).
export const ReviewerApplicationEmailRU = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailJA = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailKO = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailZH = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailDE = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailAR = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailIT = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailEN_GB = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailPT = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailHI = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailTR = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailPL = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailID = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailVI = ReviewerApplicationEmailEN;
export const ReviewerApplicationEmailUK = ReviewerApplicationEmailEN;
