import {
  Body,
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

export type PasswordChangeConfirmationEmailProps = {
  username: string;
};

export const PasswordChangeConfirmationEmailEN = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Your Intlayer password has been changed`;

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
              Your password has been changed
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              This email is to confirm that your password for your{' '}
              <strong>Intlayer</strong> account has been successfully changed.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              If you did not make this change or believe an unauthorized person
              has accessed your account, please contact us immediately by
              replying to this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need further assistance, feel free to
              reach out to us. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailFR = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Votre mot de passe Intlayer a été modifié`;

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
              Votre mot de passe a été modifié
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Cet email confirme que votre mot de passe pour votre compte{' '}
              <strong>Intlayer</strong> a été changé avec succès.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Si vous n'avez pas effectué ce changement ou si vous pensez qu'une
              personne non autorisée a accédé à votre compte, veuillez nous
              contacter immédiatement en répondant à cet email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si vous avez des questions ou avez besoin d'assistance
              supplémentaire, n'hésitez pas à nous contacter. Nous sommes là
              pour vous aider !
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailES = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Tu contraseña de Intlayer ha sido cambiada`;

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
              Tu contraseña ha sido cambiada
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Este correo es para confirmar que la contraseña de tu cuenta en{' '}
              <strong>Intlayer</strong> ha sido cambiada exitosamente.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Si no realizaste este cambio o crees que una persona no autorizada
              ha accedido a tu cuenta, por favor contáctanos inmediatamente
              respondiendo a este correo electrónico.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si tienes alguna pregunta o necesitas asistencia adicional, no
              dudes en ponerte en contacto con nosotros. ¡Estamos aquí para
              ayudarte!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailRU = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Ваш пароль Intlayer был изменен`;

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
              Ваш пароль был изменен
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Это письмо подтверждает, что пароль для вашего аккаунта{' '}
              <strong>Intlayer</strong> был успешно изменен.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Если вы не вносили эти изменения или считаете, что постороннее
              лицо получило доступ к вашему аккаунту, пожалуйста, немедленно
              свяжитесь с нами, ответив на это письмо.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Если у вас есть вопросы или вам нужна дополнительная помощь, не
              стесняйтесь обращаться к нам. Мы здесь, чтобы помочь!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailJA = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Intlayerのパスワードが変更されました`;

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
              パスワードが変更されました
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              このメールは、あなたの<strong>Intlayer</strong>
              アカウントのパスワードが正常に変更されたことを確認するためのものです。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              もしこの変更に心当たりがない場合や、不正アクセスが疑われる場合は、このメールに返信してすぐにご連絡ください。
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              ご質問やサポートが必要な場合は、お気軽にお問い合わせください。喜んでお手伝いさせていただきます！
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailKO = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Intlayer 비밀번호가 변경되었습니다`;

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
              비밀번호가 변경되었습니다
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              귀하의 <strong>Intlayer</strong> 계정 비밀번호가 성공적으로
              변경되었음을 알려드립니다.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              만약 본인이 직접 변경하지 않았거나 무단 액세스가 의심되는 경우, 이
              이메일에 답장을 보내 즉시 저희에게 연락해 주세요.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              궁금한 점이 있거나 도움이 필요하시면 언제든지 문의해 주세요.
              저희가 도와드리겠습니다!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailZH = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `您的 Intlayer 密码已更改`;

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
              您的密码已更改
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              此邮件旨在确认您的 <strong>Intlayer</strong> 账户密码已成功更改。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              如果您未进行此更改，或认为有未经授权的人员访问了您的账户，请立即回复此邮件与我们联系。
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              如果您有任何疑问或需要进一步的帮助，请随时联系我们。我们随时为您提供支持！
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailDE = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Ihr Intlayer-Passwort wurde geändert`;

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
              Ihr Passwort wurde geändert
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Diese E-Mail bestätigt, dass Ihr Passwort für Ihr{' '}
              <strong>Intlayer</strong>-Konto erfolgreich geändert wurde.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Wenn Sie diese Änderung nicht vorgenommen haben oder vermuten,
              dass eine unbefugte Person auf Ihr Konto zugegriffen hat,
              kontaktieren Sie uns bitte umgehend, indem Sie auf diese E-Mail
              antworten.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Wenn Sie Fragen haben oder weitere Unterstützung benötigen, können
              Sie sich gerne an uns wenden. Wir sind für Sie da!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailAR = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `تم تغيير كلمة مرور Intlayer الخاصة بك`;

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
              تم تغيير كلمة المرور الخاصة بك
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              هذا البريد الإلكتروني لتأكيد أنه قد تم تغيير كلمة المرور الخاصة
              بحسابك في <strong>Intlayer</strong> بنجاح.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              إذا لم تقم بإجراء هذا التغيير أو كنت تعتقد أن شخصاً غير مصرح له قد
              دخل إلى حسابك، فيرجى الاتصال بنا على الفور من خلال الرد على هذا
              البريد الإلكتروني.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              إذا كان لديك أي أسئلة أو كنت بحاجة إلى مزيد من المساعدة، فلا تتردد
              في التواصل معنا. نحن هنا للمساعدة!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailIT = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `La tua password Intlayer è stata modificata`;

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
              La tua password è stata modificata
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Questa e-mail conferma che la password del tuo account{' '}
              <strong>Intlayer</strong> è stata modificata con successo.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Se non hai effettuato tu questa modifica o ritieni che una persona
              non autorizzata abbia effettuato l'accesso al tuo account,
              contattaci immediatamente rispondendo a questa e-mail.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se hai domande o hai bisogno di ulteriore assistenza, non esitare
              a contattarci. Siamo qui per aiutarti!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailEN_GB = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Your Intlayer password has been changed`;

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
              Your password has been changed
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              This email is to confirm that your password for your{' '}
              <strong>Intlayer</strong> account has been successfully changed.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              If you did not make this change or believe an unauthorised person
              has accessed your account, please contact us immediately by
              replying to this email.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need further assistance, feel free to
              reach out to us. We're here to help!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailPT = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Sua senha do Intlayer foi alterada`;

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
              Sua senha foi alterada
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Este e-mail é para confirmar que a senha da sua conta{' '}
              <strong>Intlayer</strong> foi alterada com sucesso.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Se você não realizou essa alteração ou acredita que uma pessoa não
              autorizada acessou sua conta, entre em contato conosco
              imediatamente respondendo a este e-mail.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você tiver alguma dúvida ou precisar de mais assistência,
              sinta-se à vontade para nos contactar. Estamos aqui para ajudar!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailHI = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `आपका Intlayer पासवर्ड बदल दिया गया है`;

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
              आपका पासवर्ड बदल दिया गया है
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              यह ईमेल पुष्टि करने के लिए है कि आपके <strong>Intlayer</strong> खाते का
              पासवर्ड सफलतापूर्वक बदल दिया गया है।
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              यदि आपने यह परिवर्तन नहीं किया है या आपको लगता है कि किसी अनधिकृत व्यक्ति
              ने आपके खाते तक पहुँच प्राप्त कर ली है, तो कृपया इस ईमेल का उत्तर देकर तुरंत हमसे
              संपर्क करें।
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              यदि आपके कोई प्रश्न हैं या आपको और सहायता की आवश्यकता है, तो बेझिझक हमसे
              संपर्क करें। हम यहाँ आपकी सहायता के लिए हैं!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailTR = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Intlayer şifreniz değiştirildi`;

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
              Şifreniz değiştirildi
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Bu e-posta, <strong>Intlayer</strong> hesabınızın şifresinin
              başarıyla değiştirildiğini onaylamak içindir.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Eğer bu değişikliği siz yapmadıysanız veya yetkisiz bir kişinin
              hesabınıza eriştiğine inanıyorsanız, lütfen bu e-postayı
              yanıtlayarak hemen bizimle iletişime geçin.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Herhangi bir sorunuz varsa veya daha fazla yardıma ihtiyacınız
              olursa, bizimle iletişime geçmekten çekinmeyin. Size yardımcı
              olmak için buradayız!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailPL = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Twoje hasło Intlayer zostało zmienione`;

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
              Twoje hasło zostało zmienione
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Witaj {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Ta wiadomość e-mail potwierdza, że hasło do Twojego konta{' '}
              <strong>Intlayer</strong> zostało pomyślnie zmienione.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Jeśli nie dokonałeś tej zmiany lub uważasz, że nieupoważniona
              osoba uzyskała dostęp do Twojego konta, skontaktuj się z nami
              natychmiast, odpowiadając na tę wiadomość e-mail.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jeśli masz jakiekolwiek pytania lub potrzebujesz dalszej pomocy,
              skontaktuj się z nami. Jesteśmy tutaj, aby pomóc!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailID = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Kata sandi Intlayer Anda telah diubah`;

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
              Kata sandi Anda telah diubah
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Email ini mengonfirmasi bahwa kata sandi untuk akun{' '}
              <strong>Intlayer</strong> Anda telah berhasil diubah.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Jika Anda tidak melakukan perubahan ini atau yakin orang yang
              tidak berwenang telah mengakses akun Anda, silakan hubungi kami
              segera dengan membalas email ini.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Jika Anda memiliki pertanyaan atau butuh bantuan lebih lanjut,
              jangan ragu untuk menghubungi kami. Kami di sini untuk membantu!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailVI = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Mật khẩu Intlayer của bạn đã được thay đổi`;

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
              Mật khẩu của bạn đã được thay đổi
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Email này nhằm xác nhận rằng mật khẩu cho tài khoản{' '}
              <strong>Intlayer</strong> của bạn đã được thay đổi thành công.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Nếu bạn không thực hiện thay đổi này hoặc tin rằng một người không
              được phép đã truy cập vào tài khoản của bạn, vui lòng liên hệ với
              chúng tôi ngay lập tức bằng cách trả lời email này.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, đừng ngần ngại
              liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng giúp đỡ!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const PasswordChangeConfirmationEmailUK = ({
  username,
}: PasswordChangeConfirmationEmailProps) => {
  const previewText = `Ваш пароль Intlayer було змінено`;

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
              Ваш пароль було змінено
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Цей електронний лист підтверджує, що пароль до вашого облікового
              запису <strong>Intlayer</strong> було успішно змінено.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Якщо ви не здійснювали цих змін або вважаєте, що сторонні особи
              отримали доступ до вашого облікового запису, будь ласка, негайно
              зв'яжіться з нами, відповівши на цей лист.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Якщо у вас виникли запитання або потрібна додаткова допомога, не
              соромтеся звертатися до нас. Ми тут, щоб допомогти!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: PasswordChangeConfirmationEmailProps = {
  username: 'alanturing',
};

PasswordChangeConfirmationEmailEN.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailFR.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailES.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailRU.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailJA.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailKO.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailZH.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailDE.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailAR.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailIT.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailEN_GB.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailPT.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailHI.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailTR.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailPL.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailID.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailVI.PreviewProps = PreviewProps;
PasswordChangeConfirmationEmailUK.PreviewProps = PreviewProps;
