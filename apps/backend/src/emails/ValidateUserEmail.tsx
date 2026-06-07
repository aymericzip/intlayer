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

export type ValidateUserEmailProps = {
  username: string;
  validationLink: string;
};

export const ValidateUserEmailEN = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validate your email for Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Validate your email for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Please validate your email address to complete your registration
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Validate Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
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

export const ValidateUserEmailFR = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validez votre e-mail pour Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Validez votre e-mail pour <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Veuillez valider votre adresse e-mail pour compléter votre
              inscription sur <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Valider l'e-mail
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
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

export const ValidateUserEmailES = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Valida tu correo electrónico para Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Valida tu correo electrónico para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Por favor valida tu dirección de correo electrónico para completar
              tu registro en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Validar Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
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

export const ValidateUserEmailRU = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Подтвердите свой адрес электронной почты для Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Подтвердите свой адрес электронной почты для{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Пожалуйста, подтвердите свой адрес электронной почты, чтобы
              завершить регистрацию на <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Подтвердить почту
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Это письмо было предназначено для{' '}
              <span className="text-black">{username}</span>. Если вы не ожидали
              этого письма, вы можете проигнорировать его. Если вы обеспокоены
              безопасностью своего аккаунта, пожалуйста, ответьте на это письмо,
              чтобы связаться с нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailJA = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Intlayerのメールアドレスを認証してください`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              <strong>Intlayer</strong>のメールアドレスを認証する
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Intlayer</strong>
              への登録を完了するために、メールアドレスを認証してください。
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                メールを認証する
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              または、以下のURLをコピーしてブラウザに貼り付けてください：
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              このメールは<span className="text-black">{username}</span>
              様宛に送信されました。もしこのメールに心当たりがない場合は、無視していただいて構いません。アカウントのセキュリティについて懸念がある場合は、このメールに返信してご連絡ください。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailKO = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Intlayer 이메일 주소를 인증해 주세요`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              <strong>Intlayer</strong> 이메일 주소 인증
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Intlayer</strong> 가입을 완료하려면 이메일 주소를 인증해
              주세요.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                이메일 인증하기
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              또는 아래 URL을 복사하여 브라우저에 붙여넣으세요:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              이 이메일은 <span className="text-black">{username}</span>님에게
              발송되었습니다. 이 이메일을 요청하지 않으셨다면 무시하셔도 됩니다.
              계정 보안이 우려되신다면 이 이메일에 답장하여 저희에게 문의해
              주세요.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailZH = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `验证您的 Intlayer 电子邮件`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              验证您的 <strong>Intlayer</strong> 电子邮件
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              请验证您的电子邮件地址，以完成在 <strong>Intlayer</strong>{' '}
              的注册。
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                验证电子邮件
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              或将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              此电子邮件发送给 <span className="text-black">{username}</span>
              。如果您没有预料到收到此邮件，可以忽略它。如果您担心帐户安全，请回复此邮件与我们联系。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailDE = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Bestätigen Sie Ihre E-Mail für Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Bestätigen Sie Ihre E-Mail für <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihre Registrierung
              bei <strong>Intlayer</strong> abzuschließen.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                E-Mail bestätigen
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              oder kopieren Sie diese URL und fügen Sie sie in Ihren Browser
              ein:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Diese E-Mail war für{' '}
              <span className="text-black">{username}</span> bestimmt. Wenn Sie
              diese E-Mail nicht erwartet haben, können Sie sie ignorieren. Wenn
              Sie um die Sicherheit Ihres Kontos besorgt sind, antworten Sie
              bitte auf diese E-Mail, um mit uns in Kontakt zu treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailAR = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `تأكيد بريدك الإلكتروني لـ Intlayer`;

  return (
    <Html dir="rtl">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              تأكيد بريدك الإلكتروني لـ <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              يرجى تأكيد عنوان بريدك الإلكتروني لإكمال تسجيلك في{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                تأكيد البريد الإلكتروني
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              أو انسخ هذا الرابط وألصقه في متصفحك:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              تم إرسال هذا البريد الإلكتروني إلى{' '}
              <span className="text-black">{username}</span>. إذا لم تكن تتوقع
              هذا البريد، يمكنك تجاهله. إذا كنت قلقاً بشأن أمان حسابك، يرجى الرد
              على هذا البريد للتواصل معنا.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailIT = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Conferma la tua email per Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Conferma la tua email per <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Conferma il tuo indirizzo email per completare la tua
              registrazione su <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Conferma Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Questa email è stata inviata a{' '}
              <span className="text-black">{username}</span>. Se non ti
              aspettavi questa email, puoi ignorarla. Se sei preoccupato per la
              sicurezza del tuo account, rispondi a questa email per metterti in
              contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailEN_GB = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validate your email for Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Validate your email for <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Please validate your email address to complete your registration
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Validate Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
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

export const ValidateUserEmailPT = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Valide seu e-mail para Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Valide seu e-mail para <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Por favor, valide seu endereço de e-mail para concluir seu
              registro no <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Validar E-mail
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copie e cole este URL no seu navegador:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Este e-mail foi enviado para{' '}
              <span className="text-black">{username}</span>. Se você não
              esperava este e-mail, pode ignorá-lo. Se estiver preocupado com a
              segurança da sua conta, responda a este e-mail para entrar em
              contato conosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailHI = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Intlayer के लिए अपना ईमेल सत्यापित करें`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              <strong>Intlayer</strong> के लिए अपना ईमेल सत्यापित करें
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Intlayer</strong> पर अपना पंजीकरण पूरा करने के लिए कृपया अपना
              ईमेल पता सत्यापित करें।
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                ईमेल सत्यापित करें
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              यह ईमेल <span className="text-black">{username}</span> के लिए था।
              यदि आप इस ईमेल की प्रतीक्षा नहीं कर रहे थे, तो आप इसे अनदेखा कर सकते हैं। यदि
              आप अपने खाते की सुरक्षा के बारे में चिंतित हैं, तो कृपया हमसे संपर्क करने के लिए इस
              ईमेल का उत्तर दें।
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailTR = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Intlayer için e-postanızı doğrulayın`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              <strong>Intlayer</strong> için e-postanızı doğrulayın
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Intlayer</strong> kaydınızı tamamlamak için lütfen e-posta
              adresinizi doğrulayın.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                E-postayı Doğrula
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              veya bu URL'yi kopyalayıp tarayıcınıza yapıştırın:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Bu e-posta <span className="text-black">{username}</span> için
              gönderilmiştir. Bu e-postayı beklemiyorsanız görmezden
              gelebilirsiniz. Hesabınızın güvenliği konusunda endişeniz varsa,
              lütfen bizimle iletişime geçmek için bu e-postayı yanıtlayın.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailPL = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Zweryfikuj swój e-mail dla Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Zweryfikuj swój e-mail dla <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Witaj {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Zweryfikuj swój adres e-mail, aby dokończyć rejestrację w{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Zweryfikuj E-mail
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              lub skopiuj i wklej ten URL do swojej przeglądarki:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Ta wiadomość była przeznaczona dla{' '}
              <span className="text-black">{username}</span>. Jeśli nie
              oczekiwałeś tej wiadomości, możesz ją zignorować. Jeśli obawiasz
              się o bezpieczeństwo swojego konta, odpowiedz na ten e-mail, aby
              się z nami skontaktować.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailID = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Validasi email Anda per Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Validasi email Anda per <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Harap validasi alamat email Anda untuk menyelesaikan pendaftaran
              Anda di <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Validasi Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Email ini ditujukan untuk{' '}
              <span className="text-black">{username}</span>. Jika Anda tidak
              mengharapkan email ini, Anda dapat mengabaikannya. Jika Anda
              khawatir tentang keamanan akun Anda, harap balas email ini untuk
              menghubungi kami.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailVI = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Xác thực email của bạn cho Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Xác thực email của bạn cho <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Vui lòng xác thực địa chỉ email của bạn để hoàn tất đăng ký trên{' '}
              <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Xác thực Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Email này dành cho <span className="text-black">{username}</span>.
              Nếu bạn không mong đợi email này, bạn có thể bỏ qua nó. Nếu bạn lo
              lắng về tính bảo mật của tài khoản, vui lòng trả lời email này để
              liên hệ với chúng tôi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ValidateUserEmailUK = ({
  username,
  validationLink,
}: ValidateUserEmailProps) => {
  const previewText = `Підтвердьте свою електронну пошту для Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-116.25 rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
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
              Підтвердьте свою електронну пошту для <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Будь ласка, підтвердьте свою адресу електронної пошти, щоб
              завершити реєстрацію на <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={validationLink}
              >
                Підтвердити пошту
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              або скопіюйте та вставте цю URL-адресу у ваш браузер:
            </Text>
            <Link
              href={validationLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {validationLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Цей електронний лист призначений для{' '}
              <span className="text-black">{username}</span>. Якщо ви не
              очікували цього листа, ви можете проігнорувати його. Якщо ви
              турбуєтеся про безпеку свого облікового запису, будь ласка, дайте
              відповідь на цей лист, щоб зв'язатися з нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const previewProps: ValidateUserEmailProps = {
  username: 'alanturing',
  validationLink: 'https://intlayer.org/validate/foo',
};

ValidateUserEmailEN.PreviewProps = previewProps;
ValidateUserEmailFR.PreviewProps = previewProps;
ValidateUserEmailES.PreviewProps = previewProps;
ValidateUserEmailRU.PreviewProps = previewProps;
ValidateUserEmailJA.PreviewProps = previewProps;
ValidateUserEmailKO.PreviewProps = previewProps;
ValidateUserEmailZH.PreviewProps = previewProps;
ValidateUserEmailDE.PreviewProps = previewProps;
ValidateUserEmailAR.PreviewProps = previewProps;
ValidateUserEmailIT.PreviewProps = previewProps;
ValidateUserEmailEN_GB.PreviewProps = previewProps;
ValidateUserEmailPT.PreviewProps = previewProps;
ValidateUserEmailHI.PreviewProps = previewProps;
ValidateUserEmailTR.PreviewProps = previewProps;
ValidateUserEmailPL.PreviewProps = previewProps;
ValidateUserEmailID.PreviewProps = previewProps;
ValidateUserEmailVI.PreviewProps = previewProps;
ValidateUserEmailUK.PreviewProps = previewProps;
