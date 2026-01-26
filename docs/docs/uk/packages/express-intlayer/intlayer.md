---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація middleware intlayer для Express | express-intlayer
description: Дивіться, як використовувати middleware intlayer для пакету express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація middleware intlayer для Express

Middleware `intlayer` для Express визначає локаль користувача і надає функції перекладу через об'єкт `res.locals`. Також дозволяє використовувати функції `t` та `getIntlayer` у ваших обробниках запитів.

## Використання

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Опис

Middleware виконує наступні завдання:

1. **Визначення локалі**: Перевіряє cookies, заголовки (наприклад, `Accept-Language`) та параметри URL, щоб визначити локаль користувача.
2. **Налаштування контексту**: воно заповнює `res.locals` наступними значеннями:
   - `locale`: Виявлена локаль.
   - `t`: Функція перекладу, прив'язана до виявленої локалі.
   - `getIntlayer`: Функція для отримання словників, прив'язана до виявленої локалі.
3. **Async Local Storage**: встановлює контекст, який дозволяє використовувати глобальні функції `t` та `getIntlayer`, імпортовані з `express-intlayer`, у межах обробки запиту.
