---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Quy tắc lint cho Intlayer
description: Phát hiện chuỗi hardcode và các lệnh gọi động mà trình biên dịch Intlayer không thể tối ưu, với eslint-plugin-intlayer. Hoạt động với ESLint và oxlint trên React, Vue, Svelte, Angular và Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Quốc tế hóa
  - no-raw-text
  - Chuỗi hardcode
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
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` phát hiện hai loại lỗi i18n mà TypeScript không thể thấy:

1. **Văn bản hardcode** chưa bao giờ được đưa vào từ điển.
2. **Lệnh gọi động** vượt qua kiểm tra kiểu và chạy được, nhưng trình biên dịch Intlayer không thể tối ưu.

Khóa từ điển không xác định, đường dẫn trường không xác định và locale bị thiếu vốn đã là lỗi biên dịch, nên plugin không lặp lại chúng.

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

## Sử dụng

Plugin chạy được trên cả ESLint và [oxlint](https://oxc.rs) — cùng quy tắc, cùng tùy chọn.

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

Hai lưu ý: hỗ trợ plugin JS của oxlint vẫn đang ở giai đoạn alpha, và oxlint không hỗ trợ parser tùy chỉnh — nên các tệp `.vue`, `.svelte`, `.astro` và template Angular sẽ không được kiểm tra ở đó. Hãy chạy oxlint trên các tệp JS/TS/JSX và giữ ESLint cho phần còn lại.

  </Tab>
</Tabs>

### Cấu hình

| Cấu hình        | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                        | error                   | error                     | off                      |
| `strict`        | error (+ literal ngoài JSX) | error                   | error                     | error                    |
| `contract-only` | off                         | error                   | error                     | off                      |

`recommended` cố ý giữ `no-raw-text` ở mức `warn`: hướng quy tắc này vào một codebase sẵn có sẽ làm lộ ra toàn bộ chuỗi chưa dịch cùng lúc, và điều đó không nên phá build của bạn ngay ngày đầu tiên.

`enforce-adapter-import` mặc định tắt — hãy bật nó một cách tường minh nếu bạn muốn.

## Quy tắc

### `no-raw-text`

Báo cáo văn bản hướng tới người dùng nhưng không được khai báo trong từ điển. Quy tắc dùng cùng cơ chế phát hiện với `intlayer extract`, nên tên thương hiệu, class CSS và định danh kỹ thuật đều bị bỏ qua.

```jsx
// ✗ Bị báo cáo
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Ổn
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Các tệp khai báo nội dung (`*.content.ts`, …) được bỏ qua.

Để sửa toàn bộ một tệp cùng lúc, hãy chạy `npx intlayer extract` và để trình biên dịch chuyển các chuỗi vào từ điển giúp bạn.

**Tùy chọn**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Các thuộc tính có giá trị là văn bản hướng tới người dùng.
      // Mặc định: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Các phần tử mà nội dung không bao giờ là văn bản hướng tới người dùng.
      // Mặc định: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Biểu thức chính quy cho văn bản không bao giờ báo cáo.
      ignorePatterns: ["^Powered by"],

      // Cũng báo cáo literal chuỗi nằm ngoài markup. Mặc định: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Yêu cầu khóa từ điển phải là một literal chuỗi.

Trình biên dịch chỉ có thể nạp trước một từ điển khi nó đọc được khóa trực tiếp tại điểm gọi. Với khóa được tính toán, nó âm thầm bỏ qua bước tối ưu và thay vào đó đóng gói toàn bộ từ điển.

```typescript
// ✗ Bị báo cáo
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Một biến vẫn không phải là literal
const key = "home";
useIntlayer(key);

// ✓ Ổn
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Điều này áp dụng cho `useIntlayer`, `getIntlayer` và mọi adapter compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Yêu cầu trường bạn đọc từ từ điển phải được biết tĩnh.

Trình biên dịch loại bỏ những trường mà nó không thấy được sử dụng. Truy cập được tính toán là vô hình với nó, nên việc đọc có thể trả về `undefined` lúc chạy.

```typescript
// ✗ Bị báo cáo
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Ổn
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Ưu tiên adapter compat `@intlayer/*` thay vì package gốc. Package gốc chỉ phân giải tới Intlayer khi alias của bundler đã được cấu hình; adapter thì luôn luôn. Có thể tự sửa bằng `--fix`.

```typescript
// ✗ Bị báo cáo
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Ổn
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Framework

Mọi quy tắc đều hoạt động trên tất cả các tích hợp của Intlayer, kể cả bên trong template Vue, Svelte và Angular. Bạn chỉ cần cho ESLint biết parser nào đọc loại tệp nào.

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

Chỉ cài các parser mà dự án của bạn thực sự cần.

> **Hạn chế đã biết.** Trong template Vue và Angular, một biểu thức như `{{ content[key] }}` không được `no-dynamic-field-access` kiểm tra. Các lần đọc động viết trong khối script vẫn được phát hiện bình thường.
