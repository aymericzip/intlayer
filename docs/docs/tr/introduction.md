---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Giriş
description: Intlayer'ın nasıl çalıştığını keşfedin. Uygulamanızda Intlayer tarafından kullanılan adımları görün. Farklı paketlerin ne yaptığını öğrenin.
keywords:
  - Giriş
  - Başlangıç
  - Intlayer
  - Uygulama
  - Paketler
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Intlayer Dokümantasyonu

Resmi Intlayer dokümantasyonuna hoş geldiniz! Burada, Next.js, React, Vite, Express veya başka bir JavaScript ortamı kullanıyor olsanız da, tüm uluslararasılaştırma (i18n) ihtiyaçlarınız için Intlayer'ı entegre etmek, yapılandırmak ve ustalaşmak için ihtiyacınız olan her şeyi bulacaksınız.

## Giriş

### Intlayer Nedir?

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir uluslararasılaştırma kütüphanesidir. İçeriğinizin tanımını kodunuzun her yerinde yapmanıza olanak tanır. Çok dilli içerik tanımlarını kodunuza kolayca entegre etmek için yapılandırılmış sözlüklere dönüştürür. TypeScript kullanarak **Intlayer**, geliştirme sürecinizi daha güçlü ve verimli hale getirir.

Intlayer ayrıca, içeriğinizi kolayca düzenlemenize ve yönetmenize olanak tanıyan isteğe bağlı bir görsel düzenleyici sağlar. Bu düzenleyici, içerik yönetimi için görsel bir arayüzü tercih eden geliştiriciler veya kod konusunda endişelenmeden içerik üreten ekipler için özellikle yararlıdır.

### Kullanım Örneği

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      tr: "Merhaba Dünya",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "tr": "Merhaba Dünya"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Neden alternatifler yerine Intlayer?

`next-intl` veya `i18next` gibi ana çözümlerle karşılaştırıldığında, Intlayer aşağıdaki gibi entegre optimizasyonlarla birlikte gelen bir çözümdür:
<AccordionGroup>
<Accordion header="Paket boyutu (Bundle size)">

Sayfalarınıza devasa JSON dosyaları yüklemek yerine sadece gerekli içeriği yükleyin. Intlayer, **paket ve sayfa boyutlarınızı %50'ye kadar azaltmanıza** yardımcı olur.

</Accordion>
<Accordion header="Sürdürülebilirlik (Maintainability)">

Uygulamanızın içeriğini bileşenlerinize yakın konumlandırmak (scoping), büyük ölçekli uygulamalar için **bakımı kolaylaştırır**. Tüm içerik kod tabanınızı gözden geçirme zihinsel yükü olmadan tek bir özellik klasörünü kopyalayabilir veya silebilirsiniz. Ayrıca, içeriğinizin doğruluğunu sağlamak için Intlayer **tamamen tiplidir (fully typed)**.

</Accordion>
<Accordion header="Yapay Zeka Aracısı (AI Agent)">

İçeriğin koduyla aynı yerde (co-locate) bulunması, Büyük Dil Modellerinin (LLM'ler) **ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için bir **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve yapay zeka aracıları için geliştirici deneyimini (DX) daha da pürüzsüz hale getirecek **[aracı yetenekleri (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** gibi bir dizi araçla birlikte gelir.

</Accordion>
<Accordion header="Otomasyon">

Yapay zeka sağlayıcınızın maliyeti üzerinden dilediğiniz LLM'yi kullanarak CI/CD ardışık düzeninizde (pipeline) çeviri yapmak için otomasyonu kullanın. Intlayer ayrıca içerik çıkarma işlemini otomatikleştirmek için bir **derleyici (compiler)** ve **arka planda çeviri** yapmanıza yardımcı olacak bir [web platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sunar.

</Accordion>
<Accordion header="Performans">

Büyük JSON dosyalarını bileşenlere bağlamak, performans ve tepkisellik (reactivity) sorunlarına yol açabilir. Intlayer, içeriğinizin yüklenmesini derleme zamanında (build time) optimize eder.

</Accordion>
<Accordion header="Geliştirici olmayanlarla ölçeklendirme (Scaling with non-dev)">

Intlayer, sadece bir i18n çözümü olmaktan çok daha fazlasıdır; çevirmenler, metin yazarları ve diğer ekip üyeleriyle işbirliğini sorunsuz hale getirerek çok dilli içeriğinizi **gerçek zamanlı** yönetmenize yardımcı olacak, **kendi sunucunuzda barındırılabilen bir [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)** ve **[tam teşekküllü bir CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)** sağlar. İçerik yerel olarak ve/veya uzak sunucularda depolanabilir.

</Accordion>
</AccordionGroup>

## Ana Özellikler

Intlayer, modern web geliştirme ihtiyaçlarını karşılamak üzere uyarlanmış çeşitli özellikler sunar. Aşağıda, her biri için ayrıntılı dokümantasyon bağlantılarına sahip temel özellikler yer almaktadır:

- **Uluslararasılaştırma Desteği**: Uygulamanızın küresel erişimini yerleşik uluslararasılaştırma desteğiyle artırın.
- **Görsel Düzenleyici**: Intlayer için tasarlanmış düzenleyici eklentileriyle geliştirme iş akışınızı geliştirin. [Görsel Düzenleyici Kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) göz atın.
- **Yapılandırma Esnekliği**: Kurulumunuzu, [Yapılandırma Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)'nda ayrıntılı olarak açıklanan geniş yapılandırma seçenekleriyle özelleştirin.
- **Gelişmiş CLI Araçları**: Projelerinizi Intlayer'ın komut satırı arayüzü ile verimli bir şekilde yönetin. Olanakları [CLI Araçları Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/index.md)'nda keşfedin.

## Temel Kavramlar

### Sözlük (Dictionary)

Her şeyi tutarlı ve sürdürülebilir kılmak için çok dilli içeriğinizi kodunuza yakın bir yerde düzenleyin.

- **[Başlangıç](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)**  
  Intlayer'da içeriğinizi bildirmenin temellerini öğrenin.

- **[Çeviri (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md)**  
  Uygulamanızda çevirilerin nasıl oluşturulduğunu, saklandığını ve kullanıldığını anlayın.

- **[Numaralandırma (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/enumeration.md)**  
  Çeşitli dillerdeki tekrarlanan veya sabit veri setlerini kolayca yönetin.

- **[Koşul (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/condition.md)**  
  Dinamik içerik oluşturmak için Intlayer'da koşullu mantığı nasıl kullanacağınızı öğrenin.

- **[Ekleme (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/insertion.md)**  
  Yer tutucuları kullanarak bir dizeye nasıl değer ekleyeceğinizi keşfedin.

- **[Fonksiyon Alma (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/function_fetching.md)**  
  Projenizin iş akışıyla uyumlu olacak şekilde içeriği özel mantıkla dinamik olarak nasıl alacağınızı görün.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/markdown.md)**  
  Zengin içerik oluşturmak için Intlayer'da Markdown'ı nasıl kullanacağınızı öğrenin.

- **[Dosya Gömmeleri (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/file.md)**  
  İçerik düzenleyicide kullanmak üzere dış dosyaları Intlayer'a nasıl gömeceğinizi keşfedin.

- **[İç İçe Yerleştirme (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/nesting.md)**  
  Karmaşık yapılar oluşturmak için Intlayer'da içeriği nasıl iç içe yerleştireceğinizi anlayın.

### Ortamlar ve Entegrasyonlar

Intlayer'ı esnekliği göz önünde bulundurarak geliştirdik; popüler çerçeveler ve derleme araçlarıyla sorunsuz entegrasyon sağlıyoruz:

- **[Next.js 16 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_16.md)**
- **[Next.js 15 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_page_router.md)**
- **[React CRA ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_create_react_app.md)**
- **[Vite + React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)**
- **[React Router v7 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_router_v7.md)**
- **[Tanstack Start ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)**
- **[React Native ve Expo ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_native+expo.md)**
- **[Lynx ve React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_lynx+react.md)**
- **[Vite + Preact ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+preact.md)**
- **[Vite + Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)**
- **[Nuxt ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nuxt.md)**
- **[Vite + Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)**
- **[SvelteKit ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_svelte_kit.md)**
- **[Express ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_express.md)**
- **[NestJS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nestjs.md)**
- **[Hono ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_hono.md)**
- **[Angular ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)**

Her entegrasyon kılavuzu, hızlı, SEO dostu ve son derece ölçeklenebilir bir uygulama sunabilmeniz için **sunucu tarafı oluşturma (SSR)**, **dinamik yönlendirme** veya **istemci tarafı oluşturma** gibi Intlayer'ın özelliklerini kullanmaya yönelik en iyi uygulamaları içerir.

## Katkıda Bulunma ve Geri Bildirim

Açık kaynağın ve topluluk odaklı gelişimin gücüne değer veriyoruz. İyileştirmeler önermek, yeni bir kılavuz eklemek veya dokümanlarımızdaki herhangi bir sorunu düzeltmek isterseniz, [GitHub depomuzda](https://github.com/aymericzip/intlayer/blob/main/docs/docs) bir Çekme İsteği (Pull Request) göndermekten veya bir Sorun (Issue) açmaktan çekinmeyin.

**Uygulamanızı daha hızlı ve daha verimli bir şekilde çevirmeye hazır mısınız?** Bugün Intlayer kullanmaya başlamak için dokümanlarımıza dalın. İçeriğinizi düzenli tutan ve ekibinizi daha üretken kılan güçlü, akıcı bir uluslararasılaştırma yaklaşımını deneyimleyin.
