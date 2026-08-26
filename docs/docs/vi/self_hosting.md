---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Tự host Intlayer
description: Chạy một phiên bản Intlayer hoàn chỉnh trên hạ tầng của riêng bạn chỉ với một lệnh duy nhất. Không yêu cầu tài khoản Intlayer Cloud.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Tự host Intlayer

Intlayer có thể chạy hoàn toàn trên hạ tầng của riêng bạn — không yêu cầu tài khoản Intlayer Cloud. Chỉ một lệnh duy nhất sẽ khởi động một stack sẵn sàng cho production:

Một lệnh cài đặt mọi thứ:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Trình cài đặt sẽ tải xuống `docker-compose.yml` và `.env`, tự động tạo các secret cần thiết, và khởi động tất cả các container với `docker compose up -d`.

Sự phụ thuộc duy nhất bên ngoài là **MongoDB**: backend kết nối với một cluster **Atlas** MongoDB mà bạn cung cấp. Mọi thứ khác chạy bên trong container.

## Mục lục

<TOC/>

---

## Kiến trúc

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium (được sử dụng để tạo ảnh chụp màn hình Puppeteer) được đóng gói bên trong image backend — không cần container riêng.

---

## Điều kiện tiên quyết

- **Docker** ≥ 24 và **Docker Compose** ≥ v2. Nếu thiếu một trong hai, trình cài đặt sẽ in liên kết cài đặt và thoát.
- Các cổng `3000`, `3100`, `8025`, `9000`, và `9001` phải khả dụng trên host.
- Host chạy Linux hoặc macOS (hoặc WSL2 trên Windows).

Mọi thứ khác — Bun, Redis, MinIO, Chromium — đều được đóng gói trong image.

---

## Bắt đầu nhanh

### 1. Chạy trình cài đặt

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Nó xác minh Docker đã được cài đặt và đang chạy, ghi `./intlayer.env` với `BETTER_AUTH_SECRET` và `S3_SECRET_ACCESS_KEY` đã được tạo sẵn, và kéo image. Nó không khởi động container — backend không thể khởi động mà không có thông tin đăng nhập cơ sở dữ liệu của bạn.

Chạy lại trình cài đặt là an toàn: một `intlayer.env` hiện có sẽ không bao giờ bị ghi đè, vì vậy nó cũng đóng vai trò là đường dâng cập nhật.

### 2. Điền thông tin đăng nhập của bạn

Mở `intlayer.env` và hoàn thành các giá trị được đánh dấu `TODO`:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

Tệp này cũng chứa các khối được comment cho các tính năng tùy chọn — [SMTP mailer](#global-mailer), `OPENAI_API_KEY`, và các nhà cung cấp OAuth. Bỏ comment những tính năng bạn cần.

> Tệp được đọc bởi `docker run --env-file`, tệp này không loại bỏ dấu ngoặc kép và xem mọi thứ sau `=` là giá trị. Viết các giá trị không có dấu ngoặc kép, và giữ các comment trên các dòng riêng biệt.

### 3. Khởi động container

Đây là lệnh mà trình cài đặt in ra khi hoàn thành:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

Sau đó mở **http://localhost:3000**. Lần khởi động đầu tiên sẽ khởi tạo các datastores, vì vậy hãy chờ một phút.

> Dashboard được phục vụ trên `localhost`. Xem [Limitations](#limitations) — các custom domains không được hỗ trợ bởi image được công bố.

### Cài đặt Installer

Installer đọc một số biến môi trường. Vì nó được pipe vào `sh`, hãy truyền chúng cho shell thay vì cho `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Default                                       | Description                      |
| ------------------------- | --------------------------------------------- | -------------------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Image để pull                    |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Nơi ghi file env                 |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Tên container                    |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Named volume mounted tại `/data` |
| `INTLAYER_APP_PORT`       | `3000`                                        | Host port cho dashboard          |
| `INTLAYER_API_PORT`       | `3100`                                        | Host port cho API                |
| `INTLAYER_S3_PORT`        | `9000`                                        | Host port cho MinIO S3 API       |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Host port cho MinIO console      |

> Bốn biến port chỉ thay đổi phía **host** của mapping được in trong lệnh `docker run`. Image được công bố có `http://localhost:3000`, `http://localhost:3100` và `http://localhost:9000` được biên dịch vào dashboard bundle tại thời điểm build, vì vậy việc ánh xạ lại chúng làm cho trình duyệt chỉ đến các port cũ. Giữ các giá trị mặc định trừ khi bạn đang xây dựng image của riêng mình — xem [Limitations](#limitations).

---

## Bắt đầu nhanh

Những gì trình cài đặt thực hiện:

1.  Kiểm tra xem `docker` và `docker compose` có tồn tại không.
2.  Tải xuống `docker-compose.yml` và `.env.example` vào `./intlayer/`.
3.  Nếu không có `.env` tồn tại, sao chép file ví dụ và tạo các secret ngẫu nhiên cho `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, và `S3_SECRET_ACCESS_KEY` thông qua `openssl rand`.
4.  Chạy `docker compose pull` + `docker compose up -d`.
5.  In các URL: dashboard `:3000`, API `:3100`, UI email `:8025`, console MinIO `:9001`.

Sau khi stack hoạt động, mở **http://localhost:3000** và tạo tài khoản đầu tiên của bạn.

---

## Các dịch vụ

| Dịch vụ     | Image                                      | Cổng Host                      | Mục đích                                                         |
| ----------- | ------------------------------------------ | ------------------------------ | ---------------------------------------------------------------- |
| **app**     | được xây dựng từ `apps/app/Dockerfile`     | `3000`                         | Dashboard TanStack Start (UI của CMS)                            |
| **backend** | được xây dựng từ `apps/backend/Dockerfile` | `3100`                         | API REST Fastify (endpoint `/health`)                            |
| **mongo**   | `mongo:7`                                  | nội bộ                         | Bộ nhân bản một node (`rs0`)                                     |
| **redis**   | `redis:7-alpine`                           | nội bộ                         | Hàng đợi công việc (BullMQ) và caching (ioredis)                 |
| **minio**   | `minio/minio`                              | `9000` (S3), `9001` (console)  | Lưu trữ đối tượng tương thích S3 cho avatar và ảnh chụp màn hình |
| **mailpit** | `axllent/mailpit`                          | `1025` (SMTP), `8025` (web UI) | Nơi nhận email giao dịch cục bộ                                  |

> Cổng MinIO `9000` phải có thể truy cập được bởi trình duyệt vì các tài sản được tải lên (avatars, ảnh chụp màn hình) được tải trực tiếp từ `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Biến môi trường

### Bắt buộc

| Variable               | Example                      | Description                                                                                                                                  |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                                                                                                           |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                                                                                                       |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI)                                                                                |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                                                                                                 |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email via Resend. Required for first-run setup unless you configure a global SMTP mailer (see [Global mailer](#global-mailer)) |

### Bắt buộc (tự động tạo hoặc được nhắc nhở)

| Biến                   | Ví dụ                                           | Mô tả                                             |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Môi trường runtime                                |
| `PORT`                 | `3100`                                          | Cổng lắng nghe của Backend                        |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL công khai của API backend                     |
| `APP_URL`              | `http://localhost:3000`                         | URL công khai của dashboard                       |
| `DOMAIN`               | `localhost`                                     | Miền cookie                                       |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI kết nối MongoDB đầy đủ                        |
| `REDIS_URL`            | `redis://redis:6379`                            | URL kết nối Redis                                 |
| `BETTER_AUTH_SECRET`   | _(được tạo)_                                    | Secret 32-byte để ký session                      |
| `MAIL_PROVIDER`        | `smtp`                                          | Phương thức gửi mail: `smtp` hoặc `resend`        |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Tên host SMTP (tên container Mailpit)             |
| `MAIL_SMTP_PORT`       | `1025`                                          | Cổng SMTP                                         |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Địa chỉ người gửi                                 |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint tương thích S3                           |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL công khai để trình duyệt tải tài sản          |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Tên bucket                                        |
| `S3_ACCESS_KEY_ID`     | _(được tạo)_                                    | Khóa truy cập MinIO                               |
| `S3_SECRET_ACCESS_KEY` | _(được tạo)_                                    | Khóa bí mật MinIO                                 |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL backend được tích hợp vào dashboard khi build |
| `VITE_DOMAIN`          | `localhost`                                     | Miền được tích hợp vào dashboard khi build        |

### Tùy chọn (tính năng sẽ suy giảm khi không có)

| Biến                                                     | Tính năng                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Dịch thuật và kiểm tra nội dung có sự hỗ trợ của AI            |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Quản lý thanh toán và đăng ký                                  |
| `RESEND_API_KEY`                                         | Email giao dịch qua Resend (ghi đè Mailpit khi được thiết lập) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Đăng nhập GitHub OAuth                                         |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Đăng nhập Google OAuth                                         |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Đăng nhập GitLab OAuth                                         |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Đăng nhập Microsoft OAuth                                      |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Đăng nhập LinkedIn OAuth                                       |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Đăng nhập Atlassian OAuth                                      |

### Mailer toàn cầu

Theo mặc định, tất cả các email giao dịch được gửi qua Resend sử dụng `RESEND_API_KEY`. Các triển khai tự lưu trữ có thể thay vào đó định tuyến **mọi** email — bao gồm các email không thuộc tổ chức như đặt lại mật khẩu và liên kết ma thuật — qua một mailer toàn cầu được định cấu hình bằng các biến môi trường.

Đặt `MAIL_PROVIDER` để kích hoạt nó. Khi không được đặt, mailer Resend mặc định được sử dụng.

| Variable             | Example                        | Description                                                                      |
| -------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Vận chuyển toàn cầu: `smtp` hoặc `resend`. Để không được đặt để sử dụng mặc định |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Tiêu đề người gửi. Chấp nhận địa chỉ đơn thuần hoặc định dạng `Name <email>`     |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (bắt buộc khi `MAIL_PROVIDER=smtp`)                                    |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (mặc định là `587`)                                                    |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS ẩn. Đặt `true` cho cổng `465`                                                |
| `MAIL_SMTP_USER`     | _(your user)_                  | Tên người dùng SMTP (tùy chọn; bỏ qua đối với relay không xác thực)              |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | Mật khẩu SMTP                                                                    |

> Thứ tự ưu tiên: mailer riêng của một tổ chức (được định cấu hình từ bảng điều khiển **Organization**) có ưu tiên hơn mailer toàn cầu, cái này lần lượt có ưu tiên hơn khóa Resend mặc định.

---

## Kết nối dự án Intlayer của bạn

Khi stack đang chạy, hãy trỏ dự án của bạn đến backend và dashboard được tự host thay vì `intlayer.org`.

### Cấu hình dự án

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL của dashboard CMS được tự host.
     * Mặc định: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // ví dụ: http://localhost:3000

    /**
     * URL của API backend được tự host.
     * Mặc định: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // ví dụ: http://localhost:3100
  },
};

export default config;
```

Thiết lập các biến môi trường trong file `.env` của dự án bạn:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Tạo thông tin truy cập trong dashboard được tự host của bạn dưới mục **Projects → Access keys** tại `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Khi sử dụng SDK `@intlayer/api` theo cách lập trình, hãy truyền `backendURL` một cách rõ ràng:

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

---

## Nâng cấp

Thao tác này sẽ kéo các image mới nhất và khởi động lại các container với `docker compose pull && docker compose up -d`. Các volume hiện có (`mongo-data`, `redis-data`, `minio-data`) được bảo toàn — không mất dữ liệu.

```sh
docker compose pull
docker compose up -d
```

---

## Sao lưu và phục hồi

Tất cả dữ liệu bền vững nằm trong ba Docker volume được đặt tên.

### Sao lưu

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Phục hồi

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Lặp lại cho redis-data và minio-data
```

---

## Hạn chế

- **MongoDB phải là external (Atlas).** Backend chỉ kết nối qua `mongodb+srv://` (được xây dựng từ `DB_ID` / `DB_MDP` / `DB_CLUSTER`), do đó `mongodb://host:27017` đơn giản — bao gồm cả `mongod` được bao gồm của container — không thể được sử dụng. Cung cấp một cluster MongoDB Atlas.
- **Không có tên miền tùy chỉnh.** Tất cả các `VITE_*` URLs hướng tới trình duyệt được nhúng inline vào ứng dụng tại thời điểm xây dựng, và hình ảnh được xuất bản có các giá trị `localhost`. Dashboard phải được truy cập tại `http://localhost:3000`; phục vụ nó trên một tên miền công khai sẽ yêu cầu xây dựng lại hình ảnh với các URL mục tiêu được xây dựng sẵn và không được hỗ trợ ra khỏi hộp.
- **Email yêu cầu một mailer hoạt động.** Thiết lập lần chạy đầu tiên thực thi xác minh email, do đó `RESEND_API_KEY` hoặc một [mailer SMTP toàn cục](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) phải được cấu hình. Sau khi admin đầu tiên đăng nhập, mỗi tổ chức cũng có thể cấu hình mailer SMTP hoặc Resend riêng của nó từ dashboard.

---

## Khắc phục sự cố

### Backend bị crash-loop khi khởi động lần đầu

MongoDB và Redis phải hoạt động tốt trước khi backend khởi động. File compose sử dụng `depends_on` với `condition: service_healthy`. Nếu bạn thấy backend khởi động lại liên tục, hãy kiểm tra xem healthcheck của `mongo` và `redis` có vượt qua không:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Tìm kiếm `MongoDB connection error` gần phía trên của log.

### Dashboard không thể kết nối tới API

Xác minh rằng `VITE_BACKEND_URL` khớp với URL mà backend có thể truy cập được từ **trình duyệt** (không phải mạng Docker). Nếu bạn đã thay đổi cổng backend hoặc thêm reverse proxy, hãy build lại image dashboard:

### Thiếu MinIO bucket

Nếu dịch vụ một lần chạy `minio-init` không chạy (hoặc chạy trước khi MinIO sẵn sàng), hãy tạo bucket thủ công:

```sh
docker compose run --rm minio-init
```

---

## Các liên kết hữu ích

- [Tài liệu Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- [Tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
