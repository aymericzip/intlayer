---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Начало работы с Intlayer в TanStack Start (React)
description: Добавьте i18n в ваше приложение TanStack Start с помощью Intlayer — словари на уровне компонентов, локализованные URL и SEO-дружественные метаданные.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Начало работы с интернационализацией (i18n) с Intlayer и TanStack Start (React)

## Что такое Intlayer?

**Intlayer** — это открытый набор инструментов i18n для приложений React. Он предоставляет вам:

- **Словари на уровне компонентов** с безопасностью TypeScript.
- **Динамические метаданные и маршруты** (готовые для SEO).
- **Переключение локали во время выполнения** (и вспомогательные функции для обнаружения/сохранения локалей).
- **Плагин Vite** для преобразований во время сборки + улучшения для разработки (DX).

В этом руководстве показано, как интегрировать Intlayer в проект **TanStack Start** (который использует Vite под капотом и TanStack Router для маршрутизации/SSR).

---

## Шаг 1: Установка зависимостей

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: ядро (конфигурация, словари, CLI/преобразования).
- **react-intlayer**: `<IntlayerProvider>` + хуки для React.
- **vite-intlayer**: плагин Vite, а также опциональное промежуточное ПО для обнаружения локали/перенаправлений (работает в режиме разработки и SSR/превью; для production SSR переместите в `dependencies`).

---

## Шаг 2: Настройка Intlayer

Создайте файл `intlayer.config.ts` в корне вашего проекта:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Вы также можете настроить: contentDir, contentFileExtensions, параметры middleware и др.
};

export default config;
```

Варианты CommonJS/ESM идентичны вашему оригинальному документу, если вы предпочитаете `cjs`/`mjs`.

> Полное описание конфигурации: смотрите документацию по конфигурации Intlayer.

---

## Шаг 3: Добавьте плагин Vite (и опциональный middleware)

**TanStack Start использует Vite**, поэтому добавьте плагин(и) Intlayer в ваш `vite.config.ts`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Необязательно, но рекомендуется для обнаружения локали, работы с куки и редиректов:
    intLayerMiddlewarePlugin(),
  ],
});
```

> Если вы разворачиваете SSR, переместите `vite-intlayer` в `dependencies`, чтобы middleware работал в продакшене.

---

## Шаг 4: Объявите ваш контент

Размещайте ваши словари где угодно внутри `./src` (по умолчанию `contentDir`). Пример:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),
    title: t({
      ru: "TanStack Start + React",
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({
      ru: "счёт: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t<ReactNode>({
      ru: (
        <>
          Редактируйте <code>src/routes/index.tsx</code> и сохраните, чтобы
          проверить HMR
        </>
      ),
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      ru: "Нажмите на логотипы, чтобы узнать больше",
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS варианты работают так же, как и в вашем исходном документе.

> TSX контент? Не забудьте `import React from "react"`, если ваша сборка этого требует.

---

## Шаг 5: Оберните TanStack Start с помощью Intlayer

С TanStack Start ваш **корневой маршрут** — это правильное место для установки провайдеров.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Пример использования словаря на верхнем уровне:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/about">О нас</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Затем используйте ваш контент на страницах:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> Атрибуты строк (`alt`, `title`, `aria-label` и др.) требуют использования `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Необязательно) Шаг 6: Переключение локали (на клиенте)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>Английский</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Французский</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Испанский</button>
    </div>
  );
}
```

---

## (Необязательно) Шаг 7: Локализованная маршрутизация (SEO-дружественные URL)

У вас есть **два хороших варианта** с TanStack Start. Выберите один.

Создайте папку с динамическим сегментом `src/routes/$locale/`, чтобы ваши URL были вида `/:locale/...`. В макете `$locale` проверьте `params.locale`, установите `<IntlayerProvider locale=...>`, и отобразите `<Outlet />`. Этот подход прост, но остальные маршруты будут размещены внутри `$locale`, и вам понадобится дополнительное дерево без префикса, если вы _не_ хотите, чтобы префикс локали по умолчанию добавлялся.

---

## (Необязательно) Шаг 8: Обновление URL при переключении локали

При использовании шаблона A (basepath) переключение локалей означает **переход на другой базовый путь**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // сохраняет историю
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Необязательно) Шаг 9: `<html lang>` и `dir` (TanStack Start Document)

TanStack Start предоставляет **Document** (корневой HTML-шаблон), который вы можете настроить. Установите `lang` и `dir` для доступности и SEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* Если вы вычисляете локаль на сервере, передайте её в Document; иначе клиент исправит после гидратации */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

Для исправления на стороне клиента вы также можете использовать небольшой хук:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale; // Устанавливаем атрибут lang для документа
    document.documentElement.dir = getHTMLTextDir(locale); // Устанавливаем направление текста (ltr или rtl) в зависимости от локали
  }, [locale]);
};
```

---

## (Необязательно) Шаг 10: Локализованный компонент Link

TanStack Router предоставляет компонент `<Link/>`, но если вам когда-либо понадобится простой `<a>`, который автоматически добавляет префикс локали к внутренним URL:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> Если вы используете шаблон A (basepath), то `<Link to="/about" />` из TanStack уже преобразуется в `/fr/about` через `basepath`, поэтому кастомная ссылка является необязательной.

---

## TypeScript

Включите сгенерированные Intlayer типы:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Игнорируйте сгенерированные артефакты Intlayer:

```gitignore
.intlayer
```

---

## Расширение VS Code

- **Расширение Intlayer для VS Code** → автодополнение, ошибки, встроенные превью, быстрые действия.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Дальнейшие шаги

- Визуальный редактор
- Режим CMS
- Определение локали на краю / адаптеры

---

## История документации

| Версия | Дата       | Изменения                          |
| ------ | ---------- | ---------------------------------- |
| 1.0.0  | 2025-08-11 | Добавлена адаптация TanStack Start |
