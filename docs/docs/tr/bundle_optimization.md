---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: i18n Paket Boyutu ve Performansını Optimize Etme
description: Uluslararasılaştırma (i18n) içeriğini optimize ederek uygulama paket boyutunu azaltın. Intlayer ile sözlüklerde tree shaking ve lazy loading nasıl kullanılır öğrenin.
keywords:
  - Paket Optimizasyonu
  - İçerik Otomasyonu
  - Dinamik İçerik
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Başlangıç geçmişi
---

# i18n Paket Boyutu ve Performansını Optimize Etme

JSON dosyalarına dayanan geleneksel i18n çözümlerinde en yaygın zorluklardan biri içerik boyutunu yönetmektir. Geliştiriciler içeriği manuel olarak namespace'lere ayırmazsa, kullanıcılar genellikle tek bir sayfayı görüntülemek için her sayfanın ve potansiyel olarak her dilin çevirilerini indirirler.

Örneğin, 10 sayfadan oluşan ve 10 dile çevrilmiş bir uygulamada, kullanıcı yalnızca **bir** sayfaya (mevcut dildeki mevcut sayfa) ihtiyaç duysa bile, 100 sayfanın içeriğini indirmek zorunda kalabilir. Bu durum, gereksiz bant genişliği kullanımına ve daha yavaş yükleme sürelerine yol açar.

> Bunu tespit etmek için `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) veya `webpack-bundle-analyzer` (React CRA / Angular / vb.) gibi bundle analizörleri kullanabilirsiniz.

**Intlayer bu sorunu derleme zamanı optimizasyonu ile çözer.** Kodunuzu analiz ederek her bileşen için hangi sözlüklerin gerçekten kullanıldığını tespit eder ve yalnızca gerekli içeriği paketinizin içine yeniden enjekte eder.

## İçindekiler

<TOC />

## Nasıl Çalışır

Intlayer, **bileşen başına yaklaşım** kullanır. Küresel JSON dosyalarının aksine, içeriğiniz bileşenlerinizin yanında veya içinde tanımlanır. Derleme sürecinde Intlayer:

1.  `useIntlayer` çağrılarını bulmak için kodunuzu **analiz eder**.
2.  İlgili sözlük içeriğini **oluşturur**.
3.  `useIntlayer` çağrısını yapılandırmanıza bağlı olarak optimize edilmiş kodla **değiştirir**.

Bu, şunları garanti eder:

- Bir bileşen içe aktarılmamışsa, içeriği pakete dahil edilmez (Ölü Kod Eliminasyonu).
- Bir bileşen tembel yükleniyorsa, içeriği de tembel yüklenir.

## Platforma Göre Kurulum

### Next.js

Next.js, dönüşümü yönetmek için `@intlayer/swc` eklentisini gerektirir, çünkü Next.js derlemeler için SWC kullanır.

> Bu eklenti varsayılan olarak yüklüdür çünkü SWC eklentileri Next.js için hâlâ deneysel durumdadır. Gelecekte değişebilir.

### Vite

Vite, `vite-intlayer` bağımlılığı olarak dahil edilen `@intlayer/babel` eklentisini kullanır. Optimizasyon varsayılan olarak etkinleştirilmiştir.

### Webpack

Webpack üzerinde Intlayer ile paket optimizasyonunu etkinleştirmek için uygun Babel (`@intlayer/babel`) veya SWC (`@intlayer/swc`) eklentisini yükleyip yapılandırmanız gerekir.

### Expo / Lynx

Bu platform için paket optimizasyonu **henüz mevcut değildir**. Destek gelecekteki bir sürümde eklenecektir.

## Yapılandırma

Intlayer'ın paket optimizasyonunu `intlayer.config.ts` dosyanızdaki `build` özelliği aracılığıyla kontrol edebilirsiniz.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // veya 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> `optimize` için varsayılan seçeneğin korunması çoğu durumda önerilir.

> Daha fazla detay için doküman yapılandırmasına bakınız: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

### Build Seçenekleri

`build` yapılandırma nesnesi altında aşağıdaki seçenekler mevcuttur:

| Özellik               | Tür                             | Varsayılan                      | Açıklama                                                                                                                                                                                                                                             |
| :-------------------- | :------------------------------ | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | Derleme optimizasyonunun etkin olup olmadığını kontrol eder. `true` ise, Intlayer sözlük çağrılarını optimize edilmiş enjeksiyonlarla değiştirir. `false` ise optimizasyon devre dışı bırakılır. Üretimde ideal olarak `true` olarak ayarlanmalıdır. |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | Sözlüklerin nasıl yükleneceğini belirler (detaylar aşağıda).                                                                                                                                                                                         |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Intlayer'ın optimizasyon için taraması gereken dosyaları tanımlayan glob desenleri. İlgisiz dosyaları hariç tutmak ve derlemeleri hızlandırmak için bunu kullanın.                                                                                   |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | Oluşturulan sözlüklerin çıktı formatını kontrol eder.                                                                                                                                                                                                |

## İçe Aktarım Modları

`importMode` ayarı, sözlük içeriğinin bileşeninize nasıl enjekte edileceğini belirler.

### 1. Statik Mod (`default`)

Statik modda, Intlayer `useIntlayer`'ı `useDictionary` ile değiştirir ve sözlüğü doğrudan JavaScript paketine enjekte eder.

- **Avantajlar:** Anında render (eşzamanlı), hydration sırasında ekstra ağ isteği yok.
- **Dezavantajlar:** Paket, o belirli bileşen için mevcut **tüm** dillerin çevirilerini içerir.
- **En uygun:** Tek Sayfa Uygulamaları (SPA).

**Dönüştürülmüş Kod Örneği:**

```tsx
// Kodunuz
const content = useIntlayer("my-key");

// Optimize edilmiş kod (Statik)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Dinamik Mod

Dinamik modda, Intlayer `useIntlayer`'ı `useDictionaryAsync` ile değiştirir. Bu, `import()` (Suspense benzeri mekanizma) kullanarak mevcut yerel ayar için JSON'u tembel yükler.

- **Avantajlar:** **Yerel düzeyde tree shaking.** İngilizce sürümü görüntüleyen bir kullanıcı sadece İngilizce sözlüğü indirir. Fransızca sözlük asla yüklenmez.
- **Dezavantajlar:** Hydration sırasında her bileşen için bir ağ isteği (varlık alma) tetikler.
- **En uygun:** Paket boyutunun kritik olduğu, çok sayıda dili destekleyen büyük metin blokları, makaleler veya uygulamalar için.

**Dönüştürülmüş Kod Örneği:**

```tsx
// Kodunuz
const content = useIntlayer("my-key");

// Optimize edilmiş kod (Dinamik)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> `importMode: 'dynamic'` kullanıldığında, tek bir sayfada `useIntlayer` kullanan 100 bileşen varsa, tarayıcı 100 ayrı fetch denemesi yapacaktır. Bu istek "şelalesi"nden kaçınmak için içeriği daha az sayıda `.content` dosyasına (örneğin, sayfa bölümü başına bir sözlük) gruplayın, atom bileşen başına değil.

> Şu anda, `importMode: 'dynamic'` Vue ve Svelte için tam olarak desteklenmemektedir. Bu çerçeveler için ek güncellemelere kadar `importMode: 'static'` kullanılması önerilir.

### 3. Canlı Mod (Live Mode)

Dinamik moda benzer şekilde davranır ancak önce sözlükleri Intlayer Live Sync API'den getirmeye çalışır. Eğer API çağrısı başarısız olursa veya içerik canlı güncellemeler için işaretlenmemişse, dinamik import yöntemine geri döner.

> Daha fazla detay için CMS dokümantasyonuna bakınız: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

## Özet: Statik vs Dinamik

| Özellik             | Statik Mod                                   | Dinamik Mod                             |
| :------------------ | :------------------------------------------- | :-------------------------------------- |
| **JS Paket Boyutu** | Daha büyük (bileşen için tüm dilleri içerir) | En küçük (sadece kod, içerik yok)       |
| **İlk Yükleme**     | Anında (İçerik pakette)                      | Hafif gecikme (JSON çeker)              |
| **Ağ İstekleri**    | Ekstra 0 istek                               | Her sözlük için 1 istek                 |
| **Tree Shaking**    | Bileşen seviyesi                             | Bileşen seviyesi + Dil seviyesi         |
| **En İyi Kullanım** | UI Bileşenleri, Küçük Uygulamalar            | Çok metin içeren sayfalar, Çoklu Diller |
