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

export type WelcomeEmailProps = {
  username: string;
  loginLink: string;
};

export const WelcomeEmailEN = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Welcome to Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Welcome to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We're excited to have you on board! Get started by logging in to
              your <strong>Intlayer</strong> account.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Log In to Your Account
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need help getting started, feel free
              to reply to this email. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailFR = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Bienvenue chez Intlayer !`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Bienvenue chez <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Nous sommes ravis de vous avoir parmi nous ! Commencez par vous
              connecter à votre compte <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Connectez-vous à votre compte
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si vous avez des questions ou besoin d'aide pour commencer,
              n'hésitez pas à répondre à cet e-mail. Nous sommes là pour vous
              aider !
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailES = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `¡Bienvenido a Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Bienvenido a <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              ¡Estamos emocionados de tenerte a bordo! Comienza iniciando sesión
              en tu cuenta de <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Inicia sesión en tu cuenta
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si tienes preguntas o necesitas ayuda para comenzar, no dudes en
              responder a este correo electrónico. ¡Estamos aquí para ayudarte!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailRU = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Добро пожаловать в Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Добро пожаловать в <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Мы рады видеть вас в нашей команде! Начните работу, войдя в свой
              аккаунт <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Войти в свой аккаунт
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Если у вас есть вопросы или нужна помощь, не стесняйтесь отвечать
              на это письмо. Мы здесь, чтобы помочь!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailJA = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Intlayerへようこそ！`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              <strong>Intlayer</strong>へようこそ
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Intlayerへようこそ！まずは<strong>Intlayer</strong>
              アカウントにログインして始めましょう。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                アカウントにログイン
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              または、以下のURLをブラウザにコピー＆ペーストしてください：
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              ご不明な点やサポートが必要な場合は、このメールに返信してください。私たちがサポートいたします！
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailKO = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Intlayer에 오신 것을 환영합니다!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              <strong>Intlayer</strong>에 오신 것을 환영합니다
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              가입을 진심으로 환영합니다! <strong>Intlayer</strong> 계정에
              로그인하여 시작해 보세요.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                계정에 로그인하기
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              또는 다음 URL을 브라우저에 복사하여 붙여넣으세요:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              궁금한 점이 있거나 도움이 필요하시면 이 이메일에 답장해 주세요.
              저희가 도와드리겠습니다!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailZH = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `欢迎来到 Intlayer！`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              欢迎来到 <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              我们很高兴您的加入！请登录您的 <strong>Intlayer</strong>{' '}
              账户开始使用。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                登录您的账户
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              或者将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              如果您有任何问题或需要帮助，请随时回复此邮件。我们随时为您提供帮助！
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailDE = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Willkommen bei Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Willkommen bei <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Wir freuen uns, Sie an Bord zu haben! Melden Sie sich in Ihrem
              <strong>Intlayer</strong>-Konto an, um loszulegen.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                In Ihr Konto einloggen
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              oder kopieren Sie diese URL in Ihren Browser:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Wenn Sie Fragen haben oder Hilfe beim Einstieg benötigen, können
              Sie gerne auf diese E-Mail antworten. Wir sind für Sie da!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailAR = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `مرحباً بك في Intlayer!`;

  return (
    <Html dir="rtl">
      <Head />
      <Preview>{previewText}</Preview>
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
              مرحباً بك في <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              نحن متحمسون لانضمامك إلينا! ابدأ بتسجيل الدخول إلى حساب
              <strong>Intlayer</strong> الخاص بك.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                تسجيل الدخول إلى حسابك
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              أو قم بنسخ ولصق هذا الرابط في متصفحك:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              إذا كان لديك أي أسئلة أو كنت بحاجة إلى مساعدة، فلا تتردد في الرد
              على هذا البريد الإلكتروني. نحن هنا للمساعدة!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailIT = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Benvenuto in Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Benvenuto in <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Siamo entusiasti di averti con noi! Inizia accedendo al tuo
              account <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Accedi al tuo account
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se hai domande o hai bisogno di aiuto per iniziare, non esitare a
              rispondere a questa e-mail. Siamo qui per aiutarti!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailEN_GB = ({
  username,
  loginLink,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Welcome to <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We're excited to have you on board! Get started by logging in to
              your <strong>Intlayer</strong> account.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Log In to Your Account
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need help getting started, feel free
              to reply to this email. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailPT = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Bem-vindo ao Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Bem-vindo ao <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Estamos felizes em ter você conosco! Comece fazendo login em sua
              conta <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Entrar em sua conta
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copie e cole esta URL no seu navegador:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você tiver alguma dúvida ou precisar de ajuda para começar,
              sinta-se à vontade para responder a este e-mail. Estamos aqui para
              ajudar!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailHI = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Intlayer में आपका स्वागत है!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              <strong>Intlayer</strong> में आपका स्वागत है
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              हमें आपको अपने साथ जोड़कर खुशी हो रही है! अपने <strong>Intlayer</strong>{' '}
              खाते में लॉग इन करके शुरुआत करें।
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                अपने खाते में लॉग इन करें
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              यदि आपके कोई प्रश्न हैं या शुरुआत करने में मदद चाहिए, तो बेझिझक इस ईमेल का
              उत्तर दें। हम आपकी मदद के लिए यहाँ हैं!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailTR = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Intlayer'a Hoş Geldiniz!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              <strong>Intlayer</strong>'a Hoş Geldiniz
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Sizi aramızda görmekten heyecan duyuyoruz!{' '}
              <strong>Intlayer</strong> hesabınıza giriş yaparak başlayın.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Hesabınıza Giriş Yapın
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              veya bu URL'yi kopyalayıp tarayıcınıza yapıştırın:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Herhangi bir sorunuz varsa veya başlamak için yardıma ihtiyacınız
              olursa, bu e-postayı yanıtlamaktan çekinmeyin. Yardım etmek için
              buradayız!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailPL = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Witaj w Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Witaj w <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Cześć {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Cieszymy się, że jesteś z nami! Zacznij od zalogowania się na
              swoje konto <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Zaloguj się do swojego konta
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              lub skopiuj i wklej ten adres URL do swojej przeglądarki:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jeśli masz jakieś pytania lub potrzebujesz pomocy na początek,
              śmiało odpowiedz na ten e-mail. Jesteśmy tutaj, aby pomóc!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailID = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Selamat datang di Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Selamat datang di <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Kami senang Anda bergabung! Mulailah dengan masuk ke akun
              <strong>Intlayer</strong> Anda.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Masuk ke Akun Anda
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jika Anda memiliki pertanyaan atau butuh bantuan untuk memulai,
              jangan ragu untuk membalas email ini. Kami di sini untuk membantu!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailVI = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Chào mừng bạn đến với Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Chào mừng bạn đến với <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Chúng tôi rất vui mừng khi có bạn đồng hành! Hãy bắt đầu bằng cách
              đăng nhập vào tài khoản <strong>Intlayer</strong> của bạn.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Đăng nhập vào tài khoản của bạn
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Nếu bạn có bất kỳ câu hỏi nào hoặc cần trợ giúp để bắt đầu, đừng
              ngần ngại trả lời email này. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const WelcomeEmailUK = ({ username, loginLink }: WelcomeEmailProps) => {
  const previewText = `Ласкаво просимо до Intlayer!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              Ласкаво просимо до <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Ми раді бачити вас у нашій команді! Почніть роботу, увійшовши у
              свій аккаунт <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={loginLink}
              >
                Увійти у свій аккаунт
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              або скопіюйте та вставте це посилання у ваш браузер:
            </Text>
            <Link
              href={loginLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {loginLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Якщо у вас виникли запитання або потрібна допомога, не соромтеся
              відповідати на цей лист. Ми тут, щоб допомогти!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: WelcomeEmailProps = {
  username: 'alanturing',
  loginLink: 'https://intlayer.org/login',
};

WelcomeEmailEN.PreviewProps = PreviewProps;
WelcomeEmailFR.PreviewProps = PreviewProps;
WelcomeEmailES.PreviewProps = PreviewProps;
WelcomeEmailRU.PreviewProps = PreviewProps;
WelcomeEmailJA.PreviewProps = PreviewProps;
WelcomeEmailKO.PreviewProps = PreviewProps;
WelcomeEmailZH.PreviewProps = PreviewProps;
WelcomeEmailDE.PreviewProps = PreviewProps;
WelcomeEmailAR.PreviewProps = PreviewProps;
WelcomeEmailIT.PreviewProps = PreviewProps;
WelcomeEmailEN_GB.PreviewProps = PreviewProps;
WelcomeEmailPT.PreviewProps = PreviewProps;
WelcomeEmailHI.PreviewProps = PreviewProps;
WelcomeEmailTR.PreviewProps = PreviewProps;
WelcomeEmailPL.PreviewProps = PreviewProps;
WelcomeEmailID.PreviewProps = PreviewProps;
WelcomeEmailVI.PreviewProps = PreviewProps;
WelcomeEmailUK.PreviewProps = PreviewProps;
