---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация плагина intlayer для Fastify | fastify-intlayer
description: Как использовать плагин intlayer для пакета fastify-intlayer
keywords:
  - intlayer
  - fastify
  - плагин
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация плагина intlayer для Fastify

Плагин `intlayer` для Fastify определяет локаль пользователя и дополняет объект запроса функциями Intlayer. Он также позволяет использовать глобальные функции перевода в контексте запроса.

## Использование

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

ts;
const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Описание

Плагин выполняет следующие задачи:

1. **Определение локали**: Он анализирует запрос (headers, cookies и т.д.), чтобы определить предпочтительную локаль пользователя.
2. **Декорирование запроса**: Добавляет свойство `intlayer` к объекту `FastifyRequest`, содержащее:
   - `locale`: обнаруженная локаль.
   - `t`: функция перевода.
   - `getIntlayer`: функция для получения словарей.
3. **Управление контекстом**: Использует `cls-hooked` для управления асинхронным контекстом, позволяя глобальным функциям Intlayer получать доступ к локали, специфичной для запроса.
