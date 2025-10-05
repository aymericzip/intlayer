import { type Dictionary, t } from 'intlayer';

export const verifyEmailStepContent = {
  key: 'verify-email-step',
  content: {
    verifyEmail: {
      title: t({
        en: 'Verify your email',
        'en-GB': 'Verify your email',
        fr: 'Vérifiez votre adresse e-mail',
        es: 'Verifique su correo electrónico',
        de: 'Bestätigen Sie Ihre E-Mail',
        ja: 'メールを確認してください',
        ko: '이메일을 확인해주세요',
        zh: '请验证您的电子邮件',
        it: 'Verifica la tua email',
        pt: 'Verifique seu e-mail',
        hi: 'अपने ईमेल की पुष्टि करें',
        ar: 'تحقق من بريدك الإلكتروني',
        ru: 'Подтвердите ваш адрес электронной почты',
        tr: 'E-postanızı doğrulayın',
      }),
      description: t({
        en: 'We sent you an email to verify your email address. Please check your inbox and click on the link to verify your email.',
        'en-GB':
          'We sent you an email to verify your email address. Please check your inbox and click on the link to verify your email.',
        fr: 'Nous vous avons envoyé un e-mail pour vérifier votre adresse e-mail. Veuillez vérifier votre boîte de réception et cliquez sur le lien pour vérifier votre adresse e-mail.',
        es: 'Te hemos enviado un correo electrónico para verificar tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu dirección de correo electrónico.',
        de: 'Wir haben Ihnen eine E-Mail gesendet, um Ihre E-Mail-Adresse zu überprüfen. Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihre E-Mail zu bestätigen.',
        ja: 'あなたのメールアドレスを確認するためにメールを送りました。受信トレイを確認し、メールを確認するためにリンクをクリックしてください。',
        ko: '이메일 주소를 확인하기 위해 이메일을 보냈습니다. 받은 편지함을 확인하고 이메일을 확인하기 위해 링크를 클릭하세요.',
        zh: '我们给您发送了一封电子邮件以验证您的电子邮件地址。请检查您的收件箱并点击链接以验证您的电子邮件。',
        it: "Ti abbiamo inviato un'email per verificare il tuo indirizzo email. Controlla la tua casella di posta e fai clic sul link per verificare la tua email.",
        pt: 'Enviamos um e-mail para verificar seu endereço de e-mail. Verifique sua caixa de entrada e clique no link para verificar seu e-mail.',
        hi: 'हमने आपको आपके ईमेल पते की पुष्टि करने के लिए एक ईमेल भेजा है। कृपया अपने इनबॉक्स की जांच करें और अपने ईमेल की पुष्टि करने के लिए लिंक पर क्लिक करें।',
        ar: 'لقد أرسلنا إليك بريدًا إلكترونيًا للتحقق من عنوان بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك والنقر على الرابط للتحقق من بريدك الإلكتروني.',
        ru: 'Мы отправили вам письмо для подтверждения вашего адреса электронной почты. Пожалуйста, проверьте свой почтовый ящик и нажмите на ссылку, чтобы подтвердить электронную почту.',
        tr: 'E-posta adresinizi doğrulamak için size bir e-posta gönderdik. Lütfen gelen kutunuzu kontrol edin ve e-postanızı doğrulamak için bağlantıya tıklayın.',
      }),
    },
  },
} satisfies Dictionary;

export default verifyEmailStepContent;
