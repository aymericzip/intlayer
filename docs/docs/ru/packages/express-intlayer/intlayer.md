---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация по middleware intlayer для Express | express-intlayer
description: Узнайте, как использовать middleware intlayer для пакета express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация по middleware intlayer для Express

Middleware `intlayer` для Express определяет локаль пользователя и предоставляет функции перевода через объект `res.locals`. Он также позволяет использовать функции `t` и `getIntlayer` во всех ваших обработчиках запросов.

## Использование

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Описание

Middleware выполняет следующие задачи:

1. **Определение локали**: Проверяет cookies, заголовки (например, `Accept-Language`) и параметры URL, чтобы определить локаль пользователя.
2. **Настройка контекста**: заполняет `res.locals` следующими полями:
   - `locale`: Определённая локаль.
   - `t`: Функция перевода, привязанная к определённой локали.
   - `getIntlayer`: Функция для получения словарей, привязанных к определённой локали.
3. **Асинхронное локальное хранилище**: оно настраивает контекст, позволяющий использовать глобальные функции `t` и `getIntlayer`, импортированные из `express-intlayer`, в рамках обработки запроса.
