---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Плагин ESLint | Правила линтинга для Intlayer
description: Обнаруживайте захардкоженные строки и динамические вызовы, которые компилятор Intlayer не может оптимизировать, с помощью eslint-plugin-intlayer. Работает с ESLint и oxlint в React, Vue, Svelte, Angular и Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Линтинг
  - i18n
  - Интернационализация
  - no-raw-text
  - Захардкоженные строки
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
    changes: "Инициализация истории"
author: aymericzip
---

# Плагин ESLint x OXLint

`eslint-plugin-intlayer` находит два типа ошибок i18n, которые TypeScript увидеть не может:

1. **Захардкоженный текст**, который так и не попал в словарь.
2. **Динамические вызовы**, которые проходят проверку типов и работают, но которые компилятор Intlayer не может оптимизировать.

Неизвестные ключи словарей, неизвестные пути полей и отсутствующие локали уже являются ошибками компиляции, поэтому плагин их не дублирует.

## Установка

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Требуется ESLint 9 или новее (flat config).

## Использование

Плагин работает и в ESLint, и в [oxlint](https://oxc.rs) — те же правила, те же опции.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Или включайте правила по одному:

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

Две оговорки: поддержка JS-плагинов в oxlint пока находится в стадии alpha, и oxlint не поддерживает пользовательские парсеры — поэтому файлы `.vue`, `.svelte`, `.astro` и шаблоны Angular там не проверяются. Запускайте oxlint для файлов JS/TS/JSX, а для остального оставьте ESLint.

  </Tab>
</Tabs>

### Конфигурации

| Конфигурация    | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                       | error                   | error                     | off                      |
| `strict`        | error (+ литералы вне JSX) | error                   | error                     | error                    |
| `contract-only` | off                        | error                   | error                     | off                      |

`recommended` намеренно оставляет `no-raw-text` на уровне `warn`: если направить это правило на существующую codebase, все непереведённые строки всплывут разом, а это не должно ломать ваш build в первый же день.

`enforce-adapter-import` по умолчанию отключено — включите его явно, если оно вам нужно.

## Правила

### `no-raw-text`

Сообщает о тексте для пользователя, который не объявлен в словаре. Правило использует ту же детекцию, что и `intlayer extract`, поэтому названия брендов, CSS-классы и технические идентификаторы игнорируются.

```jsx
// ✗ Сообщается
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Нормально
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Файлы объявления контента (`*.content.ts`, …) пропускаются.

Чтобы исправить целый файл за один раз, запустите `npx intlayer extract` и позвольте компилятору перенести строки в словарь за вас.

**Опции**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Атрибуты, значение которых — текст для пользователя.
      // По умолчанию: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Элементы, содержимое которых никогда не является текстом для пользователя.
      // По умолчанию: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Регулярные выражения для текста, о котором никогда не сообщать.
      ignorePatterns: ["^Powered by"],

      // Также сообщать о строковых литералах вне разметки. По умолчанию: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Требует, чтобы ключ словаря был строковым литералом.

Компилятор может предзагрузить словарь только тогда, когда способен прочитать ключ прямо в месте вызова. При вычисляемом ключе он молча пропускает оптимизацию и вместо этого включает в бандл все словари.

```typescript
// ✗ Сообщается
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Переменная всё равно не литерал
const key = "home";
useIntlayer(key);

// ✓ Нормально
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Это относится к `useIntlayer`, `getIntlayer` и каждому compat-адаптеру (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Требует, чтобы поле, которое вы читаете из словаря, было известно статически.

Компилятор удаляет поля, использования которых он не видит. Вычисляемое обращение для него невидимо, поэтому чтение может вернуть `undefined` во время выполнения.

```typescript
// ✗ Сообщается
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

Предпочитает compat-адаптер `@intlayer/*` оригинальному пакету. Оригинал разрешается в Intlayer только при настроенном алиасе бандлера; адаптер — всегда. Исправляется автоматически с `--fix`.

```typescript
// ✗ Сообщается
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Нормально
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Фреймворки

Все правила работают во всех интеграциях Intlayer, в том числе внутри шаблонов Vue, Svelte и Angular. Вам нужно лишь указать ESLint, какой парсер читает каждый тип файлов.

| Фреймворк                 | Файлы             | Парсер                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Шаблоны Angular           | `.component.html` | `@angular-eslint/template-parser` |
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

Устанавливайте только те парсеры, которые нужны вашему проекту.

> **Известное ограничение.** В шаблонах Vue и Angular выражение вида `{{ content[key] }}` не проверяется правилом `no-dynamic-field-access`. Динамические чтения, написанные в блоке script, распознаются как обычно.
