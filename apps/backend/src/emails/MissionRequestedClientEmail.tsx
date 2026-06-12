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
            Your request has been <strong>sent</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Hello {clientUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            Your contact request to <strong>{reviewerName}</strong> has been
            successfully sent. They will review your project details and get
            back to you with a custom offer.
          </Text>
          <Text className="text-black text-sm leading-6">
            You can track the status of your request and communicate directly
            with the reviewer from your dashboard.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              View your request
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
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
            Votre demande a été <strong>envoyée</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Bonjour {clientUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            Votre demande de contact à <strong>{reviewerName}</strong> a bien
            été envoyée. Il/elle va examiner les détails de votre projet et vous
            recontacter avec une offre personnalisée.
          </Text>
          <Text className="text-black text-sm leading-6">
            Vous pouvez suivre l'état de votre demande et communiquer
            directement avec le traducteur depuis votre tableau de bord.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              Voir ma demande
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
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
            Tu solicitud ha sido <strong>enviada</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Hola {clientUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            Tu solicitud de contacto a <strong>{reviewerName}</strong> ha sido
            enviada con éxito. Revisará los detalles de tu proyecto y te
            responderá con una oferta personalizada.
          </Text>
          <Text className="text-black text-sm leading-6">
            Puedes seguir el estado de tu solicitud y comunicarte directamente
            con el revisor desde tu panel.
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              Ver mi solicitud
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
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
