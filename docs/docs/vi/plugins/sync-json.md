---
createdAt: 2025-03-13
updatedAt: 2025-10-05
title: Plugin Đồng bộ JSON
description: Đồng bộ từ điển Intlayer với các tệp JSON i18n của bên thứ ba (i18next, next-intl, react-intl, vue-i18n và nhiều hơn nữa). Giữ nguyên i18n hiện có của bạn trong khi sử dụng Intlayer để quản lý, dịch và kiểm tra các thông điệp của bạn.
keywords:
  - Intlayer
  - Đồng bộ JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - bản dịch
slugs:
  - doc
  - plugin
  - sync-json
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Tài liệu Plugin Đồng bộ JSON ban đầu
---

# Đồng bộ JSON (cầu nối i18n)

Sử dụng Intlayer như một tiện ích bổ sung cho bộ công cụ i18n hiện có của bạn. Plugin này giữ cho các thông điệp JSON của bạn đồng bộ với từ điển Intlayer để bạn có thể:

- Giữ nguyên i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, v.v.
- Quản lý và dịch các thông điệp của bạn với Intlayer (CLI, CI, nhà cung cấp, CMS), mà không cần tái cấu trúc ứng dụng của bạn.
- Phát hành các hướng dẫn và nội dung SEO nhắm mục tiêu từng hệ sinh thái, đồng thời đề xuất Intlayer như lớp quản lý JSON.

Ghi chú và phạm vi hiện tại:

- Việc ngoại hóa sang CMS hoạt động cho cả bản dịch và văn bản cổ điển.
- Chưa hỗ trợ chèn, số nhiều/ICU, hoặc các tính năng runtime nâng cao của các thư viện khác.
- Trình chỉnh sửa trực quan chưa được hỗ trợ cho các đầu ra i18n của bên thứ ba.

### Khi nào nên sử dụng plugin này

- Bạn đã sử dụng một thư viện i18n và lưu trữ các thông điệp trong các tệp JSON.
- Bạn muốn hỗ trợ điền bằng AI, kiểm tra trong CI, và vận hành nội dung mà không thay đổi runtime kết xuất của bạn.

## Cài đặt

```bash
pnpm add -D @intlayer/sync-json-plugin
# hoặc
npm i -D @intlayer/sync-json-plugin
```

## Bắt đầu nhanh

Thêm plugin vào `intlayer.config.ts` của bạn và trỏ nó đến cấu trúc JSON hiện có của bạn.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ cho các tệp JSON hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    syncJSON({
      // Bố cục theo từng locale, từng namespace (ví dụ: next-intl, i18next với namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Phương án thay thế: một tệp duy nhất cho mỗi locale (thường dùng với i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Cách hoạt động

- Đọc: plugin phát hiện các tệp JSON từ builder `source` của bạn và tải chúng như các từ điển Intlayer.
- Ghi: sau khi build và điền, plugin ghi các tệp JSON đã được bản địa hóa trở lại cùng đường dẫn (với một dòng mới cuối cùng để tránh lỗi định dạng).
- Tự động điền: plugin khai báo một đường dẫn `autoFill` cho mỗi từ điển. Chạy lệnh `intlayer fill` sẽ chỉ cập nhật các bản dịch còn thiếu trong các tệp JSON của bạn theo mặc định.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // bắt buộc
  location?: string, // nhãn tùy chọn, mặc định: "plugin"
  priority?: number, // ưu tiên tùy chọn để giải quyết xung đột, mặc định: 0
});
```

## Nhiều nguồn JSON và ưu tiên

Bạn có thể thêm nhiều plugin `syncJSON` để đồng bộ các nguồn JSON khác nhau. Điều này hữu ích khi bạn có nhiều thư viện i18n hoặc các cấu trúc JSON khác nhau trong dự án của mình.

### Hệ thống ưu tiên

Khi nhiều plugin cùng nhắm tới cùng một khóa từ điển, tham số `priority` sẽ quyết định plugin nào được ưu tiên:

- Số ưu tiên cao hơn thắng số ưu tiên thấp hơn
- Ưu tiên mặc định của các tệp `.content` là `0`
- Ưu tiên mặc định của các tệp nội dung plugin là `-1`
- Các plugin có cùng mức ưu tiên sẽ được xử lý theo thứ tự xuất hiện trong cấu hình

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Nguồn JSON chính (ưu tiên cao nhất)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Nguồn JSON dự phòng (ưu tiên thấp hơn)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Nguồn JSON kế thừa (ưu tiên thấp nhất)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Giải quyết xung đột

Khi cùng một khóa dịch tồn tại trong nhiều nguồn JSON:

1. Plugin có mức ưu tiên cao nhất sẽ quyết định giá trị cuối cùng
2. Các nguồn có mức ưu tiên thấp hơn được sử dụng làm phương án dự phòng cho các khóa bị thiếu
3. Điều này cho phép bạn duy trì các bản dịch kế thừa trong khi dần dần chuyển sang các cấu trúc mới

## Tích hợp

Dưới đây là các ánh xạ phổ biến. Giữ nguyên runtime của bạn; chỉ cần thêm plugin.

### i18next

Bố cục tệp điển hình: `./public/locales/{locale}/{namespace}.json` hoặc `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`, // nguồn tệp JSON đồng bộ theo khóa và ngôn ngữ
    }),
  ],
};
```

### next-intl

Các thông điệp JSON theo từng ngôn ngữ (thường là `./messages/{locale}.json`) hoặc theo từng namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`, // nguồn tệp JSON đồng bộ theo ngôn ngữ và khóa
  }),
];
```

Xem thêm: `docs/vi/intlayer_with_next-intl.md`.

### react-intl

Thông thường có một tệp JSON duy nhất cho mỗi ngôn ngữ:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`, // nguồn tệp JSON đồng bộ theo ngôn ngữ
  }),
];
```

### vue-i18n

Có thể là một tệp duy nhất cho mỗi ngôn ngữ hoặc theo từng namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`, // nguồn tệp JSON đồng bộ theo khóa và ngôn ngữ
  }),
];
```

## CLI

Các tệp JSON được đồng bộ sẽ được coi như các tệp `.content` khác. Điều đó có nghĩa là tất cả các lệnh intlayer sẽ có sẵn cho các tệp JSON được đồng bộ. Bao gồm:

- `intlayer content test` để kiểm tra xem có bản dịch nào bị thiếu không
- `intlayer content list` để liệt kê các tệp JSON được đồng bộ
- `intlayer content fill` để điền các bản dịch bị thiếu
- `intlayer content push` để đẩy các tệp JSON được đồng bộ lên
- `intlayer content pull` để kéo các tệp JSON được đồng bộ về

Xem [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md) để biết thêm chi tiết.

## Hạn chế (hiện tại)

- Không hỗ trợ chèn hoặc số nhiều/ICU khi nhắm mục tiêu các thư viện bên thứ ba.
- Trình chỉnh sửa trực quan chưa có sẵn cho các runtime không phải Intlayer.
- Chỉ đồng bộ JSON; không hỗ trợ các định dạng danh mục không phải JSON.

## Tại sao điều này quan trọng

- Chúng ta có thể đề xuất các giải pháp i18n đã được thiết lập và định vị Intlayer như một tiện ích bổ sung.
- Chúng ta tận dụng SEO/từ khóa của họ với các hướng dẫn kết thúc bằng việc gợi ý sử dụng Intlayer để quản lý JSON.
- Mở rộng đối tượng người dùng từ “dự án mới” sang “bất kỳ nhóm nào đã sử dụng i18n”.
