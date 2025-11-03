import { type Dictionary, t } from 'intlayer';

const localizationAnalyzerContent = {
  key: 'localization-analyzer',
  content: {
    title: t({
      en: 'Localization Score Analyzer',
      fr: 'Analyseur de score de localisation',
      es: 'Analizador de puntuación de localización',
      de: 'Lokalisierungs-Score-Analysator',
      ja: 'ローカリゼーションスコアアナライザー',
      zh: '本地化评分分析器',
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
