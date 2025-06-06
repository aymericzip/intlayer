import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { IntlayerProvider } from '@providers/IntlayerProvider';
import { getHTMLTextDir, getTranslation, type IConfigLocales } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';
import localFont from 'next/font/local';

export { generateStaticParams } from 'next-intlayer';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const t = <T extends string>(content: IConfigLocales<T>) =>
    getTranslation(content, locale);

  const title = t<string>({
    en: 'Create Next App',
    fr: 'Créer une application Next.js',
    es: 'Crear una aplicación Next.js',
  });

  const description = t({
    en: 'Generated by create next app',
    fr: 'Généré par create next app',
    es: 'Generado por create next app',
  });

  return {
    title,
    description,
  };
};
export const dynamic = 'force-static';

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <IntlayerProvider locale={locale}>
      <html lang={locale} dir={getHTMLTextDir(locale)}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="fixed top-5 flex w-full justify-end px-10">
            <LocaleSwitcher />
          </header>
          {children}
        </body>
      </html>
    </IntlayerProvider>
  );
};

export default LocaleLayout;
