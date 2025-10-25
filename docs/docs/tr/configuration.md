---
createdAt: 2024-08-13
updatedAt: 2025-09-16
title: Yapılandırma
description: Uygulamanız için Intlayer'ı nasıl yapılandıracağınızı öğrenin. Intlayer'ı ihtiyaçlarınıza göre özelleştirmek için mevcut çeşitli ayarları ve seçenekleri anlayın.
keywords:
  - Yapılandırma
  - Ayarlar
  - Özelleştirme
  - Intlayer
  - Seçenekler
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` import modu eklendi
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` import modu eklendi
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` alanı `liveSync` ile değiştirildi ve `liveSyncPort` ile `liveSyncURL` alanları eklendi
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` seçeneği `importMode` ile değiştirildi
  - version: 5.6.0
    date: 2025-07-13
    changes: Varsayılan contentDir `['src']`'den `['.']` olarak değiştirildi
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` komutları eklendi
---

# Intlayer Yapılandırma Dokümantasyonu

## Genel Bakış

Intlayer yapılandırma dosyaları, uluslararasılaştırma, ara katman (middleware) ve içerik işleme gibi eklentinin çeşitli yönlerinin özelleştirilmesine olanak tanır. Bu belge, yapılandırmadaki her bir özelliğin ayrıntılı açıklamasını sağlar.

---

## Yapılandırma Dosyası Desteği

Intlayer, JSON, JS, MJS ve TS yapılandırma dosyası formatlarını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Örnek yapılandırma dosyası

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // Desteklenen diller
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // İçeriğin otomatik doldurulacağı dosya yolu
    contentDir: ["src", "../ui-library"], // İçerik dizinleri
  },
  middleware: {
    noPrefix: false, // Önek kullanımı
  },
  editor: {
    applicationURL: "https://example.com", // Uygulama URL'si
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API anahtarı
    applicationContext: "This is a test application", // Uygulama bağlamı
  },
  build: {
    importMode: "dynamic", // İçe aktarma modu
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // Desteklenen diller
  },
  content: {
    contentDir: ["src", "../ui-library"], // İçerik dizinleri
  },
  middleware: {
    noPrefix: false, // Önek kullanımı
  },
  editor: {
    applicationURL: "https://example.com", // Uygulama URL'si
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API anahtarı
    applicationContext: "Bu bir test uygulamasıdır", // Uygulama bağlamı
  },
  build: {
    importMode: "dynamic", // İçe aktarma modu
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // Desteklenen diller
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // İçerik dizinleri
  },
  "middleware": {
    "noPrefix": false, // Önek kullanımı
  },
  "editor": {
    "applicationURL": "https://example.com", // Uygulama URL'si
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Bu bir test uygulamasıdır",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Konfigürasyon Referansı

Aşağıdaki bölümler, Intlayer için mevcut olan çeşitli konfigürasyon ayarlarını açıklamaktadır.

---

### Uluslararasılaştırma Konfigürasyonu

Uygulama için mevcut yerel ayarları ve varsayılan yerel ayarı içeren uluslararasılaştırma ile ilgili ayarları tanımlar.

#### Özellikler

- **locales**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['en']`
  - _Açıklama_: Uygulamada desteklenen yerel ayarların listesi.
  - _Örnek_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tür_: `string[]`
  - _Varsayılan_: `[]`
  - _Açıklama_: Uygulamada zorunlu olan yerel ayarların listesi.
  - _Örnek_: `[]`
  - _Not_: Boşsa, `strict` modda tüm yerel ayarlar gereklidir.
  - _Not_: Gereken yerel ayarların `locales` alanında da tanımlandığından emin olun.
- **strictMode**:
  - _Tür_: `string`
  - _Varsayılan_: `inclusive`
  - _Açıklama_: Typescript kullanarak uluslararasılaştırılmış içeriğin güçlü uygulamalarını sağlar.
  - _Not_: "strict" olarak ayarlanırsa, çeviri `t` fonksiyonu her bildirilen yerel ayarın tanımlanmasını gerektirir. Bir yerel ayar eksikse veya yapılandırmanızda bildirilmemişse, hata verir.
  - _Not_: "inclusive" olarak ayarlanırsa, çeviri `t` fonksiyonu her bildirilen yerel ayarın tanımlanmasını gerektirir. Bir yerel ayar eksikse uyarı verir. Ancak yapılandırmanızda bildirilmemiş ama mevcut olan bir yerel ayarı kabul eder.
  - _Not_: "loose" olarak ayarlanırsa, çeviri `t` fonksiyonu mevcut olan herhangi bir yerel ayarı kabul edecektir.

- **defaultLocale**:
  - _Tür_: `string`
  - _Varsayılan_: `'en'`
  - _Açıklama_: İstenen yerel ayar bulunamadığında kullanılan varsayılan yerel ayar.
  - _Örnek_: `'en'`
  - _Not_: URL, çerez veya başlıkta yerel ayar belirtilmediğinde kullanılacak yerel ayarı belirlemek için kullanılır.

---

### Editör Yapılandırması

Entegre editörle ilgili ayarları, sunucu portu ve aktiflik durumu dahil olmak üzere tanımlar.

#### Özellikler

- **applicationURL**:
  - _Tür_: `string`
  - _Varsayılan_: `http://localhost:3000`
  - _Açıklama_: Uygulamanın URL'si. Güvenlik nedenleriyle editörün kaynağını kısıtlamak için kullanılır.
  - _Örnek_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Not_: Uygulamanın URL'si. Güvenlik nedenleriyle editörün kaynağını kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, editöre herhangi bir kaynaktan erişilebilir.

- **port**:
  - _Tür_: `number`
  - _Varsayılan_: `8000`
  - _Açıklama_: Görsel editör sunucusunun kullandığı port.

- **editorURL**:
  - _Tür_: `string`
  - _Varsayılan_: `'http://localhost:8000'`
  - _Açıklama_: Editör sunucusunun URL'si. Güvenlik nedenleriyle editörün kaynağını kısıtlamak için kullanılır.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Not_: Uygulamadan erişilecek editör sunucusunun URL'si. Güvenlik nedenleriyle uygulamayla etkileşime girebilecek kaynakları kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, editöre herhangi bir kaynaktan erişilebilir. Port değiştirildiğinde veya editör farklı bir alan adında barındırılıyorsa ayarlanmalıdır.

- **cmsURL**:
  - _Tür_: `string`
  - _Varsayılan_: `'https://intlayer.org'`
  - _Açıklama_: Intlayer CMS'nin URL'si.
  - _Örnek_: `'https://intlayer.org'`
  - _Not_: Intlayer CMS'nin URL'si.

- **backendURL**:
  - _Tür_: `string`
  - _Varsayılan_: `https://back.intlayer.org`
  - _Açıklama_: Backend sunucusunun URL'si.
  - _Örnek_: `http://localhost:4000`

- **enabled**:
  - _Tür_: `boolean`
  - _Varsayılan_: `true`
  - _Açıklama_: Uygulamanın görsel editörle etkileşimde bulunup bulunmadığını belirtir.
  - _Örnek_: `process.env.NODE_ENV !== 'production'`
  - _Not_: Eğer true ise, editör uygulamayla etkileşimde bulunabilir. Eğer false ise, editör uygulamayla etkileşimde bulunamaz. Her durumda, editör yalnızca görsel editör tarafından etkinleştirilebilir. Belirli ortamlar için editörün devre dışı bırakılması, güvenliği sağlamak için bir yöntemdir.

- **clientId**:
  - _Tür_: `string` | `undefined`
  - _Varsayılan_: `undefined`
  - _Açıklama_: clientId ve clientSecret, intlayer paketlerinin backend ile oAuth2 kimlik doğrulaması kullanarak kimlik doğrulaması yapmasını sağlar. Bir erişim belirteci, projeyle ilişkili kullanıcıyı doğrulamak için kullanılır. Bir erişim belirteci almak için https://intlayer.org/dashboard/project adresine gidip bir hesap oluşturun.
  - _Örnek_: `true`
  - _Not_: Önemli: clientId ve clientSecret gizli tutulmalı ve kamuya açık şekilde paylaşılmamalıdır. Lütfen bunları ortam değişkenleri gibi güvenli bir yerde sakladığınızdan emin olun.

- **clientSecret**:
  - _Tür_: `string` | `undefined`
  - _Varsayılan_: `undefined`
  - _Açıklama_: clientId ve clientSecret, intlayer paketlerinin backend ile oAuth2 kimlik doğrulaması kullanarak doğrulanmasını sağlar. Bir erişim belirteci, projeyle ilişkili kullanıcıyı doğrulamak için kullanılır. Bir erişim belirteci almak için https://intlayer.org/dashboard/project adresine gidip bir hesap oluşturun.
  - _Örnek_: `true`
  - _Not_: Önemli: clientId ve clientSecret gizli tutulmalı ve kamuya açık şekilde paylaşılmamalıdır. Lütfen bunları ortam değişkenleri gibi güvenli bir yerde sakladığınızdan emin olun.

- **dictionaryPriorityStrategy**:
  - _Tür_: `string`
  - _Varsayılan_: `'local_first'`
  - _Açıklama_: Hem yerel hem de uzak sözlüklerin mevcut olduğu durumlarda sözlüklerin önceliklendirilme stratejisi. `'distant_first'` olarak ayarlanırsa, uygulama uzak sözlüklere yerel sözlüklerden daha fazla öncelik verir. `'local_first'` olarak ayarlanırsa, uygulama yerel sözlüklere uzak sözlüklerden daha fazla öncelik verir.
  - _Örnek_: `'distant_first'`

- **liveSync**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: CMS / Görsel Editör / Backend üzerinde bir değişiklik algılandığında uygulama sunucusunun içeriği sıcak yeniden yükleyip yüklemeyeceğini belirtir.
  - _Örnek_: `true`
  - _Not_: Örneğin, yeni bir sözlük eklendiğinde veya güncellendiğinde, uygulama sayfada görüntülenecek içeriği günceller.
  - _Not_: Canlı senkronizasyon, uygulamanın içeriğini başka bir sunucuya dışa aktarmayı gerektirir. Bu, uygulamanın performansını biraz etkileyebilir. Bunu sınırlamak için, uygulamanın ve canlı senkronizasyon sunucusunun aynı makinede barındırılmasını öneriyoruz. Ayrıca, canlı senkronizasyon ile `optimize` kombinasyonu, canlı senkronizasyon sunucusuna önemli sayıda istek gönderebilir. Altyapınıza bağlı olarak, her iki seçeneği ve kombinasyonlarını test etmenizi öneririz.

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
  - _Not_: Varsayılan olarak localhost'a işaret eder ancak uzak bir canlı senkronizasyon sunucusu durumunda herhangi bir URL'ye değiştirilebilir.

### Ara Katman (Middleware) Yapılandırması

Uygulamanın çerezleri, başlıkları ve yerel yönetimi için URL öneklerini nasıl yönettiğini kontrol eden ayarlar.

#### Özellikler

- **headerName**:
  - _Tür_: `string`
  - _Varsayılan_: `'x-intlayer-locale'`
  - _Açıklama_: Yerel ayarı belirlemek için kullanılan HTTP başlığının adı.
  - _Örnek_: `'x-custom-locale'`
  - _Not_: API tabanlı yerel belirleme için faydalıdır.

- **cookieName**:
  - _Tür_: `string`
  - _Varsayılan_: `'intlayer-locale'`
  - _Açıklama_: Yerel ayarı saklamak için kullanılan çerezin adı.
  - _Örnek_: `'custom-locale'`
  - _Not_: Oturumlar arasında yerel ayarın korunması için kullanılır.

- **prefixDefault**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: Varsayılan yerel ayarın URL'de dahil edilip edilmeyeceği.
  - _Örnek_: `true`
  - _Not_:
    - Eğer `true` ve `defaultLocale = 'en'` ise: yol = `/en/dashboard` veya `/fr/dashboard`
    - Eğer `false` ve `defaultLocale = 'en'` ise: yol = `/dashboard` veya `/fr/dashboard`

- **basePath**:
  - _Tür_: `string`
  - _Varsayılan_: `''`
  - _Açıklama_: Uygulama URL'leri için temel yol.
  - _Örnek_: `'/my-app'`
  - _Not_:
    - Uygulama `https://example.com/my-app` adresinde barındırılıyorsa
    - Temel yol `'/my-app'` olur
    - URL `https://example.com/my-app/en` olacaktır
    - Eğer base path ayarlanmazsa, URL `https://example.com/en` olacaktır.

- **serverSetCookie**:
  - _Tür_: `string`
  - _Varsayılan_: `'always'`
  - _Açıklama_: Sunucuda locale çerezinin ayarlanma kuralı.
  - _Seçenekler_: `'always'`, `'never'`
  - _Örnek_: `'never'`
  - _Not_: Locale çerezinin her istekte mi yoksa hiç mi ayarlanacağını kontrol eder.

- **noPrefix**:
  - _Tür_: `boolean`
  - _Varsayılan_: `false`
  - _Açıklama_: URL'lerden locale önekinin çıkarılıp çıkarılmayacağı.
  - _Örnek_: `true`
  - _Not_:
    - Eğer `true` ise: URL'de önek olmaz
    - Eğer `false` ise: URL'de önek olur
    - `basePath = '/my-app'` örneği:
      - Eğer `noPrefix = false` ise: URL `https://example.com/my-app/en` olur
      - Eğer `noPrefix = true` ise: URL `https://example.com` olur

---

### İçerik Yapılandırması

Uygulama içindeki içerik yönetimi ile ilgili ayarlar; dizin isimleri, dosya uzantıları ve türetilmiş yapılandırmalar dahil.

#### Özellikler

- **autoFill**:
  - _Tür_: `boolean | string | { [key in Locales]?: string }`
  - _Varsayılan_: `undefined`
  - _Açıklama_: İçeriğin yapay zeka kullanılarak otomatik olarak nasıl doldurulacağını belirtir. `intlayer.config.ts` dosyasında global olarak tanımlanabilir.
  - _Örnek_: true
  - _Örnek_: `'./{{fileName}}.content.json'`
  - _Örnek_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Not_: Otomatik doldurma yapılandırması. Şunlar olabilir:
    - boolean: Tüm yereller için otomatik doldurmayı etkinleştirir
    - string: Değişkenler içeren tek bir dosya yolu veya şablon
    - object: Yerel bazında dosya yolları

- **watch**:
  - _Tür_: `boolean`
  - _Varsayılan_: `process.env.NODE_ENV === 'development'`
  - _Açıklama_: Intlayer'ın uygulamadaki içerik beyan dosyalarındaki değişiklikleri izleyip ilgili sözlükleri yeniden oluşturup oluşturmayacağını belirtir.

- **fileExtensions**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Açıklama_: Sözlükler oluşturulurken aranacak dosya uzantıları.
  - _Örnek_: `['.data.ts', '.data.js', '.data.json']`
  - _Not_: Dosya uzantılarının özelleştirilmesi çakışmaları önlemeye yardımcı olabilir.

- **baseDir**:
  - _Tür_: `string`
  - _Varsayılan_: `process.cwd()`
  - _Açıklama_: Projenin temel dizini.
  - _Örnek_: `'/path/to/project'`
  - _Not_: Tüm Intlayer ile ilgili dizinlerin çözülmesinde kullanılır.

- **dictionaryOutput**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['intlayer']`
  - _Açıklama_: Kullanılacak sözlük çıktısı türü, örn. `'intlayer'` veya `'i18next'`.

- **contentDir**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['.']`
  - _Örnek_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Açıklama_: İçeriğin depolandığı dizin yolu.

- **dictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/dictionaries'`
  - _Açıklama_: Ara sonuçların veya çıktıların depolanacağı dizin yolu.

- **moduleAugmentationDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/types'`
  - _Açıklama_: Modül genişletme için dizin, daha iyi IDE önerileri ve tip kontrolü sağlar.
  - _Örnek_: `'intlayer-types'`
  - _Not_: Bunu `tsconfig.json` dosyanıza eklediğinizden emin olun.

- **unmergedDictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/unmerged_dictionary'`
  - _Açıklama_: Birleştirilmemiş sözlüklerin depolanacağı dizin.
  - _Örnek_: `'translations'`

- **dictionariesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'.intlayer/dictionary'`
  - _Açıklama_: Yerelleştirme sözlüklerinin saklandığı dizin.
  - _Örnek_: `'translations'`

- **i18nextResourcesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'i18next_dictionary'`
  - _Açıklama_: i18n sözlüklerinin saklandığı dizin.
  - _Örnek_: `'translations'`
  - _Not_: Bu dizinin i18next çıktı türü için yapılandırıldığından emin olun.

- **typesDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'types'`
  - _Açıklama_: Sözlük türlerinin saklandığı dizin.
  - _Örnek_: `'intlayer-types'`

- **mainDir**:
  - _Tür_: `string`
  - _Varsayılan_: `'main'`
  - _Açıklama_: Ana uygulama dosyalarının saklandığı dizin.
  - _Örnek_: `'intlayer-main'`

- **excludedPath**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['node_modules']`
  - _Açıklama_: İçerik aramasından hariç tutulan dizinler.
  - _Not_: Bu ayar henüz kullanılmamaktadır, ancak gelecekte uygulanması planlanmaktadır.

### Logger Yapılandırması

Logger'ı kontrol eden ayarlar, kullanılacak önek dahil.

#### Özellikler

- **mode**:
  - _Tür_: `string`
  - _Varsayılan_: `default`
  - _Açıklama_: Logger modunu belirtir.
  - _Seçenekler_: `default`, `verbose`, `disabled`
  - _Örnek_: `default`
  - _Not_: Logger modu. Verbose modu daha fazla bilgi kaydeder, ancak hata ayıklama amaçlı kullanılabilir. Disabled modu logger'ı devre dışı bırakır.

- **prefix**:
  - _Tür_: `string`
  - _Varsayılan_: `'[intlayer] '`
  - _Açıklama_: Logger'ın öneki.
  - _Örnek_: `'[my custom prefix] '`
  - _Not_: Günlüğün ön eki.

### AI Yapılandırması

Intlayer'ın AI özelliklerini kontrol eden ayarlar, sağlayıcı, model ve API anahtarı dahil.

Bu yapılandırma, bir erişim anahtarı kullanarak [Intlayer Kontrol Paneli](https://intlayer.org/dashboard/project) üzerinden kayıtlıysanız isteğe bağlıdır. Intlayer, ihtiyaçlarınız için en verimli ve maliyet-etkin AI çözümünü otomatik olarak yönetecektir. Varsayılan seçenekleri kullanmak, Intlayer'ın en uygun modelleri kullanmak için sürekli güncellenmesi nedeniyle uzun vadeli bakım kolaylığı sağlar.

Kendi API anahtarınızı veya belirli bir modeli kullanmayı tercih ediyorsanız, özel AI yapılandırmanızı tanımlayabilirsiniz.
Bu AI yapılandırması, Intlayer ortamınız genelinde kullanılacaktır. CLI komutları, bu ayarları komutlar için varsayılan olarak kullanacaktır (örneğin `fill`), ayrıca SDK, Görsel Editör ve CMS de bu ayarları kullanır. Belirli kullanım durumları için bu varsayılan değerleri komut parametreleriyle geçersiz kılabilirsiniz.

Intlayer, artırılmış esneklik ve seçenek için birden fazla AI sağlayıcısını destekler. Şu anda desteklenen sağlayıcılar şunlardır:

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
  - _Açıklama_: Intlayer'ın yapay zeka özellikleri için kullanılacak model.
  - _Örnek_: `'gpt-4o-2024-11-20'`
  - _Not_: Kullanılacak spesifik model sağlayıcıya göre değişir.

- **temperature**:
  - _Tür_: `number`
  - _Varsayılan_: Yok
  - _Açıklama_: Sıcaklık, yapay zekanın yanıtlarının rastgeleliğini kontrol eder.
  - _Örnek_: `0.1`
  - _Not_: Daha yüksek bir sıcaklık, yapay zekayı daha yaratıcı ve daha az tahmin edilebilir yapar.

- **apiKey**:
  - _Tür_: `string`
  - _Varsayılan_: Yok
  - _Açıklama_: Seçilen sağlayıcı için API anahtarınız.
  - _Not_: Önemli: API anahtarları gizli tutulmalı ve kamuya açık şekilde paylaşılmamalıdır. Lütfen bunları ortam değişkenleri gibi güvenli bir yerde sakladığınızdan emin olun.

- **applicationContext**:
  - _Tür_: `string`
  - _Varsayılan_: Yok
  - _Açıklama_: AI modeline uygulamanız hakkında ek bağlam sağlar, böylece daha doğru ve bağlama uygun çeviriler oluşturmasına yardımcı olur. Bu, uygulamanızın alanı, hedef kitlesi, tonu veya belirli terminolojisi hakkında bilgiler içerebilir.

### Derleme Yapılandırması

Intlayer'ın uygulamanızın uluslararasılaştırmasını nasıl optimize edip derleyeceğini kontrol eden ayarlar.

Derleme seçenekleri `@intlayer/babel` ve `@intlayer/swc` eklentilerine uygulanır.

> Geliştirme modunda, Intlayer geliştirme deneyimini basitleştirmek için sözlüklerde statik importlar kullanır.

> Optimize edildiğinde, Intlayer chunking'i optimize etmek için sözlük çağrılarını değiştirir, böylece nihai paket yalnızca gerçekten kullanılan sözlükleri import eder.

#### Özellikler

- **optimize**:
  - _Tür_: `boolean`
  - _Varsayılan_: `process.env.NODE_ENV === 'production'`
  - _Açıklama_: Derlemenin optimize edilip edilmeyeceğini kontrol eder.
  - _Örnek_: `true`
  - _Not_: Etkinleştirildiğinde, Intlayer chunking'i optimize etmek için tüm sözlük çağrılarını değiştirir. Böylece nihai paket yalnızca kullanılan sözlükleri import eder. Tüm importlar, sözlüklerin yüklenmesi sırasında asenkron işlemi önlemek için statik import olarak kalır.
  - _Not_: Intlayer, `useIntlayer` çağrılarının tümünü `importMode` seçeneği ile tanımlanan moda ve `getIntlayer` çağrılarını `getDictionary` ile değiştirir.
  - _Not_: Bu seçenek `@intlayer/babel` ve `@intlayer/swc` eklentilerine dayanır.
  - _Not_: `useIntlayer` çağrılarında tüm anahtarların statik olarak tanımlandığından emin olun. Örneğin `useIntlayer('navbar')`.

- **importMode**:
  - _Tür_: `'static' | 'dynamic' | 'live'`
  - _Varsayılan_: `'static'`
  - _Açıklama_: Sözlüklerin nasıl içe aktarılacağını kontrol eder.
  - _Örnek_: `'dynamic'`
  - _Not_: Mevcut modlar:
    - "static": Sözlükler statik olarak içe aktarılır. `useIntlayer` `useDictionary` ile değiştirilir.
    - "dynamic": Sözlükler Suspense kullanılarak dinamik olarak içe aktarılır. `useIntlayer` `useDictionaryDynamic` ile değiştirilir.
- "live": Sözlükler, canlı senkronizasyon API'si kullanılarak dinamik olarak getirilir. `useIntlayer` fonksiyonunu `useDictionaryFetch` ile değiştirir.
- _Not_: Dinamik importlar Suspense'e dayanır ve render performansını biraz etkileyebilir.
- _Not_: Devre dışı bırakılırsa, kullanılmasalar bile tüm yereller aynı anda yüklenecektir.
- _Not_: Bu seçenek `@intlayer/babel` ve `@intlayer/swc` eklentilerine bağlıdır.
- _Not_: `useIntlayer` çağrılarında tüm anahtarların statik olarak tanımlandığından emin olun. Örneğin `useIntlayer('navbar')`.
- _Not_: `optimize` devre dışı bırakılırsa, bu seçenek göz ardı edilir.
  - _Not_: Eğer "live" olarak ayarlanırsa, yalnızca uzak içerik içeren ve "live" bayrağı olarak ayarlanmış sözlükler canlı mod olarak dönüştürülür. Diğerleri, sorgu sayısını optimize etmek ve yükleme performansını artırmak için dinamik modda dinamik olarak içe aktarılır.
  - _Not_: Canlı mod, sözlükleri almak için canlı senkronizasyon API'sini kullanır. API çağrısı başarısız olursa, sözlükler dinamik modda dinamik olarak içe aktarılır.
  - _Not_: Bu seçenek `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` ve `useDictionaryDynamic` fonksiyonlarını etkilemez.

- **traversePattern**:
  - _Tür_: `string[]`
  - _Varsayılan_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Açıklama_: Optimizasyon sırasında hangi dosyaların taranacağını tanımlayan desenler.
    - _Örnek_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Not_: Optimizasyonu ilgili kod dosyalarıyla sınırlamak ve derleme performansını artırmak için bunu kullanın.
  - _Not_: Bu seçenek `optimize` devre dışı bırakılırsa dikkate alınmaz.
  - _Not_: Glob deseni kullanın.
