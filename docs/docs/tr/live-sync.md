---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Canlı senkronizasyon | CMS içerik değişikliklerini çalışma zamanında yansıtın
description: Uygulamanızın, yeniden derleme veya yeniden dağıtım gerektirmeden Intlayer CMS içerik değişikliklerini çalışma zamanında yansıtmasını sağlayın.
keywords:
  - Canlı senkronizasyon
  - Live Sync
  - CMS
  - Görsel Düzenleyici
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Intlayer CMS belgelerinden ayrılarak kendi sayfasına taşındı"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Canlı senkronizasyon dokümantasyonu eklendi"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` alanı `liveSync` ile değiştirildi"
author: aymericzip
---

# Canlı senkronizasyon

Canlı Senkronizasyon, uygulamanızın CMS içerik değişikliklerini çalışma zamanında yansıtmasını sağlar. Yeniden derleme veya yeniden dağıtım gerekmez. Etkinleştirildiğinde, güncellemeler uygulamanızın okuduğu sözlükleri yenileyen bir Canlı Senkronizasyon sunucusuna aktarılır.

## İçindekiler

<TOC/>

---

## Canlı senkronizasyonu etkinleştirme

> Canlı Senkronizasyon sürekli bir sunucu bağlantısı gerektirir ve yalnızca enterprise planında kullanılabilir.

Intlayer yapılandırmanızı güncelleyerek Canlı Senkronizasyonu etkinleştirin:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

Uygulamanızı sarmak için Live Sync sunucusunu başlatın:

Next.js kullanarak örnek:

```json5 fileName="package.json"
{
  "scripts": {
    // ... diğer komutlar
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync sunucusu uygulamanızı sarar ve güncellenen içeriği geldiği anda otomatik olarak uygular.

CMS'den değişiklik bildirimleri almak için, Live Sync sunucusu backend ile bir SSE bağlantısı sürdürür. CMS'de içerik değiştiğinde, backend güncellemeyi Live Sync sunucusuna iletir ve bu sunucu yeni sözlükleri yazar. Uygulamanız, sonraki gezinme veya tarayıcı yenilemesinde güncellemeyi yansıtacaktır, yeniden derleme gerekmez.

Akış şeması (CMS/Backend -> Live Sync Sunucusu -> Uygulama Sunucusu -> Ön Yüz):

![Live Sync Mantık Şeması](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Nasıl çalışır:

![Live Sync Akış CMS/Backend/Live Sync Sunucusu/Uygulama Sunucusu/Ön Yüz Şeması](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Geliştirme iş akışı (yerel)

- Geliştirme aşamasında, uygulama başladığında tüm uzak sözlükler alınır, böylece güncellemeleri hızlıca test edebilirsiniz.
- Next.js ile Live Sync'i yerel olarak test etmek için geliştirme sunucunuzu şu şekilde sarmalayın:

```json5 fileName="package.json"
{
  "scripts": {
    // ... diğer scriptler
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite için
  },
}
```

Optimizasyonu etkinleştirin, böylece Intlayer geliştirme sırasında Live import dönüşümlerini uygular:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Bu yapılandırma, geliştirme sunucunuzu Live Sync sunucusuyla sarar, başlangıçta uzak sözlükleri getirir ve CMS'den SSE aracılığıyla güncellemeleri aktarır. Değişiklikleri görmek için sayfayı yenileyin.

## Notlar ve kısıtlamalar

- Live sync kaynağını site güvenlik politikanıza (CSP) ekleyin. Live sync URL'sinin `connect-src` içinde (ve ilgili ise `frame-ancestors` içinde) izinli olduğundan emin olun.
- Live Sync statik çıktı ile çalışmaz. Next.js için, sayfa çalışma zamanında güncellemeleri alabilmek için dinamik olmalıdır (örneğin, tam statik kısıtlamalardan kaçınmak için `generateStaticParams`, `generateMetadata`, `getServerSideProps` veya `getStaticProps` uygun şekilde kullanılmalıdır).
- CMS'de, her sözlüğün bir `live` bayrağı vardır. Yalnızca `live=true` olan sözlükler live sync API'si aracılığıyla alınır; diğerleri dinamik olarak içe aktarılır ve çalışma zamanında değişmeden kalır.
- `live` bayrağı her sözlük için build zamanında değerlendirilir. Uzaktaki içerik derleme sırasında `live=true` olarak işaretlenmemişse, o sözlük için Live Sync'i etkinleştirmek üzere yeniden derleme yapmanız gerekir.
- Live sync sunucusunun `.intlayer` dosyasına yazabilmesi gerekir. Konteynerlerde, `/.intlayer` dosyasına yazma erişiminin olduğundan emin olun.

## Faydalı bağlantılar

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [Intlayer Görsel Düzenleyici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [Yapılandırma Referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Kendi Sunucuda Barındırma Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)
