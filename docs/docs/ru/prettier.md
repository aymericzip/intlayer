---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Плагин Prettier x Oxfmt | Сортировка переводов Intlayer
description: "Сортируйте локали в t(), категории plural(), условия enu(), варианты select() и ключи ваших объявлений контента с помощью prettier-plugin-intlayer. Работает с Prettier и oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Форматирование
  - Сортировка переводов
  - Сортировка локалей
  - i18n
  - Интернационализация
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Начальная история"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Добавлено использование с oxfmt"
author: aymericzip
---

# Плагин Prettier x Oxfmt

`prettier-plugin-intlayer` упорядочивает ключи ваших переводов в фиксированном порядке при каждом форматировании файлов с помощью Prettier. Диффы остаются компактными, конфликты слияния возникают реже, а отсутствующую локаль легко заметить.

```ts
// до
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// после
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Установка

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

Требуется Prettier 3 или новее.

Если в вашем проекте уже используется Prettier, команда `intlayer init prettier` установит плагин и добавит его в вашу конфигурацию за вас.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt не умеет загружать сторонние плагины, поэтому сортировка выполняется через Prettier. Установите Prettier рядом с oxfmt. Он нужен только для сортировки объявлений контента, а oxfmt по-прежнему форматирует ваш проект.

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

Требуется Prettier 3 или новее. `intlayer init` настраивает плагин только в проектах, где уже используется Prettier, поэтому настройте его вручную, как показано ниже.

  </Tab>
</Tabs>

## Использование

Плагин работает с Prettier и с [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Добавьте плагин в конфигурацию Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Чтобы применять его только к файлам объявлений контента, используйте секцию переопределения (override):

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

Скрипт форматирования запускает два инструмента, у каждого своя задача:

1. **Prettier** сортирует объявления контента с помощью плагина. Glob ограничивает его файлами `*.content.*`.
2. **oxfmt** форматирует весь проект, включая объявления контента.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Соблюдайте этот порядок. oxfmt заменяет форматирование Prettier своим, но никогда не меняет порядок ключей объектов, поэтому отсортированный порядок сохраняется.

У этой настройки есть ограничения:

- **Форматирование при сохранении.** Редактор, форматирующий через oxfmt, не сортирует. Запустите скрипт `format`, чтобы отсортировать.
- **Режим check.** Не используйте `prettier --check` для файлов, отформатированных oxfmt: форматирование отличается, поэтому он сообщит о каждом файле. Чтобы проверить порядок в CI, запустите скрипт `format` и завершайте job с ошибкой при наличии изменений:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

## Что подвергается сортировке

### `t()`: локали

Закрепленные локали идут первыми (`en` по умолчанию). Остальные локали следуют в алфавитном порядке.

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

Категории располагаются от наименьшего количества к запасному варианту (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
});
```

### `enu()`: возрастающие пороговые значения

Условия сортируются по числу, затем по оператору (`<1`, `<=1`, `1`, `>=1`, `>1`). Вариант `fallback` размещается в самом конце.

```ts
enu({
  "<-1": "Меньше минус одной машины",
  "0": "Нет машин",
  "2": "Две машины",
  ">=3": "Много машин",
  fallback: "Несколько машин",
});
```

Во время выполнения побеждает первое совпавшее условие. Плагин применяет новый порядок только в том случае, если каждое количество по-прежнему разрешается в один и тот же контент. Если порядок определяет итоговый результат, объект остается без изменений. Например, в `{ '<1': …, '<=-2.3': … }` ключ `'<1'` перехватывает любое отрицательное число.

### `select()`: по алфавиту

Варианты сортируются по алфавиту, а `fallback` идет последним.

```ts
select({
  draft: "Этот пост является черновиком",
  published: "Этот пост опубликован",
  scheduled: "Этот пост запланирован",
  fallback: "Неизвестный статус",
});
```

Без ключа `fallback` или `other` в качестве резервного варианта используется последний случай. Этот вариант остается в конце, а сортируются только предшествующие ему варианты.

### Файлы `.content.json`

Сериализованная форма сортируется аналогичным образом: `{ "nodeType": "translation", "translation": { … } }`, а также узлы `plural`, `enumeration` и `select`.

### Одинаковые переводы

В файлах `*.content.*` вызов `t()`, у которого все локали содержат одну и ту же строку, заменяется этой строкой. Простая строка отдаётся для каждой локали, поэтому результат не меняется.

```ts
// до
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// после
nextjs: "Next.js",
```

`t()` с одной локалью, аргументом типа (`t<string>()`), комментарием или нестроковыми значениями сохраняется. Установите `intlayerCollapseIdenticalTranslations: false`, чтобы отключить это.

### Ключи контента (по желанию)

При параметре `intlayerSortContentKeys: true` плагин также сортирует ключи `content` словаря по алфавиту на каждом уровне вложенности. Это относится только к файлам `*.content.*`.

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

Сортировка продолжается сквозь каждую вспомогательную функцию (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…), чтобы добраться до внутренних объектов. Внутренняя карта ключей каждого хелпера сохраняет свой порядок. Ключи, переданные в `cond()` и `gender()`, никогда не переупорядочиваются, поскольку последний ключ является резервным вариантом. Поля, находящиеся на одном уровне с `content` (`key`, `title`, `locale`…), остаются как есть.

## Опции

| Опция                                   | По умолчанию | Описание                                                                                                 |
| --------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`     | Локали, сохраняемые первыми в `t()`, в указанном порядке. Передайте `[]`, чтобы сортировать все локали.  |
| `intlayerSortContentKeys`               | `false`      | В файлах `*.content.*` также сортирует ключи контента словаря и вложенные объекты.                       |
| `intlayerCollapseIdenticalTranslations` | `true`       | В файлах `*.content.*` заменяет `t()`, у которого все локали содержат одну и ту же строку, этой строкой. |

## Что остается без изменений

- Объекты, содержащие spread-оператор (`...base`), вычисляемый ключ (`[key]`), метод или дублирующийся ключ.
- Карты `plural()` с ключом, не являющимся категорией CLDR.
- Карты `enu()`, где новый порядок изменил бы разрешенный контент.
- Вызовы любых других функций с именами вспомогательных функций, но с аргументом, не являющимся объектом.

Комментарии перемещаются вместе с ключом, к которому они относятся.

## Поддерживаемые парсеры

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` и `jsonc`. Блоки `<script>` файлов Vue, Svelte и Astro форматируются с использованием этих парсеров.

> **Известное ограничение.** Prettier запускает только один плагин на парсер. Если другой плагин также заменяет парсеры JavaScript/TypeScript (например, `prettier-plugin-tailwindcss`), к этим файлам будет применен только последний указанный плагин. Ограничьте область действия `prettier-plugin-intlayer` файлами `*.content.*` с помощью override, чтобы избежать конфликта. В oxfmt классы Tailwind сортируются встроенной опцией `sortTailwindcss`, поэтому этот конфликт не возникает.
