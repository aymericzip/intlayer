---
createdAt: 2025-09-07
updatedAt: 2026-09-28
priority: 8
title: "Intlayer nasıl çalışır: mimari genel bakış"
description: Intlayer'ın dahili olarak nasıl çalıştığını öğrenin. Intlayer'ı güçlü kılan mimari ve bileşenleri anlayın.
keywords:
  - Intlayer
  - How it works
  - Architecture
  - Components
  - Internal workings
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer Nasıl Çalışır

## İçindekiler

<TOC/>

## Genel Bakış

Intlayer'ın arkasındaki ana fikir, bileşen başına içerik yönetimini benimsemektir. Yani Intlayer'ın arkasındaki fikir, içeriğinizi kod tabanınızın herhangi bir yerinde, bileşeninizle aynı dizinde bildirmenize izin vermektir.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Bunu yapmak için, Intlayer'ın rolü projenizde bulunan tüm farklı formatlardaki `içerik bildirim dosyalarını` bulmak ve ardından onlardan `sözlükleri` oluşturmaktır.

Yani iki ana adım vardır:

- Sözlüklerin inşası adımı
- Yorumlama adımı

### Sözlüklerin inşası adımı

İnşa adımı üç şekilde yapılabilir:

- CLI ile `npx intlayer build` kullanarak
- [vscode uzantısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md) kullanarak
- [`vite-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vite-intlayer/exports.md) gibi uygulama eklentileri veya [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/next-intlayer/exports.md) için eşdeğerleri kullanarak. Bu eklentilerden birini kullandığınızda, Intlayer uygulamanızı başlattığınızda (dev) veya oluşturduğunuzda (prod) sözlüklerinizi otomatik olarak oluşturacaktır.

1. İçerik dosyalarının bildirimi
   - İçerik dosyaları TypeScript, ECMAScript, CommonJS veya JSON gibi çeşitli formatlarda tanımlanabilir.
   - İçerik dosyaları projenin her yerinde tanımlanabilir, bu da daha iyi bakım ve ölçeklenebilirlik sağlar. İçerik dosyaları için dosya uzantısı kurallarına uymak önemlidir. Bu uzantı varsayılan olarak `*.content.{js|cjs|mjs|ts|tsx|json}`'dur, ancak [konfigürasyon dosyasında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) değiştirilebilir.

2. `Sözlüklerin` oluşturulması
   - Sözlükler içerik dosyalarından oluşturulur. Varsayılan olarak, Intlayer sözlükleri projenin `.intlayer/dictionaries` dizininde oluşturulur.
   - Bu sözlükler, tüm ihtiyaçlara uymak ve uygulamanın performansını optimize etmek için farklı formatlarda oluşturulur.

3. Sözlük türlerinin oluşturulması

`Sözlüklerinize` dayanarak, Intlayer onları uygulamanızda kullanılabilir hale getirmek için türler oluşturacaktır.

- Sözlük türleri Intlayer `içerik bildirim dosyalarından` oluşturulur. Varsayılan olarak, Intlayer sözlük türleri projenin `.intlayer/types` dizininde oluşturulur.

- Intlayer [modül genişletmesi](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), Intlayer için ek türler tanımlamanızı sağlayan bir TypeScript özelliğidir. Bu, mevcut argümanları önererek veya gerekli argümanları belirterek geliştirme deneyimini kolaylaştırır.
  Oluşturulan türler arasında, Intlayer sözlük türleri veya hatta dil konfigürasyon türleri `types/intlayer.d.ts` dosyasına eklenir ve diğer paketler tarafından kullanılır. Bunu yapmak için, `tsconfig.json` dosyasının projenin `types` dizinini içerecek şekilde yapılandırılması gerekir.

### Sözlüklerin yorumlama adımı

Intlayer kullanarak, uygulamanızda içeriğinize `useIntlayer` kancası kullanarak erişeceksiniz.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Bu kanca yerel ayar algılamayı sizin için yönetecek ve mevcut yerel ayar için içeriği döndürecektir. Bu kancayı kullanarak, markdown'ı yorumlayabilir, çoğullaştırmayı yönetebilir ve daha fazlasını yapabilirsiniz.

> Intlayer'ın tüm özelliklerini görmek için [sözlük dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) okuyabilirsiniz.

- [sözlük dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md)

## Uzak içerik

Intlayer, içeriğinizi yerel olarak bildirmenize ve ardından CMS'ye dışa aktararak teknik olmayan ekibiniz tarafından düzenlenebilir hale getirmenize izin verir.

Bu şekilde, kodunuz için Git ile yaptığınız şeye benzer şekilde CMS'den içeriği itip çekebilirsiniz.

CMS'yi kullanarak dışa aktarılan sözlükler için, Intlayer uzak sözlükleri almak için temel bir getirme işlemi gerçekleştirir ve onları yerel olanlarınızla birleştirir. Projenizde yapılandırılmışsa, Intlayer uygulama başladığında (dev) / oluşturulduğunda (prod) CMS'den içeriğin getirilmesini otomatik olarak yönetir.

## Görsel düzenleyici

Intlayer ayrıca içeriğinizi görsel bir şekilde düzenlemenize izin veren bir görsel düzenleyici sağlar. Bu [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) harici `intlayer-editor` paketinde mevcuttur.

- [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)

![visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Sunucu, istemciden gelen isteklere yanıt veren ve uygulamanızın içeriğini, `sözlükleri` ve konfigürasyonu istemci tarafında erişilebilir hale getirmek için alan basit bir Express uygulamasıdır.
- Öte yandan, istemci, içeriğinizle görsel bir arayüz kullanarak etkileşim kurmak için kullanılan bir React uygulamasıdır.

İçeriğinizi `useIntlayer` kullanarak çağırdığınızda ve düzenleyici etkinleştirildiğinde, dizelerinizi otomatik olarak `IntlayerNode` adlı bir Proxy nesnesi ile sarar. Bu düğüm, görsel düzenleyici arayüzünü içeren sarılmış bir iframe ile iletişim kurmak için `window.postMessage` kullanır.
Düzenleyici tarafında, düzenleyici bu mesajları dinler ve içeriğinizle gerçek etkileşimi simüle eder, böylece metni doğrudan uygulamanızın bağlamında düzenlemenizi sağlar.

## Uygulama inşası optimizasyonu

Uygulamanızın bundle boyutunu optimize etmek için, Intlayer uygulama inşanızı optimize etmek için iki eklenti sağlar: `@intlayer/babel` ve `@intlayer/swc` eklentileri.

Babel ve SWC eklentileri, uygulamanızın Soyut Sözdizimi Ağacını (AST) analiz ederek Intlayer fonksiyon çağrılarını optimize edilmiş kodla değiştirerek çalışır. Bu süreç, üretimde son paketi daha hafif hale getirir, çünkü sadece gerçekten kullanılan sözlüklerin içe aktarıldığından emin olur, parçalama işlemini optimize eder ve bundle boyutunu azaltır.

Geliştirme modunda, Intlayer geliştirme deneyimini basitleştirmek için sözlükler için merkezi bir statik içe aktarma kullanır.

[Konfigürasyonda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) `importMode = "dynamic"` seçeneğini etkinleştirerek, Intlayer sözlükleri yüklemek için dinamik içe aktarmayı kullanacaktır. Bu seçenek, uygulama işlenirken eşzamansız işlemeyi önlemek için varsayılan olarak devre dışıdır.

- [Konfigürasyonda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

> `@intlayer/babel` varsayılan olarak `vite-intlayer` paketinde mevcuttur,

> `@intlayer/swc` Next.js'te SWC eklentileri hala deneysel olduğu için varsayılan olarak `next-intlayer` paketinde yüklü değildir.

Uygulamanızın inşasını nasıl yapılandıracağınızı görmek için [konfigürasyon dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) okuyabilirsiniz.

- [konfigürasyon dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

## Paketler

Intlayer, çeviri sürecinde belirli bir rolü olan birkaç paketten oluşur. İşte bu paketin yapısının grafiksel bir temsili:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` paketi, içerik dosyalarında içeriği bildirmek için uygulamalarda kullanılır.

### Frontend Framework'leri

<Tabs group="framework">
  <Tab label="React" value="react">

`react-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve React uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Next.js" value="nextjs">

`next-intlayer` paketi, `react-intlayer` üzerine bir katman olarak kullanılır ve Intlayer sözlüklerini Next.js uygulamalarında kullanılabilir hale getirir. Çeviri ara yazılımı, yönlendirme veya `next.config.js` dosyası konfigürasyonu gibi Intlayer'ı bir Next.js ortamında çalışacak şekilde yapmak için gerekli özellikleri entegre eder.

  </Tab>
  <Tab label="Vue" value="vue">

`vue-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Vue uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Nuxt" value="nuxt">

`nuxt-intlayer` paketi, Intlayer sözlüklerini Nuxt uygulamalarında kullanılabilir hale getirmek için bir Nuxt modülü olarak kullanılır. Çeviri ara yazılımı, yönlendirme veya `nuxt.config.js` dosyası konfigürasyonu gibi Intlayer'ı bir Nuxt ortamında çalışacak şekilde yapmak için gerekli özellikleri entegre eder.

  </Tab>
  <Tab label="Svelte" value="svelte">

`svelte-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Svelte uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Solid" value="solid">

`solid-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Solid.js uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Preact" value="preact">

`preact-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Preact uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Angular" value="angular">

`angular-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Angular uygulamalarında kullanılabilir hale getirmek için kullanılır.

  </Tab>
  <Tab label="Astro" value="astro">

`astro-intlayer` paketi, Intlayer'ı Astro uygulamalarına entegre etmek için gerekli araçları sağlar. Locale tabanlı yönlendirme ve sözlük yönetimini yapılandırır.

  </Tab>
  <Tab label="Remix" value="remix">

`remix-intlayer` paketi, Intlayer'ı Remix uygulamalarına entegre etmek için gerekli araçları sağlar. Locale tabanlı yönlendirme, sunucu tarafı bağlamı ve sözlük yönetimini yapılandırır.

  </Tab>
  <Tab label="React Native" value="react-native">

`react-native-intlayer` paketi, Intlayer'ı Metro paketleyici ile çalışacak şekilde entegre eden eklentiler sağlar.

  </Tab>
  <Tab label="Lit" value="lit">

`lit-intlayer` paketi, Lit uygulamalarında Intlayer sözlüklerini yorumlamak ve kullanmak için araçlar ve bileşenler sağlar.

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer` paketi, Intlayer'ı vanilla JavaScript, HTML veya PHP uygulamalarına entegre etmek için araçlar sağlar.

  </Tab>
</Tabs>

### Backend Framework'leri

<Tabs group="backend">
  <Tab label="Express" value="express">

`express-intlayer` paketi, bir Express.js arka ucunda Intlayer kullanmak için kullanılır.

  </Tab>
  <Tab label="Fastify" value="fastify">

`fastify-intlayer` paketi, Fastify uygulamaları için uluslararasılaştırmayı (internationalization / i18n) yönetmek üzere bir plugin sağlar. Kullanıcının locale'ini algılar ve request nesnesini dekorlar.

  </Tab>
  <Tab label="Hono" value="hono">

`hono-intlayer` paketi, uluslararasılaştırmayı yönetmek için Hono uygulamaları için bir ara yazılım (middleware) sağlar. Kullanıcının yerel ayarını algılar ve bağlam nesnesini doldurur.

  </Tab>
  <Tab label="Elysia" value="elysia">

`elysia-intlayer` paketi, Elysia uygulamaları için uluslararasılaştırmayı (internationalization / i18n) yönetmek üzere bir plugin sağlar. Kullanıcının locale'ini algılar ve route context'ine bir `intlayer` nesnesi enjekte eder.

  </Tab>
  <Tab label="AdonisJS" value="adonis">

`adonis-intlayer` paketi, AdonisJS uygulamalarının uluslararasılaştırmayı yönetmesi için bir middleware sağlar. Kullanıcının yerel ayarını algılar ve çeviri fonksiyonları sağlar.

  </Tab>
</Tabs>

### vite-intlayer

[Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini içerir, ayrıca kullanıcının tercih ettiği yerel ayarı algılayan, çerezleri yöneten ve URL yönlendirmesini işleyen ara yazılım içerir.

### react-scripts-intlayer

Create React App tabanlı uygulama ile Intlayer'ı entegre etmek için `react-scripts-intlayer` komutlarını ve eklentileri içerir. Bu eklentiler [craco](https://craco.js.org/) tabanlıdır ve [Webpack](https://webpack.js.org/) paketleyici için ek konfigürasyon içerir.

### eslint-plugin-intlayer

`eslint-plugin-intlayer` paketi, çevrilmemiş dizeleri yakalamak, sözlük tanımlarını doğrulamak ve i18n en iyi uygulamalarını zorunlu kılmak için ESLint ve oxlint kuralları sağlar.

### intlayer-editor

`intlayer-editor` paketi, görsel düzenleyicinin kullanımına izin vermek için kullanılır. Bu paket, isteğe bağlıdır ve uygulamalarda yüklenebilir ve `react-intlayer` paketi tarafından kullanılacaktır.
İki bölümden oluşur: sunucu ve istemci.

İstemci, `react-intlayer` tarafından kullanılacak UI öğelerini içerir.

Sunucu, Express tabanlıdır ve görsel düzenleyici isteklerini almak ve içerik dosyalarını yönetmek veya değiştirmek için kullanılır.

### intlayer-cli

`intlayer-cli` paketi, `npx intlayer dictionaries build` komutu kullanarak sözlükler oluşturmak için kullanılabilir. `intlayer` zaten yüklüyse, CLI otomatik olarak yüklenir ve bu paket gerekli değildir.

### @intlayer/core

`@intlayer/core` paketi, ana Intlayer paketidir. Çeviri ve sözlük yönetimi fonksiyonlarını içerir. `@intlayer/core` çok platformludur ve diğer paketler tarafından sözlüklerin yorumlanmasını gerçekleştirmek için kullanılır.

### @intlayer/config

`@intlayer/config` paketi, kullanılabilir diller, Next.js ara yazılımı parametreleri veya entegre düzenleyici ayarları gibi Intlayer ayarlarını yapılandırmak için kullanılır.

### @intlayer/webpack

`@intlayer/webpack` paketi, bir Webpack tabanlı uygulamayı Intlayer ile çalışacak şekilde yapmak için bir Webpack konfigürasyonu sağlamak için kullanılır. Paket ayrıca mevcut bir Webpack uygulamasına eklenecek bir eklenti sağlar.

### @intlayer/cli

`@intlayer/cli` paketi, Intlayer komut satırı arayüzleriyle ilgili komut dosyalarını bildirmek için kullanılan bir NPM paketidir. Tüm Intlayer CLI komutlarının tekdüzeliğini sağlar. Bu paket özellikle [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer-cli/exports.md) ve [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/exports.md) paketleri tarafından tüketilir.

### @intlayer/mcp

`@intlayer/mcp` paketi, Intlayer ekosistemi için uyarlanmış AI destekli IDE yardımı sağlayan bir MCP (Model Context Protocol) sunucusu sağlar. Dokümantasyonu otomatik olarak yükler ve Intlayer CLI ile entegre olur.

### @intlayer/lsp

`@intlayer/lsp` paketi, Intlayer için özel olarak tasarlanmış bir Language Server Protocol (LSP) sunucusu sağlar. Tanıma Git, Tüm Referansları Bul, üzerine gelindiğinde önizleme, sözlük anahtarlarını otomatik tamamlama ve tanılama uyarıları gibi IDE özelliklerini getirir.

### @intlayer/ai

`@intlayer/ai` paketi, Intlayer uygulamaları için otomatik çeviri ve yapay zeka destekli içerik üretimini etkinleştiren SDK yetenekleri sağlar.

### @intlayer/analytics

`@intlayer/analytics` paketi, içerik gösterim metriklerini, sayfa/yerel ayar ve düğüm düzeyinde analizleri toplamak ve içerik A/B testlerini desteklemek için araçlar sağlar.

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` paketi, Intlayer sözlüklerinin giriş yolunu döndürür: kökünden birleştirilmiş sözlükleri ve `/unmerged`, `/remote`, `/dynamic` ve `/fetch` alt yollarından birleştirilmemiş, uzak, dinamik ve fetch sözlüklerini. Tarayıcıdan dosya sistemini aramak imkansız olduğu için, Webpack veya Rollup gibi paketleyicileri kullanarak sözlüklerin giriş yolunu almak mümkün değildir. Paket ve alt yolları, Vite, Webpack ve Turbopack gibi çeşitli paketleyicilerde paketleme optimizasyonuna izin vermek için takma adlandırılmak üzere tasarlanmıştır.

### @intlayer/engine

`@intlayer/engine` paketi, içerik dosyalarını izlemek ve her değişiklikte değiştirilen sözlüğü yeniden oluşturmak için kullanılır.

### @intlayer/editor

`@intlayer/editor` paketi, sözlük düzenleyicisiyle ilgili yardımcı programları sağlar. Özellikle bir uygulamayı Intlayer düzenleyicisiyle arayüzlendirmek için API'yi ve sözlükleri manipüle etmek için yardımcı programları içerir. Bu paket çok platformludur.

### @intlayer/editor-react

`@intlayer/editor-react` paketi, bir React uygulamasını Intlayer düzenleyicisiyle arayüzlendirmek için durumları, bağlamları, kancaları ve bileşenleri sağlar.

### @intlayer/babel

`@intlayer/babel` paketi, Vite ve Webpack tabanlı uygulamalar için sözlüklerin paketlenmesini optimize eden araçlar sağlar.

### @intlayer/swc

`@intlayer/swc` paketi, Next.js uygulamaları için sözlüklerin paketlenmesini optimize eden araçlar sağlar.

### @intlayer/api

`@intlayer/api` paketi, arka uçla etkileşim kurmak için bir API SDK'sıdır.

### @intlayer/design-system

`@intlayer/design-system` paketi, CMS ve Görsel düzenleyici arasında tasarım öğelerini paylaşmak için kullanılır.

### @intlayer/backend

`@intlayer/backend` paketi, arka uç türlerini dışa aktarır ve gelecekte arka ucu bağımsız bir paket olarak sunacaktır.

## Akıllı dokümantasyonumuzla sohbet edin

- [Sorularınızı akıllı dokümantasyonumuza sorun](https://intlayer.org/doc/chat)

## Sıkça Sorulan Sorular

<FAQ>

<Question title="Sözlükler ne zaman oluşturulur, derleme zamanında mı yoksa çalışma zamanında mı?">

Derleme zamanında. Intlayer eklentisi `.content.ts` dosyalarını tarar, bunları optimize edilmiş sözlüklere derler ve `.intlayer` klasörüne yazar. Geliştirme ortamında bu süreç her dosya kaydında anında tekrarlanır.

</Question>
<Question title="i18n paket boyutuma ne kadar ekler?">

Ad alanı (namespace) tabanlı bir kuruluma kıyasla çok daha az, çünkü bir sayfa render etmediği bir sözlüğü asla indirmez. Sunucu tarafında render edilen markup içeriği sunucuda çözer ve derleme zamanı derleyicisi `useIntlayer` çağrılarını bileşenin kullandığı kesin sözlük kayıtlarıyla değiştirir, böylece kullanılmayan anahtarlar ve diller elenir. [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) geri kalanını yerel başına böler. Yaygın alternatiflerle karşılaştırıldığında Intlayer paket ve sayfa boyutunu %50'ye kadar azaltır. Bkz. [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) ve [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md).

- [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md)
- [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)
- [kıyaslama](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/benchmark/index.md)

</Question>
<Question title="i18next, next-intl veya react-i18next'ten bileşenlerimi yeniden yazmadan geçiş yapabilir miyim?">

Evet, iki yol mevcuttur. [i18next geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md) veya [next-intl geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) ile içeriği aşamalı olarak taşıyabilirsiniz. Ya da mevcut API'nizi tamamen koruyabilirsiniz: [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md), `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` ve `Lingui` ile tamamen aynı API'yi sunar, ancak Intlayer sözlükleri tarafından desteklenir; böylece yalnızca import satırları değişir, bileşen kodu aynı kalır.

- [i18next geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_i18next_to_intlayer.md)
- [next-intl geçiş kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md)
- [uyumluluk adaptörleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compat/index.md)

</Question>
<Question title="Mevcut JSON çeviri dosyalarımı koruyabilir miyim?">

Evet. [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md), `/messages/{locale}/{namespace}.json` dosyalarınızı doğruluk kaynağı olarak tutar ve her iki yönde Intlayer sözlükleri üretir. [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md) gettext katalogları için aynısını yapar ve [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md), yerelleri tek bir dosyada gruplamak yerine içeriği dile göre ayırmanıza olanak tanır.

- [sync JSON eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-json.md)
- [sync PO eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/plugins/sync-po.md)
- [yerel başına dosyalar](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/per_locale_file.md)

</Question>
<Question title="İçeriğimi anahtar anahtar taşımak zorunda mıyım?">

Hayır. `npx intlayer extract` komutunu çalıştırın; Intlayer kaynak dosyalarınızı okur, kullanıcıya dönük dizeleri çıkarır ve her birinin yanına bir `.content` dosyası yazar, böylece dizeleri tek tek kopyalamak yerine bir diff incelersiniz. Bkz. [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md).

- [extract komutu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/extract.md)

Tam otomatik bir akış için [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md) derleme sırasında JSX, TSX, Vue ve Svelte kodunda aynı işlemi yapar ve sözlükleri her değişiklikte otomatik üretir, böylece elle anahtar yönetimi gerekmez. Statik analizle çalıştığından, yalnızca çalışma zamanında var olan dizeler kapsam dışı kalır.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/compiler.md)

</Question>
<Question title="Hangi editör ve AI aracı araçları mevcuttur?">

Beş araç, hepsi isteğe bağlı:

- **[VS Code eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/vs_code_extension.md)**: bir `useIntlayer` anahtarından onu tanımlayan içerik dosyasına atlayın, bileşenden içerik çıkarın ve komut paletinden build, fill, test, push ve pull komutlarını çalıştırın.
- **[LSP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/lsp.md)**: LSP destekleyen tüm editörlerde tanıma gitme, tüm referansları bulma, çevrilmiş değerlerin fareyle üzerine gelindiğinde önizlemesi ve otomatik tamamlama. `i18next`, `react-i18next`, `next-intl` ve `use-intl` çağrılarını da çözer.
- **[MCP sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/mcp_server.md)**: Intlayer dokümantasyonunu ve CLI'sini Cursor, VS Code, Claude Desktop, Claude Code ve ChatGPT'ye sunar.
- **[Ajan becerileri (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/agent_skills.md)**: `intlayer-config`, `intlayer-cli` ve `intlayer-content` gibi odaklanmış beceriler.
- **[ESLint eklentisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/eslint.md)**: `no-raw-text` kuralı doğrudan kodlanmış metinleri işaretler.

</Question>
<Question title=".intlayer klasörü nedir ve onu git'e eklemeli miyim?">

Oluşturulan çıktıdır: derlenmiş sözlükler ve üretilen TypeScript tipleri. İçerik dosyalarınızdan türetildiği için `.gitignore` dosyasına eklenmeli ve CI/CD süreçlerinde `intlayer build` ile üretilmelidir.

</Question>
<Question title="Aktif yerel nasıl belirlenir?">

`routing.storage` içinde listelenen kaynaklardan sırasıyla: `routing.mode` kullanıyorsa URL ön eki, ardından çerez, ardından `Accept-Language` başlığı ve son olarak varsayılan diliniz. Kullanıcının açıkça seçtiği dil kalıcı olarak saklanır, böylece bir sonraki ziyarette de korunur. [Yapılandırma referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

- [Yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)

</Question>
<Question title="Yerel ve uzak sözlükler arasındaki fark nedir?">

Yerel bir sözlük kod tabanınızda bildirilir ve uygulamanızla birlikte derlenir. Uzak bir sözlük ise [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) içinde yönetilir ve çalışma zamanında çözümlenir, böylece dağıtım yapmadan değişebilir. Her ikisi de aynı hook'lar aracılığıyla okunur ve uzak içerik kullanılamadığında yerel bildirime geri döner.

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)

</Question>
<Question title="Intlayer TypeScript olmadan çalışır mı?">

Evet. İçerik dosyaları TypeScript, JavaScript, ESM, CommonJS veya JSON formatlarında yazılabilir. TypeScript, otomatik tip denetimi ve otomatik tamamlama avantajlarını açığa çıkarır.

</Question>
<Question title="Sunucu renderi ve istemci renderi aynı içeriği nasıl paylaşır?">

Sunucu, sunucu bileşenlerinin içeriğini doğrudan çözer, bu nedenle bu bileşenler için istemciye hiçbir sözlük gönderilmez. İstemci bileşenleri ise yalnızca tarayıcıda etkileşim için gereken sözlükleri alır.

</Question>
<Question title="Intlayer yerel ile ilgili hidrasyon uyumsuzluğunu (hydration mismatch) nasıl önler?">

Yerel dil sunucuda bir kez çözümlenir ve istemci sağlayıcısına iletilir, tarayıcıda yeniden algılanmaya çalışılmaz; bu sayede sunucu ve istemci HTML çıktıları birebir eşleşir.

</Question>
<Question title="Intlayer'ı global bir provider olmadan kullanabilir miyim?">

Evet. `getIntlayer` ve `getDictionary` herhangi bir provider gerektirmeyen basit fonksiyonlardır ve `useIntlayer` da bir provider dışında çalışır. Hiçbir locale verilmediğinde, sunucuda geçerli isteğin locale'ini (Express, Fastify, Hono, AdonisJS, Elysia, Remix ve Astro için Intlayer middleware'i veya React Server Components içindeki `IntlayerProvider` aracılığıyla), ardından dil değiştiricinizin tarayıcıda sakladığı locale'i, ardından `defaultLocale`'i çözümlerler. `getIntlayerAsync`, Next.js'in `headers()` ve `cookies()` değerleri gibi yalnızca asenkron okunabilen durumlarda isteğin locale'ini de bekleyebilir. Her istek kendi cookie'lerini ve header'larını çözümler, bu nedenle eşzamanlı kullanıcılar asla aynı locale'i paylaşmaz. Bkz. [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md).

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md)

Fark içerikte değil, reaktivite ve render maliyetindedir:

- **Bir provider ile** locale framework'ün state'inde yaşar. Her `useIntlayer` ona abone olur, bu yüzden bir locale değişikliği bileşenleri sayfa yenilenmeden yerinde yeniden render eder. Sunucuda render edilen bir sayfada provider, sunucunun render ettiği locale'i istemciye aktarır, böylece markup her zaman eşleşir. Maliyeti, bundle içindeki provider kodu ve her değişiklikte tüketicilerinin yeniden render edilmesidir.
- **Provider olmadan** bir okuma, memoize edilmiş bir fonksiyon çağrısıdır: context okuması yok, abonelik yok ve aynı `key + locale` için aynı nesne döndürülür. Bir locale değişikliğinde hiçbir şey yeniden render edilmez: yeni locale bir sonraki çağrıda, genellikle bir navigasyon veya sayfa yenilemesinden sonra görünür. Saklanan locale bir kez okunur ve bir sonraki değişikliğe kadar önbelleğe alınır, bu da Intlayer'ı zaten içeren bir bundle'a yaklaşık 100 bayt (gzip) ekler. Ödünleşim, herhangi bir istek entegrasyonu dışındaki sunucu render'lı sayfalardadır: sunucu `defaultLocale`'i render ederken tarayıcı saklanan locale'i okur ve bu bir hydration mismatch'e yol açabilir.

Locale'i yerinde değiştiren veya sunucuda render eden etkileşimli uygulamalarda provider'ı koruyun. Backend'lerde, script'lerde, locale'i URL'den gelen statik sayfalarda (açıkça verin) veya içeriği bir kez okuyan kodda provider olmadan ilerleyin.

</Question>
<Question title="Bir çeviri eklediğimde uygulamayı yeniden derlemem gerekir mi?">

Geliştirme ortamında hayır: eklenti içerik dosyalarınızı izler ve kaydettiğinizde etkilenen sözlükleri yeniden oluşturur. Üretimde sözlükler derlemenin bir parçasıdır; içerik uzaksa bu durumda [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ve [canlı senkronizasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live.md) değişikliği dağıtım yapmadan uygular.

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [canlı senkronizasyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/live.md)

</Question>

</FAQ>
