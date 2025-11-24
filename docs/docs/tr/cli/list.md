---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# İçerik beyan dosyalarını listele

```bash
npx intlayer content list
```

## Kısaltmalar:

- `npx intlayer list`

Bu komut, projenizdeki tüm içerik beyan dosyalarını, sözlük anahtarları ve dosya yolları ile birlikte gösterir. Tüm içerik dosyalarınızın genel bir görünümünü elde etmek ve Intlayer tarafından doğru şekilde keşfedildiklerini doğrulamak için faydalıdır.

## Örnek:

```bash
npx intlayer content list
```

## Örnek çıktı:

```bash
npx intlayer content list
İçerik beyan dosyaları:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Toplam içerik beyan dosyası: 3
```

Bu komut aşağıdakileri çıktı olarak verir:

- Anahtarları ve göreli dosya yolları ile birlikte tüm içerik beyan dosyalarının biçimlendirilmiş listesi
- Bulunan toplam içerik beyan dosyası sayısı

Çıktı, tüm içerik dosyalarınızın doğru yapılandırıldığını ve Intlayer sistemi tarafından keşfedilebilir olduğunu doğrulamanıza yardımcı olur.
