---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | İçerik gösterimini izleyin ve A/B testleri çalıştırın
description: "@intlayer/analytics'in sayfa/yerel ayar görünümlerini ve içerik gösterimini nasıl izlediğini ve Intlayer içeriğiniz üzerinde A/B testleri çalıştırmak için onu nasıl kullanacağınızı keşfedin."
keywords:
  - Analytics
  - A/B Testi
  - Hedef Kitle (Audience)
  - Uluslararasılaştırma (Internationalization)
  - Dokümantasyon
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "`@intlayer/analytics` kuruluyken analitiği varsayılan olarak etkinleştir"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics paketi, provider/node düzeyinde izleme, A/B testi, gösterge paneli"
author: aymericzip
---

# Intlayer Analytics Dokümantasyonu

`@intlayer/analytics`, ziyaretçilerinize **gerçekte hangi içeriğin gösterildiğini** (hangi sayfanın, hangi yerel ayarda (locale) ve çevrilmiş içeriğin hangi belirli parçasının) size bildiren isteğe bağlı bir yardımcı pakettir, böylece hedef kitlenizi anlayabilir ve **içerik üzerinde A/B testleri** yürütebilirsiniz.

## İçindekiler

<TOC/>

---

## Neleri İzler

`@intlayer/analytics` üç tür anonim olayı toplu olarak işler (batch):

| Olay               | Nerede yakalanır                             | Size ne anlatır                                                                                                                             |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Sağlayıcı düzeyinde (`IntlayerProvider`)     | Bir oturumun (session) ilk yüklemede, rota değişikliğinde veya yerel ayar değişiminde hangi sayfayı ve yereli görüntülediği.                |
| `content_exposure` | Düğüm düzeyinde (`useIntlayer` / eklentiler) | Hangi sözlük anahtarının / anahtar yolunun gerçekten çözümlenip görüntülendiği — ve, bir deneyin parçasıysa, hangi **varyantın (variant)**. |
| `conversion`       | `useConversion()` çağırdığınız her yerde     | Oturumun maruz kaldığı A/B varyantına atfedilen (attributed) bir ulaşılan hedef (kayıt, tıklama, satın alma...).                            |

Olaylar bellekte toplanır ve **yaklaşık her 20 saniyede bir tek bir toplu istek (batch request)** olarak gönderilir — asla her tuş vuruşunda veya oluşturmada (render) değil — bu nedenle analitik, ilk oluşturma süresini asla etkilemez veya her etkileşim başına bir istek eklemez.

## İçerikte A/B Testini Nasıl Destekler

Intlayer zaten içerik [Varyantları (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) (örneğin bir `control` ve bir `black_friday` varyantına sahip bir `hero-banner` sözlüğü) bildirmenize izin verir. `@intlayer/analytics` bu döngüyü tamamlar:

1. `getVariant(experimentKey, variants)` her anonim oturumu deterministik olarak bir varyanta atar — oturum kimliğinin ve deney anahtarının (experiment key) saf bir işlevidir (pure function), bu nedenle atama **tüm oturum boyunca kararlıdır** ve ilk oluşturmadan önce **sunucu gidiş-dönüşü (server round-trip) gerektirmez** (titreme yok, düzen kayması (layout shift) yok).
2. Her `content_exposure` olayı gösterilen `variant` bilgisini taşır.
3. `useConversion()`, bir hedefi (örneğin `"cta_click"`) o varyanta atfetmenize (attribute) olanak tanır.
4. Gösterge panelindeki deney sonuçları (experiment results) uç noktası, istatistiksel anlamlılık (z-testi) dahil olmak üzere varyant başına dönüşüm oranlarını (conversion rates) karşılaştırır.

## Kurulum

`@intlayer/analytics`, her framework paketinin (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …) **isteğe bağlı bağımlılığıdır**; bu nedenle çoğu projede zaten bulunur. Kurulumunuz isteğe bağlı bağımlılıkları atlıyorsa (`npm install --no-optional`, …) paketi açıkça kurun:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Analitiği açmak için paketi kurmanız yeterlidir: `analytics.enabled` varsayılan olarak `true`'dur ve paket projenizde bulunamadığında `@intlayer/config` bunu `false` olarak çözümler. Kurmazsanız, her entegrasyon noktası etkisiz bir işlem (no-op) olarak çözülür — aşağıdaki [Kurulmadığında sıfır maliyet](#kurulmadiginda-sifir-maliyet) bölümüne bakın.

## Yapılandırma

Analitiğin başlaması için yapılandırma gerekmez: **varsayılan olarak etkindir** ve uç nokta ile proje anahtarı için **mevcut `editor` yapılandırma bloğunu yeniden kullanır**.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Analytics veri alma uç noktası (ingestion endpoint) olarak da kullanılır
    clientId: "your-client-id", // Analytics proje anahtarı olarak da kullanılır
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — analitik olaylarının gönderildiği temel URL (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — yutulan her olaya atfedilen genel proje anahtarı. Aynı zamanda bir **etkinleştirme anahtarı (enable switch)** işlevi görür: `clientId` yapılandırılana kadar analizler tamamen devre dışı bırakılır (ve ölü kod olarak atılır (tree-shaken), aşağıya bakın).

Intlayer'ı kendi başınıza barındırıyorsanız (self-host), analiz otomatik olarak `editor.backendURL`'yi paylaştığı için kendi örneğinize (instance) işaret eder.

### Devre dışı bırakma

İsteğe bağlı `analytics` bloğu veri toplamayı ayarlar — ya da tamamen kapatır:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Varsayılan: true — tüm entegrasyonu paketin dışında bırakır
    flushInterval: 20_000, // İki toplu gönderim arasındaki milisaniye
    sampleRate: 1, // Kaydedilecek oturum oranı, 0 (hiçbiri) ile 1 (tümü) arasında
  },
};

export default config;
```

`@intlayer/analytics` paketini kaldırmak `enabled: false` ile aynı etkiye sahiptir. Alanların tam listesi için [yapılandırma referansına](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) bakın.

## Çerçeve (Framework) Desteği

Analytics, `react-intlayer`'dan paylaşılan `IntlayerProvider`'a bağlanmıştır, bu nedenle bugün bu sağlayıcının kullanıldığı her yerde mevcuttur:

| Çerçeve (Framework)                                      | Durum                                                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Mevcut                                                                                                         |
| Next.js (`next-intlayer`)                                | ✅ Mevcut (`react-intlayer` aracılığıyla)                                                                         |
| React Native / Expo (`react-native-intlayer`)            | ✅ Mevcut (`react-intlayer` aracılığıyla)                                                                         |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Planlandı — `@intlayer/editor` yayım desenini izleyen, aynı istemci, sağlayıcı düzeyinde bağlamalar (bindings) |

## Kullanım

### Otomatik sağlayıcı (provider) düzeyinde izleme

Kod değişikliği gerekmez. `@intlayer/analytics` kurulduktan ve `editor.clientId` yapılandırıldıktan sonra `IntlayerProvider` otomatik olarak:

- mount edildiğinde (bağlandığında) analiz istemcisini başlatır,
- ilk yüklemede bir `page_view` kaydeder,
- her yerel ayar değişikliğinde bir `page_view` kaydeder,
- ~20s boşaltma (flush) döngüsünü başlatır ve unmount / sekme kapatıldığında (tab close) kalan tüm olayları boşaltır (`navigator.sendBeacon` aracılığıyla, `fetch(..., { keepalive: true })` işlevine geri dönerek (fallback)).

### Otomatik düğüm (node) düzeyinde izleme

`useIntlayer` görüntüleme için bir içerik parçasını her çözümlediğinde, yorumlayıcı (interpreter) o tam `dictionaryKey` + anahtar yolu (key path) + yerel ayar (locale) için bir `content_exposure` olayı bildirir — yine, hiçbir kod değişikliği gerekmez. Aynı düğümün bir boşaltma penceresi (flush window) içindeki tekrarlanan gösterimleri bir `count` (sayım) ile tek bir olayda birleştirilir (coalesced), bu nedenle 50 kez yeniden oluşturulan (re-render) bir liste 50 olay göndermez.

### A/B testleri için dönüşümleri izleme

Bir oturumun (session) gördüğü varyanta bir hedef atfetmek için `useConversion()` kullanın:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Başlayın
    </button>
  );
};
```

### Bir varyantı istemci tarafında çözümleme (Resolving a variant client-side)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Gizlilik ve Performans

- **Tasarım gereği anonim**: Oturumlar dönen (rotating) bir id ile tanımlanır; arka uç (backend) yalnızca o kimliğin bir **SHA-256 karmasını (hash)** saklar — asla ham id'yi ve asla bir IP adresini saklamaz.
- **Konum kabadır (coarse)**: Yalnızca CDN coğrafi konum başlıklarından (geolocation headers) (`cf-ipcountry`, `x-vercel-ip-country`, ...) elde edilen bir ülke kodu — hiçbir IP okunmaz veya saklanmaz.
- **URL'ler arama parametrelerini varsayılan olarak hariç tutar**, bu nedenle sorgu dizeleri (query strings) asla yakalanmaz.
- **Örnekleme (Sampling)**: `sampleRate`, trafiği yüksek uygulamalarda içerik gösterimi olaylarının yalnızca bir kısmını saklamanıza olanak tanır.
- **Toplu İşleme (Batched)**: Yaklaşık her 20 saniyede bir istek (`flushInterval`) veya arabellek (buffer) dolarsa daha erken (`maxBufferSize`) — hiçbir zaman olay başına bir istek değil.

### Kurulmadığında sıfır maliyet (Zero-cost when not installed)

`@intlayer/analytics`, `@intlayer/editor` ile tamamen aynı isteğe bağlı bağımlılık desenini izler:

- Her entegrasyon noktası, paketi **`try/catch` içine sarılmış dinamik bir `import()`** aracılığıyla yükler — `@intlayer/analytics`'i hiç kurmayan bir uygulama hiçbir zaman paket boyutu veya çalışma zamanı (runtime) maliyeti ödemez ve hiçbir zaman bir hata görmez;
- derleme zamanı ortam değişkeni (`INTLAYER_ANALYTICS_ENABLED`), paket kurulu değilse, `analytics.enabled` `false` ise ya da `editor.clientId` yapılandırılmamışsa `@intlayer/config` tarafından otomatik olarak `'false'` yapılır ve paketleyicilerin tüm entegrasyonu **ölü kod olarak kaldırmasını (dead-code-eliminate)** sağlar;
- Analytics, Intlayer düzenleyicisi (editor)/CMS önizleme (preview) iframe'i içinde devre dışı bırakılır, böylece düzenleyici oturumları (editor sessions) hiçbir zaman gerçek trafik olarak sayılmaz.

## Gösterge Paneli (Dashboard): Analytics sayfası

Projeniz olayları topladıktan sonra, [Intlayer gösterge paneli (dashboard)](https://app.intlayer.org/analytics) içindeki **Analytics** sayfası (bir proje seçildikten sonra kenar çubuğunda (sidebar) görünür) şunları gösterir:

- **Aktif kullanıcılar** — seçilen hareketli penceredeki (7 / 30 / 90 gün) benzersiz (distinct) ziyaretçiler.
- **Bugünkü kullanıcılar** ve **son 7 gündeki kullanıcılar**.
- Seçili pencere boyunca **Sayfa görüntülemeleri (Page views)**.
- Günlük tekil ziyaretçilerin bir **gelişim grafiği (evolution graph)**.
- Hedef kitlenizi yerel ayar ve ülkeye göre sıralayan **Yerel Ayarlar (Locales)** ve **Konum (Location)** döküm sekmeleri.

## Arka Uç API Referansı (Backend API reference)

Tüm okuma uç noktaları (read endpoints) kimlik doğrulama gerektirir; veri alımı (ingestion) geneldir (public) ve gövdedeki `clientId` tarafından ilişkilendirilir (attributed).

| Yöntem | Uç Nokta (Endpoint)                         | Açıklama                                                                            |
| ------ | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Bir dizi olayı içeri al (genel, gövdede `clientId` tarafından atfedilir).           |
| `GET`  | `/api/analytics/overview`                   | Kimliği doğrulanmış proje için sayfa/yerel ayar toplamları.                         |
| `GET`  | `/api/analytics/audience?days=30`           | Tekil ziyaretçiler, sayfa görünümleri, günlük dizi, yerel + ülke dökümleri.         |
| `GET`  | `/api/analytics/content-stats`              | İçerik başına gösterim toplamları (sözlük anahtarı / yolu / yerele göre gruplanır). |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Bir A/B deneyi için varyant başına dönüşüm oranları ve istatistiksel anlamlılık.    |

Bunları [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) ile programatik olarak da çağırabilirsiniz:

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Faydalı bağlantılar (Useful links)

- [Dinamik Sözlükler - Koleksiyonlar ve Varyantlar (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [Intlayer Görsel Düzenleyici (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [Yapılandırma Referansı (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Kendi Başına Barındırma (Self-Hosting) Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)
