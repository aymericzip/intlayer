---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: kiểm tra i18n và SEO của website"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Phát hiện chiến lược định tuyến và ngăn xếp i18n (thư viện, TMS); thêm kiểm tra tính tương hỗ hreflang, og:locale và bộ chuyển đổi ngôn ngữ; theo dõi sitemap từ robots.txt, chỉ mục sitemap và sitemap nén gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Thêm cờ `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Thêm nội dung lệnh scan"
author: aymericzip
---

# Quét trang web

Lệnh `scan` tìm nạp một URL công khai, đo lường tổng kích thước trang và kiểm toán sức khỏe i18n cũng như SEO của trang. Nó tạo ra một báo cáo tính điểm (0–100) bao gồm các thuộc tính HTML, các liên kết chuẩn (canonical), thẻ hreflang và các liên kết trả về của chúng, robots.txt, sitemap, các liên kết nội bộ được bản địa hóa và dung lượng ngôn ngữ của gói JavaScript.

Lệnh này cũng báo cáo cách trang web mã hóa locale trong URL (chiến lược định tuyến) và framework, thư viện i18n, hệ thống quản lý dịch thuật (TMS) hoặc proxy dịch thuật nào đang được sử dụng. Các kiểm tra tương tự cũng vận hành [công cụ quét SEO i18n trực tuyến](https://intlayer.org/i18n-seo-scanner) và tiện ích mở rộng Chrome của Intlayer.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: Thư mục gốc dùng để xác định vị trí của tệp `intlayer.config.*`.
- **`-e, --env`**: Môi trường đích (ví dụ: `development`, `production`).
- **`--env-file`**: Đường dẫn đến tệp `.env` tùy chỉnh.
- **`--no-cache`**: Tắt bộ nhớ đệm cấu hình.
- **`--ci`**: Chạy lệnh trong mọi dự án Intlayer của monorepo (hoặc chỉ dự án hiện tại khi chạy từ thư mục dự án). Thông tin xác thực theo từng dự án có thể được đưa vào qua `INTLAYER_PROJECT_CREDENTIALS`, một đối tượng JSON ánh xạ đường dẫn dự án tới `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Bật ghi nhật ký chi tiết (mặc định trong chế độ CLI).
- **`--prefix`**: Tiền tố nhật ký tùy chỉnh.

## Chiến lược định tuyến

Mẫu locale được chia sẻ bởi các liên kết thay thế hreflang của trang tiết lộ cách trang web định tuyến các locale của nó. Nếu không có các liên kết thay thế, chỉ có URL được quét được sử dụng (độ tin cậy thấp).

| Chiến lược          | Ví dụ                                   |
| ------------------- | --------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                |
| `prefix-no-default` | `/about` (locale mặc định), `/fr/about` |
| `search-params`     | `/about?lang=fr`                        |
| `subdomain`         | `fr.example.com`                        |
| `domain`            | `example.fr`, `example.de`              |
| `no-prefix`         | Một URL cho mọi locale (cookie)         |

Kiểm tra liên kết, canonical, robots.txt và sitemap sẽ đọc từng URL thông qua chiến lược này. Ví dụ, một liên kết không có tiền tố là chính xác trên locale mặc định của trang web `prefix-no-default`, và một liên kết không có `?lang=` sẽ rời khỏi locale trên trang web `search-params`.

## Ngăn xếp được phát hiện

Các framework, thư viện i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), hệ thống quản lý dịch thuật (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) và proxy dịch thuật (Weglot, Localize, GTranslate…) được nhận diện từ HTML, tài nguyên đã tải và các gói JavaScript. Chế độ quét sâu cũng đọc các biến toàn cục window và cookie.

## Những gì được kiểm tra

| Kiểm tra                        | Mô tả                                                                                                | Trọng số điểm |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| `html lang`                     | `<html lang>` xuất hiện và là một thẻ BCP 47 hợp lệ                                                  | 9             |
| `html dir`                      | `dir="rtl"` được thiết lập cho các ngôn ngữ viết từ phải sang trái (`ltr` là mặc định)               | 3             |
| `locale signals consistent`     | `<html lang>`, locale của URL và mục hreflang tự tham chiếu đồng nhất với nhau                       | 5             |
| `og:locale`                     | `og:locale` được thiết lập và khớp với `<html lang>`                                                 | 3             |
| `canonical`                     | Liên kết canonical tồn tại và không trỏ đến một phiên bản ngôn ngữ khác                              | 10            |
| `hreflang`                      | Các thẻ hreflang tồn tại, có mã hợp lệ, URL tuyệt đối, không trùng lặp và có tự tham chiếu           | 9             |
| `x-default hreflang`            | Có sự tồn tại của hreflang thay thế `x-default`                                                      | 7             |
| `hreflang alternates link back` | Các trang thay thế trả về mã 200, không bị chuyển hướng, liên kết ngược trở lại và khai báo ngôn ngữ | 8             |
| `localized links`               | Các liên kết nội bộ trỏ tới locale của trang                                                         | 8             |
| `all links keep the locale`     | Không có liên kết nội bộ nào chuyển đổi hoặc làm mất locale                                          | 6             |
| `language switcher`             | Tồn tại các liên kết `<a href>` có thể thu thập dữ liệu dẫn đến các phiên bản ngôn ngữ khác          | 6             |
| `robots.txt present`            | Đường dẫn `/robots.txt` trả về phản hồi 200                                                          | 10            |
| `robots.txt localized URLs`     | Cả trang web lẫn các URL đã bản địa hóa đều không bị chặn đối với Googlebot                          | 8             |
| `sitemap present`               | Tìm thấy sitemap (chỉ thị robots.txt `Sitemap:`, `/sitemap.xml`, `/sitemap_index.xml`)               | 10            |
| `sitemap locale coverage`       | Mọi locale đều được liệt kê, và các mục có liên kết thay thế tự liệt kê chính nó                     | 9             |
| `sitemap alternates`            | Sơ đồ trang web chứa các liên kết thay thế `hreflang`                                                | 8             |
| `sitemap x-default`             | Sơ đồ trang web chứa hreflang `x-default`                                                            | 7             |
| `unused bundle content`         | Gói JS chính không chứa bản dịch thừa của các locale khác                                            | 8             |

Cảnh báo nhận được một nửa trọng số điểm. Điểm số cuối cùng là tổng trọng số của các kiểm tra đã chạy được biểu thị dưới dạng phần trăm (0–100). Các kiểm tra không đạt sẽ in ra những vấn đề đầu tiên được tìm thấy; sử dụng `--json` để xem đầy đủ chi tiết.

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
