---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Konfigürasyon
description: Uygulamanız için Intlayer'ı nasıl yapılandıracağınızı öğrenin. Intlayer'ı ihtiyaçlarınıza göre özelleştirmek için mevcut çeşitli ayarları ve seçenekleri anlayın.
keywords:
  - Configuration
  - Settings
  - Customization
  - Intlayer
  - Options
slugs:
  - doc
  - concept
  - configuration
---

# Intlayer Konfigürasyon Dokümantasyonu

## Genel Bakış

Intlayer konfigürasyon dosyaları, uluslararasılaştırma, ara yazılım ve içerik işleme gibi eklentinin çeşitli yönlerini özelleştirmenize izin verir. Bu doküman, konfigürasyondaki her özelliğin ayrıntılı bir açıklamasını sağlar.

---

## Konfigürasyon Dosyası Desteği

Intlayer JSON, JS, MJS ve TS konfigürasyon dosyası formatlarını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Örnek konfigürasyon dosyası

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "middleware": {
    "noPrefix": false,
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "This is a test application",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Konfigürasyon Referansı

Aşağıdaki bölümler, Intlayer için mevcut çeşitli konfigürasyon ayarlarını açıklar.

---

### Uluslararasılaştırma Konfigürasyonu

Uygulamanın mevcut yerel ayarlarını ve varsayılan yerel ayarını içeren uluslararasılaştırma ile ilgili ayarları tanımlar.

#### Özellikler

- **locales**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['en']`
  - _Açıklama_: Uygulamada desteklenen yerel ayarların listesi.
  - _Örnek_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tür_: `string[]`
  - _Varsayılan_: `[]`
  - _Açıklama_: Uygulamada gerekli yerel ayarların listesi.
  - _Örnek_: `[]`
  - _Not_: Boşsa, `strict` modunda tüm yerel ayarlar gereklidir.
  - _Not_: Gerekli yerel ayarların `locales` alanında da tanımlandığından emin olun.
- **strictMode**:
  - _Tür_: `string`
  - _Varsayılan_: `inclusive`
  - _Açıklama_: TypeScript kullanarak uluslararasılaştırılmış içeriğin güçlü uygulamalarını sağlar.
  - _Not_: "strict" olarak ayarlanırsa, çeviri `t` fonksiyonu her bildirilen yerel ayarın tanımlanmasını gerektirir. Bir yerel ayar eksikse veya konfigürasyonunuzda bildirilmemişse hata verir.
  - _Not_: "inclusive" olarak ayarlanırsa, çeviri `t` fonksiyonu her bildirilen yerel ayarın tanımlanmasını gerektirir. Bir yerel ayar eksikse uyarı verir. Ancak konfigürasyonunuzda bildirilmemiş ancak mevcut olan bir yerel ayarı kabul eder.
  - _Not_: "loose" olarak ayarlanırsa, çeviri `t` fonksiyonu herhangi bir mevcut yerel ayarı kabul eder.

- **defaultLocale**:
  - _Tür_: `string`
  - _Varsayılan_: `'en'`
  - _Açıklama_: İstenen yerel ayar bulunamazsa geri dönüş olarak kullanılan varsayılan yerel ayar.
  - _Örnek_: `'en'`
  - _Not_: URL, çerez veya başlıkta hiçbiri belirtilmediğinde yerel ayarı belirlemek için kullanılır.

---

### Düzenleyici Konfigürasyonu

Sunucu portu ve aktif durumu dahil olmak üzere entegre düzenleyici ile ilgili ayarları tanımlar.

#### Özellikler

- **applicationURL**:
  - _Tür_: `string`
  - _Varsayılan_: `http://localhost:3000`
  - _Açıklama_: Uygulamanın URL'si. Güvenlik nedeniyle düzenleyicinin kaynağını kısıtlamak için kullanılır.
  - _Örnek_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Not_: Uygulamanın URL'si. Güvenlik nedeniyle düzenleyicinin kaynağını kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, düzenleyici herhangi bir kaynaktan erişilebilir.

- **port**:
  - _Tür_: `number`
  - _Varsayılan_: `8000`
  - _Açıklama_: Görsel düzenleyici sunucusu tarafından kullanılan port.

- **editorURL**:
  - _Tür_: `string`
  - _Varsayılan_: `'http://localhost:8000'`
  - _Açıklama_: Düzenleyici sunucusunun URL'si. Güvenlik nedeniyle düzenleyicinin kaynağını kısıtlamak için kullanılır.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Not_: Uygulamadan ulaşılacak düzenleyici sunucusunun URL'si. Güvenlik nedeniyle uygulama ile etkileşim kurabilecek kaynakları kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, düzenleyici herhangi bir kaynaktan erişilebilir. Port değiştirilirse veya düzenleyici farklı bir domaine barındırılırsa ayarlanmalıdır.

- **cmsURL**:
  - _Tür_: `string`
  - _Varsayılan_: `'https://intlayer.org'`
  - _Açıklama_: Intlayer CMS'nin URL'si.
  - _Örnek_: `'https://intlayer.org'`
  - _Not_: Intlayer CMS'nin URL'si.

- **backendURL**:
  - _Tür_: `string`
  - _Varsayılan_: `https://back.intlayer.org`
  - _Açıklama_: Arka uç sunucusunun URL'si.
  - _Örnek_: `http://localhost:4000`

- **enabled**:
  - _Tür_: `boolean`
  - _Varsayılan_: `true`
  - _Açıklama_: Uygulamanın görsel düzenleyici ile etkileşim kurup kurmadığını belirtir.
  - _Örnek_: `process.env.NODE_ENV !== 'production'`
  - _Not_: Doğruysa, düzenleyici uygulama ile etkileşim kurabilir. Yanlışsa, düzenleyici uygulama ile etkileşim kuramaz. Her durumda, düzenleyici sadece görsel düzenleyici tarafından etkinleştirilebilir. Belirli ortamlar için düzenleyiciyi devre dışı bırakmak güvenliği zorlamak için bir yoludur.

- **clientId**:
  - _Tür_: `string` | `undefined`
  - _Varsayılan_: `undefined`
  - _Açıklama_: clientId ve clientSecret, intlayer paketlerinin oAuth2 kimlik doğrulaması kullanarak arka uçla kimlik doğrulamasına izin verir. Bir erişim belirteci, projeyle ilgili kullanıcıyı doğrulamak için kullanılır. Erişim belirteci almak için https://intlayer.org/dashboard/project adresine gidin ve bir hesap oluşturun.
  - _Örnek_: `true`
  - _Not_: Önemli: clientId ve clientSecret gizli tutulmalı ve kamuya açık olarak paylaşılmamalıdır. Lütfen bunları güvenli bir yerde, ortam değişkenleri gibi tutun.

- **clientSecret**:
  - _Tür_: `string` | `undefined`
  - _Varsayılan_: `undefined`
  - _Açıklama_: clientId ve clientSecret, intlayer paketlerinin oAuth2 kimlik doğrulaması kullanarak arka uçla kimlik doğrulamasına izin verir. Bir erişim belirteci, projeyle ilgili kullanıcıyı doğrulamak için kullanılır. Erişim belirteci almak için https://intlayer.org/dashboard/project adresine gidin ve bir hesap oluşturun.
  - _Örnek_: `true`
  - _Not_: Önemli: clientId ve clientSecret gizli tutulmalı ve kamuya açık olarak paylaşılmamalıdır. Lütfen bunları güvenli bir yerde, ortam değişkenleri gibi tutun.

- **dictionaryPriorityStrategy**:
  - _Tür_: `string`
  - _Varsayılan_: `'local_first'`
  - _Açıklama_: Hem yerel hem de uzak sözlüklerin mevcut olduğu durumda sözlükleri önceliklendirme stratejisi. `'distant_first'` olarak ayarlanırsa, uygulama uzak sözlükleri yerel sözlüklere göre önceliklendirir. `'local_first'` olarak ayarlanırsa, uygulama yerel sözlükleri uzak sözlüklere göre önceliklendirir.
  - _Örnek_: `'distant_first'`

- **liveSync**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: CMS / Görsel Düzenleyici / Arka Uç'ta bir değişiklik algılandığında uygulama sunucusunun uygulamanın içeriğini sıcak yeniden yükleyip yüklemeyeceğini belirtir.
  - _Örnek_: `true`
  - _Not_: Örneğin, yeni bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülemek için içeriği günceller.
  - _Not_: Canlı senkronizasyon, uygulamanın içeriğini başka bir sunucuya dışa aktarmayı gerektirir. Bu, uygulamanın performansını hafifçe etkileyebilir. Bunu sınırlamak için, uygulamayı ve canlı senkronizasyon sunucusunu aynı makinede barındırmanızı öneririz. Ayrıca, canlı senkronizasyon ve `optimize` kombinasyonu, canlı senkronizasyon sunucusuna önemli sayıda istek uygulayabilir. Altyapınıza bağlı olarak, her iki seçeneği ve kombinasyonlarını test etmenizi öneririz.

- **liveSyncPort**:
  - _Tür_: `number`
  - _Varsayılan_: `4000`
  - _Açıklama_: Canlı senkronizasyon sunucusunun portu.
  - _Örnek_: `4000`
  - _Not_: Canlı senkronizasyon sunucusunun portu.

- **liveSyncURL**:
  - _Tür_: `string`
  - _Varsayılan_: `'http://localhost:{liveSyncPort}'`
  - _Açıklama_: Canlı senkronizasyon sunucusunun URL'si.
  - _Örnek_: `'https://example.com'`
  - _Not_: Varsayılan olarak localhost'a işaret eder, ancak uzak canlı senkronizasyon sunucusu durumunda herhangi bir URL'ye değiştirilebilir.

### Ara Yazılım Konfigürasyonu

Çerezleri, başlıkları ve yerel ayar yönetimi için URL öneklerini uygulama nasıl işlediğini kontrol eden ara yazılım davranışını kontrol eden ayarlar.

#### Özellikler

- **headerName**:
  - _Tür_: `string`
  - _Varsayılan_: `'x-intlayer-locale'`
  - _Açıklama_: Yerel ayarı belirlemek için kullanılan HTTP başlığının adı.
  - _Örnek_: `'x-custom-locale'`
  - _Not_: Bu, API tabanlı yerel ayar belirleme için yararlıdır.

- **cookieName**:
  - _Tür_: `string`
  - _Varsayılan_: `'intlayer-locale'`
  - _Açıklama_: Yerel ayarı depolamak için kullanılan çerezin adı.
  - _Örnek_: `'custom-locale'`
  - _Not_: Oturumlar arasında yerel ayarı sürdürmek için kullanılır.

- **prefixDefault**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Varsayılan yerel ayarın URL'ye dahil edilip edilmeyeceği.
  - _Örnek_: `true`
  - _Not_:
    - `true` ve `defaultLocale = 'en'`: yol = `/en/dashboard` veya `/fr/dashboard`
    - `false` ve `defaultLocale = 'en'`: yol = `/dashboard` veya `/fr/dashboard`

- **basePath**:
  - _Tür_: `string`
  - _Varsayılan_: `''`
  - _Açıklama_: Uygulama URL'leri için temel yol.
  - _Örnek_: `'/my-app'`
  - _Not_:
    - Uygulama `https://example.com/my-app` adresinde barındırılıyorsa
    - Temel yol `'/my-app'`
    - URL `https://example.com/my-app/en` olacak
    - Temel yol ayarlanmazsa, URL `https://example.com/en` olacak

- **serverSetCookie**:
  - _Tür_: `string`
  - _Varsayılan_: `'always'`
  - _Açıklama_: Sunucuda yerel ayar çerezini ayarlama kuralı.
  - _Seçenekler_: `'always'`, `'never'`
  - _Örnek_: `'never'`
  - _Not_: Yerel ayar çerezinin her istekte mi yoksa hiçbir zaman mı ayarlanacağını kontrol eder.

- **noPrefix**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Yerel ayar önekini URL'lerden atlayıp atmama.
  - _Örnek_: `true`
  - _Not_:
    - `true`: URL'de önek yok
    - `false`: URL'de önek var
    - `basePath = '/my-app'` ile örnek:
      - `noPrefix = false`: URL `https://example.com/my-app/en` olacak
      - `noPrefix = true`: URL `https://example.com` olacak

- **detectLocaleOnPrefetchNoPrefix**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Next.js prefetch istekleri sırasında yerel ayar algılamanın gerçekleşip gerçekleşmediğini kontrol eder.
  - _Örnek_: `true`
  - _Not_: Bu ayar Next.js'nin yerel ayar prefetching'ini nasıl işlediğini etkiler:
    - **Örnek senaryo:**
      - Kullanıcının tarayıcı dili `'fr'`
      - Geçerli sayfa `/fr/about`
      - Bağlantı prefetch `/about`
    - ** `detectLocaleOnPrefetchNoPrefix: true` ile:**
      - Prefetch tarayıcıdan `'fr'` yerel ayarını algılar
      - Prefetch'i `/fr/about`'a yönlendirir
    - ** `detectLocaleOnPrefetchNoPrefetchNoPrefix: false` (varsayılan) ile:**
      - Prefetch varsayılan yerel ayarı kullanır
      - Prefetch'i `/en/about`'a yönlendirir (varsayılan `'en'` varsayarsak)
    - **Ne zaman `true` kullanılır:**
      - Uygulamanız yerelleştirilmemiş dahili bağlantılar kullanır (ör. `<a href="/about">`)
      - Düzenli ve prefetch istekleri arasında tutarlı yerel ayar algılama davranışı istiyorsunuz
    - **Ne zaman `false` kullanılır (varsayılan):**
      - Uygulamanız yerel ayar öneki bağlantılar kullanır (ör. `<a href="/fr/about">`)
      - Prefetching performansını optimize etmek istiyorsunuz
      - Potansiyel yönlendirme döngülerinden kaçınmak istiyorsunuz

---

### İçerik Konfigürasyonu

Uygulama içindeki içerik işleme ile ilgili ayarlar, dizin adlarını, dosya uzantılarını ve türetilmiş konfigürasyonları içerir.

#### Özellikler

- **watch**:
  - _Tür_: `boolean`
  - _Varsayılan_: `process.env.NODE_ENV === 'development'`
  - _Açıklama_: Intlayer'ın uygulama içindeki içerik bildirim dosyalarındaki değişiklikleri izleyip ilgili sözlükleri yeniden oluşturup oluşturmayacağını belirtir.

- **fileExtensions**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Açıklama_: Sözlükler oluşturulurken aranacak dosya uzantıları.
  - _Örnek_: `['.data.ts', '.data.js', '.data.json']`
  - _Not_: Dosya uzantılarını özelleştirmek çakışmalardan kaçınmaya yardımcı olabilir.

- **baseDir**:
  - _Tür_: `string`
  - _Varsayılan_: `process.cwd()`
  - _Açıklama_: Proje için temel dizin.
  - _Örnek_: `'/path/to/project'`
  - _Not_: Tüm Intlayer ile ilgili dizinleri çözümlemek için kullanılır.

- **dictionaryOutput**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['intlayer']`
  - _Açıklama_: Kullanılacak sözlük çıktısının türü, ör. `'intlayer'` veya `'i18next'`.

- **contentDir**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['.']`
  - _Örnek_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Açıklama_: İçeriğin depolandığı dizin yolu.

- **dictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/dictionaries'`
  - _Açıklama_: Ara veya çıktı sonuçlarını depolamak için dizin yolu.

- **moduleAugmentationDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/types'`
  - _Açıklama_: Modül genişletmesi için dizin, daha iyi IDE önerileri ve tür kontrolü sağlar.
  - _Örnek_: `'intlayer-types'`
  - _Not_: Bunu `tsconfig.json`'a dahil ettiğinizden emin olun.

- **unmergedDictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/unmerged_dictionary'`
  - _Açıklama_: Birleştirilmemiş sözlükleri depolamak için dizin.
  - _Örnek_: `'translations'`

- **dictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/dictionary'`
  - _Açıklama_: Yerelleştirme sözlüklerini depolamak için dizin.
  - _Örnek_: `'translations'`

- **i18nextResourcesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'i18next_dictionary'`
  - _Açıklama_: i18n sözlüklerini depolamak için dizin.
  - _Örnek_: `'translations'`
  - _Not_: Bunu i18next çıktı türü için yapılandırdığınızdan emin olun.

- **typesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'types'`
  - _Açıklama_: Sözlük türlerini depolamak için dizin.
  - _Örnek_: `'intlayer-types'`

- **mainDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'main'`
  - _Açıklama_: Ana uygulama dosyalarının depolandığı dizin.
  - _Örnek_: `'intlayer-main'`

- **excludedPath**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['node_modules']`
  - _Açıklama_: İçerik aramasından hariç tutulan dizinler.
  - _Not_: Bu ayar henüz kullanılmıyor, ancak gelecekteki uygulama için planlanıyor.

### Günlükçü Konfigürasyonu

Günlükçüyü kontrol eden ayarlar, kullanılacak öneki içerir.

#### Özellikler

- **mode**:
  - _Tür_: `string`
  - _Varsayılan_: `default`
  - _Açıklama_: Günlükçünün modunu belirtir.
  - _Seçenekler_: `default`, `verbose`, `disabled`
  - _Örnek_: `default`
  - _Not_: Günlükçünün modu. Verbose modu daha fazla bilgi kaydeder, ancak hata ayıklama amaçları için kullanılabilir. Disabled modu günlükçüyü devre dışı bırakır.

- **prefix**:
  - _Tür_: `string`
  - _Varsayılan_: `'[intlayer] '`
  - _Açıklama_: Günlükçünün öneki.
  - _Örnek_: `'[my custom prefix] '`
  - _Not_: Günlükçünün öneki.

### AI Konfigürasyonu

Intlayer'ın AI özelliklerini kontrol eden ayarlar, sağlayıcıyı, modeli ve API anahtarını içerir.

Bu konfigürasyon, bir erişim anahtarı kullanarak [Intlayer Dashboard](https://intlayer.org/dashboard/project)'a kayıtlıysanız isteğe bağlıdır. Intlayer ihtiyaçlarınız için en verimli ve maliyet etkin AI çözümünü otomatik olarak yönetir. Varsayılan seçenekleri kullanmak, Intlayer en ilgili modelleri kullanmak için sürekli güncellendiğinden uzun vadeli bakım için daha iyidir.

Kendi API anahtarınızı veya belirli bir modeli kullanmayı tercih ederseniz, özel AI konfigürasyonunuzu tanımlayabilirsiniz.
Bu AI konfigürasyonu Intlayer ortamınızda genel olarak kullanılacaktır. CLI komutları bunları komutlar için varsayılanlar olarak kullanacaktır (ör. `fill`), ayrıca SDK, Görsel Düzenleyici ve CMS. Komut parametrelerini kullanarak belirli kullanım durumları için bu varsayılan değerleri geçersiz kılabilirsiniz.

Intlayer, gelişmiş esneklik ve seçim için birden fazla AI sağlayıcısını destekler. Şu anda desteklenen sağlayıcılar:

- **OpenAI** (varsayılan)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Özellikler

- **provider**:
  - _Tür_: `string`
  - _Varsayılan_: `'openai'`
  - _Açıklama_: Intlayer'ın AI özellikleri için kullanılacak sağlayıcı.
  - _Seçenekler_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Örnek_: `'anthropic'`
  - _Not_: Farklı sağlayıcılar farklı API anahtarları gerektirebilir ve farklı fiyatlandırma modellerine sahip olabilir.

- **model**:
  - _Tür_: `string`
  - _Varsayılan_: Yok
  - _Açıklama_: Intlayer'ın AI özellikleri için kullanılacak model.
  - _Örnek_: `'gpt-4o-2024-11-20'`
  - _Not_: Belirli model sağlayıcıya göre değişir.

- **temperature**:
  - _Tür_: `number`
  - _Varsayılan_: Yok
  - _Açıklama_: Sıcaklık AI'nın yanıtlarının rastgeleliğini kontrol eder.
  - _Örnek_: `0.1`
  - _Not_: Daha yüksek sıcaklık AI'yı daha yaratıcı ve daha az öngörülebilir hale getirir.

- **apiKey**:
  - _Tür_: `string`
  - _Varsayılan_: Yok
  - _Açıklama_: Seçilen sağlayıcı için API anahtarınız.
  - _Örnek_: `process.env.OPENAI_API_KEY`
  - _Not_: Önemli: API anahtarları gizli tutulmalı ve kamuya açık olarak paylaşılmamalıdır. Lütfen bunları güvenli bir yerde, ortam değişkenleri gibi tutun.

- **applicationContext**:
  - _Tür_: `string`
  - _Varsayılan_: Yok
  - _Açıklama_: AI modeline uygulamanız hakkında ek bağlam sağlar, daha doğru ve bağlamsal olarak uygun çeviriler üretmesine yardımcı olur. Bu, uygulamanızın alanı, hedef kitlesi, tonu veya belirli terminoloji hakkında bilgi içerebilir.

### İnşa Konfigürasyonu

Intlayer'ın uygulamanızın uluslararasılaştırmasını nasıl optimize ettiğini ve oluşturduğunu kontrol eden ayarlar.

İnşa seçenekleri `@intlayer/babel` ve `@intlayer/swc` eklentilerine uygulanır.

> Geliştirme modunda, Intlayer geliştirme deneyimini basitleştirmek için sözlükler için statik içe aktarmalar kullanır.

> Optimize edildiğinde, Intlayer parçalama işlemini optimize etmek için sözlük çağrılarını değiştirecektir, böylece son paket sadece gerçekten kullanılan sözlükleri içe aktaracaktır.

#### Özellikler

- **optimize**:
  - _Tür_: `boolean`
  - _Varsayılan_: `process.env.NODE_ENV === 'production'`
  - _Açıklama_: İnşanın optimize edilip edilmeyeceğini kontrol eder.
  - _Örnek_: `true`
  - _Not_: Etkinleştirildiğinde, Intlayer parçalama işlemini optimize etmek için tüm sözlük çağrılarını değiştirecektir. Bu şekilde son paket sadece kullanılan sözlükleri içe aktaracaktır. Tüm içe aktarmalar, sözlükler yüklenirken eşzamansız işlemden kaçınmak için statik içe aktarma olarak kalacaktır.
  - _Not_: Intlayer `useIntlayer` çağrılarını `importMode` seçeneği tarafından tanımlanan modla ve `getIntlayer`'ı `getDictionary` ile değiştirecektir.
  - _Not_: Bu seçenek `@intlayer/babel` ve `@intlayer/swc` eklentilerine dayanır.
  - _Not_: Tüm anahtarların `useIntlayer` çağrılarında statik olarak bildirildiğinden emin olun. ör. `useIntlayer('navbar')`.

- **importMode**:
  - _Tür_: `'static' | 'dynamic' | 'async'`
  - _Varsayılan_: `'static'`
  - _Açıklama_: Sözlüklerin nasıl içe aktarıldığını kontrol eder.
  - _Örnek_: `'dynamic'`
  - _Not_: Mevcut modlar:
    - "static": Sözlükler statik olarak içe aktarılır. `useIntlayer`'ı `useDictionary` ile değiştirir.
    - "dynamic": Sözlükler Suspense kullanarak dinamik olarak içe aktarılır. `useIntlayer`'ı `useDictionaryDynamic` ile değiştirir.
    - "async": Sözlükler eşzamansız olarak dinamik olarak içe aktarılır. `useIntlayer`'ı `await useDictionaryAsync` ile değiştirir.
  - _Not_: Dinamik içe aktarmalar Suspense'e dayanır ve işleme performansını hafifçe etkileyebilir.
  - _Not_: Devre dışı bırakılırsa tüm yerel ayarlar bir kerede yüklenir, kullanılmasalar bile.
  - _Not_: Bu seçenek `@intlayer/babel` ve `@intlayer/swc` eklentilerine dayanır.
  - _Not_: Tüm anahtarların `useIntlayer` çağrılarında statik olarak bildirildiğinden emin olun. ör. `useIntlayer('navbar')`.
  - _Not_: Bu seçenek `optimize` devre dışıysa göz ardı edilir.
  - _Not_: Çoğu durumda, React uygulamaları için `"dynamic"`, Vue.js uygulamaları için `"async"` kullanılacaktır.
  - _Not_: Bu seçenek `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` ve `useDictionaryDynamic` fonksiyonlarını etkilemeyecektir.

- **traversePattern**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Açıklama_: Optimizasyon sırasında hangi dosyaların geçileceğini tanımlayan desenler.
    - _Örnek_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Not_: Optimizasyonu ilgili kod dosyalarıyla sınırlamak ve inşa performansını iyileştirmek için bunu kullanın.
  - _Not_: Bu seçenek `optimize` devre dışıysa göz ardı edilir.
  - _Not_: Glob deseni kullanın.

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler                                                                                  |
| ------ | ---------- | ---------------------------------------------------------------------------------------------- |
| 5.9.0  | 2025-09-04 | `hotReload` alanını `liveSync` ile değiştir ve `liveSyncPort` ve `liveSyncURL` alanlarını ekle |
| 5.6.1  | 2025-07-25 | `activateDynamicImport` seçeneğini `importMode` seçeneğiyle değiştir                           |
| 5.6.0  | 2025-07-13 | Varsayılan contentDir'yi `['src']`'den `['.']`'ye değiştir                                     |
| 5.5.11 | 2025-06-29 | `docs` komutlarını ekle                                                                        |
