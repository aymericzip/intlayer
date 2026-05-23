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
            New <strong>translation request</strong>
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Hello {reviewerUsername},
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>{clientName}</strong> just sent you a translation request on{' '}
            <strong>Intlayer</strong>. Here are the details:
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>From:</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>To:</strong> {targetLocales.map((l) => l.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Message:</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            Review the request and make your own offer directly in your
            dashboard. The client is waiting to hear from you!
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
              href={missionLink}
            >
              View request &amp; make an offer
            </Button>
          </Section>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
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
            Nouvelle <strong>demande de traduction</strong>
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Bonjour {reviewerUsername},
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>{clientName}</strong> vient de vous envoyer une demande de
            traduction sur <strong>Intlayer</strong>. Voici les détails :
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>De :</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>Vers :</strong> {targetLocales.map((l) => l.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Message :</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            Examinez la demande et faites votre propre offre directement depuis
            votre tableau de bord. Le client attend votre réponse !
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
              href={missionLink}
            >
              Voir la demande et faire une offre
            </Button>
          </Section>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
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
            Nueva <strong>solicitud de traducción</strong>
          </Heading>
          <Text className="text-[14px] text-black leading-[24px]">
            Hola {reviewerUsername},
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>{clientName}</strong> acaba de enviarte una solicitud de
            traducción en <strong>Intlayer</strong>. Aquí están los detalles:
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            <strong>De:</strong> {sourceLocale.toUpperCase()}
            <br />
            <strong>A:</strong> {targetLocales.map((l) => l.toUpperCase()).join(', ')}
            {notes && (
              <>
                <br />
                <strong>Mensaje:</strong> {notes}
              </>
            )}
          </Text>
          <Text className="text-[14px] text-black leading-[24px]">
            Revisa la solicitud y haz tu propia oferta directamente desde tu
            panel. ¡El cliente está esperando tu respuesta!
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
              href={missionLink}
            >
              Ver solicitud y hacer oferta
            </Button>
          </Section>
          <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
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
export const MissionRequestedReviewerEmailEN_GB = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailPT = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailHI = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailTR = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailPL = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailID = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailVI = MissionRequestedReviewerEmailEN;
export const MissionRequestedReviewerEmailUK = MissionRequestedReviewerEmailEN;
