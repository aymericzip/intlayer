import { LocaleSwitcher } from '@intlayer/design-system/locale-switcher-drop-down';
import { Logo } from '@intlayer/design-system/logo';
import { getHTMLTextDir } from 'intlayer';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { useIntlayer, useLocale } from 'preact-intlayer';
import { useSitemapPages } from '../navigation/useSitemapPages';
import { AuditSection } from './components/AuditSection';
import { I18nTagsSection } from './components/I18nTagsSection';
import { LocalesSection } from './components/LocalesSection';
import { PageNavigator } from './components/PageNavigator';
import { SwitchThemeSwitcher } from './components/SwitchThemeSwitcher';
import { TechnologyList } from './components/TechnologyList';
import { useActiveTabDetection } from './useActiveTabDetection';
import { useAuditScan } from './useAuditScan';

const SCANNER_PAGE_URL = 'https://intlayer.org/i18n-seo-scanner';

const Section: FunctionComponent<{
  title: ComponentChildren;
  children: ComponentChildren;
}> = ({ title, children }) => (
  <section className="rounded-xl border border-text/10 bg-card px-3 py-2.5">
    <h2 className="mt-0 mb-2 font-semibold text-[11px] text-neutral uppercase tracking-wider">
      {title}
    </h2>
    {children}
  </section>
);

/** Popup root: local page detection + on-demand backend audit. */
export const App: FunctionComponent = () => {
  const { tabId, tabUrl, detection, isLoading, error } =
    useActiveTabDetection();
  const scan = useAuditScan();
  const sitemap = useSitemapPages(tabId, tabUrl);
  const { locale, availableLocales, setLocale } = useLocale();
  const { title, analyzing, sectionTitles, errors, fullReport } =
    useIntlayer('popup-app');

  // Keeps `<html lang/dir>` in sync, so RTL locales flip the layout.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);

  const { resetScan } = scan;

  // Audit results describe one URL: drop them once the tab navigates.
  useEffect(() => {
    resetScan();
  }, [tabUrl, resetScan]);

  const navigateTab = (url: string): void => {
    if (tabId === null) return;
    void chrome.tabs.update(tabId, { url });
  };

  const hostname = tabUrl ? new URL(tabUrl).hostname : null;

  return (
    <main className="flex max-h-[560px] flex-col gap-3 overflow-y-auto p-3.5">
      <header className="flex items-center gap-2.5">
        <Logo className="size-5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h1 className="m-0 font-semibold text-sm">{title}</h1>
          {hostname && (
            <span className="block truncate text-neutral text-xs">
              {hostname}
            </span>
          )}
        </div>
        <SwitchThemeSwitcher />
        <LocaleSwitcher
          locale={locale}
          localeList={availableLocales}
          setLocale={setLocale}
          fullLocaleName={false}
          size="sm"
        />
      </header>

      {isLoading && <p className="m-0 text-neutral">{analyzing}</p>}
      {error && (
        <p className="m-0 text-error">
          {errors[error.code]}
          {error.detail && (
            <span className="block text-neutral text-xs">{error.detail}</span>
          )}
        </p>
      )}

      {detection && (
        <>
          <Section title={sectionTitles.technologies}>
            <TechnologyList technologies={detection.technologies} />
          </Section>

          <Section title={sectionTitles.locales}>
            <LocalesSection detection={detection} />
          </Section>

          <Section title={sectionTitles.navigation}>
            <PageNavigator
              detection={detection}
              sitemap={sitemap}
              onNavigate={navigateTab}
            />
          </Section>

          <Section title={sectionTitles.seoTags}>
            <I18nTagsSection detection={detection} />
          </Section>

          <Section title={sectionTitles.audit}>
            <AuditSection scan={scan} tabUrl={tabUrl} />
          </Section>
        </>
      )}

      <footer className="pb-0.5 text-center">
        <a
          href={SCANNER_PAGE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-neutral text-xs no-underline hover:text-text"
        >
          {fullReport}
        </a>
      </footer>
    </main>
  );
};
