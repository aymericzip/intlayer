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

### API'yi tarayıcıdan çağırma

Aynı token, kimlik bilgisi gerektirmeyen küçük bir istemciyi destekler; böylece statik bir site veya SPA, hiçbir sunucu, sunucu eylemi (server action) veya pakette hiçbir gizli bilgi (secret) olmadan çalışma zamanında CMS içeriğini okuyabilir:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Kendisini `editor.clientId` üzerinden doğrular; değişim, önbelleğe alma ve yenileme dahili olarak yönetilir. Kapsamlar (scopes) erişebileceği şeyleri sınırlar: yayımlanmış sözlük içeriği ve analitik verisi alma. Bunun dışındaki her şey (sözlükleri yayınlamak, bir projeyi okumak, AI kredisi harcamak) gerçek bir kimlik bilgisi, dolayısıyla bir sunucu veya oturum açmış bir kullanıcı gerektirir.

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

## Kullanım

### Otomatik sağlayıcı (provider) düzeyinde izleme

Kod değişikliği gerekmez. `@intlayer/analytics` kurulduktan ve `editor.clientId` yapılandırıldıktan sonra `IntlayerProvider` otomatik olarak:

- mount edildiğinde (bağlandığında) analiz istemcisini başlatır,
- ilk yüklemede bir `page_view` kaydeder,
- her yerel ayar değişikliğinde bir `page_view` kaydeder,
- ~20s boşaltma (flush) döngüsünü başlatır ve unmount / sekme kapatıldığında (tab close) kalan tüm olayları boşaltır (`navigator.sendBeacon` aracılığıyla, `fetch(..., { keepalive: true })` işlevine geri dönerek (fallback)).

Giriş noktası her framework'te farklıdır, ancak her durumda Intlayer'ı zaten kurmak için kullandığınız aynı noktadır, bu yüzden eklenecek ekstra bir şey yoktur:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider`, analiz sağlayıcısını dahili olarak bağlar (mount eder).

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer`, React'in `IntlayerProvider`'ını yeniden dışa aktarır, bu nedenle analitik de aynı şekilde bağlanır.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `intlayer` eklentisi, analiz kancalarını (hooks) kök bileşenin yaşam döngüsüne kaydeder.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Nuxt ile, `nuxt-intlayer` eklentiyi sizin için kurar: yapılacak bir şey yoktur.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()`, Intlayer'ı kuran bileşenden analitiği başlatır.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider`, analiz sağlayıcısını dahili olarak bağlar (mount eder).

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider`, analiz sağlayıcısını tembel (lazy) şekilde bağlar, böylece bu parça (chunk) kritik yolun dışında kalır.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()`, `provideIntlayerAnalytics()`'i zaten içerir.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > `provideIntlayerAnalytics()`'i tek başına yalnızca sağlayıcıları ayrı ayrı yönetiyorsanız kullanın.

  </Tab>
</Tabs>

### Otomatik düğüm (node) düzeyinde izleme

`useIntlayer` görüntüleme için bir içerik parçasını her çözümlediğinde, yorumlayıcı (interpreter) o tam `dictionaryKey` + anahtar yolu (key path) + yerel ayar (locale) için bir `content_exposure` olayı bildirir — yine, hiçbir kod değişikliği gerekmez. Aynı düğümün bir boşaltma penceresi (flush window) içindeki tekrarlanan gösterimleri bir `count` (sayım) ile tek bir olayda birleştirilir (coalesced), bu nedenle 50 kez yeniden oluşturulan (re-render) bir liste 50 olay göndermez.

### A/B testleri için dönüşümleri izleme

Bir oturumun (session) gördüğü varyanta bir hedef atfetmek için `useConversion()` kullanın:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

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

    > `useConversion` bir istemci kancasıdır (client hook): bileşeni `"use client"` ile işaretleyin.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Başlayın
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Başlayın
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Başlayın</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Bir varyantı istemci tarafında çözümleme (Resolving a variant client-side)

`useExperiment()`, oturumu bir varyanta atar ve dönüşüm oranının paydası olan gösterimi (exposure) kaydeder. Atama çözümlenmeden önce hiçbir ziyaretçinin kontrol varyantının kısa süreliğine görünmesini önlemek için varyanta bağlı alt ağacı yalnızca `isAssigned` doğruyken gösterin:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` basit bir dizedir (string).

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` basit bir dizedir (string). Atama tarayıcıda gerçekleşir, bu nedenle bileşen bir istemci bileşeni olmalıdır.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` ve `isAssigned`, `Ref`'lerdir.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` ve `isAssigned`, store'lardır: bunları `$` öneki ile okuyun.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` basit bir dizedir (string).

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` ve `isAssigned`, `Accessor`'lardır: değeri okumak için bunları çağırın.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` ve `isAssigned`, `Signal`'lardır: değeri okumak için bunları çağırın.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Ağırlıklar isteğe bağlıdır — bölünmeyi eğmek için varyant başına bir tane geçirin, örneğin `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

Alt bileşen daha sonra eşleşen sözlüğün [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md)'ını okur:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Varyantı bir **alt bileşende** okumak, bunun React dışında da çalışmasını sağlayan şeydir: Vue, Svelte, Solid ve Angular'da, `useIntlayer`'a geçirilen seçici (selector), bileşen kurulduğunda yakalanır, bu nedenle okuma işlemi yalnızca varyant bilindikten sonra bağlanan bir bileşende gerçekleşmelidir.

Deney tek bir sözlük yerine tüm bir sayfayı kapsıyorsa, varyantı bunun yerine sağlayıcıya taşıyın — bkz. [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md#ambient-variant). Aşağıdaki her `useIntlayer`, çağrı noktasında herhangi bir değişiklik yapılmadan buna göre çözümlenir.

Bir bileşenin dışında ham atamaya ihtiyacınız varsa, doğrudan istemciye başvurun:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` yalnızca atama yapar: gösterimi (exposure) kaydetmez. Bunun yerine `useExperiment()` kullanmayı tercih edin, aksi takdirde dönüşüm oranının bir paydası olmaz.

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

> **Yalnızca sunucu tarafında.** `createIntlayerCMS()`, `clientId` + `clientSecret` ile kimlik doğrular ve gizli bilgi (secret) hiçbir zaman tarayıcıda kullanılamaz: bu kod parçacığı orada çalışırsa, kimliği doğrulanmamış istekler gönderirdi. Bunu bir route handler, server action veya betikte (script) tutun.

## Faydalı bağlantılar (Useful links)

- [Dinamik Sözlükler - Koleksiyonlar ve Varyantlar (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [Intlayer Görsel Düzenleyici (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_visual_editor.md)
- [Yapılandırma Referansı (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [Kendi Başına Barındırma (Self-Hosting) Kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md)
