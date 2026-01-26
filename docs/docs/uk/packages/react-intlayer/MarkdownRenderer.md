---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація компонента MarkdownRenderer | react-intlayer
description: Дізнайтеся, як використовувати компонент MarkdownRenderer пакету react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація компонента MarkdownRenderer

Компонент `MarkdownRenderer` відображає markdown-вміст із використанням користувацьких компонентів.

## Використання

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Пропси

| Prop         | Type              | Description                                                                |
| ------------ | ----------------- | -------------------------------------------------------------------------- |
| `children`   | `string`          | Вміст у форматі markdown для відображення.                                 |
| `components` | `Overrides`       | Мапа кастомних компонентів для використання з певними елементами markdown. |
| `options`    | `MarkdownOptions` | Додаткові опції для рендерера markdown.                                    |
