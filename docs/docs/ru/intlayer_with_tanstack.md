---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения TanStack Start. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Маршрутизация по локали
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Сравнение статического, динамического и кэшированного динамического разрешения словарей метаданных в функциях head маршрутов"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Внедрена validatePrefix и добавлен шаг 14: Обработка страниц 404 с локализованными маршрутами."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Добавлен шаг 13: Получение текущей локали в ваших server actions (опционально)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Добавить шаг 13: Адаптация Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Исправлено значение префикса по умолчанию путем добавления функции getPrefix useLocalizedNavigate, LocaleSwitcher и LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Обновление документации"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Добавлено для Tanstack Start"
author: aymericzip
---

# Переведите ваш Tanstack Start с Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

Это руководство демонстрирует, как интегрировать **Intlayer** для бесшовной интернационализации в проектах Tanstack Start с маршрутизацией, учитывающей локаль, поддержкой TypeScript и современными практиками разработки.

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как «react-i18next», «use-intl» или «paraglide», Intlayer предлагает решение со встроенными оптимизациями, такими как:

<AccordionGroup>

<Accordion header="Полное покрытие TanStack Start">

Intlayer полностью оптимизирован для TanStack Start и обеспечивает **многоязычную маршрутизацию**, **управление файлами cookie**, **генерацию карты сайта**, **динамическую загрузку контента** и все функции, необходимые для масштабирования ваших усилий по интернационализации (i18n).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer предлагает больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по настройке Intlayer в приложении Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее решение i18n для Tanstack Start? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-tanstack-start-template) на GitHub.

<Steps>

<Step number={1} title="Создайте проект">

Начните с создания нового проекта TanStack Start, следуя руководству [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) на сайте TanStack Start.

</Step>

<Step number={2} title="Установите пакеты Intlayer">

Установите необходимые пакеты, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **react-intlayer**
  Пакет, который интегрирует Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

</Step>

<Step number={3} title="Конфигурация вашего проекта">

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

</Step>

<Step number={4} title="Интеграция Intlayer в вашу конфигурацию Vite">

Добавьте плагин intlayer в вашу конфигурацию:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения Vite. Дополнительно плагин предоставляет алиасы для оптимизации производительности.

</Step>

<Step number={5} title="Создайте корневой макет">

Настройте корневой макет для поддержки интернационализации, используя `useParams` для определения текущей локали и установив атрибуты `lang` и `dir` в теге `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="Создайте макет локали">

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

</Step>

<Step number={7} title="Объявите ваш контент">

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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они включены в директорию `contentDir` (по умолчанию, `./app`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={8} title="Создание компонентов и хуков с поддержкой локализации">

Создайте компонент `LocalizedLink` для навигации с учетом локали:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="Использование Intlayer на ваших страницах">

> Используйте **`useIntlayer`** по умолчанию: это рекомендуемый способ читать контент внутри компонентов, и компилятор разрешает его в отрисовываемую локаль. Обращайтесь к `getIntlayer` / `getIntlayerAsync` только вне дерева React: в `head` маршрутов, загрузчиках и серверных функциях.

Получайте доступ к вашим словарям контента по всему приложению:

#### Локализованная домашняя страница

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т. д., вы можете использовать значение функции, например:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Создание компонента переключателя локали">

Создайте компонент, позволяющий пользователям изменять языки:

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
              {/* Локаль - например FR */}
              {localeEl}
            </span>
            <span>
              {/* Язык в его собственной локали - например Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Язык в текущей локали - например Francés с текущей локалью установленной в Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например French */}
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

</Step>

<Step number={10} title="Управление атрибутами HTML">

Как показано на шаге 5, вы можете управлять атрибутами `lang` и `dir` тега `html` используя `useParams` в вашем корневом компоненте. Это гарантирует, что правильные атрибуты установлены на сервере и клиенте.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Добавить middleware">

Вы также можете использовать `intlayerProxy` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующий файл cookie локали. Если локаль не указана, плагин определит наиболее подходящую локаль на основе предпочтений языка браузера пользователя. Если локаль не обнаружена, он перенаправит на локаль по умолчанию.

> Обратите внимание, что для использования `intlayerProxy` в production вам необходимо переместить пакет `vite-intlayer` из `devDependencies` в `dependencies`.

> Начиная с Intlayer v9, `intlayerProxy()` встроен непосредственно в плагин `intlayer()` и включен по умолчанию через опцию `routing.enableProxy` (`true` по умолчанию). Регистрация его отдельно, как показано ниже, теперь опциональна: она сохранена для обратной совместимости и для настроек, которым нужно контролировать порядок плагинов. Установите `routing.enableProxy: false` чтобы отключить. Смотрите [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Интернационализация ваших метаданных">

<Tabs>

<Tab label="Статическое разрешение" value="static">

`getIntlayer` разрешает синхронно против **объединённого** словаря, того, который содержит каждую объявленную локаль. `head` остаётся синхронным и ничего не ожидается, но весь многоязычный словарь вытягивается в chunk маршрута, отправляемый в браузер.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Путь для этого маршрута

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Канонический link: Указывает на текущую локализованную страницу
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Расскажите Google обо всех локализованных версиях
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Для пользователей на несоответствующих языках
        // Определите локаль по умолчанию (обычно ваш основной язык)
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

Лучше всего для небольших словарей метаданных, нескольких локалей или при прототипировании.

</Tab>

<Tab label="Динамическое разрешение" value="dynamic">

`getIntlayerAsync` (доступно с **v9.4**) ведёт себя как `getIntlayer`, но плагин сборки указывает его на chunk для конкретной локали в `.intlayer/dynamic_dictionaries/` вместо объединённого словаря. Поэтому страница доставляет только локаль, которую она отображает. Поскольку этот chunk загружается по требованию, `head` становится `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Путь для этого маршрута

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Канонический link: Указывает на текущую локализованную страницу
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Расскажите Google обо всех локализованных версиях
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Для пользователей на несоответствующих языках
        // Определите локаль по умолчанию (обычно ваш основной язык)
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

> Если `head` читает несколько словарей, разрешите их с помощью `Promise.all`: ожидание каждого `getIntlayerAsync` в отдельной строке цепляет запросы вместо параллельного выполнения.

Компромисс: динамический импорт разрешается во время выполнения `head`, на критическом пути рендера документа. На холодном маршруте это задерживает head на несколько миллисекунд и может немного ухудшить **LCP**.

</Tab>

<Tab label="Разрешение с кешированием" value="cached">

Разрешите словарь в `loader` маршрута и прочитайте его обратно из `loaderData` в `head`. Loaders совпадающих маршрутов выполняются параллельно, и `staleTime: Infinity` говорит TanStack Router, что результат никогда не устаревает, поэтому chunk для конкретной локали разрешается один раз и впоследствии подается из кеша маршрутизатора, оставляя `head` синхронным.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Разрешено параллельно с другими совпадающими маршрутами, вне критического пути head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Словарь никогда не меняется для данной локали: разрешите chunk один раз
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Путь для этого маршрута

    return {
      links: [
        // Канонический link: Указывает на текущую локализованную страницу
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Расскажите Google обо всех локализованных версиях
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Для пользователей на несоответствующих языках
        // Определите локаль по умолчанию (обычно ваш основной язык)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` может быть вызван до того, как loader завершится, поэтому `loaderData` типизируется как возможно `undefined`. Сохраните опциональную цепочку или верните резервное название.

Вы сохраняете chunk для конкретной локали без его стоимости на критическом пути head. Цена — это опыт разработчика: содержимое должно быть явно передано из loader в `head` через `loaderData`.

</Tab>

</Tabs>

### Какое разрешение выбрать?

|                      | Статическое разрешение | Динамическое разрешение    | Кэшированное динамическое разрешение   |
| -------------------- | ---------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`          | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous            | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale  | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve     | re-entered on every match  | served from the router cache           |
| Developer experience | simplest               | one `await`                | content threaded through `loaderData`  |

---

</Step>

<Step number={13} title="Получите языковой стандарт в ваших серверных действиях">

Вы можете захотеть получить доступ к текущему языковому стандарту из ваших серверных действий или конечных точек API.
Вы можете сделать это, используя помощник `getLocale` из `intlayer`.

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
    // Получите cookie из запроса (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Получите заголовок из запроса (по умолчанию: 'x-intlayer-locale')
    // Резервный вариант с использованием переговоров Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Получите некоторое содержимое, используя getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Управление страницами «не найдено»">

Когда пользователь посещает несуществующую страницу, вы можете отобразить пользовательскую страницу «не найдено», и префикс языкового стандарта может повлиять на способ срабатывания страницы «не найдено».

#### Локализованная главная страница

> Если вы хотите использовать ваше содержимое в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т. д., вы можете использовать значение функции, например:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md).

</Step>

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

</Step>

<Step number={11} title="Управление атрибутами HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Если `head` читает несколько словарей, разрешайте их через `Promise.all`: ожидание каждого `getIntlayerAsync` отдельной строкой выстраивает запросы в цепочку вместо параллельного выполнения.

Компромисс: динамический импорт разрешается во время выполнения `head`, на критическом пути рендеринга документа. На «холодном» маршруте это задерживает `head` на несколько миллисекунд и может немного ухудшить **LCP**.

</Tab>

<Tab label="Кэшированное динамическое разрешение" value="cached">

Разрешите словарь в `loader` маршрута и прочитайте его обратно из `loaderData` в `head`. Загрузчики совпавших маршрутов выполняются параллельно, а `staleTime: Infinity` сообщает TanStack Router, что результат никогда не устаревает, поэтому пер-локальный чанк разрешается один раз, а затем отдаётся из кэша роутера, оставляя `head` синхронным.

```tsx fileName="src/routes/{-$locale}/index.tsx"
      return getCookie(name, cookieString);
    },
    // Получить заголовок из запроса (по умолчанию: 'x-intlayer-locale')
    // Резервный вариант с использованием согласования Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Получить контент с помощью getIntlayer()
  const content = getIntlayer("app", locale);

````

---

</Step>

<Step number={14} title="Управление страницами &quot;не найдено&quot;">

Когда пользователь посещает несуществующую страницу, вы можете отобразить пользовательскую страницу "не найдено", и префикс локали может повлиять на способ срабатывания страницы "не найдено".

#### Понимание обработки 404 в TanStack Router с префиксами локали

В TanStack Router обработка страниц 404 с локализованными маршрутами требует многоуровневого подхода:

1. **Выделенный маршрут 404**: Специфический маршрут для отображения интерфейса 404
2. **Проверка на уровне маршрута**: Проверяет префиксы локали и перенаправляет недействительные на 404
3. **Маршрут catch-all**: Перехватывает все несовпадающие пути в сегменте локали

```tsx fileName="src/routes/{-$locale}/404.tsx"

```

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"

```

</Step>

<Step number={15} title="Извлечение содержимого ваших компонентов" isOptional={true}>

Если у вас есть существующая кодовая база, преобразование тысяч файлов может занять много времени.

Чтобы упростить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для преобразования ваших компонентов и извлечения содержимого.

Чтобы настроить его, вы можете добавить раздел `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда извлечения'>

Запустите экстрактор для преобразования компонентов и извлечения содержимого

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

bun x intlayer extract
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Или npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"

----

bun run build # Or bun run dev
import { localeFlatMap } from "intlayer";
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

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

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
{
  // ... ваши существующие настройки
  include: [
    // ... ваши существующие включения
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их фиксации в репозитории Git.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
````

---

## Расширение VS Code

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные предпросмотры** переведённого контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации об использовании расширения см. [документацию расширения Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Дальше

Чтобы пойти дальше, вы можете реализовать [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или экстернализировать ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## Ссылки на документацию

- [Документация Intlayer](https://intlayer.org)
- [Документация Tanstack Start](https://reactrouter.com/)
- [хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md)
- [хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
- [Объявление контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения TanStack Start?">

TanStack Start не поставляется с собственным слоем i18n, поэтому выбор — это библиотека:

- **`i18next` / `react-i18next`** и **`react-intl`**: независимые от фреймворка каталоги сообщений, вручную подключённые к маршрутизатору.
- **`Lingui`**: сообщения ICU с этапом компиляции.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный во время сборки, с типизированными ключами, маршрутизацией с учётом локали, генерацией карты сайта, ИИ-переводом, визуальным редактором и CMS.

Разница, которая важна в TanStack Start, — это маршрутизация и серверный рендеринг. Intlayer интегрируется с маршрутизатором на основе файлов, функцией `head` и этапом пре-рендеринга, вместо того чтобы оставлять вам сборку провайдера, детектора локали и карты сайта вручную. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего TanStack Start?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md).

</Question>

<Question title="Могу ли я мигрировать с `react-i18next` или `react-intl`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md) или [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `react-i18next`, `react-intl` и `i18next`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов — нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши компоненты, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. Шаг 15 этого руководства проводит вас через это.

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки: он сканирует исходный код JSX, TSX, Vue и Svelte при каждом изменении, генерирует словари и поддерживает их синхронизацию через горячую замену модулей, поэтому вручную поддерживать ключи вообще не нужно.

Стоит знать о двух ограничениях, прежде чем включать компилятор. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, такие как коды ошибок API или поля CMS, остаются недоступными. И ему нужно отличать текст, видимый пользователю, от логики приложения вроде `className="active"` или кода статуса, что требует нескольких аннотаций в большой кодовой базе. [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) избегает обоих ограничений, оставляя вас в процессе.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Поддерживает ли Intlayer серверный рендеринг и пре-рендеринг в TanStack Start?">

Да. Контент разрешается во время SSR, а руководство охватывает конфигурацию пре-рендеринга, которая выдаёт один статический документ на каждый локализованный маршрут. Шаг 16 показывает, как включить `prerender` в `vite.config.ts` и сгенерировать локализованную карту сайта из той же таблицы маршрутов.

</Question>

<Question title="Как добавить теги hreflang и локализованную карту сайта?">

Используйте встроенную функцию `generateSitemap` в маршруте `src/routes/sitemap[.]xml.ts`. В отличие от простого списка URL, она выдаёт пространство имён `xhtml:link`, поэтому каждая языковая версия страницы двунаправленно ссылается на остальные, и поисковые системы индексируют правильную для каждой аудитории. Локализованные метаданные `head` рассматриваются в шаге 12.

</Question>

<Question title="Должен ли я помещать локаль в URL?">

Нет. `routing.mode` управляет схемой URL: `"prefix-no-default"` (по умолчанию, `/about` и `/fr/about`), `"prefix-all"` (`/en/about`), `"no-prefix"` (разрешается из cookie, заголовка или домена) или `"search-params"` (`/about?locale=fr`). Локали также можно сопоставить с отдельными доменами с помощью `routing.domains`. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как создать переключатель локали, который сохраняет текущий маршрут?">

Используйте `useLocale` вместе с локализованным компонентом ссылки, описанным в шаге 9. `useLocale` предоставляет активную локаль, доступные локали и сеттер, который сохраняет выбор, тогда как `getLocalizedUrl` переписывает текущий путь на целевой язык, поэтому пользователь остаётся на той же странице вместо того, чтобы попасть на главную.

</Question>

<Question title="Как обрабатывать страницы 404 на локализованных маршрутах?">

Шаг 14 охватывает это. `validatePrefix` сообщает, является ли сегмент локали в URL объявленной локалью, поэтому `/xx/about` возвращает настоящий 404 вместо того, чтобы обрабатываться как путь. Без него неизвестный префикс молча разрешается, и поисковые системы индексируют дублирующую страницу.

</Question>

<Question title="Как автоматически перевести приложение TanStack Start с помощью ИИ?">

Запустите `npx intlayer fill`. CLI находит недостающие переводы и заполняет их с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ. Добавьте `--git-diff`, чтобы перевести только контент, изменённый в текущей ветке, что делает запуски CI дешёвыми. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да. Объявления контента поддерживают [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) и [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) для длинного текста, с [форматтерами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте на работающем сайте, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS — это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
