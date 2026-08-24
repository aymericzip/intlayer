---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: Biến thể
description: Dùng trường metadata variant trong các tệp nội dung Intlayer để khai báo các lựa chọn nội dung được đặt tên hoặc có cấu trúc — thử nghiệm A/B, banner theo mùa, nội dung gắn feature flag, bản ghi CMS, nội dung riêng theo người dùng — và chuyển đổi giữa chúng trong thời gian chạy mà không cần đổi mã.
keywords:
  - Biến thể
  - Thử nghiệm A/B
  - Feature Flag
  - Nội dung động
  - Bản ghi động
  - CMS
  - Intlayer
  - Quốc tế hóa
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Phát hành tính năng biến thể"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` hiện chấp nhận một chuỗi hoặc một đối tượng — trước đây `meta` / bản ghi động được khai báo là biến thể đối tượng"
  - version: 9.1.1
    date: 2026-07-31
    changes: "Biến thể chỉ khai báo các khóa mà nó ghi đè; các biến thể không được khai báo sẽ quay lại mục mặc định"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Provider chấp nhận prop `variant` bao trùm; bộ chọn chấp nhận chuỗi ưu tiên có thứ tự"
author: aymericzip
---

# Biến thể

Một **biến thể** là một tập hợp các tệp nội dung dùng chung `key` từ điển nhưng mỗi tệp mang một giá trị `variant` khác nhau. Intlayer phục vụ tệp phù hợp dựa trên bộ chọn được truyền cho `useIntlayer`.

Giá trị `variant` có thể có **hai dạng**:

- **Một chuỗi** — một lựa chọn được đặt tên duy nhất (thử nghiệm A/B, banner theo mùa, feature flag).
- **Một đối tượng** — một bộ phân biệt có cấu trúc được định địa chỉ bằng một tập hợp trường (bản ghi CMS, nội dung riêng theo người dùng, bất kỳ nội dung nào được khóa bằng một ID mờ). Toàn bộ đối tượng chính là danh tính: bộ chọn phải cung cấp một đối tượng **bằng nhau** để phân giải mục.

> Dạng đối tượng thay thế trường `meta` trước đây. Ở bất cứ đâu trước kia bạn viết `meta: { id, … }`, hãy viết `variant: { id, … }`, và chọn nó bằng `{ variant: { id, … } }`.

## Biến thể được đặt tên (chuỗi)

Mỗi tệp đại diện cho một lựa chọn được đặt tên. Bỏ qua `variant` (hoặc đặt thành `"default"`) đánh dấu nó là dự phòng.

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

### Biến thể một phần

Một biến thể **chỉ khai báo các khóa mà nó ghi đè**; phần còn lại được kế thừa từ mục mặc định.

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` được kế thừa

useIntlayer("hero-banner", { variant: "never-declared" });
// → mục mặc định
```

Vì vậy, bạn chỉ thêm một tệp biến thể ở nơi văn bản thực sự khác biệt. Một khóa chỉ giải quyết thành `null` khi nó khai báo các biến thể nhưng không có mục mặc định.

### Tiêu thụ các biến thể được đặt tên

#### Biến thể mặc định

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

#### Biến thể được đặt tên

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Biến thể được đặt tên với locale tường minh

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Biến thể đối tượng (có cấu trúc)

Một biến thể đối tượng định địa chỉ nội dung bằng một tập hợp cặp khóa-giá trị tùy ý được khai báo trong trường `variant` — giúp mô hình hóa bản ghi CMS, nội dung riêng theo người dùng, hoặc bất kỳ nội dung nào có khóa là một ID mờ. **Toàn bộ đối tượng** chính là danh tính: bộ chọn phải cung cấp một đối tượng bằng nhau để mục được phân giải.

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

### Sử dụng biến thể đối tượng

Truyền đối tượng khớp cho `variant`. Mọi trường được khai báo trên từ điển phải được cung cấp và bằng nhau; nếu không, kết quả là `null`. Thứ tự các trường không quan trọng.

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

#### Với locale tường minh

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Thiếu trường — không khớp

```ts
// Trả về null: thiếu `userId`, nên đối tượng không khớp với biến thể đã khai báo
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Biến thể bao trùm

Một số chiều biến thể cố định trong suốt phiên làm việc — tenant, loại trường học, hạng gói. Chúng được xác định một lần, và không component nào phải truyền chúng thủ công.

> Đừng bọc `useIntlayer` trong hook riêng của bạn để chèn chúng. Tối ưu hóa lúc build chỉ viết lại lời gọi `useIntlayer("key")` dạng literal được import từ gói framework, nên mọi thứ nằm sau một lớp bọc sẽ không được đóng gói.

Thay vào đó, hãy khai báo biến thể một lần trên provider, y như `locale`:

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

Mọi lần đọc từ điển bên dưới provider giờ đây được phân giải theo biến thể đó, và bộ chọn tại nơi gọi luôn thắng:

```tsx
useIntlayer("hero-banner");
// → biến thể của provider

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — thay thế biến thể của provider, không mở rộng nó
```

### Các dạng

Prop `variant` chấp nhận ba dạng:

| Dạng                                                      | Ý nghĩa                           |
| --------------------------------------------------------- | --------------------------------- |
| `variant="school1"`                                       | một biến thể có tên cho mọi khóa  |
| `variant={["school1", "default"]}`                        | một chuỗi ưu tiên có thứ tự       |
| `variant={{ "hero-banner": "school1", default: "base" }}` | một biến thể cho mỗi khóa từ điển |

#### Chuỗi ưu tiên

Chuỗi được thử từ trái sang phải theo các mục mà mỗi khóa khai báo, và mục được khai báo đầu tiên sẽ thắng. Khi không có mục nào được khai báo, mục mặc định ngầm định sẽ được dùng — hệt như với một giá trị đơn.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` không khai báo mục `school1` nhưng có khai báo `school2` → "school2"
// một khóa không khai báo mục nào trong hai → mục mặc định
```

Vậy `["black_friday", "summer"]` đọc là «black friday nếu khóa này có, nếu không thì summer, nếu không nữa thì mặc định». Chuỗi cũng được chấp nhận tại nơi gọi:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Lưu ý đây là hình ảnh phản chiếu của mảng được **trường** `variant` trong tệp nội dung chấp nhận: ở đó một mảng _khai báo_ mỗi phần tử một mục, còn ở đây nó _tiêu thụ_ chúng theo thứ tự ưu tiên.

#### Ánh xạ theo khóa

Chỉ định riêng từng khóa từ điển. Mục `default` được dành riêng sẽ bao phủ mọi khóa không được liệt kê:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> Trên provider, một object thuần **luôn** được đọc là ánh xạ theo khóa, không bao giờ là biến thể object — hai thứ này giống hệt nhau về cấu trúc. Để cố định một biến thể object trên toàn cục, hãy lồng nó dưới một mục: `variant={{ default: { id: "prod_abc" } }}`.

Vì các khóa của ánh xạ được đối chiếu với các khóa từ điển bạn đã khai báo, một lỗi gõ nhầm — hoặc một biến thể object viết trực tiếp, chẳng hạn `variant={{ id: "prod_abc" }}` — sẽ là lỗi biên dịch.

## Chế độ tải

Biến thể đối tượng thường được tải lười. Đặt `importMode` trên từ điển để kiểm soát điều này:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) để biết chi tiết về các chế độ `static`, `dynamic` và `fetch`.

## Các trường hợp sử dụng điển hình

- Thử nghiệm A/B nội dung được điều khiển bằng khóa thí nghiệm
- Banner theo mùa hoặc khuyến mãi
- Thông điệp gắn feature flag
- Chiến dịch tiếp thị riêng theo locale
- Nội dung tiếp thị theo từng sản phẩm được quản lý trong CMS
- Nội dung riêng theo người dùng hoặc tài khoản
- Bất kỳ nội dung nào được khóa bằng một ID mờ trong thời gian chạy
