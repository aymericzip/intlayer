---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: Начало работы с Intlayer в React Router v7
description: Узнайте, как добавить интернационализацию (i18n) в ваше приложение на React Router v7 с помощью Intlayer. Следуйте этому подробному руководству, чтобы сделать ваше приложение многоязычным с маршрутизацией, учитывающей локаль.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Маршрутизация по локали
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Начало работы с интернационализацией (i18n) с Intlayer и React Router v7

Это руководство демонстрирует, как интегрировать **Intlayer** для бесшовной интернационализации в проектах на React Router v7 с маршрутизацией, учитывающей локаль, поддержкой TypeScript и современными практиками разработки.

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локали.
- **Включите маршрутизацию с учетом локали** с помощью системы маршрутизации на основе конфигурации React Router v7.

---

## Пошаговое руководство по настройке Intlayer в приложении React Router v7

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **react-intlayer**
  Пакет, который интегрирует Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // Всегда добавлять префикс для языка по умолчанию в URL
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправления в middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Настройка маршрутов React Router v7

Настройте конфигурацию маршрутизации с учетом локализации:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Корневая страница - перенаправляет на локаль
    route("/:lang", "routes/[lang]/page.tsx"), // Локализованная главная страница
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // Локализованная страница "О нас"
  ]),
] satisfies RouteConfig;
```

### Шаг 4: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, плагин предоставляет алиасы для оптимизации производительности.

### Шаг 5: Создайте компоненты макета

Настройте корневой макет и макеты, специфичные для локали:

#### Корневой макет

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Шаг 6: Объявите Ваш Контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 и Intlayer позволяют легко создавать многоязычные приложения.",
    }),
    aboutLink: t({
      en: "Узнать о нас",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "Главная",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, как только они будут включены в директорию `contentDir` (по умолчанию, `./app`). И соответствовать расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 7: Создайте компоненты, учитывающие локаль

Создайте компонент `LocalizedLink` для навигации с учетом локали:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  // Проверка, является ли путь внешним URL или почтовым адресом
  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### Шаг 8: Используйте Intlayer на своих страницах

Получайте доступ к словарям контента по всему вашему приложению:

#### Страница перенаправления корня

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
// app/routes/page.tsx
import { useLocale } from "react.intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Локализованная главная страница

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md).

### Шаг 9: Создайте компонент переключателя локали

Создайте компонент, позволяющий пользователям менять язык:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">Выберите язык: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

### Шаг 10: Добавление управления атрибутами HTML (необязательно)

Создайте хук для управления атрибутами lang и dir в HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
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

Затем используйте его в вашем корневом компоненте:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // импортируем хук

export default function RootLayout() {
  useI18nHTMLAttributes(); // вызываем хук

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Шаг 11: Сборка и запуск вашего приложения

Постройте словари контента и запустите ваше приложение:

```bash packageManager="npm"
# Построить словари Intlayer
npm run intlayer:build

# Запустить сервер разработки
npm run dev
```

```bash packageManager="pnpm"
# Построить словари Intlayer
pnpm intlayer:build

# Запустить сервер разработки
pnpm dev
```

```bash packageManager="yarn"
# Построить словари Intlayer
yarn intlayer:build

# Запустить сервер разработки
yarn dev
```

### Шаг 12: Настройка TypeScript (необязательно)

Intlayer использует расширение модулей для получения преимуществ TypeScript и усиления вашей кодовой базы.

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... ваши существующие настройки TypeScript
  },
  include: [
    // ... ваши существующие включения
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

## Развертывание в продакшн

При развертывании вашего приложения:

1. **Соберите ваше приложение:**

   ```bash
   npm run build
   ```

2. **Постройте словари Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **Переместите `vite-intlayer` в зависимости**, если используете middleware в продакшне:
   ```bash
   npm install vite-intlayer --save
   ```

Ваше приложение теперь будет поддерживать:

- **Структуру URL**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Автоматическое определение локали** на основе предпочтений браузера
- **Маршрутизацию с учётом локали** с React Router v7
- **Поддержку TypeScript** с автоматически сгенерированными типами
- **Серверный рендеринг** с правильной обработкой локали

## Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Продвинутые возможности

Для расширения функционала вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## Ссылки на документацию

- [Документация Intlayer](https://intlayer.org)
- [Документация React Router v7](https://reactrouter.com/)
- [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
- [Объявление контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

Это подробное руководство содержит все необходимое для интеграции Intlayer с React Router v7 для полностью интернационализированного приложения с маршрутизацией, учитывающей локаль, и поддержкой TypeScript.

## История документации

| Версия | Дата      | Изменения                     |
| ------ | --------- | ----------------------------- |
| 5.8.2  | 2025-09-4 | Добавлено для React Router v7 |
