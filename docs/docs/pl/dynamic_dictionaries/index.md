---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Słowniki dynamiczne
description: Przegląd funkcji słowników dynamicznych Intlayer — kolekcji i wariantów — do tworzenia elastycznej, sterowanej w czasie wykonywania treści i18n.
keywords:
  - Słowniki dynamiczne
  - Kolekcje
  - Warianty
  - Intlayer
  - Internacjonalizacja
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Wydanie funkcji słowników dynamicznych"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Scalono rekordy dynamiczne z wariantami — `variant` przyjmuje teraz ciąg znaków lub obiekt"
author: aymericzip
---

# Słowniki dynamiczne

Intlayer obsługuje dwa mechanizmy wyrażania treści wykraczającej poza pojedynczy statyczny słownik na klucz. Każdy jest deklarowany przez **pole metadanych najwyższego poziomu** w pliku treści; nie jest potrzebna żadna funkcja opakowująca.

| Funkcja                                                                                                       | Pole metadanych                          | Selektor w `useIntlayer`                         |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| [Kolekcje](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md) | `item: N`                                | `{ item: N }`                                    |
| [Warianty](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md)    | `variant: "name"` _lub_ `variant: { … }` | `{ variant: "name" }` _lub_ `{ variant: { … } }` |

Oba łączą się z argumentem locale i obsługują selektywne / leniwe ładowanie przez `importMode`.

## Kiedy czego używać

- **Kolekcje** — uporządkowana lista elementów zarządzanych w osobnych plikach (wpisy FAQ, posty na blogu, produkty).
- **Warianty** — nazwane lub strukturalne alternatywy treści:
  - wariant **tekstowy** do testów A/B, banerów sezonowych lub feature flag;
  - wariant **obiektowy** dla rekordów CMS, treści zależnej od użytkownika lub dowolnej treści adresowanej zestawem pól (dawne „rekordy dynamiczne").

> Wcześniejsze wersje udostępniały osobne pole `meta` dla treści indeksowanej rekordami. Zostało scalone z `variant`: przekaż do `variant` **obiekt** zamiast używać `meta`.

## Ujednoznacznianie selektora

Klucz może deklarować obydwa wymiary jednocześnie (np. kolekcja, której elementy mają wariant). Są one rozwiązywane w kolejności:

```
variant → item
```

Zatem `{ variant: "promo" }` dla klucza variant × item zwraca wszystkie elementy promo jako tablicę, a dodanie `{ item: 2 }` zawęża wynik do pojedynczego wpisu.
