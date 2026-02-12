---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu intlayer-cli
description: Narzędzie CLI dla Intlayer, udostępniające polecenia do budowania i audytu słowników.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja wszystkich eksportów
---

# Pakiet intlayer-cli

Pakiet `intlayer-cli` dostarcza zestaw poleceń do zarządzania słownikami Intlayer i konfiguracją.

## Instalacja

```bash
npm install intlayer-cli
```

## Eksporty

### Polecenia CLI (Funkcje)

Pakiet eksportuje funkcje, które obsługują polecenia CLI.

| Funkcja    | Opis                                                               |
| ---------- | ------------------------------------------------------------------ |
| `build`    | Buduje słowniki Intlayer.                                          |
| `audit`    | Przeprowadza audyt słowników w poszukiwaniu brakujących tłumaczeń. |
| `liveSync` | Synchronizuje słowniki w czasie rzeczywistym.                      |
| `pull`     | Pobiera słowniki ze źródła zdalnego.                               |
| `push`     | Wysyła słowniki do źródła zdalnego.                                |
| `test`     | Uruchamia testy na słownikach.                                     |
| `extract`  | Konwertuje słowniki między formatami.                              |
