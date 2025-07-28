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

export type OAuthTokenCreatedEmailProps = {
  username: string;
  applicationName: string;
  scopes: string[];
  tokenDetailsUrl: string;
  securityLogUrl: string;
  supportUrl: string;
};

export const OAuthTokenCreatedEmailEN = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `A third-party OAuth access key has been added to your Intlayer account`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              A third-party OAuth access key has been added to your account
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username}!
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              A third-party OAuth access key (<strong>{applicationName}</strong>
              ) with the following permissions was recently authorized to access
              your account:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={tokenDetailsUrl}
              >
                View Application Details
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              To see this and other security events for your account, visit{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                your security log
              </Link>
              .
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              If you run into problems, please contact support by visiting{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                our support page
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email was intended for{' '}
              <span className="text-black">{username}</span>. If you were not
              expecting this email, you can ignore it. If you are concerned
              about your account's safety, please reply to this email to get in
              touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailFR = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Une application OAuth tierce a été ajoutée à votre compte Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Une application OAuth tierce a été ajoutée à votre compte
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Salut {username} !
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Une application OAuth tierce (<strong>{applicationName}</strong>)
              avec les permissions {scopes.join(', ')} a récemment été autorisée
              à accéder à votre compte.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={tokenDetailsUrl}
              >
                Voir les détails de l'application
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              Pour voir cet événement et d'autres événements de sécurité pour
              votre compte, visitez{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                votre journal de sécurité
              </Link>
              .
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Si vous rencontrez des problèmes, veuillez contacter le support en
              visitant{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                notre page de support
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Cet e-mail était destiné à{' '}
              <span className="text-black">{username}</span>. Si vous
              n'attendiez pas cet e-mail, vous pouvez l'ignorer. Si vous êtes
              préoccupé par la sécurité de votre compte, veuillez répondre à cet
              e-mail pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailES = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Se ha añadido una aplicación OAuth de terceros a tu cuenta de Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Se ha añadido una aplicación OAuth de terceros a tu cuenta
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              ¡Hola {username}!
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Una aplicación OAuth de terceros (
              <strong>{applicationName}</strong>) con permisos{' '}
              {scopes.join(', ')} fue recientemente autorizada para acceder a tu
              cuenta.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={tokenDetailsUrl}
              >
                Ver detalles de la aplicación
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              Para ver este y otros eventos de seguridad para tu cuenta, visita{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                tu registro de seguridad
              </Link>
              .
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Si tienes problemas, por favor contacta al soporte visitando{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                nuestra página de soporte
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Este correo fue enviado a{' '}
              <span className="text-black">{username}</span>. Si no esperabas
              este correo, puedes ignorarlo. Si estás preocupado por la
              seguridad de tu cuenta, por favor responde a este correo para
              contactarte con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const previewProps: OAuthTokenCreatedEmailProps = {
  username: 'aymericzip',
  applicationName: 'Postman',
  scopes: ['read:user', 'user:email'],
  tokenDetailsUrl:
    'https://intlayer.org/settings/connections/applications/Ov23li230j1cbJfa4SPW',
  securityLogUrl: 'https://intlayer.org/settings/security-log',
  supportUrl: 'https://intlayer.org/contact',
};

OAuthTokenCreatedEmailEN.PreviewProps = previewProps;
OAuthTokenCreatedEmailFR.PreviewProps = previewProps;
OAuthTokenCreatedEmailES.PreviewProps = previewProps;
