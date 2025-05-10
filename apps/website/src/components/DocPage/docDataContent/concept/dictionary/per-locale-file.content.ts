import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const docContent = {
  key: 'doc-dictionary-per-locale-file-metadata',
  content: {
    title: t({
      en: "Dictionary's per-locale file",
      'en-GB': "Dictionary's per-locale file",
      fr: 'Fichier de dictionnaire par locale',
      es: 'Archivo de diccionario por locale',
      de: 'Wörterbuchdatei nach Locale',
      ja: 'ロケールごとの辞書ファイル',
      ko: '로케일별 사전 파일',
      zh: '按区域划分的字典文件',
      it: 'File del dizionario per locale',
      pt: 'Arquivo de dicionário por local',
      hi: 'लोकल शब्दकोश फाइल',
      ar: 'ملف قاموس باللغة المحلية',
      ru: 'Файл словаря по локали',
    }),

    description: t({
      en: 'Learn how to use per-locale files in Intlayer to structure your multilingual content efficiently. Follow this documentation to implement per-locale files seamlessly in your project.',
      'en-GB':
        'Learn how to use per-locale files in Intlayer to structure your multilingual content efficiently. Follow this documentation to implement per-locale files seamlessly in your project.',
      fr: 'Découvrez comment utiliser les fichiers de dictionnaire par locale dans Intlayer pour structurer votre contenu multilingue de manière efficace. Suivez cette documentation pour implémenter les fichiers de dictionnaire par locale sans problème dans votre projet.',
      es: 'Descubre cómo usar los archivos de diccionario por locale en Intlayer para estructurar tu contenido multilingüe de manera eficiente. Sigue esta documentación para implementar los archivos de diccionario por locale sin problemas en tu proyecto.',
      de: 'Erfahren Sie, wie Sie per-Locale-Dateien in Intlayer verwenden, um Ihren mehrsprachigen Inhalt effizient zu strukturieren. Folgen Sie dieser Dokumentation, um per-Locale-Dateien nahtlos in Ihr Projekt zu integrieren.',
      ja: 'Intlayerでロケールごとの辞書ファイルを使用して、多言語コンテンツを効率的に構造化する方法を学びます。このドキュメントに従って、ロケールごとの辞書ファイルを簡単に実装しましょう。',
      ko: 'Intlayer에서 로케일별 사전 파일을 사용하여 다국어 콘텐츠를 효율적으로 구조화하는 방법을 배우세요. 이 문서를 따라 로케일별 사전 파일을 쉽게 구현하세요.',
      zh: '了解如何在Intlayer中使用按区域划分的字典文件，以高效地结构化您的多语言内容。按照本文档的步骤轻松实现按区域划分的字典文件。',
      it: 'Scopri come utilizzare i file del dizionario per locale in Intlayer per strutturare il tuo contenuto multilingue in modo efficiente. Segui questa documentazione per implementare i file del dizionario per locale senza problemi nel tuo progetto.',
      pt: 'Descubra como usar os arquivos do dicionário por local em Intlayer para estruturar seu conteúdo multilingue de forma eficiente. Siga esta documentação para implementar os arquivos do dicionário por local sem problemas no seu projeto.',
      hi: 'लोकल शब्दकोश फाइल का उपयोग करके Intlayer में अपने बहुभाषी सामग्री को कुशलतापूर्वक संरचित करने के तरीके सीखें। इस दस्तावेज़ का पालन करें और लोकल शब्दकोश फाइलें आसानी से अपने प्रोजेक्ट में लागू करें।',
      ar: 'استخدم ملفات القاموس باللغة المحلية في Intlayer لتنظيم محتوىك المتعدد اللغات بكفاءة. اتبع هذه الوثيقة لتنفيذ ملفات القاموس باللغة المحلية بسلاسة في مشروعك.',
      ru: 'Узнайте, как использовать файлы словаря по локали в Intlayer для структурирования вашего многоязычного контента эффективно. Следуйте этой документации, чтобы без проблем реализовать файлы словаря по локали в своем проекте.',
    }),

    keywords: [
      t({
        en: 'Per-locale',
        'en-GB': 'Per-locale',
        fr: 'Par locale',
        es: 'Por locale',
        de: 'Nach Locale',
        ja: 'ロケールごと',
        ko: '로케일별',
        zh: '按区域划分',
        it: 'Per locale',
        pt: 'Por local',
        hi: 'लोकल',
        ar: 'باللغة المحلية',
        ru: 'По локали',
      }),
      t({
        en: 'Documentation',
        'en-GB': 'Documentation',
        fr: 'Documentation',
        es: 'Documentación',
        de: 'Dokumentation',
        ja: '文書',
        ko: '문서',
        zh: '文档',
        it: 'Documentazione',
        pt: 'Documentação',
        hi: 'प्रलेखन',
        ar: 'وثائق',
        ru: 'Документация',
      }),
      'Intlayer',
      'JavaScript',
      'React',
    ],
  },
} satisfies Dictionary<Metadata>;

export default docContent;
