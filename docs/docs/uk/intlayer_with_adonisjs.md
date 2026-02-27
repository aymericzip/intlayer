---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Як перекласти додаток AdonisJS у 2026
description: Дізнайтеся, як зробити ваш бекенд AdonisJS багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - AdonisJS
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Ініціалізація історії
---

# Перекладіть свій бекенд AdonisJS за допомогою Intlayer | Інтернаціоналізація (i18n)

`adonis-intlayer`, це потужний пакет інтернаціоналізації (i18n) для додатків AdonisJS, розроблений для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

### Практичні випадки використання

- **Відображення помилок бекенда мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує розчарування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у фронтенд-компонентах, таких як тости або модальні вікна.

- **Отримання багатомовного контенту**: Для додатків, що отримують контент із бази даних, інтернаціоналізація забезпечує можливість надання цього контенту кількома мовами. Це критично важливо для таких платформ, як сайти електронної комерції або системи управління контентом, яким потрібно відображати описи товарів, статті та інший контент мовою, яку вибрав користувач.

- **Надсилання багатомовних електронних листів**: Будь то транзакційні листи, маркетингові кампанії чи сповіщення, надсилання електронних листів мовою одержувача може значно підвищити залученість та ефективність.

- **Багатомовні push-сповіщення**: Для мобільних додатків надсилання push-сповіщень мовою користувача може посилити взаємодію та утримання. Цей персоналізований підхід робить сповіщення більш актуальними та спонукає до дії.

- **Інші комунікації**: Будь-яка форма комунікації з бекенда, наприклад SMS-повідомлення, системні сповіщення або оновлення інтерфейсу користувача, виграє від того, що вона ведеться мовою користувача, забезпечуючи чіткість і покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) на GitHub.

### Встановлення

Щоб почати використовувати `adonis-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши `intlayer.config.ts` у корені вашого проєкту:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Оголошення контенту

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      uk: "Приклад отриманого контенту українською мовою",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      uk: "Приклад отриманого контенту українською мовою",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      uk: "Приклад отриманого контенту українською мовою",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "uk": "Приклад отриманого контенту українською мовою",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення контенту можуть бути визначені будь-де у вашому додатку, якщо вони включені до директорії `contentDir` (за замовчуванням `./src` або `./app`) і відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання додаткової інформації зверніться до [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування додатка AdonisJS

Налаштуйте свій додаток AdonisJS для використання `adonis-intlayer`.

#### Реєстрація middleware

Спочатку вам потрібно зареєструвати middleware `intlayer` у вашому додатку.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Визначення маршрутів

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    uk: "Приклад отриманого контенту українською мовою",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Функції

`adonis-intlayer` експортує кілька функцій для обробки інтернаціоналізації у вашому додатку:

- `t(content, locale?)`: Базова функція перекладу.
- `getIntlayer(key, locale?)`: Отримати контент за ключем із ваших словників.
- `getDictionary(dictionary, locale?)`: Отримати контент із конкретного об'єкта словника.
- `getLocale()`: Отримати поточну локаль із контексту запиту.

#### Використання в контролерах

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        uk: "Привіт від контролера",
      })
    );
  }
}
```

### Сумісність

`adonis-intlayer` повністю сумісний із:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для додатків React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для додатків Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для додатків Vite

Він також безперешкодно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API-запити. Ви можете налаштувати middleware для визначення локалі через заголовки або кукі:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші варіанти конфігурації
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

За замовчуванням `adonis-intlayer` інтерпретуватиме заголовок `Accept-Language` для визначення мови, якій надає перевагу клієнт.

> Для отримання додаткової інформації про конфігурацію та розширені теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`adonis-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу буде враховано, зменшуючи ризик відсутності перекладів та покращуючи підтримуваність.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що автоматично згенеровані типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Розширення VS Code

Щоб покращити свій досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як користуватися розширенням, зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/uk/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```
