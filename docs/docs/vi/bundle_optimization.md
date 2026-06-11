---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Tối ưu hóa dung lượng Bundle & Hiệu suất i18n
description: Giảm dung lượng bundle của ứng dụng bằng cách tối ưu hóa nội dung quốc tế hóa (i18n). Tìm hiểu cách tận dụng tree shaking và tải 지연 (lazy loading) cho các từ điển với Intlayer.
keywords:
  - Tối ưu hóa Bundle
  - Tự động hóa nội dung
  - Nội dung động
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Thêm `intlayerPurgeBabelPlugin` và `intlayerMinifyBabelPlugin` cho Babel/Webpack; làm rõ quá trình thực thi của các plugin"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Thêm tùy chọn `minify` và `purge` vào cấu hình build"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Tối ưu hóa dung lượng Bundle & Hiệu suất i18n

Một trong những thách thức phổ biến nhất với các giải pháp i18n truyền thống dựa trên file JSON là quản lý dung lượng nội dung. Nếu lập trình viên không tự tay phân tách nội dung vào các namespace một cách hợp lý, người dùng cuối thường phải tải về toàn bộ bản dịch cho tất cả các trang và có thể là cả tất cả các ngôn ngữ chỉ để xem một trang duy nhất.

Ví dụ, một ứng dụng có 10 trang được dịch ra 10 ngôn ngữ có thể khiến người dùng tải về nội dung tương đương 100 trang, mặc dù họ chỉ cần **một trang** (trang hiện tại với ngôn ngữ hiện tại). Điều này dẫn đến sự lãng phí băng thông và thời gian tải trang bị chậm đi đáng kể.

**Intlayer giải quyết vấn đề này thông qua tối ưu hóa ở thời điểm build.** Nó phân tích code của bạn để phát hiện chính xác các từ điển nào đang thực sự được sử dụng cho mỗi component, và chỉ tích hợp nội dung cần thiết đó vào bundle.

## Mục lục

<TOC />

## Phân tích bundle của bạn

Việc phân tích bundle là bước đầu tiên để xác định các file JSON "nặng" và phát hiện các cơ hội để code-splitting (chia nhỏ code). Những công cụ phân tích sẽ tạo ra một sơ đồ treemap trực quan từ mã đã compile của ứng dụng, cho phép bạn thấy được chính xác thư viện nào đang chiếm nhiều không gian nhất.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite sử dụng Rollup phía bên dưới. Plugin `rollup-plugin-visualizer` sẽ tạo ra một file HTML tương tác, hiển thị trực quan dung lượng của mỗi module trong biểu đồ phụ thuộc của bạn.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Tự động mở báo cáo trong trình duyệt
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Với các dự án dùng App Router và Turbopack, Next.js cung cấp một bộ phân tích thực nghiệm được tích hợp sẵn mà không cần bạn phải thêm package mở rộng.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Nếu bạn đang sử dụng trình bundle Webpack mặc định trong Next.js, hãy dùng bundle analyzer chính thức. Bạn có thể kích hoạt bằng cách đặt một biến môi trường trong quá trình build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Cấu hình Next.js của bạn
});
```

**Cách dùng:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack Tiêu Chuẩn

Đối với Create React App (ejected), Angular, hoặc thiết lập Webpack tùy biến, hãy dùng công cụ quen thuộc trong ngành là `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Nó hoạt động như thế nào

Intlayer tiếp cận theo hướng **mỗi component riêng biệt (per-component)**. Khác với các file JSON toàn cục (global), nội dung được xác định song song bên cạnh hoặc bên trong chính các component. Trong quá trình build, Intlayer sẽ:

1. **Phân tích** code của bạn để tìm các hàm gọi `useIntlayer`.
2. **Xây dựng** nội dung từ điển tương ứng cho các phần này.
3. **Thay thế** lệnh gọi `useIntlayer` bằng đoạn code đã được tối ưu hóa dựa trên cấu hình của bạn.

Cách tiếp cận này đảm bảo rằng:

- Nếu một component không được import, nội dung của nó cũng không được đưa vào bundle (Kỹ thuật Dead Code Elimination).
- Nếu một component được tải lazy-load, nội dung của nó cũng sẽ được tự động lazy-load theo.

## Thông tin chi tiết về các Plugin

Trình tối ưu hóa build của Intlayer được chia làm nhiều plugin riêng biệt, mỗi cái đảm nhận duy nhất một công việc cụ thể. Việc hiểu những gì từng plugin thực hiện sẽ giúp bạn tránh nhầm lẫn khi tùy chỉnh cấu hình.

### Các plugin của Babel (`@intlayer/babel`)

Những plugin này được khai báo trực tiếp vào `babel.config.js` ở các dự án phụ thuộc cấu hình Webpack (như Next.js dùng Babel, CRA, hoặc Webpack tùy chỉnh v.v.).

| Plugin                        | Công dụng                                                                                                                                     |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Quét các file `.content.ts` và ghi nội dung từ điển đã biên dịch thành định dạng chuẩn vào thư mục `.intlayer/`                               |
| `intlayerOptimizeBabelPlugin` | Viết lại `useIntlayer('key')` thành `useDictionary(hash)` và tự động inject thư viện `import` để nạp từ điển khớp tương ứng                   |
| `intlayerPurgeBabelPlugin`    | Quét toàn bộ mã nguồn, thực hiện loại bỏ (remove) **các trường nội dung không được sử dụng** ở file từ điển JSON tại `.intlayer/**/*.json`    |
| `intlayerMinifyBabelPlugin`   | **Rút ngắn tên (rename) khóa (keys) của nội dung** thành ký tự ngắn rút gọn (vd: `title` đổi thành `a`) ở JSON cũng như bên trong Source Code |

> **Thứ tự sắp xếp của plugin là rất quan trọng.** Trong `babel.config.js` của bạn, các plugin purge và minify phải được đặt **trước** plugin optimize. Bước optimize thay thế `useIntlayer('key')` bằng một hàm gọi không minh bạch `useDictionary(hash)`, điều này có khả năng làm mất thông tin dictionary-key gốc - vốn là thông tin cần thiết để purge và minify có thể định danh các trường thuộc tính đang được ứng dụng.

Mỗi plugin Babel sẽ đi kèm một helper option để đọc trực tiếp config của `intlayer.config.ts` một lần lúc load hệ thống, sau đó trả về giá trị đã được chuyển đổi:

| Options helper               | Dùng cùng với                 |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Các plugin của Vite (`vite-intlayer`)

Những người dùng Vite **không bao giờ phải cấu hình cái này một cách thủ công**. Chúng tự động được thiết lập thông qua lệnh gọi `withIntlayer()` ở trong `vite.config.ts`. Những cấu hình dạng boolean (đúng/sai) như `build.purge` và `build.minify` ở `intlayer.config.ts` sẽ chuyển đổi các đặc tính tương ứng thông qua config này mà không phải cài đặt gì riêng biệt.

| Plugin Vite ngầm định | Tương đương chức năng                                                                                                                              |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usage analyzer        | Tương tự quy trình quét và tìm kiếm của `intlayerPurgeBabelPlugin`                                                                                 |
| Dictionary prune      | Tương tự quy trình rút gọn và tối ưu bản ghi lưu của `intlayerPurgeBabelPlugin` qua JSON                                                           |
| Dictionary minify     | Tương tự quy trình cắt giảm và rút ngắn độ dài JSON của `intlayerMinifyBabelPlugin` qua JSON                                                       |
| Babel transform       | Tương tự quá trình viết lại tên khóa (key rename) bên nguồn code của `intlayerMinifyBabelPlugin` + thay phiên mã của `intlayerOptimizeBabelPlugin` |

## Tùy chỉnh thiết lập dựa vào Platform (nền tảng)

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js yêu cầu có plugin `@intlayer/swc` cho bước optimize (bước thay thế các lệnh import của hệ thống), do Next.js dùng lõi SWC làm công cụ biên dịch tự động.

> Plugin này không cài đặt theo mặc định bởi vì nền tảng hỗ trợ (API SWC Plugins) trên Next.js vẫn còn là một thử nghiệm. Do đó sẽ có thay đổi khi nó được cập nhật.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Sau khi hoàn tất, Intlayer có thể tìm kiếm và ứng dụng tự động nó cho phần compile hệ thống.

Để áp dụng các bước thao tác **purge và minify** (chức năng xóa bỏ các trường hoặc cấu trúc bị dư thừa, đặt biệt danh thay thế cho file), nên thực hiện bổ sung cài `@intlayer/babel` và thiết lập trên config của Babel. Vì bản thân lõi Next.js dù sử dụng SWC trong quy trình dịch mã cho code (transform) nhưng lại luôn thực hiện phân giải config cài đặt của Babel (qua file `babel.config.js`). Cho nên plugin của Babel sẽ vận hành như bước khởi động tiền đề trước khi chạy SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: hủy bỏ các trường đã không còn sử dụng được tìm thấy bên trong .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: rút gọn và rút ngắn tên cho các JSON + sửa lệnh ở trên source code
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Lưu ý: Không cần đến khai báo `intlayerOptimizeBabelPlugin` ở đây vì
    // @intlayer/swc đã tiếp quản tiến trình biến đổi useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite hoàn toàn tương thích và sử dụng module plugin `@intlayer/babel` nhưng nó đã được cung cấp tự động bởi thư viện phụ trợ `vite-intlayer` và sẵn có ngay bên trong. Mọi quy trình tinh chỉnh từ optimize, rewrite thay đổi đường dẫn mã import, hay purge và minify cũng mặc nhiên kích hoạt theo nên hoàn toàn không cần can thiệp bổ sung thủ công.

Sử dụng cờ (flag) purge hoặc minify cho nhu cầu cá nhân bạn chỉ bằng việc cấu hình vào trong thư mục `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // tối ưu dung lượng JSON bundle qua loại bỏ dư thừa rác
    minify: true, // đổi tên khóa thuộc tính trường sang phiên bản tên ảo thu nhỏ cực gọn
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (và bản Next.js có xài Babel truyền thống)

Cài đặt tiện ích thông qua `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Sau khi cài, hãy đưa toàn bộ cả 4 loại plugins vào nội dung của `babel.config.js` đồng thời nhớ thực thi cấu trúc tuần tự thật chuẩn.

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: biến đổi từ raw .content.ts để nạp qua dạng cấu trúc chuẩn .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: cắt xén, giảm thiểu code thừa nằm trên .intlayer/**/*.json
    //    (hành động này tự kết nối tham số cờ build.purge tại intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: tái thiết lập danh mục biến thành kí tự ngắn dùng trên JSON + Mã gốc
    //    (hành động này tự kết nối tham số cờ build.minify tại intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: Thay dạng cú pháp useIntlayer('key') → useDictionary(hash)
    //    Buộc nằm vị trí tận cùng bởi khi biên tập xong nó sẽ làm vô danh mã định danh key gốc.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Tùy chỉnh cấu hình (Configuration)

Để cung cấp sức mạnh điều khiển tối đa xem cách thức Intlayer quản trị hiệu suất ứng dụng của bạn ra sao, vui lòng điều phối ngay bên trong tham số biến `build` của file `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.VIETNAMESE],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Biến cải những cấu hình useIntlayer() trở thành gọi import kết nối file ở thì hiện thực hóa build
    // undefined = cấu hình chạy tự động (luôn on cho production mode), true = ép buộc mọi lúc, false = không cấp quyền kích hoạt.
    optimize: undefined,

    // Chuyển hóa và đặt bí danh ký tự siêu nhỏ cực ngắn cho biến và tham số đối tượng JSON trên môi trường source code thay thế tên quá rườm rà (ví dụ thay chữ title thành a).
    // Có ảnh hưởng trực tiếp dung lượng lưu trữ JSON cuối cùng; nhưng yêu cầu chạy optimize trước.
    minify: true,

    // Chỉ thị lệnh giúp bóc tách và phân hủy các biến bị thừa thãi (chưa bao giờ được lấy ra sử dụng lúc thiết kế) không thể tham gia bundle biên dịch để giảm payload.
    // Yêu cầu chạy optimize trước.
    purge: true,
  },
};

export default config;
```

> Hướng xử lý an toàn và luôn được đề cử cao nhất thường là giữ nguyên thiết lập định sẵn ban đầu (`undefined`) cho chế độ `optimize`.

> Quý khách muốn khảo sát tài liệu thì mời bấm vào reference link dưới: [Phần Cấu Hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

### Những Thông Tin Build Options Chi Tiết

| Cấu trúc (Property) | Khai báo loại          | Tùy chọn gốc | Thuyết minh giải nghĩa                                                                                                                                                                                                                                            |
| :------------------ | :--------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**      | `boolean \| undefined` | `undefined`  | Kích hoạt bộ chuyển phân giải quy trình gọi lệnh import bằng đường tắt chuẩn nhanh cho compiler. Trạng thái `undefined` = mặc nhiên tham gia cấu thành production mode build. Nhưng trạng thái `false` sẽ chặn đứng quy trình purge cùng minify.                  |
| **`minify`**        | `boolean`              | `false`      | Ra lệnh cho tool đổi danh tính bí danh cho mã key ở các tập lưu dữ liệu (json file) và dùng phiên hiệu ký tự đặc trưng mã ngắn. Nhờ thế, việc phân tích (parser) biến trên file code chính cũng phải thay đổi tương quan. Sẽ bị vô hiệu khi `optimize` = `false`. |
| **`purge`**         | `boolean`              | `false`      | Phụ trách tiêu hủy biến cùng giá trị từ điển không tham gia tương tác ở code lúc lập trình cho đỡ bị nhét thừa thãi vào gói lưu file JSON. Sẽ bị vô hiệu và thất bại kích hoạt nếu thiết lập tùy chỉnh `optimize` = `false`.                                      |

### Chức năng rút gọn Minification (Cắt ngắn độ lớn định danh trường tham chiếu)

Kỹ thuật từ `build.minify` **không phải** là phương tiện giúp tối thiểu hóa cấu trúc JavaScript từ hệ sinh thái — các nền tảng build như vite, next.js sẽ nhận trách nhiệm. Ngược lại, điều nó mang lại chính là cô đọng kích cỡ lưu chứa mã JSON thay toàn bộ khóa định danh nguyên thủy cho nội dung mà lập trình viên nhập vào trở nên đơn giản hơn nhiều bằng việc cung cấp các biệt danh alpha ngắn cũn cởn.

```
// Trình tự thông tin JSON chuẩn bị Minify
{ "title": "Xin chào", "subtitle": "Thế giới" }

// Biểu thức cho thấy trạng thái thực thi Minify đã xong
{ "a": "Xin chào", "b": "Thế giới" }
```

Điều kỳ diệu chính là những thay thế đó ứng dụng trọn vẹn luôn cho mảng tương tác object trên code thực thi, cho nên lúc xài ở compiler, nó cũng tự sửa biến từ `content.title` chuyển qua xài chuẩn `content.a` theo form thu gọn để chạy. Bản chất dữ liệu (Runtime behaviour) hiển thị 100% y nguyên so với kết quả xuất trên file chạy thật.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Lưu ý: Sự can thiệp minify sẽ ngừng thực hiện nếu cờ `optimize` được kích ở mức `false` hoặc lúc bộ hiển thị bằng editor đang dùng tham số `editor.enabled` = `true` (do phía editor thiết kế cần đọc đúng định dạng khai báo nguồn nội dung ban đầu từ file config).

> Sự can thiệp bằng minify đồng thời mất kiểm soát khi tải từ các lệnh gọi JSON ngoại lai của server api khác thông qua thông số gán thiết lập mặc định qua file nguồn `importMode: 'fetch'` — điều này giải quyết và chống phá hỏng liên lạc bằng json của đầu ra máy chủ do nếu app tại máy tính người xài thay danh định gốc trên code sẽ đứt đường tiếp nhận dữ liệu phía cloud.

### Hệ chức năng gạt bỏ rác Purging (xóa trắng các khóa thuộc tính trống hoặc dư)

Hệ công cụ ở `build.purge` thực hiện điều tra những khóa nội dung nào hiện tại thực sự chạy trực tiếp trong code đang code ở môi trường development của bạn, nếu phát hiện cái nào thừa, nó liền thẳng tay xóa mọi mã tồn đọng ở phần JSON sau compile cho sạch.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Thử lấy một ví dụ cơ bản:** Có một tệp từ điển gánh trên vai trọng lượng lên tới 5 biến trường mà thực chất xài lúc làm UI thiết kế chỉ có 2 cái.

```
// Trạng thái tệp rác trước Purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Lúc quét xử lý dữ liệu và tiến hành cắt xén thì sau đó chỉ còn (nhờ ứng dụng lúc xài hàm truy suất chỉ đụng đến title với cả subtitle)
{ "title": "…", "subtitle": "…" }
```

> Hãy cân nhắc bởi Purge cũng chẳng khác gì minify, hệ sẽ phớt lờ thao tác nếu như thông số thuộc `optimize` để là `false` hay công cụ trình hỗ trợ `editor.enabled` đang mở (true).

> Ngoài ra chức năng của hệ cũng bảo lưu quy trình rủi ro và buộc dừng tiến trình purge (như khi không parse được code nguồn để phân tích), hoặc lệnh trả biến ở bộ thu nhận `useIntlayer` xài như thông số ẩn hoặc bị mã hóa ngầm lúc khai báo truyền tin nên analyzer bot mất dấu để định hướng hành tung của nội dung nguồn (một trường hợp cụ thể đó là kiểu trải dữ liệu `spread` cho vô Object bự xài nhưng quên không destructure rõ ràng tham số lúc dùng trong prop). Tại ranh giới bất an kiểu này hệ tự ép lấy sạch sành sanh cho yên tâm trọn gói JSON mà khỏi sợ cắt lố làm mất dữ liệu oan.

### Thiết lập Nạp (Import Mode)

Dành cho những dApp/App siêu bự, ứng dụng ôm gọn cực nhiều thông tin ngôn ngữ thì cấu trúc JSON khéo khi bành trướng nặng nề nhất phần ứng dụng của app. Để tiết kiệm thì nền tảng Intlayer khai báo thuộc tính thông qua `importMode` option cho việc lựa chọn kiểu định lượng dữ liệu truyền qua.

### Tùy Chọn Global (Khu Cực Trọng Tâm)

Chế độ tự import toàn mạng ứng dụng cấu trúc chung thiết đặt cho các mục tại trung tâm `intlayer.config.ts` của bạn.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Tùy chọn này theo máy thường để dạng 'static' mặc định
  },
};

export default config;
```

### Chỉnh Lại Trên Mức Riêng Từng Thư Viện

Nếu muốn điều phối lệnh này mà sợ động ảnh hưởng config global thì tha hồ sửa từng cái trong từng file khai báo từ điển như `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` cho tiện.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Hủy chế độ toàn cục và thiết lập đè cho duy nhất tệp này
  content: {
    // ...
  },
};

export default appContent;
```

| Tên Khai Báo Tính Năng | Tham chiếu Dữ Liệu Loại Trừ        | Hệ Trị Tự Có | Tính Năng & Ứng Dụng                                                                                                                                                        |
| :--------------------- | :--------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`**       | `'static'`, `'dynamic'`, `'fetch'` | `'static'`   | **Từng bị dừng áp dụng cũ (Deprecated)**: Khuyến khích xài tham chiếu thông qua nhánh mới `dictionary.importMode`. Giúp điều khiển bộ xử lý lấy từ điển (như liệt kê dưới). |

Hệ thống thông số cho `importMode` là lệnh yêu cầu cơ cấu tiêm (inject) giá trị biên dịch vào component. Nó cho phép thay thế qua cấu hình tại `dictionary` nội tại config hoặc chèn ép ở riêng file đuôi mở rộng `.content.ts`.

### 1. Phân Lớp Phương Hướng Chế Độ Hoạt Động (Static Mode `default`)

Static hỗ trợ tạo quy trình biên tập để Intlayer làm mờ gọi hàm bằng biến cấu trúc chìm khi nạp đè `useIntlayer` lùi về tham số lõi của `useDictionary` cho trực tiếp cấu hình ở môi trường thực tiễn tại cục build JS luôn mà chẳng đợi kết nối ngoài.

- **Mặt tích cực (Ưu):** Load trang cấp kỳ ko thấy thời gian tải (chạy đồng bộ hóa mã synchoronous), triệt tiêu gánh nặng từ request gọi về API cho băng thông của trang và hydration.
- **Mặt gây phiền hà (Khuyết):** Nhược điểm nặng nhất cho chuyện đó vì cục đóng gọi dữ liệu ép bản thân thu gom của cả **mọi ngôn ngữ cấu hình** đang sở hữu trên thành phần thiết đặt cho mục đó. Khó xài cho app khổng lồ.
- **Tiêu cự tuyệt vời nhất dùng cho:** Ưu thế tối mật khi dùng Single Page Application (SPA).

**Chiếu theo quy trình chuyển mã khi test cấu hình:**

```tsx
// Khu vực mã xài trong src/ code của bạn
const content = useIntlayer("my-key");

// Diễn họa một quá trình hoàn chỉnh khi chuyển đổi mã code ở mức độ Static
// Lưu ý mã minh họa mang tính demo không giống 100% mã chạy thiệt sau optimize
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      vi: "Tiêu đề của tôi",
    },
  },
});
```

### 2. Mô Thức Vận Hành Thông Minh Dựa Trên Tính Logic (Dynamic Mode)

Tại hình thức vận hành kiểu Dynamic, Intlayer sẽ thủ thuật đè lệnh cho `useIntlayer` nạp thẳng đến cơ chế xử lý bằng hàm `useDictionaryAsync`. Chức năng dùng mẹo tạo phương tiện gọi lệnh `import()` (Mô phỏng như Suspense Lazy Component cơ bản) dành riêng cho tải nội dung chỉ gói gọn trong giới hạn Locale hiện đang mở cho khách xem trang và ngắt lấy các locale json khác.

- **Khía cạnh Ưu Điểm Nổi Trội:** **Kỹ thuật Tree Shaking triệt để tới mức locale.** Tỷ như gã khách từ Mỹ chỉ đang xem chế độ web là Tiếng Anh, mã web nhạy bén nhận yêu cầu tải gói ngôn ngữ cục bộ bản English _độc quyền_. File JSON phiên bản tiếng Việt cất cho kỹ ở nhà và chẳng mảy may lôi ra load tốn thời gian.
- **Điều Bất Lợi:** Tự kích lệnh truyền API hoặc fetching cho các phần tài nguyên theo từng node trên component mỗi khi quá trình load thực thi trên trang chủ diễn ra lúc thực hiện tiến trình hydrate.
- **Biện Pháp Giải Quyết Thiết Thực Nhất:** Sử dụng trên đoạn khối Text dày đặc văn mẫu ngồn ngộn, hoặc ứng dụng đa dịch vụ trang bị vô vàn hệ dịch thuật ngôn ngữ toàn cầu mang tính tiết giảm khối dung lượng load.

**Định Mẫu Cơ Học Đã Qua Thay Đổi Form Bố Cục Nền Code:**

```tsx
// Phương Thức Nguyên Mẫu Khởi Điểm Do Bạn Coding
const content = useIntlayer("my-key");

// Minh Chứng Code Đã Xử Xong Ở Nền Biến Tướng (Dynamic Mode)
// Biểu Phác Để Giới Thiệu Chứ Thực Tế Form Máy Đã Generate Tối Ưu Còn Hay Hơn Nhiều Nữa
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  vi: () =>
    import(".intlayer/dynamic_dictionary/my-key/vi.json").then(
      (mod) => mod.default
    ),
});
```

> Hễ mà mở quyền thông số `importMode: 'dynamic'`, giả như trong tay bạn ném tới cả 100 đoạn UI con con xài lệnh từ cục `useIntlayer` tại ngay trong cấu thành page đó, trình duyệt vã mồ hôi và phải cắm đầu phóng lên bầu trời đủ số lượng yêu cầu là 100 truy vấn lấy json tách biệt. Để tháo bỏ gông cùm lỗi kẹt truy vấn theo "băng chuyền waterfall" độc hại này, cố nhồi thông tin cho ít tệp chia nhỏ `.content` nhất (vd như lập một bảng dịch khổng lồ ứng từng mảng hiển thị). Việc cấp mã khai báo cùng một Tên Gọi key trên nhiều mục `.content` phân nhánh hoàn toàn vẫn khả thi. Hệ Intlayer tự khôn mà gộp chúng và hợp nhất trọn vẹn tại thành duy nhất một cái danh sách bảng dictionary để tiết giảm request.

### 3. Fetch Mode (Kéo Về Trực Tiếp Nguồn Code Chạy Tại Trình Web Server)

Quy chuẩn xài thì gần giống loại Dynamic, có điều quy trình lại rẽ trái sang việc xin bảng dịch lấy về qua nền cấu trúc cấp dữ liệu qua API từ Intlayer Live Sync. Trong một rủi ro đường truyền bị gãy hoặc là chẳng cài cho tính năng Live Updates bên trang CMS, code cũng khôn khéo thoái lui rơi ngược quay trở lại dùng chế độ nạp tải bằng Dynamic Mode như trước.

**Chuyển Form Khi Sử Dụng Phương Thức Cho Quá Trình Hoàn Chỉnh:**

```tsx
// Code Thuộc Phần Thao Tác Bên Phía Môi Trường Workspace Của Lập Trình Viên
const content = useIntlayer("my-key");

// Khái Lược Cho Trình Code Fetch Hoàn Chỉnh Về API Server (Mô Phỏng Trực Tiếp Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  vi: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/vi").then((res) =>
      res.json()
    ),
});
```

> Thêm kiến thức nền tham quan thêm bên kho thông tin cho CMS thì nhấp vào: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)

> Lên giao thức fetch này thì chuyện gạt rác hay cắt ghép rút gọn (purge & minify) là bị khóa kín chốt vĩnh viễn luôn vì cái bảng JSON được kéo xuống bằng dạng nguyên sơ y nguyên với đống thuộc tính chả đổi tên nào gửi trực tiếp bằng dữ liệu nguồn API Remote xa xôi từ máy chủ nội bộ trên Cloud CMS do user gõ sao nó phản chiếu ngược trở lại đúng như cũ.

## Tổng Đoán Nhanh: So Kè Tính Ưu Việt Của Loại Static Cùng Với Dynamic

| Điểm Chạm Thực Nghiệm                                                            | Áp Dụng Loại Hình Thức Static Mode                                                 | Áp Dụng Loại Hình Thức Dynamic Mode                                                         |
| :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Kích Thước Cục Pack Build Do Cấu Thành Bằng Bundle Tương Thích Ở File Nén JS** | Quá Lớn (Nó ôm đồm toàn bộ đống code tất cả bản dịch trong từng Node)              | Mi Nhon Mảnh Mai (Xài code load thô ráp mà chẳng xài Content Trực Tiếp)                     |
| **Lần Nạp File Từ Đầu Load**                                                     | Nạp Trang Mức "The Flash" (Nội dung ăn chực tại nền Bundle)                        | Sẽ Độ Trễ Sương Sương Khẽ Mỏng (Tại Cần Lôi JSON Phân Phối Trực Tiếp)                       |
| **Vấn Đề Đòi Request Băng Thông Trên Đường Mạng**                                | Bằng 0 Hoàn Toàn                                                                   | Phát Hành Chuẩn Cú 1 Request Cho Duy Nhất 1 Bảng Key Component Dictionary                   |
| **Bảo Vệ Tính An Toàn Loại Rác Thừa Qua Việc Tree Shaking**                      | Theo Khu Vực Thuộc Về Component                                                    | Tính Linh Động Nhờ Chạy Khép Component + Khép Riêng Mức Locale Do Yêu Cầu Tùy Loại Ngôn Ngữ |
| **Xài Chuẩn Không Chỉnh Ở Tính Chất Cho Đạt Case Xịn Khỏi Chê**                  | Thể Loại Cấu Trúc Thành Phần Giao Diện Nhanh Lẹ Cho Phép Chạy Web Trọng Lượng Thấp | Ở Lãnh Thổ Website Sỡ Hữu Mớ Tài Liệu Quá Dài Có Nhiều Nút Đa Dịch Có Số Lượng Kếch Xù      |
