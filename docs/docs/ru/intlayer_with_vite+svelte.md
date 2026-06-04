---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Svelte i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Vite + Svelte. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 5.5.11
    date: 2025-11-19
    changes: "Обновление документации"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
---

# Перевод вашего сайта на Vite и Svelte с использованием Intlayer | Интернационализация (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Содержание

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как «svelte-i18n» или «i18next», Intlayer — это решение, которое включает в себя встроенные оптимизации, такие как:

<AccordionGroup>

<Accordion header="Полное покрытие Svelte">

Intlayer оптимизирован для идеальной работы со Svelte, предлагая **охват контента на уровне компонентов**, **реактивные переводы** и все функции, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[навыки агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

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

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Svelte

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демонстрация CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-vite-svelte-template) на GitHub.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **svelte-intlayer**
  Пакет, который интегрирует Intlayer с приложением на Svelte. Он предоставляет провайдеры контекста и хуки для интернационализации в Svelte.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

</Step>

<Step number={2} title="Конфигурация вашего проекта">

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
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

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправление в middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в вашу конфигурацию Vite">

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, предоставляет алиасы для оптимизации производительности.

</Step>

<Step number={4} title="Объявите ваш контент">

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они будут включены в директорию `contentDir` (по умолчанию, `./src`). И соответствовать расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации обратитесь к [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={5} title="Использование Intlayer в вашем коде">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Отобразить контент как простой контент -->
<h1>{$content.title}</h1>
<!-- Отобразить контент с возможностью редактирования через редактор -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Отобразить контент как строку -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>

> Если ваше приложение уже существует, вы можете использовать [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) в сочетании с [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы преобразовать тысячи компонентов за одну секунду.
```

</Step>

<Step number={6} title="Изменение языка вашего контента" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// Получить информацию о локали и функцию setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Обработка изменения локали
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>

<Step number={7} title="Отображение Markdown" isOptional={true}>

Intlayer поддерживает отображение контента в формате Markdown непосредственно в вашем приложении на Svelte. По умолчанию Markdown обрабатывается как простой текст. Чтобы преобразовать Markdown в насыщенный HTML, вы можете интегрировать `@humanspeak/svelte-markdown` или другой парсер Markdown.

> Чтобы узнать, как объявлять контент в формате markdown с использованием пакета `intlayer`, смотрите [документацию по markdown](https://github.com/aymericzip/intlayer/tree/main/docs/docs/ru/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // рендеринг содержимого markdown как строки
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Вы также можете получить доступ к данным front-matter вашего markdown через свойство `content.markdownContent.metadata.xxx`.

</Step>

<Step number={8} title="Настройка редактора / CMS intlayer" isOptional={true}>

Для настройки редактора intlayer необходимо следовать [документации редактора intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

Для настройки CMS intlayer необходимо следовать [документации CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

</Step>

<Step number={7} title="Добавьте локализованную маршрутизацию в ваше приложение" isOptional={true}>

Для обработки локализованной маршрутизации в вашем приложении на Svelte вы можете использовать `svelte-spa-router` вместе с `localeFlatMap` из Intlayer для генерации маршрутов для каждой локали.

Сначала установите `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Затем создайте файл `Router.svelte` для определения ваших маршрутов:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Обновите ваш `main.ts`, чтобы монтировать компонент `Router` вместо `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Наконец, обновите ваш `App.svelte`, чтобы принимать проп `locale` и использовать его с `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

// Используем хук useIntlayer для получения контента на основе текущей локали
$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... остальная часть вашего приложения ... -->
</main>
```

#### Настройка маршрутизации на стороне сервера (необязательно)

Параллельно вы также можете использовать `intlayerProxy` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующее cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не будет обнаружена, произойдет перенаправление на локаль по умолчанию.

> Обратите внимание, что для использования `intlayerProxy` в продакшене необходимо перевести пакет `vite-intlayer` из `devDependencies` в `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [intlayerProxy(), // should be placed first
 svelte(), intlayer()],
});
```

</Step>

<Step number={8} title="Изменение URL при смене локали" isOptional={true}>

Чтобы позволить пользователям переключать языки и обновлять URL соответствующим образом, вы можете создать компонент `LocaleSwitcher`. Этот компонент будет использовать `getLocalizedUrl` из `intlayer` и `push` из `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Получение информации о локали
const { locale, availableLocales } = useLocale();

// Обработка изменения локали
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
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

Обновите ваш `vite.config.ts`, чтобы включить плагин `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Добавляет плагин компилятора
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

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```bash
#  Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное расширение **Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

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

### Продвинуться дальше

Чтобы продвинуться дальше, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент, используя [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
