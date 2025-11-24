---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Dịch Tài Liệu
description: Tìm hiểu cách tự động dịch các tệp tài liệu sử dụng dịch vụ dịch thuật AI.
keywords:
  - Dịch
  - Tài liệu
  - Tài liệu hướng dẫn
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Dịch Tài Liệu

Lệnh `doc translate` tự động dịch các tệp tài liệu từ ngôn ngữ cơ sở sang các ngôn ngữ đích sử dụng dịch vụ dịch thuật AI.

```bash
npx intlayer doc translate
```

## Tham số:

**Tùy chọn danh sách tệp:**

- **`--doc-pattern [docPattern...]`**: Các mẫu glob để khớp với các tệp tài liệu cần dịch.

  > Ví dụ: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Các mẫu glob để loại trừ khỏi việc dịch.

  > Ví dụ: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Bỏ qua tệp nếu nó đã được sửa đổi trước thời gian cho trước.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Do đó, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Bỏ qua tệp nếu nó đã được sửa đổi trong khoảng thời gian cho trước.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Do đó, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Bỏ qua tệp nếu tệp đã tồn tại.

  > Ví dụ: `npx intlayer doc translate --skip-if-exists`

**Tùy chọn xuất đầu vào:**

- **`--locales [locales...]`**: Các ngôn ngữ đích để dịch tài liệu.

  > Ví dụ: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Ngôn ngữ nguồn để dịch từ.

  > Ví dụ: `npx intlayer doc translate --base-locale en`

**Tùy chọn xử lý tệp:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Số lượng tệp được xử lý đồng thời để dịch.

  > Ví dụ: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Tùy chọn AI:**

- **`--model [model]`**: Mô hình AI được sử dụng để dịch (ví dụ: `gpt-3.5-turbo`).
- **`--provider [provider]`**: Nhà cung cấp AI được sử dụng để dịch.
- **`--temperature [temperature]`**: Thiết lập nhiệt độ cho mô hình AI.
- **`--api-key [apiKey]`**: Cung cấp khóa API riêng của bạn cho dịch vụ AI.
- **`--application-context [applicationContext]`**: Cung cấp ngữ cảnh bổ sung cho việc dịch AI.
- **`--custom-prompt [prompt]`**: Tùy chỉnh prompt cơ bản được sử dụng cho việc dịch. (Lưu ý: Trong hầu hết các trường hợp, tùy chọn `--custom-instructions` được khuyến nghị hơn vì nó cung cấp kiểm soát tốt hơn đối với hành vi dịch.)

  > Ví dụ: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Ứng dụng của tôi là một cửa hàng mèo"`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp tệp môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

  > Ví dụ: `npx intlayer doc translate --verbose`

**Tùy chọn hướng dẫn tùy chỉnh:**

- **`--custom-instructions [customInstructions]`**: Hướng dẫn tùy chỉnh được thêm vào prompt. Hữu ích để áp dụng các quy tắc cụ thể liên quan đến định dạng, dịch URL, v.v.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Vì vậy, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc translate --custom-instructions "Tránh dịch các URL, và giữ nguyên định dạng markdown"`

  > Ví dụ: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi từ cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định: `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các tệp chưa được theo dõi.

  > Ví dụ: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Lưu ý rằng đường dẫn tệp đầu ra sẽ được xác định bằng cách thay thế các mẫu sau
>
> - `/{{baseLocale}}/` thành `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` thành `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` thành `_{{locale}}.`
> - `{{baseLocale}}_` thành `{{locale}}_`
> - `.{{baseLocaleName}}.` thành `.{{localeName}}.`
>
> Nếu không tìm thấy mẫu, tệp đầu ra sẽ thêm `.{{locale}}` vào phần mở rộng của tệp. Ví dụ, `./my/file.md` sẽ được dịch thành `./my/file.fr.md` cho ngôn ngữ Pháp.
