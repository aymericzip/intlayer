---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Tìm hiểu cách sử dụng lệnh init infra của Intlayer CLI để cài đặt ứng dụng máy tính để bàn hoặc tự lưu trữ Intlayer CMS với Docker (vùng chứa tất cả trong một hoặc ngăn xếp Docker Compose).
keywords:
  - CLI
  - Cơ sở hạ tầng
  - Tự lưu trữ
  - Ứng dụng máy tính để bàn
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Thêm lệnh init infra"
author: aymericzip
---

# Lệnh Intlayer CLI Init Infra

## Mô tả

Lệnh `init infra` thiết lập cơ sở hạ tầng Intlayer trên máy của bạn. Nó tải xuống trình cài đặt được lưu trữ cho nền tảng của bạn (`https://intlayer.org/install.sh` trên macOS / Linux, `https://intlayer.org/install.ps1` trên Windows) và chạy nó trong terminal của bạn, hiển thị trực tiếp menu và tiến trình cài đặt.

Trình cài đặt sẽ hỏi bạn muốn chạy Intlayer như thế nào:

- **Ứng dụng máy tính để bàn**: tải xuống bảng điều khiển gốc cho hệ điều hành và CPU của bạn rồi mở hoặc cài đặt nó. Phiên bản máy tính để bàn kết nối với backend Intlayer Cloud.
- **Docker tất cả trong một (All-in-one)**: bảng điều khiển + API + MongoDB + Redis + MinIO trong một vùng chứa duy nhất với một ổ đĩa lưu trữ. Ghi tệp `./intlayer.env` với các khóa bí mật được tạo và kéo hình ảnh `intlayer/cms-all`.
- **Docker Compose**: một vùng chứa cho mỗi dịch vụ, để tự lưu trữ có thể mở rộng. Ghi `docker-compose.yml` và `.env` vào `./intlayer/` và kéo các hình ảnh.

Trình cài đặt được lưu trữ là nguồn chân lý duy nhất cho quy trình thiết lập: CLI chạy nó thay vì triển khai lại các bước tương tự, do đó `npx intlayer init infra` và `curl -fsSL https://intlayer.org/install.sh | sh` thực hiện hoàn toàn giống nhau.

## Cách sử dụng

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

Bước tương tự cũng được cung cấp trong danh sách kiểm tra của `npx intlayer init --interactive`, tại mục **Cơ sở hạ tầng (ứng dụng máy tính để bàn / tự lưu trữ)**.

## Tùy chọn

- `-m, --mode <mode>` - Tùy chọn. Bỏ qua menu của trình cài đặt và chạy trực tiếp một chế độ. Các giá trị được chấp nhận: `desktop`, `docker` (tất cả trong một) hoặc `compose`. Bất kỳ giá trị nào khác sẽ thoát với lỗi liệt kê các chế độ hợp lệ.

## Ví dụ

### Chọn chế độ tương tác

```bash
npx intlayer init infra
```

### Cài đặt ứng dụng máy tính để bàn

```bash
npx intlayer init infra --mode desktop
```

### Tự lưu trữ với vùng chứa tất cả trong một

```bash
npx intlayer init infra --mode docker
```

### Tự lưu trữ với Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Đầu ra ví dụ

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Cài đặt của trình cài đặt

Trình cài đặt đọc một số biến môi trường mà CLI chuyển tiếp nguyên vẹn. Hãy đặt chúng trong shell của bạn trước khi chạy lệnh:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Biến                      | Mặc định                  | Áp dụng cho | Mô tả                                                     |
| ------------------------- | ------------------------- | ----------- | --------------------------------------------------------- |
| `INTLAYER_MODE`           | _(được hỏi)_              | tất cả      | `desktop`, `docker` hoặc `compose`, tương tự như `--mode` |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop     | Nơi lưu trình cài đặt ứng dụng                            |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker      | Hình ảnh tất cả trong một cần tải                         |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker      | Nơi ghi tệp cấu hình môi trường                           |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker      | Tên vùng chứa                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker      | Ổ đĩa có tên được gắn tại `/data`                         |
| `INTLAYER_APP_PORT`       | `3000`                    | docker      | Cổng máy chủ cho bảng điều khiển                          |
| `INTLAYER_API_PORT`       | `3100`                    | docker      | Cổng máy chủ cho API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker      | Cổng máy chủ cho MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker      | Cổng máy chủ cho bảng điều khiển MinIO                    |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose     | Nơi ghi `docker-compose.yml` và `.env`                    |
| `INTLAYER_SELFHOST_REF`   | `main`                    | cả hai      | Nhánh Git dùng để lấy tệp compose và mẫu env              |

> Các biến cổng chỉ thay đổi phía **máy chủ (host)** của ánh xạ. Các hình ảnh đã xuất bản đã biên dịch sẵn `http://localhost:3000`, `http://localhost:3100` và `http://localhost:9000` vào gói bảng điều khiển, vì vậy hãy giữ nguyên mặc định trừ khi bạn tự xây dựng hình ảnh: xem [hướng dẫn tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md#limitations).

## Yêu cầu

- **Ứng dụng máy tính để bàn** cần [Node.js](https://nodejs.org): ứng dụng nhúng máy chủ bảng điều khiển và khởi chạy nó bằng tệp nhị phân `node` của máy.
- **Chế độ Docker** cần [Docker](https://docs.docker.com/get-docker/) (Docker Desktop với backend WSL 2 trên Windows). Chế độ Compose cũng cần tiện ích mở rộng `docker compose`.

## Ghi chú

- Chạy lại lệnh là an toàn: tệp môi trường hiện có không bao giờ bị ghi đè, đóng vai trò là cách nâng cấp (trình cài đặt kéo các hình ảnh mới nhất và giữ nguyên khóa bí mật của bạn).
- Trình cài đặt được tải xuống một thư mục tạm thời và bị xóa ngay sau khi thoát, bất kể kết quả thế nào.
- Mã thoát của lệnh là mã thoát của trình cài đặt. Nếu quá trình tải xuống không thành công, CLI sẽ in lệnh tương đương `curl … | sh` (hoặc `irm … | iex`) để bạn có thể chạy trực tiếp trình cài đặt.
- Các chế độ Docker vẫn cần một dịch vụ gửi email để gửi email đăng nhập. Sau khi trình cài đặt hoàn tất, hãy định cấu hình Resend hoặc SMTP trong tệp môi trường được tạo: xem [Trình gửi thư toàn cầu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md#global-mailer).

## Liên quan

- [Hướng dẫn tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md) - Kiến trúc, các bước khởi chạy đầu tiên và giới hạn của từng chế độ
- [Khởi tạo Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/init.md) - Lệnh `init` cha và danh sách kiểm tra tương tác của nó
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) - Bảng điều khiển bạn vừa cài đặt làm được những gì
