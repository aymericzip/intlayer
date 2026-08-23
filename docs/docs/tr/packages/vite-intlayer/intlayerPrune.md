---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite Eklentisi Dokümantasyonu | vite-intlayer
description: vite-intlayer paketi için intlayerPrune eklentisinin nasıl kullanılacağını görün
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokümantasyon başlatıldı"
author: aymericzip
---

# intlayerPrune Vite Eklentisi Dokümantasyonu

`intlayerPrune` Vite eklentisi, uygulama paketinizden kullanılmayan sözlükleri tree-shake edip budamak için kullanılır. Bu, yalnızca gerekli çokdilli içeriği dahil ederek son bundle boyutunu azaltmaya yardımcı olur.

## Kullanım

### `intlayer()` kapsamında (önerilen)

Intlayer yapılandırmanız aracılığıyla pruning'i etkinleştirin ve ana plugin her şeyi işler:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // pruning ve minify'ı etkinleştirir
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Plugin stack'ini manuel olarak oluşturuyorsanız, `intlayerPrune` ve `intlayerMinify` bir `PruneContext` nesnesini paylaşır ve bu nesne bir kez oluşturulup her ikisine de geçirilmelidir:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // isteğe bağlı, aynı context'ten okur
  ],
});
```

## Nasıl çalışır

### 1. Kullanım analizi (buildStart)

`buildStart` sırasında, `intlayerOptimize` eklentisi (aynı zamanda `intlayer()`'ın bir parçası) `build.filesList`'de listelenen her bileşen kaynak dosyasını tarar. Her `useIntlayer('key')` veya `getIntlayer('key')` çağrısı için, hangi alanların erişildiğini tam olarak kaydeder, örneğin:

```ts
const { title, description } = useIntlayer("myDict");
// kaydeder: myDict → { title, description }
```

Bu, herhangi bir `transform` çağrısı çalışmadan önce `pruneContext.fieldUsageMap`'i oluşturur.

### 2. JSON budama (transform, enforce: 'pre')

Vite derlenmiş bir sözlük JSON dosyasını işlediğinde, `intlayerPrune` bunu Vite'nin yerleşik JSON → ESM dönüştürmesinden önce ele geçirir. `pruneContext`'ten alan kullanım haritasını okur ve kaydedilen kullanım setinde olmayan herhangi bir içerik alanını kaldırır.

İki içerik şekli desteklenir:

- **Statik sözlükler** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Alanlar `translation` içinde yerel başına budanır.
- **Dinamik (yerel başına) sözlükler** — düz `{ fieldA: ..., fieldB: ... }`. Alanlar en üst düzeyde budanır.

### 3. Edge cases

Bir sözlüğün içerik yapısı tanınamazsa (örneğin, olağandışı iç içe bir şekil), `pruneContext.dictionariesWithEdgeCases` öğesine eklenir ve **değiştirilmez bırakılır**. Bir uyarı günlüğe kaydedilir. `intlayerMinify` bu sözlükleri de atlar.

### 4. Field-rename map

Budama başarılı olduğunda, `intlayerPrune` ayrıca `pruneContext.dictionaryKeyToFieldRenameMap` — orijinal alan adlarından kısa takma adlara eşleme yazar. `intlayerMinify` çıktı JSON'daki alanları yeniden adlandırmak için bu haritayı okur ve `intlayerOptimize`'ın Babel rename geçişi kaynak dosyalardaki property erişimlerini buna göre günceller.

## Aktivasyon koşulları

`intlayerPrune` **yalnızca** aşağıdakilerin hepsi doğru olduğunda etkin olur:

1. Vite komutu `build` olur.
2. `build.optimize` `true` olur (veya `undefined`, derlemeler için varsayılan olarak `true` olur).
3. `build.purge` Intlayer yapılandırmanızda `true` olur.

`editor.enabled` `true` olduğunda etkin kalmaya devam eder: görsel düzenleyici, bu eklentinin asla dokunmadığı birleştirilmemiş sözlüklere karşı her düzenlemeyi `dictionaryKey` + `keyPath` üzerinden çözer ve temizlenen bir alan hiçbir bileşenin okumadığı bir alandır — bu yüzden asla render edilmez ve sayfada seçilemez.
