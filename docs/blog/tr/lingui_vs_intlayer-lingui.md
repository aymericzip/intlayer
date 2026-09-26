---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "Lingui vs @intlayer/lingui: Aynı Makrolar, Farklı Çalışma Zamanı"
description: "Bir React uygulaması Lingui makrolarını korurken bunları @intlayer/lingui uyumluluk adaptörü aracılığıyla sunduğunda ne değişir? Bileşen boyutu, hidrasyon, sızıntı ve sayfa başına JavaScript miktarı aynı TanStack Start kodunda ölçüldü; adaptörün geride kaldığı noktalar dahil."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Uyumluluk adaptörü
  - Migrasyon
  - Uluslararasılaşma
  - i18n
  - Benchmark
  - Paket boyutu
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Aynı Makrolar, Farklı Çalışma Zamanı

`@intlayer/lingui`, `@lingui/core` ve `@lingui/react` için bir uyumluluk adaptörüdür (compat adapter). `` t`...` ``, `<Trans>`, `useLingui()` ve `i18n._()` çağrılarınız tamamen aynı kalır; makrolar normal şekilde derlenmeye devam eder; değişen tek şey, çalışma zamanında (runtime) mesajların nereden geldiğidir. Dil başına tek bir derlenmiş katalog yerine, her çağrı noktası özel olarak kendisi için derlenmiş bir Intlayer sözlüğüne bağlanır.

Bu makale, aynı TanStack Start uygulaması üzerinde bu değişimi ölçmektedir: biri saf Lingui ile, diğeri adaptör ile inşa edilmiştir. Veriler [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) deposundan alınmıştır. İki kütüphanenin doğrudan karşılaştırması için [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md) yazısını okuyabilirsiniz. Bu yazı ise adaptörün neleri değiştirdiği ve nerede avantaj sağlamadığı üzerinedir.

<TOC/>

> **Özet (tl;dr)**: Aynı TanStack Start uygulamasında `@intlayer/lingui`, makrolara dokunmadan ortalama bileşen boyutunu gzip olarak **85.5 KB'tan 12.8 KB'a**, hidrasyon süresini **28 ms'den 19.7 ms'ye** ve dil değişimini **5.9 ms'den 2.9 ms'ye** düşürdü. Basit kurulumda (her kataloğun baştan yüklendiği durum) ayrıca **%90 sayfa sızıntısını** ortadan kaldırdı ve sayfa başına 12 KB tasarruf sağladı. Ancak tembel yüklemeli (lazy-loaded) kurulumda saf Lingui'nin 115 KB'lık değerine kıyasla **sayfa başına 137 KB** gönderir: Adaptör ICU sözdizimini çalışma zamanında çözümlerken Lingui önceden derlenmiş belirteç (token) dizileri sunar. Kaynak dil sızıntısı (~%9-10), çalışma zamanından değil bileşenlere gömülü `message` yedeğinden kaynaklandığı için iki tarafta da aynıdır. Adaptör bir Vite eklentisidir ve TanStack Start üzerinde ölçülmüştür.

## `@intlayer/lingui` nedir

Lingui bir derleyici ve bir çalışma zamanından oluşur. Kaynak kodunuzdaki makrolar her dil için bir `.po` (veya JSON) kataloğuna çıkarılır, dil başına bir JS modülüne derlenir ve `i18n.load()` + `i18n.activate()` aracılığıyla genel bir `I18n` örneğine yüklenir. Her `useLingui()` bu örneğe abone olur; her `_()` çağrısı etkin katalogda kendi kimliğini arar.

`@intlayer/lingui` makroları ve API'yi korur, katalog arama mantığını değiştirir:

1. **İçe aktarma takma adlandırması (Import aliasing).** `@intlayer/lingui/plugin` içindeki `lingui()` eklentisi `vite-intlayer`'ı sarmalar ve `@lingui/core` ile `@lingui/react`'in `@intlayer/lingui`'ye yönlenmesi için `resolve.alias` girdileri ekler. İçe aktarma kodlarınız değişmez.
2. **Tek doğruluk kaynağı olarak kataloglar.** `syncJSON` eklentisi (`.po` dosyaları için `syncPO`), mevcut kataloglarınızı okuyarak Intlayer sözlüklerine dönüştürür ve CLI veya CMS güncelleme yaptığında çevirileri dosyalara geri yazar. `splitKeys: "key-prefix"` ile noktalı kimliklerin (`footer.github`, `hero.title`) düz kataloğu, 244 KB'lık tek bir dosya yerine önek başına küçük sözlüklere bölünür.
3. **Çağrı noktası bağlama (Call-site binding).** Intlayer optimizasyon adımı, her dosyada `_`, `t` ve `<Trans>`'a iletilen kimlikleri toplar ve bileşene yalnızca eşleşen sözlükleri teslim eder. `<Trans id="hero.title">` bağımsız olarak bağlanır; `useLingui()` dosyada kullanılan tüm öneklere bağlanır. Nokta içermeyen kimlikler (karma kimlikler, `mockBanner`), Lingui'nin tek `messages` yedek sözlüğüne yönlendirilir.

```tsx fileName="src/components/Hero.tsx"
// Kodunuz, değişmeden kalır
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Derleyicinin ürettiği kod (basitleştirilmiş)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Bileşen artık genel örneğe ve arkasındaki monolitik kataloğa erişmez. Yalnızca `hero` sözlüğüne erişir. Aşağıdaki tabloda bileşen boyutu sütununun 7 kat düşmesinin temel nedeni budur.

## Adaptörün koruduğu, yoksaydığı ve değiştirmediği özellikler

| Lingui API                                                   | `@intlayer/lingui` ile                                                                                                      |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` makroları | ✅ Korunur. Intlayer adımından önce derleme sürecinde `@lingui/babel-plugin-lingui-macro` veya `@lingui/swc-plugin`'i tutun |
| `useLingui()` → `{ i18n, _, t }`                             | ✅ Korunur. Provider dışında da çalışır (dil bilgisi `react-intlayer`'dan türetilir)                                        |
| `i18n._(id, values)`, `i18n.t()`                             | ✅ Korunur. Hem açık hem karma kimlikleri çözer                                                                             |
| ICU çoğul ekleri, `select`, `selectordinal`, `#`             | ✅ Korunur, Intlayer'ın ICU çözümleyicisi aracılığıyla                                                                      |
| `i18n.date()`, `i18n.number()`, `formats`                    | ✅ Korunur, yerel `Intl` motoruyla desteklenir                                                                              |
| `I18nProvider`                                               | ✅ Korunur. `IntlayerProvider`'ı sarmalar; `activate()` ile yeniden render için `i18n.on("change")` dinler                  |
| `i18n.activate(locale)`                                      | ✅ Korunur                                                                                                                  |
| `i18n.load(locale, messages)` / `loadAndActivate()`          | ⚠️ **Çalışma zamanı yedeği** olarak kabul edilir. Derlenmiş sözlükler önceliklidir; geliştirici uyarısı verir               |
| `setupI18n({ messages, missing })`                           | ⚠️ `messages` yedek olarak birleştirilir; `missing` yoksayılır                                                              |
| `lingui extract` / `lingui compile`                          | ✅ Mevcut iş akışınız aynen sürer. `syncPO` / `syncJSON`'u çıkarılan kataloglara yönlendirin                                |
| `I18nProvider` üzerindeki `defaultComponent`                 | ⚠️ Bağlamda saklanır ancak render sırasında uygulanmaz                                                                      |
| Next.js                                                      | ❌ Eklenti `vite-intlayer`'ı sarmalar. Yalnızca Vite, TanStack Start ve React Router desteklenir                            |

## Benchmark karşılaştırması

### Neler ölçüldü

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) test paketi, her yapılandırmada **aynı uygulamayı** derler: **10 sayfa** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 dil** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), aynı bileşenler ve aynı içerik. Sayfalar `en` ve `fr` dillerinde ölçülmüştür.

Lingui dört yükleme stratejisiyle test edildi: Derlenmiş tüm katalogların baştan içe aktarıldığı yapıdan (`static`), rota başına katalogların tembel yüklendiği yapıya (`scoped-dynamic`) kadar. Adaptör ise **aynı bileşenler** üzerinde, yalnızca `vite.config.ts` ve `intlayer.config.ts` dosyaları değiştirilerek çalıştırıldı. `static` satırı tüm dilleri paketler; `dynamic` satırı (`importMode: 'dynamic'`) etkin dili isteğe bağlı olarak yükler. "Scoped" varyantı yoktur: Optimizasyon adımı çağrı noktası bazında otomatik kapsam oluşturur.

Her derleme için şu metrikler kaydedilir:

- **Lib size**: Yalnızca i18n kütüphanesini içe aktaran boş bir bileşenin gzip boyutu.
- **Page JS**: Tüm sayfalar ve diller üzerinden ortalaması alınan, sayfa başına indirilen gzip JavaScript boyutu.
- **Locale leak %**: İndirilen JS içindeki, kullanıcının o an görüntülemediği dillere ait çevirilerin oranı.
- **Page leak %**: İndirilen JS içindeki, kullanıcının o an bulunmadığı sayfalara ait çevirilerin oranı.
- **Component avg**: İzole biçimde derlenen her bir bileşenin ortalama gzip boyutu.
- **E2E reactivity**: Yeni bir dil seçimi ile DOM'daki `html[lang]` etiketinin güncellenmesi arasındaki gerçek süre (Playwright, 5 tekrar).
- **Hydration**: React hidrasyon aşamasının süresi.

> Aşağıdaki veriler `@lingui/react` 6.6.0 ve `@intlayer/lingui` 9.5.1 ile **2026-09-12** tarihindeki çalıştırmadan alınmıştır. Test uygulaması bilinçli olarak küçük tutulmuştur (dil başına birkaç düzine metin); bu nedenle sızıntı yüzdeleri **yapısal bir örüntüyü** yansıtır: İçerik büyüdükçe artar, çalışma zamanı maliyeti ise sabit kalır.

### TanStack Start üzerindeki sonuçlar

| Yapılandırma           | Strateji       | Lib boyutu (gz) | Sayfa JS ort (gz) | Dil sızıntısı | Sayfa sızıntısı | Bileşen ort (gz) |  E2E tepki |   Hidrasyon |
| ---------------------- | -------------- | --------------: | ----------------: | ------------: | --------------: | ---------------: | ---------: | ----------: |
| **taban** (i18n yok)   | -              |          0.0 KB |          111.0 KB |          0.0% |            0.0% |           0.7 KB |     8.1 ms |     21.6 ms |
| Lingui                 | static         |         11.2 KB |          152.2 KB |         50.0% |           90.0% |          58.0 KB |     3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |         11.2 KB |      **115.2 KB** |          9.3% |            0.0% |          85.5 KB |     5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |         11.2 KB |          120.8 KB |          4.0% |            0.0% |         147.9 KB |     7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |         11.2 KB |          120.2 KB |          8.6% |            0.0% |          83.7 KB |    42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         |     **10.3 KB** |          140.5 KB |         50.0% |        **0.0%** |      **14.9 KB** | **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        |     **10.3 KB** |          137.0 KB |          9.9% |        **0.0%** |      **12.8 KB** | **2.9 ms** | **19.7 ms** |
| `intlayer` (yerel)     | static         |          5.0 KB |          125.8 KB |         50.0% |            0.0% |           8.1 KB |     3.2 ms |     11.5 ms |
| `intlayer` (yerel)     | dynamic        |          5.0 KB |          118.6 KB |          0.0% |            0.0% |           6.3 KB |     3.6 ms |     14.1 ms |

**Sonuçların analizi**

- **Bileşenler: 7 kat daha küçük.** Adaptörün ana etkisi budur. Bağımsız olarak derlenen bir Lingui bileşeni, stratejiye bağlı olarak ortalama **58-148 KB** tutar; çünkü `useLingui()` genel örneğe ve ona yüklenen her kataloğa ulaşır. Adaptörlü aynı bileşen ortalama yalnızca **12.8-14.9 KB** tutar: Yalnızca kendi sözlüklerine ve ICU çözümleyicisine erişir.
- **Hidrasyon: 8-14 ms daha hızlı.** `i18n.load()` + `i18n.activate()` React hidrasyonundan önce istemcide çalışır; Lingui yapılandırması ne kadar tembel yüklemeliyse bu işlem o kadar uzar (28-34 ms). Adaptörde ise sözlükler, paketleyicinin sayfa parçasına önceden yerleştirdiği sıradan içe aktarmalar olarak gelir: `static` modda **11.3 ms**, `dynamic` modda **19.7 ms**.
- **Dil değiştirme: 2 kat daha hızlı ve takılma yok.** Lingui'nin optimize edilmiş `scoped-dynamic` kurulumu, rota kataloğu getirilip etkinleştirilene kadar ekran güncellenemediğinden `html[lang]` değişimini **42 ms**'de tamamlar. Adaptör her iki modda da istikrarlı şekilde **2.9-3.3 ms** seviyesindedir.
- **Basit kurulum otomatik olarak iyileşir.** Statik Lingui her sayfada tüm katalogları taşır: 152.2 KB ve %90 sayfa sızıntısı. Statik adaptör: 140.5 KB, %0 sayfa sızıntısı, aynı bileşenlerle.
- **Sayfa başına bayt: `dynamic` modda Lingui 22 KB ile öndedir.** Bu nokta dürüstçe değerlendirilmelidir. Lingui, derleme anında mesajları belirteç dizilerine dönüştürür ve yalnızca bunları gezen 11 KB'lık hafif bir çalışma zamanı gönderir. Adaptör ise Intlayer'ın ICU çözümleyicisini (yerel yapıya göre yaklaşık 15 KB daha fazla `@intlayer/core`), adaptör katmanını (~10 KB) ve `react-intlayer`'ı (~6 KB) taşır. Bu uygulamada sonuç **137.0 KB'a karşı 115.2 KB**'tır. Tek önceliğiniz sayfa başına asgari bayt ise ve zaten tembel yüklemeli Lingui kullanıyorsanız, adaptör bu metriğe katkı sağlamaz.
- **Dil sızıntısı iki tarafta da benzerdir.** `dynamic` modda Lingui %9.3, adaptör %9.9'dur. Bu durum bileşenlerin kendi kodundan kaynaklanır: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` çağrısı yedek İngilizce metni taşır ve message alanı ayıklanmadıkça makro çıktısı da aynı şeyi yapar. Bu İngilizce metin, çeviriyi hangi çalışma zamanı sağlarsa sağlasın `fr` parçasına girer. Satır içi kaynak barındırmayan yerel Intlayer (`.content.ts`) ise tam %0'dır.

## Sayılar neden değişiyor ve biri neden sabit kalıyor

Bu sonuçları iki faktör belirler: **Bileşenin neye bağlandığı** ve **mesajların hangi biçimde taşındığı**.

**Bağlama mantığı.** Lingui'de temel bölme birimi dildir. `fr` için `messages.mjs` tek bir modüldür; onu yükleyen örneği içe aktaran her bileşen tüm içeriğe erişebilir, bu yüzden paketleyici dil seviyesinin altına inip bölme yapamaz. Adaptörde ise birim çağrı noktasıdır: `hero` ve `footer` bağımsız içe aktarmalardır; bileşen bazında bölünür ve talep üzerine yüklenir. Bileşen boyutu, hidrasyon ve sayfa sızıntısı iyileşmesi buradan doğar.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compile çıktısı, dil başına bir adet
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # üretilen: dil başına, kimlik öneki başına bir sözlük
└── src
    ├── locales
    │   ├── en/messages.json             # değişmedi, tek doğruluk kaynağı olmaya devam ediyor
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← değişmedi
```

**Mesaj biçimi.** Lingui'nin derleme adımı `{count, plural, one {# item} other {# items}}` ifadesini bir belirteç dizisine dönüştürür; çalışma zamanı hiçbir zaman ICU sözdizimini ayrıştırmaz. Adaptör ise mesajı metin olarak tutar ve Intlayer'ın ICU çözümleyicisiyle ayrıştırır. Bu, sayfa başına bir kez ödenen yaklaşık 15 KB'lık sabit bir ek yüktür ve `dynamic` satırının diğer tüm alanlarda kazanırken toplam bayt boyutunda geride kalmasının nedenidir. Yerel Intlayer bundan kaçınır; çünkü `.content.ts` sözlükleri derleyicinin önceden çözümlediği `enu()` / `insert()` düğümlerini kullanır.

## Üç adımda geçiş

<Steps>
<Step number={1} title="Yükleme">

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

Bu komut Lingui'yi tespit eder, `lingui.config.ts` dosyasını okuyarak `syncPO` (`.po` katalogları) veya `syncJSON` (JSON katalogları) seçimini yapar, `intlayer`, `react-intlayer`, `@intlayer/lingui` ve uygun senkronizasyon eklentisini kurar ve `vite.config.ts` içindeki `@lingui/vite-plugin`'i adaptör eklentisiyle değiştirir. `@lingui/core`, `@lingui/react` ve makro eklentinizi kurulu tutun: Makrolar derlenmeye devam eder ve adaptör Lingui'nin tiplerini kullanır.

</Step>
<Step number={2} title="Intlayer'ı kataloglarınıza bağlama">

JSON katalogları için (`lingui.config.ts` içinde `format: "minimal"` olduğunda):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Noktalı kimlikleri ilk segmentlerine göre grupla: `footer.github` → `footer` sözlüğü
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

`.po` katalogları için, `syncJSON` yerine `@intlayer/sync-po-plugin`'den `syncPO` kullanın ve `.po` uzantılı aynı `source` desenini uygulayın. [Sync PO eklenti belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) göz atabilirsiniz.

`splitKeys: "key-prefix"` bileşen boyutunu dramatik şekilde küçülten temel unsurdur. Katalog dosyası düz yapısını korur; bölme yalnızca üretilen sözlüklerde var olur ve geri yazma işlemi anahtarları otomatik olarak yeniden birleştirir.

</Step>
<Step number={3} title="Eklentiyi ekleme">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Makro eklentinizi koruyun; Intlayer adımından önce çalışmalıdır
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` eklentisi `vite-intlayer`'ı (içerik izleme, sözlük derleme, optimizasyon adımı) sarmalar ve `@lingui/core` ile `@lingui/react`'i adaptöre takma adlandırır. Projeyi derleyin ve ölçülen kazanımları hemen elde edin.

</Step>
</Steps>

### Sonrasında silebilecekleriniz

| Dosya / kalıp                                        | Neden                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Sözlükler doğrudan kullanan bileşenler tarafından içe aktarılır. `i18n.load()` yedeğe dönüşür |
| `i18n.load()` / `i18n.loadAndActivate()`             | `i18n.activate(locale)` kalsın; elle katalog yükleme kodlarını kaldırın                       |
| Derleme betiğindeki `lingui compile`                 | Yalnızca JSON veya `.po` dosyalarını kaynak olarak kullanıp derlenmiş modülleri almıyorsanız  |

### Bayt tasarrufu dışındaki kazanımlar

- **Eksik çevirilerin tespiti.** `npx intlayer test`, bir dilde eksik anahtar varsa CI derlemesini durdurur; `lingui extract` yalnızca istatistik raporlar.
- **`npx intlayer fill` ile otomatik doldurma.** Eksik çevirileri tercih ettiğiniz yapay zeka sağlayıcısı (OpenAI, Anthropic, Mistral, Gemini...) ile tamamlar ve kataloglarınıza geri kaydeder.
- **Görsel Düzenleyici ve CMS.** Aynı sözlükler üzerinde çalışır; teknik bilgisi olmayan ekip üyeleri bile arayüz üzerinden `.po` ve JSON dosyalarını düzenleyebilir.
- **`.content.ts` formatına kademeli geçiş.** İstediğiniz bir bileşeni dilediğiniz zaman `useLingui()`'den yanındaki içerik dosyasıyla `useIntlayer("hero")`'ya geçirebilirsiniz. İki sözlük türü sorunsuz biçimde bir arada çalışır.

## Başlamadan önce bilinmesi gereken sınırlar

- **`dynamic` moddaki sayfa başı maliyet.** Yukarıda belirtildiği gibi: Küçük bir uygulamada tembel yüklemeli Lingui kurulumuna kıyasla sayfa başına yaklaşık +20 KB beklenmelidir. Bu fark içerik arttıkça büyümez (kataloglardan değil çözümleyiciden kaynaklanır) ancak küçülmez de.
- **Kaynak dil sızıntısı devam eder.** Mesaj tanımlayıcıları ve makro çıktıları yedek olarak orijinal İngilizce metni içerir. Bunu tamamen ortadan kaldırmak için `message` alanını temizlemek veya bileşeni `.content.ts`'ye taşımak gerekir.
- **`i18n.load()` yalnızca bir yedektir.** Derlenmiş katalogları içe aktarmaya ve `load()` çağırmaya devam ederseniz hem eski hem yeni paketi yüklersiniz. Bu içe aktarmaları kaldırın.
- **Yalnızca Vite.** `@intlayer/lingui` için Next.js eklentisi yoktur. Lingui kullanan Next.js projeleri doğrudan [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md) seçeneğini değerlendirmelidir.
- **`defaultComponent` uygulanmaz.** Her `<Trans>` etiketini otomatik sarmalamak için bu özelliğe güveniyorsanız bileşenlerinizde sarmalayıcıyı açıkça ekleyin.

## Hangisi ne zaman tercih edilmeli?

- **Lingui'de kalın**: Zaten `scoped-dynamic` mimarisini oturttuysanız, tek hedefiniz sayfa başına asgari bayt ise ve 42 ms'lik dil değişimi ile 30 ms'lik hidrasyon uygulamanız için uygunsa.
- **`@intlayer/lingui` kullanın**: Halihazırda Lingui kullanıyorsanız ve makrolara dokunmadan daha hafif bileşenler, hızlı hidrasyon ve dil değişimi, basit kurulumda %0 sayfa sızıntısı, tiplenmiş kimlikler, CI doğrulaması ve yapay zeka çevirisi istiyorsanız. Mevcut Lingui projeleri için ideal geçiş köprüsüdür.
- **Yerel Intlayer'a (`react-intlayer`) geçin**: Bileşenlerinizi kapsamlı biçimde elden geçirmeye başladığınızda. Karşılaştırma tablosunda **%0 dil sızıntısı**, 5 KB çalışma zamanı ve temel uygulamaya kıyasla yalnızca +7.6 KB sayfa başı fark sunan tek çözümdür.

## İlgili karşılaştırmalar

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/lingui_vs_intlayer.md) (aynı benchmark üzerinde doğrudan kütüphane karşılaştırması)
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/next-intl_vs_intlayer-next-intl.md) (adaptör serisi karşılaştırması)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18next_vs_intlayer-i18next.md) (adaptör serisi karşılaştırması)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/vue-i18n_vs_intlayer-vue-i18n.md) (adaptör serisi karşılaştırması)
- [Uyumluluk adaptörü kılavuzu: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/lingui.md)
- [Derleyici tabanlı vs bildirimsel i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)

## Sonuç

`@intlayer/lingui`, Lingui çağrı noktalarının bağlandığı kaynağı kökten yeniler: Genel örnek ve devasa tekil dil kataloğu yerine, doğrudan o bileşene özel derlenmiş sözlüğe bağlanır. Aynı TanStack Start uygulamasında bu, hiçbir makroya dokunmadan **7 kat daha küçük bileşenler**, **8-14 ms daha hızlı hidrasyon**, **2 kat daha hızlı dil değişimi** ve 42 ms'lik gecikmenin ortadan kalkması anlamına gelir. Bileşenlerdeki yerleşik yedek metinleri değiştirmediği için kaynak dil sızıntısı sürer ve çalışma zamanında ICU ayrıştırdığı için dinamik modda saf Lingui'ye kıyasla sayfa başına yaklaşık 20 KB daha fazla veri gönderir. Tercihinizi yaparken uygulamanızın performans hedeflerini dikkate alın.

Tüm ham veriler, test uygulamaları ve kıyaslama betikleri [Benchmark Bloom deposunda](https://github.com/intlayer-org/benchmark-bloom) mevcuttur. Kendiniz de çalıştırabilirsiniz.

Daha fazla ayrıntı için ['Neden Intlayer?' dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) göz atabilirsiniz.
