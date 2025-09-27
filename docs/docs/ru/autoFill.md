---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Автозаполнение
description: Узнайте, как использовать функцию автозаполнения в Intlayer для автоматического заполнения контента на основе предопределённых шаблонов. Следуйте этой документации, чтобы эффективно внедрить функции автозаполнения в вашем проекте.
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

# Переводы файлов декларации автозаполнения контента

**Файлы декларации автозаполнения контента** — это способ ускорить ваш процесс разработки.

Механизм автозаполнения работает через _мастер-слейв_ отношения между файлами декларации контента. Когда основной (мастер) файл обновляется, Intlayer автоматически применяет эти изменения к производным (автозаполненным) файлам декларации.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Это пример контента", // пример контента
  },
} satisfies Dictionary;

export default exampleContent;
```

Вот [файл декларации контента для каждого локаля](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md), использующий инструкцию `autoFill`.

Затем, когда вы выполните следующую команду:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer автоматически сгенерирует производный файл декларации по пути `src/components/example/example.content.json`, заполняя все локали, которые ещё не объявлены в основном файле.

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

После этого оба файла деклараций будут объединены в один словарь, доступный через стандартный хук `useIntlayer("example")` (react) / композицию (vue).

## Формат автозаполненного файла

Рекомендуемый формат для автоматически заполняемых файлов деклараций — **JSON**, который помогает избежать ограничений форматирования. Однако Intlayer также поддерживает форматы `.ts`, `.js`, `.mjs`, `.cjs` и другие.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует файл по адресу:

```
src/components/example/example.filled.content.ts
```

> Генерация файлов `.js`, `.ts` и подобных работает следующим образом:
>
> - Если файл уже существует, Intlayer будет парсить его с помощью AST (Абстрактного синтаксического дерева), чтобы найти каждое поле и вставить отсутствующие переводы.
> - Если файл не существует, Intlayer сгенерирует его, используя шаблон файла декларации содержимого по умолчанию.

## Абсолютные пути

Поле `autoFill` также поддерживает абсолютные пути.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует файл по адресу:

```
/messages/example.content.json
```

## Автоматическая генерация файлов деклараций содержимого для каждого локаля

Поле `autoFill` также поддерживает генерацию файлов деклараций содержимого **для каждого локаля**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует два отдельных файла:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> В этом случае, если объект не содержит все локали, Intlayer пропускает генерацию оставшихся локалей.

## Фильтрация автозаполнения для конкретной локали

Использование объекта в поле `autoFill` позволяет применять фильтры и генерировать файлы только для определённых локалей.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует только файл перевода на французский язык.

## Переменные пути

 Вы можете использовать переменные внутри пути `autoFill` для динамического определения целевых путей для сгенерированных файлов.

**Доступные переменные:**

- `{{locale}}` – Код локали (например, `fr`, `es`)
- `{{fileName}}` – Имя файла (например, `index`)
- `{{key}}` – Ключ словаря (например, `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Ваше содержимое
  },
};
```

Это сгенерирует:

- `./index.content.json`
- `./index.content.json`

## История документации

| Версия  | Дата       | Изменения                  |
| ------- | ---------- | -------------------------- |
| 6.0.0   | 2025-09-20 | Добавлена глобальная конфигурация |
| 6.0.0   | 2025-09-17 | Добавлена переменная `{{fileName}}` |
| 5.5.10  | 2025-06-29 | Инициализация истории      |
