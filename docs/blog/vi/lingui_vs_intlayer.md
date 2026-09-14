---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs Intlayer: Điểm chuẩn & So sánh 2026"
description: "Hai thư viện i18n dựa trên trình biên dịch được đo lường trên Next.js và TanStack Start. Kích thước bundle, rò rỉ nội dung, kích thước component, quá trình hydrate, độ phản hồi chuyển đổi ngôn ngữ và trải nghiệm lập trình viên."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Điểm chuẩn quốc tế hóa (i18n) trên React & Next.js

Lingui và Intlayer là hai thư viện trong bài đánh giá điểm chuẩn này dựa trên một **trình biên dịch (compiler)** thay vì một runtime thuần túy. Lingui trích xuất các thông điệp từ macro trong thời gian build và biên dịch các danh mục theo từng ngôn ngữ. Intlayer biên dịch các từ điển theo từng component và thực hiện tree-shake chúng theo từng ngôn ngữ. Về mặt lý thuyết, chúng phải rất gần nhau. Các con số cho thấy chúng bắt đầu phân kỳ ở đâu.

Dữ liệu được lấy từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), một bộ công cụ mã nguồn mở xây dựng cùng một ứng dụng với mỗi thư viện và ghi lại những gì trình duyệt thực sự tải xuống và thực thi.

<TOC/>

> **Tóm tắt (tl;dr)**: Lingui tiếp cận gần nhất với Intlayer về lượng JavaScript thô trên mỗi trang: **115-120 KB** so với **118.6 KB** trên TanStack Start sau khi định cấu hình tải lười (lazy loading), **148.6 KB** so with **141.3 KB** trên Next.js. Tuy nhiên khoảng cách xuất hiện ở các khía cạnh khác: một component Lingui được biên dịch độc lập nặng **58-153 KB** so với **6-8 KB** của Intlayer, quá trình hydrate mất **28-34 ms** so với **11-14 ms**, ngôn ngữ dự phòng nguồn làm rò rỉ **3-15%** chuỗi `en` vào các trang `fr` trong mọi thiết lập tối ưu hóa, và việc đạt được thiết lập tối ưu đó đòi hỏi phải trích xuất, biên dịch và chọn thủ công các danh mục theo từng route. Intlayer đạt được điều đó mà không cần bất kỳ cấu hình nào.

## Tóm lược

- **Lingui** - Dựa trên macro (`` t`...` ``, `<Trans>`, `msg`), định dạng ICU MessageFormat, danh mục `.po` / JSON, quy trình làm việc `lingui extract` + `lingui compile`. Biên dịch ID thông điệp thành các hash ngắn, hỗ trợ tải danh mục động theo ngôn ngữ. Được thiết lập tốt, không phụ thuộc vào framework, hệ sinh thái công cụ dịch thuật mạnh mẽ xoay quanh file `.po`.
- **Intlayer** - Mô hình nội dung lấy component làm trung tâm. Các từ điển `.content.ts` nằm ngay cạnh component mà chúng phục vụ, trình biên dịch thời gian build thực hiện tree-shake và tải lười theo từng component và từng ngôn ngữ, các kiểu TypeScript nghiêm ngặt được tạo tự động từ nội dung của bạn, và các bản dịch còn thiếu sẽ báo lỗi ngay khi build. Tích hợp sẵn middleware, bộ hỗ trợ SEO, Visual Editor / CMS và dịch thuật với sự hỗ trợ của AI.

| Thư viện              | Ngôi sao GitHub                                                                                                                                                                | Tổng số commit                                                                                                                                                                     | Commit cuối                                                                                                                                         | Phiên bản đầu | Phiên bản NPM                                                                                                       | Lượt tải NPM                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Tháng 4 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Tháng 12 2016 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Huy hiệu cập nhật tự động. Ảnh chụp dữ liệu sẽ thay đổi theo thời gian.

## So sánh tính năng chi tiết

| Tính năng                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                              | Lingui (`@lingui/core` / `@lingui/react`)                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Bản dịch đặt cạnh component**                     | ✅ Có, file `.content.ts` đặt ngay cạnh từng component                                     | ⚠️ Chuỗi nguồn inline trong JSX qua macro; bản dịch nằm trong danh mục `.po` tập trung            |
| **Tích hợp TypeScript**                             | ✅ Kiểu dữ liệu nghiêm ngặt được tạo tự động từ nội dung                                   | ⚠️ Macro có kiểu dữ liệu; ID thông điệp thì không, các mục danh mục bị thiếu không được phát hiện |
| **Phát hiện bản dịch còn thiếu**                    | ✅ Lỗi TypeScript + lỗi/cảnh báo tại thời gian build                                       | ⚠️ `lingui extract` báo cáo thống kê; runtime sẽ dự phòng về chuỗi nguồn ban đầu                  |
| **Nội dung phong phú (JSX / Markdown / component)** | ✅ Hỗ trợ trực tiếp                                                                        | ✅ `<Trans>` với các component lồng nhau                                                          |
| **Hỗ trợ ICU**                                      | ⚠️ Đang phát triển                                                                         | ✅ Có (macro `plural`, `select`, `selectOrdinal`)                                                 |
| **Định dạng (ngày tháng, số, tiền tệ)**             | ✅ `useNumber`, `useDate`, ... (sử dụng Intl bên dưới)                                     | ✅ `i18n.date()`, `i18n.number()`                                                                 |
| **Định tuyến bản địa hóa & middleware**             | ✅ Proxy/middleware tích hợp sẵn, `getMultilingualUrls`                                    | ❌ Không thuộc phần lõi                                                                           |
| **Hỗ trợ SEO (hreflang, sitemap, robots)**          | ✅ Công cụ tích hợp sẵn                                                                    | ❌ Thủ công                                                                                       |
| **Server Component đồng bộ**                        | ✅ `useIntlayer` từ `next-intlayer/server` hoạt động trong bất kỳ server component con nào | ⚠️ Cần một phiên bản `I18n` cho mỗi request, truyền xuống hoặc thiết lập qua `setI18n`            |
| **Tree-shaking (chỉ gửi nội dung sử dụng)**         | ✅ Theo từng component, từng ngôn ngữ, được tự động hóa bởi trình biên dịch                | ⚠️ Theo từng ngôn ngữ qua `lingui compile`; theo từng route cần chia danh mục thủ công            |
| **Tải lười (Lazy loading)**                         | ✅ `importMode: 'dynamic'` (một dòng cấu hình)                                             | ⚠️ Sử dụng `import()` thủ công cho các danh mục đã biên dịch + `i18n.load()` / `i18n.activate()`  |
| **Dọn sạch nội dung không sử dụng**                 | ✅ Các từ điển không còn sử dụng sẽ bị loại bỏ khi build                                   | ✅ `lingui extract --clean` xóa các thông điệp lỗi thời                                           |
| **Kiểm thử bản dịch thiếu (CLI / CI)**              | ✅ `npx intlayer content test`                                                             | ⚠️ Thống kê từ `lingui extract` (mặc định không trả về mã thoát lỗi)                              |
| **Quy trình build (Build pipeline)**                | ✅ Một plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                      | ⚠️ Plugin macro (Babel hoặc SWC) + các bước `extract` + `compile`                                 |
| **Dịch thuật bằng AI**                              | ✅ Tích hợp sẵn, sử dụng khóa API nhà cung cấp của riêng bạn                               | ❌ Không                                                                                          |
| **Trình chỉnh sửa trực quan / CMS**                 | ✅ Trình chỉnh sửa trực quan miễn phí + CMS tùy chọn                                       | ❌ Không (`.po` hoạt động với các hệ thống TMS bên ngoài)                                         |
| **Máy chủ MCP & Kỹ năng Agent**                     | ✅ Có                                                                                      | ❌ Không                                                                                          |
| **Hệ sinh thái / cộng đồng**                        | ⚠️ Nhỏ hơn nhưng đang phát triển nhanh chóng                                               | ✅ Đã được khẳng định, không phụ thuộc framework                                                  |

## Bài kiểm tra điểm chuẩn

### Những gì đã được đo lường

Bộ thử nghiệm [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng** với mỗi thư viện: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 ngôn ngữ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), các component giống hệt nhau và nội dung giống hệt nhau. Các trang được đo lường bằng `en` và `fr`. Mỗi thư viện được triển khai theo tối đa bốn **chiến lược tải**, từ cấu hình cơ bản đến cấu hình tối ưu:

| Chiến lược         | Mô tả                                                                                   | Đối tượng sử dụng                               |
| ------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **static**         | Danh mục đã biên dịch của mỗi ngôn ngữ được import và tải trước toàn bộ                 | Bản dựng thử nghiệm nhanh, mã do AI tạo         |
| **dynamic**        | Chỉ danh mục của ngôn ngữ đang hoạt động mới được `import()`, nhưng chứa toàn bộ trang  | Đa số các dự án                                 |
| **scoped-static**  | Một danh mục cho mỗi route, tất cả được đóng gói sẵn từ đầu                             | Hiếm gặp                                        |
| **scoped-dynamic** | Một danh mục cho mỗi route + `import()` tải lười. Chỉ trang hiện tại, ngôn ngữ hiện tại | Các ứng dụng có ngân sách hiệu năng nghiêm ngặt |

Intlayer không có biến thể "scoped": trình biên dịch tự động giới hạn phạm vi nội dung **theo từng component**, vì vậy các hàng `static` và `dynamic` của nó vốn dĩ đã được tối ưu hóa phạm vi.

Đối với mỗi bản build, bộ công cụ ghi lại:

- **Kích thước thư viện (Lib size)**: kích thước gzip của một component trống chỉ import thư viện i18n. Chi phí cố định của runtime.
- **JS trang (Page JS)**: lượng JavaScript gzip tải xuống trên mỗi trang, tính trung bình trên tất cả các trang và ngôn ngữ.
- **% rò rỉ ngôn ngữ (Locale leak %)**: tỷ lệ chuỗi dịch được tìm thấy trong file JS tải về thuộc về ngôn ngữ mà người dùng **không** xem (được đo trên `en` và `fr`, do đó 50% nghĩa là "ngôn ngữ đo lường còn lại có mặt đầy đủ"; với 10 ngôn ngữ được đóng gói, lượng lãng phí thực tế còn cao hơn nhiều).
- **% rò rỉ trang (Page leak %)**: tỷ lệ chuỗi dịch được tìm thấy trong JS tải về thuộc về trang mà người dùng **không** truy cập.
- **Trung bình component (Component avg)**: kích thước gzip trung bình của mỗi component khi được biên dịch độc lập. Thể hiện dung lượng runtime và danh mục mà một component đơn lẻ kéo theo.
- **Độ phản hồi E2E**: thời gian thực tế giữa việc chọn một ngôn ngữ mới và khi thuộc tính `html[lang]` được cập nhật trong DOM (Playwright, 5 lần lặp lại).
- **Hydrate (Hydration)**: thời lượng của giai đoạn hydrate trong React.

> Các số liệu dưới đây được lấy từ lần chạy vào ngày **2026-09-12** với `@lingui/react` 6.6.0 và `intlayer` 9.5.1. Ứng dụng thử nghiệm được thiết kế cố ý nhỏ gọn (vài chục chuỗi mỗi ngôn ngữ), do đó tỷ lệ phần trăm rò rỉ mô tả một **khuôn mẫu**: chúng sẽ tăng dần theo nội dung của bạn trong khi chi phí runtime cố định giữ nguyên.

### Kết quả trên Next.js

| Thư viện              | Chiến lược     | Kích thước Lib (gz) | JS trang TB (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | TB component (gz) | Độ phản hồi E2E | Hydrate |
| --------------------- | -------------- | ------------------: | ---------------: | -------------: | ----------: | ----------------: | --------------: | ------: |
| **base** (không i18n) | -              |              0.0 KB |         141.0 KB |           0.0% |        0.0% |            0.9 KB |         13.4 ms | 11.8 ms |
| Lingui                | static         |             11.9 KB |         207.4 KB |          50.0% |       90.0% |           73.3 KB |         15.3 ms | 15.2 ms |
| Lingui                | dynamic        |             11.9 KB |         145.4 KB |           2.8% |       89.9% |           19.9 KB |         15.7 ms | 12.7 ms |
| Lingui                | scoped-static  |             11.9 KB |         148.2 KB |           2.7% |       89.1% |           20.4 KB |         15.1 ms | 13.1 ms |
| Lingui                | scoped-dynamic |             11.9 KB |         148.6 KB |          14.8% |        0.0% |          152.6 KB |         16.1 ms | 14.8 ms |
| **`next-intlayer`**   | static         |          **5.5 KB** |     **141.3 KB** |       **0.0%** |    **0.0%** |        **8.5 KB** |     **15.5 ms** | 16.9 ms |
| **`next-intlayer`**   | dynamic        |          **5.5 KB** |     **141.3 KB** |       **0.0%** |    **0.0%** |        **6.9 KB** |     **15.3 ms** | 15.9 ms |

**Cách đọc kết quả**

- **Chi phí runtime.** Một component trống tiêu tốn 11.9 KB gzip với Lingui, so với 5.5 KB với Intlayer. Trên toàn bộ trang, cấu hình tốt nhất của Lingui ở mức **+7.3 KB** so với Intlayer (148.6 so với 141.3 KB); Intlayer chỉ ở mức **+0.3 KB** so với ứng dụng gốc không dùng i18n.
- **Thiết lập đơn giản rất tốn kém.** Việc tải trước mọi danh mục đã biên dịch dẫn đến kích thước **207.4 KB mỗi trang**, tăng thêm +66 KB so với ứng dụng gốc. Một nửa số chuỗi ký tự thuộc về sai ngôn ngữ, 90% thuộc về sai trang.
- **Tải động khắc phục rò rỉ ngôn ngữ chứ không khắc phục rò rỉ trang.** Với một danh mục cho mỗi ngôn ngữ, rò rỉ trang vẫn ở mức ~90%: toàn bộ danh mục `fr` được gửi trên mọi trang tiếng Pháp. Để đạt mức rò rỉ trang 0% cần có cấu hình `scoped-dynamic`: một danh mục riêng cho mỗi route, được trích xuất và biên dịch riêng, sau đó chọn lọc thủ công trong từng trang.
- **Dự phòng ngôn ngữ nguồn bị rò rỉ.** Ngay cả trong các thiết lập tối ưu hóa, **3-15% chuỗi `en` vẫn bị đưa vào các trang `fr`**. Macro của Lingui giữ lại thông điệp nguồn như một phương án dự phòng, do đó nó nằm trong bundle bên cạnh bản dịch. Intlayer giải quyết các dự phòng tại thời gian build và chỉ gửi đúng ngôn ngữ đang hoạt động.
- **Kích thước component bùng nổ trong `scoped-dynamic`.** Mỗi component được biên dịch riêng lẻ đạt trung bình **152.6 KB**, vì danh mục của mọi route đều có thể truy cập được từ component import nó. Component tương tự sử dụng `useIntlayer()` chỉ đạt trung bình **6.9 KB**.

### Kết quả trên TanStack Start

| Thư viện                         | Chiến lược     | Kích thước Lib (gz) | JS trang TB (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | TB component (gz) | Độ phản hồi E2E | Hydrate |
| -------------------------------- | -------------- | ------------------: | ---------------: | -------------: | ----------: | ----------------: | --------------: | ------: |
| **base** (không i18n)            | -              |              0.0 KB |         111.0 KB |           0.0% |        0.0% |            0.7 KB |          8.1 ms | 21.6 ms |
| Lingui                           | static         |             11.2 KB |         152.2 KB |          50.0% |       90.0% |           58.0 KB |          3.9 ms | 19.9 ms |
| Lingui                           | dynamic        |             11.2 KB |         115.2 KB |           9.3% |        0.0% |           85.5 KB |          5.9 ms | 28.0 ms |
| Lingui                           | scoped-static  |             11.2 KB |         120.8 KB |           4.0% |        0.0% |          147.9 KB |          7.1 ms | 33.9 ms |
| Lingui                           | scoped-dynamic |             11.2 KB |         120.2 KB |           8.6% |        0.0% |           83.7 KB |         42.1 ms | 32.9 ms |
| **`intlayer`**                   | static         |          **5.0 KB** |     **125.8 KB** |          50.0% |    **0.0%** |        **8.1 KB** |      **3.2 ms** | 11.5 ms |
| **`intlayer`**                   | dynamic        |          **5.0 KB** |     **118.6 KB** |       **0.0%** |    **0.0%** |        **6.3 KB** |      **3.6 ms** | 14.1 ms |
| `@intlayer/lingui` (tương thích) | dynamic        |             10.3 KB |         137.0 KB |           9.9% |        0.0% |           12.8 KB |          2.9 ms | 19.7 ms |

**Cách đọc kết quả**

- **Về lượng JavaScript trên mỗi trang, Lingui nhỉnh hơn trong gang tấc.** `dynamic` Lingui đạt mức **115.2 KB**, thấp hơn 3.4 KB so với 118.6 KB của Intlayer. Các danh mục đã biên dịch của Lingui với ID băm rất gọn nhẹ, và router TanStack Start phân chia route đủ tốt để rò rỉ trang đã là 0% ngay ở hàng `dynamic`.
- **Mọi chỉ số khác ngoài kích thước trang đều nghiêng về Intlayer.** Quá trình hydrate mất **28-34 ms** với Lingui so với **11-14 ms** với Intlayer: `i18n.load()` + `i18n.activate()` phải chạy trên client trước khi React có thể hydrate. Các component được biên dịch riêng lẻ nặng **58-148 KB** so với **6-8 KB**. Rò rỉ ngôn ngữ không bao giờ đạt 0% (ở mức 4-9%) do ngôn ngữ dự phòng nguồn.
- **Việc chuyển đổi ngôn ngữ trong thiết lập tối ưu hóa diễn ra chậm.** `scoped-dynamic` Lingui mất **42 ms** để cập nhật `html[lang]`: danh mục route mới phải được tìm nạp, tải và kích hoạt trước khi thay đổi hiển thị. Intlayer chuyển đổi chỉ trong **3-4 ms** ở cả hai chế độ.
- **Hàng `static` của Intlayer vốn đã có 0% rò rỉ trang** vì chỉ các từ điển được import bởi các component trên trang mới được đóng gói. Một dòng cấu hình (`importMode: 'dynamic'`) cũng loại bỏ luôn tình trạng rò rỉ ngôn ngữ.
- **`@intlayer/lingui`** giữ nguyên cú pháp macro của Lingui và phân phối từ các từ điển Intlayer. Nó chấp nhận hy sinh một phần dung lượng trang (137 KB, do runtime của macro vẫn tồn tại) để đổi lấy component nhỏ hơn (12.8 KB) và quá trình hydrate nhanh hơn Lingui gốc. Đây là một bước chuyển đổi dần, không phải đích đến cuối cùng.

## Tại sao lại có khoảng cách? Hai trình biên dịch, hai đơn vị xử lý

Cả hai thư viện đều thực hiện biên dịch. Sự khác biệt nằm ở chỗ chúng **biên dịch cái gì**.

**Lingui biên dịch các danh mục.** Macro trong mã nguồn của bạn được trích xuất vào một tệp `.po` cho mỗi ngôn ngữ, sau đó được biên dịch thành một module JS cho mỗi ngôn ngữ. Đơn vị xử lý là **ngôn ngữ**. Việc chia nhỏ hơn nữa, theo từng route hoặc theo từng component, đồng nghĩa với việc tạo nhiều danh mục, cấu hình `lingui.config.ts` để trích xuất từng danh mục từ các tập tin khác nhau, và tải đúng danh mục trên mỗi route. Phiên bản `I18n` runtime là biến toàn cục; mọi lệnh gọi `useLingui()` đều đăng ký component với nó.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # kết quả đầu ra của lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer biên dịch các từ điển.** Mỗi tệp `.content.ts` là một từ điển gắn liền với một key; trình biên dịch phân giải component nào import key nào và phát ra đúng đoạn JSON mà component đó cần, cho từng từ điển và từng ngôn ngữ. Đơn vị xử lý là **component**. Việc thu hẹp phạm vi theo route là kết quả tự nhiên: một trang chỉ tải từ điển của các component mà nó thực sự kết xuất.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Đó là lý do tại sao mẫu `scoped-dynamic` là kết quả build tự động của Intlayer nhưng lại là một dự án cấu hình thủ công đầy gian nan đối với Lingui.

> Để có được các số liệu của hàng `dynamic`, hãy đặt `dictionary.importMode: 'dynamic'` trong `intlayer.config.ts`. Xem thêm [tài liệu tối ưu hóa bundle](https://intlayer.org/vi/doc/concept/bundle-optimization).

## Trải nghiệm lập trình viên

### Cài đặt

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Sau đó thêm `@lingui/babel-plugin-lingui-macro` (hoặc `@lingui/swc-plugin`) vào bundler, chạy `lingui extract` sau khi sửa đổi mã nguồn, chạy `lingui compile` trước khi build và bọc cây component trong `<I18nProvider i18n={i18n}>`.

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Thêm `intlayer()` vào `vite.config.ts` (hoặc `withIntlayer()` vào `next.config.ts`) và bọc cây ứng dụng trong `<IntlayerProvider>`. Không cần bước trích xuất hay biên dịch riêng biệt: từ điển được xây dựng tự động khi bundler chạy.

### Component

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Văn bản tiếng Anh nằm trực tiếp trong component; văn bản tiếng Pháp nằm trong `src/locales/fr/messages.po` dưới dạng một ID đã được băm, sau khi chạy `lingui extract`. Nếu quên chạy lệnh hoặc quên `compile`, ứng dụng sẽ lặng lẽ quay về tiếng Anh.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Cả hai ngôn ngữ đều nằm trong cùng một tệp ngay cạnh component. Việc thiếu giá trị `fr` sẽ gây ra lỗi khi build, và sai key sẽ báo lỗi TypeScript ngay lập tức.

### Bên ngoài các component

Metadata, loaders, các hàm server: bất kỳ nơi nào không có cây React.

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Cần tạo phiên bản `I18n` mới cho mỗi lần gọi, tự tay tải đúng danh mục và dùng `msg` + `i18n._()` thay vì `t`. Như ghi nhận từ [báo cáo điểm chuẩn](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), việc xác định khi nào dùng `t`, `` t` ` ``, `i18n.t()`, `msg` hay `<Trans>` không hề dễ đoán.

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## Giữ lại macro Lingui, tận dụng từ điển Intlayer

`@intlayer/lingui` là một adapter tương thích trực tiếp dành cho `@lingui/core` và `@lingui/react`. Các macro tiếp tục được biên dịch như trước; các lệnh gọi `i18n._()` trong runtime mà chúng biên dịch thành sẽ được cung cấp từ các từ điển Intlayer, với plugin đồng bộ `.po` giữ cho các danh mục hiện tại của bạn đóng vai trò là nguồn dữ liệu chuẩn. Các mẫu số nhiều và lựa chọn ICU hiển thị hoàn toàn tương tự.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Giữ `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` chạy trước trình biên dịch Intlayer trong quá trình build. Xem thêm [tài liệu tương thích Lingui](https://intlayer.org/vi/doc/compatibility/lingui).

## Khi nào nên chọn thư viện nào?

- **Chọn Lingui** nếu bạn muốn **ICU MessageFormat** với các macro được định kiểu, người dịch của bạn làm việc với tệp **`.po`** trong quy trình TMS sẵn có, bạn thích viết chuỗi nguồn inline ngay trong JSX và đội ngũ của bạn thành thạo quy trình trích xuất, biên dịch và chia nhỏ danh mục. Lượng JS trên mỗi trang rất cạnh tranh sau khi thiết lập tải lười.
- **Chọn Intlayer** nếu bạn muốn **nội dung theo phạm vi component**, **TypeScript nghiêm ngặt**, **phát hiện thiếu bản dịch khi build**, **tự động tree-shaking và tải lười mà không cần cấu hình**, component siêu nhẹ, hydrate nhanh chóng, chuyển đổi ngôn ngữ tức thì và bộ công cụ biên tập tích hợp sẵn (Visual Editor, CMS, dịch thuật AI, máy chủ MCP). Đặc biệt phù hợp cho các codebase dạng module và hệ thống thiết kế lớn.
- **Chọn `@intlayer/lingui`** nếu bạn đang sử dụng Lingui và muốn chuyển dần sang từ điển Intlayer mà không phải sửa đổi các macro hiện có.

## So sánh liên quan

- [next-intl vs Intlayer](https://intlayer.org/vi/blog/next-intl-vs-intlayer) (cùng bài đánh giá)
- [i18next vs Intlayer](https://intlayer.org/vi/blog/i18next-vs-intlayer) (cùng bài đánh giá)
- [Điểm chuẩn vue-i18n vs Intlayer](https://intlayer.org/vi/blog/vue-i18n-vs-intlayer-benchmark) (cùng bài đánh giá)
- [Trình biên dịch vs i18n khai báo](https://intlayer.org/vi/blog/compiler-vs-declarative-i18n)

## Ngôi sao GitHub

Số sao GitHub là một chỉ báo rõ nét về mức độ phổ biến, sự tin cậy của cộng đồng và sự phát triển bền vững của dự án. Mặc dù không phản ánh trực tiếp chất lượng kỹ thuật, chúng cho thấy số lượng lập trình viên nhận thấy dự án hữu ích và muốn áp dụng nó.

[![Biểu đồ lịch sử sao](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Kết luận

Lingui là thư viện kết hợp runtime và compiler mạnh mẽ nhất trong bài kiểm tra này. Các danh mục đã biên dịch và băm của nó mang lại dung lượng JavaScript trên mỗi trang chỉ chênh lệch vài KB so với Intlayer, và thậm chí còn thấp hơn đôi chút trên TanStack Start. Nếu số byte trên mỗi trang là thước đo duy nhất, đây sẽ là một kết quả hòa.

Nhưng thực tế không chỉ có vậy. Trình biên dịch của Lingui dừng lại ở cấp độ ngôn ngữ; mọi thứ bên dưới (danh mục theo route, tải lười, ngăn chặn chuỗi dự phòng lọt vào bundle) đều đòi hỏi cấu hình thủ công. Bài kiểm tra cho thấy rõ cái giá của ranh giới này: component **lớn hơn 10-20 lần**, quá trình hydrate **chậm hơn 2-3 lần**, **rò rỉ ngôn ngữ 3-15%** không thể triệt tiêu và chuyển đổi ngôn ngữ mất **42 ms** ở chế độ tối ưu. Trình biên dịch của Intlayer hoạt động ở cấp độ component, do đó các con số đó lần lượt là **6-8 KB**, **11-14 ms**, **0%** và **3-4 ms** mà không cần cấu hình thủ công.

Tất cả dữ liệu thô, ứng dụng thử nghiệm và script đều có trong [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Bạn có thể tự mình chạy thử.

Tham khảo tài liệu ['Tại sao chọn Intlayer?'](https://intlayer.org/vi/doc/why) để biết thêm chi tiết.
