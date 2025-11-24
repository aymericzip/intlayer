---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Lista plików deklaracji zawartości
description: Dowiedz się, jak wyświetlić listę wszystkich plików deklaracji zawartości w swoim projekcie.
keywords:
  - Lista
  - Deklaracja zawartości
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# Lista plików deklaracji zawartości

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

To polecenie wyświetla wszystkie pliki deklaracji zawartości w Twoim projekcie, pokazując ich klucze słownika oraz ścieżki do plików. Jest to przydatne, aby uzyskać przegląd wszystkich plików zawartości i zweryfikować, czy są one poprawnie wykrywane przez Intlayer.

## Przykład:

```bash
npx intlayer content list
```

## Przykładowy wynik:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Łączna liczba plików deklaracji zawartości: 3
```

To polecenie wyświetli:

- Sformatowaną listę wszystkich plików deklaracji zawartości wraz z ich kluczami i względnymi ścieżkami do plików
- Łączną liczbę znalezionych plików deklaracji zawartości

Wynik pomaga zweryfikować, czy wszystkie Twoje pliki zawartości są poprawnie skonfigurowane i wykrywalne przez system Intlayer.
