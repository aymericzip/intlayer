---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Tôi nhận được lỗi liên quan đến các gói con @intlayer/*
description: Sửa lỗi liên quan đến các gói con @intlayer/*.
keywords:
  - @intlayer/*
  - các gói con
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Tôi nhận được lỗi liên quan đến các gói con `@intlayer/*`

Vấn đề này thường xảy ra sau khi cập nhật các gói Intlayer.

Ví dụ về thông báo lỗi:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ LỖI  Không có export phù hợp trong "node_modules/@intlayer/config/dist/esm/client.mjs" cho import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Nguyên nhân

Các gói cơ sở như `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` đang tái sử dụng cùng các gói con như `@intlayer/config`, `@intlayer/core`, `@intlayer/types` để tránh trùng lặp mã nguồn.

Giữa hai phiên bản, các exports của các gói con không được đảm bảo là giống nhau. Để hạn chế vấn đề này, intlayer cố định phiên bản của các gói con theo phiên bản của gói chính.

> Ví dụ: `intlayer@1.0.0` sử dụng `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Ngoại trừ `@intlayer/swc`), các gói con `@intlayer/*` không được thiết kế để sử dụng trực tiếp. Vì vậy, chúng tôi khuyến nghị không cài đặt chúng trực tiếp.

## Cách khắc phục

1. Đảm bảo phiên bản của gói chính và các gói con là giống nhau.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Phiên bản sai, nên là 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Thử xóa file khóa (lockfile) và thư mục node_modules rồi cài đặt lại các dependencies.

Đôi khi, trình quản lý gói giữ lại phiên bản cũ của các gói con trong file khóa (lockfile) trong bộ nhớ đệm. Để khắc phục, bạn có thể thử xóa file khóa và thư mục node_modules rồi cài đặt lại các dependencies.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Kiểm tra cài đặt toàn cục (global)

Chúng tôi khuyến nghị cài đặt `intlayer` hoặc `intlayer-cli` ở mức toàn cục để truy cập các lệnh CLI. Nếu phiên bản toàn cục không giống với phiên bản cục bộ, trình quản lý gói có thể sử dụng phiên bản sai.

**Kiểm tra xem một gói có được cài đặt toàn cục không**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Khắc phục xung đột phụ thuộc toàn cục tiềm ẩn**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Thử làm sạch bộ nhớ đệm

Đối với một số môi trường như docker, github actions, hoặc các nền tảng lưu trữ web như Vercel, có thể tồn tại bộ nhớ đệm. Bạn có thể thử làm sạch bộ nhớ đệm và thử cài đặt lại.

Bạn cũng có thể thử làm sạch bộ nhớ đệm của trình quản lý gói với lệnh sau:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
