---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Объявление контента `Per-Locale` в Intlayer
description: Узнайте, как объявлять контент по локалям в Intlayer. Следуйте документации, чтобы понять различные форматы и варианты использования.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
---

# Объявление контента `Per-Locale` в Intlayer

Intlayer поддерживает два способа объявления многоязычного контента:

- Один файл со всеми переводами
- Один файл на каждую локаль (формат per-locale)

Эта гибкость позволяет:

- Легкая миграция с других инструментов интернационализации (i18n)
- Поддержка автоматизированных рабочих процессов перевода
- Четкая организация переводов в отдельные файлы, специфичные для каждой локали

## Один файл с несколькими переводами

Этот формат идеален для:

- Быстрой итерации в коде.
- Бесшовной интеграции с CMS.

Это рекомендуемый подход для большинства случаев использования. Он централизует переводы, что облегчает итерации и интеграцию с CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component", // Заголовок моего компонента
      es: "Título de mi componente", // Заголовок моего компонента на испанском
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Определение словаря с переводами для компонента "hello-world"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component", // Заголовок моего компонента
      es: "Título de mi componente", // Заголовок моего компонента на испанском
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Определение словаря с переводами для компонента "hello-world"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component", // Заголовок моего компонента
      es: "Título de mi componente", // Заголовок моего компонента на испанском
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
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Рекомендуется: Этот формат лучше всего подходит при использовании визуального редактора Intlayer или управлении переводами непосредственно в коде.

## Формат по локалям

Этот формат полезен, когда:

- Вы хотите версионировать или переопределять переводы независимо.
- Вы интегрируете машинные или человеческие рабочие процессы перевода.

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
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Контент для английской локали
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Важно
  content: { multilingualContent: "Название моего компонента" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Контент для испанской локали
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
    multilingualContent: "Название моего компонента",
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
    "multilingualContent": "Название моего компонента",
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

> Важно: Убедитесь, что поле locale определено. Оно сообщает Intlayer, на каком языке представлен файл.

> Примечание: В обоих случаях файл декларации контента должен соответствовать шаблону именования `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`, чтобы Intlayer мог его распознать. Суффикс `.[locale]` является необязательным и используется только как соглашение об именовании.

## Смешивание форматов

Вы можете комбинировать оба подхода объявления для одного и того же ключа контента. Например:

- Объявите базовый контент статически в файле, таком как index.content.ts.
- Добавьте или переопределите конкретные переводы в отдельных файлах, таких как index.fr.content.ts или index.content.json.

Эта настройка особенно полезна, когда:

- Вы хотите определить начальную структуру контента в коде.
- Планируете позже дополнить или завершить переводы с помощью CMS или автоматизированных инструментов.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Пример

Вот файл объявления многоязычного контента:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Заголовок моего компонента",
    projectName: "Мой проект",
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
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer автоматически объединяет мультиязычные и локализованные файлы.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Локаль по умолчанию — ENGLISH, поэтому будет возвращено содержимое на английском

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Заголовок моего компонента",
//  "projectName": "Мой проект"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Мой проект"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Результат:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Мой проект"
// }
```

### Автоматическая генерация переводов

### Автоматическая генерация переводов

Используйте [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для автоматического заполнения отсутствующих переводов на основе ваших предпочтительных сервисов.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
