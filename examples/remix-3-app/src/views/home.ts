import { getIntlayer, getLocalizedPath, type Locale } from 'intlayer';
import { html, type SafeHtml } from 'remix/html-template';
import { routes } from '../routes';
import { renderLayout } from './layout';

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer('home', locale);
  const apiHref = getLocalizedPath(routes.apiGreeting.href(), locale);

  const content = html`
    <section class="hero">
      <div class="hero-pill">
        <span>✨</span>
        <span>${home.badge}</span>
      </div>
      <h1>${home.title}</h1>
      <p>${home.subtitle}</p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
        <a href="${apiHref}" target="_blank" class="btn btn-primary">
          ${home.apiPrompt}
        </a>
      </div>
    </section>

    <section>
      <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; text-align: center;">
        ${home.featuresTitle}
      </h2>
      <div class="grid">
        ${home.features.map(
          (feature) => html`
            <div class="card">
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `
        )}
      </div>
    </section>

    <section style="margin-top: 3rem; background-color: var(--surface-color); border: 1px solid var(--surface-border); border-radius: 1rem; padding: 2rem;">
      <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Interactive Locale API</h3>
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">
        ${home.apiPrompt}
      </p>
      <div class="code-box">curl -X GET http://localhost:3000${apiHref} \
  -H "Accept-Language: ${locale}"</div>
    </section>
  `;

  return renderLayout({
    title: home.title,
    locale,
    content,
    currentPath: 'home',
  });
};
