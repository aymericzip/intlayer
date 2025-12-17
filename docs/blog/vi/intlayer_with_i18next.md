---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: Cách tự động hóa bản dịch JSON i18next của bạn bằng Intlayer
description: Tự động hóa bản dịch JSON của bạn với Intlayer và i18next để nâng cao quốc tế hóa trong các ứng dụng JavaScript.
keywords:
  - Intlayer
  - i18next
  - Quốc tế hóa
  - i18n
  - Địa phương hóa
  - Dịch thuật
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Di cư
  - Tích hợp
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Thêm plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Thay đổi sang plugin syncJSON
---

# Cách tự động hóa bản dịch JSON i18next của bạn bằng Intlayer

<iframe title="Cách tự động hóa bản dịch JSON i18next của bạn bằng Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Intlayer là gì?

**Intlayer** là một thư viện quốc tế hóa mã nguồn mở sáng tạo, được thiết kế để khắc phục những hạn chế của các giải pháp i18n truyền thống. Nó cung cấp một phương pháp hiện đại để quản lý nội dung trong các ứng dụng JavaScript.

Xem so sánh cụ thể với i18next trong bài viết blog của chúng tôi [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

## Tại sao kết hợp Intlayer với i18next?

Mặc dù Intlayer cung cấp một giải pháp i18n độc lập xuất sắc (xem hướng dẫn tích hợp với Next.js của chúng tôi [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)), bạn có thể muốn kết hợp nó với i18next vì một số lý do:

1. **Mã nguồn hiện có**: Bạn đã có một triển khai i18next ổn định và muốn dần dần chuyển sang trải nghiệm phát triển được cải thiện của Intlayer.
2. **Yêu cầu kế thừa**: Dự án của bạn cần tương thích với các plugin hoặc quy trình làm việc i18next hiện có.
3. **Sự quen thuộc của đội ngũ**: Đội ngũ của bạn quen thuộc với i18next nhưng muốn quản lý nội dung tốt hơn.
4. **Sử dụng các tính năng của Intlayer**: Bạn muốn sử dụng các tính năng của Intlayer như khai báo nội dung, quản lý khóa dịch, trạng thái dịch, và nhiều hơn nữa.

**Vì vậy, Intlayer có thể được triển khai như một bộ chuyển đổi cho i18next để giúp tự động hóa các bản dịch JSON của bạn trong CLI hoặc các pipeline CI/CD, kiểm thử các bản dịch, và nhiều hơn nữa.**

Hướng dẫn này sẽ chỉ cho bạn cách tận dụng hệ thống khai báo nội dung vượt trội của Intlayer trong khi vẫn duy trì khả năng tương thích với i18next.

## Mục lục

<TOC/>

## Hướng dẫn từng bước để thiết lập Intlayer với i18next

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
- **@intlayer/sync-json-plugin**: Plugin để xuất các khai báo nội dung của Intlayer sang định dạng JSON tương thích với i18next

### Bước 2: Triển khai plugin Intlayer để bao bọc JSON

Tạo một tệp cấu hình Intlayer để định nghĩa các ngôn ngữ được hỗ trợ của bạn:

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
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` sẽ tự động bao bọc JSON. Nó sẽ đọc và ghi các tệp JSON mà không thay đổi cấu trúc nội dung.

Nếu bạn muốn cho phép JSON đó tồn tại cùng với các tệp khai báo nội dung intlayer (`.content` files), Intlayer sẽ tiến hành theo cách sau:

    1. tải cả tệp JSON và tệp khai báo nội dung và chuyển đổi chúng thành một từ điển intlayer.
    2. nếu có xung đột giữa JSON và các tệp khai báo nội dung, Intlayer sẽ tiến hành hợp nhất tất cả các từ điển đó. Tùy thuộc vào ưu tiên của các plugin, và của tệp khai báo nội dung (tất cả đều có thể cấu hình).

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
     * Sẽ tải, và ghi đầu ra cùng các bản dịch trở lại các tệp JSON trong thư mục locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Điều này sẽ tải tất cả các tệp JSON trong thư mục `src` khớp với mẫu `{key}.i18n.json` và tải chúng như các từ điển Intlayer.

---

## Cấu hình Git

Khuyến nghị bỏ qua các tệp Intlayer được tạo tự động:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

Các tệp này có thể được tạo lại trong quá trình xây dựng và không cần phải cam kết vào hệ thống quản lý phiên bản.

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển, hãy cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức:

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
