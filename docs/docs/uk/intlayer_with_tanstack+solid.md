---
createdAt: 2025-03-25
updatedAt: 2026-08-25
title: "TanStack Start + Solid i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку TanStack Start + Solid. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Порівняння статичного, динамічного та кешованого динамічного розвʼязання словників метаданих у функціях head маршрутів"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Додано для Tanstack Start Solid.js"
author: aymericzip
---

# Перекладіть свій вебсайт Tanstack Start + Solid.js за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

Цей посібник демонструє, як інтегрувати **Intlayer** для безперешкодної інтернаціоналізації в проектах Tanstack Start із Solid.js, маршрутизацією з урахуванням локалі, підтримкою TypeScript та сучасними практиками розробки.

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-i18next` або `i18next`, Intlayer пропонує рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка TanStack Start">

Intlayer оптимізовано для ідеальної роботи з TanStack Start і Solid, пропонуючи **багатомовну маршрутизацію**, **карту сайту** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

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

## Покроковий посібник із налаштування Intlayer у додатку Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">

<iframe title="Найкраще рішення i18n для Tanstack Start? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати свій додаток за допомогою Intlayer"
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

Перегляньте [Шаблон додатка](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) на GitHub.

<Steps>

<Step number={1} title="Створення проекту">

Спочатку створіть новий проект TanStack Start, дотримуючись посібника [Початок нового проекту](https://tanstack.com/start/latest/docs/framework/solid/quick-start) на вебсайті TanStack Start.

</Step>

<Step number={2} title="Встановлення пакетів Intlayer">

Встановіть необхідні пакети за допомогою бажаного менеджера пакетів:

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

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **solid-intlayer**
  Пакет, що інтегрує Intlayer у додаток Solid. Він надає контекстні провайдери та хуки для інтернаціоналізації Solid.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення (middleware) для визначення бажаної локалі користувача, керування файлами cookie та обробки перенаправлення URL-адрес.

</Step>

<Step number={3} title="Конфігурація вашого проекту">

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

</Step>

<Step number={4} title="Інтеграція Intlayer у вашу конфігурацію Vite">

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

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує збірку файлів декларації вмісту та моніторить їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає псевдоніми (aliases) для зменшення накладних витрат на продуктивність.

</Step>

<Step number={5} title="Створення кореневого макета">

Налаштуйте свій кореневий макет для підтримки інтернаціоналізації, використовуючи `useParams` для визначення поточної локалі та встановлюючи атрибути `lang` і `dir` на тегу `html`.

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

<Step number={6} title="Створення макета локалі">

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

> Тут `{-$locale}` - це динамічний параметр маршруту, який замінюється поточною локаллю. Така нотація робить слот необов'язковим, дозволяючи йому працювати з такими режимами маршрутизації, як `'prefix-no-default'` тощо.

> Майте на увазі, що цей слот може спричинити проблеми, якщо ви використовуєте кілька динамічних сегментів в одному маршруті (наприклад: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Для режиму `'prefix-all'` ви можете віддати перевагу перемиканню слота на `$locale`.
> Для режиму `'no-prefix'` або `'search-params'` ви можете повністю видалити цей слот.

</Step>

<Step number={7} title="Декларування вмісту">

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

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, за умови, що вони включені в каталог `contentDir` (за замовчуванням `./app`). І відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Докладнішу інформацію див. у [документації з декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={8} title="Використання компонентів та хуків з урахуванням локалі">

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

</Step>

<Step number={9} title="Використання Intlayer на ваших сторінках">

> Використовуйте **`useIntlayer`** за замовчуванням: це рекомендований спосіб читати контент усередині компонентів, і компілятор розвʼязує його у локаль, яка рендериться. Звертайтеся до `getIntlayer` / `getIntlayerAsync` лише поза деревом Solid: у `head` маршрутів, лоадерах і серверних функціях.

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

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.
>
> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Створення компонента перемикання локалі">

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

</Step>

<Step number={11} title="Керування атрибутами HTML">

Як було показано на кроці 5, ви можете керувати атрибутами `lang` і `dir` тегу `html`, використовуючи `useParams` у вашому кореневому компоненті. Це гарантує, що правильні атрибути встановлено як на сервері, так і на клієнті.

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

<Step number={12} title="Додавання Middleware">

Ви також можете використовувати `intlayerProxy`, щоб додати маршрутизацію на стороні сервера до вашого додатка. Цей плагін автоматично визначатиме поточну локаль на основі URL-адреси та встановлюватиме відповідний файл cookie локалі. Якщо локаль не вказано, плагін визначить найбільш підходящу локаль на основі налаштувань мови браузера користувача. Якщо локаль не виявлено, він перенаправить на локаль за замовчуванням.

> Зверніть увагу, що для використання `intlayerProxy` у продакшні вам потрібно перенести пакет `vite-intlayer` з `devDependencies` до `dependencies`.

> З Intlayer v9, `intlayerProxy()` вбудований безпосередньо в плагін `intlayer()` і увімкнений за замовчуванням через опцію `routing.enableProxy` (`true` за замовчуванням). Реєстрація його окремо, як показано нижче, тепер необов'язкова: вона збережена для зворотної сумісності та для налаштувань, які потребують контролю порядку плагінів. Встановіть `routing.enableProxy: false`, щоб відмовитися. Див. [примітки до випуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/releases/v9.md).

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

<Step number={13} title="Інтернаціоналізація ваших метаданих">

<Tabs>

<Tab label="Статичне розвʼязання" value="static">

`getIntlayer` розвʼязується синхронно за **обʼєднаним** словником, тобто тим, що містить усі оголошені локалі. `head` лишається синхронним і нічого не очікує, але весь багатомовний словник потрапляє до чанка маршруту, який надсилається у браузер.

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

Найкраще для невеликих словників метаданих, кількох локалей або на етапі прототипування.

</Tab>

<Tab label="Динамічне розвʼязання" value="dynamic">

`getIntlayerAsync` (доступний починаючи з **v9.4**) поводиться як `getIntlayer`, але плагін збірки спрямовує його на пер-локальний чанк у `.intlayer/dynamic_dictionaries/` замість обʼєднаного словника. Тож сторінка віддає лише ту локаль, яку рендерить. Оскільки цей чанк завантажується на вимогу, `head` стає `async`:

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

> Якщо `head` читає кілька словників, розвʼязуйте їх через `Promise.all`: очікування кожного `getIntlayerAsync` окремим рядком вибудовує запити в ланцюжок замість паралельного виконання.

Компроміс: динамічний імпорт розвʼязується під час виконання `head`, на критичному шляху рендерингу документа. На «холодному» маршруті це затримує `head` на кілька мілісекунд і може трохи погіршити **LCP**.

</Tab>

<Tab label="Кешоване динамічне розвʼязання" value="cached">

Розвʼяжіть словник у `loader` маршруту й прочитайте його назад із `loaderData` у `head`. Лоадери збіглих маршрутів виконуються паралельно, а `staleTime: Infinity` повідомляє TanStack Router, що результат ніколи не застаріває, тож пер-локальний чанк розвʼязується один раз, а далі віддається з кешу роутера, лишаючи `head` синхронним.

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

> `head` може бути викликаний до завершення лоадера, тому `loaderData` типізовано як можливо `undefined`. Залиште опціональний ланцюжок або повертайте запасний заголовок.

Ви зберігаєте пер-локальний чанк, не сплачуючи його вартість на критичному шляху `head`. Ціною стає DX: контент доводиться явно передавати з лоадера у `head` через `loaderData`.

</Tab>

</Tabs>

### Яке розвʼязання обрати?

|                     | Статичне розвʼязання | Динамічне розвʼязання              | Кешоване динамічне розвʼязання         |
| ------------------- | -------------------- | ---------------------------------- | -------------------------------------- |
| API                 | `getIntlayer`        | `getIntlayerAsync` (v9.4+)         | `getIntlayerAsync` у `loader` (v9.4+)  |
| Сигнатура `head`    | синхронна            | `async`                            | синхронна, читає `loaderData`          |
| Надіслані локалі    | усі оголошені локалі | лише запитана локаль               | лише запитана локаль                   |
| Клієнтські переходи | нічого розвʼязувати  | виконується знову за кожного збігу | віддається з кешу роутера              |
| DX                  | найпростіший         | один `await`                       | контент передається через `loaderData` |

---

</Step>

<Step number={14} title="Отримання локалі у ваших діях на сервері">

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

</Step>

<Step number={15} title="Керування сторінками &quot;не знайдено&quot; (404)" isOptional={true}>

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
      // Недійсний префікс локалі - перенаправлення на сторінку 404 з дійсним префіксом локалі
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

</Step>

<Step number={16} title="Вилучення вмісту з ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, трансформація тисяч файлів може зайняти багато часу.

Щоб полегшити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для трансформації ваших компонентів та екстракція вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

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

</Step>

<Step number={16} title="Попередній рендеринг і генерація Sitemap">

Intlayer поставляється з вбудованим генератором карти сайту, який допомагає легко створити карту сайту для вашого додатку. Він обробляє локалізовані маршрути та додає необхідні метаданні для пошукових систем.

> Карта сайту, згенерована Intlayer, підтримує простір імен `xhtml:link` (Hreflang XML Extensions). На відміну від стандартних генераторів карт сайту, які просто перелічують сирі URL-адреси, Intlayer автоматично створює необхідні двосторонні посилання між усіма мовними версіями сторінки (наприклад, `/about`, `/about?lang=fr` та `/about?lang=es`). Це гарантує, що пошукові системи коректно індексують та надають правильну мовну версію потрібній аудиторії.

Щоб це використати, вам спочатку потрібно налаштувати `vite.config.ts` для ввімкнення попередньої обробки локалізованих маршрутів і вимкнення генерування карти сайту за замовчуванням TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
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

<Step number={17} title="Конфігурація TypeScript">

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

</Step>

</Steps>

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

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків TanStack Start та Solid?">

TanStack Start не має власного шару i18n:

- **`@solid-primitives/i18n`**: простий словник із обмеженою підтримкою SSR.
- **`Intlayer`**: підтримка SSR та SSG, сигнали Solid, оптимізація під час збирання, AI переклад та візуальний редактор.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру бандла TanStack Start?">

Значно менше, ніж рішення на основі просторів імен, оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Компілятор часу збирання замінює виклики `useIntlayer` точними записами словника, а [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за локалями, зменшуючи бандл до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з @solid-primitives/i18n або i18next без переписування компонентів?">

Більшою мірою так. Скористайтеся [посібником з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну.

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання: сканує код під час кожної зміни, генерує словники та синхронізує їх із HMR.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Чи забезпечує Intlayer підтримку серверного рендерингу та SSG?">

Так. Контент вирішується під час SSR, а крок 16 описує створення статичних HTML файлів для кожної мови.

</Question>

<Question title="Чи призводить зміна мови до повторного рендерингу всього додатку?">

Ні. Сигнали Solid оновлюють лише ті текстові вузли DOM, які змінилися, без перестворення дерева компонентів.

</Question>

<Question title="Як додати теги hreflang та локалізовану карту сайту?">

Використовуйте функцію `generateSitemap` у маршруті `src/routes/sitemap[.]xml.ts`, яка формує простір імен `xhtml:link` для кожної мови.

</Question>

<Question title="Як обробляти сторінки 404 у локалізованих маршрутах?">

Крок 14 описує це. `validatePrefix` перевіряє правильність локалі в URL, повертаючи 404 для невідомих мов.

</Question>

<Question title="Чи обов'язково додавати локаль до URL?">

Ні. Параметр `routing.mode` підтримує `"prefix-no-default"` (за замовчуванням), `"prefix-all"`, `"no-prefix"` та `"search-params"`.

</Question>

<Question title="Як створити перемикач мов, який зберігає поточний маршрут?">

Крок 9 демонструє компонент. `useLocale` надає активну мову та функцію для збереження шляху під час перемикання.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) чисел, дат і валют.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
