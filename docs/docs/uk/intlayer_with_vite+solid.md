---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Як перекласти ваш застосунок Vite і Solid — посібник з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Vite та Solid багатомовним. Слідуйте документації, щоб інтернаціоналізувати (i18n) і перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
# applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Перекладіть свій вебсайт на Vite і Solid за допомогою Intlayer | Інтернаціоналізація (i18n)

> Цей пакет знаходиться в розробці. Див. [issue](https://github.com/aymericzip/intlayer/issues/117) для отримання додаткової інформації. Підтримайте зацікавленість до Intlayer для Solid, поставивши лайк цьому issue

<!-- Див. [шаблон додатка](https://github.com/aymericzip/intlayer-solid-template) на GitHub. -->

## Що таке Intlayer?

**Intlayer** — інноваційна, open-source бібліотека для інтернаціоналізації (i18n), створена щоб спростити підтримку багатомовності в сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** з автоматично згенерованими типами, що покращують автодоповнення та виявлення помилок.
- **Отримайте переваги розширених можливостей**, таких як динамічне виявлення мови та перемикання.

---

## Покроковий посібник з налаштування Intlayer у додатку на Vite і Solid

## Зміст

<TOC/>

### Крок 1: Встановіть залежності

Встановіть необхідні пакети, використовуючи npm:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **solid-intlayer**
  Пакет, що інтегрує Intlayer з додатком на Solid. Надає провайдери контексту та хуки для інтернаціоналізації в Solid.

- **vite-intlayer**
  Містить плагін для Vite для інтеграції Intlayer зі [збірником Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookies та обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваші інші локалі
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
      // Ваші інші локалі
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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// Документація Vite: https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій вмісту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у застосунку Vite. Додатково він надає aliases для оптимізації продуктивності.

### Крок 4: Оголосіть свій вміст

Створіть і керуйте деклараціями вмісту, щоб зберігати переклади:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

// Тип: інтерфейс Dictionary з пакету intlayer
/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Тип: інтерфейс Dictionary з пакету intlayer
/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, щойно вони будуть включені до директорії `contentDir` (за замовчуванням, `./src`). І відповідати розширенню файлів декларацій контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Step 5: Utilize Intlayer in Your Code

[доопрацювати]

### (Необов'язково) Step 6: Change the language of your content

[доопрацювати]

### (Необов'язково) Step 7: Add localized Routing to your application

[доопрацювати]

### (Необов'язково) Step 8: Change the URL when the locale changes

[доопрацювати]

### (Необов'язково) Step 9: Switch the HTML Language and Direction Attributes

[доопрацювати]

[до завершення]

### (Необов'язково) Крок 10: Створення локалізованого компонента посилання

[до завершення]

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого Git-репозиторію.

Для цього можна додати такі інструкції до файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про те, як користуватися розширенням, зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Розширені можливості

Щоб піти далі, ви можете реалізувати [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
