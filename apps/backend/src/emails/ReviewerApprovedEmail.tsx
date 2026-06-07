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

export type ReviewerApprovedEmailProps = {
  username: string;
  dashboardLink: string;
};

export const ReviewerApprovedEmailEN = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Your Intlayer reviewer profile has been approved!`;

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
              Your profile has been <strong>approved</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Great news! Your reviewer profile on <strong>Intlayer</strong> has
              been reviewed and approved. You are now listed on the marketplace
              and can start receiving translation missions.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Go to Your Dashboard
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need help, feel free to reply to this
              email. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailFR = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Votre profil traducteur Intlayer a été approuvé !`;

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
              Votre profil a été <strong>approuvé</strong> !
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonne nouvelle ! Votre profil de traducteur sur{' '}
              <strong>Intlayer</strong> a été examiné et approuvé. Vous êtes
              maintenant listé sur la marketplace et pouvez commencer à recevoir
              des missions de traduction.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Accéder à votre tableau de bord
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à
              répondre à cet e-mail. Nous sommes là pour vous aider !
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailES = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `¡Tu perfil de traductor en Intlayer ha sido aprobado!`;

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
              ¡Tu perfil ha sido <strong>aprobado</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              ¡Buenas noticias! Tu perfil de traductor en{' '}
              <strong>Intlayer</strong> ha sido revisado y aprobado. Ahora
              apareces en el marketplace y puedes empezar a recibir misiones de
              traducción.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Ir a tu panel de control
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si tienes preguntas o necesitas ayuda, no dudes en responder a
              este correo. ¡Estamos aquí para ayudarte!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailRU = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Ваш профиль переводчика на Intlayer одобрен!`;

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
              Ваш профиль <strong>одобрен</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username}!
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Отличная новость! Ваш профиль переводчика на{' '}
              <strong>Intlayer</strong> был проверен и одобрен. Вы теперь
              отображаетесь на маркетплейсе и можете начать получать задания на
              перевод.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Перейти к панели управления
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
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

export const ReviewerApprovedEmailJA = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Intlayerの翻訳者プロフィールが承認されました！`;

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
              プロフィールが<strong>承認</strong>されました！
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              おめでとうございます！<strong>Intlayer</strong>
              での翻訳者プロフィールが審査され、承認されました。マーケットプレイスに掲載され、翻訳ミッションの受注を開始できます。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                ダッシュボードへ
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              または、以下のURLをブラウザにコピー＆ペーストしてください：
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
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

export const ReviewerApprovedEmailKO = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Intlayer 번역가 프로필이 승인되었습니다!`;

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
              프로필이 <strong>승인</strong>되었습니다!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              좋은 소식입니다! <strong>Intlayer</strong>에서 번역가 프로필이
              검토되어 승인되었습니다. 이제 마켓플레이스에 등록되어 번역 미션을
              받기 시작할 수 있습니다.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                대시보드로 이동
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              또는 다음 URL을 브라우저에 복사하여 붙여넣으세요:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
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

export const ReviewerApprovedEmailZH = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `您的 Intlayer 译者档案已获批准！`;

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
              您的档案已<strong>获批准</strong>！
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              好消息！您在 <strong>Intlayer</strong>{' '}
              上的译者档案已经过审核并获批准。您现在已列入市场，可以开始接受翻译任务。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                前往您的仪表板
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              或者将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
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

export const ReviewerApprovedEmailDE = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Ihr Intlayer Übersetzer-Profil wurde genehmigt!`;

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
              Ihr Profil wurde <strong>genehmigt</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Großartige Neuigkeiten! Ihr Übersetzer-Profil auf{' '}
              <strong>Intlayer</strong> wurde geprüft und genehmigt. Sie sind
              jetzt auf dem Marktplatz gelistet und können mit der Annahme von
              Übersetzungsaufträgen beginnen.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Zum Dashboard
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              oder kopieren Sie diese URL in Ihren Browser:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Wenn Sie Fragen haben oder Hilfe benötigen, können Sie gerne auf
              diese E-Mail antworten. Wir sind für Sie da!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailAR = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `تمت الموافقة على ملف المترجم الخاص بك في Intlayer!`;

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
              تمت <strong>الموافقة</strong> على ملفك الشخصي!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              أخبار رائعة! تمت مراجعة ملفك الشخصي كمترجم على{' '}
              <strong>Intlayer</strong> والموافقة عليه. أنت الآن مدرج في السوق
              ويمكنك البدء في استقبال مهام الترجمة.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                الذهاب إلى لوحة التحكم
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              أو قم بنسخ ولصق هذا الرابط في متصفحك:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
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

export const ReviewerApprovedEmailIT = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Il tuo profilo traduttore su Intlayer è stato approvato!`;

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
              Il tuo profilo è stato <strong>approvato</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Ottime notizie! Il tuo profilo da traduttore su{' '}
              <strong>Intlayer</strong> è stato esaminato e approvato. Sei ora
              elencato nel marketplace e puoi iniziare a ricevere missioni di
              traduzione.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Vai alla tua dashboard
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se hai domande o hai bisogno di aiuto, non esitare a rispondere a
              questa e-mail. Siamo qui per aiutarti!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailEN_GB = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Your Intlayer reviewer profile has been approved!`;

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
              Your profile has been <strong>approved</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Great news! Your reviewer profile on <strong>Intlayer</strong> has
              been reviewed and approved. You are now listed on the marketplace
              and can start receiving translation missions.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Go to Your Dashboard
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need help, feel free to reply to this
              email. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailPT = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Seu perfil de tradutor no Intlayer foi aprovado!`;

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
              Seu perfil foi <strong>aprovado</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Ótimas notícias! Seu perfil de tradutor no{' '}
              <strong>Intlayer</strong> foi revisado e aprovado. Você agora está
              listado no marketplace e pode começar a receber missões de
              tradução.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Ir para o seu painel
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copie e cole esta URL no seu navegador:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você tiver alguma dúvida ou precisar de ajuda, sinta-se à
              vontade para responder a este e-mail. Estamos aqui para ajudar!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailHI = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Intlayer पर आपकी अनुवादक प्रोफ़ाइल को अनुमोदित कर दिया गया है!`;

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
              आपकी प्रोफ़ाइल <strong>अनुमोदित</strong> हो गई!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              बधाई हो! <strong>Intlayer</strong> पर आपकी अनुवादक प्रोफ़ाइल की
              समीक्षा की गई है और उसे अनुमोदित कर दिया गया है। आप अब मार्केटप्लेस पर
              सूचीबद्ध हैं और अनुवाद मिशन प्राप्त करना शुरू कर सकते हैं।
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                अपने डैशबोर्ड पर जाएं
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              यदि आपके कोई प्रश्न हैं या सहायता की आवश्यकता है, तो बेझिझक इस ईमेल का उत्तर
              दें। हम आपकी मदद के लिए यहाँ हैं!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailTR = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Intlayer çevirmen profiliniz onaylandı!`;

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
              Profiliniz <strong>onaylandı</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Harika haber! <strong>Intlayer</strong>'daki çevirmen profiliniz
              incelendi ve onaylandı. Artık pazaryerinde listelendiniz ve çeviri
              görevleri almaya başlayabilirsiniz.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Gösterge Paneline Git
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              veya bu URL'yi tarayıcınıza kopyalayıp yapıştırın:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Sorularınız veya yardıma ihtiyacınız varsa bu e-postayı
              yanıtlamaktan çekinmeyin. Yardım etmek için buradayız!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailPL = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Twój profil tłumacza w Intlayer został zatwierdzony!`;

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
              Twój profil został <strong>zatwierdzony</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Witaj {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Świetna wiadomość! Twój profil tłumacza w{' '}
              <strong>Intlayer</strong> został sprawdzony i zatwierdzony. Jesteś
              teraz widoczny na marketplace i możesz zacząć otrzymywać zlecenia
              tłumaczeniowe.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Przejdź do panelu
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              lub skopiuj i wklej ten URL do przeglądarki:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jeśli masz pytania lub potrzebujesz pomocy, możesz odpowiedzieć na
              tego e-maila. Jesteśmy tutaj, żeby pomóc!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailID = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Profil penerjemah Intlayer Anda telah disetujui!`;

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
              Profil Anda telah <strong>disetujui</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Kabar baik! Profil penerjemah Anda di <strong>Intlayer</strong>{' '}
              telah ditinjau dan disetujui. Anda sekarang terdaftar di
              marketplace dan dapat mulai menerima misi terjemahan.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Buka Dasbor Anda
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan
              ragu untuk membalas email ini. Kami siap membantu!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailVI = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Hồ sơ dịch giả Intlayer của bạn đã được phê duyệt!`;

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
              Hồ sơ của bạn đã được <strong>phê duyệt</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Tin tuyệt vời! Hồ sơ dịch giả của bạn trên{' '}
              <strong>Intlayer</strong> đã được xem xét và phê duyệt. Bạn hiện
              đã được liệt kê trên marketplace và có thể bắt đầu nhận nhiệm vụ
              dịch thuật.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Đến trang tổng quan của bạn
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, hãy tự nhiên trả
              lời email này. Chúng tôi luôn sẵn sàng giúp đỡ!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ReviewerApprovedEmailUK = ({
  username,
  dashboardLink,
}: ReviewerApprovedEmailProps) => {
  const previewText = `Ваш профіль перекладача на Intlayer схвалено!`;

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
              Ваш профіль було <strong>схвалено</strong>!
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username}!
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Чудові новини! Ваш профіль перекладача на{' '}
              <strong>Intlayer</strong> було перевірено та схвалено. Тепер ви
              відображаєтесь на маркетплейсі та можете починати отримувати
              завдання на переклад.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={dashboardLink}
              >
                Перейти до панелі керування
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              або скопіюйте та вставте цей URL у браузер:
            </Text>
            <Link
              href={dashboardLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {dashboardLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Якщо у вас є запитання або потрібна допомога, не соромтеся
              відповідати на цей лист. Ми тут, щоб допомогти!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
