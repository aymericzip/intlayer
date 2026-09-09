import {
  getHTMLTextDir,
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from 'intlayer';
import { html, type SafeHtml } from 'remix/html-template';
import { routes } from '../routes';

interface LayoutOptions {
  title: string;
  locale: Locale;
  content: SafeHtml;
  currentPath?: 'home' | 'about';
}

export const renderLayout = ({
  title,
  locale,
  content,
  currentPath = 'home',
}: LayoutOptions): SafeHtml => {
  const common = getIntlayer('common', locale);

  const homeHref = getLocalizedPath(routes.home.href(), locale);
  const aboutHref = getLocalizedPath(routes.about.href(), locale);
  const apiHref = getLocalizedPath(routes.apiGreeting.href(), locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title} | ${common.appName}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>
          :root {
            --bg-color: #0c0e14;
            --surface-color: #141721;
            --surface-border: #232838;
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --accent-primary: #6366f1;
            --accent-hover: #4f46e5;
            --accent-glow: rgba(99, 102, 241, 0.18);
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: var(--font-sans);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            line-height: 1.6;
          }

          header {
            border-bottom: 1px solid var(--surface-border);
            background-color: rgba(20, 23, 33, 0.85);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .nav-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          }

          .brand {
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .brand-badge {
            background: linear-gradient(135deg, #6366f1, #a855f7);
            color: #fff;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.5rem;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          nav ul {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          nav a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.15s ease;
          }

          nav a:hover,
          nav a.active {
            color: #fff;
          }

          .controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .lang-switcher {
            display: inline-flex;
            background-color: #1a1e2d;
            border: 1px solid var(--surface-border);
            border-radius: 9999px;
            padding: 0.2rem;
            gap: 0.2rem;
          }

          .lang-btn {
            padding: 0.3rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 600;
            text-decoration: none;
            color: var(--text-secondary);
            transition: all 0.15s ease;
          }

          .lang-btn.active {
            background-color: var(--accent-primary);
            color: #fff;
          }

          .lang-btn:hover:not(.active) {
            color: #fff;
          }

          main {
            flex: 1;
            max-width: 1100px;
            margin: 0 auto;
            padding: 3rem 1.5rem;
            width: 100%;
          }

          .hero {
            text-align: center;
            padding: 3rem 0 4rem;
          }

          .hero-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.9rem;
            border-radius: 9999px;
            background-color: var(--accent-glow);
            border: 1px solid rgba(99, 102, 241, 0.35);
            color: #a5b4fc;
            font-size: 0.82rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }

          .hero h1 {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 800;
            letter-spacing: -0.025em;
            margin-bottom: 1.25rem;
            background: linear-gradient(to right, #ffffff, #d1d5db);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero p {
            font-size: 1.15rem;
            color: var(--text-secondary);
            max-width: 700px;
            margin: 0 auto 2rem;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2.5rem 0;
          }

          .card {
            background-color: var(--surface-color);
            border: 1px solid var(--surface-border);
            border-radius: 1rem;
            padding: 1.75rem;
            transition: transform 0.15s ease, border-color 0.15s ease;
          }

          .card:hover {
            transform: translateY(-2px);
            border-color: #3b4256;
          }

          .card h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #fff;
          }

          .card p {
            color: var(--text-secondary);
            font-size: 0.95rem;
          }

          .code-box {
            background-color: #08090d;
            border: 1px solid var(--surface-border);
            border-radius: 0.75rem;
            padding: 1.25rem;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            overflow-x: auto;
            color: #e2e8f0;
            margin: 1.5rem 0;
          }

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.15s ease;
            cursor: pointer;
            border: none;
          }

          .btn-primary {
            background-color: var(--accent-primary);
            color: #fff;
          }

          .btn-primary:hover {
            background-color: var(--accent-hover);
          }

          .btn-outline {
            background-color: transparent;
            border: 1px solid var(--surface-border);
            color: var(--text-primary);
          }

          .btn-outline:hover {
            background-color: var(--surface-color);
            border-color: #4b5563;
          }

          footer {
            border-top: 1px solid var(--surface-border);
            padding: 2rem 1.5rem;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <header>
          <div class="nav-container">
            <a href="${homeHref}" class="brand">
              <span>Remix 3</span>
              <span class="brand-badge">Intlayer</span>
            </a>
            <nav>
              <ul>
                <li>
                  <a href="${homeHref}" class="${currentPath === 'home' ? 'active' : ''}">
                    ${common.nav.home}
                  </a>
                </li>
                <li>
                  <a href="${aboutHref}" class="${currentPath === 'about' ? 'active' : ''}">
                    ${common.nav.about}
                  </a>
                </li>
                <li>
                  <a href="${apiHref}" target="_blank">
                    ${common.nav.api}
                  </a>
                </li>
              </ul>
            </nav>
            <div class="controls">
              <div class="lang-switcher">
                ${locales.map((loc) => {
                  const targetPath =
                    currentPath === 'about'
                      ? routes.about.href()
                      : routes.home.href();
                  const href = getLocalizedPath(targetPath, loc);
                  const isActive = loc === locale;
                  return html`
                    <a
                      href="${href}"
                      class="lang-btn ${isActive ? 'active' : ''}"
                      title="${common.switchLanguage} ${getLocaleName(loc, locale)}"
                    >
                      ${loc.toUpperCase()}
                    </a>
                  `;
                })}
              </div>
            </div>
          </div>
        </header>
        <main>${content}</main>
        <footer>
          <p>${common.footer}</p>
        </footer>
      </body>
    </html>
  `;
};
