---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Debugowanie polecenia Intlayer
description: Dowiedz się, jak debugować i rozwiązywać problemy z CLI Intlayer.
keywords:
  - Debugowanie
  - Rozwiązywanie problemów
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Debugowanie polecenia intlayer

## 1. **Upewnij się, że używasz najnowszej wersji**

Uruchom:

```bash
npx intlayer --version                  # aktualna wersja intlayer dla lokalnej konfiguracji
npx intlayer@latest --version           # najnowsza dostępna wersja intlayer
```

## 2. **Sprawdź, czy polecenie jest zarejestrowane**

Możesz to sprawdzić za pomocą:

```bash
npx intlayer --help                     # Wyświetla listę dostępnych poleceń i informacje o ich użyciu
npx intlayer dictionary build --help    # Wyświetla listę dostępnych opcji dla polecenia
```

## 3. **Uruchom ponownie terminal**

Czasami konieczne jest ponowne uruchomienie terminala, aby rozpoznał nowe polecenia.

## 4. **Wyczyść pamięć podręczną npx (jeśli utknąłeś na starszej wersji)**

```bash
npx clear-npx-cache
```
