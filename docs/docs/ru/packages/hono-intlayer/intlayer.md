---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Документация промежуточного ПО intlayer для Hono | hono-intlayer
description: Узнайте, как использовать промежуточное ПО intlayer для пакета hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Инициализация док.
---

# Документация промежуточного ПО intlayer для Hono

Промежуточное ПО `intlayer` для Hono определяет локаль пользователя и заполняет объект контекста функциями Intlayer. Оно также позволяет использовать глобальные функции перевода в контексте запроса.

## Использование

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
    ru: "Привет",
  });

  return c.text(content);
});
```

## Описание

Промежуточное ПО выполняет следующие задачи:

1. **Определение локали**: анализирует запрос (заголовки, cookies и т. д.) для определения предпочтительной локали пользователя.
2. **Заполнение контекста**: добавляет данные Intlayer в контекст Hono, доступный через `c.get()`. Сюда входят:
   - `locale`: определенная локаль.
   - `t`: функция перевода.
   - `getIntlayer`: функция для получения словарей.
   - `getDictionary`: функция для обработки объектов словаря.
3. **Управление контекстом**: использует `cls-hooked` для управления асинхронным контекстом, позволяя глобальным функциям Intlayer (`t`, `getIntlayer`, `getDictionary`) получать доступ к локали, специфичной для запроса, без передачи объекта контекста.
