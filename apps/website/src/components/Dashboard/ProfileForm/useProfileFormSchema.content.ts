import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'profile-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter your name',
      'en-GB': 'Please enter your name',
      fr: 'Veuillez saisir votre nom d’utilisateur',
      es: 'Por favor, ingrese su nombre de usuario',
      de: 'Bitte geben Sie Ihren Namen ein',
      ja: '名前を入力してください',
      ko: '이름을 입력해 주세요',
      zh: '请输入您的姓名',
      it: 'Si prega di inserire il proprio nome',
      pt: 'Por favor, insira seu nome',
      hi: 'कृपया अपना नाम दर्ज करें',
      ar: 'يرجى إدخال اسمك',
      ru: 'Пожалуйста, введите ваше имя',
      tr: 'Lütfen adınızı girin',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid username',
      'en-GB': 'Please enter a valid username',
      fr: 'Veuillez saisir un nom d’utilisateur valide',
      es: 'Por favor, ingrese un nombre de usuario válido',
      de: 'Bitte geben Sie einen gültigen Benutzernamen ein',
      ja: '有効なユーザー名を入力してください',
      ko: '유효한 사용자 이름을 입력해 주세요',
      zh: '请输入有效的用户名',
      it: 'Si prega di inserire un nome utente valido',
      pt: 'Por favor, insira um nome de usuário válido',
      hi: 'कृपया सही उपयोगकर्ता नाम दर्ज करें',
      ar: 'يرجى إدخال اسم مستخدم صالح',
      ru: 'Пожалуйста, введите действительное имя пользователя',
      tr: 'Lütfen geçerli bir kullanıcı adı girin',
    }),
  },
} satisfies Dictionary;

export default content;
