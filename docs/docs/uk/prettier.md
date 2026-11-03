---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Плагін Prettier | Сортування перекладів Intlayer
description: "Сортуйте локалі в t(), категорії plural(), умови enu(), варіанти select() та ключі оголошень контенту за допомогою prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - Форматування
  - Сортування перекладів
  - Сортування локалей
  - i18n
  - Інтернаціоналізація
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Початкова історія"
author: aymericzip
---

# Плагін Prettier

`prettier-plugin-intlayer` упорядковує ключі ваших перекладів у фіксованому порядку щоразу, коли Prettier форматує файл. Дифи залишаються невеликими, конфлікти злиття трапляються рідше, а відсутню локаль легко помітити.

```ts
// до
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// після
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Встановлення

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Потрібен Prettier версії 3 або новішої.

Якщо у вашому проекті вже використовується Prettier, команда `intlayer init prettier` автоматично встановить плагін і додасть його до вашої конфігурації.

## Використання

Додайте плагін до конфігурації Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Щоб застосовувати його лише до оголошень контенту, скористайтеся секцією override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## Що сортується

### `t()`: локалі

Закріплені локалі йдуть першими (`en` за замовчуванням). Решта локалей ідуть в алфавітному порядку.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: порядок CLDR

Категорії розташовуються від найменшої кількості до запасного варіанта (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: висхідні порогові значення

Умови сортуються за числом, потім за оператором (`<1`, `<=1`, `1`, `>=1`, `>1`). Варіант `fallback` розташовується останнім.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Під час виконання спрацьовує перша умова, що збіглася. Плагін застосовує новий порядок лише тоді, коли кожна кількість все одно призводить до того самого контенту. Коли порядок визначає результат, об'єкт залишається без змін. Наприклад, у `{ '<1': …, '<=-2.3': … }` ключ `'<1'` перехоплює будь-яке від'ємне число.

### `select()`: за алфавітом

Варіанти сортуються за алфавітом, а `fallback` розташовується останнім.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Без ключа `fallback` або `other` останній варіант використовується як запасний. Цей випадок залишається в кінці, і сортуються лише варіанти перед ним.

### Файли `.content.json`

Серіалізована форма сортується так само: `{ "nodeType": "translation", "translation": { … } }`, як і вузли `plural`, `enumeration` та `select`.

### Ключі контенту (опціонально)

Якщо встановлено `intlayerSortContentKeys: true`, плагін також сортує ключі `content` словника за алфавітом на кожному рівні вкладеності. Це застосовується лише до файлів `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Сортування проходить крізь кожну допоміжну функцію (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…), щоб дістатися до об'єктів усередині них. Внутрішня карта ключів кожного хелпера зберігає свій власний порядок. Ключі, передані в `cond()` та `gender()`, ніколи не перевпорядковуються, оскільки їхній останній ключ є резервним варіантом. Поля поруч із `content` (`key`, `title`, `locale`…) залишаються без змін.

## Опції

| Опція                     | За замовчуванням | Опис                                                                                               |
| ------------------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`         | Локалі, які залишаються першими в `t()`, у зазначеному порядку. Передайте `[]`, щоб сортувати всі. |
| `intlayerSortContentKeys` | `false`          | У файлах `*.content.*` додатково сортує ключі контенту словника та вкладені об'єкти.               |

## Що залишається без змін

- Об'єкти з оператором поширення (`...base`), обчислюваним ключем (`[key]`), методом або повторюваним ключем.
- Карти `plural()` із ключем, який не є категорією CLDR.
- Карти `enu()`, де новий порядок змінив би розв'язаний контент.
- Виклики інших функцій з іменами допоміжних функцій, яким передано не об'єктний аргумент.

Коментарі переміщуються разом із ключем, до якого вони належать.

## Підтримувані парсери

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` та `jsonc`. Блоки `<script>` у файлах Vue, Svelte та Astro форматуються за допомогою цих парсерів.

> **Відоме обмеження.** Prettier запускає лише один плагін на парсер. Якщо інший плагін також замінює парсери JavaScript/TypeScript (наприклад `prettier-plugin-tailwindcss`), до цих файлів застосовуватиметься лише останній зі списку. Обмежте сферу застосування `prettier-plugin-intlayer` файлами `*.content.*` за допомогою override, щоб уникнути конфлікту.
