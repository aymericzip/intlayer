---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація хуку useIntlayer | react-intlayer
description: Дізнайтеся, як використовувати хук useIntlayer у пакеті react-intlayer
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Інтеграція з React: документація хуку `useIntlayer`

У цьому розділі наведено докладні вказівки щодо використання хука `useIntlayer` у React-застосунках, що дозволяє ефективно локалізувати вміст.

## Приклад використання в React

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Додаткові ресурси

- **Intlayer Visual Editor**: Для інтуїтивнішого управління контентом зверніться до документації візуального редактора [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Цей розділ спеціально присвячений інтеграції хука `useIntlayer` у React-застосунках, що спрощує процес локалізації та забезпечує узгодженість контенту між різними локалями.
