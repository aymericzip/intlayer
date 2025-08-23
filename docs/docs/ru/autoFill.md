---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Автозаполнение
description: Узнайте, как использовать функцию автозаполнения в Intlayer для автоматического заполнения контента на основе предопределённых шаблонов. Следуйте этой документации, чтобы эффективно реализовать функции автозаполнения в вашем проекте.
keywords:
  - Автозаполнение
  - Автоматизация контента
  - Динамический контент
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
---

# Файлы декларации контента с автозаполнением

**Файлы декларации контента с автозаполнением** - это способ ускорить ваш процесс разработки.
Механизм автозаполнения работает через отношение _мастер-слейв_ между файлами декларации контента. Когда основной (мастер) файл обновляется, Intlayer автоматически применяет эти изменения к производным (автозаполненным) файлам декларации.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// Основной файл декларации контента с автозаполнением
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content", // Это пример содержимого
  },
} satisfies Dictionary;

export default exampleContent;
```

Вот [файл декларации контента для каждого языка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md), использующий инструкцию `autoFill`.

Затем, когда вы выполните следующую команду:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer автоматически сгенерирует производный файл декларации по пути `src/components/example/example.content.json`, заполнив все локали, которые ещё не объявлены в основном файле.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

После этого оба файла декларации будут объединены в один словарь, доступный через стандартный хук `useIntlayer("example")` (react) / композицию (vue).

## Формат файла с автозаполнением

Рекомендуемый формат для автоматически заполняемых файлов деклараций - **JSON**, что помогает избежать ограничений форматирования. Однако Intlayer также поддерживает форматы `.ts`, `.js`, `.mjs`, `.cjs` и другие.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ваш контент
  },
};
```

Это создаст файл по пути:

```
src/components/example/example.filled.content.ts
```

> Генерация файлов `.js`, `.ts` и подобных работает следующим образом:
>
> - Если файл уже существует, Intlayer проанализирует его с помощью AST (Абстрактного Синтаксического Дерева), чтобы найти каждое поле и вставить отсутствующие переводы.
> - Если файл не существует, Intlayer создаст его, используя шаблон файла декларации контента по умолчанию.

## Абсолютные пути

Поле `autoFill` также поддерживает абсолютные пути.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Ваш контент
  },
};
```

Это создаст файл по пути:

```
/messages/example.content.json
```

## Автоматическая генерация файлов декларации контента для каждого локаля

Поле `autoFill` также поддерживает генерацию файлов декларации контента **для каждого локаля**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Ваш контент
  },
};
```

Это создаст два отдельных файла:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Фильтрация автозаполнения по конкретному локалю

Использование объекта в поле `autoFill` позволяет применять фильтры и генерировать файлы только для определённых локалей.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Ваш контент
  },
};
```

Это создаст только файл перевода для французского языка.

## Переменные пути

Вы можете использовать переменные внутри пути `autoFill` для динамического определения целевых путей создаваемых файлов.

**Доступные переменные:**

- `{{locale}}` – Код локали (например, `fr`, `es`)
- `{{key}}` – Ключ словаря (например, `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ваш контент
  },
};
```

Это создаст:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
