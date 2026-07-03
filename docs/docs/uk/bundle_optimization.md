---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Оптимізація розміру бандлу та продуктивності i18n
description: Зменште розмір бандлу вашого застосунку завдяки оптимізації контенту інтернаціоналізації (i18n). Дізнайтеся, як використовувати tree shaking та ліниве завантаження (lazy loading) для словників за допомогою Intlayer.
keywords:
  - Bundle Optimisation
  - Content Automation
  - Dynamic Content
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
    changes: "Додано `intlayerPurgeBabelPlugin` та `intlayerMinifyBabelPlugin` для Babel/Webpack; уточнено порядок конвеєра плагінів"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Додано опції `minify` та `purge` до конфігурації збірки"
author: aymericzip
---

# Оптимізація розміру бандлу та продуктивності i18n

Одним із найпоширеніших викликів під час використання традиційних рішень i18n, що покладаються на JSON-файли, є керування розміром контенту. Якщо розробники не розділяють контент на простори імен (namespaces) вручну, користувачі часто завантажують переклади для кожної сторінки та потенційно кожної мови лише для того, щоб переглянути одну сторінку.

Наприклад, програма з 10 сторінками, перекладена 10 мовами, може змусити користувача завантажити контент обсягом 100 сторінок, навіть якщо йому потрібна лише **одна** (поточна сторінка поточною мовою). Це призводить до марної витрати пропускної здатності (bandwidth) та сповільнення часу завантаження.

**Intlayer вирішує цю проблему за допомогою оптимізації під час збірки (build-time).** Він аналізує ваш код для виявлення того, які саме словники реально використовуються в кожному компоненті, і реінжектить (перевставляє) у бандл лише необхідний контент.

## Зміст

<TOC />

## Проаналізуйте свій бандл

Аналіз бандлу — це перший крок до виявлення "важких" JSON-файлів та пошуку можливостей для розділення коду (code-splitting). Відповідні інструменти генерують візуальну деревоподібну мапу (treemap) зібраного коду вашої програми, дозволяючи точно побачити, які бібліотеки займають найбільше місця.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite під капотом використовує Rollup. Плагін `rollup-plugin-visualizer` створює інтерактивний HTML-файл, що відображає розмір кожного модуля у вашому графі.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Автоматично відкрити звіт у браузері
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

Для проєктів, що використовують App Router та Turbopack, Next.js надає вбудований експериментальний аналізатор, який не потребує додаткових залежностей.

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

Якщо в Next.js ви користуєтеся стандартним Webpack, застосуйте офіційний bundle analyzer. Викличте його, встановивши змінну середовища (environment variable) під час збірки.

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
  // Ваш конфіг Next.js
});
```

**Використання:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Стандартний Webpack

Для Create React App (ejected), Angular або кастомних налаштувань Webpack скористайтеся галузевим стандартом `webpack-bundle-analyzer`.

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

```typescript fileName="webpack.config.ts"
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

## Як це працює

Intlayer використовує **підхід на рівні компонентів (per-component approach)**. На відміну від глобальних JSON-файлів, ваш контент визначається поруч із вашими компонентами або всередині них. Під час збірки Intlayer:

1. **Аналізує** ваш код, щоб знайти виклики `useIntlayer`.
2. **Збирає** відповідний контент словників.
3. **Замінює** виклик `useIntlayer` на оптимізований код, опираючись на вашу конфігурацію.

Це гарантує, що:

- Якщо компонент не імпортується, його контент не включатиметься до бандлу (Dead Code Elimination).
- Якщо компонент завантажується ліниво (lazy-loaded), його контент також буде завантажено ліниво.

## Довідка щодо плагінів

Оптимізація збірки від Intlayer розділена на кілька окремих плагінів, кожен з яких виконує лише одну задачу. Розуміння того, за що відповідає кожен із них, запобігає плутанині під час конфігурації.

### Плагіни Babel (`@intlayer/babel`)

Ці плагіни використовуються безпосередньо в `babel.config.js` для налаштувань на базі Webpack (Next.js із Babel, CRA, кастомний Webpack тощо).

| Плагін                        | Що він робить                                                                                                                      |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Сканує файли `.content.ts` та записує зібрані словники до папки `.intlayer/`                                                       |
| `intlayerOptimizeBabelPlugin` | Переписує `useIntlayer('key')` на `useDictionary(hash)` та інжектить (вставляє) відповідний `import` словника                      |
| `intlayerPurgeBabelPlugin`    | Сканує всі файли з кодом та видаляє **невикористані поля контенту** зі скомпільованих словників `.intlayer/**/*.json`              |
| `intlayerMinifyBabelPlugin`   | **Перейменовує ключі полів контенту** на короткі алфавітні псевдоніми (наприклад, `title` → `a`) у JSON-файлах та у вихідному коді |

> **Порядок плагінів має значення.** У файлі `babel.config.js` плагіни `purge` та `minify` мають з'являтися **перед** плагіном `optimize`. Оскільки `optimize` замінює `useIntlayer('key')` на непрозорий (opaque) виклик `useDictionary(hash)`, він стирає інформацію про ключ словника. Але саме ця інформація потрібна на етапах `purge` та `minify`, щоб розпізнати, які поля контенту використовуються.

Кожен плагін Babel має відповідного помічника налаштувань (options helper), який зчитує `intlayer.config.ts` лише раз під час завантаження конфігурації та повертає підготовані значення:

| Options helper               | З яким плагіном використовується |
| :--------------------------- | :------------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`     |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin`    |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`       |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`      |

### Плагіни Vite (`vite-intlayer`)

Користувачі Vite **ніколи не конфігурують їх напряму**. Вони налаштовуються автоматично після виклику `withIntlayer()` у файлі `vite.config.ts`. Прапорці `build.purge` та `build.minify` в `intlayer.config.ts` вмикають та вимикають відповідну поведінку без необхідності вручну реєструвати додаткові плагіни.

| Внутрішній плагін Vite | Еквівалентна поведінка                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Usage analyzer         | Аналогічно до етапу аналізу плагіна `intlayerPurgeBabelPlugin`                                                     |
| Dictionary prune       | Аналогічно до етапу запису JSON плагіна `intlayerPurgeBabelPlugin`                                                 |
| Dictionary minify      | Аналогічно до етапу запису JSON плагіна `intlayerMinifyBabelPlugin`                                                |
| Babel transform        | Аналогічно до перейменування у вихідному коді плагіном `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Налаштування за платформами

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js потребує плагіна `@intlayer/swc` для етапу оптимізації (перезапису імпорту), оскільки Next.js використовує SWC для збірки.

> Цей плагін не встановлюється автоматично, адже плагіни SWC для Next.js ще мають експериментальний статус. У майбутньому це може змінитися.

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

Після встановлення Intlayer автоматично виявить і почне використовувати цей плагін.

Для етапів **purge та minify** (видалення та перейменування полів) вам треба встановити поруч `@intlayer/babel` і додати Babel-плагіни. Оскільки Next.js хоча й застосовує SWC для трансформацій, але продовжує зчитувати `babel.config.js` під час збирання налаштувань плагінів, Babel-плагіни запускатимуться як пре-пас (попередня обробка) перед SWC.

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
    // Purge: видалити невикористані поля контенту з .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: перейменувати ключі полів контенту в JSON-файлах та вихідному коді
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Примітка: intlayerOptimizeBabelPlugin тут НЕ потрібен, тому що
    // @intlayer/swc вже відповідає за переписування useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite використовує плагін `@intlayer/babel`, який включено як залежність у пакет `vite-intlayer`. Повний конвеєр (pipeline) оптимізації — переписування імпорту, `purge` та `minify` — увімкнений за замовчуванням і не потребує додаткової реєстрації плагінів.

Увімкніть `purge` та `minify`, встановивши відповідні прапорці (flags) в `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // видалити невикористані поля контенту із зібраних JSON-файлів
    minify: true, // перейменувати ключі полів на короткі псевдоніми
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (та Next.js з Babel)

Встановіть `@intlayer/babel`:

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

Додайте всі чотири плагіни до `babel.config.js` у правильному порядку:

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
    // Extract: компілює файли .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: видаляє невикористані поля з .intlayer/**/*.json
    //    (зчитує прапорець build.purge з intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: перейменовує ключі полів у JSON та вихідному коді
    //    (зчитує прапорець build.minify з intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: переписує useIntlayer('key') → useDictionary(hash)
    //    Повинен стояти останнім, оскільки він видаляє ключ словника.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Конфігурація

Ви можете контролювати те, як Intlayer оптимізує ваш бандл, за допомогою властивості `build` у файлі `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.UKRAINIAN],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Замінювати виклики useIntlayer() на прямі імпорти словників під час збірки.
    // undefined = auto (увімкнено для production-збірки), true = always, false = never.
    optimize: undefined,

    // Перейменовувати ключі полів контенту в скомпільованих словниках на короткі алфавітні
    // псевдоніми (напр. title → a). Зменшує розмір JSON; потребує увімкненого optimize.
    minify: true,

    // Видалити поля контенту, які жодного разу не викликалися (not accessed) у вихідному коді.
    // Потребує увімкненого optimize.
    purge: true,
  },
};

export default config;
```

> У більшості випадків рекомендується залишати для `optimize` значення за замовчуванням (`undefined`).

> Перегляньте повний довідник конфігурації для усіх доступних опцій: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

### Опції збірки (Build Options)

| Властивість    | Тип                   | Значення за замовчуванням | Опис                                                                                                                                                                                                                                   |
| :------------- | :-------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined`               | Активує проходження оптимізації імпортів. `undefined` = активно лише під час production-збірок. `false` також вимикає `purge` та `minify`.                                                                                             |
| **`minify`**   | `boolean`             | `false`                   | Перейменовує ключі полів контенту у скомпільованих JSON-файлах на короткі алфавітні псевдоніми. Водночас змінює відповідні доступи до властивостей (property accesses) у вихідному коді. Не діятиме, якщо `optimize` дорівнює `false`. |
| **`purge`**    | `boolean`             | `false`                   | Вилучає зі скомпільованих JSON-файлів усі поля контенту, до яких немає жодного статичного звернення у вихідному коді. Не діятиме, якщо `optimize` дорівнює `false`.                                                                    |

### Мініфікація (перейменування ключів полів)

Властивість `build.minify` **не** мініфікує ваш фінальний JS-бандл — це завдання виконує ваш bundler (збиральник). Вона зменшує розмір скомпільованих JSON-файлів словників шляхом заміни кожного визначеного користувачем ключа поля на короткий алфавітний псевдонім (alias):

```
// До мініфікації
{ "title": "Привіт", "subtitle": "Світ" }

// Після мініфікації
{ "a": "Привіт", "b": "Світ" }
```

Така сама заміна застосовується до всіх звернень (property accesses) у вашому вихідному коді. Таким чином, у скомпільованому коді `content.title` стає `content.a`. Поведінка під час виконання (runtime) залишається незмінною.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Мініфікація пропускається (skipped), коли `optimize` становить `false`, або коли `editor.enabled` становить `true` (візуальний редактор потребує оригінальних імен полів для їх редагування).

> Мініфікація також пропускається для словників, що завантажуються з `importMode: 'fetch'`, оскільки їхні JSON-дані постачаються з віддаленого API з оригінальними іменами полів — перейменування ключів на боці клієнта порушить зв'язок сервер/клієнт.

### Очищення (видалення невикористаних полів)

Функція `build.purge` аналізує, до яких полів контенту ви реально звертаєтеся у своєму вихідному коді, та видаляє всі інші поля зі скомпільованих JSON-файлів.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Приклад:** словник має п'ять полів, проте з них використовуються лише два:

```
// Перед очищенням
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Після очищення (у коді зверталися лише до title + subtitle)
{ "title": "…", "subtitle": "…" }
```

> Очищення пропускається, коли `optimize` становить `false`, або коли `editor.enabled` становить `true`.

> Очищення також консервативно пропускається, коли вихідний файл не може бути розпарсений, або коли результат виклику `useIntlayer` присвоюється змінній і далі передається способами, які статичний аналізатор не може відстежити (наприклад, поширюється у вигляді spread-об'єкта чи передається як prop без деструктуризації). В таких випадках весь словник зберігається повністю.

### Режим імпорту (Import Mode)

У великих програмах із великою кількістю сторінок і локалей JSON-файли можуть становити вагому частку від загального розміру бандлу. Intlayer дозволяє керувати способами завантаження словників за допомогою параметра `importMode`.

### Глобальне визначення

Режим імпорту можна визначити глобально у файлі `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // За замовчуванням 'static'
  },
};

export default config;
```

### Визначення для окремого словника

Ви можете змінити (override) режим імпорту для окремих словників у їхніх файлах `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Перевизначити режим імпорту
  content: {
    // ...
  },
};

export default appContent;
```

| Властивість      | Тип                                | Значення за замовчуванням | Опис                                                                                                                                 |
| :--------------- | :--------------------------------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`                | **Застаріло (Deprecated)**: Використовуйте замість цього `dictionary.importMode`. Визначає, як завантажуються словники (див. нижче). |

Параметр `importMode` визначає, яким чином контент зі словника додаватиметься у ваш компонент. Його можна встановити глобально у файлі `intlayer.config.ts` в об'єкті `dictionary` або перевизначити для кожного окремого словника в його файлі `.content.ts`.

### 1. Статичний режим (Static Mode - `default`)

У статичному режимі Intlayer замінює виклик `useIntlayer` на `useDictionary` та інжектить словник безпосередньо у JS-бандл.

- **Плюси:** Миттєвий рендеринг (синхронний режим), нуль додаткових мережевих запитів під час гідратації.
- **Мінуси:** Бандл включає переклади для **всіх** доступних мов для конкретного компонента.
- **Найкраще підходить для:** Односторінкових програм (SPA).

**Приклад трансформованого коду:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Ілюстрація оптимізованого коду після трансформації (Static)
// Це лише для наочності, фактичний код дещо відрізнятиметься з міркувань оптимізації
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      uk: "Мій заголовок",
    },
  },
});
```

### 2. Динамічний режим (Dynamic Mode)

У динамічному режимі Intlayer замінює виклик `useIntlayer` на `useDictionaryAsync`. Він використовує `import()` (механізм, схожий на Suspense) для лінивого завантаження виключно того JSON, який потрібен для поточної локалі.

- **Плюси:** **Tree shaking на рівні локалі.** Користувач, який переглядає англійську версію сторінки, завантажить _тільки_ англійський словник. Український словник ніколи не завантажиться.
- **Мінуси:** Викликає додатковий мережевий запит на компонент (fetching) під час гідратації.
- **Найкраще підходить для:** Великих текстових блоків, статей або програм із підтримкою великої кількості мов, де розмір бандлу має критичне значення.

**Приклад трансформованого коду:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Ілюстрація оптимізованого коду після трансформації (Dynamic)
// Це лише для наочності, фактичний код дещо відрізнятиметься з міркувань оптимізації
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  uk: () =>
    import(".intlayer/dynamic_dictionary/my-key/uk.json").then(
      (mod) => mod.default
    ),
});
```

> Якщо використовується `importMode: 'dynamic'` і на сторінці є 100 компонентів, що застосовують `useIntlayer`, браузер намагатиметься ініціювати 100 окремих запитів (fetch). Аби уникнути цього "водоспаду" (waterfall) запитів, згрупуйте контент у меншу кількість `.content` файлів (наприклад, по одному словнику на секцію сторінки), замість створювати окремий словник для кожного атомного компонента. Ви також можете використовувати кілька `.content` файлів із однаковим ключем — Intlayer самостійно об'єднає їх в єдиний словник.

### 3. Режим Fetch (Fetch Mode)

Працює подібно до динамічного режиму, але спершу намагається завантажити словники за допомогою Intlayer Live Sync API. Якщо API-виклик не вдається здійснити або контент не позначено для живого оновлення, система повертається до динамічного імпорту.

**Приклад трансформованого коду:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимізований код (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  uk: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/uk").then((res) =>
      res.json()
    ),
});
```

> Більше інформації можна знайти у документації до CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

> У режимі `fetch` етапи очищення (`purge`) та мініфікації (`minify`) не застосовуються, адже JSON обслуговується віддаленим API, що використовує оригінальні імена полів.

## Підсумок: Статичний чи Динамічний?

| Характеристика             | Статичний режим (Static Mode)                   | Динамічний режим (Dynamic Mode)         |
| :------------------------- | :---------------------------------------------- | :-------------------------------------- |
| **Розмір JS-бандлу**       | Більший (включає всі мови для цього компонента) | Найменший (лише код, без контенту)      |
| **Початкове завантаження** | Миттєве (Контент вже є у бандлі)                | Незначна затримка (завантаження JSON)   |
| **Мережеві запити**        | 0 додаткових запитів                            | 1 запит на один ключ словника           |
| **Tree Shaking**           | На рівні компонента                             | На рівні компонента + на рівні локалі   |
| **Найкраще підходить для** | UI-компонентів, невеликих програм               | Насичених текстом сторінок, безлічі мов |
