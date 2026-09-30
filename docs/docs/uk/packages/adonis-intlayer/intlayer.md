---
createdAt: 2026-01-30
updatedAt: 2026-09-29
priority: 5
title: Документація проміжного ПЗ intlayer для AdonisJS | adonis-intlayer
description: "Middleware intlayer для AdonisJS визначає локаль користувача та надає функції перекладу через контекст запиту."
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: "Початкова документація"
author: aymericzip
---

# Документація проміжного ПЗ intlayer для AdonisJS

Проміжне ПЗ `intlayer` для AdonisJS визначає локаль користувача та надає функції перекладу через контекст запиту. Воно також дозволяє використовувати глобальні функції перекладу в межах потоку запиту.

## Використання

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Опис

Проміжне ПЗ виконує наступні завдання:

1. **Визначення локалі**: Воно аналізує запит (заголовки, куки тощо), щоб визначити бажану локаль користувача.
2. **Налаштування контексту**: Воно заповнює контекст запиту інформацією про локаль.

> Примітка: Щоб використовувати куки для визначення локалі, переконайтеся, що `@adonisjs/cookie` налаштовано та використовується у вашому додатку.
