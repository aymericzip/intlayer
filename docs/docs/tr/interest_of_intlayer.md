---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Intlayer'ın Önemi
description: Projelerinizde Intlayer kullanmanın yararlarını ve avantajlarını keşfedin. Intlayer'ın diğer framework'ler arasında neden öne çıktığını anlayın.
keywords:
  - Yararlar
  - Avantajlar
  - Intlayer
  - Framework
  - Karşılaştırma
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "Alternatifler yerine neden Intlayer bölümü eklendi"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Derleyici Sürümü"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Karşılaştırma tablosu güncellendi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Neden Intlayer'ı Düşünmelisiniz?

## Intlayer Nedir?

**Intlayer**, JavaScript geliştiricileri için özel olarak tasarlanmış bir uluslararasılaştırma (i18n) kütüphanesidir. İçeriğinizi kodunuzun her yerinde bildirmenize olanak tanır. Çok dilli içerik bildirimlerini yapılandırılmış sözlüklere dönüştürerek kodunuza kolayca entegre edilmesini sağlar. TypeScript kullanan **Intlayer**, geliştirme sürecinizi daha güçlü ve verimli hale getirir.

## Neden Alternatifler Yerine Intlayer?

`next-intl` veya `i18next` gibi ana çözümlerle karşılaştırıldığında, Intlayer entegre optimizasyonlarla gelen bir çözümdür:

<AccordionGroup>

<Accordion header="Paket Boyutu (Bundle size)">

Sayfalarınıza devasa JSON dosyaları yüklemek yerine, yalnızca kesinlikle gerekli olan içeriği yükleyin. Intlayer, **paket ve sayfa boyutlarınızı %50'ye kadar azaltmaya** yardımcı olur.

</Accordion>

<Accordion header="Bakım Kolaylığı">

Uygulamanızın içeriğini bileşen düzeyinde sınırlandırmak, büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. Tüm içerik kod tabanınızı gözden geçirme zihinsel yükü olmadan tek bir özellik klasörünü kopyalayabilir veya silebilirsiniz. Ek olarak Intlayer, içeriğinizin doğruluğunu sağlamak için **tamamen tiplenmiştir (fully typed)**.

</Accordion>

<Accordion header="AI Ajanı">

İçeriği bileşenle aynı yerde konumlandırmak (Co-location), Büyük Dil Modellerinin (LLM'ler) ihtiyaç duyduğu **bağlamı azaltır**. Intlayer ayrıca, AI ajanları için geliştirici deneyimini (DX) daha da sorunsuz hale getirmek için eksik çevirileri test eden bir **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** gibi bir araç paketiyle birlikte gelir.

</Accordion>

<Accordion header="Özellik">

Intlayer, diğer i18n çözümlerinin sahip olmadığı [Markdown desteği](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md), [harici içerik çekme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md), [dosya içeriği yükleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/file.md), [canlı içerik güncelleme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live.md), [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve daha fazlası gibi bir dizi ek özellik sunar.

</Accordion>

<Accordion header="Otomasyon">

AI sağlayıcınızın maliyeti üzerinden seçtiğiniz LLM'yi kullanarak CI/CD hattınızda otomatik çeviri yapın. Intlayer ayrıca içerik çıkarmayı otomatikleştirmek için bir **derleyici** ve **arka planda çeviri yapmanıza** yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunar.

</Accordion>

<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak performans ve tepkisellik sorunlarına yol açabilir. Intlayer, derleme zamanında (build time) içerik yüklemenizi optimize eder.

</Accordion>

<Accordion header="Geliştirici Olmayanlarla Ölçeklenme">

Bir i18n çözümünden daha fazlası olan Intlayer, çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini sorunsuz hale getirmek için **kendi kendine barındırılabilen bir [görsel editör](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sağlar. İçerikler yerel ve/veya uzaktan saklanabilir.

</Accordion>

<Accordion header="Çapraz Framework Tasarımı">

Uygulamanızın farklı bölümleri için farklı framework'ler kullanıyorsanız (örn. React, React-native, Vue, Angular, Svelte vb.), Intlayer **tüm ana frontend framework'lerinde ortak bir sözdizimi ve uygulama kullanmanın** bir yolunu sunar. Ayrıca içerik bildiriminizi tasarım sisteminiz, uygulamalarınız, backend'iniz vb. arasında paylaşabileceksiniz.

</Accordion>
</AccordionGroup>

## Intlayer Neden Oluşturuldu?

Intlayer, `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` ve `vue-i18n` gibi tüm yaygın i18n kütüphanelerini etkileyen ortak bir sorunu çözmek için oluşturuldu.

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

Veya burada namespace kullanarak:

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

Bu tür bir mimari, geliştirme sürecini yavaşlatır ve kod tabanının bakımını birkaç nedenden dolayı daha karmaşık hale getirir:

1. **Oluşturulan her yeni bileşen için şunları yapmalısınız:**
   - `locales` klasöründe yeni kaynağı/namespace'i oluşturun
   - Sayfanıza yeni namespace'i import etmeyi unutmayın
   - İçeriğinizi çevirin (genellikle AI sağlayıcılarından manuel olarak kopyala/yapıştır yapılarak yapılır)

2. **Bileşenlerinizde yapılan herhangi bir değişiklik için şunları yapmalısınız:**
   - İlgili kaynağı/namespace'i arayın (bileşenden uzakta)
   - İçeriğinizi çevirin
   - İçeriğinizin her dil için güncel olduğundan emin olun
   - Namespace'inizin kullanılmayan anahtarlar/değerler içermediğini doğrulayın
   - JSON dosyalarınızın yapısının tüm diller için aynı olduğundan emin olun

Bu çözümleri kullanan profesyonel projelerde, içeriğinizin çevirisini yönetmeye yardımcı olmak için genellikle yerelleştirme platformları kullanılır. Ancak bu, büyük projeler için hızla maliyetli hale gelebilir.

Bu sorunu çözmek için Intlayer, içeriğinizi bileşen başına sınırlandıran ve CSS (`styled-components`), tipler, dokümantasyon (`storybook`) veya birim testlerinde (`jest`) sıkça yaptığımız gibi içeriğinizi bileşeninize yakın tutan bir yaklaşım benimser.

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

Bu yaklaşım şunları yapmanızı sağlar:

1. **Geliştirme hızını artırın**
   - `.content.{{ts|mjs|cjs|json}}` dosyaları bir VSCode eklentisi kullanılarak oluşturulabilir
   - IDE'nizdeki AI otomatik tamamlama araçları (GitHub Copilot gibi) içeriğinizi bildirmenize yardımcı olarak kopyala/yapıştır işlemlerini azaltabilir

2. **Kod tabanınızı temizleyin**
   - Karmaşıklığı azaltın
   - Bakım kolaylığını artırın

3. **Bileşenlerinizi ve bunlarla ilgili içeriği daha kolay kopyalayın (Örnek: giriş/kayıt bileşenleri vb.)**
   - Diğer bileşenlerin içeriğini etkileme riskini sınırlayarak
   - İçeriğinizi harici bağımlılıklar olmadan bir uygulamadan diğerine kopyalayıp yapıştırarak

4. **Kullanılmayan bileşenler için kod tabanınızı kullanılmayan anahtarlarla/değerlerle kirletmekten kaçının**
   - Bir bileşeni kullanmazsanız, Intlayer onunla ilgili içeriği import etmez
   - Bir bileşeni silerseniz, aynı klasörde bulunacağı için ilgili içeriği silmeyi daha kolay hatırlarsınız

5. **AI ajanlarının çok dilli içeriğinizi bildirmesi için muhakeme maliyetini azaltın**
   - AI ajanı, içeriğinizi nerede uygulayacağını bilmek için tüm kod tabanınızı taramak zorunda kalmayacak
   - Çeviriler, IDE'nizdeki AI otomatik tamamlama araçları (GitHub Copilot gibi) tarafından kolayca yapılabilir

6. **Yükleme performansını optimize edin**
   - Bir bileşen lazy-load yüklenirse, ilgili içeriği de aynı anda yüklenecektir

## Intlayer'ın Ek Özellikleri

| Özellik                                                                                                                   | Açıklama                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Çoklu Framework Desteği**<br><br>Intlayer; Next.js, React, Vite, Vue.js, Nuxt, Preact, Express ve daha fazlası dahil olmak üzere tüm büyük framework'ler ve kütüphanelerle uyumludur.                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript Destekli İçerik Yönetimi**<br><br>İçeriğinizi verimli bir şekilde tanımlamak ve yönetmek için JavaScript'in esnekliğinden yararlanın. <br><br> - [İçerik bildirimi](https://intlayer.org/doc/concept/content)                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Derleyici**<br><br>Intlayer Derleyicisi, bileşenlerden içeriği otomatik olarak çıkarır ve sözlük dosyalarını oluşturur.<br><br> - [Derleyici](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Dil Başına İçerik Bildirim Dosyası**<br><br>Otomatik üretimden önce içeriğinizi bir kez bildirerek geliştirmenizi hızlandırın.<br><br> - [Dil Başına İçerik Bildirim Dosyası](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Tip Güvenlikli Ortam**<br><br>İçerik tanımlarınızın ve kodunuzun hatasız olmasını sağlamak için TypeScript'ten yararlanın ve aynı zamanda IDE otomatik tamamlamasından yararlanın.<br><br> - [TypeScript yapılandırması](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Basitleştirilmiş Kurulum**<br><br>Minimum yapılandırma ile hızla kurun ve çalıştırın. Uluslararasılaştırma, yönlendirme, AI, derleme ve içerik işleme ayarlarını kolaylıkla yapın. <br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Basitleştirilmiş İçerik Çekme**<br><br>Her içerik parçası için `t` fonksiyonunuzu çağırmanıza gerek yok. Tek bir hook kullanarak tüm içeriğinizi doğrudan çekin.<br><br> - [React entegrasyonu](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Tutarlı Server Component Uygulaması**<br><br>Next.js server component'leri için mükemmel şekilde uygundur; hem client hem de server component'leri için aynı uygulamayı kullanın, `t` fonksiyonunuzu her server component'e aktarmanıza gerek kalmaz. <br><br> - [Server Component'leri](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Düzenli Kod Tabanı**<br><br>Kod tabanınızı daha düzenli tutun: Aynı klasörde 1 bileşen = 1 sözlük. İlgili bileşenlerine yakın çeviriler, bakım kolaylığını ve netliği artırır. <br><br> - [Intlayer nasıl çalışır](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Gelişmiş Yönlendirme**<br><br>Next.js, React, Vite, Vue.js vb. için karmaşık uygulama yapılarına sorunsuz bir şekilde uyum sağlayan tam uygulama yönlendirme desteği.<br><br> - [Next.js entegrasyonunu keşfedin](https://intlayer.org/doc/environment/nextjs)                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown Desteği**<br><br>Gizlilik politikaları, dokümantasyon vb. gibi çok dilli içerikler için yerel dosyaları ve uzak Markdown'ı içe aktarın ve yorumlayın. Kodunuzda Markdown meta verilerini yorumlayın ve erişilebilir hale getirin.<br><br> - [İçerik dosyaları](https://intlayer.org/doc/concept/content/file)                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Ücretsiz Görsel Editör ve CMS**<br><br>İçerik yazarları için ücretsiz bir görsel editör ve CMS mevcuttur, bu da bir yerelleştirme platformuna olan ihtiyacı ortadan kaldırır. Git kullanarak içeriğinizi senkronize tutun veya CMS ile tamamen veya kısmen dışsallaştırın.<br><br> - [Intlayer Editörü](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable İçerik**<br><br>Nihai paket boyutunu azaltan tree-shakable içerik. İçeriği bileşen başına yükler, kullanılmayan içerikleri paketinizden hariç tutar. Uygulama yükleme verimliliğini artırmak için lazy loading desteği sunar. <br><br> - [Uygulama derleme optimizasyonu](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statik Oluşturma (Static Rendering)**<br><br>Statik Oluşturmayı engellemez. <br><br> - [Next.js entegrasyonu](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI Destekli Çeviri**<br><br>Kendi AI sağlayıcınızı/API anahtarınızı kullanarak Intlayer'ın gelişmiş AI destekli çeviri araçlarıyla web sitenizi tek bir tıklamayla 231 dile dönüştürün. <br><br> - [CI/CD entegrasyonu](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Otomatik Doldurma](https://intlayer.org/doc/concept/auto-fill)           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Sunucu Entegrasyonu**<br><br>IDE otomasyonu için bir MCP (Model Context Protocol) sunucusu sağlayarak, doğrudan geliştirme ortamınızda sorunsuz içerik yönetimi ve i18n iş akışları sağlar. <br><br> - [MCP Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/tr/mcp_server.md)                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode Eklentisi**<br><br>Intlayer, içeriğinizi ve çevirilerinizi yönetmenize, sözlüklerinizi derlemenize, içeriğinizi çevirmenize ve daha fazlasına yardımcı olacak bir VSCode eklentisi sağlar. <br><br> - [VSCode Eklentisi](https://intlayer.org/doc/vs-code-extension)                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Birlikte Çalışabilirlik**<br><br>react-i18next, next-i18next, next-intl ve react-intl ile birlikte çalışabilirliğe izin verir. <br><br> - [Intlayer ve react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer ve next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer ve next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)             |
| Eksik Çevirileri Test Etme (CLI/CI)                                                                                       | ✅ CLI: npx intlayer content test (CI dostu denetim)                                                                                                                                                                                                                                                                                                                                                           |

## Intlayer'ın Diğer Çözümlerle Karşılaştırılması

| Özellik                                                | `intlayer`                                                                                                                                                      | `react-i18next`                                                                                                        | `react-intl` (FormatJS)                                                                                                             | `lingui`                                                                 | `next-intl`                                                                                                            | `next-i18next`                                                                                                         | `vue-i18n`                                                                        |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Bileşenlerin Yakınındaki Çeviriler**                 | ✅ Evet, içerik her bileşenle birlikte konumlandırılmıştır                                                                                                      | ❌ Hayır                                                                                                               | ❌ Hayır                                                                                                                            | ❌ Hayır                                                                 | ❌ Hayır                                                                                                               | ❌ Hayır                                                                                                               | ✅ Evet - `Single File Components` (SFCs) kullanarak                              |
| **TypeScript Entegrasyonu**                            | ✅ Gelişmiş, otomatik olarak oluşturulan katı tipler                                                                                                            | ⚠️ Temel; güvenlik için ekstra yapılandırma                                                                            | ✅ İyi, ancak daha az katı                                                                                                          | ⚠️ Tip tanımları, yapılandırma gerektirir                                | ✅ İyi                                                                                                                 | ⚠️ Temel                                                                                                               | ✅ İyi (tipler mevcuttur; anahtar güvenliği kurulum gerektirir)                   |
| **Eksik Çeviri Algılama**                              | ✅ TypeScript hatası vurgulama ve derleme zamanı hatası/uyarısı                                                                                                 | ⚠️ Çoğunlukla çalışma zamanında yedek dizeler                                                                          | ⚠️ Yedek dizeler                                                                                                                    | ⚠️ Ekstra yapılandırma gerektirir                                        | ⚠️ Çalışma zamanı yedeği                                                                                               | ⚠️ Çalışma zamanı yedeği                                                                                               | ⚠️ Çalışma zamanı yedeği/uyarıları (yapılandırılabilir)                           |
| **Zengin İçerik (JSX/Markdown/bileşenler)**            | ✅ Doğrudan destek                                                                                                                                              | ⚠️ Sınırlı / yalnızca enterpolasyon                                                                                    | ⚠️ ICU sözdizimi, gerçek JSX değil                                                                                                  | ⚠️ Sınırlı                                                               | ❌ Zengin düğümler için tasarlanmamıştır                                                                               | ⚠️ Sınırlı                                                                                                             | ⚠️ Sınırlı (`<i18n-t>` aracılığıyla bileşenler, eklentiler aracılığıyla Markdown) |
| **AI Destekli Çeviri**                                 | ✅ Evet, birden fazla AI sağlayıcısını destekler. Kendi API anahtarlarınızı kullanarak kullanılabilir. Uygulamanızın bağlamını ve içerik kapsamını dikkate alır | ❌ Hayır                                                                                                               | ❌ Hayır                                                                                                                            | ❌ Hayır                                                                 | ❌ Hayır                                                                                                               | ❌ Hayır                                                                                                               | ❌ Hayır                                                                          |
| **Görsel Editör**                                      | ✅ Evet, yerel Görsel Editör + isteğe bağlı CMS; kod tabanı içeriğini dışsallaştırabilir; gömülebilir                                                           | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                               | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                                            | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir | ❌ No / harici yerelleştirme platformları aracılığıyla kullanılabilir                                                  | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir                                               | ❌ Hayır / harici yerelleştirme platformları aracılığıyla kullanılabilir          |
| **Yerelleştirilmiş Yönlendirme**                       | ✅ Evet, yerelleştirilmiş yolları kutudan çıktığı gibi destekler (Next.js ve Vite ile çalışır)                                                                  | ⚠️ Yerleşik değil, eklentiler (örn. `next-i18next`) veya özel yönlendirici yapılandırması gerektirir                   | ❌ Hayır, yalnızca mesaj biçimlendirme, yönlendirme manuel olmalıdır                                                                | ⚠️ Yerleşik değil, eklentiler veya manuel yapılandırma gerektirir        | ✅ Yerleşik, App Router `[locale]` segmentini destekler                                                                | ✅ Yerleşik                                                                                                            | ✅ Yerleşik                                                                       |
| **Dinamik Rota Oluşturma**                             | ✅ Evet                                                                                                                                                         | ⚠️ Eklenti/ekosistem veya manuel kurulum                                                                               | ❌ Sağlanmadı                                                                                                                       | ⚠️ Eklenti/manuel                                                        | ✅ Evet                                                                                                                | ✅ Evet                                                                                                                | ❌ Sağlanmadı (Nuxt i18n sağlar)                                                  |
| **Çoğullaştırma**                                      | ✅ Numaralandırma tabanlı kalıplar                                                                                                                              | ✅ Yapılandırılabilir (i18next-icu gibi eklentiler)                                                                    | ✅ (ICU)                                                                                                                            | ✅ (ICU/messageformat)                                                   | ✅ İyi                                                                                                                 | ✅ İyi                                                                                                                 | ✅ Yerleşik çoğul kuralları                                                       |
| **Biçimlendirme (tarihler, sayılar, para birimleri)**  | ✅ Optimize edilmiş biçimlendiriciler (arka planda Intl)                                                                                                        | ⚠️ Eklentiler veya özel Intl kullanımı yoluyla                                                                         | ✅ ICU biçimlendiricileri                                                                                                           | ✅ ICU/CLI yardımcıları                                                  | ✅ İyi (Intl yardımcıları)                                                                                             | ✅ İyi (Intl yardımcıları)                                                                                             | ✅ Yerleşik tarih/sayı biçimlendiricileri (Intl)                                  |
| **İçerik Biçimi**                                      | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                                | ⚠️ .json                                                                                                               | ✅ .json, .js                                                                                                                       | ⚠️ .po, .json                                                            | ✅ .json, .js, .ts                                                                                                     | ⚠️ .json                                                                                                               | ✅ .json, .js                                                                     |
| **ICU desteği**                                        | ⚠️ WIP                                                                                                                                                          | ⚠️ Eklenti aracılığıyla (i18next-icu)                                                                                  | ✅ Evet                                                                                                                             | ✅ Evet                                                                  | ✅ Evet                                                                                                                | ⚠️ Eklenti aracılığıyla (`i18next-icu`)                                                                                | ⚠️ Özel biçimlendirici/derleyici aracılığıyla                                     |
| **SEO Yardımcıları (hreflang, sitemap)**               | ✅ Yerleşik araçlar: sitemap, robots.txt, meta veriler için yardımcılar                                                                                         | ⚠️ Topluluk eklentileri/manuel                                                                                         | ❌ Çekirdek değil                                                                                                                   | ❌ Çekirdek değil                                                        | ✅ İyi                                                                                                                 | ✅ İyi                                                                                                                 | ❌ Çekirdek değil (Nuxt i18n yardımcılar sağlar)                                  |
| **Ekosistem / Topluluk**                               | ⚠️ Daha küçük ama hızlı büyüyor ve duyarlı                                                                                                                      | ✅ En büyük ve olgun                                                                                                   | ✅ Büyük                                                                                                                            | ⚠️ Daha küçük                                                            | ✅ Orta boy, Next.js odaklı                                                                                            | ✅ Orta boy, Next.js odaklı                                                                                            | ✅ Vue ekosisteminde büyük                                                        |
| **Sunucu Tarafı İşleme & Sunucu Bileşenleri**          | ✅ Evet, SSR / React Server Component'leri için kolaylaştırılmış                                                                                                | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını aktarmanız gerekir | ⚠️ Ek kurulumla sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını aktarmanız gerekir | ✅ Desteklenir, kurulum gereklidir                                       | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını aktarmanız gerekir | ⚠️ Sayfa düzeyinde desteklenir ancak alt sunucu bileşenleri için bileşen ağacında t-fonksiyonlarını aktarmanız gerekir | ✅ Nuxt/Vue SSR aracılığıyla SSR (RSC yok)                                        |
| **Tree-shaking (yalnızca kullanılan içeriği yükleme)** | ✅ Evet, Babel/SWC eklentileri aracılığıyla derleme zamanında bileşen başına                                                                                    | ⚠️ Genellikle hepsini yükler (namespace'ler/kod ayırma ile iyileştirilebilir)                                          | ⚠️ Genellikle hepsini yükler                                                                                                        | ❌ Varsayılan değil                                                      | ⚠️ Kısmi                                                                                                               | ⚠️ Kısmi                                                                                                               | ⚠️ Kısmi (kod ayırma/manuel kurulum ile)                                          |
| **Lazy loading**                                       | ✅ Evet, dil başına / sözlük başına                                                                                                                             | ✅ Evet (örn. talep üzerine backend'ler/namespace'ler)                                                                 | ✅ Evet (bölünmüş dil paketleri)                                                                                                    | ✅ Evet (dinamik katalog içe aktarmaları)                                | ✅ Evet (rota başına/dil başına), namespace yönetimi gerekir                                                           | ✅ Evet (rota başına/dil başına), namespace yönetimi gerekir                                                           | ✅ Evet (eşzamansız dil mesajları)                                                |
| **Kullanılmayan içeriği temizleme**                    | ✅ Evet, derleme zamanında sözlük başına                                                                                                                        | ❌ Hayır, yalnızca manuel namespace bölümlemesi yoluyla                                                                | ❌ Hayır, beyan edilen tüm mesajlar paketlenir                                                                                      | ✅ Evet, kullanılmayan anahtarlar derlemede algılanır ve bırakılır       | ❌ Hayır, namespace yönetimi ile manuel olarak yönetilebilir                                                           | ❌ Hayır, namespace yönetimi ile manuel olarak yönetilebilir                                                           | ❌ Hayır, yalnızca manuel lazy loading yoluyla mümkündür                          |
| **Büyük Projelerin Yönetimi**                          | ✅ Modülerliği teşvik eder, tasarım sistemine uygundur                                                                                                          | ⚠️ İyi dosya disiplini gerektirir                                                                                      | ⚠️ Merkezi kataloglar büyüyebilir                                                                                                   | ⚠️ Karmaşıklaşabilir                                                     | ✅ Kurulum ile modüler                                                                                                 | ✅ Kurulum ile modüler                                                                                                 | ✅ Vue Router/Nuxt i18n kurulumu ile modüler                                      |

## GitHub Yıldızları

GitHub yıldızları, bir projenin popülerliğinin, topluluk güveninin ve uzun vadeli alakasının güçlü bir göstergesidir. Teknik kalitenin doğrudan bir ölçüsü olmasa da, kaç geliştiricinin projeyi yararlı bulduğunu, ilerlemesini takip ettiğini ve onu benimseme olasılığının yüksek olduğunu yansıtır. Bir projenin değerini tahmin etmek için yıldızlar, alternatifler arasındaki çekiciliği karşılaştırmaya yardımcı olur ve ekosistem büyümesi hakkında bilgiler sağlar.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Birlikte Çalışabilirlik

`intlayer` ayrıca `react-intl`, `react-i18next`, `next-intl`, `next-i18next` ve `vue-i18n` namespace'lerinizi yönetmenize yardımcı olabilir.

`intlayer` kullanarak içeriğinizi en sevdiğiniz i18n kütüphanesinin biçiminde bildirebilirsiniz ve intlayer, namespace'lerinizi istediğiniz konumda oluşturur (örnek: `/messages/{{locale}}/{{namespace}}.json`).
