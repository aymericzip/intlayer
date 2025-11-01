---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer và next-i18next
description: Tích hợp Intlayer với next-i18next cho giải pháp quốc tế hóa Next.js toàn diện
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Quốc tế hóa
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Thêm plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Chuyển sang plugin syncJSON và viết lại toàn diện
---

# Quốc tế hóa Next.js (i18n) với next-i18next và Intlayer

## Mục lục

<TOC/>

## next-i18next là gì?

**next-i18next** là một trong những framework quốc tế hóa (i18n) phổ biến nhất cho các ứng dụng Next.js. Được xây dựng trên nền tảng hệ sinh thái mạnh mẽ **i18next**, nó cung cấp một giải pháp toàn diện để quản lý bản dịch, địa phương hóa và chuyển đổi ngôn ngữ trong các dự án Next.js.

Tuy nhiên, next-i18next cũng gặp phải một số thách thức:

- **Cấu hình phức tạp**: Việc thiết lập next-i18next yêu cầu nhiều tệp cấu hình và phải cẩn thận trong việc thiết lập các phiên bản i18n phía server và phía client.
- **Bản dịch phân tán**: Các tệp bản dịch thường được lưu trữ trong các thư mục riêng biệt so với các thành phần, khiến việc duy trì tính nhất quán trở nên khó khăn hơn.
- **Quản lý namespace thủ công**: Các nhà phát triển cần phải quản lý namespace một cách thủ công và đảm bảo tải đúng các tài nguyên bản dịch.
- **An toàn kiểu hạn chế**: Hỗ trợ TypeScript yêu cầu cấu hình bổ sung và không cung cấp tự động tạo kiểu cho các bản dịch.

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa (i18n) mã nguồn mở sáng tạo, được thiết kế để khắc phục những hạn chế của các giải pháp i18n truyền thống. Nó cung cấp một cách tiếp cận hiện đại cho quản lý nội dung trong các ứng dụng Next.js.

Xem so sánh cụ thể với next-intl trong bài viết blog của chúng tôi [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

## Tại sao kết hợp Intlayer với next-i18next?

Trong khi Intlayer cung cấp một giải pháp i18n độc lập xuất sắc (xem hướng dẫn tích hợp Next.js của chúng tôi [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)), bạn có thể muốn kết hợp nó với next-i18next vì một số lý do sau:

1. **Mã nguồn hiện có**: Bạn đã có một triển khai next-i18next ổn định và muốn dần dần chuyển sang trải nghiệm phát triển được cải thiện của Intlayer.
2. **Yêu cầu kế thừa**: Dự án của bạn cần tương thích với các plugin hoặc quy trình làm việc i18next hiện có.
3. **Sự quen thuộc của đội ngũ**: Đội ngũ của bạn quen thuộc với next-i18next nhưng muốn quản lý nội dung tốt hơn.

**Vì vậy, Intlayer có thể được triển khai như một bộ chuyển đổi cho next-i18next để giúp tự động hóa việc dịch JSON của bạn trong CLI hoặc các pipeline CI/CD, kiểm thử các bản dịch của bạn, và nhiều hơn nữa.**

Hướng dẫn này sẽ chỉ cho bạn cách tận dụng hệ thống khai báo nội dung vượt trội của Intlayer trong khi vẫn duy trì khả năng tương thích với next-i18next.

---

## Hướng Dẫn Từng Bước Để Thiết Lập Intlayer với next-i18next

### Bước 1: Cài Đặt Các Phụ Thuộc

Cài đặt các gói cần thiết bằng trình quản lý gói bạn ưa thích:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Giải thích các gói:**

- **intlayer**: Thư viện cốt lõi cho khai báo và quản lý nội dung
- **@intlayer/sync-json-plugin**: Plugin để đồng bộ các khai báo nội dung Intlayer sang định dạng JSON của i18next

### Bước 2: Triển khai plugin Intlayer để bao bọc JSON

Tạo một file cấu hình Intlayer để định nghĩa các ngôn ngữ bạn hỗ trợ:

**Nếu bạn cũng muốn xuất các từ điển JSON cho i18next**, hãy thêm plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` sẽ tự động bao bọc JSON. Nó sẽ đọc và ghi các file JSON mà không thay đổi kiến trúc nội dung.

Nếu bạn muốn cho phép JSON tồn tại cùng với các file khai báo nội dung intlayer (`.content` files), Intlayer sẽ tiến hành theo cách sau:

    1. tải cả file JSON và file khai báo nội dung rồi chuyển đổi chúng thành một từ điển intlayer.
    2. nếu có xung đột giữa JSON và các file khai báo nội dung, Intlayer sẽ tiến hành hợp nhất tất cả các từ điển đó. Tùy thuộc vào ưu tiên của các plugin và ưu tiên của file khai báo nội dung (tất cả đều có thể cấu hình).

Nếu có thay đổi được thực hiện bằng cách sử dụng CLI để dịch JSON, hoặc sử dụng CMS, Intlayer sẽ cập nhật file JSON với các bản dịch mới.

Để xem thêm chi tiết về plugin `syncJSON`, vui lòng tham khảo [tài liệu plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md).

---

### (Tùy chọn) Bước 3: Triển khai dịch JSON theo từng thành phần

Theo mặc định, Intlayer sẽ tải, hợp nhất và đồng bộ cả file JSON và file khai báo nội dung. Xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) để biết thêm chi tiết. Nhưng nếu bạn muốn, sử dụng một plugin của Intlayer, bạn cũng có thể triển khai quản lý JSON theo từng thành phần được bản địa hóa ở bất kỳ đâu trong mã nguồn của bạn.

Để làm điều đó, bạn có thể sử dụng plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ cho các file JSON hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    /**
     * Sẽ tải tất cả các file JSON trong thư mục src khớp với mẫu {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Đảm bảo các file JSON này ưu tiên hơn các file tại `./public/locales/en/${key}.json`
    }),
    /**
     * Sẽ tải và ghi lại đầu ra cùng các bản dịch trở lại các file JSON trong thư mục locales
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Điều này sẽ tải tất cả các file JSON trong thư mục `src` khớp với mẫu `{key}.i18n.json` và tải chúng như các từ điển Intlayer.

---

## Cấu hình Git

Loại trừ các file được tạo tự động khỏi việc kiểm soát phiên bản:

```plaintext fileName=".gitignore"
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
intl
```

Các file này được tự động tạo lại trong quá trình build và không cần phải commit vào kho mã của bạn.

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm cho nhà phát triển, hãy cài đặt **Tiện ích mở rộng Intlayer chính thức cho VS Code**:

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
