---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Валідація словників за допомогою схем (Zod)"
description: "Оголосіть схеми Zod в intlayer.config.ts і прив'яжіть їх до словників, щоб перевіряти кожну локаль під час збірки та типізувати контент у редакторі."
keywords:
  - Схема
  - Zod
  - Валідація
  - Словник
  - Оголошення контенту
  - Типобезпека
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Ініціалізація документації"
author: aymericzip
---

# Валідація словників за допомогою схем

Схема описує очікувану форму контенту словника. Ви оголошуєте її один раз у `intlayer.config.ts`, даєте їй ім'я, а потім прив'язуєте це ім'я до будь-якого словника через поле `schema`.

Після цього Intlayer:

- **Валідує** словник для кожної локалі під час збірки словників і повідомляє про кожну помилку із зазначенням локалі та шляху до поля.
- **Типізує** контент словника в редакторі, тому відсутнє поле або поле з неправильним типом виявляється ще до збірки.

Схеми корисні, коли кілька словників мають мати однакову структуру (SEO-метадані, картки товарів, записи у стилі CMS), або коли контент має дотримуватися обмежень, які TypeScript не може виразити, наприклад максимальної довжини кожного перекладу.

<Steps>
<Step number={1} title="Оголосіть схеми в конфігурації">

Встановіть [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Потім оголосіть схеми в ключі `schemas`. Кожен ключ є ім'ям, на яке ви посилатиметеся зі словників.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Прив'яжіть схему до словника">

Вкажіть у полі `schema` словника одне з імен, оголошених у конфігурації.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Одну й ту саму схему можна прив'язати до будь-якої кількості словників.

</Step>
<Step number={3} title="Запустіть збірку та прочитайте звіт">

Валідація виконується під час кожної збірки словників: через `npx intlayer build` або через плагін вашого бандлера в режимах dev і build. Якщо переклад порушує схему, Intlayer виводить локаль, шлях до поля та повідомлення Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Невалідний словник виключається зі збірки, доки його контент не буде виправлено. Інші словники це не зачіпає.

</Step>
</Steps>

## Типізація контенту за схемою

Generic-параметри `Dictionary` визначають, наскільки суворо TypeScript перевіряє словник:

| Оголошення                                              | Поле `schema`                                   | Поле `content`                      |
| ------------------------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| `satisfies Dictionary`                                  | Автодоповнення, невідоме ім'я спричиняє помилку | Не перевіряється TypeScript         |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Має бути `"seo-metadata"`                       | Типізовано за схемою                |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Має бути `"seo-metadata"`                       | Типізовано за схемою та вашим типом |

З типізованою схемою кожне поле приймає або просте значення, або вузол контенту, який повертає це значення, тому `t()` і надалі дозволений:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer генерує ці типи з ваших схем Zod у `.intlayer/types` під час кожної збірки словників. Типізується лише форма: обмеження на кшталт `.min()`, `.max()` або `.regex()` перевіряються під час збірки.

## Що валідується

Для кожної локалі з `internationalization.locales` Intlayer розв'язує контент словника для цієї локалі, а потім валідує результат. Тому схема описує кінцеве значення поля (`title: string`), а не вузол `t()`, що містить переклади.

- **Відсутні переклади**: зі стандартним `strictMode` відсутній переклад перед валідацією замінюється значенням із локалі за замовчуванням. Зі `strictMode: "strict"` відсутній переклад спричиняє помилку обов'язкового поля.
- **Інші вузли контенту**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` та `insert()` розв'язуються у функції, а `md()` або `html()` у вузли. Оголошуйте такі поля через `z.any()`, а обмеження залишайте на полях, що розв'язуються у прості значення.
- **Не валідується**: контент, який повертає функція або Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md)), і словники, завантажені з [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

## Використання іншої бібліотеки валідації

Записи `schemas` не прив'язані до Zod. Підійде будь-який об'єкт із сумісним із Zod методом `safeParse(data)`, якщо він повертає `{ success: true }` або `{ success: false, error: { issues } }`, де кожен issue має масив `path` і `message`. Типізація контенту генерується лише зі схем Zod: з іншою бібліотекою контент прив'язаних словників типізується як `any`.

## Часті запитання

<FAQ>

<Question title="Чи зупиняє помилка схеми мою збірку?">

Ні. Intlayer виводить кожну помилку, виключає невалідний словник зі збірки та продовжує збирати інші. У режимі dev виправте контент і збережіть файл: watcher перевірить і перезбере словник.

</Question>
<Question title="Чи можуть кілька словників використовувати одну схему?">

Так. Схема вказується за ім'ям, тому на неї може посилатися будь-яка кількість словників. Це основний сценарій: єдина структура для всіх метаданих сторінок, карток товарів або шаблонів email.

</Question>
<Question title="Що станеться, якщо імені схеми не існує?">

TypeScript повідомить про помилку, щойно оголошено хоча б одну схему, бо поле `schema` приймає лише оголошені імена. У JSON-файлі контенту невідоме ім'я ігнорується, і словник не валідується.

</Question>
<Question title="Валідуються всі локалі чи лише локаль за замовчуванням?">

Усі локалі з `internationalization.locales`. У звіті вказано локаль із помилкою, тож переклад, задовгий лише німецькою, легко знайти.

</Question>

</FAQ>

## Дивіться також

- [Файли оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Переклад](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
