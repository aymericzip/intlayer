# Intlayer поддерживает два способа объявления многоязычного контента:

- Один файл со всеми переводами
- Один файл на локаль (формат per-locale)

Эта гибкость позволяет:

- Легко мигрировать с других инструментов i18n
- Поддерживать автоматизированные рабочие процессы перевода
- Четко организовывать переводы в отдельные файлы для каждой локали

## Один файл с несколькими переводами

Этот формат идеально подходит для:

- Быстрой итерации в коде.
- Бесшовной интеграции с CMS.

Это рекомендуемый подход для большинства случаев использования. Он централизует переводы, что упрощает итерацию и интеграцию с CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ru: "Заголовок моего компонента",
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
      ru: "Заголовок моего компонента",
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
      ru: "Заголовок моего компонента",
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
        "ru": "Заголовок моего компонента",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Рекомендуется: Этот формат лучше всего подходит при использовании визуального редактора Intlayer или управлении переводами непосредственно в коде.

## Формат Per-Locale

Этот формат полезен, когда:

- Вы хотите версионировать или переопределять переводы независимо.
- Вы интегрируете машинные или ручные рабочие процессы перевода.

Вы также можете разделить переводы на отдельные файлы для каждой локали, указав поле locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важно
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важно
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важно
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важно
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важно
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Важно
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Важно
  "content": {
    "multilingualContent": "Title of my component",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Важно
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Важно: Убедитесь, что поле locale определено. Оно указывает Intlayer, какой язык представляет файл.

> Примечание: В обоих случаях файл декларации контента должен соответствовать шаблону именования `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`, чтобы быть распознанным Intlayer. Суффикс `.[locale]` является необязательным и используется только как соглашение об именовании.

## Смешивание форматов

Вы можете смешивать оба подхода для одного и того же ключа контента. Например:

Объявите контент по умолчанию или базовый контент статически (например, `index.content.ts`).

Добавьте или переопределите контент для конкретной локали в `index.content.json`, `index.fr.content.ts` и т.д.

Это особенно полезно, когда:

- Вы хотите объявить базовый контент статически в своей кодовой базе и автоматически заполнить его переводами в CMS.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Пример

Вот файл декларации многоязычного контента:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "ru": "Заголовок моего компонента",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer автоматически объединяет многоязычные и локализованные файлы.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Локаль по умолчанию - ENGLISH, поэтому будет возвращен контент на английском

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

### Автоматическая генерация переводов

Используйте [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для автоматического заполнения отсутствующих переводов на основе ваших предпочтительных сервисов.
