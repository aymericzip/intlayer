---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Eklenti Dokümantasyonu | vite-intlayer
description: vite-intlayer paketi için intlayer eklentisinin nasıl kullanılacağını inceleyin
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# intlayer Vite Eklenti Dokümantasyonu

`intlayer` Vite eklentisi, Intlayer yapılandırmasını build sürecine entegre eder. Sözlük alias'larını sağlar, geliştirme modunda sözlük izleyicisini başlatır ve build için sözlükleri hazırlar.

## Kullanım

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Seçenekler

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions`, `GetConfigurationOptions` (bkz. `@intlayer/config`) öğesini aşağıdaki ek alanlarla genişletir:

| Seçenek         | Tür                             | Varsayılan  | Açıklama                                                                                                                                                                 |
| --------------- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Compat-adapter paketleri için ek çağrı desenleri (örn. `@intlayer/react-i18next`). Derleme zamanında alan kullanımı analizine iletilir.                                  |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Paketlenmiş yerel ayar yönlendirme proxy'sine iletilen seçenekler. Belirli yolları (örn. API rotaları) yerel ayar yönlendirmesinden hariç tutmak için `ignore` kullanın. |

Diğer tüm seçenekler (`override`, `configFile`, …) doğrudan `getConfiguration()` öğesine iletilir.

### Örnekler

#### Yerel yönlendirmeden API rotalarını yoksay

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Özel bir config dosya yolu ile

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### compat-adapter çağırıcıları ile

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Eklentinin ne yaptığı

### 1. Sözlük hazırlığı

Build başlamadan önce (ve geliştirme ortamında saatte bir), `intlayer` tüm `.content.ts` dosyalarını `.intlayer/` klasöründe depolanan optimize edilmiş JSON sözlüklerine derlemek için `prepareIntlayer` işlevini çağırır.

### 2. Module aliases

Plugin, `import { myDict } from 'intlayer/dictionaries/my-dict'` ifadesinin diskte derlenen JSON dosyasına çözümlenmesi için Vite resolve aliases'lerini ekler. SSR buildleri, tüm `@intlayer/*` paketlerinin alias'lar uygulanarak birlikte paketlenmesini sağlamak için `ssr.noExternal` kullanır.

### 3. Dev-server watcher

Geliştirme modunda bir `chokidar` watcher başlatılır. Bir `.content.ts` dosyası değiştiğinde sözlükler yeniden derlenir ve Vite'in HMR güncellemeleri tarayıcıya yayınlar.

### 4. Bundled locale-routing proxy (v9+)

Intlayer v9'dan beri `intlayerProxy` middleware'i `intlayer()` içinde otomatik olarak kaydedilir. Şunları işler:

- URL ön eki, çerezler ve `Accept-Language` başlığından yerel ayar algılaması.
- Algılanan yerel ayar geçerli URL ile eşleşmediğinde 301 yönlendirmeleri.
- Framework'ün doğru `[locale]` rota parametresini görmesi için iç URL yeniden yazmaları.

Proxy, Intlayer yapılandırmanızda `routing.enableProxy` (varsayılan `true`) tarafından kontrol edilir. Tamamen devre dışı bırakmak için:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Ayrı bir `intlayerProxy()` çağrısı olmadan proxy davranışını özelleştirmek için ana eklentiye `proxy` seçeneklerini geçin:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Tam yönlendirme davranışı referansı için [intlayerProxy belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerProxy.md) bakın.

### 5. Bundled compiler (v9+)

`compiler.enabled` değeri `true` **ve** Intlayer config dosyanızda `compiler.output` ayarlandığında, `intlayer()` otomatik olarak `intlayerCompiler` kaydeder. Compiler, bileşen dosyalarının içinde doğrudan yazılan satır içi içerik bildirimleri çıkarır ve bunları dönüştürme zamanında sözlüklere yazar. [intlayerCompiler dokumentasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayerCompiler.md) sayfasına bakın.

### 6. Build optimisasyonları

Bir üretim derlemesi sırasında eklenti şunları ekler:

- **intlayerOptimize** – `useIntlayer('key')` → `useDictionary(hash)` yeniden yazılıp doğrudan JSON içe aktarımlarını enjekte eden Babel dönüşümü.
- **intlayerPrune** – sözlük JSON'undan kullanılmayan içerik alanlarını kaldırır.
- **intlayerMinify** – sözlük JSON'unu sıkıştırır ve isteğe bağlı olarak alan adlarını karıştırır.

Bunlar geliştirme modunda etkin değildir.

## Kullanım Dışı Bırakılan Takma Adlar

| Kullanım Dışı Bırakılan Export | Değiştirme |
| ------------------------------ | ---------- |
| `intlayerPlugin`               | `intlayer` |
| `intLayerPlugin`               | `intlayer` |
