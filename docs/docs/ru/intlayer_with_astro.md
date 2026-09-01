---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Astro i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Astro. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
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
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Обновление для интеграции с Astro, конфигурация, использование"
author: aymericzip
---

# Переведите ваш сайт Astro с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
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

## Содержание

<TOC/>

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как astro-i18n или i18next, Intlayer представляет собой решение со встроенными оптимизациями, такими как:

<AccordionGroup>
<Accordion header="Полное покрытие Astro">

Intlayer оптимизирован для идеальной работы с Astro, предлагая **многоязычную маршрутизацию**, **карту сайта** и все функции, необходимые для масштабирования интернационализации (i18n).

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

## Пошаговое руководство по настройке Intlayer в Astro

Посмотреть [Шаблон приложения](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью вашего менеджера пакетов:

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

> флаг `--interactive` необязателен. Используйте `intlayer-cli init`, если вы AI-агент.

> Эта команда обнаружит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Опционально: добавить поддержку островов React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Опционально: добавить поддержку островов React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Опционально: добавить поддержку островов React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлением контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляцией и [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **astro-intlayer**
  Включает плагин интеграции для Astro для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО (middleware) для определения предпочтительной локали пользователя, управления куки и обработки перенаправлений URL.

</Step>

<Step number={2} title="Настройка вашего проекта">

Создайте конфигурационный файл для настройки языков вашего приложения:

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

> Через этот конфигурационный файл вы можете настроить локализованные URL, перенаправления middleware, названия куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Astro">

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Плагин интеграции `intlayer()` используется для интеграции Intlayer с Astro. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Astro. Кроме того, он предоставляет псевдонимы (aliases) для оптимизации производительности.

</Step>

<Step number={4} title="Объявление контента">

Создавайте и управляйте объявлениями контента для хранения переводов:

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
      ru: "Привет, мир",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Более подробную информацию см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={5} title="Использование контента в Astro">

Вы можете использовать словари напрямую в файлах `.astro`, используя основные хелперы, экспортируемые из `intlayer`.

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

<Step number={6} title="Локализованная маршрутизация">

Создайте динамический сегмент маршрута для обслуживания локализованных страниц, например `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Интеграция Astro добавляет middleware Vite во время разработки, которое помогает с маршрутизацией, учитывающей язык, и определениями окружения. Вы по-прежнему можете создавать ссылки между языками, используя собственную логику или вспомогательные функции, такие как `getLocalizedUrl` из `intlayer`.

</Step>

<Step number={7} title="Добавление переключателя языков">

Чтобы пользователи могли переключаться между языками, вы можете создать компонент `LocaleSwitcher`. Этот компонент должен отображать список всех поддерживаемых языков и ссылаться на ту же страницу на каждом языке.

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

> **Примечание о сохранении настроек:**
> Использование `setLocaleInStorageClient` в клиентском скрипте гарантирует, что языковые предпочтения пользователя сохраняются в куки. Это позволяет промежуточному ПО Intlayer запомнить выбор и автоматически перенаправлять пользователя на предпочитаемый язык при будущих посещениях.

</Step>

<Step number={8} title="Sitemap и Robots.txt">

Intlayer предоставляет утилиты для динамического создания локализованных карт сайта и файлов robots.txt.

#### Sitemap

Intlayer поставляется со встроенным генератором карты сайта, который поможет вам легко создать карту сайта для вашего приложения. Он учитывает локализованные маршруты и добавляет необходимые метаданные для поисковых систем.

> Создаваемая Intlayer карта сайта поддерживает пространство имен `xhtml:link` (Hreflang XML Extensions). В отличие от стандартных генераторов карт сайта, которые просто перечисляют прямые URL-адреса, Intlayer автоматически создает необходимые двусторонние связи между всеми языковыми версиями страницы (например, `/about`, `/about?lang=fr` и `/about?lang=es`). Это гарантирует, что поисковые системы будут правильно индексировать и показывать нужную языковую версию соответствующей аудитории.

Создайте `src/pages/sitemap.xml.ts` для генерации карты сайта, включающей все ваши локализованные маршруты.

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

Создайте `src/pages/robots.txt.ts` для управления сканированием поисковыми системами.

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

<Step number={9} title="Продолжайте использовать ваш любимый фреймворк">

Продолжайте использовать ваш любимый фреймворк для создания вашего приложения.

- Intlayer + React: [Intlayer с React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer с Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer со Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer с Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer с Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+preact.md)
  </Step>

<Step number={15} title="Извлечение содержимого ваших компонентов" isOptional={true}>

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

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы воспользоваться преимуществами TypeScript и сделать вашу кодовую базу более надежной.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Настройка Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их добавления в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Для улучшения процесса разработки с использованием Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Более подробную информацию об использовании расширения см. в [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Дальнейшие шаги

Вы также можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации сайта Astro?">

Astro поставляется с опцией `i18n` на уровне маршрутизации, которая обрабатывает префиксы локалей и редиректы, но не управляет самим контентом, поэтому вам всё ещё нужен слой сообщений:

- **Встроенная `i18n` Astro** плюс написанные вручную словари JSON или TypeScript: без зависимостей, но без типизации, без правил множественного числа и без инструментов.
- **`i18next`** или **`vue-i18n` / `svelte-i18n`** внутри островов: полноценная библиотека для каждого островного фреймворка, у каждой свой каталог.
- **`Intlayer`**: один слой контента, общий для страниц Astro и всех островных фреймворков, скомпилированный во время сборки, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS.

Специфичный для Astro выигрыш в том, что один и тот же словарь обслуживает страницу `.astro` и остров React, Vue, Svelte, Solid, Preact или Lit, вместо одной библиотеки i18n на каждую островную среду выполнения. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего Astro?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Страницы Astro рендерятся во время сборки, поэтому они поставляют переведённый HTML и вообще никакого словаря; словарь получают только острова. Компилятор во время сборки разрешает вызовы контента в точные записи, которые использует компонент, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next` или написанного вручную словаря, не переписывая свои компоненты?">

В значительной степени. Следуйте [руководству по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), чтобы перенести контент. Вы также можете мигрировать постепенно: [плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши существующие каталоги JSON как источник истины и генерирует из них словари Intlayer, поэтому оба слоя остаются синхронизированными, пока вы переносите компоненты по одному.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши компоненты, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. Шаг 15 этого руководства проводит вас через это.

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

<Question title="Работает ли Intlayer внутри островов Astro?">

Да. `astro-intlayer` покрывает сторону `.astro`, а у каждого островного фреймворка есть собственная привязка, поэтому остров получает активную локаль от страницы, а не разрешает её снова. Отдельные руководства существуют для [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_astro_vue.md) и [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_astro_svelte.md), среди прочих.

</Question>

<Question title="Поставляется ли переведённый контент как статический HTML?">

Да. Astro по умолчанию рендерит страницы во время сборки, а Intlayer разрешает контент во время этого рендеринга, поэтому локализованные страницы - это обычный статический HTML. Только острова, которым нужно переключать локаль во время выполнения, получают словарь, и только для той локали, которую они отображают.

</Question>

<Question title="Как настроить локализованную маршрутизацию и переключатель локали?">

Шаг 6 и шаг 7 этого руководства охватывают это. `routing.mode` управляет тем, имеет ли локаль по умолчанию префикс (`"prefix-no-default"`), имеют ли его все локали (`"prefix-all"`), или же локаль живёт вне пути (`"no-prefix"` или `"search-params"`). `getLocalizedUrl` переписывает текущий путь на целевой язык, поэтому переключатель оставляет читателя на той же странице.

</Question>

<Question title="Как сгенерировать локализованную карту сайта и теги hreflang?">

Шаг 8 охватывает `sitemap.xml` и `robots.txt`. `getMultilingualUrls` строит альтернативы для каждой объявленной локали, включая `x-default`, что и используют поисковые системы для обслуживания правильной языковой версии страницы.

</Question>

<Question title="Как автоматически перевести сайт Astro с помощью ИИ?">

Запустите `npx intlayer fill`. Она заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и контент в формате Markdown?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) и [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md), что удобно в Astro для длинных страниц. [Форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) обрабатывают числа, даты и валюты.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
