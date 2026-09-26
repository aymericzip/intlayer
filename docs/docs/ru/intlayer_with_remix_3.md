---
createdAt: 2026-09-09
updatedAt: 2026-09-21
priority: 9
title: "Remix 3 i18n - Полное руководство по переводу вашего приложения"
description: "Забудьте об i18next. Руководство 2026 года по созданию многоязычного (i18n) приложения Remix 3. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Веб-стандарты
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Использование middleware и хуков remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Начальная документация для Remix 3"
author: aymericzip
---

# Перевод вашего сайта Remix 3 с помощью Intlayer | Интернационализация (i18n)

В этом руководстве показано, как интегрировать **Intlayer** для удобной интернационализации в приложениях **Remix 3** с маршрутизацией с учетом языка, типобезопасными объявлениями контента, серверными JSX-компонентами и поддержкой сред выполнения Node.js, Bun, Deno и Cloudflare Workers.

## Что такое Remix 3?

**Remix 3** представляет собой фундаментальный архитектурный сдвиг в сторону **модульного, независимого от среды выполнения веб-фреймворка, полностью построенного на веб-стандартах**. Вместо привязки к конкретным сборщикам или проприетарным серверным API, Remix 3 распространяется в виде специализированных модульных пакетов:

- **`remix/fetch-router`** (или `remix/router`): Легковесная, совместимая со стандартами маршрутизация на базе Fetch API (`Request` и `Response`).
- **`remix/ui`**: Модель JSX-компонентов (`jsxImportSource: "remix/ui"`). Компонент представляет собой setup-функцию, возвращающую функцию рендеринга. Это похоже на React, но состояние сохраняется в обычных JavaScript-замыканиях.
- **`remix/middleware/render`**: Устанавливает `context.render(<Page />)` для каждого запроса, передавая дерево JSX в потоковый HTML-ответ `Response`.
- **`remix/node-fetch-server`**: Серверные адаптеры для Node.js с нативной поддержкой Bun, Deno и edge-сред.
- **`remix/cookie`**: Криптографически безопасный парсинг и сериализация файлов cookie.

В сочетании с **Intlayer** и пакетом **`remix-intlayer`**, middleware локали плюс те же хуки `useIntlayer` / `useDictionary` / `useLocale`, что и в `react-intlayer`, привязанные к контексту запроса Remix, вы получаете полноценную систему интернационализации, обеспечивающую безопасность типов во время компиляции, автоматические переводы с помощью ИИ, серверный рендеринг без накладных расходов и бесшовную маршрутизацию по локалям.

## Содержание

<TOC/>

## Почему стоит выбрать Intlayer?

По сравнению с традиционными решениями, такими как `i18next` или самодельными загрузчиками переводов, Intlayer предлагает интегрированный опыт разработки, оптимизированный для современной веб-архитектуры:

<AccordionGroup>
<Accordion header="Полная поддержка Remix 3 и веб-стандартов">

Intlayer разработан для естественной работы с веб-стандартами (`Request`, `Response`, `Headers` и `URL`). `remix-intlayer` подключается к роутеру Fetch Remix 3 как легковесное middleware, извлекая локаль из путей URL, cookie или заголовков `Accept-Language` и предоставляя ее остальной части запроса, обработчикам, представлениям и компонентам `remix/ui`, без необходимости передавать ее вручную или привязываться к определенной среде выполнения.

</Accordion>
<Accordion header="Типобезопасные объявления контента">

Забудьте о ненадежных строковых ключах JSON и ошибках отсутствия переводов во время выполнения. Intlayer обеспечивает строгую проверку TypeScript для всех объявленных локалей, предупреждая вас еще на этапе сборки, если перевод отсутствует или некорректен.

</Accordion>
<Accordion header="Нулевой оверхед бандла на сервере">

Remix 3 рендерит JSX-компоненты на сервере и передает HTML клиенту. В выходной поток отправляется только готовый текст для запрошенной локали. Никаких клиентских бандлов гидратации или тяжелых каталогов переводов не требуется, если компонент явно не помечен как `clientEntry`.

</Accordion>
<Accordion header="Готовность к ИИ-агентам и автоматизации">

Intlayer размещает объявления контента (`.content.ts`) рядом с логикой маршрутов, сокращая объем контекста токенов для больших языковых моделей (LLM). Встроенные команды CLI, такие как `intlayer fill` и `intlayer test`, позволяют автоматизировать переводы в пайплайнах CI/CD по себестоимости выбранного провайдера ИИ.

</Accordion>
<Accordion header="Визуальный редактор и интеграция с CMS">

Помимо работы через код, Intlayer предоставляет автономный [Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) и [Удаленную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), позволяя редакторам и переводчикам обновлять контент без повторного развертывания проекта.

</Accordion>
</AccordionGroup>

## Пошаговое руководство

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать приложение с Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо шаблона Intlayer Remix 3"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Посмотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-remix-3-template) на GitHub.

<Steps>
<Step number={1} title="Установка зависимостей">

Установите `intlayer`, `remix-intlayer` и `remix` (версия 3) с помощью предпочитаемого пакетного менеджера:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Основной движок интернационализации, обеспечивающий управление конфигурацией, декларацию словарей (`t()`, `Dictionary`), утилиты CLI и рантайм-интерпретатор.
- **`remix-intlayer`**: Интеграция с Remix 3: middleware роутера `intlayer()`, разрешающее локаль каждого запроса, и хуки `useIntlayer`, `useDictionary` и `useLocale`, считывающие ее ниже по цепочке.
- **`remix`**: Единый пакет фреймворка Remix 3, экспортирующий `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` и `remix/node-fetch-server`.

</Step>
<Step number={2} title="Настройка Intlayer">

### Архитектура

В этой архитектуре middleware `intlayer()` из `remix-intlayer` регистрируется в `createRouter()` перед middleware `render()`. Он удаляет префикс локали до сопоставления маршрутизатора, поэтому маршруты объявляются один раз в `src/routes.ts` без сегмента `:locale`, и выполняет остальную часть запроса внутри области `AsyncLocalStorage`, что позволяет `useIntlayer` / `useLocale` читать локаль без аргументов в обработчиках маршрутов и представлениях `remix/ui`. Объявления контента размещаются рядом с вашими представлениями в `src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Конфигурация

Создайте файл `intlayer.config.ts` в корне проекта для объявления поддерживаемых языков и параметров интернационализации:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Дополнительные параметры конфигурации описаны в [документации по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>
<Step number={3} title="Объявление многоязычного контента">

Объявите локализованный контент в файле `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      ru: "Добро пожаловать в Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      ru: "Модульное приложение на веб-стандартах со встроенной интернационализацией.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      ru: "Сменить язык:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer также поддерживает форматы JSON, YAML и CommonJS. См. [Документацию по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>
<Step number={4} title="Сборка словарей Intlayer">

Скомпилируйте объявления словарей для генерации типов TypeScript и реестров среды выполнения:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Эта команда компилирует контент в каталог `.intlayer`, обеспечивая автодополнение TypeScript и быстрый поиск по словарям.

</Step>
<Step number={5} title="Добавление middleware Intlayer">

Remix 3 предоставляет компонуемый конвейер middleware через `createRouter({ middleware: [...] })`.

`remix-intlayer` поставляет middleware `intlayer()`. Для каждого входящего запроса оно разрешает локаль, используя:

1. URL, во всех режимах маршрутизации, кроме `no-prefix`: префикс пути (напр. `/ru` или `/en`) или поисковый параметр `?locale=`.
2. Локаль, сохраненную клиентом: cookie хранилища (`INTLAYER_LOCALE`) или пользовательский заголовок (`x-intlayer-locale`).
3. Стандартное согласование `Accept-Language` с возвратом к настроенной `defaultLocale`.

Результат сохраняется в контексте запроса Remix как `context.intlayer` (или `context.get(Intlayer)`), с полями `locale`, `defaultLocale` и `availableLocales`. Затем middleware выполняет остальную часть запроса в области `AsyncLocalStorage`, привязанной к этому контексту, что позволяет хукам пакета считывать локаль без аргументов, в обработчиках маршрутов, представлениях и компонентах `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// В любом месте ниже по цепочке от middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` или `useIntlayer("faq", { item: 2 })` переопределяют локаль запроса для одного вызова, а `useDictionary(homeContent)` считывает импортированный словарь вместо ключа. Вне контекста запроса хуки возвращаются к локали по умолчанию.

> Middleware также подготавливает словари Intlayer при запуске сервера, благодаря чему отсутствие `intlayer build` не оставит реестр пустым.

</Step>
<Step number={6} title="Определение типобезопасных маршрутов">

Определите маршруты приложения с помощью `route()` из `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Маршрут для локали по умолчанию
  home: "/",

  // Локализованный маршрут с динамическим сегментом :locale
  localizedHome: "/:locale",
});
```

Использование `route()` обеспечивает типобезопасную генерацию URL по всему приложению:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "ru" }); // "/ru"
```

</Step>
<Step number={7} title="Рендеринг локализованных страниц с JSX">

Remix 3 рендерит пользовательский интерфейс с помощью JSX-компонентов из `remix/ui`. Компонент представляет собой **setup-функцию**, которая принимает `Handle` и возвращает **функцию рендеринга**. Setup выполняется один раз для каждого экземпляра, рендеринг запускается при каждом обновлении, а props считываются через `handle.props`.

Начните с общей оболочки `Document`, которая задает атрибуты `<html lang="..." dir="...">` на основе локали, разрешенной middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Затем создайте главную страницу. Она считывает локализованный словарь с помощью `useIntlayer` и отображает переключатель языков:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> JSX в Remix — это не React: `class` пишется как есть (`className` также поддерживается), а повторные рендеры вызываются явно через `handle.update()`. Интерполированные значения экранируются автоматически. Хуки Intlayer представляют собой простые функции, считывающие область запроса, поэтому их можно вызывать как из функции setup, так и из функции рендеринга.

</Step>
<Step number={8} title="Подключение роутера и сервера">

Добавьте middleware `render()` из `remix/middleware/render` рядом с middleware Intlayer. Оно добавляет `context.render(node, init)` к каждому запросу, передавая дерево JSX в HTML `Response` (добавляя в начало `<!DOCTYPE html>` и устанавливая заголовок `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` принимает необязательный `ResponseInit` в качестве второго аргумента, например `context.render(<NotFoundPage />, { status: 404 })`. Разрешенная локаль остается доступной из обработчика как `context.intlayer.locale`, например для формирования ответа `Response.json`.

Наконец, экспортируйте роутер через стандартный обработчик `fetch`. Один и тот же роутер работает на Node.js, Bun, Deno и Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Аудит и автоматическое заполнение переводов">

Intlayer предоставляет CLI для поиска недостающих переводов и их автоматического заполнения с помощью ИИ:

```bash packageManager="npm"
# Проверка отсутствующих переводов
npx intlayer test

# Автозаполнение недостающих переводов через ИИ
npx intlayer fill
```

```bash packageManager="pnpm"
# Проверка отсутствующих переводов
pnpm dlx intlayer test

# Автозаполнение недостающих переводов через ИИ
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Проверка отсутствующих переводов
yarn dlx intlayer test

# Автозаполнение недостающих переводов через ИИ
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Проверка отсутствующих переводов
bun x intlayer test

# Автозаполнение недостающих переводов через ИИ
bun x intlayer fill
```

</Step>
</Steps>

## Конфигурация TypeScript

Настройте JSX на среду выполнения `remix/ui` и убедитесь, что ваш `tsconfig.json` включает сгенерированные типы `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` указывает, что `<HomePage />` разрешается в функцию `createElement` из Remix, а не из React.

## Заключение

Благодаря связке Remix 3 и Intlayer вы получаете легковесный, типобезопасный и кроссплатформенный стек, построенный на открытых веб-стандартах. Ваше приложение сможет легко масштабироваться от простых маркетинговых страниц до глобально распределенных сервисов с рендерингом на edge.
