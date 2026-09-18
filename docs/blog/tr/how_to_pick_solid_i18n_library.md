---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026'da Doğru Solid i18n Kütüphanesini Seçme Rehberi"
description: SolidJS ve SolidStart uluslararasılaştırması için bir karar rehberi. @solid-primitives/i18n, solid-i18next, Paraglide, Lingui ve Intlayer'ı karşılaştırmadan önce yanıtlanması gereken sorular ve her seçeneğin reaktivite, bundle boyutu ve typing açısından maliyetleri.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid uluslararasılaştırma
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n kütüphane karşılaştırması
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Doğru Solid i18n kütüphanesi nasıl seçilir

Solid'in reaktivite modeli, bir i18n kütüphanesinin yapması gerekenleri değiştirir. Bileşenler yalnızca bir kez çalışır; bu nedenle setup aşamasında bir `const` içinde saklanan bir çeviri donmuş bir string (frozen string) haline gelir. Size accessor yerine string veren bir kütüphane, birinin bu hatayı yaptığı üç bileşen haricinde her yerde dil değiştiren bir sayfa üretir. Solid için bir kütüphane seçmek kısmen API ile, kısmen de hangisinin bu hatayı yapmayı zorlaştırdığıyla ilgilidir.

Bu rehber, önce yanıtlanması gereken soruları listeler, ardından bunları Vite + Solid ve SolidStart için `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` ve Intlayer ile eşleştirir.

![Solid i18n kütüphane ekosistemi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## İçindekiler

<TOC/>

## Kütüphaneleri karşılaştırmadan önce yanıtlanması gereken altı soru

1. **Vite SPA mı yoksa SolidStart mı?** Bir SPA'da locale yalnızca bir signal içinde yaşayabilir ve başka hiçbir şeye ihtiyaç duymaz. SolidStart'ta ise locale'in sunucuda URL'den çözümlenmesi gerekir ve bir crawler'ın JavaScript olmadan görmesi gereken her şey (`<html lang>`, `hreflang`) `entry-server.tsx` dosyasında yer almalıdır.
2. **Locale değişikliğinin ne kadar reaktif olması gerekiyor?** Dil değişiminde tam sayfa yenilenmesi bazı uygulamalar için kabul edilebilirdir. Eğer değilse, kütüphanenin değerleri signal veya accessor olmalı ve bunların okunması kopyalanmak yerine track edilmelidir.
3. **Çevirileri kim yazıyor?** Geliştiriciler, bir TMS, ICU string'leri teslim eden bir ajans veya bir AI pipeline'ı. `solid-i18next` i18next'in formatını kullanır. `@solid-primitives/i18n` sözlük nesneniz neyse odur. Tercihinizi kaynağınıza göre belirleyin.
4. **Kaç locale ve sayfa var?** İki locale ve beş sayfa her şeyi tek seferde sunabilir. On locale ve kırk route bunu sunamaz; bu durumda lazy catalog'lar ve scoping ana maliyet haline gelir.
5. **Key'lerde type güvenliğine ihtiyacınız var mı?** `@solid-primitives/i18n` bunları kaynak sözlükten infer eder. `solid-i18next` manuel tanımlama gerektirir. Compile-time kütüphaneleri ise bunları otomatik olarak üretir (generate eder).
6. **Ne kadar özellik kapsamına ihtiyacınız var?** Cookie yönetimi, locale önekli (locale-prefixed) routing, redirect'ler, formatter'lar. En hafif seçenekte bunların hiçbiri yoktur ve yetersiz kalana kadar bu durum gayet iyidir.

Yanıtları bir yere not edin. Aşağıdaki her şey bunlara atıfta bulunacaktır.

## Tek bir resimde genel görünüm

Solid buradaki en genç ekosistemdir ve üç dalgaya yayılmış en az seçeneğe sahiptir.

![JavaScript i18n kütüphanelerinin tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime sözlükleri: solid-i18next">

Solid için sarmalanmış (wrapped) i18next. Namespace'ler, backend'ler, detector'lar ve on yıllık eklenti birikimi. Grubun en ağırı ve React'tekiyle aynı `t("a.b")` maliyetlerine sahip.

</Accordion>
<Accordion header="Minimal primitive'ler (2022): @solid-primitives/i18n">

Sizin kontrolünüzde olan düz (flat) bir sözlük, accessor'lar döndüren bir `translator()`, kaynak nesneden infer edilen type'lar. Oldukça küçük, scoping yok, routing yok, formatter yok. Topluluğun varsayılan tercihi.

</Accordion>
<Accordion header="Derleyici ve birlikte konumlandırılmış (colocated) içerik (2024 - 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide mesaj başına bir fonksiyon üretir. Intlayer, içeriği `.content.ts` dosyalarında bileşen başına tanımlar ve signal destekli node'lar döndürür. Lingui'nin Solid desteği 2026'da geldi ve makro tabanlı ayıklama (extraction) özelliğini beraberinde getirir.

</Accordion>
</AccordionGroup>

[JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) her dalgayı ayrıntılı olarak ele alır.

## En önemli karar: İçerik nerede yaşar ve ne zaman yüklenir

Kurulumlar arasındaki bundle farkının çoğunu iki yapısal tercih açıklar:

- **Merkezi veya kapsamlandırılmış (scoped) içerik.** Uygulama için tek bir sözlük ya da bileşen başına bir tanımlama.
- **Statik veya dinamik import.** Başlangıçta her şeyi yükleme ya da aktif locale'i (ve ideal olarak aktif route'u) isteğe bağlı (on demand) getirme.

Grafik, sayfa başına yaklaşık 30 KB metin içeren, 1 ila 10 locale'e çevrilmiş 1 ila 10 sayfalık teorik bir uygulama için payload tahminini göstermektedir.

![Mimariye göre teorik içerik sızıntısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` her iki eksende de hiçbir şey yapmaz: locale başına bir sözlüğü `createResource` ile yüklersiniz; bu size dinamik yükleme sağlar, gerisi size kalır. `solid-i18next` namespace'lere ve lazy backend'lere sahiptir, ancak eşlemeyi zorunlu kılan hiçbir şey yoktur; bu nedenle `common` import eden paylaşılan bir bileşen, onu her route'un bir bağımlılığı haline getirir. Paraglide, sayfa eksenini tree-shaking ile çözer; ancak bu durum [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/solid.md) uygulamasında etkili olmadı. Intlayer ise bunu bileşen başına tanımlamalarla sağlar.

4. soruya yanıtınız "çok sayıda sayfa" ise, bu bölüme herhangi bir API tercihinden daha fazla önem verin. [Bileşen başına ve merkezi i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) yazısı, aynı trade-off'un bakım boyutunu ele almaktadır.

## Adaylar

Kütüphane boyutları [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/solid.md) çalışmasından alınmıştır: 10 sayfalık, 10 locale'e sahip bir uygulamada; bundling, tree-shaking ve minification sonrasında boş bir bileşendeki provider artı accessor. İçerik ayrıca ölçülür.

| Kütüphane                | İçerik modeli                                 | Locale değişiminde reaktivite                         | Tip güvenliği                                      | Scoping ve lazy loading             | Kütüphane boyutu                                    |
| :----------------------- | :-------------------------------------------- | :---------------------------------------------------- | :------------------------------------------------- | :---------------------------------- | :-------------------------------------------------- |
| `@solid-primitives/i18n` | Size ait düz sözlük                           | Signal, translator tarafından döndürülen accessor'lar | 3/5 — Kaynak sözlükten infer edilir                | Yerleşik olarak yok                 | ~0.6 kB                                             |
| `solid-i18next`          | i18next katalogları ve namespace'leri         | Store, provider üzerinden re-render                   | 2/5 — Manuel tanımlama                             | Namespace'ler, lazy backend'ler     | ~14.9 kB                                            |
| Paraglide                | inlang projesi, üretilen fonksiyonlar         | Cookie veya storage'dan çağrı başına okuma            | 3.5/5 — Otomatik üretilir (generated)              | Tree-shaking (benchmark'ta etkisiz) | Sıfıra yakın (kod tabanında üretilen kod sayesinde) |
| `@lingui/solid`          | Kod içinde kaynak metin, derlenmiş kataloglar | Signal tabanlı                                        | 2/5 — Derleyiciden sağlanır                        | Katalog başına                      | ~11.8 kB                                            |
| Intlayer                 | Bileşen başına bir `.content.ts`              | Signal destekli node'lar, bileşen re-run'ı yok        | 5/5 — Üretilir (generated), varsayılan olarak açık | Evet, bileşen başına                | ~4.3 kB                                             |

> Rakamlar, benchmark sırasındaki sürümlerin anlık görüntüsüdür. `@lingui/solid` boyutu TanStack Start benchmark'ından alınmıştır. Yalnızca boyuta göre karar vermeden önce kendi uygulamanızda test edin.
> Tip güvenliği: 5/5; anahtarların, parametrelerin ve her locale'in, URL biçimlendirici ve yardımcılar (helpers) dahil olmak üzere manuel kurulum olmadan kontrol edildiği anlamına gelir.

Paraglide'ın sıfıra yakın kütüphane boyutu yapısı gereğidir: runtime doğrudan projenize üretilir (generate edilir). Intlayer `vite-intlayer` gerektirir, bu yüzden bir build adımı olmadan çalışamaz.

## Yanıtlarınızı bir kütüphaneyle eşleştirin

<AccordionGroup>
<Accordion header="Vite SPA, küçük katalog, araya hiçbir şeyin girmesini istemiyorsunuz">

`@solid-primitives/i18n`. Düz bir sözlük, accessor'lar döndüren bir `translator()`, hiçbir ek yapılandırma olmadan infer edilen type'lar. Küçük bir uygulama için doğru tercihtir ve kaynak kodunu okumak on dakika sürer. Kendiniz yazmanız gerekenler: locale kalıcılığı (persistence), routing, formatter'lar ve route başına kod bölme (splitting). Bu liste uzadıkça, bu durum geçiş yapma vaktinin geldiğinin bir işaretidir.

</Accordion>
<Accordion header="i18next codebase'i olan bir React projesinden geçiş yapıyorsunuz">

`solid-i18next`, katalogları, namespace'leri, backend'leri ve detector'ları olduğu gibi yeniden kullanmanızı sağlar. En ağır seçenektir ve `react-i18next` ile aynı maliyetleri taşır: manuel type tanımlamaları, mümkün olan ancak zaman alan optimizasyonlar ve string döndüren bir `t()`; bu nedenle donmuş çeviri hatasını yazmak oldukça kolaydır. Okumaları JSX veya memo içinde sarmalayın ve setup sırasında asla saklamayın.

</Accordion>
<Accordion header="Locale önekli route'lar ve SSR ile SolidStart">

Her iki tarafın da uyuşması için locale'in sunucuda URL'den gelmesi gerekir; bunu istemcide tespit etmek çok geçtir. `@solid-primitives/i18n` ve `solid-i18next`, `[[locale]]` route'unu, `matchFilters` yapısını, redirect'i ve `entry-server.tsx` etiketlerini size bırakır. Paraglide, routing'i yöneten bir Vite eklentisine sahiptir. Intlayer, middleware ve route yardımcılarını hazır olarak sunar. Hangisini seçerseniz seçin, `<html lang>` ve `hreflang` etiketlerini `entry-server.tsx` içine yerleştirin; SolidStart v2'de `@solidjs/meta` istemcide hydration sonrasında uygulanır. [Solid i18n yazısı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/solid.md) bu kurulumu adım adım açıklar.

</Accordion>
<Accordion header="Locale değişimi anlık ve fine-grained olmalıdır">

Değerleri signal veya accessor olan ve okumaları track edilen bir kütüphane seçin. `@solid-primitives/i18n` accessor'ları ve Intlayer node'larının her ikisi de, bileşeni yeniden çalıştırmadan yalnızca kendilerini okuyan DOM node'larını günceller. `solid-i18next`, provider üzerinden re-render eder. Paraglide, locale'i bir signal yerine her mesaj çağrısında cookie veya storage'dan okur; bu yöntem çalışır ancak node başına gerekenden daha fazla işlem yapar.

</Accordion>
<Accordion header="Büyük uygulama, çok sayıda route, bundle bütçesi">

Build zamanında derlenen scoped içerik. Intlayer yalnızca bir route'un render ettiği içeriği sunar. Paraglide'ın buraya tree-shaking ile ulaşması beklenir; benchmark testinde çalışmadığından kendi kurulumunuzda bunu doğrulayın. `solid-i18next` ile namespace ve lazy-loading stratejisini ilk günden planlayın ve code review süreçlerinde bunu denetleyin.

</Accordion>
<Accordion header="Type güvenliği tartışmasız bir gereksinimdir">

`@solid-primitives/i18n`, çoğu React kütüphanesinin sunduğundan daha fazlasını sunarak size hiçbir ek çaba gerektirmeden infer edilmiş type'lar sağlar. Lazy loading ve route başına bölme sonrasında da geçerliliğini koruyan üretilmiş (generated) type'lar için Paraglide, `@lingui/solid` ve Intlayer'ın tümü bunları içerikten üretir. [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısı, her birinin build zamanında neleri yakaladığını karşılaştırır.

</Accordion>
<Accordion header="Çeviriler yapay zeka (AI) tarafından üretilecek">

Bu durumda merkezi bir sözlüğü haklı çıkaracak hiçbir kullanıcı kalmaz. Colocated içerik ve eksik locale'leri dolduran bir CLI en kısa yoldur. Intlayer'ın `fill` komutu kendi API key'inizle (OpenAI, Anthropic, Mistral, Gemini) çalışır ve yalnızca değişen kısımları yeniden çevirir.

</Accordion>
</AccordionGroup>

## Her kütüphanenin yetersiz kaldığı noktalar

- **`@solid-primitives/i18n`**: Kendi oluşturduklarınızın ötesinde lazy loading veya scoping yoktur, routing, cookie yönetimi ve formatter bulunmaz. Küçük uygulamalar için mükemmeldir, profesyonel projeler için hızla yetersiz kalır.
- **`solid-i18next`**: Grubun en ağırı, manuel type tanımları, kendine has çoğul (plural) formatı ve `t()` fonksiyonunun string döndürmesi nedeniyle setup sırasında saklanan çevirilerin donması riski.
- **Paraglide**: Oluşturulan dosyalar repoya commit edilir ve her push öncesinde yeniden üretilir, Solid benchmark testinde tree-shaking etkili olmadı ve locale bir signal yerine çağrı başına storage'dan okunur.
- **`@lingui/solid`**: 2026'da yeni çıktı, bu nedenle henüz yeterli üretim (production) geri bildirimi yok. Lingui'nin `extract` / `compile` build adımını ve birbiriyle örtüşen çeşitli sözdizimlerini miras alır.
- **Intlayer**: Zorunlu build eklentisi, daha küçük ekosistem, kısmi ICU desteği ve tasarım gereği içeriklerin kod tabanına yayılmış olması; bu nedenle bir çevirmen için tek bir JSON export etmek ek araçlar gerektirir.

## Her seçeneğin kodda görünümü

Her adayla yazılmış aynı bileşen: başlık ve çoğul içeren bir sepet özeti. Çevirinin nerede okunduğuna dikkat edin: JSX içinde track edilir, setup gövdesinde ise donmuş bir string haline gelir.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Key'ler kod üretimi olmadan doğrudan İngilizce nesneden type'landırılır. Çoğul kuralı, lazy loading ve routing yoktur; her birini eklemek size kalmıştır.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

i18next katalogları, namespace'leri ve eklentileri olduğu gibi kullanılır. `t` bir string döndürür, bu yüzden setup aşamasında `const title = t("cart:title")` kullanımı onu dondurur; çağrıyı JSX içinde tutun.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="İngilizce">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Fransızca">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="İspanyolca">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Her mesaj üretilmiş (generated), type güvenli bir fonksiyondur. Locale, bir signal yerine her çağrıda cookie veya storage'dan okunur; bu nedenle dil değişimindeki reaktiviteyi kurmak size aittir.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      tr: "Sepetiniz",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        tr: "{{count}} ürün",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        tr: "{{count}} ürün",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Tüm locale'ler bileşenin hemen yanında tek bir dosyada yer alır. `useIntlayer` signal destekli node'lar döndürür, böylece bir locale değişikliği yalnızca onları okuyan DOM node'larını günceller. JSX içindeki `{content.title}` track edilir; setup gövdesindeki `content.title.value` ise track edilmez.

  </Tab>
</Tabs>

Mevcut bir i18next kod tabanında, [i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md), paket alias'ını bundler seviyesinde tanımlar; böylece Intlayer içeriği sunarken kataloglar ve `t()` çalışmaya devam eder. Geri kalan konuları [geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) ele alır.

## Karar vermeden önce

Bir özellik tablosu size bir kütüphanenin bugün ne yaptığını gösterir. Bu maddeler ise onunla yaşamanın nasıl bir deneyim olacağını anlatır.

**Repository aktivitesini kontrol edin.**

Commit'ler, issue yanıtlama süreleri ve son minör sürümün bu yıl çıkıp çıkmadığı. Bakımı yapılmayan iyi bir mimari, ertelenmiş bir migrasyondur.

**npm indirme sayılarına göre seçim yapmayın.**

En çok indirilen kütüphane ilk çıkan kütüphanedir, 2026 yılındaki bir Solid projesine en uygun olanı değil. İndirmeler uygunluğu değil, tarihi ölçer.

![JavaScript i18n kütüphaneleri tier listesi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Geliştiriciyi kimin fonladığını ve ne sattıklarını sorgulayın.**

`solid-i18next`'in arkasındaki `i18next`, Locize tarafından desteklenmektedir. `next-intl`, `vue-i18n`, `svelte-i18n` ve Lingui Crowdin tarafından desteklenir. Tolgee, Paraglide (inlang) ve Intlayer'ın her biri kendi platformunu yürütür. Geliri barındırılan çeviri hizmetleri olan bir şirketin, araç zinciriniz içinde çeviriyi ücretsiz hale getirmek için pek bir nedeni yoktur. Intlayer, grupta kendi API key'inizle CLI üzerinden yapay zeka çevirisi sunan ve self-host edebileceğiniz bir CMS sağlayan tek seçenektir.

**Yapay zeka (AI) ajanlarına hazır mı?**

Ajanlar i18n konusunda hâlâ zorlanmaktadır: locale'leri unuturlar, key uydururlar ve mesaj sözdizimlerini karıştırırlar. Kütüphane, ajanın içeriği listeleyebilmesi, doldurabilmesi ve test edebilmesi için [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) veya bir [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) sunuyor mu? İçerik yüklemesi varsayılan olarak optimize edilmiş mi, yoksa birinin her çeyrekte namespace'leri ve lazy import'ları gözden geçirmesi mi gerekiyor?

**Kutudan çıktığı gibi type güvenliği.**

"Ekstra yapılandırmalarla type eklenebilir" değil, "hatalı bir key yeni bir kurulumda `tsc`yi patlatır". Var olmayan bir key girildiğinde ve bir çevirisi eksik olan bir locale durumunda ne olduğunu kontrol edin.

**Kullanılmayan içeriğin tespiti.**

Kataloglar yalnızca büyür. Intlayer'ın build işlemi kullanılmayan alanları temizler ve bunları günlüğe kaydeder (`build.purge`). Paraglide mimarisi gereği buna ulaşır, çünkü çağrılmayan bir mesaj fonksiyonu tree-shake edilir. Diğer her seçenek temizlik işini size bırakır.

**Geliştirici deneyimi (DX).**

İlk çevrilmiş string'e kadar geçen kurulum süresi, üzerine gelindiğinde (hover) çeviriyi gösteren ve bildirime atlayan bir [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md) veya [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md), doldurma, test ve push işlemleri için bir [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md), bileşenlerinizdeki sabit kodlanmış dizeleri çıkaran ve böylece her dizeyi anahtar anahtar yönetmenizi gerektirmeyen bir [derleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) veya çıkarıcı ve yazılımcı olmayan kişilerin bir pull request açmadan içeriği düzenlemesi için bir yol ([görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)).

## Sıkça Sorulan Sorular

<FAQ>

<Question title="@solid-primitives/i18n bir production uygulaması için yeterli mi?">

Küçük bir uygulama için evet ve mevcut en hafif seçenektir. Route başına lazy kataloglara, SolidStart'ta locale routing'e, cookie kalıcılığına veya formatter'lara ihtiyaç duyduğunuzda yetersiz kalır çünkü bunların hepsini kendiniz oluşturmanız gerekir.

</Question>

<Question title="Locale değiştiğinde çevirim neden güncellenmiyor?">

Çünkü Solid bileşenleri yalnızca bir kez çalışır. Setup sırasında bir `const` içine okunan bir çeviri düz bir string'dir, reaktif bir abonelik (subscription) değildir. Çeviriyi JSX, effect veya memo içinde okuyun ya da hatalı kullanımı zorlaştırmak için değerleri accessor olan bir kütüphane tercih edin.

</Question>

<Question title="Derleyici tabanlı (compiler-based) bir kütüphaneye ihtiyacım var mı?">

Yalnızca bundle boyutu, otomatik üretilen type'lar veya build anında eksik anahtar kontrolleri gerçek gereksinimleriniz arasındaysa. [Derleyici ve deklaratif i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md) yazısı, derleyicilerin size ne kazandırdığını ve nerelerde yanılabileceğini açıklamaktadır.

</Question>

<Question title="Kütüphane seçimi SEO'yu etkiler mi?">

Dolaylı olarak etkiler. Arama motoru botları (crawler'lar) routing, `hreflang`, `<html lang>` ve metnin sunucu tarafından render edilen HTML içinde yer alıp almadığına bakar; bu durum SolidStart'ta `entry-server.tsx` anlamına gelir. [hreflang rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md) yazısına göz atın.

</Question>

</FAQ>

## Daha fazlası

- [Solid i18n benchmark: bundle boyutu, sızıntı ve locale geçiş süreleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/solid.md)
- [Solid i18n: locale değişiminde çeviriler neden donar](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/solid.md)
- [Tak-çalıştır i18next uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md) ve [i18next geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md)
- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
- [Derleyici ve deklaratif i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [Bileşen başına ve merkezi i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
- [Build zamanında bundle optimizasyonu nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [Vite + Solid uygulamasında i18n kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+solid.md) ve [SolidStart uygulamasında kurulum](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_solid_start.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_vue_i18n_library.md) ve [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_svelte_i18n_library.md) için aynı rehber
