---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Đưa nội dung của bạn ra ngoài vào Intlayer CMS
description: Đưa nội dung của bạn ra ngoài vào Intlayer CMS để ủy quyền quản lý nội dung cho nhóm của bạn.
keywords:
  - CMS
  - Trình chỉnh sửa trực quan
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Thêm tài liệu đồng bộ trực tiếp
  - version: 6.0.0
    date: 2025-09-04
    changes: Thay thế trường `hotReload` bằng `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu Hệ thống Quản lý Nội dung (CMS) Intlayer

<iframe title="Trình chỉnh sửa trực quan + CMS cho Ứng dụng Web của bạn: Giải thích về Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS là một ứng dụng cho phép bạn đưa nội dung của dự án Intlayer ra ngoài.

Để làm được điều đó, Intlayer giới thiệu khái niệm 'từ điển từ xa'.

![Giao diện Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Mục lục

<TOC/>

---

## Hiểu về từ điển từ xa

Intlayer phân biệt giữa 'từ điển cục bộ' và 'từ điển từ xa'.

- 'Từ điển cục bộ' là từ điển được khai báo trong dự án Intlayer của bạn. Ví dụ như file khai báo của một nút bấm, hoặc thanh điều hướng của bạn. Việc đưa nội dung ra ngoài không có ý nghĩa trong trường hợp này vì nội dung này không được dự kiến thay đổi thường xuyên.

- 'Từ điển từ xa' là từ điển được quản lý thông qua Intlayer CMS. Điều này có thể hữu ích để cho phép nhóm của bạn quản lý nội dung trực tiếp trên trang web của bạn, đồng thời nhằm sử dụng các tính năng thử nghiệm A/B và tối ưu hóa SEO tự động.

## Trình chỉnh sửa trực quan và CMS

[Trình chỉnh sửa Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) là một công cụ cho phép bạn quản lý nội dung trong trình chỉnh sửa trực quan dành cho các từ điển cục bộ. Khi có sự thay đổi, nội dung sẽ được thay thế trong code-base. Điều này có nghĩa là ứng dụng sẽ được xây dựng lại và trang sẽ được tải lại để hiển thị nội dung mới.

Ngược lại, Intlayer CMS là một công cụ cho phép bạn quản lý nội dung trong trình chỉnh sửa trực quan dành cho các từ điển từ xa. Khi có sự thay đổi, nội dung sẽ **không** ảnh hưởng đến code-base của bạn. Và trang web sẽ tự động hiển thị nội dung đã thay đổi.

## Tích hợp

Để biết thêm chi tiết về cách cài đặt gói, xem phần liên quan bên dưới:

### Tích hợp với Next.js

Để tích hợp với Next.js, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md).

### Tích hợp với Create React App

Để tích hợp với Create React App, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md).

### Tích hợp với Vite + React

Để tích hợp với Vite + React, tham khảo [hướng dẫn cài đặt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md).

## Cấu hình

Trong file cấu hình Intlayer của bạn, bạn có thể tùy chỉnh các thiết lập CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... các thiết lập cấu hình khác
  editor: {
    /**
     * Bắt buộc
     *
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan sẽ hướng tới.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Bắt buộc
     *
     * Client ID và client secret là bắt buộc để kích hoạt trình chỉnh sửa.
     * Chúng cho phép xác định người dùng đang chỉnh sửa nội dung.
     * Có thể lấy được bằng cách tạo một client mới trong Bảng điều khiển Intlayer - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của CMS.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của backend.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan hướng tới.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Bắt buộc
     *
     * Client ID và client secret là bắt buộc để kích hoạt trình chỉnh sửa.
     * Chúng cho phép xác định người dùng đang chỉnh sửa nội dung.
     * Chúng có thể được lấy bằng cách tạo một client mới trong Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của CMS.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của backend.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * URL của ứng dụng.
     * Đây là URL mà trình chỉnh sửa trực quan hướng tới.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Bắt buộc
     *
     * Client ID và client secret là bắt buộc để kích hoạt trình chỉnh sửa.
     * Chúng cho phép xác định người dùng đang chỉnh sửa nội dung.
     * Bạn có thể lấy chúng bằng cách tạo một client mới trong Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của CMS.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Tùy chọn
     *
     * Trong trường hợp bạn tự lưu trữ Intlayer CMS, bạn có thể thiết lập URL của backend.
     *
     * URL của Intlayer CMS.
     * Mặc định, nó được đặt là https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Nếu bạn chưa có client ID và client secret, bạn có thể lấy chúng bằng cách tạo một client mới trong [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Để xem tất cả các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Sử dụng CMS

### Đẩy cấu hình của bạn

Để cấu hình Intlayer CMS, bạn có thể sử dụng các lệnh của [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/vi/intlayer_cli.md).

```bash
npx intlayer config push
```

> Nếu bạn sử dụng biến môi trường trong tệp cấu hình `intlayer.config.ts`, bạn có thể chỉ định môi trường mong muốn bằng cách sử dụng đối số `--env`:

```bash
npx intlayer config push --env production
```

Lệnh này sẽ tải cấu hình của bạn lên Intlayer CMS.

### Đẩy một từ điển

Để chuyển đổi các từ điển locale của bạn thành một từ điển từ xa, bạn có thể sử dụng các lệnh của [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/vi/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Nếu bạn sử dụng biến môi trường trong tệp cấu hình `intlayer.config.ts`, bạn có thể chỉ định môi trường mong muốn bằng cách sử dụng đối số `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Lệnh này sẽ tải các từ điển nội dung ban đầu của bạn lên, giúp chúng có thể được lấy và chỉnh sửa bất đồng bộ thông qua nền tảng Intlayer.

### Chỉnh sửa từ điển

Sau đó, bạn sẽ có thể xem và quản lý từ điển của mình trong [Intlayer CMS](https://app.intlayer.org/content).

## Đồng bộ trực tiếp (Live sync)

Live Sync cho phép ứng dụng của bạn phản ánh các thay đổi nội dung CMS trong thời gian chạy. Không cần xây dựng lại hoặc triển khai lại. Khi được bật, các cập nhật sẽ được truyền đến máy chủ Live Sync để làm mới các từ điển mà ứng dụng của bạn đang đọc.

Bật Live Sync bằng cách cập nhật cấu hình Intlayer của bạn:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
  build: {
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
    importMode: "live",
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
     * Bật tính năng tải lại nóng (hot reloading) cấu hình locale khi phát hiện thay đổi.
     * Ví dụ, khi một từ điển được thêm hoặc cập nhật, ứng dụng sẽ cập nhật
     * nội dung hiển thị trên trang.
     *
     * Vì tính năng tải lại nóng yêu cầu kết nối liên tục với máy chủ, nên
     * chỉ có sẵn cho khách hàng của gói `enterprise`.
     *
     * Mặc định: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Điều khiển cách nhập khẩu các từ điển:
     *
     * - "live": Các từ điển được lấy động bằng cách sử dụng Live Sync API.
     *   Thay thế useIntlayer bằng useDictionaryDynamic.
     *
     * Lưu ý: Chế độ live sử dụng Live Sync API để lấy từ điển. Nếu cuộc gọi API
     * thất bại, các từ điển sẽ được nhập khẩu động.
     * Lưu ý: Chỉ các từ điển có nội dung từ xa và cờ "live" mới sử dụng chế độ live.
     * Những từ điển khác sử dụng chế độ động để tăng hiệu suất.
     */
    importMode: "live",
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
     * Bật tính năng tải lại nóng cấu hình locale khi phát hiện có thay đổi.
     * Ví dụ, khi một từ điển được thêm hoặc cập nhật, ứng dụng sẽ cập nhật
     * nội dung hiển thị trên trang.
     *
     * Vì tính năng tải lại nóng yêu cầu kết nối liên tục với máy chủ, nên
     * chỉ có sẵn cho khách hàng của gói `enterprise`.
     *
     * Mặc định: false
     */
    liveSync: true,

    /**
     * Cổng của máy chủ Live Sync.
     *
     * Mặc định: 4000
     */
    liveSyncPort: 4000,

    /**
     * URL của máy chủ Live Sync.
     *
     * Mặc định: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Điều khiển cách nhập khẩu các từ điển:
     *
     * - "live": Các từ điển được lấy động bằng cách sử dụng API Live Sync.
     *   Thay thế useIntlayer bằng useDictionaryDynamic.
     *
     * Lưu ý: Chế độ live sử dụng API Live Sync để lấy từ điển. Nếu cuộc gọi API
     * thất bại, các từ điển sẽ được nhập động.
     * Lưu ý: Chỉ các từ điển có nội dung từ xa và cờ "live" mới sử dụng chế độ live.
     * Các từ điển khác sử dụng chế độ động để tối ưu hiệu suất.
     */
    importMode: "live",
  },
};

module.exports = config;
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
    "start": "npx intlayer live --process 'next start'",
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
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Server Live Sync bao bọc ứng dụng của bạn và tự động áp dụng nội dung cập nhật khi nó đến.

Để nhận thông báo thay đổi từ CMS, server Live Sync duy trì một kết nối SSE đến backend. Khi nội dung thay đổi trong CMS, backend chuyển tiếp bản cập nhật đến server Live Sync, server này sẽ ghi các từ điển mới. Ứng dụng của bạn sẽ phản ánh bản cập nhật trong lần điều hướng tiếp theo hoặc khi tải lại trình duyệt — không cần phải xây dựng lại.

Sơ đồ luồng (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Sơ đồ luồng Live Sync CMS/Backend/Live Sync Server/Application Server/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Cách hoạt động:

![Sơ đồ logic Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Quy trình phát triển (cục bộ)

- Trong quá trình phát triển, tất cả các từ điển từ xa được lấy khi ứng dụng khởi động, giúp bạn có thể kiểm tra các cập nhật nhanh chóng.
- Để thử nghiệm Live Sync cục bộ với Next.js, hãy bao bọc server phát triển của bạn:

```json5 fileName="package.json"
{
  "scripts": {
    // ... các script khác
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Dành cho Vite
  },
}
```

Bật tối ưu hóa để Intlayer áp dụng các biến đổi nhập khẩu Live trong quá trình phát triển:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // mặc định: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // mặc định: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // mặc định: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

module.exports = config;
```

Cấu hình này bao bọc server phát triển của bạn với server Live Sync, lấy các từ điển từ xa khi khởi động, và truyền các cập nhật từ CMS qua SSE. Tải lại trang để xem các thay đổi.

Ghi chú và hạn chế:

- Thêm nguồn gốc live sync vào chính sách bảo mật trang web của bạn (CSP). Đảm bảo URL live sync được phép trong `connect-src` (và `frame-ancestors` nếu có liên quan).
- Live Sync không hoạt động với đầu ra tĩnh. Đối với Next.js, trang phải là động để nhận các cập nhật tại thời gian chạy (ví dụ: sử dụng `generateStaticParams`, `generateMetadata`, `getServerSideProps`, hoặc `getStaticProps` một cách phù hợp để tránh các hạn chế chỉ tĩnh hoàn toàn).
- Trong CMS, mỗi từ điển có một cờ `live`. Chỉ những từ điển có `live=true` mới được lấy qua API live sync; những từ điển khác được nhập động và không thay đổi trong thời gian chạy.
- Cờ `live` được đánh giá cho mỗi từ điển tại thời điểm build. Nếu nội dung từ xa không được đánh dấu `live=true` trong quá trình build, bạn phải build lại để kích hoạt Live Sync cho từ điển đó.
- Server live sync phải có quyền ghi vào `.intlayer`. Trong các container, đảm bảo quyền ghi vào `/.intlayer`.

## Gỡ lỗi

Nếu bạn gặp bất kỳ vấn đề nào với CMS, hãy kiểm tra các điều sau:

- Ứng dụng đang chạy.

- Cấu hình [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) được thiết lập chính xác trong file cấu hình Intlayer của bạn.
  - Các trường bắt buộc:
    - URL ứng dụng phải khớp với URL bạn đã thiết lập trong cấu hình editor (`applicationURL`).
    - URL CMS

- Đảm bảo rằng cấu hình dự án đã được đẩy lên Intlayer CMS.

- Trình chỉnh sửa trực quan sử dụng iframe để hiển thị trang web của bạn. Đảm bảo rằng Chính sách Bảo mật Nội dung (CSP) của trang web cho phép URL CMS làm `frame-ancestors` (mặc định là 'https://intlayer.org'). Kiểm tra bảng điều khiển của editor để phát hiện lỗi.
