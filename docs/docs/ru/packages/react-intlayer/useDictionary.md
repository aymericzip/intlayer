---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Хук useDictionary - Документация React Intlayer
description: Полное руководство по использованию хука useDictionary в React-приложениях с Intlayer для эффективной работы с локализованным контентом без визуального редактора.
keywords:
  - useDictionary
  - React
  - хук
  - intlayer
  - локализация
  - i18n
  - словарь
  - перевод
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Документация хука useDictionary

Хук `useDictionary` позволяет обрабатывать объект, похожий на словарь (содержащий ключи и содержимое), и обрабатывать переводы, перечисления и т. д. в нём. В отличие от `useIntlayer`, который предназначен для работы с генерируемыми объявлениями словарей, `useDictionary` более гибок и может использоваться с любым объектом, который соответствует структуре словаря.

## Пример использования в React

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Дополнительные советы

- **Типобезопасность**: Всегда используйте `Dictionary` для определения ваших словарей, чтобы обеспечить типобезопасность.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствующих переводов.

Данная документация сосредоточена на интеграции хука `useDictionary`, предоставляя упрощённый подход к управлению локализованным контентом без зависимости от функционала визуального редактора.
