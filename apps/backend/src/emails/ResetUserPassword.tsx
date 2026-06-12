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

export type ResetPasswordEmailProps = {
  username: string;
  resetLink: string;
};

export const ResetPasswordEmailEN = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your password for Intlayer`;

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
              Reset your password for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              We received a request to reset your password for your{' '}
              <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              This password reset request was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request a password reset, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailFR = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Réinitialisez votre mot de passe pour Intlayer`;

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
              Réinitialisez votre mot de passe pour <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Bonjour {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Nous avons reçu une demande de réinitialisation de votre mot de
              passe pour votre compte <strong>Intlayer</strong>.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Réinitialiser le mot de passe
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Cette demande de réinitialisation de mot de passe était destinée à{' '}
              <span className="text-black">{username}</span>. Si vous n'avez pas
              demandé une réinitialisation de mot de passe, vous pouvez ignorer
              cet email. Si vous êtes préoccupé par la sécurité de votre compte,
              veuillez répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailES = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Restablece tu contraseña para Intlayer`;

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
              Restablece tu contraseña para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hola {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Hemos recibido una solicitud para restablecer tu contraseña de tu
              cuenta en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Restablecer Contraseña
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Esta solicitud de restablecimiento de contraseña estaba destinada
              a <span className="text-black">{username}</span>. Si no
              solicitaste un restablecimiento de contraseña, puedes ignorar este
              correo. Si estás preocupado por la seguridad de tu cuenta, por
              favor responde a este correo para ponerte en contacto con
              nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailRU = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Сброс пароля для Intlayer`;

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
              Сброс пароля для <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Здравствуйте, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Мы получили запрос на сброс пароля для вашего аккаунта{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Сбросить пароль
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Этот запрос на сброс пароля предназначался для{' '}
              <span className="text-black">{username}</span>. Если вы не
              запрашивали сброс пароля, вы можете проигнорировать это письмо.
              Если вы обеспокоены безопасностью своего аккаунта, пожалуйста,
              ответьте на это письмо, чтобы связаться с нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailJA = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Intlayerのパスワードをリセットする`;

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
              <strong>Intlayer</strong>のパスワードをリセットする
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}様、こんにちは。
            </Text>
            <Text className="text-black text-sm leading-6">
              あなたの<strong>Intlayer</strong>
              アカウントのパスワードリセットのリクエストを承りました。
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                パスワードをリセット
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              または、以下のURLをコピーしてブラウザに貼り付けてください：
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              このパスワードリセットのリクエストは
              <span className="text-black">{username}</span>
              様向けに送信されました。もしパスワードのリセットをリクエストしていない場合は、このメールを無視していただいて構いません。アカウントの安全性が気になる場合は、このメールに返信してご連絡ください。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailKO = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Intlayer 비밀번호 재설정`;

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
              <strong>Intlayer</strong> 비밀번호 재설정
            </Heading>
            <Text className="text-black text-sm leading-6">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-black text-sm leading-6">
              귀하의 <strong>Intlayer</strong> 계정 비밀번호를 재설정해 달라는
              요청을 받았습니다.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                비밀번호 재설정
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              또는 다음 URL을 복사하여 브라우저에 붙여넣으세요:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              이 비밀번호 재설정 요청은{' '}
              <span className="text-black">{username}</span>님을 위해
              발송되었습니다. 만약 비밀번호 재설정을 요청하지 않으셨다면 이
              이메일을 무시하셔도 됩니다. 계정 보안이 걱정되신다면 이 이메일에
              답장을 보내 저희에게 문의해 주세요.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailZH = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `重置您的 Intlayer 密码`;

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
              重置您的 <strong>Intlayer</strong> 密码
            </Heading>
            <Text className="text-black text-sm leading-6">
              {username}，您好！
            </Text>
            <Text className="text-black text-sm leading-6">
              我们收到了重置您 <strong>Intlayer</strong> 账户密码的请求。
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                重置密码
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              或将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              此密码重置请求旨在发送给{' '}
              <span className="text-black">{username}</span>
              。如果您未请求重置密码，可以忽略此邮件。如果您担心账户安全，请回复此邮件与我们联系。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailDE = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Setzen Sie Ihr Passwort für Intlayer zurück`;

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
              Setzen Sie Ihr Passwort für <strong>Intlayer</strong> zurück
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hallo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              wir haben eine Anfrage zum Zurücksetzen Ihres Passworts für Ihr{' '}
              <strong>Intlayer</strong>-Konto erhalten.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Passwort zurücksetzen
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              oder kopieren Sie diese URL und fügen Sie sie in Ihren Browser
              ein:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Diese Anfrage zum Zurücksetzen des Passworts war für{' '}
              <span className="text-black">{username}</span> gedacht. Wenn Sie
              kein Zurücksetzen des Passworts angefordert haben, können Sie
              diese E-Mail ignorieren. Wenn Sie Bedenken hinsichtlich der
              Sicherheit Ihres Kontos haben, antworten Sie bitte auf diese
              E-Mail, um mit uns in Kontakt zu treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailAR = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `إعادة تعيين كلمة المرور الخاصة بك لـ Intlayer`;

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
              إعادة تعيين كلمة المرور الخاصة بك لـ <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              أهلاً {username}،
            </Text>
            <Text className="text-black text-sm leading-6">
              لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك في{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                إعادة تعيين كلمة المرور
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              أو قم بنسخ ولصق هذا الرابط في متصفحك:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              كان هذا الطلب لإعادة تعيين كلمة المرور مخصصاً لـ{' '}
              <span className="text-black">{username}</span>. إذا لم تكن قد طلبت
              إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني. إذا
              كنت قلقاً بشأن أمان حسابك، فيرجى الرد على هذا البريد الإلكتروني
              للتواصل معنا.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailIT = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Reimposta la tua password per Intlayer`;

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
              Reimposta la tua password per <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Ciao {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Abbiamo ricevuto una richiesta di reimpostazione della password
              per il tuo account <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Reimposta password
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Questa richiesta di reimpostazione della password era destinata a{' '}
              <span className="text-black">{username}</span>. Se non hai
              richiesto la reimpostazione della password, puoi ignorare questa
              e-mail. Se sei preoccupato per la sicurezza del tuo account,
              rispondi a questa e-mail per metterti in contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailEN_GB = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your password for Intlayer`;

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
              Reset your password for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Hello {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              We received a request to reset your password for your{' '}
              <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              This password reset request was intended for{' '}
              <span className="text-black">{username}</span>. If you did not
              request a password reset, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailPT = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Redefina sua senha para Intlayer`;

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
              Redefina sua senha para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Olá {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Recebemos uma solicitação para redefinir a senha da sua conta{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Redefinir Senha
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              ou copie e cole esta URL no seu navegador:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Esta solicitação de redefinição de senha foi destinada a{' '}
              <span className="text-black">{username}</span>. Se você não
              solicitou uma redefinição de senha, pode ignorar este e-mail. Se
              estiver preocupado com a segurança da sua conta, responda a este
              e-mail para entrar em contacto connosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailHI = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Intlayer के लिए अपना पासवर्ड रीसेट करें`;

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
              <strong>Intlayer</strong> के लिए अपना पासवर्ड रीसेट करें
            </Heading>
            <Text className="text-black text-sm leading-6">
              नमस्ते {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              हमें आपके <strong>Intlayer</strong> खाते का पासवर्ड रीसेट करने का अनुरोध
              प्राप्त हुआ है।
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                पासवर्ड रीसेट करें
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              यह पासवर्ड रीसेट अनुरोध{' '}
              <span className="text-black">{username}</span> के लिए था। यदि आपने
              पासवर्ड रीसेट का अनुरोध नहीं किया है, तो आप इस ईमेल को नज़रअंदाज़ कर सकते हैं।
              यदि आप अपने खाते की सुरक्षा को लेकर चिंतित हैं, तो कृपया हमसे संपर्क करने के लिए
              इस ईमेल का उत्तर दें।
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailTR = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Intlayer için şifrenizi sıfırlayın`;

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
              <strong>Intlayer</strong> için şifrenizi sıfırlayın
            </Heading>
            <Text className="text-black text-sm leading-6">
              Merhaba {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              <strong>Intlayer</strong> hesabınız için şifre sıfırlama talebi
              aldık.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Şifreyi Sıfırla
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              veya bu URL'yi kopyalayıp tarayıcınıza yapıştırın:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Bu şifre sıfırlama talebi{' '}
              <span className="text-black">{username}</span> için
              gönderilmiştir. Eğer şifre sıfırlama talebinde bulunmadıysanız, bu
              e-postayı dikkate almayabilirsiniz. Hesabınızın güvenliği
              konusunda endişeleriniz varsa, bizimle iletişime geçmek için
              lütfen bu e-postayı yanıtlayın.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailPL = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Zresetuj swoje hasło do Intlayer`;

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
              Zresetuj swoje hasło do <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Witaj {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Resetuj hasło
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              lub skopiuj i wklej ten adres URL do przeglądarki:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Ta prośba o zresetowanie hasła była przeznaczona dla{' '}
              <span className="text-black">{username}</span>. Jeśli nie prosiłeś
              o zresetowanie hasła, możesz zignorować tę wiadomość. Jeśli
              martwisz się o bezpieczeństwo swojego konta, odpowiedz na tę
              wiadomość, aby się z nami skontaktować.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailID = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Atur ulang kata sandi Anda untuk Intlayer`;

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
              Atur ulang kata sandi Anda untuk <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Halo {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Kami menerima permintaan untuk mengatur ulang kata sandi untuk
              akun <strong>Intlayer</strong> Anda.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Atur Ulang Kata Sandi
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Permintaan atur ulang kata sandi ini ditujukan untuk{' '}
              <span className="text-black">{username}</span>. Jika Anda tidak
              meminta atur ulang kata sandi, Anda dapat mengabaikan email ini.
              Jika Anda khawatir tentang keamanan akun Anda, silakan balas email
              ini untuk menghubungi kami.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailVI = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Đặt lại mật khẩu Intlayer của bạn`;

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
              Đặt lại mật khẩu của bạn cho <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Xin chào {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản{' '}
              <strong>Intlayer</strong> của bạn.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Đặt lại mật khẩu
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Yêu cầu đặt lại mật khẩu này dành cho{' '}
              <span className="text-black">{username}</span>. Nếu bạn không yêu
              cầu đặt lại mật khẩu, bạn có thể bỏ qua email này. Nếu bạn lo lắng
              về tính bảo mật của tài khoản, vui lòng phản hồi email này để liên
              hệ với chúng tôi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ResetPasswordEmailUK = ({
  username,
  resetLink,
}: ResetPasswordEmailProps) => {
  const previewText = `Скидання пароля для Intlayer`;

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
              Скидання пароля для <strong>Intlayer</strong>
            </Heading>
            <Text className="text-black text-sm leading-6">
              Вітаємо, {username},
            </Text>
            <Text className="text-black text-sm leading-6">
              Ми отримали запит на скидання пароля до вашого облікового запису{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-white text-xs no-underline"
                href={resetLink}
              >
                Скинути пароль
              </Button>
            </Section>
            <Text className="text-black text-sm leading-6">
              або скопіюйте та вставте цю URL-адресу у ваш браузер:
            </Text>
            <Link
              href={resetLink}
              className="text-[#8a8a8a] text-xs no-underline"
            >
              {resetLink}
            </Link>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-xs leading-6">
              Цей запит на скидання пароля був призначений для{' '}
              <span className="text-black">{username}</span>. Якщо ви не
              запитували скидання пароля, ви можете ігнорувати цей лист. Якщо ви
              стурбовані безпекою свого облікового запису, будь ласка, дайте
              відповідь на цей лист, щоб зв'язатися з нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: ResetPasswordEmailProps = {
  username: 'alanturing',
  resetLink: 'https://intlayer.org/reset/foo',
};

ResetPasswordEmailEN.PreviewProps = PreviewProps;
ResetPasswordEmailFR.PreviewProps = PreviewProps;
ResetPasswordEmailES.PreviewProps = PreviewProps;
ResetPasswordEmailRU.PreviewProps = PreviewProps;
ResetPasswordEmailJA.PreviewProps = PreviewProps;
ResetPasswordEmailKO.PreviewProps = PreviewProps;
ResetPasswordEmailZH.PreviewProps = PreviewProps;
ResetPasswordEmailDE.PreviewProps = PreviewProps;
ResetPasswordEmailAR.PreviewProps = PreviewProps;
ResetPasswordEmailIT.PreviewProps = PreviewProps;
ResetPasswordEmailEN_GB.PreviewProps = PreviewProps;
ResetPasswordEmailPT.PreviewProps = PreviewProps;
ResetPasswordEmailHI.PreviewProps = PreviewProps;
ResetPasswordEmailTR.PreviewProps = PreviewProps;
ResetPasswordEmailPL.PreviewProps = PreviewProps;
ResetPasswordEmailID.PreviewProps = PreviewProps;
ResetPasswordEmailVI.PreviewProps = PreviewProps;
ResetPasswordEmailUK.PreviewProps = PreviewProps;
