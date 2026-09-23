---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Aynı API, Farklı Bundle"
description: next-intl import'larının bir Next.js uygulamasının @intlayer/next-intl compat adapter tarafından sunulduğunda ne değiştiği. Bundle boyutu, sızıntı, bileşen boyutu ve hidrasyon aynı kod üzerinde ölçülmüştür, plus adapter'ın ne tuttuğu, ne göz ardı ettiği ve neyi değiştiremediği.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Aynı API, Farklı Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl`, bir uyumluluk adaptörüdür: `next-intl` API'sini (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) kullanıma sunar ve bunu Intlayer tarafından derlenmiş sözlüklerden sunます. Uygulama kodu değişmez. Bundle değişir.

Bu makale, aynı Next.js uygulamasında ikisini karşılaştırır: bir kez `next-intl` ile ve bir kez adaptör ile oluşturulmuş. Rakamlar [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)'dan gelir; bu, tarayıcının gerçekte ne indirdiğini kaydeden açık kaynak bir süittir. Eğer `next-intl` vs Intlayer karşılaştırmasını kütüphaneler olarak istiyorsanız, [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) okuyun. Bu makale adaptörün, bileşenlerinizi olduğu gibi tutarken neyi değiştirdiğiyle ilgilidir.

<TOC/>

> **tl;dr**: Aynı Next.js uygulamasında, `next-intl` yerine `@intlayer/next-intl` kullanmaya geçmek, sayfa başına JavaScript'i **153.6 KB'tan 147.5 KB'a** gzip, ortalama bileşeni **21.8 KB'tan 8.1 KB'a**, yabancı sayfa string sızıntısını **~%90'dan %0'a** ve hidrasyon işlemini **14.7 ms'den 12.8 ms'ye** indirdi, hiçbir bileşen düzenlenmedi. TanStack Start'ta, `use-intl` eşdeğeri (`@intlayer/use-intl`) bileşenleri **76-87 KB'tan 9-11 KB'a** ve locale değişimini **7-21 ms'den 4-9 ms'ye** düşürdü. Adaptör çalışma zamanında **8.0 KB** maliyet oluştururken `next-intl` için **14.7 KB** ve native `next-intlayer` için **5.5 KB** maliyeti vardır. Navigasyon ve middleware, Intlayer'ın routing yapılandırması üzerinde yeniden uygulanır; yerelleştirilmiş `pathnames` aktarılmayan tek özelliktir.

## `@intlayer/next-intl` Nedir

`next-intl` bir runtime'dır: `getRequestConfig` her istek için bir `messages/{locale}.json` yükler, `NextIntlClientProvider` bunu istemciye gönderir ve `useTranslations("about")` render zamanında o nesneden anahtarları okur. Her optimizasyon (namespaces, `pick(messages, [...])` sayfa başına, lazy loading) sizin yazmanız gerekendir.

`@intlayer/next-intl` bu zincirin ilk ve son kısmını tutar ve ortasını değiştirir. Bileşenleriniz hâlâ `useTranslations("about")` çağrısı yapar; aldıkları şey, derleme zamanında derlenmiş bir Intlayer sözlüğünden, o bileşene özgü, yalnızca aktif locale'de gelir.

Üç mekanizma bunu çalışır hale getirir:

1. **Import aliasing.** `createNextIntlPlugin()` from `@intlayer/next-intl/plugin` wraps `withIntlayer` ve Webpack / Turbopack aliases ekler, böylece `next-intl`, `next-intl/server`, `next-intl/navigation` ve `next-intl/middleware` `@intlayer/next-intl` olarak çözümlenir. Codebase'nizdeki hiçbir import yeniden adlandırılmaz.
2. **JSON as source of truth.** `syncJSON` plugin mevcut `messages/{locale}.json` dosyalarınızı okur, üst düzey anahtarlarını namespace başına bir dictionary'ye böler ve CLI veya CMS bunları güncellediğinde çevirileri aynı dosyalara geri yazar. Çevirmenlerinizin iş akışı değişmeden kalır.
3. **Call-site binding.** Intlayer optimize pass (Babel veya SWC), `useTranslations("about")` çağrısını `about` dictionary'sini doğrudan alan bir çağrıya dönüştürür. Component artık global bir message tree'ye erişmez; kendi içeriğine erişir.

```tsx fileName="app/[locale]/about/page.tsx"
// Kodunuz, değiştirilmemiş
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Compiler tarafından yayılan şey (basitleştirilmiş)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Bu yeniden yazma, aşağıdaki bileşen boyutu ve sayfa sızıntısı sütunlarının hareket etmesinin nedenidir: bir sayfa yalnızca oluşturduğu bileşenlerin sözlüklerini çeker ve yalnızca sunulan yerel ayarda.

## Adaptörün neyi koruduğu, görmezden geldiği ve değiştirmediği

| `next-intl` API                                                      | `@intlayer/next-intl` ile                                                                                                                    |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Korunmuş. Derleme zamanında `ns` sözlüğüne bağlı. Anahtarlar içeriğinize karşı yazılmıştır.                                               |
| `getTranslations({ locale, namespace })`                             | ✅ Korundu                                                                                                                                   |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Korundu. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` Intlayer'ın ICU resolver'ı üzerinden çalışır                     |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Korundu                                                                                                                                   |
| `useFormatter()`                                                     | ✅ Korundu. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` native `Intl`'e köprü kurar                                        |
| `NextIntlClientProvider`                                             | ✅ Korundu. `messages`, `timeZone` ve `now` props'leri **kabul edilir ancak yoksayılır** (bir dev uyarısı sizi bilgilendirir)                |
| `getMessages()`                                                      | ✅ Uyumluluk için korundu; artık gerekli değil                                                                                               |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ Gerekli değil. Sözlükler build zamanında compile edilir; istek başına mesaj yüklemesi yoktur                                              |
| `defineRouting()`                                                    | ✅ Korundu. Atlanan alanlar (`locales`, `defaultLocale`, `localePrefix`) `intlayer.config.ts`'ten okunur                                     |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Korundu. Intlayer'ın yönlendirme yapılandırmasında yeniden uygulandı; `routing` argümanı kabul edilir ancak yok sayılır                   |
| `pathnames` (yerelleştirilmiş rota adları)                           | ❌ Yazım için kabul edilir, **enterpolasyonu yapılmaz**. Düz rota adlarını tutun veya bu eşlemesini Intlayer'ın `rewrite` bölümüne taşıyın   |
| `createMiddleware()`                                                 | ✅ Korundu. Intlayer'ın proxy'sini döndürür; `useLocale()` ve switcher'ınızın çalışmaya devam etmesi için `NEXT_LOCALE` çerezini ayarlar     |
| `NEXT_LOCALE` çerezi                                                 | ✅ Varsayılan olarak okunur (kendi `routing.storage` yapılandırmanız sürece)                                                                 |
| Boş `useTranslations()` namespace olmadan                            | ⚠️ Çalışır, ancak çağrı yeri bağlı değildir: runtime registry aracılığıyla çözümlenir. Bundle kazançları elde etmek için bir namespace geçin |

## Kıyaslama

### Ölçülen şeyler

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite her setup ile **aynı uygulamayı** derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), özdeş bileşenler ve özdeş içerik. Sayfalar `en` ve `fr` dilinde ölçülür.

`next-intl` dört yükleme stratejisiyle oluşturulmuştur; saf kurulumdan (tüm `messages/{locale}.json` yüklenmiş) optimal olana kadar (rota başına bir namespace + sayfa başına `pick()`). Adapter, **saf kurulumla aynı componentlerle** oluşturulmuştur ve sadece `next.config.ts` ve `intlayer.config.ts` değiştirilmiştir. "scoped" varyantı yoktur: compiler içeriği component başına kapsamlandırır, bu nedenle `static` ve `dynamic` satırları zaten kapsamlandırılmıştır.

Her build için, suite şunları kaydeder:

- **Lib size**: sadece i18n kütüphanesini içe aktaran boş bir componentinin gzip boyutu. Runtime'ın sabit maliyeti.
- **Page JS**: sayfa başına indirilen gzip JavaScript, tüm sayfalar ve diller üzerinde ortalaması alınmıştır.
- **Locale leak %**: kullanıcının **görüntülemediği** bir locale'e ait olan, indirilen JS'de bulunan çevrilmiş stringlerin payı.
- **Page leak %**: kullanıcının **üzerinde olmadığı** bir sayfaya ait olan, indirilen JS'de bulunan çevrilmiş stringlerin payı.
- **Component avg**: izolasyon içinde derlenmiş her bir componentinin ortalama gzip boyutu. Tek bir componentinin ne kadar i18n runtime ve kataloğunu içine aldığını gösterir.
- **E2E reactivity**: yeni bir locale seçilmesiyle DOM'da `html[lang]` güncellemesi arasındaki duvar saati zamanı (Playwright, 5 yineleme).
- **Hydration**: React hydration faz süresi.

> Aşağıdaki sayılar **2026-09-12** tarihli çalıştırmadan, `next-intl` / `use-intl` 4.14.2 ve `@intlayer/*` 9.5.1 ile elde edilmiştir. Test uygulaması kasıtlı olarak küçüktür (yerel başına birkaç düzine string), bu nedenle sızıntı yüzdeleri bir **deseni** açıklar: içeriğiniz arttıkça büyür, ancak runtime maliyeti sabit kalır.

### Next.js Sonuçları

İlgilendiğiniz metrikleri ve kütüphaneleri seçin:

<I18nBenchmark framework="nextjs" vertical/>

| Kurulum                   | Strateji       | Kütüphane boyutu (gz) | Sayfa JS ort. (gz) | Yerel sızıntı | Sayfa sızıntı | Bileşen ort. (gz) | E2E tepkisellik |   Hidrasyon |
| ------------------------- | -------------- | --------------------: | -----------------: | ------------: | ------------: | ----------------: | --------------: | ----------: |
| **base** (no i18n)        | -              |                0.0 KB |           141.0 KB |          0.0% |          0.0% |            0.9 KB |         13.4 ms |     11.8 ms |
| `next-intl`               | static         |               14.7 KB |           153.6 KB |          4.2% |         89.8% |           21.8 KB |         16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |               14.7 KB |           153.6 KB |          9.7% |         89.9% |           21.8 KB |         15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |               14.7 KB |           153.6 KB |          0.0% |          0.0% |           80.1 KB |         17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |               14.7 KB |           153.6 KB |          0.0% |          0.0% |           22.9 KB |         17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |            **8.0 KB** |       **147.5 KB** |      **0.0%** |      **0.0%** |        **8.1 KB** |     **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |            **8.0 KB** |       **148.7 KB** |      **0.0%** |      **0.0%** |        **8.1 KB** |     **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |                5.5 KB |           141.3 KB |          0.0% |          0.0% |            8.5 KB |         15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |                5.5 KB |           141.3 KB |          0.0% |          0.0% |            6.9 KB |         15.3 ms |     15.9 ms |

**Nasıl okunur**

- **Aynı bileşenler, sayfa başına 6 KB daha az.** Naive uygulamasının adapter derlemesi **147.5 KB** ile iniş yapar, tam olarak optimize edilen dahil olmak üzere her `next-intl` konfigürasyonunun altında (153.6 KB). Runtime'ın kendisi fark: her sayfada ödenen 8.0 KB'a karşılık 14.7 KB.
- **Sızıntı, hiçbir component'e dokunmadan %0'a gider.** Naive `next-intl` kurulumu, her sayfada ~%90 oranında yabancı sayfa string'lerini gönderir. `next-intl` ile %0'a ulaşmak, `scoped-*` kurulumları gerektirir: rota başına bir namespace ve her sayfada `pick(messages, [...])`. Adapter, naive koddan %0'a ulaşır çünkü optimize geçişi her `useTranslations("ns")` öğesini kendi sözlüğüne bağlar.
- **Component'ler 2.7 kat küçülür.** İzolasyon içinde derlenen bir component, `next-intl` ile ortalama **21.8 KB** (provider'a ve message ağacına ulaşır) ve adapter ile **8.1 KB**'dir. `next-intl`'nin `scoped-static` kurulumunda bu sayı _artar_ ve 80 KB'ye gider, çünkü her rotanın namespace dosyası, onu seçen sayfadan ulaşılabilir hale gelir.
- **Hidrasyon 2 ms daha hızlı** (12.8 vs 14.7 ms): React hidrate olmadan önce RSC payload'ından deserialize edilecek bir message nesnesi yoktur.
- **Adapter native runtime değildir.** `next-intlayer` **141.3 KB** konumundadır, base app üzerinde +0.3 KB, 5.5 KB runtime ile. Adapter, Intlayer'ın çekirdeğinin üstüne `next-intl` API yüzeyini (`useFormatter`, `t.rich`, ICU resolver) taşır, dolayısıyla 8.0 KB ve sayfa başına +6 KB. Bu köprü, hedef değildir.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tüm kütüphaneler ve stratejiler için tam tablo [Next.js benchmark raporunda](https://intlayer.org/tr/doc/benchmark/nextjs).

### TanStack Start üzerindeki sonuçlar (`use-intl`)

`use-intl`, `next-intl`'nin framework-agnostic çekirdeğidir. Adaptörü olan `@intlayer/use-intl`, Vite plugin'i (`@intlayer/use-intl/plugin`) ile aynı tasarımı takip eder.

| Kurulum                  | Strateji       | Lib boyutu (gz) | Sayfa JS ort (gz) | Locale sızıntısı | Sayfa sızıntısı | Bileşen ort (gz) | E2E reaktivite |   Hidrasyon |
| ------------------------ | -------------- | --------------: | ----------------: | ---------------: | --------------: | ---------------: | -------------: | ----------: |
| **base** (i18n yok)      | -              |          0.0 KB |          111.0 KB |             0.0% |            0.0% |           0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |          179.8 KB |            50.0% |           89.8% |          76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |          119.4 KB |             0.0% |           89.8% |          75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |          128.7 KB |             0.0% |            0.0% |          87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |          128.7 KB |             0.0% |            0.0% |          87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |          135.8 KB |            49.7% |        **0.0%** |      **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |      **129.7 KB** |         **0.0%** |        **0.0%** |       **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |          125.8 KB |            50.0% |            0.0% |           8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |          118.6 KB |             0.0% |            0.0% |           6.3 KB |         3.6 ms |     14.1 ms |

**Nasıl okunur**

- **Sayfa başına baytlar optimize edilmiş `use-intl` ile aynıdır.** `@intlayer/use-intl` `dynamic` modunda (129.7 KB), `use-intl`'nin `scoped-dynamic` (128.7 KB) ile 1 KB içinde ve `use-intl`'nin plain `dynamic` (119.4 KB) üzerinde 10 KB _daha fazla_. Bu plain `dynamic` satırı hala yabancı sayfa dizgelerinin %90'ını sızdırıyor; bayt sayısı düşük çünkü test uygulamasının içeriği küçük. Adaptörün %0'ı, içerik büyüdükçe düz kalan şeydir.
- **Bileşenler 7-9 kat daha küçük.** `use-intl` bileşenleri her stratejide ortalama **76-87 KB** boyutundadır, çünkü `useTranslations` sağlayıcının tüm mesaj nesnesine bağlıdır. Adapter ortalama **9-11 KB** boyutundadır.
- **Yerel ayar değişikliği daha hızlıdır.** Optimize edilmiş `use-intl` kurulumları `html[lang]` güncelleme için **13-21 ms** sürer; adapter **4-9 ms** sürer. Daha az bileşen yeniden render edilir ve hiçbir şey bir mesaj ağacından yeniden seçilmez.
- **`static` her yerel ayarı tutar.** Adapterin `static` satırı %49,7 yerel ayar sızıntısı gösterir, bu da yerel Intlayer'ın `static` modundakiyle aynıdır: tüm yerel ayarlar paketlenmiş, yalnızca sayfanın sözlükleri paketlenmiştir. Bir satır yapılandırma (`importMode: 'dynamic'`) bunu kaldırır.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tam tablo [TanStack Start benchmark raporunda](https://intlayer.org/tr/doc/benchmark/tanstack).

## Sayılar neden hareket ediyor

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Bileşende hiçbir şey değişmedi, bu nedenle kazançlar tamamen `useTranslations` neyin bağlandığından gelmektedir.

**`next-intl` ile**, bağlama sağlayıcı tarafından yapılır. `NextIntlClientProvider`, locale için tüm `messages` nesnesini alır; her `useTranslations("about")` bundan okur. Bundler, bir bileşenin bir hook'u içe aktardığını ve bir context'i okuduğunu görür ve sadece `about` dalının kullanıldığını bilemez. Aşağıdaki rotalar aynı message nesnesini paylaştığından, sayfa sızıntısı sütunu dosyayı kendiniz bölmediğiniz sürece ~%90 olarak okunur, ve gereksiz yük iki eksende birden büyür: sayfalar ve diller:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # her namespace, her sayfa
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**`@intlayer/next-intl` ile**, binding dictionary'dir. `syncJSON` `messages/en.json` dosyasını top-level key başına bir dictionary'ye dönüştürür; compiler hangi component'in `useTranslations("about")` çağırdığını çözer ve bunu `about` olarak direkt olarak aktif locale'de verir, bundler'ın izleyebileceği ve bölebileceği bir import olarak.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # değişmez, hala kaynak dokuman
│   └── fr.json
├── .intlayer/                        # oluşturulan: namespace başına bir dictionary, locale başına
└── src
    ├── middleware.ts                 # createMiddleware() artık Intlayer'ın proxy'sini döndürüyor
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (messages prop yok)
        └── about/page.tsx            # useTranslations("about")  ← değişmemiş
```

`src/i18n.ts` ve `messages` prop ortadan kaldırılıyor. Diğer her şey aynı kalıyor.

## Üç adımda göç

<Steps>
<Step number={1} title="Yükle">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Komut `next-intl` ürününü algılar ve `intlayer`, `next-intlayer`, `@intlayer/next-intl` ve `@intlayer/sync-json-plugin` paketlerini kurar. `next-intl` paketini yüklü tutun: bu paket, adapter'ın bir peer dependency'sidir ve türleri sağlar.

</Step>
<Step number={2} title="Intlayer'ı mesajlarınıza yönlendirin">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" her dili paketler; "dynamic" etkin olanı talep üzerine yükler
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU yer tutucu: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` dosyası bulunduğu yerde kalır. Her üst düzey anahtar bir dictionary haline gelir; `useTranslations("about")` `about` dictionary'sine eşlenir.

</Step>
<Step number={3} title="next.config.ts'i sarın">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()`, `withIntlayer` (içerik izleme, sözlük derleme, optimize geçişi) ve Webpack ve Turbopack için `next-intl` → `@intlayer/next-intl` aliaslarını birleştirir. Derleme yapın ve yukarıdaki tablolardaki sayılar sizin olacaktır.

</Step>
</Steps>

### Daha sonra silebileceğiniz öğeler

| Dosya / desen                                | Neden                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/i18n.ts` içinde `getRequestConfig`      | İstek başına mesaj yükleme yok. Dosyayı yalnızca `createNavigation` yardımcılarını da dışa aktarıyorsa tutun |
| `messages={...}` on `NextIntlClientProvider` | Adapter, derlenmiş çıktıyı okur; prop yok sayılır ve development'ta bir uyarı kaydeder                       |
| `await getMessages()` in layouts             | Aynı sebep                                                                                                   |
| Per-page `pick(messages, [...])`             | Compiler, component başına picking yapar                                                                     |

### Bytes ötesinde kazandıklarınız

- **Typed keys.** `useTranslations("about")`, derlenmiş `about` dictionary'sine karşı tiplendirilir. `t("does.not.exist")` bir TypeScript hatasıdır, runtime fallback değil.
- **`npx intlayer test`** CI'yi bir yerel dilde anahtar eksikse başarısız kılar. **`npx intlayer fill`** eksik olanları seçtiğiniz sağlayıcı (OpenAI, Anthropic, Mistral, Gemini...) kullanarak kendi anahtarınızla çevirir ve sonucu `messages/{locale}.json` dosyasına yazar.
- **Visual Editor ve CMS** aynı sözlüklerde çalışır, bu nedenle geliştirici olmayanlar `messages/fr.json` dosyasını bir UI aracılığıyla düzenleyebilir ve dosya güncellenir.
- **`.content.ts` öğesine kademeli geçiş.** Herhangi bir bileşen `useTranslations("about")` komutundan, eşlokantlı bir içerik dosyası ile `useIntlayer("about")` komutuna, aynı anda geçebilir. JSON ve `.content.ts` sözlükleri bir arada bulunur ve birleştirilir.

## Başlamadan önce bilmeniz gereken sınırlamalar

<AccordionGroup>
<Accordion header="Yönlendirme yapılandırması intlayer.config.ts dosyasına taşınır">

`createNavigation(routing)` ve `createMiddleware(routing)` imzalarını korur ancak argümanı yoksayar: diller, varsayılan dil ve önek stratejisi Intlayer'ın `routing` yapılandırmasından gelir. `next-intl`'in yerelleştirilmiş `pathnames` özelliğini (`/about` -> `/a-propos`) kullanıyorsanız, bağdaştırıcı bunları enterpole etmez; Intlayer'ın `routing.rewrite` seçeneği bu durumu kapsar ancak ayrı bir değişikliktir.

</Accordion>
<Accordion header="Ad alanı belirtilmemiş useTranslations() bağlı değildir">

Optimizasyon aşaması, hangi sözlüğün içe aktarılacağını bilmek için statik bir ad alanına ihtiyaç duyar. Ad alanı olmadan yapılan yalın çağrılar, her sözlüğe başvuran bir çalışma zamanı kaydı aracılığıyla çalışmaya devam eder; bu da tam olarak ortadan kaldırmaya çalıştığınız sızıntıdır. Ad alanını iletin.

</Accordion>
<Accordion header="Bağdaştırıcı tamamen ücretsiz değildir">

`next-intlayer` için 5.5 KB'a kıyasla 8.0 KB çalışma zamanı ve yerel derlemeye göre sayfa başına +6-7 KB. Bu, `next-intl` API yüzeyinin bedelidir. Her bileşen `useIntlayer`'a taşındığında bağdaştırıcıyı kaldırın.

</Accordion>
<Accordion header="Sağlayıcıdaki messages, timeZone ve now yoksayılır">

Biçimlendiriciler yerel `Intl` tarafından desteklenir ve yalnızca yerel ayar çıktılarını etkiler. Hidrasyon açısından kararlı tarihler için zorunlu bir saat dilimine veya sabit bir `now` değerine güveniyorsanız, bunu çağrı noktasında yönetin. [Tarih, saat ve sayı biçimlendirmesine](https://intlayer.org/tr/blog/date-time-number-formatting-locales) bakın.

</Accordion>
</AccordionGroup>

## Hangisini ne zaman kullanmalı?

<AccordionGroup>
<Accordion header="next-intl'de kalın">

Uygulamanız küçükse, paket boyutu bir sorun teşkil etmiyorsa ve ekibiniz ad alanlarını ve sayfa başına `pick()` yönetimini rahatça yapabiliyorsa.

</Accordion>
<Accordion header="@intlayer/next-intl kullanın">

Bugün `next-intl` kullanıyorsanız ve kodları yeniden yazmadan paket boyutu, sızıntı ve hidrasyon kazanımları, tiplendirilmiş anahtarlar ve CLI / CMS araçlarını istiyorsanız. Mevcut herhangi bir `next-intl` kod tabanı için önerilen giriş noktası budur.

</Accordion>
<Accordion header="Doğrudan yerel kullanıma geçin (next-intlayer)">

Yeni projeler için veya bağdaştırıcı görevini tamamladıktan sonra. Üçü arasında en hafif olanıdır (5.5 KB, sayfa başına +0.3 KB) ve senkron sunucu bileşenlerini, bileşen başına `.content.ts` dosyalarını ve eksiksiz özellik kümesini açar. [Next.js ile Intlayer](https://intlayer.org/tr/doc/environment/nextjs) ile başlayın.

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Uygulama kodum gerçekten hiç değişmeden kalır mı?">

Next.js'de bileşenler için evet: benchmark derlemesi yalnızca `next.config.ts` ve `intlayer.config.ts` dosyalarını değiştirdi. `src/i18n.ts` içindeki `getRequestConfig`, sağlayıcıdaki `messages` özelliği ve sayfa başına `pick()` çağrıları daha sonra silebileceğiniz ölü koda dönüşür.

</Question>

<Question title="ICU mesajlarına ne olur?">

Çalışmaya devam ederler. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` ve `{ts, date, long}` Intlayer'ın ICU çözümleyicisi tarafından işlenir. [ICU mesaj formatı](https://intlayer.org/tr/blog/icu-message-format) sayfasına bakın.

</Question>

<Question title="Bağdaştırıcı neden yerel next-intlayer'dan daha ağırdır?">

Intlayer çekirdeğinin üzerinde `next-intl` API yüzeyini taşır: `useFormatter`, `t.rich`, ICU çözümleyici, navigasyon yardımcıları. Bu, 5.5 KB'a karşı 8.0 KB ve sayfa başına +6 KB anlamına gelir. Bir köprüdür, nihai hedef değil.

</Question>

<Question title="Bileşen bileşen kademeli geçiş yapabilir miyim?">

Evet. Herhangi bir bileşen, yanına eklenen bir `.content.ts` ile `useTranslations("about")` kullanımından `useIntlayer("about")` kullanımına geçebilir. JSON ve `.content.ts` sözlükleri bir arada var olur ve birleşir.

</Question>

<Question title="Yerelleştirilmiş sayfa yolları (pathnames) çalışır mı?">

`next-intl`'in `pathnames` özelliği üzerinden çalışmaz: bağdaştırıcı bunu tipleme için kabul eder ancak enterpole etmez. Bunun yerine Intlayer'ın `routing.rewrite` özelliğini kullanın.

</Question>

</FAQ>

## İlgili karşılaştırmalar

Aynı bağdaştırıcı serisi:

- [i18next vs @intlayer/i18next](https://intlayer.org/tr/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/tr/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/tr/blog/vue-i18n-vs-intlayer-vue-i18n)

Doğrudan karşılaştırılan kütüphaneler:

- [next-intl vs Intlayer](https://intlayer.org/tr/blog/next-intl-vs-intlayer), aynı benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/tr/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/tr/blog/is-next-intl-outdated)

Referans belgeler:

- [Compat adapter: next-intl](https://intlayer.org/tr/doc/compatibility/next-intl)
- [Geçiş kılavuzu: next-intl'den Intlayer'a](https://intlayer.org/tr/doc/migration/next-intl)
- [Next.js benchmark raporu](https://intlayer.org/tr/doc/benchmark/nextjs) ve [TanStack Start benchmark raporu](https://intlayer.org/tr/doc/benchmark/tanstack)
- [Paket optimizasyonu](https://intlayer.org/tr/doc/concept/bundle-optimization) ve [Intlayer derleyicisi](https://intlayer.org/tr/doc/compiler)
- [Görsel Düzenleyici](https://intlayer.org/tr/doc/concept/editor), [CMS](https://intlayer.org/tr/doc/concept/cms) ve [Yapay Zeka Çevirisi](https://intlayer.org/tr/doc/concept/auto-fill)

## Sonuç

`@intlayer/next-intl` tek bir şey yapar: `useTranslations`'ın bağlandığı şeyi, her mesajı içeren bir provider'dan o bileşen için derlenmiş bir sözlüğe değiştirir. **sayfa başına 6 KB değerinde** aynı Next.js uygulamasında, **2,7x daha küçük bileşenler**, **%0 sızıntı** ve herhangi birinin bir bileşen dosyasını açmadan önce **2 ms hidrasyon** süresi. Navigation ve middleware, Intlayer'ın routing config'inin üstünde API'larını tutarlar ve native `next-intlayer` runtime'ı hala daha hafiftir.

Tüm ham veriler, test uygulamaları ve scriptler [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) bulunmaktadır. Kendiniz çalıştırın.

Daha fazla detay için ['Why Intlayer?' dokümantasyonuna](https://intlayer.org/doc/why) başvurun.
