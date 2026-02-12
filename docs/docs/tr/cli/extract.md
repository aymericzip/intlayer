---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Stringleri çıkarma
description: Bileşenlerinizden stringleri bileşene yakın bir .content dosyasına nasıl çıkaracağınızı öğrenin.
keywords:
  - Çıkarma
  - Bileşenler
  - Geçiş
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Stringleri çıkarma

```bash
npx intlayer extract
```

Bu komut, bileşenlerden stringleri bileşene yakın bir .content dosyasına çıkarmak için kod dosyalarınızı analiz eder. Etkileşimli dosya seçimini veya belirli dosyaların hedeflenmesini destekler.

## Kısaltmalar:

- `npx intlayer ext`

## Argümanlar:

**Dosya seçimi seçenekleri:**

- **`-f, --file [files...]`**: Çıkarılacak belirli dosyaların listesi. Sağlanmazsa, CLI eşleşen dosyaları (`**/*.{tsx,jsx,vue,svelte,ts,js}`) tarar ve hangilerini çıkarmak istediğinizi seçmeniz için size sorar.

  > Örnek: `npx intlayer extract -f src/components/MyComponent.tsx`

**Çıktı seçenekleri:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Oluşturulan içerik bildirim dosyalarının kaydedileceği dizin.

  > Örnek: `npx intlayer extract -o src/content`

- **`--code-only`**: Sadece bileşen kodunu çıkarır (içerik bildirimi yazmaz).

  > Örnek: `npx intlayer extract --code-only`

- **`--declaration-only`**: Sadece içerik bildirimi oluşturur (bileşeni yeniden yazmaz).

  > Örnek: `npx intlayer extract --declaration-only`

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtir.
- **`--env`**: Ortamı belirtir.
- **`--env-file`**: Özel bir env dosyası sağlar.
- **`--verbose`**: Ayrıntılı günlüklemeyi etkinleştirir.

**Gerekli eklentiler:**

extract komutu TypeScript / JSX dosyalarında ek bir eklenti olmadan çalışır. Ancak Vue ve Svelte projeleri için aşağıdaki eklentilerin yüklü olması gerekir:

- **`@intlayer/vue-transformer`**: Vue dosyaları için.
- **`@intlayer/svelte-transformer`**: Svelte dosyaları için.
