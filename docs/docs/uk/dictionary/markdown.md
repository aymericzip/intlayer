---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Markdown
description: "Дізнайтеся, як оголошувати та використовувати контент у форматі Markdown на вашому багатомовному вебсайті з Intlayer. Дотримуйтесь кроків у цій онлайн-документації, щоб безшовно інтегрувати Markdown у ваш проєкт."
keywords:
  - Markdown
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Markdown / Форматований текст

## Як працює Markdown

Intlayer підтримує контент у форматі rich text, визначений за допомогою синтаксису Markdown. Це досягається за допомогою функції `md`, яка перетворює рядок у форматі Markdown у формат, яким може керувати Intlayer. Використовуючи Markdown, ви можете легко писати й підтримувати контент із багатим форматуванням, наприклад блоги, статті та інше.

[Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) обидва підтримують керування контентом у Markdown.

Під час інтеграції з React-додатком ви можете використовувати провайдера рендерингу Markdown (наприклад, [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)), щоб перетворювати вміст Markdown на HTML. Це дозволяє писати контент у Markdown і забезпечує його коректне відображення в вашому додатку.

## Налаштування Markdown-контенту

Щоб налаштувати Markdown-контент у вашому проєкті Intlayer, визначте словник контенту, що використовує функцію `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

// Тип словника Intlayer: import('intlayer').Dictionary
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Мій заголовок \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

// Тип словника Intlayer: import('intlayer').Dictionary
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Мій заголовок \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## Імпорт (багатомовний) файлу `.md`

Якщо ваш Markdown-файл має розширення `.md`, ви можете імпортувати його за допомогою різних форматів імпорту, які надає JavaScript або Intlayer.

Рекомендується віддавати перевагу імпорту через функцію [`file`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file.md), оскільки вона дозволяє Intlayer коректно керувати шляхами відносно розташування файлу та забезпечує інтеграцію цього файлу з Візуальним редактором / CMS.

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Ця декларація дозволяє TypeScript розпізнавати та імпортувати Markdown (.md) файли як модулі.
// Без цього TypeScript викинув би помилку при спробі імпортувати Markdown-файли,
// оскільки він за замовчуванням не підтримує імпорт нечітких файлів (non-code files).

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, file, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, file, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      uk: md(file("./myMarkdown.uk.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, file, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_uk = require("./myMarkdown.uk.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Імпорт зовнішніх файлів Markdown (.md) можливий лише за допомогою вузла `file` або деклараційних файлів JS чи TS.
// - Отримання зовнішнього вмісту Markdown можливе лише за допомогою деклараційних файлів JS або TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "": {
        "nodeType": "file",
        "file": "./myMarkdown.md",
      },
    },

    "contentMultilingualFile": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.en.md",
          },
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.fr.md",
          },
        },
        "es": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.es.md",
          },
        },
      },
    },
  },
}
```

## Використання Markdown з React Intlayer

Щоб відобразити вміст Markdown у React-застосунку, ви можете скористатися хуком `useIntlayer` з пакета `react-intlayer` разом із провайдером рендерингу Markdown. У цьому прикладі ми використовуємо пакет [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) для конвертації Markdown у HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

У цій реалізації:

- Компонент `MarkdownProvider` обгортає застосунок (або відповідну його частину) та приймає функцію `renderMarkdown`. Ця функція використовується для перетворення рядків Markdown у JSX за допомогою пакету `markdown-to-jsx`.
- Хук `useIntlayer` використовується для отримання вмісту Markdown (`myMarkdownContent`) зі словника за ключем `"app"`.
- Вміст Markdown рендериться безпосередньо в компоненті, а рендеринг Markdown обробляється провайдером.

### Використання Markdown з Next Intlayer

Реалізація з пакетом `next-intlayer` схожа на наведену вище. Єдина відмінність полягає в тому, що функцію `renderMarkdown` слід передати в компонент `MarkdownProvider` у клієнтському компоненті.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Додаткові ресурси

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Intlayer для React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)
- [markdown-to-jsx на npm](https://www.npmjs.com/package/markdown-to-jsx)

Ці ресурси надають додаткову інформацію щодо налаштування та використання Intlayer з різними типами контенту та фреймворками.
