---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Định dạng ngày tháng và số theo từng ngôn ngữ bằng Intl"
description: Bạn nhiều khả năng không cần đến thư viện định dạng bên ngoài. Cách Intl xử lý ngày tháng, số, tiền tệ và danh sách theo locale, chi phí bộ nhớ đệm và lỗi múi giờ trên production.
keywords:
  - định dạng ngày theo locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - định dạng tiền tệ locale
  - định dạng thời gian tương đối
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Định dạng ngày tháng và số theo từng ngôn ngữ bằng Intl

Dịch văn bản chỉ là một nửa nhìn thấy được của quốc tế hóa (i18n). Nửa còn lại, nơi phát sinh vô số báo cáo lỗi, chính là định dạng: một người dùng ở Đức nhìn thấy `1,234.56` thay vì `1.234,56`, một người dùng ở Nhật Bản thấy `08/02/2026` và hiểu nhầm là tháng Tám, hay một ngày tháng hiển thị khác nhau giữa server và client khiến trang web bị sập do lỗi hydration mismatch trong React.

Bạn không cần cài thêm bất kỳ thư viện nào để giải quyết việc này. API `Intl` tiêu chuẩn đã được tích hợp sẵn trong mọi môi trường chạy JavaScript hiện đại.

## Mục lục

<TOC/>

## Bắt đầu bằng việc xóa các hàm trợ giúp xử lý ngày tự viết

Gần như mọi dự án đều tồn tại một hàm `formatDate` được viết từ trước khi đội ngũ nghĩ tới việc hỗ trợ đa ngôn ngữ. Nó cố định một thứ tự hiển thị, một dấu phân cách và hầu như luôn dùng tên tháng bằng tiếng Anh.

```ts
// Đoạn mã bạn nên xóa bỏ:
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` thay thế hoàn toàn hàm này và xử lý chuẩn xác cho mọi ngôn ngữ:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

Điều tương tự cũng áp dụng cho các giá trị số. Việc gọi `toFixed(2)` tạo ra `1234.56` ở mọi nơi, điều này không đúng quy chuẩn tại hầu hết các quốc gia châu Âu.

## Những gì `Intl` bao hàm

| API                       | Trường hợp sử dụng                                        |
| :------------------------ | :-------------------------------------------------------- |
| `Intl.DateTimeFormat`     | Ngày và giờ, hỗ trợ các preset `dateStyle` / `timeStyle`  |
| `Intl.NumberFormat`       | Số thập phân, tiền tệ, phần trăm, đơn vị, ký hiệu thu gọn |
| `Intl.RelativeTimeFormat` | "3 ngày trước", "trong 2 giờ nữa"                         |
| `Intl.ListFormat`         | "a, b và c" theo ngữ pháp từng ngôn ngữ                   |
| `Intl.PluralRules`        | Xác định dạng số nhiều tương ứng với giá trị số           |
| `Intl.Collator`           | Sắp xếp chuỗi ký tự chuẩn xác theo quy tắc ngôn ngữ       |

`Intl.Collator` là công cụ thường xuyên bị bỏ quên nhất. Lệnh `array.sort()` mặc định trên chuỗi ký tự so sánh theo mã Unicode, khiến các ký tự có dấu thanh bị đẩy xuống sau chữ `z` và chữ `ö` trong tiếng Thụy Điển nằm sai chỗ. Nếu bạn cần sắp xếp các danh sách hiển thị cho người dùng, hãy luôn dùng collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("vi").compare);
// ["apple", "édouard", "zebra"]
```

## Ưu tiên dùng các preset hơn là tự cấu hình thủ công

`dateStyle` và `timeStyle` để cho locale tự quyết định thứ tự hợp lý và dấu phân cách phù hợp. Việc tự cấu hình từng trường `year`, `month`, `day` mang lại quyền kiểm soát không mong muốn, bởi vì quy ước khác nhau theo từng quốc gia và bạn sẽ vô tình ghi đè dữ liệu chuẩn của CLDR bằng phỏng đoán chủ quan.

```ts
// Locale tự quyết định cấu trúc chuẩn:
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// Tự gượng ép cấu trúc sẽ gây sai lệch ở các quốc gia khác:
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Chỉ định rõ từng thành phần chỉ khi giao diện thực sự bắt buộc chiều rộng cố định, ví dụ như trong một cột bảng hẹp.

## Khởi tạo đối tượng định dạng (formatter) tiêu tốn nhiều tài nguyên

Đây là chi tiết ảnh hưởng trực tiếp đến hiệu năng. Việc khởi tạo một đối tượng `Intl.NumberFormat` đòi hỏi tải dữ liệu locale tương đối lớn vào bộ nhớ, và thao tác này nặng hơn rất nhiều so với lời gọi hàm `.format()` diễn ra sau đó. Nếu khởi tạo bên trong một vòng lặp render hàng nghìn dòng dữ liệu, ứng dụng sẽ bị khựng rõ rệt.

```ts
// Tạo lại formatter ở mỗi dòng (chậm):
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Tạo một lần rồi tái sử dụng (nhanh):
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

Các hàm `toLocaleDateString()` và `toLocaleString()` cũng ẩn chứa đúng vấn đề này: mỗi lần gọi là một lần khởi tạo formatter mới. Chúng chấp nhận được cho một giá trị đơn lẻ, nhưng hoàn toàn sai lầm khi áp dụng cho danh sách.

Hãy lưu cache theo sự kết hợp giữa locale và tập tùy chọn:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## Lỗi múi giờ chỉ phát tác trên production

Đây là lỗi từng làm mất hàng buổi chiều của nhiều lập trình viên. Server tạo chuỗi ngày tháng khi SSR, trình duyệt thực hiện hydration ở client, và React báo lỗi hydration mismatch khiến ứng dụng ngưng trệ vì hai bên sinh ra hai đoạn text khác nhau.

Nguyên nhân là `Intl.DateTimeFormat` sẽ lấy múi giờ mặc định của hệ điều hành nếu bạn không truyền vào giá trị cụ thể. Server production chạy ở múi giờ UTC, trong khi máy cá nhân của lập trình viên lại ở múi giờ địa phương khác. Do đó lỗi hoàn toàn tàng hình ở môi trường local và chỉ nổ ra khi lên production.

```ts
// Server (UTC) và trình duyệt client lệch múi giờ, gây lỗi hydration:
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Cả hai bên thống nhất tuyệt đối:
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Ba giải pháp thực tế:

- **Khóa cố định múi giờ** trên server và truyền xuống rõ ràng. Nhất quán và an toàn, nhưng người dùng nhìn thấy giờ UTC.
- **Chỉ render ở client**, hiển thị một khung placeholder ổn định trong lượt chạy SSR. Chính xác cho từng người dùng, đánh đổi một nháy giật nhẹ giao diện.
- **Lưu múi giờ của người dùng** và truyền vào ở cả server lẫn client. Trải nghiệm tối ưu nhất với một chút công sức thiết lập.

Dù chọn cách nào, hãy luôn truyền thuộc tính `timeZone` một cách tường minh cho bất kỳ ngày tháng nào được render ở cả hai phía server và client. Một ngày tháng không gắn múi giờ là một ngày tháng mang hai giá trị đối nghịch nhau.

## Tiền tệ cần mã tiền tệ, không phải locale

Locale và tiền tệ là hai khái niệm độc lập. `fr-FR` không đồng nghĩa với euro: một khách hàng ở Pháp hoàn toàn có thể đang xem hóa đơn bằng USD.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

Locale quy định dấu phân cách, cách gom nhóm số và vị trí ký hiệu. Loại tiền tệ phải được cung cấp từ dữ liệu giao dịch. Tự suy diễn tiền tệ từ locale là mầm mống dẫn đến sai sót kế toán.

Đồng thời lưu ý thuộc tính `currencyDisplay`. Trong giao diện có nhiều loại tiền cùng mang ký hiệu đô la ($), tùy chọn `"code"` sẽ xóa bỏ hoàn toàn sự mập mờ giữa đô la Mỹ, Canada hay Úc.

## Thời gian tương đối dễ đọc hơn thời gian tuyệt đối

Đối với những sự kiện mới diễn ra, "2 giờ trước" trực quan hơn nhiều so với một mốc thời gian cứng nhắc, và `Intl.RelativeTimeFormat` giải quyết việc bản địa hóa một cách tự nhiên.

```ts
new Intl.RelativeTimeFormat("vi", { numeric: "auto" }).format(-1, "day");
// "hôm qua"
```

Tùy chọn `numeric: "auto"` tạo ra từ "hôm qua" thay vì cụm từ số khô khan "1 ngày trước".

## Những gì Intlayer bổ sung

Intlayer đóng gói các API này thành các hàm trợ giúp có sẵn cơ chế cache, giúp bạn không cần tự quản lý Map thủ công, đồng thời tự động áp dụng ngôn ngữ đang hoạt động thay vì bắt buộc truyền vào ở mọi nơi.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1.234,5"
currency(1234.5, { currency: "EUR" }); // "1.234,50 €"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 giờ trước"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilômét"
compact(1200); // "1,2 N"
list(["táo", "chuối", "cam"]); // "táo, chuối và cam"
```

Hàm `date()` cũng hỗ trợ các preset (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`). Đối với React và Vue, các hook và composable tương ứng sẽ tự động giải quyết ngôn ngữ đang kích hoạt từ context.

Đây là một tầng cache và xử lý ngôn ngữ mặc định trên nền tảng API chuẩn. Hành vi định dạng cốt lõi vẫn hoàn toàn dựa trên `Intl`. Xem đầy đủ chữ ký hàm tại [tài liệu formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md).

## Các sai lầm thường gặp

- **Gọi `toLocaleDateString()` mà không chỉ định locale.** Dùng locale của môi trường máy chủ vốn phụ thuộc cấu hình container.
- **Định dạng trong vòng lặp mà không có cache.** Quá trình khởi tạo formatter chiếm phần lớn thời gian CPU.
- **Bỏ quên `timeZone` trên các ngày tháng render đồng hình.** Gây lỗi hydration không thể tái hiện ở môi trường local.
- **Suy diễn tiền tệ từ mã ngôn ngữ.** `fr-FR` không đảm bảo giao dịch tính bằng euro.
- **Dùng `sort()` thông thường cho văn bản giao diện.** Luôn dùng `Intl.Collator`.
- **Hardcode tên tháng hoặc thứ trong tuần.** Dữ liệu đã có sẵn trong CLDR cho mọi thứ tiếng.
- **Giữ nguyên `numeric: "always"` trong thời gian tương đối.** Tạo ra "1 ngày trước" thay vì "hôm qua".

## Tìm hiểu thêm

- [Formatters và các tiện ích ngôn ngữ: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md)
- [Tài liệu tham khảo cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Báo cáo benchmark so sánh các framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Adapter tương thích react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md)
- [Định dạng tin nhắn ICU: số nhiều, lựa chọn và skeleton số](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md)
- [Cách kiểm thử bản dịch, bao gồm kiểm tra formatter và số nhiều](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_testing_strategies.md)
- [Bản chất thực sự của quốc tế hóa bao gồm những gì](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/what_is_internationalization.md)
