---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Intlayer Komutunu Hata Ayıkla
description: Intlayer CLI sorunlarını nasıl hata ayıklayacağınızı ve çözeceğinizi öğrenin.
keywords:
  - Hata Ayıklama
  - Sorun Giderme
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Intlayer komutunu hata ayıkla

## 1. **En son sürümü kullandığınızdan emin olun**

Çalıştırın:

```bash
npx intlayer --version                  # mevcut yerel intlayer sürümü
npx intlayer@latest --version           # mevcut en son intlayer sürümü
```

## 2. **Komutun kayıtlı olup olmadığını kontrol edin**

Şu komutlarla kontrol edebilirsiniz:

```bash
npx intlayer --help                     # Kullanılabilir komutların ve kullanım bilgilerinin listesini gösterir
npx intlayer dictionary build --help    # Bir komut için mevcut seçeneklerin listesini gösterir
```

## 3. **Terminalinizi yeniden başlatın**

Bazen yeni komutların tanınması için terminalin yeniden başlatılması gerekir.

## 4. **npx önbelleğini temizleyin (eski bir sürümde takılı kaldıysanız)**

```bash
npx clear-npx-cache
```
