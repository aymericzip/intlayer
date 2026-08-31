---
createdAt: 2025-03-25
updatedAt: 2026-08-30
title: "TanStack Start + Solid i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения TanStack Start + Solid. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
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
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Сравнение статического, динамического и кэшированного динамического разрешения словарей метаданных в функциях head маршрутов"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Добавлено для Tanstack Start Solid.js"
author: aymericzip
---

# Переведите ваш сайт на Tanstack Start с Solid.js, используя Intlayer | Интернационализация (i18n)

## Содержание

<TOC/>

Это руководство демонстрирует, как интегрировать **Intlayer** для бесшовной интернационализации в проектах Tanstack Start с Solid.js, маршрутизацией с учетом локали, поддержкой TypeScript и современными практиками разработки.

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как «react-i18next» или «i18next», Intlayer предлагает решение, которое включает в себя встроенные оптимизации, такие как:

<AccordionGroup>

<Accordion header="Полное покрытие TanStack Start">

Intlayer оптимизирован для идеальной работы с TanStack Start и Solid, предлагая **многоязычную маршрутизацию**, **карту сайта** и все функции, необходимые для масштабирования интернационализации (i18n).

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
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) на GitHub.

<Steps>

<Step number={1} title="Создание проекта">

Начните с создания нового проекта TanStack Start, следуя руководству [Запуск нового проекта](https://tanstack.com/start/latest/docs/framework/solid/quick-start) на сайте TanStack Start.

</Step>

<Step number={2} title="Установка пакетов Intlayer">

Установите необходимые пакеты с помощью вашего любимого менеджера пакетов:

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **solid-intlayer**
  Пакет, интегрирующий Intlayer в приложение Solid. Он предоставляет провайдеры контекста и хуки для интернационализации Solid.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО (middleware) для определения предпочтительной локали пользователя, управления куки и обработки перенаправлений URL.

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

> Через этот файл конфигурации вы можете настроить локализованные URL-адреса, перенаправление middleware, имена куки, местоположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={4} title="Интеграция Intlayer в конфигурацию Vite">

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов декларации контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет псевдонимы (aliases) для оптимизации производительности.

</Step>

<Step number={5} title="Создание корневого макета">

Настройте ваш корневой макет для поддержки интернационализации, используя `useParams` для определения текущей локали и устанавливая атрибуты `lang` и `dir` для тега `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
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

</Step>

<Step number={6} title="Создание макета локали">

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

> Здесь `{-$locale}` - это динамический параметр маршрута, который заменяется текущей локалью. Такая нотация делает сегмент необязательным, позволяя ему работать с такими режимами маршрутизации, как `'prefix-no-default'` и т.д.

> Имейте в виду, что этот сегмент может вызвать проблемы, если вы используете несколько динамических сегментов в одном маршруте (например, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Для режима `'prefix-all'` вы можете предпочесть заменить сегмент на `$locale`.
> Для режима `'no-prefix'` или `'search-params'` вы можете полностью удалить сегмент.

</Step>

<Step number={7} title="Декларация вашего контента">

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

> Ваши декларации контента могут быть определены в любом месте вашего приложения, при условии, что они включены в каталог `contentDir` (по умолчанию `./app`). И соответствуют расширению файлов декларации контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Подробнее см. в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={8} title="Использование локально-зависимых компонентов и хуков">

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

</Step>

<Step number={9} title="Использование Intlayer на ваших страницах">

> Используйте **`useIntlayer`** по умолчанию: это рекомендуемый способ читать контент внутри компонентов, и компилятор разрешает его в отрисовываемую локаль. Обращайтесь к `getIntlayer` / `getIntlayerAsync` только вне дерева Solid: в `head` маршрутов, загрузчиках и серверных функциях.

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
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> В Solid `useIntlayer` возвращает реактивный контент (например, `content`). Вы можете обращаться к его свойствам напрямую.
>
> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Создание компонента переключения локали">

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

> В Solid `locale` из `useLocale` - это **аксессор сигнала**. Используйте `locale()` (со скобками) для реактивного чтения текущего значения.
>
> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Управление HTML-атрибутами">

Как показано на шаге 5, вы можете управлять атрибутами `lang` и `dir` тега `html`, используя `useParams` в вашем корневом компоненте. Это гарантирует правильную установку атрибутов как на сервере, так и на клиенте.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={12} title="Добавление промежуточного ПО">

Вы также можете использовать `intlayerProxy` для добавления серверной маршрутизации в ваше приложение. Этот плагин будет автоматически определять текущую локаль на основе URL и устанавливать соответствующую локаль в куки. Если локаль не указана, плагин будет определять наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, произойдет перенаправление на локаль по умолчанию.

> Обратите внимание, что для использования `intlayerProxy` в режиме production вам необходимо перенести пакет `vite-intlayer` из `devDependencies` в `dependencies`.

> Начиная с Intlayer v9, `intlayerProxy()` встроен непосредственно в плагин `intlayer()` и включен по умолчанию через параметр `routing.enableProxy` (`true` по умолчанию). Регистрация его отдельно, как показано ниже, теперь опциональна: она сохранена для обратной совместимости и для конфигураций, которым нужно контролировать порядок плагинов. Установите `routing.enableProxy: false`, чтобы отключить эту функцию. См. [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
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
    solid(),
  ],
});
```

---

</Step>

<Step number={13} title="Интернационализация ваших метаданных">

<Tabs>

<Tab label="Статическое разрешение" value="static">

`getIntlayer` разрешается синхронно по **объединённому** словарю, то есть тому, который содержит все объявленные локали. `head` остаётся синхронным, ничего не ожидается, но весь многоязычный словарь попадает в чанк маршрута, отправляемый в браузер.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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

Подходит для небольших словарей метаданных, малого числа локалей или на этапе прототипирования.

</Tab>

<Tab label="Динамическое разрешение" value="dynamic">

`getIntlayerAsync` (доступен начиная с **v9.4**) ведёт себя как `getIntlayer`, но плагин сборки направляет его на пер-локальный чанк в `.intlayer/dynamic_dictionaries/` вместо объединённого словаря. Поэтому страница отдаёт только ту локаль, которую рендерит. Так как этот чанк загружается по требованию, `head` становится `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

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

> Если `head` читает несколько словарей, разрешайте их через `Promise.all`: ожидание каждого `getIntlayerAsync` отдельной строкой выстраивает запросы в цепочку вместо параллельного выполнения.

Компромисс: динамический импорт разрешается во время выполнения `head`, на критическом пути рендеринга документа. На «холодном» маршруте это задерживает `head` на несколько миллисекунд и может немного ухудшить **LCP**.

</Tab>

<Tab label="Кэшированное динамическое разрешение" value="cached">

Разрешите словарь в `loader` маршрута и прочитайте его обратно из `loaderData` в `head`. Загрузчики совпавших маршрутов выполняются параллельно, а `staleTime: Infinity` сообщает TanStack Router, что результат никогда не устаревает, поэтому пер-локальный чанк разрешается один раз, а затем отдаётся из кэша роутера, оставляя `head` синхронным.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

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

> `head` может быть вызван до того, как загрузчик завершится, поэтому `loaderData` типизирован как возможно `undefined`. Сохраните опциональную цепочку либо возвращайте запасной заголовок.

Вы сохраняете пер-локальный чанк, не оплачивая его стоимость на критическом пути `head`. Платой становится DX: контент приходится явно прокидывать из загрузчика в `head` через `loaderData`.

</Tab>

</Tabs>

### Какое разрешение выбрать?

|                     | Статическое разрешение | Динамическое разрешение                  | Кэшированное динамическое разрешение     |
| ------------------- | ---------------------- | ---------------------------------------- | ---------------------------------------- |
| API                 | `getIntlayer`          | `getIntlayerAsync` (v9.4+)               | `getIntlayerAsync` в `loader` (v9.4+)    |
| Сигнатура `head`    | синхронная             | `async`                                  | синхронная, читает `loaderData`          |
| Отправляемые локали | все объявленные локали | только запрошенная локаль                | только запрошенная локаль                |
| Клиентские переходы | разрешать нечего       | выполняется заново при каждом совпадении | отдаётся из кэша роутера                 |
| DX                  | самый простой          | один `await`                             | контент прокидывается через `loaderData` |

---

</Step>

<Step number={13} title="Получение локали в ваших серверных действиях">

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

</Step>

<Step number={14} title="Управление страницами 404">

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
      // Невалидный префикс локали - перенаправление на страницу 404 с валидным префиксом
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

</Step>

<Step number={15} title="Извлечение контента из ваших компонентов" isOptional={true}>

Если у вас есть существующая кодовая база, трансформация тысяч файлов может занять много времени.

Чтобы облегчить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для трансформации ваших компонентов и извлечения контента.

Для настройки добавьте раздел `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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

</Step>

<Step number={16} title="Генерация карты сайта (Sitemap)" isOptional={true}>

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

</Step>

<Step number={17} title="Настройка TypeScript">

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

</Step>

</Steps>

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения TanStack Start и Solid?">

TanStack Start не поставляется со слоем i18n, а варианты в экосистеме Solid скудны:

- **`@solid-primitives/i18n`**: плоский словарь, который вы собираете и подключаете к маршрутизатору сами.
- **`i18next`** с обёрткой для Solid: зрелые каталоги, но без интеграции с маршрутизатором TanStack, функцией `head` или этапом пре-рендеринга.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный во время сборки, с маршрутизацией с учётом локали, генерацией карты сайта, ИИ-переводом, визуальным редактором и CMS.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего TanStack Start?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md).

</Question>

<Question title="Могу ли я мигрировать с `@solid-primitives/i18n` или `i18next`, не переписывая свои компоненты?">

В значительной степени. Следуйте [руководству по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), чтобы перенести контент. Вы также можете мигрировать постепенно: [плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши существующие каталоги JSON как источник истины и генерирует из них словари Intlayer, поэтому оба слоя остаются синхронизированными, пока вы переносите компоненты по одному.

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

<Question title="Поддерживает ли Intlayer серверный рендеринг и пре-рендеринг здесь?">

Да. Контент разрешается во время SSR, а шаг 16 охватывает конфигурацию пре-рендеринга, которая выдаёт один статический документ на каждый локализованный маршрут, плюс локализованную карту сайта, сгенерированную из той же таблицы маршрутов.

</Question>

<Question title="Приводит ли смена локали к повторному рендерингу всего моего приложения?">

Нет. Контент подкреплён сигналами Solid, поэтому переключение языка обновляет только те узлы DOM, которые читают изменённые значения.

</Question>

<Question title="Как добавить теги hreflang и локализованную карту сайта?">

Используйте встроенную функцию `generateSitemap` в маршруте `src/routes/sitemap[.]xml.ts`. Она выдаёт пространство имён `xhtml:link`, поэтому каждая языковая версия страницы двунаправленно ссылается на остальные. Локализованные метаданные `head` рассматриваются в шаге 12.

</Question>

<Question title="Как обрабатывать страницы 404 на локализованных маршрутах?">

Шаг 14 охватывает это. `validatePrefix` сообщает, является ли сегмент локали в URL объявленной локалью, поэтому `/xx/about` возвращает настоящий 404 вместо того, чтобы индексироваться как дублирующая страница.

</Question>

<Question title="Должен ли я помещать локаль в URL?">

Нет. `routing.mode` принимает `"prefix-no-default"` (по умолчанию), `"prefix-all"`, `"no-prefix"` и `"search-params"`, а `routing.domains` сопоставляет каждую локаль с её собственным доменом. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как создать переключатель локали, который сохраняет текущий маршрут?">

Шаг 9 показывает компонент. `useLocale` предоставляет активную локаль, доступные локали и сеттер, который сохраняет выбор, тогда как `getLocalizedUrl` переписывает текущий путь на целевой язык, поэтому пользователь остаётся на той же странице.

</Question>

<Question title="Как автоматически перевести приложение с помощью ИИ?">

Запустите `npx intlayer fill`. Она заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS — это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
