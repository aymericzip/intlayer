---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - Повний посібник з перекладу вашого застосунку"
description: "Забудьте про i18next. Посібник 2026 року зі створення багатомовного (i18n) застосунку Remix 3. Перекладайте за допомогою агентів ШІ та оптимізуйте розмір бандла, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Веб-стандарти
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Початкова документація для Remix 3"
author: aymericzip
---

# Переклад вашого веб-сайту Remix 3 за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник демонструє, як інтегрувати **Intlayer** для безперешкодної інтернаціоналізації в застосунках **Remix 3** з маршрутизацією з урахуванням локалі, типобезпечними оголошеннями вмісту, безпечними шаблонами HTML та підтримкою середовищ виконання Node.js, Bun, Deno та Cloudflare Workers.

## Що таке Remix 3?

**Remix 3** являє собою фундаментальну архітектурну зміну у бік **модульного, незалежного від середовища виконання веб-фреймворку, повністю побудованого на веб-стандартах**. Замість прив'язки до конкретних бандлерів або пропрієтарних серверних API, Remix 3 поширюється у вигляді спеціалізованих модульних пакетів:

- **`remix/fetch-router`** (або `remix/router`): Легковажна маршрутизація відповідно до стандартів на базі Fetch API (`Request` та `Response`).
- **`remix/html-template`**: Безпечні рядкові літерали HTML-шаблонів з автоматичним захистом від XSS та композицією фрагментів.
- **`remix/response/html`**: Допоміжні утиліти відповіді для віддачі HTML зі стандартною семантикою HTTP.
- **`remix/node-fetch-server`**: Серверні адаптери для Node.js із нативною підтримкою Bun, Deno та edge-середовищ.
- **`remix/cookie`**: Криптографічно безпечний парсинг і серіалізація файлів cookie.

У поєднанні з **Intlayer** ви отримуєте повноцінну систему інтернаціоналізації, що гарантує безпеку під час компіляції, автоматизовані переклади за допомогою ШІ, серверний рендеринг без додаткових накладних витрат та зручну маршрутизацію локалей.

## Зміст

<TOC/>

## Чому варто обрати Intlayer?

У порівнянні з традиційними рішеннями, такими як `i18next` або спеціальними завантажувачами перекладів, Intlayer пропонує інтегрований досвід розробки, оптимізований для сучасної веб-архітектури:

<AccordionGroup>
<Accordion header="Повне охоплення Remix 3 та веб-стандартів">

Intlayer розроблений для бездоганної роботи з веб-стандартами (`Request`, `Response`, `Headers` та `URL`). Він легко інтегрується у Fetch-роутер Remix 3 через легке middleware, витягуючи локалі зі шляхів URL, cookie або заголовків `Accept-Language` без прив'язки до певного рантайму.

</Accordion>
<Accordion header="Типобезпечні оголошення вмісту">

Попрощайтеся з нетипізованими рядковими ключами JSON та помилками відсутності перекладів під час виконання. Intlayer забезпечує суворі перевірки TypeScript для всіх оголошених локалей, попереджаючи вас ще під час компіляції, якщо переклад відсутній або некоректний.

</Accordion>
<Accordion header="Нульовий оверхед бандла на сервері">

При використанні серверних HTML-шаблонів Remix 3 (`remix/html-template`) у вихідний потік потрапляє лише готовий текст для запитаної локалі. Клієнтські бандли гідратації чи громіздкі каталоги перекладів не потрібні, якщо це не вимагається явно.

</Accordion>
<Accordion header="Готовність до агентів ШІ та автоматизації">

Intlayer розміщує оголошення контенту (`.content.ts`) поруч із логікою маршрутів, зменшуючи контекст токенів, необхідний для великих мовних моделей (LLM). Вбудовані команди CLI, такі як `intlayer fill` та `intlayer test`, дозволяють автоматизувати переклади в пайплайнах CI/CD за прямою ціною вашого постачальника ШІ.

</Accordion>
<Accordion header="Візуальний редактор та інтеграція з CMS">

Окрім роботи через код, Intlayer надає автономний [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [Віддалену CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), дозволяючи редакторам та перекладачам оновлювати вміст без повторного розгортання проєкту.

</Accordion>
</AccordionGroup>

## Покроковий посібник

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо шаблону Intlayer Remix 3"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Перегляньте [Шаблон застосунку](https://github.com/aymericzip/intlayer-remix-3-template) на GitHub.

<Steps>
<Step number={1} title="Встановлення залежностей">

Встановіть `intlayer` та `remix` (версії 3) за допомогою обраного пакетного менеджера:

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

- **`intlayer`**: Основний рушій інтернаціоналізації для керування конфігурацією, оголошення словників (`t()`, `Dictionary`), утиліт CLI та рантайм-інтерпретатора.
- **`remix`**: Уніфікований пакет фреймворку Remix 3, що експортує `remix/router`, `remix/routes`, `remix/html-template` та `remix/node-fetch-server`.

</Step>
<Step number={2} title="Налаштування Intlayer">

Створіть файл `intlayer.config.ts` у корені проєкту для оголошення підтримуваних мов та налаштувань інтернаціоналізації:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.UKRAINIAN,
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
      Locales.UKRAINIAN,
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
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Додаткові параметри конфігурації можна знайти в [документації з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>
<Step number={3} title="Оголошення багатомовного контенту">

Оголосіть локалізований вміст у файлі `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      uk: "Ласкаво просимо до Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      uk: "Модульний застосунок на базі веб-стандартів із вбудованою i18n.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      uk: "Змінити мову:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer також підтримує формати JSON, YAML та CommonJS. Див. [Документацію щодо оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>
<Step number={4} title="Збірка словників Intlayer">

Скомпілюйте визначення словників для створення типів TypeScript і реєстрів середовища виконання:

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

Ця команда компілює ваш контент у каталог артефактів `.intlayer`, надаючи автодоповнення TypeScript та швидкий доступ до словників.

</Step>
<Step number={5} title="Реалізація middleware Intlayer">

Remix 3 надає конвеєр middleware через `createRouter({ middleware: [...] })`.

Створіть middleware Intlayer для визначення мови кожного вхідного запиту за:

1. Префіксом шляху URL через `getLocaleFromPath` (наприклад, `/uk` або `/fr`).
2. Допоміжною функцією `getLocale`, яка узгоджує мову через cookie (`INTLAYER_LOCALE`), власні заголовки (`x-intlayer-locale`), стандартні заголовки `Accept-Language` та значення `defaultLocale`.

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
 * Типобезпечний ключ контексту для отримання визначеної локалі з RequestContext Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware Intlayer для Remix 3.
 *
 * Визначає локаль запиту за таким пріоритетом:
 * 1. Префікс шляху URL (напр. `/uk/...`) через `getLocaleFromPath`
 * 2. Узгодження заголовків і сховища через `getLocale` (cookie, власний заголовок, Accept-Language, fallback defaultLocale)
 *
 * Прикріплює визначену локаль до RequestContext Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Визначення шляху (/uk/about -> "uk", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Додати визначену локаль до контексту запиту Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Додати визначену локаль до контексту запиту Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Визначення типобезпечних маршрутів">

Визначте маршрути програми за допомогою `route()` з `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Маршрут за замовчуванням
  home: "/",

  // Локалізований маршрут з динамічним сегментом :locale
  localizedHome: "/:locale",
});
```

Використання `route()` гарантує типобезпечну генерацію URL-адрес у всьому застосунку:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "uk" }); // "/uk"
```

</Step>
<Step number={7} title="Рендеринг локалізованих шаблонів HTML">

Remix 3 використовує `remix/html-template` для безпечного генерування HTML з автоматичним екрануванням. Створіть функцію відображення, що отримує локалізований словник через `getIntlayer`, встановлює атрибути `<html lang="..." dir="...">` та відображає перемикач мов:

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
<Step number={8} title="Підключення серверного застосунку">

Об'єднайте маршрутизатор, middleware та обробники маршрутів у `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Ініціалізація маршрутизатора з middleware Intlayer
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Зіставлення обробників маршрутів
router.map(routes, {
  actions: {
    // Маршрут мови за замовчуванням
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // Локалізований маршрут
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
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Аудит та автозаповнення перекладів">

Intlayer надає зручний CLI для аудиту відсутніх перекладів та їх автоматичного заповнення за допомогою ШІ:

```bash packageManager="npm"
# Перевірка відсутніх перекладів
npx intlayer test

# Автозаповнення відсутніх перекладів через ШІ
npx intlayer fill
```

```bash packageManager="pnpm"
# Перевірка відсутніх перекладів
pnpm dlx intlayer test

# Автозаповнення відсутніх перекладів через ШІ
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Перевірка відсутніх перекладів
yarn dlx intlayer test

# Автозаповнення відсутніх перекладів через ШІ
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Перевірка відсутніх перекладів
bun x intlayer test

# Автозаповнення відсутніх перекладів через ШІ
bun x intlayer fill
```

</Step>
</Steps>

## Конфігурація TypeScript

Переконайтеся, що ваш `tsconfig.json` містить згенеровані типи `.intlayer`:

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

## Висновок

Завдяки Remix 3 та Intlayer ви отримуєте легкий, типобезпечний і портативний стек, що відповідає відкритим веб-стандартам. Ваш застосунок може легко масштабуватися від простих локалізованих маркетингових сторінок до глобально розподілених сервісів, що рендеряться на edge.
