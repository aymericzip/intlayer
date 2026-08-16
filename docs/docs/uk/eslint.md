---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Плагін ESLint | Правила лінтингу для Intlayer
description: Знаходьте жорстко закодовані рядки, динамічні виклики, які компілятор Intlayer не може оптимізувати, та невикористаний вміст словників за допомогою eslint-plugin-intlayer. Працює з ESLint та oxlint для React, Vue, Svelte, Angular та Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Лінтинг
  - i18n
  - Інтернаціоналізація
  - no-raw-text
  - Жорстко закодовані рядки
  - Невикористані переклади
  - Мертвий вміст
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
    changes: "Початкова історія"
author: aymericzip
---

# Плагін ESLint x OXLint

`eslint-plugin-intlayer` виявляє ті типи помилок i18n, які TypeScript не здатний помітити:

1. **Жорстко закодований текст**, який так і не потрапив до словника.
2. **Динамічні виклики**, які проходять перевірку типів і виконуються, але які компілятор Intlayer не може оптимізувати.
3. **Мертвий вміст (Dead content)** — словники та поля, які ніде в проєкті не зчитуються (за бажанням/opt-in).

Невідомі ключі словників, невідомі шляхи до полів та відсутні локалі вже є помилками компіляції, тому плагін не дублює їх повідомлення.

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

Потрібен ESLint 9 або новішої версії (flat config). ESLint 10 підтримується.

## Використання

Плагін працює як в ESLint, так і в [oxlint](https://oxc.rs) — однакові правила, однакові параметри.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Або розгорніть конфігурацію та задайте рівні самостійно:

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

Два застереження: підтримка JS-плагінів в oxlint все ще на стадії альфа, і oxlint не підтримує кастомні парсери — тому файли `.vue`, `.svelte`, `.astro` та шаблони Angular там не лінтяться. Запускайте oxlint для ваших файлів JS/TS/JSX, а для решти використовуйте ESLint.

Правило `no-unused-content` навмисно виключено вище: йому потрібні робоча директорія та шлях до перевіреного файлу з контексту правила, чого альфа-міст для JS-плагінів не гарантує. Запускайте його під ESLint.

  </Tab>
</Tabs>

### Конфігурації (Configs)

| Конфігурація    | `no-raw-text`                       | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                                | error                   | error                     | off                      | off                 |
| `strict`        | error (+ рядкові літерали поза JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                                 | error                   | error                     | off                      | off                 |

`recommended` навмисно залишає `no-raw-text` зі статусом `warn`: застосування правила до наявної кодової бази виявить усі неперекладені рядки одночасно, що не повинно ламати збірку з першого ж дня.

`enforce-adapter-import` типово вимкнено — увімкніть його явно, якщо це необхідно.

`no-unused-content` вимкнено в усіх пресетах, включно зі `strict`. Це єдине правило, яке зчитує конфігурацію Intlayer і сканує вихідні файли з диска, тому його ввімкнення має бути свідомим вибором.

## Правила

### `no-raw-text`

Повідомляє про текст для користувача, який не оголошено у словнику. Використовує ту саму логіку виявлення, що й `intlayer extract`, тому назви брендів, класи CSS та технічні ідентифікатори ігноруються.

```jsx
// ✗ Повідомлено
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Усе добре
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Файли оголошення вмісту (`*.content.ts`, …) пропускаються.

Щоб виправити весь файл одночасно, виконайте `npx intlayer extract`, і компілятор автоматично перенесе рядки до словника.

**Параметри**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Атрибути, значенням яких є текст для користувача.
      // Типово: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Елементи, вміст яких ніколи не є текстом для користувача.
      // Типово: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Регулярні вирази для тексту, про який ніколи не слід повідомляти.
      ignorePatterns: ["^Powered by"],

      // Повідомляти також про рядкові літерали поза розміткою. Типово: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Вимагає, щоб ключ словника був рядковим літералом.

Компілятор може попередньо завантажити словник лише тоді, коли може прочитати ключ безпосередньо в місці виклику. У разі використання обчислюваного ключа оптимізація мовчки пропускається, і замість цього в бандл включаються всі словники.

```typescript
// ✗ Повідомлено
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Змінна все одно не є літералом
const key = "home";
useIntlayer(key);

// ✓ Усе добре
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Це стосується `useIntlayer`, `getIntlayer` та всіх адаптерів сумісності (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Вимагає, щоб поле, яке зчитується зі словника, було статично відомим.

Компілятор видаляє поля, використання яких він не виявив. Динамічний доступ для нього невидимий, тому читання може повернути `undefined` під час виконання.

```typescript
// ✗ Повідомлено
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Усе добре
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Віддає перевагу адаптеру сумісності `@intlayer/*` перед оригінальним пакетом. Оригінальний пакет переходить в Intlayer лише за наявності налаштованого псевдоніма бандлера; адаптер працює завжди. Підтримує автовиправлення через `--fix`.

```typescript
// ✗ Повідомлено
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Усе добре
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Типово вимкнено.** Повідомляє про вміст, який ніде в проєкті не зчитується, а також про ключі словників, оголошені в кількох місцях.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Повідомляється, якщо жоден виклик у проєкті не запитує "home"
  content: {
    title: t({ uk: "Заголовок", en: "Title" }),

    // ✗ Повідомляється, якщо ніщо не зчитує `hero`
    hero: {
      subtitle: t({ uk: "Підзаголовок", en: "Subtitle" }),
    },
  },
};
```

На відміну від інших правил, це правило не може вирішити лише за поточним файлом — поле є невикористаним лише відносно всього проєкту. Під час першого оголошення вмісту під час лінтингу воно завантажує конфігурацію Intlayer, сканує вихідні файли за шляхами з конфігурації (`build.traversePattern`, `compiler.transformPattern`) і запускає той самий аналізатор використання, який живить `@intlayer/lsp` та закреслення «невикористаного» в розширенні VS Code. Результат кешується на `cacheTtl` мілісекунд, тому сканування відбувається один раз за запуск, а не для кожного файлу.

**Параметри**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Повідомляти про ключі словників, на які ніщо не посилається. Типово: true
      reportUnusedDictionaries: true,

      // Повідомляти про поля вмісту, які ніщо не зчитує. Типово: true
      reportUnusedFields: true,

      // Повідомляти про продубльовані ключі, оголошені в кількох місцях. Типово: true
      reportDuplicateKeys: true,

      // Регулярні вирази для шляхів полів, про які ніколи не слід повідомляти.
      ignoreFields: ["^meta"],

      // Корінь проєкту, з якого починається сканування. Типово: робоча директорія ESLint
      baseDir: process.cwd(),

      // Час повторного використання результату сканування проєкту (у мс). Типово: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Зменште `cacheTtl`, якщо ви запускаєте лінтинг із довгоживучого сервера редактора і хочете швидше бачити зміни; встановіть `baseDir`, коли один запуск лінтингу охоплює кілька проєктів Intlayer у монорепозиторії.

> **Схильне до мінімізації помилкових спрацьовувань.** Хибне спрацьовування тут призведе до видалення потрібного перекладу, тому нічого не повідомляється, якщо словник використовується способом, який аналіз не може відстежити: об'єкт вмісту передано повністю, прив'язана функція перекладача (`const t = useTranslations("home")`), оголошення отримано через прямий імпорт (`useDictionary(myDictionary)`), виклик `nest()` з іншого словника або список полів, який став невичерпним через оператор spread. Однофайлові компоненти (`.vue`, `.svelte`, `.astro`) вважаються такими, що використовують кожне поле згаданих словників, оскільки їхні блоки скриптів тут не парсяться.

`reportDuplicateKeys` зчитує необ'єднані словники, які збірка записує у `.intlayer/`, тому воно залишається неактивним, доки проєкт не буде зібрано принаймні один раз. Два оголошення з однаковим ключем об'єднуються, що є коректним шаблоном — звіт формується тому, що поле, визначене з обох боків, непомітно зберігає лише одне з двох значень.

Аналізатор завантажується з `@intlayer/lsp`, який постачається як ESM. Тому правилу потрібна версія Node, здатна виконувати `require()` для ES-модулів — Node 20.19+ або 22.12+. На старіших версіях воно нічого не повідомляє, щоб не зупиняти процес лінтингу.

## Фреймворки

Кожне правило працює в усіх інтеграціях Intlayer, включно з шаблонами Vue, Svelte та Angular. Потрібно лише вказати ESLint, який парсер зчитує кожен тип файлів.

| Фреймворк                 | Файли             | Парсер                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Шаблони Angular           | `.component.html` | `@angular-eslint/template-parser` |
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

Встановлюйте лише ті парсери, які потрібні вашому проєкту.

> **Відоме обмеження.** У шаблонах Vue та Angular вираз на кшталт `{{ content[key] }}` не перевіряється правилом `no-dynamic-field-access`. Динамічні звернення всередині блоку script виявляються у звичайному режимі.
