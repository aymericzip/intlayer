---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Tại sao ICU MessageFormat không dành cho JavaScript
description: "ICU MessageFormat ban đầu được thiết kế cho Java và C++. Trên trình duyệt, hỗ trợ đầy đủ phải tải thêm khoảng 10 KB mã parser. Nguồn gốc chi phí này và các giải pháp thay thế."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - dung lượng bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - đa dạng hóa dạng số nhiều i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Tại sao ICU MessageFormat không dành cho JavaScript

ICU MessageFormat là một tiêu chuẩn chất lượng. Nó hoàn chỉnh, quen thuộc với các dịch giả và được hầu hết các hệ thống quản lý dịch thuật (TMS) hỗ trợ. Tuy nhiên, vấn đề nằm ở môi trường runtime mà nó hướng tới khi ra đời. ICU bắt nguồn từ C++ và Java, nơi một parser và formatter tin nhắn đầy đủ chỉ chiếm chi phí rất nhỏ so với phần còn lại của ứng dụng. Trong bundle của trình duyệt, chi phí này phải trả giá trên mỗi lượt tải trang.

Bài viết này phân tích nguồn gốc của ICU, lý do tại sao cú pháp của nó trở nên nặng nề khi xử lý số nhiều, và tại sao việc tương thích toàn diện lại làm tăng dung lượng cho bất kỳ thư viện i18n JavaScript nào. Nếu bạn cần tra cứu cú pháp cụ thể, hãy xem trước [tài liệu tham khảo ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md).

- [Tài liệu tham khảo ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md)

<TOC/>

## Từ IBM đến Unicode Consortium

ICU là viết tắt của _International Components for Unicode_. Cú pháp định dạng tin nhắn của nó bắt đầu từ Java: Taligent, một liên doanh giữa Apple và IBM, đã xây dựng các lớp quốc tế hóa cho JDK 1.1 (1997), bao gồm `java.text.MessageFormat`. IBM tiếp tục phát triển chúng thành ICU4J, chuyển ngữ sang C/C++ thành ICU4C và mở mã nguồn vào năm 1999. Năm 2016, dự án ICU chuyển sang trực thuộc Unicode Consortium, tổ chức cũng đồng thời duy trì kho dữ liệu bản địa CLDR mà ICU dựa vào.

### Ứng dụng ban đầu

Mục tiêu phục vụ chính là phần mềm máy chủ và máy tính để bàn: các ứng dụng doanh nghiệp Java, sản phẩm của IBM và sau này là hệ điều hành. Các chuỗi thông điệp được lưu trong tệp `.properties` của Java được nạp qua `ResourceBundle`, hoặc trong định dạng gói tài nguyên riêng của ICU cho C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

Phiên bản JDK ban đầu chưa có từ khóa `plural`. Nó sử dụng `choice` với các khoảng số (`{0,choice,0#no files|1#one file|1<{0} files}`), vốn chỉ phù hợp với các ngôn ngữ có cách chia số nhiều tương tự tiếng Anh. ICU đã bổ sung cú pháp `plural` dựa trên các quy tắc CLDR vào năm 2008 (ICU 4.0) và thêm `select` vào năm 2010 (ICU 4.4).

### Điểm khác biệt so với `.po`

Mọi người thường nhầm lẫn ICU với gettext, nhưng đây là hai trường phái hoàn toàn riêng biệt. Tệp `.po` bắt nguồn từ GNU gettext (C, Linux, sau đó là PHP và Python). Một mục trong `.po` chỉ chứa các cặp `msgid` / `msgstr` đơn giản, và dạng số nhiều được xác định bởi một biểu thức C ở đầu tệp (`Plural-Forms: nplurals=2; plural=(n > 1);`). Không có rẽ nhánh bên trong chuỗi tin nhắn. Ngược lại, ICU đặt logic rẽ nhánh trực tiếp bên trong chuỗi, cho phép một tin nhắn duy nhất có thể kết hợp `plural`, `select` và định dạng số.

### ICU đang chạy ở đâu hiện nay

ICU4C được tích hợp sẵn trong Android, iOS, macOS, Windows, Node.js cũng như các engine JavaScript của Chrome và Firefox. Các API `Intl` tiêu chuẩn của trình duyệt phần lớn được xây dựng dựa trên nó. Như vậy, trình duyệt vốn đã có sẵn các quy tắc số nhiều và định dạng ngày tháng, số của ICU. Thứ mà trình duyệt không có là bộ parser tin nhắn: `Intl.MessageFormat` hiện vẫn chỉ là đề xuất giai đoạn đầu tại TC39, được thiết kế dựa trên cú pháp MessageFormat 2 mới hơn và không tương thích ngược với ICU MessageFormat 1.

Lịch sử đó giải thích các quyết định thiết kế:

- **Hướng đến môi trường runtime máy chủ và desktop.** Việc parse một chuỗi tin nhắn khi chạy ở đó có chi phí không đáng kể, và thư viện được cài đặt một lần trên hệ thống chứ không phải do từng người dùng tải về qua mạng.
- **Là một DSL nhúng trong chuỗi.** Phân nhánh, định dạng số, ngày tháng và các cấu trúc lồng nhau đều nằm chung trong một cú pháp mà người dịch có thể chỉnh sửa mà không cần đụng vào mã nguồn.
- **Hướng tới tính toàn vẹn tuyệt đối.** Mọi biến thể ngữ pháp mà dịch giả cần đều có toán tử tương ứng.

Không có quyết định nào trong số này là sai lầm. Chúng chỉ dựa trên một giả định về môi trường hoạt động hoàn toàn khác với trình duyệt web.

## Cú pháp số nhiều quá dài dòng

Cấu trúc phổ biến nhất của ICU cũng chính là cấu trúc rườm rà nhất. Một bộ đếm có trường hợp bằng 0 trông như sau:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Cú pháp này đòi hỏi tên tham số, từ khóa `plural`, nhãn cho từng nhánh, các dấu ngoặc nhọn lồng nhau và ký tự `#` như một token đặc biệt chỉ hoạt động bên trong các nhánh số nhiều. Nếu thêm yếu tố giống ngữ pháp (gender) của chủ ngữ, tin nhắn sẽ tiếp tục lồng nhau:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Chín trong số mười lăm dòng mã chỉ đơn thuần là bộ khung cú pháp. Tiếng Ba Lan yêu cầu bốn nhánh số nhiều cho mỗi nhánh trong số ba nhánh giới tính đó, khiến chuỗi dịch trở thành một khối ngoặc nhọn chằng chịt, nơi chỉ cần thiếu một dấu `}` là toàn bộ tin nhắn bị lỗi, và thường chỉ được phát hiện khi ứng dụng đang chạy (runtime).

Trong JavaScript, cấu trúc này hoàn toàn có thể được biểu diễn dưới dạng dữ liệu thuần túy: một đối tượng có các khóa là các danh mục số nhiều, được kiểm tra bởi hệ thống kiểu dữ liệu và trình soạn thảo, không cần bất kỳ parser nào đứng giữa tệp và giá trị.

## Tính toàn diện đi kèm với chi phí dung lượng

ICU bao quát một phạm vi rất rộng:

- `plural` với các trường hợp khớp chính xác (`=0`) và độ dời (`offset:`)
- `selectordinal` với bảng số thứ tự CLDR riêng biệt
- `select` hỗ trợ lồng nhau không giới hạn độ sâu
- Các tham số `number`, `date` và `time`, ở định dạng truyền thống (`number, currency`) hoặc định dạng skeleton (`::currency/EUR compact-short`)
- Các quy tắc thoát ký tự và dấu ngoặc kép (`'{'`, `''`)
- Thẻ rich-text trong một số bản cài đặt (`<b>…</b>`)

Một thư viện muốn tương thích 1:1 với ICU buộc phải đóng gói toàn bộ các mô-đun này, vì nó không thể biết trước trong quá trình build xem tin nhắn của bạn sẽ dùng tính năng nào. Trong thực tế, điều đó đòi hỏi:

1. **Một parser** để chuyển chuỗi thành AST, bao gồm xử lý lỗi cho các dấu ngoặc sai cú pháp.
2. **Một parser skeleton** cho cú pháp `::` của số và ngày tháng, vốn là một ngôn ngữ nhỏ độc lập.
3. **Một formatter** duyệt qua AST và ánh xạ từng nút sang `Intl.PluralRules`, `Intl.NumberFormat` và `Intl.DateTimeFormat`.

Phần thứ ba rất nhẹ vì JavaScript hiện đại đã tích hợp sẵn logic CLDR trong `Intl`. Ngược lại, hai phần đầu tồn tại chỉ để đọc cú pháp chuỗi. Trong gói `intl-messageformat` của FormatJS, bản tham chiếu làm nền tảng cho `react-intl` và `next-intl`, khối mã này chiếm khoảng **10 KB mã JavaScript nén** gửi tới mọi người truy cập, ngay trước khi ứng dụng tải bất kỳ nội dung dịch nào.

Hầu hết các ứng dụng chỉ sử dụng một phần nhỏ: chèn biến `{name}` và một vài khối `plural`. Thế nhưng chúng vẫn phải tải về toàn bộ parser cho skeletons, số thứ tự và offset, bởi vì một chuỗi được parse khi runtime khiến bundler không thể biết phần nào thừa để loại bỏ.

## next-intl cũng gặp phải vấn đề tương tự

Đây không chỉ là nhận định trên lý thuyết. `next-intl`, một trong những thư viện dựa trên ICU phổ biến nhất, cũng đã đi đến cùng kết luận. Trong phiên bản 4.8 (tháng 1 năm 2026), dự án đã thêm tùy chọn thử nghiệm `precompile`. Tùy chọn này parse các tin nhắn ICU trong lúc build thành một AST nhỏ gọn và thay thế parser runtime bằng một bộ đánh giá (evaluator) tối giản. Dự án báo cáo rằng việc kích hoạt cờ này giúp **loại bỏ khoảng 9 KB mã JavaScript nén**.

Tuy nhiên, sự đánh đổi này cũng bộc lộ giới hạn của phương pháp: `t.raw` không hoạt động khi bật tính năng biên dịch trước, vì chuỗi ICU nguyên bản không còn tồn tại ở runtime. Một khi bạn dừng parse trong trình duyệt, bạn thực chất không còn phân phối ICU nguyên bản nữa. Bạn đang phân phối một biểu diễn đã biên dịch, và cú pháp chuỗi chỉ đóng vai trò là định dạng khi viết.

Đến lúc đó, câu hỏi đặt ra là hoàn toàn hợp lý: nếu trình duyệt không bao giờ đọc chuỗi đó, tại sao các lập trình viên và dịch giả lại phải viết nó bằng cú pháp chuỗi phức tạp như vậy?

## Hướng tiếp cận tự nhiên với JavaScript

JavaScript đã giải quyết sẵn phần khó nhất. `Intl.PluralRules` hiểu rõ các quy tắc số nhiều và số thứ tự của các ngôn ngữ. `Intl.NumberFormat` và `Intl.DateTimeFormat` xử lý hoàn hảo tiền tệ, đơn vị, ký hiệu rút gọn và lịch. Phần còn lại chỉ là chọn nhánh thích hợp và chèn giá trị, việc này chỉ tốn vài dòng mã khi cấu trúc được tổ chức dưới dạng dữ liệu thay vì chuỗi.

Đó chính là mô hình mà Intlayer áp dụng. Việc phân nhánh là một hàm nằm trong khai báo nội dung có định kiểu chặt chẽ, và mỗi ngôn ngữ chỉ khai báo đúng các danh mục mà ngữ pháp của nó đòi hỏi:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      vi: plural({
        other: "{{count}} tin nhắn chưa đọc",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Ngôn ngữ Ba Lan → "5 nieprzeczytanych wiadomości"
```

Những điểm khác biệt so với ICU:

- **Không chứa parser trong bundle.** Cấu trúc đã là một đối tượng khi đến trình duyệt. Hàm `plural` chọn khóa thông qua `Intl.PluralRules` có sẵn trong môi trường.
- **Lỗi được phát hiện ngay khi build.** Thiếu một nhánh hoặc sai chính tả khóa sẽ tạo ra lỗi kiểu dữ liệu TypeScript, ngăn ngừa sự cố bất ngờ trên môi trường thực tế.
- **Tách biệt định dạng ra khỏi tin nhắn.** Số, ngày tháng và tiền tệ được xử lý qua các [hook định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) tương tác trực tiếp với `Intl`, không cần parse cú pháp skeleton.
- **Tính năng không dùng sẽ không tốn dung lượng.** Nếu không có tin nhắn nào sử dụng `gender`, bundler sẽ tự động loại bỏ nó qua tree-shaking.

- [Hook định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md)

Tất nhiên, cách tiếp cận này cũng có những yêu cầu riêng: cần có một bước build, tệp nội dung là mã thay vì văn bản thuần, và một số công cụ TMS vốn chỉ tương thích với ICU có thể không đọc trực tiếp được tệp khai báo TypeScript.

## Khi nào ICU vẫn là lựa chọn phù hợp

ICU vẫn là lựa chọn ưu việt trong các trường hợp:

- **Quy trình dịch thuật hiện tại của bạn hoàn toàn phụ thuộc vào nó.** Nhiều công cụ TMS chỉ hỗ trợ xuất nhập chuỗi ICU, và đội ngũ dịch giả đã quen thuộc với cú pháp này.
- **Nội dung tin nhắn được chia sẻ đa nền tảng.** Việc dùng chung một danh mục dịch cho ứng dụng iOS, ứng dụng Android và ứng dụng web là lý do vững chắc để duy trì một định dạng chuẩn thống nhất.
- **Bạn đã sở hữu một kho nội dung ICU khổng lồ.** Việc viết lại hàng nghìn tin nhắn hiếm khi mang lại hiệu quả kinh tế nếu chỉ làm riêng lẻ.

Trong trường hợp cuối cùng, bạn không nhất thiết phải chọn giữa việc viết lại toàn bộ hoặc chấp nhận một parser cồng kềnh. [Adapter tương thích react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md) của Intlayer có thể đọc các chuỗi ICU hiện có (`plural`, `select`, `selectordinal`, `#`, các định dạng cũ `number` / `date` / `time`), cho phép bạn chuyển đổi dần dần và chỉ chịu chi phí ICU ở những nơi thông điệp cũ còn cần đến nó.

- [Adapter tương thích react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md)

## Kết luận

ICU MessageFormat đã giải quyết được một bài toán thực tế: ngữ pháp thuộc về người dịch chứ không phải các câu lệnh `if (count === 1)` nằm rải rác trong mã ứng dụng. Nó hoạt động hoàn hảo trong các môi trường mà việc parse DSL chuỗi không tốn chi phí. Nhưng trong trình duyệt web, việc tương thích hoàn toàn đồng nghĩa với việc phải phân phối một bộ parser cho những tính năng mà phần lớn ứng dụng không bao giờ đụng tới, buộc các thư viện dựa trên ICU cũng phải tìm đến giải pháp biên dịch trước.

JavaScript đã tích hợp đầy đủ các quy tắc CLDR trong `Intl`. Những gì một định dạng i18n hiện đại cần chỉ là cấu trúc rẽ nhánh điều kiện, và cấu trúc đó hoàn toàn có thể được thể hiện mạch lạc dưới dạng dữ liệu có định kiểu.

## Đọc thêm

- [ICU Message Format: cú pháp, dạng số nhiều và select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md)
- [Xử lý nội dung số nhiều trong Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md)
- [Nội dung dựa trên điều kiện select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/select.md)
- [Bảng so sánh hiệu năng các thư viện i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [next-intl có lỗi thời không?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_next-intl_outdated.md)
