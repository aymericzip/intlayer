---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Тип IntlayerNode. Что это такое?
description: Что такое тип IntlayerNode? Почему моя строка преобразуется в IntlayerNode&lt;string&gt;?
keywords:
  - Введение
  - Начало работы
  - Intlayer
  - Приложение
  - Пакеты
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Инициализация документа"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Что такое тип IntlayerNode?

Тип `IntlayerNode<T>` - это специальный тип, предоставляемый пакетами intlayer, такими как `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` и `vanilla-intlayer`.

## Пример использования

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // возвращает тип: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo добавить другие фреймворки в виде вкладок, как в docs/docs/ru/dictionary/markdown.md
</Tabs>

### Почему Intlayer вставляет IntlayerNode?

Intlayer вставляет IntlayerNode, чтобы иметь возможность отображать селекторы визуального редактора в контексте CMS / визуального редактора.

![Демо визуального редактора](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode - это расширенный узел React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla, который также позволяет обращаться к свойствам базового примитивного узла.

Например:

```js
const content = useIntlayer("app");

// Случай со строкой
content.title; // Возвращает IntlayerNode&lt;string&gt;
content.title.value; // Возвращает базовое содержимое, в данном случае строку

content.title.toString(); // Возвращает строку
content.title.toLowerCase(); // Возвращает строку
String(content.title); // Возвращает строку
content.title.toUpperCase(); // Возвращает строку в верхнем регистре
content.title.replace("a", "b"); // Возвращает измененную строку
// ...
```

> Обращение к свойствам IntlayerNode будет работать, но нарушит возможность отображения селекторов в визуальном редакторе.

> IntlayerNode также может оборачивать числа или другие типы, такие как `IntlayerNode<number>`.
