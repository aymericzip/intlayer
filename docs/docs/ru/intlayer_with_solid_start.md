---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n — полное руководство по переводу вашего приложения"
description: "Забудьте про i18next. Руководство 2026 года по созданию многоязычного (i18n) приложения на SolidStart. Серверная маршрутизация локалей, hreflang, sitemap и перевод с помощью ИИ."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Переведите ваш сайт на SolidStart с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее решение i18n для Vite и Solid? Знакомьтесь с Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Содержание

<TOC/>

Это руководство описывает **серверно-рендерящееся** приложение SolidStart: определение локали происходит на этапе запроса, страницы рендерятся на сервере на нужном языке, а сигналы `<html lang>`, `hreflang` и sitemap, необходимые поисковым системам, отдаются уже на стороне сервера.

## Почему Intlayer лучше альтернатив?

По сравнению с такими решениями, как `@solid-primitives/i18n` или `i18next`, Intlayer — это решение со встроенными оптимизациями, такими как:

<AccordionGroup>

<Accordion header="Полная поддержка Solid">

Intlayer оптимизирован для идеальной работы с Solid: он предлагает **компонентно-ориентированную область видимости контента**, **реактивные переводы** и все возможности, необходимые для масштабирования интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных JSON-файлов на страницы загружается только нужный контент. Intlayer помогает **сократить размер бандла и страниц до 50%**.

</Accordion>

<Accordion header="Удобство поддержки">

Разделение контента приложения по областям **упрощает поддержку** крупных приложений. Вы можете дублировать или удалить одну папку с функциональностью, не беспокоясь о пересмотре всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что гарантирует точность вашего контента.

</Accordion>

<Accordion header="ИИ-агент">

Совместное расположение контента **сокращает контекст**, необходимый большим языковым моделям (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать опыт разработки (DX) ещё удобнее для ИИ-агентов.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в вашем CI/CD-пайплайне с помощью выбранной вами LLM за счёт вашего ИИ-провайдера. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), помогающую **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение огромных JSON-файлов к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента на этапе сборки.

</Accordion>

<Accordion header="Масштабирование с участием нетехнических специалистов">

Intlayer — это больше, чем просто решение для i18n: он предоставляет **самостоятельно размещаемый [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом **в реальном времени**, делая совместную работу с переводчиками, копирайтерами и другими членами команды бесшовной. Контент может храниться локально и/или удалённо.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по настройке Intlayer в приложении SolidStart

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

> флаг `--interactive` необязателен. Используйте `intlayer-cli init`, если вы ИИ-агент.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  Пакет, интегрирующий Intlayer с приложением Solid. Он предоставляет провайдеры контекста и хуки для интернационализации Solid.

- **vite-intlayer**

  Включает плагин Vite для интеграции Intlayer со [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также обработчик маршрутизации по локали, который определяет предпочитаемую локаль пользователя, управляет cookie и обрабатывает перенаправление URL.

> `vite-intlayer` здесь является серверной зависимостью, а не только зависимостью времени сборки: он предоставляет обработчик запросов, который запускает Nitro-сервер SolidStart. Оставить его в `dependencies` — безопасный вариант по умолчанию; переносить в `devDependencies` стоит только если вы деплоите собранную директорию `.output`, в которую Nitro встраивает обработчик.

</Step>

<Step number={2} title="Настройка вашего проекта">

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

При `prefix-no-default` локаль по умолчанию обслуживается по URL без префикса:

```plaintext
/            /about          → English  (локаль по умолчанию)
/fr          /fr/about       → French
/es          /es/about       → Spanish
```

> С помощью этого конфигурационного файла вы можете настроить локализованные URL, перенаправление через middleware, названия cookie, расположение и расширение деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Vite">

Добавьте плагин Intlayer в вашу конфигурацию:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> Плагин Vite `intlayer()` собирает файлы деклараций контента, отслеживает их в режиме разработки и определяет переменные окружения Intlayer внутри приложения. Он также предоставляет алиасы, оптимизирующие производительность.

### Маршрутизация по локали идёт вместе с плагином

SolidStart работает на основе [Nitro](https://nitro.build), и `intlayer()` регистрирует свой обработчик маршрутизации по локали прямо в серверном пайплайне Nitro (через опцию `routing.enableProxy`, включённую по умолчанию). Больше ничего подключать не нужно: на собранном сервере каждый запрос проверяется до того, как попадёт в роутер, и

- локаль считывается из префикса URL, затем из cookie `INTLAYER_LOCALE`, затем из заголовка `Accept-Language`;
- URL без префикса перенаправляется на локализованный вариант, если определённая локаль не является локалью по умолчанию (`/` → `/fr`);
- избыточно префиксированный URL перенаправляется обратно к каноническому виду (`/en/about` → `/about`);
- cookie локали записывается обратно в ответ.

</Step>

<Step number={4} title="Объявление вашего контента">

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **Особенность SolidStart**: каждый файл `.ts` / `.tsx` в директории `src/routes` становится маршрутом, а файл `.content.ts` имеет экспорт по умолчанию, поэтому он тоже будет воспринят как страница. Держите декларации контента ваших **страниц** вне директории routes (хорошо подходит `src/contents/`). Контент **компонентов** может оставаться рядом с ними, так как `src/components` не сканируется файловым роутером.

> Ваши декларации контента могут быть определены в любом месте приложения, если они включены в директорию `contentDir` (по умолчанию `./src`) и соответствуют расширению файла декларации контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Подробнее см. в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Добавление локализованной маршрутизации">

Цель этого шага — дать каждому языку свой собственный URL, который будет индексироваться поисковыми системами.

Переместите ваши страницы в **необязательный динамический сегмент**. В файловом роутере SolidStart `[[locale]]` компилируется в шаблон пути `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← layout, проверяющий сегмент
  [[locale]]/
    index.tsx             → /        и /fr        и /es
    about.tsx             → /about   и /fr/about  и /es/about
  [...404].tsx            → catch-all для всего остального
```

Единственная задача файла layout — ограничить сегмент настроенной локалью:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` разворачивает `:locale?` в два шаблона — один с сегментом и один без — и пробует их по убыванию специфичности. Именно `matchFilters` отличает работающую настройку от запутывающей:

| URL         | Без `matchFilters`                                  | С `matchFilters`                           |
| ----------- | --------------------------------------------------- | ------------------------------------------ |
| `/fr/about` | Страница about на французском                       | Страница about на французском              |
| `/about`    | Страница about (статический сегмент побеждает)      | Страница about                             |
| `/unknown`  | **Главная страница**, незаметно, с `locale=unknown` | Нет совпадения → переходит к catch-all 404 |

> Предпочитайте `[locale]` (обязательный) вместо `[[locale]]`, если вы используете режим маршрутизации `'prefix-all'`, и полностью уберите сегмент для `'no-prefix'` или `'search-params'`.

</Step>

<Step number={6} title="Передача локали вашему приложению">

URL — это единственный источник истины для локали: middleware уже перенаправил запрос на его локализованный путь, поэтому чтение пути в корневом layout сохраняет согласованность серверного рендеринга и клиентской гидратации, а также автоматически обновляет локаль при каждой клиентской навигации.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // Сервер рендерит <html> в entry-server.tsx; клиентским переходам между
  // локалями нужно самостоятельно обновлять атрибуты.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` реагирует на свой проп `locale`, поэтому достаточно передать вызов accessor'а `locale()` внутри JSX — Solid компилирует его в геттер, и всё дерево перерендеривается на новом языке при изменении URL.

</Step>

<Step number={7} title="Установка атрибутов lang и dir HTML на сервере">

Элемент `<html>` рендерится в `entry-server.tsx`, вне `Router`. Вместо этого считывайте локаль из URL запроса:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Теперь краулеры получают правильный язык уже в первом байте:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Использование Intlayer на ваших страницах">

Обращайтесь к словарям контента в любом месте приложения:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> В Solid `useIntlayer` возвращает реактивный контент (например, `content`). Вы можете обращаться к его свойствам напрямую.

> Если вы хотите использовать ваш контент в атрибуте типа `string`, таком как `alt`, `title`, `href`, `aria-label` и т. д., используйте значение функции, например:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Подробнее о хуке `useIntlayer` см. в [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Контентные узлы не ограничиваются простыми переводами. Например, счётчик с формами множественного числа:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` выбирает категорию через `Intl.PluralRules` для активной локали, поэтому языки с более чем двумя формами множественного числа работают без дополнительного кода.

</Step>

<Step number={9} title="Создание компонента локализованной ссылки">

Создайте пользовательский компонент `Link`, который автоматически добавляет префикс языка к внутренним URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Написав `href="/about"` один раз, вы получаете `/about`, `/fr/about` или `/es/about` в зависимости от активной локали — без ручного добавления префиксов где-либо на страницах.

</Step>

<Step number={10} title="Создание компонента переключателя локали">

Отрисовывайте переключатель как **настоящие ссылки**, а не как `<select>`: каждый язык текущей страницы становится индексируемой ссылкой, которую можно открыть в новой вкладке — то, что элемент управления только на JavaScript предложить не может.

`getPathWithoutLocale` убирает сегмент локали из текущего пути, а `getLocalizedUrl` перестраивает его для целевой локали, поэтому ссылки следуют вашему режиму маршрутизации без жёсткого кодирования чего-либо. Именно навигация меняет отображаемую локаль — маршрут `[[locale]]` определяет её из URL — в то время как `setLocale` сохраняет выбор в cookie `INTLAYER_LOCALE`, чтобы при последующем посещении URL без локали открывался тот же язык.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Канонический (без локали) путь текущей отображаемой страницы
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Точное совпадение, чтобы ссылка на локаль по умолчанию не
              // помечалась активной на каждой странице
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Гарантирует, что кнопка "назад" браузера вернёт на предыдущую страницу
              replace
            >
              {/* Язык на своём собственном языке — например, Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> В Solid `locale` из `useLocale` — это **accessor-сигнал**. Используйте `locale()` (со скобками), чтобы реактивно прочитать его текущее значение.
>
> `getLocaleName(localeItem)` отображает каждый язык на его собственном языке — `English / Français / Español`. Передайте второй аргумент, чтобы перевести названия на текущий отображаемый язык: `getLocaleName(localeItem, locale())` даёт `English / French / Spanish` на английском, `anglais / français / espagnol` на французском.
>
> `<A>` уже устанавливает `aria-current="page"` на ссылке, соответствующей текущему URL, так что здесь ничего добавлять не нужно. `replace` считывается роутером обратно из отрисованного атрибута: он заменяет запись в истории вместо добавления новой, поэтому кнопка "назад" браузера возвращает на страницу, посещённую до переключения, а не на ту же страницу на предыдущем языке.
>
> `dir` и `hreflang` на каждой ссылке сохраняют правильную ориентацию названий языков с письмом справа налево и сообщают вспомогательным технологиям и краулерам, на какой язык указывает каждая ссылка.
>
> Подробнее о хуке `useLocale` см. в [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Отправка ссылок canonical и hreflang" isOptional={true}>

Аннотации `hreflang` сообщают поисковым системам, что `/about`, `/fr/about` и `/es/about` — это одна и та же страница на разных языках. `getMultilingualUrls` формирует их из канонического (без локали) пути в соответствии с вашим режимом маршрутизации, поэтому ничего не приходится жёстко кодировать:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** Абсолютный URL отображаемой страницы. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Отрисуйте его в head документа, где доступен URL запроса:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … внутри <head>, рядом с остальными мета-тегами:
<AlternateLinks url={url} />;
```

`GET /fr/about` отдаёт тогда:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Примечание о `@solidjs/meta`**: на момент написания `<Title>` и `<Meta>` из `@solidjs/meta` применяются на клиенте после гидратации, но **не** попадают в серверно-рендерённый `<head>` в SolidStart v2. Пока это не исправлено выше по стеку, отрисовывайте теги, которые краулеры должны видеть без JavaScript — `canonical`, `hreflang` и, при необходимости, `title` / `description` — напрямую в `entry-server.tsx`, как показано выше.

</Step>

<Step number={12} title="Управление страницами 404" isOptional={true}>

Splat-маршрут в корне `src/routes` перехватывает все пути, которые не совпали с сегментом локали, включая некорректные префиксы локали, отклонённые `matchFilters`. Так как локаль по-прежнему определяется из URL через корневой layout, страница 404 отображается на языке посетителя:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Запрос            | Результат                                    |
| ----------------- | -------------------------------------------- |
| `/xx`             | `404` — `xx` не является настроенной локалью |
| `/nonexistent`    | `404` на локали по умолчанию                 |
| `/fr/nonexistent` | `404` на французском (`Page introuvable`)    |

</Step>

<Step number={13} title="Генерация многоязычного sitemap" isOptional={true}>

Генератор sitemap Intlayer разворачивает каждый путь в одну запись на каждую локаль и связывает альтернативы через `xhtml:link` между ними, так что маршрут должен перечислять только канонические пути без локали.

> В отличие от базовых генераторов, которые выводят только плоские URL, Intlayer связывает двунаправленными ссылками каждый локализованный вариант каждой страницы, что помогает поисковым системам сопоставлять локализованные URL и показывать нужный нужной аудитории.

SolidStart превращает файл, экспортирующий HTTP-метод, в API-маршрут и убирает расширение `.ts` из пути — поэтому `src/routes/sitemap.xml.ts` обслуживается по адресу `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API-маршруты не поддерживают необязательные параметры, поэтому держите этот файл в корне `src/routes`, вне сегмента `[[locale]]`. Sitemap уже содержит все локали.

Аналогично можно собрать `robots.txt` с помощью `getMultilingualUrls`, чтобы записи `Disallow` охватывали все локализованные написания чувствительного пути:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Получение локали в серверных функциях" isOptional={true}>

Иногда нужно получить доступ к текущей локали внутри серверной функции или API-маршрута.

В настройке на основе префиксов, как эта, **URL является авторитетным источником**: `getLocaleFromPath` считывает префикс из URL запроса. `getLocale` — это резервный вариант для запросов без префикса локали: он проверяет cookie `INTLAYER_LOCALE`, затем заголовок `x-intlayer-locale`, затем согласовывает `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Получить cookie из запроса (по умолчанию: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Получить заголовок из запроса (по умолчанию: 'x-intlayer-locale'),
      // с резервом на согласование Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Получить некоторый контент вне компонента с помощью getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Не полагайтесь только на `getLocale` здесь: cookie локали записывается только после того, как посетитель активно переключит язык, поэтому первый визит на `/fr/...` разрешился бы в локаль по умолчанию.

</Step>

<Step number={15} title="Извлечение контента ваших компонентов" isOptional={true}>

Если у вас уже есть существующая кодовая база, преобразование тысяч файлов может занять много времени.

Чтобы упростить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) для преобразования ваших компонентов и извлечения контента.

Чтобы настроить это, добавьте секцию `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... остальная часть вашей конфигурации
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включён.
     */
    enabled: true,

    /**
     * Определяет путь выходных файлов
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после преобразования.
     *
     * - Если `true`, компилятор перезапишет файл компонента на диске. Таким образом, преобразование станет постоянным, и компилятор пропустит преобразование при следующем запуске. Так компилятор может преобразовать приложение, после чего его можно удалить.
     *
     * - Если `false`, компилятор внедрит вызов функции `useIntlayer()` в код только в выходных данных сборки, оставив исходную кодовую базу нетронутой. Преобразование будет выполняться только в памяти.
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
 <Tab value='Extract command'>

Запустите экстрактор, чтобы преобразовать ваши компоненты и извлечь контент

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

> Впоследствии переместите сгенерированные файлы контента ваших страниц из `src/routes` — по причине, объяснённой в шаге 5.

 </Tab>
 <Tab value='Babel compiler'>

> Начиная с v9, `intlayerCompiler` включён в плагин `intlayer`. Так что добавлять его вручную не нужно.

Обновите ваш `vite.config.ts`, включив плагин `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // Добавляет плагин компилятора
  ],
});
```

```bash packageManager="npm"
npm run build # Или npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Или pnpm run dev
```

```bash packageManager="yarn"
yarn build # Или yarn dev
```

```bash packageManager="bun"
bun run build # Или bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Настройка TypeScript">

Intlayer использует augmentation модулей, чтобы вы получили преимущества TypeScript и укрепили вашу кодовую базу.

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... ваши существующие настройки
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

Теперь ключи словарей и пути контента проверяются во время компиляции:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Проверка вашей настройки

Соберите и запустите сервер, затем проверьте, что следующие запросы ведут себя как ожидается:

```bash
npm run build
node .output/server/index.mjs
```

| Запрос                                | Ожидаемый ответ                          |
| ------------------------------------- | ---------------------------------------- |
| `GET /`                               | `200` — английский                       |
| `GET /` с `Accept-Language: fr`       | `302` → `/fr`                            |
| `GET /` с cookie `INTLAYER_LOCALE=es` | `302` → `/es`                            |
| `GET /fr`                             | `200` — французский, `<html lang="fr">`  |
| `GET /fr/about`                       | `200` — страница about на французском    |
| `GET /en/about`                       | `302` → `/about` (канонический редирект) |
| `GET /xx`                             | `404`                                    |
| `GET /fr/nonexistent`                 | `404` на французском                     |
| `GET /sitemap.xml`                    | `200` — многоязычный XML sitemap         |

Строки, отображающие страницу, ведут себя идентично под `vite dev`. Три строки с редиректами применяются только к собранному серверу, если только вы сами не зарегистрируете обработчик как middleware — см. шаг 3.

> Запускайте dev-сервер на Node (`vite dev`), а не на Bun (`bun --bun vite dev`): SSR SolidStart в настоящее время падает под рантаймом Bun с ошибкой `Expected a Response object, but received 'NodeResponse'`. Это не связано с Intlayer — ошибка воспроизводится на обычном шаблоне — и затрагивает только dev-сервер, а не `vite build`.

---

## Настройка Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их коммита в ваш Git-репозиторий.

Для этого добавьте следующие инструкции в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

## Расширение для VS Code

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные превью** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

---

## Что дальше

Чтобы пойти дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) или вынести ваш контент вовне с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Ссылки на документацию

- [Документация Intlayer](https://intlayer.org)
- [Документация SolidStart](https://start.solidjs.com)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Декларация контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
