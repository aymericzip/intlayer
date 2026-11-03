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

export type MissionRequestedClientEmailProps = {
  clientUsername: string;
  reviewerName: string;
  missionLink: string;
};

export const MissionRequestedClientEmailEN = ({
  clientUsername,
  reviewerName,
  missionLink,
}: MissionRequestedClientEmailProps) => (
  <Html>
    <Head />
    <Preview>Your request to {reviewerName} has been sent</Preview>
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
            Your request has been <strong>sent</strong>
          </Heading>
          <Text className="text-sm leading-6 text-black">
            Hello {clientUsername},
          </Text>
          <Text className="text-sm leading-6 text-black">
            Your contact request to <strong>{reviewerName}</strong> has been
            successfully sent. They will review your project details and get
            back to you with a custom offer.
          </Text>
          <Text className="text-sm leading-6 text-black">
            You can track the status of your request and communicate directly
            with the reviewer from your dashboard.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center text-xs font-semibold text-white no-underline"
              href={missionLink}
            >
              View your request
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-solid border-[#eaeaea]" />
          <Text className="text-xs leading-6 text-[#666666]">
            Intlayer connects you with professional reviewers. The final price
            will be agreed directly between you and the reviewer.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedClientEmailFR = ({
  clientUsername,
  reviewerName,
  missionLink,
}: MissionRequestedClientEmailProps) => (
  <Html>
    <Head />
    <Preview>Votre demande à {reviewerName} a été envoyée</Preview>
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
            Votre demande a été <strong>envoyée</strong>
          </Heading>
          <Text className="text-sm leading-6 text-black">
            Bonjour {clientUsername},
          </Text>
          <Text className="text-sm leading-6 text-black">
            Votre demande de contact à <strong>{reviewerName}</strong> a bien
            été envoyée. Il/elle va examiner les détails de votre projet et vous
            recontacter avec une offre personnalisée.
          </Text>
          <Text className="text-sm leading-6 text-black">
            Vous pouvez suivre l'état de votre demande et communiquer
            directement avec le traducteur depuis votre tableau de bord.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center text-xs font-semibold text-white no-underline"
              href={missionLink}
            >
              Voir ma demande
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-solid border-[#eaeaea]" />
          <Text className="text-xs leading-6 text-[#666666]">
            Intlayer vous met en relation avec des traducteurs professionnels.
            Le prix final sera convenu directement entre vous et le traducteur.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedClientEmailES = ({
  clientUsername,
  reviewerName,
  missionLink,
}: MissionRequestedClientEmailProps) => (
  <Html>
    <Head />
    <Preview>Tu solicitud a {reviewerName} ha sido enviada</Preview>
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
            Tu solicitud ha sido <strong>enviada</strong>
          </Heading>
          <Text className="text-sm leading-6 text-black">
            Hola {clientUsername},
          </Text>
          <Text className="text-sm leading-6 text-black">
            Tu solicitud de contacto a <strong>{reviewerName}</strong> ha sido
            enviada con éxito. Revisará los detalles de tu proyecto y te
            responderá con una oferta personalizada.
          </Text>
          <Text className="text-sm leading-6 text-black">
            Puedes seguir el estado de tu solicitud y comunicarte directamente
            con el revisor desde tu panel.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center text-xs font-semibold text-white no-underline"
              href={missionLink}
            >
              Ver mi solicitud
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-solid border-[#eaeaea]" />
          <Text className="text-xs leading-6 text-[#666666]">
            Intlayer te conecta con revisores profesionales. El precio final se
            acordará directamente entre tú y el revisor.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedClientEmailRU = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailJA = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailKO = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailZH = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailDE = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailAR = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailIT = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailEN_GB = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailPT = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailHI = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailTR = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailPL = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailID = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailVI = MissionRequestedClientEmailEN;
export const MissionRequestedClientEmailUK = MissionRequestedClientEmailEN;
