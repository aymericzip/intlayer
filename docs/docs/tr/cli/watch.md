---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
---

# Sözlükleri İzle

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
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

- **`--ci`**: Komutu monorepo'nun her Intlayer projesinde çalıştırır (bir proje dizininden çalıştırıldığında yalnızca mevcut projede). Proje başına kimlik bilgileri, proje yolunu `{ "clientId", "clientSecret" }` ile eşleyen bir JSON nesnesi olan `INTLAYER_PROJECT_CREDENTIALS` aracılığıyla eklenebilir.

  > Örnek: `npx intlayer watch --ci`
