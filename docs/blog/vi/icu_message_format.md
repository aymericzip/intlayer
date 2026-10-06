---
createdAt: 2026-09-02
updatedAt: 2026-10-03
priority: 8
title: "Định dạng thông điệp ICU: Cú pháp, Số nhiều và Select"
description: Tài liệu tham khảo thực tế về ICU MessageFormat, nội suy đối số, rẽ nhánh số nhiều và select, các danh mục số nhiều CLDR theo từng ngôn ngữ và lỗi phổ biến.
keywords:
  - định dạng thông điệp icu
  - icu messageformat
  - quy tắc số nhiều cldr
  - danh mục số nhiều
  - selectordinal
  - đa ngôn ngữ số nhiều
  - cú pháp thông điệp
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Định dạng thông điệp ICU: Cú pháp và những cạm bẫy thường gặp

ICU MessageFormat là cú pháp chuỗi cho phép bản dịch chứa logic rẽ nhánh của riêng nó: số nhiều, dạng theo giới tính, định dạng số và ngày tháng. Triết lý cốt lõi là ngữ pháp thuộc về dịch giả, chứ không phải của lập trình viên viết `if (count === 1)`. Bài viết này đề cập đến cú pháp cơ bản, các yếu tố phụ thuộc ngôn ngữ khiến các giải pháp đơn giản bị phá vỡ, và cách hệ sinh thái JavaScript xử lý vấn đề này.

## Mục lục

<TOC/>

## Vấn đề thực tế

Đây là đoạn mã mà hầu như bất kỳ ai cũng viết đầu tiên:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Cách này hoạt động với tiếng Anh nhưng lại thất bại ở hầu hết các ngôn ngữ khác:

- **Tiếng Nga và tiếng Ba Lan** cần ba hoặc bốn dạng ngữ pháp, không chỉ hai.
- **Tiếng Việt và tiếng Nhật** chỉ cần một dạng duy nhất, và khoảng trắng nối chuỗi thủ công là thừa thãi hoặc không tự nhiên.
- **Tiếng Ả Rập** cần sáu dạng số nhiều, và chính con số đó phải được hiển thị theo hệ thống chữ số của ngôn ngữ tương ứng.
- **Tiếng Pháp** đặt khoảng trắng không ngắt (non-breaking space) trước một số dấu câu, điều mà phép nối `+ " "` phá vỡ hoàn toàn.

Vấn đề sâu xa hơn là câu văn đã bị cắt thành từng mảnh vụn. Người dịch nhìn thấy từ `item` và `items` mà không có ngữ cảnh, đồng thời mất đi khả năng sắp xếp lại trật tự từ trong câu. ICU MessageFormat giải quyết vấn đề này bằng cách giữ trọn vẹn cả câu trong một chuỗi dịch duy nhất và cung cấp các toán tử rẽ nhánh cho người dịch.

## Đối số đơn giản

Đơn vị nhỏ nhất là một trình giữ chỗ (placeholder) nằm trong cặp ngoặc nhọn đơn:

```text
Hello, {name}!
```

Bạn truyền `{ name: "Alice" }` khi định dạng và nhận được `Hello, Alice!`. Dấu ngoặc nhọn là ký tự đặc biệt duy nhất; để hiển thị dấu ngoặc nhọn thực tế, hãy bao quanh nó bằng dấu nháy đơn: `'{'`.

Đó là toàn bộ tính năng nội suy (interpolation). Mọi thứ khác trong ICU đều được xây dựng dựa trên nền tảng này.

## Số nhiều (plural)

Toán tử `plural` lựa chọn nhánh dựa trên một giá trị số:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Ba điểm quan trọng cần ghi nhớ:

- **`#`** được thay thế bằng giá trị đã định dạng của `count` theo locale. Ví dụ: `1234` trở thành `1,234` trong `en-US` và `1.234` trong `vi-VN`.
- **Nhánh `other` là bắt buộc.** Mọi thư viện ICU sẽ báo lỗi hoặc không vượt qua bước kiểm tra nếu thiếu nó. Đây là nhánh dự phòng khi không có danh mục nào khớp.
- **`=0`, `=1`, … khớp với giá trị chính xác** và được đánh giá _trước_ các danh mục CLDR. Hãy dùng chúng cho các văn bản đặc thù ("Không có tin nhắn"), chứ không phải để thay thế cho `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` trừ `n` khỏi giá trị số trước khi phân loại danh mục và thay thế `#`. Thuộc tính này hữu ích cho các mẫu câu như "Alice và 3 người khác thích điều này":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Với `count: 4`, ký tự `#` sẽ hiển thị là `3`. `offset` rất hữu dụng nhưng mức độ hỗ trợ giữa các môi trường runtime có thể khác nhau, vì vậy hãy kiểm tra trước khi đưa vào sử dụng.

## Danh mục số nhiều phụ thuộc vào từng ngôn ngữ

Đây là phần khiến nhiều người nhầm lẫn nhất. Các tên danh mục `zero`, `one`, `two`, `few`, `many`, `other` không phải là các ô chứa chung áp dụng cho mọi ngôn ngữ. Mỗi ngôn ngữ sử dụng một _tập hợp con_ được xác định bởi [quy tắc số nhiều CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), và các quy tắc này dựa trên ngữ pháp, không dựa trên trực giác toán học đơn thuần.

| Ngôn ngữ     | Mã   | Các danh mục được dùng           | Tổng số |
| ------------ | ---- | -------------------------------- | ------- |
| Tiếng Việt   | `vi` | other                            | 1       |
| Tiếng Nhật   | `ja` | other                            | 1       |
| Tiếng Trung  | `zh` | other                            | 1       |
| Tiếng Anh    | `en` | one, other                       | 2       |
| Tiếng Đức    | `de` | one, other                       | 2       |
| Tiếng Pháp   | `fr` | one, many, other                 | 3       |
| Tiếng Séc    | `cs` | one, few, many, other            | 4       |
| Tiếng Ba Lan | `pl` | one, few, many, other            | 4       |
| Tiếng Nga    | `ru` | one, few, many, other            | 4       |
| Tiếng Ả Rập  | `ar` | zero, one, two, few, many, other | 6       |
| Tiếng Wales  | `cy` | zero, one, two, few, many, other | 6       |

Hai điểm cần lưu ý:

- **`one` không chỉ có nghĩa là số "1".** Trong tiếng Nga, `one` bao gồm 1, 21, 31, 101: bất kỳ số nào kết thúc bằng 1, ngoại trừ kết thúc bằng 11. Trong tiếng Pháp, số `0` cũng được xếp vào nhóm `one`.
- **Thêm danh mục vào văn bản nguồn tiếng Anh không mang lại tác dụng gì.** Bản tiếng Anh chỉ cần `one` và `other`; bản tiếng Ba Lan cần bốn nhánh, và cấu trúc đó phải nằm trong chuỗi tiếng Ba Lan. Mọi định dạng ép buộc tất cả ngôn ngữ dùng chung một cấu trúc khóa sẽ gây ra lỗi tại đây.

Bạn có thể kiểm tra trực tiếp hành vi của runtime mà không cần cài đặt thêm thư viện:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

Đối tượng `Intl.PluralRules` tích hợp sẵn dữ liệu CLDR trong tất cả trình duyệt hiện đại và Node.js. Hầu hết các thư viện hỗ trợ số nhiều CLDR đều gọi API nội tại này.

## select và selectordinal

`select` thực hiện rẽ nhánh dựa trên một chuỗi tùy ý: giới tính, vai trò người dùng, trạng thái hoặc gói dịch vụ.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Các khóa được so khớp theo từng ký tự và nhánh `other` cũng là bắt buộc ở đây. `select` là công cụ lý tưởng khi cấu trúc câu phụ thuộc vào giá trị enum, bởi các ngôn ngữ có các yếu tố ngữ pháp chịu ảnh hưởng từ enum rất khác nhau.

`selectordinal` có cấu trúc tương tự `plural`, nhưng áp dụng các quy tắc số **thứ tự** (thứ 1, thứ 2), vốn sử dụng bảng quy tắc khác với số đếm thông thường:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

Tiếng Anh sử dụng bốn danh mục cho số thứ tự (1st, 2nd, 3rd, 4th) dù chỉ sử dụng hai danh mục cho số đếm. Sự bất đối xứng này là lý do hai toán tử được tách biệt.

## Đối số số, ngày tháng và thời gian

ICU có khả năng định dạng trực tiếp giá trị được nội suy:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

Cú pháp hiện đại là **skeleton**, được giới thiệu từ ICU 60 với tiền tố `::`. Skeleton linh hoạt và biểu đạt phong phú hơn nhiều so với các tên kiểu truyền thống:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Mức độ hỗ trợ skeleton chưa đồng đều trong hệ sinh thái. FormatJS hỗ trợ đầy đủ, trong khi một số runtime khác chỉ chấp nhận các định dạng cũ như `number, currency` hoặc `date, long`. Hãy kiểm tra môi trường trước khi triển khai thực tế.

## Lồng ghép và khả năng đọc hiểu

Cú pháp ICU có tính kết hợp. Một nhánh số nhiều có thể chứa select, và select đó có thể chứa tiếp một nhánh số nhiều khác:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Đây là ví dụ kinh điển của ICU và cũng là minh chứng rõ nhất cho việc không nên lồng ghép quá sâu. Từ hai cấp độ trở lên, người dịch rất dễ nhầm lẫn dấu ngoặc và các trình biên tập TMS không còn hỗ trợ hiệu quả. Khuyến nghị lồng ghép tối đa hai cấp; nếu cần cấp thứ ba, hãy chia câu thành hai thông điệp riêng biệt.

## Hỗ trợ ICU trong các thư viện JavaScript

| Thư viện              | Mức hỗ trợ ICU        | Mã bạn viết trong thực tế                                           |
| --------------------- | --------------------- | ------------------------------------------------------------------- |
| react-intl (FormatJS) | Tự nhiên, đầy đủ      | Chuỗi ICU đầy đủ, bao gồm skeleton và thẻ rich-text                 |
| next-intl             | Tự nhiên              | Chuỗi ICU thông qua gói `intl-messageformat` của FormatJS           |
| i18next               | Cần plugin            | Hậu tố `key_one` / `key_other` và `{{name}}`; ICU qua `i18next-icu` |
| vue-i18n              | Một phần / riêng biệt | Nội suy `{name}` và các nhánh số nhiều ngăn cách bởi dấu gạch đứng  |
| Angular (`$localize`) | Tập con               | ICU `plural` / `select` trong template, trích xuất ra XLIFF         |

Một số ghi chú quan trọng:

- **Cú pháp mặc định của i18next không phải là ICU**, và điều này không hẳn là nhược điểm. Các khóa có hậu tố (`item_one`, `item_few`) ánh xạ tới các danh mục của `Intl.PluralRules` và thường dễ chỉnh sửa hơn trong tệp JSON phẳng. Tuy nhiên, nó không hỗ trợ `select` và rẽ nhánh lồng nhau, buộc bạn phải dùng `i18next-icu` hoặc tự viết logic trong code.
- **Cơ chế số nhiều của vue-i18n** mặc định dùng hàm quy tắc cho từng locale thay vì danh mục CLDR. Cơ chế này hoạt động tốt, nhưng quy tắc nằm ở cấu hình ứng dụng thay vì trong dữ liệu bản dịch.
- **FormatJS là chuẩn tham chiếu** trong thế giới JS. Khi nhắc đến "ICU MessageFormat" trong môi trường JavaScript, người ta thường ám chỉ tiêu chuẩn mà FormatJS chấp nhận.
- **Hỗ trợ đầy đủ ICU có chi phí về dung lượng bundle.** Trình phân tích cú pháp và xử lý skeleton tăng thêm khoảng 10 KB mã JavaScript nén. Xem [tại sao ICU không dành cho JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/why_icu_is_not_made_for_js.md).

## Cách Intlayer xử lý bài toán này

Intlayer không sử dụng DSL dựa trên chuỗi văn bản. Các toán tử rẽ nhánh là các hàm TypeScript trong tệp khai báo nội dung, nhờ đó cấu trúc luôn an toàn về kiểu dữ liệu và mỗi ngôn ngữ chỉ khai báo đúng các danh mục mà ngữ pháp của nó yêu cầu:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      vi: plural({
        other: "{{count}} vị trí tuyển dụng",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Locale Ba Lan → "5 ofert"
```

Sự tương ứng với các khái niệm ICU rất trực quan:

| Khái niệm trong ICU            | Tương đương trong Intlayer                         |
| ------------------------------ | -------------------------------------------------- |
| `{name}`                       | `insert("Hello {{name}}")`, hoặc tự động nhận diện |
| `{count, plural, …}`           | `plural({ one, few, many, other })`                |
| `{value, select, …}`           | `select({ draft, published, fallback })`           |
| nhánh giới tính trong `select` | `gender({ male, female, fallback })`               |
| nhánh boolean trong `select`   | `cond({ true, false })`                            |
| dải số tùy chỉnh (ngoài CLDR)  | `enu({ "0": …, ">5": …, fallback: … })`            |
| `{n, number, ::currency/EUR}`  | `useCurrency()(1234.5, { currency: "EUR" })`       |

`plural` chuyển giao việc phân loại danh mục cho `Intl.PluralRules`, nhờ đó bảng quy tắc CLDR ở trên được áp dụng nguyên vẹn. Việc định dạng luôn độc lập: số, ngày tháng, tiền tệ và danh sách được xử lý thông qua các [hook định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) thay vì bị nhúng thẳng vào văn bản thông điệp.

- [hook định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md)

Một số giới hạn cần biết:

- Intlayer yêu cầu bước biên dịch: compiler sẽ trích xuất các khai báo trong thời gian build. Nếu bạn muốn tải JSON thông thường động ở runtime, đó là mô hình khác.
- Hiện tại nhánh `plural` chưa hỗ trợ lồng trực tiếp `t()` bên trong nó; bạn cần bọc `plural` trong `t()`, chứ không làm ngược lại.
- Hệ sinh thái còn mới hơn so với i18next, số lượng tích hợp sẵn với các nền tảng TMS bên ngoài đang trong quá trình phát triển.

Với các dự án đang sở hữu sẵn chuỗi ICU thực tế, [bộ điều hợp tương thích react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md) có thể phân tích trực tiếp: `plural`, `select`, `selectordinal`, `#`, và các đối số truyền thống `number`, `date`, `time`. Skeleton và `offset:` chưa được hỗ trợ bởi bộ giải mã này nên cần được rà soát khi di chuyển dự án. [Bộ điều hợp i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md) xử lý dạng hậu tố (`key_one`, `key_male`) thông qua `Intl.PluralRules`.

- [bộ điều hợp tương thích react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md)
- [Bộ điều hợp i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md)

## Những lỗi phổ biến

- **Viết cứng logic số nhiều trong code JS.** Biểu thức `count === 1 ? a : b` trả về kết quả sai cho 8 trên 10 ngôn ngữ trong bảng trên. Một khi toán tử ba ngôi đã nằm trong mã nguồn, người dịch không thể điều chỉnh ngữ pháp.
- **Nối các đoạn dịch rời rạc.** Trật tự từ, sự hòa hợp ngữ pháp và khoảng cách dấu câu đều khác nhau giữa các ngôn ngữ. Luôn giữ trọn vẹn cả câu.
- **Bỏ quên nhánh `other`.** Đây là yêu cầu bắt buộc của quy chuẩn kỹ thuật, không phải tùy chọn. Hầu hết trình phân tích cú pháp sẽ báo lỗi, số còn lại sẽ không hiển thị gì.
- **Mặc định rằng các ngôn ngữ đều có cùng danh mục.** Bản nguồn tiếng Anh có `one` và `other` không đồng nghĩa bản tiếng Ba Lan chỉ có hai nhánh. Hãy để mỗi ngôn ngữ tự khai báo nhánh của riêng mình. Xem thêm [khai báo nội dung theo từng ngôn ngữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md).
- **Dùng `=1` thay vì `one`.** `=1` chỉ khớp với số 1 chính xác. Trong tiếng Nga, số 21 cần danh mục `one`, và quy tắc `=1` sẽ không bao giờ được kích hoạt.
- **Đặt `#` bên ngoài nhánh số nhiều.** Ký tự `#` chỉ có ý nghĩa thay thế đặc biệt bên trong `plural` hoặc `selectordinal`. Ở những vị trí khác, nó chỉ là ký tự thăng bình thường.
- **Quên rằng `#` đã được định dạng sẵn.** Nếu cần con số thô không có dấu phân tách hàng nghìn, hãy nội suy đối số bằng tên biến.

Kiểm tra và định dạng tin nhắn ICU của bạn với [Trình định dạng & Trình chỉnh sửa tin nhắn ICU](https://intlayer.org/icu-message-formatter) miễn phí:

<ClickToOpenIframe src="https://intlayer.org/icu-message-formatter" width="100%" height="700px" style="border:none;"/>

## Tài liệu tham khảo thêm

- [Trình định dạng & Trình chỉnh sửa tin nhắn ICU](https://intlayer.org/icu-message-formatter)
- [Tại sao ICU không dành cho JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/why_icu_is_not_made_for_js.md)
- [Nội dung số nhiều trong Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md)
- [Nội dung dựa trên select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/select.md)
- [Trình giữ chỗ chèn giá trị](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)
- [So sánh hiệu năng thư viện i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [react-i18next so với react-intl và Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/react-i18next_vs_react-intl_vs_intlayer.md)
- [Quốc tế hóa (i18n) là gì?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/what_is_internationalization.md)
