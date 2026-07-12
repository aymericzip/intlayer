import type { FC, ReactNode } from 'react';
import { AuditSection } from './components/AuditSection';
import { I18nTagsSection } from './components/I18nTagsSection';
import { LocalesSection } from './components/LocalesSection';
import { TechnologyList } from './components/TechnologyList';
import { useActiveTabDetection } from './useActiveTabDetection';
import { useAuditScan } from './useAuditScan';

const SCANNER_PAGE_URL = 'https://intlayer.org/i18n-seo-scanner';

const Section: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className="section">
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);

/** Popup root: local page detection + on-demand backend audit. */
export const App: FC = () => {
  const { tabUrl, detection, isLoading, error } = useActiveTabDetection();
  const scan = useAuditScan();

  const hostname = tabUrl ? new URL(tabUrl).hostname : null;

  return (
    <main className="popup">
      <header className="header">
        <img src="icons/icon-32.png" alt="" width="20" height="20" />
        <div className="header-titles">
          <h1>Intlayer i18n Scanner</h1>
          {hostname && <span className="header-host">{hostname}</span>}
        </div>
      </header>

      {isLoading && <p className="empty-hint">Analyzing page…</p>}
      {error && <p className="scan-error">{error}</p>}

      {detection && (
        <>
          <Section title="Detected technologies">
            <TechnologyList technologies={detection.technologies} />
          </Section>

          <Section title="Locales">
            <LocalesSection detection={detection} />
          </Section>

          <Section title="SEO i18n tags">
            <I18nTagsSection detection={detection} />
          </Section>

          <Section title="Full audit">
            <AuditSection scan={scan} tabUrl={tabUrl} />
          </Section>
        </>
      )}

      <footer className="footer">
        <a href={SCANNER_PAGE_URL} target="_blank" rel="noreferrer">
          Full report on intlayer.org →
        </a>
      </footer>
    </main>
  );
};
