---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Przegląd dokumentu
description: Dowiedz się, jak przeglądać pliki dokumentacji pod kątem jakości, spójności i kompletności w różnych lokalizacjach.
keywords:
  - Przegląd
  - Dokument
  - Dokumentacja
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Przegląd dokumentu

Polecenie `doc review` analizuje pliki dokumentacji pod kątem jakości, spójności i kompletności w różnych lokalizacjach.

```bash
npx intlayer doc review
```

Można go użyć do przeglądu plików, które są już przetłumaczone, oraz do sprawdzenia, czy tłumaczenie jest poprawne.

W większości przypadków,

- preferuj użycie `doc translate`, gdy przetłumaczona wersja tego pliku nie jest dostępna.
- preferuj użycie `doc review`, gdy przetłumaczona wersja tego pliku już istnieje.

> Zauważ, że proces przeglądu zużywa więcej tokenów wejściowych niż proces tłumaczenia, aby w pełni przejrzeć ten sam plik. Jednak proces przeglądu zoptymalizuje fragmenty do przeglądu i pominie części, które nie zostały zmienione.

## Argumenty:

Polecenie `doc review` akceptuje te same argumenty co `doc translate`, co pozwala na przeglądanie konkretnych plików dokumentacji i stosowanie kontroli jakości.

Jeśli aktywowałeś jedną z opcji git, polecenie przejrzy tylko te części plików, które uległy zmianie. Skrypt podzieli plik na fragmenty i przejrzy każdy z nich. Jeśli w danym fragmencie nie ma zmian, skrypt go pominie, aby przyspieszyć proces przeglądu i ograniczyć koszty korzystania z API dostawcy AI.

- Pełną listę argumentów znajdziesz w dokumentacji polecenia [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md).
