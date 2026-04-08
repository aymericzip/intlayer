---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Оптимизация размера бандла i18n и производительности
description: Уменьшите размер бандла вашего приложения, оптимизируя контент интернационализации (i18n). Узнайте, как использовать tree shaking и lazy loading для словарей с помощью Intlayer.
keywords:
  - Оптимизация бандла
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Добавлены опции `minify` и `purge` в конфигурацию сборки"
---

# Оптимизация размера бандла i18n и производительности

Одной из наиболее распространенных проблем традиционных i18n-решений, полагающихся на JSON-файлы, является управление размером контента. Если разработчики вручную не разделяют контент на пространства имен (namespaces), пользователи часто скачивают переводы для каждой страницы и, возможно, для каждого языка только для того, чтобы просмотреть одну страницу.

Например, приложение с 10 страницами, переведенными на 10 языков, может привести к тому, что пользователь скачает контент 100 страниц, хотя ему нужна только **одна** (текущая страница на текущем языке). Это ведет к напрасной трате трафика и замедлению времени загрузки.

**Intlayer решает эту проблему с помощью оптимизации на этапе сборки.** Он анализирует ваш код, чтобы определить, какие словари действительно используются в каждом компоненте, и внедряет только необходимый контент в ваш бандл.

## Содержание

<TOC />

## Сканирование бандла

Анализ бандла — это первый шаг к выявлению "тяжелых" JSON-файлов и возможностей разделения кода. Эти инструменты генерируют визуальную древовидную карту (treemap) скомпилированного кода вашего приложения, позволяя вам точно увидеть, какие библиотеки занимают больше всего места.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite использует Rollup под капотом. Плагин `rollup-plugin-visualizer` генерирует интерактивный HTML-файл, показывающий размер каждого модуля в вашем графе.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Автоматически открыть отчет в браузере
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

Для проектов, использующих App Router и Turbopack, Next.js предоставляет встроенный экспериментальный анализатор, не требующий дополнительных зависимостей.

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

Если вы используете стандартный сборщик Webpack в Next.js, используйте официальный анализатор бандлов. Запустите его, установив переменную окружения во время сборки.

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
  // Ваша конфигурация Next.js
});
```

**Использование:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Стандартный Webpack

Для Create React App (ejected), Angular или кастомных настроек Webpack используйте отраслевой стандарт `webpack-bundle-analyzer`.

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

Intlayer использует **подход на уровне компонентов**. В отличие от глобальных JSON-файлов, ваш контент определяется рядом с вашими компонентами или внутри них. В процессе сборки Intlayer:

1.  **Анализирует** ваш код на наличие вызовов `useIntlayer`.
2.  **Собирает** соответствующий контент словаря.
3.  **Заменяет** вызов `useIntlayer` оптимизированным кодом на основе вашей конфигурации.

Это гарантирует, что:

- Если компонент не импортирован, его контент не включается в бандл (удаление мертвого кода).
- Если компонент загружается лениво (lazy-loading), его контент также загружается лениво.

## Настройка по платформам

<Tabs>
 <Tab value="nextjs">

### Next.js

Для трансформации Next.js требуется плагин `@intlayer/swc`, так как Next.js использует SWC для сборки.

> Этот плагин не устанавливается по умолчанию, так как плагины SWC для Next.js все еще находятся в стадии эксперимента. Это может измениться в будущем.

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

После установки Intlayer автоматически обнаружит и будет использовать плагин.

 </Tab>
 <Tab value="vite">

### Vite

Vite использует плагин `@intlayer/babel`, который включен как зависимость `vite-intlayer`. Оптимизация включена по умолчанию. Ничего больше делать не нужно.

 </Tab>
 <Tab value="webpack">

### Webpack

Чтобы включить оптимизацию бандла с помощью Intlayer в Webpack, вам необходимо установить и настроить соответствующий плагин Babel (`@intlayer/babel`) или SWC (`@intlayer/swc`).

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Конфигурация

Вы можете управлять тем, как Intlayer оптимизирует ваш бандл, с помощью свойства `build` в вашем `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Минифицировать словари для уменьшения размера бандла.
     */
     minify: true;

    /**
     * Удалять неиспользуемые ключи в словарях (purge)
     */
     purge: true;

    /**
     * Указывает, должна ли сборка проверять типы TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> В подавляющем большинстве случаев рекомендуется оставлять значение по умолчанию для параметра `optimize`.

> Подробности см. в документации по конфигурации: [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

### Опции сборки

В объекте конфигурации `build` доступны следующие опции:

| Свойство       | Тип       | По умолчанию | Описание                                                                                                                                                                                           |
| :------------- | :-------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined`  | Управляет включением оптимизации сборки. Если `true`, Intlayer заменяет вызовы словаря оптимизированными вставками. Если `false`, оптимизация отключена. В идеале в продакшене должно быть `true`. |
| **`minify`**   | `boolean` | `false`      | Минифицировать ли словари для уменьшения размера бандла.                                                                                                                                           |
| **`purge`**    | `boolean` | `false`      | Удалять ли неиспользуемые ключи в словарях.                                                                                                                                                        |

### Минификация

Минификация словарей удаляет ненужные пробелы, комментарии и уменьшает размер содержимого JSON. Это особенно полезно для больших словарей.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Примечание: Минификация игнорируется, если `optimize` отключен или если включен Визуальный редактор (так как редактору требуется полный контент для возможности редактирования).

### Очистка (Purging)

Очистка гарантирует, что в финальный бандл словарей будут включены только те ключи, которые действительно используются в вашем коде. Это может значительно уменьшить размер вашего бандла, если у вас есть большие словари со множеством ключей, которые используются не во всех частях вашего приложения.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Примечание: Очистка игнорируется, если параметр `optimize` отключен.

### Режим импорта (Import Mode)

Для больших приложений, включающих множество страниц и локалей, ваши JSON-файлы могут составлять значительную часть размера бандла. Intlayer позволяет вам контролировать способ загрузки словарей.

Режим импорта может быть определен по умолчанию глобально в вашем файле `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

А также для каждого словаря в ваших файлах `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Переопределить режим импорта по умолчанию
  content: {
    // ...
  },
};

export default appContent;
```

| Свойство         | Тип                                | По умолчанию | Описание                                                                                                                |
| :--------------- | :--------------------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`   | **Устарело**: Используйте `dictionary.importMode` вместо этого. Определяет, как загружаются словари (подробности ниже). |

Настройка `importMode` определяет, как содержимое словаря внедряется в ваш компонент.
Вы можете определить его глобально в файле `intlayer.config.ts` в объекте `dictionary` или переопределить для конкретного словаря в его файле `.content.ts`.

### 1. Статический режим (`default`)

В статическом режиме Intlayer заменяет `useIntlayer` на `useDictionary` и внедряет словарь непосредственно в JavaScript бандл.

- **Плюсы:** Мгновенный рендеринг (синхронный), отсутствие дополнительных сетевых запросов во время гидратации.
- **Минусы:** Бандл включает переводы для **всех** доступных языков для этого конкретного компонента.
- **Лучше всего для:** Одностраничных приложений (SPA).

**Пример трансформированного кода:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимизированный код (Статический)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Динамический режим

В динамическом режиме Intlayer заменяет `useIntlayer` на `useDictionaryAsync`. Это использует `import()` (механизм типа Suspense) для ленивой загрузки конкретно JSON для текущей локали.

- **Плюсы:** **Tree shaking на уровне локали.** Пользователь, просматривающий английскую версию, скачает _только_ английский словарь. Французский словарь никогда не загрузится.
- **Минусы:** Вызывает сетевой запрос (загрузку ассета) для каждого компонента во время гидратации.
- **Лучше всего для:** Больших текстовых блоков, статей или приложений с поддержкой многих языков, где размер бандла критичен.

**Пример трансформированного кода:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимизированный код (Динамический)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> При использовании `importMode: 'dynamic'`, если у вас на одной странице 100 компонентов используют `useIntlayer`, браузер попытается выполнить 100 отдельных загрузок. Чтобы избежать этого "водопада" запросов, группируйте контент в меньшее количество файлов `.content` (например, один словарь на раздел страницы), а не по одному на каждый мелкий компонент.

### 3. Режим Fetch

Ведет себя аналогично динамическому режиму, но сначала пытается получить словари из API Intlayer Live Sync. Если вызов API завершается неудачей или контент не помечен для живых обновлений, он переключается на динамический импорт.

> Подробности см. в документации CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)

> В режиме fetch нельзя использовать очистку (purge) и минификацию.

## Резюме: Статический vs Динамический

| Функция                          | Статический режим                          | Динамический режим                                  |
| :------------------------------- | :----------------------------------------- | :-------------------------------------------------- |
| **Размер JS бандла**             | Больше (включает все языки для компонента) | Меньше всего (только код, контента нет)             |
| **Начальная загрузка**           | Мгновенно (контент уже в бандле)           | Небольшая задержка (загрузка JSON)                  |
| **Сетевые запросы**              | 0 дополнительных запросов                  | 1 запрос на каждый словарь                          |
| **Tree Shaking**                 | На уровне компонентов                      | На уровне компонентов + на уровне локалей           |
| **Лучший вариант использования** | UI-компоненты, небольшие приложения        | Страницы с большим количеством текста, много языков |
