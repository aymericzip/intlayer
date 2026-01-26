---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація плагіна intlayer для Fastify | fastify-intlayer
description: Дізнайтеся, як використовувати плагін intlayer для пакету fastify-intlayer
keywords:
  - intlayer
  - fastify
  - плагін
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація плагіна intlayer для Fastify

Плагін `intlayer` для Fastify визначає локаль користувача і додає до об'єкта запиту функції Intlayer. Він також дозволяє використовувати глобальні функції перекладу в контексті запиту.

## Використання

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Опис

Плагін виконує такі завдання:

1. **Визначення локалі**: Аналізує запит (заголовки, cookie тощо), щоб визначити пріоритетну локаль користувача.
2. **Декорування запиту**: Додає властивість `intlayer` до об'єкта `FastifyRequest`, яка містить:
   - `locale`: Виявлена локаль.
   - `t`: Функція перекладу.
   - `getIntlayer`: Функція для отримання словників.
3. **Управління контекстом**: Використовує `cls-hooked` для керування асинхронним контекстом, що дозволяє глобальним функціям Intlayer доступ до локалі, специфічної для запиту.
