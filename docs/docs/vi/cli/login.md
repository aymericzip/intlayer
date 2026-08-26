---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Đăng nhập
description: Tìm hiểu cách sử dụng lệnh login của Intlayer CLI để xác thực với Intlayer CMS và lấy thông tin truy cập.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Lệnh Login của Intlayer CLI

---

## Mô tả

Lệnh `login` của Intlayer CLI cho phép bạn xác thực với Intlayer CMS. Lệnh này tự động mở trình duyệt mặc định của bạn để hoàn tất quá trình xác thực và nhận các thông tin xác thực cần thiết (Client ID và Client Secret) để sử dụng dịch vụ Intlayer.

## Cách sử dụng

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

hoặc

```bash
intlayer login [options]
```

## Tùy chọn

### `--cms-url <url>`

Chỉ định URL của Intlayer CMS để kết nối và thực hiện xác thực.

- **Loại**: `string`
- **Mặc định**: Giá trị cấu hình trong `intlayer.config.*` hoặc `https://intlayer.org`
- **Ví dụ**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Tùy chọn cấu hình

Bạn cũng có thể sử dụng các tùy chọn cấu hình chung:

- `--env-file <path>`: Đường dẫn tới file môi trường
- `-e, --env <env>`: Môi trường thực thi
- `--base-dir <dir>`: Thư mục gốc của dự án
- `--verbose`: Bật hiển thị chi tiết (mặc định: true)
- `--prefix <prefix>`: Tiền tố cho các log

## Cách hoạt động

1. **Khởi động máy chủ cục bộ**: Lệnh khởi động một HTTP server cục bộ trên một cổng ngẫu nhiên để nhận thông tin xác thực từ CMS
2. **Mở trình duyệt**: Lệnh tự động mở trình duyệt mặc định của bạn tới URL đăng nhập của CMS
3. **Xác thực**: Hoàn tất xác thực trong trình duyệt bằng tài khoản Intlayer của bạn
4. **Nhận thông tin xác thực**: Máy chủ cục bộ nhận Client ID và Client Secret từ CMS
5. **Hướng dẫn**: Lệnh hiển thị hướng dẫn để cấu hình thông tin xác thực trong dự án của bạn

## Đầu ra

Sau khi đăng nhập thành công, lệnh sẽ hiển thị:

1. **Thông tin xác thực nhận được** (Client ID và Client Secret)
2. **Hướng dẫn cho file `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Hướng dẫn cho file cấu hình Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Giữ an toàn cho access key

`intlayer login` cấp một **access key**: một cặp `clientId` / `clientSecret` mà mọi lệnh có xác thực (`push`, `pull`, `fill`, `configuration push`, `live`, …) sử dụng để xác thực.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` là một thông tin xác thực phía máy chủ.** Nó cấp quyền truy cập đầy đủ API trong phạm vi dự án — đọc và ghi từ điển, dự án và tổ chức của bạn. Hãy giữ nó trong `.env` (git-ignored) hoặc kho secret CI của bạn, và không bao giờ inline nó trong tệp cấu hình.

Intlayer thực thi điều này thay vì chỉ ghi tài liệu:

- `clientSecret` bị **loại bỏ khỏi cấu hình mà bundler của bạn inline**, do đó nó không thể đến được browser bundle cho dù bạn sử dụng framework integration nào. Nó chỉ được đọc phía máy chủ, tại runtime, từ môi trường.
- `clientId` khác: nó là **public** project key, an toàn để ship, và được sử dụng bởi [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/analytics.md#how-events-are-authenticated) để lấy một token có thời hạn ngắn, chỉ dùng cho ingest.

Chỉ cần comment `clientId` là đủ để vô hiệu hóa mọi hành vi có xác thực — fetching từ điển từ xa, truy cập CMS, analytics — thậm chí khi các biến môi trường vẫn được định nghĩa.

Đối với CI pipelines, hãy ưu tiên [`ci` command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md), nó chèn các thông tin xác thực trong suốt một lần chạy duy nhất thay vì duy trì chúng.

## Cấu hình thủ công

Nếu trình duyệt không tự mở, bạn có thể truy cập thủ công URL hiển thị trong terminal.

## Ví dụ

### Đăng nhập với URL CMS tùy chỉnh

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Đăng nhập với file môi trường cụ thể

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Đăng nhập ở chế độ verbose

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Khắc phục sự cố

### Trình duyệt không tự mở

Nếu trình duyệt không tự mở, sao chép URL hiển thị trong terminal và mở thủ công trên trình duyệt của bạn.

### Sự cố kết nối

Nếu bạn gặp sự cố kết nối, kiểm tra:

1. Đảm bảo URL của CMS là chính xác
2. Kết nối Internet của bạn đang hoạt động bình thường
3. Không có tường lửa nào chặn kết nối

### Không nhận được thông tin xác thực

Nếu không nhận được thông tin xác thực:

1. Đảm bảo bạn đã hoàn tất quy trình xác thực trong trình duyệt
2. Xác nhận rằng cổng cục bộ không bị chặn
3. Thử chạy lại lệnh

## Các bước tiếp theo

Sau khi hoàn tất đăng nhập:

1. Thêm thông tin xác thực vào file `.env` của bạn
2. Cấu hình file `intlayer.config.*` của bạn với thông tin xác thực
3. Sử dụng các lệnh CLI để quản lý các từ điển của bạn:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/push.md) - Đẩy từ điển lên CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/pull.md) - Kéo từ điển từ CMS

## Xem thêm

- [Tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [CMS của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
