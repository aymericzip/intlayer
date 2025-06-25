import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-interest-of-intlayer-metadata',
  content: {
    docName: 'interest_of_intlayer',
    url: PagesRoutes.Doc_Interest,
    githubUrl: GithubRoutes.InterestOfIntlayer,
    createdAt: '2024-08-14',
    updatedAt: '2024-08-14',
    title: t({
      en: 'Interest of Intlayer',
      'en-GB': 'Interest of Intlayer',
      fr: "Intérêt d'Intlayer",
      es: 'Interés de Intlayer',
      de: 'Interesse von Intlayer',
      ja: 'Intlayerの利点',
      ko: 'Intlayer의 이점',
      zh: 'Intlayer的优势',
      it: 'Interesse di Intlayer',
      pt: 'Interesse do Intlayer',
      hi: 'Intlayer की रुचि',
      ar: 'اهتمام لبرنامج Intlayer',
      ru: 'Интерес к Intlayer',
    }),

    description: t({
      en: 'Discover the benefits and advantages of using Intlayer in your projects. Understand why Intlayer stands out among other frameworks.',
      'en-GB':
        'Discover the benefits and advantages of using Intlayer in your projects. Understand why Intlayer stands out among other frameworks.',
      fr: "Découvrez les avantages et bénéfices d'utiliser Intlayer dans vos projets. Comprenez pourquoi Intlayer se démarque parmi les autres frameworks.",
      es: 'Descubra los beneficios y ventajas de usar Intlayer en sus proyectos. Comprenda por qué Intlayer se destaca entre otros frameworks.',
      de: 'Entdecken Sie die Vorteile und Merkmale von Intlayer in Ihren Projekten. Verstehen Sie, warum Intlayer sich von anderen Frameworks abhebt.',
      ja: 'プロジェクトでIntlayerを使用する利点と特典を発見してください。なぜIntlayerは他のフレームワークの中で際立っているのかを理解しましょう。',
      ko: '프로젝트에서 Intlayer를 사용할 때의 이점과 장점을 알아보세요. Intlayer가 다른 프레임워크 중에서 두드러지는 이유를 이해하세요.',
      zh: '发现使用Intlayer进行项目的好处和优点。了解为什么Intlayer在其他框架中脱颖而出。',
      it: "Scopri i vantaggi e i benefici dell'utilizzo di Intlayer nei tuoi progetti. Comprendi perché Intlayer si distingue tra altri framework.",
      pt: 'Descubra os benefícios e vantagens de usar o Intlayer em seus projetos. Entenda por que o Intlayer se destaca entre outros frameworks.',
      hi: 'अपने परियोजनाओं में Intlayer का उपयोग करने के लाभ और फायदे जानें। यह समझें कि Intlayer अन्य फ्रेमवर्क के बीच क्यों खड़ा है।',
      ar: 'اكتشف مزايا وفوائد استخدام Intlayer في مشاريعك. افهم لماذا يتفوق Intlayer بين الأطر الأخرى.',
      ru: 'Узнайте о преимуществах и достоинствах использования Intlayer в ваших проектах. Поймите, почему Intlayer выделяется среди других фреймворков.',
    }),
    keywords: t({
      en: ['Benefits', 'Advantages', 'Intlayer', 'Framework', 'Comparison'],
      'en-GB': [
        'Benefits',
        'Advantages',
        'Intlayer',
        'Framework',
        'Comparison',
      ],
      fr: ['Avantages', 'Intérêt', 'Intlayer', 'Framework', 'Comparaison'],
      es: ['Beneficios', 'Ventajas', 'Intlayer', 'Framework', 'Comparación'],
      de: ['Vorteile', 'Nachteile', 'Intlayer', 'Framework', 'Vergleich'],
      ja: ['利点', '利点', 'Intlayer', 'フレームワーク', '比較'],
      ko: ['장점', '이점', 'Intlayer', '프레임워크', '비교'],
      zh: ['好处', '优势', 'Intlayer', '框架', '比较'],
      it: ['Vantaggi', 'Benefici', 'Intlayer', 'Framework', 'Confronto'],
      pt: ['Benefícios', 'Vantagens', 'Intlayer', 'Framework', 'Comparação'],
      hi: ['लाभ', 'फायदे', 'Intlayer', 'फ्रेमवर्क', 'निष्कर्ष'],
      ar: ['فوائد', 'إيجابيات', 'Intlayer', 'إطار العمل', 'مقارنة'],
      ru: ['Преимущества', 'Плюсы', 'Intlayer', 'Фреймворк', 'Сравнение'],
    }),
  },
} satisfies Dictionary<DocData>;

export default docContent;
