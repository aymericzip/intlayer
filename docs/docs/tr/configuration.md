---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Yapılandırma (Configuration)
description: Uygulamanız için Intlayer'ı nasıl yapılandıracağınızı öğrenin. Intlayer'ı ihtiyaçlarınıza göre özelleştirmek için çeşitli ayarları ve seçenekleri anlayın.
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
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' ve 'dictionary.fill' için dil başına nesne notasyonu eklendi"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir', 'content' yapılandırmasından 'system' yapılandırmasına taşındı"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Derleyici seçenekleri güncellendi, 'output' ve 'noMetadata' desteği eklendi"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Derleyici seçenekleri güncellendi"
  - version: 8.1.5
    date: 2026-02-23
    changes: "'build-only' derleyici seçeneği ve sözlük öneki eklendi"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face ve Together.ai sağlayıcıları için destek eklendi"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Yapay Zeka yapılandırmasına `dataSerialization` eklendi"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Alttaki mekanizmayı daha iyi tanımlamak için `live` içe aktarma modu `fetch` olarak yeniden adlandırıldı."
  - version: 8.0.0
    date: 2026-01-22
    changes: "`importMode` derleme yapılandırması `dictionary` yapılandırmasına taşındı."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Yönlendirme yapılandırmasına `rewrite` seçeneği eklendi"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Sistem yapılandırması içerik yapılandırmasından ayrıldı. Dahili yollar `system` özelliğine taşındı. İçerik dosyalarını kod dönüşümünden ayırmak için `codeDir` eklendi."
  - version: 8.0.0
    date: 2026-01-18
    changes: "`location` ve `schema` sözlük seçenekleri eklendi"
  - version: 7.5.1
    date: 2026-01-10
    changes: "JSON5 ve JSONC dosya formatları için destek eklendi"
  - version: 7.5.0
    date: 2025-12-17
    changes: "`buildMode` seçeneği eklendi"
  - version: 7.0.0
    date: 2025-10-25
    changes: "`dictionary` yapılandırması eklendi"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware`, `routing` yapılandırması ile değiştirildi"
  - version: 7.0.0
    date: 2025-10-12
    changes: "`formatCommand` seçeneği eklendi"
  - version: 6.2.0
    date: 2025-10-12
    changes: "`excludedPath` seçeneği güncellendi"
  - version: 6.0.2
    date: 2025-09-23
    changes: "`outputFormat` seçeneği eklendi"
  - version: 6.0.0
    date: 2025-09-21
    changes: "`dictionaryOutput` alanı ve `i18nextResourcesDir` alanı kaldırıldı"
  - version: 6.0.0
    date: 2025-09-16
    changes: "`live` içe aktarma modu eklendi"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` alanı `liveSync` ile değiştirildi ve `liveSyncPort` ile `liveSyncURL` alanları eklendi"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport`, `importMode` seçeneği ile değiştirildi"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Varsayılan `contentDir`, `['src']` yerine `['.']` olarak değiştirildi"
  - version: 5.5.11
    date: 2025-06-29
    changes: "`docs` komutları eklendi"
---

# Intlayer Yapılandırma Belgeleri

## Genel Bakış

Intlayer yapılandırma dosyaları, uluslararasılaştırma, ara yazılım (middleware) ve içerik yönetimi gibi eklentinin çeşitli yönlerini özelleştirmenize olanak tanır. Bu belge, yapılandırmadaki her özelliğin ayrıntılı bir açıklamasını sunar.

---

## İçindekiler

<TOC/>

---

## Yapılandırma Dosyası Desteği

Intlayer, JSON, JS, MJS ve TS yapılandırma dosyası formatlarını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Örnek Yapılandırma Dosyası

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Mevcut tüm seçenekleri gösteren Intlayer yapılandırma dosyası örneği.
 */
const config: IntlayerConfig = {
  /**
   * Uluslararasılaştırma ayarları için yapılandırma.
   */
  internationalization: {
    /**
     * Uygulamada desteklenen dillerin listesi.
     * Varsayılan: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Her sözlükte tanımlanması gereken zorunlu dillerin listesi.
     * Boşsa, `strict` modda tüm diller zorunludur.
     * Varsayılan: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Uluslararasılaştırılmış içerik için katılık seviyesi.
     * - "strict": Bildirilen bir dil eksikse veya bildirilmemişse hata verir.
     * - "inclusive": Bildirilen bir dil eksikse uyarı verir.
     * - "loose": Mevcut herhangi bir dili kabul eder.
     * Varsayılan: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * İstenen dil bulunamadığında geri dönüş (fallback) olarak kullanılan varsayılan dil.
     * Varsayılan: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Sözlük işlemlerini ve geri dönüş davranışını kontrol eden ayarlar.
   */
  dictionary: {
    /**
     * Sözlüklerin nasıl içe aktarılacağını kontrol eder.
     * - "static": Derleme zamanında statik olarak içe aktarılır.
     * - "dynamic": Suspense kullanılarak dinamik olarak içe aktarılır.
     * - "fetch": Live Sync API aracılığıyla dinamik olarak getirilir.
     * Varsayılan: "static"
     */
    importMode: "static",

    /**
     * Eksik çevirileri yapay zeka kullanarak otomatik doldurma stratejisi.
     * Bir boolean değer veya doldurulan içeriği saklamak için bir yol kalıbı olabilir.
     * Varsayılan: true
     */
    fill: true,

    /**
     * Sözlük dosyalarının fiziksel konumu.
     * - "local": Yerel dosya sisteminde saklanır.
     * - "remote": Intlayer CMS'de saklanır.
     * - "hybrid": Hem yerel dosya sisteminde hem de Intlayer CMS'de saklanır.
     * - "plugin" (veya herhangi bir özel dize): Bir eklenti veya özel bir kaynak tarafından sağlanır.
     * Varsayılan: "local"
     */
    location: "local",

    /**
     * İçeriklerin otomatik olarak dönüştürülüp dönüştürülmeyeceği (örneğin Markdown'dan HTML'e).
     * Varsayılan: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Yönlendirme ve ara yazılım yapılandırması.
   */
  routing: {
    /**
     * Dil yönlendirme stratejisi.
     * - "prefix-no-default": Varsayılan dil dışındaki tüm diller için önek (örneğin /dashboard, /fr/dashboard).
     * - "prefix-all": Tüm diller için önek (örneğin /en/dashboard, /fr/dashboard).
     * - "no-prefix": URL'de dil yok.
     * - "search-params": ?locale=... kullanır.
     * Varsayılan: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Kullanıcının seçtiği dilin nerede saklanacağı.
     * Seçenekler: 'cookie', 'localStorage', 'sessionStorage', 'header' veya bunların bir dizisi.
     * Varsayılan: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Uygulama URL'leri için temel yol.
     * Varsayılan: ""
     */
    basePath: "",

    /**
     * Dile özel yollar için özel URL yeniden yazma kuralları.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * İçerik dosyalarını bulma ve işleme ayarları.
   */
  content: {
    /**
     * Sözlükler için taranacak dosya uzantıları.
     * Varsayılan: ['.content.ts', '.content.js', '.content.json', vb.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content dosyalarının bulunduğu dizinler.
     * Varsayılan: ["."]
     */
    contentDir: ["src"],

    /**
     * Kaynak kodun bulunduğu dizin.
     * Derleme optimizasyonu ve kod dönüşümü için kullanılır.
     * Varsayılan: ["."]
     */
    codeDir: ["src"],

    /**
     * Taramadan hariç tutulacak kalıplar.
     * Varsayılan: ['node_modules', '.intlayer', vb.]
     */
    excludedPath: ["node_modules"],

    /**
     * Geliştirme sırasında değişikliklerin izlenip izlenmeyeceği ve sözlüklerin yeniden oluşturulup oluşturulmayacağı.
     * Varsayılan: Geliştirmede true
     */
    watch: true,

    /**
     * Yeni oluşturulan / güncellenen .content dosyalarını biçimlendirmek için komut.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Görsel Editör yapılandırması.
   */
  editor: {
    /**
     * Görsel editörün etkin olup olmadığı.
     * Varsayılan: false
     */
    enabled: true,

    /**
     * Kaynak doğrulaması için uygulamanızın URL'si.
     * Varsayılan: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Yerel editör sunucusu için port.
     * Varsayılan: 8000
     */
    port: 8000,

    /**
     * Editör için genel URL.
     * Varsayılan: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL'si.
     * Varsayılan: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Arka uç API URL'si.
     * Varsayılan: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Gerçek zamanlı içerik senkronizasyonunun etkinleştirilip etkinleştirilmeyeceği.
     * Varsayılan: false
     */
    liveSync: true,
  },

  /**
   * Yapay zeka destekli çeviri ve oluşturma ayarları.
   */
  ai: {
    /**
     * Kullanılacak yapay zeka sağlayıcısı.
     * Seçenekler: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Varsayılan: 'openai'
     */
    provider: "openai",

    /**
     * Seçilen sağlayıcıdan kullanılacak model.
     */
    model: "gpt-4o",

    /**
     * Sağlayıcının API anahtarı.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Çeviri oluştururken yapay zekaya rehberlik edecek küresel bağlam.
     */
    applicationContext: "Bu bir seyahat rezervasyon uygulamasıdır.",

    /**
     * Yapay zeka API'si için temel URL.
     */
    baseURL: "http://localhost:3000",

    /**
     * Veri Serileştirme
     *
     * Seçenekler:
     * - "json": Varsayılan, güvenilir; daha fazla token tüketir.
     * - "toon": Daha az token, JSON kadar tutarlı değil.
     *
     * Varsayılan: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Derleme ve optimizasyon ayarları.
   */
  build: {
    /**
     * Derleme yürütme modu.
     * - "auto": Uygulama derlemesi sırasında otomatik derleme.
     * - "manual": Açık bir derleme komutu gerektirir.
     * Varsayılan: "auto"
     */
    mode: "auto",

    /**
     * Kullanılmayan sözlükleri kaldırarak final paketinin optimize edilip edilmeyeceği.
     * Varsayılan: Üretimde true
     */
    optimize: true,

    /**
     * Oluşturulan sözlük dosyaları için çıktı formatı.
     * Varsayılan: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Derlemenin TypeScript türlerini kontrol edip etmeyeceği.
     * Varsayılan: false
     */
    checkTypes: false,
  },

  /**
   * Logger yapılandırması.
   */
  log: {
    /**
     * Günlük kaydı seviyesi.
     * - "default": Standart günlük kaydı.
     * - "verbose": Ayrıntılı hata ayıklama günlüğü.
     * - "disabled": Günlük kaydı yok.
     * Varsayılan: "default"
     */
    mode: "default",

    /**
     * Tüm günlük mesajları için önek.
     * Varsayılan: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Sistem Yapılandırması (Gelişmiş Kullanım Durumları)
   */
  system: {
    /**
     * Yerelleştirilmiş sözlükleri saklamak için dizin.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Modül genişletme (module augmentation) dizini.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Birleştirilmemiş sözlükleri saklamak için dizin.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Sözlük türlerini saklamak için dizin.
     */
    typesDir: ".intlayer/types",

    /**
     * Ana uygulama dosyalarının saklandığı dizin.
     */
    mainDir: ".intlayer/main",

    /**
     * Yapılandırma dosyalarının saklandığı dizin.
     */
    configDir: ".intlayer/config",

    /**
     * Önbellek dosyalarının saklandığı dizin.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Derleyici Yapılandırması (Gelişmiş Kullanım Durumları)
   */
  compiler: {
    /**
     * Derleyicinin etkin olup olmayacağı.
     *
     * - false: Derleyiciyi devre dışı bırak.
     * - true: Derleyiciyi etkinleştir.
     * - "build-only": Başlangıç sürelerini hızlandırmak için geliştirme sırasında derleyiciyi atla.
     *
     * Varsayılan: false
     */
    enabled: true,

    /**
     * Çıktı dosyaları için yolu belirler. `outputDir` yerine geçer.
     *
     * - `./` yolları bileşen dizinine göre çözümlenir.
     * - `/` yolları proje köküne (`baseDir`) göre çözümlenir.
     *
     * - Yol içinde `{{locale}}` değişkeninin bulunması, dile göre ayrı sözlükler oluşturulmasını tetikler.
     *
     * Örnek:
     * ```ts
     * {
     *   // Bileşenin yanında çok dilli .content.ts dosyaları oluştur
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Şablon dizesi kullanarak eşdeğer
     * }
     * ```
     *
     * ```ts
     * {
     *   // Proje kökünde dile göre merkezileştirilmiş JSON'lar oluştur
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Şablon dizesi kullanarak eşdeğer
     * }
     * ```
     *
     * Değişken Listesi:
     *   - `fileName`: Dosya adı.
     *   - `key`: İçerik anahtarı.
     *   - `locale`: İçerik dili (locale).
     *   - `extension`: Dosya uzantısı.
     *   - `componentFileName`: Bileşen dosya adı.
     *   - `componentExtension`: Bileşen dosya uzantısı.
     *   - `format`: Sözlük formatı.
     *   - `componentFormat`: Bileşen sözlük formatı.
     *   - `componentDirPath`: Bileşen dizin yolu.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Dönüştürüldükten sonra bileşenlerin kaydedilip kaydedilmeyeceği.
     * Bu sayede derleyici uygulamayı dönüştürmek için yalnızca bir kez çalıştırılabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Oluşturulan dosyaya yalnızca içeriği ekle. Dile göre i18next veya ICU MessageFormat JSON çıktıları için yararlıdır.
     */
    noMetadata: false,

    /**
     * Sözlük anahtar öneki
     */
    dictionaryKeyPrefix: "", // Çıkarılan sözlük anahtarları için isteğe bağlı önek ekleyin
  },

  /**
   * Sözlüklerin içeriğini doğrulamak için özel şemalar.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Eklenti yapılandırması.
   */
  plugins: [],
};

export default config;
````

---

## Yapılandırma Referansı

Aşağıdaki bölümler Intlayer için mevcut olan çeşitli yapılandırma ayarlarını açıklamaktadır.

---

### Uluslararasılaştırma Yapılandırması

Mevcut diller ve uygulama için varsayılan dil de dahil olmak üzere uluslararasılaştırma ile ilgili ayarları tanımlar.

| Alan              | Açıklama                                                                             | Tür        | Varsayılan          | Örnek                | Not                                                                                                                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ | ---------- | ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Uygulamada desteklenen dillerin listesi.                                             | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                    |
| `requiredLocales` | Uygulamada gerekli olan dillerin listesi.                                            | `string[]` | `[]`                | `[]`                 | • Boşsa, `strict` modda tüm diller gereklidir.<br/>• Gerekli dillerin `locales` alanında da tanımlandığından emin olun.                                                                                                                                                                            |
| `strictMode`      | TypeScript kullanarak uluslararasılaştırılmış içeriğin sağlam uygulamalarını sağlar. | `string`   | `'inclusive'`       |                      | • `"strict"` ise: `t` fonksiyonu bildirilen her dilin tanımlanmış olmasını gerektirir — eksikse veya bildirilmemişse hata verir.<br/>• `"inclusive"` ise: Eksik diller için uyarı verir ancak bildirilmeyenlerin kullanımına izin verir.<br/>• `"loose"` ise: Mevcut herhangi bir dili kabul eder. |
| `defaultLocale`   | İstenen dil bulunamadığında geri dönüş olarak kullanılan varsayılan dil.             | `string`   | `Locales.ENGLISH`   | `'en'`               | URL'de, tanımlama bilgisinde (cookie) veya üstbilgide (header) belirtilmediğinde dili belirlemek için kullanılır.                                                                                                                                                                                  |

---

### Editör Yapılandırması

Sunucu portu ve etkinleştirme durumu dahil olmak üzere yerleşik görsel editör ayarlarını tanımlar.

| Alan                         | Açıklama                                                                                                                                                                                           | Tür                               | Varsayılan                          | Örnek                                                                                           | Not                                                                                                                                                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | Uygulamanın URL'si.                                                                                                                                                                                | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Güvenlik nedeniyle editörün kaynağını kısıtlamak için kullanılır.<br/>• `'*'` olarak ayarlanırsa, editöre herhangi bir kaynaktan erişilebilir.                                                                                           |
| `port`                       | Görsel editör sunucusu tarafından kullanılan port.                                                                                                                                                 | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                            |
| `editorURL`                  | Editör sunucusunun URL'si.                                                                                                                                                                         | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Uygulama ile etkileşime girebilecek kaynakları kısıtlamak için kullanılır.<br/>• `'*'` olarak ayarlanırsa, herhangi bir kaynaktan erişilebilir.<br/>• Port değiştirilirse veya editör farklı bir alanda barındırılıyorsa ayarlanmalıdır. |
| `cmsURL`                     | Intlayer CMS URL'si.                                                                                                                                                                               | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                            |
| `backendURL`                 | Arka uç sunucusunun URL'si.                                                                                                                                                                        | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                            |
| `enabled`                    | Uygulamanın görsel editörle etkileşime girip girmeyeceği.                                                                                                                                          | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • `false` ise editör uygulama ile etkileşime giremez.<br/>• Belirli ortamlar için devre dışı bırakmak güvenliği artırır.                                                                                                                   |
| `clientId`                   | intlayer paketlerinin oAuth2 üzerinden arka uç ile kimlik doğrulaması yapmasına olanak tanır. Erişim belirteci almak için [intlayer.org/project](https://app.intlayer.org/project) adresine gidin. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Gizli tutulmalıdır; ortam değişkenlerinde saklayın.                                                                                                                                                                                        |
| `clientSecret`               | intlayer paketlerinin oAuth2 üzerinden arka uç ile kimlik doğrulaması yapmasına olanak tanır. Erişim belirteci almak için [intlayer.org/project](https://app.intlayer.org/project) adresine gidin. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Gizli tutulmalıdır; ortam değişkenlerinde saklayın.                                                                                                                                                                                        |
| `dictionaryPriorityStrategy` | Hem yerel hem de uzak sözlükler mevcut olduğunda sözlüklere öncelik verme stratejisi.                                                                                                              | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: uzak sözlüklere yerellere göre öncelik verir.<br/>• `'local_first'`: yerellere uzaklara göre öncelik verir.                                                                                                           |
| `liveSync`                   | CMS <br/> Görsel Editör <br/> Arka Uç'ta bir değişiklik algılandığında uygulama sunucusunun içeriği anında yeniden yükleyip yüklemeyeceği.                                                         | `boolean`                         | `true`                              | `true`                                                                                          | • Bir sözlük eklendiğinde/güncellendiğinde uygulama sayfa içeriğini yeniler.<br/>• Live Sync, içeriği başka bir sunucuya taşır ve bu performansı biraz etkileyebilir.<br/>• Her ikisinin de aynı makinede barındırılması önerilir.         |
| `liveSyncPort`               | Live Sync sunucusunun portu.                                                                                                                                                                       | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                            |
| `liveSyncURL`                | Live Sync sunucusunun URL'si.                                                                                                                                                                      | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Varsayılan olarak localhost'u gösterir; uzak bir Live Sync sunucusu için değiştirilebilir.                                                                                                                                                 |

---

### Yönlendirme Yapılandırması

URL yapısı, dil saklama ve ara yazılım yönetimi dahil olmak üzere yönlendirme davranışını kontrol eden ayarlar.

| Alan       | Açıklama                                                                                                                                        | Tür                                                                                                                                                                                                          | Varsayılan             | Örnek                                                                                                                                                                                       | Not                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Dil yönetimi için URL yönlendirme modu.                                                                                                         | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) veya `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: dil başka yollarla yönetilir. `'search-params'`: `/dashboard?locale=fr` | Tanımlama bilgisi (cookie) veya dil saklama yönetimini etkilemez.                                                                                                                                                                                                                                          |
| `storage`  | İstemcide dilin saklanması için yapılandırma.                                                                                                   | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                          | Aşağıdaki Saklama Seçenekleri tablosuna bakın.                                                                                                                                                                                                                                                             |
| `basePath` | Uygulama URL'leri için temel yol.                                                                                                               | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                 | Uygulama `https://example.com/my-app` adresindeyse, basePath `'/my-app'` olur ve URL'ler `https://example.com/my-app/en` şekline dönüşür.                                                                                                                                                                  |
| `rewrite`  | Belirli yollar için varsayılan yönlendirme modunu geçersiz kılan özel URL yeniden yazma kuralları. Dinamik `[param]` parametrelerini destekler. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Aşağıdaki örneğe bakın                                                                                                                                                                      | • Yeniden yazma kuralları `mode` üzerinde önceliğe sahiptir.<br/>• Next.js ve Vite ile çalışır.<br/>• `getLocalizedUrl()` eşleşen kuralları otomatik olarak uygular.<br/>• Şuna bakın: [Özel URL Yeniden Yazmaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |

**`rewrite` Örneği**:

```typescript
routing: {
  mode: "prefix-no-default", // Geri dönüş stratejisi
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Saklama Seçenekleri

| Değer              | Not                                                                                                                                                                                                            | Açıklama                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `'cookie'`         | • GDPR uyumluluğu için uygun kullanıcı onayını aldığınızdan emin olun.<br/>• `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`) aracılığıyla özelleştirilebilir. | Dili tanımlama bilgilerinde (cookies) saklar — hem istemci hem de sunucu tarafından erişilebilir. |
| `'localStorage'`   | • Açıkça silinmedikçe süresi dolmaz.<br/>• Intlayer proxy'si buna erişemez.<br/>• `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`) aracılığıyla özelleştirilebilir.                     | Dili tarayıcıda süresiz olarak saklar — sadece istemci tarafı.                                    |
| `'sessionStorage'` | • Sekme/pencere kapatıldığında silinir.<br/>• Intlayer proxy'si buna erişemez.<br/>• `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`) aracılığıyla özelleştirilebilir.                | Dili sayfa oturumu süresince saklar — sadece istemci tarafı.                                      |
| `'header'`         | • API çağrıları için yararlıdır.<br/>• İstemci tarafı buna erişemez.<br/>• `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`) aracılığıyla özelleştirilebilir.                                  | Dili HTTP üstbilgileri (headers) üzerinden aktarır — sadece sunucu tarafı.                        |

#### Tanımlama Bilgisi (Cookie) Nitelikleri

Tanımlama bilgisi saklama alanını kullanırken, ek nitelikler yapılandırabilirsiniz:

| Alan       | Açıklama                                                  | Tür                                                   |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Tanımlama bilgisi adı. Varsayılan: `'INTLAYER_LOCALE'`    | `string`                                              |
| `domain`   | Tanımlama bilgisi alanı. Varsayılan: `undefined`          | `string`                                              |
| `path`     | Tanımlama bilgisi yolu. Varsayılan: `undefined`           | `string`                                              |
| `secure`   | HTTPS gerektirir. Varsayılan: `undefined`                 | `boolean`                                             |
| `httpOnly` | HTTP-only bayrağı. Varsayılan: `undefined`                | `boolean`                                             |
| `sameSite` | SameSite politikası.                                      | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Sona erme tarihi veya gün sayısı. Varsayılan: `undefined` | `Date` &#124; <br/> `number`                          |

#### Saklama Nitelikleri

localStorage veya sessionStorage kullanırken:

| Alan   | Açıklama                                              | Tür                                              |
| ------ | ----------------------------------------------------- | ------------------------------------------------ |
| `type` | Saklama türü.                                         | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Saklama anahtarı adı. Varsayılan: `'INTLAYER_LOCALE'` | `string`                                         |

#### Yapılandırma Örnekleri

İşte yeni v7 yönlendirme yapısı için bazı yaygın yapılandırma örnekleri:

**Temel Yapılandırma (Varsayılan)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**GDPR Uyumlu Yapılandırma**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Arama Parametresi Modu**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Özel Saklama ile Öneksiz Mod**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Dinamik Rotalar ile Özel URL Yeniden Yazma**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Yeniden yazılmayan yollar için geri dönüş
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### İçerik Yapılandırması

Dizin adları, dosya uzantıları ve türetilmiş yapılandırmalar dahil olmak üzere uygulama içindeki içeriğin nasıl yönetileceği ile ilgili ayarlar.

| Alan             | Açıklama                                                                                                           | Tür        | Varsayılan                                                                                                                                                                | Örnek                                                                                                                                                                                 | Not                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | Intlayer'ın sözlükleri yeniden oluşturmak için içerik bildirim dosyalarındaki değişiklikleri izleyip izlemeyeceği. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                  |
| `fileExtensions` | Sözlükleri derlerken taranacak dosya uzantıları.                                                                   | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Özelleştirme çatışmaları önlemeye yardımcı olabilir.                                                                                             |
| `contentDir`     | İçerik tanımlama dosyalarının (`.content.*`) saklandığı dizin yolu.                                                | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | İçerik dosyalarını izlemek ve sözlükleri yeniden oluşturmak için kullanılır.                                                                     |
| `codeDir`        | Kodun saklandığı temel dizine göre dizin yolu.                                                                     | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Dönüşüm (budama, optimizasyon) için kod dosyalarını izlemek için kullanılır.<br/>• `contentDir`den ayırmak performansı artırabilir.            |
| `excludedPath`   | İçerik taramasından hariç tutulan dizinler.                                                                        | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Henüz kullanılmıyor; gelecekteki uygulama için planlandı.                                                                                        |
| `formatCommand`  | Intlayer onları yerel olarak yazarken içerik dosyalarını biçimlendirme komutu.                                     | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` dosya yolu ile değiştirilecektir.<br/>• Tanımlanmazsa, Intlayer bunu otomatik olarak algılar (prettier, biome, eslint'i test eder). |

---

### Sözlük Yapılandırması

Otomatik doldurma davranışı ve içerik oluşturma dahil olmak üzere sözlük işlemlerini kontrol eden parametreler.

| Alan                        | Açıklama                                                                                                                                                                    | Tür                                                                                                             | Varsayılan           | Örnek                                                                                       | Not                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Otomatik doldurma (yapay zeka çevirisi) çıktı dosyalarının nasıl oluşturulacağını kontrol eder.                                                                             | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`               | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: varsayılan yol (kaynakla aynı dosya).<br/>• `false`: devredışı.<br/>• Dize/fonksiyon kalıbı dil başına dosyalar oluşturur.<br/>• Dil başına nesne: her dil kendi kalıbına karşılık gelir; `false` o dili yok sayar.<br/>• `{{locale}}` eklemek dil başına oluşturmayı tetikler.<br/>• Sözlük düzeyindeki `fill` her zaman bu genel ayardan önceliklidir.                                                                     |
| `description`               | Editörün ve CMS'in sözlüğün amacını anlamasına yardımcı olur. Yapay zeka destekli çeviri oluşturma için bağlam olarak da kullanılır.                                        | `string`                                                                                                        | `undefined`          | `'Kullanıcı profili bölümü'`                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `locale`                    | Sözlüğü dil başına bir formata dönüştürür. Bildirilen her alan bir çeviri düğümü olur. Yoksa, sözlük çok dilli olarak kabul edilir.                                         | `LocalesValues`                                                                                                 | `undefined`          | `'en'`                                                                                      | Birden fazla dil için çeviriler içermek yerine sözlük belirli bir dil için olduğunda bunu kullanın.                                                                                                                                                                                                                                                                                                                                    |
| `contentAutoTransformation` | İçerik dizelerini otomatik olarak tiplendirilmiş düğümlere (markdown, HTML veya ekleme) dönüştürür.                                                                         | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`              | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Ekleme : `Merhaba {{name}}` → `insert('Merhaba {{name}}')`.                                                                                                                                                                                                                                                          |
| `location`                  | Sözlük dosyalarının nerede saklandığını ve CMS ile nasıl senkronize edildiğini belirtir.                                                                                    | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`            | `'hybrid'`                                                                                  | • `'local'`: sadece yerel olarak yönetilir.<br/>• `'remote'`: sadece uzaktan yönetilir (CMS).<br/>• `'hybrid'`: hem yerel hem de uzaktan yönetilir.<br/>• `'plugin'` veya özel dize: bir eklenti veya özel bir kaynak tarafından yönetilir.                                                                                                                                                                                            |
| `importMode`                | Sözlüklerin nasıl içe aktarılacağını kontrol eder.                                                                                                                          | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`           | `'dynamic'`                                                                                 | • `'static'`: statik olarak içe aktarılır.<br/>• `'dynamic'`: Suspense kullanılarak dinamik olarak içe aktarılır.<br/>• `'fetch'`: Live Sync API aracılığıyla getirilir; başarısız olursa `'dynamic'`e geri döner.<br/>• `@intlayer/babel` ve `@intlayer/swc` eklentilerini gerektirir.<br/>• Anahtarlar statik olarak bildirilmelidir.<br/>• `optimize` kapalıysa yok sayılır.<br/>• `getIntlayer`, `getDictionary` vb.'ni etkilemez. |
| `priority`                  | Sözlüğün önceliği. Sözlükler arasındaki çatışmaları çözerken yüksek değerler düşük değerleri yener.                                                                         | `number`                                                                                                        | `undefined`          | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `live`                      | Kullanımdan kaldırıldı — bunun yerine `importMode: 'fetch'` kullanın. Sözlük içeriğinin Live Sync API aracılığıyla dinamik olarak getirilip getirilmeyeceğini belirtiyordu. | `boolean`                                                                                                       | `undefined`          |                                                                                             | v8.0.0'da `importMode: 'fetch'` olarak yeniden adlandırıldı.                                                                                                                                                                                                                                                                                                                                                                           |
| `schema`                    | JSON şema doğrulaması için Intlayer tarafından otomatik olarak oluşturulur.                                                                                                 | `'https://intlayer.org/schema.json'`                                                                            | otomatik oluşturulur |                                                                                             | Manuel olarak düzenlemeyin.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `title`                     | Editörde ve CMS'de sözlüğü tanımlamaya yardımcı olur.                                                                                                                       | `string`                                                                                                        | `undefined`          | `'Kullanıcı Profili'`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tags`                      | Sözlükleri kategorize eder ve editör ile yapay zeka için bağlam veya talimatlar sağlar.                                                                                     | `string[]`                                                                                                      | `undefined`          | `['kullanıcı', 'profil']`                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `version`                   | Uzak sözlüğün sürümü; şu anda kullanılan sürümün izlenmesine yardımcı olur.                                                                                                 | `string`                                                                                                        | `undefined`          | `'1.0.0'`                                                                                   | • CMS'de yönetilebilir.<br/>• Yerel olarak düzenlemeyin.                                                                                                                                                                                                                                                                                                                                                                               |

**`fill` Örneği**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Logger Yapılandırması

Intlayer'dan gelen günlük çıkışını özelleştirmek için parametreler.

| Alan     | Açıklama                    | Tür                                                            | Varsayılan      | Örnek              | Not                                                                                                                           |
| -------- | --------------------------- | -------------------------------------------------------------- | --------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | Logger modunu belirtir.     | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: hata ayıklama için daha fazla bilgi günlüğe kaydeder.<br/>• `'disabled'`: logger'ı tamamen devre dışı bırakır. |
| `prefix` | Günlük mesajları için önek. | `string`                                                       | `'[intlayer] '` | `'[özel öneğim] '` |                                                                                                                               |

---

### Yapay Zeka (AI) Yapılandırması

Sağlayıcı, model ve API anahtarı dahil olmak üzere Intlayer'ın yapay zeka özelliklerini kontrol eden ayarlar.

Bir erişim anahtarı ile [Intlayer Dashboard](https://app.intlayer.org/project)'a kayıtlıysanız bu yapılandırma isteğe bağlıdır. Intlayer, ihtiyaçlarınız için en verimli ve uygun maliyetli yapay zeka çözümünü otomatik olarak yönetecektir. Varsayılan seçeneklerin kullanılması, Intlayer en ilgili modelleri kullanmak üzere sürekli güncellendiğinden daha iyi uzun vadeli bakılabilirlik sağlar.

Kendi API anahtarınızı veya belirli bir modeli kullanmayı tercih ederseniz, özel yapay zeka yapılandırmanızı tanımlayabilirsiniz.
Bu yapay zeka yapılandırması, Intlayer ortamınızda küresel olarak kullanılacaktır. CLI komutları, `fill` gibi komutlar için varsayılan olarak bu ayarları kullanacaktır; aynı şekilde SDK, Görsel Editör ve CMS de öyle. Komut parametreleri aracılığıyla belirli kullanım durumları için bu varsayılan değerleri geçersiz kılabilirsiniz.

Intlayer, maksimum esneklik için birden fazla yapay zeka sağlayıcısını destekler. Şu anda desteklenen sağlayıcılar şunlardır:

- **OpenAI** (Varsayılan)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Alan                 | Açıklama                                                                                                                                    | Tür                                                                                                                                                                                                                                                                                                                                                                                            | Varsayılan  | Örnek                                                         | Not                                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Intlayer yapay zeka özellikleri için kullanılacak sağlayıcı.                                                                                | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Farklı sağlayıcılar farklı API anahtarları gerektirir ve farklı fiyatlandırmalara sahiptir.                                                                                                  |
| `model`              | Yapay zeka özellikleri için kullanılacak model.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Yok         | `'gpt-4o-2024-11-20'`                                         | Belirli model sağlayıcıya göre değişir.                                                                                                                                                      |
| `temperature`        | Yapay zeka yanıtlarının rastgeleliğini kontrol eder.                                                                                        | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Yok         | `0.1`                                                         | Daha yüksek sıcaklık = daha yaratıcı ve daha az tahmin edilebilir.                                                                                                                           |
| `apiKey`             | Seçilen sağlayıcı için API anahtarınız.                                                                                                     | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Yok         | `process.env.OPENAI_API_KEY`                                  | Gizli tutulmalıdır; ortam değişkenlerinde saklayın.                                                                                                                                          |
| `applicationContext` | Yapay zekanın daha doğru çeviriler üretmesine yardımcı olmak için uygulamanız hakkında ek bağlam (alan adı, hedef kitle, ton, terminoloji). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Yok         | `'Kendi uygulama bağlamım'`                                   | Kurallar eklemek için kullanılabilir (örneğin: `"URL'leri dönüştürmemelisiniz"`).                                                                                                            |
| `baseURL`            | Yapay zeka API'si için temel URL.                                                                                                           | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Yok         | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Yerel veya özel bir yapay zeka API uç noktasına işaret edebilir.                                                                                                                             |
| `dataSerialization`  | Yapay zeka özellikleri için veri serileştirme formatı.                                                                                      | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: varsayılan, güvenilir; daha fazla token kullanır.<br/>• `'toon'`: daha az token, daha az tutarlı.<br/>• Modele bağlam olarak ek parametreler iletilir (akıl yürütme çabası vb.). |

---

### Derleme (Build) Yapılandırması

Intlayer'ın uygulamanızın uluslararasılaştırılmasını nasıl optimize ettiğini ve derlediğini kontrol eden parametreler.

Derleme seçenekleri `@intlayer/babel` ve `@intlayer/swc` eklentileri için geçerlidir.

> Geliştirme modunda Intlayer, geliştirme deneyimini basitleştirmek için sözlükler için statik içe aktarmalar kullanır.

> Optimizasyon sırasında Intlayer, yığınlamayı (chunking) optimize etmek için sözlük çağrılarını değiştirecektir, böylece final paketi yalnızca gerçekte kullanılan sözlükleri içe aktaracaktır.

| Alan              | Açıklama                                                                                                          | Tür                              | Varsayılan                                                                                                                                                                        | Örnek                                                                         | Not                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Derleme modunu kontrol eder.                                                                                      | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: uygulama derlemesi sırasında derleme otomatik olarak tetiklenir.<br/>• `'manual'`: yalnızca derleme komutu açıkça çağrıldığında yürütülür.<br/>• Sözlük derlemelerini devre dışı bırakmak için kullanılabilir (örneğin Node.js ortamlarında yürütmeyi durdurmak için).                                                          |
| `optimize`        | Derlemenin optimize edilip edilmeyeceğini kontrol eder.                                                           | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Tanımlanmazsa, optimizasyon framework derlemesinde (Vite/Next.js) tetiklenir.<br/>• `true` ise geliştirme modunda bile optimizasyonu zorlar.<br/>• `false` ise devre dışı bırakır.<br/>• Etkinse, yığınlamayı optimize etmek için sözlük çağrılarını yer değiştirir.<br/>• `@intlayer/babel` ve `@intlayer/swc` eklentilerini gerektirir. |
| `checkTypes`      | Derlemenin TypeScript türlerini kontrol edip etmeyeceğini ve hataları günlüğe kaydedip kaydetmeyeceğini belirtir. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Derleme sürecini yavaşlatabilir.                                                                                                                                                                                                                                                                                                            |
| `outputFormat`    | Sözlüklerin çıktı formatını kontrol eder.                                                                         | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                             |
| `traversePattern` | Optimizasyon sırasında hangi dosyaların taranacağını tanımlayan kalıplar.                                         | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Derleme performansını artırmak için optimizasyonu ilgili dosyalarla sınırlayın.<br/>• `optimize` kapalıysa yok sayılır.<br/>• Glob kalıplarını kullanır.                                                                                                                                                                                  |

---

### Sistem Yapılandırması

Bu ayarlar gelişmiş kullanım durumları ve Intlayer'ın dahili yapılandırması içindir.

| Alan                      | Açıklama                                     | Tür      | Varsayılan                        | Örnek | Not |
| ------------------------- | -------------------------------------------- | -------- | --------------------------------- | ----- | --- |
| `dictionariesDir`         | Derlenmiş sözlükler için dizin.              | `string` | `'.intlayer/dictionary'`          |       |     |
| `moduleAugmentationDir`   | TypeScript modül genişletme dizini.          | `string` | `'.intlayer/types'`               |       |     |
| `unmergedDictionariesDir` | Birleştirilmemiş sözlükler için dizin.       | `string` | `'.intlayer/unmerged_dictionary'` |       |     |
| `typesDir`                | Oluşturulan türler için dizin.               | `string` | `'.intlayer/types'`               |       |     |
| `mainDir`                 | Intlayer ana dosyası için dizin.             | `string` | `'.intlayer/main'`                |       |     |
| `configDir`               | Derlenmiş yapılandırma dosyaları için dizin. | `string` | `'.intlayer/config'`              |       |     |
| `cacheDir`                | Önbellek dosyaları için dizin.               | `string` | `'.intlayer/cache'`               |       |     |

---

### Derleyici Yapılandırması

Sözlükleri doğrudan bileşenlerinizden çıkaran Intlayer derleyicisini kontrol eden ayarlar.

| Alan                  | Açıklama                                                                                                                                                                                                                                                                                                                 | Tür                                                                                                             | Varsayılan  | Örnek                                                                                                                                                    | Not                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Sözlüklerin çıkarılması için derleyicinin etkinleştirilip etkinleştirilmeyeceği.                                                                                                                                                                                                                                         | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'`, başlangıç sürelerini hızlandırmak için geliştirme sırasında derleyiciyi atlar; yalnızca derleme komutlarında yürütülür.                                            |
| `dictionaryKeyPrefix` | Çıkarılan sözlük anahtarları için önek.                                                                                                                                                                                                                                                                                  | `string`                                                                                                        | `''`        | `'özel-önekim-'`                                                                                                                                         | Çatışmaları önlemek için (dosya adına dayalı) oluşturulan anahtara eklenir.                                                                                                        |
| `saveComponents`      | Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceği.                                                                                                                                                                                                                                                         | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • `true` ise, orijinal dosyaları dönüştürülmüş sürümleriyle değiştirir.<br/>• Derleyici bir çalıştırmadan sonra kaldırılabilir.                                                    |
| `output`              | Çıktı dosyaları için yolu belirler. `outputDir` yerine geçer. Şablon değişkenlerini destekler: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` yolları bileşen dizinine göre çözümlenir.<br/>• `/` yolları köke göredir.<br/>• `{{locale}}` dil başına oluşturmayı tetikler.<br/>• Dil başına nesne notasyonunu destekler. |
| `noMetadata`          | `true` ise, derleyici sözlük meta verilerini (anahtar, içerik sarmalayıcı) çıktıdan çıkarır.                                                                                                                                                                                                                             | `boolean`                                                                                                       | `false`     | `false` → `{"key":"anahtarım","content":{"key":"değer"}}` <br/> `true` → `{"key":"değer"}`                                                               | • i18next veya ICU MessageFormat JSON çıktıları için yararlıdır.<br/>• `loadJSON` eklentisi ile iyi çalışır.                                                                       |
| `dictionaryKeyPrefix` | Sözlük anahtar öneki                                                                                                                                                                                                                                                                                                     | `string`                                                                                                        | `''`        |                                                                                                                                                          | Çıkarılan sözlük anahtarları için isteğe bağlı önek ekleyin                                                                                                                        |

---

### Özel Şemalar (Custom Schemas)

| Alan      | Açıklama                                                                          | Tür                         |
| --------- | --------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Sözlüklerinizin yapısını doğrulamak için Zod şemaları tanımlamanıza olanak tanır. | `Record<string, ZodSchema>` |

---

### Eklentiler (Plugins)

| Alan      | Açıklama                                           | Tür                |
| --------- | -------------------------------------------------- | ------------------ |
| `plugins` | Etkinleştirilecek Intlayer eklentilerinin listesi. | `IntlayerPlugin[]` |
