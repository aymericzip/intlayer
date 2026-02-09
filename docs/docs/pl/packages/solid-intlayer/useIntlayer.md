---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja hooka useIntlayer | solid-intlayer
description: Zobacz, jak używać hooka useIntlayer w pakiecie solid-intlayer
keywords:
  - useIntlayer
  - słownik
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Zunifikowana dokumentacja dla wszystkich eksportów
---

# Dokumentacja hooka useIntlayer

Hook `useIntlayer` pozwala pobierać zlokalizowaną zawartość ze słownika za pomocą jego klucza. W Solid hook ten zwraca reaktywną funkcję **accessor**, która aktualizuje się za każdym razem, gdy zmienia się locale.

## Użycie

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Opis

Hook wykonuje następujące zadania:

1. **Wykrywanie locale**: Używa bieżącego locale z kontekstu `IntlayerProvider`.
2. **Wstrzykiwanie słownika**: Automatycznie wstrzykuje zawartość słownika odpowiadającego podanemu kluczowi, korzystając ze zoptymalizowanych deklaracji wygenerowanych przez kompilator Intlayer.
3. **Reaktywność**: Zwraca Solid accessor (`Accessor<T>`), który automatycznie ponownie ewaluowany, gdy zmienia się globalny stan locale.
4. **Przetwarzanie tłumaczeń**: rozwiązuje zawartość na podstawie wykrytego locale, przetwarzając wszelkie definicje `t()`, `enu()`, itp., znalezione w słowniku.

## Parametry

- **key**: Unikalny klucz słownika (zgodny z definicją w twoich plikach deklaracji treści).
- **locale** (opcjonalnie): Nadpisuje bieżący locale.

## Zwraca

Funkcja accessor (`() => Content`) zwracająca zlokalizowaną zawartość.
