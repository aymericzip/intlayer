---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Biến Thể
description: Sử dụng trường siêu dữ liệu variant trong các tệp nội dung Intlayer để khai báo các lựa chọn nội dung thay thế được đặt tên (thử nghiệm A/B, biểu ngữ theo mùa, văn bản gắn cờ tính năng) và chuyển đổi giữa chúng tại runtime mà không cần thay đổi mã.
keywords:
  - Biến Thể
  - Thử nghiệm A/B
  - Cờ Tính Năng
  - Nội Dung Động
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - variants
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Phát hành tính năng từ điển biến thể"
author: aymericzip
---

# Biến Thể

Một **biến thể** (variant) là một tập hợp các tệp nội dung chia sẻ cùng một khóa từ điển (`key`) nhưng mỗi tệp mang một tên `variant` khác nhau. Intlayer phục vụ tệp phù hợp dựa trên bộ chọn được truyền vào `useIntlayer`.

## Khai báo các biến thể

Mỗi tệp đại diện cho một lựa chọn thay thế có tên. Việc bỏ qua `variant` (hoặc đặt thành `"default"`) sẽ đánh dấu tệp đó làm phương án mặc định (fallback).

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

## Sử dụng biến thể

### Biến thể mặc định

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → biến thể mặc định

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
      // → biến thể mặc định

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
      // → biến thể mặc định

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
      // → biến thể mặc định

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

### Biến thể có tên

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

### Biến thể có tên với ngôn ngữ cụ thể

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "vi",
});
```

## Các trường hợp sử dụng điển hình

- Các thử nghiệm A/B nội dung được điều hướng bởi một khóa thử nghiệm
- Biểu ngữ theo mùa hoặc biểu ngữ quảng cáo
- Thông điệp được gắn cờ tính năng (feature flag)
- Các chiến dịch tiếp thị cụ thể theo từng vùng địa lý
