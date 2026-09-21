---
createdAt: 2026-09-09
updatedAt: 2026-09-21
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "Використання middleware та хуків remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Початкова документація для Remix 3"
author: aymericzip
---

# Переклад вашого веб-сайту Remix 3 за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник демонструє, як інтегрувати **Intlayer** для безперешкодної інтернаціоналізації в застосунках **Remix 3** з маршрутизацією з урахуванням локалі, типобезпечними оголошеннями вмісту, серверними компонентами JSX та підтримкою середовищ виконання Node.js, Bun, Deno та Cloudflare Workers.

## Що таке Remix 3?

**Remix 3** являє собою фундаментальну архітектурну зміну у бік **модульного, незалежного від середовища виконання веб-фреймворку, повністю побудованого на веб-стандартах**. Замість прив'язки до конкретних бандлерів або пропрієтарних серверних API, Remix 3 поширюється у вигляді спеціалізованих модульних пакетів:

- **`remix/fetch-router`** (або `remix/router`): Легковажна маршрутизація відповідно до стандартів на базі Fetch API (`Request` та `Response`).
- **`remix/ui`**: Модель компонентів JSX (`jsxImportSource: "remix/ui"`). Компонент є функцією налаштування (setup function), яка повертає функцію рендерингу (render function), отримуючи пропси через типізований дескриптор (handle).
- **`remix/middleware/render`**: Встановлює `context.render(<Page />)` для кожного запиту, транслюючи (streaming) дерево JSX у HTML-відповідь `Response`.
- **`remix/node-fetch-server`**: Серверні адаптери для Node.js із нативною підтримкою Bun, Deno та edge-середовищ.
- **`remix/cookie`**: Криптографічно підписаний парсинг і серіалізація файлів cookie.

У поєднанні з **Intlayer** та пакетом **`remix-intlayer`**, middleware локалі плюс ті самі хуки `useIntlayer` / `useDictionary` / `useLocale`, що й у `react-intlayer`, прив'язані до контексту запиту Remix, ви отримуєте повноцінну систему інтернаціоналізації, що забезпечує безпеку типів під час компіляції, автоматичні переклади за допомогою ШІ, серверний рендеринг без накладних витрат та безшовну маршрутизацію локалей.

## Зміст

<TOC/>

## Чому варто обрати Intlayer?

У порівнянні з традиційними рішеннями, такими як `i18next` або спеціальними завантажувачами перекладів, Intlayer пропонує інтегрований досвід розробки, оптимізований для сучасної веб-архітектури:

<AccordionGroup>
<Accordion header="Повне охоплення Remix 3 та веб-стандартів">

Intlayer розроблений для природної роботи з веб-стандартами (`Request`, `Response`, `Headers` і `URL`). `remix-intlayer` підключається до маршрутизатора Fetch Remix 3 як легке middleware, витягуючи локаль зі шляхів URL, cookie або заголовків `Accept-Language` та надаючи її решті запиту, обробникам, представленням і компонентам `remix/ui`, без необхідності передавати її вручну чи прив'язуватися до конкретного середовища виконання.

</Accordion>
<Accordion header="Типобезпечні оголошення вмісту">

Попрощайтеся з нетипізованими рядковими ключами JSON та помилками відсутності перекладів під час виконання. Intlayer забезпечує суворі перевірки TypeScript для всіх оголошених локалей, попереджаючи вас ще під час компіляції, якщо переклад відсутній або некоректний.

</Accordion>
<Accordion header="Нульовий оверхед бандла на сервері">

При використанні серверних компонентів JSX у Remix 3 у вихідний потік потрапляє лише готовий текст для запитаної локалі. Компоненти виконуються виключно на сервері, якщо ви явно не налаштували клієнтську гідратацію через `clientEntry`. За замовчуванням клієнту не надсилаються жодні каталоги перекладів або середовища виконання гідратації.

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

Встановіть `intlayer`, `remix-intlayer` та `remix` (версія 3) за допомогою обраного менеджера пакетів:

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

- **`intlayer`**: Основний рушій інтернаціоналізації для керування конфігурацією, оголошення словників (`t()`, `Dictionary`), утиліт CLI та рантайм-інтерпретатора.
- **`remix-intlayer`**: Інтеграція з Remix 3: middleware маршрутизатора `intlayer()`, що визначає локаль кожного запиту, та хуки `useIntlayer`, `useDictionary` і `useLocale`, які зчитують її далі в коді.
- **`remix`**: Уніфікований пакет фреймворку Remix 3, що експортує `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` та `remix/node-fetch-server`.

</Step>
<Step number={2} title="Налаштування Intlayer">

### Архітектура

У цій архітектурі middleware `intlayer()` з `remix-intlayer` реєструється в `createRouter()` перед middleware `render()`. Він видаляє префікс локалі до зіставлення маршрутизатором, тому маршрути оголошуються один раз у `src/routes.ts` без сегмента `:locale`, і виконує решту запиту всередині області `AsyncLocalStorage`, що дозволяє `useIntlayer` / `useLocale` зчитувати локаль без аргументів в обробниках маршрутів і представленнях `remix/ui`. Оголошення вмісту розміщуються поруч із вашими представленнями в `src/`:

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

### Конфігурація

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
<Step number={5} title="Додавання middleware Intlayer">

Remix 3 надає компонований конвеєр middleware через `createRouter({ middleware: [...] })`.

`remix-intlayer` постачає middleware `intlayer()`. Для кожного вхідного запиту воно визначає локаль за допомогою:

1. URL, у всіх режимах маршрутизації, крім `no-prefix`: префікса шляху (напр. `/uk` або `/en`) або пошукового параметра `?locale=`.
2. Локалі, збереженої клієнтом: cookie сховища (`INTLAYER_LOCALE`) або спеціального заголовка (`x-intlayer-locale`).
3. Стандартного узгодження `Accept-Language` із поверненням до налаштованої `defaultLocale`.

Результат зберігається в контексті запиту Remix як `context.intlayer` (або `context.get(Intlayer)`), з полями `locale`, `defaultLocale` та `availableLocales`. Потім middleware виконує решту запиту всередині області `AsyncLocalStorage`, прив'язаної до цього контексту, що дозволяє хукам пакета зчитувати локаль без аргументів, в обробниках маршрутів, представленнях і компонентах `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// У будь-якому місці після middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` або `useIntlayer("faq", { item: 2 })` перевизначають локаль запиту для одного виклику, а `useDictionary(homeContent)` зчитує імпортований словник замість ключа. Поза межами запиту хуки повертаються до стандартної локалі.

> Middleware також готує словники Intlayer під час запуску сервера, тому відсутність `intlayer build` не залишить реєстр порожнім.

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
<Step number={7} title="Рендеринг локалізованих сторінок за допомогою JSX">

Remix 3 використовує `remix/ui` для компонентів JSX. Компонент є **функцією налаштування (setup function)**, яка повертає **функцію рендерингу (render function)**. Пропси передаються через типізований `handle` (наприклад, `handle.props.locale`):

Почніть зі спільної оболонки `Document`, яка встановлює атрибути `<html lang="..." dir="...">` на основі локалі, визначеної middleware:

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

Потім створіть головну сторінку. Вона зчитує локалізований словник за допомогою `useIntlayer` та відображає перемикач мов:

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

> JSX у Remix — це не React: `class` пишеться як є (`className` також підтримується), а повторні рендери викликаються явно через `handle.update()`. Інтерпольовані значення екрануються автоматично. Хуки Intlayer є звичайними функціями, що зчитують область запиту, тому їх можна викликати як із функції setup, так і з функції рендерингу.

</Step>
<Step number={8} title="Підключення маршрутизатора та сервера">

Створіть `src/router.tsx` для реєстрації middleware та визначення дій маршрутів. Використовуйте `remix/middleware/render`, щоб встановити хелпер `context.render()`, і передайте свій компонент JSX напряму:

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

> `context.render` приймає необов'язковий `ResponseInit` як другий аргумент, наприклад `context.render(<NotFoundPage />, { status: 404 })`. Визначена локаль залишається доступною з обробника як `context.intlayer.locale`, наприклад для формування відповіді `Response.json`.

Тепер підключіть `src/server.ts`, використовуючи `remix/node-fetch-server` для Node.js (або експортуйте обробник `fetch` напряму для Bun, Deno або Cloudflare Workers):

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Сервер HTTP Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

// Експорт для Bun / Deno / Cloudflare Workers
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

Налаштуйте `tsconfig.json`, щоб спрямувати JSX на середовище виконання `remix/ui` та включити згенеровані типи `.intlayer`:

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

> `jsxImportSource: "remix/ui"` змушує `<HomePage />` перетворюватися на `createElement` від Remix замість React. Жодне середовище виконання React не завантажується.

## Висновок

Завдяки Remix 3 та Intlayer ви отримуєте легкий, типобезпечний і портативний стек, що відповідає відкритим веб-стандартам. Ваш застосунок може легко масштабуватися від простих локалізованих маркетингових сторінок до глобально розподілених сервісів, що рендеряться на edge.
