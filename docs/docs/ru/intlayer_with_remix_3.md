---
createdAt: 2026-09-09
updatedAt: 2026-09-09
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
  - version: 9.5.0
    date: 2026-09-09
    changes: "Начальная документация для Remix 3"
author: aymericzip
---

# Перевод вашего сайта Remix 3 с помощью Intlayer | Интернационализация (i18n)

В этом руководстве показано, как интегрировать **Intlayer** для удобной интернационализации в приложениях **Remix 3** с маршрутизацией с учетом языка, типобезопасными объявлениями контента, безопасными шаблонами HTML и поддержкой сред выполнения Node.js, Bun, Deno и Cloudflare Workers.

## Что такое Remix 3?

**Remix 3** представляет собой фундаментальный архитектурный сдвиг в сторону **модульного, независимого от среды выполнения веб-фреймворка, полностью построенного на веб-стандартах**. Вместо привязки к конкретным сборщикам или проприетарным серверным API, Remix 3 распространяется в виде специализированных модульных пакетов:

- **`remix/fetch-router`** (или `remix/router`): Легковесная, совместимая со стандартами маршрутизация на базе Fetch API (`Request` и `Response`).
- **`remix/html-template`**: Безопасные строковые литералы HTML-шаблонов с автоматической защитой от XSS и композицией фрагментов.
- **`remix/response/html`**: Вспомогательные утилиты ответа для отдачи HTML со стандартной семантикой HTTP.
- **`remix/node-fetch-server`**: Серверные адаптеры для Node.js с нативной поддержкой Bun, Deno и edge-сред.
- **`remix/cookie`**: Криптографически безопасный парсинг и сериализация файлов cookie.

В сочетании с **Intlayer** вы получаете законченную систему интернационализации, обеспечивающую безопасность на этапе компиляции, автоматический перевод через ИИ, серверный рендеринг без накладных расходов и удобную маршрутизацию по локалям.

## Содержание

<TOC/>

## Почему стоит выбрать Intlayer?

По сравнению с традиционными решениями, такими как `i18next` или самодельными загрузчиками переводов, Intlayer предлагает интегрированный опыт разработки, оптимизированный для современной веб-архитектуры:

<AccordionGroup>
<Accordion header="Полная поддержка Remix 3 и веб-стандартов">

Intlayer спроектирован для естественной работы с веб-стандартами (`Request`, `Response`, `Headers` и `URL`). Он легко интегрируется в Fetch-роутер Remix 3 через легковесное middleware, извлекая локали из путей URL, файлов cookie или заголовков `Accept-Language` без привязки к конкретной платформе.

</Accordion>
<Accordion header="Типобезопасные объявления контента">

Забудьте о ненадежных строковых ключах JSON и ошибках отсутствия переводов во время выполнения. Intlayer обеспечивает строгую проверку TypeScript для всех объявленных локалей, предупреждая вас еще на этапе сборки, если перевод отсутствует или некорректен.

</Accordion>
<Accordion header="Нулевой оверхед бандла на сервере">

При использовании серверных HTML-шаблонов Remix 3 (`remix/html-template`) в выходной поток отправляется только готовый текст для запрошенного языка. Никаких клиентских бандлов гидратации или тяжелых каталогов переводов не требуется, если это не нужно явно.

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

Установите `intlayer` и `remix` (версии 3) с помощью предпочитаемого пакетного менеджера:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Основной движок интернационализации, обеспечивающий управление конфигурацией, декларацию словарей (`t()`, `Dictionary`), утилиты CLI и рантайм-интерпретатор.
- **`remix`**: Единый пакет фреймворка Remix 3, экспортирующий `remix/router`, `remix/routes`, `remix/html-template` и `remix/node-fetch-server`.

</Step>
<Step number={2} title="Настройка Intlayer">

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
<Step number={5} title="Реализация middleware Intlayer">

Remix 3 предоставляет конвейер middleware через `createRouter({ middleware: [...] })`.

Создайте middleware Intlayer, определяющий язык каждого входящего запроса:

1. По префиксу пути URL через функцию `getLocaleFromPath` (например, `/ru` или `/fr`).
2. С помощью вспомогательной функции `getLocale`, которая проверяет файлы cookie (`INTLAYER_LOCALE`), пользовательские заголовки (`x-intlayer-locale`), стандартные заголовки `Accept-Language` и `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Типобезопасный ключ контекста для получения разрешенной локали из RequestContext Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer для Remix 3.
 *
 * Определяет локаль запроса по следующему приоритету:
 * 1. Префикс пути URL (напр. `/ru/...`) через `getLocaleFromPath`
 * 2. Анализ заголовков и хранилища через `getLocale` (cookie, кастомный заголовок, Accept-Language, fallback defaultLocale)
 *
 * Добавляет полученную локаль в RequestContext Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Определение пути (/ru/about -> "ru", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Сохранение локали в контексте запроса Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Сохранение локали в контексте запроса Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

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
<Step number={7} title="Рендеринг локализованных HTML-шаблонов">

Remix 3 использует `remix/html-template` для безопасной генерации HTML с автоматическим экранированием. Создайте функцию отображения, извлекающую локализованный словарь через `getIntlayer`, устанавливающую атрибуты `<html lang="..." dir="...">` и отображающую переключатель языков:

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="Подключение серверного приложения">

Объедините роутер, middleware и обработчики маршрутов в `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Инициализация роутера с middleware Intlayer
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Назначение обработчиков маршрутов
router.map(routes, {
  actions: {
    // Маршрут для локали по умолчанию
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Локализованный маршрут
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. Запуск сервера
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

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

Убедитесь, что ваш `tsconfig.json` включает сгенерированные типы `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## Заключение

Благодаря связке Remix 3 и Intlayer вы получаете легковесный, типобезопасный и кроссплатформенный стек, построенный на открытых веб-стандартах. Ваше приложение сможет легко масштабироваться от простых маркетинговых страниц до глобально распределенных сервисов с рендерингом на edge.
