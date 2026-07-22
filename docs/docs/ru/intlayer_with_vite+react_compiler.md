---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Vite + React. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - React
  - Компилятор
  - ИИ
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Первый выпуск"
author: aymericzip
---

# Как сделать многоязычным (i18n) существующее приложение Vite и React впоследствии (руководство по i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее решение i18n для Vite и React? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Посмотрите [шаблон приложения](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

## Содержание

<TOC/>

## Почему сложно интернационализировать существующее приложение?

Если вы когда-либо пытались добавить несколько языков в приложение, созданное только для одного, вы знаете эту боль. Это не просто «сложно», это утомительно. Вам приходится прочесывать каждый файл, выискивать каждую строку текста и переносить их в отдельные файлы словарей.

Затем наступает рискованная часть: замена всего этого текста программными хуками без нарушения верстки или логики. Это такая работа, которая останавливает разработку новых функций на недели и кажется бесконечным рефакторингом.

## Что такое Intlayer Compiler?

**Intlayer Compiler** был создан, чтобы пропустить эту рутинную ручную работу. Вместо того чтобы вы извлекали строки вручную, компилятор делает это за вас. Он сканирует ваш код, находит текст и использует ИИ для генерации словарей за кулисами.
Затем он изменяет ваш код во время сборки (build time), чтобы внедрить необходимые хуки i18n. По сути, вы продолжаете писать свое приложение так, как если бы оно было одноязычным, а компилятор автоматически обрабатывает многоязычную трансформацию.

> Документация компилятора: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)

### Ограничения

Поскольку компилятор выполняет анализ и трансформацию кода (вставку хуков и генерацию словарей) во время **компиляции**, это может **замедлить процесс сборки** вашего приложения.

Чтобы смягчить это влияние во время разработки, вы можете настроить компилятор на запуск в режиме [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) или отключить его, когда он не нужен.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и React

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **react-intlayer**
  Пакет, интегрирующий Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

</Step>

<Step number={2} title="Настройка вашего проекта">

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     */
    enabled: true,

    /**
     * Выходной каталог для оптимизированных словарей.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Вставьте только содержимое в сгенерированный файл, без ключа.
     */
    noMetadata: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     * Таким образом, компилятор можно запустить только один раз для трансформации приложения, а затем удалить.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // Примечание: вы можете настроить описание этого приложения
  },
};

export default config;
```

> **Примечание**: Убедитесь, что у вас установлен `OPEN_AI_API_KEY` в переменных окружения.

> Через этот конфигурационный файл вы можете настроить локализованные URL-адреса, перенаправление middleware, имена куки, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Vite">

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов декларации контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет псевдонимы для оптимизации производительности.

> Плагин Vite `intlayerCompiler()` используется для извлечения контента из компонентов и записи файлов `.content`.

</Step>

<Step number={4} title="Компиляция вашего кода">

Просто пишите свои компоненты с жестко заданными строками на вашем языке по умолчанию. Компилятор позаботится об остальном.

Пример того, как может выглядеть ваша страница:

<Tabs>
 <Tab value="Код">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Вывод">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** используется для предоставления локали вложенным компонентам.

</Step>

<Step number={6} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и соответствующим образом обновить контент.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Заполнить недостающие переводы" isOptional={true}>

Intlayer предоставляет инструмент CLI, который поможет вам заполнить недостающие переводы. Вы можете использовать команду `intlayer` для тестирования и заполнения недостающих переводов в вашем коде.

```bash packageManager="npm"
npx intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="yarn"
yarn intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="pnpm"
pnpm intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="bun"
bun x intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="npm"
npx intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="yarn"
yarn intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="bun"
bun x intlayer fill         # Заполнить недостающие переводы
```

> Для получения более подробной информации обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/ci.md)
> </Step>

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

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволит вам избежать их фиксации в вашем репозитории Git.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение обеспечивает:

- **Автодополнение** ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Подробности о том, как использовать расширение, см. в [документации по расширению Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Идите дальше

Чтобы пойти дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести свой контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
