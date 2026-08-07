---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація плагіна intlayerPrune для Vite | vite-intlayer
description: Дізнайтеся, як використовувати плагін intlayerPrune для пакета vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - плагін
  - tree-shaking
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Документація плагіна intlayerPrune для Vite

Плагін Vite `intlayerPrune` використовується для виконання tree-shaking та видалення невикористаних словників з бандла вашого застосунку. Це допомагає зменшити фінальний розмір бандла, включаючи лише необхідний багатомовний вміст.

## Використання

### У складі `intlayer()` (рекомендовано)

Увімкніть pruning через конфіг Intlayer, і основний плагін буде керувати всім:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // вмикає як pruning, так і minify
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

Якщо ви вручну складаєте стек плагінів, `intlayerPrune` та `intlayerMinify` спільно використовують об'єкт `PruneContext`, який має бути створений один раз і передан обом:

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
    intlayerMinify(intlayerConfig, pruneContext), // опціональний, читає з того ж контексту
  ],
});
```

## Як це працює

### 1. Аналіз використання (buildStart)

Під час `buildStart` плагін `intlayerOptimize` (також частина `intlayer()`) сканує кожен файл вихідного коду компонента зі списку `build.filesList`. Для кожного виклику `useIntlayer('key')` або `getIntlayer('key')` він записує точно які поля доступні, наприклад:

```ts
const { title, description } = useIntlayer("myDict");
// записує: myDict → { title, description }
```

Це будує `pruneContext.fieldUsageMap` перед тим, як запустяться будь-які виклики `transform`.

### 2. JSON pruning (transform, enforce: 'pre')

Коли Vite обробляє скомпільований JSON-файл словника, `intlayerPrune` перехоплює його перед вбудованим JSON → ESM перетворенням Vite. Він читає карту використання полів із `pruneContext` та видаляє будь-яке поле контенту, яке не входить до записаного набору використання.

Підтримуються дві форми контенту:

- **Статичні словники** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Поля обрізаються за локалю всередині `translation`.
- **Динамічні (за локалю) словники** — плоске `{ fieldA: ..., fieldB: ... }`. Поля обрізаються на верхньому рівні.

### 3. Граничні випадки

Якщо структуру вмісту словника не можна розпізнати (наприклад, незвичайна вкладена форма), він додається до `pruneContext.dictionariesWithEdgeCases` і **залишається без змін**. Записується попередження. `intlayerMinify` також пропускає ці словники.

### 4. Карта перейменування полів

Коли pruning успішно завершується, `intlayerPrune` також записує `pruneContext.dictionaryKeyToFieldRenameMap` — відображення оригінальних назв полів на короткі псевдоніми. `intlayerMinify` читає цю карту для перейменування полів у вихідному JSON, а pass перейменування Babel в `intlayerOptimize` оновлює доступи до властивостей у вихідних файлах відповідно.

## Умови активації

`intlayerPrune` активний **лише** коли всі наступні умови виконані:

1. Команда Vite — `build`.
2. `build.optimize` має значення `true` (або `undefined`, що за замовчуванням дорівнює `true` для збірок).
3. `build.purge` має значення `true` у вашій конфігурації Intlayer.

Він автоматично **вимикається**, коли `editor.enabled` має значення `true`, оскільки редактору потрібна повна змістова частина словника.
