---
createdAt: 2025-12-07
updatedAt: 2026-06-23
title: "React Router v7 i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку React Router v7. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
applicationShowcase: https://intlayer-react-router-v7-fs-routes.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 7.5.6
    date: 2025-12-27
    changes: "Оновлено Layout та додано обробку 404"
  - version: 7.3.4
    date: 2025-12-08
    changes: "Ініціалізовано history"
author: aymericzip
---

# Перекладіть ваш вебсайт на React Router v7 (File-System Routes) за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник демонструє, як інтегрувати **Intlayer** для безшовної інтернаціоналізації в проєктах на React Router v7 з використанням **маршрутизації на основі файлової системи** (`@react-router/fs-routes`) із маршрутизацією, що враховує локаль, підтримкою TypeScript та сучасними практиками розробки.

Для клієнтської маршрутизації зверніться до посібника [Intlayer з React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_router_v7.md).

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-i18next` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка React Router">

Intlayer оптимізовано для ідеальної роботи з React Router, пропонуючи **маршрутизацію з урахуванням локалі**, **проміжне програмне забезпечення для визначення локалі** та всі функції, необхідні для інтернаціоналізації масштабування (i18n).

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

## Покроковий посібник із налаштування Intlayer у додатку React Router v7 з файловою маршрутизацією

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">

<iframe title="Як перекласти ваш додаток React Router v7 (File-System Routes) за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox. Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-react-router-v7-fs-routes.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-react-router-v7-fs-routes-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) на GitHub.

<Steps>

<Step number={1} title="Встановлення залежностей">

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
bun x intlayer init
```

- **intlayer**

  Ядро пакета, яке надає інструменти для інтернаціоналізації: керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer у React-застосунок. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення бажаної локалі користувача, управління куками та обробки перенаправлень URL.

- **@react-router/fs-routes**
  Пакет, який дозволяє маршрутизацію на основі файлової системи для React Router v7.

</Step>

<Step number={2} title="Конфігурація вашого проєкту">

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у вашу конфігурацію Vite">

Додайте плагін intlayer до вашої конфігурації:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та їх моніторинг у режимі розробки. Він визначає змінні середовища Intlayer у Vite-застосунку. Крім того, він додає аліаси для оптимізації продуктивності.

</Step>

<Step number={4} title="Налаштування файлових маршрутів React Router v7">

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

</Step>

<Step number={5} title="Створіть файли маршрутів за конвенціями файлової системи">

При маршрутизації на основі файлової системи використовується плоска конвенція іменування, де крапки (`.`) позначають сегменти шляху, а дужки `()`, необов'язкові сегменти.

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

</Step>

<Step number={6} title="Оголосіть свій контент">

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

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, як тільки вони будуть включені до директорії `contentDir` (за замовчуванням `./app`). І відповідати розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для детальнішої інформації див. [документацію щодо декларацій контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

> Якщо ваш додаток вже існує, ви можете використовувати [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md), а також [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб трансформувати тисячі компонентів за секунду.

</Step>

<Step number={7} title="Створіть локалізовані компоненти">

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

</Step>

<Step number={8} title="Створіть компонент перемикача локалі">

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
              {/* Локаль, наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі, наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови у поточній локалі, напр., Francés коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською, напр., French */}
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

</Step>

<Step number={9} title="Додати керування атрибутами HTML">

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

</Step>

<Step number={10} title="Додайте middleware">

Ви також можете використовувати `intlayerProxy` для додавання маршрутизації на рівні сервера до вашого застосунку. Цей плагін автоматично визначатиме поточну локаль на основі URL та встановлюватиме відповідний cookie локалі. Якщо локаль не вказана, плагін визначатиме найбільш відповідну локаль на основі переваг мови браузера користувача. Якщо локаль не визначена, він перенаправить на локаль за замовчуванням.

> Зверніть увагу, що для використання `intlayerProxy` в production, вам потрібно перемістити пакет `vite-intlayer` з `devDependencies` на `dependencies`.

> З Intlayer v9 `intlayerProxy()` включено безпосередньо в плагін `intlayer()` та увімкнено за замовчуванням через опцію `routing.enableProxy` (`true` за замовчуванням). Реєстрація його окремо, як показано нижче, тепер опціональна — вона збережена для зворотної сумісності та налаштувань, які потребують контролю порядку плагінів. Встановіть `routing.enableProxy: false`, щоб відмовитися. Див. [примітки до випуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    reactRouter(),

    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
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

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

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

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків React Router v7?">

- **`react-i18next`**: завантаження JSON під час виконання.
- **`react-intl`**: рішення на основі ICU.
- **`Intlayer`**: повна інтеграція з файловою маршрутизацією, оголошення поруч із компонентом, оптимізація під час збирання, AI переклад і візуальний редактор.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру бандла React Router?">

Значно менше, ніж класичні системи, оскільки компоненти отримують лише власний контент. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з react-i18next або react-intl без переписування моїх компонентів?">

Так, за допомогою посібників з міграції або адаптерів сумісності.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування всіх перекладів в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші вихідні файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання для коду JSX, TSX, Vue та Svelte, генеруючи словники під час кожної зміни без необхідності підтримувати ключі вручну. Оскільки він працює на основі статичного аналізу, динамічні рядки середовища виконання залишаються поза його межами.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="У чому різниця між цим посібником і посібником із конфігураційними маршрутами React Router?">

Лише у способі оголошення маршрутів: тут використовуються угоди про назви файлів замість дерева маршрутів у `routes.ts`. Оголошення вмісту та хуки ідентичні.

</Question>

<Question title="Як додати сегмент локалі у файловій маршрутизації?">

Назва сегмента стає динамічною частиною назви файлу. `validatePrefix` відсікає невідомі мови, а `getLocalizedUrl` перетворює посилання.

</Question>

<Question title="Чи працює це в режимі framework у React Router із SSR та завантажувачами?">

Так. Серверний рендеринг і функції-завантажувачі безпосередньо вирішують локаль і відправляють клієнту готовий HTML.

</Question>

<Question title="Як додати теги hreflang та локалізовані метадані для SEO?">

Використовуючи функцію `getMultilingualUrls` у файловому експорті `meta` для опису альтернативних мов.

</Question>

<Question title="Як створити компонент локалізованого посилання?">

Створивши обгортку над `Link` за допомогою `getLocalizedUrl`, яка автоматично додає активний префікс мови до внутрішніх посилань.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта CLI знаходить відсутні переклади та заповнює їх за допомогою обраної LLM, використовуючи вашого власного провайдера та ключ API. Прапорець `--git-diff` обмежує операцію вмістом, зміненим у поточній гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат і валют.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
