import { type Dictionary, t } from 'intlayer';

type ContributorsPageContent = {
  title: string;
  subtitle: string;
};

const contributorsPageContent = {
  key: 'contributors-page',
  content: {
    subtitle: t({
      en: 'Meet our amazing',
      ar: 'تعرف على رائعين لدينا',
      de: 'Lernen Sie unsere erstaunlichen kennen',
      'en-GB': 'Meet our amazing',
      es: 'Conoce a nuestros increíbles',
      fr: 'Découvrez nos incroyables',
      'he-IL': 'הכירו את המדהימים שלנו',
      hi: 'हमारे अद्भुत',
      id: 'Temui yang luar biasa',
      it: 'Incontra i nostri incredibili',
      ja: '素晴らしい',
      ko: '놀라운',
      pl: 'Poznaj naszych niesamowitych',
      pt: 'Conheça nossos incríveis',
      ru: 'Познакомьтесь с нашими удивительными',
      tr: 'Harika',
      uk: 'Познайомтеся з нашими дивовижними',
      vi: 'Gặp gỡ',
      zh: '认识我们优秀的',
    }),
    title: t({
      en: 'Contributors',
      ar: 'المساهمون',
      de: 'Mitwirkende',
      'en-GB': 'Contributors',
      es: 'Colaboradores',
      fr: 'Contributeurs',
      'he-IL': 'תורמים',
      hi: 'योगदानकर्ता',
      id: 'Kontributor',
      it: 'Collaboratori',
      ja: '貢献者',
      ko: '기여자',
      pl: 'Współpracowników',
      pt: 'Colaboradores',
      ru: 'Участниками',
      tr: 'Katkıda Bulunanlar',
      uk: "Контриб'ютори",
      vi: 'Người đóng góp',
      zh: '贡献者',
    }),
  },
  title: 'Contributors page',
  description:
    'Content for the contributors page, including title and subtitle to showcase contributors.',
  tags: ['contributors', 'page content'],
} satisfies Dictionary<ContributorsPageContent>;

export default contributorsPageContent;
