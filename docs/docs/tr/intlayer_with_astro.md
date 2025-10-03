---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Astro'da Intlayer ile Başlarken
description: Intlayer kullanarak Vite ve React uygulamanıza uluslararasılaştırma (i18n) nasıl eklenir öğrenin. Uygulamanızı çok dilli yapmak için bu kılavuzu takip edin.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
---

# Intlayer ve Astro ile Uluslararasılaştırmaya (i18n) Başlarken

GitHub'da [Uygulama Şablonuna](https://github.com/aymericzip/intlayer-astro-template) bakın.

## Intlayer Nedir?

**Intlayer**, modern web uygulamalarında çok dilli desteği basitleştirmek için tasarlanmış yenilikçi, açık kaynaklı bir uluslararasılaştırma (i18n) kütüphanesidir.

Intlayer ile şunları yapabilirsiniz:

- **Bileşen seviyesinde bildirisel sözlükler kullanarak çevirileri kolayca yönetin.**
- **Meta verileri, rotaları ve içeriği dinamik olarak yerelleştirin.**
- **Otomatik oluşturulan tiplerle TypeScript desteğini sağlayın, otomatik tamamlama ve hata tespitini geliştirin.**
- **Dinamik yerel algılama ve değiştirme gibi gelişmiş özelliklerden faydalanın.**

---

## Astro'da Intlayer Kurulumuna Adım Adım Rehber

### Adım 1: Bağımlılıkları Yükleyin

Gerekli paketleri paket yöneticinizle yükleyin:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opsiyonel: React island desteği ekleyin
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# İsteğe bağlı: React island desteği ekleyin
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# İsteğe bağlı: React island desteği ekleyin
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Yapılandırma yönetimi, çeviri, [içerik bildirimi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md), transpile etme ve [CLI komutları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_cli.md) için uluslararasılaştırma araçları sağlayan temel paket.

- **astro-intlayer**
  Astro entegrasyon eklentisini içerir; bu eklenti, Intlayer'ı [Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile entegre etmek için kullanılır ve ayrıca kullanıcının tercih ettiği yerel dili algılamak, çerezleri yönetmek ve URL yönlendirmesini işlemek için ara yazılım sağlar.

### Adım 2: Projenizin Yapılandırması

Uygulamanızın dillerini yapılandırmak için bir yapılandırma dosyası oluşturun:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Diğer yerel dilleriniz
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Bu yapılandırma dosyası aracılığıyla, yerelleştirilmiş URL'ler, ara yazılım yönlendirmesi, çerez isimleri, içerik bildirimlerinizin konumu ve uzantısı, Intlayer günlüklerini konsolda devre dışı bırakma ve daha fazlasını ayarlayabilirsiniz. Mevcut parametrelerin tam listesi için [yapılandırma dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

### Adım 3: Intlayer'ı Astro Yapılandırmanıza Entegre Edin

Yapılandırmanıza intlayer eklentisini ekleyin.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` Astro entegrasyon eklentisi, Intlayer'ı Astro ile entegre etmek için kullanılır. İçerik bildirim dosyalarının oluşturulmasını sağlar ve geliştirme modunda bunları izler. Astro uygulaması içinde Intlayer ortam değişkenlerini tanımlar. Ayrıca, performansı optimize etmek için takma adlar sağlar.

### Adım 4: İçeriğinizi Bildirin

Çevirileri depolamak için içerik bildirimlerinizi oluşturun ve yönetin:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> İçerik bildirimleriniz, uygulamanızda `contentDir` dizinine (varsayılan olarak `./src`) dahil edildiği sürece herhangi bir yerde tanımlanabilir. Ve içerik bildirim dosya uzantısıyla eşleşmelidir (varsayılan olarak `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Daha fazla detay için [içerik bildirim dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/get_started.md) bakabilirsiniz.

### Adım 5: İçeriğinizi Astro'da Kullanın

Sözlükleri, `intlayer` tarafından dışa aktarılan temel yardımcıları kullanarak doğrudan `.astro` dosyalarında tüketebilirsiniz.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Adım 6: Yerelleştirilmiş yönlendirme

Yerelleştirilmiş sayfalar sunmak için dinamik bir rota segmenti oluşturun, örneğin `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro entegrasyonu, geliştirme sırasında yerel farkındalıklı yönlendirme ve ortam tanımlamalarına yardımcı olan bir Vite ara yazılımı ekler. Yine de kendi mantığınızla veya `intlayer`'dan `getLocalizedUrl` gibi yardımcı fonksiyonları kullanarak diller arasında bağlantı kurabilirsiniz.

### Adım 7: Favori framework'ünüzü kullanmaya devam edin

Favori framework'ünüzü kullanarak uygulamanızı geliştirmeye devam edin.

- Intlayer + React: [React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)
- Intlayer + Vue: [Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Solid ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Preact ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+preact.md)

### TypeScript Yapılandırması

Intlayer, TypeScript'in avantajlarından yararlanmak ve kod tabanınızı daha güçlü hale getirmek için modül genişletme (module augmentation) kullanır.

![alt metin](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt metin](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript yapılandırmanızın otomatik oluşturulan türleri içerdiğinden emin olun.

```json5 fileName="tsconfig.json"
{
  // ... Mevcut TypeScript yapılandırmalarınız
  "include": [
    // ... Mevcut TypeScript yapılandırmalarınız
    ".intlayer/**/*.ts", // Otomatik oluşturulan türleri dahil et
  ],
}
```

### Git Yapılandırması

Intlayer tarafından oluşturulan dosyaların göz ardı edilmesi önerilir. Bu, bu dosyaların Git deposuna eklenmesini önlemenizi sağlar.

Bunu yapmak için, `.gitignore` dosyanıza aşağıdaki talimatları ekleyebilirsiniz:

```plaintext
# Intlayer tarafından oluşturulan dosyaları yoksay
.intlayer
```

### VS Code Eklentisi

Intlayer ile geliştirme deneyiminizi iyileştirmek için resmi **Intlayer VS Code Eklentisi**ni yükleyebilirsiniz.

[VS Code Marketplace'ten Yükleyin](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Bu eklenti şunları sağlar:

- Çeviri anahtarları için **Otomatik Tamamlama**.
- Eksik çeviriler için **Gerçek Zamanlı Hata Tespiti**.
- Çevrilmiş içeriğin **Satır İçi Önizlemeleri**.
- Çevirileri kolayca oluşturup güncellemek için **Hızlı İşlemler**.

Eklentinin nasıl kullanılacağı hakkında daha fazla bilgi için [Intlayer VS Code Eklentisi dokümantasyonuna](https://intlayer.org/doc/vs-code-extension) bakabilirsiniz.

---

### Daha İleri Gitmek

Daha ileri gitmek için, [görsel editörü](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) uygulayabilir veya içeriğinizi [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) kullanarak dışa aktarabilirsiniz.

---

## Doküman Geçmişi

| Sürüm | Tarih      | Değişiklikler                                              |
| ----- | ---------- | ---------------------------------------------------------- |
| 6.2.0 | 2025-10-03 | Astro entegrasyonu, yapılandırma, kullanım için güncelleme |
