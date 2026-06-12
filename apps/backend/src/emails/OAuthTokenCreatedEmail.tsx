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
              A third-party OAuth access key has been added to your account
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hey {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              A third-party OAuth access key (<strong>{applicationName}</strong>
              ) with the following permissions was recently authorized to access
              your account:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                View Application Details
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              To see this and other security events for your account, visit{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                your security log
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              If you run into problems, please contact support by visiting{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                our support page
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
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
              Une application OAuth tierce a été ajoutée à votre compte
            </Heading>
            <Text className="text-black text-sm leading-6">
              Salut {username} !
            </Text>
            <Text className="text-black text-sm leading-6">
              Une application OAuth tierce (<strong>{applicationName}</strong>)
              avec les permissions {scopes.join(', ')} a récemment été autorisée
              à accéder à votre compte.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Voir les détails de l'application
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
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
            <Text className="text-black text-sm leading-6">
              Si vous rencontrez des problèmes, veuillez contacter le support en
              visitant{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                notre page de support
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
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
              Se ha añadido una aplicación OAuth de terceros a tu cuenta
            </Heading>
            <Text className="text-black text-sm leading-6">
              ¡Hola {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Una aplicación OAuth de terceros (
              <strong>{applicationName}</strong>) con permisos{' '}
              {scopes.join(', ')} fue recientemente autorizada para acceder a tu
              cuenta.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Ver detalles de la aplicación
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Para ver este y otros eventos de seguridad para tu cuenta, visita{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                tu registro de seguridad
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Si tienes problemas, por favor contacta al soporte visitando{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                nuestra página de soporte
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
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

export const OAuthTokenCreatedEmailRU = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `К вашему аккаунту Intlayer был добавлен сторонний ключ доступа OAuth`;

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
              К вашему аккаунту был добавлен сторонний ключ доступа OAuth
            </Heading>
            <Text className="text-black text-sm leading-6">
              Привет, {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Сторонний ключ доступа OAuth (<strong>{applicationName}</strong>)
              со следующими разрешениями был недавно авторизован для доступа к
              вашему аккаунту:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Просмотреть сведения о приложении
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Чтобы просмотреть это и другие события безопасности для вашего
              аккаунта, посетите{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                ваш журнал безопасности
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Если у вас возникнут проблемы, обратитесь в службу поддержки,
              посетив{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                нашу страницу поддержки
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Это письмо предназначалось для{' '}
              <span className="text-black">{username}</span>. Если вы не ожидали
              этого письма, вы можете его проигнорировать. Если вы обеспокоены
              безопасностью своего аккаунта, пожалуйста, ответьте на это письмо,
              чтобы связаться с нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailJA = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `IntlayerアカウントにサードパーティのOAuthアクセスキーが追加されました`;

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
              アカウントにサードパーティのOAuthアクセスキーが追加されました
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}様、こんにちは。
            </Text>
            <Text className="text-black text-sm leading-6">
              最近、以下の権限を持つサードパーティのOAuthアクセスキー（
              <strong>{applicationName}</strong>
              ）があなたのアカウントへのアクセスを許可されました：
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                アプリケーションの詳細を表示
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              このイベントやその他のセキュリティイベントを確認するには、
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                セキュリティログ
              </Link>
              をご覧ください。
            </Text>
            <Text className="text-black text-sm leading-6">
              問題が発生した場合は、
              <Link href={supportUrl} className="text-[#000000] no-underline">
                サポートページ
              </Link>
              からお問い合わせください。
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              このメールは<span className="text-black">{username}</span>
              様に送信されました。もしこのメールに心当たりがない場合は、無視していただいて構いません。アカウントの安全性が気になる場合は、このメールに返信してご連絡ください。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailKO = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Intlayer 계정에 타사 OAuth 액세스 키가 추가되었습니다`;

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
              계정에 타사 OAuth 액세스 키가 추가되었습니다
            </Heading>
            <Text className="text-black text-sm leading-6">
              안녕하세요, {username}님!
            </Text>
            <Text className="text-black text-sm leading-6">
              최근 다음 권한을 가진 타사 OAuth 액세스 키(
              <strong>{applicationName}</strong>)가 귀하의 계정에 액세스하도록
              허용되었습니다:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                애플리케이션 상세 정보 보기
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              이 이벤트와 기타 보안 이벤트를 확인하려면{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                보안 로그
              </Link>
              를 방문하세요.
            </Text>
            <Text className="text-black text-sm leading-6">
              문제가 발생하면{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                지원 페이지
              </Link>
              를 방문하여 문의해 주세요.
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              이 이메일은 <span className="text-black">{username}</span>님을
              위해 발송되었습니다. 만약 이 이메일을 기다리지 않으셨다면
              무시하셔도 됩니다. 계정 보안이 걱정되신다면 이 이메일에 답장을
              보내 저희에게 문의해 주세요.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailZH = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `您的 Intlayer 账户已添加第三方 OAuth 访问密钥`;

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
              您的账户已添加第三方 OAuth 访问密钥
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}，您好！
            </Text>
            <Text className="text-black text-sm leading-6">
              最近，一个具有以下权限的第三方 OAuth 访问密钥（
              <strong>{applicationName}</strong>）被授权访问您的账户：
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                查看应用详情
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              要查看此事件及账户的其他安全事件，请访问您的{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                安全日志
              </Link>
              。
            </Text>
            <Text className="text-black text-sm leading-6">
              如果您遇到问题，请访问{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                我们的支持页面
              </Link>{' '}
              联系支持团队。
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              此邮件旨在发送给 <span className="text-black">{username}</span>
              。如果您未请求此邮件，可以忽略它。如果您担心账户安全，请回复此邮件与我们联系。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailDE = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Ein OAuth-Zugriffsschlüssel eines Drittanbieters wurde Ihrem Intlayer-Konto hinzugefügt`;

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
              Ein OAuth-Zugriffsschlüssel eines Drittanbieters wurde Ihrem Konto
              hinzugefügt
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hallo {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Ein OAuth-Zugriffsschlüssel eines Drittanbieters (
              <strong>{applicationName}</strong>) mit den folgenden
              Berechtigungen wurde kürzlich für den Zugriff auf Ihr Konto
              autorisiert:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Anwendungsdetails anzeigen
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Um dieses und andere Sicherheitsereignisse für Ihr Konto
              anzusehen, besuchen Sie{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                Ihr Sicherheitsprotokoll
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Wenn Sie auf Probleme stoßen, kontaktieren Sie bitte den Support,
              indem Sie{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                unsere Support-Seite
              </Link>{' '}
              besuchen.
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Diese E-Mail war für{' '}
              <span className="text-black">{username}</span> gedacht. Wenn Sie
              diese E-Mail nicht erwartet haben, können Sie sie ignorieren. Wenn
              Sie Bedenken hinsichtlich der Sicherheit Ihres Kontos haben,
              antworten Sie bitte auf diese E-Mail, um mit uns in Kontakt zu
              treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailAR = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `تمت إضافة مفتاح وصول OAuth خارجي إلى حساب Intlayer الخاص بك`;

  return (
    <Html dir="rtl">
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
              تمت إضافة مفتاح وصول OAuth خارجي إلى حسابك
            </Heading>
            <Text className="text-black text-sm leading-6">
              أهلاً {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              تم مؤخراً تفويض مفتاح وصول OAuth خارجي (
              <strong>{applicationName}</strong>) بالصلاحيات التالية للوصول إلى
              حسابك:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                عرض تفاصيل التطبيق
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              لمشاهدة هذا الحدث وأحداث الأمان الأخرى لحسابك، قم بزيارة{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                سجل الأمان الخاص بك
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              إذا واجهت أي مشاكل، يرجى الاتصال بالدعم من خلال زيارة{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                صفحة الدعم الخاصة بنا
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              هذا البريد الإلكتروني مخصص لـ{' '}
              <span className="text-black">{username}</span>. إذا لم تكن تتوقع
              هذا البريد، يمكنك تجاهله. إذا كنت قلقاً بشأن أمان حسابك، فيرجى الرد
              على هذا البريد الإلكتروني للتواصل معنا.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailIT = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `È stata aggiunta una chiave di accesso OAuth di terze parti al tuo account Intlayer`;

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
              È stata aggiunta una chiave di accesso OAuth di terze parti al tuo
              account
            </Heading>
            <Text className="text-black text-sm leading-6">
              Ehi {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Una chiave di accesso OAuth di terze parti (
              <strong>{applicationName}</strong>) con i seguenti permessi è
              stata recentemente autorizzata ad accedere al tuo account:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Visualizza dettagli applicazione
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Per vedere questo e altri eventi di sicurezza per il tuo account,
              visita il{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                tuo registro di sicurezza
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Se riscontri problemi, contatta il supporto visitando la{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                nostra pagina di supporto
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Questa e-mail era destinata a{' '}
              <span className="text-black">{username}</span>. Se non ti
              aspettavi questa e-mail, puoi ignorarla. Se sei preoccupato per la
              sicurezza del tuo account, rispondi a questa e-mail per metterti
              in contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailEN_GB = ({
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
              A third-party OAuth access key has been added to your account
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hey {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              A third-party OAuth access key (<strong>{applicationName}</strong>
              ) with the following permissions was recently authorised to access
              your account:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                View Application Details
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              To see this and other security events for your account, visit{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                your security log
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              If you run into problems, please contact support by visiting{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                our support page
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
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

export const OAuthTokenCreatedEmailPT = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Uma chave de acesso OAuth de terceiros foi adicionada à sua conta Intlayer`;

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
              Uma chave de acesso OAuth de terceiros foi adicionada à sua conta
            </Heading>
            <Text className="text-black text-sm leading-6">
              Olá {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Uma chave de acesso OAuth de terceiros (
              <strong>{applicationName}</strong>) com as seguintes permissões
              foi recentemente autorizada a aceder à sua conta:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Ver detalhes da aplicação
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Para ver este e outros eventos de segurança da sua conta, visite{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                o seu registo de segurança
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Se encontrar problemas, contacte o suporte visitando{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                a nossa página de suporte
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Este e-mail foi destinado a{' '}
              <span className="text-black">{username}</span>. Se não esperava
              este e-mail, pode ignorá-lo. Se estiver preocupado com a segurança
              da sua conta, responda a este e-mail para entrar em contacto
              connosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailHI = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `आपके Intlayer खाते में एक तृतीय-पक्ष OAuth एक्सेस कुंजी जोड़ी गई है`;

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
              आपके खाते में एक तृतीय-पक्ष OAuth एक्सेस कुंजी जोड़ी गई है
            </Heading>
            <Text className="text-black text-sm leading-6">
              नमस्ते {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              हाल ही में आपके खाते तक पहुँचने के लिए निम्नलिखित अनुमतियों के साथ एक तृतीय-पक्ष
              OAuth एक्सेस कुंजी (<strong>{applicationName}</strong>) को अधिकृत किया
              गया था:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                एप्लिकेशन विवरण देखें
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              अपने खाते के लिए इस और अन्य सुरक्षा घटनाओं को देखने के लिए,{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                अपने सुरक्षा लॉग
              </Link>{' '}
              पर जाएँ।
            </Text>
            <Text className="text-black text-sm leading-6">
              यदि आपको कोई समस्या आती है, तो कृपया{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                हमारे सहायता पृष्ठ
              </Link>{' '}
              पर जाकर सहायता से संपर्क करें।
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              यह ईमेल <span className="text-black">{username}</span> के लिए था।
              यदि आप इस ईमेल की अपेक्षा नहीं कर रहे थे, तो आप इसे नज़रअंदाज़ कर सकते हैं। यदि
              आप अपने खाते की सुरक्षा को लेकर चिंतित हैं, तो कृपया हमसे संपर्क करने के लिए इस
              ईमेल का उत्तर दें।
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailTR = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Intlayer hesabınıza üçüncü taraf bir OAuth erişim anahtarı eklendi`;

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
              Hesabınıza üçüncü taraf bir OAuth erişim anahtarı eklendi
            </Heading>
            <Text className="text-black text-sm leading-6">
              Merhaba {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Yakın zamanda, aşağıdaki izinlere sahip üçüncü taraf bir OAuth
              erişim anahtarının (<strong>{applicationName}</strong>) hesabınıza
              erişmesine yetki verildi:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Uygulama Detaylarını Görüntüle
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Hesabınızla ilgili bu ve diğer güvenlik olaylarını görmek için{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                güvenlik günlüğünüzü
              </Link>{' '}
              ziyaret edin.
            </Text>
            <Text className="text-black text-sm leading-6">
              Bir sorunla karşılaşırsanız, lütfen{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                destek sayfamızı
              </Link>{' '}
              ziyaret ederek destekle iletişime geçin.
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Bu e-posta <span className="text-black">{username}</span> için
              gönderilmiştir. Eğer bu e-postayı beklemiyorsanız, dikkate
              almayabilirsiniz. Hesabınızın güvenliği konusunda endişeleriniz
              varsa, bizimle iletişime geçmek için lütfen bu e-postayı
              yanıtlayın.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailPL = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Do Twojego konta Intlayer dodano klucz dostępu OAuth strony trzeciej`;

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
              Do Twojego konta dodano klucz dostępu OAuth strony trzeciej
            </Heading>
            <Text className="text-black text-sm leading-6">
              Cześć {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Klucz dostępu OAuth strony trzeciej (
              <strong>{applicationName}</strong>) z następującymi uprawnieniami
              został niedawno autoryzowany do dostępu do Twojego konta:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Zobacz szczegóły aplikacji
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Aby zobaczyć to i inne zdarzenia bezpieczeństwa dla Twojego konta,
              odwiedź{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                swój dziennik bezpieczeństwa
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Jeśli napotkasz problemy, skontaktuj się z pomocą techniczną,
              odwiedzając{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                naszą stronę pomocy
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Ta wiadomość e-mail była przeznaczona dla{' '}
              <span className="text-black">{username}</span>. Jeśli nie
              spodziewałeś się tej wiadomości, możesz ją zignorować. Jeśli
              martwisz się o bezpieczeństwo swojego konta, odpowiedz na ten
              e-mail, aby się с nami skontaktować.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailID = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Kunci akses OAuth pihak ketiga telah ditambahkan ke akun Intlayer Anda`;

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
              Kunci akses OAuth pihak ketiga telah ditambahkan ke akun Anda
            </Heading>
            <Text className="text-black text-sm leading-6">
              Halo {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Kunci akses OAuth pihak ketiga (<strong>{applicationName}</strong>
              ) dengan izin berikut baru saja diotorisasi untuk mengakses akun
              Anda:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Lihat Detail Aplikasi
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Untuk melihat ini dan peristiwa keamanan lainnya untuk akun Anda,
              kunjungi{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                log keamanan Anda
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Jika Anda mengalami masalah, silakan hubungi dukungan dengan
              mengunjungi{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                halaman dukungan kami
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Email ini ditujukan untuk{' '}
              <span className="text-black">{username}</span>. Jika Anda tidak
              mengharapkan email ini, Anda dapat mengabaikannya. Jika Anda
              khawatir tentang keamanan akun Anda, silakan balas email ini untuk
              menghubungi kami.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailVI = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `Một khóa truy cập OAuth của bên thứ ba đã được thêm vào tài khoản Intlayer của bạn`;

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
              Một khóa truy cập OAuth của bên thứ ba đã được thêm vào tài khoản
              của bạn
            </Heading>
            <Text className="text-black text-sm leading-6">
              Chào {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Một khóa truy cập OAuth của bên thứ ba (
              <strong>{applicationName}</strong>) với các quyền sau gần đây đã
              được ủy quyền để truy cập vào tài khoản của bạn:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Xem chi tiết ứng dụng
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Để xem sự kiện này và các sự kiện bảo mật khác cho tài khoản của
              bạn, hãy truy cập{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                nhật ký bảo mật của bạn
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Nếu bạn gặp sự cố, vui lòng liên hệ với bộ phận hỗ trợ bằng cách
              truy cập{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                trang hỗ trợ của chúng tôi
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Email này dành cho <span className="text-black">{username}</span>.
              Nếu bạn không mong đợi email này, bạn có thể bỏ qua nó. Nếu bạn lo
              lắng về tính bảo mật của tài khoản, vui lòng phản hồi email này để
              liên hệ với chúng tôi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const OAuthTokenCreatedEmailUK = ({
  username,
  applicationName,
  scopes,
  tokenDetailsUrl,
  securityLogUrl,
  supportUrl,
}: OAuthTokenCreatedEmailProps) => {
  const previewText = `До вашого облікового запису Intlayer додано сторонній ключ доступу OAuth`;

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
              До вашого облікового запису додано сторонній ключ доступу OAuth
            </Heading>
            <Text className="text-black text-sm leading-6">
              Привіт, {username}!
            </Text>
            <Text className="text-black text-sm leading-6">
              Сторонній ключ доступу OAuth (<strong>{applicationName}</strong>)
              із наступними дозволами нещодавно отримав доступ до вашого
              облікового запису:
              <ul>
                {scopes.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={tokenDetailsUrl}
              >
                Переглянути деталі програми
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              Щоб переглянути цю та інші події безпеки для вашого облікового
              запису, відвідайте{' '}
              <Link
                href={securityLogUrl}
                className="text-[#000000] no-underline"
              >
                ваш журнал безпеки
              </Link>
              .
            </Text>
            <Text className="text-black text-sm leading-6">
              Якщо у вас виникнуть проблеми, будь ласка, зверніться до служби
              підтримки, відвідавши{' '}
              <Link href={supportUrl} className="text-[#000000] no-underline">
                нашу сторінку підтримки
              </Link>
              .
            </Text>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Цей електронний лист був призначений для{' '}
              <span className="text-black">{username}</span>. Якщо ви не
              очікували цього листа, ви можете його ігнорувати. Якщо ви
              стурбовані безпекою свого облікового запису, будь ласка, дайте
              відповідь на цей лист, щоб зв'язатися з нами.
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
OAuthTokenCreatedEmailRU.PreviewProps = previewProps;
OAuthTokenCreatedEmailJA.PreviewProps = previewProps;
OAuthTokenCreatedEmailKO.PreviewProps = previewProps;
OAuthTokenCreatedEmailZH.PreviewProps = previewProps;
OAuthTokenCreatedEmailDE.PreviewProps = previewProps;
OAuthTokenCreatedEmailAR.PreviewProps = previewProps;
OAuthTokenCreatedEmailIT.PreviewProps = previewProps;
OAuthTokenCreatedEmailEN_GB.PreviewProps = previewProps;
OAuthTokenCreatedEmailPT.PreviewProps = previewProps;
OAuthTokenCreatedEmailHI.PreviewProps = previewProps;
OAuthTokenCreatedEmailTR.PreviewProps = previewProps;
OAuthTokenCreatedEmailPL.PreviewProps = previewProps;
OAuthTokenCreatedEmailID.PreviewProps = previewProps;
OAuthTokenCreatedEmailVI.PreviewProps = previewProps;
OAuthTokenCreatedEmailUK.PreviewProps = previewProps;
