---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Lợi ích của Intlayer
description: Khám phá những lợi ích và ưu điểm của việc sử dụng Intlayer trong các dự án của bạn. Hiểu tại sao Intlayer nổi bật giữa các khung khác.
keywords:
  - Lợi ích
  - Ưu điểm
  - Intlayer
  - Khung
  - So sánh
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Phát hành Trình biên dịch"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Cập nhật bảng so sánh"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Tại sao bạn nên cân nhắc sử dụng Intlayer?

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa được thiết kế đặc biệt dành cho các nhà phát triển JavaScript. Nó cho phép khai báo nội dung của bạn ở mọi nơi trong mã của bạn. Nó chuyển đổi các khai báo nội dung đa ngôn ngữ thành các từ điển có cấu trúc để tích hợp dễ dàng trong mã của bạn. Sử dụng TypeScript, **Intlayer** làm cho việc phát triển của bạn mạnh mẽ và hiệu quả hơn.

## Tại sao Intlayer được tạo ra?

Intlayer được tạo ra để giải quyết một vấn đề phổ biến ảnh hưởng đến tất cả các thư viện i18n phổ biến như `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` và `vue-i18n`.

Tất cả các giải pháp này đều áp dụng cách tiếp cận tập trung để liệt kê và quản lý nội dung của bạn. Ví dụ:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Hoặc ở đây sử dụng không gian tên:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Loại kiến trúc này làm chậm quá trình phát triển và khiến mã nguồn trở nên phức tạp hơn để bảo trì vì một số lý do:

1. **Đối với bất kỳ thành phần mới nào được tạo, bạn nên:**
   - Tạo tài nguyên/không gian tên mới trong thư mục `locales`
   - Nhớ nhập không gian tên mới trong trang của bạn
   - Dịch nội dung của bạn (thường được thực hiện thủ công bằng cách sao chép/dán từ các nhà cung cấp AI)

2. **Đối với bất kỳ thay đổi nào được thực hiện trên các thành phần của bạn, bạn nên:**
   - Tìm kiếm tài nguyên/không gian tên liên quan (xa thành phần)
   - Dịch nội dung của bạn
   - Đảm bảo nội dung của bạn được cập nhật cho mọi ngôn ngữ
   - Xác minh không gian tên của bạn không bao gồm các khóa/giá trị không sử dụng
   - Đảm bảo cấu trúc của các tệp JSON của bạn giống nhau cho tất cả các ngôn ngữ

Trên các dự án chuyên nghiệp sử dụng các giải pháp này, các nền tảng địa phương hóa thường được sử dụng để giúp quản lý việc dịch nội dung của bạn. Tuy nhiên, điều này có thể nhanh chóng trở nên tốn kém cho các dự án lớn.

Để giải quyết vấn đề này, Intlayer áp dụng một cách tiếp cận phân phạm vi nội dung của bạn theo từng thành phần và giữ nội dung của bạn gần với thành phần của bạn, như chúng ta thường làm với CSS (`styled-components`), các kiểu, tài liệu (`storybook`) hoặc kiểm thử đơn vị (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Cách tiếp cận này cho phép bạn:

1. **Tăng tốc độ phát triển**
   - Các tệp `.content.{{ts|mjs|cjs|json}}` có thể được tạo bằng tiện ích mở rộng VSCode
   - Các công cụ AI tự động hoàn thành trong IDE của bạn (như GitHub Copilot) có thể giúp bạn khai báo nội dung, giảm việc sao chép/dán

2. **Làm sạch mã nguồn của bạn**
   - Giảm độ phức tạp
   - Tăng khả năng bảo trì

3. **Sao chép các thành phần và nội dung liên quan của chúng dễ dàng hơn (Ví dụ: thành phần đăng nhập/đăng ký, v.v.)**
   - Bằng cách hạn chế rủi ro ảnh hưởng đến nội dung của các thành phần khác
   - Bằng cách sao chép/dán nội dung của bạn từ ứng dụng này sang ứng dụng khác mà không có các phụ thuộc bên ngoài

4. **Tránh làm bẩn mã nguồn của bạn với các khóa/giá trị không sử dụng cho các thành phần không sử dụng**
   - Nếu bạn không sử dụng một thành phần, Intlayer sẽ không nhập nội dung liên quan của nó
   - Nếu bạn xóa một thành phần, bạn sẽ dễ dàng nhớ xóa nội dung liên quan của nó vì nó sẽ có mặt trong cùng một thư mục

5. **Giảm chi phí lập luận cho các tác nhân AI để khai báo nội dung đa ngôn ngữ của bạn**
   - Tác nhân AI sẽ không phải quét toàn bộ mã nguồn của bạn để biết nơi triển khai nội dung của bạn
   - Các bản dịch có thể dễ dàng được thực hiện bằng các công cụ AI tự động hoàn thành trong IDE của bạn (như GitHub Copilot)

6. **Tối ưu hóa hiệu suất tải**
   - Nếu một thành phần được tải lười (lazy-loaded), nội dung liên quan của nó sẽ được tải cùng lúc

## Các tính năng bổ sung của Intlayer

| Tính năng                                                                                                                  | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Tính năng](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                         | **Hỗ trợ đa khung làm việc**<br><br>Intlayer tương thích với tất cả các khung làm việc và thư viện chính, bao gồm Next.js, React, Vite, Vue.js, Nuxt, Preact, Express và nhiều hơn nữa.                                                                                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)        | **Quản lý nội dung bằng sức mạnh JavaScript**<br><br>Tận dụng tính linh hoạt của JavaScript để xác định và quản lý nội dung của bạn một cách hiệu quả. <br><br> - [Khai báo nội dung](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Tính năng" width="700"> | **Trình biên dịch**<br><br>Trình biên dịch Intlayer tự động trích xuất nội dung từ các thành phần và tạo các tệp từ điển.<br><br> - [Trình biên dịch](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true)  | **Tệp khai báo nội dung theo ngôn ngữ**<br><br>Tăng tốc độ phát triển của bạn bằng cách khai báo nội dung của bạn một lần, trước khi tự động tạo.<br><br> - [Tệp khai báo nội dung theo ngôn ngữ](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                       | **Môi trường Type-Safe**<br><br>Tận dụng TypeScript để đảm bảo các định nghĩa nội dung và mã của bạn không có lỗi, đồng thời hưởng lợi từ tính năng tự động hoàn thành của IDE.<br><br> - [Cấu hình TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                          | **Thiết lập đơn giản hóa**<br><br>Bắt đầu và chạy nhanh chóng với cấu hình tối thiểu. Điều chỉnh các cài đặt cho quốc tế hóa, định tuyến, AI, xây dựng và xử lý nội dung một cách dễ dàng. <br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                    | **Truy xuất nội dung đơn giản hóa**<br><br>Không cần gọi hàm `t` cho từng phần nội dung. Truy xuất tất cả nội dung của bạn trực tiếp bằng một hook duy nhất.<br><br> - [Tích hợp React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                     | **Triển khai Server Component nhất quán**<br><br>Hoàn toàn phù hợp cho các server component của Next.js, sử dụng cùng một cách triển khai cho cả thành phần client và server, không cần truyền hàm `t` của bạn qua từng server component. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                            | **Mã nguồn được tổ chức**<br><br>Giữ cho mã nguồn của bạn có tổ chức hơn: 1 thành phần = 1 từ điển trong cùng một thư mục. Các bản dịch gần với các thành phần tương ứng của chúng giúp tăng khả năng bảo trì và sự rõ ràng. <br><br> - [Cách Intlayer hoạt động](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                          | **Định tuyến nâng cao**<br><br>Hỗ trợ đầy đủ định tuyến ứng dụng, thích ứng liền mạch với các cấu trúc ứng dụng phức tạp, cho Next.js, React, Vite, Vue.js, v.v.<br><br> - [Khám phá tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                             | **Hỗ trợ Markdown**<br><br>Nhập và diễn giải các tệp ngôn ngữ và Markdown từ xa cho nội dung đa ngôn ngữ như chính sách bảo mật, tài liệu, v.v. Diễn giải và làm cho siêu dữ liệu Markdown có thể truy cập được trong mã của bạn.<br><br> - [Tệp nội dung](https://intlayer.org/doc/concept/content/file)                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                        | **Trình biên tập trực quan & CMS miễn phí**<br><br>Một trình biên tập trực quan và CMS miễn phí có sẵn cho các nhà viết nội dung, loại bỏ nhu cầu về một nền tảng địa phương hóa. Giữ cho nội dung của bạn được đồng bộ hóa bằng Git, hoặc bên thứ ba hóa nó hoàn toàn hoặc một phần với CMS.<br><br> - [Trình biên tập Intlayer](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                               | **Nội dung Tree-shakable**<br><br>Nội dung tree-shakable, giảm kích thước của gói cuối cùng. Tải nội dung theo từng thành phần, loại trừ bất kỳ nội dung không sử dụng nào khỏi gói của bạn. Hỗ trợ tải lười để tăng hiệu quả tải ứng dụng. <br><br> - [Tối ưu hóa xây dựng ứng dụng](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                     | **Kết xuất tĩnh (Static Rendering)**<br><br>Không chặn Kết xuất tĩnh. <br><br> - [Tích hợp Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                       | **Dịch bằng AI**<br><br>Biến trang web của bạn sang 231 ngôn ngữ chỉ bằng một cú nhấp chuột bằng các công cụ dịch nâng cao được hỗ trợ bởi AI của Intlayer bằng cách sử dụng nhà cung cấp AI/khóa API của riêng bạn. <br><br> - [Tích hợp CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Tự động điền](https://intlayer.org/doc/concept/auto-fill)                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                  | **Tích hợp Máy chủ MCP**<br><br>Cung cấp máy chủ MCP (Model Context Protocol) để tự động hóa IDE, cho phép quản lý nội dung và quy trình làm việc i18n liền mạch ngay trong môi trường phát triển của bạn. <br><br> - [Máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/vi/mcp_server.md)                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                     | **Tiện ích mở rộng VSCode**<br><br>Intlayer cung cấp một tiện ích mở rộng VSCode để giúp bạn quản lý nội dung và bản dịch, xây dựng từ điển, dịch nội dung và nhiều hơn nữa. <br><br> - [Tiện ích mở rộng VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                     | **Khả năng tương tác**<br><br>Cho phép khả năng tương tác với react-i18next, next-i18next, next-intl và react-intl. <br><br> - [Intlayer và react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer và next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer và next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                  |
| Kiểm tra bản dịch còn thiếu (CLI/CI)                                                                                       | ✅ CLI: npx intlayer content test (kiểm tra thân thiện với CI)                                                                                                                                                                                                                                                                                                                                                                         |

## So sánh Intlayer với các giải pháp khác

| Tính năng                                        | `intlayer`                                                                                                                                 | `react-i18next`                                                                                     | `react-intl` (FormatJS)                                                                                                   | `lingui`                                                            | `next-intl`                                                                                        | `next-i18next`                                                                                     | `vue-i18n`                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Bản dịch gần các thành phần**                  | ✅ Có, nội dung được đặt cùng với từng thành phần                                                                                          | ❌ Không                                                                                            | ❌ Không                                                                                                                  | ❌ Không                                                            | ❌ Không                                                                                           | ❌ Không                                                                                           | ✅ Có - sử dụng `Single File Components` (SFCs)                   |
| **Tích hợp TypeScript**                          | ✅ Nâng cao, các kiểu nghiêm ngặt được tạo tự động                                                                                         | ⚠️ Cơ bản; cần cấu hình thêm để an toàn                                                             | ✅ Tốt, nhưng ít nghiêm ngặt hơn                                                                                          | ⚠️ Định kiểu, cần cấu hình                                          | ✅ Tốt                                                                                             | ⚠️ Cơ bản                                                                                          | ✅ Tốt (có sẵn kiểu; an toàn khóa cần thiết lập)                  |
| **Phát hiện bản dịch còn thiếu**                 | ✅ Làm nổi bật lỗi TypeScript và lỗi/cảnh báo trong thời gian xây dựng                                                                     | ⚠️ Chủ yếu là các chuỗi dự phòng (fallback) khi chạy                                                | ⚠️ Các chuỗi dự phòng                                                                                                     | ⚠️ Cần cấu hình thêm                                                | ⚠️ Dự phòng khi chạy                                                                               | ⚠️ Dự phòng khi chạy                                                                               | ⚠️ Dự phòng/cảnh báo khi chạy (có thể cấu hình)                   |
| **Nội dung phong phú (JSX/Markdown/thành phần)** | ✅ Hỗ trợ trực tiếp                                                                                                                        | ⚠️ Hạn chế / chỉ nội suy                                                                            | ⚠️ Cú pháp ICU, không phải JSX thực                                                                                       | ⚠️ Hạn chế                                                          | ❌ Không được thiết kế cho các nút phong phú                                                       | ⚠️ Hạn chế                                                                                         | ⚠️ Hạn chế (thành phần qua `<i18n-t>`, Markdown qua plugin)       |
| **Dịch bằng AI**                                 | ✅ Có, hỗ trợ nhiều nhà cung cấp AI. Có thể sử dụng bằng các khóa API của riêng bạn. Xem xét bối cảnh ứng dụng và phạm vi nội dung của bạn | ❌ Không                                                                                            | ❌ Không                                                                                                                  | ❌ Không                                                            | ❌ Không                                                                                           | ❌ Không                                                                                           | ❌ Không                                                          |
| **Trình biên tập trực quan**                     | ✅ Có, Trình biên tập trực quan cục bộ + CMS tùy chọn; có thể bên thứ ba hóa nội dung mã nguồn; có thể nhúng                               | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài                                   | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài                                                         | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài   | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài                                  | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài                                  | ❌ Không / có sẵn thông qua các nền tảng địa phương hóa bên ngoài |
| **Định tuyến được bản địa hóa**                  | ✅ Có, hỗ trợ các đường dẫn được bản địa hóa ngay từ đầu (hoạt động với Next.js & Vite)                                                    | ⚠️ Không tích hợp sẵn, yêu cầu plugin (ví dụ: `next-i18next`) hoặc cấu hình bộ định tuyến tùy chỉnh | ❌ Không, chỉ định dạng thông báo, định tuyến phải thủ công                                                               | ⚠️ Không tích hợp sẵn, yêu cầu plugin hoặc cấu hình thủ công        | ✅ Tích hợp sẵn, App Router hỗ trợ phân đoạn `[locale]`                                            | ✅ Tích hợp sẵn                                                                                    | ✅ Tích hợp sẵn                                                   |
| **Tạo tuyến đường động**                         | ✅ Có                                                                                                                                      | ⚠️ Plugin/hệ sinh thái hoặc thiết lập thủ công                                                      | ❌ Không được cung cấp                                                                                                    | ⚠️ Plugin/thủ công                                                  | ✅ Có                                                                                              | ✅ Có                                                                                              | ❌ Không được cung cấp (Nuxt i18n cung cấp)                       |
| **Số nhiều**                                     | ✅ Các mẫu dựa trên liệt kê                                                                                                                | ✅ Có thể cấu hình (các plugin như i18next-icu)                                                     | ✅ (ICU)                                                                                                                  | ✅ (ICU/messageformat)                                              | ✅ Tốt                                                                                             | ✅ Tốt                                                                                             | ✅ Các quy tắc số nhiều tích hợp sẵn                              |
| **Định dạng (ngày tháng, số, tiền tệ)**          | ✅ Các trình định dạng được tối ưu hóa (sử dụng Intl bên dưới)                                                                             | ⚠️ Qua các plugin hoặc cách sử dụng Intl tùy chỉnh                                                  | ✅ Trình định dạng ICU                                                                                                    | ✅ Helper ICU/CLI                                                   | ✅ Tốt (Intl helper)                                                                               | ✅ Tốt (Intl helper)                                                                               | ✅ Trình định dạng ngày tháng/số tích hợp sẵn (Intl)              |
| **Định dạng nội dung**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml đang phát triển)                                                                               | ⚠️ .json                                                                                            | ✅ .json, .js                                                                                                             | ⚠️ .po, .json                                                       | ✅ .json, .js, .ts                                                                                 | ⚠️ .json                                                                                           | ✅ .json, .js                                                     |
| **Hỗ trợ ICU**                                   | ⚠️ Đang phát triển                                                                                                                         | ⚠️ Qua plugin (i18next-icu)                                                                         | ✅ Có                                                                                                                     | ✅ Có                                                               | ✅ Có                                                                                              | ⚠️ Qua plugin (`i18next-icu`)                                                                      | ⚠️ Qua trình định dạng/trình biên dịch tùy chỉnh                  |
| **SEO Helper (hreflang, sitemap)**               | ✅ Công cụ tích hợp sẵn: các helper cho sitemap, robots.txt, metadata                                                                      | ⚠️ Các plugin cộng đồng/thủ công                                                                    | ❌ Không phải là cốt lõi                                                                                                  | ❌ Không phải là cốt lõi                                            | ✅ Tốt                                                                                             | ✅ Tốt                                                                                             | ❌ Không phải là cốt lõi (Nuxt i18n cung cấp các helper)          |
| **Hệ sinh thái / Cộng đồng**                     | ⚠️ Nhỏ hơn nhưng phát triển nhanh và phản ứng nhanh                                                                                        | ✅ Lớn nhất và trưởng thành                                                                         | ✅ Lớn                                                                                                                    | ⚠️ Nhỏ hơn                                                          | ✅ Quy mô trung bình, tập trung vào Next.js                                                        | ✅ Quy mô trung bình, tập trung vào Next.js                                                        | ✅ Lớn trong hệ sinh thái Vue                                     |
| **Server-side Rendering & Server Components**    | ✅ Có, được tối ưu cho SSR / React Server Components                                                                                       | ⚠️ Được hỗ trợ ở cấp trang nhưng cần truyền hàm t trên cây thành phần cho các server component con  | ⚠️ Được hỗ trợ ở cấp trang với thiết lập bổ sung, nhưng cần truyền hàm t trên cây thành phần cho các server component con | ✅ Được hỗ trợ, cần thiết lập                                       | ⚠️ Được hỗ trợ ở cấp trang nhưng cần truyền hàm t trên cây thành phần cho các server component con | ⚠️ Được hỗ trợ ở cấp trang nhưng cần truyền hàm t trên cây thành phần cho các server component con | ✅ SSR qua Nuxt/Vue SSR (không RSC)                               |
| **Tree-shaking (chỉ tải nội dung được sử dụng)** | ✅ Có, trên mỗi thành phần tại thời điểm xây dựng thông qua các plugin Babel/SWC                                                           | ⚠️ Thường tải tất cả (có thể được cải thiện với không gian tên/chia nhỏ mã)                         | ⚠️ Thường tải tất cả                                                                                                      | ❌ Không mặc định                                                   | ⚠️ Một phần                                                                                        | ⚠️ Một phần                                                                                        | ⚠️ Một phần (với chia nhỏ mã/thiết lập thủ công)                  |
| **Tải lười (Lazy loading)**                      | ✅ Có, theo từng ngôn ngữ / theo từng từ điển                                                                                              | ✅ Có (ví dụ: backends/không gian tên theo yêu cầu)                                                 | ✅ Có (tách rời các gói ngôn ngữ)                                                                                         | ✅ Có (nhập danh mục động)                                          | ✅ Có (theo tuyến đường/theo ngôn ngữ), cần quản lý không gian tên                                 | ✅ Có (theo tuyến đường/theo ngôn ngữ), cần quản lý không gian tên                                 | ✅ Có (thông báo ngôn ngữ không đồng bộ)                          |
| **Loại bỏ nội dung không sử dụng**               | ✅ Có, theo từng từ điển tại thời điểm xây dựng                                                                                            | ❌ Không, chỉ thông qua phân đoạn không gian tên thủ công                                           | ❌ Không, tất cả các thông báo được khai báo đều được đóng gói                                                            | ✅ Có, các khóa không sử dụng được phát hiện & loại bỏ khi xây dựng | ❌ Không, có thể được quản lý thủ công với quản lý không gian tên                                  | ❌ Không, có thể được quản lý thủ công với quản lý không gian tên                                  | ❌ Không, chỉ có thể thực hiện qua tải lười thủ công              |
| **Quản lý dự án lớn**                            | ✅ Khuyến khích tính mô-đun, phù hợp cho các hệ thống thiết kế                                                                             | ⚠️ Cần kỷ luật tệp tốt                                                                              | ⚠️ Các danh mục trung tâm có thể trở nên lớn                                                                              | ⚠️ Có thể trở nên phức tạp                                          | ✅ Mô-đun với thiết lập                                                                            | ✅ Mô-đun với thiết lập                                                                            | ✅ Mô-đun với thiết lập Vue Router/Nuxt i18n                      |

---

## Sao GitHub

Sao GitHub là một chỉ số mạnh mẽ về mức độ phổ biến của dự án, sự tin tưởng của cộng đồng và mức độ phù hợp lâu dài. Mặc dù không phải là thước đo trực tiếp về chất lượng kỹ thuật, chúng phản ánh số lượng nhà phát triển thấy dự án hữu ích, theo dõi tiến trình của nó và có khả năng áp dụng nó. Để ước tính giá trị của một dự án, các ngôi sao giúp so sánh sức hút giữa các lựa chọn thay thế và cung cấp thông tin chi tiết về sự phát triển của hệ sinh thái.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## Khả năng tương tác

`intlayer` cũng có thể giúp quản lý các không gian tên `react-intl`, `react-i18next`, `next-intl`, `next-i18next` và `vue-i18n` của bạn.

Sử dụng `intlayer`, bạn có thể khai báo nội dung của mình theo định dạng của thư viện i18n yêu thích và intlayer sẽ tạo các không gian tên của bạn tại vị trí bạn chọn (ví dụ: `/messages/{{locale}}/{{namespace}}.json`).
