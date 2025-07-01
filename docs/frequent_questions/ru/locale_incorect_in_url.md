---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Неверная локаль, полученная из URL
description: Узнайте, как исправить неверную локаль, полученную из URL.
keywords:
  - локаль
  - url
  - intlayer
  - next.js
  - vite
  - фреймворк
  - middleware
  - конфигурация
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# Неверная локаль, полученная из URL

## Описание проблемы

При попытке получить параметр локали из URL вы можете столкнуться с проблемой, когда значение локали неверно:

```js
const { locale } = await params;
console.log(locale); // возвращает "about" вместо ожидаемой локали
```

## Решение

### 1. Проверьте структуру файлов

Убедитесь, что путь маршрутизатора вашего приложения Next.js соответствует следующей структуре:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Проверьте конфигурацию Middleware

Проблема часто возникает, когда middleware отсутствует или не срабатывает. Файл middleware должен находиться по адресу:

```bash
src/middleware.ts
```

Этот middleware отвечает за переписывание маршрутов, когда `prefixDefault` установлен в `false`. Например, он переписывает `/en/about` в `/about`.

### 3. Шаблоны URL в зависимости от конфигурации

#### Конфигурация по умолчанию (`prefixDefault: false`, `noPrefix: false`)

- Английский: `/about`
- Французский: `/fr/about`
- Испанский: `/es/about`

#### При `prefixDefault: true`

- Английский: `/en/about`
- Французский: `/fr/about`
- Испанский: `/es/about`

#### При `noPrefix: true`

- Английский: `/about`
- Французский: `/about`
- Испанский: `/about`

Для получения дополнительной информации об этих параметрах конфигурации смотрите [Документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
