---
docName: autoFill
url: /doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Автозаполнение
description: Узнайте, как использовать функцию автозаполнения в Intlayer для автоматического заполнения контента на основе предопределенных шаблонов. Следуйте этой документации, чтобы эффективно реализовать функции автозаполнения в вашем проекте.
keywords:
  - Автозаполнение
  - Автоматизация контента
  - Динамический контент
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Автоматически заполняемые файлы объявления контента

**Автоматически заполняемые файлы объявления контента** - это способ ускорить ваш рабочий процесс разработки.

Механизм автозаполнения работает через отношение _master-slave_ между файлами объявления контента. Когда основной (master) файл обновляется, Intlayer автоматически применяет эти изменения к производным (автоматически заполненным) файлам объявления.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Вот [файл объявления контента для каждого языка](https://github.com/aymericzip/intlayer/blob/main/docs/ru/per_locale_file.md), использующий инструкцию `autoFill`.

Затем, когда вы выполняете следующую команду:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer автоматически сгенерирует производный файл объявления в `src/components/example/example.content.json`, заполнив все языки, которые еще не объявлены в основном файле.

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

Впоследствии оба файла объявления будут объединены в один словарь, доступный через стандартный хук `useIntlayer("example")` (react) / composable (vue).

## Формат автоматически заполняемых файлов

Рекомендуемый формат для автоматически заполняемых файлов объявления - **JSON**, что помогает избежать ограничений форматирования. Однако Intlayer также поддерживает форматы `.ts`, `.js`, `.mjs`, `.cjs` и другие.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ваш контент
  },
};
```

Это сгенерирует файл в:

```
src/components/example/example.filled.content.ts
```

> Генерация файлов `.js`, `.ts` и подобных работает следующим образом:
>
> - Если файл уже существует, Intlayer проанализирует его с помощью AST (Абстрактного Синтаксического Дерева), чтобы найти каждое поле и вставить отсутствующие переводы.
> - Если файл не существует, Intlayer сгенерирует его, используя шаблон по умолчанию для файлов объявления контента.

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

Это сгенерирует файл в:

```
/messages/example.content.json
```

## Автоматическая генерация файлов объявления контента для каждого языка

Поле `autoFill` также поддерживает генерацию файлов объявления контента **для каждого языка**.

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

Это сгенерирует два отдельных файла:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Фильтрация автозаполнения по конкретному языку

Использование объекта для поля `autoFill` позволяет применять фильтры и генерировать только файлы для конкретных языков.

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

Это сгенерирует только файл французского перевода.

## Переменные пути

Вы можете использовать переменные внутри пути `autoFill` для динамического разрешения целевых путей для сгенерированных файлов.

**Доступные переменные:**

- `{{locale}}` – Код языка (например, `fr`, `es`)
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

Это сгенерирует:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
