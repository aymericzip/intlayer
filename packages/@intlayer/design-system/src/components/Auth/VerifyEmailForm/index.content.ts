import { type DeclarationContent, t } from 'intlayer';

const verifyEmailFormContent = {
  key: 'verify-email-form',
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
      }),
    },
    doneButton: {
      text: t({
        en: 'Done',
        'en-GB': 'Done',
        fr: 'Terminé',
        es: 'Hecho',
        de: 'Fertig',
        ja: '完了',
        ko: '완료',
        zh: '完成',
        it: 'Fatto',
        pt: 'Feito',
        hi: 'किया',
        ar: 'تم',
        ru: 'Готово',
      }),
      ariaLabel: t({
        en: 'Click to return to the previous page',
        'en-GB': 'Click to return to the previous page',
        fr: 'Cliquez pour revenir à la page précédente',
        es: 'Haga clic para volver a la página anterior',
        de: 'Klicken Sie, um zur vorherigen Seite zurückzukehren',
        ja: '前のページに戻るにはクリックしてください',
        ko: '이전 페이지로 돌아가려면 클릭하세요',
        zh: '点击返回到上一页',
        it: 'Clicca per tornare alla pagina precedente',
        pt: 'Clique para voltar à página anterior',
        hi: 'पिछला पृष्ठ पर वापस जाने के लिए क्लिक करें',
        ar: 'انقر للرجوع إلى الصفحة السابقة',
        ru: 'Нажмите, чтобы вернуться на предыдущую страницу',
      }),
    },
  },
} satisfies DeclarationContent;

export default verifyEmailFormContent;
