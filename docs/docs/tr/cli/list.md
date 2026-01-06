---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: İçerik Beyan Dosyalarını Listele
description: Projenizdeki tüm içerik beyan dosyalarını nasıl listeleyeceğinizi öğrenin.
keywords:
  - Listele
  - İçerik Beyanı
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: list komutuna mutlak çıktı seçeneği eklendi
  - version: 7.5.11
    date: 2026-01-06
    changes: list komutuna JSON çıktı seçeneği eklendi
---

# İçerik beyan dosyalarını listele

```bash
npx intlayer content list
```

## Kısaltmalar:

- `npx intlayer list`

Bu komut, projenizdeki tüm içerik beyan dosyalarını, sözlük anahtarları ve dosya yolları ile birlikte gösterir. Tüm içerik dosyalarınızın genel bir görünümünü elde etmek ve Intlayer tarafından doğru şekilde keşfedildiklerini doğrulamak için faydalıdır.

## Argümanlar:

- **`--json`**: Sonuçları biçimlendirilmiş metin yerine JSON olarak çıktılar. Betik oluşturma ve programatik erişim için yararlıdır.

  > Örnek: `npx intlayer content list --json`

## Örnekler:

### İçerik beyan dosyalarını listele:

```bash
npx intlayer content list
```

### JSON olarak çıktı:

```bash
npx intlayer content list --json
```

### Mutlak yollar olarak çıktı:

```bash
npx intlayer content list --absolute
```

## Örnek çıktı:

### Biçimlendirilmiş çıktı:

```bash
npx intlayer content list
İçerik beyan dosyaları:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Toplam içerik beyan dosyası: 3
```

### JSON çıktı:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Bu komut aşağıdakileri çıktı olarak verir:

- Anahtarları ve göreli dosya yolları ile birlikte tüm içerik beyan dosyalarının biçimlendirilmiş listesi
- Bulunan toplam içerik beyan dosyası sayısı

Çıktı, tüm içerik dosyalarınızın doğru yapılandırıldığını ve Intlayer sistemi tarafından keşfedilebilir olduğunu doğrulamanıza yardımcı olur.
