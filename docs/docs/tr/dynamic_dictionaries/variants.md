---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Varyantlar
description: Kod değişikliği yapmadan çalışma zamanında aralarında geçiş yapmak üzere adlandırılmış içerik alternatiflerini — A/B testleri, dönemsel afişler, özellik bayraklı (feature flag) metinler — bildirmek için Intlayer içerik dosyalarındaki variant meta veri alanını kullanın.
keywords:
  - Varyantlar
  - A/B Testi
  - Özellik Bayrakları
  - Dinamik İçerik
  - Intlayer
  - Uluslararasılaştırma
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Varyantlar özelliğinin sürümü"
author: aymericzip
---

# Varyantlar

Bir **varyant** (variant), aynı sözlük anahtarını (`key`) paylaşan ancak her biri farklı bir `variant` adı taşıyan içerik dosyaları kümesidir. Intlayer, `useIntlayer` fonksiyonuna geçirilen seçiciye göre uygun dosyayı sunar.

## Varyantları bildirme

Her dosya adlandırılmış bir alternatifi temsil eder. `variant` alanının atlanması (veya `"default"` olarak ayarlanması) onu varsayılan (fallback) varyant olarak işaretler.

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

## Varyantları tüketme

### Varsayılan varyant

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

### Adlandırılmış varyant

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

### Belirli dil seçeneği ile adlandırılmış varyant

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "tr",
});
```

## Tipik kullanım senaryoları

- Bir deney anahtarı (experiment key) tarafından yönlendirilen A/B metin testleri
- Dönemsel veya tanıtım afişleri
- Özellik bayraklı (feature flag) mesajlaşma
- Bölgeye özel pazarlama kampanyaları
