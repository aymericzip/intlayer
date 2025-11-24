---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Đẩy Từ Điển
description: Tìm hiểu cách đẩy từ điển của bạn lên trình chỉnh sửa và CMS của Intlayer.
keywords:
  - Đẩy
  - Từ điển
  - CLI
  - Intlayer
  - Trình chỉnh sửa
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Đẩy Từ Điển

```bash
npx intlayer dictionary push
```

Nếu [trình chỉnh sửa intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) đã được cài đặt, bạn cũng có thể đẩy từ điển lên trình chỉnh sửa. Lệnh này sẽ cho phép làm cho các từ điển có sẵn trên [trình chỉnh sửa](https://intlayer.org/dashboard). Bằng cách này, bạn có thể chia sẻ từ điển với nhóm của mình và chỉnh sửa nội dung mà không cần chỉnh sửa mã nguồn của ứng dụng.

## Bí danh:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Tham số:

**Tùy chọn từ điển:**

- **`-d`, `--dictionaries`**: các id của từ điển cần đẩy. Nếu không chỉ định, tất cả từ điển sẽ được đẩy.

  > Ví dụ: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: các id của từ điển cần đẩy (bí danh của --dictionaries).

  > Ví dụ: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc của dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`). Hữu ích khi bạn sử dụng biến môi trường trong file cấu hình intlayer của bạn.
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh để tải biến. Hữu ích khi bạn sử dụng biến môi trường trong file cấu hình intlayer của bạn.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

  > Ví dụ: `npx intlayer dictionary push --env production`

**Tùy chọn đầu ra:**

- **`-r`, `--delete-locale-dictionary`**: Bỏ qua câu hỏi yêu cầu xóa thư mục locales sau khi các từ điển được đẩy lên, và xóa chúng. Mặc định, nếu từ điển được định nghĩa cục bộ, nó sẽ ghi đè nội dung từ điển ở xa.

  > Ví dụ: `npx intlayer dictionary push -r`

  > Ví dụ: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Bỏ qua câu hỏi yêu cầu xóa thư mục locales sau khi các từ điển được đẩy lên, và giữ lại chúng. Mặc định, nếu từ điển được định nghĩa cục bộ, nó sẽ ghi đè nội dung từ điển ở xa.

  > Ví dụ: `npx intlayer dictionary push -k`

  > Ví dụ: `npx intlayer dictionary push --keep-locale-dictionary`

**Tùy chọn chuẩn bị:**

- **`--build`**: Xây dựng các từ điển trước khi đẩy lên để đảm bảo nội dung được cập nhật. True sẽ bắt buộc xây dựng, false sẽ bỏ qua việc xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của bản xây dựng.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi từ cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định: `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các file chưa được theo dõi.

  > Ví dụ: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
