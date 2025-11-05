---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: So sánh next-i18next với next-intl và Intlayer cho việc quốc tế hóa (i18n) của ứng dụng Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Quốc tế hóa
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Quốc tế hóa Next.js (i18n)

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Hãy cùng xem xét những điểm tương đồng và khác biệt giữa ba lựa chọn i18n cho Next.js: next-i18next, next-intl và Intlayer.

Đây không phải là một hướng dẫn đầy đủ. Đây là một so sánh giúp bạn lựa chọn.

Chúng tôi tập trung vào **Next.js 13+ App Router** (với **React Server Components**) và đánh giá:

<TOC/>

> **tóm tắt**: Cả ba đều có thể địa phương hóa một ứng dụng Next.js. Nếu bạn muốn **nội dung theo phạm vi component**, **kiểu TypeScript nghiêm ngặt**, **kiểm tra khóa thiếu trong thời gian build**, **từ điển được tree-shaking**, và **App Router + trợ giúp SEO hàng đầu**, thì **Intlayer** là lựa chọn toàn diện và hiện đại nhất.

> Một sự nhầm lẫn thường gặp của các nhà phát triển là nghĩ rằng `next-intl` là phiên bản Next.js của `react-intl`. Không phải vậy, `next-intl` được duy trì bởi [Amann](https://github.com/amannn), trong khi `react-intl` được duy trì bởi [FormatJS](https://github.com/formatjs/formatjs).

---

## Tóm tắt ngắn gọn

- **next-intl** - Định dạng thông điệp nhẹ, đơn giản với hỗ trợ Next.js vững chắc. Các catalog tập trung là phổ biến; trải nghiệm nhà phát triển (DX) đơn giản, nhưng an toàn và bảo trì quy mô lớn phần lớn vẫn là trách nhiệm của bạn.
- **next-i18next** - i18next trong bộ dạng Next.js. Hệ sinh thái trưởng thành và các tính năng qua plugin (ví dụ: ICU), nhưng cấu hình có thể dài dòng và các catalog có xu hướng tập trung khi dự án phát triển.
- **Intlayer** - Mô hình nội dung tập trung vào component cho Next.js, **kiểu TypeScript nghiêm ngặt**, **kiểm tra trong thời gian build**, **tree-shaking**, **middleware tích hợp & trợ giúp SEO**, tùy chọn **Visual Editor/CMS**, và **dịch thuật hỗ trợ AI**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Các huy hiệu được cập nhật tự động. Các ảnh chụp nhanh sẽ thay đổi theo thời gian.

---

## So sánh Tính năng Song song (Tập trung vào Next.js)

| Tính năng                                        | `next-intlayer` (Intlayer)                                                                                              | `next-intl`                                                                                         | `next-i18next`                                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Bản dịch Gần Thành phần**                      | ✅ Có, nội dung được đặt gần với từng thành phần                                                                        | ❌ Không                                                                                            | ❌ Không                                                                                            |
| **Tích hợp TypeScript**                          | ✅ Nâng cao, tự động tạo kiểu nghiêm ngặt                                                                               | ✅ Tốt                                                                                              | ⚠️ Cơ bản                                                                                           |
| **Phát hiện bản dịch thiếu**                     | ✅ Tô sáng lỗi TypeScript và cảnh báo/lỗi trong thời gian biên dịch                                                     | ⚠️ Dự phòng thời gian chạy                                                                          | ⚠️ Dự phòng thời gian chạy                                                                          |
| **Nội dung phong phú (JSX/Markdown/components)** | ✅ Hỗ trợ trực tiếp                                                                                                     | ❌ Không thiết kế cho các node phong phú                                                            | ⚠️ Hạn chế                                                                                          |
| **Dịch thuật hỗ trợ AI**                         | ✅ Có, hỗ trợ nhiều nhà cung cấp AI. Có thể sử dụng bằng API key của bạn. Xem xét ngữ cảnh ứng dụng và phạm vi nội dung | ❌ Không                                                                                            | ❌ Không                                                                                            |
| **Trình chỉnh sửa trực quan**                    | ✅ Có, Trình chỉnh sửa trực quan cục bộ + CMS tùy chọn; có thể tách nội dung codebase ra ngoài; có thể nhúng            | ❌ Không / có sẵn qua các nền tảng bản địa hóa bên ngoài                                            | ❌ Không / có sẵn qua các nền tảng bản địa hóa bên ngoài                                            |
| **Định tuyến bản địa hóa**                       | ✅ Có, hỗ trợ các đường dẫn bản địa hóa sẵn có (hoạt động với Next.js & Vite)                                           | ✅ Tích hợp sẵn, App Router hỗ trợ phân đoạn `[locale]`                                             | ✅ Tích hợp sẵn                                                                                     |
| **Tạo Đường Dẫn Động**                           | ✅ Có                                                                                                                   | ✅ Có                                                                                               | ✅ Có                                                                                               |
| **Phân số nhiều**                                | ✅ Mẫu dựa trên liệt kê                                                                                                 | ✅ Tốt                                                                                              | ✅ Tốt                                                                                              |
| **Định dạng (ngày tháng, số, tiền tệ)**          | ✅ Bộ định dạng tối ưu (Intl ở tầng dưới)                                                                               | ✅ Tốt (trợ giúp Intl)                                                                              | ✅ Tốt (trợ giúp Intl)                                                                              |
| **Định dạng nội dung**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml đang phát triển)                                                            | ✅ .json, .js, .ts                                                                                  | ⚠️ .json                                                                                            |
| **Hỗ trợ ICU**                                   | ⚠️ Đang phát triển                                                                                                      | ✅ Có                                                                                               | ⚠️ Qua plugin (`i18next-icu`)                                                                       |
| **Trợ giúp SEO (hreflang, sitemap)**             | ✅ Công cụ tích hợp sẵn: trợ giúp cho sitemap, robots.txt, metadata                                                     | ✅ Tốt                                                                                              | ✅ Tốt                                                                                              |
| **Hệ sinh thái / Cộng đồng**                     | ⚠️ Nhỏ hơn nhưng đang phát triển nhanh và phản ứng tốt                                                                  | ✅ Tốt                                                                                              | ✅ Tốt                                                                                              |
| **Kết xuất phía máy chủ & Thành phần máy chủ**   | ✅ Có, tối ưu cho SSR / React Server Components                                                                         | ⚠️ Hỗ trợ ở cấp trang nhưng cần truyền các hàm t trên cây thành phần cho các thành phần máy chủ con | ⚠️ Hỗ trợ ở cấp trang nhưng cần truyền các hàm t trên cây thành phần cho các thành phần máy chủ con |
| **Tree-shaking (chỉ tải nội dung được sử dụng)** | ✅ Có, theo từng component tại thời điểm build thông qua các plugin Babel/SWC                                           | ⚠️ Một phần                                                                                         | ⚠️ Một phần                                                                                         |
| **Tải lười (Lazy loading)**                      | ✅ Có, theo từng locale / từng từ điển                                                                                  | ✅ Có (theo từng route/theo từng locale), cần quản lý namespace                                     | ✅ Có (theo từng route/theo từng locale), cần quản lý namespace                                     |
| **Loại bỏ nội dung không sử dụng**               | ✅ Có, theo từ điển tại thời điểm build                                                                                 | ❌ Không, có thể quản lý thủ công bằng cách quản lý namespace                                       | ❌ Không, có thể quản lý thủ công bằng cách quản lý namespace                                       |
| **Quản lý dự án lớn**                            | ✅ Khuyến khích mô-đun, phù hợp với hệ thống thiết kế                                                                   | ✅ Mô-đun với thiết lập                                                                             | ✅ Mô-đun với thiết lập                                                                             |
| **Kiểm tra bản dịch thiếu (CLI/CI)**             | ✅ CLI: `npx intlayer content test` (kiểm tra thân thiện với CI)                                                        | ⚠️ Không tích hợp sẵn; tài liệu đề xuất `npx @lingual/i18n-check`                                   | ⚠️ Không tích hợp sẵn; dựa vào công cụ i18next / runtime `saveMissing`                              |

---

## Giới thiệu

Next.js cung cấp hỗ trợ tích hợp cho routing quốc tế hóa (ví dụ: các đoạn locale). Nhưng tính năng đó không tự động thực hiện việc dịch thuật. Bạn vẫn cần một thư viện để hiển thị nội dung đã được bản địa hóa cho người dùng.

Có nhiều thư viện i18n tồn tại, nhưng trong thế giới Next.js hiện nay, có ba thư viện đang được ưa chuộng: next-i18next, next-intl và Intlayer.

---

## Kiến trúc & khả năng mở rộng

- **next-intl / next-i18next**: Mặc định sử dụng **danh mục tập trung** theo từng locale (cộng với **namespace** trong i18next). Hoạt động tốt ban đầu, nhưng thường trở thành một bề mặt chia sẻ lớn với sự phụ thuộc ngày càng tăng và sự thay đổi nhiều của các key.
- **Intlayer**: Khuyến khích sử dụng từ điển **theo từng component** (hoặc theo từng tính năng) **đặt cùng vị trí** với mã nguồn mà chúng phục vụ. Điều này giảm tải nhận thức, dễ dàng sao chép/di chuyển các phần UI, và giảm xung đột giữa các nhóm. Nội dung không sử dụng cũng dễ dàng được phát hiện và loại bỏ.

**Tại sao điều này quan trọng:** Trong các codebase lớn hoặc các thiết lập hệ thống thiết kế, **nội dung mô-đun** có khả năng mở rộng tốt hơn so với các danh mục đơn khối.

---

## Kích thước gói & phụ thuộc

Sau khi xây dựng ứng dụng, bundle là JavaScript mà trình duyệt sẽ tải để hiển thị trang. Do đó, kích thước bundle rất quan trọng đối với hiệu suất ứng dụng.

Có hai thành phần quan trọng trong bối cảnh bundle của ứng dụng đa ngôn ngữ:

- Mã ứng dụng
- Nội dung được trình duyệt tải

## Mã ứng dụng

Tầm quan trọng của mã ứng dụng trong trường hợp này là rất nhỏ. Cả ba giải pháp đều hỗ trợ tree-shaking, nghĩa là các phần mã không sử dụng sẽ không được bao gồm trong bundle.

Dưới đây là so sánh kích thước bundle JavaScript được trình duyệt tải cho một ứng dụng đa ngôn ngữ với ba giải pháp.

Nếu chúng ta không cần bất kỳ bộ định dạng nào trong ứng dụng, danh sách các hàm được xuất sau khi tree-shaking sẽ là:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Kích thước bundle là 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Kích thước bundle là 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Kích thước bundle là 80.7 kB -> 25.5 kB (gzip))

Các hàm này chỉ là các wrapper quanh React context/state, vì vậy tổng ảnh hưởng của thư viện i18n lên kích thước bundle là rất nhỏ.

> Intlayer hơi lớn hơn một chút so với `next-intl` và `next-i18next` vì nó bao gồm nhiều logic hơn trong hàm `useIntlayer`. Điều này liên quan đến tích hợp markdown và `intlayer-editor`.

## Nội dung và Bản dịch

Phần này thường bị các nhà phát triển bỏ qua, nhưng hãy xem xét trường hợp một ứng dụng gồm 10 trang với 10 ngôn ngữ. Giả sử mỗi trang chứa 100% nội dung duy nhất để đơn giản hóa phép tính (trong thực tế, nhiều nội dung bị trùng lặp giữa các trang, ví dụ: tiêu đề trang, đầu trang, chân trang, v.v.).

Một người dùng muốn truy cập trang `/fr/about` sẽ tải nội dung của một trang trong một ngôn ngữ nhất định. Bỏ qua việc tối ưu hóa nội dung có nghĩa là tải tới 8.200% `((1 + (((10 trang - 1) × (10 ngôn ngữ - 1)))) × 100)` nội dung của ứng dụng một cách không cần thiết. Bạn có thấy vấn đề không? Ngay cả khi nội dung này chỉ là văn bản, và trong khi bạn có thể ưu tiên tối ưu hóa hình ảnh trên trang web của mình, bạn đang gửi đi nội dung thừa khắp toàn cầu và khiến máy tính của người dùng phải xử lý nó một cách vô ích.

Hai vấn đề quan trọng:

- **Phân tách theo route:**

  > Nếu tôi đang ở trang `/about`, tôi không muốn tải nội dung của trang `/home`

- **Phân tách theo locale:**

  > Nếu tôi đang ở trang `/fr/about`, tôi không muốn tải nội dung của trang `/en/about`

Một lần nữa, cả ba giải pháp đều nhận thức được những vấn đề này và cho phép quản lý các tối ưu hóa này. Sự khác biệt giữa ba giải pháp là trải nghiệm nhà phát triển (DX).

`next-intl` và `next-i18next` sử dụng phương pháp tập trung để quản lý bản dịch, cho phép phân tách JSON theo locale và theo các tệp con. Trong `next-i18next`, chúng ta gọi các tệp JSON là 'namespaces'; `next-intl` cho phép khai báo các messages. Trong `intlayer`, chúng ta gọi các tệp JSON là 'dictionaries'.

- Trong trường hợp của `next-intl`, giống như `next-i18next`, nội dung được tải ở cấp độ trang/bố cục, sau đó nội dung này được tải vào một context provider. Điều này có nghĩa là nhà phát triển phải tự quản lý các file JSON sẽ được tải cho mỗi trang.

> Trong thực tế, điều này ngụ ý rằng các nhà phát triển thường bỏ qua tối ưu hóa này, ưu tiên tải toàn bộ nội dung trong context provider của trang để đơn giản.

- Trong trường hợp của `intlayer`, toàn bộ nội dung được tải trong ứng dụng. Sau đó một plugin (`@intlayer/babel` / `@intlayer/swc`) sẽ đảm nhiệm việc tối ưu gói bằng cách chỉ tải nội dung được sử dụng trên trang. Do đó, nhà phát triển không cần phải tự quản lý các từ điển sẽ được tải. Điều này cho phép tối ưu tốt hơn, dễ bảo trì hơn và giảm thời gian phát triển.

Khi ứng dụng phát triển (đặc biệt khi nhiều nhà phát triển cùng làm việc trên ứng dụng), việc quên xóa nội dung không còn sử dụng trong các tệp JSON là điều thường gặp.

> Lưu ý rằng tất cả JSON đều được tải trong mọi trường hợp (next-intl, next-i18next, intlayer).

Đây là lý do tại sao cách tiếp cận của Intlayer hiệu quả hơn: nếu một component không còn được sử dụng, từ điển của nó sẽ không được tải vào bundle.

Cách thư viện xử lý fallback cũng rất quan trọng. Giả sử ứng dụng mặc định là tiếng Anh, và người dùng truy cập trang `/fr/about`. Nếu bản dịch tiếng Pháp bị thiếu, chúng ta sẽ sử dụng fallback tiếng Anh.

Trong trường hợp của `next-intl` và `next-i18next`, thư viện yêu cầu tải JSON liên quan đến locale hiện tại, nhưng cũng phải tải JSON của locale dự phòng. Do đó, giả sử tất cả nội dung đã được dịch, mỗi trang sẽ tải 100% nội dung không cần thiết. **Ngược lại, `intlayer` xử lý fallback ngay trong thời gian xây dựng từ điển. Vì vậy, mỗi trang sẽ chỉ tải nội dung được sử dụng.**

> Lưu ý: Để tối ưu gói bundle sử dụng `intlayer`, bạn cần thiết lập tùy chọn `importMode: 'dynamic'` trong file `intlayer.config.ts` của bạn. Và đảm bảo plugin `@intlayer/babel` / `@intlayer/swc` đã được cài đặt (được cài đặt mặc định khi sử dụng `vite-intlayer`).

Dưới đây là ví dụ về tác động của việc tối ưu kích thước bundle sử dụng `intlayer` trong ứng dụng vite + react:

| Gói tối ưu hóa                                                                                      | Gói không tối ưu hóa                                                                                                      |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ![gói tối ưu hóa](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![gói không tối ưu hóa](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript & an toàn

<Columns>
  <Column>

**next-i18next**

- Kiểu cơ bản cho các hook. **kiểu khóa nghiêm ngặt yêu cầu công cụ/cấu hình bổ sung**.

  </Column>
  <Column>

**next-intl**

- Hỗ trợ TypeScript vững chắc, nhưng **các khóa không được kiểu nghiêm ngặt theo mặc định**. bạn sẽ duy trì các mẫu an toàn một cách thủ công.

  </Column>
  <Column>

**intlayer**

- **Tạo kiểu nghiêm ngặt** từ nội dung của bạn. **Tự động hoàn thành trong IDE** và **lỗi thời gian biên dịch** phát hiện lỗi chính tả và khóa thiếu trước khi triển khai.

  </Column>
</Columns>

**Tại sao điều này quan trọng:** Kiểu mạnh giúp chuyển lỗi sang bên **trái** (CI/build) thay vì bên **phải** (runtime).

---

## Xử lý dịch thiếu

<Columns>
  <Column>

**next-i18next**

- Dựa vào **fallback thời gian chạy**. Build không bị lỗi.

  </Column>
  <Column>

**next-intl**

- Dựa vào **fallback thời gian chạy**. Build không bị lỗi.

  </Column>
  <Column>

**intlayer**

- **Phát hiện trong thời gian build** với **cảnh báo/lỗi** cho các locale hoặc key bị thiếu.

  </Column>
</Columns>

**Tại sao điều này quan trọng:** Phát hiện thiếu sót trong quá trình build giúp ngăn chặn các chuỗi 'undefined' xuất hiện trong môi trường production.

---

## Định tuyến, middleware & chiến lược URL

<Columns>
  <Column>

**next-i18next**

- Cho phép định tuyến theo ngôn ngữ. Nhưng middleware không được tích hợp sẵn.

  </Column>
  <Column>

**next-intl**

- Cho phép định tuyến theo ngôn ngữ.
- Cung cấp middleware.

  </Column>
  <Column>

**intlayer**

- Cho phép định tuyến theo ngôn ngữ.
- Cung cấp middleware.

  </Column>
</Columns>

**Tại sao điều này quan trọng:** Giúp cải thiện SEO và khả năng khám phá, cũng như trải nghiệm người dùng.

---

## Đồng bộ với Server Components (RSC)

<Columns>
  <Column>

**next-i18next**

- Hỗ trợ các server component cho trang và layout.
- Không cung cấp API đồng bộ cho các thành phần server con.

  </Column>
  <Column>

**next-intl**

- Hỗ trợ các thành phần server trang và bố cục.
- Không cung cấp API đồng bộ cho các thành phần server con.

  </Column>
  <Column>

**intlayer**

- Hỗ trợ các thành phần server trang và bố cục.
- Cung cấp API đồng bộ cho các thành phần server con.

  </Column>
</Columns>

**Tại sao điều này quan trọng:** Hỗ trợ thành phần server là một tính năng then chốt của Next.js 13+, giúp cải thiện hiệu suất. Việc truyền props như locale hoặc hàm `t` từ thành phần cha xuống các thành phần server con làm cho các thành phần của bạn kém tái sử dụng hơn.

---

## Tích hợp với các nền tảng bản địa hóa (TMS)

Các tổ chức lớn thường dựa vào Hệ thống Quản lý Dịch thuật (TMS) như **Crowdin**, **Phrase**, **Lokalise**, **Localizely**, hoặc **Localazy**.

- **Tại sao các công ty quan tâm**
  - **Hợp tác & vai trò**: Có nhiều bên tham gia: nhà phát triển, quản lý sản phẩm, người dịch, người đánh giá, đội ngũ marketing.
  - **Quy mô & hiệu quả**: dịch thuật liên tục, đánh giá trong ngữ cảnh.

- **next-intl / next-i18next**
  - Thường sử dụng **danh mục JSON tập trung**, nên việc xuất/nhập với TMS rất đơn giản.
  - Hệ sinh thái trưởng thành và có ví dụ/tích hợp cho các nền tảng trên.

- **Intlayer**
  - Khuyến khích **từ điển phân tán, theo từng component** và hỗ trợ nội dung **TypeScript/TSX/JS/JSON/MD**.
  - Điều này cải thiện tính mô-đun trong mã, nhưng có thể làm cho việc tích hợp TMS dạng plug-and-play trở nên khó khăn hơn khi một công cụ mong đợi các tệp JSON phẳng, tập trung.
  - Intlayer cung cấp các lựa chọn thay thế: **dịch thuật hỗ trợ AI** (sử dụng khóa nhà cung cấp của bạn), một **Trình chỉnh sửa trực quan/CMS**, và các quy trình làm việc **CLI/CI** để phát hiện và điền trước các khoảng trống.

> Lưu ý: `next-intl` và `i18next` cũng chấp nhận các catalog TypeScript. Nếu nhóm của bạn lưu trữ các thông điệp trong các tệp `.ts` hoặc phân quyền chúng theo tính năng, bạn có thể gặp phải sự cản trở tương tự với TMS. Tuy nhiên, nhiều thiết lập `next-intl` vẫn tập trung trong thư mục `locales/`, điều này giúp việc chuyển đổi sang JSON cho TMS dễ dàng hơn một chút.

---

## Trải nghiệm nhà phát triển

Phần này thực hiện so sánh sâu giữa ba giải pháp. Thay vì xem xét các trường hợp đơn giản, như được mô tả trong tài liệu 'bắt đầu' cho mỗi giải pháp, chúng ta sẽ xem xét một trường hợp sử dụng thực tế, tương tự hơn với một dự án thực tế.

### Cấu trúc ứng dụng

Cấu trúc ứng dụng rất quan trọng để đảm bảo khả năng bảo trì tốt cho codebase của bạn.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### So sánh

- **next-intl / next-i18next**: Danh mục tập trung (JSON; namespaces/messages). Cấu trúc rõ ràng, tích hợp tốt với các nền tảng dịch thuật, nhưng có thể dẫn đến nhiều chỉnh sửa chéo file khi ứng dụng phát triển.
- **Intlayer**: Từ điển `.content.{ts|js|json}` theo từng component, đặt cùng vị trí với component. Dễ dàng tái sử dụng component và suy luận cục bộ; thêm các file và dựa vào công cụ xây dựng thời gian biên dịch.

#### Cài đặt và Tải Nội dung

Như đã đề cập trước đó, bạn phải tối ưu cách mỗi file JSON được nhập vào code của bạn.
Cách thư viện xử lý việc tải nội dung rất quan trọng.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  // Trả về đường dẫn có locale nếu khác defaultLocale
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  // Trả về đường dẫn tuyệt đối với origin và đường dẫn đã được localize
  return ORIGIN + localizedPath(locale, path);
}
```

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Tải tài nguyên JSON từ src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
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
}
```

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle } // { ns: gói tài nguyên }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Ép buộc render tĩnh cho trang
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Chỉ tải các namespace mà layout/trang của bạn cần
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Đặt locale yêu cầu đang hoạt động cho lần render server này (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Các thông điệp được tải phía server. Chỉ đẩy những gì cần thiết cho client.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Dịch/định dạng nghiêm ngặt phía server
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

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

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### So sánh

Cả ba đều hỗ trợ tải nội dung và providers theo từng locale.

- Với **next-intl/next-i18next**, bạn thường tải các messages/namespace được chọn theo từng route và đặt providers ở nơi cần thiết.

- Với **Intlayer**, thêm phân tích tại thời điểm build để suy luận việc sử dụng, điều này có thể giảm thiểu việc cấu hình thủ công và cho phép sử dụng một provider gốc duy nhất.

Chọn giữa kiểm soát rõ ràng và tự động hóa dựa trên sở thích của nhóm.

### Sử dụng trong một component phía client

Hãy lấy ví dụ về một component phía client hiển thị bộ đếm.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Bản dịch (mỗi namespace là một file JSON dưới `src/locales/...`)**

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Component phía client (chỉ tải namespace cần thiết)**

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language); // Định dạng số theo ngôn ngữ hiện tại

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

export default ClientComponent;
```

> Đảm bảo trang/provider chỉ bao gồm các namespace bạn cần (ví dụ: `about`).
> Nếu bạn sử dụng React < 19, hãy ghi nhớ các formatter nặng như `Intl.NumberFormat`.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Bản dịch (dạng dữ liệu được tái sử dụng; tải chúng vào các thông điệp next-intl theo cách bạn muốn)**

```json fileName="locales/vi/about.json"
{
  "counter": {
    "label": "Bộ đếm",
    "increment": "Tăng"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Component phía client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Phạm vi trực tiếp đến đối tượng lồng nhau
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Đừng quên thêm thông điệp "about" vào thông điệp client của trang

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Nội dung**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
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

**Component phía client**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // trả về chuỗi
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### So sánh

- **Định dạng số**
  - **next-i18next**: không có `useNumber`; sử dụng `Intl.NumberFormat` (hoặc i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: tích hợp sẵn `useNumber()`.

- **Khóa (Keys)**
  - Giữ cấu trúc lồng nhau (`about.counter.label`) và phạm vi hook của bạn tương ứng (`useTranslation("about")` + `t("counter.label")` hoặc `useTranslations("about.counter")` + `t("label")`).

- **Vị trí file**
  - **next-i18next** yêu cầu JSON ở `public/locales/{lng}/{ns}.json`.
  - **next-intl** linh hoạt; tải thông điệp theo cách bạn cấu hình.
  - **Intlayer** lưu nội dung trong các từ điển TS/JS và giải quyết theo key.

---

### Sử dụng trong một server component

Chúng ta sẽ lấy ví dụ về một component giao diện người dùng (UI). Component này là một server component, và nên có khả năng được chèn như một con của client component. (page (server component) -> client component -> server component). Vì component này có thể được chèn như một con của client component, nó không thể là async.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string; // hàm dịch theo key
  locale: string; // ngôn ngữ hiện tại
  count: number; // số đếm
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count); // định dạng số theo locale

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string; // hàm dịch theo key
  locale: string; // ngôn ngữ hiện tại
  count: number; // số đếm
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> Vì component phía server không thể là async, bạn cần truyền các bản dịch và hàm formatter dưới dạng props.
>
> Trong trang / layout của bạn:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer cung cấp các hook **an toàn cho server** thông qua `next-intlayer/server`. Để hoạt động, `useIntlayer` và `useNumber` sử dụng cú pháp giống hook, tương tự như các hook phía client, nhưng dựa vào ngữ cảnh server (`IntlayerServerProvider`) ở bên dưới.

### Metadata / Sitemap / Robots

Dịch nội dung là điều tuyệt vời. Nhưng mọi người thường quên rằng mục tiêu chính của quốc tế hóa là làm cho trang web của bạn trở nên dễ nhìn thấy hơn trên toàn thế giới. I18n là một đòn bẩy tuyệt vời để cải thiện khả năng hiển thị trang web của bạn.

Dưới đây là danh sách các thực hành tốt liên quan đến SEO đa ngôn ngữ.

- đặt thẻ meta hreflang trong thẻ `<head>`
  > Nó giúp các công cụ tìm kiếm hiểu được những ngôn ngữ nào có trên trang
- liệt kê tất cả các bản dịch trang trong sitemap.xml sử dụng schema XML `http://www.w3.org/1999/xhtml`
  >
- đừng quên loại trừ các trang có tiền tố khỏi robots.txt (ví dụ: `/dashboard`, và `/fr/dashboard`, `/es/dashboard`)
  >
- sử dụng component Link tùy chỉnh để chuyển hướng đến trang được địa phương hóa nhất (ví dụ: bằng tiếng Pháp `<a href="/fr/about">A propos</a>`)
  >

Các nhà phát triển thường quên tham chiếu đúng các trang của họ theo từng ngôn ngữ.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  // Trả về đường dẫn có tiền tố ngôn ngữ nếu không phải ngôn ngữ mặc định
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  // Trả về URL tuyệt đối dựa trên đường dẫn đã địa phương hóa
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // Nhập đúng gói JSON từ src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
};
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"), // tiêu đề trang
    description: t("description"), // mô tả trang
    alternates: {
      canonical: localizedPath(locale, url), // đường dẫn chuẩn
      languages: { ...languages, "x-default": url }, // các ngôn ngữ thay thế, bao gồm mặc định
    },
  };
};

// ... Phần còn lại của mã trang
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
};
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Phần còn lại của mã trang
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // không cho phép truy cập các URL đa ngôn ngữ của /dashboard
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer cung cấp một hàm `getMultilingualUrls` để tạo các URL đa ngôn ngữ cho sitemap của bạn.

### Middleware cho định tuyến locale

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

Thêm middleware để xử lý phát hiện locale và định tuyến:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // loại trừ các tệp có phần mở rộng

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Khớp với tất cả các đường dẫn ngoại trừ những đường dẫn bắt đầu bằng các từ này và các tệp có phần mở rộng
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

Thêm middleware để xử lý phát hiện locale và định tuyến:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Bỏ qua API, các phần nội bộ của Next và tài nguyên tĩnh
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

Intlayer cung cấp xử lý middleware tích hợp sẵn thông qua cấu hình gói `next-intlayer`.

```ts fileName="src/middleware.ts"
import { intlayerMiddleware } from "next-intlayer/middleware";

export const middleware = intlayerMiddleware();

// áp dụng middleware này chỉ cho các tệp trong thư mục app
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Việc thiết lập middleware được tập trung trong tệp `intlayer.config.ts`.

  </TabItem>
</Tab>

### Danh sách kiểm tra thiết lập và các thực hành tốt

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

- Đảm bảo `lang` và `dir` được đặt trên thẻ `<html>` gốc trong `src/app/[locale]/layout.tsx`.
- Chia bản dịch thành các namespace (ví dụ `common.json`, `about.json`) dưới thư mục `src/locales/<locale>/`.
- Chỉ tải các namespace cần thiết trong các thành phần client bằng cách sử dụng `useTranslation('<ns>')` và giới hạn phạm vi `I18nProvider` với cùng các namespace đó.
- Giữ các trang ở trạng thái tĩnh khi có thể: xuất `export const dynamic = 'force-static'` trên các trang; đặt `dynamicParams = false` và triển khai `generateStaticParams`.
- Sử dụng các thành phần server đồng bộ lồng trong phạm vi client bằng cách truyền các chuỗi đã được tính toán hoặc hàm `t` cùng với `locale`.
- Đối với SEO, thiết lập `alternates.languages` trong metadata, liệt kê các URL đã được địa phương hóa trong `sitemap.ts`, và không cho phép các tuyến đường địa phương hóa trùng lặp trong `robots.ts`.
- Ưu tiên sử dụng các bộ định dạng nhận biết locale (ví dụ, `Intl.NumberFormat(locale)`) và ghi nhớ chúng trên client nếu sử dụng React < 19.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

- **Thiết lập thuộc tính html `lang` và `dir`**: Trong `src/app/[locale]/layout.tsx`, tính toán `dir` thông qua `getLocaleDirection(locale)` và thiết lập `<html lang={locale} dir={dir}>`.
- **Phân tách thông điệp theo namespace**: Tổ chức JSON theo từng locale và namespace (ví dụ, `common.json`, `about.json`).
- **Giảm thiểu payload trên client**: Trên các trang, chỉ gửi các namespace cần thiết đến `NextIntlClientProvider` (ví dụ, `pick(messages, ['common', 'about'])`).
- **Ưu tiên các trang tĩnh**: Xuất `export const dynamic = 'force-static'` và tạo các tham số tĩnh cho tất cả các `locales`.
- **Các thành phần server đồng bộ**: Giữ cho các thành phần server đồng bộ bằng cách truyền các chuỗi đã được tính toán trước (nhãn đã dịch, số đã được định dạng) thay vì các cuộc gọi async hoặc các hàm không thể tuần tự hóa.

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

- **Nội dung mô-đun**: Đặt các từ điển nội dung cùng vị trí với các thành phần sử dụng các tệp `.content.{ts|js|json}`.
- **An toàn kiểu**: Tận dụng tích hợp TypeScript để kiểm tra nội dung tại thời điểm biên dịch.
- **Tối ưu hóa thời gian xây dựng**: Sử dụng công cụ xây dựng của Intlayer để tự động loại bỏ mã không dùng đến (tree-shaking) và tối ưu gói.
- **Công cụ tích hợp**: Tận dụng các tính năng định tuyến tích hợp, trợ giúp SEO và hỗ trợ trình chỉnh sửa trực quan.

  </TabItem>
</Tab>

---

## Và người chiến thắng là…

Không đơn giản. Mỗi lựa chọn đều có những đánh đổi. Đây là cách tôi nhìn nhận:

<Columns>
  <Column>

**next-i18next**

- trưởng thành, đầy đủ tính năng, nhiều plugin cộng đồng, nhưng chi phí thiết lập cao hơn. Nếu bạn cần **hệ sinh thái plugin của i18next** (ví dụ: các quy tắc ICU nâng cao qua plugin) và đội ngũ của bạn đã quen với i18next, chấp nhận **cấu hình nhiều hơn** để có sự linh hoạt.

  </Column>
  <Column>

**next-intl**

- đơn giản nhất, nhẹ, ít quyết định bắt buộc hơn. Nếu bạn muốn một giải pháp **tối giản**, bạn thoải mái với các danh mục tập trung, và ứng dụng của bạn có quy mô **nhỏ đến trung bình**.

  </Column>
  <Column>

**Intlayer**

- được xây dựng cho Next.js hiện đại, với nội dung mô-đun, an toàn kiểu, công cụ hỗ trợ, và ít mã mẫu hơn. Nếu bạn đánh giá cao **nội dung phạm vi thành phần**, **TypeScript nghiêm ngặt**, **đảm bảo tại thời điểm xây dựng**, **tree-shaking**, và công cụ định tuyến/SEO/trình soạn thảo **đầy đủ tính năng** - đặc biệt cho **Next.js App Router**, hệ thống thiết kế và **các codebase lớn, mô-đun**.

  </Column>
</Columns>

Nếu bạn ưu tiên thiết lập tối giản và chấp nhận một số cấu hình thủ công, next-intl là lựa chọn tốt. Nếu bạn cần tất cả các tính năng và không ngại sự phức tạp, next-i18next sẽ phù hợp. Nhưng nếu bạn muốn một giải pháp hiện đại, có thể mở rộng, mô-đun với các công cụ tích hợp sẵn, Intlayer hướng đến việc cung cấp cho bạn điều đó ngay khi sử dụng.

> **Lựa chọn thay thế cho các nhóm doanh nghiệp**: Nếu bạn cần một giải pháp đã được chứng minh hoạt động hoàn hảo với các nền tảng bản địa hóa đã được thiết lập như **Crowdin**, **Phrase**, hoặc các hệ thống quản lý dịch thuật chuyên nghiệp khác, hãy cân nhắc **next-intl** hoặc **next-i18next** vì hệ sinh thái trưởng thành và các tích hợp đã được kiểm chứng của chúng.

> **Lộ trình tương lai**: Intlayer cũng dự định phát triển các plugin hoạt động trên nền tảng các giải pháp **i18next** và **next-intl**. Điều này sẽ mang lại cho bạn những lợi thế của Intlayer về tự động hóa, cú pháp và quản lý nội dung trong khi vẫn giữ được tính bảo mật và ổn định do các giải pháp đã được thiết lập này cung cấp trong mã ứng dụng của bạn.

## GitHub STARs

Sao trên GitHub là một chỉ số mạnh mẽ cho thấy mức độ phổ biến của dự án, sự tin tưởng của cộng đồng và tính liên quan lâu dài. Mặc dù không phải là thước đo trực tiếp về chất lượng kỹ thuật, nhưng chúng phản ánh số lượng nhà phát triển thấy dự án hữu ích, theo dõi tiến trình của nó và có khả năng áp dụng nó. Để ước tính giá trị của một dự án, sao giúp so sánh mức độ thu hút giữa các lựa chọn thay thế và cung cấp cái nhìn sâu sắc về sự phát triển của hệ sinh thái.

[![Biểu đồ Lịch sử Sao](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Kết luận

Cả ba thư viện đều thành công trong việc cốt lõi hóa localization. Sự khác biệt là **bạn phải làm bao nhiêu công việc** để đạt được một thiết lập vững chắc, có thể mở rộng trong **Next.js hiện đại**:

- Với **Intlayer**, **nội dung mô-đun**, **TypeScript nghiêm ngặt**, **an toàn thời gian xây dựng**, **gói tree-shaken**, và **App Router + công cụ SEO hàng đầu** là **mặc định**, không phải là gánh nặng.
- Nếu đội ngũ của bạn coi trọng **khả năng bảo trì và tốc độ** trong một ứng dụng đa ngôn ngữ, hướng thành phần, Intlayer cung cấp trải nghiệm **toàn diện nhất** hiện nay.

Tham khảo tài liệu ['Tại sao chọn Intlayer?'](https://intlayer.org/doc/why) để biết thêm chi tiết.
