---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документація плагина Vite intlayerMinify | vite-intlayer
description: Плагін Vite, який мінімізує зкомпільовані файли JSON словника Intlayer та опціонально приховує імена полів вмісту для зменшення розміру бандлу.
keywords:
  - intlayerMinify
  - vite
  - плагін
  - мінімізація
  - розмір бандлу
  - словник
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Ініціалізація доки"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` — це плагін Vite, який мінімізує зкомпільовані файли JSON словників під час збірки для продакшену. Він видаляє всі непотрібні пробіли і, у поєднанні з `intlayerPrune`, опціонально перейменовує поля вмісту на короткі буквені аліаси (`a`, `b`, `c`, …) для додаткового зменшення розміру бандлу.

> Плагін вже автоматично включений та налаштований, якщо ви використовуєте [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md). Вам потрібно реєструвати його вручну тільки в тому випадку, если ви самостійно збираєте стек плагінів.

## Використання

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Умови активації

`intlayerMinify` активний **тільки** за виконання всіх трьох наступних умов:

1. Команда Vite — `build` (не `serve` / dev).
2. `build.optimize` має значення `true` (або `undefined`, що за замовчуванням дорівнює `true` для збірок).
3. `build.minify` має значення `true` у вашій конфігурації Intlayer.

Він автоматично **вимикається**, коли `editor.enabled` має значення `true`, оскільки редактору потрібен повний, зрозумілий людині вміст словників.

## Що мінімізується

Плагін обробляє два шляхи зберігання словників (що визначаються з `intlayer.system`):

- `dictionariesDir` — статичні словники для всіх мов (наприклад, `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — динамічні словники для конкретних мов

> Словники в режимі fetch (`fetchDictionariesDir`) **ніколи** не мінімізуються, оскільки вони завантажуються з віддаленого API під час виконання з використанням оригінальних імен полів. Перейменування полів призвело б до невідповідності між відповіддю сервера та зверненнями до властивостей на стороні клієнта.

## Приховування імен полів (мінімізація властивостей)

Коли `intlayerPrune` аналізує кодову базу і заповнює карту `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` також перейменовує імена полів контенту на короткі аліаси. Наприклад:

```json
// до
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// після (з приховуванням)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Відповідні звернення до властивостей у вихідних файлах перейменовуються на кроці Babel в `intlayerOptimize`, тому поведінка в рантаймі залишається незмінною.

Внутрішні поля Intlayer (`nodeType`, `translation` тощо) ніколи не перейменовуються.

## Граничні випадки (Edge-cases)

Словники, позначені в `pruneContext.dictionariesWithEdgeCases` (структурні аномалії, виявлені під час фази очищення), повністю пропускаються — вони не мінімізуються і не приховуються, щоб уникнути відправки пошкоджених даних.

## Кваліфіковані групи (колекції / варіанти / метадані)

Для словників із масивом `qualifierTypes` (колекції, варіанти та метадані) плагін зберігає масив `qualifierTypes` та карту `meta` без змін. Маскуються лише імена полів усередині записів `content`. Композитні ключі (що використовуються для зіставлення селекторів під час виконання) ніколи не змінюються.
