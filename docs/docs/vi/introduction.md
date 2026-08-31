---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Giới thiệu
description: Khám phá cách Intlayer hoạt động. Xem các bước mà Intlayer sử dụng trong ứng dụng của bạn. Khám phá những gì các gói khác nhau thực hiện.
keywords:
  - Giới thiệu
  - Bắt đầu
  - Intlayer
  - Ứng dụng
  - Các gói
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Tài liệu Intlayer

Chào mừng bạn đến với tài liệu chính thức của Intlayer! Tại đây, bạn sẽ tìm thấy mọi thứ bạn cần để tích hợp, định cấu hình và làm chủ Intlayer cho mọi nhu cầu quốc tế hóa (i18n) của mình, cho dù bạn đang làm việc với Next.js, React, Vite, Express hay một môi trường JavaScript khác.

## Giới thiệu

### Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa được thiết kế đặc biệt dành cho các nhà phát triển JavaScript. Nó cho phép khai báo nội dung ở mọi nơi trong mã của bạn. Nó chuyển đổi việc khai báo nội dung đa ngôn ngữ thành các từ điển có cấu trúc để dễ dàng tích hợp vào mã của bạn. Việc sử dụng TypeScript giúp **Intlayer** làm cho quá trình phát triển của bạn mạnh mẽ và hiệu quả hơn.

Intlayer cũng cung cấp một trình soạn thảo trực quan tùy chọn cho phép bạn dễ dàng chỉnh sửa và quản lý nội dung của mình. Trình soạn thảo này đặc biệt hữu ích cho các nhà phát triển thích giao diện trực quan để quản lý nội dung, hoặc cho các nhóm tạo nội dung mà không phải lo lắng về code.

### Ví dụ về cách sử dụng

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      vi: "Chào Thế giới",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "vi": "Chào Thế giới"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Tại sao chọn Intlayer thay vì các giải pháp thay thế?

So với các giải pháp chính như `next-intl` hoặc `i18next`, Intlayer là một giải pháp đi kèm với các tối ưu hóa được tích hợp sẵn như:

<AccordionGroup>

<Accordion header="Kích thước Bundle (Bundle size)">

Thay vì tải các tệp JSON khổng lồ vào các trang của bạn, chỉ tải nội dung cần thiết. Intlayer giúp **giảm kích thước bundle và trang của bạn lên tới 50%**.

</Accordion>

<Accordion header="Khả năng bảo trì (Maintainability)">

Việc định phạm vi (scoping) nội dung ứng dụng của bạn **tạo điều kiện cho việc bảo trì** các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải chịu gánh nặng khi xem xét toàn bộ cơ sở mã nội dung của bạn. Ngoài ra, Intlayer **được định kiểu hoàn toàn (fully typed)** để đảm bảo độ chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI (AI Agent)">

Việc đặt nội dung cùng vị trí **làm giảm ngữ cảnh cần thiết** đối với các Mô hình Ngôn ngữ Lớn (LLM). Intlayer cũng đi kèm với một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để làm cho trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn cho các đại lý AI.

</Accordion>

<Accordion header="Tự động hóa (Automation)">

Sử dụng tự động hóa để dịch trong pipeline CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí của nhà cung cấp AI của bạn. Intlayer cũng cung cấp một **trình biên dịch (compiler)** để tự động hóa việc trích xuất nội dung, cũng như một [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất (Performance)">

Việc kết nối các tệp JSON khổng lồ với các thành phần (components) có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build (build time).

</Accordion>

<Accordion header="Mở rộng với những người không phải nhà phát triển (Scaling with non-dev)">

Không chỉ là một giải pháp i18n, Intlayer cung cấp một **[trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) có thể tự lưu trữ** và một **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình theo **thời gian thực**, giúp việc cộng tác với người dịch, copywriter và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

## Các tính năng chính

Intlayer cung cấp một loạt các tính năng được điều chỉnh để đáp ứng nhu cầu phát triển web hiện đại. Dưới đây là các tính năng chính, cùng với các liên kết đến tài liệu chi tiết cho từng tính năng:

- **Hỗ trợ Quốc tế hóa**: Tăng cường phạm vi tiếp cận toàn cầu của ứng dụng với khả năng hỗ trợ quốc tế hóa được tích hợp sẵn.
- **Trình soạn thảo Trực quan (Visual Editor)**: Cải thiện quy trình phát triển của bạn với các plugin trình soạn thảo được thiết kế cho Intlayer. Hãy xem [Hướng dẫn về Trình soạn thảo Trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).
- **Cấu hình Linh hoạt**: Tùy chỉnh thiết lập của bạn với các tùy chọn cấu hình mở rộng được trình bày chi tiết trong [Hướng dẫn Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).
- **Công cụ CLI Nâng cao**: Quản lý các dự án của bạn một cách hiệu quả bằng giao diện dòng lệnh của Intlayer. Khám phá các khả năng trong [Tài liệu về Công cụ CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

## Các khái niệm cốt lõi

### Từ điển (Dictionary)

Tổ chức nội dung đa ngôn ngữ của bạn gần với mã để giữ cho mọi thứ nhất quán và dễ bảo trì.

- **[Bắt đầu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)**  
  Tìm hiểu các khái niệm cơ bản về việc khai báo nội dung của bạn trong Intlayer.

- **[Dịch thuật (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)**  
  Hiểu cách các bản dịch được tạo, lưu trữ và sử dụng trong ứng dụng của bạn.

- **[Liệt kê (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md)**  
  Dễ dàng quản lý các tập dữ liệu lặp lại hoặc cố định trên nhiều ngôn ngữ khác nhau.

- **[Điều kiện (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/condition.md)**  
  Tìm hiểu cách sử dụng logic có điều kiện trong Intlayer để tạo nội dung động.

- **[Chèn (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)**  
  Khám phá cách chèn các giá trị vào một chuỗi (string) bằng cách sử dụng trình giữ chỗ (placeholder) chèn.

- **[Lấy hàm (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md)**  
  Xem cách tìm nạp nội dung động với logic tùy chỉnh để phù hợp với luồng công việc dự án của bạn.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)**  
  Tìm hiểu cách sử dụng Markdown trong Intlayer để tạo nội dung phong phú.

- **[Nhúng tệp (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/file.md)**  
  Khám phá cách nhúng các tệp bên ngoài vào Intlayer để sử dụng chúng trong trình soạn thảo nội dung.

- **[Lồng nhau (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/nesting.md)**  
  Hiểu cách lồng nội dung trong Intlayer để tạo các cấu trúc phức tạp.

### Môi trường & Tích hợp

Chúng tôi đã xây dựng Intlayer với tính linh hoạt cao, cung cấp khả năng tích hợp liền mạch trên các framework và công cụ build phổ biến:

- **[Intlayer với Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)**
- **[Intlayer với Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)**
- **[Intlayer với Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_14.md)**
- **[Intlayer với Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_page_router.md)**
- **[Intlayer với React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)**
- **[Intlayer với Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)**
- **[Intlayer với React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_router_v7.md)**
- **[Intlayer với Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)**
- **[Intlayer với React Native và Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_react_native+expo.md)**
- **[Intlayer với Lynx và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_lynx+react.md)**
- **[Intlayer với Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+preact.md)**
- **[Intlayer với Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md)**
- **[Intlayer với Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)**
- **[Intlayer với Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md)**
- **[Intlayer với SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_svelte_kit.md)**
- **[Intlayer với Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_express.md)**
- **[Intlayer với NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nestjs.md)**
- **[Intlayer với Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_hono.md)**
- **[Intlayer với Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md)**

Mỗi hướng dẫn tích hợp bao gồm các phương pháp hay nhất để sử dụng các tính năng của Intlayer, chẳng hạn như **kết xuất phía máy chủ (SSR)**, **định tuyến động** hoặc **kết xuất phía máy khách**, để bạn có thể duy trì một ứng dụng nhanh, thân thiện với SEO và có khả năng mở rộng cao.

## Đóng góp & Phản hồi

Chúng tôi coi trọng sức mạnh của nguồn mở và sự phát triển do cộng đồng thúc đẩy. Nếu bạn muốn đề xuất các cải tiến, thêm một hướng dẫn mới, hoặc sửa chữa bất kỳ vấn đề nào trong tài liệu của chúng tôi, vui lòng gửi Pull Request hoặc mở Issue trên [kho lưu trữ GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs) của chúng tôi.

**Bạn đã sẵn sàng để dịch ứng dụng của mình nhanh hơn và hiệu quả hơn chưa?** Hãy đi sâu vào tài liệu của chúng tôi để bắt đầu sử dụng Intlayer ngay hôm nay. Trải nghiệm một cách tiếp cận mạnh mẽ, hợp lý đối với quốc tế hóa giúp giữ cho nội dung của bạn được tổ chức và nhóm của bạn làm việc hiệu quả hơn.

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Intlayer được sử dụng để làm gì?">

Intlayer là thư viện quốc tế hóa (i18n) cho các ứng dụng JavaScript và TypeScript. Bạn khai báo nội dung component ngay bên cạnh component trong tệp `.content.ts`, Intlayer biên dịch các khai báo đó thành từ điển có kiểu dữ liệu tại thời điểm build, và các component của bạn đọc chúng qua hook như `useIntlayer`. Thư viện bao gồm dịch thuật, quy tắc số nhiều, giới tính, Markdown, định tuyến theo locale, metadata SEO, dịch tự động bằng AI, và visual editor cho người không chuyên.

</Question>

<Question title="i18n làm tăng kích thước bundle của tôi bao nhiêu?">

Ít hơn nhiều so with các cấu hình dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Mã hiển thị trên server phân giải nội dung ngay trên server, và compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng, do đó các khóa và ngôn ngữ không sử dụng sẽ bị loại bỏ. [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale. So với các giải pháp thông thường, Intlayer giảm kích thước bundle và trang tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ i18next, next-intl hoặc react-i18next mà không cần viết lại component không?">

Có, theo hai cách. Bạn có thể di chuyển nội dung dần dần bằng [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md) hoặc [hướng dẫn di chuyển từ next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md). Hoặc bạn có thể giữ nguyên API hiện tại: [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp chính xác các API tương tự như `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` và `Lingui`, nhưng chạy trên các từ điển Intlayer, nhờ đó chỉ có các lệnh import thay đổi còn mã component vẫn giữ nguyên.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Đối với quy trình làm việc hoàn toàn tự động, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build trên mã JSX, TSX, Vue và Svelte, tạo từ điển trên mỗi thay đổi mà không cần quản lý khóa thủ công.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo ở bất kỳ đâu. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng JavaScript?">

Lĩnh vực này được chia thành ba thế hệ:

- **Thư viện catalog runtime**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Thông điệp được lưu trong namespace JSON được tải ở runtime. Trưởng thành và không phụ thuộc framework, nhưng thiếu kiểm tra kiểu tĩnh và gửi toàn bộ catalog tới client.
- **Thư viện tin nhắn thời điểm biên dịch**: `Lingui`, `Paraglide`, `react-intl`, và `next-intl` với bước trích xuất. Hành vi bundle tốt hơn và có kiểm tra kiểu một phần, nhưng vẫn dựa trên catalog tập trung.
- **Thư viện lớp nội dung (Content layer)**: `Intlayer`. Nội dung được khai báo theo từng component và biên dịch theo từng component; kết hợp typing, tree-shaking, công cụ cho nhà phát triển và chỉnh sửa trực quan trong một nguồn sự thật duy nhất.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Intlayer hỗ trợ những framework nào?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro với bất kỳ component đảo nào, React Native với Expo, Lynx, và ở phía backend là Express, Fastify, NestJS, Hono, Elysia, và AdonisJS. Mỗi nền tảng đều có hướng dẫn riêng trong phần environments.

</Question>

<Question title="Tại sao nên khai báo nội dung cạnh component thay vì trong tệp JSON tập trung?">

Có ba lý do: Thứ nhất, trang chỉ phân phối những mục mà component của nó thực sự hiển thị thay vì toàn bộ namespace, giúp giảm đáng kể kích thước bundle. Thứ hai, thư mục tính năng có thể di chuyển hoặc xóa độc lập mà không lo mất dấu các khóa. Thứ ba, các LLM hoặc agent AI khi chỉnh sửa component sẽ nhìn thấy nội dung của nó trong cùng một thư mục, mang lại độ chính xác cao hơn. Xem [cách Intlayer hoạt động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/how_works_intlayer.md).

</Question>

<Question title="Làm cách nào để tự động dịch ứng dụng bằng AI?">

Chạy `npx intlayer fill`. CLI phát hiện các bản dịch còn thiếu và điền chúng bằng LLM bạn chọn, sử dụng provider và API key của riêng bạn. Flag `--git-diff` giới hạn thao tác ở nội dung đã thay đổi trên branch hiện tại. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Làm cách nào để tìm các bản dịch còn thiếu?">

Chạy `npx intlayer test`. Lệnh này sẽ báo lỗi nếu có bất kỳ locale đã khai báo nào bị thiếu nội dung, đảm bảo không có chuỗi chưa dịch nào lọt vào môi trường production. Tiện ích mở rộng VS Code đánh dấu các lỗi này ngay trong trình soạn thảo, và plugin ESLint gắn cờ các chuỗi văn bản thuần chưa được bọc. Xem [kiểm thử nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md).

</Question>

<Question title="Tôi có bắt buộc phải đưa locale vào URL không?">

Không. `routing.mode` chấp nhận `"prefix-no-default"` (mặc định: `/about` và `/vi/about`), `"prefix-all"`, `"no-prefix"`, và `"search-params"`, và `routing.domains` ánh xạ locale tới tên miền riêng. Bất kể lược đồ được chọn là gì, `getMultilingualUrls` tạo liên kết `hreflang` thay thế cho metadata và sitemap. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Question>

<Question title="Làm thế nào người dịch và biên tập viên có thể làm việc mà không cần chạm vào mã?">

Visual editor chạy trên cơ sở hạ tầng của chính bạn và cho phép bất kỳ ai nhấp vào văn bản trên trang web đang hoạt động để chỉnh sửa, lưu các thay đổi trở lại codebase. CMS tách biệt nội dung để cập nhật mà không cần redeploy. Xem [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) và [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có. Intlayer là mã nguồn mở theo giấy phép Apache 2.0; thư viện, CLI, compiler, và visual editor hoàn toàn miễn phí cho mục đích thương mại. CMS trên đám mây là dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
