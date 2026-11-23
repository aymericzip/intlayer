---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Плагин Prettier x Oxfmt | Сортировка переводов Intlayer и исправление .value
description: "Сортируйте локали в t(), plural(), enu() и select() в объявлениях контента и добавляйте .value там, где контент используется как строка, чтобы типы оставались корректными с визуальным редактором. Работает с Prettier и oxfmt."
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
  - Визуальный редактор
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Добавлена подстановка .value для контента, используемого как строка"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Начальная история"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Добавлено использование с oxfmt"
author: aymericzip
---

# Плагин Prettier x Oxfmt

`prettier-plugin-intlayer` делает две вещи при каждом форматировании файла Prettier:

1. **Сортирует переводы** в фиксированном порядке. Диффы остаются небольшими, конфликты слияния случаются реже, а отсутствующую локаль легко заметить.
2. **Добавляет `.value`** там, где контент используется как строка, чтобы типы оставались корректными после включения визуального редактора.

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

Чтобы сортировать только объявления контента, используйте override. Подстановка `.value` тогда не применяется к вашим компонентам:

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

1. **Prettier** запускает плагин. Первый glob сортирует объявления контента, второй добавляет `.value` в компоненты. Уберите второй glob, если нужна только сортировка.
2. **oxfmt** форматирует весь проект, включая объявления контента.

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

Соблюдайте этот порядок. oxfmt заменяет форматирование Prettier своим, но никогда не меняет порядок ключей объектов, поэтому отсортированный порядок сохраняется.

У этой настройки есть ограничения:

- **Форматирование при сохранении.** Редактор, форматирующий через oxfmt, не запускает плагин. Запускайте скрипт `format`.
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

## Контент, используемый как строка

При включённом [визуальном редакторе](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) (`editor.enabled: true`) поле, возвращаемое `useIntlayer` или `getIntlayer`, является отображаемым узлом, а не строкой. Передача его в атрибут нативного элемента или вызов на нём строкового метода больше не проходит проверку типов. Template literals, конкатенация и `String()` принимают любой тип и остаются без изменений. Плагин добавляет `.value`, где строка доступна независимо от того, включён редактор или нет.

```tsx
// до
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// после
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Переписываются:

- строковые методы: `content.name.toUpperCase()`
- атрибуты нативных элементов: `<img alt={content.alt} />`

Остаются без изменений, так как принимают узел:

- дочерние элементы JSX: `<h1>{content.title}</h1>`
- props компонентов: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

Это касается компонентов, а не объявлений контента, поэтому плагин должен запускаться на файлах компонентов. Переменная, имя которой повторно объявлено в другом месте файла, пропускается. Шаблоны Vue и Svelte не переписываются: используйте для них [правило ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md), у него тоже есть autofix.

Также удаляет `.value` у дочернего элемента JSX: `<h1>{content.title.value}</h1>` становится `<h1>{content.title}</h1>`, чтобы визуальный редактор мог выделить текст. Относится к React, Next.js, Preact, Solid и React Native.

Отключается через `intlayerNodeValueAccess: false`.

## Опции

| Опция                                   | По умолчанию | Описание                                                                                                         |
| --------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`     | Локали, сохраняемые первыми в `t()`, в указанном порядке. Передайте `[]`, чтобы сортировать все локали.          |
| `intlayerSortContentKeys`               | `false`      | В файлах `*.content.*` также сортирует ключи контента словаря и вложенные объекты.                               |
| `intlayerCollapseIdenticalTranslations` | `true`       | В файлах `*.content.*` заменяет `t()`, у которого все локали содержат одну и ту же строку, этой строкой.         |
| `intlayerNodeValueAccess`               | `true`       | Добавляет `.value` там, где контент используется как строка (`alt={content.alt}`, `content.name.toUpperCase()`). |

## Что остается без изменений

- Объекты, содержащие spread-оператор (`...base`), вычисляемый ключ (`[key]`), метод или дублирующийся ключ.
- Карты `plural()` с ключом, не являющимся категорией CLDR.
- Карты `enu()`, где новый порядок изменил бы разрешенный контент.
- Вызовы любых других функций с именами вспомогательных функций, но с аргументом, не являющимся объектом.

Комментарии перемещаются вместе с ключом, к которому они относятся.

## Поддерживаемые парсеры

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` и `jsonc`. Блоки `<script>` файлов Vue, Svelte и Astro форматируются с использованием этих парсеров.

> **Известное ограничение.** Prettier запускает только один плагин на парсер. Если другой плагин также заменяет парсеры JavaScript/TypeScript (например, `prettier-plugin-tailwindcss`), к этим файлам будет применен только последний указанный плагин. Ограничьте область действия `prettier-plugin-intlayer` файлами `*.content.*` с помощью override, чтобы избежать конфликта. В oxfmt классы Tailwind сортируются встроенной опцией `sortTailwindcss`, поэтому этот конфликт не возникает. В этом случае используйте [правило ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md) для `.value` в компонентах.
