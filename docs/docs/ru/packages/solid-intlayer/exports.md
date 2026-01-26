---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета solid-intlayer
description: Интеграция Intlayer, специфичная для Solid, предоставляющая провайдеры и хуки для приложений на Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Унифицированная документация для всех экспортов
---

# Пакет solid-intlayer

Пакет `solid-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения на Solid. Он включает провайдеры и хуки для работы с многоязычным контентом.

## Установка

```bash
npm install solid-intlayer
```

## Экспорты

### Провайдер

Импорт:

```tsx
import "solid-intlayer";
```

| Компонент          | Описание                                                                                   | Связанный документ                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Основной провайдер, который оборачивает ваше приложение и предоставляет контекст Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/IntlayerProvider.md) |

### Хуки

Импорт:

```tsx
import "solid-intlayer";
```

| Хук                    | Описание                                                                                                                        | Связанная документация                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | На основе `useDictionary`, но внедряет оптимизированную версию словаря из сгенерированного объявления.                          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Обрабатывает объекты, похожие на словари (ключ, содержимое). Обрабатывает переводы `t()`, перечисления и т. д.                  | -                                                                                                                       |
| `useDictionaryAsync`   | То же, что и `useDictionary`, но работает с асинхронными словарями.                                                             | -                                                                                                                       |
| `useDictionaryDynamic` | То же, что и `useDictionary`, но работает с динамическими словарями.                                                            | -                                                                                                                       |
| `useLocale`            | Возвращает текущую локаль и функцию для её установки.                                                                           | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Клиентский хук для управления перезаписями URL. Автоматически обновляет URL, если существует локализованное правило перезаписи. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Возвращает объект Intl для текущей локали.                                                                                      | -                                                                                                                       |
| `useLoadDynamic`       | Хук для загрузки динамических словарей.                                                                                         | -                                                                                                                       |
| `t`                    | Выбирает контент на основе текущей локали.                                                                                      | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)                  |

### Компоненты

Импорт:

```tsx
import "solid-intlayer";
```

| Компонент          | Описание                                     |
| ------------------ | -------------------------------------------- |
| `MarkdownProvider` | Провайдер для контекста рендеринга Markdown. |
