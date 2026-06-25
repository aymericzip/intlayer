---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документація плагина Vite intlayerCompiler | vite-intlayer
description: Плагін Vite, який витягує вбудовані оголошення контенту Intlayer з файлів компонентів і записує їх у файли JSON словника під час збірки/трансформації.
keywords:
  - intlayerCompiler
  - vite
  - плагін
  - компілятор
  - контент
  - словник
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Інтегровано в intlayer(); ініціалізація доки"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` — це плагін Vite, який сканує вихідні файли компонентів на наявність **вбудованих оголошень контенту Intlayer** (inline declarations) — контенту, визначеного безпосередньо всередині компонента, а не в окремому файлі `.content.ts`, — і записує їх у файли JSON словника під час фази трансформації.

> **Починаючи з Intlayer v9**, `intlayerCompiler` автоматично включається в основний плагін [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md), якщо в конфігурації Intlayer увімкнено компілятор (`compiler.enabled: true`) і вказано шлях виводу (`compiler.output`). Вам потрібно реєструвати його окремо лише в тому випадку, якщо ви хочете повністю контролювати конфігурацію компілятора.

## Використання

### У складі `intlayer()` (рекомендовано, v9+)

Увімкніть компілятор у конфігурації Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // куди записуються витягнуті словники
  },
});
```

Потім використовуйте стандартний плагін без додаткової реєстрації:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Окремо (за необхідності)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Опції

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Опція            | Тип                       | Опис                                                                                              |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Перевизначення конфігурації Intlayer, що передається в `getConfiguration()`.                      |
| `compilerConfig` | `Partial<CompilerConfig>` | Перевизначення специфічних налаштувань компілятора (наприклад, `enabled`, `output`, `filesList`). |

### Приклад

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Як це працює

### Фаза трансформації

Для кожного вихідного файлу, що відповідає `compiler.filesList`, плагін компілятора:

1. Пропускає вміст файлу через `extractContent` із `@intlayer/babel`.
2. Викликає `onExtract` для кожного знайденого оголошення, записуючи результуючий JSON словника в `compiler.output`.
3. Повертає трансформований вихідний код із вбудованими оголошеннями, заміненими стандартними викликами `useIntlayer('key')` / `getIntlayer('key')`.

Підтримувані типи файлів: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Коли файл компонента зберігається в режимі розробки, компілятор:

1. Виявляє зміну файлу через хук `handleHotUpdate` у Vite.
2. Повторно витягує контент з оновленого файлу.
3. Записує оновлений JSON словника.
4. Запускає повне перезавантаження сторінки (`server.ws.send({ type: 'full-reload' })`).

Затримка (debounce) у 500 мс запобігає нескінченному циклу повторного витягування, викликаному самим записом словника (який також запускає подію зміни файлу).

### Дедуплікація

`intlayerCompiler` використовує той самий механізм дедуплікації `createPrimaryInstanceGuard`, що й інші вбудовані плагіни. Коли присутні як `intlayer()` (який включає компілятор), так і ручний виклик `intlayerCompiler()`, запускається тільки перший зареєстрований екземпляр — словники не записуються двічі.
