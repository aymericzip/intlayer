---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Сделать компонент многоязычным (i18n) в React и Next.js
description: Узнайте, как объявлять и получать локализованный контент для создания многоязычного компонента React или Next.js с помощью Intlayer.
keywords:
  - i18n
  - компонент
  - react
  - многоязычный
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Как сделать компонент многоязычным (i18n) с Intlayer

В этом руководстве показаны минимальные шаги для создания многоязычного UI-компонента в двух популярных конфигурациях:

- React (Vite/SPA)
- Next.js (App Router)

Сначала вы объявите свой контент, затем получите его в своем компоненте.

## 1) Объявите ваш контент (общий для React и Next.js)

Создайте файл объявления контента рядом с вашим компонентом. Это позволяет держать переводы близко к месту их использования и обеспечивает типобезопасность.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

Также поддерживается JSON, если вы предпочитаете конфигурационные файлы.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Получение вашего контента

### Случай A — React приложение (Vite/SPA)

Стандартный подход: используйте `useIntlayer` для получения по ключу. Это позволяет компонентам оставаться легкими и типизированными.

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

Серверный рендеринг или использование вне провайдера: используйте `react-intlayer/server` и передавайте явный `locale` при необходимости.

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

Альтернатива: `useDictionary` может читать весь объявленный объект, если вы предпочитаете размещать структуру непосредственно в месте вызова.

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

### Случай B — Next.js (App Router)

Предпочитайте серверные компоненты для безопасности данных и производительности. Используйте `useIntlayer` из `next-intlayer/server` в серверных файлах и `useIntlayer` из `next-intlayer` в клиентских компонентах.

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

Совет: Для метаданных страницы и SEO вы также можете получать контент с помощью `getIntlayer` и генерировать многоязычные URL с помощью `getMultilingualUrls`.

## Почему подход Intlayer к компонентам лучший

- **Совмещение**: Объявления контента находятся рядом с компонентами, что снижает рассогласование и улучшает повторное использование в дизайн-системах.
- **Типобезопасность**: Ключи и структуры строго типизированы; отсутствующие переводы выявляются на этапе сборки, а не во время выполнения.
- **Server-first**: Работает нативно в серверных компонентах для лучшей безопасности и производительности; клиентские хуки остаются эргономичными.
- **Tree-shaking**: В бандл включается только контент, используемый компонентом, что позволяет сохранять размер payload небольшим в больших приложениях.
- **DX и инструменты**: Встроенный middleware, помощники SEO и опциональные Визуальный редактор/AI-переводы упрощают повседневную работу.

Смотрите сравнения и шаблоны в обзоре, ориентированном на Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Связанные руководства и ссылки

- Настройка React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Настройка Next.js: https://intlayer.org/doc/environment/nextjs
- Почему Intlayer вместо next-intl или next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Эти страницы включают полную настройку, провайдеры, маршрутизацию и помощники SEO.
