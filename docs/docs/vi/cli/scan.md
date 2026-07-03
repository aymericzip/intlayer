---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Quét trang web
description: Tìm hiểu cách sử dụng lệnh scan của Intlayer CLI để đo lường kích thước trang và kiểm toán sức khỏe i18n/SEO của bất kỳ trang web nào.
keywords:
  - Quét
  - SEO
  - i18n
  - Kiểm toán
  - CLI
  - Intlayer
  - Kích thước trang
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.0.0
    date: 2026-06-11
    changes: "Thêm nội dung lệnh scan"
author: aymericzip
---

# Quét trang web

Lệnh `scan` tìm nạp một URL công khai, đo lường tổng kích thước trang và kiểm toán sức khỏe i18n cũng như SEO của trang. Nó tạo ra một báo cáo tính điểm (0–100) bao gồm các thuộc tính HTML, các liên kết chuẩn (canonical), thẻ hreflang, robots.txt, sitemap.xml, các liên kết nội bộ được bản địa hóa và dung lượng ngôn ngữ của gói JavaScript.

Không yêu cầu thêm bất kỳ phụ thuộc nào. Khi [puppeteer](https://pptr.dev/) được cài đặt, quá trình quét có thể chụp các phân đoạn JavaScript tải chậm (lazy-loaded) để phân tích gói mã nguồn chính xác hơn; nếu không, nó sẽ quay lại kiểm tra các tập lệnh tải trực tiếp được khai báo trong HTML.

## Cách sử dụng

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Ví dụ

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Kết quả mẫu:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Tùy chọn

### `<url>` (bắt buộc)

URL đầy đủ và hợp lệ để quét (ví dụ: `https://example.com`).

### `--no-deep`

Tắt quét sâu dựa trên kết xuất giao diện (rendering).

Theo mặc định, lệnh cố gắng sử dụng [puppeteer](https://pptr.dev/) để kết xuất trang trong một trình duyệt không giao diện (headless browser), chụp các phân đoạn JavaScript tải chậm và đo kích thước truyền tải dây mạng thực tế. Nếu không cài đặt puppeteer, lệnh sẽ tự động chuyển về chế độ cơ bản.

Truyền `--no-deep` để buộc sử dụng chế độ cơ bản ngay cả khi có sẵn puppeteer.

> Ví dụ: `npx intlayer scan https://example.com --no-deep`

### `--json`

Xuất toàn bộ kết quả quét dưới dạng đối tượng JSON thay vì báo cáo được định dạng sẵn. Hữu ích cho việc sử dụng theo chương trình hoặc luồng CI.

> Ví dụ: `npx intlayer scan https://example.com --json`

### Tùy chọn cấu hình tiêu chuẩn

- **`--base-dir`** — Thư mục gốc dùng để xác định vị trí của tệp `intlayer.config.*`.
- **`-e, --env`** — Môi trường đích (ví dụ: `development`, `production`).
- **`--env-file`** — Đường dẫn đến tệp `.env` tùy chỉnh.
- **`--no-cache`** — Tắt bộ nhớ đệm cấu hình.
- **`--verbose`** — Bật ghi nhật ký chi tiết (mặc định trong chế độ CLI).
- **`--prefix`** — Tiền tố nhật ký tùy chỉnh.

## Những gì được kiểm tra

| Kiểm tra                  | Mô tả                                                                     | Trọng số điểm |
| ------------------------- | ------------------------------------------------------------------------- | ------------- |
| `html lang`               | Thuộc tính `<html lang="…">` có xuất hiện                                 | 9             |
| `html dir`                | Thuộc tính `<html dir="…">` có xuất hiện                                  | 3             |
| `canonical`               | Thẻ `<link rel="canonical">` có xuất hiện                                 | 10            |
| `hreflang`                | Các thẻ `<link rel="alternate" hreflang="…">` có xuất hiện                | 9             |
| `x-default hreflang`      | Có sự tồn tại của hreflang thay thế `x-default`                           | 7             |
| `localized links`         | Ít nhất một liên kết nội bộ bao gồm phân đoạn ngôn ngữ                    | 5             |
| `all links localized`     | Mỗi liên kết nội bộ đều bao gồm phân đoạn ngôn ngữ                        | 5             |
| `current locale`          | Có thể phát hiện được ngôn ngữ của trang                                  | 3             |
| `robots.txt present`      | Đường dẫn `/robots.txt` trả về phản hồi 200                               | 10            |
| `robots.txt locale paths` | Không có đường dẫn ngôn ngữ nào bị chặn trong robots.txt                  | 10            |
| `sitemap.xml present`     | Đường dẫn `/sitemap.xml` trả về phản hồi 200                              | 10            |
| `sitemap locale coverage` | Mọi ngôn ngữ được phát hiện đều xuất hiện trong sơ đồ trang web (sitemap) | 10            |
| `sitemap alternates`      | Sơ đồ trang web chứa các liên kết thay thế `hreflang`                     | 5             |
| `sitemap x-default`       | Sơ đồ trang web chứa hreflang `x-default`                                 | 5             |
| `unused bundle content`   | Gói JS không mang theo quá nhiều dữ liệu ngôn ngữ không sử dụng           | 9             |

Điểm số cuối cùng là tổng trọng số của tất cả các bài kiểm tra đạt yêu cầu, được biểu thị dưới dạng phần trăm (0–100).

## Sử dụng hàm quét theo chương trình

Hàm `scan` cũng được xuất bản từ gói `@intlayer/cli` để bạn có thể gọi từ các tập lệnh của riêng mình:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Để truy cập ở cấp độ thấp hơn, `scanWebsite` từ `@intlayer/engine/scan` sẽ trả về một đối tượng `ScanResult` có cấu trúc:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
