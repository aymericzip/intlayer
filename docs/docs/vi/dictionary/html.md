---
createdAt: 2026-01-20
updatedAt: 2026-09-21
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
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.5.0
    date: 2026-03-24
    changes: "Add `intlayerHTML` plugin object; use `app.use(intlayerHTML)` instead of `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Chuyển import từ `{{framework}}-intlayer` sang `{{framework}}-intlayer/html`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Thêm HTMLRenderer / useHTMLRenderer / tiện ích renderHTML"
  - version: 8.0.0
    date: 2026-01-20
    changes: "Thêm hỗ trợ phân tích cú pháp HTML"
author: aymericzip
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
  <Tab label="Remix" value="remix">
    Trong Remix 3, các nút HTML giải quyết thành một chuỗi HTML. Chèn chuỗi đó bằng prop `innerHTML` của Remix JSX hoặc với `html.raw` trong chế độ xem `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myHtmlContent } = useIntlayer("app");

      return <div innerHTML={myHtmlContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myHtmlContent } = useIntlayer("app");

      return html.raw`<div>${myHtmlContent.value}</div>`;
    };
    ```

    > Remix mặc định thoát các giá trị được nội suy. `innerHTML` và `html.raw` là hai cách từ chối thoát, đây là điều mà một chuỗi HTML cần.

    Sử dụng phương thức `.use()` để ghi đè các thẻ hoặc ánh xạ các thành phần tùy chỉnh. Các ghi đè là các hàm trả về một chuỗi HTML:

    ```tsx
    <div
      innerHTML={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    Trong Astro, các nút HTML giải quyết thành một chuỗi HTML. Chèn chuỗi đó bằng chỉ thị `set:html` trong mẫu hoặc với `innerHTML` trong `<script>` phía client.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myHtmlContent } = useIntlayer("app");
    ---

    <div set:html={myHtmlContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myHtmlContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myHtmlContent.value;
    </script>
    ```

    > Astro mặc định thoát `{biểu thức}`. `set:html` là cách từ chối thoát, đây là điều mà một chuỗi HTML cần.

    Sử dụng phương thức `.use()` để ghi đè các thẻ hoặc ánh xạ các thành phần tùy chỉnh. Các ghi đè là các hàm trả về một chuỗi HTML:

    ```astro
    <div
      set:html={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
</Tabs>

## Cấu hình toàn cục với `HTMLProvider`

Bạn có thể cấu hình cách render HTML ở mức toàn cục cho toàn bộ ứng dụng của mình. Điều này lý tưởng để định nghĩa các component tùy chỉnh mà nên có sẵn trong tất cả nội dung HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

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

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('react-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      renderHTML: async (html) => {
        const { renderHTML } = await import('vue-intlayer/html');
        return renderHTML(html);
      },
    });

    app.mount("#app");
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
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

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
    </script>

    <HTMLProvider
      renderHTML={async (html) => {
        const { renderHTML } = await import('svelte-intlayer/html');
        return renderHTML(html);
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

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

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('preact-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

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

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('solid-intlayer/html');
          return renderHTML(html);
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

    Bạn cũng có thể sử dụng trình render HTML của riêng mình:

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          renderHTML: async (html) => {
            const { renderHTML } = await import('angular-intlayer/html');
            return renderHTML(html);
          },
        }),
      ],
    };
    ```

    > Import trình render HTML của bạn theo cách động là một cách tốt để giảm kích thước bundle của ứng dụng.

  </Tab>
  <Tab label="Remix" value="remix">

    Remix không có cây thành phần để chứa provider, do đó cấu hình được cài đặt một lần, dưới dạng singleton, khi máy chủ khởi động. Nó cấu hình renderer được trả về bởi `useHTMLRenderer()`. Các nút `html` được trả về bởi `useIntlayer` được kết xuất nguyên trạng; ghi đè các thẻ của chúng trên mỗi nút bằng `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > Sử dụng `installIntlayerHTMLDynamic(async () => …)` để tải chậm chính renderer; trình tải chỉ chạy trong lần gọi đầu tiên.

  </Tab>
  <Tab label="Astro" value="astro">

    Astro không có cây thành phần để chứa provider, do đó cấu hình được cài đặt một lần, dưới dạng singleton, trong middleware (máy chủ) và trong `<script>` phía client (trình duyệt). Nó cấu hình renderer được trả về bởi `useHTMLRenderer()`. Các nút `html` được trả về bởi `useIntlayer` được kết xuất nguyên trạng; ghi đè các thẻ của chúng trên mỗi nút bằng `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // Chạy một lần khi máy chủ khởi động; bản thân middleware Intlayer
    // được đăng ký bởi tích hợp, trước tệp này.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > Sử dụng `installIntlayerHTMLDynamic(async () => …)` để tải chậm chính renderer; trình tải chỉ chạy trong lần gọi đầu tiên.

  </Tab>
</Tabs>

### Kết xuất Thủ công & Công cụ Nâng cao

Nếu bạn cần kết xuất chuỗi HTML thô hoặc muốn kiểm soát nhiều hơn việc ánh xạ component, hãy sử dụng các công cụ sau.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Thành phần `<HTMLRenderer />`
    Kết xuất một chuỗi HTML sử dụng các component cụ thể.

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Lấy một hàm renderer đã được cấu hình sẵn.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Tiện ích `renderHTML()`

    Tiện ích độc lập để render bên ngoài các component.

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Thành phần `<HTMLRenderer />`

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer/html";
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
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Tiện ích `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### Thành phần `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Tiện ích `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### Thành phần `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Tiện ích `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Dịch vụ `IntlayerHTMLService`
    Render một chuỗi HTML bằng cách sử dụng dịch vụ.

    ```typescript
    import { IntlayerHTMLService } from "angular-intlayer/html";

    export class MyComponent {
      constructor(private markdownService: IntlayerHTMLService) {}

      renderHTML(html: string) {
        return this.markdownService.renderHTML(html);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### Hook `useHTMLRenderer()`

    Lấy một hàm renderer được cấu hình sẵn bởi `installIntlayerHTML()`. Nó trả về một chuỗi HTML.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### Tiện ích `renderHTML()`

    Tiện ích độc lập bỏ qua cấu hình toàn cục.

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### Hook `useHTMLRenderer()`

    Lấy một hàm renderer được cấu hình sẵn bởi `installIntlayerHTML()`. Nó trả về một chuỗi HTML.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### Tiện ích `renderHTML()`

    Tiện ích độc lập bỏ qua cấu hình toàn cục.

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Tham chiếu Tùy chọn

Các tùy chọn này có thể được truyền cho `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, và `renderHTML`.

| Tùy chọn     | Kiểu                  | Mặc định | Mô tả                                                                                                                          |
| :----------- | :-------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | Bản đồ các thẻ HTML hoặc tên component tùy chỉnh tới các component tương ứng.                                                  |
| `renderHTML` | `Function`            | `null`   | Hàm hiển thị tùy chỉnh để thay thế hoàn toàn trình phân tích cú pháp HTML mặc định (nhà cung cấp Vue, Svelte, Remix và Astro). |

> Lưu ý: Đối với React và Preact, các thẻ HTML chuẩn được cung cấp tự động. Bạn chỉ cần truyền prop `components` nếu bạn muốn ghi đè chúng hoặc thêm các component tùy chỉnh.
