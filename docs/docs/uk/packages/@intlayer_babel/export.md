---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Документація пакета @intlayer/babel"
description: Плагіни Babel для Intlayer, що керують вилученням вмісту, оптимізацією імпорту, очищенням невикористовуваних полів та приховуванням імен полів під час збірки.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - інтернаціоналізація
  - i18n
  - компілятор
  - оптимізація
  - очищення
  - мінімізація
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Об'єднання документації для всіх експортованих модулів"
author: aymericzip
---

# Пакет @intlayer/babel

Пакет `@intlayer/babel` надає набір спеціалізованих плагінів Babel для Intlayer. Ці плагіни охоплюють весь цикл збірки: вилучення оголошень вмісту, перезапис викликів `useIntlayer` / `getIntlayer` в оптимізований імпорт словників, очищення невикористовуваних полів та мінімізація імен полів.

## Встановлення

```bash
npm install @intlayer/babel
```

## Експортовані модулі

Імпорт:

```ts
import { ... } from "@intlayer/babel";
```

---

### Плагіни

| Функція / Класс                | Опис                                                                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | Плагін Babel, який вилучає вміст для перекладу з вихідних файлів і автоматично впроваджує хуки `useIntlayer` / `getIntlayer`. Розроблений для використання з Next.js та інструментами збірки на базі Babel.  |
| `intlayerOptimizeBabelPlugin`  | Плагін Babel, который перетворює виклики `useIntlayer` та `getIntlayer` і перезаписує їх імпорт в оптимізований імпорт JSON-словників (статичний, динамічний або через fetch).                               |
| `intlayerPurgeBabelPlugin`     | Плагін Babel, який аналізує вихідні файли та перезаписує зкомпільовані JSON-файли словників для вилучення невикористовуваних полів (`build.purge`) або їх перейменування на короткі аліаси (`build.minify`). |
| `intlayerMinifyBabelPlugin`    | Плагін Babel, який перезаписує вихідні файли для використання коротких аліасів полів, призначених на етапі мінімізації (наприклад, `content.title` ← `content.a`). Залежить від `intlayerPurgeBabelPlugin`.  |
| `makeFieldRenameBabelPlugin`   | Фабрична функція, що створює плагін Babel для перейменування звернень до полів вмісту словника у вихідних файлах відповідно до `dictionaryKeyToFieldRenameMap`, заповненої в `PruneContext`.                 |
| `makeUsageAnalyzerBabelPlugin` | Фабрична функция, що створює плагін Babel для аналізу використання `useIntlayer` / `getIntlayer` у вихідному коді та агрегування даних про використання полів у спільному `PruneContext`.                    |
| `getSharedPruneContext`        | Допоміжна функція, яка повертає спільний об'єкт `PruneContext` для вказаного базового каталогу або `null`, якщо він ще не був ініціалізований.                                                               |

---

### Утиліти налаштування плагінів

| Функція                    | Опис                                                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Завантажує конфігурацію Intlayer і повертає `ExtractPluginOptions`, готові для використання з `intlayerExtractBabelPlugin`.                              |
| `getOptimizePluginOptions` | Завантажує конфігурацію Intlayer та зкомпільовані словники, і повертає `OptimizePluginOptions`, готові для використання з `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Завантажує конфігурацію Intlayer і повертає `PurgePluginOptions`, готові для використання з `intlayerPurgeBabelPlugin`.                                  |
| `getMinifyPluginOptions`   | Завантажує конфігурацію Intlayer і повертає `MinifyPluginOptions`, готові для використання з `intlayerMinifyBabelPlugin`.                                |

---

### Типи

| Тип                     | Опис                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Режим компілятора: `'dev'` для розробки з підтримкою HMR або `'build'` для продакшен-збірок.                                     |
| `ExtractPluginOptions`  | Параметри для `intlayerExtractBabelPlugin`: список файлів, конфігурація, callback `onExtract` тощо.                              |
| `ExtractResult`         | Результат вилучення: ключ словника, шлях до файлу, вміст та локаль.                                                              |
| `OptimizePluginOptions` | Параметри для `intlayerOptimizeBabelPlugin`: шляхи до словників, режим імпорту, зіставлення режимів для кожного словника тощо.   |
| `PurgePluginOptions`    | Параметри для `intlayerPurgeBabelPlugin`: базовий каталог, прапорці purge/minify/optimize, список файлів компонентів.            |
| `MinifyPluginOptions`   | Параметри для `intlayerMinifyBabelPlugin`: базовий каталог, прапорці minify/optimize/editorEnabled.                              |
| `PruneContext`          | Спільний стан між плагінами аналізу та очищення: карти використання полів, карти перейменування тощо.                            |
| `DictionaryFieldUsage`  | Результат використання полів для одного словника: `Set<string>` або `'all'`, коли статичний аналіз не дає однозначної відповіді. |
| `NestedRenameEntry`     | Вузол у дереві перейменування: `shortName` та карта дочірніх елементів.                                                          |
| `NestedRenameMap`       | Один рівень у дереві перейменування: `Map<string, NestedRenameEntry>`.                                                           |
| `CompatCallerConfig`    | Конфігурація сумісного аналізатора використання для пакетів `compat-adapter` (ім'я викликаючого модуля та параметри обробки).    |
| `ScriptBlock`           | Блок скрипта, вилучений із SFC-файлу (Vue або Svelte): вміст, зміщення початку та зміщення кінця.                                |

---

### Допоміжні функції

| Функція                           | Опис                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `generateShortFieldName`          | Перетворює ціле число (починаючи з нуля) на короткий буквений ідентифікатор: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, тощо.                                 |
| `buildNestedRenameMapFromContent` | Рекурсивно будує `NestedRenameMap` на основі значень вмісту зкомпільованого словника з урахуванням структур вузлів Intlayer (translation, enumeration тощо). |
| `createPruneContext`              | Створює новий порожній об'єкт `PruneContext`, ініціалізований значеннями за замовчуванням.                                                                   |
| `extractScriptBlocks`             | Вилучає блоки `<script>` із SFC-файлів (Vue / Svelte) для подальшого аналізу в Babel.                                                                        |
| `BABEL_PARSER_OPTIONS`            | Константа, що представляє параметри парсера Babel, які охоплюють підтримувані фреймворки (React/Vue/Svelte/Angular/...).                                     |
| `INTLAYER_CALLER_NAMES`           | Константний список оригінальних імен викликаючих модулів Intlayer: `['useIntlayer', 'getIntlayer']`.                                                         |

---

## Приклад використання

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Примітка:** Плагін `intlayerPurgeBabelPlugin` має бути оголошений **перед** `intlayerMinifyBabelPlugin`, оскільки останній зчитує карту перейменування, створену першим. Крім того, обом має передувати плагін `intlayerOptimizeBabelPlugin`, щоб він міг бачити ключі словників до перезапису викликів `useIntlayer`.
