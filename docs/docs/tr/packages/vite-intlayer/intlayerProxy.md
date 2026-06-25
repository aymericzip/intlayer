---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite Eklenti Dokümantasyonu | vite-intlayer
description: Vite dev/preview sunucuları ve üretim SSR için dil yönlendirme ara yazılımı (middleware). Dil algılama, URL yönlendirmeleri ve dahili yeniden yazmaları yönetir.
keywords:
  - intlayerProxy
  - vite
  - eklenti
  - middleware
  - dil
  - yönlendirme
  - uluslararasılaştırma
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "configOptions tek bir seçenek nesnesinde birleştirildi; proxy intlayer() içine dahil edildi"
author: aymericzip
---

# intlayerProxy

`intlayerProxy`, **her ortam** için dil yönlendirme ara yazılımını (middleware) kaydeden bir Vite eklentisidir: geliştirme sunucusu (dev server), önizleme sunucusu (preview server) ve üretim SSR (Nitro / TanStack Start).

> **Intlayer v9'dan beri** `intlayerProxy`, ana [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/intlayer.md) eklentisine otomatik olarak dahil edilir ve `routing.enableProxy: true` aracılığıyla varsayılan olarak etkinleştirilir. Yalnızca daha düşük seviyeli kontrole ihtiyacınız olduğunda veya bunu standart `intlayer()` kurulumunun dışında kullandığınızda ayrıca kaydetmeniz gerekir.

## Kullanım

### `intlayer()` Eklentisinin Parçası Olarak (Önerilen, v9+)

`intlayerProxy`'yi ayrıca kaydetmek yerine ana eklentiye `proxy` seçeneklerini iletin:

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

### Bağımsız (Standalone - gerektiğinde)

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
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Tüm seçenekler isteğe bağlıdır ve tek bir nesne olarak iletilir:

| Seçenek         | Tür                                 | Açıklama                                                                                                                                                                                          |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | İstekleri dil yönlendirmesinden hariç tutan yüklem (predicate). Bir isteği atlamak için `true` döndürün (örneğin API yolları, sağlık kontrolleri).                                                |
| `configOptions` | `GetConfigurationOptions`           | `getConfiguration()` işlevine iletilen Intlayer yapılandırma geçersiz kılmaları. Proxy'nin belirli bir yapılandırma dosyasını okumasını veya değerleri geçersiz kılmasını istediğinizde kullanın. |

### Örnek

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler`, tüm dil yönlendirme mantığını içeren bağımsız, framework'ten bağımsız bir Node.js `(req, res, next)` ara yazılımı oluşturur. Vite eklenti API'sinin kullanılamadığı ortamlarda (örneğin düz bir Node.js sunucusu veya özel bir Nitro modülü) yararlıdır.

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### Üretim SSR (TanStack Start / h3 aracılığıyla Nitro)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Yönlendirme Davranışı

Ara yazılım, `next-intlayer` ara yazılımının yönlendirme mantığını yansıtır ve tüm Intlayer yönlendirme modlarını destekler.

### Yönlendirme Modları

| Mod             | Tarayıcıda görünen URL   | Davranış                                                                                                                                                 |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/tr/about`              | Varsayılan. URL'deki dil öneki. Varsayılan dil, `prefix-all` etkin olmadığı sürece öneksiz URL'ye yönlendirir.                                           |
| `prefix-all`    | `/en/about`, `/tr/about` | Varsayılan dil dahil tüm diller her zaman öneklidir.                                                                                                     |
| `no-prefix`     | `/about`                 | URL'de dil yok. Dil yalnızca çerezlerde saklanır; URL yeniden yazımları dahili olarak gerçekleşir.                                                       |
| `search-params` | `/about?locale=tr`       | Dil, bir sorgu parametresi (query parameter) olarak iletilir. Eksik veya güncel olmadığında `locale` parametresini eklemek/güncellemek için yönlendirir. |

### Algılama Önceliği

1. URL yolu öneki (örneğin `/tr/about` → `tr`).
2. Çerez / localStorage değeri (`intlayer-locale`).
3. `Accept-Language` üstbilgisi (header).
4. Yapılandırmadaki `defaultLocale`.

### Otomatik Atlatma (Bypass)

Ara yazılım, bu istekleri dil işlemi yapmadan her zaman doğrudan iletir:

- `ignore` yüklemiyle eşleşen istekler.
- `/node_modules/**`
- `/@**` – Vite dahili bileşenleri (`@vite/`, `@fs/`, `@id/` vb.).
- `/_**` – sunucu dahili bileşenleri (`__vite_ping`, `__manifest` vb.).
- Yolu bir dosya uzantısıyla biten istekler (statische assets). Statik bir varlık yolunda bir dil öneki varsa (örneğin `/tr/logo.png`), dosyanın doğru şekilde sunulabilmesi için bu önek kaldırılır.

### Alan Adı Yönlendirmesi (Domain Routing)

Intlayer yapılandırmanızda `routing.domains` yapılandırıldığında, ara yazılım alan adları arası dil yönlendirmesini yönetir:

- `domains.zh = "intlayer.zh"` olduğunda, `intlayer.org` üzerindeki `/zh/about` isteği `https://intlayer.zh/about` adresine yönlendirilir.
- `intlayer.zh/about` isteği, `[locale]` rota parametresinin doldurulması için dahili olarak `/zh/about` şeklinde yeniden yazılır.

### Yönlendirme Döngüsü Koruması (Redirect Loop Protection)

Ara yazılım, 2 saniyelik kayan bir pencere içinde `originalUrl → newUrl` çifti başına yönlendirme sayılarını izler. Bu pencere içinde 10'dan fazla yönlendirme, sonsuza kadar döngüye girmek yerine açıklayıcı bir hata ile birlikte `500` yanıtı döndürür.

## Nitro / Üretim SSR (Otomatik Enjeksiyon, v9+)

`intlayerProxy` bir Vite eklentisi olarak kullanıldığında, bir `.nitro` özelliği taşır. `nitro/vite` derleme eklentisi bu özelliği okur ve `nitroConfig.modules` içine ekler, böylece `intlayerNitroHandler` otomatik olarak bir Nitro sunucu ara yazılımı olarak kaydedilir — üretim SSR için manuel yapılandırma gerekmez.

Nitro işleyicisi (handler), h3 v2'nin Web Fetch API olay modelini kullanır (`fromNodeMiddleware` değil), bu nedenle tüm Nitro şablonlarıyla (Node, Bun, Deno, edge runtimes) uyumludur.

## Kullanımdan Kaldırılan Takma Adlar (Deprecated)

| Kullanımdan kaldırılan dışa aktarım | Değişiklik      |
| ----------------------------------- | --------------- |
| `intlayerMiddleware`                | `intlayerProxy` |
| `intLayerMiddlewarePlugin`          | `intlayerProxy` |
