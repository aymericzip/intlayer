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
    changes: "Loại bỏ getIntlayerAsync khỏi bộ định dạng"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Thêm bộ định dạng cho vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Thêm tài liệu cho bộ định dạng"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Thêm tài liệu cho bộ định dạng danh sách"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Thêm các tiện ích Intl bổ sung (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Thêm các tiện ích locale (getLocaleName, getLocaleLang, getLocaleFromPath, v.v.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Thêm các tiện ích xử lý nội dung (getContent, getTranslation, getIntlayer, v.v.)"
author: aymericzip
---

# Bộ định dạng Intlayer

## Mục lục

<TOC/>

## Tổng quan

Intlayer cung cấp một bộ helper nhẹ xây dựng trên các API `Intl` gốc, cùng với một wrapper `Intl` được lưu trong bộ nhớ đệm để tránh việc tạo lại các bộ định dạng nặng nhiều lần. Các tiện ích này hoàn toàn nhận biết locale và có thể được sử dụng từ package chính `intlayer`.

## React Formatters

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

### Các Hook Có Sẵn

Tất cả các hook tự động sử dụng locale từ `IntlayerProvider` hoặc `IntlayerServerProvider`.

| Hook                | Description                         | Example Output                |
| ------------------- | ----------------------------------- | ----------------------------- |
| `useNumber()`       | Định dạng số với phân nhóm          | `"123,456.789"`               |
| `useCurrency()`     | Định dạng giá trị tiền tệ           | `"€1,234.50"`                 |
| `usePercentage()`   | Định dạng phần trăm                 | `"25%"`                       |
| `useDate()`         | Định dạng ngày và giờ               | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Định dạng thời gian tương đối       | `"in 3 days"`                 |
| `useUnit()`         | Định dạng giá trị với đơn vị        | `"5 kilometers"`              |
| `useCompact()`      | Định dạng số ở dạng ký hiệu compact | `"1.2K"`                      |
| `useList()`         | Định dạng mảng dưới dạng danh sách  | `"apple, banana, and orange"` |
| `useIntl()`         | Lấy object `Intl` được gắn locale   | Full `Intl` API access        |

### Ví dụ Hoàn chỉnh

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
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### Hook `useIntl`

Hook `useIntl` cung cấp quyền truy cập trực tiếp vào một đối tượng `Intl` được ràng buộc với locale. Điều này hữu ích khi bạn cần toàn bộ API `Intl` (ví dụ: `DisplayNames`, `Collator`, `PluralRules`) với việc tiêm locale tự động.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // sử dụng locale từ context

  // API Intl tiêu chuẩn, nhưng locale được tiêm tự động khi undefined
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // Bạn vẫn có thể ghi đè locale nếu cần
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // Truy cập các tính năng Intl khác
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (hoặc được bản địa hóa)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## Vue Formatters

### `Intl.DisplayNames`

Dùng để lấy tên địa phương hóa của ngôn ngữ, vùng, tiền tệ và bảng chữ cái:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### Các Composables Có Sẵn

Tất cả các composables trả về computed refs tự động sử dụng locale từ `IntlayerProvider` được inject.

| Composable          | Mô tả                                | Ví dụ Output                  |
| ------------------- | ------------------------------------ | ----------------------------- |
| `useNumber()`       | Định dạng số với nhóm                | `"123,456.789"`               |
| `useCurrency()`     | Định dạng giá trị tiền tệ            | `"€1,234.50"`                 |
| `usePercentage()`   | Định dạng phần trăm                  | `"25%"`                       |
| `useDate()`         | Định dạng ngày và giờ                | `"Aug 2, 2025"`               |
| `useRelativeTime()` | Định dạng thời gian tương đối        | `"in 3 days"`                 |
| `useUnit()`         | Định dạng giá trị với đơn vị         | `"5 kilometers"`              |
| `useCompact()`      | Định dạng số ở ký hiệu compact       | `"1.2K"`                      |
| `useList()`         | Định dạng mảng dưới dạng danh sách   | `"apple, banana, and orange"` |
| `useIntl()`         | Lấy đối tượng `Intl` liên kết locale | Full `Intl` API access        |

### Ví Dụ Hoàn Chỉnh

```vue
<script setup>
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

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
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

## Vanilla JS / Node.js Formatters

Đối với các ngữ cảnh không sử dụng framework, hãy import các formatter trực tiếp từ `intlayer`. Lưu ý rằng bạn phải truyền locale theo cách thủ công.

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

### Các Hàm Định Dạng

#### `number(value, options?)`

Định dạng một giá trị số sử dụng nhóm và thập phân nhận biết địa phương.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Định dạng một số dưới dạng chuỗi phần trăm. Các giá trị lớn hơn 1 được chuẩn hóa (ví dụ: `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Định dạng một giá trị dưới dạng tiền tệ được bản địa hóa. Mặc định là `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Định dạng một giá trị ngày/giờ.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` hoặc preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // ví dụ: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Định dạng thời gian tương đối giữa hai thời điểm.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (mặc định là `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

Định dạng một giá trị số với một đơn vị.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Định dạng một số sử dụng ký hiệu compact.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Định dạng một mảng thành một chuỗi danh sách đã được bản địa hóa.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

`Intl` được xuất từ `intlayer` là một wrapper được lưu trong bộ nhớ cache xung quanh `Intl` toàn cục. Nó memoizes các instance formatter (`NumberFormat`, `DateTimeFormat`, v.v.) để tránh việc xây dựng lại chúng liên tục, cải thiện hiệu suất.

```ts
import { Intl } from "intlayer";

// Định dạng số
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Hiển thị tên cho các ngôn ngữ, khu vực, v.v.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation để sắp xếp
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (bằng nhau)

// Quy tắc số nhiều
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Các Tính Năng Intl Bổ Sung

#### `Intl.DisplayNames`

Để có được tên được bản địa hóa của các ngôn ngữ, khu vực, tiền tệ và chữ viết:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

Để so sánh và sắp xếp chuỗi ký tự theo locale:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

Để xác định các dạng số nhiều trong các locale khác nhau:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
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

## Ghi chú

- Tất cả các helper chấp nhận `string` inputs; chúng được chuyển đổi nội bộ thành numbers hoặc dates.
- Locale mặc định là `internationalization.defaultLocale` được cấu hình của bạn nếu không được cung cấp.
- Các tiện ích này là thin wrappers; để định dạng nâng cao, hãy sử dụng các tùy chọn `Intl` tiêu chuẩn.
