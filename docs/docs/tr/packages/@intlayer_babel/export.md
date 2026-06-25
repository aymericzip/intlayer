---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel Paket Dokümantasyonu"
description: Intlayer için derleme sırasında içerik ayıklama, import optimizasyonu, kullanılmayan alanları temizleme ve alan adlarını karartma işlemlerini gerçekleştiren Babel eklentileri.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - uluslararasılaştırma
  - i18n
  - derleyici
  - optimize et
  - temizle
  - karart
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Tüm dışa aktarılan modüllerin dokümantasyonu birleştirildi"
author: aymericzip
---

# @intlayer/babel Paketi

`@intlayer/babel` paketi, Intlayer için özel Babel eklentilerinden oluşan bir set sağlar. Bu eklentiler tüm derleme döngüsünü kapsar: içerik bildirimlerini ayıklama, `useIntlayer` / `getIntlayer` çağrılarını optimize edilmiş sözlük importlarına yeniden yazma, kullanılmayan alanları temizleme ve alan adlarını karartma (minify).

## Kurulum

```bash
npm install @intlayer/babel
```

## Dışa Aktarılanlar

İçe aktarma (Import):

```ts
import { ... } from "@intlayer/babel";
```

---

### Eklentiler (Plugins)

| İşlev / Sınıf                  | Açıklama                                                                                                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Babel eklentisi, kaynak dosyalardan çevrilebilir içeriği ayıklayan ve `useIntlayer` / `getIntlayer` kancalarını (hooks) otomatik olarak ekleyen Babel eklentisi. Next.js ve Babel tabanlı derleme araçlarıyla kullanım için tasarlanmıştır. |
| `intlayerOptimizeBabelPlugin`  | useIntlayer ve getIntlayer çağrılarını dönüştüren ve bunların importlarını optimize edilmiş JSON sözlük importlarına (statik, dinamik veya fetch aracılığıyla) yeniden yazan Babel eklentisi.                                               |
| `intlayerPurgeBabelPlugin`     | Kaynak dosyaları analiz eden ve kullanılmayan alanları kaldırmak (`build.purge`) veya bunları kısa takma adlarla yeniden adlandırmak (`build.minify`) için derlenmiş sözlük JSON dosyalarını yeniden yazan Babel eklentisi.                 |
| `intlayerMinifyBabelPlugin`    | Kaynak dosyaları, karartma aşamasında atanan kısa alan takma adlarını (örneğin `content.title` ← `content.a`) kullanacak şekilde yeniden yazan Babel eklentisi. `intlayerPurgeBabelPlugin` eklentisine dayanır.                             |
| `makeFieldRenameBabelPlugin`   | `PruneContext` içinde doldurulan `dictionaryKeyToFieldRenameMap` eşlemesine göre kaynak dosyalardaki sözlük içeriği alan erişimlerini yeniden adlandırmak için bir Babel eklentisi üreten fabrika (factory) işlevi.                         |
| `makeUsageAnalyzerBabelPlugin` | Kaynak koddaki `useIntlayer` / `getIntlayer` kullanımını analiz etmek ve paylaşılan `PruneContext` içindeki alan kullanım verilerini toplamak için bir Babel eklentisi üreten fabrika işlevi.                                               |
| `getSharedPruneContext`        | Belirtilen temel dizin için paylaşılan `PruneContext` nesnesini döndüren veya henüz başlatılmamışsa `null` döndüren yardımcı işlev.                                                                                                         |

---

### Eklenti Yapılandırma Yardımcı Programları

| İşlev                      | Açıklama                                                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Intlayer yapılandırmasını yükler ve `intlayerExtractBabelPlugin` ile kullanıma hazır `ExtractPluginOptions` döndürür.                           |
| `getOptimizePluginOptions` | Intlayer yapılandırmasını ve derlenmiş sözlükleri yükler ve `intlayerOptimizeBabelPlugin` ile kullanıma hazır `OptimizePluginOptions` döndürür. |
| `getPurgePluginOptions`    | Intlayer yapılandırmasını yükler ve `intlayerPurgeBabelPlugin` ile kullanıma hazır `PurgePluginOptions` döndürür.                               |
| `getMinifyPluginOptions`   | Intlayer yapılandırmasını yükler yardsımcı ve `intlayerMinifyBabelPlugin` ile kullanıma hazır `MinifyPluginOptions` döndürür.                   |

---

### Tipler

| Tip                     | Açıklama                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `CompilerMode`          | Derleyici modu: `'dev'` HMR desteğiyle geliştirme için veya `'build'` üretim derlemeleri için.                                       |
| `ExtractPluginOptions`  | `intlayerExtractBabelPlugin` için seçenekler: dosya listesi, yapılandırma, `onExtract` geri araması (callback) vb.                   |
| `ExtractResult`         | Ayıklama sonucu: sözlük anahtarı, dosya yolu, içerik ve dil.                                                                         |
| `OptimizePluginOptions` | `intlayerOptimizeBabelPlugin` için seçenekler: sözlük yolları, içe aktarma modu, sözlük başına mod eşlemesi vb.                      |
| `PurgePluginOptions`    | `intlayerPurgeBabelPlugin` için seçenekler: temel dizin, temizleme/karartma/optimizasyon bayrakları, bileşen dosyaları listesi.      |
| `MinifyPluginOptions`   | `intlayerMinifyBabelPlugin` için seçenekler: temel dizin, karartma/optimizasyon/editorEnabled bayrakları.                            |
| `PruneContext`          | Analiz ve temizleme eklentileri arasında paylaşılan durum: alan kullanım eşlemeleri, yeniden adlandırma eşlemeleri vb.               |
| `DictionaryFieldUsage`  | Tek bir sözlük için alan kullanımı sonucu: Statik analiz yetersiz olduğunda `Set<string>` veya `'all'`.                              |
| `NestedRenameEntry`     | Yeniden adlandırma ağacındaki düğüm: `shortName` ve alt düğüm (children) eşlemesi.                                                   |
| `NestedRenameMap`       | Yeniden adlandırma ağacındaki bir düzey: `Map<string, NestedRenameEntry>`.                                                           |
| `CompatCallerConfig`    | Uyumlu bağdaştırıcı (compat-adapter) paketleri için uyumlu bir kullanım analizörü yapılandırması (çağıran adı ve işlem seçenekleri). |
| `ScriptBlock`           | Bir SFC dosyasından (Vue veya Svelte) ayıklanan komut dosyası bloğu: içerik, başlangıç kayması ve bitiş kayması.                     |

---

### Yardımcı İşlevler

| İşlev                             | Açıklama                                                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Bir tamsayıyı (sıfırdan başlayarak) kısa bir alfabetik tanımlayıcıya dönüştürür: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'` vb.                                              |
| `buildNestedRenameMapFromContent` | Derlenmiş bir sözlüğün içerik değerinden, Intlayer düğüm yapılarına (translation, enumeration vb.) sadık kalarak özyinelemeli (recursive) bir `NestedRenameMap` oluşturur. |
| `createPruneContext`              | Varsayılan değerlerle başlatılmış yeni bir boş `PruneContext` nesnesi oluşturur.                                                                                           |
| `extractScriptBlocks`             | Sonraki Babel analizi için SFC dosyalarından (Vue / Svelte) `<script>` bloklarını ayıklar.                                                                                 |
| `BABEL_PARSER_OPTIONS`            | Desteklenen framework'leri (React/Vue/Svelte/Angular/...) kapsayan Babel ayrıştırıcı seçeneklerini temsil eden sabit.                                                      |
| `INTLAYER_CALLER_NAMES`           | Orijinal Intlayer çağıran adlarının sabit listesi: `['useIntlayer', 'getIntlayer']`.                                                                                       |

---

## Örnek Kullanım

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Not:** `intlayerPurgeBabelPlugin`, ilk eklenti tarafından oluşturulan yeniden adlandırma eşlemesini okuduğu için `intlayerMinifyBabelPlugin` eklentisinden **önce** bildirilmelidir. Ayrıca, `useIntlayer` çağrıları yeniden yazılmadan önce sözlük anahtarlarını görebilmesi için her ikisinden önce `intlayerOptimizeBabelPlugin` gelmelidir.
