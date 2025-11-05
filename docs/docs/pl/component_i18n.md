---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Uczyń komponent wielojęzycznym (biblioteka i18n) w React i Next.js
description: Dowiedz się, jak zadeklarować i pobrać zlokalizowaną treść, aby zbudować wielojęzyczny komponent React lub Next.js z Intlayer.
keywords:
  - i18n
  - komponent
  - react
  - wielojęzyczny
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Jak uczynić komponent wielojęzycznym (i18n) za pomocą Intlayer

Ten przewodnik pokazuje minimalne kroki, aby uczynić komponent UI wielojęzycznym w dwóch popularnych konfiguracjach:

- React (Vite/SPA)
- Next.js (App Router)

Najpierw zadeklarujesz swoją treść, a następnie pobierzesz ją w swoim komponencie.

## 1) Zadeklaruj swoją treść (wspólne dla React i Next.js)

Utwórz plik deklaracji treści obok swojego komponentu. Pozwala to trzymać tłumaczenia blisko miejsca ich użycia oraz zapewnia bezpieczeństwo typów.

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

Obsługiwany jest również format JSON, jeśli wolisz pliki konfiguracyjne.

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

## 2) Pobierz swoją treść

### Przypadek A — aplikacja React (Vite/SPA)

Domyślne podejście: użyj `useIntlayer`, aby pobrać treść po kluczu. Pozwala to utrzymać komponenty lekkie i typowane.

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

Renderowanie po stronie serwera lub poza providerem: użyj `react-intlayer/server` i przekaż jawnie `locale`, gdy jest to potrzebne.

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

Alternatywa: `useDictionary` może odczytać cały zadeklarowany obiekt, jeśli wolisz umieszczać strukturę w miejscu wywołania.

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

### Przypadek B — Next.js (App Router)

Preferuj komponenty serwerowe dla bezpieczeństwa danych i wydajności. Używaj `useIntlayer` z `next-intlayer/server` w plikach serwerowych oraz `useIntlayer` z `next-intlayer` w komponentach klienckich.

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

Wskazówka: Dla metadanych strony i SEO możesz również pobierać zawartość za pomocą `getIntlayer` oraz generować wielojęzyczne adresy URL za pomocą `getMultilingualUrls`.

## Dlaczego podejście komponentowe Intlayer jest najlepsze

- **Kolokacja**: Deklaracje treści znajdują się blisko komponentów, co zmniejsza rozbieżności i poprawia ponowne wykorzystanie w systemach projektowych.
- **Bezpieczeństwo typów**: Klucze i struktury są silnie typowane; brakujące tłumaczenia ujawniają się podczas kompilacji, a nie w czasie wykonywania.
- **Server-first**: Działa natywnie w komponentach serwerowych dla lepszego bezpieczeństwa i wydajności; hooki klienta pozostają ergonomiczne.
- **Tree-shaking**: Do bundla trafia tylko zawartość używana przez komponent, co utrzymuje rozmiar pakietu mały w dużych aplikacjach.
- **DX i narzędzia**: Wbudowane middleware, pomocniki SEO oraz opcjonalny Visual Editor/tłumaczenia AI usprawniają codzienną pracę.

Zobacz porównania i wzorce w przeglądzie skupionym na Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Powiązane przewodniki i odniesienia

- Konfiguracja React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Konfiguracja Next.js: https://intlayer.org/doc/environment/nextjs
- Dlaczego Intlayer vs. next-intl vs. next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Te strony zawierają pełną konfigurację, providery, routing oraz pomocniki SEO.
