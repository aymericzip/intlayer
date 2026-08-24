---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Повний посібник щодо перекладу вашого додатка"
description: "Більше ніяких i18next. Посібник 2026 року з розробки багатомовного (i18n) додатка Elysia. Перекладайте за допомогою AI агентів та оптимізуйте розмір bundle, SEO та продуктивність."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Перекладіть свій Elysia backend веб-сайт за допомогою Intlayer | Інтернаціоналізація (i18n)

`elysia-intlayer` – це потужний плагін інтернаціоналізації (i18n) для Elysia додатків, розроблений для того, щоб зробити ваші backend сервіси глобально доступними, надаючи локалізовані відповіді на основі переваг клієнта.

> Див. реалізацію пакету на GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Практичні casos використання

- **Відображення помилок Backend мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує розчарування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися в компонентах front-end, таких як toast-сповіщення або модальні вікна.
- **Отримання багатомовного контенту**: Для додатків, які завантажують контент з бази даних, інтернаціоналізація забезпечує можливість подавати цей контент кількома мовами. Це критично важливо для платформ, таких як сайти електронної комерції або системи управління контентом, які повинні відображати описи продуктів, статті та інший контент мовою, яку переважає користувач.
- **Надсилання багатомовних електронних листів**: Чи то трансакційні листи, маркетингові кампанії чи сповіщення, надсилання листів мовою одержувача може значно підвищити залучення та ефективність.
- **Багатомовні push-сповіщення**: Для мобільних додатків надсилання push-сповіщень мовою, яку переважає користувач, може підвищити взаємодію та утримання користувачів. Цей особистісний підхід може зробити сповіщення більш релевантними та практичними.
- **Інші комунікації**: Будь-яка форма комунікації з backend, така як SMS-повідомлення, системні сповіщення або оновлення користувацького інтерфейсу, виграють від того, що вони мовою користувача, забезпечуючи ясність та покращуючи загальний досвід користувача.

Інтернаціоналізуючи backend, ваш додаток не лише поважає культурні відмінності, а й краще узгоджується з глобальними потребами ринку, що робить це ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати вашу програму за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Див. [Application Template](https://github.com/aymericzip/intlayer-elysia-template) на GitHub.

### Установка

Щоб почати використовувати `elysia-intlayer`, встановіть пакет за допомогою npm:

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

> прапорець `--interactive` є опціональним. Використовуйте `intlayer-cli init`, якщо ви є AI-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши `intlayer.config.ts` у корені вашого проекту:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголосіть Ваш Контент

Створюйте та керуйте своїми оголошеннями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      uk: "Приклад контенту, повернутого українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Приклад контенту, повернутого українською мовою",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення контенту можна визначити будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткових інформацій зверніться до [документації оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування додатка Elysia

Налаштуйте ваш додаток Elysia для використання `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Завантажте плагін інтернаціоналізації
  .use(intlayer())
  // Маршрути
  .get("/t_example", () =>
    t({
      uk: "Приклад повернутого вмісту українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Плагін також інжектує об'єкт `intlayer` у контекст маршруту. Віддавайте перевагу йому, коли вам потрібна явна залежність замість автономних помічників:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Мова, яка використовується для цього запиту, узгоджена `Accept-Language` або прочитана з сховища
  locale: intlayer.locale,
  greeting: intlayer.t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Контекст маршруту надає доступ до `locale`, `defaultLocale`, `locale_storage` (мова явно встановлена клієнтом), `locale_detected` (мова узгоджена на основі заголовків), `t`, `getIntlayer` та `getDictionary`.

### Сумісність

`elysia-intlayer` повністю сумісна з:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md)>) для React додатків
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md)>) для Next.js додатків
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md)>) для Vite додатків

Вона також безперебійно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API запити. Ви можете налаштувати middleware для визначення локалі через заголовки або cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри конфігурації
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

За замовчуванням `elysia-intlayer` буде інтерпретувати заголовок `Accept-Language` для визначення переважної мови клієнта.

> Для отримання додаткової інформації про конфігурацію та розширені теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`elysia-intlayer` використовує надійні можливості TypeScript для покращення процесу локалізації. Статична типізація TypeScript забезпечує, що кожен ключ перекладу враховується, зменшуючи ризик пропущених перекладів і покращуючи maintainability.

Переконайтеся, що автоматично створені типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично створені типи
  ],
}
```

### VS Code Extension

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок в реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для більш детальної інформації про використання розширення звертайтесь до [документації розширення Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх комітування в ваш Git-репозиторій.

Щоб це зробити, ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```
