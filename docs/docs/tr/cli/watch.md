---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Sözlükleri İzle
description: İçerik bildirim dosyalarınızdaki değişiklikleri nasıl izleyeceğinizi ve sözlükleri otomatik olarak nasıl oluşturacağınızı öğrenin.
keywords:
  - İzle
  - Sözlükler
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Sözlükleri İzle

```bash
npx intlayer watch
```

Bu komut, içerik bildirim dosyalarınızdaki değişiklikleri izleyecek ve `.intlayer` dizininde sözlükleri oluşturacaktır.
Bu komut, `npx intlayer build --watch --skip-prepare` komutunun eşdeğeridir.

## Kısaltmalar:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argümanlar:

- **`--with`**: İzleme ile paralel olarak komutu başlatır.

  > Örnek: `npx intlayer watch --with "next dev --turbopack"`

  > Örnek: `npx intlayer watch --with "next dev --turbopack"`
