---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Solid i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Vite + Solid. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Перекладіть свій вебсайт на Vite і Solid за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

> Цей пакет знаходиться в розробці. Див. [issue](https://github.com/aymericzip/intlayer/issues/117) для отримання додаткової інформації. Підтримайте зацікавленість до Intlayer для Solid, поставивши лайк цьому issue

<!-- Див. [шаблон додатка](https://github.com/aymericzip/intlayer-solid-template) на GitHub. -->

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `@solid-primitives/i18n` або `i18next`, Intlayer — це рішення, яке постачається з інтегрованою оптимізацією, як-от:

<AccordionGroup>

<Accordion header="Повне суцільне покриття">

Intlayer оптимізовано для ідеальної роботи з Solid, пропонуючи **визначення вмісту на рівні компонентів**, **реактивні переклади** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

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

## Покроковий посібник з налаштування Intlayer у додатку на Vite і Solid

## Зміст

<TOC/>

<Steps>

<Step number={1} title="Встановіть залежності">

Встановіть необхідні пакети, використовуючи npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **solid-intlayer**
  Пакет, що інтегрує Intlayer з додатком на Solid. Надає провайдери контексту та хуки для інтернаціоналізації в Solid.

- **vite-intlayer**
  Містить плагін для Vite для інтеграції Intlayer зі [збірником Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookies та обробки перенаправлень URL.

</Step>

<Step number={2} title="Конфігурація вашого проєкту">

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтеграція Intlayer у вашу конфігурацію Vite">

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій вмісту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у застосунку Vite. Додатково він надає aliases для оптимізації продуктивності.

</Step>

<Step number={4} title="Оголосіть свій вміст">

Створіть і керуйте деклараціями вмісту, щоб зберігати переклади:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, щойно вони будуть включені до директорії `contentDir` (за замовчуванням, `./src`). І відповідати розширенню файлів декларацій контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для детальнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={5} title="Використання Intlayer у вашому коді">

Отримайте доступ до ваших словників контенту в усьому додатку:

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content.solidLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count({ count: count() })}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> У Solid, `useIntlayer` повертає функцію **accessor** (наприклад, `content.). Ви повинні викликати цю функцію для доступу до реактивного контенту.

> Якщо ви хочете використовувати ваш контент у атрибуті `string`, такому як `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, як:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

</Step>

<Step number={6} title="Змінити мову вашого контенту" isOptional={true}>

Щоб змінити мову вашого контенту, ви можете використовувати функцію `setLocale`, надану хуком `useLocale`. Ця функція дозволяє вам встановити locale додатку та оновити контент відповідно.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

</Step>

<Step number={7} title="Додати локалізовану маршрутизацію до вашого додатку" isOptional={true}>

Мета цього кроку - створити унікальні маршрути для кожної мови. Це корисно для SEO та SEO-дружніх URL.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Щоб додати локалізовану маршрутизацію до вашого додатку, ви можете використовувати `@solidjs/router`.

Спочатку встановіть необхідні залежності:

```bash packageManager="npm"
npm install @solidjs/router
```

Потім обгорніть ваш додаток у `Router` та визначте ваші маршрути, використовуючи `localeMap`:

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

</Step>

<Step number={8} title="Змінити URL при зміні locale" isOptional={true}>

Щоб змінити URL при зміні locale, ви можете використовувати prop `onLocaleChange`, наданий хуком `useLocale`. Ви можете використовувати хуки `useNavigate` та `useLocation` з `@solidjs/router` для оновлення шляху URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

</Step>

<Step number={9} title="Переключити атрибути мови та напрямку HTML" isOptional={true}>

Оновіть атрибути `lang` та `dir` тега `<html>`, щоб вони відповідали поточному locale для доступності та SEO.

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... Контент вашого додатку
  );
};
```

</Step>

<Step number={10} title="Створення локалізованого компонента посилання" isOptional={true}>

Створіть користувацький компонент `Link`, який автоматично додає префікс внутрішніх URL поточною мовою.

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

</Step>

<Step number={11} title="Рендеринг Markdown" isOptional={true}>

Intlayer підтримує рендеринг контенту Markdown безпосередньо у вашому додатку Solid, використовуючи власний внутрішній парсер. За замовчуванням Markdown обробляється як звичайний текст. Щоб відрендерити його як багатий HTML, обгорніть ваш додаток у `MarkdownProvider`.

```tsx fileName="src/index.tsx"
import { render } from "solid-js/web";
import { MarkdownProvider } from "solid-intlayer/markdown";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <MarkdownProvider>
      <App />
    </MarkdownProvider>
  ),
  root!
);
```

Потім ви можете використовувати його у ваших компонентах:

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* Рендериться як HTML через MarkdownProvider */}
      {content.markdownContent}
    </div>
  );
};
```

</Step>

<Step number={1} title="Витягніть вміст ваших компонентів" isOptional={true}>

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

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Додає плагін компілятора
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

### (Опційно) Sitemap і robots.txt (генерація під час збірки)

Intlayer надає `generateSitemap` і `getMultilingualUrls` - утиліти для формування багатомовних `sitemap.xml` і `robots.txt` для краулерів та автоматичного запису в `public/`. Зазвичай запускають невеликий Node-скрипт **перед** Vite (наприклад, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap враховує локалі й додає метадані для краулерів.

> Підтримується простір імен `xhtml:link` (hreflang). Замість плоского списку URL Intlayer пов’язує всі мовні версії сторінки в обидва боки (наприклад `/about`, `/fr/about` або `/about?lang=fr` залежно від режиму маршрутизації).

#### Robots.txt

Використовуйте `getMultilingualUrls`, щоб правила `Disallow` покривали всі локалізовані варіанти шляхів.

#### 1. Файл `generate-seo.mjs` у корені проєкту

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Пакет `intlayer` має бути встановлений. У продакшені задайте `SITE_URL` у середовищі (наприклад у CI).

> Для Node ESM краще `generate-seo.mjs`. Для `generate-seo.js` додайте `"type": "module"` у `package.json` або ввімкніть ESM інакше.

#### 2. Запуск скрипта перед Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Підлаштуйте команди для pnpm або yarn. Можна викликати скрипт із CI.

### Налаштування TypeScript

Переконайтеся, що ваша конфігурація TypeScript включає автоматично створені типи.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git конфігурація

Рекомендується ігнорувати файли, створені Intlayer. Це дозволяє уникнути їх фіксації у вашому репозиторію Git.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```bash
# Ігнорувати файли, створені Intlayer
.intlayer
```

### VS Code Extension

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

---

### Розширені можливості

Щоб піти далі, ви можете реалізувати [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
