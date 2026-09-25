---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer, Paraglide'dan daha mı hafif?
description: Paraglide, kodları doğrudan deponuza ürettiği için i18n kıyaslamalarında neredeyse sıfır maliyetli görünür. Bu boyutun gerçekte nereye gittiğini, düğüm başına dil çözümlemesinin neden maliyetli olduğunu ve Intlayer'ın dinamik yüklemesinin tüm diller yerine neden yalnızca tek bir dili istemciye gönderdiğini inceliyoruz.
keywords:
  - Paraglide
  - Intlayer
  - Uluslararasılaştırma
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer, Paraglide'dan daha mı hafif?

Evet.

`Paraglide`, piyasadaki en hafif i18n çözümü olarak haklı bir üne sahiptir ve ilk bakışta [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) sonuçları da bunu doğrular niteliktedir: kütüphane boyutu sıfıra yakındır. Ancak kütüphane boyutunun sıfır olması, istemciye sıfır bayt gönderildiği anlamına gelmez. Bu yalnızca baytların, söz konusu metriğin ölçmediği bir yerde barındığı anlamına gelir.

<TOC/>

## Önemli Çıkarımlar

**Kütüphane boyutu ortadan kalkmadı, yalnızca gizlendi:**

Paraglide, runtime ve mesaj fonksiyonlarını doğrudan kod tabanınızın içine üretir. Bu kod tarayıcıya gönderilir ancak kütüphanenin kodu olarak değil, _sizin_ kodunuz olarak sayılır.

**Provider kullanmamak bedava bir kazanım değildir:**

Her `m.my_key()` çağrısı dili kendi başına çözümler ve değeri bir context içinden tek seferde okumak yerine, render edilen her düğüm için çerezi veya depolama alanını ayrı ayrı okur.

**Dinamik yükleme desteği yoktur:**

Paraglide, bir mesajın tüm dillerini istemci paketinize dahil eder. Intlayer ise `importMode: 'dynamic'` veya `'fetch'` ile yalnızca o an görüntülenen dili yükler.

**Tree shaking her zaman garanti değildir:**

Bazı testlerimizde Paraglide'ın vadettiği tree shaking mekanizması devreye girmedi. Kendi bundle boyutunuzu mutlaka kontrol edin.

## Paraglide'ın Yükü Nereye Gidiyor?

Kıyaslama raporlarında "kütüphane boyutu" metriği, henüz hiçbir içerik eklenmeden önce boş bir bileşende her bir i18n kütüphanesinin provider ve hook boyutlarını ölçer.

| Kütüphane (TanStack Start)    | Kütüphane boyutu (gz) | Kütüphane boyutu (min) |
| ----------------------------- | --------------------- | ---------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB                | 4.5 KB                 |
| `react-intlayer@9.5.1`        | 5.0 KB                | 15.2 KB                |

Tek başına değerlendirildiğinde Paraglide kazanmış görünür. Ancak Paraglide bir derleyicidir: `messages/*.json` dosyalarınızı okur ve deponuza bir `paraglide/` klasörü yazar. Bu klasör bir `runtime.js` (dil tespiti, çerez ve depolama stratejileri, URL yerelleştirmesi) ve mesaj başına bir JavaScript fonksiyonu içerir.

```bash
src/paraglide/
├── runtime.js      # dil algılama, stratejiler, URL yardımcıları
├── server.js
├── messages.js     # tüm mesajları yeniden dışa aktarır
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Bu kod `src/` klasörünüzde yer aldığından ve göreli bir yolla içe aktarıldığından, paketleyici bunu `node_modules` paketine değil, uygulamanıza ait bir kod olarak kabul eder. Kütüphane boyutu sütunu neredeyse hiçbir şey göstermezken, aynı mantık sayfa bundle'ınız içinde gönderilmeye devam eder.

Kod üretmek kendi başına kötü bir fikir değildir: üretilen runtime yalnızca yapılandırmanızın ihtiyaç duyduğu mantığı içerir (ön ek stratejisi, çerez vs yerel depolama vb.). Intlayer aynı sonuca farklı bir yoldan ulaşır; derleme zamanında ortam değişkenleri enjekte eder, böylece paketleyici yapılandırmanızın kullanmadığı kod dallarını otomatik olarak eler. Her iki yaklaşım da `i18next` veya `next-intl` kütüphanelerine kıyasla 3 ila 10 kat daha hafiftir.

Dolayısıyla adil bir karşılaştırma kütüphane boyutu üzerinden yapılamaz. Karşılaştırma **sayfa başına gerçekte gönderilen JavaScript miktarı** üzerinden yapılmalıdır.

## Ölçülen Sayfa Boyutları

TanStack Start uygulaması, 10 sayfa, `en` ve `fr` rotalarında ölçülmüştür, gzip ile sıkıştırılmıştır:

| Yapılandırma                        | Sayfa JS ort (gz) | Temelin üzerinde | Dil sızıntısı | Diğer sayfa sızıntısı |
| ----------------------------------- | ----------------- | ---------------- | ------------- | --------------------- |
| Temel (i18n yok)                    | 111.0 KB          | -                | 0.0%          | 0.0%                  |
| `paraglide` (herhangi bir strateji) | 125.1 KB          | +14.1 KB         | 49.7%         | 0.0%                  |
| `intlayer` (`importMode: static`)   | 125.8 KB          | +14.8 KB         | 50.0%         | 0.0%                  |
| `intlayer` (`importMode: dynamic`)  | **118.6 KB**      | **+7.6 KB**      | **0.0%**      | **0.0%**              |

Next.js 16 App Router, aynı uygulama:

| Yapılandırma     | Sayfa JS ort (gz) | Temelin üzerinde |
| ---------------- | ----------------- | ---------------- |
| Temel (i18n yok) | 141.0 KB          | -                |
| `paraglide-next` | 155.3 KB          | +14.3 KB         |
| `next-intlayer`  | **141.3 KB**      | **+0.3 KB**      |

<I18nBenchmark framework="tanstack" vertical/>

> Tüm veriler [TanStack Start kıyaslama raporunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md) ve [Next.js kıyaslama raporunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md) incelenebilir. Her bir paket [kıyaslama deposunda](https://github.com/intlayer-org/benchmark-i18n) açıkça görülebilir.

İki önemli nokta öne çıkmaktadır:

- `static` modda Intlayer, Paraglide ile neredeyse aynı miktarda içerik gönderir (125.8 KB'a karşı 125.1 KB). Bu beklenen bir durumdur: her ikisi de bir sayfanın kullandığı mesajların tüm dillerini içerir.
- Paraglide, dinamik bir moda sahip olmadığı için hangi strateji seçilirse seçilsin 125.1 KB boyutunda kalır. Yukarıdaki tablodaki her satır statik duruma karşılık gelir.

## Provider Bulunmaması: İyi Görünen Ancak Maliyetli Bir Fikir

Paraglide bir provider gerektirmez. Bir mesajı içe aktarır ve doğrudan çağırırsınız:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Context yok, wrapper bileşen yok, hook yok. İlk bakışta daha basit görünür. Ancak dil bilgisinin yine de bir yerden okunması gerekir. Üretilen her mesaj fonksiyonu yaklaşık olarak şu şekildedir (basitleştirilmiş):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // her çağrıda tekrar çözümlenir

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...dil başına bir dal
};
```

Ve `getLocale()` fonksiyonu, geçerli dili belirlemek için yapılandırılmış stratejileri (çerez, yerel depolama, URL, varsayılan dil) baştan sona tarar. Dolayısıyla render ettiğiniz her metin düğümü (`<>{m.my_key()}</>`), tarayıcıda `document.cookie` okumak da dahil olmak üzere kendi dil çözümleme sürecini çalıştırır. 200 çevrilmiş dize içeren bir sayfa, render başına 200 kez dil tespiti yapar ve her yeniden render işleminde bu tekrarlanır.

Provider tabanlı bir kütüphane ise dili **yalnızca bir kez** okur, bir context'e (veya signal'e, ya da store'a) kaydeder ve her düğüm bellekte hazır bulunan değeri doğrudan okur. Bir provider'ın maliyeti yalnızca birkaç yüz bayttır. Ondan kaçınmak her render sırasında işlemciye ek yük getirir ve bu durum kıyaslamalara doğrudan yansır: Paraglide'ın sayfa yükleme ve dil değiştirme süreleri TanStack Start üzerinde Intlayer'ın belirgin şekilde gerisinde kalmaktadır (sayfa yüklemede 22.1 ms'ye karşı 14.6 ms, uçtan uca reaktivitede 4.3 ms'ye karşı 3.2 ms).

## Geliştirici Deneyimi (DX)

Paraglide'ın asıl veri kaynağı JSON'dur, ancak JSON dosyalarını doğrudan içe aktarmazsınız. Derleyicinin ürettiği `.js` dosyasını içe aktarırsınız:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/tr.json"
{
  "hero_title": "Uygulamanızı tüm dillerde yayınlayın"
}
```

```tsx fileName="Hero.tsx"
// Yalnızca derleyici dosyayı JSON'dan yeniden ürettikten sonra erişilebilir
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      tr: "Uygulamanızı tüm dillerde yayınlayın",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Bu geliştirme döngüsü bazı zorluklar barındırır:

- Bir JSON dosyasındaki her değişiklik, import'un çözümlenmesi veya tiplerin güncellenmesi için önceden yeniden derleme gerektirir.
- Üretilen `paraglide/` klasörü ya git'e dahil edilmeli (bu da metin değiştiren her PR'da çakışmalara yol açar) ya da yok sayılmalıdır (bu da her tip denetimi, test ve CI adımı öncesinde zorunlu bir üretim adımı anlamına gelir).
- Her metin bir fonksiyon çağrısına dönüşür. Sabit değerler, düz bir dizenin yeterli olacağı yerler de dahil olmak üzere her yerde `m.key()` biçimini alır.

## Tree Shaking: Kendi Paketlerinizi İnceleyin

Paraglide'ın en büyük iddiası, her iletinin bağımsız bir dışa aktarma olması sebebiyle kullanılmayan mesajların tree shaking ile elenmesidir. Svelte + Vite ortamında bu vaat başarıyla çalışır.

Ancak diğer ortamlarda durum böyle olmadı. [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md) testlerimizde Paraglide sayfaları temel uygulamadan 14 KB daha ağır çıkarken, `next-intlayer` yalnızca 0.3 KB eklemiştir. TanStack Start üzerindeki önceki çalışmalar da diğer sayfaların mesajlarının mevcut rota paketine sızdığını göstermiştir.

Tree shaking başarısı paketleyicinize (Turbopack, Rolldown, Rollup), mesajların içe aktarılma biçimine (`import { m }` vs `import * as m`) ve yan etki analizine sıkı sıkıya bağlıdır. Paraglide'ı boyutu nedeniyle tercih ediyorsanız, paket analiz aracınızı açıp uygulamanızda durumun gerçekten böyle olup olmadığını test edin.

## Dinamik Yükleme Eksikliği

Yapısal olarak en büyük sınır budur. Paraglide'ın dilleri teker teker yüklemek için bir yöntemi yoktur: her mesaj fonksiyonu tüm dillerin uygulamasını statik olarak içe aktarır, bu nedenle tüm diller istemci paketinize dahil olur.

2 dilli bir projede çeviri verilerinizin yarısı boşa harcanır ve bu durum yukarıda ölçülen ~%50 dil sızıntısıyla örtüşür. 10 dilde bu oran %90'a, 30 dilde ise %97'ye ulaşır.

Dinamik yüklemeye geçmek de bu sorunu çözmez: mesaj başına tek bir fonksiyon varken her fonksiyonu tembel (lazy) yüklemek binlerce ağ isteği anlamına gelir.

Intlayer, genel olarak veya sözlük bazında seçim yapmanıza olanak tanır:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | İstemciye gönderilen içerik                            | Paraglide ile kıyaslandığında    |
| ------------ | ------------------------------------------------------ | -------------------------------- |
| `static`     | Sayfanın kullandığı sözlüklerin tüm dilleri            | Teorik olarak aynı içerik boyutu |
| `dynamic`    | Yalnızca mevcut dil, sözlük başına dinamik yüklenir    | N dilde **N kat daha hafif**     |
| `fetch`      | Yalnızca mevcut dil, Live Sync API üzerinden getirilir | N dilde **N kat daha hafif**     |

[Derleme optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve `importMode: 'static'` moduyla Intlayer, teoride Paraglide ile tamamen aynı içeriği yükler. `'dynamic'` veya `'fetch'` kullanıldığında ise yalnızca mevcut dilin ihtiyaç duyduğu veriyi yükler: N dile sahip bir uygulama için çeviri yükü Paraglide'a göre N kat daha küçüktür.

## Paraglide Hangi Durumlarda Hala Mantıklıdır?

<AccordionGroup>
<Accordion header="Az sayıda dile sahip Svelte + Vite projeleri">

Eğer altyapınız Svelte ve Vite üzerine kuruluysa ve yalnızca iki veya üç dili destekliyorsanız, tree shaking vadedildiği gibi çalışır ve ek dil maliyeti düşük kalır.

</Accordion>
<Accordion header="Mevcut inlang iş akışları">

Ekibiniz halihazırda inlang ekosistemini (Fink, Sherlock, mesaj biçimi eklentileri) kullanıyorsa, Paraglide bu yapıya yerel olarak entegre olur.

</Accordion>
</AccordionGroup>

## Kendi Uygulamanızda Deneyin

Canlı uygulamanızın transfer boyutunu ve dil sızıntılarını ücretsiz [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) ile test edin:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Intlayer kurulumu için:

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

## Ek Kaynaklar

- [TanStack Start i18n Kıyaslaması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/tanstack.md)
- [Next.js i18n Kıyaslaması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/nextjs.md)
- [Paket Optimizasyonu ve `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [React İçin Doğru i18n Kütüphanesi Nasıl Seçilir?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_react_i18n_library.md)
- [Derleyici Tabanlı ve Bildirimsel Uluslararasılaştırma Kıyaslaması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
