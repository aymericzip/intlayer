---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco mu Intlayer mı? Angular i18n kütüphanelerini çalışma zamanında dil değiştirme, tip güvenliği, lazy loading, çoğul biçimler ve SSR açısından karşılaştırın."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - angular uluslararasılaştırma
  - ngx-translate vs transloco
  - Intlayer
  - i18n kütüphanesi karşılaştırması
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular, kendi i18n çözümünü sunan tek büyük framework'tür ve topluluğun etrafında geliştirdiği kütüphanelerin tam tersi bir yaklaşım benimser. `@angular/localize` derleme zamanında çeviri yapar ve her dil için ayrı bir uygulama üretir. `ngx-translate` ve Transloco ise JSON dosyalarından çalışma zamanında çeviri yapar. Intlayer içeriği derleme zamanında derler, ancak çalışma zamanında dil değiştiren tek bir uygulama tutar.

Bu yazı dördünü, pratikte seçimi belirleyen noktalar üzerinden karşılaştırır: locale nasıl değişir, içerik nerede durur, derleyici neyi yakalar ve tarayıcıda ne yüklenir.

## İçindekiler

<TOC/>

## Kısa özet

- **`@angular/localize`** (Angular i18n): sıfır çalışma zamanı maliyeti ve yerel ICU, ancak locale başına bir build ve bir dağıtım, dil değiştirmek ise uygulamayı yeniden yükler.
- **`ngx-translate`**: en eski ve en basit çalışma zamanı seçeneği. Locale başına bir JSON dosyası HTTP ile yüklenir, anahtarlar tipsizdir, çoğul biçimler eklentiyle gelir.
- **Transloco**: daha büyük uygulamalar için tasarlanmış çalışma zamanı seçeneği. Scope'lar çevirileri özellik bazında yükler, eklenti ekosistemi ICU, locale biçimlendirme ve anahtar çıkarmayı kapsar.
- **Intlayer**: içerik her bileşenin yanında tanımlanır, derleme zamanında tiplenir, bileşen ve locale bazında bölünür, çalışma zamanında dil değiştirir. Özel bir esbuild builder gerektirir.

> Her kütüphanenin nereden geldiğini görmek için [JavaScript i18n tarihçesini](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md) okuyun.

- [JavaScript i18n tarihçesi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)

## Derleme zamanı mı çalışma zamanı mı: sahayı ikiye bölen karar

**`@angular/localize`** çevirileri derlenmiş şablonlara gömer. `ng build --localize`, her biri yalnızca kendi dilini içeren `dist/app/en`, `dist/app/fr` gibi çıktılar üretir. Hiçbir şey indirilmez ve çalışma zamanında hiçbir şey yorumlanmaz, bu da yüklendikten sonra onu en hızlı seçenek yapar. Maliyet operasyoneldir: test edilecek N build, dağıtılacak N klasör, `/fr/` yolunu doğru olana yönlendiren bir sunucu veya CDN kuralı ve kullanıcı dil değiştirdiğinde tam sayfa yüklemesi. `ng serve` de aynı anda yalnızca tek bir locale çalıştırır.

**`ngx-translate` ve Transloco** tek build tutar. Locale değiştiğinde bir servis `fr.json` dosyasını indirir ve her pipe veya direktif yeniden render edilir. Geçiş anlıktır, ancak ilk render HTTP isteğini bekler, anahtarlar düz string'lerdir ve SSR ile loader'ın sunucuda da çalışması gerekir (mutlak URL'ler veya dosya sistemi loader'ı, iki kez indirmemek için `TransferState`).

**Intlayer** da tek build tutar, ancak içerik ham JSON olarak indirilmek yerine bundle'a derlenir. `useIntlayer()` bir Signal döndürür, bu yüzden locale değişikliği onu okuyan bileşenleri yeniden yüklemeden günceller.

Çalışma zamanı kütüphanelerinde gözden kaçması kolay bir Angular ayrıntısı var: `DatePipe`, `CurrencyPipe` ve `DecimalPipe`, bootstrap sırasında sabitlenen `LOCALE_ID` değerini okur. `ngx-translate` ile dil değiştirmek tarih ve fiyatların biçimini değiştirmez. Transloco bunu `@jsverse/transloco-locale` ile, Intlayer ise aktif locale'i izleyen `useDate`, `useNumber` ve `useCurrency` ile çözer. `@angular/localize`'da bu sorun yoktur, çünkü her build'in kendi `LOCALE_ID` değeri vardır. [Tarih, saat ve sayı biçimlendirme rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/date_time_number_formatting_locales.md) `Intl` tarafını kapsar.

- [tarih, saat ve sayı biçimlendirme rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/date_time_number_formatting_locales.md)

## Özellik karşılaştırması

|                           | `@angular/localize`                                          | `ngx-translate`                                     | Transloco                                              | Intlayer                                                                         |
| :------------------------ | :----------------------------------------------------------- | :-------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Çevirinin uygulanması** | Derleme zamanı, gömülü                                       | Çalışma zamanı                                      | Çalışma zamanı                                         | Derleme zamanında derlenir, çalışma zamanında çözülür                            |
| **Sürüm başına build**    | Locale başına bir                                            | Bir                                                 | Bir                                                    | Bir                                                                              |
| **Dil değiştirme**        | Başka bir build'e sayfa yenileme                             | Anlık                                               | Anlık                                                  | Anlık                                                                            |
| **İçerik nerede durur**   | Şablonlarda kaynak metin, çeviriler XLIFF/JSON içinde        | Locale başına bir JSON                              | Locale başına bir JSON, ayrıca scope başına bir        | Her bileşenin yanında `.content.ts` (veya JSON), ya da merkezi                   |
| **Çoğul biçimler / ICU**  | ✅ Şablonlarda yerel ICU                                     | ⚠️ Eklenti (`ngx-translate-messageformat-compiler`) | ⚠️ Eklenti (`@jsverse/transloco-messageformat`)        | ✅ CLDR kurallarıyla `plural()`, ⚠️ ICU string'leri kısmen                       |
| **Tipli anahtarlar**      | Uygulanamaz, kaynak metin mesajın kendisidir                 | ❌ Hayır                                            | ❌ Hayır, Keys Manager eksik anahtarları CLI'dan bulur | ✅ Üretilir, yanlış anahtar `ng build`'i bozar                                   |
| **Eksik çeviriler**       | Build uyarısı veya `i18nMissingTranslation` ile hata         | Çalışma zamanında ham anahtarı gösterir             | Çalışma zamanında yedek dil, CLI kontrolü              | TypeScript işaretler, CI'da `intlayer test`                                      |
| **Lazy loading**          | Gerekmez, her build tek locale içerir                        | Tüm locale dosyası, elle bölünür                    | ✅ Scope başına (route veya bileşen)                   | ✅ Bileşen ve locale başına                                                      |
| **Signals**               | Uygulanamaz, metin statiktir                                 | Pipe ve Observables                                 | `translateSignal()`                                    | `useIntlayer()` bir Signal döndürür                                              |
| **Build kurulumu**        | `ng add @angular/localize`, locale'ler `angular.json` içinde | Yok                                                 | Yok                                                    | `@angular-builders/custom-esbuild` ve bir esbuild eklentisi                      |
| **Çevirmen iş akışı**     | ✅ XLIFF, TMS araçlarının beklediği format                   | JSON                                                | JSON                                                   | `.content.ts`/JSON, sync eklentileri, görsel editör, CLI ile yapay zekâ doldurma |

Birkaç satır bağlam gerektiriyor.

**`@angular/localize`'da mesaj ID'leri.** Özel bir ID olmadan (`i18n="@@cartTitle"`) her mesajın ID'si kaynak metninin hash'idir. İngilizce metindeki bir yazım hatasını düzeltirseniz, o mesajın tüm çevirileri çevirmenler yeniden yapana kadar sahipsiz kalır. Özel ID'leri ilk günden belirleyin.

**`ngx-translate` ile bölme.** Varsayılan loader `fr.json` dosyasının tamamını indirir, bu yüzden her sayfa diğer tüm sayfaların string'lerini de taşır. Özel bir loader veya birkaç `TranslateService` örneğiyle özellik bazında bölebilirsiniz, ancak bunu hiçbir şey zorunlu kılmaz. [Bileşen bazlı ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md) yazısı bu dengeyi ele alır.

- [bileşen bazlı ve merkezi i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/per-component_vs_centralized_i18n.md)

**Transloco'da scope'lar.** Scope, bir route veya bileşen sağladığında yüklenen bir JSON dosyaları klasörüdür (`i18n/cart/en.json`). Çalışma zamanı kütüphanelerinin bileşen bazlı içeriğe en çok yaklaştığı yerdir ve paylaşılan bileşenler başka bir özelliğin scope'una uzanmadığı sürece iyi çalışır.

**Intlayer'ın builder'ı.** Angular CLI esbuild eklentilerini açığa çıkarmaz, bu yüzden Intlayer `angular.json` içinde `@angular-builders/custom-esbuild` gerektirir. Küçük bir değişikliktir, ancak Angular güncellemeleriyle uyumlu tutulması gereken üçüncü taraf bir builder'dır. [Angular kurulum rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md) tam yapılandırmayı gösterir.

- [Angular kurulum rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)

## Commit etkinliği

`@angular/localize`, `angular/angular` monorepo'sunda yaşar, bu yüzden commit sayısı karşılaştırılamaz ve dışarıda bırakılmıştır.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm indirmeleri

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

İndirmeler güncel tercihlerden çok geçmişi ölçer: `ngx-translate`, Transloco'dan önce başlayan her uygulamada hâlâ kurulu ve yapay zekâ asistanları, eğitildikleri kodda baskın olduğu için onu önermeye devam ediyor. Transloco 2024'te `@ngneat/transloco`'dan `@jsverse/transloco`'ya geçti ve eski scope hâlâ indiriliyor.

## Aynı bileşen, her kütüphanede

Başlığı ve çoğul biçimi olan bir sepet özeti. Şablon neredeyse hiç değişmez, değişen şey string'lerin nerede durduğu ve derleyicinin onlar hakkında ne bildiğidir.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

İngilizce metin şablonda kalır. Çevirmenler çıkarılan XLIFF üzerinde çalışır ve her locale kendi build'i olur. TypeScript içindeki string'ler `$localize` etiketini kullanır.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU çoğul biçimi yalnızca `ngx-translate-messageformat-compiler` ile çalışır, varsayılan parser yalnızca `{{count}}` değerini değiştirir. `"cart.titel"` derlenir ve çalışma zamanında ham anahtarı render eder.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

`cart` scope'u bileşen ilk render edildiğinde indirilir. ICU çoğul biçimleri `@jsverse/transloco-messageformat` gerektirir. Anahtarlar tipsizdir, `transloco-keys-manager` eksik ve kullanılmayanları raporlar.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ tr: "Sepetiniz", en: "Your cart", fr: "Votre panier" }),
    items: t({
      tr: plural({ one: "{{count}} ürün", other: "{{count}} ürün" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Tüm locale'ler bileşenin yanındaki tek bir dosyada durur. Tipler build sırasında üretilir, bu yüzden `content().titel` `ng build`'i bozar ve `t()` içinde eksik kalan bir locale editörde işaretlenir.

  </Tab>
</Tabs>

## Hangisi uygulamanıza uyar

<AccordionGroup>
<Accordion header="Herkese açık site, az etkileşim, önce SEO">

`@angular/localize`. Her locale kendi URL'sine sahip ayrı bir build'dir, önceden render edilmiş sayfalar zaten çevrilmiş olarak gelir ve yüklenecek bir i18n runtime'ı yoktur. Uygulama çoğunlukla içerikten oluşuyorsa ve dil değişiklikleri nadirse, locale başına bir build maliyeti düşüktür. Doğru `hreflang` etiketleriyle birlikte kullanın, bkz. [hreflang rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md).

- [hreflang rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Kullanıcıların uygulama içinde dil değiştirdiği dashboard veya SaaS">

Çalışma zamanı seçeneği. Başka bir build'e yeniden yüklemek bellekteki durumu kaybettirir ve uygulamayı yeniden yükleyen bir dil menüsü bozuk hissettirir. İki üç locale'li küçük bir uygulama için `ngx-translate` yeterlidir. Bir düzineyi aşan özelliklerde, scope'lar sayesinde Transloco daha güvenli çalışma zamanı tercihidir.

</Accordion>
<Accordion header="Çeviriler bir TMS'ten veya ajanstan geliyor">

`@angular/localize` her TMS'in okuduğu XLIFF'i dışa aktarır ve şablondaki kaynak metin çevirmenlere gerçek bağlam verir. `ngx-translate` ve Transloco JSON'u da yaygın olarak desteklenir. Bir çalışma zamanı kütüphanesi seçmeden önce tedarikçinizin ICU çoğul biçimlerini işleyip işlemediğini kontrol edin, çünkü ikisi de bunun için eklenti gerektirir.

</Accordion>
<Accordion header="Büyük uygulama, çok sayıda lazy route, bundle bütçesi">

Transloco scope'ları veya Intlayer. İkisi de her özelliğin string'lerini her route'a göndermekten kaçınır. Fark, zorunlu kılma biçimindedir: Transloco scope'u bir konvansiyondur, Intlayer sözlüğü yalnızca `useIntlayer()` tarafından içe aktarıldığı yerde bundle'a girer. Bkz. [bundle optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md).

- [bundle optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Tip güvenliği bir gereklilik">

Anahtarları kutudan çıktığı gibi yalnızca Intlayer tipler. `ngx-translate` ve Transloco'da anahtardaki bir yazım hatası derlenir ve üretimde ham anahtar olarak görünür. Transloco Keys Manager bunu CI'da yakalayabilir, bu hiç yoktan iyidir ama derleme hatasıyla aynı şey değildir. [Eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md) yazısı yaklaşımları karşılaştırır.

- [eksik çevirileri tespit etme](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/detecting_missing_translations.md)

</Accordion>
<Accordion header="Çeviriler yapay zekâ tarafından üretilecek">

Bileşenin yanındaki içerik ve eksik locale'leri dolduran bir CLI en kısa yoldur. Intlayer'ın [`fill` komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) kendi API anahtarınızla çalışır ve yalnızca değişeni yeniden çevirir. XLIFF veya JSON kataloglarıyla aynı döngüyü kendiniz betikleyeceksiniz.

- [`fill` komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md)

</Accordion>
</AccordionGroup>

## Her birinin eksik kaldığı yerler

- **`@angular/localize`**: locale başına bir build ve bir dağıtım, dil değişiminde yeniden yükleme, kaynak metin değiştiğinde çevirileri sahipsiz bırakan hash'li ID'ler ve build sonrasında bootstrap hileleri olmadan bir CMS'ten çeviri yükleyememe.
- **`ngx-translate`**: tipsiz anahtarlar, eklentiyle çoğul ve ICU, her sayfada tam locale dosyası, her change detection'da yeniden değerlendirilen impure pipe ve tarih ile sayılar için `LOCALE_ID` desteğinin olmaması.
- **Transloco**: tipsiz anahtarlar, eklentiyle ICU ve garanti değil konvansiyon olan scope'lar. `@angular/localize`'ın yerel olarak sunduğu şey için bir araya getirilmesi gereken birkaç eklenti.
- **Intlayer**: `angular.json` içinde üçüncü taraf bir builder, diğer üçünden daha küçük bir Angular topluluğu, kısmi ICU desteği ve tasarım gereği codebase'e yayılmış içerik, bu yüzden bir çevirmen için tek dosya dışa aktarmak [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md) veya CLI gerektirir.

- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)

## ngx-translate'ten geçiş

[`@intlayer/ngx-translate` uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md), içeriği Intlayer sunarken `TranslateService`, `translate` pipe'ı ve `[translate]` direktifinin çalışmaya devam etmesini sağlar, böylece şablonlar tek tek taşınabilir. [Geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_ngx-translate_to_intlayer.md) süreci adım adım anlatır. Transloco veya `@angular/localize` için [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), geçiş sırasında mevcut JSON kataloglarını gerçeğin kaynağı olarak tutabilir.

- [`@intlayer/ngx-translate` uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/ngx-translate.md)
- [geçiş rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_ngx-translate_to_intlayer.md)
- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="ngx-translate hâlâ bakımda mı?">

Evet. Yıllarca düşük etkinlikten sonra proje 2024'te yeni bir bakımcı aldı ve o zamandan beri `provideTranslateService` gibi standalone API'ler yayımladı. Tasarımı değişmedi: çalışma zamanında JSON, string anahtarlar, eklentiyle çoğul biçimler.

</Question>

<Question title="Yeni bir Angular uygulaması için ngx-translate mi Transloco mu?">

Uygulama küçük değilse Transloco. `ngx-translate`'in yaptığını kapsar ve scope'lar, signal yardımcıları, SSR yönlendirmesi ve anahtarlar için araçlar ekler. İki API birbirine yeterince yakındır, bu yüzden sonradan geçmek çoğunlukla mekaniktir, ancak uygulama büyüyecekse daha basit olanla başlamak için bir neden yoktur.

</Question>

<Question title="@angular/localize yeniden yüklemeden dil değiştirebilir mi?">

Tasarlandığı şekliyle hayır. Çeviriler derleme zamanında gömülür, bu yüzden başka bir dil başka bir build demektir. Çalışma zamanında çeviri yüklemek için bootstrap'tan önce `loadTranslations()` çağrılabilir, ancak dil değiştirmek yine de uygulamanın yeniden başlatılmasını gerektirir.

</Question>

<Question title="Angular SEO için en iyi seçenek hangisi?">

Kütüphane, routing'den daha az önemlidir: locale başına bir URL, `hreflang` etiketleri, `<html lang>` ve çevrilmiş sunucu tarafı render edilmiş HTML. `@angular/localize` bunları neredeyse bedavaya alır, çünkü her locale ayrı bir build'dir. Çalışma zamanı kütüphanelerinin bunu yakalaması için SSR ve yerelleştirilmiş route'lara ihtiyacı vardır. Bkz. [uluslararasılaştırma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md).

- [uluslararasılaştırma ve SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/internationalization_and_SEO.md)

</Question>

<Question title="Intlayer Analog ile çalışır mı?">

Evet, Vite üzerinden. Bkz. [Analog rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_analog.md).

- [Analog rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_analog.md)

</Question>

</FAQ>

## Daha fazlası

- [Intlayer'ı Angular 22'de kurma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)
- [Intlayer'ı Angular 19'da kurma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_19.md)
- [i18n benchmark'ları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [Derleyici ve bildirimsel i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md)
- [ICU mesaj formatı](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md)
- [Uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md)

Aynı karşılaştırma şunlar için de var

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/how_to_pick_solid_i18n_library.md)
