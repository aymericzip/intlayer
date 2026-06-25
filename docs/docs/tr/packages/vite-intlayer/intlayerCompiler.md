---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite Eklenti Dokümantasyonu | vite-intlayer
description: Bileşen dosyalarından satır içi Intlayer içerik bildirimlerini ayıklayan ve bunları derleme/dönüştürme zamanında sözlük JSON dosyalarına yazan Vite eklentisi.
keywords:
  - intlayerCompiler
  - vite
  - eklenti
  - derleyici
  - içerik
  - sözlük
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "intlayer() içine dahil edildi; dokümantasyon başlatıldı"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler`, bileşen kaynak dosyalarını **satır içi Intlayer içerik bildirimleri** (ayrı bir `.content.ts` dosyası yerine doğrudan bir bileşen içinde tanımlanan içerikler) için tarayan ve bunları dönüştürme aşamasında sözlük JSON dosyalarına yazan bir Vite eklentisidir.

> **Intlayer v9'dan beri** `intlayerCompiler`, Intlayer yapılandırmanızda hem `compiler.enabled` değeri `true` hem de `compiler.output` ayarlandığında ana [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md) eklentisine otomatik olarak dahil edilir. Yalnızca derleyiciye özel yapılandırma üzerinde tam kontrol sahibi olmak istediğinizde bunu ayrıca kaydetmeniz gerekir.

## Kullanım

### `intlayer()` Eklentisinin Parçası Olarak (Önerilen, v9+)

Derleyiciyi Intlayer yapılandırmanız aracılığıyla etkinleştirin:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // ayıklanan sözlüklerin yazılacağı yer
  },
});
```

Ardından, ek bir kayıt yapmadan standart eklentiyi kullanın:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Bağımsız (Standalone - gerektiğinde)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Seçenekler

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Seçenek          | Tür                       | Açıklama                                                                                                |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | `getConfiguration()` işlevine iletilen Intlayer yapılandırma geçersiz kılmaları.                        |
| `compilerConfig` | `Partial<CompilerConfig>` | Derleyiciye özel yapılandırma bölümü için geçersiz kılmalar (örneğin `enabled`, `output`, `filesList`). |

### Örnek

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Nasıl çalışır?

### Dönüştürme Aşaması (Transform)

`compiler.filesList` ile eşleşen her kaynak dosya için derleyici eklentisi:

1. Dosya içeriğini `@intlayer/babel` paketindeki `extractContent` işlevine iletir.
2. Bulunan her bildirim için `onExtract` işlevini çağırır ve bu işlev, ortaya çıkan sözlük JSON dosyasını `compiler.output` yoluna yazar.
3. Satır içi bildirimlerin standart `useIntlayer('key')` / `getIntlayer('key')` çağrılarıyla değiştirildiği dönüştürülmüş kaynak kodu döndürür.

Desteklenen dosya türleri: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement - Sıcak Modül Değişimi)

Geliştirme modunda bir bileşen dosyası kaydedildiğinde derleyici:

1. Vite'in `handleHotUpdate` kancası (hook) aracılığıyla dosya değişikliğini algılar.
2. Güncellenen dosyadan içeriği yeniden ayıklar.
3. Güncellenen sözlük JSON dosyasını yazar.
4. Tam sayfa yenilemesini tetikler (`server.ws.send({ type: 'full-reload' })`).

500 ms'lik bir debounce (gecikme), sözlük yazma işleminin kendisinin (bu da bir dosya değişikliği olayını tetikler) sonsuz bir yeniden ayıklama döngüsüne neden olmasını önler.

### Tekilleştirme (Deduplication)

`intlayerCompiler`, diğer paketlenmiş eklentilerle aynı `createPrimaryInstanceGuard` tekilleştirme mekanizmasını kullanır. Hem `intlayer()` (derleyiciyi içeren) hem de manuel bir `intlayerCompiler()` çağrısı mevcut olduğunda, yalnızca ilk kaydedilen örnek çalışır — hiçbir sözlük iki kez yazılmaz.
