---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Як перекласти додаток Fastify у 2026 році
description: Дізнайтеся, як зробити ваш бекенд на Fastify багатомовним. Дотримуйтесь документації з інтернаціоналізації (i18n) та перекладу.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Fastify
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "Додано команду init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Ініціалізовано історію"
---

# Перекладіть свій бекенд-сайт на Fastify за допомогою Intlayer | Інтернаціоналізація (i18n)

`fastify-intlayer` — це потужний плагін інтернаціоналізації (i18n) для додатків Fastify, розроблений для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

> Подивитися реалізацію пакета на GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Практичні варіанти використання

- **Відображення помилок бекенда мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує роздратування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися в компонентах фронтенду, таких як тости або модальні вікна.
- **Отримання багатомовного контенту**: Для додатків, що витягують контент із бази даних, інтернаціоналізація гарантує, що ви зможете надавати цей контент декількома мовами. Це вкрай важливо для таких платформ, як сайти електронної комерції або системи управління контентом, яким необхідно відображати описи продуктів, статті та інший контент мовою, якій надає перевагу користувач.
- **Відправка багатомовних листів**: Будь то транзакційні листи, маркетингові кампанії чи сповіщення, відправка листів мовою одержувача може значно підвищити залученість та ефективність.
- **Багатомовні пуш-сповіщення**: Для мобільних додатків відправка пуш-сповіщень мовою користувача може покращити взаємодію та лояльність. Цей персоналізований підхід робить сповіщення більш релевантними та такими, що спонукають до дії.
- **Інші види комунікації**: Будь-яка форма комунікації з боку бекенда, така як SMS-повідомлення, системні оповіщення або оновлення інтерфейсу користувача, виграє від використання мови користувача, забезпечуючи ясність та покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Подивитися [шаблон додатка](https://github.com/aymericzip/intlayer-fastify-template) на GitHub.

### Встановлення

Щоб почати використовувати `fastify-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши файл `intlayer.config.ts` у корені вашого проєкту:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Оголошення контенту

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення контенту можуть бути визначені в будь-якому місці вашого додатка, за умови, що вони включені в каталог `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання більш детальної інформації зверніться до [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування додатка Fastify

Налаштуйте ваш додаток Fastify для використання `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Завантажити плагін інтернаціоналізації
await fastify.register(intlayer);

// Маршрути
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Завантажити плагін інтернаціоналізації
await fastify.register(intlayer);

// Маршрути
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Обгортка для запуску сервера для async/await
const start = async () => {
  try {
    // Завантажити плагін інтернаціоналізації
    await fastify.register(intlayer);

    // Маршрути
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Сумісність

`fastify-intlayer` повністю сумісний з:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для React-додатків
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для Next.js-додатків
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для Vite-додатків

Він також безшовно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API-запити. Ви можете налаштувати проміжне ПЗ (middleware) для визначення локалі через заголовки або куки:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри налаштування
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Інші параметри налаштування
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Інші параметри налаштування
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

За замовчуванням `fastify-intlayer` інтерпретуватиме заголовок `Accept-Language` для визначення вподобаної мови клієнта.

> Для отримання додаткової інформації про налаштування та просунуті теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`fastify-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, знижуючи ризик відсутності перекладів та покращуючи підтримуваність.

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

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Більш детальну інформацію про використання розширення можна знайти в [документації розширення Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, що генеруються Intlayer. Це дозволить вам уникнути їх коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, що генеруються Intlayer
.intlayer

```
