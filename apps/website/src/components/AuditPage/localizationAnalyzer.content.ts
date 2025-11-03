import { type Dictionary, t } from 'intlayer';

const localizationAnalyzerContent = {
  key: 'localization-analyzer',
  content: {
    title: t({
      en: 'Analyze Your Website’s Global Localization Score',
      fr: 'Analysez le score de localisation de votre site web',
      es: 'Analice el puntaje de localización global de su sitio web',
      de: 'Analysieren Sie den globalen Lokalisierungs-Score Ihrer Website',
      ja: 'ウェブサイトのグローバルなローカリゼーションスコアを分析します',
      zh: '分析您网站的全球本地化评分',
    }),
    description: t({
      en: 'Quickly evaluate the localization quality of your website. Analyze principal multilingual elements of your website to get a comprehensive score and actionable insights for improving your reach.',
      fr: "Évaluez rapidement la qualité de la localisation de votre site Web. Analysez les principaux éléments multilingues de votre site Web pour obtenir un score complet et des informations exploitables afin d'améliorer votre portée.",
      es: 'Evalúe rápidamente la calidad de la localización de su sitio web. Analice los principales elementos multilingües de su sitio web para obtener una puntuación integral y conocimientos prácticos para mejorar su alcance.',
      de: 'Bewerten Sie schnell die Lokalisierungsqualität Ihrer Website. Analysieren Sie die wichtigsten mehrsprachigen Elemente Ihrer Website, um eine umfassende Bewertung und umsetzbare Erkenntnisse zur Verbesserung Ihrer Reichweite zu erhalten.',
      ja: 'ウェブサイトのローカリゼーション品質を迅速に評価します。ウェブサイトの主要な多言語要素を分析して、包括的なスコアとリーチを改善するための実用的な洞察を得ます。',
      zh: '快速评估您网站的本地化质量。分析您网站的主要多语言元素，以获得全面的评分和可行的见解，从而提高您的覆盖范围。',
    }),
    steps: t({
      en: [
        'Fetching and parsing HTML...',
        'Analyzing linguistic structure...',
        'Checking hreflang and metadata...',
        'Detecting language selector...',
        'Analyzing SEO multilanguage...',
        'Calculating localization score...',
      ],
      fr: [
        'Récupération et analyse du HTML...',
        'Analyse de la structure linguistique...',
        'Vérification des hreflang et des métadonnées...',
        'Détection du sélecteur de langue...',
        'Analyse du SEO multilingue...',
        'Calcul du score de localisation...',
      ],
      es: [
        'Recuperando y analizando HTML...',
        'Analizando estructura lingüística...',
        'Verificando hreflang y metadatos...',
        'Detectando selector de idioma...',
        'Analizando SEO multilingüe...',
        'Calculando puntuación de localización...',
      ],
      de: [
        'HTML abrufen und parsen...',
        'Analyse der sprachlichen Struktur...',
        'Überprüfung von Hreflang und Metadaten...',
        'Erkennen des Sprachselectors...',
        'Analyse des mehrsprachigen SEO...',
        'Berechnung des Lokalisierungs-Scores...',
      ],
      ja: [
        'HTMLを取得して解析中...',
        '言語構造を分析中...',
        'hreflangとメタデータをチェック中...',
        '言語セレクターを検出中...',
        '多言語SEOを分析中...',
        'ローカリゼーションスコアを計算中...',
      ],
      zh: [
        '获取并解析HTML...',
        '分析语言结构...',
        '检查hreflang和元数据...',
        '检测语言选择器...',
        '分析多语言SEO...',
        '计算本地化评分...',
      ],
    }),
    error: t({
      en: 'Unable to analyze site.',
      fr: 'Impossible d’analyser le site.',
      es: 'No se puede analizar el sitio.',
      de: 'Website konnte nicht analysiert werden.',
      ja: 'サイトを解析できません。',
      zh: '无法分析网站。',
    }),
  },
  title: 'Localization Analyzer texts',
  description:
    'Localized labels, steps and error messages for the LocalizationAnalyzer component.',
  tags: ['localization', 'analyzer', 'score', 'i18n'],
} satisfies Dictionary;

export default localizationAnalyzerContent;
