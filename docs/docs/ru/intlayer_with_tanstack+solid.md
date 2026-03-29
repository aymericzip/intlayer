---
createdAt: 2025-03-25
updatedAt: 2026-03-29
title: i18n Tanstack Start — Как перевести приложение Tanstack Start с использованием Solid.js в 2026 году
description: Узнайте, как добавить интернационализацию (i18n) в ваше приложение Tanstack Start с помощью Intlayer и Solid.js. Следуйте этому подробному руководству, чтобы сделать ваше приложение многоязычным с маршрутизацией, учитывающей локаль.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Маршрутизация локалей
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Добавлено для Tanstack Start Solid.js"
---

# Переведите ваш сайт на Tanstack Start с Solid.js, используя Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

Это руководство демонстрирует, как интегрировать **Intlayer** для бесшовной интернационализации в проектах Tanstack Start с Solid.js, маршрутизацией с учетом локали, поддержкой TypeScript и современными практиками разработки.

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения многоязычной поддержки в современных веб-приложениях.

С Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автоматически генерируемых типов, что улучшает автодополнение и обнаружение ошибок.
- **Пользоваться расширенными функциями**, такими как динамическое определение и переключение локали.
- **Включить маршрутизацию с учетом локали** с помощью файловой системы маршрутизации Tanstack Start.

---

## Пошаговое руководство по настройке Intlayer в приложении Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">
  
<iframe title="Лучшее решение i18n для Tanstack Start? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) на GitHub.

### Шаг 1: Создание проекта

Начните с создания нового проекта TanStack Start, следуя руководству [Запуск нового проекта](https://tanstack.com/start/latest/docs/framework/solid/quick-start) на сайте TanStack Start.

### Шаг 2: Установка пакетов Intlayer

Установите необходимые пакеты с помощью вашего любимого менеджера пакетов:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **solid-intlayer**
  Пакет, интегрирующий Intlayer в приложение Solid. Он предоставляет провайдеры контекста и хуки для интернационализации Solid.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО (middleware) для определения предпочтительной локали пользователя, управления куки и обработки перенаправлений URL.

### Шаг 3: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

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

> Через этот файл конфигурации вы можете настроить локализованные URL-адреса, перенаправление middleware, имена куки, местоположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 4: Интеграция Intlayer в конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию:

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

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов декларации контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет псевдонимы (aliases) для оптимизации производительности.

### Шаг 5: Создание корневого макета (Root Layout)

Настройте ваш корневой макет для поддержки интернационализации, используя `useMatches` для определения текущей локали и устанавливая атрибуты `lang` и `dir` для тега `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Попытка найти локаль в параметрах любого активного совпадения
  // Это предполагает, что вы используете динамический сегмент "/{-$locale}" в дереве маршрутов
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Шаг 6: Создание макета локали (необязательно)

Создайте макет, который обрабатывает префикс локали и выполняет валидацию. Этот макет гарантирует, что будут обрабатываться только допустимые локали.

> Этот шаг является необязательным, если вам не нужно проверять префикс локали на уровне маршрута.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Валидация префикса локали
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

> Здесь `{-$locale}` — это динамический параметр маршрута, который заменяется текущей локалью. Такая нотация делает сегмент необязательным, позволяя ему работать с такими режимами маршрутизации, как `'prefix-no-default'` и т.д.

> Имейте в виду, что этот сегмент может вызвать проблемы, если вы используете несколько динамических сегментов в одном маршруте (например, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Для режима `'prefix-all'` вы можете предпочесть заменить сегмент на `$locale`.
> Для режима `'no-prefix'` или `'search-params'` вы можете полностью удалить сегмент.

### Шаг 7: Декларация вашего контента

Создавайте и управляйте декларациями контента для хранения переводов:

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

> Ваши декларации контента могут быть определены в любом месте вашего приложения, при условии, что они включены в каталог `contentDir` (по умолчанию `./app`). И соответствуют расширению файлов декларации контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Подробнее см. в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 8: Использование локально-зависимых компонентов и хуков

Создайте компонент `LocalizedLink` для навигации с учетом локали:

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

Этот компонент преследует две цели:

- Удаление ненужного префикса `{-$locale}` из URL.
- Внедрение параметра локали в URL, чтобы пользователь был напрямую перенаправлен на локализованный маршрут.

Затем мы можем создать хук `useLocalizedNavigate` для программной навигации:

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

### Шаг 9: Использование Intlayer на ваших страницах

Получайте доступ к вашим словарям контента во всем приложении:

#### Локализованная домашняя страница

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

> В Solid хук `useIntlayer` возвращает функцию-**аксессор** (например, `content()`). Вы должны вызвать эту функцию для доступа к реактивному контенту.
>
> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useIntlayer.md).

### Шаг 10: Создание компонента переключения локали

Создайте компонент, позволяющий пользователям менять языки:

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

> В Solid `locale` из `useLocale` — это **аксессор сигнала**. Используйте `locale()` (со скобками) для реактивного чтения текущего значения.
>
> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useLocale.md).

### Шаг 11: Управление HTML-атрибутами

Как показано на шаге 5, вы можете управлять атрибутами `lang` и `dir` тега `html`, используя `useMatches` в вашем корневом компоненте. Это гарантирует правильную установку атрибутов как на сервере, так и на клиенте.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Попытка найти локаль в параметрах любого активного совпадения
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Шаг 12: Добавление промежуточного ПО (необязательно)

Вы также можете использовать `intlayerProxy` для добавления серверной маршрутизации в ваше приложение. Этот плагин будет автоматически определять текущую локаль на основе URL и устанавливать соответствующую локаль в куки. Если локаль не указана, плагин будет определять наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, произойдет перенаправление на локаль по умолчанию.

> Обратите внимание, что для использования `intlayerProxy` в режиме production вам необходимо перенести пакет `vite-intlayer` из `devDependencies` в `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Прокси должен быть размещен перед сервером, если вы используете Nitro
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

### Шаг 13: Интернационализация ваших метаданных (необязательно)

Вы также можете использовать функцию `getIntlayer` для доступа к вашим словарям контента внутри загрузчика `head` для метаданных с учетом локали:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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

### Шаг 13: Получение локали в ваших серверных действиях (необязательно)

Возможно, вы захотите получить доступ к текущей локали внутри ваших серверных действий (server actions) или конечных точек API.
Вы можете сделать это с помощью помощника `getLocale` из `intlayer`.

Вот пример использования серверных функций TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Получение куки из запроса (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Получение заголовка из запроса (по умолчанию: 'x-intlayer-locale')
    // Запасной вариант с использованием согласования Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Получение контента с помощью getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Шаг 14: Управление страницами 404 (необязательно)

Когда пользователь посещает несуществующую страницу, вы можете отобразить кастомную страницу 404. Префикс локали может влиять на то, как срабатывает страница "Запрашиваемый ресурс не найден".

#### Понимание обработки 404 в TanStack Router с префиксами локалей

В TanStack Router обработка страниц 404 с локализованными маршрутами требует многоуровневого подхода:

1. **Выделенный маршрут 404**: Специальный маршрут для отображения интерфейса 404.
2. **Валидация на уровне маршрута**: Проверяет префиксы локалей и перенаправляет невалидные на 404.
3. **Универсальный маршрут (Catch-all)**: Перехватывает любые несовпадающие пути внутри сегмента локали.

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Создает выделенный маршрут /[locale]/404
// Используется как прямой маршрут и импортируется как компонент в другие файлы
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Экспортируется отдельно, чтобы его можно было использовать в notFoundComponent и catch-all маршрутах
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
  // beforeLoad выполняется перед рендерингом маршрута (на сервере и на клиенте)
  // Это идеальное место для валидации префикса локали
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix проверяет, валидна ли локаль согласно вашему конфигу intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Невалидный префикс локали — перенаправление на страницу 404 с валидным префиксом
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent вызывается, когда дочерний маршрут не существует
  // напр., /en/non-existent-page вызывает это внутри макета /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Маршрут $ (splat/catch-all) совпадает с любым путем, который не подошел под другие маршруты
// напр., /en/some/deeply/nested/invalid/path
// Это гарантирует, что ВСЕ несовпадающие пути внутри локали покажут страницу 404
// Без этого глубокие несовпадающие пути могли бы показать пустую страницу или ошибку
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (Необязательно) Шаг 15: Извлечение контента из ваших компонентов

Если у вас есть существующая кодовая база, трансформация тысяч файлов может занять много времени.

Чтобы облегчить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для трансформации ваших компонентов и извлечения контента.

Для настройки добавьте раздел `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Остальная часть конфига
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     *
     * - Если `true`, компилятор перезапишет файл компонента на диске. Таким образом, трансформация станет постоянной, и компилятор пропустит ее при следующем запуске. Таким образом, компилятор может трансформировать приложение, а затем его можно удалить.
     *
     * - Если `false`, компилятор будет внедрять вызов функции `useIntlayer()` в код только в выходных файлах сборки, оставляя основную базу кода нетронутой. Трансформация будет выполняться только в памяти.
     */
    saveComponents: false,

    /**
     * Префикс ключей словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Остальная часть конфига
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     *
     * - Если `true`, компилятор перезапишет файл компонента на диске. Таким образом, трансформация станет постоянной, и компилятор пропустит ее при следующем запуске. Таким образом, компилятор может трансформировать приложение, а затем его можно удалить.
     *
     * - Если `false`, компилятор будет внедрять вызов функции `useIntlayer()` в код только в выходных файлах сборки, оставляя основную базу кода нетронутой. Трансформация будет выполняться только в памяти.
     */
    saveComponents: false,

    /**
     * Префикс ключей словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Остальная часть конфига
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     *
     * - Если `true`, компилятор перезапишет файл компонента на диске. Таким образом, трансформация станет постоянной, и компилятор пропустит ее при следующем запуске. Таким образом, компилятор может трансформировать приложение, а затем его можно удалить.
     *
     * - Если `false`, компилятор будет внедрять вызов функции `useIntlayer()` в код только в выходных файлах сборки, оставляя основную базу кода нетронутой. Трансформация будет выполняться только в памяти.
     */
    saveComponents: false,

    /**
     * Префикс ключей словаря
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='Команда extract'>

Запустите экстрактор для трансформации ваших компонентов и извлечения контента:

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
 <Tab value='Babel-компилятор'>

Обновите ваш `vite.config.ts`, включив плагин `intlayerCompiler`:

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

---

### Шаг 16: Генерация карты сайта (Sitemap) (опционально)

Intlayer поставляется со встроенным генератором карты сайта, который поможет вам легко создать карту сайта для вашего приложения. Он учитывает локализованные маршруты и добавляет необходимые метаданные для поисковых систем.

> Создаваемая Intlayer карта сайта поддерживает пространство имен `xhtml:link` (Hreflang XML Extensions). В отличие от стандартных генераторов карт сайта, которые просто перечисляют прямые URL-адреса, Intlayer автоматически создает необходимые двусторонние связи между всеми языковыми версиями страницы (например, `/about`, `/about?lang=fr` и `/about?lang=es`). Это гарантирует, что поисковые системы будут правильно индексировать и показывать нужную языковую версию соответствующей аудитории.

Чтобы использовать его, вам сначала нужно настроить ваш файл `vite.config.ts`, чтобы включить предварительный рендеринг (pre-rendering) для ваших локализованных маршрутов и отключить генерацию карты сайта по умолчанию в TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... другие импорты

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... другие плагины
    tanstackStart({
      // ... другие настройки
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Затем создайте маршрут `src/routes/sitemap[.]xml.ts`, который использует функцию `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
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
      },
    },
  },
});
```

---

### Шаг 17: Настройка TypeScript (необязательно)

Intlayer использует расширение модулей (module augmentation), чтобы задействовать преимущества TypeScript и сделать вашу кодовую базу более надежной.

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы:

```json5 fileName="tsconfig.json"
{
  // ... ваши существующие настройки
  include: [
    // ... ваши существующие пути
    ".intlayer/**/*.ts", // Включение автоматически генерируемых типов
  ],
}
```

---

### Конфигурация Git

Рекомендуется игнорировать файлы, генерируемые Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Для этого добавьте следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, генерируемые Intlayer
.intlayer
```

---

## Расширение VS Code

Для улучшения процесса разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенная предварительный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Что дальше?

Для дальнейшего развития вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю систему, используя [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## Ссылки на документацию

- [Документация Intlayer](https://intlayer.org)
- [Документация Tanstack Start](https://tanstack.com/start/latest)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useIntlayer.md)
- [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useLocale.md)
- [Декларация контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
