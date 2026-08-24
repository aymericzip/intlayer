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

# Dokumentacja hooka useDictionary

Hook `useDictionary` umożliwia przetwarzanie obiektu wyglądającego jak słownik (zawierającego klucze i zawartość) oraz obsługę tłumaczeń, enumeracji itp. w jego obrębie. W przeciwieństwie do `useIntlayer`, który jest przeznaczony do pracy z wygenerowanymi deklaracjami słownika, `useDictionary` jest bardziej elastyczny i może być używany z dowolnym obiektem, który następuje strukturę słownika.

## Integracja z serwerem

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
