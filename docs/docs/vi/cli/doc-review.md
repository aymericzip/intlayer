---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Đánh Giá Tài Liệu
description: Tìm hiểu cách đánh giá các tệp tài liệu về chất lượng, tính nhất quán và độ đầy đủ trên các ngôn ngữ khác nhau.
keywords:
  - Đánh Giá
  - Tài Liệu
  - Tài Liệu Hướng Dẫn
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Đánh Giá Tài Liệu

Lệnh `doc review` phân tích các tệp tài liệu về chất lượng, tính nhất quán và độ đầy đủ trên các ngôn ngữ khác nhau.

## Điểm chính:

- Chia các tệp markdown lớn thành các phần nhỏ để nằm trong giới hạn cửa sổ ngữ cảnh của mô hình AI.
- Tối ưu hóa các phần cần đánh giá và bỏ qua các phần đã được dịch và không thay đổi.
- Xử lý tệp, phần và ngôn ngữ song song bằng hệ thống hàng đợi để tăng tốc độ.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Lệnh này có thể được sử dụng để đánh giá các tệp đã được dịch, và kiểm tra xem bản dịch có chính xác hay không.

Đối với hầu hết các trường hợp sử dụng,

- ưu tiên sử dụng `doc translate` khi phiên bản dịch của tệp này chưa có.
- ưu tiên sử dụng `doc review` khi phiên bản dịch của tệp này đã tồn tại.

> Lưu ý rằng quá trình đánh giá tiêu tốn nhiều token đầu vào hơn so với quá trình dịch để đánh giá toàn bộ tệp. Tuy nhiên, quá trình đánh giá sẽ tối ưu các phần cần đánh giá, và sẽ bỏ qua những phần không thay đổi.

## Tham số:

**Tùy chọn danh sách tệp:**

- **`--doc-pattern [docPattern...]`**: Các mẫu glob để khớp với các tệp tài liệu cần đánh giá.

  > Ví dụ: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Các mẫu glob để loại trừ khỏi việc đánh giá.

  > Ví dụ: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Bỏ qua tệp nếu nó đã được sửa đổi trước thời gian cho trước.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Do đó, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Bỏ qua tệp nếu nó đã được sửa đổi trong khoảng thời gian cho trước.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Do đó, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Bỏ qua tệp nếu tệp đã tồn tại.

  > Ví dụ: `npx intlayer doc review --skip-if-exists`

**Tùy chọn chế độ đánh giá:**

- **`--log`**: Chế độ chỉ ghi log. Không dịch bằng AI; thay vào đó, ghi lại các phần cần lưu ý (kèm số dòng và nội dung) cho ngôn ngữ cơ sở và ngôn ngữ đích, nhằm hỗ trợ một agent khác tạo bản dịch.

  > Ví dụ: `npx intlayer doc review --log`

**Tùy chọn xuất đầu vào:**

- **`--locales [locales...]`**: Các ngôn ngữ đích để đánh giá tài liệu.

  > Ví dụ: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Ngôn ngữ nguồn (tài liệu cơ sở) để so sánh.

  > Ví dụ: `npx intlayer doc review --base-locale en`

**Tùy chọn xử lý tệp:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Số lượng tệp được xử lý đồng thời để đánh giá.

  > Ví dụ: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Tùy chọn AI:**

- **`--model [model]`**: Mô hình AI được sử dụng để đánh giá (ví dụ: `gpt-3.5-turbo`).
- **`--provider [provider]`**: Nhà cung cấp AI được sử dụng để đánh giá.
- **`--temperature [temperature]`**: Thiết lập nhiệt độ cho mô hình AI.
- **`--api-key [apiKey]`**: Cung cấp khóa API riêng của bạn cho dịch vụ AI.
- **`--application-context [applicationContext]`**: Cung cấp ngữ cảnh bổ sung cho việc đánh giá AI.
- **`--data-serialization [dataSerialization]`**: Định dạng tuần tự hóa dữ liệu sử dụng cho các tính năng AI của Intlayer. Các tùy chọn: `json` (tiêu chuẩn, đáng tin cậy), `toon` (ít token hơn, kém nhất quán hơn).
- **`--custom-prompt [prompt]`**: Tùy chỉnh prompt cơ bản được sử dụng cho việc đánh giá. (Lưu ý: Trong hầu hết các trường hợp, tùy chọn `--custom-instructions` được khuyến nghị vì nó cung cấp khả năng kiểm soát tốt hơn.)

  > Ví dụ: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Ứng dụng của tôi là một cửa hàng mèo"`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp tệp môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

  > Ví dụ: `npx intlayer doc review --verbose`

**Tùy chọn hướng dẫn tùy chỉnh:**

- **`--custom-instructions [customInstructions]`**: Hướng dẫn tùy chỉnh được thêm vào prompt. Hữu ích để áp dụng các quy tắc cụ thể liên quan đến định dạng, dịch URL, v.v.

  > Ví dụ: `npx intlayer doc review --custom-instructions "Tránh dịch các URL, và giữ nguyên định dạng markdown"`

  > Ví dụ: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các tệp có thay đổi từ cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định: `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các tệp chưa được theo dõi.

  > Ví dụ: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Lưu ý rằng đường dẫn tệp đầu ra sẽ được xác định bằng cách thay thế các mẫu sau:
>
> - `/{{baseLocale}}/` thành `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` thành `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` thành `_{{locale}}.`
> - `{{baseLocale}}_` thành `{{locale}}_`
> - `.{{baseLocaleName}}.` thành `.{{localeName}}.`
>
> Nếu không tìm thấy mẫu, tệp đầu ra sẽ thêm `.{{locale}}` vào phần mở rộng của tệp. Ví dụ, `./my/file.md` sẽ được đánh giá và cập nhật thành `./my/file.fr.md` cho ngôn ngữ Pháp.
