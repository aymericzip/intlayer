import { type Dictionary, t } from 'intlayer';

type ContributorsPageContent = {
  title: string;
  subtitle: string;
};

const contributorsPageContent = {
  key: 'contributors-page',
  content: {
    title: t({
      en: 'Contributors',
      'en-GB': 'Contributors',
      fr: 'Contributeurs',
      es: 'Colaboradores',
      de: 'Mitwirkende',
      ar: 'المساهمون',
      ja: '貢献者',
      ko: '기여자',
      pt: 'Colaboradores',
      ru: 'Участниками',
      tr: 'Katkıda Bulunanlar',
      zh: '贡献者',
      pl: 'Współpracowników',
      hi: 'योगदानकर्ता',
      id: 'Kontributor',
      it: 'Collaboratori',
      vi: 'Người đóng góp',
      uk: "Контриб'ютори",
    }),
    subtitle: t({
      en: 'Meet our amazing',
      'en-GB': 'Meet our amazing',
      fr: 'Découvrez nos incroyables',
      es: 'Conoce a nuestros increíbles',
      de: 'Lernen Sie unsere erstaunlichen kennen',
      ar: 'تعرف على رائعين لدينا',
      ja: '素晴らしい',
      ko: '놀라운',
      pt: 'Conheça nossos incríveis',
      ru: 'Познакомьтесь с нашими удивительными',
      tr: 'Harika',
      zh: '认识我们优秀的',
      pl: 'Poznaj naszych niesamowitych',
      hi: 'हमारे अद्भुत',
      id: 'Temui yang luar biasa',
      it: 'Incontra i nostri incredibili',
      vi: 'Gặp gỡ',
      uk: 'Познайомтеся з нашими дивовижними',
    }),
  },
  title: 'Contributors page',
  description:
    'Content for the contributors page, including title and subtitle to showcase contributors.',
  tags: ['contributors', 'page content'],
} satisfies Dictionary<ContributorsPageContent>;

export default contributorsPageContent;
