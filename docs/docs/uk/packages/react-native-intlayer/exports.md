---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета react-native-intlayer
description: Підтримка React Native для Intlayer, надає провайдери та поліфіли.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Узагальнена документація для всіх експортів
---

# Пакет react-native-intlayer

Пакет `react-native-intlayer` надає необхідні інструменти для інтеграції Intlayer у застосунки React Native. Він включає провайдер та поліфіли для підтримки локалі.

## Встановлення

```bash
npm install react-native-intlayer
```

## Експорти

### Провайдер

| Компонент          | Опис                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| `IntlayerProvider` | Компонент-провайдер, який обгортає ваш додаток і надає контекст Intlayer. |

Імпорт:

```tsx
import "react-native-intlayer";
```

### Поліфіл

| Функція            | Опис                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Функція, що застосовує необхідні поліфіли для React Native, щоб забезпечити підтримку Intlayer. |

Імпорт:

```tsx
import "react-native-intlayer";
```

### Конфігурація Metro

Пакет `react-native-intlayer` надає утиліти конфігурації Metro, щоб гарантувати правильну роботу Intlayer з React Native.

| Функція                   | Опис                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `configMetroIntlayer`     | Асинхронна функція, яка готує Intlayer та об'єднує конфігурацію Metro.               |
| `configMetroIntlayerSync` | Синхронна функція, яка об'єднує конфігурацію Metro без підготовки ресурсів Intlayer. |
| `exclusionList`           | Створює патерн RegExp для blockList Metro, щоб виключати файли контенту з бандлу.    |

Імпорт:

```tsx
import "react-native-intlayer/metro";
```
