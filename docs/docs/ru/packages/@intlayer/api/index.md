---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - SDK для интеграции с Intlayer API
description: Пакет NPM, предоставляющий набор для разработки программного обеспечения (SDK) для взаимодействия с Intlayer API для аудита контента, организаций, проектов и управления пользователями.
keywords:
  - intlayer
  - API
  - SDK
  - интеграция
  - аудит контента
  - организации
  - проекты
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api: Пакет NPM для взаимодействия с Intlayer API

**Intlayer** — это набор пакетов, разработанных специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `@intlayer/api`** — это SDK (набор для разработки программного обеспечения) для взаимодействия с Intlayer API. Он предоставляет набор функций для аудита деклараций контента, взаимодействия с организациями, проектами, пользователями и т.д.

## Использование

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
