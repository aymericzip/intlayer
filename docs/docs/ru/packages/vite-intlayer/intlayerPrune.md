---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация плагина intlayerPrune для Vite | vite-intlayer
description: Узнайте, как использовать плагин intlayerPrune для пакета vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Инициализация документации"
author: aymericzip
---

# Документация плагина intlayerPrune для Vite

Плагин Vite `intlayerPrune` используется для tree-shake и удаления неиспользуемых словарей из бандла вашего приложения. Это помогает уменьшить итоговый размер бандла, включая только необходимое мультиязычное содержимое.

## Использование

### As part of `intlayer()` (recommended)

Enable pruning through your Intlayer config and the main plugin handles everything:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // включает как прунинг, так и минификацию
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Если вы составляете стек плагинов вручную, `intlayerPrune` и `intlayerMinify` используют объект `PruneContext`, который должен быть создан один раз и передан обоим:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // опционально, читает из того же контекста
  ],
});
```

## Как это работает

### 1. Анализ использования (buildStart)

Во время `buildStart` плагин `intlayerOptimize` (также часть `intlayer()`) сканирует каждый файл исходного кода компонента, указанный в `build.filesList`. Для каждого вызова `useIntlayer('key')` или `getIntlayer('key')` он записывает точно, какие поля доступны, например:

```ts
const { title, description } = useIntlayer("myDict");
// записывает: myDict → { title, description }
```

Это создает `pruneContext.fieldUsageMap` перед выполнением любых вызовов `transform`.

### 2. JSON pruning (transform, enforce: 'pre')

Когда Vite обрабатывает скомпилированный файл JSON словаря, `intlayerPrune` перехватывает его перед встроенным преобразованием JSON → ESM в Vite. Он читает карту использования полей из `pruneContext` и удаляет любое поле содержимого, которое не находится в записанном наборе использования.

Поддерживаются две формы содержимого:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Поля обрезаются по локали внутри `translation`.
- **Dynamic (per-locale) dictionaries** — плоская структура `{ fieldA: ..., fieldB: ... }`. Поля обрезаются на верхнем уровне.

### 3. Граничные случаи

Если структура контента словаря не может быть распознана (например, необычная вложенная форма), она добавляется в `pruneContext.dictionariesWithEdgeCases` и **остается без изменений**. Записывается предупреждение. `intlayerMinify` также пропускает эти словари.

### 4. Field-rename map

При успешном завершении pruning `intlayerPrune` также записывает `pruneContext.dictionaryKeyToFieldRenameMap` — отображение исходных имен полей на короткие псевдонимы. `intlayerMinify` читает эту карту для переименования полей в выходном JSON, а Babel rename pass `intlayerOptimize` обновляет доступы к свойствам в исходных файлах соответственно.

## Условия активации

`intlayerPrune` активен **только** когда все из следующих условий верны:

1. Команда Vite — `build`.
2. `build.optimize` имеет значение `true` (или `undefined`, что по умолчанию равно `true` для сборок).
3. `build.purge` имеет значение `true` в вашей конфигурации Intlayer.

Он автоматически **отключается** когда `editor.enabled` имеет значение `true`, потому что редактор требует полного содержимого словаря.
