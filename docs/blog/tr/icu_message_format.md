---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "ICU Message Format: Sözdizimi, Çoğullar ve Select"
description: ICU MessageFormat için pratik bir başvuru kılavuzu, argüman ekleme, çoğul ve select dallanmaları, dile göre CLDR çoğul kategorileri ve yaygın hatalar.
keywords:
  - icu message format
  - icu messageformat
  - cldr çoğul kuralları
  - çoğul kategorileri
  - selectordinal
  - i18n çoğullaştırma
  - mesaj sözdizimi
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU Message Format: Sözdizimi ve en çok hata yapılan noktalar

ICU MessageFormat, bir çevirinin kendi dallanma mantığını (çoğullar, cinsiyete bağlı biçimler, sayı ve tarih biçimlendirmesi) içermesini sağlayan bir metin sözdizimidir. Temel mantığı, dilbilgisinin `if (count === 1)` yazan geliştiriciye değil, çevirmene ait olması gerektiğidir. Bu makalede sözdizimi, basit yaklaşımların yetersiz kaldığı dile özgü kurallar ve JavaScript ekosisteminin bu süreci nasıl ele aldığı açıklanmaktadır.

## İçindekiler

<TOC/>

## Somut olarak problem

İşte neredeyse her geliştiricinin ilk yazdığı kod:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Bu mantık İngilizcede çalışır ancak diğer neredeyse tüm dillerde bozulur:

- **Rusça ve Lehçe** iki değil, üç veya dört biçime ihtiyaç duyar.
- **Türkçe ve Japonca** tek bir biçim kullanır ve araya eklenen boşluk gereksiz veya hatalı olabilir.
- **Arapça** altı çoğul biçimi gerektirir ve sayının kendisi de yerel rakam sistemiyle işlenmelidir.
- **Fransızca** bazı noktalama işaretlerinden önce bölünemez boşluk (non-breaking space) koyar, bu da `+ " "` ile birleştirildiğinde kaybolur.

Daha derin sorun ise cümlenin parçalara bölünmüş olmasıdır. Çevirmen, bağlamdan yoksun `item` ve `items` kelimelerini görür ve cümlenin sözdizimini değiştirme olanağını kaybeder. ICU MessageFormat, tüm cümleyi tek bir çevrilebilir dizede tutarak ve çevirmene dallanma operatörleri sağlayarak bu sorunu çözer.

## Basit Argümanlar

En küçük birim, tekli süslü parantezler içindeki bir yer tutucudur:

```text
Hello, {name}!
```

Biçimlendirme sırasında `{ name: "Alice" }` değerini ilettiğinizde `Hello, Alice!` çıktısını alırsınız. Süslü parantezler tek özel karakterlerdir; ekrana gerçek bir süslü parantez yazdırmak için tek tırnak içine alırsınız: `'{'`.

Tüm "enterpolasyon" (değer yerleştirme) özelliği bundan ibarettir. ICU'daki diğer tüm özellikler bunun üzerine inşa edilmiştir.

## Çoğul (plural)

`plural`, sayısal bir değere göre bir dal seçer:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Bilinmesi gereken üç temel nokta:

- **`#`** simgesi, `count` değerinin yerel ayarlara uygun olarak biçimlendirilmiş haliyle değiştirilir. Örneğin `1234`, `en-US` için `1,234` ve `tr-TR` için `1.234` haline gelir.
- **`other` zorunludur.** Eksik olduğunda tüm ICU uygulamaları hata fırlatır veya doğrulamada başarısız olur. Hiçbir kategori eşleşmediğinde yedek dal olarak kullanılır.
- **`=0`, `=1`, … tam değerlerle eşleşir** ve CLDR kategorilerinden _önce_ denetlenir. Bunları `one` yerine değil, özel durumlar ("Hiç mesaj yok") için kullanın.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset (kaydırma)

`offset:n`, kategori seçiminden ve `#` değişiminden önce sayıdan `n` çıkarır. "Alice ve diğer 3 kişi bunu beğendi" gibi kalıplar için tasarlanmıştır:

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

`count: 4` olduğunda, `#` `3` değerini üretir. `offset` oldukça yararlıdır ancak çalışma zamanlarında destek düzeyi değişiklik gösterebilir, bu yüzden projenizde doğrulamayı ihmal etmeyin.

## Çoğul kategorileri dile bağımlıdır

En sık hata yapılan nokta burasıdır. `zero`, `one`, `two`, `few`, `many`, `other` kategori adları, her dil için doldurulan evrensel kutular değildir. Her yerel ayar, [CLDR çoğul kuralları](https://cldr.unicode.org/index/cldr-spec/plural-rules) tarafından tanımlanan bir _alt kümeyi_ kullanır ve bu kurallar matematiksel sezgiye değil dilbilgisine dayanır.

| Dil       | Kod  | Kullanılan Kategoriler           | Adet |
| --------- | ---- | -------------------------------- | ---- |
| Türkçe    | `tr` | one, other                       | 2    |
| Japonca   | `ja` | other                            | 1    |
| Çince     | `zh` | other                            | 1    |
| İngilizce | `en` | one, other                       | 2    |
| Almanca   | `de` | one, other                       | 2    |
| Fransızca | `fr` | one, many, other                 | 3    |
| Çekçe     | `cs` | one, few, many, other            | 4    |
| Lehçe     | `pl` | one, few, many, other            | 4    |
| Rusça     | `ru` | one, few, many, other            | 4    |
| Arapça    | `ar` | zero, one, two, few, many, other | 6    |
| Galce     | `cy` | zero, one, two, few, many, other | 6    |

Şaşırtıcı iki önemli sonuç:

- **`one` mutlaka "1" anlamına gelmez.** Rusçada `one`, 11 ile bitenler hariç 1, 21, 31, 101 gibi 1 ile biten tüm sayıları kapsar. Fransızcada ise `0` da `one` kategorisine girer.
- **İngilizce kaynak metne kategori eklemek hiçbir şeyi çözmez.** İngilizce mesaj sadece `one` ve `other` dallarına ihtiyaç duyar; Lehçe çeviri ise dört dala ihtiyaç duyar ve bu yapı Lehçe metnin içinde bulunmalıdır. Tüm dillere aynı anahtar yapısını dayatan formatlar burada sorun yaratır.

Herhangi bir paket yüklemeden çalışma zamanınızın nasıl davrandığını test edebilirsiniz:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules`, modern tarayıcılarda ve Node'da CLDR verilerini yerleşik olarak sağlar. CLDR desteği sunan kütüphaneler arka planda çoğunlukla bu API'yi çağırır.

## select ve selectordinal

`select`, rastgele bir dizeye (cinsiyet, kullanıcı rolü, durum veya abonelik planı) göre dallanma yapar.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Anahtarlar birebir eşleştirilir ve `other` burada da zorunludur. Dillerin dilbilgisi farklı enum değerlerinden etkilendiği için, cümle yapısı bir enum değerine bağlı olduğunda `select` doğru araçtır.

`selectordinal`, `plural` ile aynı yapıya sahiptir ancak asıl sayılardan farklı bir tablo kullanan **sıra sayıları** (1., 2. vb.) kurallarını temel alır:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

İngilizce, asıl sayılarda yalnızca iki kategori kullanmasına rağmen sıra sayılarında dört kategori (1st, 2nd, 3rd, 4th) kullanır. Bu asimetri nedeniyle iki operatör birbirinden ayrılmıştır.

## Sayı, tarih ve saat argümanları

ICU, yerleştirdiği değerleri doğrudan biçimlendirebilir:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Modern biçimlendirme yöntemi, ICU 60 ile tanıtılan ve `::` önekiyle belirtilen **skeleton (iskelet)** yapısıdır. İskeletler geleneksel biçim adlarına göre çok daha kapsamlıdır:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Ekosistemde iskelet desteği farklılık gösterir. FormatJS bunları tam olarak desteklerken, bazı diğer çalışma zamanları yalnızca geleneksel `number, currency` veya `date, long` biçimlerini kabul eder. Canlıya almadan önce ortamınızın desteğini kontrol edin.

## İç içe yerleştirme ve okunabilirlik

ICU birleştirilebilir bir yapıya sahiptir. Bir çoğul dalı bir select içerebilir, bu select de başka bir çoğul içerebilir:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Bu, klasik bir ICU örneğidir ve aynı zamanda aşırı iç içe yerleştirmeye karşı en güçlü kanıttır. İki seviyeden sonra çevirmenler parantez hataları yapmaya başlar ve TMS editörleri yetersiz kalır. En fazla iki seviye iç içe yerleştirme yapın; üçüncü bir seviye gerekiyorsa cümleyi iki ayrı mesaja bölün.

## JavaScript kütüphanelerinin ICU desteği

| Kütüphane             | ICU Desteği          | Pratikte yazdığınız kod                                                 |
| --------------------- | -------------------- | ----------------------------------------------------------------------- |
| react-intl (FormatJS) | Yerel, tam           | İskeletler ve zengin metin etiketleri dahil ICU dizeleri                |
| next-intl             | Yerel                | FormatJS'in `intl-messageformat` paketi üzerinden ICU dizeleri          |
| i18next               | Eklenti gerektirir   | `key_one` / `key_other` son ekleri ve `{{name}}`; `i18next-icu` ile ICU |
| vue-i18n              | Kısmi / kendine özgü | `{name}` enterpolasyonu ve boru karakteriyle ayrılmış çoğul dalları     |
| Angular (`$localize`) | Alt küme             | Şablonlar içinde ICU `plural` / `select`, XLIFF dosyasına çıkarılır     |

Tabloya dair önemli notlar:

- **i18next'in varsayılan sözdizimi ICU değildir**, ancak bu bir dezavantaj olmak zorunda değildir. Son ekli anahtarlar (`item_one`, `item_few`) `Intl.PluralRules` kategorileriyle eşleşir ve düz JSON dosyalarında çevirmenlerin düzenlemesi genellikle daha kolaydır. Ancak `select` ve iç içe dallanmalar standart yapıda yer almadığından `i18next-icu` eklemeniz ya da mantığı kod içinde kurmanız gerekir.
- **vue-i18n'in çoğulları** varsayılan olarak CLDR kategorileri yerine dil başına tanımlı bir kural fonksiyonu kullanır. Bu pratik olsa da çoğul kuralı veride değil uygulama yapılandırmasında tutulur.
- **FormatJS referans uygulamadır**. JavaScript bağlamında "ICU MessageFormat" denildiğinde genellikle FormatJS'in desteklediği standart kastedilir.

## Intlayer bu durumu nasıl çözer?

Intlayer metin tabanlı bir DSL kullanmaz. Dallanma operatörleri, içerik bildirim dosyasında bulunan tip güvenli fonksiyonlardır. Bu sayede yapı her zaman doğrulanabilir ve her yerel ayar yalnızca kendi dilbilgisinin ihtiyaç duyduğu kategorileri tanımlar:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      tr: plural({
        one: "{{count}} açık pozisyon",
        other: "{{count}} açık pozisyon",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Lehçe yerel ayarı → "5 ofert"
```

ICU kavramlarıyla eşleşme son derece doğaldır:

| ICU Yapısı                      | Intlayer Karşılığı                                |
| ------------------------------- | ------------------------------------------------- |
| `{name}`                        | `insert("Hello {{name}}")` veya otomatik algılama |
| `{count, plural, …}`            | `plural({ one, few, many, other })`               |
| `{value, select, …}`            | `select({ draft, published, fallback })`          |
| `select` içindeki cinsiyet dalı | `gender({ male, female, fallback })`              |
| `select` içindeki boolean dalı  | `cond({ true, false })`                           |
| Sayısal aralıklar (CLDR dışı)   | `enu({ "0": …, ">5": …, fallback: … })`           |
| `{n, number, ::currency/EUR}`   | `useCurrency()(1234.5, { currency: "EUR" })`      |

`plural`, kategori seçimini doğrudan `Intl.PluralRules` API'sine devreder, böylece yukarıdaki CLDR tablosu eksiksiz çalışır. Biçimlendirme ayrı tutulur: Sayılar, tarihler, para birimleri ve listeler mesaj metnine gömülmek yerine [biçimlendirici kancaları (formatter hooks)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md) üzerinden yönetilir.

- [biçimlendirici kancaları (formatter hooks)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)

Bilinmesi gereken kısıtlamalar:

- Intlayer bir derleme adımı gerektirir; derleyici bildirimleri derleme aşamasında çıkarır. Çalışma zamanında salt JSON yüklemek istiyorsanız bu farklı bir yaklaşımdır.
- `plural` dalları içinde henüz doğrudan bir `t()` yerleştirilemez; `plural` ifadesini `t()` içine sarmanız gerekir.
- Ekosistem i18next'e göre daha yenidir, bu nedenle hazır TMS entegrasyonu sayısı henüz gelişme aşamasındadır.

Mevcut projenizde hazır ICU metinleri bulunuyorsa, [react-intl uyumluluk bağdaştırıcısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md) bunları doğrudan ayrıştırır: `plural`, `select`, `selectordinal`, `#` ve geleneksel `number` / `date` / `time` argümanları. İskeletler ve `offset:` bu çözümleyici tarafından henüz desteklenmemektedir. [i18next bağdaştırıcısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md) ise son ek biçimini (`key_one`, `key_male`) `Intl.PluralRules` ile eşleştirir.

- [react-intl uyumluluk bağdaştırıcısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md)
- [i18next bağdaştırıcısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/i18next.md)

## Yaygın hatalar

- **Çoğul mantığını JS koduna gömmek.** `count === 1 ? a : b` ifadesi, yukarıdaki tablodaki 10 dilden 8'inde yanlış sonuç üretir. Üçlü operatör koda yazıldıktan sonra hiçbir çevirmen bunu düzeltemez.
- **Çevrilmiş parçaları uç uca birleştirmek.** Kelime sırası, tamlamalar ve noktalama boşlukları yerel ayarlara göre değişir. Cümleyi her zaman tek bir bütün olarak koruyun.
- **`other` dalını unutmak.** Bu bir seçenek değil, şartnamenin zorunlu kıldığı bir kuraldır. Çoğu ayrıştırıcı hata verir, vermeyenler ise hiçbir şey görüntülemez.
- **Kategorilerin her dilde aynı olduğunu varsaymak.** İngilizce kaynak metinde `one` ve `other` olması, Lehçe çeviride de iki dal olacağı anlamına gelmez. Her yerel ayarın kendi dallarını tanımlamasına izin verin. Bkz: [Yerel ayar bazında içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md).
- **`one` yerine `=1` kullanmak.** `=1` yalnızca tam olarak 1 sayısıyla eşleşir. Rusçada 21 sayısı `one` kategorisini gerektirir ve `=1` kuralı bu sayı için asla çalışmaz.
- **`#` işaretini çoğul dalının dışına koymak.** Yalnızca `plural` veya `selectordinal` içinde özel bir anlam taşır. Başka bir yerde normal diyez karakteri olarak işlenir.
- **`#` işaretinin zaten biçimlendirilmiş olduğunu unutmak.** Sayının ham haline ihtiyacınız varsa argümanı adıyla yerleştirin.

## Daha fazlası

- [Intlayer'da Çoğul İçerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md)
- [Select Tabanlı İçerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/select.md)
- [Yerleştirme Belirteçleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)
- [i18n Kütüphane Kıyaslaması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [react-i18next, react-intl ve Intlayer Karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/react-i18next_vs_react-intl_vs_intlayer.md)
- [Uluslararasılaştırma (i18n) Nedir?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/what_is_internationalization.md)
