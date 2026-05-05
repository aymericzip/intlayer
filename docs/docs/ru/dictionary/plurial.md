---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Множественное число
description: Узнайте, как объявлять и использовать контент с учетом множественного числа (на основе CLDR) на вашем многоязычном веб-сайте. Следуйте инструкциям в этой онлайн-документации, чтобы настроить свой проект за несколько минут.
keywords:
  - Множественное число
  - Плюрализация
  - CLDR
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Контент во множественном числе / Множественное число в Intlayer

## Как работает множественное число

В Intlayer контент во множественном числе реализуется с помощью функции `plural`, которая сопоставляет категории множественного числа CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, с соответствующим контентом. Правильная категория выбирается автоматически на основе активной локали и значения счетчика с использованием встроенного в платформу API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

В отличие от [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md), который выбирает контент на основе числовых диапазонов, определенных вами самостоятельно, `plural` делегирует выбор правилам CLDR. Это делает его масштабируемым для языков со сложными правилами множественного числа, таких как русский, польский, арабский или валлийский, без необходимости вручную писать логику по модулю.

## Когда использовать `plural` против `enu`

| Вариант использования                                                                        | Помощник |
| -------------------------------------------------------------------------------------------- | -------- |
| Грамматические формы множественного числа с учетом локали (one apple / two apples / 5 яблок) | `plural` |
| Пользовательские числовые диапазоны (`<5`, `>=10`) или корзины, не относящиеся к CLDR        | `enu`    |

Если вы ориентируетесь только на английский язык (в котором есть только `one` / `other`), подойдет любой вариант. Для любого языка с различиями `few` / `many` / `two` отдавайте предпочтение `plural`.

## Настройка контента во множественном числе

Чтобы настроить контент во множественном числе в вашем проекте Intlayer, создайте модуль контента, использующий помощник `plural`. Категория `other` является обязательной и используется в качестве запасного варианта, когда локаль не определяет более конкретную категорию.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ru: plural({
        one: "{{count}} вакансия",
        few: "{{count}} вакансии",
        many: "{{count}} вакансий",
        other: "{{count}} вакансий",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ru": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} вакансия",
            "few": "{{count}} вакансии",
            "many": "{{count}} вакансий",
            "other": "{{count}} вакансий"
          }
        }
      }
    }
  }
}
```

> Поддерживаемые категории: `zero`, `one`, `two`, `few`, `many`, `other`. Вам нужно объявить только те категории, которые использует ваш целевой язык, Intlayer возвращается к `other`, когда ни одна конкретная категория не подходит.
>
> Заполнитель `{{count}}` автоматически заменяется счетчиком, который вы передаете во время выполнения. Вы также можете включить другие заполнители (см. [Пользовательские заполнители](#custom-placeholders) ниже).

## Использование контента во множественном числе с React Intlayer

Чтобы использовать контент во множественном числе внутри компонента React, извлеките его с помощью хука `useIntlayer` и вызовите его со счетчиком. Активная локаль и счетчик объединяются для выбора соответствующей категории CLDR.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* На английском:                               */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Вы можете вызвать возвращаемую функцию двумя эквивалентными способами:

```tsx
totalOpenings(21); // сокращение: только счетчик
totalOpenings({ count: 21 }); // явная форма
```

## Пользовательские заполнители

Строки во множественном числе могут включать заполнители, отличные от `{{count}}`. Передайте их в форме объекта вместе с `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, у вас {{count}} новое сообщение",
      other: "{{name}}, у вас {{count}} новых сообщений",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, у вас 1 новое сообщение"

summary({ count: 7, name: "Alice" });
// → "Alice, у вас 7 новых сообщений"
```

## Категории CLDR с первого взгляда

Разные языки используют разные подмножества категорий CLDR. Несколько распространенных случаев:

| Язык                 | Используемые категории                       |
| -------------------- | -------------------------------------------- |
| Английский (`en`)    | `one`, `other`                               |
| Французский (`fr`)   | `one`, `many`, `other`                       |
| Русский (`ru`)       | `one`, `few`, `many`, `other`                |
| Польский (`pl`)      | `one`, `few`, `many`, `other`                |
| Арабский (`ar`)      | `zero`, `one`, `two`, `few`, `many`, `other` |
| Японский / Китайский | только `other`                               |

Вам не нужно это запоминать, объявляйте категории, для которых у вас есть переводы, и Intlayer при необходимости вернется к `other`.

## Ограничение

В отличие от других узлов, узел `plural` пока не может быть вложен в дочерние узлы.

Пример:

Действительно:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Недействительно:

```ts
totalOpenings: plural({
  one: {
    en: "{{count}} opening",
    fr: "{{count}} offre",
  },
  other: {
    en: "{{count}} openings",
    fr: "{{count}} offres",
  },
}),
```

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация по перечислению (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md)
- [Документация по вставке (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md)
- [Документация по Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предлагают дополнительную информацию о настройке и использовании Intlayer в различных средах и фреймворках.
