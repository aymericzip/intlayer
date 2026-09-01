---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Astro i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Astro. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - інтернаціоналізація
  - документація
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Оновлення інтеграції Astro, конфігурації та використання"
author: aymericzip
---

# Перекладіть свій сайт Astro за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `astro-i18n` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>
<Accordion header="Повна підтримка Astro">

Intlayer оптимізовано для ідеальної роботи з Astro, пропонуючи **багатомовну маршрутизацію**, **карту сайту** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покрокова інструкція з налаштування Intlayer в Astro

Перегляньте [шаблон додатка](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

<Steps>

<Step number={1} title="Встановіть залежності">

Встановіть необхідні пакети за допомогою бажаного менеджера пакетів:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> прапорець `--interactive` є необов'язковим. Використовуйте `intlayer-cli init`, якщо ви AI-агент.

> Ця команда визначить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  Основний пакет, що надає інструменти i18n для керування конфігурацією, перекладами, [декларацією вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцією та [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **astro-intlayer**
  Плагін інтеграції Astro для зв'язку Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production); він також включає middleware для визначення бажаної мови користувача, керування cookie та обробки перенаправлень URL.

</Step>

<Step number={2} title="Налаштуйте свій проект">

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

</Step>

<Step number={3} title="Інтегруйте Intlayer у вашу конфігурацію Astro">

Додайте плагін `intlayer` до вашої конфігурації Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Плагін інтеграції `intlayer()` використовується для інтеграції Intlayer з Astro. Він забезпечує генерацію файлів декларації вмісту та стежить за ними в режимі розробки. Він визначає змінні середовища Intlayer всередині додатка Astro та надає аліаси для оптимізації продуктивності.

</Step>

<Step number={4} title="Декларуйте свій вміст">

Створюйте та керуйте своїми деклараціями вмісту для зберігання перекладів:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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

> Декларації вмісту можна визначати в будь-якому місці вашого додатка, за умови, що вони включені в `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткової інформації дивіться [документацію з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={5} title="Використання вмісту в Astro">

Ви можете використовувати словники безпосередньо у ваших `.astro` файлах, використовуючи основні допоміжні функції, експортовані з `intlayer`.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
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

    <!-- x-default: Fallback for users in unmatched languages -->
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
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

</Step>

<Step number={6} title="Локалізована маршрутизація">

Створіть динамічні сегменти маршрутів (наприклад, `src/pages/[locale]/index.astro`) для обслуговування локалізованих сторінок:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Інтеграція Astro додає middleware Vite, який допомагає з маршрутизацією з урахуванням мови та визначеннями середовища під час розробки. Ви також можете використовувати власну логіку або інструменти `intlayer`, такі як `getLocalizedUrl`, для посилань між мовами.

</Step>

<Step number={7} title="Додавання перемикача мов">

Щоб користувачі могли перемикатися між мовами, ви можете створити компонент `LocaleSwitcher`. Цей компонент має відображати список усіх підтримуваних мов та посилатися на ту саму сторінку кожною мовою.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import {
  locales,
  getLocaleName,
  getLocalizedUrl,
  getLocaleFromPath,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav>
  {
    locales.map((localeItem) => (
      <a
        href={getLocalizedUrl(pathWithoutLocale, localeItem)}
        data-locale={localeItem}
        aria-current={localeItem === locale ? "page" : undefined}
      >
        {getLocaleName(localeItem)}
      </a>
    ))
  }
</nav>

<script>
  import { setLocaleInStorageClient, getLocalizedUrl, type LocalesValues } from "intlayer";

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      // Update the locale cookie
      setLocaleInStorageClient(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **Примітка щодо збереження налаштувань:**
> Використання `setLocaleInStorageClient` у клієнтському скрипті гарантує, що мовні уподобання користувача зберігаються у кукі. Це дозволяє проміжному ПЗ Intlayer запам'ятати вибір і автоматично перенаправляти користувача на бажану мову при наступних візитах.

</Step>

<Step number={8} title="Sitemap та Robots.txt">

Intlayer пропонує інструменти для динамічного створення локалізованої карти сайту та файлу robots.txt.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

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

</Step>

<Step number={9} title="Продовжуйте використовувати ваш улюблений фреймворк">

Продовжуйте будувати свій додаток, використовуючи фреймворк за вашим вибором.

- Intlayer + React: [Intlayer з React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer з Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer з Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer з Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer з Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+preact.md)
  </Step>

<Step number={15} title="Витягніть вміст ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб спростити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для перетворення ваших компонентів і витягування вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інша частина вашої конфігурації
  compiler: {
    /**
     * Вказує, чи повинен бути включений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи повинні компоненти зберігатися після перетворення. Таким чином, компілятор можна запустити лише один раз для перетворення програми, а потім видалити.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда витягування'>

Запустіть екстрактор для перетворення компонентів і витягування вмісту

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Компілятор Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

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

Якщо ви хочете дізнатися більше, ви також можете впровадити [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або використовувати [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), щоб винести ваш вміст назовні.

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації сайту Astro?">

Astro надає маршрутизацію `i18n` для префіксів URL, але залишає керування вмістом розробнику:

- **Вбудований `i18n` в Astro** плюс власні файли JSON/TS: без типізації, правил множини та інструментів виявлення пропущених перекладів.
- **`i18next`** або окремі бібліотеки для островів (`vue-i18n`, `svelte-i18n`): повноцінна бібліотека на кожен тип острова зі своїми каталогами.
- **`Intlayer`**: єдиний шар вмісту для сторінок Astro та будь-яких островів, оптимізований під час збирання, з повною типізацією, AI перекладом, візуальним редактором та CMS.

Головна перевага полягає в тому, що той самий словник обслуговує як сторінку `.astro`, так і острови React, Vue, Svelte, Solid, Preact або Lit. Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру бандла Astro?">

Значно менше, ніж рішення на основі просторів імен, оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Сторінки Astro рендеряться під час збирання, тому клієнту надсилається лише готовий HTML без додаткових словників; словники отримують лише інтерактивні острови (islands). [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють контент за локалями, зменшуючи бандл до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з i18next або власного словника без переписування компонентів?">

Більшою мірою так. Дотримуйтесь [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md). Можна також мігрувати поступово через [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити вміст за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Крок 15 цього посібника пояснює це.

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання: сканує код під час кожної зміни, генерує словники та синхронізує їх із HMR.

Варто знати два обмеження перед увімкненням компілятора. Він працює за допомогою статичного аналізу, тому рядки, які існують лише під час виконання, такі як коди помилок API або поля CMS, залишаються недосяжними. І він повинен відрізняти текст для користувача від логіки додатка, як-от `className="active"` або код статусу, що вимагає кількох анотацій у великій кодовій базі. [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) уникає обох проблем, тримаючи вас у курсі.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Чи працює Intlayer всередині островів (islands) Astro?">

Так. `astro-intlayer` обслуговує сторону `.astro`, а кожен острівний фреймворк має власний біндинг, завдяки чому острів отримує активну локаль безпосередньо зі сторінки. Доступні спеціалізовані посібники для [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_vue.md) та [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_astro_svelte.md).

</Question>

<Question title="Чи передається перекладений контент як статичний HTML?">

Так. Сторінки Astro за замовчуванням рендеряться під час збирання, і Intlayer вирішує контент на цьому етапі, тому локалізовані сторінки є чистим статичним HTML. Лише острови, які змінюють мову під час виконання, отримують словники для активної мови.

</Question>

<Question title="Як налаштувати локалізовану маршрутизацію та перемикач мов?">

Кроки 6 та 7 цього посібника описують це. `routing.mode` визначає, чи отримує основна мова префікс (`"prefix-no-default"`), чи всі мови (`"prefix-all"`), чи мова не залежить від шляху (`"no-prefix"`). `getLocalizedUrl` перетворює поточний шлях на цільову мову, зберігаючи відвідувача на тій самій сторінці.

</Question>

<Question title="Як створити локалізовану карту сайту та теги hreflang?">

Крок 8 описує налаштування `sitemap.xml` та `robots.txt`. Функція `getMultilingualUrls` створює альтернативні адреси для кожної оголошеної мови, включно з `x-default`, для правильного індексування пошуковими системами.

</Question>

<Question title="Як автоматично перекласти сайт Astro за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та Markdown контент?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) та [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) для об'ємних статей.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
