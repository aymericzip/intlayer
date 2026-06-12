---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Тип IntlayerNode. Що це таке?
description: Що таке тип IntlayerNode? Чому мій рядок перетворюється на IntlayerNode&lt;string&gt;?
keywords:
  - Вступ
  - Початок роботи
  - Intlayer
  - Додаток
  - Пакети
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Ініціалізація документа"
author: aymericzip
---

# Що таке тип IntlayerNode?

Тип `IntlayerNode<T>` - це спеціальний тип, що надається пакетами intlayer, такими як `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` та `vanilla-intlayer`.

## Приклад використання

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

  return title; // повертає тип: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo додати інші фреймворки у вигляді вкладок, як у docs/docs/uk/dictionary/markdown.md
</Tabs>

### Чому Intlayer вставляє IntlayerNode?

Intlayer вставляє IntlayerNode, щоб мати можливість відображати селектори візуального редактора в контексті CMS / візуального редактора.

![Демо візуального редактора](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode - це розширений вузол React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla, який також дозволяє звертатися до властивостей базового примітивного вузла.

Наприклад:

```js
const content = useIntlayer("app");

// Випадок з рядком (String)
content.title; // Повертає IntlayerNode&lt;string&gt;
content.title.value; // Повертає базовий вміст, у даному випадку рядок

content.title.toString(); // Повертає рядок
content.title.toLowerCase(); // Повертає рядок
String(content.title); // Повертає рядок
content.title.toUpperCase(); // Повертає рядок у верхньому регістрі
content.title.replace("a", "b"); // Повертає змінений рядок
// ...
```

> Звернення до властивостей IntlayerNode буде працювати, але порушить можливість відображення селекторів у візуальному редакторі.

> IntlayerNode також може обгортати числа або інші типи, такі як `IntlayerNode<number>`.
