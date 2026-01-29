---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Документація проміжного ПЗ intlayer для Hono | hono-intlayer
description: Дізнайтеся, як використовувати проміжне ПЗ intlayer для пакета hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Ініціалізація док.
---

# Документація проміжного ПЗ intlayer для Hono

Проміжне ПЗ `intlayer` для Hono виявляє локаль користувача та заповнює об'єкт контексту функціями Intlayer. Воно також дозволяє використовувати глобальні функції перекладу в контексті запиту.

## Використання

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    uk: "Привіт",
  });

  return c.text(content);
});
```

## Опис

Проміжне ПЗ виконує такі завдання:

1. **Виявлення локалі**: аналізує запит (заголовки, куки тощо) для визначення бажаної локалі користувача.
2. **Заповнення контексту**: додає дані Intlayer до контексту Hono, доступні через `c.get()`. Сюди входять:
   - `locale`: виявлена локаль.
   - `t`: функція перекладу.
   - `getIntlayer`: функція для отримання словників.
   - `getDictionary`: функція для обробки об'єктів словника.
3. **Управління контекстом**: використовує `cls-hooked` для управління асинхронним контекстом, дозволяючи глобальним функціям Intlayer (`t`, `getIntlayer`, `getDictionary`) отримувати доступ до локалі, специфічної для запиту, без передачі об'єкта контексту.
