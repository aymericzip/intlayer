---
createdAt: 2025-09-04
updatedAt: 2025-12-30
title: Як перекласти ваш застосунок на React Router v7 – посібник i18n 2026
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого застосунку на React Router v7 за допомогою Intlayer. Дотримуйтеся цього вичерпного посібника, щоб зробити ваш застосунок багатомовним із маршрутизацією, що враховує локаль.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Locale Routing
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.5.6
    date: 2025-12-27
    changes: Оновлено Layout і обробку 404
  - version: 6.1.5
    date: 2025-10-03
    changes: Оновлено документацію
  - version: 5.8.2
    date: 2025-09-04
    changes: Додано для React Router v7
---

# Перекладіть ваш вебсайт на React Router v7 за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник показує, як інтегрувати **Intlayer** для безшовної інтернаціоналізації в проєктах на React Router v7 з маршрутизацією, чутливою до локалі, підтримкою TypeScript та сучасними практиками розробки.

Цей посібник зосереджений на frontend-маршрутизації. Для маршрутизації з fs-routes зверніться до посібника [Intlayer з React Router v7 File-System Routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_router_v7_fs_routes.md).

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна open-source бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки багатомовності в сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автозаповнення та виявлення помилок.
- **Отримати вигоду від розширених можливостей**, таких як динамічне визначення та перемикання локалі.
- **Увімкнути маршрутизацію з урахуванням локалі** за допомогою конфігураційної системи маршрутизації React Router v7.

---

## Покрокове керівництво з налаштування Intlayer у застосунку на React Router v7

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети, використовуючи ваш улюблений package manager:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Базовий пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладів, [оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer у React-додаток. Він забезпечує провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Містить Vite-плагін для інтеграції Intlayer з [зборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення переважної локалі користувача, керування cookie та обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проєкту

## Покроковий посібник зі встановлення Intlayer у застосунок React Router v7 із маршрутами на основі файлової системи

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Як перекласти ваш застосунок React Router v7 за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Перегляньте [Шаблон застосунку](https://github.com/aymericzip/intlayer-react-router-v7-template) на GitHub.

Створіть конфігураційний файл для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer в консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у застосунку Vite. Додатково надає aliases для оптимізації продуктивності.

### Крок 4: Налаштуйте маршрути React Router v7

Налаштуйте конфігурацію маршрутизації для маршрутів, які враховують локаль:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:lang?", "routes/page.tsx"), // Локалізована домашня сторінка
  route("/:lang?/about", "routes/about/page.tsx"), // Локалізована сторінка 'about'
] satisfies RouteConfig;
```

### Крок 5: Створіть компоненти layout

Налаштуйте свій root layout та layout-и для кожної локалі:

#### Кореневий layout

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... Код App, links та ErrorBoundary без змін

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Мова не підтримується", { status: 404 });
  }

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### Крок 6: Оголосіть ваш контент

Створіть і керуйте деклараціями контенту для збереження перекладів:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      uk: "Ласкаво просимо до React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      uk: "Створюйте багатомовні застосунки легко з React Router v7 та Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      uk: "Дізнатися про нас",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      uk: "Головна",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, якщо вони поміщені до директорії `contentDir` (за замовчуванням `./app`). І вони повинні відповідати розширенню файлу декларацій контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для докладнішої інформації див. [документацію з декларацій контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/content_file.md).

### Крок 7: Створіть компоненти, які враховують локаль

Створіть компонент `LocalizedLink` для навігації з урахуванням локалі:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

У разі, якщо ви хочете переходити на локалізовані маршрути, ви можете використати хук `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### Крок 8: Використання Intlayer на ваших сторінках

Отримуйте доступ до словників контенту у всьому вашому застосунку:

#### Локалізована домашня сторінка

```tsx fileName="app/routes/page.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/page";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Локаль не підтримується", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

### Крок 9: Створіть компонент перемикача локалі

Створіть компонент, який дозволить користувачам змінювати мову:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Локаль — напр. FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — напр., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — наприклад, Francés коли поточна локаль встановлена в Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — напр., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md).

### Крок 10: Додати керування атрибутами HTML (необов'язково)

Створіть хук для керування атрибутами lang та dir у HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Потім використайте його у вашому кореневому компоненті:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // імпортуйте хук

export default function RootLayout() {
  useI18nHTMLAttributes(); // виклик хука

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Крок 11: Додати middleware (необов'язково)

Ви також можете використовувати `intlayerProxy` для додавання маршрутизації на серверній стороні у ваш застосунок. Цей плагін автоматично визначає поточну locale на основі URL і встановлює відповідний cookie для locale. Якщо locale не вказано, плагін визначить найбільш підходящу locale на основі мовних налаштувань браузера користувача. Якщо ж жодну locale не буде виявлено, відбудеться перенаправлення на локаль за замовчуванням.

> Зауважте, що для використання `intlayerProxy` у production потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

---

## Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зробити вашу codebase надійнішою.

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... ваші існуючі налаштування
  include: [
    // ... ваші існуючі includes
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

---

## Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого репозиторію Git.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у режимі реального часу** для відсутніх перекладів.
- **Вбудований перегляд** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для отримання детальнішої інформації про використання розширення див. [документацію Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Подальші кроки

Щоб рухатися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

## Посилання на документацію

- [Документація Intlayer](https://intlayer.org)
- [Документація React Router v7](https://reactrouter.com/)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
- [Оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

Цей всебічний посібник містить усе необхідне для інтеграції Intlayer з React Router v7, щоб отримати повністю інтернаціоналізований додаток з маршрутизацією, яка враховує локаль, та підтримкою TypeScript.
