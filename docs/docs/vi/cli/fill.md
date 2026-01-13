---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Điền Từ điển
description: Tìm hiểu cách điền, kiểm tra và dịch từ điển của bạn bằng AI.
keywords:
  - Điền
  - Kiểm tra
  - Dịch
  - Từ điển
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Điền / kiểm tra / dịch từ điển

```bash
npx intlayer fill
```

Lệnh này phân tích các tệp khai báo nội dung của bạn để tìm các vấn đề tiềm ẩn như thiếu bản dịch, không nhất quán về cấu trúc hoặc không khớp kiểu dữ liệu. Nếu phát hiện bất kỳ vấn đề nào, **intlayer fill** sẽ đề xuất hoặc áp dụng các cập nhật để giữ cho từ điển của bạn nhất quán và đầy đủ.

Điểm chính:

- Chia các tệp JSON lớn thành các phần nhỏ để nằm trong giới hạn cửa sổ ngữ cảnh của mô hình AI.
- Thử lại bản dịch nếu định dạng đầu ra không đúng.
- Tích hợp ngữ cảnh cụ thể cho ứng dụng và tệp để cải thiện độ chính xác của bản dịch.
- Bảo tồn các bản dịch hiện có bằng cách không ghi đè chúng.
- Xử lý tệp, phần và ngôn ngữ song song bằng hệ thống hàng đợi để tăng tốc độ.

## Bí danh:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Ví dụ về đầu ra:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Tham số:

**Tùy chọn danh sách tệp:**

- **`-f, --file [files...]`**: Danh sách các tệp khai báo nội dung cụ thể để kiểm tra. Nếu không được cung cấp, tất cả các tệp `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` được phát hiện dựa trên cấu hình của bạn sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Lọc từ điển dựa trên các khóa. Nếu không được cung cấp, tất cả các từ điển sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Lọc từ điển dựa trên các khóa (bí danh của --keys).

  > Ví dụ: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Loại bỏ các từ điển dựa trên các khóa. Nếu không được cung cấp, tất cả các từ điển sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Loại bỏ các từ điển dựa trên các khóa (bí danh của --excluded-keys).

  > Ví dụ: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Lọc các từ điển dựa trên mẫu glob cho đường dẫn tệp.

  > Ví dụ: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Tùy chọn xuất mục nhập:**

- **`--source-locale [sourceLocale]`**: Ngôn ngữ nguồn để dịch từ đó. Nếu không được chỉ định, ngôn ngữ mặc định từ cấu hình của bạn sẽ được sử dụng.

- **`--output-locales [outputLocales...]`**: Các ngôn ngữ đích để dịch sang. Nếu không được chỉ định, tất cả các ngôn ngữ từ cấu hình của bạn sẽ được sử dụng ngoại trừ ngôn ngữ nguồn.

- **`--mode [mode]`**: Chế độ dịch: `complete`, `review`. Mặc định là `complete`. `complete` sẽ điền tất cả nội dung còn thiếu, `review` sẽ điền nội dung còn thiếu và xem xét lại các khóa đã tồn tại.

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi từ cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các tệp chưa được theo dõi.

  > Ví dụ: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Tùy chọn AI:**

- **`--model [model]`**: Mô hình AI được sử dụng cho việc dịch (ví dụ: `gpt-3.5-turbo`).
- **`--provider [provider]`**: Nhà cung cấp AI được sử dụng cho việc dịch.
- **`--temperature [temperature]`**: Thiết lập nhiệt độ cho mô hình AI.
- **`--api-key [apiKey]`**: Cung cấp khóa API riêng của bạn cho dịch vụ AI.
- **`--custom-prompt [prompt]`**: Cung cấp một prompt tùy chỉnh cho hướng dẫn dịch của bạn.
- **`--application-context [applicationContext]`**: Cung cấp ngữ cảnh bổ sung cho việc dịch AI.

  > Ví dụ: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Ứng dụng của tôi là một cửa hàng mèo"`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp một file môi trường tùy chỉnh để tải các biến.

  > Ví dụ: `npx intlayer fill --env-file .env.production.local`

  > Ví dụ: `npx intlayer fill --env production`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.

  > Ví dụ: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn chuẩn bị:**

- **`--build`**: Xây dựng các từ điển trước khi đẩy để đảm bảo nội dung được cập nhật. True sẽ bắt buộc xây dựng, false sẽ bỏ qua việc xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của lần xây dựng trước đó.

- **`--skip-metadata`**: Bỏ qua việc điền các metadata còn thiếu (mô tả, tiêu đề, thẻ) cho các từ điển.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

## Ví dụ:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Lệnh này sẽ dịch nội dung từ tiếng Anh sang tiếng Pháp và tiếng Tây Ban Nha cho tất cả các file khai báo nội dung trong thư mục `src/home/` sử dụng mô hình GPT-3.5 Turbo.
