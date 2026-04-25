---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: i18n Astro - Как перевести приложение Astro в 2026 году
description: Узнайте, как добавить интернационализацию (i18n) на ваш сайт Astro с помощью Intlayer. Следуйте этому руководству, чтобы сделать ваш сайт многоязычным.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Обновление для интеграции с Astro, конфигурация, использование"
---

# Переведите ваш сайт Astro с помощью Intlayer | Интернационализация (i18n)

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения многоязычной поддержки в современных веб-приложениях.

С Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Пользоваться расширенными функциями**, такими как динамическое определение локали и переключение языков.

---

## Пошаговое руководство по настройке Intlayer в Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Посмотреть [Шаблон приложения](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью вашего менеджера пакетов:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Опционально: добавить поддержку островов React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Опционально: добавить поддержку островов React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Опционально: добавить поддержку островов React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлением контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляцией и [командами CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **astro-intlayer**
  Включает плагин интеграции для Astro для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО (middleware) для определения предпочтительной локали пользователя, управления куки и обработки перенаправлений URL.

### Шаг 2: Настройка вашего проекта

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
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

> Через этот конфигурационный файл вы можете настроить локализованные URL, перенаправления middleware, названия куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Astro

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Плагин интеграции `intlayer()` используется для интеграции Intlayer с Astro. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Astro. Кроме того, он предоставляет псевдонимы (aliases) для оптимизации производительности.

### Шаг 4: Объявление контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ru: "Привет, мир",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Более подробную информацию см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 5: Использование контента в Astro

Вы можете использовать словари напрямую в файлах `.astro`, используя основные хелперы, экспортируемые из `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Шаг 6: Локализованная маршрутизация

Создайте динамический сегмент маршрута для обслуживания локализованных страниц, например `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Интеграция Astro добавляет middleware Vite во время разработки, которое помогает с маршрутизацией, учитывающей язык, и определениями окружения. Вы по-прежнему можете создавать ссылки между языками, используя собственную логику или вспомогательные функции, такие как `getLocalizedUrl` из `intlayer`.

### Шаг 7: Продолжайте использовать ваш любимый фреймворк

Продолжайте использовать ваш любимый фреймворк для создания вашего приложения.

- Intlayer + React: [Intlayer с React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer с Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer со Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer с Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer с Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+preact.md)

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы воспользоваться преимуществами TypeScript и сделать вашу кодовую базу более надежной.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Настройка Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их добавления в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Для улучшения процесса разработки с использованием Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Более подробную информацию об использовании расширения см. в [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Дальнейшие шаги

Вы также можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешнюю [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
