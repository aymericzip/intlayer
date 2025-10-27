---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer Nasıl Çalışır
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
    changes: Geçmiş başlatıldı
---

# Intlayer Nasıl Çalışır

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
- [vscode uzantısı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md) kullanarak
- [`vite-intlayer` paketi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md) gibi uygulama eklentileri veya [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md) için eşdeğerleri kullanarak. Bu eklentilerden birini kullandığınızda, Intlayer uygulamanızı başlattığınızda (dev) veya oluşturduğunuzda (prod) sözlüklerinizi otomatik olarak oluşturacaktır.

1. İçerik dosyalarının bildirimi
   - İçerik dosyaları TypeScript, ECMAScript, CommonJS veya JSON gibi çeşitli formatlarda tanımlanabilir.
   - İçerik dosyaları projenin her yerinde tanımlanabilir, bu da daha iyi bakım ve ölçeklenebilirlik sağlar. İçerik dosyaları için dosya uzantısı kurallarına uymak önemlidir. Bu uzantı varsayılan olarak `*.content.{js|cjs|mjs|ts|tsx|json}`'dur, ancak [konfigürasyon dosyasında](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) değiştirilebilir.

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

> Intlayer'ın tüm özelliklerini görmek için [sözlük dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) okuyabilirsiniz.

## Uzak içerik

Intlayer, içeriğinizi yerel olarak bildirmenize ve ardından CMS'ye dışa aktararak teknik olmayan ekibiniz tarafından düzenlenebilir hale getirmenize izin verir.

Bu şekilde, kodunuz için Git ile yaptığınız şeye benzer şekilde CMS'den içeriği itip çekebilirsiniz.

CMS'yi kullanarak dışa aktarılan sözlükler için, Intlayer uzak sözlükleri almak için temel bir getirme işlemi gerçekleştirir ve onları yerel olanlarınızla birleştirir. Projenizde yapılandırılmışsa, Intlayer uygulama başladığında (dev) / oluşturulduğunda (prod) CMS'den içeriğin getirilmesini otomatik olarak yönetir.

## Görsel düzenleyici

Intlayer ayrıca içeriğinizi görsel bir şekilde düzenlemenize izin veren bir görsel düzenleyici sağlar. Bu [görsel düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) harici `intlayer-editor` paketinde mevcuttur.

![visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Sunucu, istemciden gelen isteklere yanıt veren ve uygulamanızın içeriğini, `sözlükleri` ve konfigürasyonu istemci tarafında erişilebilir hale getirmek için alan basit bir Express uygulamasıdır.
- Öte yandan, istemci, içeriğinizle görsel bir arayüz kullanarak etkileşim kurmak için kullanılan bir React uygulamasıdır.

İçeriğinizi `useIntlayer` kullanarak çağırdığınızda ve düzenleyici etkinleştirildiğinde, dizelerinizi otomatik olarak `IntlayerNode` adlı bir Proxy nesnesi ile sarar. Bu düğüm, görsel düzenleyici arayüzünü içeren sarılmış bir iframe ile iletişim kurmak için `window.postMessage` kullanır.
Düzenleyici tarafında, düzenleyici bu mesajları dinler ve içeriğinizle gerçek etkileşimi simüle eder, böylece metni doğrudan uygulamanızın bağlamında düzenlemenizi sağlar.

## Uygulama inşası optimizasyonu

Uygulamanızın paket boyutunu optimize etmek için, Intlayer uygulama inşanızı optimize etmek için iki eklenti sağlar: `@intlayer/babel` ve `@intlayer/swc` eklentileri.

Babel ve SWC eklentileri, uygulamanızın Soyut Sözdizimi Ağacını (AST) analiz ederek Intlayer fonksiyon çağrılarını optimize edilmiş kodla değiştirerek çalışır. Bu süreç, üretimde son paketi daha hafif hale getirir, çünkü sadece gerçekten kullanılan sözlüklerin içe aktarıldığından emin olur, parçalama işlemini optimize eder ve paket boyutunu azaltır.

Geliştirme modunda, Intlayer geliştirme deneyimini basitleştirmek için sözlükler için merkezi bir statik içe aktarma kullanır.

[Konfigürasyonda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) `importMode = "dynamic"` seçeneğini etkinleştirerek, Intlayer sözlükleri yüklemek için dinamik içe aktarmayı kullanacaktır. Bu seçenek, uygulama işlenirken eşzamansız işlemeyi önlemek için varsayılan olarak devre dışıdır.

> `@intlayer/babel` varsayılan olarak `vite-intlayer` paketinde mevcuttur,

> `@intlayer/swc` Next.js'te SWC eklentileri hala deneysel olduğu için varsayılan olarak `next-intlayer` paketinde yüklü değildir.

Uygulamanızın inşasını nasıl yapılandıracağınızı görmek için [konfigürasyon dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) okuyabilirsiniz.

## Paketler

Intlayer, çeviri sürecinde belirli bir rolü olan birkaç paketten oluşur. İşte bu paketin yapısının grafiksel bir temsili:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` paketi, içerik dosyalarında içeriği bildirmek için uygulamalarda kullanılır.

### react-intlayer

`react-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve React uygulamalarında kullanılabilir hale getirmek için kullanılır.

### next-intlayer

`next-intlayer` paketi, `react-intlayer` üzerine bir katman olarak kullanılır ve Intlayer sözlüklerini Next.js uygulamalarında kullanılabilir hale getirir. Çeviri ara yazılımı, yönlendirme veya `next.config.js` dosyası konfigürasyonu gibi Intlayer'ı bir Next.js ortamında çalışacak şekilde yapmak için gerekli özellikleri entegre eder.

### vue-intlayer

`vue-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Vue uygulamalarında kullanılabilir hale getirmek için kullanılır.

### nuxt-intlayer

`nuxt-intlayer` paketi, Intlayer sözlüklerini Nuxt uygulamalarında kullanılabilir hale getirmek için bir Nuxt modülü olarak kullanılır. Çeviri ara yazılımı, yönlendirme veya `nuxt.config.js` dosyası konfigürasyonu gibi Intlayer'ı bir Nuxt ortamında çalışacak şekilde yapmak için gerekli özellikleri entegre eder.

### svelte-intlayer (WIP)

`svelte-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Svelte uygulamalarında kullanılabilir hale getirmek için kullanılır.

### solid-intlayer (WIP)

`solid-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Solid.js uygulamalarında kullanılabilir hale getirmek için kullanılır.

### preact-intlayer

`preact-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Preact uygulamalarında kullanılabilir hale getirmek için kullanılır.

### angular-intlayer (WIP)

`angular-intlayer` paketi, Intlayer sözlüklerini yorumlamak ve Angular uygulamalarında kullanılabilir hale getirmek için kullanılır.

### express-intlayer

`express-intlayer` paketi, bir Express.js arka ucunda Intlayer kullanmak için kullanılır.

### react-native-intlayer

`react-native-intlayer` paketi, Intlayer'ı Metro paketleyici ile çalışacak şekilde entegre eden eklentiler sağlar.

### lynx-intlayer

`lynx-intlayer` paketi, Intlayer'ı Lynx paketleyici ile çalışacak şekilde entegre eden araçlar sağlar.

### vite-intlayer

[Vite paketleyici](https://vite.dev/guide/why.html#why-bundle-for-production) ile Intlayer'ı entegre etmek için Vite eklentisini içerir, ayrıca kullanıcının tercih ettiği yerel ayarı algılayan, çerezleri yöneten ve URL yönlendirmesini işleyen ara yazılım içerir.

### react-scripts-intlayer

Create React App tabanlı uygulama ile Intlayer'ı entegre etmek için `react-scripts-intlayer` komutlarını ve eklentileri içerir. Bu eklentiler [craco](https://craco.js.org/) tabanlıdır ve [Webpack](https://webpack.js.org/) paketleyici için ek konfigürasyon içerir.

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

`@intlayer/cli` paketi, Intlayer komut satırı arayüzleriyle ilgili komut dosyalarını bildirmek için kullanılan bir NPM paketidir. Tüm Intlayer CLI komutlarının tekdüzeliğini sağlar. Bu paket özellikle [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer-cli/index.md) ve [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer/index.md) paketleri tarafından tüketilir.

### @intlayer/mcp

`@intlayer/mcp` paketi, Intlayer ekosistemi için uyarlanmış AI destekli IDE yardımı sağlayan bir MCP (Model Context Protocol) sunucusu sağlar. Dokümantasyonu otomatik olarak yükler ve Intlayer CLI ile entegre olur.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

`@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` ve `@intlayer/dynamic-dictionaries-entry` paketleri, Intlayer sözlüklerinin giriş yolunu döndürür. Tarayıcıdan dosya sistemini aramak imkansız olduğu için, Webpack veya Rollup gibi paketleyicileri kullanarak sözlüklerin giriş yolunu almak mümkün değildir. Bu paketler, Vite, Webpack ve Turbopack gibi çeşitli paketleyicilerde paketleme optimizasyonuna izin vermek için takma adlandırılmak üzere tasarlanmıştır.

### @intlayer/chokidar

`@intlayer/chokidar` paketi, içerik dosyalarını izlemek ve her değişiklikte değiştirilen sözlüğü yeniden oluşturmak için kullanılır.

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
