---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer'ı Başlat
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore seçeneği eklendi"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init komutu eklendi"
---

# Intlayer'ı Başlat

```bash
npx intlayer init
```

`init` komutu, gerekli dosyaları ve ayarları oluşturarak projenizde Intlayer'ı otomatik olarak yapılandırır. Bu, Intlayer'ı kullanmaya başlamak için önerilen yoldur.

## Takma Adlar:

- `npx intlayer init`

## Argümanlar:

- `--project-root [projectRoot]` - İsteğe bağlı. Projenin kök dizinini belirtin. Sağlanmazsa, komut mevcut çalışma dizininden başlayarak proje kökünü arayacaktır.
- `--no-gitignore` - İsteğe bağlı. `.gitignore` dosyasının otomatik olarak güncellenmesini atlar. Bu bayrak ayarlanırsa, `.intlayer` dosyası `.gitignore` dosyasına eklenmez.

## Ne yapar:

`init` komutu aşağıdaki kurulum görevlerini gerçekleştirir:

1. **Proje yapısını doğrular** - Bir `package.json` dosyası olan geçerli bir proje dizininde olduğunuzdan emin olur.
2. **`.gitignore` dosyasını günceller** - Oluşturulan dosyaları sürüm kontrolünden hariç tutmak için `.gitignore` dosyanıza `.intlayer` ekler (`--no-gitignore` ile atlanabilir).
3. **TypeScript'i yapılandırır** - Intlayer tür tanımlarını (`.intlayer/**/*.ts`) içerecek şekilde tüm `tsconfig.json` dosyalarını günceller.
4. **Yapılandırma dosyası oluşturur** - Varsayılan ayarlarla `intlayer.config.ts` (TypeScript projeleri için) veya `intlayer.config.mjs` (JavaScript projeleri için) oluşturur.
5. **Vite yapılandırmasını günceller** - Bir Vite yapılandırma dosyası algılanırsa, `vite-intlayer` eklentisi için içe aktarmayı ekler.
6. **Next.js yapılandırmasını günceller** - Bir Next.js yapılandırma dosyası algılanırsa, `next-intlayer` eklentisi için içe aktarmayı ekler.

## Örnekler:

### Temel başlatma:

```bash
npx intlayer init
```

Bu, proje kökünü otomatik olarak algılayarak Intlayer'ı mevcut dizinde başlatır.

### Özel proje kökü ile başlatma:

```bash
npx intlayer init --project-root ./projem
```

Bu, Intlayer'ı belirtilen dizinde başlatır.

### .gitignore'u güncellemeden başlatma:

```bash
npx intlayer init --no-gitignore
```

Bu, tüm yapılandırma dosyalarını kurar ancak `.gitignore` dosyanızı değiştirmez.

## Örnek çıktı:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notlar:

- Komut idempotenttir; yani birden çok kez güvenli bir şekilde çalıştırabilirsiniz. Halihazırda yapılandırılmış adımlar atlanacaktır.
- Bir yapılandırma dosyası zaten mevcutsa, üzerine yazılmaz.
- `include` dizisi olmayan TypeScript yapılandırmaları (örneğin başvuruları olan çözüm stili yapılandırmalar) atlanır.
- Proje kökünde `package.json` bulunamazsa komut hata vererek durur.
