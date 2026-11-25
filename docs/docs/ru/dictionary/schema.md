---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Валидация словарей с помощью схем (Zod)"
description: "Объявите схемы Zod в intlayer.config.ts и привяжите их к словарям, чтобы проверять каждую локаль при сборке и типизировать контент в редакторе."
keywords:
  - Схема
  - Zod
  - Валидация
  - Словарь
  - Объявление контента
  - Типобезопасность
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Инициализация документации"
author: aymericzip
---

# Валидация словарей с помощью схем

Схема описывает ожидаемую форму контента словаря. Вы объявляете её один раз в `intlayer.config.ts`, даёте ей имя, а затем привязываете это имя к любому словарю через поле `schema`.

После этого Intlayer:

- **Валидирует** словарь для каждой локали при сборке словарей и сообщает о каждой ошибке с указанием локали и пути к полю.
- **Типизирует** контент словаря в редакторе, поэтому отсутствующее поле или поле с неверным типом обнаруживается ещё до сборки.

Схемы полезны, когда несколько словарей должны иметь одинаковую структуру (SEO-метаданные, карточки товаров, записи в стиле CMS), или когда контент должен соблюдать ограничения, которые TypeScript не может выразить, например максимальную длину каждого перевода.

<Steps>
<Step number={1} title="Объявите схемы в конфигурации">

Установите [Zod](https://zod.dev):

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

Затем объявите схемы в ключе `schemas`. Каждый ключ является именем, на которое вы будете ссылаться из словарей.

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
<Step number={2} title="Привяжите схему к словарю">

Укажите в поле `schema` словаря одно из имён, объявленных в конфигурации.

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

Одну и ту же схему можно привязать к любому количеству словарей.

</Step>
<Step number={3} title="Запустите сборку и прочитайте отчёт">

Валидация выполняется при каждой сборке словарей: через `npx intlayer build` или через плагин вашего бандлера в режимах dev и build. Если перевод нарушает схему, Intlayer выводит локаль, путь к полю и сообщение Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Разовый запуск `intlayer build` завершается ошибкой, если схема неизвестна или проверка не пройдена. В режиме наблюдения Intlayer пропускает невалидный словарь, пока его содержимое не будет исправлено.

</Step>
</Steps>

## Типизация контента по схеме

Generic-параметры `Dictionary` определяют, насколько строго TypeScript проверяет словарь:

| Объявление                                              | Поле `schema`                                   | Поле `content`                      |
| ------------------------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| `satisfies Dictionary`                                  | Автодополнение, неизвестное имя вызывает ошибку | Не проверяется TypeScript           |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Должно быть `"seo-metadata"`                    | Типизировано по схеме               |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Должно быть `"seo-metadata"`                    | Типизировано по схеме и вашему типу |

С типизированной схемой каждое поле принимает либо простое значение, либо узел контента, который возвращает это значение, поэтому `t()` по-прежнему допустим:

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

> Intlayer генерирует эти типы из ваших схем Zod в `.intlayer/types` при каждой сборке словарей. Типизируется только форма: ограничения вроде `.min()`, `.max()` или `.regex()` проверяются при сборке.

## Что валидируется

Для каждой локали из `internationalization.locales` Intlayer разрешает контент словаря для этой локали, а затем валидирует результат. Поэтому схема описывает итоговое значение поля (`title: string`), а не узел `t()`, содержащий переводы.

- **Отсутствующие переводы**: при `strictMode` по умолчанию отсутствующий перевод перед валидацией заменяется значением из локали по умолчанию. При `strictMode: "strict"` отсутствующий перевод приводит к ошибке обязательного поля.
- **Другие узлы контента**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` и `insert()` разрешаются в функции, а `md()` или `html()` в узлы. Объявляйте такие поля через `z.any()`, а ограничения оставляйте на полях, которые разрешаются в простые значения.
- **Не валидируется**: контент, возвращаемый функцией или Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)), и словари, загружаемые из [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Использование другой библиотеки валидации

Записи `schemas` не привязаны к Zod. Подойдёт любой объект с совместимым с Zod методом `safeParse(data)`, если он возвращает `{ success: true }` или `{ success: false, error: { issues } }`, где у каждого issue есть массив `path` и `message`. Типизация контента генерируется только из схем Zod: с другой библиотекой контент привязанных словарей типизируется как `any`.

## Часто задаваемые вопросы

<FAQ>

<Question title="Останавливает ли ошибка схемы мою сборку?">

Разовый запуск `intlayer build` завершается ошибкой, если словарь не соответствует своей схеме. В режиме наблюдения Intlayer выводит ошибки и пропускает словарь, пока вы его не исправите и не сохраните.

</Question>
<Question title="Могут ли несколько словарей использовать одну схему?">

Да. Схема указывается по имени, поэтому на неё может ссылаться любое количество словарей. Это основной сценарий: единая структура для всех метаданных страниц, карточек товаров или шаблонов email.

</Question>
<Question title="Что будет, если имя схемы не существует?">

TypeScript сообщит об ошибке, как только объявлена хотя бы одна схема, потому что поле `schema` принимает только объявленные имена. Для JSON-файлов Intlayer сообщает о неизвестной схеме при сборке и отклоняет словарь.

</Question>
<Question title="Валидируются все локали или только локаль по умолчанию?">

Все локали из `internationalization.locales`. В отчёте указывается локаль с ошибкой, поэтому перевод, слишком длинный только на немецком, легко найти.

</Question>

</FAQ>

## Смотрите также

- [Файлы объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Перевод](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
