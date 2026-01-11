---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Некоректна локаль, отримана з URL
description: Дізнайтеся, як виправити некоректну локаль, отриману з URL.
keywords:
  - локаль
  - url
  - intlayer
  - next.js
  - vite
  - фреймворк
  - middleware
  - конфігурація
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Некоректна локаль, отримана з URL

## Опис проблеми

Коли ви намагаєтеся отримати параметр locale з URL, ви можете зіткнутися з проблемою, коли значення локалі некоректне:

```js
const { locale } = await params;
console.log(locale); // повертає "about" замість очікуваної локалі
```

## Рішення

### 1. Перевірте структуру файлів

Переконайтеся, що шлях у app router вашого Next.js відповідає цій структурі:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Перевірте конфігурацію middleware

Проблема часто виникає, коли middleware відсутній або не спрацьовує. Файл middleware має знаходитись за шляхом:

```bash
src/middleware.ts
```

Цей middleware відповідає за переписування маршрутів, коли `prefixDefault` встановлено в `false`. Наприклад, він переписує `/en/about` на `/about`.

### 3. Шаблони URL залежно від конфігурації

#### Конфігурація за замовчуванням (`prefixDefault: false`, `noPrefix: false`)

- Англійська: `/about`
- Французька: `/fr/about`
- Іспанська: `/es/about`

#### Якщо `prefixDefault: true`

- Англійська: `/en/about`
- Французька: `/fr/about`
- Іспанська: `/es/about`

#### Якщо `noPrefix: true`

- Англійська: `/about`
- Французька: `/about`
- Іспанська: `/about`

Для докладнішої інформації про ці параметри конфігурації перегляньте [Документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
