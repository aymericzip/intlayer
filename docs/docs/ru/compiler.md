---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Intlayer Compiler | Автоматизированное извлечение контента для i18n
description: Автоматизируйте процесс интернационализации с помощью Intlayer Compiler. Извлекайте контент напрямую из ваших компонентов для более быстрого и эффективного i18n в Vite, Next.js и других.
keywords:
  - Intlayer
  - Compiler
  - Интернационализация
  - i18n
  - Автоматизация
  - Извлечение
  - Скорость
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-09
    changes: Обновление опций компилятора, добавление поддержки FilePathPattern
  - version: 8.1.7
    date: 2026-02-25
    changes: Обновление опций компилятора
  - version: 7.3.1
    date: 2025-11-27
    changes: Выпуск Compiler
---

# Intlayer Compiler | Автоматизированное извлечение контента для i18n

## Что такое Intlayer Compiler?

**Intlayer Compiler** — это мощный инструмент, разработанный для автоматизации процесса интернационализации (i18n) в ваших приложениях. Он сканирует ваш исходный код (JSX, TSX, Vue, Svelte) на предмет объявлений контента, извлекает их и автоматически генерирует необходимые файлы словарей. Это позволяет вам хранить контент вместе с компонентами, в то время как Intlayer управляет и синхронизирует ваши словари.

## Почему стоит использовать Intlayer Compiler?

- **Автоматизация**: устраняет необходимость вручную копировать и вставлять контент в словари.
- **Скорость**: оптимизированное извлечение контента обеспечивает быструю сборку.
- **Опыт разработчика**: храните объявления контента прямо там, где они используются, что улучшает поддерживаемость.
- **Живые обновления**: поддержка Hot Module Replacement (HMR) для мгновенной обратной связи во время разработки.

См. блог-пост [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md) для более глубокого сравнения.

## Почему не использовать Intlayer Compiler?

Хотя компилятор предлагает отличный опыт "работает из коробки", он также вводит некоторые компромиссы, о которых вы должны знать:

- **Эвристическая неоднозначность**: Компилятор должен угадывать, что является пользовательским контентом, а что — логикой приложения (например, `className="active"`, коды состояния, ID продуктов). В сложных кодовых базах это может привести к ложным срабатываниям или пропущенным строкам, которые требуют ручных аннотаций и исключений.
- **Только статическое извлечение**: Извлечение на основе компилятора полагается на статический анализ. Строки, которые существуют только во время выполнения (коды ошибок API, поля CMS и т.д.), не могут быть обнаружены или переведены компилятором в одиночку, поэтому вам все еще нужна дополнительная стратегия i18n времени выполнения.

Для более глубокого архитектурного сравнения см. блог-пост [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md).

В качестве альтернативы, для автоматизации процесса i18n при сохранении полного контроля над контентом, Intlayer также предоставляет команду автоматического извлечения `intlayer extract` (см. [документацию CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md)) или команду `Intlayer: extract content to Dictionary` из расширения Intlayer VS Code (см. [документацию расширения VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)).

## Использование

<Tabs>
 <Tab value='vite'>

### Vite

Для приложений на базе Vite (React, Vue, Svelte и др.) самый простой способ использовать компилятор — через плагин `vite-intlayer`.

#### Установка

```bash
npm install vite-intlayer
```

#### Конфигурация

Обновите ваш `vite.config.ts`, чтобы включить плагин `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Добавляет плагин компилятора
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Поддержка фреймворков

Плагин Vite автоматически обнаруживает и обрабатывает различные типы файлов:

- **React / JSX / TSX**: Обрабатывается нативно.
- **Vue**: Требуется `@intlayer/vue-compiler`.
- **Svelte**: Требуется `@intlayer/svelte-compiler`.

Убедитесь, что установлен соответствующий пакет компилятора для вашего фреймворка:

```bash
# Для Vue
npm install @intlayer/vue-compiler

# Для Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Для Next.js или других приложений на основе Webpack с использованием Babel вы можете настроить компилятор с помощью плагина `@intlayer/babel`.

#### Установка

```bash
npm install @intlayer/babel
```

#### Конфигурация

Обновите ваш файл `babel.config.js` (или `babel.config.json`), чтобы включить плагин извлечения. Мы предоставляем вспомогательную функцию `getExtractPluginOptions` для автоматической загрузки вашей конфигурации Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Извлечение контента из компонентов в словари
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Оптимизация импорта путем замены useIntlayer на прямой импорт словарей
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Эта конфигурация гарантирует, что контент, объявленный в ваших компонентах, автоматически извлекается и используется для генерации словарей во время процесса сборки.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Пользовательская конфигурация

Чтобы настроить поведение компилятора, вы можете обновить файл `intlayer.config.ts` в корне вашего проекта.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     * Установите значение 'build-only', чтобы пропустить компилятор во время разработки и ускорить запуск.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам. Заменяет `outputDir`.
     *
     * - Пути, начинающиеся с `./`, разрешаются относительно каталога компонента.
     * - Пути, начинающиеся с `/`, разрешаются относительно корня проекта (`baseDir`).
     *
     * - Включение переменной `{{locale}}` в путь позволит создавать словари, разделенные по языкам.
     *
     * Примеры:
     * ```ts
     * {
     *   // Создавать многоязычные файлы .content.ts рядом с компонентом
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Эквивалентное использование строки шаблона
     * }
     * ```
     *
     * ```ts
     * {
     *   // Создавать централизованные JSON-файлы по языкам в корне проекта
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Эквивалентное использование строки шаблона
     * }
     * ```
     *
     * Список переменных:
     *   - `fileName`: Имя файла.
     *   - `key`: Ключ контента.
     *   - `locale`: Язык контента.
     *   - `extension`: Расширение файла.
     *   - `componentFileName`: Имя файла компонента.
     *   - `componentExtension`: Расширение файла компонента.
     *   - `format`: Формат словаря.
     *   - `componentFormat`: Формат словаря компонента.
     *   - `componentDirPath`: Путь к каталогу компонента.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     * Таким образом, компилятор можно запустить только один раз для трансформации приложения, а затем удалить.
     */
    saveComponents: false,

    /**
     * Вставить только контент в сгенерированный файл. Полезно для JSON-вывода i18next или ICU MessageFormat для каждого языка.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "", // Добавьте необязательный префикс для извлеченных ключей словаря
  },
};
````

### Справочник по конфигурации компилятора

Следующие свойства могут быть настроены в блоке `compiler` вашего файла `intlayer.config.ts`:

- **enabled**:
  - _Тип_: `boolean | 'build-only'`
  - _По умолчанию_: `true`
  - _Описание_: Указывает, должен ли компилятор быть включен.

- **dictionaryKeyPrefix**:
  - _Тип_: `string`
  - _По умолчанию_: `''`
  - _Описание_: Префикс для извлеченных ключей словаря.

- **transformPattern**:
  - _Тип_: `string | string[]`
  - _По умолчанию_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Описание_: (Устарело: вместо этого используйте `build.traversePattern`) Шаблоны для обхода кода для оптимизации.

- **excludePattern**:
  - _Тип_: `string | string[]`
  - _По умолчанию_: `['**/node_modules/**']`
  - _Описание_: (Устарело: вместо этого используйте `build.traversePattern`) Шаблоны для исключения из оптимизации.

- **output**:
  - _Тип_: `FilePathPattern`
  - _По умолчанию_: `({ key }) => 'compiler/${key}.content.json'`
  - _Описание_: Определяет путь к выходным файлам. Заменяет `outputDir`. Поддерживает динамические переменные, такие как `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, и `{{componentFormat}}`. Может быть задано как строка в формате `'my/{{var}}/path'` или как функция.
  - _Примечание_: Пути `./**/*` разрешаются относительно компонента. Пути `/**/*` разрешаются относительно `baseDir` Intlayer.
  - _Примечание_: Если язык определен в пути, словари будут генерироваться для каждого языка.
  - _Пример_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Тип_: `boolean`
  - _По умолчанию_: `false`
  - _Описание_: Указывает, должны ли метаданные сохраняться в файле. Если true, компилятор не будет сохранять метаданные словарей (ключ, оболочка содержимого). Полезно для вывода JSON i18next или ICU MessageFormat для каждой локали.
  - _Примечание_: Полезно при использовании с плагином `loadJSON`.
  - _Пример_:
    Если `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Если `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Тип_: `boolean`
  - _По умолчанию_: `false`
  - _Описание_: Указывает, должны ли компоненты сохраняться после трансформации.

### Заполнить недостающие переводы

Intlayer предоставляет инструмент CLI, который поможет вам заполнить недостающие переводы. Вы можете использовать команду `intlayer` для тестирования и заполнения недостающих переводов в вашем коде.

```bash
npx intlayer test         # Проверить наличие недостающих переводов
```

```bash
npx intlayer fill         # Заполнить недостающие переводы
```

### Извлечение

Intlayer предоставляет инструмент CLI для извлечения контента из вашего кода. Вы можете использовать команду `intlayer extract`, чтобы извлечь контент из вашего кода.

```bash
npx intlayer extract
```

> Для получения более подробной информации обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
