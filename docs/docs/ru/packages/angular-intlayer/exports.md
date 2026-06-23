---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета angular-intlayer
description: Интеграция Intlayer для Angular, предоставляет провайдеры и сервисы для Angular-приложений.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Добавлена утилита usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Объединённая документация для всех экспортов"
author: aymericzip
---

# Пакет angular-intlayer

Пакет `angular-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в Angular-приложения. Он включает провайдеры и сервисы для работы с мультиязычным контентом.

## Установка

```bash
npm install angular-intlayer
```

## Экспорт

Импорт:

```tsx
import "angular-intlayer";
```

### Настройка

| Функция           | Описание                                                     |
| ----------------- | ------------------------------------------------------------ |
| `provideIntlayer` | Функция для регистрации Intlayer в вашем Angular-приложении. |

### Хуки

| Хук                    | Описание                                                                                                                  | Связанный документ                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Основан на `useDictionary`, но внедряет оптимизированную версию словаря из сгенерированного объявления.                   | -                                                                                                                     |
| `useDictionary`        | Обрабатывает объекты, похожие на словари (ключ, содержимое). Обрабатывает переводы `t()`, перечисления и т.д.             | -                                                                                                                     |
| `useDictionaryAsync`   | То же, что и `useDictionary`, но обрабатывает асинхронные словари.                                                        | -                                                                                                                     |
| `useDictionaryDynamic` | То же, что и `useDictionary`, но обрабатывает динамические словари.                                                       | -                                                                                                                     |
| `useLocale`            | Возвращает текущую локаль и функцию для её установки.                                                                     | -                                                                                                                     |
| `usePathname`          | Возвращает текущий путь в виде `Signal<string>` с удаленным сегментом локали. Реагирует на `popstate` через `DestroyRef`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | Возвращает объект Intl для текущей локали.                                                                                | -                                                                                                                     |
| `useLoadDynamic`       | Хук для загрузки динамических словарей.                                                                                   | -                                                                                                                     |

### Компоненты

| Компонент                   | Описание                                              |
| --------------------------- | ----------------------------------------------------- |
| `IntlayerMarkdownComponent` | Компонент Angular, который рендерит markdown-контент. |
