import { t, type Dictionary } from 'intlayer';

const profileFormContent = {
  key: 'profile-form',
  content: {
    title: t({
      en: 'Profile details',
      'en-GB': 'Profile details',
      fr: 'Détails du profil',
      es: 'Detalles del perfil',
      de: 'Profil-details',
      ja: 'プロフィール詳細',
      ko: '프로필 세부정보',
      zh: '个人资料详细信息',
      it: 'Dettagli del profilo',
      pt: 'Detalhes do perfil',
      hi: 'प्रोफ़ाइल विवरण',
      ar: 'تفاصيل الملف الشخصي',
      ru: 'Детали профиля',
    }),
    nameInput: {
      label: t({
        en: 'Name',
        'en-GB': 'Name',
        fr: 'Nom',
        es: 'Nombre',
        de: 'Name',
        ja: '名前',
        ko: '이름',
        zh: '名字',
        it: 'Nome',
        pt: 'Nome',
        hi: 'नाम',
        ar: 'الاسم',
        ru: 'Имя',
      }),
      placeholder: t({
        en: 'Enter your name',
        'en-GB': 'Enter your name',
        fr: 'Entrez votre nom',
        es: 'Ingrese su nombre',
        de: 'Geben Sie Ihren Namen ein',
        ja: 'あなたの名前を入力してください',
        ko: '이름을 입력하세요',
        zh: '输入您的名字',
        it: 'Inserisci il tuo nome',
        pt: 'Insira seu nome',
        hi: 'अपना नाम दर्ज करें',
        ar: 'أدخل اسمك',
        ru: 'Введите ваше имя',
      }),
    },

    emailInput: {
      label: t({
        en: 'Email',
        'en-GB': 'Email',
        fr: 'E-mail',
        es: 'Correo electrónico',
        de: 'E-Mail',
        ja: 'メール',
        ko: '이메일',
        zh: '电子邮件',
        it: 'Email',
        pt: 'Email',
        hi: 'ईमेल',
        ar: 'البريد الإلكتروني',
        ru: 'Электронная почта',
      }),
      placeholder: t({
        en: 'Enter your email address',
        'en-GB': 'Enter your email address',
        fr: 'Entrez votre adresse e-mail',
        es: 'Ingrese su dirección de correo electrónico',
        de: 'Geben Sie Ihre E-Mail-Adresse ein',
        ja: 'あなたのメールアドレスを入力してください',
        ko: '이메일 주소를 입력하세요',
        zh: '输入您的电子邮件地址',
        it: 'Inserisci il tuo indirizzo email',
        pt: 'Insira seu endereço de e-mail',
        hi: 'अपना ईमेल पता दर्ज करें',
        ar: 'أدخل عنوان بريدك الإلكتروني',
        ru: 'Введите свой адрес электронной почты',
      }),
    },

    editButton: {
      text: t({
        en: 'Edit profile',
        'en-GB': 'Edit profile',
        fr: 'Modifier le profil',
        es: 'Editar el perfil',
        de: 'Profil bearbeiten',
        ja: 'プロフィールを編集',
        ko: '프로필 편집',
        zh: '编辑个人资料',
        it: 'Modifica il profilo',
        pt: 'Editar perfil',
        hi: 'प्रोफ़ाइल संपादित करें',
        ar: 'تحرير الملف الشخصي',
        ru: 'Редактировать профиль',
      }),
      ariaLabel: t({
        en: 'Click to edit',
        'en-GB': 'Click to edit',
        fr: 'Cliquez pour modifier',
        es: 'Haga clic para editar',
        de: 'Klicken Sie zum Bearbeiten',
        ja: '編集するにはクリック',
        ko: '수정하려면 클릭',
        zh: '点击编辑',
        it: 'Clicca per modificare',
        pt: 'Clique para editar',
        hi: 'संपादित करने के लिए क्लिक करें',
        ar: 'انقر للتعديل',
        ru: 'Нажмите для редактирования',
      }),
    },
  },
} satisfies Dictionary;

export default profileFormContent;
