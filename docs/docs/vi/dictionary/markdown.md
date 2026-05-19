---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Tìm hiểu cách khai báo và sử dụng nội dung Markdown trong trang web đa ngôn ngữ của bạn với Intlayer. Làm theo các bước trong tài liệu trực tuyến này để tích hợp Markdown một cách liền mạch vào dự án của bạn.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Thêm hỗ trợ cho các tệp `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Thêm đối tượng plugin `intlayerMarkdown`; sử dụng `app.use(intlayerMarkdown)` thay vì `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Di chuyển import từ `{{framework}}-intlayer` sang `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Thêm tiện ích MarkdownRenderer / useMarkdownRenderer / renderMarkdown và tùy chọn forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Trang trí tự động nội dung markdown, hỗ trợ MDX và SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Markdown / Nội dung Rich Text

Intlayer hỗ trợ nội dung rich text được định nghĩa bằng cú pháp Markdown. Điều này cho phép bạn dễ dàng viết và duy trì nội dung được định dạng phong phú như blog, bài viết, và hơn thế nữa.

## Khai báo Nội dung Markdown

Bạn có thể khai báo nội dung Markdown bằng cách sử dụng hàm `md` hoặc đơn giản là một chuỗi (nếu nó chứa cú pháp Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Bắt đầu từ phiên bản `8.10.0`, bạn có thể khai báo nội dung Markdown trực tiếp trong các tệp `.content.md`. Intlayer sẽ tự động phát hiện và phân tích nội dung Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Nội dung của tôi
    locale: en
    ---

    # Nội dung của tôi

    Dưới đây là một ví dụ về nội dung markdown
    ```

    Trường front-matter `locale` là trường xác định ngôn ngữ của nội dung. Nó là tùy chọn. Nếu không được cung cấp, Intlayer sẽ sử dụng ngôn ngữ mặc định, ngôn ngữ này cũng được sử dụng làm ngôn ngữ dự phòng nếu không có bản dịch cho một ngôn ngữ cụ thể.

    Ví dụ về cấu trúc tệp:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Bạn có thể thêm vào front-matter bất kỳ thuộc tính nào được định nghĩa trong [Định nghĩa Từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)

  </Tab>
  <Tab label="Bao bọc Thủ công" value="manual-wrapping">
    Sử dụng hàm `md` để khai báo rõ ràng nội dung Markdown. Điều này rất hữu ích nếu bạn muốn đảm bảo một chuỗi được xử lý như Markdown ngay cả khi nó không chứa cú pháp rõ ràng.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Tiêu đề của tôi \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Phát hiện Tự động" value="automatic-detection">
    Nếu chuỗi chứa các chỉ báo Markdown phổ biến (như tiêu đề, danh sách, liên kết, v.v.), Intlayer sẽ tự động chuyển đổi nó.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Bật phát hiện tự động nội dung Markdown - Có thể được đặt toàn cục trong intlayer.config.ts
      content: {
        myMarkdownContent: "## Tiêu đề của tôi \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

  <Tab label="Tệp Bên ngoài" value="external-files">
    Nhập trực tiếp các tệp `.md` bằng cách sử dụng hàm `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          vi: md(file("./myMarkdown.vi.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Render Markdown

Intlayer cung cấp hai cách độc lập để render Markdown:

1. **Thông qua `useIntlayer`**
   — Intlayer tự động chuyển đổi node `md` thành đầu ra nguyên bản của framework (JSX, VNode, chuỗi HTML).
   - Frontmatter được phân tích cú pháp và hiển thị dưới dạng `.metadata`. Bạn có thể ghi đè quá trình render ở hai cấp độ — toàn cục với `MarkdownProvider` (hoặc tương đương trong framework) và cục bộ trên mỗi node bằng `.use()`. Cả hai đều có thể được kết hợp; `.use()` được ưu tiên hơn `MarkdownProvider`, và `MarkdownProvider` được ưu tiên hơn mặc định.

2. **Các tiện ích hỗ trợ** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, và `renderMarkdown()` là các công cụ độc lập chấp nhận **chỉ các chuỗi Markdown thô**. Chúng độc lập với `useIntlayer` và không hoạt động với các node được trang trí mà nó trả về.

Render Markdown hỗ trợ **MDX** — sử dụng bất kỳ component JSX/framework nào bằng tên trực tiếp bên trong Markdown của bạn.

### 1. Render Tự động (thông qua `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Các node Markdown có thể được render trực tiếp dưới dạng JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Component MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Nếu không có `MarkdownProvider`, Intlayer sẽ render markdown bằng cách sử dụng trình phân tích cú pháp Markdown sang JSX mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Trong Vue, nội dung Markdown có thể được render bằng thẻ `component` tích hợp sẵn hoặc trực tiếp như một node.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Cấu hình toàn cục thông qua plugin `intlayerMarkdown` (hỗ trợ các component tùy chỉnh MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Component MDX
      },
    });
    ```

    > Nếu plugin `intlayerMarkdown` không được cài đặt, Intlayer sẽ render bằng trình biên dịch mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte render Markdown thành một chuỗi HTML theo mặc định. Sử dụng `{@html}` để render nó.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > Nếu không có `MarkdownProvider`, Intlayer sẽ render markdown bằng trình biên dịch mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact hỗ trợ các node Markdown trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Component MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Nếu không có `MarkdownProvider`, Intlayer sẽ render markdown bằng trình phân tích cú pháp Markdown sang JSX mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid hỗ trợ các node Markdown trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // Component MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Nếu không có `MarkdownProvider`, Intlayer sẽ render markdown bằng trình phân tích cú pháp Markdown sang JSX mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular sử dụng chỉ thị `[innerHTML]` để render nội dung Markdown.

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

    > Nếu provider IntlayerMarkdown không được cấu hình, Intlayer sẽ render bằng trình biên dịch mặc định.

    Bạn cũng có thể cung cấp các ghi đè cục bộ cho các node cụ thể bằng phương thức `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Bạn có thể lấy Markdown dưới dạng chuỗi:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Và bạn có thể truy cập siêu dữ liệu markdown của mình như sau:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Các tiện ích hỗ trợ (Chỉ Chuỗi Markdown)

Các tiện ích này **chỉ render các chuỗi Markdown thô** và độc lập với `useIntlayer`. Hãy sử dụng chúng khi bạn cần render Markdown từ các nguồn khác ngoài từ điển của bạn.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Component `<MarkdownRenderer />`

    Render một chuỗi Markdown với các tùy chọn cụ thể.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Tiêu đề của tôi"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Nhận một hàm render đã được cấu hình trước.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Tiêu đề của tôi");
    ```

    #### Tiện ích `renderMarkdown()`
    Tiện ích độc lập để render bên ngoài các component.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Tiêu đề của tôi", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Component `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Tiêu đề của tôi" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Component `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Tiêu đề của tôi" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Tiêu đề của tôi")}
    ```

    #### Tiện ích `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Tiêu đề của tôi")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Component `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Tiêu đề của tôi"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Tiêu đề của tôi")}</div>;
    ```

    #### Tiện ích `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Tiêu đề của tôi")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Component `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Tiêu đề của tôi"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Tiêu đề của tôi")}</div>;
    ```

    #### Tiện ích `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Tiêu đề của tôi")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Service `IntlayerMarkdownService`
    Render một chuỗi Markdown sử dụng service.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

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

## Cấu hình Toàn cục với `MarkdownProvider`

`MarkdownProvider` (hoặc tương đương trong framework) cấu hình pipeline render Markdown cho toàn bộ ứng dụng của bạn. Điều này áp dụng cho cả render `useIntlayer` tự động và các tiện ích hỗ trợ. Các tùy chọn được đặt ở đây là mặc định — `.use()` sẽ ghi đè chúng ở cấp độ node.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Hỗ trợ MDX — bất kỳ tên component nào được sử dụng bên trong Markdown của bạn (ví dụ: `<MyCustomJSXComponent />`) đều được phân giải dựa trên bản đồ `components`.

    Bạn cũng có thể sử dụng trình render markdown của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```

    Bạn cũng có thể sử dụng trình render markdown của riêng mình:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    Bạn cũng có thể sử dụng trình render markdown của riêng mình:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    Bạn cũng có thể sử dụng trình render markdown của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    Bạn cũng có thể sử dụng trình render markdown của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Việc nhập trình render Markdown của bạn một cách động là một cách tuyệt vời để giảm dung lượng bundle của ứng dụng.

  </Tab>
</Tabs>
