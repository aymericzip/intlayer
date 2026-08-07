---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | İçeriğinizi Intlayer CMS'ye Dışa Aktarın
description: İçeriğinizin yönetimini ekibinize devretmek için içeriğinizi Intlayer CMS'ye dışa aktarın.
keywords:
  - CMS
  - Görsel Editör
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "'Canlı senkronizasyon' bölümü kendi sayfasına (live-sync.md) taşındı, burada yalnızca kısa bir giriş ve bağlantı bırakıldı"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Kendi Sunucuda Barındırma bölümü eklendi"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Canlı senkronizasyon dokümantasyonu eklendi"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` alanı `liveSync` ile değiştirildi"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geçmiş başlatıldı"
author: aymericzip
---

# Intlayer İçerik Yönetim Sistemi (CMS) Dokümantasyonu

<iframe title="Görsel Editör + Web Uygulamanız için CMS: Intlayer Açıklaması" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, bir Intlayer projesinin içeriğini dışa aktarmanıza olanak tanıyan bir uygulamadır.

Bunun için Intlayer, 'uzak sözlükler' kavramını tanıtmaktadır.

![Intlayer CMS Arayüzü](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## İçindekiler

<TOC/>

---

## Uzak sözlükleri anlama

Intlayer, 'yerel' ve 'uzak' sözlükler arasında ayrım yapar.

- 'Yerel' sözlük, Intlayer projenizde tanımlanmış bir sözlüktür. Örneğin bir butonun tanımlama dosyası veya navigasyon çubuğunuz gibi. İçeriğinizi dışa aktarmak bu durumda anlamlı değildir çünkü bu içeriğin sık sık değişmesi beklenmez.

- 'Uzak' sözlük ise Intlayer CMS aracılığıyla yönetilen bir sözlüktür. Ekibinizin içeriğinizi doğrudan web sitenizde yönetmesine olanak tanıyabilir ve ayrıca A/B test özelliklerini ve SEO otomatik optimizasyonunu kullanmayı hedefler.

## Görsel editör ve CMS karşılaştırması

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md) editörü, yerel sözlükler için içeriğinizi görsel bir editörde yönetmenizi sağlayan bir araçtır. Bir değişiklik yapıldığında, içerik kod tabanında değiştirilir. Bu, uygulamanın yeniden derleneceği ve yeni içeriği göstermek için sayfanın yeniden yükleneceği anlamına gelir.

Buna karşılık, Intlayer CMS, uzak sözlükler için içeriğinizi görsel bir editörde yönetmenizi sağlayan bir araçtır. Bir değişiklik yapıldığında, içerik kod tabanınızı **etkilemez**. Ve web sitesi otomatik olarak değiştirilen içeriği gösterir.

## Entegrasyon

Paketin nasıl kurulacağına dair daha fazla detay için aşağıdaki ilgili bölüme bakınız:

### Next.js ile Entegrasyon

Next.js ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_nextjs_15.md) bakınız.

### Create React App ile Entegrasyon

Create React App ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_create_react_app.md) bakınız.

### Vite + React ile Entegrasyon

Vite + React ile entegrasyon için, [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_vite+react.md) bakınız.

## Konfigürasyon

Intlayer CMS'ye giriş yapmak için aşağıdaki komutu çalıştırın:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Bu, kimlik doğrulama işlemini tamamlamak ve Intlayer hizmetlerini kullanmak için gerekli kimlik bilgilerini (Client ID ve Client Secret) almak için varsayılan tarayıcınızı açacaktır.

Intlayer konfigürasyon dosyanızda, CMS ayarlarını özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... diğer konfigürasyon ayarları
  editor: {
    /**
     * Gerekli
     *
     * Uygulamanın URL'si.
     * Bu, görsel editörün hedeflediği URL'dir.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Gerekli
     *
     * Editörü etkinleştirmek için Client ID ve client secret gereklidir.
     * Bunlar, içeriği düzenleyen kullanıcıyı tanımlamaya olanak sağlar.
     * Intlayer Dashboard - Projects (https://app.intlayer.org/projects) üzerinden yeni bir client oluşturarak elde edilebilir.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opsiyonel
     *
     * Intlayer CMS'yi kendi sunucunuzda barındırıyorsanız, CMS'nin URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://intlayer.org olarak ayarlanmıştır.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opsiyonel
     *
     * Intlayer CMS'yi kendi sunucunuzda barındırıyorsanız, backend'in URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://back.intlayer.org olarak ayarlanmıştır.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Eğer bir client ID ve client secret'ınız yoksa, bunları [Intlayer Dashboard - Projects](https://app.intlayer.org/projects) üzerinden yeni bir client oluşturarak edinebilirsiniz.

> Mevcut tüm parametreleri görmek için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

## CMS Kullanımı

### Konfigürasyonunuzu Gönderme

Intlayer CMS'yi yapılandırmak için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/tr/cli/index.md) komutlarını kullanabilirsiniz.

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> `intlayer.config.ts` yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız, istediğiniz ortamı `--env` argümanıyla belirtebilirsiniz:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Bu komut yapılandırmanızı Intlayer CMS'ye yükler.

### Bir sözlük yükleme

Yerel sözlüklerinizi uzak bir sözlüğe dönüştürmek için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/tr/cli/index.md) komutlarını kullanabilirsiniz.

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız, istediğiniz ortamı `--env` argümanıyla belirtebilirsiniz:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Bu komut, başlangıç içerik sözlüklerinizi yükler ve Intlayer platformu üzerinden eşzamansız olarak alınmalarını ve düzenlenmelerini sağlar.

### Sözlüğü düzenleme

Daha sonra sözlüğünüzü [Intlayer CMS](https://app.intlayer.org/content) üzerinde görüntüleyip yönetebileceksiniz.

## `@intlayer/api` SDK ile Programmatic Erişim

CLI ve visual editor'ın ötesinde, Intlayer [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) paketinde yazılı bir SDK ile birlikte gelir. CMS'i bir **headless içerik veritabanı** olarak ele almanızı sağlar: projeleri alabilir, sözlükleri alabilir ve bunları doğrudan kendi uygulamanızdan, script'lerinizden veya CI pipeline'ınızdan gönderebilir veya güncelleyebilirsiniz.

SDK, kimlik doğrulamasını sizin için yönetir. `clientId` ve `clientSecret` değerleriniz mevcut olduğu sürece (Intlayer yapılandırmanızda veya ortam değişkenlerinde), OAuth2 erişim tokenini otomatik olarak alır ve yeniler, her isteği imzalar.

### Kurulum

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Nasıl çalışır: authenticator + endpoints

SDK, paket boyutunuzu küçük tutmak amacıyla **iki ayrı import**'a bölünmüştür:

1. `createIntlayerCMS` — hafif bir **authenticator** oluşturur. Yalnızca kimlik bilgilerini ve yönetilen erişim token'ını taşır; belirli bir alan adı hakkında hiçbir şey bilmez.
2. `dictionaryEndpoint`, `projectEndpoint`, … — alan başına **endpoint bağlayıcıları**, her biri kendi alt yolundan içe aktarılır (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Authenticator'u ihtiyacınız olan endpoint'e geçirirsiniz.

Her endpoint ayrı olarak içe aktarıldığından, paketiniz yalnızca gerçekten kullandığınız alanları içerir — `dictionaryEndpoint` içe aktarmak hiçbir zaman proje, AI veya başka bir alan istemcisini içeri çekmez.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Yapılandırma isteğe bağlıdır: atlanırsa, kimlik bilgileri
// `@intlayer/config/built` dosyasından okunur; bu dosya INTLAYER_CLIENT_ID ve
// INTLAYER_CLIENT_SECRET ortam değişkenlerini çözer.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> CMS kimlik bilgileri (`clientId` / `clientSecret`) içeriğinize **yazma erişimi** verir. Authenticator'u yalnızca **sunucu tarafında** (server actions, route handlers, scripts, CI) oluşturun. İstemci tarafı koduna asla içe aktarmayın veya kimlik bilgilerinizi tarayıcıya maruz bırakmayın.

Yapı zamanı yapılandırmasına güvenmemeyi tercih ederseniz, kimlik bilgilerini açıkça geçirin:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // İsteğe bağlı, kendi barındırılan arka uçlar için:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> [Intlayer Dashboard - Projects](https://app.intlayer.org/projects) içinde yeni bir erişim anahtarı oluşturarak kimlik bilgilerinizi alın.

### Projeleri Getir

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Kimlik bilgilerinizle erişilebilir projeleri listeleyin
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Seçilen projenin toplu lokalizasyon içgörülerini okuyun
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Sözlükleri Getir

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Projenin tüm uzak sözlüklerini listele
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Veya anahtara göre tek bir sözlük al
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Sözlükleri push etme ve güncelleme

İçeriği geri yazmak için CMS'yi bir veritabanı olarak kullanın:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Yeni bir sözlük oluştur
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Sözlüklerin bir batch'ini upsert et (bunları bir çağrıda oluştur veya güncelle)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Mevcut bir sözlüğü güncelle
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> İpucu: kendinizi tekrarlamaktan kaçınmak için bağlı endpoint'i yeniden kullanın:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Tek bir yöntemi çıkarma

Her endpoint yöntemi zaten kimliği doğrulanmış ve bağımsızdır (kendi token işlemesini taşır), bu nedenle birini çıkarabilir ve etrafta geçirebilirsiniz — örneğin bir bağımlılık olarak enjekte etmek için:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Zaten kimliği doğrulanmış — her çağrıda token'ı otomatik olarak yeniler
export const pushDictionaries = dictionary.pushDictionaries;

// Kullanım
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Canlı senkronizasyon

Canlı Senkronizasyon, uygulamanızın CMS içerik değişikliklerini çalışma zamanında yansıtmasını sağlar. Yeniden derleme veya yeniden dağıtım gerekmez. Etkinleştirildiğinde, güncellemeler uygulamanızın okuduğu sözlükleri yenileyen bir Canlı Senkronizasyon sunucusuna aktarılır.

Tam kurulum kılavuzu (etkinleştirme, Live Sync sunucusunu başlatma, yerel geliştirme iş akışı ve kısıtlamalar) için [Live Sync belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/live-sync.md) bakın.

## Kendi Sunucunuzda Barındırma

Intlayer, tamamen kendi altyapınızda çalışabilir. Tek bir komut, tam yığını (kontrol paneli, API, veritabanı, nesne depolama ve e-posta) Docker Compose ile başlatır:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Tam kurulum kılavuzu, ortam değişkeni referansı, yükseltme talimatları ve yedekleme/geri yükleme prosedürleri için [Kendi Sunucuda Barındırma Kılavuzu'na](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md) bakınız.

---

## Hata Ayıklama

CMS ile ilgili herhangi bir sorunla karşılaşırsanız, aşağıdakileri kontrol edin:

- Uygulamanın çalıştığından emin olun.

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) yapılandırmasının Intlayer yapılandırma dosyanızda doğru şekilde ayarlandığından emin olun.
  - Gerekli alanlar:
- Uygulama URL'si, editör yapılandırmasında (`applicationURL`) belirttiğinizle eşleşmelidir.
- CMS URL'si

- Proje yapılandırmasının Intlayer CMS'ye gönderildiğinden emin olun.

- Görsel editör, web sitenizi görüntülemek için bir iframe kullanır. Web sitenizin İçerik Güvenlik Politikası'nın (CSP), CMS URL'sine `frame-ancestors` olarak izin verdiğinden emin olun (varsayılan olarak 'https://intlayer.org'). Herhangi bir hata için editör konsolunu kontrol edin.
