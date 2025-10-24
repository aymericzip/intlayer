import { type Dictionary, t } from 'intlayer';

const useFormSectionSchemaContent = {
  key: 'chat-form-section-schema',
  content: {
    questionRequiredError: t({
      ar: 'يرجى إدخال سؤال.',
      de: 'Bitte geben Sie eine Frage ein.',
      en: 'Please enter a question.',
      'en-GB': 'Please enter a question.',
      es: 'Por favor, ingrese una pregunta.',
      fr: 'Veuillez saisir une question.',
      hi: 'कृपया एक प्रश्न दर्ज करें।',
      it: 'Si prega di inserire una domanda.',
      ja: '質問を入力してください。',
      ko: '질문을 입력하세요.',
      pt: 'Por favor, insira uma pergunta.',
      ru: 'Пожалуйста, введите вопрос.',
      tr: 'Lütfen bir soru girin',
      zh: '请输入一个问题。',
      pl: 'Proszę wprowadzić pytanie.',
    }),

    questionInvalidTypeError: t({
      ar: 'يجب أن يكون اسم السؤال سلسلة صحيحة.',
      de: 'Der Name der Frage muss eine gültige Zeichenfolge sein.',
      en: 'The question name must be a valid string.',
      'en-GB': 'The question name must be a valid string.',
      es: 'El nombre de su pregunta debe ser una cadena válida.',
      fr: 'Le nom de votre question doit être une chaîne valide.',
      hi: 'प्रश्न नाम एक वैध स्ट्रिंग होना चाहिए।',
      it: 'Il nome della domanda deve essere una stringa valida.',
      ja: '質問名は有効な文字列である必要があります。',
      ko: '질문 이름은 유효한 문자열이어야 합니다.',
      pt: 'O nome da pergunta deve ser uma string válida.',
      ru: 'Имя вопроса должно быть правильной строкой.',
      tr: 'Soru adı geçerli bir dize olmalıdır',
      zh: '问题名称必须是有效的字符串。',
      pl: 'Nazwa pytania musi być poprawnym ciągiem znaków.',
    }),
  },
  title: 'Undefined content declaration',
  description:
    'This content declaration lacks defined metadata. It needs to be reviewed and completed with proper multilingual content for consistency across components or pages.',
  tags: ['undefined'],
} satisfies Dictionary;

export default useFormSectionSchemaContent;
