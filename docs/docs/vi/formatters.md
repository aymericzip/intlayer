---
createdAt: 2024-08-13
updatedAt: 2025-10-14
title: Bộ định dạng
description: Các tiện ích định dạng nhận biết ngôn ngữ dựa trên Intl cho số, phần trăm, tiền tệ, ngày tháng, thời gian tương đối, đơn vị và ký hiệu gọn. Bao gồm một helper Intl được lưu trong bộ nhớ đệm.
keywords:
  - Bộ định dạng
  - Intl
  - Số
  - Tiền tệ
  - Phần trăm
  - Ngày tháng
  - Thời gian tương đối
  - Đơn vị
  - Gọn
  - Danh sách
  - Quốc tế hóa
slugs:
  - doc
  - formatters
history:
  - version: 6.2.0
    date: 2025-10-14
    changes: Loại bỏ getIntlayerAsync khỏi bộ định dạng
  - version: 5.8.0
    date: 2025-08-20
    changes: Thêm bộ định dạng cho vue
  - version: 5.8.0
    date: 2025-08-18
    changes: Thêm tài liệu cho bộ định dạng
  - version: 5.8.0
    date: 2025-08-20
    changes: Thêm tài liệu cho bộ định dạng danh sách
  - version: 5.8.0
    date: 2025-08-20
    changes: Thêm các tiện ích Intl bổ sung (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Thêm các tiện ích locale (getLocaleName, getLocaleLang, getLocaleFromPath, v.v.)
  - version: 5.8.0
    date: 2025-08-20
    changes: Thêm các tiện ích xử lý nội dung (getContent, getTranslation, getIntlayer, v.v.)
---

# Bộ định dạng Intlayer

## Mục lục

<TOC/>

## Tổng quan

Intlayer cung cấp một bộ helper nhẹ xây dựng trên các API `Intl` gốc, cùng với một wrapper `Intl` được lưu trong bộ nhớ đệm để tránh việc tạo lại các bộ định dạng nặng nhiều lần. Các tiện ích này hoàn toàn nhận biết locale và có thể được sử dụng từ package chính `intlayer`.

### Import

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

Nếu bạn sử dụng React, các hook cũng có sẵn; xem `react-intlayer/format`.

## Intl được lưu trong bộ nhớ đệm

`Intl` được xuất ra là một wrapper mỏng, được lưu trong bộ nhớ đệm quanh `Intl` toàn cục. Nó ghi nhớ các thể hiện của `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, và `PluralRules`, giúp tránh việc xây dựng lại cùng một bộ định dạng nhiều lần.

Vì việc tạo bộ định dạng khá tốn kém, việc lưu trong bộ nhớ đệm này cải thiện hiệu suất mà không làm thay đổi hành vi. Wrapper này cung cấp cùng API như `Intl` gốc, nên cách sử dụng hoàn toàn giống nhau.

- Việc lưu trong bộ nhớ đệm là theo từng tiến trình và hoàn toàn minh bạch với người gọi.

> Nếu `Intl.DisplayNames` không có sẵn trong môi trường, một cảnh báo chỉ dành cho nhà phát triển sẽ được in ra một lần (cân nhắc sử dụng polyfill).

Ví dụ:

```ts
import { Intl } from "intlayer";

// Định dạng số
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Tên hiển thị cho ngôn ngữ, vùng, v.v.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Sắp xếp theo thứ tự
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (bằng nhau)

// Quy tắc số nhiều
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## Tiện ích Intl bổ sung

Ngoài các trình trợ giúp định dạng, bạn cũng có thể sử dụng trực tiếp wrapper Intl đã được lưu trong bộ nhớ đệm cho các tính năng Intl khác:

### `Intl.DisplayNames`

Dùng để lấy tên địa phương hóa của ngôn ngữ, vùng, tiền tệ và bảng chữ cái:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

Dùng để so sánh và sắp xếp chuỗi theo ngữ cảnh địa phương:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

Dùng để xác định các dạng số nhiều trong các locale khác nhau:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero" // số không
pluralRules.select(1); // "one" // số một
pluralRules.select(2); // "two" // số hai
pluralRules.select(3); // "few" // số ít
pluralRules.select(11); // "many" // số nhiều
```

## Tiện ích Locale

### `getLocaleName(displayLocale, targetLocale?)`

Lấy tên địa phương hóa của một locale trong một locale khác:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French" // tiếng Pháp
getLocaleName("en", "fr"); // "anglais" // tiếng Anh
getLocaleName("de", "es"); // "alemán" // tiếng Đức
```

- **displayLocale**: Locale cần lấy tên
- **targetLocale**: Locale để hiển thị tên (mặc định là displayLocale)

### `getLocaleLang(locale?)`

Trích xuất mã ngôn ngữ từ một chuỗi locale:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: Locale để trích xuất ngôn ngữ (mặc định là locale hiện tại)

### `getLocaleFromPath(inputUrl)`

Trích xuất phần locale từ một URL hoặc pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (locale mặc định)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: Chuỗi URL đầy đủ hoặc đường dẫn cần xử lý
- **returns**: Locale được phát hiện hoặc locale mặc định nếu không tìm thấy locale nào

### `getPathWithoutLocale(inputUrl, locales?)`

Loại bỏ phần locale khỏi URL hoặc đường dẫn:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: Chuỗi URL đầy đủ hoặc đường dẫn cần xử lý
- **locales**: Mảng tùy chọn các locale được hỗ trợ (mặc định là các locale đã cấu hình)
- **returns**: URL không có phần locale

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Tạo URL có địa phương hóa cho locale hiện tại:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: URL gốc cần địa phương hóa
- **currentLocale**: Locale hiện tại
- **locales**: Mảng tùy chọn các locale được hỗ trợ (mặc định là các locale đã cấu hình)
- **defaultLocale**: Locale mặc định tùy chọn (mặc định là locale mặc định đã cấu hình)
- **prefixDefault**: Có thêm tiền tố locale mặc định hay không (mặc định theo giá trị đã cấu hình)

### `getHTMLTextDir(locale?)`

Trả về hướng văn bản cho một locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: Locale để lấy hướng văn bản (mặc định là locale hiện tại)
- **returns**: `"ltr"`, `"rtl"`, hoặc `"auto"`

## Tiện ích Xử lý Nội dung

### `getContent(node, nodeProps, locale?)`

Chuyển đổi một node nội dung với tất cả các plugin có sẵn (dịch thuật, đánh số, chèn, v.v.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: Node nội dung cần chuyển đổi
- **nodeProps**: Thuộc tính cho ngữ cảnh chuyển đổi
- **locale**: Locale tùy chọn (mặc định là locale mặc định đã cấu hình)

### `getTranslation(languageContent, locale?, fallback?)`

Trích xuất nội dung cho một locale cụ thể từ một đối tượng nội dung ngôn ngữ:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: Đối tượng ánh xạ các locale tới nội dung
- **locale**: Locale mục tiêu (mặc định là locale cấu hình sẵn)
- **fallback**: Có fallback về locale mặc định hay không (mặc định là true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Lấy và chuyển đổi nội dung từ một từ điển theo key:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: Khóa của từ điển để truy xuất
- **locale**: Locale tùy chọn (mặc định là locale cấu hình sẵn)
- **plugins**: Mảng tùy chọn các plugin chuyển đổi tùy chỉnh

## Bộ định dạng

Tất cả các helper dưới đây được xuất khẩu từ `intlayer`.

### `number(value, options?)`

Định dạng một giá trị số sử dụng nhóm và phần thập phân theo locale.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Ví dụ:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (trong en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Định dạng một số thành chuỗi phần trăm.

Hành vi: các giá trị lớn hơn 1 được hiểu là phần trăm nguyên và được chuẩn hóa (ví dụ, `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Ví dụ:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Định dạng một giá trị dưới dạng tiền tệ theo locale. Mặc định là `USD` với hai chữ số thập phân.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Các trường phổ biến: `currency` (ví dụ, `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Ví dụ:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Định dạng giá trị ngày/giờ với `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` hoặc một trong các preset:
  - Preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Ví dụ:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // ví dụ, "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Định dạng thời gian tương đối giữa hai thời điểm với `Intl.RelativeTimeFormat`.

- Truyền "now" làm đối số đầu tiên và mục tiêu làm đối số thứ hai để có cách diễn đạt tự nhiên.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (mặc định là `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Mặc định `unit` là `"second"`.

Ví dụ:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

Định dạng một giá trị số thành chuỗi đơn vị được địa phương hóa sử dụng `Intl.NumberFormat` với `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Các trường phổ biến: `unit` (ví dụ, `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Mặc định: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Ví dụ:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (phụ thuộc vào locale)
```

### `compact(value, options?)`

Định dạng một số sử dụng ký hiệu rút gọn (ví dụ, `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (sử dụng `notation: 'compact'` bên trong)

Ví dụ:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Định dạng một mảng các giá trị thành chuỗi danh sách được địa phương hóa sử dụng `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Các trường phổ biến: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Mặc định: `type: 'conjunction'`, `style: 'long'`

Ví dụ:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Ghi chú

- Tất cả các helper chấp nhận đầu vào kiểu `string`; chúng sẽ được ép kiểu nội bộ thành số hoặc ngày tháng.
- Locale mặc định là `internationalization.defaultLocale` mà bạn đã cấu hình nếu không được cung cấp.
- Các tiện ích này là các wrapper mỏng; để định dạng nâng cao, hãy truyền các tùy chọn tiêu chuẩn của `Intl`.

## Điểm vào và tái xuất (`@index.ts`)

Các bộ định dạng nằm trong package core và được tái xuất từ các package cấp cao hơn để giữ cho việc import thuận tiện trên các runtime khác nhau:

Ví dụ:

```ts
// Mã ứng dụng (khuyến nghị)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
} from "intlayer";
```

### React

Các thành phần client:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// hoặc trong các ứng dụng Preact
// "preact-intlayer/format";
// hoặc trong các ứng dụng Next.js
// "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

Các thành phần server (hoặc runtime React Server):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/server/format";
// hoặc trong các ứng dụng Next.js
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> Các hook đó sẽ lấy locale từ `IntlayerProvider` hoặc `IntlayerServerProvider`

### Vue

Các component phía client:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> Các composable đó sẽ lấy locale từ `IntlayerProvider` được inject vào
