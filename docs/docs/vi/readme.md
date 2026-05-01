<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong>i18n theo từng component</strong>
</h1>
<h2 align="center">
  <strong>Dịch thuật hỗ trợ bởi AI. Trình chỉnh sửa trực quan. CMS đa ngôn ngữ.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="phiên bản npm" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="lượt tải hàng tháng" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="giấy phép"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="lần cam kết cuối cùng"/>
  </a>
</p>

![Xem video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Bắt_đầu-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer là gì?

Hầu hết các thư viện i18n đều quá phức tạp, quá cứng nhắc hoặc không được xây dựng cho các framework hiện đại.

Intlayer là một **giải pháp i18n hiện đại** dành cho các ứng dụng web và di động.  
Nó không phụ thuộc vào framework, được **trang bị AI**, và bao gồm một **CMS & trình chỉnh sửa trực quan** miễn phí.

Với **các tệp nội dung theo từng locale**, **tự động hoàn thành TypeScript**, **từ điển có thể tree-shake**, và **tích hợp CI/CD**, Intlayer giúp việc quốc tế hóa trở nên **nhanh hơn, sạch hơn và thông minh hơn**.

## Các lợi ích chính của Intlayer:

| Tính năng                                                                                                                                                | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Hỗ trợ" width="700">                                | **Hỗ trợ đa Framework**<br><br>Intlayer tương thích với tất cả các framework và thư viện lớn, bao gồm Next.js, React, Vite, Vue.js, Nuxt, Preact, Express và nhiều hơn nữa.                                                                                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="JavaScript" width="700">         | **Quản lý nội dung bằng JavaScript**<br><br>Khai thác sự linh hoạt của JavaScript để định nghĩa và quản lý nội dung của bạn một cách hiệu quả. <br><br> - [Khai báo nội dung](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Tệp nội dung" width="700"> | **Tệp Khai Báo Nội Dung Theo Mỗi Locale**<br><br>Tăng tốc phát triển của bạn bằng cách khai báo nội dung một lần, trước khi tự động sinh.<br><br> - [Tệp Khai Báo Nội Dung Theo Mỗi Locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Compiler" width="700">                                | **Trình biên dịch**<br><br>Trình biên dịch Intlayer tự động trích xuất nội dung từ các component và tạo ra các tệp từ điển.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="TypeScript" width="700">                        | **Môi Trường An Toàn Kiểu**<br><br>Tận dụng TypeScript để đảm bảo định nghĩa nội dung và mã của bạn không có lỗi, đồng thời hưởng lợi từ tính năng tự động hoàn thành trong IDE.<br><br> - [Cấu hình TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Cấu hình" width="700">                             | **Cài Đặt Đơn Giản Hóa**<br><br>Bắt đầu nhanh chóng với cấu hình tối thiểu. Dễ dàng điều chỉnh các thiết lập cho quốc tế hóa, định tuyến, AI, build và xử lý nội dung.<br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Truy xuất" width="700">                      | **Truy Xuất Nội Dung Đơn Giản Hóa**<br><br>Không cần gọi hàm `t` cho từng phần nội dung. Truy xuất toàn bộ nội dung của bạn trực tiếp bằng một hook duy nhất.<br><br> - [Tích hợp React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Server Component" width="700">                | **Triển Khai Thành Phần Server Nhất Quán**<br><br>Phù hợp hoàn hảo cho các thành phần server của Next.js, sử dụng cùng một triển khai cho cả thành phần client và server, không cần truyền hàm `t` của bạn qua từng thành phần server.<br><br> - [Thành phần Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Cấu trúc" width="700">                               | **Codebase Có Tổ Chức**<br><br>Giữ cho codebase của bạn có tổ chức hơn: 1 component = 1 từ điển trong cùng một thư mục. Các bản dịch gần với các component tương ứng, nâng cao khả năng bảo trì và sự rõ ràng.<br><br> - [Cách Intlayer hoạt động](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Routing" width="700">                              | **Định Tuyến Nâng Cao**<br><br>Hỗ trợ đầy đủ định tuyến ứng dụng, thích nghi mượt mà với các cấu trúc ứng dụng phức tạp, dành cho Next.js, React, Vite, Vue.js, v.v.<br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Markdown" width="700">                                | **Hỗ Trợ Markdown**<br><br>Nhập và giải thích các tệp locale và Markdown từ xa cho nội dung đa ngôn ngữ như chính sách bảo mật, tài liệu, v.v. Giải thích và làm cho metadata của Markdown có thể truy cập trong mã của bạn.<br><br> - [Tệp nội dung](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="CMS" width="700">                                | **Editor Trực Quan & CMS Miễn Phí**<br><br>Một trình soạn thảo trực quan và CMS miễn phí có sẵn cho người viết nội dung, loại bỏ nhu cầu sử dụng nền tảng bản địa hóa. Giữ nội dung của bạn đồng bộ bằng cách sử dụng Git, hoặc ngoại hóa hoàn toàn hoặc một phần với CMS.<br><br> - [Trình Soạn Thảo Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Bundle" width="700">                                    | **Nội dung có thể Tree-shake**<br><br>Nội dung có thể tree-shake, giảm kích thước của gói cuối cùng. Tải nội dung theo từng component, loại trừ bất kỳ nội dung không sử dụng nào khỏi gói của bạn. Hỗ trợ lazy loading để nâng cao hiệu quả tải ứng dụng. <br><br> - [Tối ưu hóa xây dựng ứng dụng](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Static Rendering" width="700">                | **Static Rendering**<br><br>Không chặn Kết xuất Tĩnh. <br><br> - [Tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="AI" width="700">                                | **Dịch thuật dựa trên AI**<br><br>Biến trang web của bạn thành 231 ngôn ngữ chỉ với một cú nhấp chuột bằng cách sử dụng các công cụ dịch thuật tiên tiến dựa trên AI của Intlayer với nhà cung cấp AI / khóa API của riêng bạn. <br><br> - [Tích hợp CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI của Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Tự động điền](https://intlayer.org/doc/concept/auto-fill)                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="MCP" width="700">                                          | **Tích hợp Server MCP**<br><br>Cung cấp một máy chủ MCP (Model Context Protocol) cho tự động hóa IDE, cho phép quản lý nội dung và quy trình làm việc i18n liền mạch trực tiếp trong môi trường phát triển của bạn. <br><br> - [Máy Chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="VSCode" width="700">                          | **Tiện ích mở rộng VSCode**<br><br>Intlayer cung cấp một tiện ích mở rộng VSCode giúp bạn quản lý nội dung và bản dịch, xây dựng từ điển của bạn, dịch nội dung, và nhiều hơn thế nữa. <br><br> - [Tiện Ích Mở Rộng VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Interoperability" width="700">                | **Khả năng tương tác**<br><br>Cho phép tương thích liên vận với react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer và react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer và next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer và next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer và vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 Cài Đặt

Bắt đầu hành trình với Intlayer ngay hôm nay và trải nghiệm một cách tiếp cận quốc tế hóa mượt mà và mạnh mẽ hơn.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Bắt_đầu-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Bắt đầu nhanh (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Xem hướng dẫn đầy đủ → </a>

## 🎥 Video hướng dẫn trên YouTube

[![Cách quốc tế hóa ứng dụng của bạn bằng Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Bắt_đầu-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Mục lục

Khám phá tài liệu toàn diện của chúng tôi để bắt đầu với Intlayer và học cách tích hợp nó vào các dự án của bạn.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Bắt đầu</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Tại sao chọn Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Giới thiệu</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Khái niệm</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Cách Intlayer hoạt động</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Cấu hình</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>Trình biên dịch</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer Editor</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Từ điển</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Tệp khai báo nội dung theo mỗi locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Dịch thuật</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Liệt kê</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Điều kiện</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Lồng nhau</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Lấy dữ liệu từ hàm</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Chèn</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>Tệp</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Môi trường</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer với Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js sử dụng trình biên dịch</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React sử dụng trình biên dịch</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/tanstack-start" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/tanstack-start/solid" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/astro" rel=''>Astro</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/astro/react" rel=''>React</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vue" rel=''>Vue</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/svelte" rel=''>Svelte</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/solid" rel=''>Solid</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/vanilla" rel=''>Vanilla JS</a></li>
      <li><a href="https://intlayer.org/doc/environment/astro/lit" rel=''>Lit</a></li>
    </ul>
  </li>

  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>Backend</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📊 Benchmark</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md" rel=''>Next.js</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md" rel=''>TanStack Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md" rel=''>Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md" rel=''>Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md" rel=''>Svelte</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/what_is_internationalization.md" rel=''>i18n là gì</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n và SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer và i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer và react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer và next-intl</a></li>
</ul>
</details>

## 🌐 Readme bằng các ngôn ngữ khác

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 Cộng đồng

Intlayer được xây dựng bởi và dành cho cộng đồng và chúng tôi rất mong nhận được ý kiến đóng góp của bạn!

- Có đề xuất? [Mở một issue](https://github.com/aymericzip/intlayer/issues)
- Phát hiện lỗi hoặc cải tiến? [Gửi PR](https://github.com/aymericzip/intlayer/pulls)
- Cần trợ giúp hoặc muốn kết nối? [Tham gia Discord của chúng tôi](https://discord.gg/7uxamYVeCk)

Bạn cũng có thể theo dõi chúng tôi trên:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Đóng góp

Để biết hướng dẫn chi tiết hơn về cách đóng góp cho dự án này, vui lòng tham khảo tệp [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Nó chứa thông tin quan trọng về quy trình phát triển, quy ước tin nhắn commit và quy trình phát hành của chúng tôi. Những đóng góp của bạn rất quý giá đối với chúng tôi, và chúng tôi đánh giá cao nỗ lực của bạn trong việc làm cho dự án này tốt hơn!

Đóng góp trên [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) hoặc [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Cảm ơn sự ủng hộ của bạn

Nếu bạn thích Intlayer, hãy cho chúng tôi một ⭐ trên GitHub. Điều này giúp người khác khám phá dự án! [Xem tại sao GitHub Stars quan trọng](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
