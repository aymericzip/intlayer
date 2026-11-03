import {
  cond,
  type Dictionary,
  enu,
  file,
  gender,
  html,
  insert,
  md,
  nest,
  plural,
  select,
  t,
} from 'intlayer';

const content = {
  key: 'test',
  title: 'Test component content',
  description:
    'Content declarations for the Test component, including examples of plurals, conditions, gender-specific messages, string-based selections, dynamic insertions, markdown, html, file-based content and nested dictionaries used for demonstration and testing purposes.',
  content: {
    arrayContent: ['string', 'string2', 'string3', 'string4', 'string5'],
    arrayNestedContent: [
      {
        description: 'description1',
        name: 'item1',
      },
      {
        description: 'description2',
        name: 'item2',
      },
    ],
    baseContent: 'Intlayer',
    contentMultilingual: t({
      en: md('## test en'),
      ar: md('## test ar'),
      de: md('## test de'),
      'en-GB': md('## test en-GB'),
      es: md('## test es'),
      fr: md('## test fr'),
      'he-IL': md('## test he'),
      hi: md('## test hi'),
      id: md('## test id'),
      it: md('## test it'),
      ja: md('## test ja'),
      ko: md('## test ko'),
      pl: md('## test pl'),
      'ps-PL': md('## test ps-PL'),
      pt: md('## test pt'),
      ru: md('## test ru'),
      text: 'This is the content rendered by a function',
      tr: md('## test tr'),
      uk: md('## тест'),
      vi: md('## kiểm tra'),
      zh: md('## test zh'),
    }),
    fullNestedContent: nest('code'),
    myCondition: cond({
      true: "my content when it's true",
      false: "my content when it's false",
      fallback: 'my content when the condition fails', // Optional
    }),
    myFile: file('./test.md'),
    myGender: gender({
      male: 'my content for male users',
      female: 'my content for female users',
      fallback: 'my content when gender is not specified', // Optional
    }),
    myHtmlContent: html(
      '<h3>HTML content title</h3><p>This is <strong>HTML</strong> content example.</p>'
    ),
    myInsertion: insert(
      'Hello, my name is {{name}} and I am {{age}} years old!'
    ),
    myMarkdownContent: md('## My title \n\nLorem Ipsum'),
    myMarkdownFileContent: md(file('./test.md')),
    myMultilingualHtml: t({
      en: html('<p><strong>English</strong> HTML content</p>'),
      es: html('<p>Contenido HTML en <strong>español</strong></p>'),
      fr: html('<p>Contenu HTML en <strong>français</strong></p>'),
    }),
    myMultilingualInsertion: insert(
      t({
        en: 'Hello, my name is {{name}} and I am {{age}} years old!',
        ar: 'مرحبا, اسمي {{name}} وأنا {{age}} سنة!',
        de: 'Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!',
        'en-GB': 'Hello, my name is {{name}} and I am {{age}} years old!',
        es: '¡Hola, mi nombre es {{name}} y tengo {{age}} años!',
        fr: "Bonjour, mon nom est {{name}} et j'ai {{age}} ans!",
        'he-IL': 'שלום, קוראים לי {{name}} ואני בן/בת {{age}}!',
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
    myMultilingualPlural: t({
      en: plural({
        zero: 'No books',
        one: '{{count}} book',
        other: '{{count}} books',
      }),
      es: plural({
        zero: 'Ningún libro',
        one: '{{count}} libro',
        other: '{{count}} libros',
      }),
      fr: plural({
        zero: 'Aucun livre',
        one: '{{count}} livre',
        other: '{{count}} livres',
      }),
    }),
    myMultilingualSelect: select({
      approved: t({
        en: 'Approved',
        es: 'Aprobado',
        fr: 'Approuvé',
      }),
      pending: t({
        en: 'Pending approval',
        es: 'Pendiente de aprobación',
        fr: 'En attente d’approbation',
      }),
      rejected: t({
        en: 'Rejected',
        es: 'Rechazado',
        fr: 'Rejeté',
      }),
      fallback: t({
        en: 'Unknown status',
        es: 'Estado desconocido',
        fr: 'Statut inconnu',
      }),
    }),
    myPlural: plural({
      zero: 'No items',
      one: '{{count}} item',
      other: '{{count}} items',
    }),
    mySelect: select({
      archived: 'my content when the status is archived',
      draft: 'my content when the status is draft',
      published: 'my content when the status is published',
      fallback: 'my content for any other status', // Optional
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
    objectOfArray: {
      array: ['item1', 'item2', 'item3'],
      object: {
        description: 'object description',
        name: 'object name',
      },
    },
    // References a specific nested value:
    partialNestedContent: nest('code', 'title') as any,
    subContent: {
      contentBoolean: true,
      contentNumber: 0,
      contentString: 'string',
    },
    welcomeMessage: t({
      en: 'Welcome to our application',
      ar: 'مرحبا بك في تطبيقنا',
      de: 'Willkommen in unserer Anwendung',
      'en-GB': 'Welcome to our application',
      es: 'Bienvenido a nuestra aplicación',
      fr: 'Bienvenue dans notre application',
      'he-IL': 'ברוכים הבאים לאפליקציה שלנו',
      hi: 'हमारे अनुप्रयोग में आपका स्वागत है',
      id: 'Selamat datang di aplikasi kami',
      it: 'Benvenuto nella nostra applicazione',
      ja: '私たちのアプリケーションへようこそ',
      ko: '우리 애플리케이션에 오신 것을 환영합니다',
      pl: 'Witamy w naszej aplikacji',
      pt: 'Bem-vindo à nossa aplicação',
      ru: 'Добро пожаловать в наше приложение',
      tr: 'Uygulamamıza hoş geldiniz',
      uk: 'Ласкаво просимо в наш додаток',
      vi: 'Chào mừng bạn đến với ứng dụng của chúng tôi',
      zh: '欢迎来到我们的应用程序',
    }),
  },
  tags: ['test', 'component content', 'developer example', 'select', 'plural'],
} satisfies Dictionary;

export default content;
