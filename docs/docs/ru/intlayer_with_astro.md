---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Как перевести ваше Astro – руководство i18n 2025
description: Узнайте, как добавить интернационализацию (i18n) в ваше приложение на Vite и React с помощью Intlayer. Следуйте этому руководству, чтобы сделать ваше приложение многоязычным.
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
---

# Переведите ваш Astro с Intlayer | Интернационализация (i18n)

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

## Что такое Intlayer?

**Intlayer** — это инновационная, с открытым исходным кодом библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автозаполнение и обнаружение ошибок.
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в Astro

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью вашего менеджера пакетов:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optional: add React island support
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Необязательно: добавить поддержку React island
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Необязательно: добавить поддержку React island
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявлением контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **astro-intlayer**
  Включает плагин интеграции Astro для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочитаемой пользователем локали, управления cookie и обработки перенаправления URL.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

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

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправление в промежуточном ПО, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Astro

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

> Плагин интеграции `intlayer()` для Astro используется для интеграции Intlayer с Astro. Он обеспечивает создание файлов деклараций контента и их мониторинг в режиме разработки. Определяет переменные окружения Intlayer внутри приложения Astro. Кроме того, предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите ваш контент

Создайте и управляйте декларациями контента для хранения переводов:

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
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, как только они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 5: Используйте ваш контент в Astro

Вы можете использовать словари напрямую в файлах `.astro`, используя основные помощники, экспортируемые `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
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

### Шаг 6: Локализованный роутинг

Создайте динамический сегмент маршрута для обслуживания локализованных страниц, например `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Интеграция Astro добавляет промежуточное ПО Vite во время разработки, которое помогает с маршрутизацией с учётом локали и определениями окружения. Вы всё ещё можете создавать ссылки между локалями, используя свою логику или утилиты, такие как `getLocalizedUrl` из `intlayer`.

### Шаг 7: Продолжайте использовать ваш любимый фреймворк

Продолжайте использовать ваш любимый фреймворк для создания вашего приложения.

- Intlayer + React: [Intlayer с React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer с Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer с Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer с Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer с Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+preact.md)

### Настройка TypeScript

Intlayer использует расширение модулей, чтобы получить преимущества TypeScript и сделать вашу кодовую базу более надежной.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## История документации

| Версия | Дата       | Изменения                                                      |
| ------ | ---------- | -------------------------------------------------------------- |
| 6.2.0  | 2025-10-03 | Обновление для интеграции с Astro, конфигурация, использование |
