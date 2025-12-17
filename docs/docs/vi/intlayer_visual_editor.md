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
    changes: Thêm tùy chọn with trên CLI
  - version: 6.0.1
    date: 2025-09-22
    changes: Thay đổi hành vi của trình chỉnh sửa khi phần mở rộng tệp không phải là `.json`
  - version: 6.0.0
    date: 2025-09-21
    changes: Thêm lệnh reexported
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu Trình chỉnh sửa trực quan Intlayer

<iframe title="Trình chỉnh sửa trực quan + CMS cho ứng dụng web của bạn: Giải thích Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bắt buộc
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan hướng tới.
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
     * Cổng được sử dụng bởi máy chủ trình chỉnh sửa trực quan.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Tùy chọn
     * Mặc định là "http://localhost:8000"
     * URL của máy chủ trình chỉnh sửa để truy cập từ ứng dụng. Được sử dụng để giới hạn các nguồn có thể tương tác với ứng dụng vì lý do bảo mật. Nếu được đặt là `'*'`, trình chỉnh sửa có thể truy cập từ bất kỳ nguồn nào. Nên được thiết lập nếu cổng bị thay đổi, hoặc nếu trình chỉnh sửa được lưu trữ trên một miền khác.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bắt buộc
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan hướng tới.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
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
    /**
     * Tùy chọn
     * Mặc định là `true`. Nếu là `false`, trình chỉnh sửa sẽ không hoạt động và không thể truy cập.
     * Có thể dùng để tắt trình chỉnh sửa cho các môi trường cụ thể vì lý do bảo mật, như môi trường production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

- Trình chỉnh sửa trực quan sử dụng iframe để hiển thị trang web của bạn. Đảm bảo rằng Chính sách Bảo mật Nội dung (CSP) của trang web cho phép URL CMS trong `frame-ancestors` (mặc định là 'http://localhost:8000'). Kiểm tra bảng điều khiển của trình chỉnh sửa để xem có lỗi nào không.
