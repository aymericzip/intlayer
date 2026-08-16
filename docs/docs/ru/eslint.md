---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Плагин ESLint | Правила линтинга для Intlayer
description: Находите жестко закодированные строки, динамические вызовы, которые компилятор Intlayer не может оптимизировать, и неиспользуемый контент словарей с помощью eslint-plugin-intlayer. Работает с ESLint и oxlint для React, Vue, Svelte, Angular и Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Линтинг
  - i18n
  - Интернационализация
  - no-raw-text
  - Жестко закодированные строки
  - Неиспользуемые переводы
  - Мертвый контент
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
    changes: "Начальная история"
author: aymericzip
---

# Плагин ESLint x OXLint

`eslint-plugin-intlayer` отслеживает типичные ошибки i18n, которые TypeScript не способен обнаружить:

1. **Жестко закодированный текст**, который так и не был вынесен в словарь.
2. **Динамические вызовы**, которые проходят проверку типов и выполняются, но не могут быть оптимизированы компилятором Intlayer.
3. **Мертвый контент** — словари и поля, которые нигде в проекте не считываются (по желанию).

Неизвестные ключи словарей, неизвестные пути к полям и отсутствующие локали уже приводят к ошибкам компиляции, поэтому плагин не дублирует их проверку.

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

Требуется ESLint 9 или новее (flat config). ESLint 10 поддерживается.

## Использование

Плагин работает как в ESLint, так и в [oxlint](https://oxc.rs) — одни и те же правила, одни и те же параметры.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Либо разверните конфигурацию и задайте уровни сами:

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
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

Два нюанса: поддержка JS-плагинов в oxlint все еще находится в альфа-стадии, а oxlint не поддерживает пользовательские парсеры — поэтому файлы `.vue`, `.svelte`, `.astro` и шаблоны Angular там не линтятся. Запускайте oxlint для файлов JS/TS/JSX, а для остальных используйте ESLint.

Правило `no-unused-content` намеренно исключено выше: ему требуется рабочий каталог и путь к проверяемому файлу из контекста правила, что альфа-мост для JS-плагинов не гарантирует. Запускайте его в ESLint.

  </Tab>
</Tabs>

### Пресеты конфигураций

| Конфигурация    | `no-raw-text`                        | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ------------------------------------ | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                                 | error                   | error                     | off                      | off                 |
| `strict`        | error (+ строковые литералы вне JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                                  | error                   | error                     | off                      | off                 |

Пресет `recommended` намеренно оставляет `no-raw-text` со статусом `warn`: применение правила к существующей кодовой базе покажет сразу все непереведенные строки, что не должно ломать сборку с первого же дня.

`enforce-adapter-import` по умолчанию выключено — включите его явно при необходимости.

`no-unused-content` выключено во всех пресетах, включая `strict`. Это единственное правило, которое считывает конфигурацию Intlayer и сканирует исходные файлы на диске, поэтому его включение должно быть осознанным выбором, а не автоматическим решением пресета.

## Правила

### `no-raw-text`

Сообщает о тексте для пользователя, который не объявлен в словаре. Использует ту же логику обнаружения, что и `intlayer extract`, поэтому названия брендов, CSS-классы и технические идентификаторы игнорируются.

```jsx
// ✗ Ошибка
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Корректно
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Файлы объявления контента (`*.content.ts`, …) пропускаются.

Чтобы исправить весь файл сразу, выполните `npx intlayer extract`, и компилятор автоматически перенесет строки в словарь.

**Параметры**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Атрибуты, значениями которых является текст для пользователя.
      // По умолчанию: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Элементы, содержимое которых никогда не является текстом для пользователя.
      // По умолчанию: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Регулярные выражения для текста, о котором никогда не нужно сообщать.
      ignorePatterns: ["^Powered by"],

      // Сообщать ли также о строковых литералах вне разметки. По умолчанию: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Требует, чтобы ключ словаря был строковым литералом.

Компилятор может предварительно загрузить словарь только тогда, когда он может прочитать ключ непосредственно в месте вызова. При использовании вычисляемого ключа оптимизация автоматически пропускается, и вместо этого в бандл включаются все словари.

```typescript
// ✗ Ошибка
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Переменная по-прежнему не является литералом
const key = "home";
useIntlayer(key);

// ✓ Корректно
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Это относится к `useIntlayer`, `getIntlayer` и всем адаптерам совместимости (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Требует, чтобы поле, считываемое из словаря, было статически известно.

Компилятор удаляет поля, использование которых он не обнаружил. Динамический доступ для него невидим, поэтому чтение может вернуть `undefined` во время выполнения.

```typescript
// ✗ Ошибка
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Корректно
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Отдает предпочтение адаптеру совместимости `@intlayer/*` перед оригинальным пакетом. Оригинальный пакет разрешается в Intlayer только при настроенном псевдониме бандлера, тогда как адаптер работает всегда. Поддерживает автоисправление через `--fix`.

```typescript
// ✗ Ошибка
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Корректно
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**По умолчанию отключено.** Сообщает о контенте, который нигде в проекте не считывается, а также о ключах словарей, объявленных более чем в одном месте.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Сообщается, если ни одно место в проекте не запрашивает "home"
  content: {
    title: t({ ru: "Заголовок", en: "Title" }),

    // ✗ Сообщается, если ничто не считывает `hero`
    hero: {
      subtitle: t({ ru: "Подзаголовок", en: "Subtitle" }),
    },
  },
};
```

В отличие от других правил, это правило не может принять решение только по проверяемому файлу — неиспользуемость поля определяется относительно всего проекта. При первом объявлении контента во время линтинга оно загружает конфигурацию Intlayer, ищет исходные файлы по путям из конфигурации (`build.traversePattern`, `compiler.transformPattern`) и запускает тот же анализатор использования, который используется в `@intlayer/lsp` и зачеркивании «неиспользуемого» в расширении VS Code. Результат кэшируется на `cacheTtl` миллисекунд, поэтому сканирование выполняется один раз за запуск, а не для каждого файла.

**Параметры**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Сообщать о ключах словарей, на которые ничто не ссылается. По умолчанию: true
      reportUnusedDictionaries: true,

      // Сообщать о полях контента, которые ничто не считывает. По умолчанию: true
      reportUnusedFields: true,

      // Сообщать о дублирующихся ключах, объявленных в нескольких местах. По умолчанию: true
      reportDuplicateKeys: true,

      // Регулярные выражения для путей полей, о которых никогда не нужно сообщать.
      ignoreFields: ["^meta"],

      // Корень проекта, с которого начинается сканирование. По умолчанию: рабочий каталог ESLint
      baseDir: process.cwd(),

      // Время повторного использования результатов сканирования проекта (в мс). По умолчанию: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Уменьшите `cacheTtl`, если вы линтите из долгоживущего сервера редактора и хотите быстрее видеть изменения; установите `baseDir`, если один запуск линтера охватывает несколько проектов Intlayer в монорепозитории.

> **Стремится к минимизации ложных срабатываний.** Ложное срабатывание здесь может привести к удалению нужного перевода, поэтому ничего не сообщается, когда словарь используется способом, который анализ не может отследить: объект контента передан целиком, функция перевода привязана от него (`const t = useTranslations("home")`), объявление получено через прямой импорт (`useDictionary(myDictionary)`), `nest()` из другого словаря или список полей, ставший неполным из-за spread-оператора. Однофайловые компоненты (`.vue`, `.svelte`, `.astro`) считаются использующими все поля упомянутых словарей, поскольку их блоки скриптов здесь не парсятся.

`reportDuplicateKeys` считывает необъединенные словари, которые сборка записывает в `.intlayer/`, поэтому оно не срабатывает, пока проект не будет собран хотя бы один раз. Два объявления с одинаковым ключом объединяются, что является допустимым паттерном — отчет формируется потому, что поле, определенное с обеих сторон, без предупреждения сохраняет только одно из двух значений.

Анализатор загружается из `@intlayer/lsp`, который поставляется как ESM. Поэтому правилу требуется версия Node, поддерживающая `require()` для ES-модулей — Node 20.19+ или 22.12+. На более старых версиях оно ничего не сообщает, чтобы не прерывать выполнение линтинга.

## Фреймворки

Каждое правило работает во всех интеграциях Intlayer, включая шаблоны Vue, Svelte и Angular. Вам нужно лишь указать ESLint, какой парсер использовать для каждого типа файлов.

| Фреймворк                 | Файлы             | Парсер                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Шаблоны Angular           | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
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

Устанавливайте только те парсеры, которые требуются вашему проекту.

> **Известное ограничение.** В шаблонах Vue и Angular выражение вида `{{ content[key] }}` не проверяется правилом `no-dynamic-field-access`. Динамическое чтение внутри блока script определяется в штатном режиме.
