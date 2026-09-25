---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Bộ Điều Hợp Tương Thích Intlayer"
description: "Di chuyển giải pháp i18n hiện có của bạn sang Intlayer một cách dễ dàng bằng các bộ điều hợp tương thích."
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Bộ Điều Hợp Tương Thích Intlayer

Việc di chuyển một ứng dụng lớn sang thư viện quốc tế hóa mới có thể là một thách thức lớn. Để giảm bớt quá trình chuyển đổi này, Intlayer cung cấp **các bộ điều hợp tương thích** cho các thư viện i18n phổ biến nhất trong hệ sinh thái.

Các gói điều hợp này cung cấp **chính xác cùng một API công khai** như các thư viện i18n hiện có của bạn, nhưng ủy thác toàn bộ công việc dịch thuật cho Intlayer tại thời điểm chạy.

## Cách hoạt động

Khi bạn sử dụng một bộ điều hợp tương thích, bạn không cần phải viết lại các lệnh import trong ứng dụng hoặc thay đổi cách bạn sử dụng các hook và component dịch thuật. Thay vào đó, các plugin bundler của Intlayer tự động tạo bí danh cho các import hiện có của bạn sang các gói tương thích Intlayer.

Ví dụ, một nhà phát triển thay thế `import { useTranslation } from 'react-i18next'` bằng `import { useTranslation } from '@intlayer/react-i18next'` (được thực hiện tự động thông qua plugin bundler), và ứng dụng tiếp tục hoạt động với các bản dịch nay được cung cấp từ từ điển Intlayer. Các key cũng được đánh kiểu dựa trên từ điển Intlayer của bạn!

## Các Bộ Điều Hợp Tương Thích Có Sẵn

Chọn thư viện hiện có của bạn bên dưới để xem cách di chuyển một cách liền mạch:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
