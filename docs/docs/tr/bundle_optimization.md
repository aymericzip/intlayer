---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n Paket Boyutu ve Performans Optimizasyonu
description: Uluslararasılaştırma (i18n) içeriğini optimize ederek uygulama paket boyutunuzu küçültün. Intlayer ile sözlükler için tree shaking ve lazy loading'i nasıl kullanacağınızı öğrenin.
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
  - version: 8.12.0
    date: 2026-06-07
    changes: "Babel/Webpack için `intlayerPurgeBabelPlugin` ve `intlayerMinifyBabelPlugin` eklendi; eklenti (plugin) süreci netleştirildi"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Derleme (build) yapılandırmasına `minify` ve `purge` seçenekleri eklendi"
author: aymericzip
---

# i18n Paket Boyutu ve Performans Optimizasyonu

JSON dosyalarına dayanan geleneksel i18n çözümlerinde en yaygın zorluklardan biri içerik boyutunu yönetmektir. Geliştiriciler içeriği manuel olarak isim alanlarına (namespaces) ayırmazlarsa, kullanıcılar genellikle yalnızca tek bir sayfayı görüntülemek için her sayfanın ve potansiyel olarak her dilin çevirilerini indirir.

Örneğin, 10 dilde çevrilmiş 10 sayfalı bir uygulama, bir kullanıcının yalnızca **birine** (geçerli dilde geçerli sayfaya) ihtiyacı olmasına rağmen 100 sayfanın içeriğini indirmesine neden olabilir. Bu da israf edilen bant genişliği ve daha yavaş yükleme süreleri anlamına gelir.

**Intlayer bu sorunu build zamanı optimizasyonlarıyla çözer.** Kodunuzu analiz ederek her bileşen (component) için gerçekte hangi sözlüklerin kullanıldığını tespit eder ve yalnızca gerekli içeriği paketinizin (bundle) içine yeniden enjekte eder.

## İçindekiler

<TOC />

## Paketinizi analiz edin

Paketinizi analiz etmek, "ağır" JSON dosyalarını ve kod bölme (code-splitting) fırsatlarını belirlemede atılacak ilk adımdır. Bu araçlar, uygulamanızın derlenmiş (compiled) kodunun görsel bir treemap'ini oluşturarak tam olarak hangi kütüphanelerin en çok yer kapladığını görmenize olanak tanır.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite, arka planda Rollup kullanır. `rollup-plugin-visualizer` eklentisi, grafiğinizdeki her modülün boyutunu gösteren etkileşimli bir HTML dosyası üretir.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Raporu otomatik olarak tarayıcınızda açar
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

App Router ve Turbopack kullanan projelerde, Next.js ekstra bir bağımlılığa ihtiyaç duymayan yerleşik, deneysel bir analizör sağlar.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Next.js'de varsayılan Webpack paketleyiciyi kullanıyorsanız, resmi bundle analyzer'ı kullanın. Bunu derleme (build) sırasında bir ortam değişkeni ayarlayarak tetikleyebilirsiniz.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Next.js yapılandırmanız
});
```

**Kullanımı:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standart Webpack

Create React App (ejected), Angular veya özel Webpack yapılandırmaları için endüstri standardı olan `webpack-bundle-analyzer`ı kullanın.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Nasıl Çalışır

Intlayer, **bileşen başına bir yaklaşım** kullanır. Global JSON dosyalarının aksine, içeriğiniz bileşenlerinizin yanında veya içinde tanımlanır. Derleme işlemi sırasında Intlayer şunları gerçekleştirir:

1. `useIntlayer` çağrılarını bulmak için kodunuzu **analiz eder**.
2. Karşılık gelen sözlük (dictionary) içeriğini **oluşturur**.
3. `useIntlayer` çağrısını, yapılandırmanıza göre optimize edilmiş kod ile **değiştirir**.

Bu şu anlamlara gelir:

- Bir bileşen (component) import edilmezse, içeriği de pakete (bundle) dahil edilmez (Dead Code Elimination).
- Bir bileşen lazy-loaded (tembel yükleme) ile çağrılırsa, içeriği de lazy-loaded olur.

## Eklenti (Plugin) Referansı

Intlayer'ın derleme optimizasyonu, her birinin tek bir sorumluluğu olduğu birkaç ayrı eklentiye bölünmüştür. Her birinin ne işe yaradığını anlamak yapılandırma sırasında karışıklığı önler.

### Babel eklentileri (`@intlayer/babel`)

Bunlar doğrudan Webpack tabanlı yapılandırmalarda (Babel ile kullanılan Next.js, CRA, özel Webpack vb.) `babel.config.js` içinde kullanılır.

| Eklenti                       | Ne yapar                                                                                                                                  |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | `.content.ts` dosyalarını tarayarak derlenmiş sözlükleri `.intlayer/` altına yazar                                                        |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')` çağrısını `useDictionary(hash)` olarak yeniden yazar ve ilgili sözlük için eşleşen bir `import` ifadesi enjekte eder |
| `intlayerPurgeBabelPlugin`    | Tüm kaynak dosyaları tarar, derlenmiş `.intlayer/**/*.json` sözlük dosyalarından **kullanılmayan içerik alanlarını** temizler             |
| `intlayerMinifyBabelPlugin`   | JSON dosyalarındaki ve kaynak koddaki **içerik alanı anahtarlarını kısa alfabetik isimlere (alias)** (`title` → `a`) dönüştürür           |

> **Eklenti sırası önemlidir.** `babel.config.js` dosyanızda purge ve minify eklentileri optimize eklentisinden **önce** gelmelidir. Optimize aşaması `useIntlayer('key')` öğesini belirsiz bir `useDictionary(hash)` çağrısı ile değiştirdiğinden, purge ve minify işlemlerinin hangi alanların kullanıldığını tespit edebilmesi için gerekli olan sözlük anahtar bilgisi kaybolur.

Her Babel eklentisi, yapılandırma yüklenme zamanında `intlayer.config.ts`'yi bir kez okuyan ve önceden çözümlenmiş değerler döndüren, kendisine eşlik eden bir opsiyon yardımcısı (options helper) içerir:

| Opsiyon yardımcısı           | Birlikte kullanıldığı eklenti |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite eklentileri (`vite-intlayer`)

Vite kullanıcıları **bunları asla doğrudan yapılandırmaz**. Bunlar `vite.config.ts` içinde `withIntlayer()` fonksiyonu çağrıldığında otomatik olarak bağlanır. `intlayer.config.ts` içindeki `build.purge` ve `build.minify` bayrakları, ek bir eklenti kaydına (registration) gerek kalmadan karşılık gelen davranışı etkinleştirip kapatır.

| Dahili Vite eklentisi | Eşdeğer davranışı                                                                                |
| :-------------------- | :----------------------------------------------------------------------------------------------- |
| Usage analyzer        | `intlayerPurgeBabelPlugin` analizi ile aynı                                                      |
| Dictionary prune      | `intlayerPurgeBabelPlugin` JSON yazma adımı ile aynı                                             |
| Dictionary minify     | `intlayerMinifyBabelPlugin` JSON yazma adımı ile aynı                                            |
| Babel transform       | `intlayerMinifyBabelPlugin` kaynak kod yeniden adlandırması + `intlayerOptimizeBabelPlugin` aynı |

## Platforma Göre Kurulum

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js, derleme işlemleri için SWC kullandığından, optimize adımı (import yeniden yazma) için `@intlayer/swc` eklentisine ihtiyaç duyar.

> Bu eklenti varsayılan olarak yüklenmez çünkü SWC eklentileri Next.js için hala deneysel aşamadadır. İlerleyen zamanlarda bu durum değişebilir.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Yüklendikten sonra Intlayer eklentiyi otomatik olarak algılar ve kullanır.

**Purge ve minify** adımları için (alan kaldırma ve alan yeniden adlandırma), bununla birlikte `@intlayer/babel` paketini de kurun ve Babel eklentilerini ekleyin. Next.js dönüşüm için SWC'yi kullansa da, eklenti yapılandırması için hala `babel.config.js` dosyasını kontrol ettiği için Babel eklentileri SWC'den önceki bir adım olarak çalışır.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: kullanılmayan içerik alanlarını .intlayer/**/*.json'dan siler
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: JSON + kaynak kodunda içerik alanı anahtarlarını yeniden adlandırır
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Not: intlayerOptimizeBabelPlugin burada GEREKLİ DEĞİLDİR çünkü
    // @intlayer/swc paketi useIntlayer → useDictionary değişikliğini halleder.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite, `vite-intlayer` bağımlılığı (dependency) olarak dahil edilen `@intlayer/babel` eklentisini kullanır. Import yeniden yazma, purge ve minify işlemlerini barındıran tam optimizasyon işlemi varsayılan olarak etkindir ve herhangi bir ekstra eklenti kaydı gerektirmez.

`intlayer.config.ts` içinde karşılık gelen ayarları ayarlayarak purge ve minify seçeneklerini etkinleştirebilirsiniz:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // derlenmiş paketlenmiş JSON içinden kullanılmayan içerik alanlarını kaldır
    minify: true, // içerik alanı anahtarlarını daha kısa isimlere (alias) yeniden adlandır
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (ve Babel kullanan Next.js)

`@intlayer/babel` paketini yükleyin:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Dört eklentinin (plugin) tümünü `babel.config.js` dosyasına doğru sırayla ekleyin:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: .content.ts dosyalarını → .intlayer/**/*.json olacak şekilde derler
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: kullanılmayan alanları .intlayer/**/*.json dosyalarından kaldırır
    //    (intlayer.config.ts içerisindeki build.purge seçeneğini okur)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: JSON ve kaynak kodundaki alan anahtarlarını kısaltarak yeniden adlandırır
    //    (intlayer.config.ts içerisindeki build.minify seçeneğini okur)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: useIntlayer('key') çağrılarını → useDictionary(hash) çağrısına çevirir
    //    Sözlük anahtarını tamamen değiştirdiği için en sonda bulunmalıdır.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Yapılandırma

Intlayer'ın paketinizi (bundle) nasıl optimize edeceğini `intlayer.config.ts` dosyanızdaki `build` özelliği aracılığıyla kontrol edebilirsiniz.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.TURKISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Derleme zamanında useIntlayer() çağrılarını doğrudan sözlük içe aktarmalarıyla (import) değiştirir.
    // undefined = otomatik (üretim/production ortamında etkin), true = daima, false = asla.
    optimize: undefined,

    // Derlenmiş sözlüklerdeki içerik alanı anahtarlarını kısa alfabetik isimlerle (alias) yeniden
    // adlandırır (örneğin title → a). JSON boyutunu küçültür; optimize işlemi (optimize: true) gerektirir.
    minify: true,

    // Kaynak kodda asla erişilmeyen içerik alanlarını kaldırır.
    // optimize işlemi gerektirir.
    purge: true,
  },
};

export default config;
```

> Çoğu durumda `optimize` ayarı için varsayılan değeri (`undefined`) korumak önerilir.

> Tüm seçenekler için yapılandırma referansına bakın: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

### Derleme (Build) Seçenekleri

| Özellik        | Tip                   | Varsayılan  | Açıklama                                                                                                                                                                                                                               |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined` | İçe aktarma (import) yeniden yazma işlemini etkinleştirir. `undefined` = yalnızca production derlemelerinde aktiftir. `false` olarak ayarlanırsa purge ve minify işlemleri de devre dışı kalır.                                        |
| **`minify`**   | `boolean`             | `false`     | Derlenmiş JSON dosyalarındaki içerik alanlarının anahtar isimlerini kısa alfabetik adlara dönüştürür. Kaynak kodundaki eşleşen özellikleri de buna uygun şekilde yeniden adlandırır. `optimize` ayarı `false` ise hiçbir etkisi olmaz. |
| **`purge`**    | `boolean`             | `false`     | Derlenmiş JSON dosyalarından, kaynak kodda erişilmeyen statik içerik alanlarını kaldırır. `optimize` ayarı `false` ise hiçbir etkisi olmaz.                                                                                            |

### Minification (alan anahtarını yeniden adlandırma)

`build.minify` komutu JavaScript paketinizi minify **etmez** — bunu bundler'ınız (Webpack, Rollup vb.) halleder. Bunun yerine, kullanıcı tarafından tanımlanmış her içerik alanının adını kısa bir harfe çevirerek derlenmiş olan JSON sözlük dosyalarını küçültür:

```
// Minify öncesi
{ "title": "Merhaba", "subtitle": "Dünya" }

// Minify sonrası
{ "a": "Merhaba", "b": "Dünya" }
```

Aynı yeniden adlandırma işlemi kaynak kodunuzdaki erişim özelliklerine de yansır; bu nedenle derlenmiş kodda `content.title` erişimi `content.a` haline gelir. Çalışma zamanı (runtime) davranışı tamamen aynı kalır.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> `optimize` seçeneği `false` olduğunda veya `editor.enabled` `true` olduğunda minification atlanır (görsel düzenleyicinin düzenlemeye olanak tanıması için orijinal alan isimlerine ihtiyacı vardır).

> Ayrıca, JSON'ların orijinal isimleriyle uzak (remote) API'den getirildiği durumlarda, yani sözlüklerin `importMode: 'fetch'` ile yüklendiği durumlarda da atlanır — istemci tarafındaki (client-side) isimleri değiştirmek sunucu/istemci sözleşmesini bozacaktır.

### Purging (kullanılmayan alanların silinmesi)

`build.purge`, kaynak kodunuzda gerçekte hangi içerik alanlarına erişildiğini analiz eder ve derlenen JSON dosyalarından diğer tüm kullanılmayan alanları kaldırır.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Örnek:** Beş alanı olan ve sadece ikisinin kullanıldığı bir sözlük:

```
// Purge öncesi
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Purge sonrası (kaynak kodda sadece title + subtitle kullanılıyor)
{ "title": "…", "subtitle": "…" }
```

> `optimize` `false` olduğunda veya `editor.enabled` `true` olduğunda Purge işlemi atlanır.

> Ayrıca, bir kaynak dosyasının ayrıştırılamadığı veya `useIntlayer` sonucunun bir değişkene atanıp (örneğin objeye yayılması, parçalama (destructuring) yapılmadan bir prop olarak iletilmesi gibi) statik analiz aracının takip edemeyeceği yollarla gönderildiği durumlarda Purge işlemi tedbir amaçlı olarak atlanır. Bu durumlarda tüm sözlük bozulmadan korunur.

### İçe Aktarım Modu (Import Mode)

Farklı sayfalar ve yerel ayarlar (locales) içeren büyük uygulamalarda, JSON dosyalarınız toplam paket boyutunun önemli bir bölümünü oluşturabilir. Intlayer, `importMode` seçeneğini kullanarak sözlüklerin nasıl yükleneceğini belirlemenize olanak tanır.

### Global tanımlama

İçe aktarım modu (import mode), genel kullanım için `intlayer.config.ts` dosyanızda tanımlanabilir.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Varsayılan değer 'static'
  },
};

export default config;
```

### Sözlük bazlı (Per-dictionary) tanımlama

Ayrıca tek bir sözlüğün içe aktarma modunu (import mode), kendisine ait olan `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` dosyasında kolayca üzerine yazabilirsiniz (override).

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Sözlüğün varsayılan import modunu ezer
  content: {
    // ...
  },
};

export default appContent;
```

| Özellik          | Tür                                | Varsayılan | Açıklama                                                                                                                       |
| :--------------- | :--------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Önerilmiyor**: Yerine `dictionary.importMode` seçeneğini kullanın. Sözlüklerin nasıl yükleneceğini belirler (aşağıya bakın). |

`importMode` ayarı, sözlük içeriğinin bileşeniniz içine (component) nasıl enjekte edileceğini belirler. Bunu `intlayer.config.ts` dosyasında `dictionary` altında genel olarak ayarlayabilir veya `.content.ts` dosyasında sözlük bazlı olacak şekilde değiştirebilirsiniz.

### 1. Static Mode (`default`)

Statik modda Intlayer, `useIntlayer` kullanımını `useDictionary` ile değiştirir ve sözlüğü doğrudan JavaScript paketi içerisine koyar.

- **Artıları:** Anında işleme (senkron), hydration işlemi sırasında hiç fazladan ağ (network) isteği gerektirmez.
- **Eksileri:** Paket, bileşen için desteklenen **tüm** dillerdeki (locales) içerikleri beraberinde yükler.
- **Kullanım Senaryosu:** Tek Sayfalı Uygulamalar (Single Page Applications - SPA).

**Dönüştürülmüş Kod Örneği:**

```tsx
// Yazdığınız kod
const content = useIntlayer("my-key");

// (Statik Mod için) dönüştürülmüş en iyi kodun temsili
// Bu sadece temsili bir gösterimdir; asıl kod yapılandırma ve optimizasyona bağlı olarak farklı olabilir.
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      tr: "Benim başlığım",
    },
  },
});
```

### 2. Dynamic Mode

Dinamik modda Intlayer, `useIntlayer` işlevini `useDictionaryAsync` işleviyle değiştirir. Bu, mevcut geçerli dile (locale) ait JSON verisini özel olarak ve sonradan yüklemek için `import()` işlevini (Suspense benzeri bir mekanizma) kullanır.

- **Artıları:** **Yerel (locale) seviyesinde tree shaking sağlar.** Türkçe sürümü görüntüleyen bir kullanıcı _yalnızca_ Türkçe sözlüğü indirir. İngilizce sözlük ise hiçbir zaman indirilmez veya yüklenmez.
- **Eksileri:** İlk açılışta (hydration esnasında) bileşen başına bir veri getirme ağ (network) isteğini tetikler.
- **Kullanım Senaryosu:** Büyük metin blokları barındıran uygulamalar, makaleler veya paket boyutunun (bundle size) oldukça kritik olduğu çok fazla dilli projeler.

**Dönüştürülmüş Kod Örneği:**

```tsx
// Yazdığınız kod
const content = useIntlayer("my-key");

// (Dinamik Mod için) dönüştürülmüş en iyi kodun temsili
// Bu sadece temsili bir gösterimdir; asıl kod optimizasyon nedenleriyle değişebilir
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  tr: () =>
    import(".intlayer/dynamic_dictionary/my-key/tr.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'` seçeneği kullanıyorken bir bileşende (component) `useIntlayer` kullanan 100 ayrı alanınız varsa, sistem bu alanlara ayrı ayrı olarak ulaşmak için 100 adet istek yapmaya çalışacaktır. Bu tür karmaşık olan istek (request) trafiğinden ve performans kaybından kaçınmak için atom parçalar (atom component) yerine içeriği genel alanlara ayırarak `.content` (örneğin sayfa bölümüne özel bir sözlük dosyası) gruplandırmalarına koyun. Ek olarak aynı isme sahip birkaç `.content` dosyasını kullanmak da mümkündür. İsimler (keyler) aynı ise Intlayer bunları tamamen tek bir sözlük dosyası altında gruplandıracaktır.

### 3. Fetch Mode

Dinamik modla fazlasıyla benzer şekilde çalışır ancak ilk olarak uzak sözlükleri bulup almak için Intlayer Live Sync API'ye başvurmaya çalışır. Uzak (Remote API) isteği başarısız olursa veya içeriğin anlık senkronizasyona tabi (live updates) olmadığı belirlenirse yedek (fallback) olan statik duruma, yani dinamik içe aktarım işlemine (dynamic import) geçer.

**Dönüştürülmüş Kod Örneği:**

```tsx
// Yazdığınız kod
const content = useIntlayer("my-key");

// Optimize Edilmiş Kod Örneği (Fetch - İçe Aktarım İçin)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  tr: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/tr").then((res) =>
      res.json()
    ),
});
```

> CMS (İçerik Yönetim Sistemi) için doküman detayına bakın: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

> API tarafında verilerin tamamen orijinal alan (key) bilgisi barındırması gerektiği için uzak (fetch) çalışma alanlarında (minify) küçültme ve (purge) tamamen temizleme sistemleri uygulanmaz.

## Özet: Static (Statik) vs Dynamic (Dinamik)

| Özellik              | Static Mode (Statik Mod)                                       | Dynamic Mode (Dinamik Mod)                   |
| :------------------- | :------------------------------------------------------------- | :------------------------------------------- |
| **JS Paketi Boyutu** | Büyük (Bileşen için kullanılan tüm dil dosyalarını barındırır) | Küçük (Sadece kod tabanı vardır)             |
| **İlk Yükleme Hızı** | Anlık (Sözlük, genel paketin içindedir)                        | Küçük Gecikme ile (JSON sonradan indirilir)  |
| **Ağ İstekleri**     | 0 Eksta İstek Gerektirmez                                      | 1 Sözlük için anahtar isteği alır            |
| **Tree Shaking**     | Bileşen Seviyesinde                                            | Bileşen ve Dil Seviyesinde                   |
| **En İyi Senaryo**   | UI ve Arayüz Bileşenleri, Küçük Uygulamalar                    | Büyük Yazılar içeren Siteler, Çok Sayıda Dil |
