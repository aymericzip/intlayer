---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: i18n Tanstack Start - Як перекласти додаток Tanstack Start за допомогою Solid.js у 2026 році
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого додатка Tanstack Start за допомогою Intlayer та Solid.js. Дотримуйтесь цього вичерпного посібника, щоб зробити свій додаток багатомовним із маршрутизацією, що враховує локаль.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Маршрутизація мов
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Додано для Tanstack Start Solid.js"
---

# Перекладіть свій вебсайт Tanstack Start + Solid.js за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

Цей посібник демонструє, як інтегрувати **Intlayer** для безперешкодної інтернаціоналізації в проектах Tanstack Start із Solid.js, маршрутизацією з урахуванням локалі, підтримкою TypeScript та сучасними практиками розробки.

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим кодом, розроблена для спрощення підтримки багатьох мов у сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані, маршрути та вміст**.
- **Забезпечити підтримку TypeScript** за допомогою автоматично згенерованих типів, покращуючи автодоповнення та виявлення помилок.
- **Користуватися розширеними функціями**, такими як динамічне визначення та перемикання локалі.
- **Увімкнути маршрутизацію з урахуванням локалі** за допомогою файлової системи маршрутизації Tanstack Start.

---

## Покроковий посібник із налаштування Intlayer у додатку Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще рішення i18n для Tanstack Start? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати свій додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Перегляньте [Шаблон додатка](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) на GitHub.

### Крок 1: Створення проекту

Спочатку створіть новий проект TanStack Start, дотримуючись посібника [Початок нового проекту](https://tanstack.com/start/latest/docs/framework/solid/quick-start) на вебсайті TanStack Start.

### Крок 2: Встановлення пакетів Intlayer

Встановіть необхідні пакети за допомогою бажаного менеджера пакетів:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **solid-intlayer**
  Пакет, що інтегрує Intlayer у додаток Solid. Він надає контекстні провайдери та хуки для інтернаціоналізації Solid.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення (middleware) для визначення бажаної локалі користувача, керування файлами cookie та обробки перенаправлення URL-адрес.

### Крок 3: Конфігурація вашого проекту

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

> За допомогою цього файлу конфігурації можна налаштувати локалізовані URL-адреси, перенаправлення через middleware, назви файлів cookie, розташування та розширення ваших декларацій вмісту, вимкнути логи Intlayer у консолі тощо. Повний список доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 4: Інтеграція Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує збірку файлів декларації вмісту та моніторить їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає псевдоніми (aliases) для зменшення накладних витрат на продуктивність.

### Крок 5: Створення кореневого макета (Root Layout)

Налаштуйте свій кореневий макет для підтримки інтернаціоналізації, використовуючи `useParams` для визначення поточної локалі та встановлюючи атрибути `lang` і `dir` на тегу `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

### Крок 6: Створення макета локалі (опціонально)

Створіть макет, який обробляє префікс локалі та виконує валідацію. Цей макет гарантуватиме, що обробляються лише дійсні локалі.

> Цей крок є необов'язковим, якщо вам не потрібно валідувати префікс локалі на рівні маршруту.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Валідуйте префікс локалі
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Тут `{-$locale}` — це динамічний параметр маршруту, який замінюється поточною локаллю. Така нотація робить слот необов'язковим, дозволяючи йому працювати з такими режимами маршрутизації, як `'prefix-no-default'` тощо.

> Майте на увазі, що цей слот може спричинити проблеми, якщо ви використовуєте кілька динамічних сегментів в одному маршруті (наприклад: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Для режиму `'prefix-all'` ви можете віддати перевагу перемиканню слота на `$locale`.
> Для режиму `'no-prefix'` або `'search-params'` ви можете повністю видалити цей слот.

### Крок 7: Декларування вмісту

Створюйте декларації вмісту та керуйте ними для зберігання перекладів:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
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

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, за умови, що вони включені в каталог `contentDir` (за замовчуванням `./app`). І відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Докладнішу інформацію див. у [документації з декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 8: Використання компонентів та хуків з урахуванням локалі

Створіть компонент `LocalizedLink` для навігації з урахуванням локалі:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Цей компонент виконує дві функції:

- Видалення непотрібного префікса `{-$locale}` з URL.
- Вставлення параметра локалі в URL, щоб користувач був перенаправлений безпосередньо на локалізований маршрут.

Потім ми можемо створити хук `useLocalizedNavigate` для програмної навігації:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### Крок 9: Використання Intlayer на ваших сторінках

Отримуйте доступ до своїх словників вмісту в усьому додатку:

#### Локалізована домашня сторінка

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> у Solid `useIntlayer` повертає функцію **accessor** (наприклад, `content()`). Ви повинні викликати цю функцію, щоб отримати доступ до реактивного вмісту.
>
> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useIntlayer.md).

### Крок 10: Створення компонента перемикання локалі

Створіть компонент, який дозволить користувачам змінювати мову:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> у файлах Solid `locale` з `useLocale` є **signal accessor**. Використовуйте `locale()` (з дужками), щоб реактивно читати його поточне значення.
>
> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useLocale.md).

### Крок 11: Керування атрибутами HTML

Як було показано на кроці 5, ви можете керувати атрибутами `lang` і `dir` тегу `html`, використовуючи `useParams` у вашому кореневому компоненті. Це гарантує, що правильні атрибути встановлено як на сервері, так і на клієнті.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Крок 12: Додавання Middleware (опціонально)

Ви також можете використовувати `intlayerProxy`, щоб додати маршрутизацію на стороні сервера до вашого додатка. Цей плагін автоматично визначатиме поточну локаль на основі URL-адреси та встановлюватиме відповідний файл cookie локалі. Якщо локаль не вказано, плагін визначить найбільш підходящу локаль на основі налаштувань мови браузера користувача. Якщо локаль не виявлено, він перенаправить на локаль за замовчуванням.

> Зверніть увагу, що для використання `intlayerProxy` у продакшні вам потрібно перенести пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Проксі слід розміщувати перед сервером, якщо ви використовуєте Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Крок 13: Інтернаціоналізація ваших метаданих (опціонально)

Ви також можете використовувати функцію `getIntlayer`, щоб отримати доступ до ваших словників вмісту в завантажувачі `head` для метаданих з урахуванням локалі:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

### Крок 14: Отримання локалі у ваших діях на сервері (опціонально)

Ви можете захотіти отримати доступ до поточної локалі з ваших серверних дій (server actions) або кінцевих точок API.
Ви можете зробити це за допомогою допоміжної функції `getLocale` з `intlayer`.

Ось приклад з використанням серверних функцій TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Отримати кукі з запиту (за замовчуванням: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Отримати заголовок з запиту (за замовчуванням: 'x-intlayer-locale')
    // Запасний варіант з використанням узгодження Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Отримати якийсь вміст за допомогою getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Крок 15: Керування сторінками "не знайдено" (404) (опціонально)

Коли користувач відвідує неіснуючу сторінку, ви можете відобразити власну сторінку "не знайдено", і префікс локалі може вплинути на те, як ця сторінка запускається.

#### Розуміння обробки 404 в TanStack Router з префіксами локалі

У TanStack Router обробка сторінок 404 з локалізованими маршрутами вимагає багаторівневого підходу:

1. **Спеціальний маршрут 404**: Окремий маршрут для відображення інтерфейсу 404
2. **Валідація на рівні маршруту**: Перевіряє префікси локалі та перенаправляє недійсні на 404
3. **Catch-all маршрут**: Захоплює будь-які шляхи, що не збігаються, всередині сегмента локалі

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Це створює спеціальний маршрут /[locale]/404
// Він використовується і як прямий маршрут, і як компонент в інших файлах
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
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad запускається перед рендерингом маршруту (і на сервері, і на клієнті)
  // Це ідеальне місце для валідації префікса локалі
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix перевіряє, чи є локаль дійсною відповідно до вашої конфігурації intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Недійсний префікс локалі — перенаправлення на сторінку 404 з дійсним префіксом локалі
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent викликається, коли дочірній маршрут не існує
  // напр.: /en/неіснуюча-сторінка запускає це всередині макета /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Маршрут $ (splat/catch-all) збігається з будь-яким шляхом, що не збігається з іншими маршрутами
// напр.: /en/якийсь/глибоко/вкладений/недійсний/шлях
// Це гарантує, що ВСІ невідповідні шляхи всередині локалі показують сторінку 404
// Без цього глибокі невідповідні шляхи могли б показувати порожню сторінку або помилку
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (Опціонально) Крок 16: Вилучення вмісту з ваших компонентів

Якщо у вас є існуюча кодова база, трансформація тисяч файлів може зайняти багато часу.

Щоб полегшити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для трансформації ваших компонентів та вилучення вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи слід увімкнути компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи слід зберігати компоненти після їх трансформації.
     *
     * - Якщо `true`, компілятор перезапише файл компонента на диску. Таким чином, трансформація буде постійною, і компілятор пропустить трансформацію для наступного процесу. У такий спосіб компілятор може трансформувати додаток, після чого його можна буде видалити.
     *
     * - Якщо `false`, компілятор вставить виклик функції `useIntlayer()` у код лише у вихідних даних збірки, зберігши базову кодову базу недоторканою. Трансформація проводитиметься лише в пам'яті.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи слід увімкнути компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи слід зберігати компоненти після їх трансформації.
     *
     * - Якщо `true`, компілятор перезапише файл компонента на диску. Таким чином, трансформація буде постійною, і компілятор пропустить трансформацію для наступного процесу. У такий спосіб компілятор може трансформувати додаток, після чого його можна буде видалити.
     *
     * - Якщо `false`, компілятор вставить виклик функції `useIntlayer()` у код лише у вихідних даних збірки, зберігши базову кодову базу недоторканою. Трансформація проводитиметься лише в пам'яті.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Решта вашої конфігурації
  compiler: {
    /**
     * Вказує, чи слід увімкнути компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи слід зберігати компоненти після їх трансформації.
     *
     * - Якщо `true`, компілятор перезапише файл компонента на диску. Таким чином, трансформація буде постійною, і компілятор пропустить трансформацію для наступного процесу. У такий спосіб компілятор може трансформувати додаток, після чого його можна буде видалити.
     *
     * - Якщо `false`, компілятор вставить виклик функції `useIntlayer()` у код лише у вихідних даних збірки, зберігши базову кодову базу недоторканою. Трансформація проводитиметься лише в пам'яті.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='Команда extract'>

Запустіть екстрактор, щоб трансформувати ваші компоненти та вилучити вміст

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
 <Tab value='Компілятор Babel'>

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # Або rpm run dev
```

```bash packageManager="pnpm"
pnpm run build # Або pnpm run dev
```

```bash packageManager="yarn"
yarn build # Або yarn dev
```

```bash packageManager="bun"
bun run build # Або bun run dev
```

 </Tab>
</Tabs>

---

### Крок 17: Конфігурація TypeScript (опціонально)

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript і зміцнити вашу кодову базу.

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... ваші існуючі налаштування
  include: [
    // ... ваші існуючі включення
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

---

### Конфігурація Git

Ми рекомендуємо ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх фіксації (commit) у вашому репозиторії Git.

Для цього ви можете додати наступні інструкції до свого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

---

## Розширення VS Code

Щоб покращити свій досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення пропонує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд (inline previews)** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Докладніше про те, як користуватися розширенням, див. у [документації до розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Подальші кроки

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

## Посилання на документацію

- [Документація Intlayer](https://intlayer.org)
- [Документація Tanstack Start](https://tanstack.com/start/latest)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useLocale.md)
- [Декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
