---
createdAt: 2026-09-09
updatedAt: 2026-09-10
title: "Lịch sử i18n trong JavaScript: Từ 2011 đến 2026"
description: Khám phá sự phát triển của quốc tế hóa frontend từ 2011 đến 2026. Tìm hiểu các mốc phát hành, thách thức kiến trúc và các cải tiến quan trọng trên React, Vue, Next.js, Angular, Svelte và Solid.
keywords:
  - lịch sử i18n
  - quốc tế hóa JavaScript
  - React i18n
  - Next.js i18n
  - Vue i18n
  - Angular i18n
  - Svelte i18n
  - Solid i18n
  - i18next
  - intlayer
slugs:
  - blog
  - history-of-js-internationalization
author: aymericzip
---

# Lịch sử Quốc tế hóa JavaScript (i18n)

Quốc tế hóa không phải là một khái niệm mới. Từ rất lâu trước khi JavaScript và web hiện đại phổ biến, phần mềm đã phải xử lý nhiều ngôn ngữ, tiền tệ, định dạng ngày tháng và quy ước theo từng khu vực. Các hệ điều hành đồ họa thời kỳ đầu như GEM và Mac OS đã giải quyết nhiều vấn đề này từ những năm 1980.

Những ý tưởng tương tự sau đó đã thâm nhập vào các framework backend. Ruby on Rails, Django, các framework Java và ứng dụng PHP đều phát triển các phương pháp tiếp cận riêng cho việc quốc tế hóa. Các vấn đề cơ bản tương đối rõ ràng:

- Bản dịch nên được lưu trữ ở đâu?
- Làm thế nào để định dạng ngày tháng, số và tiền tệ?
- Làm thế nào để xử lý dạng số nhiều và sự khác biệt về ngữ pháp?
- Làm thế nào để quyết định ngôn ngữ mà người dùng sẽ thấy?

Khi máy chủ đảm nhận việc render trang, mọi thứ diễn ra khá đơn giản. Ứng dụng có thể tải các bản dịch phù hợp, render HTML và gửi kết quả về trình duyệt.

> Cần lưu ý rằng PHP và GNU gettext từng là tiền đề cho mẫu helper `t()` mà sau này trở nên phổ biến khắp nơi trong JavaScript và JSX.

Sau đó, JavaScript bắt đầu làm chủ trình duyệt.

Khi các ứng dụng chuyển dịch từ các trang render trên máy chủ sang các ứng dụng client-side ngày càng phức tạp, quốc tế hóa cũng trở thành một bài toán của frontend. Trình duyệt bất ngờ phải gánh vác việc tải bản dịch, chuyển đổi ngôn ngữ, định dạng giá trị, xử lý số nhiều và cập nhật giao diện người dùng mà không cần tải lại trang.

Và điều đó đặt ra một câu hỏi mới:

**Làm thế nào để tạo ra một ứng dụng đa ngôn ngữ mà không phải gửi một lượng dữ liệu bản dịch và mã runtime khổng lồ đến từng người dùng?**

Câu hỏi đó đã định hình sự phát triển của JavaScript i18n trong hơn một thập kỷ qua.

Các giải pháp đã thay đổi đáng kể. Chúng ta đã đi từ các đối tượng JavaScript toàn cục và các lệnh gọi `t('some.key')`, đến các thư viện chuyên biệt cho từng framework, trích xuất lúc biên dịch (compile-time), các kiểu dữ liệu do TypeScript tạo ra, React Server Components, kỹ thuật loại bỏ mã thừa (tree-shaking), và cuối cùng là các cách tiếp cận dựa trên trình biên dịch (compiler-based) nơi các bản dịch được chuyển đổi thành mã JavaScript ngay trong quá trình build.

Bài viết này xem xét quá trình phát triển đó từ khoảng năm 2011 đến năm 2026: những gì mỗi thế hệ công cụ đã cố gắng giải quyết, những gì hiệu quả, những gì thất bại, và cách kiến trúc ứng dụng frontend đã định hình cách chúng ta xử lý i18n ngày nay.

![Hệ sinh thái thư viện quốc tế hóa JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Mục lục

<TOC/>

## Kỷ nguyên Web sơ khai: Quốc tế hóa JavaScript trước năm 2016

Để hiểu được vị thế của các công cụ i18n hiện đại ngày nay, chúng ta cần nhìn lại quá trình xây dựng web giữa những năm 2011 và 2015.

### Sự chuyển dịch xử lý sang phía Client

Vào đầu những năm 2010, quốc tế hóa chủ yếu là trách nhiệm của phía máy chủ. JavaScript phần lớn đóng vai trò là một lớp bổ trợ cho hiệu ứng động, xác thực biểu mẫu và các widget DOM nhỏ thông qua jQuery.

Khi các ứng dụng trang đơn (SPA) dần phổ biến cùng với Backbone.js, Knockout.js và AngularJS đời đầu, logic render được chuyển trực tiếp vào trình duyệt. Mã phía client đột nhiên cần hiển thị ngày tháng được bản địa hóa, định dạng tiền tệ, xử lý số nhiều và hoán đổi văn bản động mà không cần tải lại toàn bộ trang.

Tuy nhiên, môi trường trình duyệt năm 2011 chưa được trang bị đầy đủ cho thách thức này:

<AccordionGroup>
<Accordion header="Không có API quốc tế hóa nguyên bản">

Đặc tả ECMAScript Internationalization API (ECMA-402) chỉ được hoàn thiện vào tháng 12 năm 2012, giới thiệu đối tượng toàn cục `Intl`. Trước khi các nhà phát triển trình duyệt tích hợp `Intl`, ngay cả việc định dạng ngày tháng và số cơ bản cũng đòi hỏi các hàm tùy chỉnh hoặc các thư viện polyfill rất nặng.

</Accordion>
<Accordion header="Chưa có các công cụ đóng gói module hiện đại">

Các công cụ như Webpack vẫn còn ở giai đoạn sơ khai, và ESM chưa hề tồn tại trên trình duyệt. Các nhà phát triển tải script thông qua thẻ `<script>`, thường xuyên chèn bản dịch vào các đối tượng toàn cục như `window.translations = { ... }`.

</Accordion>
<Accordion header="Các gói dữ liệu JSON cồng kềnh">

Bản dịch được lưu trong các tệp JSON tập trung khổng lồ. Một người dùng ở Tokyo khi tải trang đích vẫn phải tải toàn bộ chuỗi văn bản của phần cài đặt tài khoản, bảng thanh toán và giao diện quản trị.

</Accordion>
</AccordionGroup>

### Làn sóng đầu tiên của các thư viện Client-Side

Từ năm 2012 đến 2015, nền tảng ban đầu của JavaScript i18n hiện đại đã được thiết lập:

<AccordionGroup>
<Accordion header="i18next (Tháng 1 năm 2012)">

Được tạo ra bởi Jan Mühlemann, `i18next` đã thiết lập khuôn mẫu cho các từ điển key-value runtime trong JavaScript. Thư viện này giới thiệu khả năng duyệt khóa, nội suy biến, các quy tắc số nhiều, cùng kiến trúc module linh hoạt cho bộ nhận diện ngôn ngữ và backend. Nó nhanh chóng trở thành tiêu chuẩn phổ biến trên vanilla JS và backend Node.js thời kỳ đầu.

</Accordion>
<Accordion header="vue-i18n (Tháng 5 năm 2014)">

Được tạo bởi Kazupon (Kazuya Kawaguchi), `vue-i18n` đã điều chỉnh việc quốc tế hóa tương thích trực tiếp với mô hình ràng buộc dữ liệu phản ứng của Vue.js, giới thiệu các chỉ thị mẫu (`v-t`) và helper `$t()`.

</Accordion>
<Accordion header="react-intl (Tháng 6 năm 2014)">

Được Yahoo! xây dựng như một phần của dự án FormatJS, `react-intl` mang các tiêu chuẩn ICU MessageFormat và API `Intl` của trình duyệt vào React thông qua các component khai báo như `<FormattedMessage>` và `<FormattedDate>`.

</Accordion>
<Accordion header="react-i18next (Tháng 12 năm 2015)">

Jan Mühlemann đưa `i18next` đến với cộng đồng React đang phát triển nhanh chóng, sử dụng Higher-Order Components (`withTranslation`) và context của React để render lại các component khi ngôn ngữ thay đổi.

</Accordion>
</AccordionGroup>

### Hạn chế của kỷ nguyên trước năm 2016

Mặc dù các công cụ này đã cho phép xây dựng các ứng dụng client đa ngôn ngữ, các hạn chế về mặt kiến trúc của thời kỳ đó đã tạo ra nhiều khó khăn dai dẳng:

<AccordionGroup>
<Accordion header="Khóa chuỗi dễ gãy (Brittle String Keys)">

Các tra cứu như `t('marketing.landing.hero.cta')` không cung cấp bất kỳ phản hồi tĩnh nào. Lỗi chính tả trong khóa sẽ thất bại âm thầm trong môi trường production, hiển thị nhãn trống hoặc mã định danh khóa thô cho người dùng cuối.

</Accordion>
<Accordion header="Chi phí phân tích cú pháp lúc Runtime">

Việc phân tích cú pháp thông điệp ICU và đánh giá nội suy dựa trên biểu thức chính quy (regex) lúc runtime làm tiêu tốn chu kỳ CPU trên các thiết bị di động.

</Accordion>
<Accordion header="Kích thước bundle phình to">

Nếu không có tính năng chia tách mã dựa trên tuyến đường hoặc component, tất cả các chuỗi bản dịch sẽ được tải cùng một lúc, làm suy giảm tốc độ tải trang ban đầu.

</Accordion>
<Accordion header="Sự mất kết nối giữa nhà phát triển và biên dịch viên">

Các từ điển được lưu trữ trong các tệp JSON tập trung cách xa các component hiển thị chúng, khiến các khóa rác không sử dụng và các bản dịch bị thiếu trở thành vấn đề thường xuyên xảy ra.

</Accordion>
</AccordionGroup>

## Kỷ nguyên Framework: Sự phát triển qua các hệ sinh thái

Từ năm 2016 đến 2026, kiến trúc frontend đã thay đổi sâu sắc. TypeScript trở thành tiêu chuẩn, kiến trúc dựa trên component trưởng thành, các công cụ đóng gói như Webpack, Vite và Turbopack giới thiệu khả năng chia tách mã, React Server Components chuyển việc render trở lại máy chủ, và các trình biên dịch bắt đầu phân tích mã ứng dụng.

Các tab sau đây trình bày cách mỗi framework và hệ sinh thái giải quyết những thách thức này, ghi nhận ngày phát hành, động lực cốt lõi và các đổi mới quan trọng trong các bảng so sánh. Trong toàn bộ các hệ sinh thái này, `react-intlayer` cùng các giải pháp tương đương (`next-intlayer`, `vue-intlayer`, `angular-intlayer`, `svelte-intlayer`, và `solid-intlayer`) là những triển khai hiệu năng cao được thiết kế riêng cho từng môi trường runtime.

<Tabs>

<Tab label="Core JavaScript" value="javascript">

| Bản phát hành đầu | Thư viện                             | Mục tiêu giải quyết                                                                                                                                     | Đổi mới quan trọng                                                                                                                                |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tháng 1 năm 2012  | `i18next`                            | Tiêu chuẩn hóa việc tra cứu từ điển lúc runtime cho trình duyệt và Node.js mà không bị ràng buộc framework.                                             | Kiến trúc runtime linh hoạt tách biệt việc dịch cốt lõi khỏi bộ tải, bộ nhận diện và bộ nhớ đệm.                                                  |
| Tháng 2 năm 2021  | `typesafe-i18n`                      | Ngăn chặn các lỗi runtime âm thầm do các chuỗi khóa không có kiểu dữ liệu gây ra.                                                                       | Các hàm dịch có kiểu dữ liệu đầy đủ được tạo trực tiếp từ các đối tượng dịch mà không cần phụ thuộc runtime.                                      |
| Tháng 10 năm 2023 | `paraglide` (`@inlang/paraglide-js`) | Loại bỏ việc tra cứu từ điển runtime, các bộ phân tích nặng nề và sự phình to của bundle.                                                               | Biên dịch thông điệp thành các module ECMAScript hỗ trợ tree-shaking và các hàm JS thuần túy.                                                     |
| Tháng 4 năm 2024  | `intlayer`                           | Thay thế các namespace khó duy trì, tránh rò rỉ nội dung giữa các trang, và khắc phục tình trạng thiếu an toàn kiểu dữ liệu trong kỷ nguyên TypeScript. | Đặt tệp `.content` trực tiếp tại nơi các hàm được gọi, tự động tạo kiểu TypeScript, và tích hợp sẵn CMS trực quan cùng công cụ CLI dịch thuật AI. |
| Tháng 6 năm 2025  | `wuchale`                            | Loại bỏ sự phiền toái khi phải trích xuất thủ công các chuỗi văn bản và đặt tên khóa dịch trong quá trình phát triển.                                   | Tiền xử lý cấp độ AST tự động phát hiện văn bản inline và biên dịch thành các hàm bản địa hóa không cần wrapper khi build.                        |

</Tab>

<Tab label="React" value="react">

| Bản phát hành đầu | Thư viện         | Mục tiêu giải quyết                                                                                                                                | Đổi mới quan trọng                                                                                                                                            |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tháng 6 năm 2014  | `react-intl`     | Tiêu chuẩn hóa định dạng số, ngày tháng, tiền tệ và số nhiều phức tạp trong React.                                                                 | Các component khai báo (`<FormattedMessage>`, `<FormattedDate>`) hiện thực hóa các tiêu chuẩn ICU MessageFormat và ECMA-402.                                  |
| Tháng 12 năm 2015 | `react-i18next`  | Cung cấp liên kết chuẩn React cho `i18next` với khả năng re-render phản ứng.                                                                       | Phát triển cùng React từ Higher-Order Components đến nội suy JSX `<Trans>` và hook `useTranslation`.                                                          |
| Tháng 1 năm 2018  | `@lingui/react`  | Giảm bớt dung lượng bundle JavaScript gây ra bởi các bộ phân tích ICU lúc runtime.                                                                 | Macro Babel/SWC lúc biên dịch giúp đóng gói `<Trans>` và `t` thành các mảng chỉ mục nhỏ gọn khi build.                                                        |
| Tháng 12 năm 2020 | `use-intl`       | Mang lại giải pháp nhẹ nhàng, ưu tiên hook và an toàn kiểu dữ liệu thay thế cho các thư viện React i18n cũ.                                        | Các hook `useTranslations` và `useFormatter` trực quan cùng khả năng tích hợp TypeScript sâu sắc.                                                             |
| Tháng 2 năm 2021  | `@tolgee/react`  | Loại bỏ vòng phản hồi chậm trễ giữa các nhà phát triển, biên dịch viên và nhà thiết kế.                                                            | Chỉnh sửa trực tiếp trong ngữ cảnh trình duyệt, cho phép người dùng Alt-click vào văn bản để sửa bản dịch tại chỗ và chụp ảnh màn hình.                       |
| Tháng 4 năm 2024  | `react-intlayer` | Cung cấp triển khai Intlayer hiệu năng cao dành riêng cho vòng đời component của React, loại bỏ các từ điển JSON tập trung và namespace cồng kềnh. | Hook `useIntlayer` hiệu năng cao cho quá trình render của React, tự động tạo kiểu TypeScript, tree-shaking theo từng component, và đồng bộ hóa CMS trực quan. |
| Tháng 7 năm 2024  | `gt-react`       | Tự động hóa việc xuất tệp thủ công, bàn giao biên dịch viên và bảo trì bản dịch.                                                                   | Bản địa hóa AI tự động trên nền tảng cloud trực tiếp bên trong các component React với quy trình dịch máy.                                                    |
| Tháng 8 năm 2025  | `@wuchale/jsx`   | Loại bỏ việc đặt tên khóa thủ công và các hook dịch khuôn mẫu trong JSX của React.                                                                 | Chuyển đổi AST tự động trích xuất các node văn bản JSX thô và biên dịch thành các kết quả bản địa hóa tương đương.                                            |

</Tab>

<Tab label="Next.js" value="nextjs">

| Bản phát hành đầu | Thư viện                                    | Mục tiêu giải quyết                                                                                                                   | Đổi mới quan trọng                                                                                                                                                                                    |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tháng 11 năm 2018 | `next-i18next`                              | Hỗ trợ SSR và SSG với `i18next` trong Next.js Pages Router mà không gây ra hiện tượng waterfall phía client.                          | `serverSideTranslations` và `appWithTranslation` chuyển các namespace bản địa hóa vào props của trang.                                                                                                |
| Tháng 12 năm 2019 | `next-translate`                            | Đơn giản hóa cấu hình và giảm kích thước bundle trong các ứng dụng Next.js Pages Router.                                              | Plugin Webpack loader tự động chỉ chèn các namespace bản dịch cần thiết cho từng trang.                                                                                                               |
| Tháng 11 năm 2020 | `next-intl`                                 | Thiết kế lại i18n cho Next.js với App Router, React Server Components (RSC) và streaming SSR.                                         | Tích hợp nguyên bản với middleware của Next.js App Router, Server Actions và Server Components bất đồng bộ mà không cần JS ở client.                                                                  |
| Tháng 7 năm 2022  | `next-international`                        | Tối đa hóa an toàn kiểu dữ liệu TypeScript với chi phí bundle client tối thiểu cho Next.js.                                           | Tạo kiểu nghiêm ngặt cho các khóa có phạm vi với các adapter gọn nhẹ cho App Router và Pages Router.                                                                                                  |
| Tháng 4 năm 2024  | `paraglide-next` (`@inlang/paraglide-next`) | Đưa các thông điệp biên dịch không cần runtime vào Next.js App Router và Pages Router.                                                | Định tuyến middleware kết hợp với các hàm thông điệp hỗ trợ tree-shaking, tránh việc phân tích JSON runtime trong RSC và bundle client.                                                               |
| Tháng 4 năm 2024  | `next-intlayer`                             | Cung cấp adapter Server Component hiệu năng cao cho Next.js App Router và Pages Router mà không cần truyền hàm `t()` dưới dạng props. | Adapter Server Component nguyên bản cho phép gọi trực tiếp `useIntlayer` trong các Server Component đồng bộ (như Navbar) mà không cần prop-drilling, kết hợp render máy chủ tức thì và CMS trực quan. |
| Tháng 9 năm 2024  | `gt-next`                                   | Tự động hóa việc tạo nội dung đa ngôn ngữ và định tuyến bản địa hóa động trong Next.js bằng dịch thuật AI.                            | Tích hợp App Router kết hợp dịch máy dựa trên đám mây với edge middleware và các lớp bộ nhớ đệm của Next.js.                                                                                          |

</Tab>

<Tab label="Vue & Nuxt" value="vue">

| Bản phát hành đầu | Thư viện       | Mục tiêu giải quyết                                                                                                                  | Đổi mới quan trọng                                                                                                                                                       |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tháng 5 năm 2014  | `vue-i18n`     | Cung cấp giải pháp quốc tế hóa phản ứng chuẩn mực cho các ứng dụng Vue.                                                              | Tích hợp tính phản ứng sâu sắc, chỉ thị mẫu (`v-t`), helper `$t`, và các khối tùy chỉnh `<i18n>` trong Single-File Component.                                            |
| Tháng 11 năm 2017 | `@nuxt/i18n`   | Xử lý định tuyến URL bản địa hóa, thẻ SEO hreflang và hydrat hóa SSR trong Nuxt.                                                     | Module định tuyến full-stack tạo các route bản địa hóa, tiêu đề meta SEO và tải phân đoạn lười (lazy-loading).                                                           |
| Tháng 8 năm 2019  | `fluent-vue`   | Xử lý giống ngữ pháp phức tạp, biến cách và cấu trúc ngôn ngữ bất đối xứng trong Vue.                                                | Tích hợp cú pháp Mozilla Project Fluent vào Vue, tránh các đoạn mã điều kiện phức tạp cho các biến thể ngôn ngữ.                                                         |
| Tháng 4 năm 2025  | `vue-intlayer` | Cung cấp triển khai Intlayer hiệu năng cao được thiết kế cho Vue 3 Composition API và Nuxt mà không gây xung đột namespace toàn cục. | Composable `useIntlayer` được tùy biến cho việc theo dõi phản ứng của Vue 3, định phạm vi component trực tiếp, tự động hoàn thiện TypeScript và biên tập viên trực quan. |

</Tab>

<Tab label="Angular" value="angular">

| Bản phát hành đầu | Thư viện            | Mục tiêu giải quyết                                                                                                         | Đổi mới quan trọng                                                                                                                                  |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tháng 2 năm 2017  | `ngx-translate`     | Cung cấp bản dịch động lúc runtime trong Angular mà không cần triển khai các gói bundle riêng biệt cho từng ngôn ngữ.       | `TranslateService` và pipe `translate` cho phép tải bản dịch động và chuyển đổi ngôn ngữ lúc runtime.                                               |
| Tháng 7 năm 2019  | `@ngneat/transloco` | Giải quyết các điểm nghẽn hiệu năng, thiếu tính phân tách phạm vi và các tính năng còn thiếu trong các thư viện Angular cũ. | Chỉ thị cấu trúc (`*transloco`), bản dịch có phạm vi cho các module lazy-loaded, hỗ trợ SSR và công cụ trích xuất CLI.                              |
| Tháng 9 năm 2019  | `@angular/localize` | Hiện đại hóa hệ thống i18n tích hợp sẵn của Angular để tránh phải biên dịch lại TypeScript cho từng ngôn ngữ.               | Tagged template literals với `$localize` được chèn dưới dạng bước xử lý nhanh sau khi build trong Ivy engine.                                       |
| Tháng 2 năm 2021  | `@tolgee/ngx`       | Tích hợp dịch thuật cộng tác theo ngữ cảnh và chụp ảnh màn hình vào quy trình phát triển Angular.                           | Các pipe và directive của Angular kết nối trực tiếp với Tolgee để bản địa hóa trực tiếp trên trình duyệt.                                           |
| Tháng 4 năm 2025  | `angular-intlayer`  | Cung cấp triển khai Intlayer hiệu năng cao dành riêng cho Angular hiện đại (Signals, component độc lập và SSR).             | Tích hợp nội dung phản ứng dựa trên Signal cho cơ chế phát hiện thay đổi của Angular hiện đại, tiêm phụ thuộc độc lập và đồng bộ hóa CMS trực quan. |

</Tab>

<Tab label="Svelte & SvelteKit" value="svelte">

| Bản phát hành đầu | Thư viện          | Mục tiêu giải quyết                                                                        | Đổi mới quan trọng                                                                                                                   |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Tháng 7 năm 2018  | `svelte-i18n`     | Cung cấp thư viện quốc tế hóa phản ứng phù hợp với các reactive store của Svelte.          | Tra cứu `$t` dựa trên store đảm bảo cập nhật DOM chi tiết và chính xác khi thay đổi locale.                                          |
| Tháng 12 năm 2021 | `sveltekit-i18n`  | Xử lý tải bản dịch theo tuyến đường và SSR một cách gọn gàng trong các ứng dụng SvelteKit. | Kiến trúc bộ tải module chỉ lấy các bản dịch và trình định dạng cần thiết cho tuyến đường SvelteKit đang hoạt động.                  |
| Tháng 11 năm 2021 | `@tolgee/svelte`  | Cho phép bản địa hóa theo ngữ cảnh trong các ứng dụng Svelte.                              | Liên kết store Svelte tích hợp với giao diện dịch thuật ngữ cảnh Tolgee và tự động tạo ảnh chụp màn hình.                            |
| Tháng 4 năm 2025  | `svelte-intlayer` | Cung cấp triển khai Intlayer hiệu năng cao được thiết kế riêng cho Svelte 5 và SvelteKit.  | Liên kết nội dung phản ứng phù hợp với Svelte 5 Runes (`$state`), khai báo `.content` theo component, và chỉnh sửa CMS trực quan.    |
| Tháng 7 năm 2025  | `@wuchale/svelte` | Loại bỏ mã khai báo từ điển và nhập các hàm `$t` trong các component Svelte.               | Bộ tiền xử lý Svelte phân tích cú pháp template lúc build và biên dịch các node văn bản thành kết quả bản địa hóa không cần wrapper. |

</Tab>

<Tab label="SolidJS" value="solid">

| Bản phát hành đầu | Thư viện                 | Mục tiêu giải quyết                                                                       | Đổi mới quan trọng                                                                                                                              |
| ----------------- | ------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Tháng 9 năm 2021  | `@solid-primitives/i18n` | Cung cấp một primitive i18n chuẩn mực phù hợp với tính phản ứng tinh chỉnh của SolidJS.   | Bộ giải quyết bản dịch phản ứng dựa trên Signal cập nhật các node DOM mà không cần Virtual DOM hay re-render thừa thãi.                         |
| Tháng 4 năm 2025  | `solid-intlayer`         | Cung cấp triển khai Intlayer hiệu năng cao được thiết kế riêng cho SolidJS và SolidStart. | Liên kết nội dung tương thích với Signal mà không tốn chi phí Virtual DOM, tự động gợi ý kiểu TypeScript và tích hợp trình soạn thảo trực quan. |
| Tháng 6 năm 2026  | `@lingui/solid`          | Mở rộng khả năng trích xuất macro lúc biên dịch và hỗ trợ ICU MessageFormat sang SolidJS. | Các chuyển đổi macro thích ứng với tính phản ứng của Solid, biên dịch thông điệp thành các cấu trúc runtime nhỏ gọn.                            |

</Tab>

</Tabs>

## Bốn kỷ nguyên kiến trúc của JavaScript i18n

![Lịch sử các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

Nhìn lại mười lăm năm phát triển, chúng ta có thể phân loại lịch sử quốc tế hóa JavaScript thành bốn kỷ nguyên kiến trúc rõ rệt:

<AccordionGroup>
<Accordion header="1. Kỷ nguyên Từ điển Runtime (2011 đến 2017)">

Được đại diện bởi `i18next`, `react-intl`, và `vue-i18n`. Ứng dụng tải các danh mục JSON tĩnh vào bộ nhớ, và các hàm runtime so khớp các chuỗi khóa với các đối tượng lồng nhau. Việc xử lý số nhiều và nội suy được thực hiện trên trình duyệt thông qua biểu thức chính quy và các bộ phân tích ICU runtime.

</Accordion>
<Accordion header="2. Kỷ nguyên Macro lúc biên dịch và Type Safety (2018 đến 2021)">

Được đại diện bởi `lingui`, `next-translate`, `transloco`, và `typesafe-i18n`. Các nhà phát triển nhận ra sự suy giảm hiệu năng do phân tích runtime và sự lỏng lẻo của các khóa không có kiểu dữ liệu. Macro Babel đã trích xuất các thông điệp tại thời điểm build, plugin đóng gói phân chia từ điển theo từng trang, và trình biên dịch TypeScript bắt đầu kiểm tra các tham số bản dịch.

</Accordion>
<Accordion header="3. Kỷ nguyên Server Component và Streaming (2022 đến 2024)">

Được đại diện bởi `next-intl`, `next-international`, và các adapter RSC đầu tiên. Với sự ra đời của React Server Components và Next.js App Router, mục tiêu chuyển sang việc render nội dung bản địa hóa trên máy chủ mà không phải gửi các từ điển dịch thuật hay mã runtime i18n về trình duyệt.

</Accordion>
<Accordion header="4. Kỷ nguyên Trình biên dịch hiện đại và Nội dung hợp nhất (2024 đến 2026)">

Được đại diện bởi `paraglide`, `intlayer`, và `wuchale`. Các công cụ hiện đại xem việc quốc tế hóa không đơn thuần là thay thế chuỗi văn bản, mà là một kiến trúc nội dung tích hợp. Trình biên dịch chuyển đổi trực tiếp các thông điệp thành các hàm mã hỗ trợ tree-shaking, các khai báo nội dung được đặt cùng với các component, và trình soạn thảo trực quan, công cụ MCP cùng quy trình dịch AI tự động được tích hợp trực tiếp vào quy trình làm việc của nhà phát triển. Trong mô hình này, Intlayer tách biệt việc khai báo nội dung và tạo kiểu tự động khỏi việc phân phối runtime, cung cấp các giải pháp chuyên dụng, hiệu năng cao (`react-intlayer`, `next-intlayer`, `vue-intlayer`, `angular-intlayer`, `svelte-intlayer`, và `solid-intlayer`) được thiết kế riêng cho từng framework.

</Accordion>
</AccordionGroup>

## Kết luận: Cân bằng giữa DX, Hiệu năng và Làn sóng AI

Trải qua mười lăm năm và bốn làn sóng kiến trúc khác nhau, thách thức lớn nhất của việc quốc tế hóa JavaScript vẫn không đổi: dung hòa trải nghiệm của nhà phát triển (DX) và khả năng duy trì mã nguồn lâu dài trong khi vẫn mang lại hiệu năng tối ưu nhất phía client.

Những gì bắt đầu từ các biến toàn cục và các tệp JSON tập trung cồng kềnh đã dần trưởng thành thành nội dung đồng vị với component, an toàn kiểu TypeScript tự động, render phía máy chủ không có waterfall, và loại bỏ mã thừa lúc build time.

### Làn sóng AI và mô hình SaaS truyền thống

Một chất xúc tác mang tính quyết định trong những năm gần đây là khả năng tạo bản dịch AI tự động, điều này đang thách thức trực tiếp các mô hình kinh doanh truyền thống của các nền tảng bản địa hóa (TMS).

Trước đây, việc tập trung nội dung vào các tệp JSON nguyên khối là một sự thỏa hiệp để dễ dàng tích hợp với các Hệ thống Quản lý Bản dịch (TMS). Một kho lưu trữ tập trung duy nhất cung cấp cho các biên dịch viên và các nền tảng TMS bên thứ ba một mục tiêu xuất nhập rõ ràng. Tuy nhiên, sự tiện lợi này cho các dịch vụ bên ngoài lại đi kèm một cái giá rất đắt về mặt kiến trúc đối với các nhà phát triển: xung đột git merge liên tục giữa các nhánh tính năng, các khóa rác khó theo dõi, thiếu ngữ cảnh cấp độ component, và các namespace toàn cục phức tạp.

Với sự xuất hiện của AI tạo sinh và các công cụ biên dịch hiện đại, Trải nghiệm Nhà phát triển (DX) đã giành lại ưu thế. Các công cụ build và CLI giờ đây có thể tự động khám phá, kiểm tra tính hợp lệ và dịch các tệp nội dung nằm cạnh component, loại bỏ nhu cầu phải hy sinh kiến trúc mã nguồn sạch sẽ vì quy trình dịch thuật.

Trong hơn một thập kỷ, các nền tảng thương mại đã xây dựng nguồn doanh thu định kỳ xoay quanh sự phiền toái thủ công của TMS:

- Các giải pháp như **Locize** (nền tảng SaaS thương mại phía sau `i18next`) và **Crowdin** (nhà tài trợ và đối tác tích hợp chính cho `vue-i18n`, `next-intl`, `use-intl`, và `lingui`) tập trung mô hình kinh doanh vào việc lưu trữ bản dịch, giới hạn gói đăng ký theo cấp và tính phí theo số lượng từ.
- Do các nền tảng truyền thống này kiếm tiền dựa trên khối lượng và quy trình dịch thủ công, họ có rất ít động lực kinh tế để tự động hóa quy trình dịch thuật đầu-cuối hoàn toàn miễn phí ngay trong chuỗi công cụ của nhà phát triển.

### Làn sóng AI mới so với Chi phí trực tiếp từ nhà cung cấp

Khi các Mô hình Ngôn ngữ Lớn (LLM) hiện đại hạ giá thành dịch thuật xuống chỉ còn một phần nhỏ của một xu đồng thời tăng độ chính xác về mặt ngôn ngữ, một thế hệ công cụ thương mại mới đã xuất hiện nhằm chiếm lĩnh thị trường này:

- Các nền tảng như Paraglide với **linguo.dev** hoặc **General Translation** (`gt-react`, `gt-next`) đã cố gắng đón đầu làn sóng AI bằng cách đưa ra các gói đăng ký thuê bao mới cùng các dịch vụ đám mây trung gian độc quyền.
- Ngược lại, **Intlayer** cung cấp khả năng dịch AI tự động trực tiếp thông qua CLI của mình, cho phép các đội ngũ kỹ sư kết nối khóa API của chính họ (như OpenAI, Anthropic, Mistral, hoặc Google Gemini). Hoàn toàn không có phí phụ thu, không chiết khấu, không ràng buộc nhà cung cấp, hoạt động hoàn toàn dựa trên chi phí gốc trực tiếp từ nhà cung cấp AI mà bạn lựa chọn.

### Hơn cả i18n: Một hệ thống nội dung đa ngôn ngữ toàn diện

Sau cùng, phát triển web hiện đại đã tiến xa hơn rất nhiều so với việc chỉ thay thế các chuỗi ký tự đơn giản. Các ứng dụng ngày nay không chỉ cần dịch các từ đơn lẻ như `"Submit"` hay `"Log In"`, mà còn đòi hỏi nội dung phong phú, linh hoạt và có cấu trúc xuyên suốt các hành trình phức tạp của người dùng.

Intlayer tiếp cận vấn đề này không phải như một công cụ tra cứu khóa chuỗi đơn thuần, mà là một hệ thống nội dung đa ngôn ngữ toàn diện. Với sự hỗ trợ hạng nhất cho các tài liệu Markdown, cấu trúc HTML, các schema dữ liệu lồng nhau và khả năng chỉnh sửa trực quan mượt mà qua Visual CMS, Intlayer kết nối kỹ thuật mã nguồn, tự động hóa quy trình AI và quản lý nội dung.

Để tìm hiểu các so sánh kiến trúc sâu sắc hơn và các hướng dẫn chuyển đổi thực tế, hãy khám phá các tài liệu sau:

- [Trình biên dịch so với Quốc tế hóa khai báo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [Quốc tế hóa theo từng Component so với Tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [Hiệu năng và Thử nghiệm thực tế](https://intlayer.org/doc/benchmark)
- [Bộ điều hợp tương thích của Intlayer](https://intlayer.org/doc/concept/compatibility)
