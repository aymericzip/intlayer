---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite Eklenti Dokümantasyonu | vite-intlayer
description: Derlenmiş Intlayer sözlük JSON dosyalarını sıkıştıran (minify) ve paket boyutunu küçültmek için isteğe bağlı olarak içerik alanı adlarını karartan Vite eklentisi.
keywords:
  - intlayerMinify
  - vite
  - eklenti
  - minify
  - paket boyutu
  - sözlük
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Dokümantasyon başlatıldı"
author: aymericzip
---

# intlayerMinify

`intlayerMinify`, bir üretim derlemesi (production build) sırasında derlenmiş sözlük JSON dosyalarını sıkıştıran bir Vite eklentisidir. Gereksiz tüm boşlukları kaldırır ve `intlayerPrune` ile birleştirildiğinde, paket boyutunu daha da küçültmek için içerik alanı adlarını isteğe bağlı olarak kısa alfabetik takma adlarla (`a`, `b`, `c`, …) yeniden adlandırır.

> Eklenti, [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md) kullandığınızda zaten otomatik olarak dahil edilir ve yapılandırılır. Yalnızca eklenti yığınını kendiniz oluşturuyorsanız bunu manuel olarak kaydetmeniz gerekir.

## Kullanım

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Etkinleştirme Koşulları

`intlayerMinify` **yalnızca** aşağıdaki üç koşulun tamamı doğru olduğunda etkindir:

1. Vite komutu `build` (derleme) olduğunda ( `serve` / dev değil).
2. `build.optimize` değeri `true` (veya derlemeler için varsayılan olarak `true` olan `undefined`) olduğunda.
3. Intlayer yapılandırmanızda `build.minify` değeri `true` olduğunda.

Editörün tam ve insan tarafından okunabilir sözlük içeriğine ihtiyacı olduğundan, `editor.enabled` değeri `true` olduğunda otomatik olarak **devre dışı bırakılır**.

## Neler Sıkıştırılır?

Eklenti, iki sözlük konumunu hedefler (`intlayer.system` üzerinden çözümlendiği şekliyle):

- `dictionariesDir` — statik tüm dillerdeki sözlükler (örneğin `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dil başına dinamik sözlükler

> Getirme modundaki sözlükler (`fetchDictionariesDir`), çalışma zamanında orijinal alan adları kullanılarak uzak bir API'den sunuldukları için **asla** sıkıştırılmaz. Alan adlarını yeniden adlandırmak, sunucu yanıtı ile istemci tarafı özellik erişimleri arasında bir uyumsuzluk yaratacaktır.

## Alan Adı Karartma (Özellik Sıkıştırma)

`intlayerPrune` kod tabanını analiz edip `pruneContext.dictionaryKeyToFieldRenameMap` eşlemesini doldurduğunda, `intlayerMinify` içerik alanı adlarını da kısa takma adlarla yeniden adlandırır. Örneğin:

```json
// önce
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// sonra (karartma ile)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Karşılık gelen kaynak dosya özellik erişimleri `intlayerOptimize` içindeki Babel geçişiyle yeniden adlandırılır, böylece çalışma zamanı davranışı değişmez.

Dahili Intlayer alanları (`nodeType`, `translation` vb.) asla yeniden adlandırılmaz.

## İstisnai Sözlükler (Edge-cases)

`pruneContext.dictionariesWithEdgeCases` içinde işaretlenen sözlükler (temizleme aşamasında algılanan yapısal anomaliler), bozuk veri gönderimini önlemek için tamamen atlanır — ne sıkıştırılır ne de karartılır.

## Nitelikli Gruplar (Koleksiyonlar / Varyantlar / Meta Kayıtlar)

Bir `qualifierTypes` dizisine sahip sözlükler (koleksiyonlar, varyantlar ve meta kayıtlar) için eklenti, `qualifierTypes` dizisini ve `meta` yan eşlemesini aynen korur. Yalnızca `content` girişlerinin alan adları karartılır. Çalışma zamanında seçici eşleştirme için kullanılan birleşik anahtarlara asla dokunulmaz.
