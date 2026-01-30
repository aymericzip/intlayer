---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Nội dung HTML
description: Tìm hiểu cách khai báo và sử dụng nội dung HTML với các component tùy chỉnh trong Intlayer. Theo dõi tài liệu này để nhúng nội dung giống HTML phong phú với việc thay thế component động trong dự án quốc tế hóa của bạn.
keywords:
  - HTML
  - Component tùy chỉnh
  - Nội dung phong phú
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Thêm HTMLRenderer / useHTMLRenderer / tiện ích renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Thêm hỗ trợ phân tích cú pháp HTML
---

# Nội dung HTML / HTML trong Intlayer

Intlayer hỗ trợ nội dung HTML, cho phép bạn nhúng nội dung phong phú, có cấu trúc vào trong các dictionary của mình. Nội dung này có thể được hiển thị bằng các thẻ HTML tiêu chuẩn hoặc được thay thế bằng các component tùy chỉnh vào thời điểm chạy.

## Khai báo nội dung HTML

Bạn có thể khai báo nội dung HTML bằng hàm `html` hoặc đơn giản bằng một chuỗi.

<Tabs>
  <Tab label="Bọc thủ công" value="manual-wrapping">
    Sử dụng hàm `html` để khai báo rõ ràng nội dung HTML. Điều này đảm bảo các thẻ chuẩn được ánh xạ đúng ngay cả khi phát hiện tự động bị tắt.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // có thể đặt trong tệp cấu hình
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Phát hiện tự động" value="automatic-detection">
    Nếu chuỗi chứa các thẻ HTML phổ biến (ví dụ: `<p>`, `<div>`, `<strong>`, v.v.), Intlayer sẽ tự động chuyển đổi nó.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // có thể đặt trong tệp cấu hình
      content: {
        myHtmlContent:  "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Tệp bên ngoài" value="external-files">
    Nhập nội dung HTML từ các tệp. Lưu ý rằng hiện tại hàm `file()` trả về một chuỗi, chuỗi này sẽ được tự động nhận diện là HTML nếu nó chứa các thẻ.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### Node `html()`

Hàm `html()` là một tính năng mới trong Intlayer v8 cho phép bạn xác định rõ ràng nội dung HTML trong từ điển của mình. Mặc dù Intlayer thường có thể tự động phát hiện nội dung HTML, nhưng việc sử dụng hàm `html()` mang lại một số lợi thế:

- **An toàn kiểu (Type Safety)**: Hàm `html()` cho phép bạn xác định các props mong đợi cho các thành phần tùy chỉnh, cung cấp khả năng tự động hoàn thành và kiểm tra kiểu tốt hơn trong trình soạn thảo của bạn.
- **Khai báo rõ ràng**: Nó đảm bảo rằng một chuỗi luôn được coi là HTML, ngay cả khi nó không chứa các thẻ HTML tiêu chuẩn để kích hoạt tính năng tự động phát hiện.
- **Định nghĩa thành phần tùy chỉnh**: Bạn có thể truyền đối số thứ hai vào `html()` để xác định các thành phần tùy chỉnh và các kiểu prop mong đợi của chúng.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Xin chào'>Thế giới</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Khi sử dụng phương thức `.use()` trên một node HTML, các thành phần bạn cung cấp sẽ được kiểm tra so với định nghĩa được cung cấp trong hàm `html()` (nếu có).

---

## Kết xuất HTML

Việc kết xuất có thể được xử lý tự động bởi hệ thống nội dung của Intlayer hoặc thực hiện thủ công bằng các công cụ chuyên dụng.

### Kết xuất tự động (sử dụng `useIntlayer`)

Khi bạn truy cập nội dung qua `useIntlayer`, các nút HTML đã được chuẩn bị sẵn để kết xuất.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Các nút HTML có thể được kết xuất trực tiếp dưới dạng JSX. Các thẻ tiêu chuẩn hoạt động tự động.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Sử dụng phương thức `.use()` để cung cấp component tùy chỉnh hoặc ghi đè các thẻ:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Trong Vue, nội dung HTML có thể được render bằng thành phần built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Sử dụng `.use()` để ghi đè:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte render các node HTML dưới dạng chuỗi. Sử dụng `{@html}` để render chúng.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact hỗ trợ các node HTML trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid hỗ trợ các node HTML trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular sử dụng chỉ thị `[innerHTML]` để hiển thị nội dung HTML.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Sử dụng phương thức `.use()` để cung cấp các thành phần tùy chỉnh hoặc ghi đè các thẻ:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Cấu hình toàn cục với `HTMLProvider`

Bạn có thể cấu hình cách render HTML ở mức toàn cục cho toàn bộ ứng dụng của mình. Điều này lý tưởng để định nghĩa các component tùy chỉnh mà nên có sẵn trong tất cả nội dung HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Vue" value="vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### Kết xuất Thủ công & Công cụ Nâng cao

Nếu bạn cần kết xuất chuỗi HTML thô hoặc muốn kiểm soát nhiều hơn việc ánh xạ component, hãy sử dụng các công cụ sau.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Thành phần `<HTMLRenderer />`
    Kết xuất một chuỗi HTML sử dụng các component cụ thể.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Lấy một hàm renderer đã được cấu hình sẵn.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Tiện ích `renderHTML()`

    Tiện ích độc lập để render bên ngoài các component.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Thành phần `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### Thành phần `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Tiện ích `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Thành phần `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Tiện ích `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Thành phần `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Tiện ích `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Dịch vụ `IntlayerMarkdownService`
    Render một chuỗi HTML bằng cách sử dụng dịch vụ.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Tham chiếu Tùy chọn

Các tùy chọn này có thể được truyền cho `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, và `renderHTML`.

| Tùy chọn     | Kiểu                  | Mặc định | Mô tả                                                                                                                |
| :----------- | :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | Bản đồ các thẻ HTML hoặc tên component tùy chỉnh tới các component tương ứng.                                        |
| `renderHTML` | `Function`            | `null`   | Một hàm render/kết xuất tùy chỉnh để thay thế hoàn toàn bộ parser HTML mặc định (Chỉ dành cho Vue/Svelte providers). |

> Lưu ý: Đối với React và Preact, các thẻ HTML chuẩn được cung cấp tự động. Bạn chỉ cần truyền prop `components` nếu bạn muốn ghi đè chúng hoặc thêm các component tùy chỉnh.
