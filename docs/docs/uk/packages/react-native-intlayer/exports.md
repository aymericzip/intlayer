---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Документація пакета react-native-intlayer
description: Підтримка React Native для Intlayer, надає провайдери, хуки, поліфіли та конфігурацію Metro.
keywords:
  - react-native-intlayer
  - react-native
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Реекспорт повного API react-intlayer (хуки, утиліти, підшляхи format/html/markdown), щоб застосунок React Native залежав лише від react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Узагальнена документація для всіх експортів"
author: aymericzip
---

# Пакет react-native-intlayer

Пакет `react-native-intlayer` надає необхідні інструменти для інтеграції Intlayer у застосунки React Native. Він реекспортує повний API `react-intlayer` (хуки та утиліти) з `IntlayerProvider`, адаптованим для React Native, а також поліфіли та конфігурацію Metro, необхідні для React Native.

> У застосунку React Native імпортуйте **все** з `react-native-intlayer`. Встановлювати або імпортувати `react-intlayer` безпосередньо не потрібно.

## Встановлення

```bash
npm install react-native-intlayer
```

## Експорти

### Провайдер

| Компонент          | Опис                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Компонент-провайдер, який обгортає ваш додаток і надає контекст Intlayer. Автоматично застосовує необхідні поліфіли. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Хуки та утиліти

Вони реекспортуються з `react-intlayer`, тому ви можете імпортувати їх безпосередньо з `react-native-intlayer`:

| Експорт                                                                                                           | Опис                                                |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `useIntlayer`                                                                                                     | Доступ до локалізованого вмісту за ключем словника. |
| `useLocale`                                                                                                       | Читання та зміна поточної локалі.                   |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Завантаження вмісту словника різними способами.     |
| `useI18n`                                                                                                         | Хук, сумісний з i18next.                            |
| `t`                                                                                                               | Допоміжна функція для вбудованого перекладу.        |
| `getIntlayer`, `getDictionary`                                                                                    | Імперативні геттери контенту.                       |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Допоміжні функції для збереження локалі.            |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Поліфіл

| Функція            | Опис                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Функція, що застосовує необхідні поліфіли для React Native, щоб забезпечити підтримку Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Поліфіл застосовується автоматично при імпорті `IntlayerProvider`. Викликайте `intlayerPolyfill` вручну лише якщо вам потрібні поліфіли до монтування провайдера.

### Форматери

Хуки форматування чисел, дат та інші функції на базі Intl доступні з підшляху `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown та HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Конфігурація Metro

Пакет `react-native-intlayer` надає утиліти конфігурації Metro, щоб гарантувати правильну роботу Intlayer з React Native.

| Функція                   | Опис                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Асинхронна функція, яка готує Intlayer та об'єднує конфігурацію Metro.               |
| `configMetroIntlayerSync` | Синхронна функція, яка об'єднує конфігурацію Metro без підготовки ресурсів Intlayer. |
| `exclusionList`           | Створює патерн RegExp для blockList Metro, щоб виключати файли контенту з бандлу.    |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
