---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Varyantlar
description: Adlandırılmış veya yapılandırılmış içerik alternatifleri — A/B testleri, sezonluk afişler, özellik bayraklı metin, CMS kayıtları, kullanıcıya özel içerik — bildirmek ve kod değişikliği olmadan çalışma zamanında aralarında geçiş yapmak için Intlayer içerik dosyalarında variant meta veri alanını kullanın.
keywords:
  - Varyantlar
  - A/B Testi
  - Özellik Bayrakları
  - Dinamik İçerik
  - Dinamik Kayıtlar
  - CMS
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Varyantlar özelliğinin yayımlanması"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` artık bir dize veya bir nesne kabul ediyor — önceki `meta` / dinamik kayıtlar nesne varyantları olarak bildiriliyor"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Bir varyant yalnızca geçersiz kıldığı anahtarları bildirir; bildirilmemiş varyantlar varsayılan girdiye geri döner"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Sağlayıcılar ortam düzeyinde bir `variant` prop'u kabul eder; seçiciler sıralı bir tercih zinciri kabul eder"
author: aymericzip
---

# Varyantlar

Bir **varyant**, aynı sözlük anahtarını (`key`) paylaşan ancak her biri farklı bir `variant` değeri taşıyan bir içerik dosyaları kümesidir. Intlayer, `useIntlayer`'a geçirilen seçiciye göre uygun dosyayı sunar.

`variant` değeri **iki biçim** alabilir:

- **Bir dize** — tek bir adlandırılmış alternatif (A/B testleri, sezonluk afişler, özellik bayrakları).
- **Bir nesne** — bir alan kümesiyle adreslenen yapılandırılmış bir ayırt edici (CMS kayıtları, kullanıcıya özel metin, opak bir kimlikle anahtarlanan herhangi bir içerik). Kimlik nesnenin tamamıdır: seçici, girdiyi çözümlemek için **eşit** bir nesne sağlamalıdır.

> Nesne biçimi eski `meta` alanının yerini alır. Daha önce `meta: { id, … }` yazdığınız her yerde `variant: { id, … }` yazın ve onu `{ variant: { id, … } }` ile seçin.

## Adlandırılmış (dize) varyantlar

Her dosya bir adlandırılmış alternatifi temsil eder. `variant`'ı atlamak (veya `"default"` olarak ayarlamak) onu yedek olarak işaretler.

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Kısmi varyantlar

Bir varyant **yalnızca geçersiz kıldığı anahtarları bildirir**; geri kalanı varsayılan girdiden miras alınır.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` miras alındı

useIntlayer("hero-banner", { variant: "never-declared" });
// → varsayılan girdi
```

Böylece yalnızca ifadelerin gerçekten farklı olduğu durumlarda bir varyant dosyası eklersiniz. Bir anahtar, yalnızca varyantları bildirip varsayılan girdisi olmadığında `null` olarak çözülür.

### Adlandırılmış varyantları kullanma

#### Varsayılan varyant

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varsayılan varyant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varsayılan varyant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → varsayılan varyant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → varsayılan varyant

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### Adlandırılmış varyant

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Açık locale ile adlandırılmış varyant

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Nesne (yapılandırılmış) varyantlar

Bir nesne varyantı, `variant` alanında bildirilen rastgele bir anahtar-değer çiftleri kümesiyle içeriği adresler — bu da CMS kayıtlarını, kullanıcıya özel metni veya anahtarı opak bir kimlik olan herhangi bir içeriği modellemeyi mümkün kılar. Kimlik **nesnenin tamamıdır**: girdinin çözümlenmesi için seçici eşit bir nesne sağlamalıdır.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Nesne varyantlarını kullanma

Eşleşen nesneyi `variant`'a geçirin. Sözlükte bildirilen her alan sağlanmalı ve eşit olmalıdır; aksi takdirde sonuç `null` olur. Alanların sırası önemli değildir.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### Açık locale ile

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Eksik alan — eşleşme yok

```ts
// null döndürür: `userId` eksik, bu nedenle nesne bildirilen varyantla eşleşmiyor
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Ortam varyantı

Bazı varyant boyutları tüm oturum boyunca sabittir — kiracı, okul türü, plan seviyesi. Bir kez çözümlenirler ve hiçbir bileşenin bunları elle geçirmesi gerekmemelidir.

> Bunları enjekte etmek için `useIntlayer`'ı kendi hook'unuza sarmayın. Derleme zamanı optimizasyonu yalnızca framework paketinden içe aktarılan düz bir `useIntlayer("key")` çağrısını yeniden yazar; bir sarmalayıcının arkasındaki hiçbir şey paketlenmez.

Bunun yerine varyantı sağlayıcıda bir kez bildirin, tıpkı `locale` gibi:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerServerProvider } from "next-intlayer/server";
    import { IntlayerClientProvider } from "next-intlayer";

    export default async function Layout({ children, params }) {
      const { locale } = await params;
      const schoolType = await getSchoolType();

      return (
        <IntlayerServerProvider locale={locale} variant={schoolType}>
          <IntlayerClientProvider locale={locale} variant={schoolType}>
            {children}
          </IntlayerClientProvider>
        </IntlayerServerProvider>
      );
    }
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

Sağlayıcının altındaki her sözlük okuması artık bu varyanta göre çözümlenir ve çağrı noktasındaki bir seçici her zaman kazanır:

```tsx
useIntlayer("hero-banner");
// → sağlayıcının varyantı

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — sağlayıcı varyantının yerini alır, onu genişletmez
```

### Biçimler

`variant` prop'u üç biçim kabul eder:

| Biçim                                                     | Anlamı                                         |
| --------------------------------------------------------- | ---------------------------------------------- |
| `variant="school1"`                                       | her anahtar için tek bir adlandırılmış varyant |
| `variant={["school1", "default"]}`                        | sıralı bir tercih zinciri                      |
| `variant={{ "hero-banner": "school1", default: "base" }}` | sözlük anahtarı başına bir varyant             |

#### Tercih zinciri

Zincir, her anahtarın bildirdiği girdilere karşı soldan sağa denenir ve bildirilen ilk girdi kazanır. Hiçbiri bildirilmemişse örtük varsayılan girdi kullanılır — tıpkı tek bir değerde olduğu gibi.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` bir `school1` girdisi bildirmez ama `school2` bildirir → "school2"
// ikisini de bildirmeyen bir anahtar → varsayılan girdi
```

Yani `["black_friday", "summer"]` şöyle okunur: «bu anahtarda varsa black friday, yoksa summer, o da yoksa varsayılan». Zincirler çağrı noktasında da kabul edilir:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Bunun, bir içerik dosyasının `variant` **alanının** kabul ettiği dizinin ayna görüntüsü olduğuna dikkat edin: orada bir dizi öğe başına bir girdi _bildirir_, burada ise onları öncelik sırasına göre _tüketir_.

#### Anahtar başına eşleme

Her sözlük anahtarını ayrı ayrı adresleyin. Ayrılmış `default` girdisi, listelenmeyen tüm anahtarları kapsar:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Bir sağlayıcıda düz bir nesne **her zaman** anahtar başına eşleme olarak okunur, asla nesne varyantı olarak değil — ikisi yapısal olarak aynıdır. Bir nesne varyantını global olarak sabitlemek için onu bir girdinin altına yerleştirin: `variant={{ default: { id: "prod_abc" } }}`.

Eşlemenin anahtarları bildirdiğiniz sözlük anahtarlarına karşı denetlendiğinden, bir yazım hatası — ya da doğrudan yazılmış bir nesne varyantı, örneğin `variant={{ id: "prod_abc" }}` — derleme zamanı hatasıdır.

## Yükleme modu

Nesne varyantları genellikle tembel olarak yüklenir. Bunu kontrol etmek için sözlükte `importMode`'u ayarlayın:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`, `dynamic` ve `fetch` modlarıyla ilgili ayrıntılar için [paket optimizasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) bölümüne bakın.

## Tipik kullanım örnekleri

- Bir deney anahtarıyla yönlendirilen A/B metin testleri
- Sezonluk veya promosyon afişleri
- Özellik bayraklı mesajlaşma
- Locale'e özgü pazarlama kampanyaları
- CMS'te yönetilen ürün başına pazarlama metni
- Kullanıcıya veya hesaba özel içerik
- Çalışma zamanında opak bir kimlikle anahtarlanan herhangi bir içerik
