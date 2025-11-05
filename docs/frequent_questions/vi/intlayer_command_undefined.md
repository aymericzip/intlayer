---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Lệnh Intlayer không xác định
description: Tìm hiểu cách khắc phục lỗi lệnh intlayer không xác định.
keywords:
  - intlayer
  - lệnh
  - không xác định
  - lỗi
  - vscode
  - tiện ích mở rộng
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Lệnh Intlayer không xác định

## Tổng quan

CLI Intlayer cung cấp một cách thuận tiện để kiểm soát nội dung intlayer của bạn, bao gồm xây dựng từ điển, đẩy bản dịch và nhiều hơn nữa. Tuy nhiên, nó không bắt buộc để dự án của bạn hoạt động. Nếu bạn đang sử dụng plugin bundler (như `withIntlayer()` cho Next.js hoặc `intlayer()` cho Vite), Intlayer sẽ tự động xây dựng từ điển trong quá trình xây dựng ứng dụng hoặc khi khởi động server phát triển. Ở chế độ phát triển, nó cũng sẽ theo dõi các thay đổi và tự động xây dựng lại các tệp khai báo nội dung.

Bạn có thể truy cập các lệnh intlayer theo nhiều cách khác nhau:

- Sử dụng lệnh CLI `intlayer` trực tiếp
- Sử dụng [tiện ích mở rộng VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- Sử dụng SDK `@intlayer/cli`

## Vấn đề

Khi cố gắng sử dụng lệnh `intlayer`, bạn có thể gặp lỗi sau:

```bash
'intlayer' không được nhận dạng là lệnh nội bộ hoặc bên ngoài,
chương trình có thể thực thi hoặc tệp batch.
```

## Giải pháp

Hãy thử các giải pháp sau theo thứ tự:

1. **Xác minh lệnh đã được cài đặt**

```bash
npx intlayer -h
```

Kết quả mong đợi:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            xuất phiên bản
    -h, --help               hiển thị trợ giúp cho lệnh

Commands:
    dictionary|dictionaries  Các thao tác với từ điển
    configuration|config     Các thao tác cấu hình
    help [command]           hiển thị trợ giúp cho lệnh
```

2. **Cài đặt gói intlayer-cli toàn cục**

```bash
npm install intlayer-cli -g -g
```

> Không cần thiết nếu bạn đã cài đặt gói `intlayer`

3. **Cài đặt gói toàn cục**

```bash
npm install intlayer -g
```

4. **Khởi động lại terminal của bạn**
   Đôi khi cần khởi động lại terminal để nhận diện các lệnh mới.

5. **Dọn dẹp và cài đặt lại**
   Nếu các giải pháp trên không hiệu quả:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Xác minh các tệp cài đặt**
   Nếu vấn đề vẫn tiếp diễn, kiểm tra xem các tệp sau có tồn tại không:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (nên có trường `bin` tham chiếu tới `./dist/cjs/cli.cjs`)

7. **Kiểm tra biến môi trường PATH**
   Đảm bảo thư mục bin toàn cục của npm nằm trong PATH của bạn:

```bash
# Đối với hệ thống Unix (macOS/Linux)
echo $PATH
# Nên bao gồm một thư mục như /usr/local/bin hoặc ~/.npm-global/bin

# Đối với Windows
echo %PATH%
# Nên bao gồm thư mục bin toàn cục của npm
```

8. **Sử dụng npx với đường dẫn đầy đủ**
   Nếu lệnh vẫn không tìm thấy, hãy thử dùng npx với đường dẫn đầy đủ:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Kiểm tra các cài đặt xung đột**

```bash
# Liệt kê tất cả các gói được cài đặt toàn cục
npm list -g --depth=0

# Gỡ bỏ các cài đặt toàn cục xung đột
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Sau đó cài đặt lại
npm install -g intlayer
```

10. **Xác minh phiên bản Node.js và npm**
    Đảm bảo bạn đang sử dụng các phiên bản tương thích:

```bash
node --version
npm --version
```

    Nếu bạn đang dùng phiên bản cũ, hãy cân nhắc cập nhật Node.js và npm.

11. **Kiểm tra các vấn đề về quyền truy cập**
    Nếu bạn gặp lỗi về quyền:

    ```bash
    # Đối với hệ thống dựa trên Unix
    sudo npm install -g intlayer

    # Hoặc thay đổi thư mục mặc định của npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Thêm vào ~/.profile hoặc ~/.bashrc của bạn:
    export PATH=~/.npm-global/bin:$PATH
    ```
