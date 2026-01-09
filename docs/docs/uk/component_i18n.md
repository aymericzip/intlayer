---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Зробити компонент багатомовним (i18n) у React і Next.js
description: Дізнайтеся, як оголошувати та отримувати локалізований вміст для створення багатомовного компонента React або Next.js за допомогою Intlayer.
keywords:
  - i18n
  - component
  - react
  - multilingual
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Як зробити компонент багатомовним (i18n) за допомогою Intlayer

У цьому посібнику показано мінімальні кроки, щоб зробити UI-компонент багатомовним у двох поширених налаштуваннях:

- React (Vite/SPA)
- Next.js (App Router)

Спочатку ви оголосите свій вміст, а потім отримаєте його у своєму компоненті.

## 1) Оголосіть свій вміст (спільно для React і Next.js)

Створіть файл оголошення вмісту поруч із вашим компонентом. Це тримає переклади близько до місця їх використання і забезпечує type safety.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      uk: "Привіт",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      uk: "Багатомовний React-компонент",
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON також підтримується, якщо ви віддаєте перевагу конфігураційним файлам.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Привіт",
        "en": "Hello",
        "fr": "Bonjour",
        "es": "Hola"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "uk": "Багатомовний React-компонент",
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Отримайте свій вміст

### Випадок A — React-додаток (Vite/SPA)

Стандартний підхід: використовуйте `useIntlayer` для отримання за ключем. Це тримає компоненти компактними та типізованими.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Для server-side рендерингу або за межами провайдера: використовуйте `react-intlayer/server` і передавайте явний параметр `locale`, коли це потрібно.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Альтернатива: `useDictionary` може зчитувати всю оголошену структуру, якщо ви віддаєте перевагу розміщенню структури в місці виклику.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Варіант B — Next.js (App Router)

Надавайте перевагу server components для безпеки даних та продуктивності. Використовуйте `useIntlayer` з `next-intlayer/server` у серверних файлах, а `useIntlayer` з `next-intlayer` — у client components.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Порада: Для метаданих сторінки та SEO ви також можете отримувати контент за допомогою `getIntlayer` та генерувати багатомовні URL-адреси за допомогою `getMultilingualUrls`.

## Чому компонентний підхід Intlayer найкращий

- **Колокація**: декларації контенту знаходяться поруч із компонентами, що зменшує розбіжності та покращує повторне використання в дизайн-системах.
- **Типобезпека**: ключі та структури строго типізовані; відсутні переклади виявляються під час збірки, а не під час виконання.
- **Server-first**: Працює нативно в серверних компонентах для кращої безпеки та продуктивності; client hooks залишаються ергономічними.
- **Tree-shaking**: У бандл потрапляє лише контент, який використовує компонент, що допомагає зменшити розмір payload у великих додатках.
- **DX & tooling**: Вбудований middleware, SEO-хелпери та необов'язкові Visual Editor/AI-переклади спрощують щодену роботу.

Дивіться порівняння та шаблони в огляді, орієнтованому на Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Пов'язані посібники та довідкові матеріали

- Налаштування React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Налаштування Next.js: https://intlayer.org/doc/environment/nextjs
- Чому обрати Intlayer замість next-intl та next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Ці сторінки містять end-to-end налаштування, провайдери, маршрутизацію та SEO-хелпери.
