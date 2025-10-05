import { type Dictionary, t } from 'intlayer';

const profileDashboardContent = {
  key: 'playground-page',
  content: {
    title: t({
      en: 'Intlayer Editor - Playground',
      'en-GB': 'Intlayer Editor - Playground',
      fr: 'Intlayer Éditeur - Playground',
      es: 'Intlayer Editor - Playground',
      de: 'Intlayer-Editor - Playground',
      ja: 'Intlayer エディタ - プレイグラウンド',
      ko: 'Intlayer 편집기 - 플레이그라운드',
      zh: 'Intlayer 编辑器 - 撸猫',
      it: 'Editor Intlayer - Playground',
      pt: 'Editor Intlayer - Playground',
      hi: 'इन्टलैयार एडिटर - प्लेगन',
      ar: 'محرر الفيديو - Playground',
      ru: 'Редактор Intlayer - Playground',
      tr: 'Intlayer Editör - Playground',
    }),
    description: t({
      en: 'Through this playground, you can test the Intlayer visual editor by interacting with the website.',
      'en-GB':
        'Through this playground, you can test the Intlayer visual editor by interacting with the website.',
      fr: 'À travers ce playground, vous pouvez tester l’éditeur visuel Intlayer en interagissant avec le site Web.',
      es: 'A través de este playground, puedes probar el editor visual de Intlayer interactuando con el sitio web.',
      de: 'Durch diesen Playground können Sie den Intlayer-Visuellen Editor testen, indem Sie mit der Website interagieren.',
      ja: 'このプレイグラウンドを通じて、ウェブサイトと対話しながら Intlayer ビジュアルエディターをテストできます。',
      ko: '이 플레이그라운드를 통해 웹사이트와 상호 작용하며 Intlayer 시각 편집기를 테스트할 수 있습니다.',
      zh: '通过此游乐场，您可以通过与网站互动来测试 Intlayer 视觉编辑器。',
      it: 'Tramite questo playground, puoi testare l’editor visuale di Intlayer interagendo con il sito web.',
      pt: 'Através deste playground, você pode testar o editor visual do Intlayer interagindo com o site.',
      hi: 'इस प्लेग्राउंड के माध्यम से, आप वेबसाइट के साथ बातचीत करके Intlayer विज़ुअल एडिटर का परीक्षण कर सकते हैं।',
      ar: 'من خلال هذا الملعب، يمكنك اختبار محرر Intlayer المرئي عن طريق التفاعل مع الموقع الإلكتروني.',
      ru: 'Через эту площадку вы можете протестировать визуальный редактор Intlayer, взаимодействуя с веб-сайтом.',
      tr: 'Bu Playground aracılığıyla, web sitesiyle etkileşimde bulunarak Intlayer görsel düzenleyicisini test edebilirsiniz.',
    }),
  },
} satisfies Dictionary;

export default profileDashboardContent;
