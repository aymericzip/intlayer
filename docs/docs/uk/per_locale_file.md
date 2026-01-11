---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Оголошення декларації вмісту `Per-Locale` в Intlayer
description: Дізнайтеся, як оголошувати вміст за локалями в Intlayer. Ознайомтеся з документацією, щоб зрозуміти різні формати та сценарії використання.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 7.3.1
    date: 2025-11-29
    changes: Додано глобальну конфігурацію для файлів per-locale
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Оголошення декларації вмісту `Per-Locale` в Intlayer

Intlayer підтримує два способи оголошення багатомовного вмісту:

- Один файл з усіма перекладами
- Окремий файл для кожної локалі (формат per-locale)

Ця гнучкість дає змогу:

- Легку міграцію з інших i18n-інструментів
- Підтримку автоматизованих робочих процесів перекладу
- Чітку організацію перекладів у окремі файли, специфічні для кожної локалі

## Формат Per-Locale

Цей формат корисний, коли:

- Ви хочете версіїувати або незалежно перевизначати переклади.
- Ви інтегруєте робочі процеси машинного або людського перекладу.

Ви також можете розділити переклади на окремі файли для кожної локалі, вказавши поле locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важливо
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важливо
  content: { multilingualContent: "Заголовок мого компонента" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важливо
  content: { multilingualContent: "Заголовок мого компонента" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важливо
  content: { multilingualContent: "Заголовок мого компонента" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важливо
  content: {
    multilingualContent: "Заголовок мого компонента",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важливо
  content: {
    multilingualContent: "Заголовок мого компонента",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Важливо
  "content": {
    "multilingualContent": "Заголовок мого компонента",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Важливо
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Важливо: Переконайтеся, що поле locale визначено. Воно вказує Intlayer, яку мову представляє файл.

> Примітка: В обох випадках файл декларації контенту повинен відповідати шаблону іменування `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`, щоб Intlayer розпізнав його. Суфікс `.[locale]` є опціональним і використовується лише як конвенція іменування.

### Глобальна конфігурація для файлів за локалями

Ви можете налаштувати глобальні параметри для файлів за локалями, додавши наступне до файлу `intlayer.config.ts`:

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    locale: Locales.ENGLISH,
  },
};

export default config;
```

Використовуючи цю конфігурацію, усі файли для кожної локалі будуть згенеровані з мовою за замовчуванням, встановленою на English. Вона також включає генерацію `.content` файлів за допомогою команди `transform` та компілятора. (Див. [Компілятор](https://intlayer.org/doc/compiler) або [Transform](https://intlayer.org/doc/concept/cli/transform) для докладнішої інформації.)

## Один файл з кількома перекладами

Цей формат ідеально підходить для:

- Швидкої ітерації в коді.
- Безшовної інтеграції з CMS.

Це рекомендований підхід для більшості випадків використання. Він централізує переклади, що полегшує ітерацію та інтеграцію з CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      uk: "Заголовок мого компонента",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      uk: "Заголовок мого компонента",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      uk: "Заголовок мого компонента",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Заголовок мого компонента",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Рекомендовано: цей формат найкраще підходить при використанні візуального редактора Intlayer або при керуванні перекладами безпосередньо в коді.

## Змішування форматів

Ви можете поєднувати обидва підходи декларації для одного й того ж ключа контенту. Наприклад:

- Оголосіть базовий вміст статично у файлі, наприклад index.content.ts.
- Додайте або перевизначте конкретні переклади в окремих файлах, таких як index.fr.content.ts або index.content.json.

Ця конфігурація особливо корисна, коли:

- Ви хочете визначити початкову структуру вмісту в коді.
- Ви плануєте збагачувати або доповнювати переклади пізніше за допомогою CMS або автоматизованих інструментів.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Приклад

Нижче — файл декларації мультимовного вмісту:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Заголовок мого компонента",
    projectName: "Мій проєкт",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Заголовок мого компонента",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer merges multilingual and per-locale files automatically.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Локаль за замовчуванням — ENGLISH, тому буде повернено контент англійською

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Автоматична генерація перекладів

Використовуйте [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для автоматичного заповнення відсутніх перекладів на основі ваших улюблених сервісів.
