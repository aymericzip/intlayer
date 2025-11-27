---
createdAt: 2025-09-09
updatedAt: 2025-09-09
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

В качестве альтернативы, для автоматизации процесса i18n при сохранении полного контроля над контентом, Intlayer также предоставляет команду автоматического извлечения `intlayer transform` (см. [документацию CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/transform.md)) или команду `Intlayer: extract content to Dictionary` из расширения Intlayer VS Code (см. [документацию расширения VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)).

## Использование

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

### Next.js (Babel)

Для Next.js или других приложений на основе Webpack с использованием Babel вы можете настроить компилятор с помощью плагина `@intlayer/babel`.

#### Установка

```bash
npm install @intlayer/babel
```

#### Конфигурация

Обновите ваш файл `babel.config.js` (или `babel.config.json`), чтобы включить плагин извлечения. Мы предоставляем вспомогательную функцию `getCompilerOptions` для автоматической загрузки вашей конфигурации Intlayer.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Автоматически загружает опции из intlayer.config.ts
    ],
  ],
};
```

Эта конфигурация гарантирует, что контент, объявленный в ваших компонентах, автоматически извлекается и используется для генерации словарей во время процесса сборки.
