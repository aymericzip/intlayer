---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Як перекласти ваш застосунок Tanstack Start — посібник з i18n 2026
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого застосунку Tanstack Start за допомогою Intlayer. Дотримуйтесь цього вичерпного посібника, щоб зробити ваш додаток багатомовним із маршрутизацією з урахуванням локалі.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Локалізована маршрутизація
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.4.0
    date: 2025-12-11
    changes: Представлено validatePrefix та додано крок 14: Обробка сторінок 404 з локалізованими маршрутами.
  - version: 7.3.9
    date: 2025-12-05
    changes: Додано крок 13: Отримання локалі у server actions (необов'язково)
  - version: 7.2.3
    date: 2025-11-18
    changes: Додано крок 13: Адаптувати Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Виправлено значення префікса за замовчуванням, додавши функцію getPrefix, useLocalizedNavigate, LocaleSwitcher та LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Оновлено документацію
  - version: 5.8.1
    date: 2025-09-09
    changes: Додано для Tanstack Start
---

# Перекладіть ваш вебсайт Tanstack Start за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

Цей посібник демонструє, як інтегрувати **Intlayer** для плавної інтернаціоналізації в проєктах Tanstack Start з маршрутизацією, що враховує локаль, підтримкою TypeScript та сучасними практиками розробки.

## Що таке Intlayer?

**Intlayer** — інноваційна open-source бібліотека для інтернаціоналізації (i18n), призначена для спрощення підтримки кількох мов у сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автозаповнення та виявлення помилок.
- **Скористатися розширеними можливостями**, такими як динамічне визначення локалі та її перемикання.
- **Увімкніть маршрутизацію з урахуванням локалі** за допомогою файлової системи маршрутизації Tanstack Start.

---

## Покроковий посібник з налаштування Intlayer у застосунку Tanstack Start

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Найкраще i18n-рішення для Tanstack Start? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Перегляньте [Шаблон додатка](https://github.com/aymericzip/intlayer-tanstack-start-template) на GitHub.

### Крок 1: Створіть проект

Почніть зі створення нового проєкту TanStack Start, дотримуючись інструкції [Створення нового проєкту](https://tanstack.com/start/latest/docs/framework/react/quick-start) на сайті TanStack Start.

### Крок 2: Встановіть пакети Intlayer

Встановіть необхідні пакети, використовуючи обраний менеджер пакетів:

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

Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer із React-застосунком. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Містить плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookie та обробки перенаправлень URL.

### Крок 3: Конфігурація вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого додатка:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, імена cookie, розташування та розширення декларацій контенту, вимкнути логування Intlayer у консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 4: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer до вашої конфігурації:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    intlayer(), // Додати плагін
  ],
});

export default config;
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у Vite-застосунку. Додатково він надає аліаси для оптимізації продуктивності.

### Крок 5: Створіть компоненти Layout

Налаштуйте кореневий layout та layout-и для конкретних локалей:

#### Кореневий Layout

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

> Тут `{-$locale}` — динамічний параметр маршруту, який підставляється поточним локалем. Ця нотація робить слот необов'язковим, що дозволяє використовувати його з режимами маршрутизації, такими як `'prefix-no-default'` тощо.

> Зауважте, що цей слот може викликати проблеми, якщо ви використовуєте кілька динамічних сегментів в одному маршруті (наприклад, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> У режимі `'prefix-all'` можливо краще змінити слот на `$locale`.
> У режимах `'no-prefix'` або `'search-params'` ви можете повністю видалити слот.

### Крок 6: Оголосіть ваш контент

Створюйте й керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        uk: "Про",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        uk: "Головна",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        uk: "Ласкаво просимо до Intlayer + TanStack Router",
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        uk: "Це приклад використання Intlayer з TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Оголошення вмісту можна визначати будь-де у вашому застосунку, за умови, що вони включені у директорію `contentDir` (за замовчуванням — `./app`) та відповідають розширенню файлу декларації вмісту (за замовчуванням — `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації зверніться до [документації з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 7: Створіть компоненти та хуки, що враховують локаль

Створіть компонент `LocalizedLink` для навігації з урахуванням локалі:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Основна утиліта
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Допоміжні типи
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Цей компонент має дві цілі:

- Видалити непотрібний префікс `{-$locale}` з URL.
- Вставити параметр локалі в URL, щоб користувач був безпосередньо перенаправлений на локалізований маршрут.

Потім ми можемо створити хук `useLocalizedNavigate` для програмної навігації:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### Крок 8: Використовуйте Intlayer на ваших сторінках

Отримуйте доступ до словників контенту по всьому застосунку:

#### Локалізована головна сторінка

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

### Крок 9: Створіть компонент перемикача локалі

Створіть компонент, щоб дозволити користувачам змінювати мову:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Локаль — наприклад FR */}
              {localeEl}
            </span>
            <span>
              {/* Назва мови у власній локалі — наприклад Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Мова в поточній локалі — наприклад «Francés», коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад «French» */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md).

### Крок 10: Додати керування атрибутами HTML (необов'язково)

Створіть хук для керування атрибутами HTML lang і dir:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
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

Потім використайте його у кореневому компоненті:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // імпортуємо хук

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // додайте цей рядок

  const { locale } = Route.useParams();
  const { defaultLocale } = useLocale();

  return (
    <IntlayerProvider
      locale={locale ?? defaultLocale} // Якщо локаль не вказана як параметр, буде використана локаль за замовчуванням
    >
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Крок 11: Додати middleware (необов'язково)

Ви також можете використовувати `intlayerProxy` для додавання маршрутизації на стороні сервера у вашому додатку. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie з локаллю. Якщо локаль не вказана, плагін визначить найбільш підходящу локаль на основі мовних налаштувань браузера користувача. Якщо локаль не буде виявлена, відбудеться перенаправлення на локаль за замовчуванням.

> Зверніть увагу, що щоб використовувати `intlayerProxy` у production, потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Проксі слід розміщувати перед сервером, якщо ви використовуєте Nitro
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### Крок 12: Інтернаціоналізуйте свої метадані (необов'язково)

Ви також можете використовувати хук `getIntlayer`, щоб отримувати ваші словники контенту по всьому застосунку:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Крок 13: Отримання локалі у серверних діях (Необов'язково)

Можливо, ви захочете отримувати поточну локаль всередині серверних дій або API-ендпоїнтів.
Ви можете зробити це за допомогою хелпера `getLocale` з `intlayer`.

Ось приклад із використанням серверних функцій TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Отримати cookie з запиту (за замовчуванням: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Отримати заголовок з запиту (за замовчуванням: 'x-intlayer-locale')
    // Резервне відпрацювання через узгодження Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Отримати певний контент за допомогою getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Крок 14: Керування сторінками «Не знайдено» (необов'язково)

Коли користувач переходить на неіснуючу сторінку, ви можете відобразити власну сторінку «не знайдено», і префікс локалі може впливати на те, як ця сторінка викликається.

#### Розуміння обробки 404 у TanStack Router з префіксами локалі

У TanStack Router обробка сторінок 404 для локалізованих маршрутів вимагає багаторівневого підходу:

1. **Виділений маршрут 404**: спеціальний маршрут для відображення інтерфейсу сторінки 404
2. **Валідація на рівні маршруту**: перевіряє префікси локалі та перенаправляє некоректні на 404
3. **Catch-all route**: Перехоплює будь-які невідповідні шляхи в межах сегмента локалі

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Це створює спеціальний маршрут /[locale]/404
// Використовується як прямий маршрут і імпортується як компонент в інших файлах
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Експортується окремо, щоб його можна було повторно використовувати в notFoundComponent та catch-all маршрутах
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad виконується перед відображенням маршруту (як на сервері, так і на клієнті)
  // Це ідеальне місце для валідації префіксу локалі
  beforeLoad: ({ params }) => {
    // Отримати локаль з параметрів маршруту (не з заголовків сервера, оскільки beforeLoad виконується і на клієнті, і на сервері)
    const localeParam = params.locale;

    // validatePrefix перевіряє, чи дійсна локаль згідно з вашою конфігурацією intlayer
    // Повертає: { isValid: boolean, localePrefix: string }
    // - isValid: true якщо префікс відповідає налаштованій локалі (або порожній, коли префікс опціональний)
    // - localePrefix: перевірений префікс або префікс локалі за замовчуванням для перенаправлень
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // Локаль дійсна, дозволяємо маршруту рендеритися як зазвичай
      return;
    }

    // Неприпустимий префікс локалі (наприклад, /xyz/about, де "xyz" не є дійсною локаллю)
    // Перенаправити на сторінку 404 з дійсним префіксом локалі
    // Це гарантує, що сторінка 404 буде правильно локалізована
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent викликається, коли дочірній маршрут не існує
  // наприклад, /en/non-existent-page спричиняє це в межах layout для /en
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // Обгортає весь сегмент локалі компонентом IntlayerProvider
    // Використовує defaultLocale, якщо параметр locale не визначений (режим необов'язкового префіксу)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout обгортає компонент 404 компонентом IntlayerProvider
// Це гарантує, що переклади працюють і на сторінці 404
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* Додати LocaleSwitcher, щоб користувачі могли змінювати мову навіть на сторінці 404 */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Маркер $ (splat/catch-all) маршрут відповідає будь-якому шляху, який не відповідає іншим маршрутам
// наприклад, /en/some/deeply/nested/invalid/path
// Це гарантує, що ВСІ невідповідні шляхи всередині локалі показуватимуть сторінку 404
// Без цього, невідповідні глибокі шляхи можуть показувати порожню сторінку або викликати помилку
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Крок 15: Налаштування TypeScript (необов'язково)

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зміцнити ваш codebase.

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... ваші наявні конфігурації
  include: [
    // ... ваші наявні includes
    ".intlayer/**/*.ts", // Включає автогенеровані типи
  ],
}
```

---

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх коміту в ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автозаповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Рухатися далі

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст у зовнішню систему, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

## Посилання на документацію

- [Документація Intlayer](https://intlayer.org)
- [Документація Tanstack Start](https://reactrouter.com/)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
- [Оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

Цей вичерпний посібник містить усе необхідне для інтеграції Intlayer з Tanstack Start для повністю інтернаціоналізованого додатка з маршрутизацією, що враховує локаль, та підтримкою TypeScript.
