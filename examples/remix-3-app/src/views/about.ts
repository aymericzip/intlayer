import { getIntlayer, getLocalizedPath, type Locale } from 'intlayer';
import { html, type SafeHtml } from 'remix/html-template';
import { routes } from '../routes';
import { renderLayout } from './layout';

export const renderAboutPage = (locale: Locale): SafeHtml => {
  const about = getIntlayer('about', locale);
  const homeHref = getLocalizedPath(routes.home.href(), locale);

  const content = html`
    <section style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1.5rem;">
        ${about.title}
      </h1>
      <p style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 2rem;">
        ${about.description}
      </p>

      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="color: #a5b4fc; margin-bottom: 0.75rem;">
          ${about.philosophyTitle}
        </h3>
        <p style="font-size: 1rem; line-height: 1.7;">
          ${about.philosophyText}
        </p>
      </div>

      <div style="display: flex; gap: 1rem;">
        <a href="${homeHref}" class="btn btn-primary">
          ← ${about.backToHome}
        </a>
      </div>
    </section>
  `;

  return renderLayout({
    title: about.title,
    locale,
    content,
    currentPath: 'about',
  });
};
