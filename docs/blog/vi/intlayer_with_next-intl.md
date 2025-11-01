---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cách tự động hóa bản dịch JSON next-intl của bạn bằng Intlayer
description: Tự động hóa bản dịch JSON của bạn với Intlayer và next-intl để nâng cao khả năng quốc tế hóa trong các ứng dụng Next.js.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Thêm plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Chuyển sang plugin syncJSON
---

# Cách tự động hóa bản dịch JSON next-intl của bạn bằng Intlayer

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa mã nguồn mở sáng tạo, được thiết kế để khắc phục những hạn chế của các giải pháp i18n truyền thống. Nó cung cấp một phương pháp hiện đại để quản lý nội dung trong các ứng dụng Next.js.

Xem một so sánh cụ thể với next-intl trong bài viết blog của chúng tôi [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

## Tại sao kết hợp Intlayer với next-intl?

Trong khi Intlayer cung cấp một giải pháp i18n độc lập xuất sắc (xem hướng dẫn tích hợp Next.js của chúng tôi [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)), bạn có thể muốn kết hợp nó với next-intl vì một số lý do sau:

1. **Mã nguồn hiện có**: Bạn đã có một triển khai next-intl ổn định và muốn dần dần chuyển sang trải nghiệm phát triển được cải thiện của Intlayer.
2. **Yêu cầu kế thừa**: Dự án của bạn cần tương thích với các plugin hoặc quy trình làm việc next-intl hiện có.
3. **Sự quen thuộc của nhóm**: Nhóm của bạn đã quen với next-intl nhưng muốn quản lý nội dung tốt hơn.
4. **Sử dụng các tính năng của Intlayer**: Bạn muốn sử dụng các tính năng của Intlayer như khai báo nội dung, tự động hóa dịch thuật, kiểm thử bản dịch, và nhiều hơn nữa.

**Vì vậy, Intlayer có thể được triển khai như một bộ chuyển đổi (adapter) cho next-intl để giúp tự động hóa các bản dịch JSON của bạn trong CLI hoặc các pipeline CI/CD, kiểm thử bản dịch, và nhiều hơn nữa.**

Hướng dẫn này sẽ chỉ cho bạn cách tận dụng hệ thống khai báo nội dung vượt trội của Intlayer trong khi vẫn giữ được khả năng tương thích với next-intl.

## Mục lục

<TOC/>

## Hướng dẫn từng bước để thiết lập Intlayer với next-intl

### Bước 1: Cài đặt các phụ thuộc

Cài đặt các gói cần thiết:

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

**Mô tả các gói:**

- **intlayer**: Thư viện lõi để quản lý quốc tế hóa, khai báo nội dung và xây dựng
- **@intlayer/sync-json-plugin**: Plugin để xuất các khai báo nội dung của Intlayer sang định dạng JSON tương thích với next-intl

### Bước 2: Triển khai plugin Intlayer để bao bọc JSON

Tạo một tệp cấu hình Intlayer để định nghĩa các ngôn ngữ bạn hỗ trợ:

**Nếu bạn cũng muốn xuất các từ điển JSON cho next-intl**, hãy thêm plugin `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` sẽ tự động bao bọc JSON. Nó sẽ đọc và ghi các tệp JSON mà không thay đổi cấu trúc nội dung.

Nếu bạn muốn cho phép JSON tồn tại cùng với các tệp khai báo nội dung intlayer (`.content` files), Intlayer sẽ tiến hành theo cách sau:

    1. tải cả tệp JSON và tệp khai báo nội dung và chuyển đổi chúng thành một từ điển intlayer.
    2. nếu có xung đột giữa JSON và các tệp khai báo nội dung, Intlayer sẽ tiến hành hợp nhất tất cả các từ điển đó. Tùy thuộc vào ưu tiên của các plugin, và ưu tiên của tệp khai báo nội dung (tất cả đều có thể cấu hình).

Nếu có thay đổi được thực hiện bằng cách sử dụng CLI để dịch JSON, hoặc sử dụng CMS, Intlayer sẽ cập nhật tệp JSON với các bản dịch mới.

Để xem thêm chi tiết về plugin `syncJSON`, vui lòng tham khảo [tài liệu plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md).

### (Tùy chọn) Bước 3: Triển khai dịch JSON theo từng thành phần

Theo mặc định, Intlayer sẽ tải, hợp nhất và đồng bộ cả tệp JSON và tệp khai báo nội dung. Xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) để biết thêm chi tiết. Nhưng nếu bạn muốn, sử dụng một plugin của Intlayer, bạn cũng có thể triển khai quản lý JSON theo từng thành phần được bản địa hóa ở bất kỳ đâu trong mã nguồn của bạn.

Để làm điều đó, bạn có thể sử dụng plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ cho các tệp JSON hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    /**
     * Sẽ tải tất cả các tệp JSON trong thư mục src khớp với mẫu {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Đảm bảo các tệp JSON này ưu tiên hơn các tệp tại `./locales/en/${key}.json`
    }),
    /**
     * Sẽ tải và ghi đầu ra cùng các bản dịch trở lại các tệp JSON trong thư mục locales
     */
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Điều này sẽ tải tất cả các tệp JSON trong thư mục `src` khớp với mẫu `{key}.i18n.json` và tải chúng như các từ điển Intlayer.

## Cấu hình Git

Khuyến nghị bỏ qua các tệp Intlayer được tạo tự động:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

Các tệp này có thể được tạo lại trong quá trình xây dựng và không cần phải cam kết vào hệ thống quản lý phiên bản.

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển, hãy cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức:

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
