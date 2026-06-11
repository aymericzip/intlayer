---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Web Sitesini Tara
description: Herhangi bir web sitesinin sayfa boyutunu ölçmek ve i18n/SEO durumunu denetlemek için Intlayer CLI scan komutunu nasıl kullanacağınızı öğrenin.
keywords:
  - Scan
  - SEO
  - i18n
  - Denetim
  - CLI
  - Intlayer
  - Sayfa boyutu
  - Paket
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "Scan komutu eklendi"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Web Sitesini Tara

`scan` komutu, herkese açık bir URL'yi getirir, toplam sayfa boyutunu ölçer ve sayfanın i18n ile SEO durumunu denetler. HTML özniteliklerini, kurallı (canonical) bağlantıları, hreflang etiketlerini, robots.txt, sitemap.xml dosyalarını, yerelleştirilmiş dahili bağlantıları ve JavaScript paketi dil ağırlığını kapsayan puanlı bir rapor (0–100) üretir.

Ekstra bağımlılık gerekmez. [puppeteer](https://pptr.dev/) kurulu olduğunda tarama işlemi, daha hassas bir paket analizi için geç yüklenen (lazy-loaded) JavaScript parçalarını yakalayabilir; aksi takdirde HTML'de bildirilen doğrudan yüklenen betikleri incelemeye geri döner.

## Kullanım

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Örnek

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Örnek çıktı:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Seçenekler

### `<url>` (gerekli)

Taranacak tam nitelikli URL (örneğin `https://example.com`).

### `--no-deep`

Daha derin işleme tabanlı taramayı devre dışı bırakır.

Varsayılan olarak komut, sayfayı başsız (headless) bir tarayıcıda işlemek, geç yüklenen JavaScript parçalarını yakalamak ve gerçek aktarım boyutunu ölçmek için [puppeteer](https://pptr.dev/) kullanmaya çalışır. Puppeteer kurulu değilse, komut otomatik olarak temel moda geri döner.

Puppeteer kullanılabilir olduğunda bile temel modu zorlamak için `--no-deep` parametresini geçirin.

> Örnek: `npx intlayer scan https://example.com --no-deep`

### `--json`

Biçimlendirilmiş bir rapor yerine tarama sonucunun tamamını bir JSON nesnesi olarak çıktı verir. Programatik tüketim veya CI hatları için kullanışlıdır.

> Örnek: `npx intlayer scan https://example.com --json`

### Standart yapılandırma seçenekleri

- **`--base-dir`** — `intlayer.config.*` dosyasını bulmak için kullanılan temel dizin.
- **`-e, --env`** — Hedef ortam (örneğin `development`, `production`).
- **`--env-file`** — Özel bir `.env` dosyasının yolu.
- **`--no-cache`** — Yapılandırma önbelleğini devre dışı bırakır.
- **`--verbose`** — Ayrıntılı günlüğe kaydetmeyi etkinleştirir (CLI modunda varsayılan).
- **`--prefix`** — Özel günlük ön eki.

## Neler kontrol edilir?

| Kontrol                   | Açıklama                                                    | Puan Ağırlığı |
| ------------------------- | ----------------------------------------------------------- | ------------- |
| `html lang`               | `<html lang="…">` özniteliği mevcut                         | 9             |
| `html dir`                | `<html dir="…">` özniteliği mevcut                          | 3             |
| `canonical`               | `<link rel="canonical">` mevcut                             | 10            |
| `hreflang`                | `<link rel="alternate" hreflang="…">` etiketleri mevcut     | 9             |
| `x-default hreflang`      | Bir `x-default` hreflang alternatifi mevcut                 | 7             |
| `localized links`         | En az bir dahili bağlantı bir dil segmenti içeriyor         | 5             |
| `all links localized`     | Her dahili bağlantı bir dil segmenti içeriyor               | 5             |
| `current locale`          | Sayfa dili algılanabiliyor                                  | 3             |
| `robots.txt present`      | `/robots.txt` 200 yanıtı döndürüyor                         | 10            |
| `robots.txt locale paths` | robots.txt dosyasında hiçbir dil yolu engellenmemiş         | 10            |
| `sitemap.xml present`     | `/sitemap.xml` 200 yanıtı döndürüyor                        | 10            |
| `sitemap locale coverage` | Algılanan her dil site haritasında görünüyor                | 10            |
| `sitemap alternates`      | Site haritası `hreflang` alternatif bağlantılarını içeriyor | 5             |
| `sitemap x-default`       | Site haritası bir `x-default` hreflang içeriyor             | 5             |
| `unused bundle content`   | JS paketi aşırı kullanılmayan dil verisi taşımıyor          | 9             |

Nihai puan, geçen tüm kontrollerin ağırlıklı yüzdelik toplamıdır (0–100).

## Tarama işlevini programlı olarak kullanma

`scan` işlevi, kendi betiklerinizden çağrılabilmesi için `@intlayer/cli` paketinden de dışa aktarılır:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Daha düşük seviyeli erişim için, `@intlayer/chokidar/scan` altındaki `scanWebsite` yapılandırılmış bir `ScanResult` nesnesi döndürür:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
