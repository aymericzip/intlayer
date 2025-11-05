---
createdAt: 2025-03-01
updatedAt: 2025-10-05
title: Kiểm thử nội dung của bạn
description: Khám phá cách kiểm thử nội dung của bạn với Intlayer.
keywords:
  - Kiểm thử
  - Intlayer
  - Quốc tế hóa
  - CMS
  - Hệ thống quản lý nội dung
  - Trình chỉnh sửa trực quan
slugs:
  - doc
  - testing
history:
  - version: 6.0.1
    date: 2025-10-05
    changes: Thực hiện kiểm thử bất đồng bộ và thêm tùy chọn build
  - version: 6.0.0
    date: 2025-09-20
    changes: Giới thiệu về kiểm thử
---

# Kiểm thử nội dung của bạn

Hướng dẫn này trình bày cách tự động xác minh từ điển của bạn đã đầy đủ, phát hiện các bản dịch còn thiếu trước khi phát hành, và kiểm thử giao diện người dùng đã được địa phương hóa trong ứng dụng của bạn.

---

## Những gì bạn có thể kiểm thử

- **Bản dịch còn thiếu**: làm cho CI thất bại nếu bất kỳ ngôn ngữ bắt buộc nào bị thiếu trong bất kỳ từ điển nào.
- **Kết xuất giao diện người dùng địa phương hóa**: kết xuất các component với một provider locale cụ thể và xác nhận trên văn bản/thuộc tính hiển thị.
- **Kiểm tra thời gian build**: chạy kiểm tra nhanh cục bộ qua CLI.

---

## Bắt đầu nhanh: kiểm tra qua CLI

Chạy kiểm tra từ thư mục gốc dự án của bạn:

```bash
npx intlayer content test
```

Các cờ hữu ích:

- `--env-file [path]`: tải biến môi trường từ một file.
- `-e, --env [name]`: chọn một profile môi trường.
- `--base-dir [path]`: đặt thư mục gốc của ứng dụng để giải quyết.
- `--verbose`: hiển thị log chi tiết.
- `--prefix [label]`: thêm tiền tố cho dòng log.
- `--build [build]`: build các từ điển trước khi kiểm thử để đảm bảo nội dung được cập nhật. True sẽ ép buộc build, false sẽ bỏ qua build, undefined sẽ cho phép sử dụng cache của build.

Lưu ý: CLI in ra báo cáo chi tiết nhưng không thoát với mã lỗi khác 0 khi có lỗi. Để kiểm soát CI, hãy thêm một unit test (dưới đây) để xác nhận không có locale bắt buộc nào bị thiếu.

---

## Kiểm tra lập trình (Vitest/Jest)

Sử dụng API Intlayer CLI để xác nhận không có bản dịch nào bị thiếu cho các locale bắt buộc của bạn.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Hữu ích khi test thất bại cục bộ hoặc trong CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Tương đương với Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("không có locale bắt buộc nào bị thiếu", async () => {
  const result = await listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // Hữu ích khi test thất bại ở local hoặc trong CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Cách hoạt động:

- Intlayer đọc cấu hình của bạn (locales, requiredLocales) và các từ điển đã khai báo, sau đó báo cáo:
  - `missingTranslations`: theo từng key, locale nào bị thiếu và từ file nào.
  - `missingLocales`: tập hợp tất cả các locale bị thiếu.
  - `missingRequiredLocales`: tập con giới hạn trong `requiredLocales` (hoặc tất cả các locales nếu `requiredLocales` không được thiết lập).

---

## Kiểm thử giao diện người dùng bản địa hóa (React / Next.js)

Render các component dưới một Intlayer provider và kiểm tra nội dung hiển thị.

Ví dụ React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("hiển thị tiêu đề bản địa hóa bằng tiếng Anh", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Expected English title")).toBeInTheDocument();
});
```

Ví dụ Next.js (App Router): sử dụng wrapper của framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("hiển thị tiêu đề bản địa hóa bằng tiếng Pháp", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Mẹo:

- Khi bạn cần giá trị chuỗi thô cho các thuộc tính (ví dụ: `aria-label`), truy cập trường `.value` được trả về bởi `useIntlayer` trong React.
- Giữ các từ điển cùng vị trí với các component để dễ dàng kiểm thử đơn vị và dọn dẹp.

---

## Tích hợp liên tục

Thêm một bài kiểm thử mà sẽ làm build thất bại khi thiếu bản dịch bắt buộc.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Ví dụ GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Tùy chọn: chạy kiểm tra CLI để có bản tóm tắt dễ đọc bên cạnh các bài kiểm tra:

```bash
npx intlayer content test --verbose
```

---

## Khắc phục sự cố

- Đảm bảo cấu hình Intlayer của bạn định nghĩa `locales` và (tùy chọn) `requiredLocales`.
- Nếu ứng dụng của bạn sử dụng từ điển động hoặc từ điển từ xa, hãy chạy các bài kiểm tra trong môi trường mà các từ điển đó có sẵn.
- Đối với các monorepo hỗn hợp, sử dụng `--base-dir` để chỉ CLI đến đúng thư mục gốc của ứng dụng.

---
