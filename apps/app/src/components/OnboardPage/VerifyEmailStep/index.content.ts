import { type Dictionary, t } from 'intlayer';

export const verifyEmailStepContent = {
  key: 'verify-email-step',
  content: {
    verifyEmail: {
      description: t({
        en: 'We sent you an email to verify your email address. Please check your inbox and click on the link to verify your email.',
        ar: 'لقد أرسلنا إليك بريدًا إلكترونيًا للتحقق من عنوان بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك والنقر على الرابط للتحقق من بريدك الإلكتروني.',
        de: 'Wir haben Ihnen eine E-Mail gesendet, um Ihre E-Mail-Adresse zu überprüfen. Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihre E-Mail zu bestätigen.',
        'en-GB':
          'We sent you an email to verify your email address. Please check your inbox and click on the link to verify your email.',
        es: 'Te hemos enviado un correo electrónico para verificar tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu dirección de correo electrónico.',
        fr: 'Nous vous avons envoyé un e-mail pour vérifier votre adresse e-mail. Veuillez vérifier votre boîte de réception et cliquez sur le lien pour vérifier votre adresse e-mail.',
        'he-IL':
          'שלחנו לכם אימייל לאימות כתובת האימייל שלכם. אנא בדקו את תיבת הדואר הנכנס ולחצו על הקישור כדי לאמת את האימייל.',
        hi: 'हमने आपको आपके ईमेल पते की पुष्टि करने के लिए एक ईमेल भेजा है। कृपया अपने इनबॉक्स की जांच करें और अपने ईमेल की पुष्टि करने के लिए लिंक पर क्लिक करें।',
        id: 'Kami telah mengirimkan email untuk memverifikasi alamat email Anda. Silakan periksa kotak masuk Anda dan klik tautan untuk memverifikasi email Anda.',
        it: "Ti abbiamo inviato un'email per verificare il tuo indirizzo email. Controlla la tua casella di posta e fai clic sul link per verificare la tua email.",
        ja: 'あなたのメールアドレスを確認するためにメールを送りました。受信トレイを確認し、メールを確認するためにリンクをクリックしてください。',
        ko: '이메일 주소를 확인하기 위해 이메일을 보냈습니다. 받은 편지함을 확인하고 이메일을 확인하기 위해 링크를 클릭하세요.',
        pl: 'Wysłaliśmy Ci wiadomość e-mail z linkiem weryfikacyjnym. Sprawdź swoją skrzynkę odbiorczą i kliknij w link, aby zweryfikować adres e-mail.',
        pt: 'Enviamos um e-mail para verificar seu endereço de e-mail. Verifique sua caixa de entrada e clique no link para verificar seu e-mail.',
        ru: 'Мы отправили вам письмо для подтверждения вашего адреса электронной почты. Пожалуйста, проверьте свой почтовый ящик и нажмите на ссылку, чтобы подтвердить электронную почту.',
        tr: 'E-posta adresinizi doğrulamak için size bir e-posta gönderdik. Lütfen gelen kutunuzu kontrol edin ve e-postanızı doğrulamak için bağlantıya tıklayın.',
        uk: 'Ми надіслали вам листа для підтвердження адреси електронної пошти. Будь ласка, перевірте папку Вхідні та перейдіть за посиланням у листі, щоб підтвердити адресу.',
        vi: 'Chúng tôi đã gửi cho bạn một email để xác minh địa chỉ email. Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết để xác minh email.',
        zh: '我们给您发送了一封电子邮件以验证您的电子邮件地址。请检查您的收件箱并点击链接以验证您的电子邮件。',
      }),
      title: t({
        en: 'Verify your email',
        ar: 'تحقق من بريدك الإلكتروني',
        de: 'Bestätigen Sie Ihre E-Mail',
        'en-GB': 'Verify your email',
        es: 'Verifique su correo electrónico',
        fr: 'Vérifiez votre adresse e-mail',
        'he-IL': 'אמתו את האימייל שלכם',
        hi: 'अपने ईमेल की पुष्टि करें',
        id: 'Verifikasi email Anda',
        it: 'Verifica la tua email',
        ja: 'メールを確認してください',
        ko: '이메일을 확인해주세요',
        pl: 'Zweryfikuj swój adres e-mail',
        pt: 'Verifique seu e-mail',
        ru: 'Подтвердите ваш адрес электронной почты',
        tr: 'E-postanızı doğrulayın',
        uk: 'Підтвердіть свою електронну адресу',
        vi: 'Xác minh email của bạn',
        zh: '请验证您的电子邮件',
      }),
    },
  },
  title: 'Verify email step',
  description:
    'Content for the verify email step during the onboarding process. Includes title and description to prompt users to check their inbox for a verification link.',
  tags: ['onboarding', 'email verification'],
} satisfies Dictionary;

export default verifyEmailStepContent;
