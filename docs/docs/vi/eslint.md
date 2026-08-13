---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Quy tắc Lint cho Intlayer
description: Phát hiện chuỗi văn bản bị hardcode, các lệnh gọi động mà trình biên dịch Intlayer không thể tối ưu hóa và nội dung từ điển không sử dụng với eslint-plugin-intlayer. Hoạt động với ESLint và oxlint trên React, Vue, Svelte, Angular và Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Quốc tế hóa
  - no-raw-text
  - Chuỗi văn bản hardcoded
  - Bản dịch không sử dụng
  - Nội dung thừa
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Lịch sử khởi tạo"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` giúp bắt các lỗi i18n mà TypeScript không thể phát hiện:

1. **Văn bản hardcode** chưa từng được đưa vào từ điển.
2. **Các lệnh gọi động** vượt qua kiểm tra kiểu và thực thi được, nhưng trình biên dịch Intlayer không thể tối ưu hóa.
3. **Nội dung thừa (Dead content)** — các từ điển và trường không có bất kỳ phần nào trong dự án đọc (tùy chọn kích hoạt).

Các khóa từ điển không xác định, đường dẫn trường không xác định và ngôn ngữ còn thiếu vốn đã là các lỗi biên dịch, vì vậy plugin sẽ không lặp lại chúng.

## Cài đặt

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Yêu cầu ESLint 9 trở lên (flat config).

## Cách sử dụng

Plugin hoạt động trên cả ESLint và [oxlint](https://oxc.rs) — cùng quy tắc, cùng tùy chọn.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Hoặc bật từng quy tắc một:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Hai lưu ý: hỗ trợ plugin JS của oxlint vẫn đang ở giai đoạn alpha và oxlint không hỗ trợ trình phân tích cú pháp tùy chỉnh — vì vậy các tệp `.vue`, `.svelte`, `.astro` và template Angular không được lint tại đó. Hãy chạy oxlint trên các tệp JS/TS/JSX của bạn và giữ lại ESLint cho phần còn lại.

`no-unused-content` được cố tình lược bỏ ở trên: nó cần thư mục làm việc và đường dẫn tệp được lint từ ngữ cảnh quy tắc, điều mà cầu nối plugin JS alpha chưa đảm bảo. Hãy chạy quy tắc này dưới ESLint.

  </Tab>
</Tabs>

### Cấu hình (Configs)

| Cấu hình        | `no-raw-text`             | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                      | error                   | error                     | off                      | off                 |
| `strict`        | error (+ chuỗi ngoài JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                       | error                   | error                     | off                      | off                 |

`recommended` cố ý giữ `no-raw-text` ở mức `warn`: việc áp dụng quy tắc này vào một codebase hiện có sẽ hiển thị tất cả các chuỗi chưa được dịch cùng một lúc, điều này không nên làm gián đoạn bản build của bạn ngay từ ngày đầu tiên.

`enforce-adapter-import` bị tắt theo mặc định — hãy bật rõ ràng nếu bạn muốn.

`no-unused-content` bị tắt trong mọi cấu hình, bao gồm cả `strict`. Đây là quy tắc duy nhất đọc cấu hình Intlayer của bạn và duyệt qua các tệp nguồn từ đĩa, vì vậy việc bật nó nên là một lựa chọn có chủ đích thay vì được thiết lập sẵn tự động.

## Các quy tắc

### `no-raw-text`

Báo cáo văn bản hiển thị cho người dùng không được khai báo trong từ điển. Quy tắc sử dụng cơ chế phát hiện giống như `intlayer extract`, do đó tên thương hiệu, lớp CSS và định danh kỹ thuật sẽ bị bỏ qua.

```jsx
// ✗ Bị báo cáo
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Hợp lệ
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Các tệp khai báo nội dung (`*.content.ts`, …) được bỏ qua.

Để sửa toàn bộ tệp cùng lúc, hãy chạy `npx intlayer extract` và để trình biên dịch chuyển các chuỗi vào từ điển giúp bạn.

**Tùy chọn**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Các thuộc tính có giá trị là văn bản hiển thị cho người dùng.
      // Mặc định: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Các phần tử có nội dung không bao giờ là văn bản hiển thị cho người dùng.
      // Mặc định: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Biểu thức chính quy cho văn bản không bao giờ bị báo cáo.
      ignorePatterns: ["^Powered by"],

      // Báo cáo cả chuỗi ký tự bên ngoài mã markup. Mặc định: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Yêu cầu khóa từ điển phải là một chuỗi ký tự cố định (string literal).

Trình biên dịch chỉ có thể tải trước từ điển khi có thể đọc trực tiếp khóa tại vị trí gọi. Với một khóa được tính toán động, nó sẽ âm thầm bỏ qua việc tối ưu hóa và đóng gói tất cả từ điển thay thế.

```typescript
// ✗ Bị báo cáo
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Biến vẫn không phải là một chuỗi cố định
const key = "home";
useIntlayer(key);

// ✓ Hợp lệ
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Điều này áp dụng cho `useIntlayer`, `getIntlayer` và mọi adapter tương thích (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Yêu cầu trường bạn đọc từ từ điển phải được xác định tĩnh.

Trình biên dịch sẽ loại bỏ các trường mà nó không thấy được sử dụng. Một truy cập được tính toán động là vô hình đối với nó, do đó việc đọc có thể trả về `undefined` trong thời gian chạy.

```typescript
// ✗ Bị báo cáo
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Hợp lệ
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Ưu tiên adapter tương thích `@intlayer/*` hơn gói gốc. Gói gốc chỉ phân giải thành Intlayer khi alias của bundler được cấu hình; adapter luôn luôn thực hiện được. Có thể tự động sửa bằng `--fix`.

```typescript
// ✗ Bị báo cáo
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Hợp lệ
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Tắt theo mặc định.** Báo cáo nội dung không có bất kỳ phần nào trong dự án đọc, cùng với các khóa từ điển được khai báo ở nhiều nơi.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Bị báo cáo nếu không có nơi nào trong dự án yêu cầu "home"
  content: {
    title: t({ vi: "Tiêu đề", en: "Title" }),

    // ✗ Bị báo cáo nếu không có nơi nào đọc `hero`
    hero: {
      subtitle: t({ vi: "Phụ đề", en: "Subtitle" }),
    },
  },
};
```

Không giống như các quy tắc khác, quy tắc này không thể quyết định chỉ từ tệp đang kiểm tra — một trường chỉ được xem là không sử dụng khi so với toàn bộ dự án. Khi gặp khai báo nội dung đầu tiên trong một lần lint, nó sẽ tải cấu hình Intlayer, quét các tệp nguồn mà cấu hình đó khai báo (`build.traversePattern`, `compiler.transformPattern`) và chạy cùng bộ phân tích mức độ sử dụng đang vận hành `@intlayer/lsp` và tính năng gạch ngang "không sử dụng" trong tiện ích mở rộng VS Code. Kết quả được lưu vào bộ nhớ cache trong `cacheTtl` mili giây, do đó quá trình quét diễn ra một lần cho mỗi lượt chạy thay vì mỗi tệp.

**Tùy chọn**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Báo cáo các khóa từ điển không có nơi nào tham chiếu. Mặc định: true
      reportUnusedDictionaries: true,

      // Báo cáo các trường nội dung không có nơi nào đọc. Mặc định: true
      reportUnusedFields: true,

      // Báo cáo các khóa được khai báo ở nhiều nơi. Mặc định: true
      reportDuplicateKeys: true,

      // Biểu thức chính quy cho đường dẫn trường không bao giờ bị báo cáo.
      ignoreFields: ["^meta"],

      // Thư mục gốc của dự án bắt đầu quét. Mặc định: thư mục làm việc của ESLint
      baseDir: process.cwd(),

      // Thời gian một lần quét dự án được tái sử dụng, tính bằng ms. Mặc định: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Giảm `cacheTtl` khi bạn lint từ một editor server hoạt động lâu dài và muốn các chỉnh sửa hiển thị sớm hơn; thiết lập `baseDir` khi một lần chạy lint trải rộng trên nhiều dự án Intlayer trong monorepo.

> **Thiên về sự an toàn (ít báo sai).** Một cảnh báo sai ở đây có thể dẫn đến việc xóa một bản dịch, vì vậy sẽ không có gì được báo cáo khi từ điển được sử dụng theo cách mà bộ phân tích không thể theo dõi: đối tượng nội dung được truyền nguyên vẹn, hàm dịch được liên kết từ đó (`const t = useTranslations("home")`), khai báo được truy cập qua import trực tiếp (`useDictionary(myDictionary)`), lệnh `nest()` từ từ điển khác, hoặc danh sách trường bị làm mờ bởi toán tử spread. Các component đơn tệp (`.vue`, `.svelte`, `.astro`) được tính là sử dụng mọi trường của từ điển mà chúng đề cập, vì các khối script của chúng không được phân tích cú pháp tại đây.

`reportDuplicateKeys` đọc các từ điển chưa hợp nhất mà bản build ghi dưới thư mục `.intlayer/`, do đó nó giữ im lặng cho đến khi dự án được build ít nhất một lần. Hai khai báo có chung một khóa sẽ được hợp nhất, đây là một mẫu hợp lệ — báo cáo tồn tại vì một trường được định nghĩa ở cả hai bên sẽ âm thầm chỉ giữ lại một trong hai giá trị.

Bộ phân tích được nạp từ `@intlayer/lsp`, phát hành dưới dạng ESM. Do đó quy tắc cần một phiên bản Node có thể `require()` module ES — Node 20.19+ hoặc 22.12+. Trên các phiên bản cũ hơn, nó sẽ không báo cáo gì thay vì làm hỏng lần chạy lint.

## Frameworks

Mọi quy tắc đều hoạt động trên tất cả các tích hợp của Intlayer, bao gồm bên trong template của Vue, Svelte và Angular. Bạn chỉ cần chỉ định cho ESLint parser nào xử lý từng loại tệp.

| Framework                 | Tệp               | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Template Angular          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Chỉ cài đặt các parser mà dự án của bạn cần.

> **Hạn chế đã biết.** Trong template của Vue và Angular, một biểu thức như `{{ content[key] }}` sẽ không được kiểm tra bởi `no-dynamic-field-access`. Các truy cập động được viết trong khối script vẫn được phát hiện bình thường.
