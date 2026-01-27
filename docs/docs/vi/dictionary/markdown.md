---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Tìm hiểu cách khai báo và sử dụng nội dung Markdown trên trang web đa ngôn ngữ của bạn với Intlayer. Làm theo các bước trong tài liệu trực tuyến này để tích hợp Markdown một cách liền mạch vào dự án của bạn.
keywords:
  - Markdown
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Thêm MarkdownRenderer / useMarkdownRenderer / tiện ích renderMarkdown và tùy chọn forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Tự động trang trí nội dung markdown, hỗ trợ MDX và SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Markdown / Nội dung văn bản đa dạng

Intlayer hỗ trợ nội dung văn bản đa dạng được định nghĩa bằng cú pháp Markdown. Điều này cho phép bạn dễ dàng viết và duy trì nội dung với định dạng phong phú, chẳng hạn như blog, bài viết, và nhiều hơn nữa.

## Cách Markdown hoạt động

Intlayer v8 thông minh nhận diện cú pháp Markdown trong các chuỗi nội dung của bạn. Nếu một chuỗi được xác định là Markdown, nó sẽ tự động được chuyển đổi thành một node Markdown.

<Columns>
  <Column title="Hành vi v7 (Bao bọc thủ công)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## My title \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Hành vi v8 (Phát hiện tự động)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Bật tính năng tự động phát hiện nội dung Markdown - Có thể thiết lập toàn cục trong intlayer.config.ts
      content: {
        text: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Phần 1: Khai báo nội dung Markdown

Bạn có thể khai báo nội dung Markdown bằng hàm `md` hoặc đơn giản là một chuỗi (nếu nó chứa cú pháp Markdown).

<Tabs>
  <Tab label="Bọc thủ công">
    Sử dụng hàm `md` để khai báo rõ ràng nội dung Markdown. Điều này hữu ích nếu bạn muốn đảm bảo một chuỗi được coi là Markdown ngay cả khi nó không chứa cú pháp rõ ràng.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Phát hiện tự động">
    Nếu chuỗi chứa các dấu hiệu Markdown phổ biến (như tiêu đề, danh sách, liên kết, v.v.), Intlayer sẽ tự động chuyển đổi nó.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Bật tính năng tự động phát hiện nội dung Markdown - Có thể thiết lập toàn cục trong intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Tệp bên ngoài">
    Nhập trực tiếp các tệp `.md` bằng hàm `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Phần 2: Render Markdown

Việc kết xuất có thể được xử lý tự động bởi hệ thống nội dung của Intlayer hoặc thực hiện thủ công bằng các công cụ chuyên dụng.

### 1. Kết xuất tự động (sử dụng `useIntlayer`)

Khi bạn truy cập nội dung qua `useIntlayer`, các node Markdown đã sẵn sàng để kết xuất.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Các node Markdown có thể được kết xuất trực tiếp dưới dạng JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Bạn cũng có thể cung cấp các ghi đè (overrides) cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Trong Vue, nội dung Markdown có thể được render bằng thành phần built-in `component` hoặc trực tiếp dưới dạng một node.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte render Markdown dưới dạng chuỗi HTML theo mặc định. Sử dụng `{@html}` để render.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact hỗ trợ các node Markdown trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid hỗ trợ các node Markdown trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular sử dụng chỉ thị `[innerHTML]` để hiển thị nội dung Markdown.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Bạn cũng có thể cung cấp các ghi đè (overrides) cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Kết xuất Thủ công & Công cụ Nâng cao

Nếu bạn cần render chuỗi Markdown thô hoặc muốn kiểm soát nhiều hơn quá trình render, hãy sử dụng các công cụ sau.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Thành phần `<MarkdownRenderer />`

    Kết xuất một chuỗi Markdown với các tùy chọn cụ thể.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Lấy một hàm renderer đã được cấu hình sẵn.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Tiện ích `renderMarkdown()`
    Tiện ích độc lập để render bên ngoài các component.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Thành phần `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Thành phần `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### Tiện ích `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Thành phần `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Tiện ích `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Thành phần `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Tiện ích `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Dịch vụ `IntlayerMarkdownService`
    Render một chuỗi Markdown bằng cách sử dụng dịch vụ.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Cấu hình toàn cục với `MarkdownProvider`

Bạn có thể cấu hình cách render Markdown ở mức toàn cục cho toàn bộ ứng dụng của mình. Điều này giúp tránh việc truyền các prop giống nhau cho mọi renderer.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## Tham chiếu Tùy chọn

Các tùy chọn này có thể được truyền cho `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, và `renderMarkdown`.

| Tùy chọn              | Kiểu        | Mặc định | Mô tả                                                                                |
| :-------------------- | :---------- | :------- | :----------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`  | Buộc đầu ra được bao bọc trong một phần tử cấp khối (ví dụ: `<div>`).                |
| `forceInline`         | `boolean`   | `false`  | Buộc đầu ra được bao bọc trong một phần tử nội dòng (ví dụ: `<span>`).               |
| `tagfilter`           | `boolean`   | `true`   | Bật Bộ lọc thẻ GitHub để cải thiện bảo mật bằng cách loại bỏ các thẻ HTML nguy hiểm. |
| `preserveFrontmatter` | `boolean`   | `false`  | Nếu `true`, frontmatter ở đầu chuỗi Markdown sẽ không bị loại bỏ.                    |
| `components`          | `Overrides` | `{}`     | Một bản đồ các thẻ HTML tới các component tùy chỉnh (ví dụ: `{ h1: MyHeading }`).    |
| `wrapper`             | `Component` | `null`   | Một component tùy chỉnh để bao bọc Markdown đã render.                               |
| `renderMarkdown`      | `Function`  | `null`   | Một hàm render tùy chỉnh để thay thế hoàn toàn bộ biên dịch Markdown mặc định.       |
