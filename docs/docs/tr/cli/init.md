---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer'ı Başlatma
description: Projenizde Intlayer'ı nasıl başlatacağınızı öğrenin.
keywords:
  - Başlatma
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init komutu eklendi
---

# Intlayer'ı Başlatma

```bash
npx intlayer init
```

`init` komutu gerekli dosyaları ve ayarları yapılandırarak Intlayer'ı projenizde otomatik olarak kurar. Intlayer ile başlamanın önerilen yoludur.

## Kısaltmalar:

- `npx intlayer init`

## Argümanlar:

- `--project-root [projectRoot]` - İsteğe bağlı. Proje kök dizinini belirtir. Sağlanmazsa, komut geçerli çalışma dizininden başlayarak proje kökünü arayacaktır.

## Yaptıkları:

The `init` command performs the following setup tasks:

1. **Proje yapısını doğrular** - Geçerli bir proje dizininde olduğunuzu ve içinde bir `package.json` dosyası bulunduğunu doğrular
2. **`.gitignore` dosyasını günceller** - Oluşturulan dosyaların sürüm kontrolünden hariç tutulması için `.gitignore` dosyanıza `.intlayer` ekler
3. **TypeScript'i yapılandırır** - Tüm `tsconfig.json` dosyalarını Intlayer tip tanımlarını (`.intlayer/**/*.ts`) içerecek şekilde günceller
4. **Yapılandırma dosyası oluşturur** - Varsayılan ayarlarla `intlayer.config.ts` (TypeScript projeleri için) veya `intlayer.config.mjs` (JavaScript projeleri için) dosyasını oluşturur
5. **Vite yapılandırmasını günceller** - Bir Vite yapılandırma dosyası tespit edilirse, `vite-intlayer` eklenti importunu ekler
6. **Next.js yapılandırmasını günceller** - Bir Next.js yapılandırma dosyası tespit edilirse, `next-intlayer` eklenti importunu ekler

## Örnekler:

### Temel başlatma:

```bash
npx intlayer init
```

Bu komut, proje kökünü otomatik olarak algılayarak mevcut dizinde Intlayer'ı başlatacaktır.

### Özel proje kökü ile başlatma:

```bash
npx intlayer init --project-root ./my-project
```

Bu komut, Intlayer'ı belirtilen dizinde başlatacaktır.

## Örnek çıktı:

```bash
npx intlayer init
Intlayer yapılandırması kontrol ediliyor...
✓ .intlayer .gitignore dosyasına eklendi
✓ tsconfig.json intlayer tiplerini içerecek şekilde güncellendi
intlayer.config.ts oluşturuldu
✓ vite.config.ts içine import eklendi
✓ Intlayer init kurulumu tamamlandı.
```

## Notlar:

- Komut idempotent'tir — güvenle birden çok kez çalıştırabilirsiniz. Zaten yapılandırılmış adımları atlayacaktır.
- Bir yapılandırma dosyası zaten mevcutsa, üzerine yazılmaz.
- `include` dizisi olmayan TypeScript yapılandırma dosyaları (ör. referans içeren çözüm tarzı konfigürasyonlar) atlanır.
- Komut, proje kökünde `package.json` bulunamazsa hata ile sonlanır.

- Komut idempotent — güvenle birden çok kez çalıştırabilirsiniz. Zaten yapılandırılmış adımları atlayacaktır.
- Bir yapılandırma dosyası zaten mevcutsa, üzerine yazılmayacaktır.
- `include` dizisi olmayan TypeScript yapılandırma dosyaları (ör. referans içeren solution tarzı konfigürasyonlar) atlanır.
- Komut, proje kökünde `package.json` bulunamazsa bir hata ile sonlanacaktır.
