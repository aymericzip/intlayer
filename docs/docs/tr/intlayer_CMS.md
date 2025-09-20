---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Intlayer CMS | İçeriğinizi Intlayer CMS'ye Dışa Aktarın
description: İçeriğinizi Intlayer CMS'ye dışa aktararak içerik yönetimini ekibinize devredin.
keywords:
  - CMS
  - Görsel Düzenleyici
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
---

# Intlayer İçerik Yönetim Sistemi (CMS) Dokümantasyonu

<iframe title="Web Uygulamanız için Görsel Düzenleyici + CMS: Intlayer Açıklaması" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, bir Intlayer projesinin içeriğini dışa aktarmanıza izin veren bir Uygulamadır.

Bunun için, Intlayer 'uzak sözlükler' kavramını tanıtır.

![Intlayer CMS Arayüzü](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Uzak sözlükleri anlama

Intlayer 'yerel' ve 'uzak' sözlükler arasında bir ayrım yapar.

- Bir 'yerel' sözlük, Intlayer projenizde bildirilen bir sözlüktür. Örneğin bir düğmenin bildirim dosyası veya navigasyon çubuğunuz. Bu durumda içeriğinizi dışa aktarmak mantıklı değildir çünkü bu içerik sık sık değişmemelidir.

- Bir 'uzak' sözlük, Intlayer CMS aracılığıyla yönetilen bir sözlüktür. Ekibinizin içeriğinizi doğrudan web sitenizde yönetmesine izin vermek için yararlı olabilir ve ayrıca A/B testi özelliklerini ve SEO otomatik optimizasyonunu kullanmayı amaçlar.

## Görsel düzenleyici vs CMS

[Intlayer Görsel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) düzenleyici, yerel sözlükler için içeriğinizi görsel bir düzenleyicide yönetmenize izin veren bir araçtır. Bir değişiklik yapıldığında, içerik kod tabanında değiştirilecektir. Bu, uygulamanın yeniden oluşturulacağı ve yeni içeriği görüntülemek için sayfanın yeniden yükleneceği anlamına gelir.

Buna karşılık, Intlayer CMS, uzak sözlükler için içeriğinizi görsel bir düzenleyicide yönetmenize izin veren bir araçtır. Bir değişiklik yapıldığında, içerik kod tabanınızı **etkilemeyecektir**. Ve web sitesi değiştirilen içeriği otomatik olarak görüntüleyecektir.

## Entegrasyon

Paketi nasıl yükleyeceğiniz hakkında daha fazla ayrıntı için aşağıdaki ilgili bölüme bakın:

### Next.js ile Entegrasyon

Next.js ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md) bakın.

### Create React App ile Entegrasyon

Create React App ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md) bakın.

### Vite + React ile Entegrasyon

Vite + React ile entegrasyon için [kurulum kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) bakın.

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
     * Bu, görsel düzenleyici tarafından hedeflenen URL'dir.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Gerekli
     *
     * İstemci kimliği ve istemci sırrı düzenleyiciyi etkinleştirmek için gereklidir.
     * İçeriği düzenleyen kullanıcıyı tanımlamaya izin verirler.
     * Intlayer Dashboard - Projects'te yeni bir istemci oluşturarak elde edilebilirler (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * İsteğe bağlı
     *
     * Intlayer CMS'yi kendiniz barındırıyorsanız, CMS'nin URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://intlayer.org olarak ayarlanır
     */
    cmsURL: process.env.INTLAYER_CMS_URL,
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer konfigürasyon ayarları
  editor: {
    /**
     * Gerekli
     *
     * Uygulamanın URL'si.
     * Bu, görsel düzenleyici tarafından hedeflenen URL'dir.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Gerekli
     *
     * İstemci kimliği ve istemci sırrı düzenleyiciyi etkinleştirmek için gereklidir.
     * İçeriği düzenleyen kullanıcıyı tanımlamaya izin verirler.
     * Intlayer Dashboard - Projects'te yeni bir istemci oluşturarak elde edilebilirler (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * İsteğe bağlı
     *
     * Intlayer CMS'yi kendiniz barındırıyorsanız, CMS'nin URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://intlayer.org olarak ayarlanır
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * İsteğe bağlı
     *
     * Intlayer CMS'yi kendiniz barındırıyorsanız, arka ucun URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://back.intlayer.org olarak ayarlanır
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer konfigürasyon ayarları
  editor: {
    /**
     * Gerekli
     *
     * Uygulamanın URL'si.
     * Bu, görsel düzenleyici tarafından hedeflenen URL'dir.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Gerekli
     *
     * İstemci kimliği ve istemci sırrı düzenleyiciyi etkinleştirmek için gereklidir.
     * İçeriği düzenleyen kullanıcıyı tanımlamaya izin verirler.
     * Intlayer Dashboard - Projects'te yeni bir istemci oluşturarak elde edilebilirler (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * İsteğe bağlı
     *
     * Intlayer CMS'yi kendiniz barındırıyorsanız, CMS'nin URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://intlayer.org olarak ayarlanır
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * İsteğe bağlı
     *
     * Intlayer CMS'yi kendiniz barındırıyorsanız, arka ucun URL'sini ayarlayabilirsiniz.
     *
     * Intlayer CMS'nin URL'si.
     * Varsayılan olarak https://back.intlayer.org olarak ayarlanır
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> İstemci kimliğiniz ve istemci sırrınız yoksa, [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects)'te yeni bir istemci oluşturarak bunları elde edebilirsiniz.

> Tüm kullanılabilir parametreleri görmek için [konfigürasyon dokümantasyonuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) bakın.

## CMS'yi Kullanma

### Konfigürasyonunuzu gönderin

Intlayer CMS'yi yapılandırmak için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en/intlayer_cli.md) komutlarını kullanabilirsiniz.

```bash
npx intlayer config push
```

> `intlayer.config.ts` konfigürasyon dosyanızda ortam değişkenleri kullanıyorsanız, `--env` argümanını kullanarak istenen ortamı belirtebilirsiniz:

```bash
npx intlayer config push --env production
```

Bu komut konfigürasyonunuzu Intlayer CMS'ye yükler.

### Bir sözlüğü gönderin

Yerel ayar sözlüklerinizi uzak bir sözlüğe dönüştürmek için [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en/intlayer_cli.md) komutlarını kullanabilirsiniz.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` konfigürasyon dosyanızda ortam değişkenleri kullanıyorsanız, `--env` argümanını kullanarak istenen ortamı belirtebilirsiniz:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Bu komut ilk içerik sözlüklerinizi yükler, bunları Intlayer platformu aracılığıyla eşzamansız alma ve düzenleme için kullanılabilir hale getirir.

### Sözlüğü düzenleyin

Ardından sözlüğünüzü [Intlayer CMS](https://intlayer.org/dashboard/content)'de görebilir ve yönetebilirsiniz.

## Sıcak yeniden yükleme

Intlayer CMS, bir değişiklik algılandığında sözlükleri sıcak yeniden yükleyebilir.

Sıcak yeniden yükleme olmadan, yeni içeriği görüntülemek için uygulamanın yeni bir yapısı gerekecektir.

[`liveSync`](https://intlayer.org/doc/concept/configuration#editor-configuration) konfigürasyonunu etkinleştirerek, uygulama algılandığında güncellenen içeriği otomatik olarak değiştirecektir.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... diğer konfigürasyon ayarları
  editor: {
    // ... diğer konfigürasyon ayarları

    /**
     * Bir değişiklik algılandığında uygulamanın yerel ayar konfigürasyonlarını sıcak yeniden yükleyip yüklemeyeceğini belirtir.
     * Örneğin, yeni bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülemek için içeriği günceller.
     *
     * Sıcak yeniden yükleme sunucuya sürekli bir bağlantı gerektirdiği için, sadece `enterprise` planının müşterileri için kullanılabilir
     *
     * Varsayılan: false
     */
    liveSync: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer konfigürasyon ayarları
  editor: {
    // ... diğer konfigürasyon ayarları

    /**
     * Bir değişiklik algılandığında uygulamanın yerel ayar konfigürasyonlarını sıcak yeniden yükleyip yüklemeyeceğini belirtir.
     * Örneğin, yeni bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülemek için içeriği günceller.
     *
     * Sıcak yeniden yükleme sunucuya sürekli bir bağlantı gerektirdiği için, sadece `enterprise` planının müşterileri için kullanılabilir
     *
     * Varsayılan: false
     */
    liveSync: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... diğer konfigürasyon ayarları
  editor: {
    // ... diğer konfigürasyon ayarları

    /**
     * Bir değişiklik algılandığında uygulamanın yerel ayar konfigürasyonlarını sıcak yeniden yükleyip yüklemeyeceğini belirtir.
     * Örneğin, yeni bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülemek için içeriği günceller.
     *
     * Sıcak yeniden yükleme sunucuya sürekli bir bağlantı gerektirdiği için, sadece `enterprise` planının müşterileri için kullanılabilir
     *
     * Varsayılan: false
     */
    liveSync: true,
  },
};

module.exports = config;
```

Sıcak yeniden yükleme içeriği hem sunucu hem de istemci tarafında değiştirir.

- Sunucu tarafında, uygulama sürecinin `.intlayer/dictionaries` dizinine yazma erişimi olduğundan emin olun.
- İstemci tarafında, sıcak yeniden yükleme uygulamanın içeriği tarayıcıda sıcak yeniden yüklemesine izin verir, sayfayı yeniden yüklemeye gerek olmadan. Ancak, bu özellik sadece istemci bileşenleri için kullanılabilir.

> Sıcak yeniden yükleme bir `EventListener` kullanarak sunucuya sürekli bir bağlantı gerektirdiği için, sadece `enterprise` planının müşterileri için kullanılabilir.

## Hata Ayıklama

CMS ile ilgili herhangi bir sorunla karşılaşırsanız, aşağıdakileri kontrol edin:

- Uygulama çalışıyor.

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) konfigürasyonları Intlayer konfigürasyon dosyanızda doğru şekilde ayarlandı.
  - Gerekli alanlar:
    - Uygulama URL'si düzenleyici konfigürasyonunda ayarladığınızla eşleşmelidir (`applicationURL`).
    - CMS URL'si

- Proje konfigürasyonunun Intlayer CMS'ye gönderildiğinden emin olun.

- Görsel düzenleyici web sitenizi görüntülemek için bir iframe kullanır. Web sitenizin İçerik Güvenlik Politikası'nın (CSP) CMS url'sini `frame-ancestors` olarak izin verdiğinden emin olun (varsayılan olarak 'https://intlayer.org'). Herhangi bir hata için düzenleyici konsolu kontrol edin.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler                               |
| ------ | ---------- | ------------------------------------------- |
| 6.0.0  | 2025-09-04 | `hotReload` alanını `liveSync` ile değiştir |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı                           |
