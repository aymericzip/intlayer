# Начало работы с интернационализацией (i18n) с Intlayer и Next.js 15 App Router

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычных веб-приложений. Intlayer бесшовно интегрируется с последней версией фреймворка **Next.js 15**, включая его мощный **App Router**. Она оптимизирована для работы с **Server Components** для эффективного рендеринга и полностью совместима с [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Получать доступ к переводам как в клиентских, так и в серверных компонентах**.
- **Обеспечивать поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

> Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете Next.js Page Router, вы можете обратиться к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 с App Router, обратитесь к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md).

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js

### Шаг 1: Установите зависимости

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [декларацией контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer с Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

### Шаг 2: Настройте ваш проект

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправления middleware, имена cookies, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Next.js

Настройте ваш проект Next.js для использования Intlayer:

```typescript filename="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметры конфигурации */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметры конфигурации */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметры конфигурации */
};

module.exports = withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает построение файлов декларации контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

### Шаг 4: Определите динамические маршруты локали

Удалите все из `RootLayout` и замените следующим кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Оставляя компонент `RootLayout` пустым, вы можете установить атрибуты [`lang`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang) и [`dir`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Чтобы реализовать динамическую маршрутизацию, укажите путь для локали, добавив новый layout в вашу директорию `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Сегмент пути `[locale]` используется для определения локали. Пример: `/ru/about` будет относиться к `ru`, а `/fr/about` к `fr`.

Затем реализуйте функцию `generateStaticParams` в вашем Layout приложения.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Остальной код*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Остальной код*/
};

// ... Остальной код
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Строка для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Остальной код*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` гарантирует, что ваше приложение предварительно собирает необходимые страницы для всех локалей, уменьшая вычисления во время выполнения и улучшая пользовательский опыт. Для получения дополнительной информации обратитесь к [документации Next.js о generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Шаг 5: Объявите ваш контент

Создавайте и управляйте вашими декларациями контента для хранения переводов:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ru: "Начните с редактирования",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ru: "Начните с редактирования",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ru: "Начните с редактирования",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar",
        "ru": "Начните с редактирования"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "ru": "src/app/page.tsx"
      }
    }
  }
}
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в директорию `contentDir` (по умолчанию, `./src`) и соответствуют расширению файла декларации контента (по умолчанию, `.content.{ts,tsx,js,jsx,mjs,cjs}`).  
> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

### Шаг 6: Используйте контент в вашем коде

Доступ к вашим словарям контента в приложении:
