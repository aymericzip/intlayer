---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin Prettier x Oxfmt | Sắp xếp các bản dịch Intlayer
description: "Sắp xếp các locale của t(), các danh mục của plural(), các điều kiện của enu(), các trường hợp của select() và các khóa khai báo nội dung của bạn với prettier-plugin-intlayer. Hoạt động với Prettier và oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Định dạng
  - Sắp xếp bản dịch
  - Sắp xếp locale
  - i18n
  - Quốc tế hóa
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Khởi tạo lịch sử"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Thêm cách sử dụng với oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` sắp xếp các khóa dịch của bạn theo thứ tự cố định mỗi khi Prettier định dạng tệp. Các phần khác biệt (diff) luôn nhỏ gọn, xung đột hợp nhất (merge conflicts) ít xảy ra hơn và dễ dàng phát hiện locale bị thiếu.

```ts
// trước
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// sau
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Cài đặt

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Yêu cầu Prettier phiên bản 3 trở lên.

Nếu dự án của bạn đã sử dụng Prettier, lệnh `intlayer init prettier` sẽ tự động cài đặt plugin và thêm vào cấu hình cho bạn.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt không thể tải plugin bên thứ ba, nên việc sắp xếp được thực hiện qua Prettier. Hãy cài Prettier bên cạnh oxfmt. Prettier chỉ dùng để sắp xếp các khai báo nội dung của bạn; oxfmt vẫn định dạng dự án của bạn.

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Yêu cầu Prettier phiên bản 3 trở lên. `intlayer init` chỉ thiết lập plugin trong các dự án đã dùng Prettier, vì vậy hãy cấu hình thủ công như bên dưới.

  </Tab>
</Tabs>

## Cách sử dụng

Plugin hoạt động với Prettier và với [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Thêm plugin vào cấu hình Prettier của bạn:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Để chỉ áp dụng plugin cho các tệp khai báo nội dung, hãy sử dụng phần ghi đè (override):

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

Script format chạy hai công cụ, mỗi công cụ một nhiệm vụ:

1. **Prettier** sắp xếp các khai báo nội dung của bạn bằng plugin. Glob giới hạn nó ở các tệp `*.content.*`.
2. **oxfmt** định dạng toàn bộ dự án, bao gồm cả các khai báo nội dung.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Hãy giữ thứ tự này. oxfmt thay bố cục do Prettier viết bằng bố cục của riêng nó, nhưng không bao giờ sắp xếp lại các key của object, nên thứ tự đã sắp xếp được giữ nguyên.

Cách thiết lập này có một vài giới hạn:

- **Định dạng khi lưu.** Trình soạn thảo định dạng bằng oxfmt sẽ không sắp xếp. Hãy chạy script `format` để sắp xếp.
- **Chế độ check.** Không dùng `prettier --check` trên các tệp đã được oxfmt định dạng: bố cục khác nhau nên nó sẽ báo mọi tệp. Để kiểm tra thứ tự trong CI, hãy chạy script `format` và cho job thất bại nếu có thay đổi:

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

## Những gì được sắp xếp

### `t()`: các locale

Các locale được ghim (pinned) sẽ xuất hiện đầu tiên (`en` theo mặc định). Các locale khác sẽ theo thứ tự bảng chữ cái.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: thứ tự CLDR

Các danh mục đi từ số lượng nhỏ nhất đến phương án dự phòng (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
});
```

### `enu()`: ngưỡng tăng dần

Các điều kiện được sắp xếp theo số lượng, sau đó theo toán tử (`<1`, `<=1`, `1`, `>=1`, `>1`). Giá trị `fallback` nằm ở cuối cùng.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Trong thời gian chạy, điều kiện khớp đầu tiên sẽ được áp dụng. Plugin chỉ áp dụng thứ tự mới khi mỗi số lượng vẫn khớp với cùng một nội dung. Khi thứ tự quyết định kết quả, đối tượng sẽ được giữ nguyên như khi viết. Ví dụ: trong `{ '<1': …, '<=-2.3': … }`, khóa `'<1'` sẽ bắt tất cả các số âm.

### `select()`: theo bảng chữ cái

Các trường hợp được sắp xếp theo thứ tự bảng chữ cái và `fallback` nằm ở cuối cùng.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Nếu không có khóa `fallback` hoặc `other`, trường hợp cuối cùng sẽ được dùng làm fallback. Trường hợp đó luôn ở cuối và chỉ các trường hợp đứng trước nó mới được sắp xếp.

### Tệp `.content.json`

Dạng tuần tự hóa cũng được sắp xếp theo cách tương tự: `{ "nodeType": "translation", "translation": { … } }`, cũng như các nút `plural`, `enumeration` và `select`.

### Bản dịch giống nhau

Trong các tệp `*.content.*`, một `t()` mà mọi locale đều chứa cùng một chuỗi sẽ được thay bằng chính chuỗi đó. Chuỗi thường được trả về cho mọi locale, nên kết quả không thay đổi.

```ts
// trước
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// sau
nextjs: "Next.js",
```

`t()` chỉ có một locale, có đối số kiểu (`t<string>()`), có comment hoặc có giá trị không phải chuỗi sẽ được giữ nguyên. Đặt `intlayerCollapseIdenticalTranslations: false` để tắt.

### Khóa nội dung (tùy chọn)

Với `intlayerSortContentKeys: true`, plugin cũng sắp xếp các khóa của `content` từ điển theo thứ tự bảng chữ cái ở mọi cấp độ lồng nhau. Điều này chỉ áp dụng trong các tệp `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Quá trình sắp xếp tiếp tục đi qua từng hàm trợ giúp (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) để tiếp cận các đối tượng bên trong chúng. Cấu trúc ánh xạ khóa của từng helper giữ nguyên trật tự của chính nó. Các khóa truyền vào `cond()` và `gender()` không bao giờ bị sắp xếp lại vì khóa cuối cùng đóng vai trò là fallback. Các trường cùng cấp với `content` (`key`, `title`, `locale`…) được giữ nguyên trạng thái ban đầu.

## Tùy chọn

| Tùy chọn                                | Mặc định | Mô tả                                                                                                  |
| --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `intlayerPinnedLocales`                 | `["en"]` | Các locale được giữ ở đầu trong `t()`, theo thứ tự này. Truyền `[]` để sắp xếp tất cả các locale.      |
| `intlayerSortContentKeys`               | `false`  | Trong các tệp `*.content.*`, sắp xếp thêm các khóa nội dung từ điển và các đối tượng lồng nhau.        |
| `intlayerCollapseIdenticalTranslations` | `true`   | Trong các tệp `*.content.*`, thay một `t()` mà mọi locale đều chứa cùng một chuỗi bằng chính chuỗi đó. |

## Những gì được giữ nguyên

- Các đối tượng chứa spread (`...base`), computed key (`[key]`), phương thức hoặc khóa bị trùng lặp.
- Bản đồ `plural()` có khóa không phải là danh mục CLDR.
- Bản đồ `enu()` mà việc thay đổi thứ tự sẽ làm biến đổi nội dung được phân giải.
- Lời gọi bất kỳ hàm nào khác có tên tương tự hàm trợ giúp nhưng nhận đối số không phải là đối tượng.

Các nhận xét (comments) sẽ di chuyển cùng với khóa mà chúng thuộc về.

## Các parser được hỗ trợ

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` và `jsonc`. Các khối `<script>` trong tệp Vue, Svelte và Astro được định dạng bằng các parser này.

> **Hạn chế đã biết.** Prettier chỉ chạy một plugin cho mỗi parser. Nếu một plugin khác cũng thay thế các parser JavaScript/TypeScript (chẳng hạn như `prettier-plugin-tailwindcss`), chỉ plugin cuối cùng được liệt kê mới áp dụng cho các tệp đó. Hãy giới hạn phạm vi của `prettier-plugin-intlayer` vào các tệp `*.content.*` bằng override để tránh xung đột. Với oxfmt, các lớp Tailwind được sắp xếp bởi tùy chọn tích hợp `sortTailwindcss`, vì vậy xung đột này không xảy ra.
