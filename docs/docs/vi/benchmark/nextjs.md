---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: Giải pháp i18n tốt nhất cho Next.js năm 2026 - Báo cáo Benchmark
description: So sánh các thư viện quốc tế hóa (i18n) cho Next.js như next-intl, next-i18next và Intlayer. Báo cáo hiệu năng chi tiết về kích thước gói bundle, rò rỉ dữ liệu và tính phản ứng.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - hiệu năng
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Khởi tạo benchmark"
---

# Thư viện i18n cho Next.js — Báo cáo Benchmark 2026

Trang này là báo cáo benchmark cho các giải pháp i18n trên Next.js.

## Mục lục

<Toc/>

## Benchmark tương tác

<I18nBenchmark framework="nextjs" vertical/>

## Tham chiếu kết quả:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

Xem kho lưu trữ benchmark đầy đủ [tại đây](https://github.com/intlayer-org/benchmark-i18n).

## Giới thiệu

Các thư viện quốc tế hóa có tác động nặng nề đến ứng dụng của bạn. Rủi ro chính là tải nội dung cho mọi trang và mọi ngôn ngữ ngay cả khi người dùng chỉ truy cập một trang duy nhất.

Khi ứng dụng của bạn phát triển, kích thước gói bundle có thể tăng theo cấp số nhân, điều này có thể làm giảm hiệu năng một cách rõ rệt.

Ví dụ, trong những trường hợp xấu nhất, sau khi triển khai đa ngôn ngữ, trang của bạn có thể nặng hơn gần 4 lần.

Một tác động khác của các thư viện i18n là làm chậm quá trình phát triển. Việc chuyển đổi các component thành nội dung đa ngôn ngữ trên nhiều ngôn ngữ khác nhau rất tốn thời gian.

Vì bài toán này khó, nên có nhiều giải pháp tồn tại — một số tập trung vào trải nghiệm phát triển (DX), một số khác vào hiệu năng hoặc khả năng mở rộng, v.v.

Intlayer cố gắng tối ưu hóa trên tất cả các khía cạnh này.

## Kiểm tra ứng dụng của bạn

Để làm rõ các vấn đề này, tôi đã xây dựng một trình quét miễn phí mà bạn có thể thử [tại đây](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Vấn đề

Có hai cách chính để hạn chế tác động của một ứng dụng đa ngôn ngữ lên gói bundle của bạn:

- Chia nhỏ tệp JSON (hoặc nội dung) của bạn thành nhiều tệp / biến / namespace để công cụ đóng gói (bundler) có thể loại bỏ mã thừa (tree-shake) cho nội dung không dùng đến trên một trang cụ thể.
- Tải nội dung trang một cách linh hoạt (dynamic load) chỉ theo ngôn ngữ của người dùng.

Các hạn chế kỹ thuật đối với các phương pháp này:

**Tải động (Dynamic loading)**

Ngay cả khi bạn khai báo các route như `[locale]/page.tsx`, với Webpack hoặc Turbopack, và ngay cả khi `generateStaticParams` được định nghĩa, bundler vẫn không coi `locale` là một hằng số tĩnh. Điều đó có nghĩa là nó có thể kéo nội dung của tất cả các ngôn ngữ vào từng trang. Cách chính để hạn chế điều này là tải nội dung thông qua import động (ví dụ: `import('./locales/${locale}.json')`).

Điều xảy ra tại thời điểm build là Next.js tạo ra một gói bundle JS cho mỗi ngôn ngữ (ví dụ: `./locales_vi_12345.js`). Sau khi trang web được gửi đến máy khách, khi trang chạy, trình duyệt thực hiện thêm một yêu cầu HTTP cho tệp JS cần thiết (ví dụ: `./locales_vi_12345.js`).

> Một cách khác để giải quyết vấn đề tương tự là sử dụng `fetch()` để tải JSON động. Đó là cách `Tolgee` hoạt động khi JSON nằm trong thư mục `/public`, hoặc `next-translate`, dựa vào `getStaticProps` để tải nội dung. Quy trình là giống nhau: trình duyệt thực hiện thêm một yêu cầu HTTP để tải tài nguyên.

**Chia tách nội dung (Content splitting)**

Nếu bạn sử dụng cú pháp như `const t = useTranslation()` + `t('object-của-tôi.sub-object.key-của-tôi')`, toàn bộ tệp JSON thường phải nằm trong gói bundle để thư viện có thể phân tích và tìm kiếm khóa (key). Phần lớn nội dung đó sau đó được gửi đi ngay cả khi nó không được sử dụng trên trang.

Để giảm thiểu điều này, một số thư viện yêu cầu bạn khai báo theo từng trang những namespace nào cần tải — ví dụ: `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

Ngược lại, `Paraglide` thêm một bước bổ sung trước khi build để chuyển đổi tệp JSON thành các biểu tượng phẳng như `const en_my_var = () => 'giá trị của tôi'`. Về lý thuyết, điều đó cho phép loại bỏ mã thừa cho nội dung không dùng đến trên trang. Như chúng ta sẽ thấy, phương pháp đó vẫn có những nhược điểm đánh đổi.

Cuối cùng, `Intlayer` áp dụng một tối ưu hóa tại thời điểm build để `useIntlayer('key-của-tôi')` được thay thế trực tiếp bằng nội dung tương ứng.

## Phương pháp đo lường

Đối với benchmark này, chúng tôi đã so sánh các thư viện sau:

- `Base App` (Không sử dụng thư viện i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Tôi đã sử dụng phiên bản `Next.js` `16.2.4` với App Router.

Tôi đã xây dựng một ứng dụng đa ngôn ngữ với **10 trang** và **10 ngôn ngữ**.

Tôi đã so sánh **bốn chiến lược tải**:

| Chiến lược   | Không có namespace (global)                         | Có namespace (scoped)                                                        |
| :----------- | :-------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Tải tĩnh** | **Static**: Mọi thứ nằm trong bộ nhớ khi khởi động. | **Scoped static**: Chia tách theo namespace; mọi thứ được tải khi khởi động. |
| **Tải động** | **Dynamic**: Tải theo yêu cầu cho mỗi ngôn ngữ.     | **Scoped dynamic**: Tải chi tiết theo từng namespace và ngôn ngữ.            |

## Tóm tắt chiến lược

- **Static**: Đơn giản; không có độ trễ mạng sau lần tải đầu tiên. Nhược điểm: kích thước gói bundle lớn.
- **Dynamic**: Giảm bớt gánh nặng ban đầu (lazy-loading). Lý tưởng khi bạn có nhiều ngôn ngữ.
- **Scoped static**: Giữ cho mã được tổ chức (tách biệt logic) mà không cần các yêu cầu mạng bổ sung phức tạp.
- **Scoped dynamic**: Phương pháp tốt nhất cho việc _chia tách mã_ (code splitting) và hiệu năng. Giảm thiểu bộ nhớ bằng cách chỉ tải những gì cần thiết cho chế độ xem hiện tại và ngôn ngữ đang hoạt động.

### Những gì tôi đã đo lường:

Tôi đã chạy cùng một ứng dụng đa ngôn ngữ trên trình duyệt thực tế cho mỗi công nghệ, sau đó ghi lại những gì thực sự truyền qua mạng và thời gian thực hiện. Kích thước được báo cáo **sau khi nén web thông thường**, vì điều đó gần với những gì người dùng thực sự tải xuống hơn là số lượng mã nguồn thô.

- **Kích thước thư viện quốc tế hóa**: Sau khi đóng gói, loại bỏ mã thừa và thu gọn mã, kích thước của thư viện i18n là kích thước của các provider (ví dụ: `NextIntlClientProvider`) + mã của các hook (ví dụ: `useTranslations`) trong một component trống. Nó không bao gồm việc tải các tệp bản dịch. Điều này trả lời cho câu hỏi thư viện "đắt đỏ" như thế nào trước khi nội dung của bạn tham gia vào.

- **JavaScript trên mỗi trang**: Đối với mỗi route benchmark, trình duyệt tải bao nhiêu mã script cho lần truy cập đó, được tính trung bình trên các trang trong bộ thử nghiệm (và trên các ngôn ngữ mà báo cáo tổng hợp chúng). Các trang nặng là các trang chậm.

- **Rò rỉ từ các ngôn ngữ khác (Leakage)**: Đó là nội dung của cùng một trang nhưng ở ngôn ngữ khác mà vô tình được tải vào trang đang kiểm tra. Nội dung này là không cần thiết và nên tránh (ví dụ: nội dung trang `/fr/about` nằm trong gói bundle của trang `/en/about`).

- **Rò rỉ từ các route khác**: Ý tưởng tương tự cho **các màn hình khác** trong ứng dụng: liệu văn bản của chúng có đi kèm khi bạn chỉ mở một trang (ví dụ: nội dung trang `/en/about` nằm trong gói bundle của trang `/en/contact`). Điểm số cao cho thấy việc chia tách yếu hoặc các gói bundle quá rộng.

- **Kích thước gói bundle trung bình cho component**: Các thành phần giao diện người dùng (UI) phổ biến được đo lường **từng cái một** thay vì ẩn bên trong một con số khổng lồ của ứng dụng. Nó cho thấy liệu việc quốc tế hóa có âm thầm làm phồng các component hàng ngày hay không. Ví dụ, nếu component của bạn render lại, nó sẽ tải toàn bộ dữ liệu đó từ bộ nhớ. Việc đính kèm một tệp JSON khổng lồ vào bất kỳ component nào giống như việc kết nối một kho lưu trữ lớn các dữ liệu không dùng đến sẽ làm chậm hiệu năng của component của bạn.

- **Khả năng phản ứng khi chuyển đổi ngôn ngữ**: Tôi chuyển đổi ngôn ngữ bằng bộ điều khiển của chính ứng dụng và đo thời gian cho đến khi trang được chuyển đổi rõ ràng — những gì một khách truy cập sẽ nhận thấy, không phải là một bước vi mô trong phòng thí nghiệm.

- **Công việc render sau khi thay đổi ngôn ngữ**: Một theo dõi hẹp hơn: giao diện mất bao nhiêu công sức để vẽ lại cho ngôn ngữ mới sau khi việc chuyển đổi đang diễn ra. Hữu ích khi thời gian "cảm nhận được" và chi phí framework khác biệt.

- **Thời gian tải trang ban đầu**: Từ lúc điều hướng cho đến khi trình duyệt coi trang đã được tải đầy đủ cho các kịch bản tôi đã kiểm tra. Tốt để so sánh khởi động lạnh (cold start).

- **Thời gian Hydration**: Khi ứng dụng hiển thị nó, khách hàng mất bao lâu để chuyển đổi mã HTML từ máy chủ thành thứ mà bạn thực sự có thể nhấp vào. Dấu gạch ngang trong các bảng có nghĩa là việc triển khai đó không cung cấp một con số hydration đáng tin cậy trong benchmark này.

## Kết quả chi tiết

### 1 — Các giải pháp cần tránh

Một số giải pháp, chẳng hạn như `gt-next` hoặc `lingo.dev`, rõ ràng là tốt nhất nên tránh. Chúng kết hợp việc phụ thuộc vào nhà cung cấp (vendor lock-in) với việc làm ô nhiễm mã nguồn của bạn. Mặc dù đã dành nhiều giờ để thử triển khai chúng, tôi chưa bao giờ làm cho chúng hoạt động bình thường — kể cả trên TanStack Start hay Next.js.

Các vấn đề gặp phải:

**(General Translation)** (`gt-next@6.16.5`):

- Đối với một ứng dụng 110kb, `gt-react` thêm vào hơn 440kb dữ liệu dư thừa.
- Thông báo `Quota Exceeded, please upgrade your plan` ngay trong lần xây dựng đầu tiên với General Translation.
- Các bản dịch không được hiển trị; tôi nhận được lỗi `Error: <T> used on the client-side outside of <GTProvider>`, dường như là một lỗi trong thư viện.
- Trong khi triển khai **gt-tanstack-start-react**, tôi cũng gặp phải một [vấn đề](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) với thư viện: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, khiến ứng dụng bị hỏng. Sau khi báo cáo vấn đề này, người duy trì đã khắc phục nó trong vòng 24 giờ.
- Thư viện ngăn cản việc render tĩnh các trang Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- Vượt quá hạn mức AI, khiến việc xây dựng bị đình trệ hoàn toàn — vì vậy bạn không thể đưa lên production nếu không trả tiền.
- Trình biên dịch đã bỏ sót gần 40% nội dung đã dịch. Tôi đã phải viết lại tất cả các cấu trúc `.map` thành các khối component phẳng để nó hoạt động.
- CLI của họ có rất nhiều lỗi và hay tự ý đặt lại tệp cấu hình không vì lý do gì.
- Khi xây dựng, nó đã xóa hoàn toàn các tệp JSON được tạo ra khi có nội dung mới được thêm vào. Kết quả là, một số ít khóa có thể xóa sạch hơn 300 khóa hiện có.

### 2 — Các giải pháp thử nghiệm

**(Wuchale)** (`wuchale@0.22.11`):

Ý tưởng đằng sau `Wuchale` rất thú vị nhưng vẫn chưa khả thi. Tôi đã gặp vấn đề về tính phản ứng và phải ép buộc render lại provider để ứng dụng hoạt động. Tài liệu cũng khá mơ hồ, khiến việc làm quen khó khăn hơn.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` mang đến một phương pháp tiếp cận sáng tạo và được cân nhắc kỹ lưỡng. Dù vậy, trong benchmark này, khả năng loại bỏ mã thừa (tree-shaking) mà công ty họ quảng cáo đã không hoạt động cho cấu hình Next.js hoặc TanStack Start của tôi. Quy trình làm việc và trải nghiệm phát triển (DX) phức tạp hơn các tùy chọn khác.
Cá nhân tôi không thích việc phải tạo lại các tệp JS trước mỗi lần đẩy mã (push), điều này tạo ra rủi ro xung đột merge liên tục qua PR. Công cụ này cũng có vẻ tập trung vào Vite hơn là Next.js.
Cuối cùng, so với các giải pháp khác, Paraglide không sử dụng store (ví dụ: React context) để lấy ngôn ngữ hiện tại nhằm render nội dung. Đối với mỗi nút (node) được phân tích, nó sẽ yêu cầu ngôn ngữ từ localStorage / cookie v.v. Điều này dẫn đến việc thực thi logic không cần thiết ảnh hưởng đến tính phản ứng của component.

### 3 — Các giải pháp chấp nhận được

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` giải quyết được nhiều vấn đề đã đề cập trước đó. Tôi thấy việc áp dụng nó khó hơn so với các công cụ tương tự. Nó không cung cấp tính an toàn kiểu dữ liệu (type safety), điều này cũng khiến việc phát hiện các khóa bị thiếu tại thời điểm biên dịch trở nên khó khăn hơn. Tôi đã phải bao bọc các hàm của Tolgee bằng các hàm của riêng mình để thêm tính năng phát hiện khóa bị thiếu.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` là tùy chọn hợp thời nhất và là tùy chọn mà các trợ lý AI thúc đẩy nhiều nhất, nhưng theo quan điểm của tôi thì điều đó là sai lầm. Bắt đầu rất dễ dàng. Trong thực tế, việc tối ưu hóa để hạn chế rò rỉ rất phức tạp. Việc kết hợp tải động + tạo namespace + các kiểu dữ liệu TypeScript làm chậm quá trình phát triển rất nhiều. Gói bundle cũng khá nặng (~13kb cho `NextIntlClientProvider` + `useTranslations`, tức là gấp hơn 2 lần `next-intlayer`). **next-intl** từng ngăn cản việc render tĩnh các trang Next.js. Nó cung cấp một trình hỗ trợ mang tên `setRequestLocale()`. Điều đó dường như đã được giải quyết một phần cho các tệp tập trung như `en.json` / `fr.json`, nhưng việc render tĩnh vẫn thất bại khi nội dung được chia thành các namespace như `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` có lẽ là tùy chọn phổ biến nhất vì nó là một trong những giải pháp i18n đầu tiên cho các ứng dụng JavaScript. Nó có nhiều plugin cộng đồng. Nó có cùng những nhược điểm chính như `next-intl`. Gói bundle đặc biệt nặng (~18kb cho `I18nProvider` + `useTranslation`, gấp khoảng 3 lần `next-intlayer`).

Các định dạng thông báo cũng khác nhau: `next-intl` sử dụng ICU MessageFormat, trong khi `i18next` sử dụng định dạng riêng của mình.

**(Next International)** (`next-international@1.3.1`):

`next-international` cũng giải quyết các vấn đề trên nhưng không khác nhiều so với `next-intl` hay `next-i18next`. Nó bao gồm `scopedT()` cho các bản dịch cụ thể theo namespace, nhưng việc sử dụng nó về cơ bản không ảnh hưởng đến kích thước gói bundle.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` thường được khen ngợi. Cá nhân tôi thấy quy trình `lingui extract` / `lingui compile` phức tạp hơn các lựa chọn thay thế, mà không có ưu điểm rõ ràng. Tôi cũng nhận thấy cú pháp không nhất quán gây nhầm lẫn cho AI (ví dụ: `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Các khuyến nghị

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` là khuyến nghị chính của tôi nếu bạn thích một API theo kiểu `t()`. Nó vận hành thanh thoát thông qua `next-translate-plugin`, tải các namespace qua `getStaticProps` với một trình tải Webpack / Turbopack. Nó cũng là tùy chọn nhẹ nhất ở đây (~2.5kb). Đối với việc phân namespace, việc định nghĩa các namespace theo từng trang hoặc route trong cấu hình được cân nhắc kỹ lưỡng và dễ bảo trì hơn so với các lựa chọn thay thế chính như **next-intl** hay **next-i18next**. Ở phiên bản `3.1.2`, tôi nhận thấy rằng việc render tĩnh không hoạt động; Next.js đã quay trở lại việc render động.

**(Intlayer)** (`next-intlayer@8.7.5`):

Tôi sẽ không đích thân đánh giá `next-intlayer` vì tính khách quan, vì đây là giải pháp của riêng tôi.

### Ghi chú cá nhân

Ghi chú này mang tính cá nhân và không ảnh hưởng đến kết quả benchmark. Trong thế giới i18n, bạn thường thấy sự đồng thuận xung quanh mẫu `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

Trong các ứng dụng React, việc đưa một hàm vào dưới dạng một `ReactNode`, theo quan điểm của tôi, là một anti-pattern. Nó cũng thêm vào sự phức tạp có thể tránh được và chi phí thực thi JavaScript (ngay cả khi hầu như không nhận thấy).
