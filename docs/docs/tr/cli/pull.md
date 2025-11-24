---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Sözlükleri Çekme
description: Intlayer editöründen ve CMS'den sözlüklerin nasıl çekileceğini öğrenin.
keywords:
  - Çekme
  - Sözlükler
  - CLI
  - Intlayer
  - Editör
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Uzak Sözlükleri Çekme

```bash
npx intlayer pull
```

Eğer [intlayer editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) yüklüyse, sözlükleri editörden de çekebilirsiniz. Bu şekilde, uygulamanızın ihtiyacı doğrultusunda sözlüklerinizin içeriğini üzerine yazabilirsiniz.

## Takma İsimler:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argümanlar:

**Sözlük seçenekleri:**

- **`-d, --dictionaries`**: Çekilecek sözlüklerin kimlikleri. Belirtilmezse, tüm sözlükler çekilir.

  > Örnek: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Çekilecek sözlüklerin kimlikleri (--dictionaries için takma ad).

  > Örnek: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer yapılandırmasını almak için komut, temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Önbelleği devre dışı bırakır.

  > Örnek: `npx intlayer build --no-cache`

**Ortam değişkenleri seçenekleri:**

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer yapılandırmasını almak için komut, temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

  > Örnek: `npx intlayer dictionary push --env production`

**Çıktı seçenekleri:**

- **`--new-dictionaries-path`** : Yeni sözlüklerin kaydedileceği dizinin yolu. Belirtilmezse, yeni sözlükler projenin `./intlayer-dictionaries` dizinine kaydedilecektir. Sözlük içeriğinizde bir `filePath` alanı belirtilmişse, sözlükler bu argümanı dikkate almayacak ve belirtilen `filePath` dizinine kaydedilecektir.

**Log seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı loglamayı etkinleştirir. (CLI kullanırken varsayılan olarak true)

## Örnek:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
