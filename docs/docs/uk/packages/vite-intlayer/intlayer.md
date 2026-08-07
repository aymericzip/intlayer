---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація Vite-плагіна intlayer | vite-intlayer
description: Дізнайтеся, як використовувати плагін intlayer для пакета vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація Vite-плагіна intlayer

Vite-плагін `intlayer` інтегрує конфігурацію Intlayer у процес збірки. Він обробляє псевдоніми словників, запускає стеження за файлами словників у режимі розробки та готує словники для збірки.

## Використання

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Опції

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` розширює `GetConfigurationOptions` (див. `@intlayer/config`) з наступними додатковими полями:

| Опція           | Тип                             | За замовчуванням | Опис                                                                                                                                                             |
| --------------- | ------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`             | Додаткові шаблони для пакетів compat-adapter (наприклад `@intlayer/react-i18next`). Передаються до аналізатора використання полів під час збирання.              |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined`      | Опції, передані до вбудованого проксі маршрутизації локалі. Використовуйте `ignore`, щоб виключити певні шляхи (наприклад маршрути API) із маршрутизації локалі. |

Усі інші опції (`override`, `configFile`, …) передаються безпосередньо до `getConfiguration()`.

### Приклади

#### Ігнорування маршрутів API від маршрутизації локалі

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### З користувацьким шляхом до файлу конфігурації

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### З compat-adapter callers

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Що робить плагін

### 1. Підготовка словника

Перед початком збірки (та один раз на годину в режимі розробки), `intlayer` викликає `prepareIntlayer` для компіляції всіх файлів `.content.ts` в оптимізовані JSON-словники, які зберігаються в `.intlayer/`.

### 2. Module aliases

Плагін додає Vite resolve aliases, щоб `import { myDict } from 'intlayer/dictionaries/my-dict'` розв'язувався до скомпільованого JSON файлу на диску. SSR builds використовують `ssr.noExternal`, щоб забезпечити, що всі пакети `@intlayer/*` об'єднані з застосованими aliases.

### 3. Dev-server watcher

У режимі розробки запускається `chokidar` watcher. Коли змінюється файл `.content.ts`, словники перекомпілюються, а Vite's HMR поширює оновлення на браузер.

### 4. Bundled locale-routing proxy (v9+)

З версії Intlayer v9 middleware `intlayerProxy` реєструється автоматично всередині `intlayer()`. Він обробляє:

- Визначення локалі за префіксом URL, cookies та заголовком `Accept-Language`.
- 301 переспрямування, коли визначена локаль не відповідає поточному URL.
- Внутрішні переписування URL, щоб framework бачив правильний параметр маршруту `[locale]`.

Proxy керується параметром `routing.enableProxy` (за замовчуванням `true`) у конфігурації Intlayer. Щоб повністю відключити його:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Щоб налаштувати поведінку proxy без окремого виклику `intlayerProxy()`, передайте опції `proxy` до основного плагіна:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Див. [документацію intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerProxy.md) для повного довідника поведінки маршрутизації.

### 5. Bundled compiler (v9+)

Коли `compiler.enabled` має значення `true` **та** `compiler.output` встановлено у вашій конфігурації Intlayer, `intlayer()` автоматично реєструє `intlayerCompiler`. Компілятор витягує вбудовані декларації контенту, написані безпосередньо у файлах компонентів, і записує їх у словники під час трансформації. Дивіться [документацію intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerCompiler.md).

### 6. Оптимізація збірки

Під час виробничої збірки плагін додає:

- **intlayerOptimize** – трансформація Babel, яка перезаписує `useIntlayer('key')` → `useDictionary(hash)` та вводить прямий імпорт JSON.
- **intlayerPrune** – видаляє невикористовувані поля вмісту з JSON словника.
- **intlayerMinify** – стискує JSON словника та за потреби мангліфікує назви полів.

Ці функції неактивні в режимі розробки.

## Застарілі псевдоніми

| Застарілий експорт | Заміна     |
| ------------------ | ---------- |
| `intlayerPlugin`   | `intlayer` |
| `intLayerPlugin`   | `intlayer` |
