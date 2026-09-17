---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026'da Doğru Svelte i18n Kütüphanesini Seçme Rehberi"
description: Svelte ve SvelteKit uluslararasılaştırması için bir karar rehberi. svelte-i18n, Paraglide, typesafe-i18n, wuchale ve Intlayer'ı karşılaştırmadan önce yanıtlanması gereken sorular ve her seçeneğin bundle boyutu, typing ve SSR güvenliği açısından maliyetleri.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte uluslararasılaştırma
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n kütüphane karşılaştırması
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Doğru Svelte i18n kütüphanesi nasıl seçilir

Svelte, i18n için yerleşik hiçbir şey sunmaz. `$t` yok, locale primitive'i yok, mesaj formatı yok. Her seçenek bir third-party tercihtir ve Svelte ekosistemi compile-time i18n'in en ileri gittiği yerdir; bu nedenle adaylar birbirinden React veya Vue'dakinden çok daha fazla ayrışır.

Bu rehber önce yanıtlanması gereken soruları listeler, ardından bu yanıtları Vite + Svelte ve SvelteKit için `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` ve Intlayer ile eşleştirir.

![Svelte i18n kütüphane ekosistemi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## İçindekiler

<TOC/>

## Kütüphaneleri karşılaştırmadan önce yanıtlanması gereken altı soru

1. **Vite SPA mı yoksa SvelteKit mi?** Bir SPA'da module-level store kullanmak doğrudur: tek sekme, tek kullanıcı, tek locale. SvelteKit'te ise bu singleton yapı sunucudaki eşzamanlı request'ler arasında paylaşılır ve B request'i, A request'inin dilinde render edilir. Kütüphane ya size request başına özel bir yapı (context, `locals`) sağlar ya da bunu çözmeyi size bırakır.
2. **Çevirileri kim yazıyor?** Geliştiriciler, bir TMS, ICU string'leri teslim eden bir ajans veya bir AI pipeline'ı. `svelte-i18n` ICU kullanır. Paraglide ve `typesafe-i18n` kendi sözdizimlerini kullanır. Tercihinizi kaynağınıza göre belirleyin.
3. **Kaç locale ve sayfa var?** İki locale ve beş sayfa her şeyi tek seferde sunabilir. On locale ve kırk route bunu sunamaz; runtime katalogları ile derlenmiş mesajlar arasındaki fark ana maliyet haline gelir.
4. **Key'lerde type güvenliğine ihtiyacınız var mı?** `$_("cart.totl")`, `svelte-i18n` içinde bir runtime hatasıdır. Compile-time kütüphaneleri ise bunu yapısal olarak bir type hatası haline getirir.
5. **Svelte 4 store'ları mı yoksa Svelte 5 rune'ları mı?** Rune'lar locale state'inin sözdizimini değiştirir, paylaşım sorununu değil. Ancak bir `.ts` dosyasındaki `$state` düz bir değişkene derlenir, bu yüzden Svelte 5 kullanıyorsanız kütüphanenin runtime'ı rune desteğine sahip (rune-aware) olmalıdır.
6. **Repo içinde üretilen (generated) dosyalar sizin için uygun mu?** Hem Paraglide hem de `typesafe-i18n`, kaynak dizininize JavaScript veya TypeScript dosyaları üretir. Bazı ekipler için bu sorun teşkil etmezken, diğerleri her paralel branch'te merge conflict yaşar.

Yanıtları bir yere not edin. Aşağıdaki her şey bunlara atıfta bulunacaktır.

## Tek bir resimde genel görünüm

Svelte i18n ekosistemi React veya Vue'dan daha geç ortaya çıktı ve doğrudan compile-time dalgalarına geçti.

![JavaScript i18n kütüphanelerinin tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime sözlükleri (2019 - 2020): svelte-i18n, sveltekit-i18n">

JSON katalogları, `intl-messageformat` aracılığıyla tarayıcıda ayrıştırılan ICU, module-level store'larda tutulan locale (`$locale`, `$_`). En çok benimsenen, iyi belgelenmiş seçenek; SSR entegrasyonu ise tamamen sizin sorumluluğunuzdadır.

</Accordion>
<Accordion header="Üretilen type'lar (2020 - 2022): typesafe-i18n">

Bir generator kataloglarınızı izler ve typed accessor'lar üretir (`$LL.cart.total()`). Sağlam bir modeldir, dosyalar repo içinde üretilir ve repository son zamanlarda pek güncellenmemiştir.

</Accordion>
<Accordion header="Compiler ve colocated içerik (2022 - 2026): Paraglide, wuchale, Intlayer">

Paraglide, bir route'un asla çağırmadığı mesajların bundler tarafından tree-shake edilebilmesi için her mesajı dışa aktarılan (exported) bir fonksiyona derler. `wuchale`, build sırasında markup'tan string'leri çıkarır. Intlayer içeriği bileşen başına tanımlar; type'ları ve bileşen başına sözlükleri otomatik üretir.

</Accordion>
</AccordionGroup>

[JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) yazısı her dalgayı ayrıntılı olarak ele almaktadır.

## En önemli karar: İçeriğin nerede durduğu ve ne zaman yüklendiği

İki yapısal tercih, kurulumlar arasındaki bundle farkının çoğunu açıklar:

- **Merkezi veya scoped içerik.** Uygulama için tek bir `locales/en.json` veya bileşen başına bir deklarasyon.
- **Statik veya dinamik import.** Başlangıçta her şeyi yüklemek veya aktif locale'i (ve ideal olarak aktif route'u) isteğe bağlı getirmek (on demand fetch).

Grafik, 1 ila 10 sayfadan oluşan, 1 ila 10 locale'e çevrilmiş ve sayfa başına yaklaşık 30 KB metin içeren teorik bir uygulama için payload tahminini göstermektedir.

![Mimarilere göre teorik içerik sızıntısı](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` varsayılan olarak sol üstte yer alır: `register("fr", () => import("./fr.json"))` locale başına dinamik yükleme sağlar, ancak bir locale kataloğu tek bir nesnedir ve onu yüklemek her sayfanın içeriğini yükler. Paraglide ilgi çekici bir örnektir: her mesaj kendi export'una sahip olduğu için tree-shaking size sayfa eksenini ek maliyetsiz sunar ve [Svelte benchmark'ı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/svelte.md) bunun Vite + Svelte üzerinde vadedildiği gibi çalıştığını doğrular (React ve Next.js benchmark'larında bu gerçekleşmemişti). Intlayer ise bileşen başına deklarasyonlar ile aynı sonuca ulaşır.

3. soruya yanıtınız "çok sayıda sayfa" olduysa, bu bölüme herhangi bir API tercihinden daha fazla ağırlık verin. [Bileşen başına ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) yazısı aynı tercihin bakım tarafını ele almaktadır.

## Adaylar

Kütüphane boyutları [Svelte benchmark'ından](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/svelte.md) alınmıştır: 10 sayfalık, 10 locale'li bir uygulamada bundling, tree-shaking ve minification sonrasında boş bir bileşendeki store ve accessor boyutu. İçerik boyutu ayrıca ölçülür.

| Kütüphane       | Mesajların konumu                      | Locale state                              | Key'lerde type desteği | Mesaj formatı | Route başına splitting | Kütüphane boyutu    |
| :-------------- | :------------------------------------- | :---------------------------------------- | :--------------------- | :------------ | :--------------------- | :------------------ |
| `svelte-i18n`   | Locale başına JSON katalogları         | Module-level Svelte store                 | Manuel union           | ICU           | Hayır                  | ~16.6 kB            |
| `typesafe-i18n` | Üretilen TS modülleri                  | Store adapter                             | Üretilen               | Özel (Own)    | Kısmi                  | Küçük               |
| Paraglide       | inlang projesi, fonksiyonlara derlenir | Cookie, URL veya storage'dan çağrı başına | Üretilen               | Özel (Own)    | Evet, tree-shaking ile | Sıfıra yakın        |
| `wuchale`       | Build sırasında markup'tan çıkarılır   | Store                                     | Yok (key yok)          | Özel (Own)    | Evet                   | Küçük               |
| Intlayer        | Bileşenin yanındaki `.content.ts`      | Context ve store, rune uyumlu             | Üretilen, varsayılan   | Helper'lar    | Evet, bileşen başına   | Referans (Baseline) |

> Rakamlar benchmark sırasındaki sürümlerin anlık görüntüsüdür. Yalnızca boyuta göre karar vermeden önce kendi uygulamanızda test edin.

Paraglide'ın sıfıra yakın kütüphane boyutu mimari bir sonuçtur: runtime doğrudan reponuzun içinde üretilir. Intlayer ise `vite-intlayer` eklentisine ihtiyaç duyar, bu nedenle bir build adımı olmadan çalışamaz.

## Yanıtlarınızı bir kütüphaneyle eşleştirin

<AccordionGroup>
<Accordion header="Vite SPA, küçük ekip, az sayıda locale">

`svelte-i18n`. En iyi belgelenmiş seçenektir, `$_` markup içinde doğal okunur ve `register` ile `waitLocale()` kombinasyonu locale başına lazy loading sağlar. Raw key'lerin ekranda anlık görünmesini engellemek için ilk paint'i `isLoading` ile sınırlandırın. Uygulamanın ileride bir sunucuya taşınma ihtimali varsa, module store'a güvenmek yerine ilk günden locale'i Svelte context'ine koyun; şu anda hiçbir maliyeti yoktur ve ileride sadece production ortamında ortaya çıkacak bir hatayı önler.

</Accordion>
<Accordion header="Locale routing ve SSR içeren SvelteKit">

Bu durumu paylaşım sorunu belirler. `svelte-i18n` SvelteKit üzerinde çalışır, ancak request başına entegrasyonu (`hooks.server.ts`, `locals`, `load`, ardından `setContext`) yazmak sizin sorumluluğunuzdadır ve fark edilmesi zor hatalar yapmak kolaydır. Paraglide, routing'i yöneten ve locale'i çağrı başına okuyarak singleton sorununu ortadan kaldıran bir SvelteKit entegrasyonu sunar. Intlayer ise locale'i `load` verisinden context'e aktarır. [SvelteKit i18n yazısı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/sveltekit.md), kütüphaneyi seçmeden önce karar vermeniz gereken `[[lang]]` ve `reroute` tercihlerini açıklamaktadır.

</Accordion>
<Accordion header="Çeviriler bir TMS'den veya ICU teslim eden bir ajanstan geliyorsa">

`svelte-i18n`, `intl-messageformat` sayesinde yerel (native) ICU desteğine sahiptir; bu nedenle çoğu sağlayıcıya doğrudan bağlanır. Paraglide ve `typesafe-i18n` kendi sözdizimlerini kullanır ve dönüştürme gerektirir. Intlayer'ın ICU desteği kısmidir, bu nedenle bugün ICU string'leri alıyorsanız bunu engelleyici bir durum (blocker) olarak değerlendirin.

</Accordion>
<Accordion header="Bundle boyutu en kritik kısıt ise">

Compile-time. Paraglide'ın tree-shaking özelliği Vite + Svelte üzerinde çalışır ve kütüphane maliyeti neredeyse sıfırdır. Intlayer'ın bileşen başına sözlükleri, repo içine dosya üretmeden aynı sonucu sağlar. `svelte-i18n` hem ICU parser'ını hem de tüm kataloğu bundle'a dahil eder ve benchmark'ta herhangi bir içerik eklenmeden önce `svelte-intlayer`ın yaklaşık 4.5 katı büyüklüğe ulaşır.

</Accordion>
<Accordion header="Type güvenliği vazgeçilmez ise">

Yalnızca elle yazılmış ve JSON'dan hemen sapan bir union typing'e sahip olan yalın `svelte-i18n` kurulumu dışındaki tüm seçenekler. `typesafe-i18n`, Paraglide ve Intlayer içeriğe göre type üretir. Bir codebase'i bağlamadan önce `typesafe-i18n` repository etkinliğini kontrol edin. [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısı, her birinin build zamanında neleri yakaladığını karşılaştırır.

</Accordion>
<Accordion header="Repo içinde üretilen dosyalar istenmiyorsa">

Bu durum Paraglide ve `typesafe-i18n`i eler. `svelte-i18n` ve Intlayer çıktılarını `node_modules` veya bir build dizininde tutar; Intlayer ile `.content.ts` dosyaları elle yazılan kaynak kodlardır, derlenen sözlükler ve type'lar ise `.intlayer/` dizininde yer alır ve gitignore edilir.

</Accordion>
<Accordion header="Çeviriler yapay zeka (AI) tarafından üretilecekse">

O zaman merkezi JSON formatını haklı çıkaracak bir tüketici kalmaz. Colocated içerik ve eksik locale'leri tamamlayan bir CLI daha kısa bir yoldur. Intlayer'ın `fill` komutu kendi API key'inizle (OpenAI, Anthropic, Mistral, Gemini) çalışır ve yalnızca değişen kısımları yeniden çevirir. Paraglide'ın inlang ekosistemi ise kendi planlarına sahip hosted alternatifler sunar.

</Accordion>
</AccordionGroup>

## Her kütüphanenin yetersiz kaldığı yönler

- **`svelte-i18n`**: Grubun en ağırı, key type desteği yok, route başına splitting yok, context'i kendiniz bağlamadığınız sürece SvelteKit'te request'ler arası veri sızdıran module-level store.
- **`typesafe-i18n`**: Bir watcher süreci, repo içinde üretilen dosyalar ve son zamanlarda pek güncellenmeyen bir repository.
- **Paraglide**: Repo'ya commit edilen ve her push öncesinde yeniden üretilen dosyalar, paralel branch'lerde merge conflict'ler ve locale'in bir store yerine her mesaj çağrısında cookie veya storage'dan okunması (bu durum dil değişiminde ekstra işlem maliyeti yaratır).
- **`wuchale`**: İlginç bir string çıkarma (extraction) fikri, henüz erken aşamada. React benchmark'ında provider re-render'larını zorunlu kılan reaktivite sorunlarıyla karşılaşıldı ve dokümantasyonu yetersiz.
- **Intlayer**: Zorunlu build eklentisi, daha küçük ekosistem, kısmi ICU desteği ve içeriğin tasarım gereği codebase geneline yayılması (bu nedenle bir çevirmen için tek bir JSON dışa aktarmak ek araç gerektirir).

## Her seçeneğin koddaki görünümü

Başlık ve çoğul içeren bir sepet özeti bileşeni, her adayla aynı şekilde yazılmıştır. İlgi çekici kısım markup değil; içeriğin nerede yaşadığı, locale'in nasıl saklandığı ve type checker'ın ne bildiğidir.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

`intl-messageformat` ile ICU, module-level store'da tutulan locale. `$_` herhangi bir string'i kabul eder; tek type kontrolü elle yazdığınız bir union'dır.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Her mesaj, asla çağrılmazsa tree-shake edilen, üretilmiş ve typed bir fonksiyondur. `paraglide/` klasörü reponuzun içinde üretilir ve locale bir store yerine her çağrıda okunur.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Bir watcher süreci tarafından üretilen typed accessor'lar. Model sağlamdır; üretilen dosyalar repo içinde yaşar ve proje son zamanlarda sessizdir.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      tr: "Sepetiniz",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      tr: plural({ one: "{{count}} ürün", other: "{{count}} ürün" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Tüm locale'ler bileşenin yanındaki tek bir dosyada. `useIntlayer` okunabilir bir store döndürür, bu nedenle `$content` zaten bildiğiniz otomatik aboneliktir (auto-subscription) ve locale bir modül singleton'ı yerine context içinde (SSR güvenli) tutulur.

  </Tab>
</Tabs>

Halihazırda `svelte-i18n` mi kullanıyorsunuz? [`@intlayer/svelte-i18n` uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/svelte-i18n.md), paketi bundler düzeyinde takma adla (alias) yönlendirir; böylece Intlayer içeriği sunarken `$_`, `$date`, `$number` ve düz anahtarlarınız çalışmaya devam eder.

## Karar vermeden önce

Bir özellik tablosu bir kütüphanenin bugün ne yaptığını gösterir. Bu maddeler ise onunla birlikte yaşamanın nasıl olacağını anlatır.

**Repository etkinliğini kontrol edin.**

Commit'ler, issue yanıtlama süreleri ve son minör sürümün bu yıl çıkıp çıkmadığı. Bakımı yapılmayan sağlam bir tasarım, gelecekteki bir migrasyon anlamına gelir.

**npm indirmelerine göre seçim yapmayın.**

En çok indirilen kütüphane ilk çıkan kütüphanedir, 2026 yılındaki bir Svelte projesine en uygun olanı değil. İndirme sayıları uygunluğu değil, geçmişi ölçer.

![JavaScript i18n kütüphaneleri sıralaması](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Geliştiriciyi kimin finanse ettiğini ve ne sattıklarını sorgulayın.**

`svelte-i18n`, `next-intl` ve `vue-i18n` gibi Crowdin tarafından desteklenmektedir. `i18next`, Locize tarafından desteklenmektedir. Tolgee, Paraglide (inlang) ve Intlayer'ın her biri kendi platformunu işletmektedir. Geliri barındırılan (hosted) çeviri olan bir sağlayıcının, çeviriyi araç zinciriniz içinde ücretsiz hale getirmek için pek bir nedeni yoktur. Intlayer, CLI üzerinden kendi API key'inizle AI çevirisi sunan ve self-host edebileceğiniz bir CMS sağlayan tek seçenektir.

**AI ajanlarına (AI agents) hazır mı?**

Ajanlar i18n konusunda hala zorlanmaktadır: locale'leri unuturlar, key uydururlar ve mesaj sözdizimlerini karıştırırlar. Kütüphane, ajanın içeriği listeleyebilmesi, doldurabilmesi ve test edebilmesi için [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md) veya bir [MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md) sunuyor mu? İçerik yüklemesi varsayılan olarak optimize edilmiş mi, yoksa birinin her çeyrekte namespace'leri ve lazy import'ları gözden geçirmesi mi gerekiyor?

**Kutudan çıktığı haliyle type güvenliği.**

"Ek yapılandırmayla type eklenebilir" değil, "temiz bir kurulumda yanlış bir key `tsc`yi patlatır". Var olmayan bir key girildiğinde ve bir çevirisi eksik olan bir locale durumunda ne olduğunu kontrol edin.

**Kullanılmayan içeriğin tespiti.**

Kataloglar yalnızca büyür. Intlayer'ın build işlemi kullanılmayan alanları temizler (purge) ve bunları loglar (`build.purge`). Paraglide ise çağrılmayan bir mesaj fonksiyonunun tree-shake edilmesi sayesinde mimari olarak buna ulaşır. Diğer tüm seçenekler bu temizliği size bırakır.

**Geliştirici deneyimi (Developer experience).**

İlk çevrilmiş string'e kadar geçen kurulum süresi, hover sırasında çeviriyi gösterip deklarasyona atlayan bir [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md) veya [VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md), doldurma, test etme ve push için bir [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md) ve yazılımcı olmayanların pull request açmadan içeriği düzenleyebileceği bir yöntem ([görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) veya [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)).

## Sıkça Sorulan Sorular

<FAQ>

<Question title="svelte-i18n 2026'da hala doğru varsayılan seçenek mi?">

Küçük bir kataloğa sahip bir Vite SPA için evet. En iyi belgelenmiş seçenektir ve ICU uyumluluğu birçok ekip için önemlidir. SvelteKit üzerinde veya birkaç düzine sayfayı geçtikten sonra, maliyetleri (type yok, scoping yok, paylaşılan store) birikmeye başlar.

</Question>

<Question title="Paraglide'ın tree-shaking özelliği gerçek mi?">

Vite + Svelte üzerinde evet, benchmark bunu doğrulamaktadır. React ile TanStack Start veya Next.js üzerinde aynı benchmark'ta etkili olmadı. Her iki sonuca da körü körüne güvenmek yerine kendi teknoloji yığınınızda (stack) doğrulayın.

</Question>

<Question title="Rune'lar hangi kütüphaneyi seçeceğimi etkiler mi?">

Kendi locale state'inizin sözdizimini değiştirirler, paylaşım sorununu değil. Önemli olan, kütüphanenin runtime'ının Svelte 5 üzerinde rune uyumlu olup olmadığı ve bir modül store'u yerine context kullanıp kullanmadığıdır. Her ikisini de kontrol edin.

</Question>

<Question title="Kütüphane seçimi SEO'yu etkiler mi?">

Dolaylı olarak. Crawler'lar routing, `hreflang`, `<html lang>` ve metnin sunucu tarafından render edilen HTML içinde bulunup bulunmadığına dikkat eder. [hreflang rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md) yazısına bakın.

</Question>

</FAQ>

## Daha fazlası

- [Svelte i18n benchmark: bundle boyutu, sızıntı ve locale değiştirme süreleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/svelte.md)
- [Svelte i18n: store'lar, rune'lar ve modül düzeyindeki tuzak](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/svelte.md) ve [SvelteKit i18n: routing, SSR ve paylaşılan state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/list_i18n_technologies/frameworks/sveltekit.md)
- [Doğrudan yerine geçen `svelte-i18n` uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/svelte-i18n.md)
- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
- [Compiler ve deklaratif i18n karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [Bileşen başına ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)
- [Build zamanında bundle optimizasyonu nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [Vite + Svelte uygulamasında i18n kurulumu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md) ve [SvelteKit uygulamasında kurulum](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_svelte_kit.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_vue_i18n_library.md) ve [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_solid_i18n_library.md) için aynı rehber
