---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Bileşenleri Dönüştürme
description: Mevcut bileşenleri Intlayer kullanacak şekilde nasıl dönüştüreceğinizi öğrenin.
keywords:
  - Dönüştürme
  - Bileşenler
  - Geçiş
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Bileşenleri dönüştürme

```bash
npx intlayer transform
```

Bu komut, mevcut bileşenleri Intlayer kullanacak şekilde taşımaya yardımcı olmak için kod dosyalarınızı analiz eder. Etkileşimli dosya seçimi veya belirli dosya hedefleme seçeneklerini destekler.

## Kısaltmalar:

- `npx intlayer trans`

## Argümanlar:

**Dosya seçimi seçenekleri:**

- **`-f, --file [files...]`**: Dönüştürülecek belirli dosyaların listesi. Sağlanmazsa, CLI eşleşen dosyaları (`**/*.{tsx,jsx,vue,svelte,ts,js}`) tarar ve hangilerini dönüştürmek istediğinizi seçmeniz için sizi yönlendirir.

  > Örnek: `npx intlayer transform -f src/components/MyComponent.tsx`

**Çıktı seçenekleri:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Oluşturulan içerik bildirim dosyalarının kaydedileceği dizin.

  > Örnek: `npx intlayer transform -o src/content`

- **`--code-only`**: Sadece bileşen kodunu dönüştürür (içerik bildirimi yazmaz).

  > Örnek: `npx intlayer transform --code-only`

- **`--declaration-only`**: Sadece içerik bildirimi oluşturur (bileşeni yeniden yazmaz).

  > Örnek: `npx intlayer transform --declaration-only`

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtir.
- **`--env`**: Ortamı belirtir.
- **`--env-file`**: Özel bir ortam dosyası sağlar.
- **`--verbose`**: Ayrıntılı loglamayı etkinleştirir.

**Gerekli eklentiler:**

Transform komutu, TypeScript / JSX dosyalarında ek eklenti olmadan çalışır. Ancak, Vue ve Svelte projeleri için aşağıdaki eklentilerin kurulması gerekmektedir:

- **`@intlayer/vue-transformer`**: Vue dosyaları için.
- **`@intlayer/svelte-transformer`**: Svelte dosyaları için.
