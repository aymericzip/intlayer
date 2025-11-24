---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Polecenia Live Sync
description: Dowiedz się, jak używać Live Sync do odzwierciedlania zmian treści CMS w czasie rzeczywistym.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Polecenia Live Sync

Live Sync pozwala Twojej aplikacji odzwierciedlać zmiany treści CMS w czasie rzeczywistym. Nie jest wymagane ponowne budowanie ani wdrażanie. Po włączeniu aktualizacje są przesyłane do serwera Live Sync, który odświeża słowniki odczytywane przez Twoją aplikację. Zobacz [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) po więcej szczegółów.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argumenty:

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie włączone przy użyciu CLI)
