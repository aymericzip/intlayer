---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - Як перекласти додаток Astro + Lit у 2026 році
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) на свій сайт Astro + Lit за допомогою Intlayer. Дотримуйтесь цього посібника, щоб зробити свій сайт багатомовним.
keywords:
  - інтернаціоналізація
  - документація
  - Intlayer
  - Astro
  - Lit
  - Web Components
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Початкова документація для Astro + Lit"
---

# Перекладіть свій сайт Astro + Lit за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення підтримки багатьох мов у сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами**: Використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані, маршрути та вміст**.
- **Забезпечити підтримку TypeScript**: Завдяки автоматично згенерованим типам для кращого автовідчуття та виявлення помилок.
- **Використовувати розширені можливості**: Такі як динамічне визначення мови та перемикання мов.

---

## Покрокова інструкція з налаштування Intlayer в Astro + Lit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Перегляньте [шаблон додатка](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою бажаного менеджера пакетів:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  Основний пакет, що надає інструменти i18n для керування конфігурацією, перекладами, [декларацією вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцією та [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **astro-intlayer**
  Плагін інтеграції Astro для зв'язку Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production); він також включає middleware для визначення бажаної мови користувача, керування cookie та обробки перенаправлень URL.

- **lit**
  Основний пакет Lit для створення швидких і легких Web Components.

- **lit-intlayer**
  Пакет для інтеграції Intlayer у додатки Lit. Він надає хуки на основі `ReactiveController` (`useIntlayer`, `useLocale` тощо), щоб автоматично повідомляти LitElement про необхідність перерендерингу при зміні мови.

- **@astrojs/lit**
  Офіційна інтеграція Astro, яка дозволяє використовувати Lit custom elements всередині сторінок Astro.

### Крок 2: Налаштуйте свій проект

Створіть конфігураційний файл, щоб визначити мови вашого додатка:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.UKRAINIAN,
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення middleware, імена cookie, розташування та розширення декларацій вмісту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Astro

Додайте плагін `intlayer` до вашої конфігурації Astro та інтеграцію Lit.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Плагін інтеграції `intlayer()` використовується для інтеграції Intlayer з Astro. Він забезпевує генерацію файлів декларації вмісту та стежить за ними в режимі розробки. Він визначає змінні середовища Intlayer всередині додатка Astro та надає аліаси для оптимізації продуктивності.

> Інтеграція `lit()` дозволяє використовувати Lit custom elements всередині сторінок Astro.

### Крок 4: Декларуйте свій вміст

Створюйте та керуйте своїми деклараціями вмісту для зберігання перекладів:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      uk: "Привіт Світе",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      uk: "Ласкаво просимо на мій багатомовний сайт Astro + Lit.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> Декларації вмісту можна визначати в будь-якому місці вашого додатка, за умови, що вони включені в `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання додаткової інформації дивіться [документацію з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання вмісту в Astro

Ви можете використовувати словники безпосередньо у ваших `.astro` файлах, використовуючи основні допоміжні функції, експортовані з `intlayer`. Вам також слід додати метадані SEO (такі як hreflang та канонічні посилання) на кожній сторінці. Lit custom elements імпортуються за допомогою блоку `<script>` на стороні клієнта і розміщуються в body.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Канонічне посилання -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Посилання Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Lit custom element — приймає мову, визначену сервером, як атрибут -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **Примітка щодо налаштування маршрутизації:**
> Структура каталогів, яку ви використовуєте, залежить від параметра `middleware.routing` у `intlayer.config.ts`:
>
> - **`prefix-no-default` (за замовчуванням):** Зберігає мову за замовчуванням у корені (без префікса) та додає префікси до інших. Використовуйте `[...locale]`, щоб охопити всі випадки.
> - **`prefix-all`:** Усі URL-адреси отримують префікс мови. Ви можете використовувати стандартний `[locale]`, якщо вам не потрібно окремо обробляти корінь.
> - **`search-param` або `no-prefix`:** Каталоги мов не потрібні. Мова керується за допомогою параметрів запиту або cookie.

### Крок 6: Створення Lit Custom Element

Створіть Lit custom element. Викличте `installIntlayer` у `connectedCallback`, використовуючи атрибут `locale`, отриманий від сервера, щоб ініціалізувати синглтон керування перекладами на стороні клієнта.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // Ініціалізація з мовою, визначеною сервером
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- Перемикач мов рендериться всередині LitElement -->
        <div class="locale-switcher">
          <span class="switcher-label">Змінити мову:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> Атрибут `locale` передається зі сторінки Astro (визначення на стороні сервера) і використовуватися в `connectedCallback` для запуску `installIntlayer`, встановлюючи початкову мову для всіх хуків `ReactiveController` всередині компонента.

> `useIntlayer` зареєстровано як `ReactiveController`. Він автоматично надсилатиме запит на ререндер компонента при зміні мови, тому не потрібно додавати логіку підписки.

### Крок 7: Додавання перемикача мов

Функціональність перемикання мов інтегрована безпосередньо в метод `render()` Lit custom element (див. крок 6 вище). Він використовує `useLocale` з `lit-intlayer` і переходить за локалізованою URL-адресою, коли користувач обирає нову мову:

```typescript fileName="src/components/lit/LitDemo.ts"
// Всередині класу LitElement, після встановлення useLocale з кроку 6:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // Перейти за локалізованою URL-адресою при зміні мови
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">Змінити мову:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Примітка щодо реактивності в Lit:**
> `useLocale` повертає `ReactiveController`. Коли викликається `setLocale`, контролер автоматично запитує оновлення рендерингу, оновлюючи стан кнопок без потреби в ручних маніпуляціях з DOM.

> **Примітка щодо стійкості:**
> Використання `onLocaleChange` para redicuicamiento через `window.location.href` garantiza відвідування нової URL-адреси з мовним префіксом. Це дозволяє middleware Intlayer встановити cookie мови та запам'ятати вибір користувача для майбутніх візитів.

### Крок 8: Sitemap та Robots.txt

Intlayer пропонує інструменти для динамічного створення локалізованої карти сайту та файлу robots.txt.

#### Sitemap

Створіть `src/pages/sitemap.xml.ts` для генерації карти сайту, що охоплює всі ваші локалізовані маршрути.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Створіть `src/pages/robots.txt.ts` для керування скануванням пошуковими системами.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Конфігурація TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги від TypeScript, роблячи вашу кодову базу надійнішою. Якщо ви використовуєте синтаксис декораторів, переконайтеся, що ви ввімкнули `experimentalDecorators` в опціях компилятора.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // Необхідно для підтримки декораторів у Lit
  },
  "include": [
    // ... ваша існуюча конфігурація TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Конфігурація Git

Ми рекомендуємо ігнорувати файли, згенеровані Intlayer. Це запобігає їх потраплянню до вашого Git-репозиторію.

Для цього додайте наступні інструкції до вашого файлу `.gitignore`:

```bash
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення для VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити **офіційне розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автозаповнення** ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про використання розширення дивіться [документацію розширення VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Поглиблюйте свої знання

Якщо ви хочете дізнатися більше, ви також можете впровадити [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/uk/intlayer_visual_editor.md) або використовувати [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/uk/intlayer_CMS.md), щоб винести ваш вміст назовні.
