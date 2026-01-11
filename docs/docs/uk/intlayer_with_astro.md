---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Як перекласти ваш додаток Astro — посібник з i18n 2026
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого сайту на Astro за допомогою Intlayer. Дотримуйтесь цього керівництва, щоб зробити сайт багатомовним.
keywords:
  - Інтернаціоналізація
  - Документація
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
    changes: Додано команду init
  - version: 6.2.0
    date: 2025-10-03
    changes: Оновлено для інтеграції з Astro, конфігурації та використання
---

# Переклад вашого сайту на Astro за допомогою Intlayer | Інтернаціоналізація (i18n)

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека інтернаціоналізації (i18n), створена для спрощення підтримки багатомовності в сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автозаповнення та виявлення помилок.
- **Скористатися розширеними функціями**, такими як динамічне визначення локалі та її перемикання.

---

## Покроковий посібник зі встановлення Intlayer в Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Шаблон застосунку](https://github.com/aymericzip/intlayer-astro-template) на GitHub.

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою вашого менеджера пакетів:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Опційно: додати підтримку React island
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Опційно: додати підтримку React island
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Необов'язково: додати підтримку React island
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Core-пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), трансляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **astro-intlayer**
  Містить плагін інтеграції для Astro для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для виявлення пріоритетної локалі користувача, керування cookies і обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимкнути виведення логів Intlayer у консолі та багато іншого. Повний перелік доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у конфігурацію Astro

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// Документація: https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Плагін інтеграції `intlayer()` для Astro використовується для інтеграції Intlayer з Astro. Він забезпечує побудову файлів декларацій контенту та їх моніторинг у режимі розробки. Він визначає змінні середовища Intlayer у межах Astro-застосунку. Додатково він надає aliases для оптимізації продуктивності.

### Крок 4: Оголосіть ваш контент

Створюйте та керуйте деклараціями контенту для збереження перекладів:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт, світ",
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, за умови що вони включені до директорії `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації зверніться до [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використовуйте ваш контент в Astro

Ви можете використовувати словники безпосередньо в `.astro` файлах за допомогою основних хелперів, які експортує `intlayer`.

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

### Крок 6: Локалізована маршрутизація

Створіть динамічний сегмент маршруту для обслуговування локалізованих сторінок, наприклад `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Інтеграція з Astro додає Vite middleware під час розробки, що допомагає з маршрутизацією, орієнтованою на локалі, та визначенням змінних середовища. Ви все одно можете робити посилання між локалями, використовуючи власну логіку або утиліти, наприклад `getLocalizedUrl` з `intlayer`.

### Крок 7: Продовжуйте використовувати улюблений фреймворк

Продовжуйте використовувати улюблений фреймворк для побудови вашого застосунку.

- Intlayer + React: [Intlayer з React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer з Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer з Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer з Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer з Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+preact.md)

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зробити вашу codebase більш надійною.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Існуючі конфігурації TypeScript
  "include": [
    // ... Існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Налаштування Git

Рекомендовано ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого репозиторію Git.

Для цього можете додати такі інструкції у файл `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продовжуйте

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
