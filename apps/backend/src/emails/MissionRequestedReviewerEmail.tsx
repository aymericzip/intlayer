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

export type MissionRequestedReviewerEmailProps = {
  reviewerUsername: string;
  clientName: string;
  sourceLocale: string;
  targetLocales: string[];
  notes?: string;
  missionLink: string;
};

export const MissionRequestedReviewerEmailEN = ({
  reviewerUsername,
  clientName,
  sourceLocale,
  targetLocales,
  notes,
  missionLink,
}: MissionRequestedReviewerEmailProps) => (
  <Html>
    <Head />
    <Preview>{clientName} sent you a translation request</Preview>
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
            New <strong>translation request</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Hello {reviewerUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>{clientName}</strong> just sent you a translation request on{' '}
            <strong>Intlayer</strong>. Here are the details:
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>From:</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>To:</strong>{' '}
            {targetLocales.map((locale) => locale.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Message:</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-black text-sm leading-6">
            Review the request and make your own offer directly in your
            dashboard. The client is waiting to hear from you!
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              View request &amp; make an offer
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
            You are free to set your own price and terms for this mission.
            Intlayer simply connects you with clients — the deal is between you
            and {clientName}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedReviewerEmailFR = ({
  reviewerUsername,
  clientName,
  sourceLocale,
  targetLocales,
  notes,
  missionLink,
}: MissionRequestedReviewerEmailProps) => (
  <Html>
    <Head />
    <Preview>{clientName} vous a envoyé une demande de traduction</Preview>
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
            Nouvelle <strong>demande de traduction</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Bonjour {reviewerUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>{clientName}</strong> vient de vous envoyer une demande de
            traduction sur <strong>Intlayer</strong>. Voici les détails :
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>De :</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>Vers :</strong>{' '}
            {targetLocales.map((l) => l.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Message :</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-black text-sm leading-6">
            Examinez la demande et faites votre propre offre directement depuis
            votre tableau de bord. Le client attend votre réponse !
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              Voir la demande et faire une offre
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
            Vous êtes libre de fixer votre propre prix et vos propres
            conditions. Intlayer vous met simplement en relation avec des
            clients — l'accord se fait directement entre vous et {clientName}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedReviewerEmailES = ({
  reviewerUsername,
  clientName,
  sourceLocale,
  targetLocales,
  notes,
  missionLink,
}: MissionRequestedReviewerEmailProps) => (
  <Html>
    <Head />
    <Preview>{clientName} te envió una solicitud de traducción</Preview>
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
            Nueva <strong>solicitud de traducción</strong>
          </Heading>
          <Text className="text-black text-sm leading-6">
            Hola {reviewerUsername},
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>{clientName}</strong> acaba de enviarte una solicitud de
            traducción en <strong>Intlayer</strong>. Aquí están los detalles:
          </Text>
          <Text className="text-black text-sm leading-6">
            <strong>De:</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>A:</strong>{' '}
            {targetLocales.map((l) => l.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Mensaje:</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-black text-sm leading-6">
            Revisa la solicitud y haz tu propia oferta directamente desde tu
            panel. ¡El cliente está esperando tu respuesta!
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
              href={missionLink}
            >
              Ver solicitud y hacer oferta
            </Button>
          </Section>
          <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-xs leading-6">
            Eres libre de establecer tu propio precio y condiciones. Intlayer
            simplemente te conecta con clientes — el acuerdo es entre tú y{' '}
            {clientName}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const MissionRequestedReviewerEmailRU = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailJA = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailKO = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailZH = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailDE = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailAR = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailIT = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailEN_GB =
  MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailPT = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailHI = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailTR = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailPL = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailID = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailVI = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailUK = MissionRequestedReviewerEmailEN;
