---
createdAt: 2025-08-23
updatedAt: 2025-09-23
title: Trình chỉnh sửa trực quan Intlayer | Chỉnh sửa nội dung của bạn bằng trình chỉnh sửa trực quan
description: Khám phá cách sử dụng Trình chỉnh sửa Intlayer để quản lý trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - Trình chỉnh sửa
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.1.0
    date: 2025-09-23
    changes: "Thêm tùy chọn with trên CLI"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Thay đổi hành vi của trình chỉnh sửa khi phần mở rộng tệp không phải là `.json`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Thêm lệnh reexported"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tài liệu Trình chỉnh sửa trực quan Intlayer

<iframe title="Trình chỉnh sửa trực quan + CMS cho ứng dụng web của bạn: Giải thích Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Trình chỉnh sửa trực quan Intlayer là một công cụ bao bọc trang web của bạn để tương tác với các tệp khai báo nội dung của bạn bằng cách sử dụng trình chỉnh sửa trực quan.

![Giao diện Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Gói `intlayer-editor` được xây dựng dựa trên Intlayer và có sẵn cho các ứng dụng JavaScript, chẳng hạn như React (Create React App), Vite + React và Next.js.

## Trình chỉnh sửa trực quan và CMS

Trình chỉnh sửa trực quan Intlayer là một công cụ cho phép bạn quản lý nội dung của mình trong trình chỉnh sửa trực quan dành cho các từ điển cục bộ. Khi có thay đổi được thực hiện, nội dung sẽ được thay thế trong code-base. Điều đó có nghĩa là ứng dụng sẽ được xây dựng lại và trang sẽ được tải lại để hiển thị nội dung mới.

Ngược lại, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) là một công cụ cho phép bạn quản lý nội dung trong trình chỉnh sửa trực quan dành cho các từ điển từ xa. Khi có sự thay đổi, nội dung sẽ **không** ảnh hưởng đến code-base của bạn. Và trang web sẽ tự động hiển thị nội dung đã thay đổi.

## Tích hợp Intlayer vào ứng dụng của bạn

Để biết thêm chi tiết về cách tích hợp Intlayer, xem phần liên quan bên dưới:

### Tích hợp với Next.js

Để tích hợp với Next.js, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md).

### Tích hợp với Create React App

Để tích hợp với Create React App, xem hướng dẫn [cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md).

### Tích hợp với Vite + React

Để tích hợp với Vite + React, xem hướng dẫn [cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md).

## Cách hoạt động của Intlayer Editor

Trình chỉnh sửa trực quan trong một ứng dụng bao gồm hai phần:

- Một ứng dụng frontend sẽ hiển thị trang web của bạn trong một iframe. Nếu trang web của bạn sử dụng Intlayer, trình chỉnh sửa trực quan sẽ tự động phát hiện nội dung của bạn và cho phép bạn tương tác với nó. Khi có sự thay đổi, bạn sẽ có thể tải xuống các thay đổi của mình.

- Khi bạn nhấn nút tải xuống, trình chỉnh sửa trực quan sẽ gửi một yêu cầu đến máy chủ để thay thế các tệp khai báo nội dung của bạn bằng nội dung mới (bất cứ nơi nào các tệp này được khai báo trong dự án của bạn).

> Lưu ý rằng Intlayer Editor sẽ ghi các tệp khai báo nội dung của bạn dưới dạng JSON nếu phần mở rộng tệp là `.json`. Nếu phần mở rộng tệp là `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, nó sẽ ghi tệp dưới dạng tệp JavaScript sử dụng bộ biến đổi babel.

## Cài đặt

Khi Intlayer đã được cấu hình trong dự án của bạn, chỉ cần cài đặt `intlayer-editor` như một phụ thuộc phát triển:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Với cờ `--with`, bạn có thể khởi động trình chỉnh sửa song song với một lệnh khác:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Cấu hình

Trong tệp cấu hình Intlayer của bạn, bạn có thể tùy chỉnh các thiết lập của trình chỉnh sửa:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bắt buộc
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan sẽ nhắm tới.
     * Ví dụ: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Tùy chọn
     * Mặc định là `true`. Nếu là `false`, trình chỉnh sửa sẽ không hoạt động và không thể truy cập được.
     * Có thể được sử dụng để vô hiệu hóa trình chỉnh sửa cho các môi trường cụ thể vì lý do bảo mật, chẳng hạn như môi trường production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Tùy chọn
     * Mặc định là `8000`.
     * Cổng của máy chủ trình chỉnh sửa.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Tùy chọn
     * Mặc định là "http://localhost:8000"
     * URL của máy chủ trình chỉnh sửa.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Để xem tất cả các tham số có sẵn, tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Sử dụng Trình chỉnh sửa

1. Khi trình chỉnh sửa được cài đặt, bạn có thể khởi động trình chỉnh sửa bằng lệnh sau:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Lưu ý rằng bạn nên chạy ứng dụng của mình song song.** URL của ứng dụng phải khớp với URL bạn đã thiết lập trong cấu hình trình chỉnh sửa (`applicationURL`).

   > **Lưu ý lệnh này được tái xuất bởi package `intlayer`. Bạn có thể sử dụng `npx intlayer editor start` thay thế.**

2. Sau đó, mở URL được cung cấp. Mặc định là `http://localhost:8000`.

   Bạn có thể xem từng trường được Intlayer lập chỉ mục bằng cách di chuột qua nội dung của bạn.

![Di chuột qua nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Nếu nội dung của bạn được đánh dấu viền, bạn có thể nhấn giữ lâu để hiển thị ngăn chỉnh sửa.

## Cấu hình môi trường

Trình chỉnh sửa có thể được cấu hình để sử dụng một tệp môi trường cụ thể. Điều này hữu ích khi bạn muốn sử dụng cùng một tệp cấu hình cho phát triển và sản xuất.

Để sử dụng một tệp môi trường cụ thể, bạn có thể sử dụng cờ `--env-file` hoặc `-f` khi khởi động trình chỉnh sửa:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Lưu ý rằng tệp môi trường nên được đặt trong thư mục gốc của dự án của bạn.

Hoặc bạn có thể sử dụng cờ `--env` hoặc `-e` để chỉ định môi trường:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Gỡ lỗi

Nếu bạn gặp bất kỳ vấn đề nào với trình chỉnh sửa trực quan, hãy kiểm tra những điều sau:

- Trình chỉnh sửa trực quan và ứng dụng đang chạy.

- Cấu hình [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) được thiết lập chính xác trong tệp cấu hình Intlayer của bạn.
  - Các trường bắt buộc:
    - URL ứng dụng nên khớp với URL bạn đã thiết lập trong cấu hình trình chỉnh sửa (`applicationURL`).

- Trình chỉnh sửa trực quan sử dụng iframe để hiển thị trang web của bạn. Đảm bảo rằng Chính sách Bảo mật Nội dung (CSP) của trang web cho phép URL CMS trong `frame-ancestors` (mặc định là `http://localhost:8000`). Kiểm tra bảng điều khiển của trình chỉnh sửa để xem có lỗi nào không.

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Sự khác biệt giữa visual editor và CMS là gì?">

Visual editor chỉnh sửa các từ điển cục bộ và lưu thay đổi trực tiếp vào các tệp mã nguồn của bạn, do đó trải qua quy trình review Git chuẩn. CMS lưu trữ nội dung trên server từ xa để xuất bản tức thì mà không cần build lại.

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

<Question title="Visual editor chạy ở đâu?">

Trên cơ sở hạ tầng của chính bạn. Trình chỉnh sửa tải ứng dụng của bạn bên trong iframe và giao tiếp với server editor cục bộ, do đó nội dung không bao giờ gửi ra bên ngoài.

</Question>

<Question title="Biên tập viên có cần biết viết mã không?">

Không. Họ mở trang web, nhấp trực tiếp vào phần tử văn bản và chỉnh sửa tại chỗ. Trình chỉnh sửa sẽ tự động định vị mục từ điển tương ứng.

</Question>

<Question title="Việc chỉnh sửa qua visual editor có thay đổi các tệp nguồn của tôi không?">

Có, đó chính là thiết kế dự kiến. Thay đổi được ghi vào tệp khai báo nội dung trong codebase của bạn và xuất hiện dưới dạng thay đổi bình thường trong git diff.

</Question>

<Question title="Editor hiển thị trang trắng hoặc từ chối tải trang. Cần kiểm tra gì?">

Editor hiển thị ứng dụng trong iframe, do đó Content Security Policy (CSP) của bạn phải cho phép origin của editor trong chỉ thị `frame-ancestors`. Đồng thời đảm bảo cả server ứng dụng và server editor đều đang chạy.

</Question>

<Question title="Tôi có thể sử dụng visual editor trong môi trường production không?">

Editor được thiết kế cho môi trường development và staging, nơi việc build lại sau khi chỉnh sửa là chấp nhận được. Để chỉnh sửa nội dung trên trang web production trực tiếp, nên sử dụng [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

</Question>

<Question title="Visual editor có miễn phí không?">

Có. Visual editor là một phần của dự án mã nguồn mở theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại.

</Question>

</FAQ>
