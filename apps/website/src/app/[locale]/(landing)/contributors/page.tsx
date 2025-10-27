import { BackgroundLayout } from '@components/BackgroundLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import ContributorsList from '@/components/Contributors/ContributorsList';

const TRANSLATIONS = {
  en: { subtitle: 'Meet our amazing', title: 'Contributors' },
  fr: { subtitle: 'Découvrez nos incroyables', title: 'Contributeurs' },
  es: { subtitle: 'Conoce a nuestros increíbles', title: 'Colaboradores' },
  de: {
    subtitle: 'Lernen Sie unsere erstaunlichen kennen',
    title: 'Mitwirkende',
  },
  ar: { subtitle: 'تعرف على رائعين لدينا', title: 'المساهمون' },
  ja: { subtitle: '素晴らしい', title: '貢献者' },
  ko: { subtitle: '놀라운', title: '기여자' },
  pt: { subtitle: 'Conheça nossos incríveis', title: 'Colaboradores' },
  ru: {
    subtitle: 'Познакомьтесь с нашими удивительными',
    title: 'Участниками',
  },
  tr: { subtitle: 'Harika', title: 'Katkıda Bulunanlar' },
  zh: { subtitle: '认识我们优秀的', title: '贡献者' },
  pl: { subtitle: 'Poznaj naszych niesamowitych', title: 'Współpracowników' },
  hi: { subtitle: 'हमारे अद्भुत', title: 'योगदानकर्ता' },
  id: { subtitle: 'Temui yang luar biasa', title: 'Kontributor' },
  it: { subtitle: 'Incontra i nostri incredibili', title: 'Collaboratori' },
  vi: { subtitle: 'Gặp gỡ', title: 'Người đóng góp' },
} as const;

const ContributorsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const t =
    TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  let contributors = [];

  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors',
      {
        next: { revalidate: 86400 },
      }
    );

    if (response.ok) {
      contributors = await response.json();
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
    contributors = [];
  }

  return (
    <BackgroundLayout>
      <div className="flex min-h-screen w-full flex-col items-center px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative mb-12 text-center">
            <p className="mb-3 font-medium text-base text-neutral-400 sm:text-lg">
              {t.subtitle}
            </p>
            <h1 className="font-bold text-5xl text-neutral-900 sm:text-6xl md:text-7xl dark:text-neutral-100">
              {t.title}
            </h1>
          </div>

          <ContributorsList contributors={contributors} />
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default ContributorsPage;
