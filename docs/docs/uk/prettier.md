---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Плагін Prettier x Oxfmt | Сортування перекладів Intlayer і виправлення .value
description: "Сортуйте локалі в t(), plural(), enu() і select() в оголошеннях контенту та додавайте .value там, де контент використовується як рядок, щоб типи лишалися коректними з візуальним редактором. Працює з Prettier і oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Форматування
  - Сортування перекладів
  - Сортування локалей
  - i18n
  - Інтернаціоналізація
  - plural
  - enumeration
  - select
  - Візуальний редактор
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Додано підстановку .value для контенту, використаного як рядок"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Початкова історія"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Додано використання з oxfmt"
author: aymericzip
---

# Плагін Prettier x Oxfmt

`prettier-plugin-intlayer` робить дві речі щоразу, коли Prettier форматує файл:

1. **Сортує переклади** у фіксованому порядку. Диффи лишаються малими, конфлікти злиття трапляються рідше, а відсутню локаль легко помітити.
2. **Додає `.value`** там, де контент використовується як рядок, щоб типи лишалися коректними після ввімкнення візуального редактора.

```ts
// до
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// після
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Встановлення

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Потрібен Prettier версії 3 або новішої.

Якщо у вашому проекті вже використовується Prettier, команда `intlayer init prettier` автоматично встановить плагін і додасть його до вашої конфігурації.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt не вміє завантажувати сторонні плагіни, тому сортування виконується через Prettier. Встановіть Prettier поруч з oxfmt. Він потрібен лише для сортування оголошень контенту, а oxfmt і далі форматує ваш проєкт.

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

Потрібен Prettier версії 3 або новішої. `intlayer init` налаштовує плагін лише в проєктах, які вже використовують Prettier, тому налаштуйте його вручну, як показано нижче.

  </Tab>
</Tabs>

## Використання

Плагін працює з Prettier та з [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Додайте плагін до конфігурації Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Щоб сортувати лише оголошення контенту, використовуйте override. Підстановка `.value` тоді не застосовується до ваших компонентів:

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

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

Скрипт форматування запускає два інструменти, кожен зі своїм завданням:

1. **Prettier** запускає плагін. Перший glob сортує оголошення контенту, другий додає `.value` у компоненти. Приберіть другий glob, якщо потрібне лише сортування.
2. **oxfmt** форматує весь проєкт, включно з оголошеннями контенту.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Дотримуйтеся цього порядку. oxfmt замінює форматування Prettier своїм, але ніколи не змінює порядок ключів об'єктів, тому відсортований порядок зберігається.

Це налаштування має кілька обмежень:

- **Форматування під час збереження.** Редактор, що форматує через oxfmt, не запускає плагін. Запускайте натомість скрипт `format`.
- **Режим check.** Не використовуйте `prettier --check` для файлів, відформатованих oxfmt: форматування відрізняється, тому він повідомить про кожен файл. Щоб перевірити порядок у CI, запустіть скрипт `format` і завершуйте job з помилкою, якщо є зміни:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Однакові переклади

У файлах `*.content.*` виклик `t()`, у якого всі локалі містять однаковий рядок, замінюється цим рядком. Простий рядок віддається для кожної локалі, тому результат не змінюється.

```ts
// до
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// після
nextjs: "Next.js",
```

`t()` з однією локаллю, аргументом типу (`t<string>()`), коментарем або нерядковими значеннями зберігається. Встановіть `intlayerCollapseIdenticalTranslations: false`, щоб вимкнути це.

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

## Контент, використаний як рядок

Коли [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) увімкнено (`editor.enabled: true`), поле, яке повертає `useIntlayer` або `getIntlayer`, є вузлом для рендерингу, а не рядком. Передавання його в атрибут нативного елемента або виклик на ньому методу рядка більше не проходить перевірку типів. Template literals, конкатенація та `String()` приймають будь-який тип і лишаються без змін. Плагін додає `.value`, що містить рядок незалежно від того, чи ввімкнено редактор.

```tsx
// до
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// після
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Переписуються:

- методи рядка: `content.name.toUpperCase()`
- атрибути нативних елементів: `<img alt={content.alt} />`

Лишаються без змін, бо приймають вузол:

- дочірні елементи JSX: `<h1>{content.title}</h1>`
- props компонентів: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

Це стосується компонентів, а не оголошень контенту, тож плагін має запускатися на файлах компонентів. Змінна, ім'я якої повторно оголошено деінде у файлі, пропускається. Шаблони Vue та Svelte не переписуються: використовуйте для них [правило ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md), яке також має autofix.

Також прибирає `.value` з дочірнього елемента JSX: `<h1>{content.title.value}</h1>` стає `<h1>{content.title}</h1>`, щоб візуальний редактор міг виділити текст. Стосується React, Next.js, Preact, Solid і React Native.

Вимикається через `intlayerNodeValueAccess: false`.

## Опції

| Опція                                   | За замовчуванням | Опис                                                                                                          |
| --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`         | Локалі, які залишаються першими в `t()`, у зазначеному порядку. Передайте `[]`, щоб сортувати всі.            |
| `intlayerSortContentKeys`               | `false`          | У файлах `*.content.*` додатково сортує ключі контенту словника та вкладені об'єкти.                          |
| `intlayerCollapseIdenticalTranslations` | `true`           | У файлах `*.content.*` замінює `t()`, у якого всі локалі містять однаковий рядок, цим рядком.                 |
| `intlayerNodeValueAccess`               | `true`           | Додає `.value` там, де контент використовується як рядок (`alt={content.alt}`, `content.name.toUpperCase()`). |

## Що залишається без змін

- Об'єкти з оператором поширення (`...base`), обчислюваним ключем (`[key]`), методом або повторюваним ключем.
- Карти `plural()` із ключем, який не є категорією CLDR.
- Карти `enu()`, де новий порядок змінив би розв'язаний контент.
- Виклики інших функцій з іменами допоміжних функцій, яким передано не об'єктний аргумент.

Коментарі переміщуються разом із ключем, до якого вони належать.

## Підтримувані парсери

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` та `jsonc`. Блоки `<script>` у файлах Vue, Svelte та Astro форматуються за допомогою цих парсерів.

> **Відоме обмеження.** Prettier запускає лише один плагін на парсер. Якщо інший плагін також замінює парсери JavaScript/TypeScript (наприклад `prettier-plugin-tailwindcss`), до цих файлів застосовуватиметься лише останній зі списку. Обмежте сферу застосування `prettier-plugin-intlayer` файлами `*.content.*` за допомогою override, щоб уникнути конфлікту. В oxfmt класи Tailwind сортуються вбудованою опцією `sortTailwindcss`, тому цей конфлікт не виникає. У такому разі використовуйте [правило ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md) для `.value` у компонентах.
