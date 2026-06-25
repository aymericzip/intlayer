---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Документация пакета @intlayer/babel"
description: Плагины Babel для Intlayer, управляющие извлечением содержимого, оптимизацией импорта, удалением неиспользуемых полей и сокрытием имен полей во время сборки.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - интернационализация
  - i18n
  - компилятор
  - оптимизация
  - очистка
  - минимизация
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Объединение документации по всем экспортируемым модулям"
author: aymericzip
---

# Пакет @intlayer/babel

Пакет `@intlayer/babel` предоставляет набор специализированных плагинов Babel для Intlayer. Эти плагины охватывают весь цикл сборки: извлечение объявлений контента, перезапись вызовов `useIntlayer` / `getIntlayer` в оптимизированный импорт словарей, удаление неиспользуемых полей и минимизация имен полей.

## Установка

```bash
npm install @intlayer/babel
```

## Экспортируемые модули

Импорт:

```ts
import { ... } from "@intlayer/babel";
```

---

### Плагины

| Функция / Класс                | Описание                                                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | Плагин Babel, который извлекает переводимый контент из исходных файлов и автоматически внедряет хуки `useIntlayer` / `getIntlayer`. Разработан для использования с Next.js и инструментами сборки на базе Babel.   |
| `intlayerOptimizeBabelPlugin`  | Плагин Babel, который преобразует вызовы `useIntlayer` и `getIntlayer` и перезаписывает их импорт в оптимизированный импорт JSON-словарей (статический, динамический или через fetch).                             |
| `intlayerPurgeBabelPlugin`     | Плагин Babel, который анализирует исходные файлы и перезаписывает скомпилированные JSON-файлы словарей для удаления неиспользуемых полей (`build.purge`) или их переименования в короткие алиасы (`build.minify`). |
| `intlayerMinifyBabelPlugin`    | Плагин Babel, который перезаписывает исходные файлы для использования коротких алиасов полей, назначенных на этапе минимизации (например, `content.title` ← `content.a`). Зависит от `intlayerPurgeBabelPlugin`.   |
| `makeFieldRenameBabelPlugin`   | Фабричная функция, создающая плагин Babel для переименования обращений к полям контента словаря в исходных файлах в соответствии с `dictionaryKeyToFieldRenameMap`, заполненной в `PruneContext`.                  |
| `makeUsageAnalyzerBabelPlugin` | Фабричная функция, создающая плагин Babel для анализа использования `useIntlayer` / `getIntlayer` в исходном коде и агрегирования данных об использовании полей в общем `PruneContext`.                            |
| `getSharedPruneContext`        | Вспомогательная функция, которая возвращает общий объект `PruneContext` для указанного базового каталога или `null`, если он еще не был инициализирован.                                                           |

---

### Утилиты настройки плагинов

| Функция                    | Описание                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Загружает конфигурацию Intlayer и возвращает `ExtractPluginOptions`, готовые для использования с `intlayerExtractBabelPlugin`.                               |
| `getOptimizePluginOptions` | Загружает конфигурацию Intlayer и скомпилированные словари, и возвращает `OptimizePluginOptions`, готовые для использования с `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Загружает конфигурацию Intlayer и возвращает `PurgePluginOptions`, готовые для использования с `intlayerPurgeBabelPlugin`.                                   |
| `getMinifyPluginOptions`   | Загружает конфигурацию Intlayer и возвращает `MinifyPluginOptions`, готовые для использования с `intlayerMinifyBabelPlugin`.                                 |

---

### Типы

| Тип                     | Описание                                                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Режим компилятора: `'dev'` для разработки с поддержкой HMR или `'build'` для продакшен-сборок.                                     |
| `ExtractPluginOptions`  | Параметры для `intlayerExtractBabelPlugin`: список файлов, конфигурация, callback `onExtract` и т. д.                              |
| `ExtractResult`         | Результат извлечения: ключ словаря, путь к файлу, содержимое и локаль.                                                             |
| `OptimizePluginOptions` | Параметры для `intlayerOptimizeBabelPlugin`: пути к словарям, режим импорта, сопоставление режимов для каждого словаря и т. д.     |
| `PurgePluginOptions`    | Параметры для `intlayerPurgeBabelPlugin`: базовый каталог, флаги purge/minify/optimize, список файлов компонентов.                 |
| `MinifyPluginOptions`   | Параметры для `intlayerMinifyBabelPlugin`: базовый каталог, флаги minify/optimize/editorEnabled.                                   |
| `PruneContext`          | Общее состояние плагинов анализа и очистки: карты использования полей, карты переименования и т. д.                                |
| `DictionaryFieldUsage`  | Результат использования полей для одного словаря: `Set<string>` или `'all'`, когда статический анализ не дает однозначного ответа. |
| `NestedRenameEntry`     | Узел в дереве переименования: `shortName` и карта дочерних элементов.                                                              |
| `NestedRenameMap`       | Один уровень в дереве переименования: `Map<string, NestedRenameEntry>`.                                                            |
| `CompatCallerConfig`    | Конфигурация совместимого анализатора использования для пакетов `compat-adapter` (имя вызывающего модуля и параметры обработки).   |
| `ScriptBlock`           | Блок скрипта, извлеченный из SFC-файла (Vue или Svelte): содержимое, смещение начала и смещение конца.                             |

---

### Вспомогательные функции

| Функция                           | Описание                                                                                                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Преобразует целое число (начиная с нуля) в короткий буквенный идентификатор: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                       |
| `buildNestedRenameMapFromContent` | Рекурсивно строит `NestedRenameMap` на основе значений содержимого скомпилированного словаря с учетом структур узлов Intlayer (translation, enumeration и т. д.). |
| `createPruneContext`              | Создает новый пустой объект `PruneContext`, инициализированный значениями по умолчанию.                                                                           |
| `extractScriptBlocks`             | Извлекает блоки `<script>` из SFC-файлов (Vue / Svelte) для последующего анализа в Babel.                                                                         |
| `BABEL_PARSER_OPTIONS`            | Константа, представляющая параметры парсера Babel, охватывающие поддерживаемые фреймворки (React/Vue/Svelte/Angular/...).                                         |
| `INTLAYER_CALLER_NAMES`           | Константный список исходных имен вызывающих модулей Intlayer: `['useIntlayer', 'getIntlayer']`.                                                                   |

---

## Пример использования

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

> **Примечание:** Плагин `intlayerPurgeBabelPlugin` должен быть объявлен **перед** `intlayerMinifyBabelPlugin`, так как последний считывает карту переименования, созданную первым. Кроме того, обоим должен предшествовать плагин `intlayerOptimizeBabelPlugin`, чтобы он мог видеть ключи словарей до перезаписи вызовов `useIntlayer`.
