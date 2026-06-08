---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Переклад
description: Дізнайтеся, як оголошувати та використовувати переклади на вашому багатомовному сайті. Дотримуйтесь кроків цієї онлайн-документації, щоб налаштувати проект за кілька хвилин.
keywords:
  - Переклад
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
---

# Переклад

## Визначення перекладів

Функція `t` в `intlayer` дозволяє оголошувати контент кількома мовами. Ця функція забезпечує типобезпеку, викликаючи помилку, якщо будь-які переклади відсутні, що особливо корисно в середовищах TypeScript.

Ось приклад того, як оголосити контент із перекладами.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      uk: "Ласкаво просимо до нашого застосунку",
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "uk": "Ласкаво просимо до нашого застосунку",
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Налаштування локалей

Щоб забезпечити коректну обробку перекладів, ви можете налаштувати прийняті локалі в `intlayer.config.ts`. Ця конфігурація дозволяє визначити мови, які підтримує ваш додаток:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Використання перекладів у React-компонентах

За допомогою `react-intlayer` ви можете використовувати переклади у React-компонентах. Ось приклад:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Цей компонент отримує відповідний переклад на основі поточної локалі, встановленої у вашому додатку.

## Користувацькі об'єкти контенту

`intlayer` підтримує власні об'єкти вмісту для перекладу, що дає змогу визначати складніші структури та забезпечує type safety. Ось приклад із кастомним об'єктом:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      uk: {
        title: "Заголовок сторінки",
        content: "Вміст сторінки",
      },
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "uk": {
          "title": "Заголовок сторінки",
          "content": "Вміст сторінки"
        },
        "en": {
          "title": "Page Title",
          "content": "Page Content"
        },
        "fr": {
          "title": "Titre de la Page",
          "content": "Contenu de la Page"
        },
        "es": {
          "title": "Título de la Página",
          "content": "Contenido de la Página"
        }
          "title": "Заголовок сторінки",
          "content": "Вміст сторінки"
        }
      }
    }
  }
}
```
