---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация компонента IntlayerProvider | react-intlayer
description: Показывает, как использовать компонент IntlayerProvider из пакета react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация компонента IntlayerProvider

Компонент `IntlayerProvider` является основным провайдером Intlayer в React-приложениях. Он предоставляет контекст Intlayer всем своим дочерним элементам.

## Использование

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Пропсы

| Свойство          | Тип                               | Описание                                                                   |
| ----------------- | --------------------------------- | -------------------------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | Начальная локаль, которая будет использоваться.                            |
| `defaultLocale`   | `LocalesValues`                   | Локаль по умолчанию, используемая в качестве резервного варианта.          |
| `setLocale`       | `(locale: LocalesValues) => void` | Пользовательская функция для установки локали.                             |
| `disableEditor`   | `boolean`                         | Флаг, указывающий, отключён ли редактор.                                   |
| `isCookieEnabled` | `boolean`                         | Флаг, указывающий, включено ли использование cookie для сохранения локали. |
