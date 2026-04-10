---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Оптимізація розміру бандла i18n та продуктивності
description: Зменште розмір бандла вашого застосунку, оптимізуючи контент інтернаціоналізації (i18n). Дізнайтеся, як використовувати tree shaking та lazy loading для словників за допомогою Intlayer.
keywords:
  - Оптимізація бандла
  - Автоматизація контенту
  - Динамічний контент
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
    changes: "Додано опції `minify` та `purge` до конфігурації збірки"
---

# Оптимізація розміру бандла i18n та продуктивності

Однією з найпоширеніших проблем традиційних i18n-рішень, що покладаються на JSON-файли, є управління розміром контенту. Якщо розробники вручну не розділяють контент на простори імен (namespaces), користувачі часто завантажують переклади для кожної сторінки і, можливо, для кожної мови лише для того, щоб переглянути одну сторінку.

Наприклад, застосунок із 10 сторінками, перекладеними 10 мовами, може призвести до того, що користувач завантажить контент 100 сторінок, хоча йому потрібна лише **одна** (поточна сторінка поточною мовою). Це призводить до марної витрати трафіку та сповільнення часу завантаження.

**Intlayer вирішує цю проблему за допомогою оптимізації на етапі збірки.** Він аналізує ваш код, щоб визначити, які словники дійсно використовуються в кожному компоненті, і впроваджує лише необхідний контент у ваш бандл.

## Зміст

<TOC />

## Сканування бандла

Аналіз бандла — це перший крок до виявлення "важких" JSON-файлів та можливостей розділення коду. Ці інструменти генерують візуальну деревоподібну карту (treemap) скомпільованого коду вашого застосунку, дозволяючи вам точно побачити, які бібліотеки займають найбільше місця.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite використовує Rollup під капотом. Плагін `rollup-plugin-visualizer` генерує інтерактивний HTML-файл, що показує розмір кожного модуля у вашому графі.

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

Якщо ви використовуєте стандартний збирач Webpack у Next.js, використовуйте офіційний аналізатор бандлів. Запустіть його, встановивши змінну оточення під час збірки.

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
  // Ваша конфігурація Next.js
});
```

**Використання:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Стандартний Webpack

Для Create React App (ejected), Angular або кастомних налаштувань Webpack використовуйте галузевий стандарт `webpack-bundle-analyzer`.

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

## Як це працює

Intlayer використовує **підхід на рівні компонентів**. На відміну від глобальних JSON-файлів, ваш контент визначається поруч із вашими компонентами або всередині них. У процесі збірки Intlayer:

1.  **Аналізує** ваш код на наявність викликів `useIntlayer`.
2.  **Збирає** відповідний контент словника.
3.  **Замінює** виклик `useIntlayer` оптимізованим кодом на основі вашої конфігурації.

Це гарантує, що:

- Якщо компонент не імпортовано, його контент не включається в бандл (видалення мертвого коду).
- Якщо компонент завантажується ліниво (lazy-loading), його контент також завантажується ліниво.

## Налаштування за платформами

<Tabs>
 <Tab value="nextjs">

### Next.js

Для трансформації Next.js потрібен плагін `@intlayer/swc`, оскільки Next.js використовує SWC для збірки.

> Цей плагін не встановлюється за замовчуванням, оскільки плагіни SWC для Next.js все ще знаходяться на стадії експерименту. Це може змінитися в майбутньому.

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

Після встановлення Intlayer автоматично виявить і використовуватиме плагін.

 </Tab>
 <Tab value="vite">

### Vite

Vite використовує плагін `@intlayer/babel`, який включено як залежність `vite-intlayer`. Оптимізацію увімкнено за замовчуванням. Більше нічого робити не потрібно.

 </Tab>
 <Tab value="webpack">

### Webpack

Щоб увімкнути оптимізацію бандла за допомогою Intlayer у Webpack, вам потрібно встановити та налаштувати відповідний плагін Babel (`@intlayer/babel`) або SWC (`@intlayer/swc`).

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
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Конфігурація

Ви можете керувати тим, як Intlayer оптимізує ваш бандл, за допомогою властивості `build` у вашому `intlayer.config.ts`.

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
     * Мініфікувати словники для зменшення розміру бандла.
     */
     minify: true;

    /**
     * Видаляти невикористані ключі в словниках (purge)
     */
     purge: true;

    /**
     * Вказує, чи повинна збірка перевіряти типи TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> У переважній більшості випадків рекомендується залишати значення за замовчуванням для параметра `optimize`.

> Подробиці дивіться у документації з конфігурації: [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

### Опції збірки

В об'єкті конфігурації `build` доступні такі опції:

| Властивість    | Тип       | За замовчуванням | Опис                                                                                                                                                                                      |
| :------------- | :-------- | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined`      | Керує увімкненням оптимізації збірки. Якщо `true`, Intlayer замінює виклики словника оптимізованими вставками. Якщо `false`, оптимізацію вимкнено. В ідеалі в продакшені має бути `true`. |
| **`minify`**   | `boolean` | `false`          | Чи мініфікувати словники для зменшення розміру бандла.                                                                                                                                    |
| **`purge`**    | `boolean` | `false`          | Чи видаляти невикористані ключі в словниках.                                                                                                                                              |

### Мініфікація

Мініфікація словників видаляє непотрібні пробіли, коментарі та зменшує розмір вмісту JSON. Це особливо корисно для великих словників.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Примітка: Мініфікація ігнорується, якщо `optimize` вимкнено або якщо увімкнено Візуальний редактор (оскільки редактору потрібен повний контент для можливості редагування).

### Очищення (Purging)

Очищення гарантує, що у фінальний бандл словників будуть включені лише ті ключі, які дійсно використовуються у вашому коді. Це може значно зменшити розмір вашого бандла, якщо у вас є великі словники з багатьма ключами, які використовуються не у всіх частинах вашого застосунку.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Примітка: Очищення ігнорується, якщо параметр `optimize` вимкнено.

### Режим імпорту (Import Mode)

Для великих застосунків, що включають багато сторінок та локалей, ваші JSON-файли можуть становити значну частину розміру бандла. Intlayer дозволяє вам керувати способом завантаження словників.

Режим імпорту може бути визначений за замовчуванням глобально у вашому файлі `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

А також для кожного словника у ваших файлах `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Перевизначити режим імпорту за замовчуванням
  content: {
    // ...
  },
};

export default appContent;
```

| Властивість      | Тип                                | За замовчуванням | Опис                                                                                                                      |
| :--------------- | :--------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`       | **Застаріло**: Використовуйте `dictionary.importMode` замість цього. Визначає, як завантажуються словники (деталі нижче). |

Налаштування `importMode` визначає, як вміст словника впроваджується у ваш компонент.
Ви можете визначити його глобально у файлі `intlayer.config.ts` в об'єкті `dictionary` або перевизначити для конкретного словника у його файлі `.content.ts`.

### 1. Статичний режим (`default`)

У статичному режимі Intlayer замінює `useIntlayer` на `useDictionary` і впроваджує словник безпосередньо в JavaScript бандл.

- **Плюси:** Миттєвий рендеринг (синхронний), відсутність додаткових мережевих запитів під час гідратації.
- **Мінуси:** Бандл містить переклади для **всіх** доступних мов для цього конкретного компонента.
- **Найкраще для:** Односторінкових застосунків (SPA).

**Приклад трансформованого коду:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимізований код (Статичний)
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

### 2. Динамічний режим

У динамічному режимі Intlayer замінює `useIntlayer` на `useDictionaryAsync`. Це використовує `import()` (механізм типу Suspense) для лінивого завантаження конкретно JSON для поточної локалі.

- **Плюси:** **Tree shaking на рівні локалі.** Користувач, що переглядає англійську версію, завантажить _лише_ англійський словник. Французький словник ніколи не завантажиться.
- **Мінуси:** Викликає мережевий запит (завантаження ассету) для кожного компонента під час гідратації.
- **Найкраще для:** Великих текстових блоків, статей або застосунків із підтримкою багатьох мов, де розмір бандла є критичним.

**Приклад трансформованого коду:**

```tsx
// Ваш код
const content = useIntlayer("my-key");

// Оптимізований код (Динамічний)
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

> При використанні `importMode: 'dynamic'`, якщо у вас на одній сторінці 100 компонентів використовують `useIntlayer`, браузер спробує виконати 100 окремих завантажень. Щоб уникнути цього "водоспаду" запитів, групуйте контент у меншу кількість файлів `.content` (наприклад, один словник на розділ сторінки), а не по одному на кожен дрібний компонент.

### 3. Режим Fetch

Поводиться аналогічно динамічному режиму, але спочатку намагається отримати словники з API Intlayer Live Sync. Якщо виклик API завершується невдало або контент не позначено для живих оновлень, він перемикається на динамічний імпорт.

> Подробиці дивіться у документації CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

> У режимі fetch не можна використовувати очищення (purge) та мініфікацію.

## Резюме: Статичний vs Динамічний

| Функція                            | Статичний режим                           | Динамічний режим                                |
| :--------------------------------- | :---------------------------------------- | :---------------------------------------------- |
| **Розмір JS бандла**               | Більший (включає всі мови для компонента) | Найменший (лише код, контенту немає)            |
| **Початкове завантаження**         | Миттєво (контент уже в бандлі)            | Невелика затримка (завантаження JSON)           |
| **Мережеві запити**                | 0 додаткових запитів                      | 1 запит на кожен словник                        |
| **Tree Shaking**                   | На рівні компонентів                      | На рівні компонентів + на рівні локалей         |
| **Найкращий варіант використання** | UI-компоненти, невеликі застосунки        | Сторінки з великою кількістю тексту, багато мов |
