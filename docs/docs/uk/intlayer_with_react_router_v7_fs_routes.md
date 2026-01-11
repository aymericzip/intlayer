---
createdAt: 2025-12-07
updatedAt: 2025-12-30
title: Як перекласти ваш додаток на React Router v7 (File-System Routes) — посібник з i18n 2026
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого додатка на React Router v7 за допомогою Intlayer і маршрутизації на основі файлової системи. Дотримуйтеся цього вичерпного керівництва, щоб зробити ваш додаток багатомовним із локалізованою маршрутизацією.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - React Router v7
  - fs-routes
  - Маршрути файлової системи
  - React
  - i18n
  - TypeScript
  - Локалізована маршрутизація
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.5.6
    date: 2025-12-27
    changes: Оновлено Layout та додано обробку 404
  - version: 7.3.4
    date: 2025-12-08
    changes: Ініціалізовано history
---

# Перекладіть ваш вебсайт на React Router v7 (File-System Routes) за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник демонструє, як інтегрувати **Intlayer** для безшовної інтернаціоналізації в проєктах на React Router v7 з використанням **маршрутизації на основі файлової системи** (`@react-router/fs-routes`) із маршрутизацією, що враховує локаль, підтримкою TypeScript та сучасними практиками розробки.

Для клієнтської маршрутизації зверніться до посібника [Intlayer з React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_router_v7.md).

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна, open-source бібліотека інтернаціоналізації (i18n), створена для спрощення підтримки кількох мов у сучасних вебдодатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Використовувати розширені можливості**, такі як динамічне визначення локалі та її переключення.
- **Увімкнути маршрутизацію з урахуванням локалі** за допомогою файлово-системної маршрутизації React Router v7.

---

## Покроковий посібник із налаштування Intlayer у додатку React Router v7 з файловою маршрутизацією

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Як перекласти ваш додаток React Router v7 (File-System Routes) за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-fs-routes-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети, використовуючи обраний менеджер пакетів:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun add @react-router/fs-routes --dev
bunx intlayer init
```

- **intlayer**

  Ядро пакета, яке надає інструменти для інтернаціоналізації: керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer у React-застосунок. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення бажаної локалі користувача, управління куками та обробки перенаправлень URL.

- **@react-router/fs-routes**
  Пакет, який дозволяє маршрутизацію на основі файлової системи для React Router v7.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації для налаштування мов вашого застосунку:

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
// Налаштування Intlayer
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
// Налаштування Intlayer
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer до вашої конфігурації:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та їх моніторинг у режимі розробки. Він визначає змінні середовища Intlayer у Vite-застосунку. Крім того, він додає аліаси для оптимізації продуктивності.

### Крок 4: Налаштування файлових маршрутів React Router v7

Налаштуйте конфігурацію маршрутизації для використання файлової маршрутизації за допомогою `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ігнорувати файли декларацій контенту, щоб їх не обробляли як маршрути
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> Функція `flatRoutes` з `@react-router/fs-routes` дозволяє використовувати маршрутизацію на основі файлової системи, де структура файлів у директорії `routes/` визначає маршрути вашого застосунку. Опція `ignoredRouteFiles` гарантує, що файли декларації контенту Intlayer (наприклад, `.content.ts` тощо) не розглядатимуться як файли маршрутів.

### Крок 5: Створіть файли маршрутів за конвенціями файлової системи

При маршрутизації на основі файлової системи використовується плоска конвенція іменування, де крапки (`.`) позначають сегменти шляху, а дужки `()` — необов'язкові сегменти.

Створіть наступні файли у директорії `app/routes/`:

#### Структура файлів

```bash
app/
├── root.tsx                         # Обгортка Layout для маршрутів локалі
└──routes/
    ├── ($locale)._index.tsx         # Головна сторінка (/, /es тощо)
    ├── ($locale)._index.content.ts  # Вміст головної сторінки
    ├── ($locale).about.tsx          # Сторінка About (/about, /es/about тощо)
    └── ($locale).about.content.ts   # Вміст сторінки About
```

The naming conventions:

- `($locale)` - Необов'язковий динамічний сегмент для параметра locale
- `_layout` - Layout-маршрут, який обгортає дочірні маршрути
- `_index` - Індексний маршрут (відображається на батьківському шляху)
- `.` (dot) - Розділяє сегменти шляху (наприклад, `($locale).about` → `/:locale?/about`)

#### Компонент Layout

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... App, links та код ErrorBoundary без змін

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

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

#### Головна сторінка

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale)._index";

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

#### Сторінка «Про нас»

```tsx fileName="app/routes/($locale).about.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";
import { Navbar } from "~/components/navbar";

import type { Route } from "./+types/($locale).about";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Локаль не підтримується", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("about", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

### Крок 6: Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для зберігання перекладів. Розміщуйте файли контенту поруч із файлами маршрутів:

```tsx fileName="app/routes/($locale)._index.content.ts"
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
      uk: "Створюйте багатомовні додатки легко, використовуючи React Router v7 та Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      uk: "Створюйте багатомовні додатки легко за допомогою React Router v7 та Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      uk: "Дізнатися про нас",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      uk: "Про нас",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      uk: "Це вміст сторінки «Про нас».",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      uk: "Головна",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, як тільки вони будуть включені до директорії `contentDir` (за замовчуванням `./app`). І відповідати розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації див. [документацію щодо декларацій контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 7: Створіть локалізовані компоненти

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

У разі, якщо ви хочете переходити до локалізованих маршрутів, ви можете використати хук `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react.intlayer";
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

### Крок 8: Створіть компонент перемикача локалі

Створіть компонент, який дозволить користувачам змінювати мову:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
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
            reloadDocument // Перезавантажте сторінку, щоб застосувати нову локаль
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Локаль — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови у поточній локалі — напр., Francés коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською — напр., French */}
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

### Крок 9: Додати керування атрибутами HTML (необов'язково)

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

Цей хук уже використовується в компоненті макета (`($locale)._layout.tsx`), показаному в кроці 5.

### Крок 10: Додати middleware (необов'язково)

Ви також можете використовувати `intlayerProxy` для додавання server-side routing до вашого додатка. Цей плагін автоматично визначатиме поточну локаль за URL і встановлюватиме відповідний cookie локалі. Якщо локаль явно не вказана, плагін підбере найвідповіднішу локаль на основі мовних налаштувань браузера користувача. Якщо локаль не буде виявлена, він перенаправить на локаль за замовчуванням.

> Зауважте, що для використання `intlayerProxy` у production потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerProxy()],
});
```

---

## Налаштування TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript і зробити вашу codebase більш стійкою.

Переконайтеся, що ваша конфігурація TypeScript містить автогенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... ваші існуючі конфігурації
  include: [
    // ... ваші існуючі include
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

---

## Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту до вашого Git-репозиторію.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** щодо відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Розширені можливості

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

## Посилання на документацію

- [Документація Intlayer](https://intlayer.org)
- [Документація React Router v7](https://reactrouter.com/)
- [Документація React Router fs-routes](https://reactrouter.com/how-to/file-route-conventions)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
- [Оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

Цей вичерпний посібник містить усе необхідне для інтеграції Intlayer з React Router v7, використовуючи маршрутизацію на основі файлової системи, для повністю інтернаціоналізованого додатку з маршрутизацією з урахуванням локалі та підтримкою TypeScript.
