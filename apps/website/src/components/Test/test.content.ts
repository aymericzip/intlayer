import { cond, enu, file, gender, insert, md, nest, t } from 'intlayer';

const content = {
  key: 'test',
  title: 'Test component content',
  description:
    'Content declarations for the Test component, including examples of plurals, conditions, gender-specific messages, dynamic insertions, markdown, file-based content and nested dictionaries used for demonstration and testing purposes.',
  content: {
    welcomeMessage: t({
      en: 'Welcome to our application',
      'en-GB': 'Welcome to our application',
      fr: 'Bienvenue dans notre application',
      es: 'Bienvenido a nuestra aplicación',
      ar: 'مرحبا بك في تطبيقنا',
      de: 'Willkommen in unserer Anwendung',
      hi: 'हमारे अनुप्रयोग में आपका स्वागत है',
      it: 'Benvenuto nella nostra applicazione',
      ja: '私たちのアプリケーションへようこそ',
      ko: '우리 애플리케이션에 오신 것을 환영합니다',
      pt: 'Bem-vindo à nossa aplicação',
      ru: 'Добро пожаловать в наше приложение',
      zh: '欢迎来到我们的应用程序',
      tr: 'Uygulamamıza hoş geldiniz',
      pl: 'Witamy w naszej aplikacji',
      id: 'Selamat datang di aplikasi kami',
      vi: 'Chào mừng bạn đến với ứng dụng của chúng tôi',
      uk: 'Ласкаво просимо в наш додаток',
    }),
    numberOfCar: enu({
      '<-1': 'Less than minus one car',
      '-1': 'Minus one car',
      '0': 'No cars',
      '1': 'One car',
      '>5': 'Some cars',
      '>19': 'Many cars',
      fallback: 'Fallback value', // Optional
    }),
    myCondition: cond({
      true: "my content when it's true",
      false: "my content when it's false",
      fallback: 'my content when the condition fails', // Optional
    }),
    myGender: gender({
      male: 'my content for male users',
      female: 'my content for female users',
      fallback: 'my content when gender is not specified', // Optional
    }),
    myInsertion: insert(
      'Hello, my name is {{name}} and I am {{age}} years old!'
    ),
    myMultilingualInsertion: insert(
      t({
        ar: 'مرحبا, اسمي {{name}} وأنا {{age}} سنة!',
        de: 'Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!',
        en: 'Hello, my name is {{name}} and I am {{age}} years old!',
        'en-GB': 'Hello, my name is {{name}} and I am {{age}} years old!',
        es: '¡Hola, mi nombre es {{name}} y tengo {{age}} años!',
        fr: "Bonjour, mon nom est {{name}} et j'ai {{age}} ans!",
        hi: 'नमस्ते, मेरा नाम {{name}} है और मैं {{age}} वर्ष का हूँ!',
        id: 'Halo, nama saya {{name}} dan saya berumur {{age}} tahun!',
        it: 'Ciao, mi chiamo {{name}} e ho {{age}} anni!',
        ja: 'こんにちは、私の名前は {{name}} で、私は {{age}} 歳です！',
        ko: '안녕하세요, 저는 {{name}} 이고, {{age}} 살입니다!',
        pl: 'Cześć, nazywam się {{name}} i mam {{age}} lat!',
        pt: 'Olá, meu nome é {{name}} e eu tenho {{age}} anos!',
        ru: 'Привет, моё имя {{name}} и мне {{age}} лет!',
        tr: 'Merhaba, benim adım {{name}} ve ben {{age}} yaşındayım!',
        uk: 'Привіт, мене звати {{name}} і мені {{age}} років!',
        vi: 'Xin chào, tôi là {{name}} và tôi {{age}} tuổi!',
        zh: '你好，我的名字是 {{name}} ，我 {{age}} 岁了！',
      })
    ),
    myFile: file('./test.md'),
    subContent: {
      contentNumber: 0,
      contentString: 'string',
    },
    fullNestedContent: nest('code'),
    // References a specific nested value:
    partialNestedContent: nest('code', 'title') as any,
    myMarkdownContent: md('## My title \n\nLorem Ipsum'),
    myMarkdownFileContent: md(file('./test.md')),
    contentMultilingual: t({
      en: md('## test en'),
      fr: md('## test fr'),
      es: md('## test es'),
      'en-GB': md('## test en-GB'),
      pl: md('## test pl'),
      'pl-PL': md('## test pl-PL'),
      pt: md('## test pt'),
      ru: md('## test ru'),
      tr: md('## test tr'),
      zh: md('## test zh'),
      id: md('## test id'),
      hi: md('## test hi'),
      it: md('## test it'),
      ja: md('## test ja'),
      ko: md('## test ko'),
      de: md('## test de'),
      ar: md('## test ar'),
      text: 'This is the content rendered by a function',
      vi: md('## kiểm tra'),
      uk: md('## тест'),
    }),
    arrayContent: ['string', 'string2', 'string3', 'string4', 'string5'],
    arrayNestedContent: [
      {
        name: 'item1',
        description: 'description1',
      },
      {
        name: 'item2',
        description: 'description2',
      },
    ],
    objectOfArray: {
      array: ['item1', 'item2', 'item3'],
      object: {
        name: 'object name',
        description: 'object description',
      },
    },
  },
  tags: ['test', 'component content', 'developer example'],
};

export default content;
