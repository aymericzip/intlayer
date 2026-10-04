---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: ICU MessageFormat Neden JavaScript İçin Uygun Değil
description: "ICU MessageFormat, Java ve C++ için geliştirildi. Tarayıcıda tam destek sağlamak yaklaşık 10 KB parser kodu gerektirir. Bu maliyetin kaynağı ve modern alternatifler."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu bundle boyutu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n çoğullaştırma
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# ICU MessageFormat Neden JavaScript İçin Uygun Değil

ICU MessageFormat başarılı bir standarttır. Kapsamlıdır, çevirmenler tarafından iyi bilinir ve çoğu çeviri yönetim sistemi (TMS) tarafından desteklenir. Asıl sorun, tasarlandığı çalışma zamanı (runtime) ortamıdır. ICU, tam bir mesaj ayrıştırıcısı (parser) ve biçimlendiricisinin programın geri kalanına kıyasla önemsiz bir maliyet oluşturduğu C++ ve Java dünyasından gelmektedir. Bir tarayıcı paketinde (bundle) ise bu maliyet her sayfa yüklemesinde ödenir.

Bu yazıda ICU'nun kökenlerini, çoğul biçimlerdeki sözdiziminin neden hantal olduğunu ve tam uyumluluğun herhangi bir JavaScript i18n kütüphanesine neden gereksiz yük getirdiğini inceliyoruz. Doğrudan sözdizimi yapısını incelemek isterseniz, öncelikle [ICU Message Format kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md) göz atabilirsiniz.

- [ICU Message Format kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md)

<TOC/>

## IBM'den Unicode Konsorsiyumu'na

ICU, _International Components for Unicode_ ifadesinin kısaltmasıdır. Mesaj sözdizimi Java ile başladı: Apple ve IBM ortaklığı olan Taligent, `java.text.MessageFormat` dahil olmak üzere JDK 1.1'in (1997) uluslararasılaştırma sınıflarını yazdı. IBM bu sınıfları ICU4J olarak geliştirmeyi sürdürdü, C/C++ için ICU4C olarak uyarladı ve 1999'da açık kaynak olarak yayınladı. 2016'da ICU, bağlı olduğu CLDR yerel ayar verilerini de yöneten Unicode Konsorsiyumu'na devredildi.

### Başlangıçtaki kullanım alanları

Asıl hedef sunucu ve masaüstü yazılımlarıydı: Java kurumsal uygulamaları, IBM ürünleri ve daha sonra işletim sistemleri. Mesajlar, `ResourceBundle` aracılığıyla yüklenen Java `.properties` dosyalarında veya C/C++ için ICU'nun kendi kaynak paketi biçiminde tutuluyordu:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

JDK'nın ilk sürümünde `plural` bulunmuyordu. Yalnızca sayısal aralıkları kullanan `choice` (`{0,choice,0#no files|1#one file|1<{0} files}`) vardı ve bu da yalnızca İngilizce gibi çoğullaşan dillere uyuyordu. ICU, 2008'de (ICU 4.0) CLDR kurallarına dayalı `plural` yapısını ve 2010'da (ICU 4.4) `select` yapısını ekledi.

### `.po` dosyasından farkı

ICU sık sık gettext ile karıştırılır, ancak bunlar iki ayrı gelenektir. `.po` dosyaları GNU gettext'ten (C, Linux, ardından PHP ve Python) gelir. Bir `.po` girdisi basit `msgid` / `msgstr` çiftlerinden oluşur ve çoğul kuralları dosya başlığındaki bir C ifadesiyle (`Plural-Forms: nplurals=2; plural=(n > 1);`) belirlenir. Mesajın içinde dallanma mantığı yoktur. ICU ise dallanmayı doğrudan metin dizesinin içine yerleştirir, böylece tek bir mesaj `plural`, `select` ve sayı biçimlendirmeyi bir arada harmanlayabilir.

### ICU bugün nerelerde çalışıyor

ICU4C; Android, iOS, macOS, Windows, Node.js ile Chrome ve Firefox'un JavaScript motorlarında yerleşik olarak gelir. Tarayıcının standart `Intl` API'leri büyük ölçüde bunun üzerine inşa edilmiştir. Dolayısıyla tarayıcı, ICU'nun çoğul kurallarını, sayı ve tarih biçimlendirmelerini zaten içerir. İçermediği tek şey mesaj parser bileşenidir: `Intl.MessageFormat` henüz TC39 tekliflerinin erken bir aşamasındadır, yeni MessageFormat 2 sözdizimi üzerine kuruludur ve ICU MessageFormat 1 ile geriye dönük uyumlu değildir.

Bu tarihsel süreç tasarım tercihlerini açıklar:

- **Sunucu ve masaüstü çalışma zamanlarını hedefler.** Çalışma zamanında bir metin dizesini ayrıştırmak bu ortamlarda oldukça ucuzdur ve kütüphane sisteme bir kez kurulur, her ziyaretçi tarafından tekrar tekrar indirilmez.
- **Dize içinde bir DSL barındırır.** Dallanma, sayı biçimlendirme, tarihler ve iç içe geçmeler, bir çevirmenin koda dokunmadan düzenleyebileceği tek bir sözdizimi altında toplanır.
- **Eksiksizliği hedefler.** Bir çevirmenin ihtiyaç duyabileceği her gramer durumu için ayrı bir operatör bulunur.

Bu kararların hiçbiri yanlış değildir. Sadece tarayıcının sunduğu kısıtlı ortam düşünülerek tasarlanmamışlardır.

## Çoğul yapıları gereksiz derecede uzundur

ICU'nun en yaygın yapısı aynı zamanda en karmaşık olanıdır. Sıfır durumunu da içeren bir sayaç ifadesi şu şekildedir:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Bu yapı; argüman adı, `plural` anahtar sözcüğü, her dal için bir etiket, iç içe süslü parantezler ve yalnızca çoğul bloklarında geçerli olan özel `#` işaretini gerektirir. Bir de öznenin dilbilgisel cinsiyeti eklendiğinde iç içe geçme katlanarak artar:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

On beş satırdan dokuzu yalnızca sözdizimi iskeletinden ibarettir. Örneğin Lehçe bu üç cinsiyet dalının her biri için dört farklı çoğul dalına ihtiyaç duyar. Bu durumda çevrilen dize yoğun bir parantez yığınına dönüşür ve eksik tek bir `}` karakteri tüm mesajı bozar, üstelik bu hata çoğu zaman yalnızca çalışma zamanında fark edilir.

JavaScript'te ise aynı yapı doğrudan veri olarak ifade edilebilir: anahtarları çoğul kategorilerine karşılık gelen, tip sistemi ve kod editörü tarafından doğrulanabilen ve dosya ile değer arasında ayrıştırıcı gerektirmeyen standart bir nesne.

## Kapsamlı olmanın getirdiği paket maliyeti

ICU oldukça geniş bir yelpazeyi kapsar:

- Tam eşleşmeler (`=0`) ve kaydırmalar (`offset:`) içeren `plural`
- Kendi CLDR sıra sayıları tablosuna sahip `selectordinal`
- İstenilen derinlikte iç içe geçebilen `select`
- Klasik stil adları (`number, currency`) veya iskeletler (`::currency/EUR compact-short`) içeren `number`, `date` ve `time` argümanları
- Kaçış ve tırnak kuralları (`'{'`, `''`)
- Belirli uygulamalarda yer alan zengin metin etiketleri (`<b>…</b>`)

ICU ile 1:1 uyumluluk vadeden bir kütüphane bu parçaların tamamını paketlemek zorundadır, çünkü derleme anında mesajlarınızın hangi özellikleri kullanacağını bilemez. Pratikte bu durum şunları gerektirir:

1. Dizeyi bir AST'ye dönüştüren ve hatalı parantezleri yakalayan bir **parser**.
2. Sayı ve tarihlerin `::` sözdizimini çözen ve başlı başına küçük bir dil olan bir **skeleton parser**.
3. AST'yi dolaşarak her düğümü `Intl.PluralRules`, `Intl.NumberFormat` ve `Intl.DateTimeFormat` ile eşleyen bir **formatter**.

Üçüncü bölüm oldukça hafiftir, çünkü modern JavaScript zaten CLDR mantığını `Intl` içinde barındırır. İlk iki bileşen ise yalnızca metin sözdizimini okumak için vardır. `react-intl` ve `next-intl` kütüphanelerinin temelini oluşturan FormatJS'in `intl-messageformat` paketinde bu durum, kendi çevirileriniz yüklenmeden önce her kullanıcıya gönderilen yaklaşık **10 KB sıkıştırılmış JavaScript** anlamına gelir.

Çoğu web uygulaması bu yeteneklerin çok azını kullanır: `{name}` ekleme ve birkaç `plural` bloğu. Ancak çalışma zamanında ayrıştırılan bir dize paketleyicinin neyin çıkarılabileceğini bilmesini engellediğinden, iskeletler, sıra sayıları ve kaydırmalar için gerekli olan tüm parser kodu yine de indirilir.

## next-intl de aynı problemle karşılaştı

Bu sadece teorik bir endişe değildir. En popüler ICU tabanlı kütüphanelerden biri olan `next-intl` de aynı sonuca vardı. Sürüm 4.8'de (Ocak 2026), ICU mesajlarını derleme sırasında ayrıştırıp kompakt bir AST'ye dönüştüren ve çalışma zamanı parser'ını küçük bir değerlendiriciyle değiştiren deneysel bir `precompile` seçeneği eklendi. Proje, bu ayar açıldığında **yaklaşık 9 KB sıkıştırılmış JavaScript kodunun tasarruf edildiğini** belirtmektedir.

Ancak bu uzlaşma yöntemin sınırlarını da gösterir: ön derleme aktifken `t.raw` çalışmaz, çünkü ham ICU dizesi çalışma zamanında artık mevcut değildir. Tarayıcıda ayrıştırmayı bıraktığınız an, aslında artık saf ICU dağıtmıyorsunuzdur. Dağıtılan şey derlenmiş bir gösterimdir ve metin sözdizimi yalnızca yazım aşamasında bir araç olarak kalır.

Bu noktada şu soru haklılık kazanır: Eğer tarayıcı bu dizeyi doğrudan okumuyorsa, geliştiriciler ve çevirmenler neden bu karmaşık sözdizimini yazmak zorunda kalsın?

## JavaScript'e özgü yaklaşım nasıl görünür

JavaScript karmaşık kısımları yerel olarak çözer. `Intl.PluralRules`, Lehçenin dört çoğul kategorisi ve İngilizcenin dört sıra sayısı kategorisi olduğunu bilir. `Intl.NumberFormat` ve `Intl.DateTimeFormat`; para birimlerini, birimleri, kompakt gösterimleri ve takvimleri eksiksiz yönetir. Geriye yalnızca doğru dalı seçmek ve değerleri yerleştirmek kalır; bu da yapı metin yerine veri olduğunda sadece birkaç satır sürer.

Intlayer'ın benimsediği model budur. Dallanma mantığı tipli bir içerik bildirimi içindeki bir fonksiyondur ve her dil yalnızca kendi gramerinin gerektirdiği kategorileri tanımlar:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      tr: plural({
        other: "{{count}} okunmamış mesaj",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Lehçe yerel ayarı → "5 nieprzeczytanych wiadomości"
```

ICU'ya kıyasla değişenler:

- **Pakette parser bulunmaz.** Yapı, tarayıcıya ulaştığında zaten hazır bir nesnedir. `plural`, tarayıcının yerel `Intl.PluralRules` API'sini kullanarak anahtarı seçer.
- **Hatalar derleme anında yakalanır.** Eksik bir dal veya anahtardaki yazım hatası bir TypeScript tip hatası üretir, böylece canlı ortamda beklenmedik çökmeler önlenir.
- **Biçimlendirme mesajın dışında kalır.** Sayılar, tarihler ve para birimleri, doğrudan `Intl` API'sini kullanan [biçimlendirici kancaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md) üzerinden işlenir; böylece skeleton parser gereksinimi ortadan kalkar.
- **Kullanılmayan özellikler sıfır maliyetlidir.** Hiçbir mesajda `gender` kullanılmıyorsa, paketleyici tree-shaking ile bu kodu tamamen eler.

- [Biçimlendirici kancaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/formatters.md)

Elbette bu yaklaşımın da gereksinimleri vardır: bir derleme adımı zorunludur, içerik dosyaları düz metin yerine kod yapısındadır ve yalnızca ICU dizelerine odaklanan bazı TMS araçları TypeScript tanımlarını doğrudan okuyamayabilir.

## ICU ne zaman doğru tercih olmaya devam eder

ICU şu senaryolarda en iyi seçenek olmayı sürdürür:

- **Çeviri iş akışınız tamamen ICU üzerine kuruluysa.** Birçok TMS aracı ICU dizelerini içe ve dışa aktarır ve çevirmenler bu sözdizimine alışkındır.
- **Mesajlar platformlar arasında paylaşılıyorsa.** Aynı çeviri kataloğunun bir iOS uygulaması, bir Android uygulaması ve bir web uygulaması tarafından ortak kullanılması standart bir formatı korumak için güçlü bir nedendir.
- **Elinizde zaten geniş bir ICU mesaj kataloğu bulunuyorsa.** Binlerce mevcut mesajı baştan yazmak genellikle tek başına ekonomik bir değer taşımaz.

Son senaryoda, sıfırdan yeniden yazmak ile ağır bir parser taşımak arasında seçim yapmak zorunda değilsiniz. Intlayer'ın [react-intl uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md), mevcut ICU dizelerini (`plural`, `select`, `selectordinal`, `#`, klasik `number` / `date` / `time`) doğrudan okuyabilir. Böylece kademeli olarak geçiş yapabilir ve ICU maliyetini yalnızca eski mesajların ihtiyaç duyduğu yerlerle sınırlı tutabilirsiniz.

- [react-intl uyumluluk adaptörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/react-intl.md)

## Sonuç

ICU MessageFormat önemli bir sorunu çözmüştür: gramer kuralları uygulama kodundaki `if (count === 1)` şartlarına değil, çevirmenlere aittir. Bunu, dize tabanlı bir DSL ayrıştırmanın maliyetsiz olduğu ortamlarda mükemmel şekilde başarmıştır. Ancak web tarayıcısında tam uyumluluk sağlamak, çoğu uygulamanın hiç kullanmadığı özellikler için büyük bir parser kodunu taşımayı gerektirir. Nitekim ICU tabanlı kütüphaneler bile artık bundan kaçınmak için mesajları önceden derlemeye yönelmektedir.

JavaScript, CLDR kurallarını `Intl` aracılığıyla zaten eksiksiz sunmaktadır. Modern bir i18n formatından asıl beklenen koşullu dallanma mantığıdır ve bu mantık tipli veri olarak çok daha verimli şekilde temsil edilebilir.

## Daha fazlası

- [ICU Message Format: sözdizimi, çoğullar ve select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/icu_message_format.md)
- [Intlayer'da çoğul içerik yönetimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/plurial.md)
- [Select tabanlı koşullu içerik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/select.md)
- [i18n kütüphaneleri performans karşılaştırması](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)
- [next-intl güncelliğini yitirdi mi?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/is_next-intl_outdated.md)
