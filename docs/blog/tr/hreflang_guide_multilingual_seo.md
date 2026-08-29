---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, çok dilli SEO rehberi"
description: "Hreflang nedir, arama motorlarının uyguladığı kurallar, x-default neden neredeyse her zaman yanlıştır ve Next.js ile TanStack Start'ta doğru etiketler nasıl oluşturulur."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: çok dilli SEO rehberi

Uygulamanızı çevirdniz. `/en`, `/fr`, `/es` yayınladınız. Ve Fransız kullanıcılar hala İngilizce sayfaya iniyor.

Çevirisi yapmak kolay kısım. Zor kısım, arama motorlarına bu sayfaların **başka bir dildeki aynı sayfa** olduğunu, birbirleriyle rekabet eden üç belge olmadığını söylemektir. İşte `hreflang` bunu yapar ve çoğu çok dilli site sessiz sedasız trafik kaybettiği yerdir.

---

## Hreflang aslında nedir

Bir sayfadaki bir ek açıklama şöyle der: _bu URL'nin orada, bu diller için eşdeğer versiyonları vardır._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

İki şey kazanırsınız: doğru sürümün doğru kullanıcıya gösterilmesi ve locale'lerinizin birbirini yutan kopyalar olarak değil de tek bir küme halinde birleştirilmesi.

Ne olmadığını açık olmak gerekir. Bu **bir yönlendirme değildir** — bu bir ipuçudur ve Google bunu geçersiz kılabilir. Bu **bir sıralama artışı değildir** — hangi sürümün sıralandığını değiştirir, _sıralanıp sıralanmayacağını_ değil. Ve Bing bunu tamamen görmezden gelir, bunun yerine `content-language` ve coğrafi hedeflemesine güvenir.

---

## Nerede Beyan Etmeli

Üç yerleştirme, hepsi geçerli. Birini seçin ve orada kalın — aynı küme iki yerde beyan edilirse setler farklılaşır.

**HTML `<head>`** olağan seçimdir. Bir uyarı: hidrasyon sonrası enjekte edilen etiketler güvenilir değildir. Eğer framework'ünüz onları yalnızca istemci tarafında ekliyorsa, crawler bunları asla görmeyebilir.

**XML sitemap**, daha geniş ölçekte daha iyidir. 10 dil ve 5.000 sayfa, tarayıcılara hiçbir işe yaramayan 50.000 `<link>` öğesi gönderilmesi anlamına gelir; bir sitemap'te sayfalarınıza sıfır bayt maliyeti vardır.

**HTTP `Link` başlığı**, PDF'ler gibi HTML olmayan dosyalar için tek seçenektir.

---

## Kurallar

### Kendi kendine referans ve karşılıklılık

`/fr/about` üzerindeki set, `/fr/about`'a işaret eden `hreflang="fr"`'yi içermelidir. Ve eğer `/about`, `/fr/about`'a işaret ediyorsa, `/fr/about` geri işaret etmelidir. Google'a göre tek yönlü bir referansa "geri dönüş olmayan etiket" denir ve Google bu etiketi siler.

Uygulamada bu, **bir kümedeki her sayfanın özdeş bağlantı setini gönderdiği** anlamına gelir. Onları paylaşılan bir dil listesinden oluşturmak kolaylık değil, ikiden fazla dile sahip olduğunuzda doğru kalmanın tek yoludur.

### Mutlak URL'ler, her zaman

```html
<!-- Sessizce yoksayıldı -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Doğru -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Bunun nedeni ezberlenmekten ziyade anlaşılmaya değerdir. `hreflang`, belge içi bir referanstır: arama motorları URL'ye göre anahtarlanmış bir küme oluşturur ve bunu içindeki her sayfada paylaşırlar. Göreli bir yol, yalnızca bulunduğu belgeye göre anlamlıdır, bu nedenle bunu ifade edemez. Ayrıca bir konak geçemez — ve bir alternatif sıklıkla geçer, bir locale `example.fr` veya `fr.example.com` üzerinde yaşadığında. Bir sitemap veya bir HTTP başlığında karşısında çözülmesi gereken bir temel belge yoktur.

Bunun kodda doğrudan bir sonucu vardır. `getLocalizedUrl("/about", "fr")` `/fr/about` döndürür — giriş göreceli, çıkış göreceli. `hreflang` için mutlak bir URL sağlamanız gerekir:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ düşürüldü
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Tek istisna, göreceli değerleri render etmeden önce sizin için çözen bir framework'tür: Next.js göreceli `alternates`'i `metadataBase`'e karşı genişletir. Tamam — ancak kural **emit edilen HTML**'ye uygulanır, bu nedenle DevTools inspector'ı değil `curl` ile kontrol edin.

### Dil kodları

Dil için ISO 639-1, isteğe bağlı bölge için ISO 3166-1 Alpha 2: `fr`, `fr-CA`, `pt-BR`.

İki tuzak neredeyse herkesi yakalar. Yalnız bir bölge geçersizdir — `hreflang="ca"` Katalanca'dır, Kanada değil; `en-CA` veya `fr-CA` gerekir. Ve `en-UK` mevcut değildir: Birleşik Krallık'ın ülke kodu `GB`'dir, bu nedenle `en-GB`'dir.

Yalnızca o bölgeye gerçekten farklı içerik sunduğunuzda bir bölge ekleyin — farklı fiyatlar, farklı yasal bildirimler. `fr` ve `fr-FR` özdeş içerikte gürültüdür.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

En sık unutulan ve yanlış anlaşılan bir kavram `x-default`'dur — uygulamaların 30'undan azı bunu düzgün şekilde uygular.

Dili hiçbir girişinizle eşleşmeyen kullanıcılar için geri dönüş mekanizmasıdır. Bir Hollandaca konuşan kişi, İngilizce, Fransızca ve İspanyolca sunan bir sitede hiçbir girişle eşleşmez; `x-default` olmadan, Google sizin için seçim yapar.

İnsanların yanlış anladığı şey, bunun ne anlama geldiğidir. `x-default` **"İngilizce sürüm değildir"** ve **"varsayılan locale değildir"**, genellikle oraya işaret etse de. Bu, _bu set tarafından kapsanmayan kullanıcılar için sayfa_ anlamına gelir. Bu nedenle, bunu `/en`'e işaret etmek yerine bir dil seçiciye veya coğrafi yönlendirme yapan bir açılış sayfasına işaret etmek meşrudur ve çoğu zaman daha iyidir. Böyle bir sayfanız yoksa, birincil diliniz makul bir cevapdır.

İki şeyi net bir şekilde ayırt etmek gerekir: `x-default` seti içinde kendine referans veren girişin yerine geçen bir şey değil, ek bir giriştir ve diğer her giriş gibi kümedeki her sayfada aynı şekilde görünmelidir.

---

## Canonical tuzağı

Her yerelleştirilmiş sayfa **kendi canonical'ı** olmalıdır:

```html
<!-- https://example.com/fr/about üzerinde -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Her yerel sürümün canonical'ını İngilizce sürüme işaret ettirmek yerine:

```html
<!-- https://example.com/fr/about üzerinde — sayfayı ortadan kaldırır -->
<link rel="canonical" href="https://example.com/about" />
```

Fransız sayfasının dizine alınmaması gereken bir kopya olduğunu söylerken, `hreflang` bunun Fransız kullanıcılara sunulacak sayfa olduğunu söyler. Sinyaller çelişir, canonical kazanır ve Fransız sayfalarınız dizinden çıkar.

**Canonical, bölge başına kendi kendine referanslıdır. `hreflang` kümeyi tanımlar.**

---

## URL yapısını seçme

`hreflang` URL'leri açıklama ekler, bu nedenle yapı ilk gelir.

| Yapı             | Örnek             | Takas                                                                    |
| ---------------- | ----------------- | ------------------------------------------------------------------------ |
| **Alt dizinler** | `example.com/fr/` | Bir domain, paylaşılan yetki — daha zayıf coğrafi sinyal                 |
| **Alt alanlar**  | `fr.example.com`  | Bir bölge ekleme veya bırakma kolaydır — ayrı bir site olarak okunabilir |
| **ccTLDs**       | `example.fr`      | En güçlü ülke sinyali — otorite her domain için oluşturulur              |

Subdirectories, çoğu proje için doğru varsayılandır. ccTLDs'ye sadece gerçekten ayrı ülke işletmeleri olarak faaliyet gösterdiğinizde başvurun.

Kaçınılması gereken tek yapı: `Accept-Language` veya IP'ye göre **aynı URL**'de farklı diller sunmak. Crawlers bir sürümü görür ve bir sürümü indexler; diğer her şey görünmez.

> Intlayer, `routing.mode` ve `routing.domains` aracılığıyla üçünü de kapsar. [Özel domainleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/custom_domains.md) ve [konfigürasyon referansını](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) görmek için.

---

## Uygulama

Bu etiketleri el ile yazmak ikinci bir locale ile iletişime geçtiğinde başarısız olur. Bunun yerine bunları locale listinizden türetin.

<Steps>

<Step number={1} title="Kümeyi her sayfada yayınla">

Her yerde aynı küme, locale başına canonical, mutlak URL'ler, `x-default` dahil.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API, `alternates.languages` gösterir ve `getMultilingualUrls` yapılandırılmış locales'inizden tüm kaydı oluşturur:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) döndürür:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Tam kurulum: [Next.js 16 i18n rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Rotanın `head` fonksiyonu bağlantıları oluşturur. `localeMap` yapılandırılmış locale'lerinizi tekrarlayarak, config'e bir locale eklemek bunu her yerde bir kere ekler:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` sunucuda çalışır, bu nedenle etiketler başlangıç HTML'ine yerleşir. Tam kurulum: [TanStack Start i18n kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Veya hepsini sitemap'e taşıyın">

Ölçekte, ek açıklamaları sayfalarınızdan tamamen uzak tutun. `generateSitemap` yapılandırmanızdan locales ve routing mode'u okuyarak her giriş için `xhtml:link` alternates yayınlar:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Bilmeniz gereken iki seçenek:

- `xhtmlLinks` (varsayılan `true`) — alternatif linkler yalnızca locale URL'leri gerçekten farklı olduğunda yayınlanır. `no-prefix` modunda her locale bir URL'i paylaşır, bu nedenle `routing.domains` locale'lere kendi hostname'lerini vermediği sürece atlanırlar.
- `entryPerLocale` (default `false`) — varsayılan olarak bir `<url>` girişi tüm alternatifleri taşır. Her iki form de geçerlidir, ancak yalnızca `<loc>` olarak listelenen bir URL Search Console'da _gönderilen_ olarak sayılır; yalnızca alternatif olan locales keşfedilebilir ancak hiçbir sitemap'e atfedilmez. Bunu açmak her yerelleştirilmiş URL'ye tam alternatif seti tekrarlanan kendi girişini verir. Bu, giriş sayısını locale sayısı ile çarpar, bu nedenle 50 000 URL / 50 MB limitini izleyin ve bunu aşarsanız bir sitemap indeksine bölün.

</Step>

<Step number={3} title="Crawler'ın neyi aldığını doğrulayın">

`hreflang` sessizce başarısız olur, bu nedenle varsaymak yerine kontrol edin.

Kaynağı okuyun, inspector'ı değil — `curl https://example.com/fr/about | grep hreflang` bir crawler'ın aldığını gösterir; DevTools JavaScript çalıştıktan sonra DOM'u gösterir. Ardından her alternate'i takip edin ve aynı seti geri gösterdiğini, ve bunların hiçbirinin redirect olmadığını doğrulayın. Search Console'un International Targeting raporu, tüm site genelinde geriye kalanları yakalar.

Çok dilli özel bir crawl için, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) eksik etiketleri, bozuk alternates'leri ve lokalize sayfalarınızda canonical çakışmalarını kontrol eder.

</Step>

</Steps>

---

## Kontrol Listesi

- [ ] Her locale'in farklı, crawlable bir URL'si vardır
- [ ] Her sayfa kendine referans gösterir ve her referans karşılıklıdır
- [ ] Aynı set kümedeki her sayfada gönderilir
- [ ] Tüm `href` değerleri emitted HTML'de mutlak yoldur
- [ ] Kodlar ISO 639-1 + ISO 3166-1 Alpha 2'dir (`en-GB`, `en-UK` değil)
- [ ] `x-default` mevcut ve eşleşmeyen kullanıcıların gitmesi gereken yeri gösterir
- [ ] Canonical, locale başına kendi kendine referanstır
- [ ] Etiketler server-render edilmiş, hydration sonrasında enjekte edilmemiştir
- [ ] Tam olarak bir yerde tanımlanmıştır
- [ ] Hiçbir alternate redirect yoktur

---

## Sonuç

`hreflang` basit ve affetmezdir. Bir eksik return etiketi, bir relative URL, bir cross-locale canonical ve küme hiçbir hata olmaksızın atılır. Bunların her biri etiketleri elle yazma işleminden kaynaklanır.

Tek bir locale listesinden seti türet, server tarafında renderla, canonical'ı self-referential tut ve `x-default`'a hak ettiği önemi ver. Bunu bir kez yap ve doğruluk artık sürdürmen gereken bir şey olmaktan çıkar.

### Daha Fazlasını Keşfet

- [SEO ve Uluslararasılaştırma](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md) — daha geniş çok dilli SEO resmi
- [SEO ve i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)
- [TanStack Start i18n rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)
- [Locale başına özel alanlar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/custom_domains.md)
- [Konfigürasyon referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
