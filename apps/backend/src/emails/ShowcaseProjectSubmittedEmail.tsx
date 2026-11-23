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

export type ShowcaseProjectSubmittedEmailProps = {
  projectName: string;
  websiteUrl: string;
  githubUrl?: string;
  useCases: string[];
  submitterName: string;
  submitterEmail: string;
  projectLink: string;
};

/**
 * Internal admin notification sent when a project is submitted to the
 * showcase. English only: it is never sent to end users.
 */
export const ShowcaseProjectSubmittedEmailEN = ({
  projectName,
  websiteUrl,
  githubUrl,
  useCases,
  submitterName,
  submitterEmail,
  projectLink,
}: ShowcaseProjectSubmittedEmailProps) => (
  <Html>
    <Head />
    <Preview>New showcase project submitted: {projectName}</Preview>
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
            New <strong>Showcase</strong> Project
          </Heading>
          <Text className="text-sm leading-6 text-black">
            Hello Intlayer Team,
          </Text>
          <Text className="text-sm leading-6 text-black">
            A new project has been submitted to the showcase:
          </Text>
          <Text className="text-sm leading-6 text-black">
            <strong>Project:</strong> {projectName}
            <br />
            <strong>Website:</strong> {websiteUrl}
            {githubUrl && (
              <>
                <br />
                <strong>GitHub:</strong> {githubUrl}
              </>
            )}
            {useCases.length > 0 && (
              <>
                <br />
                <strong>Use cases:</strong> {useCases.join(', ')}
              </>
            )}
          </Text>
          <Text className="text-sm leading-6 text-black">
            <strong>Submitted by:</strong> {submitterName}
            <br />
            <strong>Email:</strong> {submitterEmail}
          </Text>
          <Section className="my-8 text-center">
            <Button
              className="rounded-md bg-[#000000] px-5 py-3 text-center text-xs font-semibold text-white no-underline"
              href={projectLink}
            >
              View Project
            </Button>
          </Section>
          <Text className="text-sm leading-6 text-black">
            or copy and paste this URL into your browser:
          </Text>
          <Link
            href={projectLink}
            className="text-xs text-[#8a8a8a] no-underline"
          >
            {projectLink}
          </Link>
          <Hr className="mx-0 my-6.5 w-full border border-solid border-[#eaeaea]" />
          <Text className="text-xs leading-6 text-[#666666]">
            This is an automated notification from the Intlayer platform.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ShowcaseProjectSubmittedEmailEN.PreviewProps = {
  projectName: 'Acme',
  websiteUrl: 'https://acme.com',
  githubUrl: 'https://github.com/acme/acme',
  useCases: ['saas', 'ecommerce'],
  submitterName: 'aymericzip',
  submitterEmail: 'user@example.com',
  projectLink: 'https://showcase.intlayer.org/project/123',
} satisfies ShowcaseProjectSubmittedEmailProps;
