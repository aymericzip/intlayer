---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Автоматизоване витягування контенту для i18n
description: Автоматизуйте процес інтернаціоналізації за допомогою Intlayer Compiler. Витягуйте контент безпосередньо з ваших компонентів для швидшого та ефективнішого i18n у Vite, Next.js та інших.
keywords:
  - Intlayer
  - Compiler
  - Інтернаціоналізація
  - i18n
  - Автоматизація
  - Екстракція
  - Швидкість
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
    changes: Випуск компілятора
---

# Intlayer Compiler | Автоматизоване витягування контенту для i18n

## Що таке Intlayer Compiler?

The **Intlayer Compiler** — потужний інструмент, створений для автоматизації процесу інтернаціоналізації (i18n) у ваших додатках. Він сканує ваш вихідний код (JSX, TSX, Vue, Svelte) на наявність декларацій контенту, витягує їх і автоматично генерує необхідні файли словників. Це дозволяє зберігати контент поруч із компонентами, у той час як Intlayer займається керуванням та синхронізацією ваших словників.

## Чому використовувати Intlayer Compiler?

- **Automation**: Усуває ручне копіювання та вставляння контенту у словники.
- **Speed**: Оптимізоване витягування контенту, яке забезпечує швидкість процесу збірки.
- **Developer Experience**: Тримайте декларації контенту там, де вони використовуються, що покращує підтримуваність.
- **Live Updates**: Підтримує Hot Module Replacement (HMR) для миттєвого зворотного зв'язку під час розробки.

Див. публікацію в блозі [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md) для детальнішого порівняння.

## Чому не використовувати Intlayer Compiler?

Хоча компілятор надає відмінний досвід «just works», він також запроваджує певні компроміси, про які слід знати:

- **Heuristic ambiguity**: Компилятор має вгадувати, який контент призначений для користувача, а що — логіка додатка (наприклад, `className="active"`, коди статусу, ідентифікатори продуктів). У складних кодових базах це може призводити до хибних спрацьовувань або пропущених рядків, що вимагатимуть ручних анотацій та винятків.
- **Static-only extraction**: Екстракція на основі компілятора спирається на статичний аналіз. Рядки, які існують лише під час виконання (коди помилок API, поля CMS тощо), не можуть бути виявлені або перекладені лише компілятором, тому вам усе одно потрібна додаткова стратегія i18n на рівні виконання.

Для більш глибокого архітектурного порівняння див. публікацію в блозі [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md).

Як альтернативу, щоб автоматизувати ваш процес i18n і зберегти повний контроль над контентом, Intlayer також надає команду автоматичної екстракції `intlayer transform` (див. [Документація CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/transform.md)), або команду `Intlayer: extract content to Dictionary` з розширення Intlayer для VS Code (див. [Документація розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)).

## Використання

### Vite

Для додатків на базі Vite (React, Vue, Svelte тощо) найпростіший спосіб використовувати компілятор — через плагін `vite-intlayer`.

#### Встановлення

```bash
npm install vite-intlayer
```

#### Налаштування

Оновіть ваш `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Додає плагін компілятора
  ],
});
```

#### Підтримка фреймворків

Плагін Vite автоматично визначає та обробляє різні типи файлів:

- **React / JSX / TSX**: Обробляються нативно.
- **Vue**: Потребує `@intlayer/vue-compiler`.
- **Svelte**: Потребує `@intlayer/svelte-compiler`.

Переконайтеся, що встановили відповідний пакет компілятора для вашого фреймворку:

```bash
# Для Vue
npm install @intlayer/vue-compiler

# Для Svelte
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Для Next.js або інших додатків на базі Webpack, що використовують Babel, ви можете налаштувати компілятор за допомогою плагіна `@intlayer/babel`.

#### Встановлення

```bash
npm install @intlayer/babel
```

#### Конфігурація

Оновіть ваш `babel.config.js` (або `babel.config.json`), щоб додати плагін для екстракції. Ми надаємо хелпер `getExtractPluginOptions`, який автоматично завантажує вашу конфігурацію Intlayer.

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
    // Витягує контент з компонентів у словники
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Оптимізує імпорти, замінюючи useIntlayer на прямі імпорти словників
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Ця конфігурація гарантує, що контент, оголошений у ваших компонентах, автоматично витягується й використовується для генерації словників під час процесу збірки.
