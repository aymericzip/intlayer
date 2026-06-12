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

export type MagicLinkEmailProps = {
  username: string;
  magicLink: string;
};

export const MagicLinkEmailEN = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Sign in to Intlayer`;

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
              Sign in to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Click the button below to sign in to your{' '}
              <strong>Intlayer</strong> account. This link will expire in 10
              minutes.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Sign In
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              This sign-in link was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request this link, you can safely ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailFR = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Connectez-vous à Intlayer`;

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
              Connectez-vous à <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Bonjour {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Cliquez sur le bouton ci-dessous pour vous connecter à votre
              compte <strong>Intlayer</strong>. Ce lien expirera dans 10
              minutes.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Se connecter
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Ce lien de connexion était destiné à{' '}
              <span className="text-black">{username}</span>. Si vous n'avez pas
              demandé ce lien, vous pouvez ignorer cet email en toute sécurité.
              Si vous êtes préoccupé par la sécurité de votre compte, veuillez
              répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailES = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Inicia sesión en Intlayer`;

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
              Inicia sesión en <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hola {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Haz clic en el botón de abajo para iniciar sesión en tu cuenta de{' '}
              <strong>Intlayer</strong>. Este enlace expirará en 10 minutos.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Iniciar Sesión
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Este enlace de inicio de sesión estaba destinado a{' '}
              <span className="text-black">{username}</span>. Si no solicitaste
              este enlace, puedes ignorar este correo de forma segura. Si estás
              preocupado por la seguridad de tu cuenta, por favor responde a
              este correo para ponerte en contacto con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailRU = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Войдите в Intlayer`;

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
              Войдите в <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Здравствуйте, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Нажмите кнопку ниже, чтобы войти в свой аккаунт{' '}
              <strong>Intlayer</strong>. Эта ссылка истечет через 10 минут.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Войти
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Эта ссылка для входа предназначалась для{' '}
              <span className="text-black">{username}</span>. Если вы не
              запрашивали эту ссылку, вы можете спокойно проигнорировать это
              письмо. Если вы обеспокоены безопасностью своего аккаунта,
              пожалуйста, ответьте на это письмо, чтобы связаться с нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailJA = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Intlayerにサインイン`;

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
              <strong>Intlayer</strong>にサインイン
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}様、こんにちは。
            </Text>
            <Text className="text-black text-sm leading-6">
              以下のボタンをクリックして、<strong>Intlayer</strong>
              アカウントにサインインしてください。このリンクの有効期限は10分間です。
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                サインイン
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              または、以下のURLをブラウザにコピー＆ペーストしてください：
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              このサインインリンクは
              <span className="text-black">{username}</span>
              様宛に送られました。もしこのリンクに心当たりがない場合は、このメールを無視してください。アカウントの安全性が気になる場合は、このメールに返信してご連絡ください。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailKO = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Intlayer 로그인`;

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
              <strong>Intlayer</strong> 로그인
            </Heading>
            <Text className="text-black text-sm leading-6">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-black text-sm leading-6">
              아래 버튼을 클릭하여 <strong>Intlayer</strong> 계정에
              로그인하세요. 이 링크는 10분 후에 만료됩니다.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                로그인
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              또는 다음 URL을 브라우저에 복사하여 붙여넣으세요:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              이 로그인 링크는 <span className="text-black">{username}</span>
              님을 위해 발송되었습니다. 만약 이 링크를 요청하지 않으셨다면 이
              이메일을 무시하셔도 됩니다. 계정 보안이 걱정되신다면 이 이메일에
              답장을 보내 저희에게 문의해 주세요.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailZH = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `登录到 Intlayer`;

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
              登录到 <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}，您好！
            </Text>
            <Text className="text-black text-sm leading-6">
              点击下方按钮登录您的 <strong>Intlayer</strong> 账户。此链接将在 10
              分钟后过期。
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                登录
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              或者将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              此登录链接旨在发送给{' '}
              <span className="text-black">{username}</span>
              。如果您未请求此链接，可以放心忽略此邮件。如果您担心账户安全，请回复此邮件与我们联系。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailDE = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Bei Intlayer anmelden`;

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
              Bei <strong>Intlayer</strong> anmelden
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hallo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Klicken Sie auf die Schaltfläche unten, um sich bei Ihrem{' '}
              <strong>Intlayer</strong>-Konto anzumelden. Dieser Link läuft in
              10 Minuten ab.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Anmelden
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              oder kopieren Sie diese URL in Ihren Browser:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Dieser Anmelde-Link war für{' '}
              <span className="text-black">{username}</span> gedacht. Wenn Sie
              diesen Link nicht angefordert haben, können Sie diese E-Mail
              sicher ignorieren. Wenn Sie Bedenken hinsichtlich der Sicherheit
              Ihres Kontos haben, antworten Sie bitte auf diese E-Mail, um mit
              uns in Kontakt zu treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailAR = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `تسجيل الدخول إلى Intlayer`;

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
              تسجيل الدخول إلى <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              أهلاً {username}،
            </Text>
            <Text className="text-black text-sm leading-6">
              انقر فوق الزر أدناه لتسجيل الدخول إلى حساب{' '}
              <strong>Intlayer</strong> الخاص بك. ستنتهي صلاحية هذا الرابط خلال
              10 دقائق.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                تسجيل الدخول
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              أو قم بنسخ ولصق هذا الرابط في متصفحك:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              كان رابط تسجيل الدخول هذا مخصصاً لـ{' '}
              <span className="text-black">{username}</span>. إذا لم تكن قد طلبت
              هذا الرابط، يمكنك تجاهل هذا البريد الإلكتروني بأمان. إذا كنت قلقاً
              بشأن أمان حسابك، فيرجى الرد على هذا البريد الإلكتروني للتواصل
              معنا.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailIT = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Accedi a Intlayer`;

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
              Accedi a <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Ciao {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Clicca sul pulsante qui sotto per accedere al tuo account{' '}
              <strong>Intlayer</strong>. Questo link scadrà tra 10 minuti.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Accedi
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Questo link di accesso era destinato a{' '}
              <span className="text-black">{username}</span>. Se non hai
              richiesto questo link, puoi tranquillamente ignorare questa
              e-mail. Se sei preoccupato per la sicurezza del tuo account,
              rispondi a questa e-mail per metterti in contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailEN_GB = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Sign in to Intlayer`;

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
              Sign in to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Click the button below to sign in to your{' '}
              <strong>Intlayer</strong> account. This link will expire in 10
              minutes.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Sign In
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              This sign-in link was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request this link, you can safely ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailPT = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Entrar no Intlayer`;

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
              Entrar no <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Olá {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Clique no botão abaixo para entrar em sua conta{' '}
              <strong>Intlayer</strong>. Este link expirará em 10 minutos.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Entrar
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              ou copie e cole esta URL no seu navegador:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Este link de acesso foi destinado a{' '}
              <span className="text-black">{username}</span>. Se você não
              solicitou este link, pode ignorar este e-mail com segurança. Se
              estiver preocupado com a segurança da sua conta, responda a este
              e-mail para entrar em contato conosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailHI = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Intlayer में साइन इन करें`;

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
              <strong>Intlayer</strong> में साइन इन करें
            </Heading>
            <Text className="text-black text-sm leading-6">
              नमस्ते {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              अपने <strong>Intlayer</strong> खाते में साइन इन करने के लिए नीचे दिए गए
              बटन पर क्लिक करें। यह लिंक 10 मिनट में समाप्त हो जाएगा।
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                साइन इन करें
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              यह साइन-इन लिंक <span className="text-black">{username}</span> के
              लिए था। यदि आपने इस लिंक का अनुरोध नहीं किया है, तो आप इस ईमेल को
              नज़रअंदाज़ कर सकते हैं। यदि आप अपने खाते की सुरक्षा को लेकर चिंतित हैं, तो कृपया
              हमसे संपर्क करने के लिए इस ईमेल का उत्तर दें।
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailTR = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Intlayer'a Giriş Yap`;

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
              <strong>Intlayer</strong>'a Giriş Yap
            </Heading>
            <Text className="text-black text-sm leading-6">
              Merhaba {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              <strong>Intlayer</strong> hesabınıza giriş yapmak için aşağıdaki
              butona tıklayın. Bu bağlantı 10 dakika içinde sona erecektir.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Giriş Yap
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              veya bu URL'yi kopyalayıp tarayıcınıza yapıştırın:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Bu giriş bağlantısı <span className="text-black">{username}</span>{' '}
              için gönderilmiştir. Eğer bu bağlantıyı siz istemediyseniz, bu
              e-postayı güvenle görmezden gelebilirsiniz. Hesabınızın güvenliği
              konusunda endişeleriniz varsa, bizimle iletişime geçmek için
              lütfen bu e-postayı yanıtlayın.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailPL = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Zaloguj się do Intlayer`;

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
              Zaloguj się do <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Witaj {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Kliknij poniższy przycisk, aby zalogować się do swojego konta{' '}
              <strong>Intlayer</strong>. Ten link wygaśnie za 10 minut.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Zaloguj się
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              lub skopiuj i wklej ten adres URL do przeglądarki:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Ten link do logowania był przeznaczony dla{' '}
              <span className="text-black">{username}</span>. Jeśli nie prosiłeś
              o ten link, możesz bezpiecznie zignorować tę wiadomość. Jeśli
              martwisz się o bezpieczeństwo swojego konta, odpowiedz na ten
              e-mail, aby się z nami skontaktować.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailID = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Masuk ke Intlayer`;

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
              Masuk ke <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Halo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Klik tombol di bawah ini untuk masuk ke akun{' '}
              <strong>Intlayer</strong> Anda. Tautan ini akan kedaluwarsa dalam
              10 menit.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Masuk
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Tautan masuk ini ditujukan untuk{' '}
              <span className="text-black">{username}</span>. Jika Anda tidak
              meminta tautan ini, Anda dapat mengabaikan email ini dengan aman.
              Jika Anda khawatir tentang keamanan akun Anda, silakan balas email
              ini untuk menghubungi kami.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailVI = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Đăng nhập vào Intlayer`;

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
              Đăng nhập vào <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Xin chào {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Nhấp vào nút bên dưới để đăng nhập vào tài khoản{' '}
              <strong>Intlayer</strong> của bạn. Liên kết này sẽ hết hạn sau 10
              phút.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Đăng nhập
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Liên kết đăng nhập này dành cho{' '}
              <span className="text-black">{username}</span>. Nếu bạn không yêu
              cầu liên kết này, bạn có thể bỏ qua email này một cách an toàn.
              Nếu bạn lo lắng về tính bảo mật của tài khoản, vui lòng phản hồi
              email này để liên hệ với chúng tôi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const MagicLinkEmailUK = ({
  username,
  magicLink,
}: MagicLinkEmailProps) => {
  const previewText = `Увійдіть в Intlayer`;

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
              Увійдіть в <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Вітаємо, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Натисніть кнопку нижче, щоб увійти у свій обліковий запис{' '}
              <strong>Intlayer</strong>. Це посилання дійсне протягом 10 хвилин.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={magicLink}
              >
                Увійти
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              або скопіюйте та вставте цю URL-адресу у ваш браузер:
            </Text>
            <Link
              href={magicLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {magicLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Це посилання для входу було призначене для{' '}
              <span className="text-black">{username}</span>. Якщо ви не
              запитували це посилання, ви можете спокійно ігнорувати цей лист.
              Якщо ви стурбовані безпекою свого облікового запису, будь ласка,
              дайте відповідь на цей лист, щоб зв'язатися з нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: MagicLinkEmailProps = {
  username: 'alanturing',
  magicLink: 'https://intlayer.org/auth/magic-link/verify?token=foo',
};

MagicLinkEmailEN.PreviewProps = PreviewProps;
MagicLinkEmailFR.PreviewProps = PreviewProps;
MagicLinkEmailES.PreviewProps = PreviewProps;
MagicLinkEmailRU.PreviewProps = PreviewProps;
MagicLinkEmailJA.PreviewProps = PreviewProps;
MagicLinkEmailKO.PreviewProps = PreviewProps;
MagicLinkEmailZH.PreviewProps = PreviewProps;
MagicLinkEmailDE.PreviewProps = PreviewProps;
MagicLinkEmailAR.PreviewProps = PreviewProps;
MagicLinkEmailIT.PreviewProps = PreviewProps;
MagicLinkEmailEN_GB.PreviewProps = PreviewProps;
MagicLinkEmailPT.PreviewProps = PreviewProps;
MagicLinkEmailHI.PreviewProps = PreviewProps;
MagicLinkEmailTR.PreviewProps = PreviewProps;
MagicLinkEmailPL.PreviewProps = PreviewProps;
MagicLinkEmailID.PreviewProps = PreviewProps;
MagicLinkEmailVI.PreviewProps = PreviewProps;
MagicLinkEmailUK.PreviewProps = PreviewProps;
