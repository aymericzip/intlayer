---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация плагина intlayer для Vite | vite-intlayer
description: Узнайте, как использовать плагин intlayer для пакета vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Инициализация документации"
author: aymericzip
---

# Документация плагина intlayer для Vite

Плагин Vite `intlayer` интегрирует конфигурацию Intlayer в процесс сборки. Он управляет алиасами словарей, запускает наблюдатель за словарями в режиме разработки и подготавливает словари для сборки.

## Использование

```ts
// файл vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Параметры

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` расширяет `GetConfigurationOptions` (см. `@intlayer/config`) со следующими дополнительными полями:

| Параметр        | Тип                             | По умолчанию | Описание                                                                                                                                                                    |
| --------------- | ------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`         | Дополнительные паттерны вызывающих функций для пакетов compat-adapter (например, `@intlayer/react-i18next`). Передается анализатору использования полей во время сборки.    |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined`  | Параметры, передаваемые встроенному прокси маршрутизации локалей. Используйте `ignore` для исключения определенных путей (например, маршруты API) из маршрутизации локалей. |

Все остальные параметры (`override`, `configFile`, …) передаются непосредственно в `getConfiguration()`.

### Примеры

#### Игнорирование API маршрутов при локализации

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

#### С пользовательским путем к файлу конфигурации

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### С использованием compat-adapter callers

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

## Что делает плагин

### 1. Подготовка словарей

Перед началом сборки (и один раз в час в режиме разработки), `intlayer` вызывает `prepareIntlayer` для компиляции всех файлов `.content.ts` в оптимизированные JSON-словари, хранящиеся в `.intlayer/`.

### 2. Aliases модулей

Плагин добавляет aliases разрешения Vite, так чтобы `import { myDict } from 'intlayer/dictionaries/my-dict'` разрешался в скомпилированный JSON файл на диске. SSR сборки используют `ssr.noExternal` для обеспечения того, чтобы все пакеты `@intlayer/*` были объединены с применёнными aliases.

### 3. Dev-server watcher

В режиме разработки запускается `chokidar` watcher. Когда `.content.ts` файл изменяется, словари перекомпилируются и Vite's HMR распространяет обновление на браузер.

### 4. Встроенный прокси маршрутизации локалей (v9+)

С Intlayer v9 промежуточное ПО `intlayerProxy` регистрируется автоматически внутри `intlayer()`. Оно обрабатывает:

- Обнаружение локали из префикса URL, cookies и заголовка `Accept-Language`.
- 301 редиректы, когда обнаруженная локаль не совпадает с текущим URL.
- Внутренние переписывания URL, чтобы фреймворк видел корректный параметр маршрута `[locale]`.

Прокси контролируется параметром `routing.enableProxy` (по умолчанию `true`) в конфигурации Intlayer. Чтобы полностью отключить его:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Чтобы настроить поведение прокси без отдельного вызова `intlayerProxy()`, передайте опции `proxy` основному плагину:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Полную справку по поведению маршрутизации см. в [документации intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerProxy.md).

### 5. Встроенный компилятор (v9+)

Когда `compiler.enabled` установлено на `true` **и** `compiler.output` указан в вашей конфигурации Intlayer, `intlayer()` автоматически регистрирует `intlayerCompiler`. Компилятор извлекает встроенные объявления контента, написанные непосредственно в файлах компонентов, и записывает их в словари во время трансформации. See [intlayerCompiler documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerCompiler.md).

### 6. Оптимизация сборки

Во время production сборки плагин добавляет:

- **intlayerOptimize** – Babel трансформация, которая переписывает `useIntlayer('key')` → `useDictionary(hash)` и внедряет прямой импорт JSON.
- **intlayerPrune** – удаляет неиспользуемые поля содержимого из dictionary JSON.
- **intlayerMinify** – компактирует dictionary JSON и опционально изменяет названия полей.

Эти оптимизации неактивны в режиме разработки.

## Устаревшие псевдонимы

| Устаревший экспорт | Замена     |
| ------------------ | ---------- |
| `intlayerPlugin`   | `intlayer` |
| `intLayerPlugin`   | `intlayer` |
