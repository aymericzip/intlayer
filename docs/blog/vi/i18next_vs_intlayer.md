---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs Intlayer: Đo kiểm và So sánh chi tiết năm 2026"
description: "Đo lường react-i18next và next-i18next so với Intlayer trên Next.js và TanStack Start. Kích thước bundle, rò rỉ nội dung, tốc độ phản hồi khi chuyển ngôn ngữ và trải nghiệm lập trình viên."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Đa ngôn ngữ
  - i18n
  - Benchmark
  - Kích thước bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Đo kiểm đa ngôn ngữ (i18n) cho React & Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` là framework i18n phổ biến nhất trong hệ sinh thái JavaScript. Thông qua `react-i18next` và `next-i18next`, nó đang vận hành phần lớn các ứng dụng React và Next.js. Intlayer là một giải pháp thay thế hiện đại dựa trên trình biên dịch và cô lập phạm vi theo từng component.

Bài viết này so sánh hai giải pháp dựa trên số liệu đo lường thực tế thay vì danh sách tính năng đơn thuần. Các số liệu được trích xuất từ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) - một bộ đo lường nguồn mở xây dựng cùng một ứng dụng mẫu trên từng thư viện và ghi nhận chính xác những gì trình duyệt tải về.

<TOC/>

> **Tóm tắt cốt lõi (tl;dr)**: `i18next` là runtime nặng nhất trong thử nghiệm benchmark: làm tăng thêm **+77 KB gzip mỗi trang** trên Next.js ở cấu hình cơ bản, và vẫn tăng **+22 KB** sau khi đã tối ưu hóa toàn diện namespace và lazy-loading. Ngược lại, Intlayer chỉ thêm vỏn vẹn **+0.3 KB**. Mọi cấu hình `i18next` ngoại trừ cấu hình phân tách phạm vi hoàn toàn (scoped) đều **rò rỉ khoảng 90% chuỗi ký tự của các trang khác**; trong khi Intlayer đạt **0%** rò rỉ theo mặc định. Thao tác chuyển đổi ngôn ngữ với backend tải lười (lazy load) mất **123-185 ms** với `react-i18next`, so với chỉ **3-4 ms** ở Intlayer. Bộ chuyển đổi tương thích `@intlayer/next-i18next` giữ nguyên API của `i18next` nhưng hạ kích thước trang từ **218.5 KB** xuống còn **150.7 KB**.

## Tóm tắt nhanh

- **i18next / react-i18next / next-i18next** - Lâu đời, hệ sinh thái plugin đồ sộ và độc lập với framework. Hỗ trợ namespaces, bộ nhận diện ngôn ngữ, các dạng backend, ICU qua plugin và thẻ `<Trans>` cho nội dung có cấu trúc. Dữ liệu bản dịch được tập trung tại `locales/{lng}/{ns}.json`. Rất mạnh mẽ nhưng mọi tối ưu (chia nhỏ namespace, tải theo từng trang, an toàn kiểu dữ liệu) đều đòi hỏi bạn phải tự cấu hình và bảo trì thủ công.
- **Intlayer** - Mô hình nội dung lấy component làm trung tâm. Các tệp từ điển `.content.ts` nằm ngay cạnh component mà chúng phục vụ, trình biên dịch tại thời điểm build sẽ tự động thực hiện tree-shaking và lazy loading theo từng component và ngôn ngữ, tự động tạo kiểu TypeScript nghiêm ngặt từ nội dung và chặn quá trình build nếu thiếu bản dịch. Tích hợp sẵn middleware, bộ hỗ trợ SEO, Visual Editor / CMS và biên dịch hỗ trợ bởi AI.

| Thư viện                | Lượt gắn sao GitHub                                                                                                                                                                | Tổng số Commit                                                                                                                                                                         | Commit gần nhất                                                                                                                                         | Phiên bản đầu | Phiên bản NPM                                                                                                         | Lượt tải hàng tháng NPM                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Tháng 4/2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Tháng 1/2012  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Tháng 12/2015 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Tháng 11/2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Các huy hiệu cập nhật tự động. Số liệu thực tế có thể biến động theo thời gian.

## So sánh tính năng chi tiết

| Tính năng                                         | Intlayer (`react-intlayer` / `next-intlayer`)                                   | i18next (`react-i18next` / `next-i18next`)                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Bản dịch đặt ngay cạnh component**              | ✅ Có, tệp `.content.ts` đặt cùng thư mục với component                         | ❌ Không, tập trung ở `locales/{lng}/{ns}.json`                                      |
| **Tích hợp TypeScript**                           | ✅ Tự động tạo kiểu dữ liệu nghiêm ngặt từ nội dung                             | ⚠️ Cơ bản; các khóa nghiêm ngặt cần mở rộng `CustomTypeOptions` và gán kiểu thủ công |
| **Phát hiện bản dịch còn thiếu**                  | ✅ Báo lỗi TypeScript + lỗi/cảnh báo trong thời gian build                      | ⚠️ Fallback ở runtime (`saveMissing`, hiển thị lại chuỗi khóa)                       |
| **Nội dung đa dạng (JSX / Markdown / Component)** | ✅ Hỗ trợ trực tiếp tự nhiên                                                    | ⚠️ Sử dụng thẻ đánh chỉ mục `<Trans>`                                                |
| **Hỗ trợ định dạng ICU**                          | ⚠️ Đang hoàn thiện                                                              | ⚠️ Cần bổ sung plugin (`i18next-icu`)                                                |
| **Xử lý số nhiều (Pluralization)**                | ✅ Định dạng dựa trên liệt kê (Enum) tường minh                                 | ✅ Hậu tố `_one` / `_other` (dựa trên Intl.PluralRules)                              |
| **Định dạng (ngày, số, tiền tệ)**                 | ✅ `useNumber`, `useDate`, ... (tận dụng Intl gốc)                              | ⚠️ Sử dụng formatter nội suy hoặc gọi `Intl.*` thủ công                              |
| **Định tuyến bản địa hóa và middleware**          | ✅ Tích hợp sẵn proxy/middleware, `getMultilingualUrls`                         | ⚠️ Không có sẵn trong core; cần tự tạo middleware hoặc dùng thư viện ngoài           |
| **Bộ hỗ trợ SEO (hreflang, sitemap, robots)**     | ✅ Cung cấp đầy đủ                                                              | ❌ Phải thiết lập thủ công                                                           |
| **Component Server đồng bộ (RSC)**                | ✅ `useIntlayer` từ `next-intlayer/server` dùng được ở mọi Server Component con | ⚠️ Gọi `getFixedT` ở cấp page rồi truyền `t` qua Props xuống các component           |
| **Tree-shaking (chỉ đóng gói nội dung dùng)**     | ✅ Trình biên dịch tự động xử lý theo component và ngôn ngữ                     | ⚠️ Thủ công: chia namespace + liệt kê `ns` cho từng trang + cấu hình backend         |
| **Tải lười (Lazy loading)**                       | ✅ `importMode: 'dynamic'` (chỉ một dòng cấu hình)                              | ✅ Thông qua các plugin backend (`i18next-resources-to-backend`, v.v.)               |
| **Dọn dẹp nội dung thừa (Purge)**                 | ✅ Loại bỏ các từ điển không dùng đến khi build                                 | ❌ Không hỗ trợ mặc định                                                             |
| **Kiểm thử bản dịch còn thiếu (CLI / CI)**        | ✅ `npx intlayer content test`                                                  | ⚠️ Cần công cụ ngoài như `i18next-parser`                                            |
| **Biên dịch bằng AI**                             | ✅ Tích hợp sẵn, dùng API key của riêng bạn                                     | ❌ Không có (Locize là dịch vụ tính phí riêng)                                       |
| **Visual Editor / CMS**                           | ✅ Visual Editor miễn phí + CMS tùy chọn                                        | ❌ Không có (phụ thuộc vào Locize hoặc nền tảng ngoài)                               |
| **Máy chủ MCP & Kỹ năng Agent**                   | ✅ Hỗ trợ                                                                       | ❌ Không hỗ trợ                                                                      |
| **Hệ sinh thái & Cộng đồng**                      | ⚠️ Mới hơn nhưng tốc độ phát triển rất nhanh                                    | ✅ Lớn nhất và lâu đời nhất                                                          |

## Đo kiểm Benchmark

### Những gì đã được đo lường?

Bộ công cụ [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) xây dựng **cùng một ứng dụng giống hệt nhau** cho từng thư viện: **10 trang** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 ngôn ngữ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), cùng component và cùng nội dung văn bản. Dữ liệu được đo trên hai ngôn ngữ `en` và `fr`. Mỗi thư viện được đánh giá qua tối đa bốn **chiến lược tải**:

| Chiến lược         | Mô tả                                                                                    | Trường hợp sử dụng tiêu biểu                  |
| ------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------- |
| **static**         | Gom tất cả ngôn ngữ và trang vào một gói duy nhất (`resources` nhúng thẳng vào `init()`) | Làm bản thử nghiệm nhanh, code sinh bởi AI    |
| **dynamic**        | Chỉ tải ngôn ngữ hiện tại qua backend, nhưng tải toàn bộ các namespace cùng lúc          | Đa số các ứng dụng thông thường               |
| **scoped-static**  | Mỗi route một namespace riêng, nhưng đóng gói tất cả vào bundle ban đầu                  | Rất hiếm khi sử dụng                          |
| **scoped-dynamic** | Namespace theo route + tải lười qua backend. Chỉ tải trang hiện tại và ngôn ngữ hiện tại | Ứng dụng có giới hạn nghiêm ngặt về hiệu năng |

Intlayer không cần biến thể "scoped": Trình biên dịch tự động giới hạn phạm vi nội dung **ở mức độ từng component**, vì vậy hai dòng `static` và `dynamic` của Intlayer đã được tối ưu hóa sẵn.

Các chỉ số đo lường:

- **Lib size**: Dung lượng gzip của một component rỗng chỉ import thư viện i18n (chi phí cố định của runtime).
- **Page JS**: Dung lượng gzip JavaScript trung bình tải về mỗi trang (tính chung trên mọi trang và ngôn ngữ).
- **Locale leak %**: Tỷ lệ chuỗi dịch trong JS tải về thuộc về các ngôn ngữ mà người dùng **không** xem.
- **Page leak %**: Tỷ lệ chuỗi dịch trong JS tải về thuộc về các trang mà người dùng **không** mở.
- **Component avg**: Kích thước gzip trung bình của từng component khi được biên dịch cô lập.
- **E2E reactivity**: Thời gian thực tế tính từ khi người dùng chọn ngôn ngữ mới đến khi thẻ `html[lang]` trong DOM được cập nhật xong (Playwright, trung bình 5 lần lặp).
- **Hydration**: Thời gian thực hiện quá trình hydrate của React.

> Số liệu bên dưới được ghi nhận vào ngày **2026-09-12** với `next-i18next` 16.3.0, `react-i18next` 17.0.13 và `intlayer` 9.5.1. Ứng dụng kiểm thử được thiết kế gọn nhẹ, nên các tỷ lệ rò rỉ thể hiện **mô hình kiến trúc**: Rò rỉ sẽ tăng theo lượng văn bản thực tế, trong khi chi phí runtime giữ nguyên.

### Kết quả trên Next.js (`next-i18next`)

Chọn các chỉ số và thư viện bạn quan tâm:

<I18nBenchmark framework="nextjs" vertical/>

| Thư viện                               | Chiến lược     | Dung lượng Lib (gz) | JS TB mỗi trang (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | Kích thước TB Comp (gz) | Phản hồi E2E | Thời gian Hydrate |
| -------------------------------------- | -------------- | ------------------: | -------------------: | -------------: | ----------: | ----------------------: | -----------: | ----------------: |
| **base** (không i18n)                  | -              |              0.0 KB |             141.0 KB |           0.0% |        0.0% |                  0.9 KB |      13.4 ms |           11.8 ms |
| `next-i18next`                         | static         |             19.7 KB |             218.5 KB |           0.0% |       89.8% |                 78.5 KB |      16.4 ms |           15.6 ms |
| `next-i18next`                         | dynamic        |             19.7 KB |             169.5 KB |          50.0% |       89.8% |                 26.1 KB |      15.4 ms |           27.7 ms |
| `next-i18next`                         | scoped-static  |             19.7 KB |             220.1 KB |           0.0% |       89.8% |                 78.9 KB |      16.4 ms |           14.7 ms |
| `next-i18next`                         | scoped-dynamic |             19.7 KB |             163.4 KB |           0.0% |        0.0% |                 27.1 KB |      15.9 ms |           15.1 ms |
| **`next-intlayer`**                    | static         |          **5.5 KB** |         **141.3 KB** |       **0.0%** |    **0.0%** |              **8.5 KB** |  **15.5 ms** |           16.9 ms |
| **`next-intlayer`**                    | dynamic        |          **5.5 KB** |         **141.3 KB** |       **0.0%** |    **0.0%** |              **6.9 KB** |  **15.3 ms** |           15.9 ms |
| `@intlayer/next-i18next` (tương thích) | static         |              9.4 KB |             150.7 KB |           0.0% |        0.0% |                  9.7 KB |      10.7 ms |           11.3 ms |
| `@intlayer/next-i18next` (tương thích) | dynamic        |              9.4 KB |             150.7 KB |           0.0% |        0.0% |                  9.7 KB |      11.9 ms |           10.6 ms |

**Phân tích kết quả**

- **Gánh nặng runtime**: Phần lõi của `i18next` kết hợp cùng `react-i18next` là runtime nặng nhất được ghi nhận: chiếm **19.7 KB gzip** cho một component rỗng, so với chỉ 5.5 KB của `next-intlayer`.
- **Thiết lập cơ bản rất tốn kém**: Đặt `resources` trực tiếp vào `init()` tạo ra kích thước **218.5 KB mỗi trang** (+77.5 KB so với ứng dụng gốc không i18n). Từng trang bắt buộc phải tải về toàn bộ các namespace.
- **Tối ưu hóa thủ công đòi hỏi nhiều công sức**: Chuyển sang dùng backend (`dynamic`) giảm được 49 KB nhưng **vẫn rò rỉ 90% chuỗi thuộc các trang khác**, và một nửa chuỗi tải về thuộc ngôn ngữ không dùng đến. Phải bổ sung cấu hình chia nhỏ namespace cho từng route (`scoped-dynamic`) mới triệt tiêu được rò rỉ ở mức **163.4 KB**, nhưng vẫn **nặng hơn +22.4 KB mỗi trang** so với Intlayer (141.3 KB) vốn không cần cấu hình phức tạp.
- **Kích thước từng component**: Một component gọi `useTranslation()` được đóng gói trong khoảng 26 đến 79 KB; trong khi component tương đương dùng `useIntlayer()` chỉ nặng 6.9 KB.
- **Độ trễ khi hydrate**: Thời gian hydrate tăng vọt lên 27.7 ms ở cấu hình `dynamic` do thực thể i18next cần khởi tạo và nạp backend tại client trước khi React có thể hoàn tất quá trình hydrate.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ, từng thư viện và từng chiến lược, trong [báo cáo benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md).

### Kết quả trên TanStack Start (`react-i18next`)

Cùng ứng dụng kiểm thử trên nền tảng TanStack Start sử dụng trực tiếp `react-i18next` nhằm loại bỏ các yếu tố can thiệp riêng của Next.js:

| Thư viện              | Chiến lược     | Dung lượng Lib (gz) | JS TB mỗi trang (gz) | Rò rỉ ngôn ngữ | Rò rỉ trang | Kích thước TB Comp (gz) | Phản hồi E2E | Thời gian Hydrate |
| --------------------- | -------------- | ------------------: | -------------------: | -------------: | ----------: | ----------------------: | -----------: | ----------------: |
| **base** (không i18n) | -              |              0.0 KB |             111.0 KB |           0.0% |        0.0% |                  0.7 KB |       8.1 ms |           21.6 ms |
| `react-i18next`       | static         |             18.4 KB |             180.3 KB |          50.0% |       89.8% |                 24.3 KB |      12.9 ms |           85.1 ms |
| `react-i18next`       | dynamic        |             18.4 KB |             136.4 KB |          23.1% |       89.8% |                 24.8 KB |     123.1 ms |           32.9 ms |
| `react-i18next`       | scoped-static  |             18.4 KB |             184.2 KB |          50.7% |       89.8% |                 25.3 KB |     185.1 ms |           25.2 ms |
| `react-i18next`       | scoped-dynamic |             18.4 KB |             127.2 KB |           0.0% |        0.0% |                 26.7 KB |      17.6 ms |           11.3 ms |
| **`intlayer`**        | static         |          **5.0 KB** |         **125.8 KB** |          50.0% |    **0.0%** |              **8.1 KB** |   **3.2 ms** |           11.5 ms |
| **`intlayer`**        | dynamic        |          **5.0 KB** |         **118.6 KB** |       **0.0%** |    **0.0%** |              **6.3 KB** |   **3.6 ms** |           14.1 ms |

**Phân tích kết quả**

- Ứng dụng `react-i18next` cơ bản tải về **nhiều hơn +69 KB mỗi trang** so với bản không có i18n, và quá trình hydrate kéo dài tới **85 ms** (gấp 4 lần chuẩn) do toàn bộ cây dữ liệu dịch thuật phải được xử lý và đăng ký trên client trước lần render đầu tiên.
- **Độ trễ mạng khi đổi ngôn ngữ**: Khi nạp tài nguyên theo yêu cầu qua backend, việc chuyển đổi ngôn ngữ phải chờ phản hồi mạng trước khi thẻ `html[lang]` kịp cập nhật: **123 ms** ở `dynamic` và **185 ms** ở `scoped-static`. Trong khi đó, Intlayer cập nhật DOM chỉ trong **3-4 ms** ở cả hai chế độ mà không bao giờ bị nghẽn mạng.
- Cấu hình tối ưu cao `scoped-dynamic` đạt mức 127.2 KB, vẫn **nặng hơn +8.6 KB** so với cấu hình `dynamic` của Intlayer, dù đã phải tốn rất nhiều công sức tạo ánh xạ route-namespace, backend và các biên Suspense.
- Chế độ `static` của Intlayer đã mặc định đạt **0% rò rỉ trang** vì nó chỉ đóng gói các từ điển được import bởi component của trang đó. Bật `importMode: 'dynamic'` sẽ triệt tiêu hoàn toàn rò rỉ ngôn ngữ.
- **Kích thước component**: 24-27 KB ở `react-i18next` so với 6-8 KB ở Intlayer. `useTranslation()` luôn gắn chặt từng component với instance i18next toàn cục.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Bảng đầy đủ trong [báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md).

## Nguyên nhân của sự chênh lệch: Global Instance vs Từ điển biên dịch

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` được xây dựng từ năm 2012 theo hướng runtime: một instance toàn cục nắm giữ kho tài nguyên, các plugin mở rộng nó và hàm `t()` tìm khóa khi render. Thiết kế này đem lại tính linh hoạt cao nhưng tạo ra gánh nặng lớn về dung lượng:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # phải tự biết rằng trang này cần ["common", "about"]
```

Instance toàn cục không thể biết trước component sẽ gọi những khóa nào; vì vậy nó buộc phải lưu trữ toàn bộ các namespace được chỉ định nạp. Muốn tối ưu, **bạn** phải chia nhỏ danh mục, **bạn** phải liệt kê các namespace cần thiết cho từng trang, và **bạn** phải duy trì danh sách này khi component di chuyển.

Chi phí gia tăng đồng thời trên hai trục, trang và ngôn ngữ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Đúng như [ghi chú benchmark](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) đã chỉ ra: "Vừa duy trì an toàn kiểu dữ liệu vừa quản lý đúng namespace cho từng trang thực sự là một cơn ác mộng".

Intlayer loại bỏ hoàn toàn instance toàn cục. Nội dung được khai báo ngay cạnh component và trình biên dịch sẽ giải quyết cây phụ thuộc vào lúc build:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` biết chính xác component nào cần từ điển nào, chỉ đóng gói đúng phần đó cho ngôn ngữ đang kích hoạt và loại bỏ nội dung thừa. Mô hình "scoped-dynamic" trở thành kết quả mặc định của quá trình build mà nhóm phát triển không phải bận tâm quản lý thủ công.

> Để đạt được các thông số của dòng `dynamic`, bạn chỉ cần khai báo `dictionary.importMode: 'dynamic'` trong `intlayer.config.ts`. Chi tiết xem thêm tại [tài liệu tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

## Trải nghiệm lập trình viên (DX)

### Khởi tạo cấu hình

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Bên cạnh đó, bạn phải viết thêm `I18nProvider` ở phía client, khai báo `generateStaticParams` và quản lý mảng `namespaces` trên từng trang.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Component phía Client

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> Trang hiển thị component này bắt buộc phải nạp namespace `about`, và `t("counter.label")` sẽ chỉ là chuỗi thông thường nếu chưa mở rộng `CustomTypeOptions`.

</Tab>
<Tab label="Intlayer" value="intlayer">

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label` và `increment` đều được kiểm tra kiểu dữ liệu nghiêm ngặt; gõ sai tên sẽ báo lỗi TypeScript ngay lập tức, và nếu thiếu bản dịch tiếng Pháp thì quá trình build sẽ bị dừng lại.

</Tab>
</Tabs>

### Component phía Server đồng bộ

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Trang cha phải gọi `i18n.getFixedT(locale, "about")` rồi truyền `t` và `locale` xuống dưới dạng props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Giữ nguyên API của i18next, nhận ngay hiệu năng của Intlayer

Bạn không cần phải viết lại toàn bộ component để đạt được kết quả benchmark trên. `@intlayer/i18next`, `@intlayer/react-i18next` và `@intlayer/next-i18next` đóng vai trò là các adapter tương thích trực tiếp: các lệnh gọi `useTranslation`, `t()`, `<Trans>`, xử lý số nhiều và ngữ cảnh vẫn hoạt động bình thường, được vận hành bởi các từ điển do trình biên dịch Intlayer cung cấp.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

Trong bài đo kiểm, bản build tương thích của cùng ứng dụng Next.js đã giảm từ **218.5 KB xuống 150.7 KB** mỗi trang, từ **78.5 KB xuống 9.7 KB** mỗi component, tỷ lệ rò rỉ giảm từ **~90% về 0%**, và thời gian hydrate rút ngắn từ 15.6 ms xuống 11.3 ms mà không cần sửa bất kỳ dòng mã nghiệp vụ nào. Các tệp `locales/{lng}/{ns}.json` hiện tại vẫn có thể được giữ làm nguồn dữ liệu chính thông qua plugin đồng bộ JSON.

Xem hướng dẫn chuyển đổi: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-i18next_to_intlayer.md).

## Khi nào nên chọn giải pháp nào?

<AccordionGroup>
<Accordion header="Chọn i18next">

Nếu bạn phụ thuộc chặt chẽ vào hệ sinh thái plugin (bộ nhận diện đặc thù, backend chuyên biệt, ICU, Locize), cần bản địa hóa ở cả ngoài React (Node services, vanilla JS, các framework khác), đội ngũ của bạn đã rất thành thạo, hoặc nền tảng dịch thuật bắt buộc định dạng `locales/{lng}/{ns}.json`. Hãy dành thời gian để quản lý namespace và bản đồ route nếu hiệu năng là ưu tiên hàng đầu.

</Accordion>
<Accordion header="Chọn Intlayer">

Bạn mong muốn **nội dung theo phạm vi component**, **TypeScript nghiêm ngặt**, **phát hiện thiếu khóa trong thời gian build**, **tree-shaking và lazy loading không tốn công sức**, chuyển đổi ngôn ngữ tức thì, server component đồng bộ và các công cụ biên tập tích hợp sẵn ([Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), [dịch thuật AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md), [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)). Đặc biệt phù hợp cho các codebase dạng module quy mô lớn và design system.

</Accordion>
<Accordion header="Chọn adapter @intlayer/*-i18next">

Bạn đã sử dụng i18next và muốn tối ưu dung lượng bundle cùng độ phản hồi mà không cần viết lại component. Các tệp `locales/{lng}/{ns}.json` hiện tại vẫn là nguồn chân lý duy nhất. Được đo lường song song trong [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ (Câu hỏi thường gặp)

<FAQ>

<Question title="Tại sao i18next lại nặng hơn nhiều so với các thư viện khác?">

Nó được thiết kế như một runtime độc lập với framework: một global instance, một pipeline plugin, một kho lưu trữ tài nguyên, một bộ phân giải khóa. Sự linh hoạt đó được biên dịch vào từng bundle. Một component rỗng chỉ import thư viện đã tốn **19.7 KB gzip** với `next-i18next` so với **5.5 KB** của `next-intlayer`, và chi phí đó phải trả trên mọi trang bất kể nội dung của bạn nặng bao nhiêu.

</Question>

<Question title="Lazy loading với backend có giải quyết được vấn đề không?">

Nó giảm dung lượng byte, nhưng không giải quyết được độ trễ. Chuyển sang `i18next-resources-to-backend` tiết kiệm ~49 KB mỗi trang nhưng lại thêm một round-trip mạng khi chuyển đổi ngôn ngữ: **123 ms** trong cấu hình `dynamic` và **185 ms** trong `scoped-static`, so với **3-4 ms** của Intlayer. Thời gian hydration cũng tăng lên 27.7 ms vì instance phải phân giải backend trước khi React có thể hydrate.

</Question>

<Question title="Tôi có thể đạt 0% rò rỉ nội dung với i18next không?">

Có, với `scoped-dynamic`: một namespace cho mỗi route, một backend tài nguyên và một bảng ánh xạ trang - namespace bạn tự quản lý thủ công. Kích thước trang đạt 163.4 KB trên Next.js, vẫn cao hơn **+22 KB** so với 141.3 KB của Intlayer vốn không cần bất kỳ cấu hình nào. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

</Question>

<Question title="Tôi có phải viết lại các component để di chuyển không?">

Không. `@intlayer/i18next`, `@intlayer/react-i18next` và `@intlayer/next-i18next` giữ nguyên `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, các dạng số nhiều `_one` / `_other`, hậu tố ngữ cảnh và `returnObjects`. Chỉ một dòng plugin trong `next.config.ts` hoặc `vite.config.ts`. Chi tiết từng bước trong [hướng dẫn di chuyển next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Điều gì xảy ra với các plugin i18next của tôi?">

Các backend và plugin phát hiện ngôn ngữ vẫn được chấp nhận nhưng ở trạng thái bất hoạt: không còn gì để tải hoặc phát hiện trong thời gian chạy. Việc phát hiện ngôn ngữ trở thành cấu hình định tuyến của Intlayer (tiền tố URL, cookie, header). Nếu ứng dụng của bạn lấy bản dịch từ CMS tại thời điểm yêu cầu, hãy sử dụng [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) hoặc lệnh `intlayer pull` / `push` thay thế.

</Question>

</FAQ>

## Các bài so sánh liên quan

Cùng benchmark, các thư viện khác:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/react-i18next_vs_react-intl_vs_intlayer.md)

Tìm hiểu sâu hơn về i18next:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18next_vs_intlayer-i18next.md), đo lường adapter trên cùng một ứng dụng
- [i18next có bị lỗi thời không?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_i18next_outdated.md)
- [Sử dụng Intlayer với i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/intlayer_with_i18next.md) và [với react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/intlayer_with_react-i18next.md)
- [Cách quốc tế hóa ứng dụng Next.js với next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-i18next.md)

Tài liệu tham khảo:

- [Báo cáo benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/nextjs.md) và [báo cáo benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)
- Adapter tương thích: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/next-i18next.md)
- Hướng dẫn di chuyển: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-i18next_to_intlayer.md)
- [Tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [trình biên dịch Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)
- [i18n theo component vs i18n tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [i18n dựa trên compiler vs khai báo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)

## Lượt gắn sao trên GitHub

Lượt sao GitHub là thước đo tin cậy về mức độ phổ biến, niềm tin của cộng đồng và tiềm năng phát triển lâu dài. Dù không phản ánh trực tiếp chất lượng mã nguồn, nó cho thấy sự quan tâm và xu hướng đón nhận của cộng đồng phát triển phần mềm.

[![Biểu đồ lịch sử sao](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Kết luận

`i18next` hoàn toàn xứng đáng với vị thế của mình: hoạt động ở mọi môi trường, có plugin cho mọi bài toán và được duy trì ổn định hơn một thập kỷ qua. Tuy nhiên, benchmark này phản ánh chi phí của kiến trúc phụ thuộc vào runtime. Cách thiết lập thông thường làm tăng thêm **+70-77 KB gzip mỗi trang**, **rò rỉ ~90% dữ liệu của các trang khác**, và mất **hơn 100 ms** để đổi ngôn ngữ khi dùng lazy load. Dù có thể triệt tiêu rò rỉ nhưng đòi hỏi quản lý thủ công phức tạp và vẫn **nặng hơn Intlayer từ 9-22 KB**.

Intlayer chuyển toàn bộ gánh nặng này sang trình biên dịch. Từ điển theo component, tải lười theo ngôn ngữ và loại bỏ nội dung thừa đều là kết quả tự động của quá trình build. Trên cùng một ứng dụng: **Chỉ tăng +0.3 KB mỗi trang**, **0% rò rỉ**, component **nhỏ hơn 3-10 lần** và đổi ngôn ngữ chỉ mất **3-4 ms**.

Toàn bộ dữ liệu thô, ứng dụng mẫu và kịch bản thử nghiệm đều công khai tại [kho lưu trữ Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Bạn hoàn toàn có thể tự mình kiểm chứng.

Tìm hiểu thêm tại tài liệu ['Tại sao chọn Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).
