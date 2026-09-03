---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: import glob, chunk và xử lý thông điệp lúc build"
description: Những khía cạnh thực sự thuộc về Vite trong i18n. Tải catalog lười biếng với import.meta.glob, tại sao chia theo route hiếm khi hiệu quả, khoảng trống HMR và plugin lúc build.
keywords:
  - vite i18n
  - import.meta.glob
  - tách mã vite
  - lazy load bản dịch
  - plugin vite i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: Những phần thuộc về Vite, không phải về framework của bạn

Hầu hết các bài hướng dẫn "Vite i18n" thực chất chỉ là bài hướng dẫn React hoặc Vue tình cờ sử dụng Vite. Bài viết này tập trung vào tầng bên dưới: các catalog được import như thế nào, Rollup xử lý chúng ra sao, và tại sao cách lazy loading bạn viết nhiều khả năng không thực sự lazy.

## Mục lục

<TOC/>

## Import tĩnh là mặc định, và nó tải ngay lập tức (eager)

Cấu hình đơn giản nhất là import từng catalog ở đầu module:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Điều đó đưa cả ba catalog vào entry chunk khởi đầu, trên mọi trang web, cho mọi người dùng. Nó chấp nhận được cho hai ngôn ngữ và khoảng một trăm chuỗi chữ. Nhưng khi đạt mười ngôn ngữ, đây trở thành khoản lãng phí lớn nhất có thể phòng tránh được trong bundle của bạn.

## `import.meta.glob` và cờ thiết lập mà ai cũng cấu hình sai

Tính năng glob import của Vite là giải pháp phổ biến:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Tải lười biếng (lazy) là mặc định: mỗi mục là một hàm trả về một dynamic import, và Rollup xuất ra một chunk riêng cho mỗi file. Việc thêm `{ eager: true }` sẽ gộp tất cả chúng vào ngay trong module đang import, đây chính xác là điều bạn đang cố gắng tránh:

```ts
// Mọi ngôn ngữ đều bị nhét vào entry chunk (gần như không bao giờ nên dùng):
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Cái bẫy nằm ở chỗ cả hai phiên bản đều chạy trơn tru ở môi trường phát triển (dev), vì Vite phục vụ các module riêng lẻ mà không đóng gói. Sự khác biệt chỉ lộ diện trong thư mục `dist`. Hãy kiểm tra bằng `npx vite build && npx vite preview`, sau đó xem entry chunk thực sự chứa những gì.

## Chia nhỏ theo route hiếm khi thực sự tách rời được catalog

Đây là điểm khiến nhiều lập trình viên ngạc nhiên. Bạn chia nhỏ catalog theo từng trang:

```
locales/en/home.json
locales/en/checkout.json
```

Sau đó hai route khác nhau cùng import `checkout.json`, và Rollup sẽ gom file đó vào một chunk dùng chung (shared chunk) được tải trên cả hai trang. Cơ chế tách chunk của Rollup được điều khiển bởi đồ thị phụ thuộc module, chứ không phải cấu trúc thư mục của bạn: bất kỳ module nào có thể truy cập được từ nhiều hơn một entry point đều trở thành tài nguyên chung. Việc thêm route thứ ba không thay đổi điều gì, và thêm route thứ tư có thể khiến cách chia chunk bị xáo trộn hoàn toàn.

Do đó, việc chia nhỏ catalog theo từng route chỉ thực sự hoạt động nếu đồ thị import hoàn toàn tách biệt. Nếu kích thước bundle là yếu tố sống còn, hãy đo lường thực tế bằng công cụ trực quan:

```bash
npx vite build && npx vite-bundle-visualizer
```

Nếu bắt buộc phải cố định ranh giới chunk, tùy chọn `build.rollupOptions.output.manualChunks` là lối thoát, nhưng đi kèm với chi phí phải bảo trì cấu hình thủ công.

## Catalog không tự động Hot Reload (HMR)

Sửa một component, Vite thay thế nó tức thì. Sửa file `locales/fr.json`, tùy thuộc vào cách import, có thể sẽ không có gì xảy ra. File JSON được import động không có ranh giới HMR mặc định, vì vậy đồ thị module không biết cách làm mới các component đang sử dụng dữ liệu đó.

Các lập trình viên thường khắc phục điều này bằng cách khởi động lại dev server mỗi khi đổi câu chữ. Trách nhiệm xử lý việc này thuộc về plugin i18n: nó phải đón nhận bản cập nhật HMR và đẩy các thông điệp mới vào ứng dụng đang chạy. Khi đánh giá một thư viện, hãy kiểm tra xem plugin Vite của nó có làm được việc này hay không.

## `define` sẽ nhúng chết locale vào bản build

Việc xác định locale mặc định vào lúc build rất hấp dẫn:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` là một thao tác thay thế văn bản thuần túy diễn ra trong quá trình biên dịch. Bất kỳ giá trị nào có mặt khi bạn build sẽ trở thành giá trị cố định được phân phối, buộc bạn phải tạo ra một bản build riêng cho từng ngôn ngữ. Đây là một chiến lược hợp lệ (được áp dụng bởi giải pháp i18n chính thức của Angular), nhưng nó không phải điều bạn muốn nếu một lần deploy duy nhất phải phục vụ đồng thời tất cả các ngôn ngữ.

Đối với những giá trị cần thay đổi theo từng request của người dùng, hãy tránh xa `define` và xử lý chúng ở thời điểm runtime.

## Đưa việc phân tích cú pháp thông điệp về thời điểm build

Mọi giải pháp trưởng thành trong hệ sinh thái này cuối cùng đều đi theo một hướng: ngừng phân tích cú pháp thông điệp trong trình duyệt.

| Plugin                       | Những gì được chuyển về thời điểm build                                 |
| :--------------------------- | :---------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Biên dịch thông điệp vue-i18n thành render function (chỉ gửi runtime)   |
| Lingui (macro + plugin)      | Trích xuất và biên dịch catalog, thay macro bằng ID thông điệp ngắn gọn |
| Paraglide (inlang)           | Biên dịch từng thông điệp thành một hàm độc lập có thể tree-shake       |
| `vite-intlayer`              | Xây dựng từ điển theo component, dọn dẹp (purge) và rút gọn (minify)    |

Lợi ích đem lại là nhân đôi: bộ biên dịch thông điệp ở runtime hoàn toàn biến mất khỏi bundle người dùng, và các mục không sử dụng có thể được loại bỏ tĩnh. Chi phí đi kèm: cả dev server và CI đều cần cài plugin, đồng thời lệnh `tsc` độc lập hoặc trình chạy test không dùng Vite sẽ cần cấu hình bổ sung.

## SSR: tuyệt đối không lưu trạng thái locale ở phạm vi module

Nếu bạn triển khai SSR (qua framework hoặc `vite-plugin-ssr`), nguyên tắc bất di bất dịch là: biến ở cấp độ module lưu giữ locale hiện tại sẽ bị chia sẻ chung giữa tất cả các request đồng thời trên tiến trình server đó.

```ts
// An toàn trong trình duyệt. Nhưng là lỗ hổng rò rỉ dữ liệu giữa các request trên server:
export let currentLocale = "en";
```

Hai người dùng truy cập server cùng một thời điểm sẽ gây ra race condition, và một trong hai người sẽ nhận về ngôn ngữ của người kia. Lỗi này không bao giờ xuất hiện ở môi trường dev vì bạn là người duy nhất gửi request. Hãy xác định locale riêng biệt cho từng request và truyền rõ ràng qua context hoặc request-local storage của framework.

## Plugin Vite của Intlayer

Intlayer đăng ký một plugin duy nhất đảm nhiệm việc build từ điển, theo dõi thay đổi ở chế độ dev và điều phối quy trình tối ưu hóa:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

Viết lại import, dọn dẹp (purge) và rút gọn (minify) được bật sẵn theo mặc định. Hai tùy chọn quan trọng nằm trong file `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // loại bỏ các trường nội dung không có component nào đọc
    minify: true, // đổi tên các key nội dung thành các alias ngắn gọn
  },
};

export default config;
```

Vì nội dung được khai báo theo từng component thay vì tập trung trong các file ngôn ngữ khổng lồ, lượt purge có được đồ thị module chuẩn xác để đối chiếu, giúp việc loại bỏ code thừa diễn ra an toàn. Xem thêm chi tiết tại [tài liệu tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

## Các sai lầm thường gặp

- **Đặt `{ eager: true }` cho glob đáng lẽ phải lazy load.** Chạy tốt ở dev, nhưng đóng gói tất cả ngôn ngữ khi lên production.
- **Tin rằng cấu trúc thư mục sẽ tự tạo ra các chunk riêng.** Rollup đi theo import chứ không theo thư mục. Hãy đo lường bundle thực tế.
- **Khởi động lại dev server chỉ để thấy thay đổi văn bản.** Dấu hiệu thiếu vắng bộ xử lý HMR trong plugin.
- **Đặt locale vào `define`.** Buộc dự án phải build riêng từng bản cho mỗi ngôn ngữ.
- **Lưu locale ở cấp độ module khi dùng SSR.** Gây lẫn lộn ngôn ngữ giữa các request đồng thời.
- **Đo hiệu năng trên dev server.** Các module chưa đóng gói không phản ánh đúng cấu trúc bundle production.

## Tìm hiểu thêm

- [Tối ưu hóa bundle: dọn dẹp, rút gọn và những gì thực sự gửi tới trình duyệt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)
- [Báo cáo benchmark hiệu năng giữa các framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Tài liệu tham khảo cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Cài đặt Intlayer với Vite và React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- [Adapter tương thích i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md)
- [React i18n: mô hình provider hoạt động ra sao](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: cách thức hoạt động và những điểm hạn chế](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/vue.md)
- [i18n theo component so với i18n tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
