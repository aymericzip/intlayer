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

## Cách HTML hoạt động

Intlayer v8 thông minh phát hiện các thẻ HTML trong các chuỗi nội dung của bạn. Nếu một chuỗi được xác định là HTML (chứa thẻ), nó sẽ tự động được chuyển thành một node HTML.

<Columns>
<Column title="Hành vi v7 (Bao bọc thủ công)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="Hành vi v8 (Phát hiện tự động)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Khai báo nội dung HTML

Bạn có thể khai báo nội dung HTML bằng hàm `html` hoặc đơn giản bằng một chuỗi.

<Tabs>
  <Tab label="Bọc thủ công">
    Sử dụng hàm `html` để khai báo rõ ràng nội dung HTML. Điều này đảm bảo các thẻ chuẩn được ánh xạ đúng ngay cả khi phát hiện tự động bị tắt.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Phát hiện tự động">
    Nếu chuỗi chứa các thẻ HTML phổ biến (ví dụ: `<p>`, `<div>`, `<strong>`, v.v.), Intlayer sẽ tự động chuyển đổi nó.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Tệp bên ngoài">
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

---

## Kết xuất HTML

Việc kết xuất có thể được xử lý tự động bởi hệ thống nội dung của Intlayer hoặc thực hiện thủ công bằng các công cụ chuyên dụng.

### Kết xuất tự động (sử dụng `useIntlayer`)

Khi bạn truy cập nội dung qua `useIntlayer`, các nút HTML đã được chuẩn bị sẵn để kết xuất.

<Tabs group="framework">
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
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
  <Tab label="Svelte">
    Svelte render các node HTML dưới dạng chuỗi. Sử dụng `{@html}` để render chúng.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact hỗ trợ các node HTML trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid hỗ trợ các node HTML trực tiếp trong JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
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
  <Tab label="React / Next.js">
  
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
  <Tab label="Vue">
  
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
  <Tab label="Svelte">
   
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
  <Tab label="Preact">
   
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
  <Tab label="Solid">
   
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
  <Tab label="Angular">

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
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
   
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
  <Tab label="Svelte">
  
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
  <Tab label="Preact">
   
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
  <Tab label="Solid">
   
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
  <Tab label="Angular">
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
