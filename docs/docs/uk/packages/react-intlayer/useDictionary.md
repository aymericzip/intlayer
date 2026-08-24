---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Хук useDictionary, документація React Intlayer
description: Повний посібник із використання хуку useDictionary у React-застосунках з Intlayer для ефективної роботи з локалізованим контентом без візуального редактора.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localization
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Документація Hook useDictionary

Hook `useDictionary` дозволяє обробляти об'єкт, який виглядає як словник (містить ключі та вміст) та обробляти переклади, перелічення тощо всередині нього. На відміну від `useIntlayer`, який призначений для роботи з генерованими деклараціями словників, `useDictionary` є більш гнучким і може використовуватися з будь-яким об'єктом, що відповідає структурі словника.

## Інтеграція на сервері

```tsx fileName="./ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Додаткові поради

- **Type Safety**: Завжди використовуйте `Dictionary` для визначення ваших словників, щоб забезпечити Type Safety.
- **Localization Updates**: Під час оновлення контенту переконайтеся, що всі локалі узгоджені, щоб уникнути відсутніх перекладів.

Ця документація зосереджена на інтеграції хука `useDictionary`, надаючи оптимізований підхід до керування локалізованим контентом без покладання на функціональність візуальних редакторів.
