---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Контент на основе выбора (Select)
description: Узнайте, как использовать контент на основе выбора в Intlayer для динамического отображения контента на основе произвольного строкового значения. Следуйте этой документации для эффективной реализации контента типа switch в вашем проекте.
keywords:
  - Контент на основе выбора
  - Select Content
  - Switch контент
  - ICU select
  - Динамический рендеринг
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Представлен контент на основе выбора (Select)"
author: aymericzip
---

# Контент на основе выбора (Select) / Intlayer

## Как работает Select

В Intlayer контент на основе выбора достигается с помощью функции `select`, которая сопоставляет произвольные строковые значения с соответствующим им контентом. Это эквивалентно сообщению ICU `{value, select, …}`, или похоже на оператор `switch` в коде вашего приложения.

Используйте `select`, когда дискриминантом (discriminant) является произвольная строка: статус (status), план (plan), платформа (platform) или роль (role). Для других дискриминантов Intlayer предоставляет специализированные узлы:

| Дискриминант                  | Узел       |
| ----------------------------- | ---------- |
| Количество (Quantity)         | `enu()`    |
| Логическое значение (Boolean) | `cond()`   |
| Пол (Gender)                  | `gender()` |
| Любая другая строка           | `select()` |

## Настройка контента на основе выбора

Чтобы настроить контент на основе выбора в вашем проекте Intlayer, создайте модуль контента, который включает ваши определения выбора. Ниже приведены примеры в различных форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // необязательно
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // необязательно
      },
    },
  },
}
```

> Если `fallback` не объявлен, последний объявленный ключ рассматривается как резервный (fallback), когда предоставленное значение не совпадает ни с одним из объявленных случаев: точно так же, как в контрактах `cond()` и `gender()`.

### Безопасность типов (Type Safety)

Принимаемый аргумент выводится из объявленных случаев:

- Без `fallback` принимаются только объявленные случаи: опечатка приведет к ошибке типа.
- С `fallback` принимается любая строка (поскольку резервный вариант покрывает несовпадающие значения), в то время как объявленные случаи по-прежнему обеспечивают автодополнение.

## Почему не использовать обычный объект?

Может возникнуть соблазн объявить обычный объект и индексировать его, используя значение во время выполнения:

```tsx
// ❌ Не делайте этого
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Компилятор Intlayer анализирует ваш исходный код, чтобы исключить неиспользуемый контент и минифицировать оставшиеся ключи. Динамически вычисляемый доступ (`obj[expr]`) не может быть разрешен статически, поэтому вся ветвь будет помечена как непрозрачная (opaque): она сохранится в сборке (bundle), а ее ключи не будут минифицированы.

При использовании `select()` разрешение случая (case resolution) происходит внутри вызова функции, а не как доступ к свойству. Компилятор видит это как единичный статический доступ к полю и точно оптимизирует узел так же, как он это делает с `enu()`, `cond()` или `gender()`:

```tsx
// ✅ Делайте так
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Использование контента на основе выбора

<Tabs group="framework">
  <Tab label="React" value="react">

Чтобы использовать контент на основе выбора в компоненте React, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает контент для указанного ключа и позволяет передать значение для выбора соответствующего вывода.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Вывод: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Вывод: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Чтобы использовать контент на основе выбора в клиентских компонентах Next.js (Client Components), извлекайте его через хук `useIntlayer`. Вот пример:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Чтобы использовать контент на основе выбора в компонентах Vue, извлекайте его через хук `useIntlayer`. Вот пример:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Чтобы использовать контент на основе выбора в компонентах Svelte, извлекайте его через хук `useIntlayer`. Доступ к хранилищу (store) осуществляется с помощью `$`. Вот пример:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Чтобы использовать контент на основе выбора в компонентах Preact, извлекайте его через хук `useIntlayer`. Вот пример:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Чтобы использовать контент на основе выбора в компонентах SolidJS, извлекайте его через хук `useIntlayer`. Вот пример:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Чтобы использовать контент на основе выбора в компонентах Angular, извлекайте его через хук `useIntlayer`. Вот пример:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Чтобы использовать контент на основе выбора с `vanilla-intlayer`, извлекайте его через функцию `useIntlayer`. Вот пример:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Первоначальный рендеринг
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Комбинирование Select с другими узлами

Поскольку каждый случай (case) содержит полный узел контента, `select` может сочетаться с `t()`, `insert()`, `md()` и т.д.:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          ru: "{{name}} сохранил(а) черновик",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          ru: "{{name}} опубликовал(а) пост",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          ru: "{{name}} обновил(а) пост",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Вывод: Alice сохранил(а) черновик
```

## Миграция с ICU `select`

Сообщения, использующие аргумент ICU `select`, импортируются как узел `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Станет:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Случай `other` из ICU переименовывается в `fallback`, что является каноническим названием в Intlayer для всех универсальных (catch-all) случаев. Второй аргумент записывает имя переменной ICU, поэтому при экспорте сообщение трансформируется обратно в точно такую же строку ICU.

> Обратите внимание: сообщения ICU `select`, в которых случаями являются значения пола (`male` / `female` / `other`), вместо этого импортируются как узел [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md).

## Дополнительные ресурсы

Для получения более подробной информации о конфигурации и использовании ознакомьтесь со следующими ресурсами:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Документация Intlayer React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Intlayer Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
