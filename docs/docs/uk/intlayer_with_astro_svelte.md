---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Svelte i18n - Як перекласти додаток Astro + Svelte у 2026 році
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) на свій сайт Astro + Svelte за допомогою Intlayer. Дотримуйтесь цього посібника, щоб зробити свій сайт багатомовним.
keywords:
  - інтернаціоналізація
  - документація
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Початкова документація для Astro + Svelte"
---

# Перекладіть свій сайт Astro + Svelte за допомогою Intlayer | Інтернаціоналізація (i18n)

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

## Покрокова інструкція з налаштування Intlayer в Astro + Svelte

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
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

bun x intlayer init
```

- **intlayer**
  Основний пакет, що надає інструменти i18n для керування конфігурацією, перекладами, [декларацією вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцією та [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **astro-intlayer**
  Плагін інтеграції Astro для зв'язку Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production); він також включає middleware для визначення бажаної мови користувача, керування cookie та обробки перенаправлень URL.

- **svelte**
  Основний пакет Svelte.

- **svelte-intlayer**
  Пакет для інтеграції Intlayer у додатки Svelte. Він надає `setupIntlayer`, а також стори `useIntlayer` та `useLocale` для інтернаціоналізації у Svelte.

- **@astrojs/svelte**
  Офіційна інтеграція Astro, яка дозволяє використовувати Svelte component islands.

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

Додайте плагін `intlayer` до вашої конфігурації Astro та інтеграцію Svelte.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> Плагін інтеграції `intlayer()` використовується для інтеграції Intlayer з Astro. Він забезпевує генерацію файлів декларації вмісту та стежить за ними в режимі розробки. Він визначає змінні середовища Intlayer всередині додатка Astro та надає аліаси для оптимізації продуктивності.

> Інтеграція `svelte()` дозволяє використовувати Svelte component islands за допомогою `client:only="svelte"`.

### Крок 4: Декларуйте свій вміст

Створюйте та керуйте своїми деклараціями вмісту для зберігання перекладів:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      uk: "Привіт Світе",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Декларації вмісту можна визначати в будь-якому місці вашого додатка, за умови, що вони включені в `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання додаткової інформації дивіться [документацію з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання вмісту в Astro

Ви можете використовувати словники безпосередньо у ваших `.astro` файлах, використовуючи основні допоміжні функції, експортовані з `intlayer`. Вам також слід додати метадані SEO (такі як hreflang та канонічні посилання) на кожній сторінці та додати Svelte island для інтерактивного вмісту на стороні клієнта.

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
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Канонічне посилання: Повідомляє пошуковим системам основну версію цієї сторінки -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Повідомляє Google про всі локалізовані версії -->
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

    <!-- x-default: Резервний варіант, коли мова не відповідає мові користувача -->
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
    <!-- Svelte island рендерить увесь інтерактивний вміст, включаючи перемикач мов -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> **Примітка щодо налаштування маршрутизації:**
> Структура каталогів, яку ви використовуєте, залежить від параметра `middleware.routing` у `intlayer.config.ts`:
>
> - **`prefix-no-default` (за замовчуванням):** Зберігає мову за замовчуванням у корені (без префікса) та додає префікси до інших. Використовуйте `[...locale]`, щоб охопити всі випадки.
> - **`prefix-all`:** Усі URL-адреси отримують префікс мови. Ви можете використовувати стандартний `[locale]`, якщо вам не потрібно окремо обробляти корінь.
> - **`search-param` або `no-prefix`:** Каталоги мов не потрібні. Мова керується за допомогою параметрів запиту або cookie.

### Крок 6: Створення компонента Svelte Island

Створіть компонент island, який обгортає ваш додаток Svelte. Ви повинні викликати `setupIntlayer` з мовою, визначеною сервером, перед доступом до будь-яких сторів.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- Перемикач мов рендериться безпосередньо всередині island -->
  <div class="locale-switcher">
    <span class="switcher-label">Змінити мову:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> Проп `locale` передається зі сторінки Astro (визначення на стороні сервера) і використовується для ініціалізації `setupIntlayer`, встановлюючи початкову мову для всіх сторів у компоненті.

### Крок 7: Додавання перемикача мов

Функціональність перемикання мов інтегрована безпосередньо в Svelte island (див. крок 6 вище). Він використовує стор `useLocale` з `svelte-intlayer` і переходить за локалізованою URL-адресою, коли користувач обирає нову мову:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // Припустимо таку ж логіку locale/setupIntlayer з кроку 6...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Перейти за локалізованою URL-адресою при зміні мови
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">Змінити мову:</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **Примітка щодо стійкості:**
> Використання `onLocaleChange` для перенаправлення через `window.location.href` гарантує відвідування нової URL-адреси з мовним префіксом. Це дозволяє middleware Intlayer встановити cookie мови та запам'ятати вибір користувача для майбутніх візитів.

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Конфігурація TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги від TypeScript, роблячи вашу кодову базу надійнішою.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... ваша існуюча конфігурація TypeScript
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
