---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Tiện ích mở rộng Chrome & Firefox, Trình quét i18n & SEO
description: Kiểm tra cấu hình i18n của bất kỳ trang web nào bằng tiện ích mở rộng Intlayer cho Chrome. Phát hiện framework, thư viện i18n, ngôn ngữ, thẻ hreflang và SEO, đồng thời chạy kiểm tra toàn diện i18n SEO.
keywords:
  - Tiện ích mở rộng Chrome
  - Trình quét i18n
  - Kiểm tra hreflang
  - SEO đa ngôn ngữ
  - Intlayer
  - Bản địa hóa
  - Công cụ phát triển
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tiện ích mở rộng Chrome & Firefox: Trình quét i18n & SEO

## Tổng quan

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) là tiện ích mở rộng Chrome chính thức dành cho **Intlayer**. Mở tiện ích trên bất kỳ trang web nào để xem cách trang web đó xử lý quốc tế hóa: sử dụng framework và thư viện i18n nào, hỗ trợ những ngôn ngữ (locales) nào và liệu các thẻ SEO đa ngôn ngữ đã được thiết lập chính xác hay chưa.

Tiện ích hoạt động trên mọi trang web, cho dù trang web đó có sử dụng Intlayer hay không.

![Tiện ích mở rộng Intlayer cho Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Liên kết tiện ích Chrome](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Liên kết tiện ích Firefox](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## Tính năng

- **Phát hiện công nghệ**: nhận diện framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) và thư viện i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Mỗi phát hiện sẽ hiển thị bằng chứng kích hoạt nó, chẳng hạn như biến toàn cục (global variable), cookie hoặc dấu hiệu DOM.
- **Ngôn ngữ (Locales)**: liệt kê các ngôn ngữ được tìm thấy trong thuộc tính `lang`, thẻ hreflang và `og:locale`, tiền tố ngôn ngữ trên URL, cùng với cookie hoặc mục lưu trữ ngôn ngữ.
- **Thẻ SEO i18n**: kiểm tra `html lang`, `html dir`, liên kết chuẩn (canonical), thẻ hreflang, `x-default`, `og:locale` và tỷ lệ các liên kết nội bộ được bản địa hóa.
- **Điều hướng giữa các locale**: chuyển trang hiện tại sang bất kỳ phiên bản bản địa hóa nào chỉ với một cú nhấp, dựa trên các thẻ hreflang.
- **Tìm kiếm trong sitemap**: tìm kiếm mọi trang được liệt kê trong sitemap của trang web và mở trang đó trong tab hiện tại.
- **Kiểm tra toàn diện**: chạy cùng một quy trình kiểm tra như [Trình quét SEO i18n](https://intlayer.org/i18n-seo-scanner) và hiển thị điểm số trực tiếp.

## Cài đặt

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

Cài đặt [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) từ Chrome Web Store, sau đó ghim tiện ích vào thanh công cụ của bạn.

Tiện ích mở rộng hoạt động trên Chrome và bất kỳ trình duyệt dựa trên Chromium nào hỗ trợ các tiện ích mở rộng của Chrome Web Store (Edge, Brave, Arc, Opera).

  </Tab>
  <Tab label="Firefox" value="firefox">

Cài đặt [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) từ Firefox Add-ons, sau đó ghim tiện ích vào thanh công cụ của bạn.

  </Tab>
</Tabs>

## Sử dụng

### Kiểm tra một trang

1. Mở trang web bạn muốn kiểm tra.
2. Nhấp vào biểu tượng **Intlayer i18n Scanner** trên thanh công cụ.
3. Cửa sổ bật lên sẽ hiển thị các phần **Công nghệ được phát hiện**, **Ngôn ngữ** và **Thẻ SEO i18n** cho trang hiện tại.

Quá trình phát hiện chạy cục bộ trong trình duyệt của bạn và chỉ trên tab hiện tại.

### Điều hướng giữa các locale

![Điều hướng của tiện ích mở rộng Intlayer cho Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

Phần **Điều hướng** liệt kê các **Phiên bản bản địa hóa** của trang hiện tại, được đọc từ các thẻ hreflang của trang. Nhấp vào một locale để mở phiên bản đó trong tab hiện tại.

Trong **Các trang trong sitemap**, nhập để tìm kiếm các URL trong sitemap của trang web, rồi nhấp vào một kết quả để mở.

### Chạy kiểm tra toàn diện

![Điểm kiểm tra của tiện ích mở rộng Intlayer cho Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Cuộn xuống phần **Kiểm tra toàn diện** và nhấp vào **Chạy kiểm tra i18n toàn diện**. Kết quả sẽ hiển thị ngay khi từng mục kiểm tra hoàn tất, được nhóm thành:

- **Trang**: thuộc tính `html lang` và `dir`, ngôn ngữ hiện tại, thẻ hreflang, `x-default`, liên kết canonical, liên kết nội bộ được bản địa hóa, bộ chọn ngôn ngữ, biểu tượng cờ và nội dung ngôn ngữ không sử dụng được đính kèm trong bundle JavaScript.
- **Robots.txt**: sự hiện diện và kiểm tra xem các đường dẫn ngôn ngữ có thể thu thập dữ liệu (crawlable) hay không.
- **Sitemap**: sự hiện diện, danh sách từng ngôn ngữ, liên kết thay thế và `x-default`.
- **Tên miền**: số lượng ngôn ngữ được phát hiện trên toàn bộ trang web.

Mỗi mục kiểm tra được đánh dấu là đạt, cảnh báo hoặc không đạt, và điểm số sẽ tóm tắt tình trạng SEO i18n tổng thể của trang.

## Quyền riêng tư và cấp phép

Tiện ích mở rộng chỉ yêu cầu các quyền tối thiểu:

- **activeTab** và **scripting**: bộ phát hiện chỉ chạy trên tab bạn đang xem và chỉ khi bạn mở cửa sổ bật lên.
- **back.intlayer.org**: chỉ được sử dụng khi bạn chạy kiểm tra toàn diện. URL của trang hiện tại sẽ được gửi đến Intlayer API để quét.

Không có lịch sử duyệt web nào được thu thập và không có gì chạy ngầm.

## Câu hỏi thường gặp

<FAQ>

<Question title="Trang web có cần phải sử dụng Intlayer không?">

Không. Tiện ích có thể kiểm tra bất kỳ trang web nào, bất kể trang đó sử dụng framework hay thư viện i18n nào.

</Question>
<Question title="Tại sao một công nghệ không được phát hiện?">

Việc phát hiện dựa trên những gì trang web hiển thị trong trình duyệt: biến toàn cục, cookie, thẻ meta và dấu hiệu DOM. Một số bản build production sẽ loại bỏ các dấu hiệu này, vì vậy một thư viện có thể đang được sử dụng mà không để lại dấu vết rõ ràng.

</Question>
<Question title="Làm cách nào để khắc phục các vấn đề phát hiện bởi kiểm tra?">

Hầu hết các mục kiểm tra đều tương ứng với cấu hình định tuyến hoặc siêu dữ liệu. Với Intlayer, hreflang, canonical, `x-default`, liên kết bản địa hóa, sitemap và robots.txt được tạo tự động từ [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của bạn. Xem hướng dẫn tích hợp cho framework của bạn, ví dụ: [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md) hoặc [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Công cụ liên quan

- [Tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- [Máy chủ MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)
- [Máy chủ LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)
