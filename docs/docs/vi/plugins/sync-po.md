---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Đồng bộ hóa từ điển Intlayer với các tệp Gettext PO. Giữ nguyên i18n hiện tại của bạn trong khi sử dụng Intlayer để quản lý, dịch và kiểm tra các tin nhắn của bạn.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - dịch thuật
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Tài liệu ban đầu cho plugin Sync PO"
author: aymericzip
---

# Sync PO (cầu nối i18n) - Đồng bộ hóa PO với hỗ trợ ICU / i18next

Sử dụng Intlayer như một tiện ích bổ sung cho ngăn xếp i18n hiện có của bạn. Plugin này giữ cho các tin nhắn Gettext PO của bạn đồng bộ với từ điển Intlayer để bạn có thể:

- Giữ nguyên quy trình dịch thuật dựa trên PO hiện tại của bạn.
- Quản lý và dịch các tin nhắn của bạn với Intlayer (CLI, CI, nhà cung cấp, CMS) mà không cần cấu trúc lại ứng dụng của bạn.
- Cung cấp các hướng dẫn và nội dung SEO nhắm mục tiêu đến từng hệ sinh thái, đồng thời đề xuất Intlayer như một lớp quản lý PO.

Ghi chú và phạm vi hiện tại:

- Việc bên ngoài hóa sang CMS hoạt động cho các bản dịch và văn bản cổ điển.
- Chưa hỗ trợ cho việc chèn, số nhiều/ICU hoặc các tính năng runtime nâng cao của các thư viện khác trong chính các mục nhập PO.
- Trình chỉnh sửa trực quan chưa được hỗ trợ cho các đầu ra i18n của bên thứ ba.

### Khi nào nên sử dụng plugin này

- Bạn đã sử dụng các tệp Gettext PO cho các bản dịch của mình.
- Bạn muốn điền dữ liệu có hỗ trợ AI, kiểm tra trong CI và vận hành nội dung mà không cần thay đổi runtime kết xuất của mình.

## Cài đặt

```bash
pnpm add -D @intlayer/sync-po-plugin
# hoặc
npm i -D @intlayer/sync-po-plugin
```

## Plugin

Gói này cung cấp hai plugin:

- `loadPO`: Tải các tệp PO vào từ điển Intlayer.
  - Plugin này được sử dụng để tải các tệp PO từ một nguồn và sẽ được tải vào từ điển Intlayer. Nó có thể quét toàn bộ mã nguồn và tìm kiếm các tệp PO cụ thể.
    Plugin này có thể được sử dụng:
    - nếu bạn sử dụng một thư viện i18n áp đặt một vị trí cụ thể để tải các tệp PO của bạn, nhưng bạn muốn đặt khai báo nội dung của mình ở bất cứ đâu bạn muốn trong mã nguồn.
    - Nó cũng có thể được sử dụng nếu bạn muốn tìm nạp các tin nhắn của mình từ một nguồn từ xa (ví dụ: CMS, API, v.v.) và lưu trữ các tin nhắn của bạn trong các tệp PO.

  > Bên dưới, plugin này sẽ quét toàn bộ mã nguồn và tìm kiếm các tệp PO cụ thể và tải chúng vào từ điển Intlayer.
  > Lưu ý rằng plugin này sẽ không ghi kết quả đầu ra và các bản dịch ngược lại vào các tệp PO.

- `syncPO`: Đồng bộ hóa các tệp PO với từ điển Intlayer.
  - Plugin này được sử dụng để đồng bộ hóa các tệp PO với từ điển Intlayer. Nó có thể quét vị trí đã cho và tải PO khớp với mẫu cho các tệp PO cụ thể. Plugin này hữu ích nếu bạn muốn nhận được các lợi ích của Intlayer trong khi sử dụng một thư viện i18n khác.

## Sử dụng cả hai plugin

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ các tệp PO hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    /**
     * Sẽ tải tất cả các tệp PO trong src khớp với mẫu {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Đảm bảo các tệp PO này được ưu tiên hơn các tệp tại `./locales/en/${key}.po`
    }),
    /**
     * Sẽ tải và ghi kết quả đầu ra và bản dịch ngược lại vào các tệp PO trong thư mục locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Bắt đầu nhanh

Thêm plugin vào `intlayer.config.ts` của bạn và trỏ nó vào cấu trúc PO hiện có của bạn.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ các tệp PO hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    syncPO({
      // Bố cục theo từng locale, từng namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Thay thế: một tệp duy nhất cho mỗi locale:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Cách hoạt động

- Đọc: plugin khám phá các tệp PO từ trình xây dựng `source` của bạn và tải chúng dưới dạng từ điển Intlayer.
- Ghi: sau khi xây dựng và điền dữ liệu, nó ghi PO đã bản địa hóa ngược lại các đường dẫn tương ứng (với các tiêu đề Gettext thích hợp).
- Tự động điền: plugin khai báo một đường dẫn `autoFill` cho mỗi từ điển. Chạy `intlayer fill` sẽ chỉ cập nhật các bản dịch bị thiếu trong các tệp PO của bạn theo mặc định.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // bắt buộc
  location?: string, // nhãn tùy chọn, mặc định: "sync-po::path/to/source"
  priority?: number, // ưu tiên tùy chọn để giải quyết xung đột, mặc định: 0
});
```

### Nhiều nguồn PO và mức độ ưu tiên

Bạn có thể thêm nhiều plugin `syncPO` để đồng bộ hóa các nguồn PO khác nhau. Điều này hữu ích khi bạn có nhiều nguồn dịch hoặc cấu trúc PO khác nhau trong dự án của mình.

#### Hệ thống ưu tiên

Khi nhiều plugin nhắm mục tiêu cùng một khóa từ điển, tham số `priority` sẽ xác định plugin nào được ưu tiên:

- Số ưu tiên cao hơn sẽ thắng số thấp hơn
- Mức độ ưu tiên mặc định của các tệp `.content` là `0`
- Mức độ ưu tiên mặc định của các plugin là `0`
- Các plugin có cùng mức độ ưu tiên được xử lý theo thứ tự chúng xuất hiện trong cấu hình

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Nguồn PO chính (mức ưu tiên cao nhất)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Nguồn PO dự phòng (mức ưu tiên thấp hơn)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Nguồn PO cũ (mức ưu tiên thấp nhất)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Bắt đầu nhanh

Thêm plugin vào `intlayer.config.ts` của bạn để nạp các tệp PO hiện có dưới dạng từ điển Intlayer. Plugin này chỉ dành cho việc đọc (không ghi vào đĩa):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Nạp các tin nhắn PO nằm ở bất kỳ đâu trong cây mã nguồn của bạn
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Tải một locale duy nhất cho mỗi phiên bản plugin (mặc định là defaultLocale của cấu hình)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Thay thế: bố cục theo từng locale, vẫn chỉ dành cho việc đọc (chỉ locale được chọn mới được tải):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Chỉ các tệp cho Locales.FRENCH mới được nạp từ mẫu này
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Cách hoạt động

- Khám phá: xây dựng một glob từ trình xây dựng `source` của bạn và thu thập các tệp PO phù hợp.
- Nạp: tải từng tệp PO dưới dạng từ điển Intlayer với `locale` được cung cấp.
- Chỉ đọc: không ghi hoặc định dạng các tệp đầu ra; sử dụng `syncPO` nếu bạn cần đồng bộ hóa hai chiều.
- Sẵn sàng tự động điền: xác định một đường dẫn `fill` để `intlayer content fill` có thể điền các khóa bị thiếu.

### API

```ts
loadPO({
  // Xây dựng các đường dẫn đến PO của bạn. `locale` là tùy chọn nếu cấu trúc của bạn không có phân đoạn locale
  source: ({ key, locale }) => string,

  // Locale mục tiêu cho các từ điển được tải bởi phiên bản plugin này
  // Mặc định là configuration.internationalization.defaultLocale
  locale?: Locale,

  // Nhãn tùy chọn để xác định nguồn
  location?: string, // mặc định: "plugin"

  // Mức độ ưu tiên được sử dụng để giải quyết xung đột với các nguồn khác
  priority?: number, // mặc định: 0
});
```

### Hành vi và quy ước

- Nếu mặt nạ `source` của bạn bao gồm một trình giữ chỗ locale, chỉ các tệp cho `locale` được chọn mới được nạp.
- Nếu không có phân đoạn `{key}` trong mặt nạ của bạn, khóa từ điển là "index".
- Các khóa được lấy từ đường dẫn tệp bằng cách thay thế trình giữ chỗ `{key}` trong trình xây dựng `source` của bạn.
- Plugin chỉ sử dụng các tệp được khám phá và không tạo ra các locale hoặc khóa bị thiếu.
- Đường dẫn `fill` được suy ra từ `source` của bạn và được sử dụng để cập nhật các giá trị bị thiếu thông qua CLI khi bạn chọn tham gia.

## Giải quyết xung đột

Khi cùng một khóa dịch tồn tại trong nhiều nguồn PO:

1. Plugin có mức độ ưu tiên cao nhất sẽ xác định giá trị cuối cùng
2. Các nguồn ưu tiên thấp hơn được sử dụng làm dự phòng cho các khóa bị thiếu
3. Điều này cho phép bạn duy trì các bản dịch cũ trong khi dần chuyển sang các cấu trúc mới

## CLI

Các tệp PO đã đồng bộ hóa sẽ được coi như các tệp `.content` khác. Điều đó có nghĩa là, tất cả các lệnh intlayer sẽ khả dụng cho các tệp PO đã đồng bộ hóa. Bao gồm:

- `intlayer content test` để kiểm tra xem có bản dịch nào bị thiếu không
- `intlayer content list` để liệt kê các tệp PO đã đồng bộ hóa
- `intlayer content fill` để điền các bản dịch bị thiếu
- `intlayer content push` để đẩy các tệp PO đã đồng bộ hóa
- `intlayer content pull` để kéo các tệp PO đã đồng bộ hóa

Xem [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) để biết thêm chi tiết.

## Hạn chế (hiện tại)

- Không hỗ trợ chèn hoặc số nhiều/ICU khi nhắm mục tiêu đến các thư viện bên thứ ba.
- Trình chỉnh sửa trực quan chưa khả dụng cho các runtime không phải Intlayer.
- Chỉ đồng bộ hóa PO; các định dạng danh mục không phải PO không được hỗ trợ.

## Tại sao điều này lại quan trọng

- Chúng ta có thể đề xuất các giải pháp i18n đã được thiết lập và định vị Intlayer như một tiện ích bổ sung.
- Chúng ta tận dụng SEO/từ khóa của họ bằng các hướng dẫn kết thúc bằng việc đề xuất Intlayer để quản lý PO.
- Mở rộng đối tượng có thể tiếp cận từ “các dự án mới” sang “bất kỳ nhóm nào đã sử dụng i18n”.
