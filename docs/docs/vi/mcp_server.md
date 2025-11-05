---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: Tài liệu Máy chủ MCP
description: Khám phá các tính năng và cách thiết lập Máy chủ MCP để tối ưu hóa quản lý và vận hành máy chủ của bạn.
keywords:
  - Máy chủ MCP
  - Quản lý máy chủ
  - Tối ưu hóa
  - Intlayer
  - Tài liệu
  - Thiết lập
  - Tính năng
slugs:
  - doc
  - mcp-server
history:
  - version: 5.5.12
    date: 2025-07-11
    changes: Thêm thiết lập ChatGPT
  - version: 5.5.12
    date: 2025-07-10
    changes: Thêm thiết lập Claude Desktop
  - version: 5.5.12
    date: 2025-07-10
    changes: Thêm giao thức SSE và máy chủ từ xa
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Máy chủ MCP Intlayer

Máy chủ **Intlayer MCP (Model Context Protocol)** cung cấp hỗ trợ IDE được trang bị AI, được thiết kế riêng cho hệ sinh thái Intlayer.

## Tôi có thể sử dụng nó ở đâu?

- Trên các môi trường phát triển hiện đại như **Cursor**, **VS Code**, và bất kỳ IDE nào hỗ trợ giao thức MCP.
- Trên các trợ lý AI yêu thích của bạn như **Claude Desktop**, **Gemini**, **ChatGPT**, v.v.

## Tại sao nên sử dụng Máy chủ Intlayer MCP?

Bằng cách kích hoạt Máy chủ Intlayer MCP trong IDE của bạn, bạn sẽ mở khóa:

- **Tài liệu nhận biết ngữ cảnh**
  Máy chủ MCP tải và cung cấp tài liệu của Intlayer. Giúp tăng tốc quá trình thiết lập, di chuyển dữ liệu, v.v.
  Điều này đảm bảo các gợi ý mã, tùy chọn lệnh và giải thích luôn được cập nhật và phù hợp.

- **Tích hợp CLI thông minh**
  Truy cập và chạy các lệnh Intlayer CLI trực tiếp từ giao diện IDE của bạn. Sử dụng máy chủ MCP, bạn có thể để trợ lý AI của mình chạy các lệnh như `intlayer dictionaries build` để cập nhật từ điển, hoặc `intlayer dictionaries fill` để điền các bản dịch còn thiếu.

> Xem danh sách đầy đủ các lệnh và tùy chọn trong [tài liệu Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md).

## Máy chủ cục bộ (stdio) và máy chủ từ xa (SSE)

Máy chủ MCP có thể được sử dụng theo hai cách:

- Máy chủ cục bộ (stdio)
- Máy chủ từ xa (SSE)

### Máy chủ cục bộ (stdio) (khuyến nghị)

Intlayer cung cấp một gói NPM có thể được cài đặt cục bộ trên máy của bạn. Nó có thể được cài đặt trong IDE yêu thích của bạn, như VS Code, Cursor, cũng như trong ứng dụng trợ lý địa phương của bạn, như ChatGPT, Claude Desktop, v.v.

Máy chủ này là cách được khuyến nghị để sử dụng máy chủ MCP. Vì nó tích hợp tất cả các tính năng của máy chủ MCP, bao gồm cả các công cụ CLI.

### Máy chủ từ xa (SSE)

Máy chủ MCP cũng có thể được sử dụng từ xa, sử dụng phương thức truyền SSE. Máy chủ này được Intlayer lưu trữ và có sẵn tại https://mcp.intlayer.org. Máy chủ này có thể truy cập công khai, không cần xác thực, và miễn phí sử dụng.

Lưu ý rằng máy chủ từ xa không tích hợp các công cụ CLI, tự động hoàn thành AI, v.v. Máy chủ từ xa chỉ dùng để tương tác với tài liệu nhằm hỗ trợ trợ lý AI của bạn với hệ sinh thái Intlayer.

> Do chi phí lưu trữ máy chủ, không thể đảm bảo tính khả dụng của máy chủ từ xa. Chúng tôi giới hạn số lượng kết nối đồng thời. Chúng tôi khuyến nghị sử dụng phương thức truyền máy chủ cục bộ (stdio) để có trải nghiệm ổn định nhất.

---

## Cài đặt trong Cursor

Theo dõi [tài liệu chính thức](https://docs.cursor.com/context/mcp) để cấu hình máy chủ MCP trong Cursor.

Trong thư mục gốc dự án của bạn, thêm tệp cấu hình `.cursor/mcp.json` sau:

### Máy chủ cục bộ (stdio) (khuyến nghị)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Máy chủ từ xa (SSE)

Để kết nối với máy chủ Intlayer MCP từ xa sử dụng Server-Sent Events (SSE), bạn có thể cấu hình client MCP của mình để kết nối với dịch vụ được lưu trữ.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Điều này cho IDE của bạn biết để khởi chạy máy chủ Intlayer MCP bằng `npx`, đảm bảo luôn sử dụng phiên bản mới nhất trừ khi bạn cố định phiên bản.

---

## Cài đặt trong VS Code

Theo dõi [tài liệu chính thức](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) để cấu hình máy chủ MCP trong VS Code.

Để sử dụng Intlayer MCP Server với VS Code, bạn cần cấu hình nó trong workspace hoặc cài đặt người dùng của bạn.

### Máy chủ cục bộ (stdio) (khuyến nghị)

Tạo một file `.vscode/mcp.json` trong thư mục gốc dự án của bạn:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Máy chủ từ xa (SSE)

Để kết nối với máy chủ Intlayer MCP từ xa sử dụng Server-Sent Events (SSE), bạn có thể cấu hình client MCP của mình để kết nối với dịch vụ được lưu trữ.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Cài đặt trong ChatGPT

### Máy chủ từ xa (SSE)

Theo dõi [tài liệu chính thức](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) để cấu hình máy chủ MCP trong ChatGPT.

1. Truy cập vào [bảng điều khiển promt](https://platform.openai.com/prompts)
2. Nhấn vào `+ Create`
3. Nhấn vào `Tools (Create or +)`
4. Chọn `MCP Server`
5. Nhấn vào `Add new`
6. Điền các trường sau:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Nhấn vào `Save`

---

## Cài đặt trong Claude Desktop

Theo dõi [tài liệu chính thức](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) để cấu hình máy chủ MCP trong Claude Desktop.

Đường dẫn file cấu hình:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Máy chủ cục bộ (stdio) (khuyến nghị)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## Sử dụng MCP Server qua CLI

Bạn cũng có thể chạy trực tiếp máy chủ Intlayer MCP từ dòng lệnh để thử nghiệm, gỡ lỗi hoặc tích hợp với các công cụ khác.

```bash
# Cài đặt toàn cục
npm install -g @intlayer/mcp

# Hoặc sử dụng trực tiếp với npx (khuyến nghị)
npx @intlayer/mcp
```

---
