# @intlayer/api: NPM Пакет для взаимодействия с Intlayer API

**Intlayer** — это набор пакетов, специально разработанных для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/api`** — это SDK (Software Development Kit) для взаимодействия с Intlayer API. Он предоставляет набор функций для аудита декларации контента, взаимодействия с организациями, проектами, пользователями и т.д.

## Использование

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
