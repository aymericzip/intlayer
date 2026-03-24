import './style.css';
import { getHTMLTextDir } from 'intlayer';
import {
  compileMarkdown,
  getIntlayerClient,
  installIntlayer,
  installIntlayerMarkdown,
  useIntlayer,
  useLocale,
  useRewriteURL,
} from 'vanilla-intlayer';
import heroImg from './assets/hero.png';
import typescriptLogo from './assets/typescript.svg';
import viteLogo from './assets/vite.svg';
import { setupCounter } from './counter.ts';
import { setupLocaleSwitcher } from './locale-switcher.ts';

// Bootstrap
installIntlayer();
installIntlayerMarkdown();

// Render function
const app = document.querySelector<HTMLDivElement>('#app')!;

const render = () => {
  const content = useIntlayer('app');
  const steps = useIntlayer('next-steps');

  app.innerHTML = `
    <section id="center">
      <div class="hero">
        <img src="${heroImg}" class="base" width="170" height="179" alt="" />
        <img src="${typescriptLogo}" class="framework" alt="${content.tsLogoLabel.value}" />
        <img src="${viteLogo}" class="vite" alt="${content.viteLogoLabel.value}" />
      </div>

      <div id="locale-switcher-mount"></div>

      <h1>${content.title}</h1>

      <button id="counter" type="button" class="counter"></button>

      <div class="edit-note">
        ${compileMarkdown(String(content.editNote))}
      </div>
    </section>

    <div class="ticks"></div>

    <section id="next-steps">
      <div id="docs">
        <svg class="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#documentation-icon"></use>
        </svg>
        <h2>${steps.docs.title}</h2>
        <p>${steps.docs.subtitle}</p>
        <ul>
          <li>
            <a href="https://vite.dev/" target="_blank">
              <img class="logo" src="${viteLogo}" alt="" />
              ${steps.docs.links.exploreVite}
            </a>
          </li>
          <li>
            <a href="https://www.typescriptlang.org" target="_blank">
              <img class="button-icon" src="${typescriptLogo}" alt="" />
              ${steps.docs.links.learnTypeScript}
            </a>
          </li>
        </ul>
      </div>
      <div id="social">
        <svg class="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#social-icon"></use>
        </svg>
        <h2>${steps.social.title}</h2>
        <p>${steps.social.subtitle}</p>
        <ul>
          <li>
            <a href="https://github.com/vitejs/vite" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#github-icon"></use>
              </svg>
              ${steps.social.links.github}
            </a>
          </li>
          <li>
            <a href="https://chat.vite.dev/" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#discord-icon"></use>
              </svg>
              ${steps.social.links.discord}
            </a>
          </li>
          <li>
            <a href="https://x.com/vite_js" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#x-icon"></use>
              </svg>
              ${steps.social.links.twitter}
            </a>
          </li>
          <li>
            <a href="https://bsky.app/profile/vite.dev" target="_blank">
              <svg class="button-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#bluesky-icon"></use>
              </svg>
              ${steps.social.links.bluesky}
            </a>
          </li>
        </ul>
      </div>
    </section>

    <div class="ticks"></div>
    <section id="spacer"></section>

    <footer class="read-the-docs">${content.readTheDocs}</footer>
  `;

  setupCounter(app.querySelector<HTMLButtonElement>('#counter')!);
  setupLocaleSwitcher(
    app.querySelector<HTMLElement>('#locale-switcher-mount')!
  );
};

// Initial render
render();

// Subscribe once — re-render on every locale change
const unsubRender = getIntlayerClient().subscribe(() => render());

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});

const unsubURL = useRewriteURL();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    unsubRender();
    unsubURL();
  });
}
