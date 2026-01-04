---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer'ın Faydaları
description: Projelerinizde Intlayer kullanmanın faydalarını ve avantajlarını keşfedin. Intlayer'ın diğer çerçeveler arasında neden öne çıktığını anlayın.
keywords:
  - Faydalar
  - Avantajlar
  - Intlayer
  - Çerçeve
  - Karşılaştırma
slugs:
  - doc
  - why
history:
  - version: 5.8.0
    date: 2025-08-19
    changes: Karşılaştırma tablosunu güncelle
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Neden Intlayer'ı düşünmelisiniz?

## Intlayer nedir?

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir uluslararasılaştırma kütüphanesidir. Kodunuzun her yerinde içeriğinizi bildirmenize izin verir. Çok dilli içerik bildirimlerini kodunuzda kolayca entegre etmek için yapılandırılmış sözlüklere dönüştürür. TypeScript kullanarak **Intlayer**, geliştirmenizi daha güçlü ve verimli hale getirir.

## Intlayer neden oluşturuldu?

Intlayer, `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` ve `vue-i18n` gibi tüm yaygın i18n kütüphanelerini etkileyen yaygın bir sorunu çözmek için oluşturuldu.

Bu çözümlerin tümü, içeriğinizi listelemek ve yönetmek için merkezi bir yaklaşım benimser. Örneğin:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Veya burada isim alanları kullanarak:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Bu tür bir mimari, geliştirme sürecini yavaşlatır ve kod tabanını bakım için daha karmaşık hale getirir, birkaç nedenden dolayı:

1. **Oluşturulan herhangi bir yeni bileşen için şunları yapmalısınız:**
   - `locales` klasöründe yeni kaynak/isim alanını oluşturun
   - Yeni isim alanını sayfanızda içe aktarmayı unutmayın
   - İçeriğinizi çevirin (genellikle AI sağlayıcılarından kopyala/yapıştır ile manuel olarak yapılır)

2. **Bileşenlerinizde yapılan herhangi bir değişiklik için şunları yapmalısınız:**
   - İlgili kaynak/isim alanını arayın (bileşenden uzak)
   - İçeriğinizi çevirin
   - İçeriğinizin herhangi bir yerel ayar için güncel olduğundan emin olun
   - İsim alanınızın kullanılmayan anahtarlar/değerler içermediğinden emin olun
   - JSON dosyalarınızın yapısının tüm yerel ayarlar için aynı olduğundan emin olun

Bu çözümleri kullanan profesyonel projelerde, içeriğin çevirisini yönetmeye yardımcı olmak için yerelleştirme platformları sıklıkla kullanılır. Ancak, bu büyük projeler için hızla maliyetli hale gelebilir.

Bu sorunu çözmek için, Intlayer CSS (`styled-components`), türler, dokümantasyon (`storybook`) veya birim testleri (`jest`) ile sıklıkla yaptığımız gibi içeriğinizi bileşen başına kapsamlandıran ve içeriğinizi bileşeninizle yakın tutan bir yaklaşım benimser.

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.tsx
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Bu yaklaşım şunları yapmanıza izin verir:

1. **Geliştirme hızını artırın**
   - `.content.{{ts|mjs|cjs|json}}` dosyaları bir VSCode uzantısı kullanarak oluşturulabilir
   - IDE'nizdeki otomatik tamamlama AI araçları (GitHub Copilot gibi) içeriğinizi bildirmenize yardımcı olabilir, kopyala/yapıştırı azaltır

2. **Kod tabanınızı temizleyin**
   - Karmaşıklığı azaltın
   - Bakım kolaylığını artırın

3. **Bileşenlerinizi ve ilgili içeriklerini daha kolay çoğaltın (Örnek: giriş/kayıt bileşenleri vb.)**
   - Diğer bileşenlerin içeriğini etkileme riskini sınırlayarak
   - Harici bağımlılıklar olmadan içeriğinizi bir uygulamadan diğerine kopyala/yapıştırarak

4. **Kod tabanınızı kullanılmayan bileşenler için kullanılmayan anahtarlar/değerlerle kirletmekten kaçının**
   - Bir bileşeni kullanmazsanız, Intlayer ilgili içeriğini içe aktarmaz
   - Bir bileşeni silerseniz, aynı klasörde bulunduğu için ilgili içeriğini kaldırmayı daha kolay hatırlarsınız

5. **Çok dilli içeriğinizi bildirmek için AI ajanları için akıl yürütme maliyetini azaltın**
   - AI ajanı içeriğinizi nerede uygulayacağını bilmek için tüm kod tabanınızı taramak zorunda kalmaz
   - Çeviriler IDE'nizdeki otomatik tamamlama AI araçları (GitHub Copilot gibi) tarafından kolayca yapılabilir

6. **Yükleme performansını optimize edin**
   - Bir bileşen tembel yüklenirse, ilgili içeriği aynı zamanda yüklenir

## Intlayer'ın ek özellikleri

| Özellik                                                                                                                   | Açıklama                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Çapraz-Çerçeve Desteği**<br><br>Intlayer Next.js, React, Vite, Vue.js, Nuxt, Preact, Express ve daha fazlası dahil olmak üzere tüm büyük çerçeveler ve kütüphanelerle uyumludur.                                                                                                                                                                                                                 |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript Güçlü İçerik Yönetimi**<br><br>İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğinden yararlanın. <br><br> - [İçerik bildirimi](https://intlayer.org/doc/concept/content)                                                                                                                                                                            |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Yerel Ayar Başına İçerik Bildirim Dosyası**<br><br>İçeriğinizi bir kez bildirerek geliştirmenizi hızlandırın, ardından otomatik oluşturma.<br><br> - [Yerel Ayar Başına İçerik Bildirim Dosyası](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                               |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Tür Güvenli Ortam**<br><br>İçerik tanımlarınızın ve kodunuzun hatasız olduğundan emin olmak için TypeScript'ten yararlanın, aynı zamanda IDE otomatik tamamlamasından faydalanın.<br><br> - [TypeScript konfigürasyonu](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Basitleştirilmiş Kurulum**<br><br>Minimum konfigürasyonla hızlıca çalışmaya başlayın. Uluslararasılaştırma, yönlendirme, AI, inşa ve içerik işleme için ayarları kolayca ayarlayın. <br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                    |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Basitleştirilmiş İçerik Alma**<br><br>Her içerik parçası için `t` fonksiyonunuzu çağırmaya gerek yok. Tek bir kanca kullanarak tüm içeriğinizi doğrudan alın.<br><br> - [React entegrasyonu](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                              |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Tutarlı Sunucu Bileşeni Uygulaması**<br><br>Next.js sunucu bileşenleri için mükemmel şekilde uygundur, istemci ve sunucu bileşenleri için aynı uygulamayı kullanın, her sunucu bileşeninde `t` fonksiyonunuzu geçirmeye gerek yok. <br><br> - [Sunucu Bileşenleri](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                              |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Düzenlenmiş Kod Tabanı**<br><br>Kod tabanınızı daha düzenlenmiş tutun: 1 bileşen = aynı klasörde 1 sözlük. Çeviriler ilgili bileşenlerine yakın, bakım kolaylığını ve netliği artırır. <br><br> - [Intlayer nasıl çalışır](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                  |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Gelişmiş Yönlendirme**<br><br>Uygulama yönlendirmesi için tam destek, Next.js, React, Vite, Vue.js vb. için karmaşık uygulama yapılarına sorunsuz uyum sağlar.<br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                          |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown Desteği**<br><br>Gizlilik politikaları, dokümantasyon vb. gibi çok dilli içerik için yerel ayar dosyalarını ve uzak Markdown'ı içe aktarın ve yorumlayın. Markdown meta verilerini kodunuzda erişilebilir hale getirin.<br><br> - [İçerik dosyaları](https://intlayer.org/doc/concept/content/file)                                                                                     |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Ücretsiz Görsel Düzenleyici & CMS**<br><br>İçerik yazarları için ücretsiz bir görsel düzenleyici ve CMS mevcuttur, yerelleştirme platformuna ihtiyaç duymadan. Git kullanarak içeriğinizi senkronize tutun veya CMS ile tamamen veya kısmen dışa aktarın.<br><br> - [Intlayer Düzenleyici](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)  |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Ağaç Sallanabilir İçerik**<br><br>Ağaç sallanabilir içerik, son paketin boyutunu azaltır. İçeriği bileşen başına yükler, paketinize kullanılmayan herhangi bir içeriği hariç tutar. Uygulama yükleme verimliliğini artırmak için tembel yüklemeyi destekler. <br><br> - [Uygulama inşa optimizasyonu](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statik Oluşturma**<br><br>Statik Oluşturmayı engellemez. <br><br> - [Next.js entegrasyonu](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                          |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI Güçlü Çeviri**<br><br>Intlayer'ın gelişmiş AI güçlü çeviri araçlarını kullanarak kendi AI sağlayıcınız/API anahtarınızı kullanarak web sitenizi tek tıkla 231 dile dönüştürün. <br><br> - [CI/CD entegrasyonu](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Otomatik doldurma](https://intlayer.org/doc/concept/auto-fill)     |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Sunucu Entegrasyonu**<br><br>IDE otomasyonu için bir MCP (Model Context Protocol) sunucusu sağlar, geliştirme ortamınızda doğrudan sorunsuz içerik yönetimi ve i18n iş akışlarını etkinleştirir. <br><br> - [MCP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)                                                                                      |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode Uzantısı**<br><br>Intlayer, içeriğinizi ve çevirilerinizi yönetmenize yardımcı olmak için bir VSCode uzantısı sağlar, sözlüklerinizi oluşturur, içeriğinizi çevirir ve daha fazlası. <br><br> - [VSCode Uzantısı](https://intlayer.org/doc/vs-code-extension)                                                                                                                             |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Birlikte Çalışabilirlik**<br><br>react-i18next, next-i18next, next-intl ve react-intl ile birlikte çalışabilirliğe izin verir. <br><br> - [Intlayer ve react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer ve next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer ve next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |

## Intlayer'ın diğer çözümlerle karşılaştırması

| Özellik                                               | `intlayer`                                                                                                                                                      | `react-i18next`                                                                                                      | `react-intl` (FormatJS)                                                                                                            | `lingui`                                                                | `next-intl`                                                                                                          | `next-i18next`                                                                                                       | `vue-i18n`                                                                        |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Bileşenlere Yakın Çeviriler**                       | ✅ Evet, içerik her bileşenle birlikte konumlandırılır                                                                                                          | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                                           | ❌ Hayır                                                                | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                             | ✅ Evet - `Single File Components` (SFC'ler) kullanarak                           |
| **TypeScript Entegrasyonu**                           | ✅ Gelişmiş, otomatik oluşturulan katı türler                                                                                                                   | ⚠️ Temel; güvenlik için ekstra konfigürasyon                                                                         | ✅ İyi, ancak daha az katı                                                                                                         | ⚠️ Türler, konfigürasyon gerektirir                                     | ✅ İyi                                                                                                               | ⚠️ Temel                                                                                                             | ✅ İyi (türler mevcut; anahtar güvenliği kurulum gerektirir)                      |
| **Eksik Çeviri Algılama**                             | ✅ TypeScript hatası vurgulaması ve inşa zamanı hatası/uyarısı                                                                                                  | ⚠️ Çoğunlukla çalışma zamanında geri dönüş dizeleri                                                                  | ⚠️ Geri dönüş dizeleri                                                                                                             | ⚠️ Ekstra konfigürasyon gerektirir                                      | ⚠️ Çalışma zamanı geri dönüşü                                                                                        | ⚠️ Çalışma zamanı geri dönüşü                                                                                        | ⚠️ Çalışma zamanı geri dönüşü/uyarıları (yapılandırılabilir)                      |
| **Zengin İçerik (JSX/Markdown/bileşenler)**           | ✅ Doğrudan destek                                                                                                                                              | ⚠️ Sınırlı / sadece enterpolasyon                                                                                    | ⚠️ ICU sözdizimi, gerçek JSX değil                                                                                                 | ⚠️ Sınırlı                                                              | ❌ Zengin düğümler için tasarlanmamış                                                                                | ⚠️ Sınırlı                                                                                                           | ⚠️ Sınırlı (bileşenler `<i18n-t>` aracılığıyla, Markdown eklentiler aracılığıyla) |
| **AI Güçlü Çeviri**                                   | ✅ Evet, birden fazla AI sağlayıcısını destekler. Kendi API anahtarlarınızı kullanarak kullanılabilir. Uygulamanızın bağlamını ve içerik kapsamını dikkate alır | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                                           | ❌ Hayır                                                                | ❌ Hayır                                                                                                             | ❌ Hayır                                                                                                             | ❌ Hayır                                                                          |
| **Görsel Düzenleyici**                                | ✅ Evet, yerel Görsel Düzenleyici + isteğe bağlı CMS; kod tabanı içeriğini dışa aktarabilir; gömülebilir                                                        | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                                   | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut        | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                                                     | ❌ Hayır / harici yerelleştirme platformları aracılığıyla mevcut                  |
| **Yerelleştirilmiş Yönlendirme**                      | ✅ Evet, yerelleştirilmiş yolları kutudan çıkarır (Next.js & Vite ile çalışır)                                                                                  | ⚠️ Yerleşik yok, eklentiler gerektirir (ör. `next-i18next`) veya özel yönlendirici konfigürasyonu                    | ❌ Hayır, sadece mesaj biçimlendirme, yönlendirme manuel olmalı                                                                    | ⚠️ Yerleşik yok, eklentiler veya manuel konfigürasyon gerektirir        | ✅ Yerleşik, App Router `[locale]` segmentini destekler                                                              | ✅ Yerleşik                                                                                                          | ✅ Yerleşik                                                                       |
| **Dinamik Yol Oluşturma**                             | ✅ Evet                                                                                                                                                         | ⚠️ Eklenti/ekosistem veya manuel kurulum                                                                             | ❌ Sağlanmadı                                                                                                                      | ⚠️ Eklenti/manuel                                                       | ✅ Evet                                                                                                              | ✅ Evet                                                                                                              | ❌ Sağlanmadı (Nuxt i18n sağlar)                                                  |
| **Çoğullaştırma**                                     | ✅ Numaralandırma tabanlı desenler                                                                                                                              | ✅ Yapılandırılabilir (i18next-icu gibi eklentiler)                                                                  | ✅ (ICU)                                                                                                                           | ✅ (ICU/messageformat)                                                  | ✅ İyi                                                                                                               | ✅ İyi                                                                                                               | ✅ Yerleşik çoğul kuralları                                                       |
| **Biçimlendirme (tarihler, sayılar, para birimleri)** | ✅ Optimize edilmiş biçimlendiriciler (Intl altında)                                                                                                            | ⚠️ Eklentiler veya özel Intl kullanımı aracılığıyla                                                                  | ✅ ICU biçimlendiricileri                                                                                                          | ✅ ICU/CLI yardımcıları                                                 | ✅ İyi (Intl yardımcıları)                                                                                           | ✅ İyi (Intl yardımcıları)                                                                                           | ✅ Yerleşik tarih/sayı biçimlendiricileri (Intl)                                  |
| **İçerik Formatı**                                    | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                                | ⚠️ .json                                                                                                             | ✅ .json, .js                                                                                                                      | ⚠️ .po, .json                                                           | ✅ .json, .js, .ts                                                                                                   | ⚠️ .json                                                                                                             | ✅ .json, .js                                                                     |
| **ICU desteği**                                       | ⚠️ WIP                                                                                                                                                          | ⚠️ Eklenti aracılığıyla (i18next-icu)                                                                                | ✅ Evet                                                                                                                            | ✅ Evet                                                                 | ✅ Evet                                                                                                              | ⚠️ Eklenti aracılığıyla (`i18next-icu`)                                                                              | ⚠️ Özel biçimlendirici/derleyici aracılığıyla                                     |
| **SEO Yardımcıları (hreflang, site haritası)**        | ✅ Yerleşik araçlar: site haritası, robots.txt, meta veri için yardımcılar                                                                                      | ⚠️ Topluluk eklentileri/manuel                                                                                       | ❌ Çekirdek değil                                                                                                                  | ❌ Çekirdek değil                                                       | ✅ İyi                                                                                                               | ✅ İyi                                                                                                               | ❌ Çekirdek değil (Nuxt i18n yardımcılar sağlar)                                  |
| **Ekosistem / Topluluk**                              | ⚠️ Daha küçük ama hızlı büyüyen ve reaktif                                                                                                                      | ✅ En büyük ve olgun                                                                                                 | ✅ Büyük                                                                                                                           | ⚠️ Daha küçük                                                           | ✅ Orta boyutlu, Next.js odaklı                                                                                      | ✅ Orta boyutlu, Next.js odaklı                                                                                      | ✅ Vue ekosisteminde büyük                                                        |
| **Sunucu Tarafı Oluşturma & Sunucu Bileşenleri**      | ✅ Evet, SSR / React Sunucu Bileşenleri için kolaylaştırılmış                                                                                                   | ⚠️ Sayfa seviyesinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmek gerekir | ⚠️ Sayfa seviyesinde ek kurulumla desteklenir, ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmek gerekir | ✅ Desteklenir, kurulum gerektirir                                      | ⚠️ Sayfa seviyesinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmek gerekir | ⚠️ Sayfa seviyesinde desteklenir ancak alt sunucu bileşenleri için t-fonksiyonlarını bileşen ağacında geçmek gerekir | ✅ SSR via Nuxt/Vue SSR (RSC yok)                                                 |
| **Ağaç Sallama (sadece kullanılan içeriği yükle)**    | ✅ Evet, Babel/SWC eklentileri aracılığıyla inşa zamanında bileşen başına                                                                                       | ⚠️ Genellikle tümünü yükler (isim alanları/kod bölümlendirme ile iyileştirilebilir)                                  | ⚠️ Genellikle tümünü yükler                                                                                                        | ❌ Varsayılan değil                                                     | ⚠️ Kısmi                                                                                                             | ⚠️ Kısmi                                                                                                             | ⚠️ Kısmi (kod bölümlendirme/manuel kurulum ile)                                   |
| **Tembel yükleme**                                    | ✅ Evet, yerel ayar başına / sözlük başına                                                                                                                      | ✅ Evet (ör. isteğe bağlı arka uçlar/isim alanları)                                                                  | ✅ Evet (bölünmüş yerel ayar paketleri)                                                                                            | ✅ Evet (dinamik katalog içe aktarmaları)                               | ✅ Evet (yol başına/yerel ayar başına), isim alanı yönetimi gerektir                                                 | ✅ Evet (yol başına/yerel ayar başına), isim alanı yönetimi gerektir                                                 | ✅ Evet (eşzamansız yerel ayar mesajları)                                         |
| **Kullanılmayan içeriği temizle**                     | ✅ Evet, inşa zamanında sözlük başına                                                                                                                           | ❌ Hayır, sadece manuel isim alanı segmentasyonu aracılığıyla                                                        | ❌ Hayır, bildirilen tüm mesajlar paketlenir                                                                                       | ✅ Evet, kullanılmayan anahtarlar algılanır ve inşa zamanında bırakılır | ❌ Hayır, isim alanı yönetimi ile manuel olarak yönetilebilir                                                        | ❌ Hayır, isim alanı yönetimi ile manuel olarak yönetilebilir                                                        | ❌ Hayır, sadece manuel tembel yükleme aracılığıyla mümkün                        |
| **Büyük Projelerin Yönetimi**                         | ✅ Tasarım sistemi için modüler, uygun teşvik eder                                                                                                              | ⚠️ İyi dosya disiplini gerektirir                                                                                    | ⚠️ Merkezi kataloglar büyük olabilir                                                                                               | ⚠️ Karmaşık hale gelebilir                                              | ✅ Kurulum ile modüler                                                                                               | ✅ Kurulum ile modüler                                                                                               | ✅ Vue Router/Nuxt i18n kurulum ile modüler                                       |

---

## GitHub YILDIZLARI

GitHub yıldızları, bir projenin popülaritesinin, topluluk güveninin ve uzun vadeli öneminin güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve muhtemelen benimsediğini yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişmeyi karşılaştırmaya ve ekosistem büyümesine ilişkin içgörüler sağlamaya yardımcı olur.

[![Yıldız Geçmişi Grafiği](https://api.star-history.com/svg?repos=formatjs/formatjs&repos=i18next/react-i18next&repos=i18next/i18next&repos=i18next/next-i18next&repos=lingui/js-lingui&repos=amannn/next-intl&repos=intlify/vue-i18n&repo=opral/monorepo&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/monorepo&aymericzip/intlayer)

---

## Birlikte Çalışabilirlik

`intlayer` ayrıca `react-intl`, `react-i18next`, `next-intl`, `next-i18next` ve `vue-i18n` isim alanlarınızı yönetmenize yardımcı olabilir.

`intlayer` kullanarak, içeriğinizi favori i18n kütüphanenizin formatında bildirebilirsiniz ve intlayer isim alanlarınızı seçtiğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

Daha fazla ayrıntı için [`dictionaryOutput` ve `i18nextResourcesDir` seçeneklerine](https://intlayer.org/doc/concept/configuration#content-configuration) bakın.
