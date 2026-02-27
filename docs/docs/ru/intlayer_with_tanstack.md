---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Tanstack Start i18n - Как перевести приложение Tanstack Start в 2026
description: Узнайте, как добавить интернационализацию (i18n) в ваше приложение Tanstack Start с помощью Intlayer. Следуйте этому подробному руководству, чтобы сделать ваше приложение многоязычным с маршрутизацией, учитывающей локаль.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Маршрутизация по локали
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Добавить команду init
  - version: 7.4.0
    date: 2025-12-11
    changes: Внедрена validatePrefix и добавлен шаг 14: Обработка страниц 404 с локализованными маршрутами.
  - version: 7.3.9
    date: 2025-12-05
    changes: Добавлен шаг 13: Получение текущей локали в ваших server actions (опционально)
  - version: 7.2.3
    date: 2025-11-18
    changes: Добавить шаг 13: Адаптация Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Исправлено значение префикса по умолчанию путем добавления функции getPrefix useLocalizedNavigate, LocaleSwitcher и LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Обновление документации
  - version: 5.8.1
    date: 2025-09-09
    changes: Добавлено для Tanstack Start
---

# Переведите ваш Tanstack Start с Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

Это руководство демонстрирует, как интегрировать **Intlayer** для бесшовной интернационализации в проектах Tanstack Start с маршрутизацией, учитывающей локаль, поддержкой TypeScript и современными практиками разработки.

## Что такое Intlayer?

**Intlayer**, это инновационная, открытая библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользоваться расширенными функциями**, такими как динамическое определение и переключение локали.
- **Включите маршрутизацию с учетом локали** с помощью файловой системы маршрутизации Tanstack Start.

---

## Пошаговое руководство по настройке Intlayer в приложении Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">
  
<iframe title="Лучшее решение i18n для Tanstack Start? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-tanstack-start-template) на GitHub.

### Шаг 1: Создайте проект

Начните с создания нового проекта TanStack Start, следуя руководству [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) на сайте TanStack Start.

### Шаг 2: Установите пакеты Intlayer

Установите необходимые пакеты, используя предпочитаемый менеджер пакетов:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **react-intlayer**
  Пакет, который интегрирует Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление через middleware, имена cookie, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 4: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию:

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
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения Vite. Дополнительно плагин предоставляет алиасы для оптимизации производительности.

### Шаг 5: Создайте корневой макет

Настройте корневой макет для поддержки интернационализации, используя `useMatches` для определения текущей локали и установив атрибуты `lang` и `dir` в теге `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Попробуйте найти локаль в параметрах любого активного совпадения
  // Это предполагает использование динамического сегмента "/{-$locale}" в дереве маршрутов
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Шаг 6: Создайте макет локали

Создайте макет, который обрабатывает префикс локали и выполняет валидацию.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
      });
    }
  },
  component: Outlet,
});
```

> Здесь `{-$locale}`, это динамический параметр маршрута, который заменяется текущей локалью. Эта нотация делает слот необязательным, позволяя ему работать с такими режимами маршрутизации, как `'prefix-no-default'` и т. д.

> Имейте в виду, что этот слот может вызвать проблемы, если вы используете несколько динамических сегментов в одном маршруте (например, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Для режима `'prefix-all'` вы можете предпочесть переключить слот на `$locale`.
> Для режимов `'no-prefix'` или `'search-params'` вы можете полностью удалить слот.

### Шаг 7: Объявите ваш контент

Создавайте и управляйте объявлениями контента для хранения переводов:

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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они включены в директорию `contentDir` (по умолчанию, `./app`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 8: Создание компонентов и хуков с поддержкой локализации

Создайте компонент `LocalizedLink` для навигации с учетом локали:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Основная утилита
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Вспомогательные типы
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

Этот компонент выполняет две задачи:

- Удаляет ненужный префикс `{-$locale}` из URL.
- Вставляет параметр локали в URL, чтобы пользователь был напрямую перенаправлен на локализованный маршрут.

Далее мы можем создать хук `useLocalizedNavigate` для программной навигации:

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

### Шаг 9: Использование Intlayer на ваших страницах

Получайте доступ к вашим словарям контента по всему приложению:

#### Локализованная главная страница

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

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md).

### Шаг 10: Создание компонента переключателя локали

Создайте компонент, который позволит пользователям менять язык:

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
              {/* Локаль - например, FR */}
              {localeEl}
            </span>
            <span>
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Язык на текущей локали - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

### Шаг 11: Управление атрибутами HTML

Как показано на шаге 5, вы можете управлять атрибутами `lang` и `dir` тега `html`, используя `useMatches` в вашем корневом компоненте. Это гарантирует правильную установку атрибутов как на сервере, так и на клиенте.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Попробуйте найти локаль в параметрах любого активного совпадения
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Шаг 12: Добавление middleware (опционально)

Вы также можете использовать `intlayerProxy` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующий cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не будет обнаружена, произойдет перенаправление на локаль по умолчанию.

> Обратите внимание, что для использования `intlayerProxy` в продакшене необходимо переместить пакет `vite-intlayer` из `devDependencies` в `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Прокси должен быть размещен перед сервером, если вы используете Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Шаг 13: Интернационализация метаданных (опционально)

Вы также можете использовать хук `getIntlayer` для доступа к вашим словарям контента во всем приложении:

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

### Шаг 14: Получение локали в серверных действиях (опционально)

Вы можете захотеть получить доступ к текущей локали внутри ваших серверных действий или конечных точек API.
Вы можете сделать это с помощью помощника `getLocale` из `intlayer`.

Вот пример использования серверных функций TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Получить cookie из запроса (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Получить заголовок из запроса (по умолчанию: 'x-intlayer-locale')
    // Резервный вариант с использованием согласования Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Получить контент с помощью getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Шаг 15: Управление страницами "не найдено" (опционально)

Когда пользователь посещает несуществующую страницу, вы можете отобразить пользовательскую страницу "не найдено", и префикс локали может повлиять на способ срабатывания страницы "не найдено".

#### Понимание обработки 404 в TanStack Router с префиксами локали

В TanStack Router обработка страниц 404 с локализованными маршрутами требует многоуровневого подхода:

1. **Выделенный маршрут 404**: Специфический маршрут для отображения интерфейса 404
2. **Проверка на уровне маршрута**: Проверяет префиксы локали и перенаправляет недействительные на 404
3. **Маршрут catch-all**: Перехватывает все несовпадающие пути в сегменте локали

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Это создает выделенный маршрут /[locale]/404
// Он используется как прямой маршрут и импортируется как компонент в других файлах
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Экспортируется отдельно, чтобы можно было повторно использовать в notFoundComponent и catch-all маршрутах
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
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad выполняется до рендеринга маршрута (как на сервере, так и на клиенте)
  // Это идеальное место для проверки префикса локали
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix проверяет, является ли локаль действительной согласно вашей конфигурации intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Недействительный префикс локали - перенаправить на страницу 404 с действительным префиксом локали
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent вызывается, когда дочерний маршрут не существует
  // например, /en/несуществующая-страница запускает это в макете /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Маршрут $ (splat/catch-all) соответствует любому пути, который не соответствует другим маршрутам
// например, /en/какой-то/глубоко/вложенный/недействительный/путь
// Это гарантирует, что ВСЕ несоответствующие пути в локали показывают страницу 404
// Без этого несоответствующие глубокие пути могут показать пустую страницу или ошибку
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Шаг 16: Настройка TypeScript (опционально)

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать вашу кодовую базу более надежной.

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы:

```json5 fileName="tsconfig.json"
{
  // ... ваши существующие настройки
  include: [
    // ... ваши существующие включения
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

---

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

## Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## Ссылки на документацию

- [Документация Intlayer](https://intlayer.org)
- [Документация Tanstack Start](https://reactrouter.com/)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
- [Объявление контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
