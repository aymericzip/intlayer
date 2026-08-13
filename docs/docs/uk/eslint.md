---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Плагін ESLint | Правила лінтингу для Intlayer
description: Виявляйте захардкоджені рядки та динамічні виклики, які компілятор Intlayer не може оптимізувати, за допомогою eslint-plugin-intlayer. Працює з ESLint та oxlint у React, Vue, Svelte, Angular і Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Лінтинг
  - i18n
  - Інтернаціоналізація
  - no-raw-text
  - Захардкоджені рядки
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Ініціалізація історії"
author: aymericzip
---

# Плагін ESLint x OXLint

`eslint-plugin-intlayer` виявляє два типи помилок i18n, які TypeScript побачити не може:

1. **Захардкоджений текст**, який так і не потрапив до словника.
2. **Динамічні виклики**, які проходять перевірку типів і працюють, але які компілятор Intlayer не може оптимізувати.

Невідомі ключі словників, невідомі шляхи полів та відсутні локалі вже є помилками компіляції, тож плагін їх не дублює.

## Встановлення

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Потрібен ESLint 9 або новіший (flat config).

## Використання

Плагін працює як в ESLint, так і в [oxlint](https://oxc.rs) — ті самі правила, ті самі опції.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Або вмикайте правила по одному:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Два застереження: підтримка JS-плагінів в oxlint усе ще на стадії alpha, і oxlint не підтримує власні парсери — тому файли `.vue`, `.svelte`, `.astro` та шаблони Angular там не перевіряються. Запускайте oxlint для файлів JS/TS/JSX, а для решти залиште ESLint.

  </Tab>
</Tabs>

### Конфігурації

| Конфігурація    | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                        | error                   | error                     | off                      |
| `strict`        | error (+ літерали поза JSX) | error                   | error                     | error                    |
| `contract-only` | off                         | error                   | error                     | off                      |

`recommended` навмисно залишає `no-raw-text` на рівні `warn`: якщо спрямувати це правило на наявну codebase, усі неперекладені рядки з'являться одразу, а це не повинно ламати ваш build першого ж дня.

`enforce-adapter-import` типово вимкнене — увімкніть його явно, якщо воно вам потрібне.

## Правила

### `no-raw-text`

Повідомляє про текст для користувача, який не оголошено у словнику. Використовує ту саму детекцію, що й `intlayer extract`, тож назви брендів, CSS-класи та технічні ідентифікатори ігноруються.

```jsx
// ✗ Повідомляється
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Нормально
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Файли оголошення контенту (`*.content.ts`, …) пропускаються.

Щоб виправити цілий файл за один раз, запустіть `npx intlayer extract` і дозвольте компілятору перенести рядки до словника за вас.

**Опції**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Атрибути, значення яких — текст для користувача.
      // Типово: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Елементи, вміст яких ніколи не є текстом для користувача.
      // Типово: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Регулярні вирази для тексту, про який ніколи не повідомляти.
      ignorePatterns: ["^Powered by"],

      // Також повідомляти про рядкові літерали поза розміткою. Типово: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Вимагає, щоб ключ словника був рядковим літералом.

Компілятор може попередньо завантажити словник лише тоді, коли здатен прочитати ключ безпосередньо в місці виклику. З обчислюваним ключем він мовчки пропускає оптимізацію та натомість включає до бандлу всі словники.

```typescript
// ✗ Повідомляється
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Змінна все одно не є літералом
const key = "home";
useIntlayer(key);

// ✓ Нормально
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Це стосується `useIntlayer`, `getIntlayer` та кожного compat-адаптера (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Вимагає, щоб поле, яке ви читаєте зі словника, було відоме статично.

Компілятор видаляє поля, використання яких він не бачить. Обчислюваний доступ для нього невидимий, тож читання може повернути `undefined` під час виконання.

```typescript
// ✗ Повідомляється
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Нормально
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Надає перевагу compat-адаптеру `@intlayer/*` перед оригінальним пакетом. Оригінал розв'язується в Intlayer лише за налаштованого аліасу бандлера; адаптер — завжди. Виправляється автоматично за допомогою `--fix`.

```typescript
// ✗ Повідомляється
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Нормально
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Фреймворки

Усі правила працюють в усіх інтеграціях Intlayer, зокрема всередині шаблонів Vue, Svelte та Angular. Вам потрібно лише вказати ESLint, який парсер читає який тип файлів.

| Фреймворк                 | Файли             | Парсер                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Шаблони Angular           | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Встановлюйте лише ті парсери, які потрібні вашому проєкту.

> **Відоме обмеження.** У шаблонах Vue та Angular вираз на кшталт `{{ content[key] }}` не перевіряється правилом `no-dynamic-field-access`. Динамічні читання, написані у блоці script, розпізнаються як зазвичай.
