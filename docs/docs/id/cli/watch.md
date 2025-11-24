---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Pantau Kamus
description: Pelajari cara memantau perubahan pada file deklarasi konten Anda dan secara otomatis membangun kamus.
keywords:
  - Pantau
  - Kamus
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Pantau Kamus

```bash
npx intlayer watch
```

Perintah ini akan memantau perubahan pada file deklarasi konten Anda dan membangun kamus di direktori `.intlayer`.
Perintah ini setara dengan `npx intlayer build --watch --skip-prepare`.

## Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumen:

- **`--with`**: Mulai perintah secara paralel dengan pemantauan.

> Contoh: `npx intlayer watch --with "next dev --turbopack"`
