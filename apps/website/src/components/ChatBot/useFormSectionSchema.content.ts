import { t, type Dictionary } from 'intlayer';

const useFormSectionSchemaContent = {
  key: 'chat-form-section-schema',
  content: {
    questionRequiredError: t({
      en: 'Please enter a question.',
      'en-GB': 'Please enter a question.',
      fr: 'Veuillez saisir une question.',
      es: 'Por favor, ingrese una pregunta.',
      de: 'Bitte geben Sie eine Frage ein.',
      ja: '質問を入力してください。',
      ko: '질문을 입력하세요.',
      zh: '请输入一个问题。',
      it: 'Si prega di inserire una domanda.',
      pt: 'Por favor, insira uma pergunta.',
      hi: 'कृपया एक प्रश्न दर्ज करें।',
      ar: 'يرجى إدخال سؤال.',
      ru: 'Пожалуйста, введите вопрос.',
    }),

    questionInvalidTypeError: t({
      en: 'The question name must be a valid string.',
      'en-GB': 'The question name must be a valid string.',
      fr: 'Le nom de votre question doit être une chaîne valide.',
      es: 'El nombre de su pregunta debe ser una cadena válida.',
      de: 'Der Name der Frage muss eine gültige Zeichenfolge sein.',
      ja: '質問名は有効な文字列である必要があります。',
      ko: '질문 이름은 유효한 문자열이어야 합니다.',
      zh: '问题名称必须是有效的字符串。',
      it: 'Il nome della domanda deve essere una stringa valida.',
      pt: 'O nome da pergunta deve ser uma string válida.',
      hi: 'प्रश्न नाम एक वैध स्ट्रिंग होना चाहिए।',
      ar: 'يجب أن يكون اسم السؤال سلسلة صحيحة.',
      ru: 'Имя вопроса должно быть правильной строкой.',
    }),
  },
} satisfies Dictionary;

export default useFormSectionSchemaContent;
