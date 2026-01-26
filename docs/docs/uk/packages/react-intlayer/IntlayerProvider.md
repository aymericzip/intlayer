---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація компонента IntlayerProvider | react-intlayer
description: Дивіться, як використовувати компонент IntlayerProvider для пакета react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація компонента IntlayerProvider

Компонент `IntlayerProvider` є основним провайдером Intlayer у React-застосунках. Він надає контекст Intlayer усім своїм дочірнім компонентам.

## Використання

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Пропси

| Властивість       | Тип                               | Опис                                                       |
| ----------------- | --------------------------------- | ---------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | Початкова локаль для використання.                         |
| `defaultLocale`   | `LocalesValues`                   | Локаль за замовчуванням, яка використовується як fallback. |
| `setLocale`       | `(locale: LocalesValues) => void` | Користувацька функція для встановлення локалі.             |
| `disableEditor`   | `boolean`                         | Чи вимкнути редактор.                                      |
| `isCookieEnabled` | `boolean`                         | Чи дозволити використання cookies для збереження локалі.   |
