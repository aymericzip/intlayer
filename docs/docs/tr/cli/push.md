---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Sözlükleri Gönder
description: Sözlüklerinizi Intlayer editörüne ve CMS'ye nasıl göndereceğinizi öğrenin.
keywords:
  - Gönder
  - Sözlükler
  - CLI
  - Intlayer
  - Editör
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Sözlükleri Gönder

```bash
npx intlayer dictionary push
```

Eğer [intlayer editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) yüklüyse, sözlükleri editöre de gönderebilirsiniz. Bu komut, sözlüklerin [editörde](https://intlayer.org/dashboard) kullanılabilir olmasını sağlar. Bu sayede, sözlüklerinizi ekibinizle paylaşabilir ve uygulamanızın kodunu düzenlemeden içeriğinizi düzenleyebilirsiniz.

## Kısaltmalar:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argümanlar:

**Sözlük seçenekleri:**

- **`-d`, `--dictionaries`**: çekilecek sözlüklerin kimlikleri. Belirtilmezse, tüm sözlükler gönderilir.

  > Örnek: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: çekilecek sözlüklerin kimlikleri (--dictionaries için takma ad).

  > Örnek: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtir. Intlayer yapılandırmasını almak için komut, temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arar.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Önbelleği devre dışı bırakır.

  > Örnek: `npx intlayer build --no-cache`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtir (örneğin, `development`, `production`). Intlayer yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız faydalıdır.
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlar. Intlayer yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız faydalıdır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

  > Örnek: `npx intlayer dictionary push --env production`

**Çıktı seçenekleri:**

- **`-r`, `--delete-locale-dictionary`**: Sözlükler yollandıktan sonra yerel dizinlerin silinip silinmeyeceğini soran soruyu atlar ve dizinleri siler. Varsayılan olarak, sözlük yerel olarak tanımlanmışsa, uzak sözlüklerin içeriğini üzerine yazar.

  > Örnek: `npx intlayer dictionary push -r`

  > Örnek: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Sözlükler yollandıktan sonra yerel dizinlerin silinip silinmeyeceğini soran soruyu atlar ve dizinleri tutar. Varsayılan olarak, sözlük yerel olarak tanımlanmışsa, uzak sözlüklerin içeriğini üzerine yazar.

  > Örnek: `npx intlayer dictionary push -k`

  > Örnek: `npx intlayer dictionary push --keep-locale-dictionary`

**Hazırlık seçenekleri:**

- **`--build`**: İçeriğin güncel olduğundan emin olmak için sözlükleri göndermeden önce derler. True derlemeyi zorlar, false derlemeyi atlar, undefined ise derleme önbelleğinin kullanılmasına izin verir.

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanıldığında varsayılan olarak true)

**Git seçenekleri:**

- **`--git-diff`**: Yalnızca temel (varsayılan `origin/main`) ile mevcut dal (varsayılan: `HEAD`) arasındaki değişiklikleri içeren sözlüklerde çalıştırır.
- **`--git-diff-base`**: Git diff için temel referansı belirtir (varsayılan `origin/main`).
- **`--git-diff-current`**: Git diff için mevcut referansı belirtir (varsayılan: `HEAD`).
- **`--uncommitted`**: İşlenmemiş değişiklikleri dahil eder.
- **`--unpushed`**: Gönderilmemiş değişiklikleri dahil eder.
- **`--untracked`**: İzlenmeyen dosyaları dahil eder.

  > Örnek: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Örnek: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
