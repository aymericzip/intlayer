---
createdAt: 2025-09-09
updatedAt: 2025-09-09
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

Daha derin bir karşılaştırma için [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) blog yazısına bakabilirsiniz.

## Neden Intlayer Compiler Kullanmamalısınız?

Derleyici mükemmel bir "hemen çalışır" deneyimi sunarken, aynı zamanda farkında olmanız gereken bazı ödünleşmeler de getirir:

- **Sezgisel belirsizlik**: Derleyici, kullanıcıya yönelik içerik ile uygulama mantığı arasındaki farkı tahmin etmek zorundadır (örneğin, `className="active"`, durum kodları, ürün kimlikleri). Karmaşık kod tabanlarında, bu manuel açıklamalar ve istisnalar gerektiren yanlış pozitifler veya kaçırılan dizelerle sonuçlanabilir.
- **Yalnızca statik çıkarım**: Derleyici tabanlı çıkarım statik analize dayanır. Yalnızca çalışma zamanında var olan dizeler (API hata kodları, CMS alanları vb.) derleyici tarafından tek başına keşfedilemez veya çevrilemez, bu nedenle hala tamamlayıcı bir çalışma zamanı i18n stratejisine ihtiyacınız vardır.

Daha derin bir mimari karşılaştırma için [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) blog yazısına bakın.

Alternatif olarak, içeriğiniz üzerinde tam kontrolü korurken i18n sürecinizi otomatikleştirmek için, Intlayer ayrıca otomatik çıkarım komutu `intlayer transform` (bkz. [CLI dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/transform.md)) veya Intlayer VS Code uzantısının `Intlayer: extract content to Dictionary` komutunu (bkz. [VS Code uzantı dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)) sağlar.

## Kullanım

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
