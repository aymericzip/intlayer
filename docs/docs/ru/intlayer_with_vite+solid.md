---
createdAt: 2025-04-18
updatedAt: 2026-08-30
title: "Vite + Solid i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Vite + Solid. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
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
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Переведите ваш Vite and Solid с Intlayer | Интернационализация (i18n)

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
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Vite + Solid Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как @solid-primitives/i18n или i18next, Intlayer — это решение со встроенными оптимизациями, такими как:

<AccordionGroup>

<Accordion header="Полное твердое покрытие">

Intlayer оптимизирован для идеальной работы с Solid, предлагая **охват контента на уровне компонентов**, **реактивные переводы** и все функции, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer — это больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Solid

## Table of Contents

<TOC/>

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью npm:

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

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **solid-intlayer**
  Пакет, интегрирующий Intlayer с приложением Solid. Он предоставляет провайдеры контекста и хуки для интернационализации в Solid.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

</Step>

<Step number={2} title="Настройка вашего проекта">

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление в промежуточном ПО, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в вашу конфигурацию Vite">

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения Vite. Дополнительно предоставляет алиасы для оптимизации производительности.

</Step>

<Step number={4} title="Объявите ваш контент">

Создайте и управляйте декларациями контента для хранения переводов:

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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они будут включены в каталог `contentDir` (по умолчанию, `./src`). И соответствовать расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

</Step>

<Step number={5} title="Использование Intlayer в вашем коде">

Получите доступ к вашим словарям контента во всем приложении:

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

> В Solid `useIntlayer` возвращает функцию **accessor** (например, `content.). Вы должны вызвать эту функцию для доступа к реактивному контенту.

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

</Step>

<Step number={6} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответственно.

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

<Step number={7} title="Добавление локализованной маршрутизации в ваше приложение" isOptional={true}>

Цель этого шага - создать уникальные маршруты для каждого языка. Это полезно для SEO и SEO-дружественных URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете использовать `@solidjs/router`.

Сначала установите необходимые зависимости:

```bash packageManager="npm"
npm install @solidjs/router
```

Затем оберните ваше приложение в `Router` и определите ваши маршруты, используя `localeMap`:

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

<Step number={8} title="Изменение URL при смене локали" isOptional={true}>

Чтобы изменить URL при смене локали, вы можете использовать проп `onLocaleChange`, предоставляемый хуком `useLocale`. Вы можете использовать хуки `useNavigate` и `useLocation` из `@solidjs/router` для обновления пути URL.

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

<Step number={9} title="Переключение атрибутов языка и направления HTML" isOptional={true}>

Обновите атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали для доступности и SEO.

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
    // ... Содержимое вашего приложения
  );
};
```

</Step>

<Step number={10} title="Создание локализованного компонента ссылки" isOptional={true}>

Создайте пользовательский компонент `Link`, который автоматически добавляет префикс внутренних URL с текущим языком.

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

<Step number={11} title="Рендеринг Markdown" isOptional={true}>

Intlayer поддерживает рендеринг контента Markdown непосредственно в вашем приложении Solid, используя свой собственный внутренний парсер. По умолчанию Markdown обрабатывается как обычный текст. Чтобы отрендерить его как богатый HTML, оберните ваше приложение в `MarkdownProvider`.

Затем вы можете использовать его в ваших компонентах:

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* Рендерится как HTML через MarkdownProvider */}
      {content.markdownContent}
    </div>
  );
};
```

</Step>

<Step number={1} title="Извлечение содержимого ваших компонентов" isOptional={true}>

Если у вас есть существующая кодовая база, преобразование тысяч файлов может занять много времени.

Чтобы упростить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для преобразования ваших компонентов и извлечения содержимого.

Чтобы настроить его, вы можете добавить раздел `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Остальная часть вашей конфигурации
  compiler: {
    /**
     * Указывает, должен ли быть включен компилятор.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после преобразования. Таким образом, компилятор можно запустить только один раз для преобразования приложения, а затем удалить.
     */
    saveComponents: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда извлечения'>

Запустите экстрактор для преобразования компонентов и извлечения содержимого

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
 <Tab value='Компилятор Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Обновите ваш `vite.config.ts`, чтобы включить плагин `intlayerCompiler`:

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
npm run build # Или npm run dev
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

### (Опционально) Sitemap и robots.txt (генерация на сборке)

Intlayer предоставляет `generateSitemap` и `getMultilingualUrls` - утилиты, которые формируют многоязычные `sitemap.xml` и `robots.txt` для краулеров и позволяют автоматически записать их в `public/`. Обычно запускают небольшой Node-скрипт **до** Vite (например, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap учитывает локали и добавляет нужные метаданные.

> Поддерживается пространство имён `xhtml:link` (hreflang). Вместо плоского списка URL Intlayer связывает все языковые версии страницы в обе стороны (например `/about`, `/fr/about` или `/about?lang=fr` в зависимости от режима маршрутизации).

#### Robots.txt

Используйте `getMultilingualUrls`, чтобы правила `Disallow` покрывали все локализованные варианты путей.

#### 1. Файл `generate-seo.mjs` в корне проекта

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

Пакет `intlayer` должен быть установлен. Для продакшена задайте `SITE_URL` в окружении (например в CI).

> Для Node ESM предпочтительно `generate-seo.mjs`. Для `generate-seo.js` укажите `"type": "module"` в `package.json` или включите ESM иначе.

#### 2. Запуск скрипта до Vite

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

Подстройте команды для pnpm или yarn. Скрипт можно вызывать из CI или другого шага.

### Настройка TypeScript

Убедитесь, что конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их фиксации в вашем репозитории Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### VS Code Extension

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Vite и Solid?">

У Vite нет мнения об i18n, поэтому выбор идёт из экосистемы Solid:

- **`@solid-primitives/i18n`**: примитив от сообщества, плоский словарь, который вы собираете и загружаете сами.
- **`i18next`** с обёрткой для Solid: зрелые каталоги, но без собственной модели реактивности.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный плагином Vite во время сборки, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS.

Специфичный для Vite выигрыш в том, что переводы разрешаются и подвергаются tree-shaking во время компиляции, а не загружаются как JSON во время выполнения, поэтому страница поставляет только те записи, которые отображает. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего Solid?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/solid.md).

</Question>

<Question title="Могу ли я мигрировать с `@solid-primitives/i18n` или `i18next`, не переписывая свои компоненты?">

В значительной степени. Следуйте [руководству по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), чтобы перенести контент. Вы также можете мигрировать постепенно: [плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши существующие каталоги JSON как источник истины и генерирует из них словари Intlayer, поэтому оба слоя остаются синхронизированными, пока вы переносите компоненты по одному.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши компоненты, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. Шаг 11 этого руководства проводит вас через это.

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки: он сканирует исходный код JSX, TSX, Vue и Svelte при каждом изменении, генерирует словари и поддерживает их синхронизацию через горячую замену модулей, поэтому вручную поддерживать ключи вообще не нужно.

Стоит знать о двух ограничениях, прежде чем включать компилятор. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, такие как коды ошибок API или поля CMS, остаются недоступными. И ему нужно отличать текст, видимый пользователю, от логики приложения вроде `className="active"` или кода статуса, что требует нескольких аннотаций в большой кодовой базе. [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) избегает обоих ограничений, оставляя вас в процессе.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Как использовать переведённый контент в компоненте Solid?">

Вызовите `useIntlayer` в вашем компоненте и обращайтесь к значениям напрямую. Контент подкреплён сигналом Solid, поэтому смена локали обновляет только те части DOM, которые его читают, без повторного рендеринга компонента. Шаг 5 показывает использование.

</Question>

<Question title="Работает ли Intlayer с dev-сервером Vite и горячей перезагрузкой?">

Да. Плагин Vite `intlayer()` следит за вашими файлами `.content.ts` и пересобирает затронутые словари при сохранении, поэтому правки появляются без перезапуска dev-сервера, а сгенерированные типы регенерируются одновременно, поэтому автодополнение остаётся синхронизированным.

</Question>

<Question title="Как настроить локализованную маршрутизацию?">

Шаги 7 и 8 охватывают локализованные маршруты и переписывание URL при смене локали, а шаг 10 добавляет локализованный компонент ссылки. `routing.mode` решает схему URL: `"prefix-no-default"` (по умолчанию, `/about` и `/fr/about`), `"prefix-all"`, `"no-prefix"` (разрешается из cookie, заголовка или домена) или `"search-params"` (`/about?locale=fr`). См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как поддерживать языки с письмом справа налево, такие как арабский или иврит?">

Шаг 9 охватывает это. `getHTMLTextDir` возвращает `ltr`, `rtl` или `auto` для локали, поэтому вы привязываете `lang` и `dir` на корневом элементе из активной локали и позволяете логическим свойствам CSS обрабатывать остальное.

</Question>

<Question title="Как обрабатывать SEO-метаданные в Vite-приложении с клиентским рендерингом?">

Установите `lang` и `dir` на элементе `html` из активной локали и выдайте альтернативы `hreflang` для каждой объявленной локали с помощью `getMultilingualUrls`, включая `x-default`. Для страниц, которые должны надёжно индексироваться, предпочтите настройку с пре-рендерингом или серверным рендерингом.

</Question>

<Question title="Как автоматически перевести приложение с помощью ИИ?">

Запустите `npx intlayer fill`. Она заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
