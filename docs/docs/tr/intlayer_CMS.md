---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
  - version: 6.0.1
    date: 2025-09-22
    changes: Canlı senkronizasyon dokümantasyonu eklendi
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` alanı `liveSync` ile değiştirildi
  - version: 5.5.10
    date: 2025-06-29
    changes: Geçmiş başlatıldı
---

# Intlayer İçerik Yönetim Sistemi (CMS) Dokümantasyonu

<iframe title="Görsel Editör + Web Uygulamanız için CMS: Intlayer Açıklaması" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, bir Intlayer projesinin içeriğini dışa aktarmanıza olanak tanıyan bir uygulamadır.

Bunun için Intlayer, 'uzak sözlükler' kavramını tanıtmaktadır.

![Intlayer CMS Arayüzü](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

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

Intlayer konfigürasyon dosyanızda, CMS ayarlarını özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer yapılandırma ayarları
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
     * Intlayer Dashboard - Projects (https://app.intlayer.org/projects) üzerinde yeni bir client oluşturarak elde edilebilir.
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer yapılandırma ayarları
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
     * Intlayer Dashboard - Projects (https://app.intlayer.org/projects) üzerinden yeni bir client oluşturarak elde edilebilirler.
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
     * Intlayer CMS'yi kendi sunucunuzda barındırıyorsanız, backend URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin backend URL'si.
     * Varsayılan olarak https://back.intlayer.org olarak ayarlanmıştır.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Eğer bir client ID ve client secret'ınız yoksa, bunları [Intlayer Dashboard - Projects](https://app.intlayer.org/projects) üzerinden yeni bir client oluşturarak edinebilirsiniz.

> Mevcut tüm parametreleri görmek için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakınız.

## CMS Kullanımı

### Konfigürasyonunuzu Gönderme

Intlayer CMS'yi yapılandırmak için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/tr/intlayer_cli.md) komutlarını kullanabilirsiniz.

```bash
npx intlayer config push
```

> `intlayer.config.ts` yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız, istediğiniz ortamı `--env` argümanıyla belirtebilirsiniz:

```bash
npx intlayer config push --env production
```

Bu komut yapılandırmanızı Intlayer CMS'ye yükler.

### Bir sözlük yükleme

Yerel sözlüklerinizi uzak bir sözlüğe dönüştürmek için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/tr/intlayer_cli.md) komutlarını kullanabilirsiniz.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız, istediğiniz ortamı `--env` argümanıyla belirtebilirsiniz:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Bu komut, başlangıç içerik sözlüklerinizi yükler ve Intlayer platformu üzerinden eşzamansız olarak alınmalarını ve düzenlenmelerini sağlar.

### Sözlüğü düzenleme

Daha sonra sözlüğünüzü [Intlayer CMS](https://app.intlayer.org/content) üzerinde görüntüleyip yönetebileceksiniz.

## Canlı senkronizasyon

Canlı Senkronizasyon, uygulamanızın CMS içerik değişikliklerini çalışma zamanında yansıtmasını sağlar. Yeniden derleme veya yeniden dağıtım gerekmez. Etkinleştirildiğinde, güncellemeler uygulamanızın okuduğu sözlükleri yenileyen bir Canlı Senkronizasyon sunucusuna aktarılır.

> Canlı Senkronizasyon sürekli bir sunucu bağlantısı gerektirir ve yalnızca enterprise planında kullanılabilir.

Intlayer yapılandırmanızı güncelleyerek Canlı Senkronizasyonu etkinleştirin:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... diğer yapılandırma ayarları
  editor: {
    /**
     * Değişiklik algılandığında yerel ayar yapılandırmalarının sıcak yeniden yüklemesini etkinleştirir.
     * Örneğin, bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülenen içeriği günceller.
     *
     * Sıcak yeniden yükleme sürekli bir sunucu bağlantısı gerektirdiği için,
     * yalnızca `enterprise` planı müşterileri için kullanılabilir.
     *
     * Varsayılan: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Sözlüklerin nasıl içe aktarılacağını kontrol eder:
     *
     * - "live": Sözlükler, Live Sync API kullanılarak dinamik olarak getirilir.
     *   useIntlayer yerine useDictionaryDynamic kullanılır.
     *
     * Not: Canlı mod, sözlükleri getirmek için Live Sync API'sini kullanır. API çağrısı
     * başarısız olursa, sözlükler dinamik olarak içe aktarılır.
     * Not: Yalnızca uzak içeriğe ve "live" bayraklarına sahip sözlükler canlı modu kullanır.
     * Diğerleri performans için dinamik modu kullanır.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer yapılandırma ayarları
  editor: {
    /**
     * Yerel ayar yapılandırmalarında değişiklik algılandığında sıcak yeniden yüklemeyi etkinleştirir.
     * Örneğin, bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülenen
     * içeriği günceller.
     *
     * Sıcak yeniden yükleme, sunucuya sürekli bağlantı gerektirdiği için
     * yalnızca `enterprise` planı müşterileri için kullanılabilir.
     *
     * Varsayılan: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Sözlüklerin nasıl içe aktarılacağını kontrol eder:
     *
     * - "live": Sözlükler, Live Sync API kullanılarak dinamik olarak getirilir.
     *   useIntlayer yerine useDictionaryDynamic kullanılır.
     *
     * Not: Canlı mod, sözlükleri getirmek için Live Sync API'sini kullanır. API çağrısı
     * başarısız olursa, sözlükler dinamik olarak içe aktarılır.
     * Not: Yalnızca uzak içeriğe sahip ve "live" bayraklı sözlükler canlı modu kullanır.
     * Diğerleri performans için dinamik modu kullanır.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer yapılandırma ayarları
  editor: {
    /**
     * Değişiklikler algılandığında yerel yapılandırmaların sıcak yeniden yüklenmesini etkinleştirir.
     * Örneğin, bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülenen
     * içeriği günceller.
     *
     * Sıcak yeniden yükleme, sunucuya sürekli bağlantı gerektirdiği için
     * yalnızca `enterprise` planı müşterileri için kullanılabilir.
     *
     * Varsayılan: false
     */
    liveSync: true,

    /**
     * Live Sync sunucusunun portu.
     *
     * Varsayılan: 4000
     */
    liveSyncPort: 4000,

    /**
     * Live Sync sunucusunun URL'si.
     *
     * Varsayılan: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Sözlüklerin nasıl içe aktarılacağını kontrol eder:
     *
     * - "live": Sözlükler, Live Sync API kullanılarak dinamik olarak alınır.
     *   useIntlayer yerine useDictionaryDynamic kullanılır.
     *
     * Not: Canlı mod, sözlükleri almak için Live Sync API'sini kullanır. API çağrısı
     * başarısız olursa, sözlükler dinamik olarak içe aktarılır.
     * Not: Yalnızca uzak içeriğe sahip ve "live" bayrağı olan sözlükler canlı modu kullanır.
     * Diğerleri performans için dinamik modu kullanır.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Uygulamanızı sarmak için Live Sync sunucusunu başlatın:

Next.js kullanarak örnek:

```json5 fileName="package.json"
{
  "scripts": {
    // ... diğer komutlar
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Vite kullanarak örnek:

```json5 fileName="package.json"
{
  "scripts": {
    // ... diğer komutlar
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Live Sync sunucusu uygulamanızı sarar ve güncellenen içeriği geldiği anda otomatik olarak uygular.

CMS'den değişiklik bildirimleri almak için, Live Sync sunucusu backend ile bir SSE bağlantısı sürdürür. CMS'de içerik değiştiğinde, backend güncellemeyi Live Sync sunucusuna iletir ve bu sunucu yeni sözlükleri yazar. Uygulamanız, sonraki gezinme veya tarayıcı yenilemesinde güncellemeyi yansıtacaktır—yeniden derleme gerekmez.

Akış şeması (CMS/Backend -> Live Sync Sunucusu -> Uygulama Sunucusu -> Ön Yüz):

![Live Sync Mantık Şeması](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Nasıl çalışır:

![Live Sync Akış CMS/Backend/Live Sync Sunucusu/Uygulama Sunucusu/Ön Yüz Şeması](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Geliştirme iş akışı (yerel)

- Geliştirme aşamasında, uygulama başladığında tüm uzak sözlükler alınır, böylece güncellemeleri hızlıca test edebilirsiniz.
- Next.js ile Live Sync'i yerel olarak test etmek için geliştirme sunucunuzu şu şekilde sarmalayın:

```json5 fileName="package.json"
{
  "scripts": {
    // ... diğer scriptler
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Vite için
  },
}
```

Optimizasyonu etkinleştirin, böylece Intlayer geliştirme sırasında Live import dönüşümlerini uygular:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Bu yapılandırma, geliştirme sunucunuzu Live Sync sunucusuyla sarar, başlangıçta uzak sözlükleri getirir ve CMS'den SSE aracılığıyla güncellemeleri aktarır. Değişiklikleri görmek için sayfayı yenileyin.

Notlar ve kısıtlamalar:

- Live sync kaynağını site güvenlik politikanıza (CSP) ekleyin. Live sync URL'sinin `connect-src` içinde (ve ilgili ise `frame-ancestors` içinde) izinli olduğundan emin olun.
- Live Sync statik çıktı ile çalışmaz. Next.js için, sayfa çalışma zamanında güncellemeleri alabilmek için dinamik olmalıdır (örneğin, tam statik kısıtlamalardan kaçınmak için `generateStaticParams`, `generateMetadata`, `getServerSideProps` veya `getStaticProps` uygun şekilde kullanılmalıdır).
- CMS'de, her sözlüğün bir `live` bayrağı vardır. Yalnızca `live=true` olan sözlükler live sync API'si aracılığıyla alınır; diğerleri dinamik olarak içe aktarılır ve çalışma zamanında değişmeden kalır.
- `live` bayrağı her sözlük için derleme zamanında değerlendirilir. Uzaktaki içerik derleme sırasında `live=true` olarak işaretlenmemişse, o sözlük için Live Sync'i etkinleştirmek üzere yeniden derleme yapmanız gerekir.
- Live sync sunucusunun `.intlayer` dosyasına yazabilmesi gerekir. Konteynerlerde, `/.intlayer` dosyasına yazma erişiminin olduğundan emin olun.

## Hata Ayıklama

CMS ile ilgili herhangi bir sorunla karşılaşırsanız, aşağıdakileri kontrol edin:

- Uygulamanın çalıştığından emin olun.

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) yapılandırmasının Intlayer yapılandırma dosyanızda doğru şekilde ayarlandığından emin olun.
  - Gerekli alanlar:
- Uygulama URL'si, editör yapılandırmasında (`applicationURL`) belirttiğinizle eşleşmelidir.
- CMS URL'si

- Proje yapılandırmasının Intlayer CMS'ye gönderildiğinden emin olun.

- Görsel editör, web sitenizi görüntülemek için bir iframe kullanır. Web sitenizin İçerik Güvenlik Politikası'nın (CSP), CMS URL'sine `frame-ancestors` olarak izin verdiğinden emin olun (varsayılan olarak 'https://intlayer.org'). Herhangi bir hata için editör konsolunu kontrol edin.
