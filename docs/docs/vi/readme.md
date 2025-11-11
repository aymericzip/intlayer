<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: Bộ công cụ i18n mã nguồn mở, linh hoạt với dịch thuật hỗ trợ AI & CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Tài liệu</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="phiên bản npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Số sao trên GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="lượt tải hàng tháng" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="giấy phép"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="lần cam kết cuối cùng"/>
  </a>
</p>

![Xem video](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Bắt_đầu-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer là gì?

Hầu hết các thư viện i18n đều quá phức tạp, quá cứng nhắc hoặc không được xây dựng cho các framework hiện đại.

Intlayer là một **giải pháp i18n hiện đại** dành cho các ứng dụng web và di động.  
Nó không phụ thuộc vào framework, được **trang bị AI**, và bao gồm một **CMS & trình chỉnh sửa trực quan** miễn phí.

Với **các tệp nội dung theo từng locale**, **tự động hoàn thành TypeScript**, **từ điển có thể tree-shake**, và **tích hợp CI/CD**, Intlayer giúp việc quốc tế hóa trở nên **nhanh hơn, sạch hơn và thông minh hơn**.

## Các lợi ích chính của Intlayer:

| Tính năng                                                                                                                                             | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Tính năng" width="700">                          | **Hỗ trợ đa Framework**<br><br>Intlayer tương thích với tất cả các framework và thư viện lớn, bao gồm Next.js, React, Vite, Vue.js, Nuxt, Preact, Express và nhiều hơn nữa.                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Tính năng" width="700">       | **Quản lý Nội dung bằng JavaScript**<br><br>Khai thác sự linh hoạt của JavaScript để định nghĩa và quản lý nội dung của bạn một cách hiệu quả. <br><br> - [Khai báo nội dung](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Tính năng" width="700"> | **Tệp Khai Báo Nội Dung Theo Mỗi Locale**<br><br>Tăng tốc phát triển của bạn bằng cách khai báo nội dung một lần, trước khi tự động sinh.<br><br> - [Tệp Khai Báo Nội Dung Theo Mỗi Locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Tính năng" width="700">                      | **Môi Trường An Toàn Kiểu**<br><br>Tận dụng TypeScript để đảm bảo định nghĩa nội dung và mã của bạn không có lỗi, đồng thời hưởng lợi từ tính năng tự động hoàn thành trong IDE.<br><br> - [Cấu hình TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Tính năng" width="700">                         | **Cài Đặt Đơn Giản Hóa**<br><br>Bắt đầu nhanh chóng với cấu hình tối thiểu. Dễ dàng điều chỉnh các thiết lập cho quốc tế hóa, định tuyến, AI, build và xử lý nội dung.<br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Tính năng" width="700">                   | **Truy Xuất Nội Dung Đơn Giản Hóa**<br><br>Không cần gọi hàm `t` cho từng phần nội dung. Truy xuất toàn bộ nội dung của bạn trực tiếp bằng một hook duy nhất.<br><br> - [Tích hợp React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Tính năng" width="700">                    | **Triển Khai Thành Phần Server Nhất Quán**<br><br>Phù hợp hoàn hảo cho các thành phần server của Next.js, sử dụng cùng một triển khai cho cả thành phần client và server, không cần truyền hàm `t` của bạn qua từng thành phần server.<br><br> - [Thành phần Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Tính năng" width="700">                           | **Codebase Có Tổ Chức**<br><br>Giữ cho codebase của bạn có tổ chức hơn: 1 component = 1 từ điển trong cùng một thư mục. Các bản dịch gần với các component tương ứng, nâng cao khả năng bảo trì và sự rõ ràng.<br><br> - [Cách Intlayer hoạt động](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Tính năng" width="700">                         | **Định Tuyến Nâng Cao**<br><br>Hỗ trợ đầy đủ định tuyến ứng dụng, thích nghi mượt mà với các cấu trúc ứng dụng phức tạp, dành cho Next.js, React, Vite, Vue.js, v.v.<br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Tính năng" width="700">                            | **Hỗ Trợ Markdown**<br><br>Nhập và giải thích các tệp locale và Markdown từ xa cho nội dung đa ngôn ngữ như chính sách bảo mật, tài liệu, v.v. Giải thích và làm cho metadata của Markdown có thể truy cập trong mã của bạn.<br><br> - [Tệp nội dung](https://intlayer.org/doc/concept/content/file)                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Tính năng" width="700">                       | **Trình Soạn Thảo Trực Quan & CMS Miễn Phí**<br><br>Một trình soạn thảo trực quan và CMS miễn phí có sẵn cho người viết nội dung, loại bỏ nhu cầu sử dụng nền tảng bản địa hóa. Giữ nội dung của bạn đồng bộ bằng cách sử dụng Git, hoặc ngoại hóa hoàn toàn hoặc một phần với CMS.<br><br> - [Trình Soạn Thảo Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Tính năng" width="700">                              | **Nội dung có thể Tree-shake**<br><br>Nội dung có thể tree-shake, giảm kích thước của gói cuối cùng. Tải nội dung theo từng component, loại trừ bất kỳ nội dung không sử dụng nào khỏi gói của bạn. Hỗ trợ lazy loading để nâng cao hiệu quả tải ứng dụng. <br><br> - [Tối ưu hóa xây dựng ứng dụng](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Tính năng" width="700">                    | **Kết xuất Tĩnh**<br><br>Không chặn Kết xuất Tĩnh. <br><br> - [Tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Tính năng" width="700">                      | **Dịch Thuật Dựa trên AI**<br><br>Biến trang web của bạn thành 231 ngôn ngữ chỉ với một cú nhấp chuột bằng cách sử dụng các công cụ dịch thuật tiên tiến dựa trên AI của Intlayer với nhà cung cấp AI / khóa API của riêng bạn. <br><br> - [Tích hợp CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI của Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Tự động điền](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Tính năng" width="700">                                 | **Tích Hợp Máy Chủ MCP**<br><br>Cung cấp một máy chủ MCP (Model Context Protocol) cho tự động hóa IDE, cho phép quản lý nội dung và quy trình làm việc i18n liền mạch trực tiếp trong môi trường phát triển của bạn. <br><br> - [Máy Chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Tính năng" width="700">                    | **Tiện Ích Mở Rộng VSCode**<br><br>Intlayer cung cấp một tiện ích mở rộng VSCode giúp bạn quản lý nội dung và bản dịch, xây dựng từ điển của bạn, dịch nội dung, và nhiều hơn thế nữa. <br><br> - [Tiện Ích Mở Rộng VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Tính năng" width="700">                    | **Tương Thích Liên Vận**<br><br>Cho phép tương thích liên vận với react-i18next, next-i18next, next-intl, và react-intl. <br><br> - [Intlayer và react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer và next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer và next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                            |

---

## 📦 Cài Đặt

Bắt đầu hành trình với Intlayer ngay hôm nay và trải nghiệm một cách tiếp cận quốc tế hóa mượt mà và mạnh mẽ hơn.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
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

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Xem hướng dẫn đầy đủ → </a>

## 🎥 Hướng dẫn trực tiếp trên YouTube

[![Cách quốc tế hóa ứng dụng của bạn bằng Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Mục lục

Khám phá tài liệu toàn diện của chúng tôi để bắt đầu với Intlayer và học cách tích hợp nó vào các dự án của bạn.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Bắt đầu</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Tại sao chọn Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Giới thiệu</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Khái niệm</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Cách Intlayer hoạt động</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Cấu hình</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Nhà cung cấp AI</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Trình chỉnh sửa Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Từ điển</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Tệp khai báo nội dung theo từng locale</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Dịch thuật</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Liệt kê</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Điều kiện</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Lồng nhau</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Lấy dữ liệu hàm</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Chèn</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Tệp</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Môi trường</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer với Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Khởi đầu với Tanstack</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/what_is_internationalization.md">I18n là gì</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">I18n và SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer và i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer và react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer và next-intl</a></li>
</ul>
</details>

## 🌐 Đọcme bằng các ngôn ngữ khác

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Cộng đồng

Intlayer được xây dựng bởi và dành cho cộng đồng và chúng tôi rất mong nhận được ý kiến đóng góp của bạn!

- Có đề xuất? [Mở một issue](https://github.com/aymericzip/intlayer/issues)
- Phát hiện lỗi hoặc cải tiến? [Gửi PR](https://github.com/aymericzip/intlayer/pulls)
- Cần trợ giúp hoặc muốn kết nối? [Tham gia Discord của chúng tôi](https://discord.gg/7uxamYVeCk)

Bạn cũng có thể theo dõi chúng tôi trên:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Đóng góp

Để biết hướng dẫn chi tiết hơn về cách đóng góp cho dự án này, vui lòng tham khảo tệp [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Nó chứa thông tin quan trọng về quy trình phát triển, quy ước tin nhắn commit và quy trình phát hành của chúng tôi. Những đóng góp của bạn rất quý giá đối với chúng tôi, và chúng tôi đánh giá cao nỗ lực của bạn trong việc làm cho dự án này tốt hơn!

### Cảm ơn Bạn Đã Hỗ Trợ

Nếu bạn thích Intlayer, hãy cho chúng tôi một ⭐ trên GitHub. Điều này giúp người khác khám phá dự án!

[![Biểu đồ Lịch sử Sao](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
