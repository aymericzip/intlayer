---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Оптимизация размера сборки (bundle) i18n и производительности
description: Уменьшите размер сборки вашего приложения за счет оптимизации контента интернационализации (i18n). Узнайте, как использовать tree shaking и ленивую загрузку (lazy loading) для словарей с помощью Intlayer.
keywords:
  - Оптимизация сборки
  - Автоматизация контента
  - Динамический контент
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Добавлены `intlayerPurgeBabelPlugin` и `intlayerMinifyBabelPlugin` для Babel/Webpack; уточнен процесс работы плагинов (pipeline)"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Добавлены параметры `minify` и `purge` в конфигурацию сборки"
author: aymericzip
---

# Оптимизация размера сборки i18n и производительности

Одной из самых распространенных проблем при использовании традиционных решений i18n, опирающихся на JSON-файлы, является управление размером контента. Если разработчики не разделяют контент на пространства имен (namespaces) вручную, пользователи часто вынуждены скачивать переводы для каждой страницы и, потенциально, для каждого языка только для того, чтобы просмотреть одну единственную страницу.

Например, в приложении с 10 страницами, переведенными на 10 языков, пользователь может загрузить контент сразу для 100 страниц, хотя ему нужна только **одна** (текущая страница на текущем языке). Это приводит к напрасной трате пропускной способности и замедлению времени загрузки.

**Intlayer решает эту проблему посредством оптимизации во время сборки (build-time optimization).** Он анализирует ваш код, чтобы обнаружить, какие именно словари фактически используются в каждом компоненте, и встраивает в вашу сборку только необходимый контент.

## Оглавление

<TOC />

## Анализ вашей сборки

Анализ вашей сборки (бандла) — это первый шаг к выявлению «тяжелых» JSON-файлов и возможностей для разделения кода (code-splitting). Специализированные инструменты генерируют визуальное дерево (treemap) скомпилированного кода вашего приложения, что позволяет точно увидеть, какие библиотеки потребляют больше всего места.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite использует Rollup «под капотом». Плагин `rollup-plugin-visualizer` генерирует интерактивный HTML-файл, отображающий размер каждого модуля в вашем графе.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Автоматически открывать отчет в браузере
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Для проектов, использующих App Router и Turbopack, Next.js предоставляет встроенный экспериментальный анализатор, который не требует установки дополнительных зависимостей.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Если вы используете стандартный сборщик Webpack в Next.js, воспользуйтесь официальным анализатором сборки. Его можно запустить, установив переменную окружения во время сборки.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Ваш конфиг Next.js
});
```

**Использование:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Стандартный Webpack

Для Create React App (ejected), Angular или пользовательских конфигураций Webpack используйте стандартный плагин `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Как это работает

Intlayer использует **компонентный подход**. В отличие от глобальных JSON-файлов, ваш контент определяется рядом с вашими компонентами или внутри них. В процессе сборки Intlayer выполняет следующие действия:

1. **Анализирует** ваш код, чтобы найти вызовы `useIntlayer`.
2. **Создает** соответствующий контент словаря.
3. **Заменяет** вызов `useIntlayer` оптимизированным кодом на основе вашей конфигурации.

Это гарантирует следующее:

- Если компонент не импортируется, его контент не включается в сборку (устранение мертвого кода — Dead Code Elimination).
- Если компонент загружается лениво (lazy-loaded), его контент также загружается лениво.

## Справочник по плагинам

Оптимизация сборки Intlayer разделена на несколько дискретных плагинов, каждый из которых имеет свою единственную ответственность. Понимание того, что делает каждый плагин, предотвращает путаницу при их настройке.

### Плагины Babel (`@intlayer/babel`)

Они используются непосредственно в `babel.config.js` для сборок на базе Webpack (Next.js с Babel, CRA, пользовательский Webpack и т.д.).

| Плагин                        | Что делает                                                                                                                              |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Сканирует `.content.ts` файлы и записывает скомпилированные словари в `.intlayer/`                                                      |
| `intlayerOptimizeBabelPlugin` | Переписывает `useIntlayer('key')` → `useDictionary(hash)` и внедряет (import) соответствующий словарь                                   |
| `intlayerPurgeBabelPlugin`    | Сканирует все исходные файлы, удаляет **неиспользуемые поля контента** из скомпилированных `.intlayer/**/*.json` файлов словарей        |
| `intlayerMinifyBabelPlugin`   | **Переименовывает ключи полей контента** в короткие буквенные алиасы (например, `title` → `a`) как в JSON-файлах, так и в исходном коде |

> **Порядок плагинов имеет значение.** В вашем `babel.config.js` плагины purge и minify должны быть указаны **до** плагина optimize. Оптимизация (optimize) заменяет `useIntlayer('key')` непрозрачным вызовом `useDictionary(hash)`, стирая информацию о ключе словаря, которая нужна плагинам purge и minify для определения того, какие поля используются.

Каждый плагин Babel имеет соответствующий помощник параметров (options helper), который однократно считывает ваш `intlayer.config.ts` во время загрузки конфигурации и возвращает предварительно разрешенные (resolved) значения:

| Помощник параметров          | Используется вместе с         |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Плагины Vite (`vite-intlayer`)

Пользователям Vite **не нужно настраивать их напрямую**. Они автоматически подключаются при вызове `withIntlayer()` в `vite.config.ts`. Флаги `build.purge` и `build.minify` в `intlayer.config.ts` включают соответствующее поведение без какой-либо дополнительной регистрации плагинов.

| Внутренний Vite плагин | Эквивалентное поведение                                                                                      |
| :--------------------- | :----------------------------------------------------------------------------------------------------------- |
| Usage analyzer         | То же самое, что и анализ плагина `intlayerPurgeBabelPlugin`                                                 |
| Dictionary prune       | То же самое, что и запись JSON плагином `intlayerPurgeBabelPlugin`                                           |
| Dictionary minify      | То же самое, что и запись JSON плагином `intlayerMinifyBabelPlugin`                                          |
| Babel transform        | То же самое, что и переименование исходного кода `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Настройка по платформам

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js требует использования плагина `@intlayer/swc` для оптимизации (перезаписи импортов), так как Next.js использует SWC при сборке.

> Этот плагин не устанавливается по умолчанию, поскольку плагины SWC всё еще находятся на стадии эксперимента для Next.js. Это может измениться в будущем.

<Tabs>
 <Tab value="npm">

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

 </Tab>
 <Tab value="Crates.io (rust)">

```toml fileName="Cargo.toml"
[dependencies]
intlayer-swc-plugin = "*"
```

[View on Crates.io](https://crates.io/crates/intlayer-swc-plugin)

 </Tab>
</Tabs>

После установки Intlayer автоматически обнаружит и использует этот плагин.

Для выполнения **удаления (purge) и минификации (minify)** (удаления полей и их переименования), установите `@intlayer/babel` параллельно с вышеуказанным и добавьте плагины Babel. Поскольку Next.js использует SWC для преобразований, но по-прежнему вычисляет (evaluates) `babel.config.js` для конфигурации плагинов, плагины Babel запускаются в качестве предварительного этапа до SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: удаляет неиспользуемые поля контента из .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: переименовывает ключи полей контента в JSON + в исходном коде
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Примечание: intlayerOptimizeBabelPlugin ЗДЕСЬ НЕ НУЖЕН, потому что
    // @intlayer/swc самостоятельно обрабатывает переписывание useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite использует плагин `@intlayer/babel`, который включен в качестве зависимости к `vite-intlayer`. Полный цикл оптимизации (pipeline) — перезапись импортов, удаление (purge) и минификация (minify) — включен по умолчанию и не требует регистрации дополнительных плагинов.

Включите purge и minify, установив соответствующие флаги в `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // удаляет неиспользуемые поля контента из собранных JSON
    minify: true, // переименовывает ключи полей контента в короткие алиасы
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (и Next.js с Babel)

Установите `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Добавьте все четыре плагина в `babel.config.js` в правильном порядке:

```javascript fileName="babel.config.js"
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
  plugins: [
    // Extract: компилирует файлы .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: удаляет неиспользуемые поля из .intlayer/**/*.json
    //    (считывает флаг build.purge из intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: переименовывает ключи в JSON + исходном коде
    //    (считывает флаг build.minify из intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: переписывает useIntlayer('key') → useDictionary(hash)
    //    Должен быть последним, поскольку удаляет ключ словаря.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Конфигурация

Вы можете управлять тем, как Intlayer оптимизирует вашу сборку, через свойство `build` в вашем `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.RUSSIAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Заменяет вызовы useIntlayer() на прямые импорты словарей во время сборки.
    // undefined = auto (активно в продакшене), true = всегда, false = никогда.
    optimize: undefined,

    // Переименовывает ключи полей контента в скомпилированных словарях в короткие
    // буквенные алиасы (например, title → a). Уменьшает размер JSON; требует optimize.
    minify: true,

    // Удаляет поля контента, к которым никогда не происходит обращение в исходном коде.
    // Требует optimize.
    purge: true,
  },
};

export default config;
```

> Во многих случаях рекомендуется оставлять значение по умолчанию (`undefined`) для параметра `optimize`.

> См. справочник конфигурации со всеми опциями: [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

### Параметры сборки (Build Options)

| Свойство       | Тип                   | По умолчанию | Описание                                                                                                                                                                                            |
| :------------- | :-------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined`  | Включает фазу перезаписи импортов. `undefined` = активно только для продакшен-сборок. `false` также отключает purge и minify.                                                                       |
| **`minify`**   | `boolean`             | `false`      | Переименовывает ключи полей контента в скомпилированных JSON-файлах в короткие буквенные алиасы. Также перезаписывает соответствующие обращения в исходном коде. Не работает при `optimize: false`. |
| **`purge`**    | `boolean`             | `false`      | Удаляет поля контента из скомпилированных JSON-файлов, к которым не происходит статического обращения в коде. Не работает при `optimize: false`.                                                    |

### Минификация (Minification) — переименование ключей полей

Параметр `build.minify` **не** занимается минификацией вашего JavaScript-бандла — с этой задачей должен справляться ваш сборщик. Вместо этого он уменьшает размер JSON-файлов скомпилированных словарей, заменяя каждый заданный пользователем ключ на короткий буквенный алиас:

```
// Перед минификацией
{ "title": "Привет", "subtitle": "Мир" }

// После минификации
{ "a": "Привет", "b": "Мир" }
```

Аналогичное переименование применяется ко всем обращениям к свойствам в вашем исходном коде, поэтому `content.title` в скомпилированном выходе превратится в `content.a`. Поведение приложения во время выполнения остается абсолютно идентичным.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Процесс минификации пропускается, если `optimize` установлен в `false` или когда `editor.enabled` имеет значение `true` (визуальный редактор требует сохранения оригинальных имен полей для возможности редактирования).

> Минификация также пропускается для словарей, загружаемых через `importMode: 'fetch'`, поскольку их JSON выдается удаленным API с оригинальными именами полей — изменение ключей на клиентской стороне нарушит контракт сервер/клиент.

### Удаление неиспользуемых полей (Purging)

Параметр `build.purge` анализирует, к каким полям контента фактически обращается ваш исходный код, и удаляет все остальные поля из скомпилированных JSON-файлов.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Пример:** словарь с пятью полями, из которых в коде используются только два:

```
// До очистки (purge)
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// После очистки (в коде используются только title и subtitle)
{ "title": "…", "subtitle": "…" }
```

> Процесс очистки пропускается, если `optimize` установлен в `false` или когда `editor.enabled` имеет значение `true`.

> Очистка также отменяется из соображений надежности, когда исходный файл не удается разобрать (парсинг), или если результат работы `useIntlayer` присваивается переменной и передается способами, которые статический анализатор не может проконтролировать (например, spreading объекта, передача через prop без деструктуризации). В этих случаях сохраняется весь словарь целиком.

### Режим импорта (Import Mode)

Для крупных приложений, включающих несколько страниц и локалей, ваш JSON может составлять значительную часть размера вашей сборки (bundle). Intlayer позволяет вам контролировать способ загрузки словарей с помощью опции `importMode`.

### Глобальное определение

Режим импорта можно определить глобально в вашем файле `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Значение по умолчанию — 'static'
  },
};

export default config;
```

### Определение на уровне словаря

Вы можете переопределить режим импорта для отдельных словарей в их файлах `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Переопределяем глобальный режим импорта
  content: {
    // ...
  },
};

export default appContent;
```

| Опция            | Тип                                | По умолчанию | Описание                                                                                                                 |
| :--------------- | :--------------------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`   | **Устарело**: Используйте `dictionary.importMode`. Определяет, каким образом загружаются словари (подробности см. ниже). |

Настройка `importMode` определяет, как контент словаря будет внедряться в ваш компонент. Эту настройку можно задать глобально в `intlayer.config.ts` (в объекте `dictionary`) или переопределить в файле `.content.ts` для каждого словаря.

### 1. Статический режим (Static Mode - `default`)

В статическом режиме Intlayer заменяет `useIntlayer` на `useDictionary` и внедряет словарь непосредственно в пакет (bundle) JavaScript.

- **Плюсы:** Мгновенный рендеринг (синхронный), ноль дополнительных сетевых запросов во время гидратации (hydration).
- **Минусы:** Сборка включает переводы для **всех** доступных языков, если они определены для данного компонента.
- **Подходит для:** Одностраничных приложений (SPA).

**Пример измененного кода:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимизированный код после преобразования (Static)
// Это только иллюстрация, реальный код будет другим по соображениям оптимизации
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      ru: "Мой заголовок",
    },
  },
});
```

### 2. Динамический режим (Dynamic Mode)

В динамическом режиме Intlayer заменяет `useIntlayer` на `useDictionaryAsync`. Он использует `import()` (подобно механизму Suspense), чтобы применять ленивую загрузку конкретно JSON для текущей локали.

- **Плюсы:** **Tree shaking на уровне локали (языка).** Пользователь, просматривающий английскую версию, загрузит _только_ английский словарь. Русский словарь никогда не будет загружен.
- **Минусы:** Вызывает сетевой запрос (получение ассетов) для каждого компонента во время гидратации.
- **Подходит для:** Крупных текстовых блоков, статей или приложений с поддержкой большого числа языков, где размер сборки имеет критическое значение.

**Пример измененного кода:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Иллюстрация оптимизированного кода (Dynamic)
// Это только иллюстрация, реальный код будет отличаться
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  ru: () =>
    import(".intlayer/dynamic_dictionary/my-key/ru.json").then(
      (mod) => mod.default
    ),
});
```

> Если вы используете `importMode: 'dynamic'` и у вас есть 100 компонентов на одной странице, каждый из которых вызывает `useIntlayer`, браузер предпримет 100 отдельных попыток получения файлов. Чтобы избежать этого «водопада» запросов, группируйте контент в меньшем количестве файлов `.content` (например, один словарь на раздел страницы), а не создавайте их по одному на каждый атомарный компонент. Вы также можете использовать несколько файлов `.content` с одним и тем же ключом: Intlayer объединит их в один единый словарь.

### 3. Режим Fetch

Данный режим работает аналогично динамическому режиму, но в первую очередь пытается получить словари из API синхронизации Intlayer Live Sync. Если вызов API не удается или контент не помечен для работы в реальном времени, происходит откат (fallback) к динамическому импорту.

**Пример измененного кода:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Иллюстрация оптимизированного кода (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  ru: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/ru").then((res) =>
      res.json()
    ),
});
```

> Подробнее смотрите в документации к CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)

> В режиме fetch ни purge (очистка), ни minify (минификация) не применяются, поскольку исходный JSON отдается удаленным API с оригинальными названиями полей.

## Итог: Статический vs Динамический

| Характеристика              | Статический режим (Static Mode)            | Динамический режим (Dynamic Mode)      |
| :-------------------------- | :----------------------------------------- | :------------------------------------- |
| **Размер сборки (JS)**      | Больше (включает все языки для компонента) | Минимальный (только код, без контента) |
| **Первоначальная загрузка** | Мгновенная (контент в бандле)              | Небольшая задержка (загрузка JSON)     |
| **Сетевые запросы**         | 0 дополнительных запросов                  | 1 запрос на каждый ключ словаря        |
| **Tree Shaking**            | На уровне компонентов                      | На уровне компонентов и локалей        |
| **Лучший сценарий**         | UI-компоненты, небольшие приложения        | Крупный текст, многоязычность          |
