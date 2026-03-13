---
createdAt: 2025-09-09
updatedAt: 2026-03-12
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
  - version: 8.2.0
    date: 2026-03-09
    changes: Оновлення опцій компілятора, додана підтримка FilePathPattern
  - version: 8.1.7
    date: 2026-02-25
    changes: Оновлення опцій компілятора
  - version: 7.3.1
    date: 2025-11-27
    changes: Випуск компілятора
---

# Intlayer Compiler | Автоматизоване витягування контенту для i18n

## Що таке Intlayer Compiler?

**Intlayer Compiler** — це потужний інструмент, розроблений для автоматизації процесу інтернаціоналізації (i18n) у ваших додатках. Він сканує ваш вихідний код (JSX, TSX, Vue, Svelte) на наявність декларацій контенту, витягує їх і автоматично генерує необхідні файли словників. Це дозволяє зберігати контент поруч із компонентами, тоді як Intlayer займається керуванням та синхронізацією ваших словників.

## Чому використовувати Intlayer Compiler?

- **Автоматизація**: Усуває ручне копіювання та вставляння контенту у словники.
- **Швидкість**: Оптимізоване витягування контенту забезпечує швидкість процесу збірки.
- **Досвід розробника**: Тримайте декларації контенту там, де вони використовуються, що покращує підтримуваність.
- **Оновлення в реальному часі**: Підтримує Hot Module Replacement (HMR) для миттєвого зворотного зв'язку під час розробки.

Див. статтю в блозі [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md) для глибшого порівняння.

## Чому не використовувати Intlayer Compiler?

Хоча компілятор пропонує чудовий досвід «just works», він також вносить певні компроміси, про які варто знати:

- **Евристична неоднозначність**: Компілятор має вгадувати, що є контентом для користувача, а що — логікою додатка (наприклад, `className="active"`, коди статусів, ID продуктів). У складних кодових базах це може призводити до хибних спрацьовувань або пропущених рядків, що вимагатиме ручних анотацій та винятків.
- **Тільки статична екстракція**: Екстракція на основі компілятора покладається на статичний аналіз. Рядки, які існують лише під час виконання (коди помилок API, поля CMS тощо), не можуть бути виявлені або перекладені лише компілятором, тому вам усе одно знадобиться додаткова стратегія i18n під час виконання.

Для глибшого архітектурного порівняння див. статтю в блозі [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md).

Як альтернативу, щоб автоматизувати ваш процес i18n і зберегти повний контроль над контентом, Intlayer також пропонує команду автоматичної екстракції `intlayer extract` (див. [документацію CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)), або команду `Intlayer: extract content to Dictionary` з розширення Intlayer для VS Code (див. [документацію розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)).

## Використання

<Tabs>
 <Tab value='vite'>

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

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

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

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Для Next.js або інших додатків на базі Webpack, що використовують Babel, ви можете налаштувати компілятор за допомогою плагіна `@intlayer/babel`.

#### Встановлення

```bash
npm install @intlayer/babel
```

#### Налаштування

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

Ця конфігурація гарантує, що контент, оголошений у ваших компонентах, буде автоматично витягнутий і використаний для генерації словників під час процесу збірки.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Користувацька конфігурація

Щоб налаштувати поведінку компілятора, ви можете оновити файл `intlayer.config.ts` у корені вашого проєкту.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Вказує, чи має бути увімкнено компілятор.
     * Встановіть значення 'build-only', щоб пропустити компілятор під час розробки та прискорити запуск.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів. Замінює `outputDir`.
     *
     * - Шляхи, що починаються з `./`, розв'язуються відносно каталогу компонента.
     * - Шляхи, що починаються з `/`, розв'язуються відносно кореня проєкту (`baseDir`).
     *
     * - Включення змінної `{{locale}}` у шлях дозволить генерувати словники, розділені за локалями.
     *
     * Приклади:
     * ```ts
     * {
     *   // Створює багатомовні файли .content.ts поруч із компонентом
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Еквівалент з використанням рядкового шаблону
     * }
     * ```
     *
     * ```ts
     * {
     *   // Створює централізовані JSON-файли за локалями в корені проєкту
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Еквівалент з використанням рядкового шаблону
     * }
     * ```
     *
     * Список змінних:
     *   - `fileName`: Назва файлу.
     *   - `key`: Ключ контенту.
     *   - `locale`: Локаль контенту.
     *   - `extension`: Розширення файлу.
     *   - `componentFileName`: Назва файлу компонента.
     *   - `componentExtension`: Розширення файлу компонента.
     *   - `format`: Формат словника.
     *   - `componentFormat`: Формат словника компонента.
     *   - `componentDirPath`: Шлях до каталогу компонента.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи мають компоненти зберігатися після трансформації.
     * Таким чином компілятор можна запустити лише один раз для трансформації додатка, а потім видалити.
     */
    saveComponents: false,

    /**
     * Вставляє лише контент у згенерований файл. Корисно для виводу JSON для i18next або ICU MessageFormat для кожної локалі.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "", // Додає необов'язковий префікс для витягнутих ключів словника
  },
};

export default config;
````

### Довідник з конфігурації компілятора

Наступні властивості можна налаштувати в блоці `compiler` вашого файлу `intlayer.config.ts`:

- **enabled**:
  - _Тип_: `boolean | 'build-only'`
  - _Типово_: `true`
  - _Опис_: Вказує, чи має бути увімкнено компілятор.

- **dictionaryKeyPrefix**:
  - _Тип_: `string`
  - _Типово_: `''`
  - _Опис_: Префікс для витягнутих ключів словника.

- **transformPattern**:
  - _Тип_: `string | string[]`
  - _Типово_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Опис_: (Застаріло: використовуйте `build.traversePattern`) Шаблони для обходу коду для оптимізації.

- **excludePattern**:
  - _Тип_: `string | string[]`
  - _Типово_: `['**/node_modules/**']`
  - _Опис_: (Застаріло: використовуйте `build.traversePattern`) Шаблони для виключення з оптимізації.

- **output**:
  - _Тип_: `FilePathPattern`
  - _Типово_: `({ key }) => 'compiler/${key}.content.json'`
  - _Опис_: Визначає шлях до вихідних файлів. Замінює `outputDir`. Обробляє динамічні змінні, такі як `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}` та `{{componentFormat}}`. Можна встановити як рядок у форматі `'my/{{var}}/path'` або як функцію.
  - _Примітка_: Шляхи `./**/*` розв'язуються відносно компонента. Шляхи `/**/*` розв'язуються відносно `baseDir` Intlayer.
  - _Примітка_: Якщо локаль визначена в шляху, словники будуть генеруватися для кожної локалі.
  - _Приклад_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Тип_: `boolean`
  - _Типово_: `false`
  - _Опис_: Вказує, чи мають метадані зберігатися у файлі. Якщо true, компілятор не зберігатиме метадані словників (ключ, оболонка вмісту). Корисно для виводу JSON для i18next або ICU MessageFormat для кожної локалі.
  - _Примітка_: Корисно при використанні з плагіном `loadJSON`.
  - _Приклад_:
    Якщо `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Якщо `false`:
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
  - _Типово_: `false`
  - _Опис_: Вказує, чи мають компоненти зберігатися після трансформації.

### Заповнення відсутніх перекладів

Intlayer надає CLI-інструмент, який допоможе заповнити відсутні переклади. Ви можете використовувати команду `intlayer` для перевірки та заповнення відсутніх перекладів у вашому коді.

```bash
npx intlayer test         # Перевірити наявність відсутніх перекладів
```

```bash
npx intlayer fill         # Заповнити відсутні переклади
```

### Екстракція

Intlayer надає CLI-інструмент, який допоможе вам витягти контент із вашого коду. Ви можете використовувати команду `intlayer extract`, щоб витягти контент із вашого коду.

```bash
npx intlayer extract
```

> Для отримання детальнішої інформації див. [документацію CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
