---
createdAt: 2025-09-09
updatedAt: 2026-03-10
title: Intlayer Compiler | i18n için Otomatik İçerik Çıkarımı
description: Uluslararasılaştırma sürecinizi Intlayer Compiler ile otomatikleştirin. İçeriği bileşenlerinizden doğrudan çıkararak Vite, Next.js ve daha fazlasında daha hızlı ve verimli i18n sağlayın.
keywords:
  - Intlayer
  - Compiler
  - Uluslararasılaştırma
  - i18n
  - Otomasyon
  - Çıkarım
  - Hız
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-09
    changes: Update compiler options, add FilePathPattern support
  - version: 8.1.7
    date: 2026-02-25
    changes: Derleyici seçeneklerini güncelle
  - version: 7.3.1
    date: 2025-11-27
    changes: Compiler Yayınlandı
---

# Intlayer Compiler | i18n için Otomatik İçerik Çıkarımı

## Intlayer Compiler Nedir?

**Intlayer Compiler**, uygulamalarınızda uluslararasılaştırma (i18n) sürecini otomatikleştirmek için tasarlanmış güçlü bir araçtır. Kaynak kodunuzu (JSX, TSX, Vue, Svelte) içerik bildirimleri için tarar, bunları çıkarır ve gerekli sözlük dosyalarını otomatik olarak oluşturur. Bu sayede içeriğinizi bileşenlerinizle birlikte tutabilirken, Intlayer sözlüklerinizin yönetimi ve senkronizasyonunu üstlenir.

## Neden Intlayer Compiler Kullanmalısınız?

- **Otomasyon**: İçeriğin sözlüklere manuel olarak kopyalanıp yapıştırılmasını ortadan kaldırır.
- **Hız**: Derleme sürecinizin hızlı kalmasını sağlayan optimize edilmiş içerik çıkarımı.
- **Geliştirici Deneyimi**: İçerik bildirimlerini kullanıldıkları yerde tutarak bakım kolaylığı sağlar.
- **Canlı Güncellemeler**: Geliştirme sırasında anlık geri bildirim için Hot Module Replacement (HMR) desteği sağlar.

Daha derin bir karşılaştırma için [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md) blog yazısına bakabilirsiniz.

## Neden Intlayer Compiler Kullanmamalısınız?

Derleyici mükemmel bir "hemen çalışır" deneyimi sunarken, aynı zamanda farkında olmanız gereken bazı ödünleşmeler de getirir:

- **Sezgisel belirsizlik**: Derleyici, kullanıcıya yönelik içerik ile uygulama mantığı arasındaki farkı tahmin etmek zorundadır (örneğin, `className="active"`, durum kodları, ürün kimlikleri). Karmaşık kod tabanlarında, bu manuel açıklamalar ve istisnalar gerektiren yanlış pozitifler veya kaçırılan dizelerle sonuçlanabilir.
- **Yalnızca statik çıkarım**: Derleyici tabanlı çıkarım statik analize dayanır. Yalnızca çalışma zamanında var olan dizeler (API hata kodları, CMS alanları vb.) derleyici tarafından tek başına keşfedilemez veya çevrilemez, bu nedenle hala tamamlayıcı bir çalışma zamanı i18n stratejisine ihtiyacınız vardır.

Daha derin bir mimari karşılaştırma için [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/compiler_vs_declarative_i18n.md) blog yazısına bakın.

Alternatif olarak, içeriğiniz üzerinde tam kontrolü korurken i18n sürecinizi otomatikleştirmek için, Intlayer ayrıca otomatik çıkarım komutu `intlayer extract` (bkz. [CLI dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)) veya Intlayer VS Code uzantısının `Intlayer: extract content to Dictionary` komutunu (bkz. [VS Code uzantı dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)) sağlar.

## Kullanım

<Tabs>
 <Tab value='vite'>

### Vite

Vite tabanlı uygulamalar (React, Vue, Svelte, vb.) için derleyiciyi kullanmanın en kolay yolu `vite-intlayer` eklentisidir.

#### Kurulum

```bash
npm install vite-intlayer
```

#### Konfigürasyon

`vite.config.ts` dosyanızı `intlayerCompiler` eklentisini içerecek şekilde güncelleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Derleyici eklentisini ekler
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Framework Desteği

Vite eklentisi farklı dosya türlerini otomatik olarak algılar ve işler:

- **React / JSX / TSX**: Yerel olarak desteklenir.
- **Vue**: `@intlayer/vue-compiler` gerektirir.
- **Svelte**: `@intlayer/svelte-compiler` gerektirir.

Framework'ünüz için uygun derleyici paketini kurduğunuzdan emin olun:

```bash
# Vue için
npm install @intlayer/vue-compiler

# Svelte için
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Next.js veya Babel kullanan diğer Webpack tabanlı uygulamalar için, derleyiciyi `@intlayer/babel` eklentisi ile yapılandırabilirsiniz.

#### Kurulum

```bash
npm install @intlayer/babel
```

#### Konfigürasyon

`babel.config.js` (veya `babel.config.json`) dosyanızı, extraction (çıkarma) eklentisini içerecek şekilde güncelleyin. Intlayer yapılandırmanızı otomatik olarak yüklemek için bir yardımcı `getExtractPluginOptions` sağlıyoruz.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Bu yapılandırma, bileşenlerinizde beyan edilen içeriğin otomatik olarak çıkarılmasını ve derleme süreciniz sırasında sözlüklerin oluşturulmasında kullanılmasını sağlar.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### Özel yapılandırma

Derleyici davranışını özelleştirmek için projenizin kök dizinindeki `intlayer.config.ts` dosyasını güncelleyebilirsiniz.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Geliştirme sırasında derleyiciyi atlamak ve başlangıç sürelerini hızlandırmak için 'build-only' olarak ayarlayın.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimize.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * Pattern to exclude from the optimization.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Optimize edilmiş sözlükler für çıktı dizini.
     */
    output: ({ key }) => `compiler/${key}.content.json`,

    /**
     * Oluşturulan dosyaya yalnızca içeriği yerleştirin, anahtar olmadan.
     */
    noMetadata: false,

    /**
     * Sözlük anahtar öneki
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     * Bu şekilde, derleyici uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,
  },
};

export default config;
```

### Eksik çevirileri doldur

Intlayer, eksik çevirileri doldurmanıza yardımcı olacak bir CLI aracı sağlar. Kodunuzdaki eksik çevirileri test etmek ve doldurmak için `intlayer` komutunu kullanabilirsiniz.

```bash
npx intlayer test         # Eksik çeviri olup olmadığını test et
```

```bash
npx intlayer fill         # Eksik çevirileri doldur
```

> Daha fazla ayrıntı için [CLI belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/ci.md) bakın.

### Derleyici Yapılandırma Referansı

Aşağıdaki özellikler `intlayer.config.ts` dosyanızın `compiler` bloğunda yapılandırılabilir:

- **enabled**:
  - _Tip_: `boolean | 'build-only'`
  - _Varsayılan_: `true`
  - _Açıklama_: Derleyicinin etkinleştirilip etkinleştirilmeyeceğini belirtir.
- **dictionaryKeyPrefix**:
  - _Tip_: `string`
  - _Varsayılan_: `'comp-'`
  - _Açıklama_: Ayıklanan sözlük anahtarları için önek.
- **transformPattern**:
  - _Tip_: `string | string[]`
  - _Varsayılan_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Açıklama_: Optimize edilecek kodu taramak için desenler.
- **excludePattern**:
  - _Tip_: `string | string[]`
  - _Varsayılan_: `['**/node_modules/**']`
  - _Açıklama_: Optimizasyondan hariç tutulacak desenler.
- **outputDir** (Deprecated):
  - _Tip_: `string`
  - _Varsayılan_: `'compiler'`
  - _Açıklama_: Ayıklanan sözlüklerin saklanacağı dizin.

- **output**:
  - _Tip_: `FilePathPattern`
  - _Varsayılan_: `({ key }) => 'compiler/${key}.content.json'`
  - _Açıklama_: Çıktı dosyalarının yolunu tanımlar. `outputDir` yerine geçer. `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, ve `{{componentFormat}}` gibi dinamik değişkenleri işler. `'my/{{var}}/path'` formatı kullanılarak bir dize olarak veya bir fonksiyon olarak ayarlanabilir.
  - _Not_: `./**/*` yolları bileşene göre çözümlenir. `/**/*` yolları Intlayer `baseDir`'e göre çözümlenir.
  - _Örnek_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Tip_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Meta verilerin dosyaya kaydedilip kaydedilmeyeceğini belirtir. Doğruysa, derleyici sözlüklerin meta verilerini (anahtar, içerik sarmalayıcı) kaydetmez.
  - _Not_: `loadJSON` eklentisi ile kullanıldığında kullanışlıdır.
  - _Örnek_: `true` ise:
    ```json
    {
      "key": "value"
    }
    ```
    `false` ise:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Tip_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
