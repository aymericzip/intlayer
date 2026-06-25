---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документация плагина Vite intlayerCompiler | vite-intlayer
description: Плагин Vite, который извлекает встроенные объявления контента Intlayer из файлов компонентов и записывает их в файлы JSON словаря во время сборки/трансформации.
keywords:
  - intlayerCompiler
  - vite
  - плагин
  - компилятор
  - контент
  - словарь
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Интегрировано в intlayer(); инициализация доки"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` — это плагин Vite, который сканирует исходные файлы компонентов на наличие **встроенных объявлений контента Intlayer** (inline declarations) — контента, определенного непосредственно внутри компонента, а не в отдельном файле `.content.ts`, — и записывает их в файлы JSON словаря во время фазы трансформации.

> **Начиная с Intlayer v9** `intlayerCompiler` автоматически включается в основной плагин [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md), если в конфигурации Intlayer включен компилятор (`compiler.enabled: true`) и задан путь вывода (`compiler.output`). Вам нужно регистрировать его отдельно только в том случае, если вы хотите полностью контролировать конфигурацию компилятора.

## Использование

### В составе `intlayer()` (рекомендуется, v9+)

Включите компилятор в конфигурации Intlayer:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // куда записываются извлеченные словари
  },
});
```

Затем используйте стандартный плагин без дополнительной регистрации:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Отдельно (при необходимости)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Опции

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Опция            | Тип                       | Описание                                                                                       |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Переопределение конфигурации Intlayer, передаваемое в `getConfiguration()`.                    |
| `compilerConfig` | `Partial<CompilerConfig>` | Переопределение специфичных настроек компилятора (например, `enabled`, `output`, `filesList`). |

### Пример

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Как это работает

### Фаза трансформации

Для каждого исходного файла, соответствующего `compiler.filesList`, плагин компилятора:

1. Пропускает содержимое файла через `extractContent` из `@intlayer/babel`.
2. Вызывает `onExtract` для каждого найденного объявления, записывая результирующий JSON словаря в `compiler.output`.
3. Возвращает трансформированный исходный код со встроенными объявлениями, замененными стандартными вызовами `useIntlayer('key')` / `getIntlayer('key')`.

Поддерживаемые типы файлов: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Когда файл компонента сохраняется в режиме разработки, компилятор:

1. Обнаруживает изменение файла через хук `handleHotUpdate` в Vite.
2. Повторно извлекает контент из обновленного файла.
3. Записывает обновленный JSON словаря.
4. Запускает полную перезагрузку страницы (`server.ws.send({ type: 'full-reload' })`).

Задержка (debounce) в 500 мс предотвращает бесконечный цикл повторного извлечения, вызываемый самой записью словаря (которая также запускает событие изменения файла).

### Дедупликация

`intlayerCompiler` использует тот же механизм дедупликации `createPrimaryInstanceGuard`, что и другие встроенные плагины. Когда присутствуют как `intlayer()` (который включает компилятор), так и ручной вызов `intlayerCompiler()`, запускается только первый зарегистрированный экземпляр — словари не записываются дважды.
