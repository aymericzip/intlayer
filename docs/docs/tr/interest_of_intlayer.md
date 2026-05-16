---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Intlayer'ın İlgi Çekici Yanları
description: Projelerinizde Intlayer kullanmanın faydalarını ve avantajlarını keşfedin. Intlayer'ın diğer frameworkler arasından neden sıyrıldığını anlayın.
keywords:
  - Faydalar
  - Avantajlar
  - Intlayer
  - Framework
  - Karşılaştırma
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Derleyici Yayınlandı"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Karşılaştırmalı tablo güncellendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Başlangıç geçmişi"
---

# Neden Intlayer'ı düşünmelisiniz?

## Intlayer nedir?

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir uluslararasılaştırma (internationalization) kütüphanesidir. İçeriğinizi kodunuzun her yerinde beyan etmenize olanak tanır. Çok dilli içerik beyanlarını, kodunuza kolayca entegre edilebilecek yapılandırılmış sözlüklere dönüştürür. TypeScript kullanarak **Intlayer**, geliştirme sürecinizi daha güçlü ve verimli hale getirir.

## Intlayer neden oluşturuldu?

Intlayer; `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` ve `vue-i18n` gibi tüm yaygın i18n kütüphanelerini etkileyen ortak bir sorunu çözmek için oluşturuldu.

Tüm bu çözümler, içeriğinizi listelemek ve yönetmek için merkezi bir yaklaşım benimser. Örneğin:

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

Veya burada ad alanlarını (namespaces) kullanarak:

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

Bu tür bir mimari, geliştirme sürecini yavaşlatır ve çeşitli nedenlerle kod tabanının bakımını karmaşıklaştırır:

1. **Oluşturulan her yeni bileşen için şunları yapmalısınız:**
   - `locales` klasöründe yeni kaynağı/ad alanını oluşturun
   - Yeni ad alanını sayfanıza aktarmayı (import) unutmayın
   - İçeriğinizi çevirin (genellikle AI sağlayıcılarından kopyala/yapıştır yaparak manuel olarak yapılır)

2. **Bileşenlerinizde yapılan her değişiklik için şunları yapmalısınız:**
   - İlgili kaynağı/ad alanını arayın (bileşenden uzakta)
   - İçeriğinizi çevirin
   - İçeriğinizin her dil (locale) için güncel olduğundan emin olun
   - Ad alanınızın kullanılmayan anahtarlar/değerler içermediğini doğrulayın
   - JSON dosyalarınızın yapısının tüm diller için aynı olduğundan emin olun

Bu çözümleri kullanan profesyonel projelerde, içeriğinizin çevirisini yönetmeye yardımcı olmak için genellikle yerelleştirme (localization) platformları kullanılır. Ancak bu, büyük projeler için hızla maliyetli hale gelebilir.

Bu sorunu çözmek için Intlayer, içeriğinizi bileşen başına kapsayan ve CSS (`styled-components`), tipler, dokümantasyon (`storybook`) veya birim testlerinde (`jest`) sıkça yaptığımız gibi içeriğinizi bileşeninize yakın tutan bir yaklaşım benimser.

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
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Bu yaklaşım şunları yapmanıza olanak tanır:

1. **Geliştirme hızını artırmak**
   - `.content.{{ts|mjs|cjs|json}}` dosyaları bir VSCode uzantısı kullanılarak oluşturulabilir
   - IDE'nizdeki otomatik tamamlama AI araçları (GitHub Copilot gibi), içeriğinizi beyan etmenize yardımcı olarak kopyala/yapıştır işlemini azaltabilir

2. **Kod tabanınızı temizlemek**
   - Karmaşıklığı azaltmak
   - Bakım yapılabilirliği artırmak

3. **Bileşenlerinizi ve ilgili içeriklerini daha kolay çoğaltmak (Örnek: giriş/kayıt bileşenleri vb.)**
   - Diğer bileşenlerin içeriğini etkileme riskini sınırlayarak
   - İçeriğinizi dış bağımlılıklar olmadan bir uygulamadan diğerine kopyalayıp yapıştırarak

4. **Kullanılmayan bileşenler için kullanılmayan anahtarlar/değerlerle kod tabanınızı kirletmekten kaçınmak**
   - Bir bileşeni kullanmazsanız, Intlayer ilgili içeriğini içe aktarmaz
   - Bir bileşeni silerseniz, aynı klasörde bulunacağı için ilgili içeriğini kaldırmayı daha kolay hatırlarsınız

5. **AI ajanlarının çok dilli içeriğinizi beyan etmesi için muhakeme maliyetini azaltmak**
   - AI ajanı, içeriğinizi nerede uygulayacağını bilmek için tüm kod tabanınızı taramak zorunda kalmayacaktır
   - Çeviriler, IDE'nizdeki otomatik tamamlama AI araçları (GitHub Copilot gibi) tarafından kolayca yapılabilir

6. **Yükleme performansını optimize etmek**
   - Bir bileşen geç yüklenirse (lazy-load), ilgili içeriği de aynı anda yüklenecektir

## Intlayer'ın ek özellikleri

| Özellik                                                                                                                   | Açıklama                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Özellik](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Frameworkler Arası Destek**<br><br>Intlayer; Next.js, React, Vite, Vue.js, Nuxt, Preact, Express ve daha fazlası dahil olmak üzere tüm ana frameworkler ve kütüphanelerle uyumludur.                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript Destekli İçerik Yönetimi**<br><br>İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğinden yararlanın. <br><br> - [İçerik beyanı](https://intlayer.org/doc/concept/content)                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Özellik" width="700">  | **Derleyici**<br><br>Intlayer Derleyicisi, bileşenlerden içeriği otomatik olarak çıkarır ve sözlük dosyalarını oluşturur.<br><br> - [Derleyici](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Dil Başına İçerik Beyan Dosyası**<br><br>Otomatik oluşturma öncesinde içeriğinizi bir kez beyan ederek geliştirme sürecinizi hızlandırın.<br><br> - [Dil Başına İçerik Beyan Dosyası](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Tip Güvenli Ortam**<br><br>İçerik tanımlarınızın ve kodunuzun hatasız olduğundan emin olmak için TypeScript'ten yararlanın ve IDE otomatik tamamlama özelliğinden faydalanın.<br><br> - [TypeScript yapılandırması](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Basitleştirilmiş Kurulum**<br><br>Minimum yapılandırma ile hızlıca çalışmaya başlayın. Uluslararasılaştırma, yönlendirme, AI, derleme ve içerik işleme ayarlarını kolayca yapın. <br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Basitleştirilmiş İçerik Erişimi**<br><br>Her içerik parçası için `t` fonksiyonunuzu çağırmanıza gerek yok. Tüm içeriğinizi tek bir hook kullanarak doğrudan alın.<br><br> - [React entegrasyonu](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Tutarlı Server Component Uygulaması**<br><br>Next.js server componentleri için mükemmel uyum sağlar; hem istemci hem de sunucu bileşenleri için aynı uygulamayı kullanın, `t` fonksiyonunuzu her sunucu bileşenine aktarmanıza gerek kalmaz. <br><br> - [Server Componentleri](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Düzenli Kod Tabanı**<br><br>Kod tabanınızı daha düzenli tutun: 1 bileşen = aynı klasörde 1 sözlük. Kendi bileşenlerine yakın çeviriler, bakım yapılabilirliği ve netliği artırır. <br><br> - [Intlayer nasıl çalışır](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Gelişmiş Yönlendirme**<br><br>Next.js, React, Vite, Vue.js vb. için karmaşık uygulama yapılarına sorunsuz bir şekilde uyum sağlayan uygulama yönlendirme desteği.<br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown Desteği**<br><br>Gizlilik politikaları, dokümantasyon vb. çok dilli içerikler için yerel dosyaları ve uzak Markdown'ı içe aktarın ve yorumlayın. Markdown meta verilerini kodunuzda yorumlayın ve erişilebilir hale getirin.<br><br> - [İçerik dosyaları](https://intlayer.org/doc/concept/content/file)                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Ücretsiz Görsel Editör ve CMS**<br><br>İçerik yazarları için ücretsiz bir görsel editör ve CMS mevcuttur, bu da bir yerelleştirme platformuna olan ihtiyacı ortadan kaldırır. İçeriğinizi Git kullanarak senkronize tutun veya CMS ile tamamen veya kısmen dışsallaştırın.<br><br> - [Intlayer Editör](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable İçerik**<br><br>Final bundle boyutunu azaltan tree-shakable içerik. Bileşen başına içerik yükler ve bundle'ınızdan kullanılmayan içerikleri çıkarır. Uygulama yükleme verimliliğini artırmak için lazy loading'i destekler. <br><br> - [Uygulama derleme optimizasyonu](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statik Rendering**<br><br>Statik Rendering'i engellemez. <br><br> - [Next.js entegrasyonu](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI Destekli Çeviri**<br><br>Kendi AI sağlayıcınız/API anahtarınızla Intlayer'ın gelişmiş AI destekli çeviri araçlarını kullanarak web sitenizi tek bir tıklamayla 231 dile dönüştürün. <br><br> - [CI/CD entegrasyonu](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Otomatik doldurma](https://intlayer.org/doc/concept/auto-fill)           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Sunucu Entegrasyonu**<br><br>IDE otomasyonu için bir MCP (Model Context Protocol) sunucusu sağlayarak, geliştirme ortamınızda kesintisiz içerik yönetimi ve i18n iş akışları sağlar. <br><br> - [MCP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/tr/mcp_server.md)                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode Uzantısı**<br><br>Intlayer, içeriğinizi ve çevirilerinizi yönetmenize, sözlüklerinizi oluşturmanıza, içeriğinizi çevirmenize ve daha fazlasına yardımcı olmak için bir VSCode uzantısı sunar. <br><br> - [VSCode Uzantısı](https://intlayer.org/doc/vs-code-extension)                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Birlikte Çalışabilirlik**<br><br>react-i18next, next-i18next, next-intl ve react-intl ile birlikte çalışabilirliği sağlar. <br><br> - [Intlayer ve react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer ve next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer ve next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                |
| Eksik Çevirileri Test Etme (CLI/CI)                                                                                       | ✅ CLI: npx intlayer content test (CI dostu denetim)                                                                                                                                                                                                                                                                                                                                                          |

## Intlayer'ın diğer çözümlerle karşılaştırılması

| Özellik                                               | `intlayer`                                                                                                                                            | `react-i18next`                                                                                                       | `react-intl` (FormatJS)                                                                                                                   | `lingui`                                                                 | `next-intl`                                                                                                           | `next-i18next`                                                                                                        | `vue-i18n`                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Bileşenlerin Yanında Çeviriler**                    | ✅ Evet, içerik her bileşenle birlikte yer alır                                                                                                       | ❌ Hayır                                                                                                              | ❌ Hayır                                                                                                                                  | ❌ Hayır                                                                 | ❌ Hayır                                                                                                              | ❌ Hayır                                                                                                              | ✅ Evet - `Single File Components` (SFCs) kullanarak                              |
| **TypeScript Entegrasyonu**                           | ✅ Gelişmiş, otomatik oluşturulan katı tipler                                                                                                         | ⚠️ Temel; güvenlik için ekstra yapılandırma gerekir                                                                   | ✅ İyi, ancak daha az katı                                                                                                                | ⚠️ Yazımlar, yapılandırma gerekir                                        | ✅ İyi                                                                                                                | ⚠️ Temel                                                                                                              | ✅ İyi (tipler mevcuttur; anahtar güvenliği kurulum gerektirir)                   |
| **Eksik Çeviri Algılama**                             | ✅ TypeScript hata vurgulama ve derleme zamanı hatası/uyarısı                                                                                         | ⚠️ Çoğunlukla çalışma zamanında fallback dizeleri                                                                     | ⚠️ Fallback dizeleri                                                                                                                      | ⚠️ Ekstra yapılandırma gerekir                                           | ⚠️ Çalışma zamanı fallback'i                                                                                          | ⚠️ Çalışma zamanı fallback'i                                                                                          | ⚠️ Çalışma zamanı fallback'i/uyarıları (yapılandırılabilir)                       |
| **Zengin İçerik (JSX/Markdown/bileşenler)**           | ✅ Doğrudan destek                                                                                                                                    | ⚠️ Sınırlı / yalnızca interpolasyon                                                                                   | ⚠️ ICU sözdizimi, gerçek JSX değil                                                                                                        | ⚠️ Sınırlı                                                               | ❌ Zengin düğümler için tasarlanmamıştır                                                                              | ⚠️ Sınırlı                                                                                                            | ⚠️ Sınırlı (`<i18n-t>` aracılığıyla bileşenler, eklentiler aracılığıyla Markdown) |
| **AI Destekli Çeviri**                                | ✅ Evet, birden fazla AI sağlayıcısını destekler. Kendi API anahtarlarınızla kullanılabilir. Uygulamanızın bağlamını ve içerik kapsamını dikkate alır | ❌ Hayır                                                                                                              | ❌ Hayır                                                                                                                                  | ❌ Hayır                                                                 | ❌ Hayır                                                                                                              | ❌ Hayır                                                                                                              | ❌ Hayır                                                                          |
| **Görsel Editör**                                     | ✅ Evet, yerel Görsel Editör + isteğe bağlı CMS; kod tabanı içeriğini dışsallaştırabilir; gömülebilir                                                 | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                              | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                                                  | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                              | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                              | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir          |
| **Yerelleştirilmiş Yönlendirme**                      | ✅ Evet, yerelleştirilmiş yolları kutudan çıktığı gibi destekler (Next.js ve Vite ile çalışır)                                                        | ⚠️ Yerleşik değil, eklentiler (örneğin `next-i18next`) veya özel yönlendirici yapılandırması gerektirir               | ❌ Hayır, yalnızca mesaj biçimlendirme, yönlendirme manuel olmalıdır                                                                      | ⚠️ Yerleşik değil, eklentiler veya manuel yapılandırma gerektirir        | ✅ Yerleşik, App Router `[locale]` segmentini destekler                                                               | ✅ Yerleşik                                                                                                           | ✅ Yerleşik                                                                       |
| **Dinamik Rota Oluşturma**                            | ✅ Evet                                                                                                                                               | ⚠️ Eklenti/ekosistem veya manuel kurulum                                                                              | ❌ Sağlanmadı                                                                                                                             | ⚠️ Eklenti/manuel                                                        | ✅ Evet                                                                                                               | ✅ Evet                                                                                                               | ❌ Sağlanmadı (Nuxt i18n sağlar)                                                  |
| **Çoğullaştırma (Pluralization)**                     | ✅ Numaralandırma tabanlı desenler                                                                                                                    | ✅ Yapılandırılabilir (i18next-icu gibi eklentiler)                                                                   | ✅ (ICU)                                                                                                                                  | ✅ (ICU/messageformat)                                                   | ✅ İyi                                                                                                                | ✅ İyi                                                                                                                | ✅ Yerleşik çoğul kuralları                                                       |
| **Biçimlendirme (tarihler, sayılar, para birimleri)** | ✅ Optimize edilmiş biçimlendiriciler (arka planda Intl)                                                                                              | ⚠️ Eklentiler veya özel Intl kullanımı yoluyla                                                                        | ✅ ICU biçimlendiricileri                                                                                                                 | ✅ ICU/CLI yardımcıları                                                  | ✅ İyi (Intl yardımcıları)                                                                                            | ✅ İyi (Intl yardımcıları)                                                                                            | ✅ Yerleşik tarih/sayı biçimlendiricileri (Intl)                                  |
| **İçerik Formatı**                                    | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml hazırlık aşamasında)                                                                                      | ⚠️ .json                                                                                                              | ✅ .json, .js                                                                                                                             | ⚠️ .po, .json                                                            | ✅ .json, .js, .ts                                                                                                    | ⚠️ .json                                                                                                              | ✅ .json, .js                                                                     |
| **ICU desteği**                                       | ⚠️ Hazırlık aşamasında                                                                                                                                | ⚠️ Eklenti (i18next-icu) yoluyla                                                                                      | ✅ Evet                                                                                                                                   | ✅ Evet                                                                  | ✅ Evet                                                                                                               | ⚠️ Eklenti (`i18next-icu`) yoluyla                                                                                    | ⚠️ Özel biçimlendirici/derleyici yoluyla                                          |
| **SEO Yardımcıları (hreflang, sitemap)**              | ✅ Yerleşik araçlar: sitemap, robots.txt, meta veriler için yardımcılar                                                                               | ⚠️ Topluluk eklentileri/manuel                                                                                        | ❌ Çekirdek değil                                                                                                                         | ❌ Çekirdek değil                                                        | ✅ İyi                                                                                                                | ✅ İyi                                                                                                                | ❌ Çekirdek değil (Nuxt i18n yardımcıları sağlar)                                 |
| **Ekosistem / Topluluk**                              | ⚠️ Daha küçük ama hızlı büyüyor ve reaktif                                                                                                            | ✅ En büyük ve olgun                                                                                                  | ✅ Büyük                                                                                                                                  | ⚠️ Daha küçük                                                            | ✅ Orta ölçekli, Next.js odaklı                                                                                       | ✅ Orta ölçekli, Next.js odaklı                                                                                       | ✅ Vue ekosisteminde büyük                                                        |
| **Server-side Rendering ve Server Componentleri**     | ✅ Evet, SSR / React Server Componentleri için kolaylaştırılmıştır                                                                                    | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını iletmeniz gerekir | ⚠️ Ek yapılandırma ile sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını iletmeniz gerekir | ✅ Desteklenir, kurulum gerekir                                          | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını iletmeniz gerekir | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını iletmeniz gerekir | ✅ Nuxt/Vue SSR aracılığıyla SSR (RSC yok)                                        |
| **Tree-shaking (yalnızca kullanılan içeriği yükle)**  | ✅ Evet, Babel/SWC eklentileri aracılığıyla derleme zamanında bileşen başına                                                                          | ⚠️ Genellikle hepsini yükler (ad alanları/kod bölme ile iyileştirilebilir)                                            | ⚠️ Genellikle hepsini yükler                                                                                                              | ❌ Varsayılan değil                                                      | ⚠️ Kısmi                                                                                                              | ⚠️ Kısmi                                                                                                              | ⚠️ Kısmi (kod bölme/manuel kurulum ile)                                           |
| **Lazy loading**                                      | ✅ Evet, dil başına / sözlük başına                                                                                                                   | ✅ Evet (örneğin, isteğe bağlı arka uçlar/ad alanları)                                                                | ✅ Evet (bölünmüş dil paketleri)                                                                                                          | ✅ Evet (dinamik katalog içe aktarmaları)                                | ✅ Evet (rota başına/dil başına), ad alanı yönetimi gerekir                                                           | ✅ Evet (rota başına/dil başına), ad alanı yönetimi gerekir                                                           | ✅ Evet (eşzamansız dil mesajları)                                                |
| **Kullanılmayan içeriği temizle**                     | ✅ Evet, derleme zamanında sözlük başına                                                                                                              | ❌ Hayır, yalnızca manuel ad alanı bölümleme yoluyla                                                                  | ❌ Hayır, beyan edilen tüm mesajlar paketlenir                                                                                            | ✅ Evet, kullanılmayan anahtarlar algılanır ve derlemede bırakılır       | ❌ Hayır, ad alanı yönetimi ile manuel olarak yönetilebilir                                                           | ❌ Hayır, ad alanı yönetimi ile manuel olarak yönetilebilir                                                           | ❌ Hayır, yalnızca manuel lazy loading yoluyla mümkün                             |
| **Büyük Projelerin Yönetimi**                         | ✅ Modülerliği teşvik eder, tasarım sistemleri için uygundur                                                                                          | ⚠️ İyi dosya disiplini gerektirir                                                                                     | ⚠️ Merkezi kataloglar büyüyebilir                                                                                                         | ⚠️ Karmaşıklaşabilir                                                     | ✅ Kurulum ile modüler                                                                                                | ✅ Kurulum ile modüler                                                                                                | ✅ Vue Router/Nuxt i18n kurulumu ile modüler                                      |

---

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülerliğinin, topluluk güveninin ve uzun vadeli alakasının güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve benimseme olasılığını yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekişi karşılaştırmaya yardımcı olur ve ekosistem büyümesi hakkında içgörüler sağlar.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## Birlikte Çalışabilirlik

`intlayer` ayrıca `react-intl`, `react-i18next`, `next-intl`, `next-i18next` ve `vue-i18n` ad alanlarınızı yönetmenize yardımcı olabilir.

`intlayer` kullanarak içeriğinizi favori i18n kütüphanenizin formatında beyan edebilirsiniz ve intlayer ad alanlarınızı seçtiğiniz konumda oluşturacaktır (örnek: `/messages/{{locale}}/{{namespace}}.json`).

Daha fazla ayrıntı için [`dictionaryOutput` ve `i18nextResourcesDir` seçeneklerine](https://intlayer.org/doc/concept/configuration#content-configuration) bakın.
