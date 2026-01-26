---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu intlayer-cli
description: Narzędzie CLI dla Intlayer, udostępniające polecenia do budowania i audytu słowników.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet intlayer-cli

Pakiet `intlayer-cli` dostarcza zestaw poleceń do zarządzania słownikami Intlayer i konfiguracją.

## Instalacja

```bash
npm install intlayer-cli
```

## Eksporty

### Polecenia CLI (Funkcje)

Pakiet eksportuje funkcje, które napędzają polecenia CLI, umożliwiając wywoływanie operacji Intlayer programowo.

Import:

```tsx
import "intlayer-cli";
```

| Funkcja        | Opis                                                       |
| -------------- | ---------------------------------------------------------- |
| `build`        | Buduje słowniki Intlayer.                                  |
| `audit`        | Audytuje słowniki pod kątem brakujących tłumaczeń.         |
| `liveSync`     | Synchronizuje słowniki w czasie rzeczywistym.              |
| `pull`         | Pobiera słowniki z zdalnego źródła.                        |
| `push`         | Wysyła słowniki do zdalnego źródła.                        |
| `test`         | Uruchamia testy na słownikach.                             |
| `transform`    | Konwertuje słowniki między formatami.                      |
| `fill`         | Uzupełnia słowniki brakującymi tłumaczeniami za pomocą AI. |
| `reviewDoc`    | Przegląda dokumentację pod kątem internacjonalizacji.      |
| `translateDoc` | Tłumaczy dokumentację z użyciem AI.                        |
