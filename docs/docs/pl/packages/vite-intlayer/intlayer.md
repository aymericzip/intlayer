---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja wtyczki Vite intlayer | vite-intlayer
description: Zobacz, jak używać wtyczki intlayer dla pakietu vite-intlayer
keywords:
  - intlayer
  - vite
  - wtyczka
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja wtyczki Vite intlayer

Wtyczka Vite `intlayer` integruje konfigurację Intlayer z procesem budowania. Obsługuje aliasy słowników, uruchamia watchera słowników w trybie deweloperskim oraz przygotowuje słowniki do kompilacji.

## Użycie

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opis

Wtyczka wykonuje następujące zadania:

1. **Przygotowanie słowników**: kompiluje słowniki do zoptymalizowanych plików na początku procesu build lub w trybie deweloperskim.
2. **Tryb nasłuchiwania**: w trybie deweloperskim obserwuje zmiany w plikach słowników i automatycznie je rekompiluje.
3. **Aliasy**: udostępnia aliasy do dostępu do słowników w Twojej aplikacji.
4. **Tree-shaking**: wspiera usuwanie nieużywanych tłumaczeń (tree-shaking) za pomocą pluginu `intlayerPrune`.
