---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18n Bundle Boyutu ve Performans Optimizasyonu
description: Uluslararasılaştırma (i18n) içeriğini optimize ederek uygulama bundle boyutunu azaltın. Intlayer ile sözlükler için tree shaking ve lazy loading'den nasıl yararlanacağınızı öğrenin.
keywords:
  - Bundle Optimizasyonu
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Build yapılandırmasına `minify` ve `purge` seçenekleri eklendi"
---

# i18n Bundle Boyutu ve Performans Optimizasyonu

JSON dosyalarına dayalı geleneksel i18n çözümlerindeki en yaygın zorluklardan biri içerik boyutunu yönetmektir. Geliştiriciler içeriği manuel olarak ad alanlarına (namespaces) ayırmazlarsa, kullanıcılar genellikle tek bir sayfayı görüntülemek için her sayfanın ve potansiyel olarak her dilin çevirilerini indirmek zorunda kalırlar.

Örneğin, 10 dilde çevrilmiş 10 sayfası olan bir uygulama, kullanıcının sadece **bir** sayfaya (mevcut dildeki mevcut sayfa) ihtiyacı olmasına rağmen 100 sayfalık içerik indirmesine neden olabilir. Bu durum bant genişliği israfına ve daha yavaş yükleme sürelerine yol açar.

**Intlayer bu sorunu derleme zamanı optimizasyonu ile çözer.** Her bileşen başına hangi sözlüklerin gerçekten kullanıldığını tespit etmek için kodunuzu analiz eder ve bundle'ınıza yalnızca gerekli içeriği yeniden yerleştirir.

## İçindekiler

<TOC />

## Bundle'ınızı Tarayın

Bundle'ınızı analiz etmek, "ağır" JSON dosyalarını ve kod bölme (code-splitting) fırsatlarını belirlemenin ilk adımıdır. Bu araçlar, uygulamanızın derlenmiş kodunun görsel bir ağaç haritasını (treemap) oluşturarak hangi kütüphanelerin en çok yer kapladığını tam olarak görmenizi sağlar.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite, arka planda Rollup kullanır. `rollup-plugin-visualizer` eklentisi, grafiğinizdeki her modülün boyutunu gösteren etkileşimli bir HTML dosyası oluşturur.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Raporu tarayıcınızda otomatik olarak aç
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

App Router ve Turbopack kullanan projeler için Next.js, ekstra bağımlılık gerektirmeyen yerleşik ve deneysel bir analizör sağlar.

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

Next.js'de varsayılan Webpack oluşturucusunu kullanıyorsanız, resmi bundle analizörünü kullanın. Build sırasında bir ortam değişkeni ayarlayarak bunu tetikleyin.

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

**Kullanım:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standart Webpack

Create React App (ejected), Angular veya özel Webpack kurulumları için endüstri standardı olan `webpack-bundle-analyzer` aracını kullanın.

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

## Nasıl Çalışır?

Intlayer, **bileşen başına yaklaşımı** kullanır. Global JSON dosyalarının aksine içeriğiniz, bileşenlerinizin yanında veya içinde tanımlanır. Build süreci sırasında Intlayer:

1.  `useIntlayer` çağrılarını bulmak için kodunuzu **analiz eder**.
2.  Karşılık gelen sözlük içeriğini **oluşturur**.
3.  `useIntlayer` çağrısını yapılandırmanıza bağlı olarak optimize edilmiş kodla **değiştirir**.

Bu şu avantajları sağlar:

- Bir bileşen içe aktarılmazsa, içeriği bundle'a dahil edilmez (Gereksiz Kod Ayıklama - Dead Code Elimination).
- Bir bileşen geç yüklenirse (lazy-loaded), içeriği de geç yüklenir.

## Platforma Göre Kurulum

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js, dönüşümü yönetmek için `@intlayer/swc` eklentisine ihtiyaç duyar çünkü Next.js build'ler için SWC kullanır.

> Bu eklenti varsayılan olarak yüklenmez çünkü SWC eklentileri Next.js için hala deneysel aşamadadır. Gelecekte değişebilir.

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

Kurulduktan sonra Intlayer, eklentiyi otomatik olarak algılar ve kullanır.

 </Tab>
 <Tab value="vite">

### Vite

Vite, `vite-intlayer` bağımlılığı olarak dahil edilen `@intlayer/babel` eklentisini kullanır. Optimizasyon varsayılan olarak etkindir. Başka bir şey yapmanıza gerek yoktur.

 </Tab>
 <Tab value="webpack">

### Webpack

Webpack ve Intlayer ile bundle optimizasyonunu etkinleştirmek için uygun Babel (`@intlayer/babel`) veya SWC (`@intlayer/swc`) eklentisini kurup yapılandırmanız gerekir.

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Yapılandırma

Intlayer'ın bundle'ınızı nasıl optimize edeceğini `intlayer.config.ts` dosyanızdaki `build` özelliği aracılığıyla kontrol edebilirsiniz.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Bundle boyutunu küçültmek için sözlükleri minify et.
     */
     minify: true;

    /**
     * Sözlüklerdeki kullanılmayan anahtarları temizle (purge)
     */
     purge: true;

    /**
     * Build'in TypeScript tiplerini kontrol edip etmeyeceğini belirtir
     */
    checkTypes: false;
  },
};

export default config;
```

> Çoğu durumda `optimize` seçeneğini varsayılan halinde bırakmanız önerilir.

> Daha fazla detay için yapılandırma dökümanına bakın: [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

### Build Seçenekleri

`build` yapılandırma nesnesi altında aşağıdaki seçenekler mevcuttur:

| Özellik        | Tür       | Varsayılan  | Açıklama                                                                                                                                                                                                                 |
| :------------- | :-------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Build optimizasyonunun etkin olup olmadığını kontrol eder. `true` ise, Intlayer sözlük çağrılarını optimize edilmiş enjeksiyonlarla değiştirir. `false` ise optimizasyon devre dışıdır. Prod ortamında `true` olmalıdır. |
| **`minify`**   | `boolean` | `false`     | Bundle boyutunu azaltmak için sözlüklerin küçültülüp küçültülmeyeceği.                                                                                                                                                   |
| **`purge`**    | `boolean` | `false`     | Sözlüklerdeki kullanılmayan anahtarların temizlenip temizlenmeyeceği.                                                                                                                                                    |

### Küçültme (Minification)

Sözlükleri küçültmek gereksiz boşlukları, yorumları temizler ve JSON içeriğinin boyutunu azaltır. Bu, özellikle büyük sözlükler için çok faydalıdır.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Not: `optimize` devre dışıysa veya Visual Editor etkinse (editörün düzenleme yapmak için tam içeriğe ihtiyacı olduğundan) küçültme yoksayılır.

### Temizleme (Purging)

Temizleme, yalnızca kodunuzda gerçekten kullanılan anahtarların nihai sözlük paketine dahil edilmesini sağlar. Uygulamanızın her yerinde kullanılmayan birçok anahtara sahip büyük sözlükleriniz varsa, bu özellik bundle boyutunu önemli ölçüde azaltabilir.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Not: `optimize` devre dışıysa temizleme yoksayılır.

### İçe Aktarma Modu (Import Mode)

Birkaç sayfa ve dil içeren büyük uygulamalarda, JSON dosyalarınız bundle boyutunuzun önemli bir kısmını oluşturabilir. Intlayer, sözlüklerin nasıl yükleneceğini kontrol etmenize olanak tanır.

İçe aktarma modu varsayılan olarak `intlayer.config.ts` dosyanızda global olarak tanımlanabilir.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Ayrıca her bir sözlük için `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` dosyalarınızda da tanımlanabilir.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Varsayılan içe aktarma modunu geçersiz kıl
  content: {
    // ...
  },
};

export default appContent;
```

| Özellik          | Tür                                | Varsayılan | Açıklama                                                                                                             |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Kullanımdan Kaldırıldı**: Bunun yerine `dictionary.importMode` kullanın. Sözlüklerin nasıl yükleneceğini belirler. |

`importMode` ayarı, sözlük içeriğinin bileşeninize nasıl enjekte edileceğini belirler.
Bunu `intlayer.config.ts` dosyasında `dictionary` nesnesi altında global olarak tanımlayabilir veya belirli bir sözlük için `.content.ts` dosyasında geçersiz kılabilirsiniz.

### 1. Statik Mod (`default`)

Statik modda Intlayer, `useIntlayer` yöntemini `useDictionary` ile değiştirir ve sözlüğü doğrudan JavaScript bundle'ına enjekte eder.

- **Artıları:** Anında işleme (senkron), hidratasyon sırasında fazladan ağ isteği yok.
- **Eksileri:** Bundle, o belirli bileşen için **tüm** dillerdeki çevirileri içerir.
- **En iyi kullanım alanı:** Tek Sayfa Uygulamaları (SPA).

**Dönüştürülmüş Kod Örneği:**

```tsx
// Sizin kodunuz
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

Dinamik modda Intlayer, `useIntlayer` yöntemini `useDictionaryAsync` ile değiştirir. Bu, mevcut dile özel JSON'u geç yüklemek (lazy-load) için `import()` (Suspense benzeri mekanizma) kullanır.

- **Artıları:** **Dil düzeyinde tree shaking.** İngilizce versiyonunu görüntüleyen bir kullanıcı _yalnızca_ İngilizce sözlüğü indirir. Fransızca sözlüğü asla yüklenmez.
- **Eksileri:** Hidratasyon sırasında bileşen başına bir ağ isteği (varlık getirme) tetikler.
- **En iyi kullanım alanı:** Bundle boyutunun kritik olduğu çok sayıda dil desteği sağlayan sayfalar veya büyük metin blokları.

**Dönüştürülmüş Kod Örneği:**

```tsx
// Sizin kodunuz
const content = useIntlayer("my-key");

// Optimize edilmiş kod (Dinamik)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'` kullanırken tek bir sayfada `useIntlayer` kullanan 100 bileşeniniz varsa, tarayıcı 100 ayrı getirme (fetch) isteği deneyecektir. Bu istek "şelalesinden" (waterfall) kaçınmak için içeriği atom bileşen başına bir tane yerine daha az sayıda `.content` dosyasında (örneğin sayfa bölümü başına bir sözlük) gruplandırın.

### 3. Getirme Modu (Fetch Mode)

Dinamik mod gibi davranır ancak önce sözlükleri Intlayer Live Sync API'den getirmeye çalışır. API çağrısı başarısız olursa veya içerik canlı güncellemeler için işaretlenmemişse dinamik içe aktarmaya (dynamic import) geri döner.

> Daha fazla detay için CMS dökümanına bakın: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

> Getirme modunda temizleme (purge) ve küçültme (minification) kullanılamaz.

## Özet: Statik vs Dinamik

| Özellik              | Statik Mod                                       | Dinamik Mod                          |
| :------------------- | :----------------------------------------------- | :----------------------------------- |
| **JS Bundle Boyutu** | Daha Büyük (Bileşen için tüm dilleri içerir)     | En Küçük (Yalnızca kod, içerik yok)  |
| **İlk Yükleme**      | Anında (İçerik bundle içindedir)                 | Hafif gecikme (JSON'u getirir)       |
| **Ağ İstekleri**     | 0 ek istek                                       | Sözlük başına 1 istek                |
| **Tree Shaking**     | Bileşen düzeyinde                                | Bileşen düzeyinde + Dil düzeyinde    |
| **En İyi Kullanım**  | Kullanıcı Arayüzü Bileşenleri, Küçük Uygulamalar | Bol metinli sayfalar, Çok sayıda dil |
