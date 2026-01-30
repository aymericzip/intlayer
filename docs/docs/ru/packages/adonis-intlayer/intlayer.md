---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Документация промежуточного ПО AdonisJS Intlayer | adonis-intlayer
description: Узнайте, как использовать промежуточное ПО intlayer для пакета adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Начальная документация
---

# Документация промежуточного ПО AdonisJS Intlayer

Промежуточное ПО `intlayer` для AdonisJS обнаруживает локаль пользователя и предоставляет функции перевода через контекст запроса. Оно также позволяет использовать глобальные функции перевода в рамках потока запроса.

## Использование

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

## Описание

Промежуточное ПО выполняет следующие задачи:

1. **Обнаружение локали**: Оно анализирует запрос (заголовки, куки и т. д.) для определения предпочтительной локали пользователя.
2. **Настройка контекста**: Оно заполняет контекст запроса информацией о локали.
3. **Async Local Storage**: Оно использует `cls-hooked` для управления асинхронным контекстом, позволяя глобальным функциям Intlayer, таким как `t`, `getIntlayer` и `getDictionary`, получать доступ к локали конкретного запроса без необходимости передавать её вручную.

> Примечание: Для использования куки при обнаружении локали убедитесь, что `@adonisjs/cookie` настроен и используется в вашем приложении.
