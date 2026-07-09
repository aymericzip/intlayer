---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Đồng bộ trực tiếp (Live Sync) | Phản ánh thay đổi nội dung CMS theo thời gian thực
description: Cho phép ứng dụng của bạn phản ánh các thay đổi nội dung của Intlayer CMS ngay khi chạy, không cần build lại hay triển khai lại.
keywords:
  - Đồng bộ trực tiếp
  - Live Sync
  - CMS
  - Trình chỉnh sửa trực quan
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Được tách từ tài liệu Intlayer CMS sang trang riêng"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Thêm tài liệu đồng bộ trực tiếp"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Thay thế trường `hotReload` bằng `liveSync`"
author: aymericzip
---

# Đồng bộ trực tiếp (Live sync)

Live Sync cho phép ứng dụng của bạn phản ánh các thay đổi nội dung CMS trong thời gian chạy. Không cần xây dựng lại hoặc triển khai lại. Khi được bật, các cập nhật sẽ được truyền đến máy chủ Live Sync để làm mới các từ điển mà ứng dụng của bạn đang đọc.

## Mục lục

<TOC/>

---

Bật Live Sync bằng cách cập nhật cấu hình Intlayer của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bật tính năng tải lại nóng (hot reloading) cấu hình locale khi phát hiện thay đổi.
     * Ví dụ, khi một từ điển được thêm hoặc cập nhật, ứng dụng sẽ cập nhật
     * nội dung hiển thị trên trang.
     *
     * Vì tải lại nóng yêu cầu kết nối liên tục với máy chủ,
     * tính năng này chỉ có sẵn cho khách hàng của gói `enterprise`.
     *
     * Mặc định: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Điều khiển cách các từ điển được nhập khẩu:
     *
     * - "live": Các từ điển được lấy động bằng cách sử dụng Live Sync API.
     *   Thay thế useIntlayer bằng useDictionaryDynamic.
     *
     * Lưu ý: Chế độ live sử dụng Live Sync API để lấy từ điển. Nếu cuộc gọi API
     * thất bại, các từ điển sẽ được nhập khẩu động.
     * Lưu ý: Chỉ các từ điển có nội dung từ xa và cờ "live" mới sử dụng chế độ live.
     * Các từ điển khác sử dụng chế độ động để tối ưu hiệu năng.
     */
    importMode: "fetch",
  },
};

export default config;
```

Khởi động server Live Sync để bao bọc ứng dụng của bạn:

Ví dụ sử dụng server độc lập:

```json5 fileName="package.json"
{
  "scripts": {
    // ... các script khác
    "live:start": "npx intlayer live",
  },
}
```

Bạn cũng có thể sử dụng server ứng dụng của mình song song bằng cách sử dụng đối số `--process`.

Ví dụ sử dụng Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... các script khác
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Ví dụ sử dụng Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... các script khác
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Server Live Sync bao bọc ứng dụng của bạn và tự động áp dụng nội dung cập nhật khi nó đến.

Để nhận thông báo thay đổi từ CMS, server Live Sync duy trì một kết nối SSE đến backend. Khi nội dung thay đổi trong CMS, backend chuyển tiếp bản cập nhật đến server Live Sync, server này sẽ ghi các từ điển mới. Ứng dụng của bạn sẽ phản ánh bản cập nhật trong lần điều hướng tiếp theo hoặc khi tải lại trình duyệt, không cần phải xây dựng lại.

Sơ đồ luồng (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Sơ đồ luồng Live Sync CMS/Backend/Live Sync Server/Application Server/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Cách hoạt động:

![Sơ đồ logic Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Quy trình phát triển (cục bộ)

- Trong quá trình phát triển, tất cả các từ điển từ xa được lấy khi ứng dụng khởi động, giúp bạn có thể kiểm tra các cập nhật nhanh chóng.
- Để thử nghiệm Live Sync cục bộ với Next.js, hãy bao bọc server phát triển của bạn:

```json5 fileName="package.json"
{
  "scripts": {
    // ... các script khác
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Dành cho Vite
  },
}
```

Bật tối ưu hóa để Intlayer áp dụng các biến đổi nhập khẩu Live trong quá trình phát triển:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Cấu hình này bao bọc server phát triển của bạn với server Live Sync, lấy các từ điển từ xa khi khởi động, và truyền các cập nhật từ CMS qua SSE. Tải lại trang để xem các thay đổi.

Ghi chú và hạn chế:

- Thêm nguồn gốc live sync vào chính sách bảo mật trang web của bạn (CSP). Đảm bảo URL live sync được phép trong `connect-src` (và `frame-ancestors` nếu có liên quan).
- Live Sync không hoạt động với đầu ra tĩnh. Đối với Next.js, trang phải là động để nhận các cập nhật tại thời gian chạy (ví dụ: sử dụng `generateStaticParams`, `generateMetadata`, `getServerSideProps`, hoặc `getStaticProps` một cách phù hợp để tránh các hạn chế chỉ tĩnh hoàn toàn).
- Trong CMS, mỗi từ điển có một cờ `live`. Chỉ những từ điển có `live=true` mới được lấy qua API live sync; những từ điển khác được nhập động và không thay đổi trong thời gian chạy.
- Cờ `live` được đánh giá cho mỗi từ điển tại thời điểm build. Nếu nội dung từ xa không được đánh dấu `live=true` trong quá trình build, bạn phải build lại để kích hoạt Live Sync cho từ điển đó.
- Server live sync phải có quyền ghi vào `.intlayer`. Trong các container, đảm bảo quyền ghi vào `/.intlayer`.

## Liên kết hữu ích

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- [Tài liệu tham khảo cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Hướng dẫn Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md)
