---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Tự lưu trữ Intlayer (Self-Hosting)
description: "Chạy Intlayer trên cơ sở hạ tầng của riêng bạn: ứng dụng desktop, một container Docker all-in-one duy nhất hoặc stack Docker Compose có thể mở rộng. Không cần tài khoản Intlayer Cloud."
keywords:
  - Self-Hosting
  - Tự lưu trữ
  - Docker
  - Docker Compose
  - Ứng dụng Desktop
  - Intlayer
  - CMS
  - Cài đặt
  - Cơ sở hạ tầng
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Tự lưu trữ Intlayer (Self-Hosting)

Intlayer có thể chạy trên cơ sở hạ tầng của riêng bạn mà không cần tài khoản Intlayer Cloud. Ba cấu hình được cung cấp, tất cả đều có thể thiết lập bằng cùng một trình cài đặt (`install.sh`, `install.ps1` trên Windows, hoặc `npx intlayer init infra`):

| Setup                 | What it is                                                                                               | Pick it for                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Ứng dụng Desktop**  | Bảng điều khiển gốc cho macOS, Linux và Windows                                                          | Một ứng dụng máy khách cục bộ, không cần lưu trữ                |
| **Docker All-in-One** | Bảng điều khiển, API, MongoDB, Redis và MinIO trong **một container duy nhất**                           | Thử nghiệm và cài đặt trên máy đơn quy mô nhỏ                   |
| **Docker Compose**    | **Một container cho mỗi dịch vụ**, mọi kho lưu trữ dữ liệu đều có thể thay thế bằng dịch vụ được quản lý | Môi trường sản xuất, mở rộng quy mô, cơ sở dữ liệu được quản lý |

## Table of Contents

<TOC/>

## Hình ảnh và Gói đã xuất bản

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Cả ba hình ảnh đều được xây dựng từ cùng một tệp [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) và được xuất bản theo từng bản phát hành. Stack Compose cũng kéo các hình ảnh chính thức `mongo:8`, `redis:8-alpine` và `quay.io/minio/minio`.

## Thiết lập

Trình cài đặt sẽ hỏi cấu hình bạn mong muốn, kiểm tra các điều kiện tiên quyết (đề xuất cài đặt Docker), ghi tệp môi trường với các secret đã được tạo sẵn và kéo các hình ảnh. Nó không tự khởi động bất cứ điều gì: các chế độ Docker yêu cầu cấu hình trình gửi thư trước, vì vậy nó kết thúc bằng việc in lệnh cần chạy. Việc chạy lại là an toàn: tệp môi trường hiện có sẽ không bao giờ bị ghi đè, điều này cũng làm cho nó trở thành phương thức nâng cấp.

<Tabs group="mode">
<Tab label="Ứng dụng Desktop" value="desktop">

Bảng điều khiển Intlayer dưới dạng ứng dụng gốc được xây dựng bằng Tauri. Đăng nhập vào Intlayer Cloud (`https://app.intlayer.org`), vì vậy không cần lưu trữ máy chủ. Đây là lựa chọn phù hợp khi bạn muốn dùng ứng dụng cục bộ thay vì tab trình duyệt.

### Cài đặt

Trình cài đặt sẽ tải xuống gói thích hợp cho hệ điều hành và CPU của bạn rồi mở nó (macOS), cài đặt nó (`dpkg` / `rpm` trên Linux), hoặc khởi chạy trình hướng dẫn cài đặt (Windows). Bạn cũng có thể tải xuống thủ công từ [trang Bản phát hành](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Yêu cầu

- **Node.js**: Ứng dụng nhúng máy chủ bảng điều khiển và khởi động bằng tệp thực thi `node` của máy. Cài đặt từ [nodejs.org](https://nodejs.org) nếu ứng dụng không mở.

> Bản dựng desktop đã xuất bản giao tiếp với backend Intlayer Cloud. Để trỏ nó đến backend tự lưu trữ, cần phải xây dựng lại ứng dụng với `VITE_BACKEND_URL` được đặt thành API của bạn, xem [Giới hạn](#limitations).

</Tab>
<Tab label="Docker All-in-One" value="docker">

Mọi thứ chạy bên trong một container `intlayer/cms-all` duy nhất, được giám sát bởi [s6-overlay](https://github.com/just-containers/s6-overlay), với mọi kho dữ liệu được lưu trữ liên tục trên một volume duy nhất.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Dịch vụ     | Cổng máy chủ                  | Mục đích                                                               |
| ----------- | ----------------------------- | ---------------------------------------------------------------------- |
| **app**     | `3000`                        | Bảng điều khiển (Giao diện người dùng CMS)                             |
| **backend** | `3100`                        | REST API (endpoint `/health`)                                          |
| **mongo**   | nội bộ                        | MongoDB 8, replica-set nút đơn `rs0`                                   |
| **redis**   | nội bộ                        | Hàng đợi tác vụ (BullMQ) và bộ nhớ đệm                                 |
| **minio**   | `9000` (S3), `9001` (console) | Lưu trữ đối tượng tương thích S3 cho ảnh đại diện và ảnh chụp màn hình |

Thứ tự khởi động được kiểm soát bởi các phụ thuộc s6 (`mongod` → khởi tạo replica-set, `minio` → tạo bucket, sau đó là `backend`, rồi đến `app`), và các dịch vụ sẽ tự khởi động lại khi kết thúc, do đó lần khởi động đầu tiên sẽ tự phục hồi.

### Điều kiện tiên quyết

- **Docker** ≥ 24: Trình cài đặt đề xuất cài đặt nó (qua [get.docker.com](https://get.docker.com) trên Linux, Homebrew trên macOS). Trên Windows, trước tiên hãy cài đặt [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Các cổng `3000`, `3100`, `9000`, và `9001` còn trống trên máy chủ. Cổng MinIO `9000` phải duy trì khả năng truy cập từ trình duyệt vì tài nguyên được tải trực tiếp từ `S3_PUBLIC_URL`.
- Trình gửi thư (mailer): Khóa API [Resend](https://resend.com) hoặc relay SMTP.

### 1. Cài đặt

Ghi `./intlayer.env` với `BETTER_AUTH_SECRET` và `S3_SECRET_ACCESS_KEY` đã tạo, sau đó kéo `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI chạy trình cài đặt và in lệnh `docker run …` như hiển thị ở các tab khác. Hãy dán vào terminal của bạn sau khi đã định cấu hình mailer.

</Tab>
</Tabs>

### 2. Cấu hình Mailer

Mở `intlayer.env` và điền Resend **hoặc** SMTP (xem chi tiết tại [Trình gửi thư toàn cục](#global-mailer)):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Khởi chạy

Đây là lệnh khởi chạy do trình cài đặt in ra:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI chạy trình cài đặt và in lệnh `docker run …` như hiển thị ở các tab khác. Hãy dán vào terminal của bạn sau khi đã định cấu hình mailer.

</Tab>
</Tabs>

Mở **http://localhost:3000** và làm theo hướng dẫn [Thiết lập lần đầu](#first-run-setup). Lần khởi động đầu tiên sẽ khởi tạo replica-set và bucket, vui lòng đợi trong giây lát.

### Sao lưu và Nâng cấp

Toàn bộ trạng thái được lưu trong volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Để nâng cấp, hãy chạy lại trình cài đặt (nó sẽ kéo hình ảnh mới nhất và giữ nguyên `intlayer.env`), sau đó chạy `docker rm -f intlayer` và chạy lại lệnh khởi chạy. Để sử dụng MongoDB được quản lý thay vì bản đi kèm, hãy đặt `MONGODB_URI` trong `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Một container cho mỗi dịch vụ trên mạng Compose riêng tư. Bảng điều khiển và API sử dụng các hình ảnh `intlayer/cms-frontend` và `intlayer/cms-backend` đã xuất bản; các kho dữ liệu sử dụng hình ảnh chính thức của `mongo`, `redis` và `minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Dịch vụ      | Hình ảnh                | Vai trò                                                               |
| ------------ | ----------------------- | --------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Bảng điều khiển trên `:3000`; chờ backend khỏe mạnh                   |
| `backend`    | `intlayer/cms-backend`  | API trên `:3100` với Chromium; chờ Mongo, Redis và bucket MinIO       |
| `mongo`      | `mongo:8`               | Replica-set nút đơn `rs0`, được khởi tạo bởi chính healthcheck của nó |
| `redis`      | `redis:8-alpine`        | Hàng đợi và bộ nhớ đệm, lưu trữ liên tục chỉ nối thêm (append-only)   |
| `minio`      | `quay.io/minio/minio`   | Lưu trữ S3 trên `:9000`, console trên `:9001`                         |
| `minio-init` | `quay.io/minio/mc`      | Chạy một lần: tạo bucket và chính sách tải xuống ẩn danh              |

Dữ liệu được lưu trữ trong các volume `intlayer_mongo-data`, `intlayer_redis-data` và `intlayer_minio-data`. Các kết nối dịch vụ (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, URL backend nội bộ cho render phía máy chủ) được gắn cố định trong tệp compose và được ưu tiên hơn tệp `.env` (chỉ chứa các secret và tích hợp tùy chọn).

### Điều kiện tiên quyết

- **Docker** ≥ 24 với plugin Compose: Trình cài đặt đề xuất cài đặt nó trên Linux và macOS. Trên Windows, trước tiên hãy cài đặt [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2) terlebih dahulu.
- Các cổng `3000`, `3100`, `9000` và `9001` còn trống trên máy chủ.
- Trình gửi thư: Khóa API [Resend](https://resend.com) hoặc relay SMTP.

### 1. Cài đặt

Ghi `docker-compose.yml` và `.env` với các secret đã tạo vào `./intlayer/` và kéo các hình ảnh.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Cấu hình Mailer

Điền Resend **hoặc** SMTP vào `intlayer/.env`, tương tự như container all-in-one (xem [Trình gửi thư toàn cục](#global-mailer)).

### 3. Khởi chạy

```sh
cd intlayer && docker compose up -d
```

Mở **http://localhost:3000** và làm theo hướng dẫn [Thiết lập lần đầu](#first-run-setup).

### Kho dữ liệu được quản lý

Xóa dịch vụ bạn đang thay thế khỏi tệp compose (cùng với mục `depends_on` của nó trong `backend`), và ghi đè biến tương ứng:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` hoạt động trực tiếp với bất kỳ nhà cung cấp nào tương thích với S3.

### Mở rộng quy mô

`app` và `backend` là stateless. Đằng sau bộ cân bằng tải, giả sử loại bỏ các ánh xạ cổng máy chủ cố định và proxy định tuyến theo tên dịch vụ, `docker compose up -d --scale backend=3` sẽ hoạt động. Các tác vụ nền được điều phối qua Redis (BullMQ), vì vậy nhiều bản sao backend chia sẻ hàng đợi một cách an toàn.

### Xây dựng từ nguồn

Từ bản sao lưu trữ, chuyển đổi hai dịch vụ Intlayer từ `image:` sang `build:` bằng cấu hình ghi đè:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Sử dụng cách này khi xây dựng hình ảnh cho miền tùy chỉnh: truyền các giá trị `VITE_*` dưới dạng đối số bản dựng (xem [Giới hạn](#limitations)).

### Sao lưu và Nâng cấp

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Cài đặt của Trình cài đặt

Nếu không có `--mode` (hoặc `INTLAYER_MODE`), trình cài đặt sẽ nhắc menu: `desktop`, `docker` (all-in-one), hoặc `compose`. Nó cũng đọc một số biến môi trường; hãy truyền chúng vào shell thay vì `curl` vì lệnh này được truyền qua đường ống (piped):

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> Các biến cổng chỉ thay đổi phía **máy chủ** của ánh xạ. Các hình ảnh đã xuất bản có `http://localhost:3000`, `http://localhost:3100`, `http://localhost:9000` được biên dịch sẵn vào gói bảng điều khiển, vì vậy hãy giữ nguyên các giá trị mặc định trừ khi bạn tự xây dựng hình ảnh, xem [Giới hạn](#limitations).

## Thiết lập lần đầu

Khi mở bảng điều khiển trên một phiên bản mới (cơ sở dữ liệu trống), bạn sẽ tự động được chuyển hướng đến trang **`/init`**:

1. Tạo tài khoản đầu tiên. Vì bộ sưu tập người dùng đang trống, tài khoản này sẽ tự động được nâng cấp thành **Super Admin**.
2. Một email xác minh sẽ được gửi qua Resend hoặc relay SMTP của bạn. Xác minh email là **bắt buộc**, đó là lý do tại sao phải cấu hình trình gửi thư trước khi khởi chạy.
3. Nhấp vào liên kết trong email và đăng nhập.

Sau khi đã có quản trị viên, `/init` sẽ chuyển hướng đến trang đăng nhập thông thường.

## Biến môi trường

Cả hai chế độ Docker đều đọc cùng một tệp (tệp `intlayer.env` cho container hoặc `.env` cho Compose) được tạo từ [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Bắt buộc

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Được cố định bởi việc triển khai

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

Dịch vụ Compose `app` nhận thêm `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: trình duyệt tiếp cận API tại `localhost:3100`, nhưng quá trình kết xuất phía máy chủ chạy bên trong mạng Compose nên nó phải sử dụng tên dịch vụ.

### Tùy chọn (các tính năng sẽ giảm cấp nhẹ nhàng khi không được đặt)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Trình gửi thư toàn cục (Mailer)

Tất cả các email giao dịch, bao gồm các email ngoài tổ chức như đặt lại mật khẩu và magic links, đều đi qua một trong hai cổng truyền tải toàn cục:

- **Resend**: Sử dụng `RESEND_API_KEY`.
- **SMTP**: Sử dụng các biến `MAIL_SMTP_*`. Đặt `MAIL_SMTP_HOST` sẽ lập tức chọn giao thức SMTP và bỏ qua `RESEND_API_KEY`.

`MAIL_PROVIDER` chỉ cần thiết khi muốn buộc sử dụng một phương thức truyền tải nếu cả hai đều được cấu hình (ví dụ: `MAIL_PROVIDER=resend` để giữ Resend khi máy chủ SMTP tồn tại).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Thứ tự ưu tiên: Trình gửi thư riêng của tổ chức (được cấu hình từ bảng điều khiển **Tổ chức**) sẽ ghi đè trình gửi thư toàn cục, và trình gửi thư toàn cục sẽ ghi đè khóa Resend mặc định.

## Kết nối Dự án Intlayer của bạn

Sau khi stack đang chạy, hãy cấu hình dự án của bạn để trỏ đến backend và bảng điều khiển tự lưu trữ thay vì `intlayer.org`.

### Cấu hình dự án

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Tạo thông tin đăng nhập truy cập trong bảng điều khiển tự lưu trữ của bạn tại **Dự án → Khóa truy cập** (`http://localhost:3000/projects`).

### SDK `@intlayer/api`

Khi sử dụng SDK `@intlayer/api` theo phương thức lập trình, hãy truyền `backendURL` một cách rõ ràng:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

## Giới hạn

- **Chưa hỗ trợ tên miền tùy chỉnh và ánh xạ lại cổng.** Tất cả các URL `VITE_*` hướng đến trình duyệt đều được nhúng sẵn vào bảng điều khiển tại thời điểm xây dựng, và các hình ảnh đã xuất bản (cùng với ứng dụng desktop) có sẵn các giá trị `localhost` / Intlayer Cloud. Bảng điều khiển phải được truy cập tại `http://localhost:3000`, API tại `:3100` và MinIO tại `:9000`. Việc lưu trữ trên miền công khai hoặc trỏ ứng dụng desktop đến backend tự lưu trữ yêu cầu xây dựng lại với các URL mục tiêu được nhúng sẵn (trên `docker/selfhost/Dockerfile` hoặc `docker-compose.build.yml` với `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`), điều này không được hỗ trợ sẵn ngay khi cài đặt.
- **Gửi thư yêu cầu một mailer hoạt động.** Thiết lập lần đầu bắt buộc phải xác minh email, vì vậy phải định cấu hình `RESEND_API_KEY` hoặc một [relay SMTP](#global-mailer) (`MAIL_SMTP_*`). Sau khi quản trị viên đầu tiên đăng nhập, các tổ chức cũng có thể cấu hình mailer SMTP hoặc Resend riêng của họ từ bảng điều khiển.
- **Ứng dụng desktop yêu cầu Node.js trên máy để khởi động máy chủ nhúng.**

## Liên kết hữu ích

- [Tài liệu Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- [Tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Bản phát hành ứng dụng Desktop](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), mirror GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml`, `.env.template`
