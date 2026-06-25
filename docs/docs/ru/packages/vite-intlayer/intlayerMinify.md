---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документация плагина Vite intlayerMinify | vite-intlayer
description: Плагин Vite, который минимизирует скомпилированные файлы JSON словаря Intlayer и опционально скрывает имена полей содержимого для уменьшения размера бандла.
keywords:
  - intlayerMinify
  - vite
  - плагин
  - минимизация
  - размер бандла
  - словарь
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Инициализация доки"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` — это плагин Vite, который минимизирует скомпилированные JSON-файлы словарей во время сборки для продакшена. Он удаляет все ненужные пробельные символы и, в сочетании с `intlayerPrune`, опционально переименовывает поля содержимого в короткие буквенные алиасы (`a`, `b`, `c`, …) для дополнительного уменьшения размера бандла.

> Плагин уже автоматически включен и настроен, если вы используете [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md). Вам нужно регистрировать его вручную только в том случае, если вы самостоятельно собираете стек плагинов.

## Использование

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

## Условия активации

`intlayerMinify` активен **только** при выполнении всех трех следующих условий:

1. Команда Vite — `build` (не `serve` / dev).
2. `build.optimize` имеет значение `true` (или `undefined`, что по умолчанию равно `true` для сборок).
3. `build.minify` имеет значение `true` в вашей конфигурации Intlayer.

Он автоматически **отключается**, когда `editor.enabled` имеет значение `true`, так как редактору требуется полное, понятное человеку содержимое словарей.

## Что минимизируется

Плагин обрабатывает два пути хранения словарей (определяемых из `intlayer.system`):

- `dictionariesDir` — статические словари для всех языков (например, `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — динамические словари для конкретных языков

> Словари в режиме fetch (`fetchDictionariesDir`) **никовы** не минимизируются, поскольку они запрашиваются из удаленного API во время выполнения с использованием исходных имен полей. Переименование полей привело бы к несоответствию между ответом сервера и обращениями к свойствам на стороне клиента.

## Сокрытие имен полей (минимизация свойств)

Когда `intlayerPrune` анализирует кодовую базу и заполняет карту `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` также переименовывает имена полей контента в короткие алиасы. Например:

```json
// до
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// после (с сокрытием)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Соответствующие обращения к свойствам в исходных файлах переименовываются на шаге Babel в `intlayerOptimize`, поэтому поведение в рантайме остается неизменным.

Внутренние поля Intlayer (`nodeType`, `translation` и т.д.) никогда не переименовываются.

## Крайние случаи (Edge-cases)

Словари, отмеченные в `pruneContext.dictionariesWithEdgeCases` (структурные аномалии, обнаруженные во время фазы очистки), полностью пропускаются — они не минимизируются и не скрываются, чтобы избежать отправки поврежденных данных.

## Квалифицированные группы (коллекции / варианты / метаданные)

Для словарей с массивом `qualifierTypes` (коллекции, варианты и метаданные) плагин сохраняет массив `qualifierTypes` и карту `meta` без изменений. Маскируются только имена полей внутри записей `content`. Композитные ключи (используемые для сопоставления селекторов во время выполнения) никогда не изменяются.
