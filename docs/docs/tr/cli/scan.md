---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: bir sitenin i18n ve SEO denetimi"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Yönlendirme stratejisini ve i18n yığınını (kütüphaneler, TMS) tespit edin; hreflang karşılıklılığı, og:locale ve dil değiştirici kontrolleri ekleyin; robots.txt site haritalarını, site haritası dizinlerini ve gzip sıkıştırmalı site haritalarını takip edin"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` bayrağı eklendi"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Scan komutu eklendi"
author: aymericzip
---

# Web Sitesini Tara

`scan` komutu, herkese açık bir URL'yi getirir, toplam sayfa boyutunu ölçer ve sayfanın i18n ile SEO durumunu denetler. HTML özniteliklerini, kurallı (canonical) bağlantıları, hreflang etiketlerini ve dönüş bağlantılarını, robots.txt dosyasını, site haritalarını, yerelleştirilmiş dahili bağlantıları ve JavaScript paketindeki yerel ayar ağırlığını kapsayan puanlı bir rapor (0–100) üretir.

Ayrıca sitenin URL'lerinde yerel ayarı nasıl kodladığını (yönlendirme stratejisi) ve hangi çerçeveyi, i18n kütüphanesini, çeviri yönetim sistemini (TMS) veya çeviri vekil sunucusunu kullandığını raporlar. Aynı kontroller [çevrimiçi i18n SEO tarayıcısını](https://intlayer.org/i18n-seo-scanner) ve Intlayer Chrome uzantısını güçlendirir.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: `intlayer.config.*` dosyasını bulmak için kullanılan temel dizin.
- **`-e, --env`**: Hedef ortam (örneğin `development`, `production`).
- **`--env-file`**: Özel bir `.env` dosyasının yolu.
- **`--no-cache`**: Yapılandırma önbelleğini devre dışı bırakır.
- **`--ci`**: Komutu monorepo'nun her Intlayer projesinde çalıştırır (bir proje dizininden çalıştırıldığında yalnızca mevcut projede). Proje başına kimlik bilgileri, proje yolunu `{ "clientId", "clientSecret" }` ile eşleyen bir JSON nesnesi olan `INTLAYER_PROJECT_CREDENTIALS` aracılığıyla eklenebilir.
- **`--verbose`**: Ayrıntılı günlüğe kaydetmeyi etkinleştirir (CLI modunda varsayılan).
- **`--prefix`**: Özel günlük ön eki.

## Yönlendirme stratejisi

Sayfanın hreflang alternatifleri tarafından paylaşılan yerel ayar deseni, sitenin dillerini nasıl yönlendirdiğini ortaya çıkarır. Alternatifler olmadığında yalnızca taranan URL kullanılır (düşük güvenilirlik).

| Strateji            | Örnek                                  |
| ------------------- | -------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`               |
| `prefix-no-default` | `/about` (varsayılan dil), `/fr/about` |
| `search-params`     | `/about?lang=fr`                       |
| `subdomain`         | `fr.example.com`                       |
| `domain`            | `example.fr`, `example.de`             |
| `no-prefix`         | Her dil için tek URL (çerez)           |

Bağlantı, canonical, robots.txt ve site haritası kontrolleri her URL'yi bu strateji üzerinden okur. Örneğin, ön eksiz bir bağlantı `prefix-no-default` bir sitenin varsayılan dilinde doğrudur, `search-params` bir sitede ise `?lang=` içermeyen bir bağlantı dilden ayrılır.

## Tespit edilen yığın

Çerçeveler, i18n kütüphaneleri (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), çeviri yönetim sistemleri (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) ve çeviri vekilleri (Weglot, Localize, GTranslate…) HTML'den, yüklenen kaynaklardan ve JavaScript paketlerinden tanımlanır. Derin mod ayrıca window genel değişkenlerini ve çerezleri de okur.

## Neler kontrol edilir?

| Kontrol                         | Açıklama                                                                                               | Puan Ağırlığı |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| `html lang`                     | `<html lang>` mevcut ve geçerli bir BCP 47 etiketidir                                                  | 9             |
| `html dir`                      | Sağdan sola yazılan diller için `dir="rtl"` ayarlanmıştır (`ltr` varsayılandır)                        | 3             |
| `locale signals consistent`     | `<html lang>`, URL dili ve kendi kendine başvuran hreflang girdisi birbiriyle uyuşuyor                 | 5             |
| `og:locale`                     | `og:locale` ayarlanmış ve `<html lang>` ile eşleşiyor                                                  | 3             |
| `canonical`                     | Bir canonical bağlantı mevcut ve başka bir dil sürümüne işaret etmiyor                                 | 10            |
| `hreflang`                      | Geçerli kodlar, mutlak URL'ler, yinelemesiz ve kendi kendine başvuru içeren hreflang etiketleri mevcut | 9             |
| `x-default hreflang`            | Bir `x-default` hreflang alternatifi mevcut                                                            | 7             |
| `hreflang alternates link back` | Alternatifler 200 ile yanıt veriyor, yönlendirilmiyor, geri bağlantı sağlıyor ve dili bildiriyor       | 8             |
| `localized links`               | Dahili bağlantılar sayfa diline işaret ediyor                                                          | 8             |
| `all links keep the locale`     | Hiçbir dahili bağlantı dili değiştirmiyor veya bırakmıyor                                              | 6             |
| `language switcher`             | Diğer dil sürümlerine yönlendiren taranabilir `<a href>` bağlantıları mevcut                           | 6             |
| `robots.txt present`            | `/robots.txt` 200 yanıtı döndürüyor                                                                    | 10            |
| `robots.txt localized URLs`     | Ne site ne de yerelleştirilmiş URL'leri Googlebot için engellenmemiş                                   | 8             |
| `sitemap present`               | Bir site haritası bulundu (robots.txt `Sitemap:` yönergeleri, `/sitemap.xml`, `/sitemap_index.xml`)    | 10            |
| `sitemap locale coverage`       | Her dil listelenmiş ve alternatifleri olan girdiler kendilerini de listeliyor                          | 9             |
| `sitemap alternates`            | Site haritası `hreflang` alternatif bağlantılarını içeriyor                                            | 8             |
| `sitemap x-default`             | Site haritası bir `x-default` hreflang içeriyor                                                        | 7             |
| `unused bundle content`         | Ana JS paketi diğer dillerin çevirilerini taşımıyor                                                    | 8             |

Bir uyarı ağırlığın yarısını kazandırır. Nihai puan, çalıştırılan kontrollerin ağırlıklı toplamının yüzde olarak ifadesidir (0–100). Başarısız kontroller ilk bulunan sorunları yazdırır; tüm ayrıntılar için `--json` kullanın.

## Tarama işlevini programlı olarak kullanma

`scan` işlevi, kendi betiklerinizden çağrılabilmesi için `@intlayer/cli` paketinden de dışa aktarılır:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Daha düşük seviyeli erişim için, `@intlayer/engine/scan` altındaki `scanWebsite` yapılandırılmış bir `ScanResult` nesnesi döndürür:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
