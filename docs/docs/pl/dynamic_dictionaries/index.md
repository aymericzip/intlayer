---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Słowniki Dynamiczne
description: Omówienie trzech funkcji dynamicznych słowników w Intlayer — kolekcji, wariantów i rekordów dynamicznych — do budowania elastycznych, sterowanych w czasie wykonania treści i18n.
keywords:
  - Słowniki Dynamiczne
  - Kolekcje
  - Warianty
  - Rekordy Dynamiczne
  - Intlayer
  - Umiędzynarodowienie
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Wydanie funkcji słowników dynamicznych"
author: aymericzip
---

# Słowniki Dynamiczne

Intlayer obsługuje trzy mechanizmy definiowania treści wykraczających poza pojedynczy, statyczny słownik na klucz. Każdy z nich jest deklarowany poprzez **pole metadanych najwyższego poziomu** w pliku zawartości; funkcja opakowująca (wrapper) nie jest wymagana.

| Funkcja                                                                                                                     | Pole metadanych   | Selektor w `useIntlayer` |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------ |
| [Kolekcje](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md)               | `item: N`         | `{ item: N }`            |
| [Warianty](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md)                  | `variant: "name"` | `{ variant: "name" }`    |
| [Rekordy Dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`              |

Wszystkie trzy łączą się z argumentem lokalizacji i obsługują wybiórcze / leniwe ładowanie (lazy loading) za pomocą `importMode`.

## Kiedy używać którego rozwiązania

- **Kolekcje** — uporządkowana lista elementów zarządzanych w osobnych plikach (wpisy FAQ, posty na blogu, produkty).
- **Warianty** — nazwane alternatywy treści dla testów A/B, banerów sezonowych lub flag funkcji (feature flags).
- **Rekordy dynamiczne** — treści pobierane w czasie wykonania za pomocą nieprzezroczystego identyfikatora ID (rekordy CMS, treści specyficzne dla użytkownika).

## Rozstrzyganie konfliktów selektorów

Gdy słownik posiada wiele selektorów, kolejność ich rozstrzygania to:

```
variant → meta → item
```
