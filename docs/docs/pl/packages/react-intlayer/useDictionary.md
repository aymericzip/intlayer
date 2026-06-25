---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Dokumentacja React Intlayer
description: Kompletny przewodnik po użyciu hooka useDictionary w aplikacjach React z Intlayer do efektywnego zarządzania lokalizowanymi treściami bez wizualnego edytora.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - lokalizacja
  - i18n
  - słownik
  - tłumaczenie
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

## Przykład użycia w React

Poniżej znajduje się przykład, jak użyć hooka `useDictionary` w komponencie React:

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

## Integracja z serwerem

Jeśli używasz hooka `useDictionary` poza `IntlayerProvider`, locale musi być jawnie przekazane jako parametr podczas renderowania komponentu:

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

## Dodatkowe wskazówki

- **Bezpieczeństwo typów**: Zawsze używaj `Dictionary` do definiowania swoich słowników, aby zapewnić bezpieczeństwo typów.
- **Aktualizacje lokalizacji**: Podczas aktualizacji zawartości upewnij się, że wszystkie lokalizacje są spójne, aby uniknąć brakujących tłumaczeń.

Niniejsza dokumentacja koncentruje się na integracji hooka `useDictionary`, oferując uproszczone podejście do zarządzania lokalizowaną zawartością bez polegania na funkcjonalnościach edytora wizualnego.
