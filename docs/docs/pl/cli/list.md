---
createdAt: 2024-08-11
updatedAt: 2026-01-06
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
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Dodano opcję wyjścia JSON do polecenia list
---

# Lista plików deklaracji zawartości

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

To polecenie wyświetla wszystkie pliki deklaracji zawartości w Twoim projekcie, pokazując ich klucze słownika oraz ścieżki do plików. Jest to przydatne, aby uzyskać przegląd wszystkich plików zawartości i zweryfikować, czy są one poprawnie wykrywane przez Intlayer.

## Argumenty:

- **`--json`**: Wyświetla wyniki jako JSON zamiast sformatowanego tekstu. Przydatne do skryptów i dostępu programowego.

  > Przykład: `npx intlayer content list --json`

## Przykłady:

### Lista plików deklaracji zawartości:

```bash
npx intlayer content list
```

### Wyjście jako JSON:

```bash
npx intlayer content list --json
```

## Przykładowy wynik:

### Sformatowane wyjście:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Łączna liczba plików deklaracji zawartości: 3
```

### Wyjście JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

To polecenie wyświetli:

- Sformatowaną listę wszystkich plików deklaracji zawartości wraz z ich kluczami i względnymi ścieżkami do plików
- Łączną liczbę znalezionych plików deklaracji zawartości

Wynik pomaga zweryfikować, czy wszystkie Twoje pliki zawartości są poprawnie skonfigurowane i wykrywalne przez system Intlayer.
