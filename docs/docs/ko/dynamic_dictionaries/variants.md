---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 변형
description: 코드 변경 없이 런타임에 서로 전환할 수 있는 이름이 지정된 대체 콘텐츠(A/B 테스트, 시즌별 배너, 기능 플래그가 지정된 텍스트)를 선언하기 위해 Intlayer 콘텐츠 파일에서 variant 메타데이터 필드를 사용합니다.
keywords:
  - 변형
  - A/B 테스트
  - 기능 플래그
  - 동적 콘텐츠
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "변형 사전 기능 출시"
author: aymericzip
---

# 변형

**변형**(Variant)은 동일한 사전 키(`key`)를 공유하지만 서로 다른 `variant` 이름을 선언하는 콘텐츠 파일의 집합입니다. Intlayer는 `useIntlayer`에 전달된 선택기에 따라 적절한 파일을 서비스합니다.

## 변형 선언

각 파일은 하나의 이름이 지정된 대체 콘텐츠를 나타냅니다. `variant` 필드를 생략하거나 `"default"`로 설정하면 기본(fallback) 변형으로 표시됩니다.

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

## 변형 소비하기

### 기본 변형

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → 기본 변형

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
      // → 기본 변형

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
      // → 기본 변형

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
      // → 기본 변형

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

### 이름이 지정된 변형

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

### 명시적 로케일로 이름이 지정된 변형

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "ko",
});
```

## 일반적인 사용 사례

- 실험 키(experiment key)에 따른 A/B 카피 테스트
- 시즌별 또는 프로모션 배너
- 기능 플래그(feature flags)로 제어되는 문구
- 특정 로케일 타겟 마케팅 캠페인
