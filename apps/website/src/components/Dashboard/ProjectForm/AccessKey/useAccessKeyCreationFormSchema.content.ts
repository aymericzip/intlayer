import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'access-key-creation-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your access key',
      'en-GB': 'Please enter a name for your access key',
      fr: "Veuillez saisir un nom pour votre clé d'accès",
      es: 'Por favor, ingrese un nombre para su clave de acceso',
      de: 'Bitte geben Sie einen Namen für Ihren Zugriffsschlüssel ein',
      ja: 'アクセスキーの名前を入力してください',
      ko: '액세스 키의 이름을 입력하십시오',
      zh: '请输入访问密钥的名称',
      it: 'Si prega di inserire un nome per la propria chiave di accesso',
      pt: 'Por favor, insira um nome para a sua chave de acesso',
      hi: 'कृपया अपनी पहुँच कुंजी के लिए एक नाम दर्ज करें',
      ar: 'الرجاء إدخال اسم لمفتاح الوصول الخاص بك',
      ru: 'Пожалуйста, введите имя для вашего ключа доступа',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your access key',
      'en-GB': 'Please enter a valid name for your access key',
      fr: "Veuillez saisir un nom valide pour votre clé d'accès",
      es: 'Por favor, ingrese un nombre válido para su clave de acceso',
      de: 'Bitte geben Sie einen gültigen Namen für Ihren Zugriffsschlüssel ein',
      ja: 'アクセスキーの有効な名前を入力してください',
      ko: '유효한 액세스 키 이름을 입력하십시오',
      zh: '请输入访问密钥的有效名称',
      it: 'Si prega di inserire un nome valido per la propria chiave di accesso',
      pt: 'Por favor, insira um nome válido para a sua chave de acesso',
      hi: 'कृपया अपनी पहुँच कुंजी के लिए एक वैध नाम दर्ज करें',
      ar: 'الرجاء إدخال اسم صالح لمفتاح الوصول الخاص بك',
      ru: 'Пожалуйста, введите допустимое имя для вашего ключа доступа',
    }),

    invalidDateErrorName: t({
      en: 'Please enter a valid date for your access key expiration date',
      'en-GB': 'Please enter a valid date for your access key expiration date',
      fr: "Veuillez saisir une date valide pour la date d'expiration de votre clé d'accès",
      es: 'Por favor, ingrese una fecha válida para la fecha de expiración de su clave de acceso',
      de: 'Bitte geben Sie ein gültiges Datum für das Ablaufdatum Ihres Zugriffsschlüssels ein',
      ja: 'アクセスキーの有効期限の日付を入力してください',
      ko: '액세스 키 만료 날짜의 유효한 날짜를 입력하십시오',
      zh: '请输入访问密钥的有效期日期',
      it: 'Si prega di inserire una data valida per la scadenza della chiave di accesso',
      pt: 'Por favor, insira uma data válida para a data de expiração da sua chave de acesso',
      hi: 'कृपया अपनी पहुँच कुंजी की समाप्ति तिथि के लिए एक वैध तिथि दर्ज करें',
      ar: 'الرجاء إدخال تاريخ صالح لتاريخ انتهاء صلاحية مفتاح الوصول الخاص بك',
      ru: 'Пожалуйста, введите допустимую дату для даты истечения срока действия вашего ключа доступа',
    }),
  },
} satisfies Dictionary;

export default content;
