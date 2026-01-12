---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Bileşen-Başına vs Merkezileştirilmiş i18n: Intlayer ile Yeni Bir Yaklaşım
description: React'te uluslararasılaştırma stratejilerine derinlemesine bir bakış; merkezi, per-key (anahtar-başına) ve bileşen-başına yaklaşımları karşılaştırır ve Intlayer'ı tanıtır.
keywords:
  - i18n
  - React
  - Uluslararasılaştırma
  - Intlayer
  - Optimizasyon
  - Bundle Boyutu
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# Bileşen-Başına (Per-Component) vs Merkezileştirilmiş (Centralized) i18n

Bileşen başına yaklaşımı yeni bir kavram değildir. Örneğin, Vue ekosisteminde `vue-i18n` [SFC i18n (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html) destekler. Nuxt ayrıca [bileşen başına çeviriler](https://i18n.nuxtjs.org/docs/guide/per-component-translations) sunar ve Angular, [Feature Modules](https://v17.angular.io/guide/feature-modules) aracılığıyla benzer bir desen kullanır.

Hatta bir Flutter uygulamasında bile genellikle şu desenle karşılaşırız:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Çeviriler burada yer alır
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Ancak React dünyasında genellikle farklı yaklaşımlar görüyoruz; bunları üç kategoride toplayacağım:

<Columns>
  <Column>

**Merkezi yaklaşım** (i18next, next-intl, react-intl, lingui)

- (namespace olmadan) içeriği almak için tek bir kaynak kullanır. Varsayılan olarak, uygulamanız yüklendiğinde tüm sayfalardaki içeriği yüklersiniz.

  </Column>
  <Column>

**Granüler yaklaşım** (intlayer, inlang)

- içerik alımını anahtar başına veya bileşen başına ince taneli olarak yapar.

  </Column>
</Columns>

> Bu blogda, zaten burada ele aldığım derleyici tabanlı çözümlere odaklanmayacağım: [Derleyici vs Deklaratif i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md).
> Derleyici tabanlı i18n (ör. Lingui) yalnızca içeriğin çıkarılmasını ve yüklenmesini otomatikleştirir. İçeride genellikle diğer yaklaşımlarla aynı sınırlamaları paylaşırlar.

> İçeriği ne kadar ince taneli alırsanız, bileşenlerinize ekstra state ve mantık ekleme riski o kadar artar.

Granüler yaklaşımlar merkezi olanlardan daha esnektir, ancak bu genellikle bir ödündür. Bu kütüphaneler "tree shaking" sunduklarını iddia etseler bile, pratikte genellikle bir sayfayı her dil için yüklersiniz.

Genel olarak karar kabaca şu şekilde özetlenebilir:

- Uygulamanızda dil sayısından daha fazla sayfa varsa, granüler yaklaşımı tercih etmelisiniz.
- Sayfa sayısından daha fazla diliniz varsa, merkezi yaklaşıma yönelmelisiniz.

Elbette, kütüphane yazarları bu sınırlamaların farkındadır ve çözüm yolları sağlarlar. Bunlar arasında: namespaces'lere bölme, JSON dosyalarını dinamik olarak yükleme (`await import()`), veya derleme zamanında içeriği temizleme yer alır.

Aynı zamanda, içeriğinizi dinamik olarak yüklediğinizde sunucunuza ek istekler gönderdiğinizi bilmelisiniz. Her ek `useState` veya hook, ekstra bir sunucu isteği anlamına gelir.

> Bu noktayı düzeltmek için, Intlayer birden fazla içerik tanımını aynı anahtar altında gruplamanızı önerir; Intlayer daha sonra bu içerikleri birleştirecektir.

Ancak tüm bu çözümlere bakıldığında, en popüler yaklaşımın merkezi (centralized) yaklaşım olduğu açıktır.

### Peki Merkezi yaklaşım neden bu kadar popüler?

- Öncelikle, i18next yaygın olarak kullanılan ilk çözümdü; PHP ve Java mimarilerinden (MVC) esinlenen, sorumlulukların sıkı bir ayrımına (içeriği koddan ayrı tutma) dayanan bir felsefeyi takip etti. 2011'de ortaya çıktı ve Component-Based Architectures (React gibi) yönündeki büyük değişimden bile önce kendi standartlarını belirledi.
- Sonra, bir kütüphane yaygın olarak benimsendiğinde, ekosistemi farklı yaklaşımlara kaydırmak zorlaşır.
- Merkezi bir yaklaşım kullanmak ayrıca Crowdin, Phrase veya Localized gibi Çeviri Yönetim Sistemlerinde işleri kolaylaştırır.
- Bileşen başına (per-component) yaklaşımın mantığı merkezi olandan daha karmaşıktır ve geliştirilmesi daha fazla zaman alır, özellikle içeriğin nerede bulunduğunu tespit etmek gibi problemleri çözmeniz gerektiğinde.

### Peki, ama neden sadece Centralized bir yaklaşıma bağlı kalmayalım?

Uygulamanız için neden sorunlu olabileceğini söyleyeyim:

- **Kullanılmayan Veri:** Bir sayfa yüklendiğinde genellikle tüm diğer sayfaların içeriğini de yüklersiniz. (10 sayfalık bir uygulamada bu, yüklenen içeriğin %90'ının kullanılmaması demektir). Bir modal'ı tembel yükleme (lazy load) ile mi yüklüyorsunuz? i18n kütüphanesi umursamaz, önce yine de stringleri yükler.
- **Performans:** Her yeniden render'da, bileşenlerinizin her biri devasa bir JSON payload ile hydrate edilir; bu, uygulamanız büyüdükçe reaktivitesini etkiler.
- **Bakım:** Büyük JSON dosyalarını sürdürmek zahmetlidir. Bir çeviri eklemek için dosyalar arasında atlamanız gerekir; eksik çeviri olmadığından ve geride **orphan keys** kalmadığından emin olmalısınız.
- **Tasarım sistemi:**
  Bu, design system'lerle uyumsuzluk yaratır (örn. bir `LoginForm` bileşeni) ve bileşenlerin farklı uygulamalar arasında çoğaltılmasını kısıtlar.

**"Ama Namespaces'i icat ettik!"**

Evet, bu büyük bir ilerleme. Vite + React + React Router v7 + Intlayer kurulumu için ana bundle boyutunun karşılaştırmasına bakalım. 20 sayfalık bir uygulama simüle ettik.

İlk örnek locale başına lazy-loaded çeviriler içermez ve namespace ayrımı yapmaz. İkinci örnek içerik temizleme + çeviriler için dinamik yükleme içerir.

| Optimize edilmiş bundle                                                                                                        | Optimize edilmemiş bundle                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| ![optimize edilmemiş bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![optimize edilmiş bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Bu nedenle namespaces sayesinde şu yapıdan şu yapıya geçtik:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

To this one:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Artık uygulamanızın hangi içeriğinin nerede ve ne zaman yükleneceğini ince ayrıntısına kadar yönetmeniz gerekiyor. Sonuç olarak, karmaşıklık nedeniyle projelerin büyük çoğunluğu bu kısmı atlıyor (örneğin (sadece) iyi uygulamaları takip etmenin getirdiği zorlukları görmek için [next-i18next rehberi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/i18n_using_next-i18next.md)'ne bakın).
Buna bağlı olarak, bu projeler daha önce açıklanan devasa JSON yükleme sorunuyla karşılaşıyor.

> Not: Bu sorun yalnızca i18next'e özgü değildir; yukarıda listelenen tüm merkezi yaklaşımlar için geçerlidir.

Ancak size hatırlatmak isterim ki tüm granüler yaklaşımlar bunu çözmez. Örneğin, `vue-i18n SFC` veya `inlang` yaklaşımları çevirileri her locale için varsayılan olarak tembel yükleme (lazy load) yapmaz; böylece paket boyutu sorununu başka bir sorunla takas etmiş olursunuz.

Ayrıca, uygun bir sorumluluk ayrımı olmadan, çevirilerinizi inceleme için çevirmenlere çıkarmak ve sağlamak çok daha zor hale gelir.

### Intlayer'ın bileşen başına yaklaşımı bunu nasıl çözer

Intlayer birkaç adımda ilerler:

1. **Deklarasyon:** İçeriğinizi kod tabanınızın herhangi bir yerine `*.content.{ts|jsx|cjs|json|json5|...}` dosyaları kullanarak tanımlayın. Bu, içeriği aynı konumda tutarken sorumlulukların ayrılmasını sağlar. Bir content dosyası locale başına veya çokdilli olabilir.
2. **İşleme:** Intlayer, JS mantığını işlemek, eksik çeviri fallback'larını yönetmek, TypeScript tipleri üretmek, yinelenen içeriği yönetmek, CMS'inizden içerik almak ve daha fazlası için bir build adımı çalıştırır.
3. **Temizleme:** Uygulamanız build edildiğinde, Intlayer kullanılmayan içeriği (Tailwind'in sınıfları nasıl yönettiğine biraz benzer şekilde) aşağıdaki gibi içerikleri değiştirerek temizler:

**Deklarasyon:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    tr: { title: "Başlığım" },
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**İşleme:** Intlayer, `.content` dosyasına dayanarak sözlüğü oluşturur ve şunları üretir:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json (JSON dosyası)
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Yerine Koyma:** Intlayer, uygulama derlemesi sırasında bileşeninizi dönüştürür.

**- Statik İçe Aktarma Modu:**

```tsx
// Bileşenin JSX-benzeri sözdizimindeki gösterimi
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Dinamik İçe Aktarma Modu:**

```tsx
// Bileşenin JSX-benzeri sözdizimindeki gösterimi
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Same for other languages
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync`, yalnızca gerektiğinde yerelleştirilmiş JSON'u yüklemek için Suspense-benzeri bir mekanizma kullanır.

**Bu bileşen-bağımlı yaklaşımın ana faydaları:**

- İçerik bildiriminizi bileşenlerinize yakın tutmak, daha iyi bakım kolaylığı sağlar (ör. bir bileşeni başka bir uygulamaya veya tasarım sistemine taşımak). Bileşen klasörünü silmek, ilgili içeriği de kaldırır; tıpkı muhtemelen `.test`, `.stories` dosyalarınız için yaptığınız gibi.

- Bileşen başına yaklaşım, AI ajanlarının tüm farklı dosyalarınız arasında atlamasına gerek kalmasını engeller. Tüm çevirileri tek bir yerde ele alarak görevin karmaşıklığını ve kullanılan token miktarını sınırlar.

### Sınırlamalar

Elbette, bu yaklaşım bazı ödünler gerektirir:

- Diğer l10n sistemlerine ve ek araçlara bağlanmak daha zor olur.
- Bağımlı hale gelirsiniz (ki bu, belirli sözdizimleri nedeniyle zaten her i18n çözümünde olan bir durumdur).

İşte bu yüzden Intlayer, kendi AI Provider ve API keys'inizi kullanarak AI çevirisini de içeren i18n için eksiksiz bir araç seti sağlamaya çalışır (100% ücretsiz ve OSS). Intlayer ayrıca JSON'unuzu senkronize etmeye yarayan araçlar da sağlar; bu araçlar ICU / vue-i18n / i18next mesaj formatlayıcıları gibi çalışarak içeriği bu özel formatlara eşler.
