---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Bilinmeyen komut
description: Bilinmeyen komut hatasını nasıl düzelteceğinizi öğrenin.
keywords:
  - bilinmeyen
  - komut
  - hata
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - yeniden başlat
  - local
slugs:
  - frequent-questions
  - unknown-command
---

# hata: bilinmeyen komut fill / build / vb

Eğer `npx intlayer fill --verbose` komutu şu hatayı veriyorsa:

```
hata: bilinmeyen komut 'fill'
```

ama `fill` komutunun olması gerektiğinden eminseniz, şu adımları izleyin:

## 1. **En son sürümü kullandığınızdan emin olun**

Şunu çalıştırın:

```bash
npx intlayer --version                  # mevcut intlayer sürümü
npx intlayer@latest --version           # en güncel intlayer sürümü
```

Bu, `npx`'in en son sürümü çekmesini sağlar. Sonra tekrar deneyin:

```bash
npx intlayer@latest build --verbose
```

## 2. **Komutun kayıtlı olup olmadığını kontrol edin**

Şunu çalıştırın:

```bash
npx intlayer --help                     # komutlar hakkında bilgi verir
```

Komut listesinde aradığınız komut var mı bakın.

Repo'ya gidip, komutun CLI giriş noktasında export ve register edildiğinden emin olun. Intlayer CLI için `commander` framework'ü kullanır.

CLI ile ilgili kod:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Terminali yeniden başlatın**

Bazen yeni komutların tanınması için terminali yeniden başlatmak gerekir.

## 5. **intlayer geliştiriyorsanız, yeniden derleyip linkleyin**

Eğer intlayer'ı yerelde geliştiriyorsanız:

```bash
# intlayer dizininde
npm install
npm run build
npm link
```

Sonra başka bir terminalde:

```bash
intlayer fill --verbose
```

Bu, üzerinde çalıştığınız yerel sürümü kullanır.

## 6. **npx önbelleğini temizleyin (eski sürümde takılı kaldıysanız)**

```bash
npx clear-npx-cache
```

Veya intlayer paketlerinin önbelleğini manuel silin:

```bash
rm -rf ~/.npm/_npx
```

pnpm, yarn, bun gibi farklı paket yöneticileri kullanıyorsanız eşdeğer önbellek temizleme işlemini uygulayın.
