---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку TanStack Start. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Порівняння статичного, динамічного та кешованого динамічного розвʼязання словників метаданих у функціях head маршрутів"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Представлено validatePrefix та додано крок 14: Обробка сторінок 404 з локалізованими маршрутами."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Додано крок 13: Отримання локалі у server actions (необов'язково)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Додано крок 13: Адаптувати Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Виправлено значення префікса за замовчуванням, додавши функцію getPrefix, useLocalizedNavigate, LocaleSwitcher та LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Оновлено документацію"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Додано для Tanstack Start"
author: aymericzip
---

# Перекладіть ваш вебсайт Tanstack Start за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

Цей посібник демонструє, як інтегрувати **Intlayer** для плавної інтернаціоналізації в проєктах Tanstack Start з маршрутизацією, що враховує локаль, підтримкою TypeScript та сучасними практиками розробки.

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-i18next` або `use-intl` або `paraglide`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка TanStack Start">

Intlayer повністю оптимізовано для TanStack Start, забезпечуючи **багатомовну маршрутизацію**, **керування файлами cookie**, **генерацію карти сайту**, **динамічне завантаження вмісту** та всі функції, необхідні для масштабування ваших зусиль з інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покроковий посібник з налаштування Intlayer у застосунку Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">

<iframe title="Найкраще i18n-рішення для Tanstack Start? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox, як інтернаціоналізувати ваш додаток за допомогою Intlayer"
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

Перегляньте [Шаблон додатка](https://github.com/aymericzip/intlayer-tanstack-start-template) на GitHub.

<Steps>

<Step number={1} title="Створіть проект">

Почніть зі створення нового проєкту TanStack Start, дотримуючись інструкції [Створення нового проєкту](https://tanstack.com/start/latest/docs/framework/react/quick-start) на сайті TanStack Start.

</Step>

<Step number={2} title="Встановіть пакети Intlayer">

Встановіть необхідні пакети, використовуючи обраний менеджер пакетів:

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

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

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

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer із React-застосунком. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Містить плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookie та обробки перенаправлень URL.

</Step>

<Step number={3} title="Конфігурація вашого проєкту">

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

</Step>

<Step number={4} title="Інтегруйте Intlayer у вашу конфігурацію Vite">

Додайте плагін intlayer до вашої конфігурації:

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

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у Vite-застосунку. Додатково він надає аліаси для оптимізації продуктивності.

</Step>

<Step number={5} title="Створіть кореневий Layout">

Налаштуйте кореневий layout для підтримки інтернаціоналізації, використовуючи `useParams` для визначення поточної локалі та встановлення атрибутів `lang` і `dir` на тезі `html`.

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

<Step number={6} title="Створіть Locale Layout">

Створіть layout, який обробляє префікс локалі та виконує валідацію.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Валідація префіксу локалі
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

> Тут `{-$locale}`, динамічний параметр маршруту, який підставляється поточним локалем. Ця нотація робить слот необов'язковим, що дозволяє використовувати його з режимами маршрутизації, такими як `'prefix-no-default'` тощо.

> Зауважте, що цей слот може викликати проблеми, якщо ви використовуєте кілька динамічних сегментів в одному маршруті (наприклад, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> У режимі `'prefix-all'` можливо краще змінити слот на `$locale`.
> У режимах `'no-prefix'` або `'search-params'` ви можете повністю видалити слот.

</Step>

<Step number={7} title="Оголосіть ваш контент">

Створюйте й керуйте деклараціями контенту для зберігання перекладів:

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

> Оголошення вмісту можна визначати будь-де у вашому застосунку, за умови, що вони включені у директорію `contentDir` (за замовчуванням, `./app`) та відповідають розширенню файлу декларації вмісту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для детальнішої інформації зверніться до [документації з оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={8} title="Створіть компоненти та хуки, що враховують локаль">

Створіть компонент `LocalizedLink` для навігації з урахуванням локалі:

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

Цей компонент має дві цілі:

- Видалити непотрібний префікс `{-$locale}` з URL.
- Вставити параметр локалі в URL, щоб користувач був безпосередньо перенаправлений на локалізований маршрут.

Потім ми можемо створити хук `useLocalizedNavigate` для програмної навігації:

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

<Step number={9} title="Використовуйте Intlayer на ваших сторінках">

> Використовуйте **`useIntlayer`** за замовчуванням: це рекомендований спосіб читати контент усередині компонентів, і компілятор розвʼязує його у локаль, яка рендериться. Звертайтеся до `getIntlayer` / `getIntlayerAsync` лише поза деревом React — у `head` маршрутів, лоадерах і серверних функціях.

Отримуйте доступ до словників контенту по всьому застосунку:

#### Локалізована головна сторінка

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

> Якщо ви хочете використовувати ваш вміст у атрибуті `string`, такому як `alt`, `title`, `href`, `aria-label` тощо, ви можете використовувати значення функції, як от:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Створіть компонент перемикача локалі">

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
              {/* Локаль, наприклад FR */}
              {localeEl}
            </span>
            <span>
              {/* Назва мови у власній локалі, наприклад Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Мова в поточній локалі, наприклад «Francés», коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською, наприклад «French» */}
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

</Step>

<Step number={11} title="Керування атрибутами HTML">

const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
const params = localeRoute.useParams();
const locale = params?.locale ?? defaultLocale;

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

````

---

</Step>

<Step number={12} title="Додати middleware">

Ви також можете використовувати `intlayerProxy` для додавання маршрутизації на стороні сервера у вашому додатку. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie з локаллю. Якщо локаль не вказана, плагін визначить найбільш підходящу локаль на основі мовних налаштувань браузера користувача. Якщо локаль не буде виявлена, відбудеться перенаправлення на локаль за замовчуванням.

> Зверніть увагу, що щоб використовувати `intlayerProxy` у production, потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

> Починаючи з Intlayer v9, `intlayerProxy()` включена безпосередньо в плагін `intlayer()` і за замовчуванням ввімкнена через опцію `routing.enableProxy` (`true` за замовчуванням). Реєстрація її окремо, як показано нижче, тепер є необов'язковою — вона зберігається для зворотної сумісності та для налаштувань, які потребують контролю порядку плагінів. Встановіть `routing.enableProxy: false`, щоб відмовитися від цього. Див. [примітки до випуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/releases/v9.md).

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
````

---

</Step>

<Step number={13} title="Інтернаціоналізуйте свої метадані">

Усередині компонентів продовжуйте використовувати **`useIntlayer`** — він залишається варіантом за замовчуванням. Компілятор переписує його на чанк словника тієї локалі, що дійсно рендериться, тож у браузер не потрапляє нічого зайвого.

Функції `head` маршрутів виконуються **поза** деревом React, тому `useIntlayer` там недоступний. Є три способи прочитати словник із `head`, і кожен балансує між розміром бандла та тим, наскільки рано готовий `head` документа.

<Tabs defaultTab="cached">

<Tab label="Статичне розвʼязання" value="static">

`getIntlayer` розвʼязується синхронно за **обʼєднаним** словником — тим, що містить усі оголошені локалі. `head` лишається синхронним і нічого не очікує, але весь багатомовний словник потрапляє до чанка маршруту, який надсилається у браузер.

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

Найкраще для невеликих словників метаданих, кількох локалей або на етапі прототипування.

</Tab>

<Tab label="Динамічне розвʼязання" value="dynamic">

`getIntlayerAsync` — доступний починаючи з **v9.4** — поводиться як `getIntlayer`, але плагін збірки спрямовує його на пер-локальний чанк у `.intlayer/dynamic_dictionaries/` замість обʼєднаного словника. Тож сторінка віддає лише ту локаль, яку рендерить. Оскільки цей чанк завантажується на вимогу, `head` стає `async`:

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

> Якщо `head` читає кілька словників, розвʼязуйте їх через `Promise.all` — очікування кожного `getIntlayerAsync` окремим рядком вибудовує запити в ланцюжок замість паралельного виконання.

Компроміс: динамічний імпорт розвʼязується під час виконання `head`, на критичному шляху рендерингу документа. На «холодному» маршруті це затримує `head` на кілька мілісекунд і може трохи погіршити **LCP**.

</Tab>

<Tab label="Кешоване динамічне розвʼязання" value="cached">

Розвʼяжіть словник у `loader` маршруту й прочитайте його назад із `loaderData` у `head`. Лоадери збіглих маршрутів виконуються паралельно, а `staleTime: Infinity` повідомляє TanStack Router, що результат ніколи не застаріває — пер-локальний чанк розвʼязується один раз, а далі віддається з кешу роутера, лишаючи `head` синхронним.

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

> `head` може бути викликаний до завершення лоадера, тому `loaderData` типізовано як можливо `undefined`. Залиште опціональний ланцюжок або повертайте запасний заголовок.

Ви зберігаєте пер-локальний чанк, не сплачуючи його вартість на критичному шляху `head`. Ціна — DX: контент доводиться явно передавати з лоадера у `head` через `loaderData`.

</Tab>

</Tabs>

### Яке розвʼязання обрати?

|                     | Статичне розвʼязання            | Динамічне розвʼязання                      | Кешоване динамічне розвʼязання             |
| ------------------- | ------------------------------- | ------------------------------------------ | ------------------------------------------ |
| API                 | `getIntlayer`                   | `getIntlayerAsync` (v9.4+)                 | `getIntlayerAsync` у `loader` (v9.4+)      |
| Сигнатура `head`    | синхронна                       | `async`                                    | синхронна, читає `loaderData`              |
| Надіслані локалі    | усі оголошені локалі            | лише запитана локаль                       | лише запитана локаль                       |
| Розмір бандла       | зростає з кожною локаллю        | сталий                                     | сталий                                     |
| Розвʼязання `head`  | миттєве                         | очікує чанк локалі всередині `head`        | очікується у лоадері, далі кешується       |
| Вплив на LCP        | немає                           | невелика затримка на холодному маршруті    | немає — поза критичним шляхом `head`       |
| Клієнтські переходи | нічого розвʼязувати             | виконується знову за кожного збігу         | віддається з кешу роутера                  |
| DX                  | найпростіший                    | один `await`                               | контент передається через `loaderData`     |
| Найкраще для        | мало локалей, невеликі словники | багато локалей, рідко відвідувані маршрути | багато локалей, часто відвідувані маршрути |

---

</Step>

<Step number={14} title="Отримання локалі у серверних діях">

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

</Step>

<Step number={15} title="Керування сторінками «Не знайдено»">

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
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad виконується перед відображенням маршруту (як на сервері, так і на клієнті)
  // Це ідеальне місце для валідації префіксу локалі
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix перевіряє, чи дійсна локаль згідно з вашою конфігурацією intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Неприпустимий префікс локалі - перенаправити на сторінку 404 з дійсним префіксом локалі
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent викликається, коли дочірній маршрут не існує
  // наприклад, /en/non-existent-page спричиняє це в межах layout для /en
  notFoundComponent: NotFoundComponent,
});
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

</Step>

<Step number={1} title="Витягніть вміст ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб спростити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для перетворення ваших компонентів і витягування вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інша частина вашої конфігурації
  compiler: {
    /**
     * Вказує, чи повинен бути включений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи повинні компоненти зберігатися після перетворення. Таким чином, компілятор можна запустити лише один раз для перетворення програми, а потім видалити.
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

<Tabs>
 <Tab value='Команда витягування'>

Запустіть екстрактор для перетворення компонентів і витягування вмісту

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
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
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

<Step number={16} title="Pre-render & Generate Sitemap">

Intlayer має вбудований генератор sitemap, який допомагає легко створити sitemap для вашої програми. Він обробляє локалізовані маршрути та додає необхідні метадані для пошукових систем.

> Карта сайту, згенерована Intlayer, підтримує простір імен `xhtml:link` (Hreflang XML Extensions). На відміну від генераторів карт сайту за замовчуванням, які лише перелічують необроблені URL-адреси, Intlayer автоматично створює необхідні двосторонні посилання між усіма мовними версіями сторінки (наприклад, `/about`, `/about?lang=fr` та `/about?lang=es`). Це забезпечує правильне індексування пошуковими системами та подачу правильної мовної версії відповідній аудиторії.

Щоб використовувати це, спочатку потрібно налаштувати ваш `vite.config.ts` для увімкнення попередньої обробки локалізованих маршрутів і вимкнення генерування карти сайту TanStack Start за замовчуванням.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... інші імпорти

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
    // ... інші плагіни
    tanstackStart({
      // ... інша конфігурація
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

Потім створіть маршрут `src/routes/sitemap[.]xml.ts`, який використовує функцію `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

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

<Step number={17} title="Налаштувати TypeScript">

Intlayer використовує module augmentation для отримання переваг TypeScript та зміцнення вашого codebase.

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи:

```json5 fileName="tsconfig.json"
{
  // ... ваші існуючі конфігурації
  include: [
    // ... ваші існуючі включення
    ".intlayer/**/*.ts", // Включіть автоматично згенеровані типи
  ],
}
```

---

</Step>

</Steps>

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
