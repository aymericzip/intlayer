---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета react-native-intlayer
description: Поддержка React Native для Intlayer, предоставляющая провайдеры и полифилы.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Унифицированная документация для всех экспортов
---

# Пакет react-native-intlayer

Пакет `react-native-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения React Native. Он включает провайдер и полифилы для поддержки локалей.

## Установка

```bash
npm install react-native-intlayer
```

## Экспорты

### Провайдер

| Компонент          | Описание                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Провайдер-компонент, который оборачивает ваше приложение и предоставляет контекст Intlayer. |

Импорт:

```tsx
import "react-native-intlayer";
```

### Полифилл

| Функция            | Описание                                                                         |
| ------------------ | -------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Функция, применяющая необходимые полифилы для поддержки Intlayer в React Native. |

Импорт:

```tsx
import "react-native-intlayer";
```

### Конфигурация Metro

Пакет `react-native-intlayer` предоставляет утилиты конфигурации Metro, чтобы гарантировать корректную работу Intlayer с React Native.

| Функция                   | Описание                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Асинхронная функция, которая подготавливает Intlayer и объединяет конфигурацию Metro.       |
| `configMetroIntlayerSync` | Синхронная функция, которая объединяет конфигурацию Metro без подготовки ресурсов Intlayer. |
| `exclusionList`           | Создаёт шаблон RegExp для blockList Metro, чтобы исключать файлы контента из bundle.        |

Импорт:

```tsx
import "react-native-intlayer/metro";
import "react-native-intlayer/metro";
```
