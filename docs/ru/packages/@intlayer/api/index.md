# @intlayer/api: NPM пакет для взаимодействия с Intlayer API

**Intlayer** — это набор пакетов, разработанных специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/api`** является SDK (набором средств разработки) для взаимодействия с Intlayer API. Он предоставляет набор функций для аудита декларации контента, взаимодействия с организациями, проектами и пользователями и т. д.

## Использование

```ts
import { intlayerAPI } from "@intlayer/api";

// Получить информацию о пользователях
intlayerAPI.user.getUserAPI({
  ids: ["user-id-1", "user-id-2"],
});
```

## Установка

Установите необходимый пакет, используя ваш предпочтительный менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
