---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация компонента MarkdownRenderer | react-intlayer
description: Узнайте, как использовать компонент MarkdownRenderer из пакета react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация компонента MarkdownRenderer

Компонент `MarkdownRenderer` рендерит markdown-контент с использованием пользовательских компонентов.

## Использование

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Пропсы

| Свойство     | Тип               | Описание                                                                              |
| ------------ | ----------------- | ------------------------------------------------------------------------------------- |
| `children`   | `string`          | Содержимое в формате markdown для рендеринга.                                         |
| `components` | `Overrides`       | Map пользовательских компонентов для использования с конкретными элементами markdown. |
| `options`    | `MarkdownOptions` | Дополнительные опции для рендерера markdown.                                          |
