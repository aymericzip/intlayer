---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Yapılandırma (Configuration)
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
  - version: 8.4.0
    date: 2026-03-20
    changes: 'compiler.output' ve 'dictionary.fill' için her dil için nesne notasyonu eklendi
  - version: 8.3.0
    date: 2026-03-11
    changes: 'baseDir', 'content' yapılandırmasından 'system' yapılandırmasına taşındı
  - version: 8.2.0
    date: 2026-03-09
    changes: Derleyici (compiler) seçenekleri güncellendi, 'output' ve 'noMetadata' desteği eklendi
  - version: 8.1.7
    date: 2026-02-25
    changes: Derleyici seçenekleri güncellendi
  - version: 8.1.5
    date: 2026-02-23
    changes: Derleyici seçeneği 'build-only' ve sözlük öneki eklendi
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face ve Together.ai sağlayıcıları için destek eklendi
  - version: 8.0.5
    date: 2026-02-06
    changes: Yapay zeka yapılandırmasına `dataSerialization` eklendi
  - version: 8.0.0
    date: 2026-01-24
    changes: Temel mekanizmayı daha iyi tanımlamak için `live` içe aktarma modu `fetch` olarak yeniden adlandırıldı.
  - version: 8.0.0
    date: 2026-01-22
    changes: Derleme yapılandırması `importMode`, `dictionary` yapılandırmasına taşındı.
  - version: 8.0.0
    date: 2026-01-22
    changes: Yönlendirme yapılandırmasına `rewrite` seçeneği eklendi
  - version: 8.0.0
    date: 2026-01-18
    changes: Sistem yapılandırması içerik yapılandırmasından ayrıldı. Dahili yollar `system` özelliğine taşındı. İçerik dosyalarını ve kod dönüşümünü ayırmak için `codeDir` eklendi.
  - version: 8.0.0
    date: 2026-01-18
    changes: Sözlük seçenekleri `location` ve `schema` eklendi
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 ve JSONC dosya formatları için destek eklendi
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` seçeneği eklendi
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` yapılandırması eklendi
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware`, yönlendirme yapılandırması `routing` ile değiştirildi
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` seçeneği eklendi
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` seçeneği güncellendi
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` seçeneği eklendi
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` alanı ve `i18nextResourcesDir` alanı kaldırıldı
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` içe aktarma modu eklendi
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` alanı `liveSync` ile değiştirildi ve `liveSyncPort` ve `liveSyncURL` alanları eklendi
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport`, `importMode` seçeneği ile değiştirildi
  - version: 5.6.0
    date: 2025-07-13
    changes: Varsayılan contentDir `['src']` yerine `['.']` olarak değiştirildi
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` komutları eklendi
---

# Intlayer Yapılandırma Belgeleri

## Genel Bakış

Intlayer yapılandırma dosyaları, eklentinin uluslararasılaştırma (internationalization), ara yazılım (middleware) ve içerik işleme gibi çeşitli yönlerini özelleştirmenize olanak tanır. Bu belge, yapılandırmadaki her bir özelliğin derinlemesine açıklamasını sağlar.

---

## İçindekiler

<TOC/>

---

## Desteklenen Yapılandırma Dosyası Formatları

Intlayer JSON, JS, MJS ve TS yapılandırma dosyası formatlarını kabul eder:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Yapılandırma Dosyası Örneği

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Mevcut tüm seçenekleri gösteren Intlayer yapılandırma dosyası örneği.
 */
const config: IntlayerConfig = {
  /**
   * Uluslararasılaştırma ayarları yapılandırması.
   */
  internationalization: {
    /**
     * Uygulamada desteklenen dillerin (locales) listesi.
     * Varsayılan: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Her sözlükte tanımlanması gereken zorunlu dillerin listesi.
     * Boşsa, `strict` modunda tüm diller zorunludur.
     * Varsayılan: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Uluslararasılaştırılmış içerik için katılik düzeyi.
     * - "strict": Bildirilen herhangi bir dil eksikse veya bildirilmemişse hata verir.
     * - "inclusive": Bildirilen bir dil eksikse uyarı verir.
     * - "loose": Mevcut olan her dili kabul eder.
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
     * - "fetch": Live Sync API aracılığıyla dinamik olarak çekilir.
     * Varsayılan: "static"
     */
    importMode: "static",

    /**
     * Yapay zeka kullanarak eksik çevirileri otomatik olarak doldurma stratejisi.
     * Mantıksal bir değer veya doldurulan içeriği kaydetmek için bir yol deseni olabilir.
     * Varsayılan: true
     */
    fill: true,

    /**
     * Sözlük dosyalarının fiziksel konumu.
     * - "local": Yerel dosya sisteminde saklanır.
     * - "remote": Intlayer CMS'te saklanır.
     * - "hybrid": Hem yerel hem de Intlayer CMS'te saklanır.
     * - "plugin" (veya herhangi bir özel dize): Bir eklenti veya özel kaynak tarafından sağlanır.
     * Varsayılan: "local"
     */
    location: "local",

    /**
     * İçeriğin otomatik olarak dönüştürülüp dönüştürülmeyeceği (ör. Markdown'dan HTML'e).
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
     * - "prefix-no-default": Varsayılan dışındaki herkese ön ek ekler (ör. /dashboard, /fr/dashboard).
     * - "prefix-all": Tüm dillere ön ek ekler (ör. /en/dashboard, /fr/dashboard).
     * - "no-prefix": URL'de dil yok.
     * - "search-params": ?locale=... kullanır
     * Varsayılan: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Kullanıcı tarafından seçilen dilin nerede saklanacağı.
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
     * Dil bazlı belirli yollar için özel URL yeniden yazma (rewrite) kuralları.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * İçerik dosyası bulma ve işleme ile ilgili ayarlar.
   */
  content: {
    /**
     * Sözlükleri taramak için dosya uzantıları.
     * Varsayılan: ['.content.ts', '.content.js', '.content.json', vb.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content dosyalarının bulunduğu dizinler.
     * Varsayılan: ["."]
     */
    contentDir: ["src"],

    /**
     * Kaynak kodun bulunduğu yer.
     * Derleme optimizasyonu ve kod dönüşümü için kullanılır.
     * Varsayılan: ["."]
     */
    codeDir: ["src"],

    /**
     * Taramadan hariç tutulan desenler.
     * Varsayılan: ['node_modules', '.intlayer', vb.]
     */
    excludedPath: ["node_modules"],

    /**
     * Geliştirme sırasında değişikliklerin izlenip izlenmeyeceği ve sözlüklerin yeniden oluşturulup oluşturulmayacağı.
     * Varsayılan: Geliştirme ortamında true
     */
    watch: true,

    /**
     * Yeni oluşturulan / güncellenen .content dosyalarını biçimlendirmek için kullanılan komut.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Görsel Düzenleyici (Visual Editor) yapılandırması.
   */
  editor: {
    /**
     * Görsel düzenleyicinin etkin olup olmadığı.
     * Varsayılan: false
     */
    enabled: true,

    /**
     * Kaynak doğrulama (origin validation) için uygulamanızın URL'si.
     * Varsayılan: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Yerel düzenleyici sunucusu için bağlantı noktası.
     * Varsayılan: 8000
     */
    port: 8000,

    /**
     * Düzenleyici için genel URL.
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
   * Yapay zeka tabanlı çeviri ve oluşturma ayarları.
   */
  ai: {
    /**
     * Kullanılacak yapay zeka sağlayıcısı.
     * Seçenekler: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Varsayılan: 'openai'
     */
    provider: "openai",

    /**
     * Kullanılacak seçili sağlayıcının modeli.
     */
    model: "gpt-4o",

    /**
     * Sağlayıcı API anahtarı.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Çeviriler oluşturulurken yapay zekayı yönlendirmek için genel bağlam.
     */
    applicationContext: "Bu bir gezi rezervasyon uygulamasıdır.",

    /**
     * Yapay zeka API'si için temel yol URL'si.
     */
    baseURL: "http://localhost:3000",

    /**
     * Veri Serileştirme (Data Serialization)
     *
     * Seçenekler:
     * - "json": Varsayılan, sağlam; daha fazla belirteç tüketir.
     * - "toon": Daha az belirteç tüketir, JSON kadar tutarlı olmayabilir.
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
     * - "auto": Uygulama derlemesi sırasında otomatik olarak derlenir.
     * - "manual": Açık bir derleme komutu gerektirir.
     * Varsayılan: "auto"
     */
    mode: "auto",

    /**
     * Kullanılmayan sözlükleri kaldırarak nihai paketi optimize edip etmeyeceği.
     * Varsayılan: Üretim ortamında true
     */
    optimize: true,

    /**
     * Oluşturulan sözlük dosyaları için çıktı formatı.
     * Varsayılan: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Derlemenin TypeScript türlerini (types) kontrol edip etmeyeceğini belirtir.
     * Varsayılan: false
     */
    checkTypes: false,
  },

  /**
   * Günlükçü (Logger) yapılandırması.
   */
  log: {
    /**
     * Günlükleme düzeyi.
     * - "default": Standart günlükleme.
     * - "verbose": Derinlemesine hata ayıklama günlüğü.
     * - "disabled": Günlüklemeyi devre dışı bırakır.
     * Varsayılan: "default"
     */
    mode: "default",

    /**
     * Tüm günlük mesajları için ön ek.
     * Varsayılan: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Sistem yapılandırması (Gelişmiş kullanım için)
   */
  system: {
    /**
     * Yerelleştirilmiş sözlükleri saklamak için dizin.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript modül genişletme (module augmentation) için dizin.
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
   * Derleyici (Compiler) yapılandırması (Gelişmiş kullanım için)
   */
  compiler: {
    /**
     * Derleyicinin etkin olup olmayacağını belirtir.
     *
     * - false: Derleyiciyi devre dışı bırakır.
     * - true: Derleyiciyi etkinleştirir.
     * - "build-only": Geliştirme sırasında derleyiciyi atlar ve başlatma süresini hızlandırır.
     *
     * Varsayılan: false
     */
    enabled: true,

    /**
     * Çıktı dosyaları için yolu tanımlar. `outputDir`'in yerini alır.
     *
     * - `./` ile başlayan yollar bileşen dizinine göre çözümlenir.
     * - `/` ile başlayan yollar proje köküne (`baseDir`) göre çözümlenir.
     *
     * - Yola `{{locale}}` değişkenini dahil etmek, her dil için ayrı sözlüklerin oluşturulmasını tetikleyecektir.
     *
     * Örnek:
     * ```ts
     * {
     *   // Bileşenin yanında çok dilli .content.ts dosyaları oluşturun
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Şablon dizesi kullanarak eşdeğer
     * }
     * ```
     *
     * ```ts
     * {
     *   // Proje kökünde dil başına merkezi JSON'lar oluşturun
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Şablon dizesi kullanarak eşdeğer
     * }
     * ```
     *
     * Değişken listesi:
     *   - `fileName`: Dosya adı.
     *   - `key`: İçerik anahtarı (key).
     *   - `locale`: İçerik dili.
     *   - `extension`: Dosya uzantısı.
     *   - `componentFileName`: Bileşen dosya adı.
     *   - `componentExtension`: Bileşen dosya uzantısı.
     *   - `format`: Sözlük formatı.
     *   - `componentFormat`: Bileşen sözlük formatı.
     *   - `componentDirPath`: Bileşen dizin yolu.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Bileşenlerin dönüştürüldükten sonra kaydedilip kaydedilmeyeceğini belirtir.
     * Bu şekilde, derleyici uygulamanızı dönüştürmek için yalnızca bir kez çalışabilir ve ardından kaldırılabilir.
     */
    saveComponents: false,

    /**
     * Oluşturulan dosyaya yalnızca içeriği ekler. i18next veya ICU MessageFormat formatı için dil başına JSON çıktısı için yararlıdır.
     */
    noMetadata: false,

    /**
     * Sözlük anahtarı ön eki
     */
    dictionaryKeyPrefix: "", // Ayıklanan sözlük anahtarlarına isteğe bağlı bir ön ek ekleyin
  },

  /**
   * Sözlük içeriğini doğrulamak için özel şemalar (Schemas).
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

## Yapılandırma Referansı (Configuration Reference)

Aşağıdaki bölümler, Intlayer'da mevcut olan çeşitli yapılandırma seçeneklerini açıklamaktadır.

---

### Uluslararasılaştırma Yapılandırması (Internationalization Configuration)

Uygulama için mevcut diller ve varsayılan dil dahil olmak üzere uluslararasılaştırma ile ilgili ayarları tanımlar.

| Alan              | Tür        | Açıklama                                                                                                                       | Örnek                | Not                                                                                                                                                                                                                                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Uygulamada destekleyen dillerin listesi. Varsayılan: `[Locales.ENGLISH]`                                                       | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                            |
| `requiredLocales` | `string[]` | Uygulamada gerekli dillerin listesi. Varsayılan: `[]`                                                                          | `[]`                 | Boşsa, `strict` modunda tüm diller gereklidir. Gerekli dillerin `locales` alanında da tanımlandığından emin olun.                                                                                                                                                          |
| `strictMode`      | `string`   | TypeScript kullanımı yoluyla uluslararasılaştırılmış içeriğin sağlam bir şekilde uygulanmasını sağlar. Varsayılan: `inclusive` |                      | `"strict"` ise: `t` fonksiyonu bildirilen her dilin tanımlanmasını gerektirir — herhangi biri eksikse veya bildirilmemişse hata verir. `"inclusive"` ise: eksik diller için uyarır ancak bildirilmeyen dilleri kabul eder. `"loose"` ise: mevcut olan her dili kabul eder. |
| `defaultLocale`   | `string`   | İstenen dil bulunamadığında geri dönüş olarak kullanılan varsayılan dil. Varsayılan: `Locales.ENGLISH`                         | `'en'`               | URL'de, tanımlama bilgisinde veya başlıkta belirtilmediğinde dili belirlemek için kullanılır.                                                                                                                                                                              |

---

### Düzenleyici Yapılandırması (Editor Configuration)

Sunucu bağlantı noktası ve etkinlik durumu dahil olmak üzere entegre düzenleyici ile ilgili ayarları tanımlar.

| Alan                         | Tür                       | Açıklama                                                                                                                                                                                                                        | Örnek                                                                                 | Not                                                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | Uygulamanızın URL'si. Varsayılan: `''`                                                                                                                                                                                          | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Güvenlik nedenleriyle düzenleyicinin kaynaklarını (origins) kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, düzenleyiciye herhangi bir kaynaktan erişilebilir.                                                                                                |
| `port`                       | `number`                  | Görsel Düzenleyici sunucusu tarafından kullanılan bağlantı noktası. Varsayılan: `8000`                                                                                                                                          |                                                                                       |                                                                                                                                                                                                                                                                     |
| `editorURL`                  | `string`                  | Düzenleyici sunucu URL'si. Varsayılan: `'http://localhost:8000'`                                                                                                                                                                | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Uygulama ile etkileşime girebilen kaynakları kısıtlamak için kullanılır. `'*'` olarak ayarlanırsa, herhangi bir kaynaktan erişilebilir. Bağlantı noktasını değiştirirseniz veya düzenleyici başka bir alanda barındırılıyorsa ayarlanmalıdır.                       |
| `cmsURL`                     | `string`                  | Intlayer CMS URL'si. Varsayılan: `'https://intlayer.org'`                                                                                                                                                                       | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                                     |
| `backendURL`                 | `string`                  | Arka uç sunucu URL'si. Varsayılan: `https://back.intlayer.org`                                                                                                                                                                  | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                                     |
| `enabled`                    | `boolean`                 | Uygulamanın görsel düzenleyici ile etkileşime girip girmeyeceğini belirtir. Varsayılan: `true`                                                                                                                                  | `process.env.NODE_ENV !== 'production'`                                               | `false` ise, düzenleyici uygulama ile etkileşime giremez. Belirli ortamlar için devre dışı bırakılması güvenliği artırır.                                                                                                                                           |
| `clientId`                   | `string &#124; undefined` | oAuth2 kullanarak arka uçla kimlik doğrulaması yapmak için intlayer paketlerini etkinleştirir. Bir erişim belirteci almak için [intlayer.org/project](https://app.intlayer.org/project) adresine gidin. Varsayılan: `undefined` |                                                                                       | Gizli tutun; ortam değişkenlerinde saklayın.                                                                                                                                                                                                                        |
| `clientSecret`               | `string &#124; undefined` | oAuth2 kullanarak arka uçla kimlik doğrulaması yapmak için intlayer paketlerini etkinleştirir. Bir erişim belirteci almak için [intlayer.org/project](https://app.intlayer.org/project) adresine gidin. Varsayılan: `undefined` |                                                                                       | Gizli tutun; ortam değişkenlerinde saklayın.                                                                                                                                                                                                                        |
| `dictionaryPriorityStrategy` | `string`                  | Hem yerel hem de uzak sözlükler mevcut olduğunda sözlük önceliklendirme stratejisi. Varsayılan: `'local_first'`                                                                                                                 | `'distant_first'`                                                                     | `'distant_first'`: Uzak sözlüklere yerel olanlara göre öncelik verir. `'local_first'`: Yerel sözlüklere uzak olanlara göre öncelik verir.                                                                                                                           |
| `liveSync`                   | `boolean`                 | CMS / Görsel Düzenleyici / Arka Uçta bir değişiklik algılandığında uygulama sunucusunun içeriği sıcak olarak yeniden yükleyip yüklemeyeceğini belirtir. Varsayılan: `true`                                                      | `true`                                                                                | Bir sözlük eklendiğinde/güncellendiğinde uygulama sayfa içeriğini günceller. Canlı senkronizasyon (live sync), içeriği başka bir sunucuya dış kaynaklardan aktarır ve bu da performansı biraz etkileyebilir. Her ikisinin de aynı makinede barındırılması önerilir. |
| `liveSyncPort`               | `number`                  | Canlı senkronizasyon sunucu bağlantı noktası. Varsayılan: `4000`                                                                                                                                                                | `4000`                                                                                |                                                                                                                                                                                                                                                                     |
| `liveSyncURL`                | `string`                  | Canlı senkronizasyon sunucu URL'si. Varsayılan: `'http://localhost:{liveSyncPort}'`                                                                                                                                             | `'https://example.com'`                                                               | Varsayılan olarak localhost'u gösterir; uzak bir canlı senkronizasyon sunucusuna değiştirilebilir.                                                                                                                                                                  |

### Yönlendirme Yapılandırması (Routing Configuration)

URL yapısı, dil depolama ve ara yazılım işleme dahil olmak üzere yönlendirme davranışını kontrol eden ayarlar.

| Alan       | Tür                                                                                                                                                  | Açıklama                                                                                                                                                              | Örnek                                                                                                                                                                                              | Not                                                                                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Dil işleme için URL yönlendirme modu. Varsayılan: `'prefix-no-default'`                                                                                               | `'prefix-no-default'`: `/dashboard` (en) veya `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: dil başka yollarla işlenir. `'search-params'`: `/dashboard?locale=fr` kullanır | Tanımlama bilgisi veya dil depolama yönetimini etkilemez.                                                                                                                                                                                                                                 |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Dili istemcide saklamak için yapılandırma. Varsayılan: `['cookie', 'header']`                                                                                         | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                      | Aşağıdaki Depolama Seçenekleri tablosuna bakın.                                                                                                                                                                                                                                           |
| `basePath` | `string`                                                                                                                                             | Uygulama URL'leri için temel yol. Varsayılan: `''`                                                                                                                    | `'/my-app'`                                                                                                                                                                                        | Uygulama `https://example.com/my-app` üzerindeyse, basePath `'/my-app'` olur ve URL'ler `https://example.com/my-app/en` gibi olur.                                                                                                                                                        |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Belirli yollar için varsayılan yönlendirme modunu geçersiz kılan özel URL yeniden yazma kuralları. Dinamik parametreleri `[param]` destekler. Varsayılan: `undefined` | Aşağıdaki örneğe bakın                                                                                                                                                                             | Yeniden yazma kuralları `mode` üzerinde önceliğe sahiptir. Next.js ve Vite ile çalışır. `getLocalizedUrl()` eşleşen kuralları otomatik olarak uygular. [Özel URL Yeniden Yazmaları](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/custom_url_rewrites.md) konusuna bakın. |

**`rewrite` örneği**:

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

#### Depolama Seçenekleri (Storage Options)

| Değer              | Açıklama                                                                                | Not                                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Dili tanımlama bilgilerinde saklar — hem istemci hem de sunucu tarafından erişilebilir. | GDPR uyumluluğu için uygun kullanıcı onayının alındığından emin olun. `CookiesAttributes` aracılığıyla özelleştirilebilir (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Dili son kullanma tarihi olmadan tarayıcıda saklar — yalnızca istemci tarafı.           | Açıkça temizlenene kadar süresi dolmaz. Intlayer proxy'si buna erişemez. `StorageAttributes` aracılığıyla özelleştirilebilir (`{ type: 'localStorage', name: 'custom-locale' }`).                       |
| `'sessionStorage'` | Dili sayfa oturumu süresince saklar — yalnızca istemci tarafı.                          | Sekme/pencere kapatıldığında temizlenir. Intlayer proxy'si buna erişemez. `StorageAttributes` aracılığıyla özelleştirilebilir (`{ type: 'sessionStorage', name: 'custom-locale' }`).                    |
| `'header'`         | Dili HTTP başlıkları aracılığıyla saklar veya iletir — yalnızca sunucu tarafı.          | API çağrıları için yararlıdır. İstemci tarafı erişemez. `StorageAttributes` aracılığıyla özelleştirilebilir (`{ type: 'header', name: 'custom-locale' }`).                                              |

#### Tanımlama Bilgisi Özellikleri (Cookie Attributes)

Tanımlama bilgisi depolamasını kullanırken ek tanımlama bilgisi özelliklerini yapılandırabilirsiniz:

| Alan       | Tür                                   | Açıklama                                                     |
| ---------- | ------------------------------------- | ------------------------------------------------------------ |
| `name`     | `string`                              | Tanımlama bilgisinin adı. Varsayılan: `'INTLAYER_LOCALE'`    |
| `domain`   | `string`                              | Tanımlama bilgisi alanı. Varsayılan: `undefined`             |
| `path`     | `string`                              | Tanımlama bilgisi yolu. Varsayılan: `undefined`              |
| `secure`   | `boolean`                             | HTTPS gerektirir. Varsayılan: `undefined`                    |
| `httpOnly` | `boolean`                             | HTTP-only bayrağı. Varsayılan: `undefined`                   |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite politikası.                                         |
| `expires`  | `Date &#124; number`                  | Son kullanma tarihi veya gün sayısı. Varsayılan: `undefined` |

#### Dil Depolama Özellikleri (Locale Storage Attributes)

localStorage veya sessionStorage kullanırken:

| Alan   | Tür                                      | Açıklama                                               |
| ------ | ---------------------------------------- | ------------------------------------------------------ |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Depolama türü.                                         |
| `name` | `string`                                 | Depolama anahtarı adı. Varsayılan: `'INTLAYER_LOCALE'` |

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

**Arama Parametreleri Modu (Search Parameters Mode)**:

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

**Özel Depolama ile Ön Eki Olmayan Mod (No Prefix Mode)**:

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

**Dinamik Yollarla Özel URL Yeniden Yazma**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Yeniden yazılmayan yollar için geri dönüş stratejisi
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

### İçerik Yapılandırması (Content Configuration)

Uygulama içindeki içerik işleme ile ilgili ayarlar (dizin adları, dosya uzantıları ve türetilmiş yapılandırmalar).

| Alan             | Tür        | Açıklama                                                                                                                                                                                                | Örnek                               | Not                                                                                                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Intlayer'ın sözlükleri yeniden oluşturmak için içerik bildirim dosyalarındaki değişiklikleri izleyip izlemeyeceğini belirtir. Varsayılan: `process.env.NODE_ENV === 'development'`                      |                                     |                                                                                                                                                      |
| `fileExtensions` | `string[]` | İçerik bildirim dosyalarını taramak için kullanılan dosya uzantıları. Varsayılan: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                      |
| `contentDir`     | `string[]` | İçerik bildirim dosyalarının bulunduğu dizinlerin yolları. Varsayılan: `['.']`                                                                                                                          | `['src/content']`                   |                                                                                                                                                      |
| `codeDir`        | `string[]` | Uygulamanızın kaynak kod dosyalarının bulunduğu dizinlerin yolları. Varsayılan: `['.']`                                                                                                                 | `['src']`                           | Derlemeyi optimize etmek ve kod dönüşümü ve sıcak yeniden yüklemenin (hot reload) yalnızca gerekli dosyalara uygulanmasını sağlamak için kullanılır. |
| `excludedPath`   | `string[]` | İçerik taramasından hariç tutulan yollar. Varsayılan: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                         | `['src/styles']`                    |                                                                                                                                                      |
| `formatCommand`  | `string`   | Yeni oluşturulan veya güncellenen içerik dosyalarını biçimlendirmek için çalıştırılacak komut. Varsayılan: `undefined`                                                                                  | `'npx prettier --write "{{file}}"'` | İçerik ayıklama sırasında veya görsel düzenleyici aracılığıyla kullanılır.                                                                           |

---

### Sözlük Yapılandırması (Dictionary Configuration)

Otomatik doldurma davranışı ve içerik oluşturma dahil olmak üzere sözlük işlemlerini kontrol eden ayarlar.

Bu sözlük yapılandırmasının iki ana amacı vardır:

1. **Varsayılan değerler**: İçerik bildirim dosyaları oluştururken varsayılan değerleri tanımlamak.
2. **Geri dönüş davranışı**: Belirli alanlar tanımlanmadığında geri dönüş değerleri sağlayarak sözlük işlemlerinin davranışını küresel olarak ayarlamanıza olanak tanır.

İçerik bildirim dosyaları ve yapılandırma değerlerinin nasıl uygulandığı hakkında daha fazla bilgi için [içerik dosyası belgelerine](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/content_file.md) bakın.

| Alan                        | Tür                                                                                             | Açıklama                                                                                                           | Örnek                  | Not                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Otomatik doldurma (AI çevirisi) çıktı dosyalarının nasıl oluşturulduğunu kontrol eder. Varsayılan: `true`          | Aşağıdaki örneğe bakın | `true`: Varsayılan yol (kaynakla aynı dosya). `false`: Devre dışı. Dize/fonksiyon şablonları dil başına dosyalar oluşturur. Dil başına nesne: her dil kendi desenine eşlenir; `false` o dili atlar. `{{locale}}` değişkeninin dahil edilmesi dil başına oluşturmayı tetikler. Sözlük düzeyindeki `fill` her zaman bu küresel yapılandırmadan önceliklidir. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Sözlüklerin nasıl içe aktarıldığını kontrol eder. Varsayılan: `'static'`                                           | `'dynamic'`            | `'static'`: Statik olarak içe aktarılır. `'dynamic'`: Suspense aracılığıyla dinamik olarak içe aktarılır. `'fetch'`: Live Sync API aracılığıyla dinamik olarak çekilir. `getIntlayer`, `getDictionary`, `useDictionary` vb. etkilemez.                                                                                                                     |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Sözlüklerin nerede saklandığı. Varsayılan: `'local'`                                                               | `'remote'`             | `'local'`: dosya sistemi. `'remote'`: Intlayer CMS. `'hybrid'`: her ikisi de.                                                                                                                                                                                                                                                                              |
| `contentAutoTransformation` | `boolean`                                                                                       | İçerik dosyalarının otomatik olarak dönüştürülüp dönüştürülmeyeceği (ör. Markdown'dan HTML'e). Varsayılan: `false` | `true`                 | @intlayer/markdown aracılığıyla Markdown alanlarını işlemek için yararlıdır.                                                                                                                                                                                                                                                                               |

**`fill` örneği**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Yapay Zeka Yapılandırması (AI Configuration)

Derleme çevirisi gibi Intlayer'ın yapay zeka destekli özellikleri için ayarları tanımlar.

| Alan                 | Tür                    | Açıklama                                                                        | Örnek                                       | Not                                                                                                |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Kullanılacak yapay zeka sağlayıcısı.                                            | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                    |
| `model`              | `string`               | Kullanılacak yapay zeka modeli.                                                 | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                    |
| `apiKey`             | `string`               | Seçilen sağlayıcı için API anahtarı.                                            | `process.env.OPENAI_API_KEY`                |                                                                                                    |
| `applicationContext` | `string`               | Yapay zeka çeviri doğruluğunu iyileştirmek için uygulamanız hakkında ek bağlam. | `'Çocuklar için bir çalışma platformu.'`    |                                                                                                    |
| `baseURL`            | `string`               | API çağrıları için isteğe bağlı temel yol URL'si.                               |                                             | Bir proxy veya yerel yapay zeka dağıtımı kullanıyorsanız yararlıdır.                               |
| `dataSerialization`  | `'json' &#124; 'toon'` | Yapay zekaya verilerin nasıl gönderileceğini tanımlar. Varsayılan: `'json'`     | `'json'`                                    | `'json'`: daha sağlam ve kesin. `'toon'`: daha az belirteç tüketir ancak daha az kararlı olabilir. |

---

### Derleme Yapılandırması (Build Configuration)

Intlayer derleme süreci ve optimizasyon ayarları.

| Alan           | Tür                      | Açıklama                                                                                                                     | Örnek | Not |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----- | --- |
| `mode`         | `'auto' &#124; 'manual'` | Uygulamanın ön derleme adımları sırasında Intlayer'ın otomatik olarak çalışıp çalışmayacağını belirtir. Varsayılan: `'auto'` |       |     |
| `optimize`     | `boolean`                | Derlenmiş sözlüklerin çalışma zamanı için optimize edilip edilmeyeceğini belirtir. Varsayılan: Üretim ortamında `true`       |       |     |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Oluşturulan sözlük dosyaları için çıktı formatı. Varsayılan: `['cjs', 'esm']`                                                |       |     |
| `checkTypes`   | `boolean`                | Intlayer'ın oluşturulan dosyalardaki türleri kontrol edip etmeyeceğini belirtir. Varsayılan: `false`                         |       |     |

---

### Sistem Yapılandırması (System Configuration)

Bu ayarlar gelişmiş kullanım durumları ve Intlayer'ın dahili yapılandırması içindir.

| Alan                      | Tür      | Açıklama                                 | Varsayılan                        |
| ------------------------- | -------- | ---------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Derlenmiş sözlükler dizini.              | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript modül genişletme dizini.      | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Birleştirilmemiş sözlükler dizini.       | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Oluşturulan türler dizini.               | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Ana Intlayer dosyası dizini.             | `'.intlayer/main'`                |
| `configDir`               | `string` | Derlenmiş yapılandırma dosyaları dizini. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Önbellek dosyaları dizini.               | `'.intlayer/cache'`               |

---

### Derleyici Yapılandırması (Compiler Configuration)

Intlayer derleyicisi (`intlayer compiler`) için ayarlar.

| Alan                  | Tür                      | Açıklama                                                                                        | Varsayılan |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- | ---------- |
| `enabled`             | `boolean`                | Derleyicinin aktif olup olmadığını belirtir.                                                    | `false`    |
| `output`              | `string &#124; Function` | Ayıklanan sözlükler için çıktı yolu.                                                            |            |
| `saveComponents`      | `boolean`                | Orijinal kaynak dosyaların dönüştürülmüş sürümlerle değiştirilip değiştirilmeyeceğini belirtir. | `false`    |
| `noMetadata`          | `boolean`                | `true` ise, derleyici oluşturulan dosyalara meta verileri dahil etmez.                          | `false`    |
| `dictionaryKeyPrefix` | `string`                 | İsteğe bağlı sözlük anahtarı ön eki.                                                            | `''`       |

---

### Günlükçü Yapılandırması (Logger Configuration)

Intlayer günlük çıktısını özelleştirmek için ayarlar.

| Alan     | Tür                                            | Açıklama              | Varsayılan     |
| -------- | ---------------------------------------------- | --------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Günlükleme modu.      | `'default'`    |
| `prefix` | `string`                                       | Günlük mesajı ön eki. | `'[intlayer]'` |

---

### Özel Şemalar (Custom Schemas)

| Alan      | Tür                         | Açıklama                                                                          |
| --------- | --------------------------- | --------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Sözlüklerinizin yapısını doğrulamak için Zod şemaları tanımlamanıza olanak tanır. |

---

### Eklentiler (Plugins)

| Alan      | Tür                | Açıklama                                           |
| --------- | ------------------ | -------------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Etkinleştirilecek Intlayer eklentilerinin listesi. |
