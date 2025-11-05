---
createdAt: 2024-08-11
updatedAt: 2025-01-27
title: CLI
description: Khám phá cách sử dụng Intlayer CLI để quản lý trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - CLI
  - Giao diện Dòng Lệnh
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 6.1.4
    date: 2025-01-27
    changes: Thêm bí danh cho các đối số và lệnh CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Thêm tùy chọn build cho các lệnh
  - version: 6.1.2
    date: 2025-09-26
    changes: Thêm lệnh version
  - version: 6.1.0
    date: 2025-09-26
    changes: Đặt tùy chọn verbose mặc định là true khi sử dụng CLI
  - version: 6.1.0
  date: 2025-09-23
  changes: Thêm lệnh watch và tùy chọn with
- version: 6.0.1
  date: 2025-09-23
  changes: Thêm lệnh editor
- version: 6.0.0
  date: 2025-09-17
  changes: Thêm lệnh content test và list
- version: 5.5.11
  date: 2025-07-11
  changes: Cập nhật tài liệu tham số lệnh CLI
- version: 5.5.10
  date: 2025-06-29
  changes: Khởi tạo lịch sử
---

# Intlayer CLI

---

## Mục Lục

<TOC/>

---

## Cài Đặt Gói

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Nếu gói `intlayer` đã được cài đặt, CLI sẽ được cài đặt tự động. Bạn có thể bỏ qua bước này.

## Gói intlayer-cli

Gói `intlayer-cli` nhằm mục đích transpile các [khai báo intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md) của bạn thành các từ điển.

Gói này sẽ transpile tất cả các file intlayer, như `src/**/*.content.{ts|js|mjs|cjs|json}`. [Xem cách khai báo các file Intlayer của bạn](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Để diễn giải các từ điển intlayer, bạn có thể sử dụng các trình thông dịch, như [react-intlayer](https://www.npmjs.com/package/react-intlayer), hoặc [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Hỗ trợ File Cấu Hình

Intlayer chấp nhận nhiều định dạng file cấu hình khác nhau:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Để xem cách cấu hình các ngôn ngữ có sẵn hoặc các tham số khác, hãy tham khảo [tài liệu cấu hình tại đây](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Chạy các lệnh intlayer

### Kiểm tra phiên bản CLI

```bash
npx intlayer --version
npx intlayer version
```

Cả hai lệnh đều in ra phiên bản Intlayer CLI đã cài đặt.

### Xây dựng từ điển

Để xây dựng các từ điển của bạn, bạn có thể chạy các lệnh:

```bash
npx intlayer build
```

hoặc ở chế độ theo dõi

```bash
npx intlayer build --watch
```

Lệnh này sẽ tìm các file khai báo nội dung của bạn theo mặc định tại `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Và xây dựng các từ điển trong thư mục `.intlayer`.

##### Bí danh:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

##### Tham số:

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer build --base-dir ./src`

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`). Hữu ích khi bạn sử dụng biến môi trường trong file cấu hình intlayer.

  > Ví dụ: `npx intlayer build --env production`

- **`--env-file`**: Cung cấp một file môi trường tùy chỉnh để tải các biến. Hữu ích khi bạn sử dụng biến môi trường trong file cấu hình intlayer.

  > Ví dụ: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Khởi chạy lệnh song song với quá trình build.

  > Ví dụ: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Bỏ qua bước chuẩn bị.

  > Ví dụ: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

### Theo dõi từ điển

```bash
npx intlayer watch
```

Lệnh này sẽ theo dõi các thay đổi trong các file khai báo nội dung của bạn và xây dựng các từ điển trong thư mục `.intlayer`.
Lệnh này tương đương với `npx intlayer build --watch --skip-prepare`.

##### Bí danh:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

##### Tham số:

- **`--with`**: Khởi chạy lệnh song song với quá trình theo dõi.

  > Ví dụ: `npx intlayer watch --with "next dev --turbopack"`

### Đẩy từ điển

```bash
npx intlayer dictionary push
```

Nếu [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) được cài đặt, bạn cũng có thể đẩy các từ điển lên trình soạn thảo. Lệnh này sẽ cho phép làm cho các từ điển có sẵn trên [trình soạn thảo](https://intlayer.org/dashboard). Bằng cách này, bạn có thể chia sẻ các từ điển của mình với nhóm và chỉnh sửa nội dung mà không cần chỉnh sửa mã nguồn của ứng dụng.

##### Bí danh:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Tham số:

**Tùy chọn từ điển:**

- **`-d`, `--dictionaries`**: các id của từ điển cần đẩy. Nếu không chỉ định, tất cả các từ điển sẽ được đẩy.

  > Ví dụ: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: các id của từ điển cần đẩy (bí danh của --dictionaries).

  > Ví dụ: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`). Hữu ích trong trường hợp bạn sử dụng biến môi trường trong file cấu hình intlayer.
- **`--env-file`**: Cung cấp một file môi trường tùy chỉnh để tải các biến. Hữu ích trong trường hợp bạn sử dụng biến môi trường trong file cấu hình intlayer.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

  > Ví dụ: `npx intlayer dictionary push --env production`

**Tùy chọn đầu ra:**

- **`-r`, `--delete-locale-dictionary`**: Bỏ qua câu hỏi yêu cầu xóa các thư mục locales sau khi các từ điển được đẩy lên, và xóa chúng. Mặc định, nếu từ điển được định nghĩa cục bộ, nó sẽ ghi đè nội dung từ điển từ xa.

  > Ví dụ: `npx intlayer dictionary push -r`

  > Ví dụ: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Bỏ qua câu hỏi yêu cầu xóa các thư mục locales sau khi các từ điển được đẩy lên, và giữ lại chúng. Mặc định, nếu từ điển được định nghĩa cục bộ, nó sẽ ghi đè nội dung từ điển từ xa.

  > Ví dụ: `npx intlayer dictionary push -k`

  > Ví dụ: `npx intlayer dictionary push --keep-locale-dictionary`

**Tùy chọn chuẩn bị:**

- **`--build`**: Xây dựng các từ điển trước khi đẩy để đảm bảo nội dung được cập nhật. True sẽ ép buộc xây dựng, false sẽ bỏ qua xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của bản xây dựng.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi từ nhánh cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các file chưa được theo dõi.

  > Ví dụ: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Kéo từ điển từ xa

```bash
npx intlayer pull
```

Nếu [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) được cài đặt, bạn cũng có thể kéo từ điển từ trình chỉnh sửa. Bằng cách này, bạn có thể ghi đè nội dung của các từ điển để phục vụ nhu cầu của ứng dụng của bạn.

##### Bí danh:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Tham số:

**Tùy chọn từ điển:**

- **`-d, --dictionaries`**: Id của các từ điển cần kéo. Nếu không chỉ định, tất cả các từ điển sẽ được kéo.

  > Ví dụ: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Id của các từ điển cần kéo (bí danh của --dictionaries).

  > Ví dụ: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp file môi trường tùy chỉnh để tải biến từ đó.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

  > Ví dụ: `npx intlayer dictionary push --env production`

**Tùy chọn đầu ra:**

- **`--new-dictionaries-path`**: Đường dẫn đến thư mục nơi các từ điển mới sẽ được lưu. Nếu không được chỉ định, các từ điển mới sẽ được lưu trong thư mục `./intlayer-dictionaries` của dự án. Nếu trường `filePath` được chỉ định trong nội dung từ điển của bạn, các từ điển sẽ không xem xét đối số này và sẽ được lưu trong thư mục `filePath` đã chỉ định.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

##### Ví dụ:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Điền / kiểm tra / dịch các từ điển

```bash
npx intlayer fill
```

Lệnh này phân tích các file khai báo nội dung của bạn để tìm các vấn đề tiềm ẩn như thiếu bản dịch, không nhất quán về cấu trúc hoặc không khớp kiểu dữ liệu. Nếu phát hiện vấn đề, **intlayer fill** sẽ đề xuất hoặc áp dụng các cập nhật để giữ cho các từ điển của bạn nhất quán và đầy đủ.

##### Các bí danh:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Tham số:

**Tùy chọn danh sách file:**

- **`-f, --file [files...]`**: Danh sách các file khai báo nội dung cụ thể để kiểm tra. Nếu không được cung cấp, tất cả các file `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` được phát hiện dựa trên cấu hình của bạn sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Lọc các từ điển dựa trên các khóa. Nếu không được cung cấp, tất cả các từ điển sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Lọc các từ điển dựa trên các khóa (bí danh của --keys).

  > Ví dụ: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Lọc bỏ các từ điển dựa trên các khóa. Nếu không được cung cấp, tất cả các từ điển sẽ được kiểm tra.

  > Ví dụ: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Lọc bỏ các từ điển dựa trên các khóa (bí danh của --excluded-keys).

  > Ví dụ: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Lọc các từ điển dựa trên mẫu glob cho đường dẫn tệp.

  > Ví dụ: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Tùy chọn xuất mục nhập:**

- **`--source-locale [sourceLocale]`**: Ngôn ngữ nguồn để dịch từ. Nếu không được chỉ định, ngôn ngữ mặc định từ cấu hình của bạn sẽ được sử dụng.

- **`--output-locales [outputLocales...]`**: Ngôn ngữ đích để dịch sang. Nếu không được chỉ định, tất cả các ngôn ngữ trong cấu hình của bạn sẽ được sử dụng ngoại trừ ngôn ngữ nguồn.

- **`--mode [mode]`**: Chế độ dịch: `complete`, `review`. Mặc định là `complete`. `complete` sẽ điền tất cả nội dung còn thiếu, `review` sẽ điền nội dung còn thiếu và xem xét lại các khóa hiện có.

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi từ cơ sở (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu cơ sở cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định: `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa được commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa được đẩy lên.
- **`--untracked`**: Bao gồm các tệp chưa được theo dõi.

  > Ví dụ: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Tùy chọn AI:**

- **`--model [model]`**: Mô hình AI được sử dụng cho việc dịch (ví dụ: `gpt-3.5-turbo`).
- **`--provider [provider]`**: Nhà cung cấp AI được sử dụng cho việc dịch.
- **`--temperature [temperature]`**: Cài đặt nhiệt độ cho mô hình AI.
- **`--api-key [apiKey]`**: Cung cấp khóa API riêng của bạn cho dịch vụ AI.
- **`--custom-prompt [prompt]`**: Cung cấp một lời nhắc tùy chỉnh cho hướng dẫn dịch của bạn.
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

- **`--build`**: Xây dựng các từ điển trước khi đẩy để đảm bảo nội dung được cập nhật. True sẽ bắt buộc xây dựng, false sẽ bỏ qua xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của bản build.

- **`--skip-metadata`**: Bỏ qua việc điền các metadata còn thiếu (mô tả, tiêu đề, thẻ) cho các từ điển.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

##### Ví dụ:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Lệnh này sẽ dịch nội dung từ tiếng Anh sang tiếng Pháp và tiếng Tây Ban Nha cho tất cả các file khai báo nội dung trong thư mục `src/home/` sử dụng mô hình GPT-3.5 Turbo.

### Kiểm tra bản dịch còn thiếu

```bash
npx intlayer content test
```

##### Bí danh:

- `npx intlayer test`

Lệnh này phân tích các file khai báo nội dung của bạn để xác định các bản dịch còn thiếu trên tất cả các locale đã cấu hình. Nó cung cấp một báo cáo tổng thể cho thấy các khóa dịch nào đang thiếu ở các locale nào, giúp bạn duy trì sự nhất quán trong nội dung đa ngôn ngữ của mình.

##### Ví dụ đầu ra:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Thiếu các locales bắt buộc: -
Tổng số locales thiếu: 3
Tổng số locales bắt buộc thiếu: 0
```

##### Tham số:

**Tùy chọn cấu hình:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp file môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.

  > Ví dụ: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer build --no-cache`

**Tùy chọn chuẩn bị:**

- **`--build`**: Xây dựng các từ điển trước khi đẩy để đảm bảo nội dung được cập nhật. True sẽ ép buộc xây dựng, false sẽ bỏ qua xây dựng, undefined sẽ cho phép sử dụng bộ nhớ đệm của bản build.

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

  > Ví dụ: `npx intlayer content test --verbose`

##### Ví dụ:

```bash
npx intlayer content test --verbose
```

##### Ví dụ đầu ra:

```bash
npx intlayer content list
Các tệp khai báo nội dung:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Tổng số tệp khai báo nội dung: 3
```

Lệnh này sẽ quét tất cả các tệp khai báo nội dung của bạn và hiển thị:

- Danh sách chi tiết các bản dịch còn thiếu với các khóa, locale còn thiếu và đường dẫn tệp
- Thống kê tóm tắt bao gồm tổng số locale còn thiếu và locale bắt buộc còn thiếu
- Đầu ra được mã màu giúp dễ dàng nhận diện các vấn đề

Đầu ra giúp bạn nhanh chóng xác định các bản dịch cần được hoàn thành để đảm bảo ứng dụng của bạn hoạt động đúng trên tất cả các locale đã cấu hình.

### Liệt kê các tệp khai báo nội dung

```bash
npx intlayer content list
```

##### Bí danh:

- `npx intlayer list`

Lệnh này hiển thị tất cả các tệp khai báo nội dung trong dự án của bạn, cho thấy các khóa từ điển và đường dẫn tệp của chúng. Nó hữu ích để có cái nhìn tổng quan về tất cả các tệp nội dung của bạn và xác minh rằng chúng được Intlayer phát hiện đúng cách.

##### Ví dụ:

```bash
npx intlayer content list
```

Lệnh này sẽ xuất ra:

- Danh sách được định dạng của tất cả các tệp khai báo nội dung với các khóa và đường dẫn tệp tương đối
- Tổng số tệp khai báo nội dung được tìm thấy

Đầu ra giúp bạn xác minh rằng tất cả các tệp nội dung của bạn được cấu hình đúng và có thể được hệ thống Intlayer phát hiện.

### Quản lý Cấu hình

#### Lấy Cấu hình

Lệnh `configuration get` lấy cấu hình hiện tại cho Intlayer, đặc biệt là các thiết lập locale. Điều này hữu ích để xác minh cấu hình của bạn.

```bash
npx intlayer configuration get
```

##### Bí danh:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Tham số:

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp tệp môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi dùng CLI)
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

#### Đẩy Cấu Hình

Lệnh `configuration push` tải cấu hình của bạn lên Intlayer CMS và trình chỉnh sửa. Bước này cần thiết để cho phép sử dụng từ điển từ xa trong Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

##### Bí danh:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Tham số:

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file`**: Cung cấp tệp môi trường tùy chỉnh để tải biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi dùng CLI)
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

Bằng cách đẩy cấu hình, dự án của bạn được tích hợp hoàn toàn với Intlayer CMS, cho phép quản lý từ điển liền mạch giữa các nhóm.

### Quản lý Tài liệu

Các lệnh `doc` cung cấp công cụ để quản lý và dịch các tệp tài liệu trên nhiều ngôn ngữ.

#### Dịch Tài liệu

Lệnh `doc translate` tự động dịch các tệp tài liệu từ ngôn ngữ gốc sang các ngôn ngữ mục tiêu bằng dịch vụ dịch AI.

```bash
npx intlayer doc translate
```

##### Tham số:

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
  - Tùy chọn này kiểm tra thời gian cập nhật của tệp bằng phương thức `fs.stat`. Vì vậy, nó có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi tệp.

  > Ví dụ: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Tùy chọn xuất đầu mục:**

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
- **`--temperature [temperature]`**: Cài đặt nhiệt độ cho mô hình AI.
- **`--api-key [apiKey]`**: Cung cấp khóa API riêng của bạn cho dịch vụ AI.
- **`--application-context [applicationContext]`**: Cung cấp ngữ cảnh bổ sung cho việc dịch AI.
- **`--custom-prompt [prompt]`**: Tùy chỉnh prompt cơ bản được sử dụng cho việc dịch. (Lưu ý: Trong hầu hết các trường hợp, tùy chọn `--custom-instructions` được khuyến nghị hơn vì nó cung cấp kiểm soát tốt hơn về hành vi dịch.)

  > Ví dụ: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Ứng dụng của tôi là một cửa hàng mèo"`

**Tùy chọn biến môi trường:**

- **`--env`**: Chỉ định môi trường (ví dụ: `development`, `production`).
- **`--env-file [envFile]`**: Cung cấp một file môi trường tùy chỉnh để tải các biến.
- **`--base-dir`**: Chỉ định thư mục gốc cho dự án.
- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi dùng CLI)

  > Ví dụ: `npx intlayer doc translate --verbose`

**Tùy chọn hướng dẫn tùy chỉnh:**

- **`--custom-instructions [customInstructions]`**: Hướng dẫn tùy chỉnh được thêm vào prompt. Hữu ích để áp dụng các quy tắc cụ thể liên quan đến định dạng, dịch URL, v.v.
  - Có thể là thời gian tuyệt đối như "2025-12-05" (chuỗi hoặc Date)
  - Có thể là thời gian tương đối tính bằng ms `1 * 60 * 60 * 1000` (1 giờ)
  - Tùy chọn này kiểm tra thời gian cập nhật của file bằng phương thức `fs.stat`. Vì vậy có thể bị ảnh hưởng bởi Git hoặc các công cụ khác sửa đổi file.

  > Ví dụ: `npx intlayer doc translate --custom-instructions "Tránh dịch các url, và giữ nguyên định dạng markdown"`

  > Ví dụ: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Tùy chọn Git:**

- **`--git-diff`**: Chỉ chạy trên các từ điển có thay đổi so với base (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).
- **`--git-diff-base`**: Chỉ định tham chiếu base cho git diff (mặc định `origin/main`).
- **`--git-diff-current`**: Chỉ định tham chiếu hiện tại cho git diff (mặc định `HEAD`).
- **`--uncommitted`**: Bao gồm các thay đổi chưa commit.
- **`--unpushed`**: Bao gồm các thay đổi chưa đẩy lên.
- **`--untracked`**: Bao gồm các file chưa được theo dõi.

  > Ví dụ: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Ví dụ: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Lưu ý rằng đường dẫn file đầu ra sẽ được xác định bằng cách thay thế các mẫu sau
>
> - `/{{baseLocale}}/` thành `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` thành `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` thành `_{{locale}}.`
> - `{{baseLocale}}_` thành `{{locale}}_`
> - `.{{baseLocaleName}}.` thành `.{{localeName}}.`
>
> Nếu không tìm thấy mẫu, file đầu ra sẽ thêm `.{{locale}}` vào phần mở rộng của file. Ví dụ `./my/file.md` sẽ được dịch thành `./my/file.fr.md` cho locale tiếng Pháp.

#### Xem lại tài liệu

Lệnh `doc review` phân tích các file tài liệu để đánh giá chất lượng, tính nhất quán và độ đầy đủ giữa các locale khác nhau.

```bash
npx intlayer doc review
```

Nó có thể được sử dụng để xem lại các file đã được dịch, và kiểm tra xem bản dịch có chính xác hay không.

Đối với hầu hết các trường hợp sử dụng,

- ưu tiên sử dụng `doc translate` khi phiên bản dịch của file này chưa có.
- ưu tiên sử dụng `doc review` khi phiên bản dịch của file này đã tồn tại.

> Lưu ý rằng quá trình xem lại tiêu tốn nhiều token đầu vào hơn so với quá trình dịch để xem xét toàn bộ file. Tuy nhiên, quá trình xem lại sẽ tối ưu hóa các phần cần xem xét, và bỏ qua những phần không thay đổi.

##### Tham số:

Lệnh `doc review` chấp nhận các tham số giống như `doc translate`, cho phép bạn xem lại các file tài liệu cụ thể và áp dụng các kiểm tra chất lượng.

Nếu bạn đã kích hoạt một trong các tùy chọn git, lệnh sẽ chỉ xem lại phần của các file bị thay đổi. Script sẽ xử lý bằng cách chia nhỏ file thành các chunk và xem xét từng chunk. Nếu không có thay đổi trong chunk, script sẽ bỏ qua để tăng tốc quá trình xem lại và giới hạn chi phí API của nhà cung cấp AI.

## Sử dụng các lệnh intlayer trong `package.json` của bạn

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Lưu ý**: Bạn cũng có thể sử dụng các bí danh ngắn hơn:
>
> - `npx intlayer list` thay vì `npx intlayer content list`
> - `npx intlayer test` thay vì `npx intlayer content test`

### Lệnh Editor

Lệnh `editor` bao bọc lại các lệnh của `intlayer-editor`.

> Để có thể sử dụng lệnh `editor`, gói `intlayer-editor` phải được cài đặt. (Xem [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```

### Lệnh Live Sync

Live Sync cho phép ứng dụng của bạn phản ánh các thay đổi nội dung CMS trong thời gian chạy. Không cần phải xây dựng lại hoặc triển khai lại. Khi được bật, các cập nhật sẽ được truyền đến một máy chủ Live Sync để làm mới các từ điển mà ứng dụng của bạn đọc. Xem thêm [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để biết chi tiết.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

##### Tham số:

**Tùy chọn cấu hình:**

- **`--base-dir`**: Chỉ định thư mục gốc cho dự án. Để lấy cấu hình intlayer, lệnh sẽ tìm file `intlayer.config.{ts,js,json,cjs,mjs}` trong thư mục gốc.

- **`--no-cache`**: Vô hiệu hóa bộ nhớ đệm.

  > Ví dụ: `npx intlayer dictionary push --env-file .env.production.local`

**Tùy chọn ghi log:**

- **`--verbose`**: Bật ghi log chi tiết để gỡ lỗi. (mặc định là true khi sử dụng CLI)

---

## CLI SDK

CLI SDK là một thư viện cho phép bạn sử dụng Intlayer CLI trong mã nguồn của riêng bạn.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Ví dụ sử dụng:

```ts
import {
  push,
  pull,
  fill,
  build,
  listContentDeclaration,
  testMissingTranslations,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
listContentDeclaration();
// ...
testMissingTranslations();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Gỡ lỗi lệnh intlayer

### 1. **Đảm bảo bạn đang sử dụng phiên bản mới nhất**

Chạy:

```bash
npx intlayer --version                  # phiên bản intlayer hiện tại theo locale
npx intlayer@latest --version           # phiên bản intlayer mới nhất hiện tại
```

### 2. **Kiểm tra xem lệnh đã được đăng ký chưa**

Bạn có thể kiểm tra bằng:

```bash
npx intlayer --help                     # Hiển thị danh sách các lệnh có sẵn và thông tin sử dụng
npx intlayer dictionary build --help    # Hiển thị danh sách các tùy chọn có sẵn cho một lệnh
```

### 3. **Khởi động lại terminal của bạn**

Đôi khi cần khởi động lại terminal để nhận diện các lệnh mới.

### 4. **Xóa cache npx (nếu bạn bị kẹt với phiên bản cũ hơn)**

```bash
npx clear-npx-cache
```
