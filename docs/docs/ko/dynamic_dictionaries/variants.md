---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: 변형
description: Intlayer 콘텐츠 파일에서 variant 메타데이터 필드를 사용하여 이름이 지정되었거나 구조화된 콘텐츠 대안 — A/B 테스트, 시즌 배너, 기능 플래그 텍스트, CMS 레코드, 사용자별 콘텐츠 — 을 선언하고 코드 변경 없이 런타임에 전환합니다.
keywords:
  - 변형
  - A/B 테스트
  - 기능 플래그
  - 동적 콘텐츠
  - 동적 레코드
  - CMS
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "변형 기능 출시"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant`는 이제 문자열 또는 객체를 허용합니다 — 이전의 `meta` / 동적 레코드는 객체 변형으로 선언됩니다"
  - version: 9.1.1
    date: 2026-07-31
    changes: "변형은 재정의하는 키만 선언합니다. 선언되지 않은 변형은 기본 항목으로 대체됩니다"
  - version: 9.1.2
    date: 2026-08-04
    changes: "프로바이더가 앰비언트 `variant` 프로퍼티를 받고, 셀렉터가 순서가 있는 우선순위 체인을 받습니다"
author: aymericzip
---

# 변형

**변형**은 동일한 사전 `key`를 공유하지만 각각 다른 `variant` 값을 갖는 콘텐츠 파일의 집합입니다. Intlayer는 `useIntlayer`에 전달된 셀렉터에 따라 적절한 파일을 제공합니다.

`variant` 값은 **두 가지 형태**를 가질 수 있습니다:

- **문자열** — 단일 이름 지정 대안(A/B 테스트, 시즌 배너, 기능 플래그).
- **객체** — 필드 집합으로 주소가 지정되는 구조화된 판별자(CMS 레코드, 사용자별 콘텐츠, 불투명한 ID로 키가 지정된 모든 콘텐츠). 객체 전체가 정체성입니다. 항목을 해결하려면 셀렉터가 **동일한** 객체를 제공해야 합니다.

> 객체 형태는 이전의 `meta` 필드를 대체합니다. 이전에 `meta: { id, … }`를 작성했던 모든 곳에서 `variant: { id, … }`를 작성하고 `{ variant: { id, … } }`로 선택하세요.

## 이름 지정(문자열) 변형

각 파일은 하나의 이름 지정 대안을 나타냅니다. `variant`를 생략하거나(`"default"`로 설정하면) 폴백으로 표시됩니다.

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

### 부분 변형

변형은 **재정의하는 키만 선언합니다**. 나머지는 기본 항목에서 상속됩니다.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta`가 상속됨

useIntlayer("hero-banner", { variant: "never-declared" });
// → 기본 항목
```

따라서 텍스트가 실제로 다른 곳에만 변형 파일을 추가하면 됩니다. 변형을 선언했지만 기본 항목이 없는 경우에만 키가 `null`로 확인됩니다.

### 이름 지정 변형 사용

#### 기본 변형

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

#### 이름 지정 변형

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### 명시적 로케일이 있는 이름 지정 변형

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## 객체(구조화) 변형

객체 변형은 `variant` 필드에 선언된 임의의 키-값 쌍 집합으로 콘텐츠의 주소를 지정합니다 — 이를 통해 CMS 레코드, 사용자별 콘텐츠, 또는 키가 불투명한 ID인 모든 콘텐츠를 모델링할 수 있습니다. **객체 전체**가 정체성입니다. 항목이 해결되려면 셀렉터가 동일한 객체를 제공해야 합니다.

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

### 객체 변형 사용

일치하는 객체를 `variant`에 전달하세요. 사전에 선언된 모든 필드를 제공해야 하며 동일해야 합니다. 그렇지 않으면 결과는 `null`입니다. 필드 순서는 중요하지 않습니다.

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

#### 명시적 로케일과 함께

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### 누락된 필드 — 일치 없음

```ts
// null 반환: `userId`가 누락되어 객체가 선언된 변형과 일치하지 않습니다
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## 앰비언트 변형

테넌트, 학교 유형, 요금제 등급처럼 세션 전체에서 고정되는 변형 차원이 있습니다. 이런 값은 한 번만 결정되며, 어떤 컴포넌트도 직접 전달할 필요가 없어야 합니다.

> 이 값을 주입하려고 `useIntlayer`를 직접 만든 훅으로 감싸지 마세요. 빌드 타임 최적화는 프레임워크 패키지에서 임포트한 리터럴 `useIntlayer("key")` 호출만 다시 작성하므로, 래퍼 뒤에 있는 것은 번들에 포함되지 않습니다.

대신 `locale`과 똑같이 프로바이더에서 변형을 한 번만 선언하세요:

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
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">

        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```

      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">

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
    </Tabs>

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

이제 프로바이더 아래의 모든 사전 읽기가 해당 변형으로 해석되며, 호출 지점의 셀렉터가 항상 우선합니다:

```tsx
useIntlayer("hero-banner");
// → 프로바이더의 변형

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — 프로바이더 변형을 대체하며, 확장하지 않습니다
```

### 형태

`variant` 프로퍼티는 세 가지 형태를 받습니다:

| 형태                                                      | 의미                                     |
| --------------------------------------------------------- | ---------------------------------------- |
| `variant="school1"`                                       | 모든 키에 적용되는 하나의 이름 있는 변형 |
| `variant={["school1", "default"]}`                        | 순서가 있는 우선순위 체인                |
| `variant={{ "hero-banner": "school1", default: "base" }}` | 사전 키별 변형                           |

#### 우선순위 체인

체인은 각 키가 선언한 항목에 대해 왼쪽에서 오른쪽으로 시도하며, 가장 먼저 선언된 것이 선택됩니다. 아무것도 선언되어 있지 않으면 단일 값일 때와 똑같이 암묵적인 기본 항목이 사용됩니다.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner`는 `school1` 항목을 선언하지 않지만 `school2`를 선언함 → "school2"
// 둘 다 선언하지 않은 키 → 기본 항목
```

따라서 `["black_friday", "summer"]`는 «이 키에 black friday가 있으면 그것, 없으면 summer, 그것도 없으면 기본값»으로 읽힙니다. 체인은 호출 지점에서도 사용할 수 있습니다:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> 이는 콘텐츠 파일의 `variant` **필드**가 받는 배열과 정반대라는 점에 유의하세요. 그쪽에서는 배열이 요소마다 항목을 하나씩 *선언*하지만, 여기서는 우선순위 순서대로 그것들을 *소비*합니다.

#### 키별 맵

각 사전 키를 개별적으로 지정합니다. 예약된 `default` 항목이 나열되지 않은 모든 키를 처리합니다:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> 프로바이더에서 일반 객체는 **항상** 키별 맵으로 읽히며, 객체 변형으로는 해석되지 않습니다 — 둘은 구조적으로 동일하기 때문입니다. 객체 변형을 전역으로 지정하려면 항목 아래에 중첩하세요: `variant={{ default: { id: "prod_abc" } }}`.

맵의 키는 선언된 사전 키와 대조되므로, 오타 — 또는 `variant={{ id: "prod_abc" }}`처럼 객체 변형을 직접 작성한 경우 — 는 컴파일 오류가 됩니다.

## 로딩 모드

객체 변형은 종종 지연 로드됩니다. 이를 제어하려면 사전에 `importMode`를 설정하세요:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`, `dynamic`, `fetch` 모드에 대한 자세한 내용은 [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참조하세요.

## 일반적인 사용 사례

- 실험 키로 구동되는 A/B 카피 테스트
- 시즌 또는 프로모션 배너
- 기능 플래그 메시지
- 로케일별 마케팅 캠페인
- CMS에서 관리되는 제품별 마케팅 카피
- 사용자별 또는 계정별 콘텐츠
- 런타임에 불투명한 ID로 키가 지정된 모든 콘텐츠
