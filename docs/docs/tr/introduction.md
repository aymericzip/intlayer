---
createdAt: 2025-08-23
updatedAt: 2026-09-05
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
author: aymericzip
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

İçeriğin koduyla aynı yerde (co-locate) bulunması, Büyük Dil Modellerinin (LLM'ler) **ihtiyaç duyduğu bağlamı azaltır**. Intlayer ayrıca eksik çevirileri test etmek için bir **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)** ve yapay zeka aracıları için geliştirici deneyimini (DX) daha da pürüzsüz hale getirecek **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)** gibi bir dizi araçla birlikte gelir.

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
- **[Next.js URL’de locale olmadan ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_no_locale_path.md)**
- **[Next.js (Intlayer Compiler) ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_compiler.md)**
- **[Tanstack Start ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack.md)**
- **[Tanstack Start + Solid ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_tanstack+solid.md)**
- **[Vite + React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md)**
- **[Vite + React (Intlayer Compiler) ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react_compiler.md)**
- **[React Router v7 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_router_v7.md)**
- **[React Router v7 (fs-routes) ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_router_v7_fs_routes.md)**
- **[React CRA ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_create_react_app.md)**
- **[React Native ve Expo ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_react_native+expo.md)**
- **[Lynx ve React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_lynx+react.md)**
- **[Astro ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro.md)**
- **[Astro + React ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_react.md)**
- **[Astro + Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_vue.md)**
- **[Astro + Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_svelte.md)**
- **[Astro + Solid ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_solid.md)**
- **[Astro + Preact ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_preact.md)**
- **[Astro + Lit ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_lit.md)**
- **[Astro + Vanilla JS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_astro_vanilla.md)**
- **[Vite + Vue ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vue.md)**
- **[Nuxt ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nuxt.md)**
- **[Vite + Svelte ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+svelte.md)**
- **[SvelteKit ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_svelte_kit.md)**
- **[Vite + Solid ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+solid.md)**
- **[SolidStart ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_solid_start.md)**
- **[Vite + Preact ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+preact.md)**
- **[Angular 22 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_21.md)**
- **[Angular 19 ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_angular_19.md)**
- **[Analog ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_analog.md)**
- **[Vite + Lit ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+lit.md)**
- **[Vite + Vanilla JS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+vanilla.md)**
- **[Vanilla JS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vanilla.md)**
- **[htmx ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_htmx.md)**
- **[Express ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_express.md)**
- **[NestJS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nestjs.md)**
- **[Fastify ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_fastify.md)**
- **[Hono ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_hono.md)**
- **[AdonisJS ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_adonisjs.md)**
- **[Elysia ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_elysia.md)**
- **[Storybook ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_storybook.md)**
- **[next-intl ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_next-intl.md)**
- **[next-i18next ile Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_next-i18next.md)**

Her entegrasyon kılavuzu, hızlı, SEO dostu ve son derece ölçeklenebilir bir uygulama sunabilmeniz için **sunucu tarafı oluşturma (SSR)**, **dinamik yönlendirme** veya **istemci tarafı oluşturma** gibi Intlayer'ın özelliklerini kullanmaya yönelik en iyi uygulamaları içerir.

## Katkıda Bulunma ve Geri Bildirim

Açık kaynağın ve topluluk odaklı gelişimin gücüne değer veriyoruz. İyileştirmeler önermek, yeni bir kılavuz eklemek veya dokümanlarımızdaki herhangi bir sorunu düzeltmek isterseniz, [GitHub depomuzda](https://github.com/aymericzip/intlayer/blob/main/docs/docs) bir Çekme İsteği (Pull Request) göndermekten veya bir Sorun (Issue) açmaktan çekinmeyin.

**Uygulamanızı daha hızlı ve daha verimli bir şekilde çevirmeye hazır mısınız?** Bugün Intlayer kullanmaya başlamak için dokümanlarımıza dalın. İçeriğinizi düzenli tutan ve ekibinizi daha üretken kılan güçlü, akıcı bir uluslararasılaştırma yaklaşımını deneyimleyin.

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Intlayer ne için kullanılır?">

Intlayer, JavaScript ve TypeScript uygulamaları için geliştirilmiş bir uluslararasılaştırma (i18n) kütüphanesidir. Bir bileşenin içeriğini o bileşenin hemen yanında bir `.content.ts` dosyasında bildirirsiniz; Intlayer bu bildirimleri derleme zamanında tipli sözlüklere dönüştürür ve bileşenleriniz bunları `useIntlayer` gibi bir hook aracılığıyla okur. Çeviri, çoğul kuralları, cinsiyet, Markdown, yerel duyarlı yönlendirme, SEO meta verileri, AI destekli çeviri ve teknik olmayan kullanıcılar için görsel bir düzenleyici içerir.

</Question>

<Question title="i18n paket boyutuma ne kadar ekler?">

Ad alanı (namespace) tabanlı bir kuruluma kıyasla çok daha az, çünkü bir sayfa render etmediği bir sözlüğü asla indirmez. Sunucu tarafında render edilen markup içeriği sunucuda çözer ve derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük kayıtlarıyla değiştirir, böylece kullanılmayan anahtarlar ve diller elenir. [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Yaygın alternatiflerle karşılaştırıldığında Intlayer paket ve sayfa boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="i18next, next-intl veya react-i18next'ten bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet, iki yol mevcuttur. [i18next geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) veya [next-intl geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) ile içeriği aşamalı olarak taşıyabilirsiniz. Ya da mevcut API'nizi tamamen koruyabilirsiniz: [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md), `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` ve `Lingui` ile tamamen aynı API'yi sunar, ancak Intlayer sözlükleri tarafından desteklenir; böylece yalnızca import satırları değişir, bileşen kodu aynı kalır.

</Question>

<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

</Question>

<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

Tam otomatik bir akış için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında JSX, TSX, Vue ve Svelte kodunda aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir, böylece elle anahtar yönetimi gerekmez. Statik analizle çalıştığından, yalnızca çalışma zamanında var olan dizeler kapsam dışı kalır.

</Question>

<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>

<Question title="JavaScript uygulamasını uluslararasılaştırmak için hangi farklı çözümler mevcuttur?">

Alan üç nesle ayrılır:

- **Çalışma zamanı katalog kütüphaneleri**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Mesajlar çalışma zamanında yüklenen JSON ad alanlarında tutulur. Olgun ve frameworkten bağımsızdır ancak statik tiplemeden yoksundur ve istemciye tüm kataloğu gönderir.
- **Derleme zamanı mesaj kütüphaneleri**: `Lingui`, `Paraglide`, `react-intl` ve ayıklama adımlı `next-intl`. Daha iyi paket davranışı ve kısmi tipleme sağlar, ancak hala merkezi kataloglara dayanır.
- **İçerik katmanı kütüphaneleri (Content layer)**: `Intlayer`. İçerik bileşen başına bildirilir ve derlenir; tipleme, tree-shaking, geliştirici araçları ve düzenlemeyi tek bir doğruluk kaynağında birleştirir.

Bkz. [neden Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/interest_of_intlayer.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

</Question>

<Question title="Intlayer hangi frameworkleri destekler?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, ada bileşenli Astro, Expo ile React Native, Lynx ve arka uçta Express, Fastify, NestJS, Hono, Elysia ve AdonisJS. Her biri ortamlar bölümünde özel bir rehbere sahiptir.

</Question>

<Question title="İçeriği merkezi bir JSON dosyası yerine neden bileşenin yanında bildirmeliyim?">

Üç temel nedenden dolayı: Birincisi, bir sayfa tüm bir ad alanı yerine yalnızca bileşenlerinin render ettiği girişleri yükler, bu da paket boyutunu önemli ölçüde azaltır. İkincisi, bir özellik klasörü yetim anahtarlar aramadan bağımsızca taşınabilir veya silinebilir. Üçüncüsü, bileşeni düzenleyen bir LLM veya AI ajanı içeriği aynı klasörde görür, bu da çok daha yüksek doğruluk sağlar. Bkz. [Intlayer nasıl çalışır](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/how_works_intlayer.md).

</Question>

<Question title="Uygulamamı AI ile otomatik olarak nasıl çeviririm?">

`npx intlayer fill` komutunu çalıştırın. CLI eksik çevirileri tespit eder ve kendi sağlayıcınız ve API anahtarınızı kullanarak seçtiğiniz LLM ile tamamlar. `--git-diff` bayrağı işlemi geçerli daldaki değiştirilmiş içerikle sınırlar. Bkz. [fill komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/fill.md) ve [CI/CD entegrasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/CI_CD.md).

</Question>

<Question title="Eksik çevirileri nasıl bulurum?">

`npx intlayer test` komutunu çalıştırın. Bildirilen bir yerelde içerik eksik olduğunda hata verir, böylece çevrilmemiş bir metin üretime ulaşmaz. VS Code eklentisi bu hataları doğrudan editörde vurgular ve ESLint eklentisi sarılmamış dizeleri işaretler. Bkz. [içerik testi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/testing.md).

</Question>

<Question title="URL'ye yerel koymak zorunda mıyım?">

Hayır. `routing.mode` ayarı `"prefix-no-default"` (varsayılan: `/about` ve `/tr/about`), `"prefix-all"`, `"no-prefix"` ve `"search-params"` modlarını destekler; `routing.domains` ise her dili kendi alan adına atar. Şema ne olursa olsun `getMultilingualUrls` arama motorları için alternatif `hreflang` bağlantılarını otomatik üretir. Bkz. [yapılandırma belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md).

</Question>

<Question title="Çevirmenler ve içerik editörleri koda dokunmadan nasıl çalışabilir?">

Görsel düzenleyici kendi altyapınızda çalışır ve herkesin çalışan sitede metne tıklayıp düzenlemesine imkan verir, değişiklikleri kod tabanına geri kaydeder. CMS ise içeriği dışsallaştırarak yeniden dağıtım gerekmeden güncellenmesini sağlar. Bkz. [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) ve [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md).

</Question>

<Question title="Intlayer ücretsiz ve açık kaynaklı mı?">

Evet. Intlayer Apache 2.0 lisansı altında açık kaynaklıdır; kütüphane, CLI, derleyici ve görsel düzenleyici ticari kullanım dahil ücretsizdir. Barındırılan CMS isteğe bağlı ücretli bir hizmettir ve ayrıca [kendi sunucunuzda barındırılabilir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md).

</Question>

</FAQ>
