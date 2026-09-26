---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 4
title: Cách giới hạn mức tiêu thụ token của Claude Code khi tạo bản dịch
description: Tại sao dịch thuật bằng Claude Code gây lãng phí token, những gì Intlayer thực hiện thay thế (lọc các khóa đã dịch, chia nhỏ JSON, dịch markdown theo từng khối) và cách tái sử dụng gói đăng ký Claude với claude setup-token.
keywords:
  - claude code
  - tokens
  - tiêu thụ token
  - setup-token
  - i18n
  - quốc tế hóa
  - dịch thuật
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Cách giới hạn mức tiêu thụ token của Claude Code khi tạo bản dịch

## Mô tả vấn đề

Yêu cầu Claude Code (hoặc bất kỳ agent lập trình nào) dịch nội dung là phương pháp tốn kém nhất. Trong mỗi lần chạy, agent phải:

- Tải toàn bộ tệp JSON hoặc tệp nội dung vào ngữ cảnh, bao gồm cả những khóa đã được dịch.
- Tìm kiếm các tệp liên quan để xác định vị trí và cấu trúc của nội dung.
- Tìm ra những ngôn ngữ (locales) còn thiếu và cần được tạo.
- Đọc lại các hướng dẫn tùy chỉnh của bạn mỗi lần ("chuyển đổi URL theo cách này", "giữ nguyên tên thương hiệu bằng tiếng Anh", "dùng văn phong thân mật").
- Viết lại toàn bộ tệp, bao gồm cả những phần không hề thay đổi.

Tất cả những dữ liệu đó đều được gửi lại ở mỗi lượt tương tác, khiến chi phí tăng theo công thức `kích thước nội dung × số lượng ngôn ngữ × số lượt tương tác`, và mọi sai lệch về định dạng hoặc khóa đều phải rà soát thủ công.

## Những gì Intlayer thực hiện thay thế

Lợi ích của Intlayer là xử lý công việc đó bên ngoài agent, thông qua một pipeline được xây dựng chuyên biệt cho việc dịch thuật:

- **Lọc các bản dịch đã có** để giảm thiểu việc sử dụng token. Các khóa đã được dịch trong JSON sẽ được loại bỏ, chỉ các khóa còn thiếu mới được gửi đến mô hình.
- **Dịch markdown theo từng khối.** Đối với tài liệu, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate.md) và [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-review.md) so sánh từng khối với tài liệu gốc và bỏ qua các khối đã được dịch hoặc không thay đổi.
- **Chia nhỏ JSON (chunking)** nếu tệp quá lớn để luôn nằm trong vùng tối ưu của cửa sổ ngữ cảnh.
- **Làm phẳng và tái cấu trúc JSON** nhằm tối ưu hóa lượng token tiêu thụ.
- **Chèn prompt tùy chỉnh** cho các quy tắc cụ thể về thương hiệu và câu từ (`applicationContext`, `--custom-instructions`), giúp bạn chỉ cần viết một lần thay vì lặp lại trong mỗi cuộc trò chuyện.
- **Xác thực cấu trúc** để đảm bảo tính nhất quán và ngăn ngừa sai lệch khóa, đồng thời giữ nguyên định dạng (markdown, HTML, biến chèn, số nhiều).
- **Áp dụng cơ chế thử lại (retry)** khi định dạng đầu ra không hợp lệ.
- **Xếp hàng và xử lý song song các yêu cầu** giữa các tệp, khối dữ liệu và ngôn ngữ để tăng tốc độ.

Không có bước nào trong số này đi qua ngữ cảnh của agent. Nguyên tắc cốt lõi: để agent quyết định **cần** quốc tế hóa nội dung nào, và để Intlayer đảm nhận công việc lặp đi lặp lại.

## Giải pháp

### 1. Ủy quyền việc trích xuất cho `intlayer extract`

Thay vì yêu cầu agent viết lại từng component theo cách thủ công, hãy để agent chạy lệnh [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md). Lệnh này sẽ chuyển các chuỗi văn bản cố định sang tệp `.content` ngay cạnh component mà không cần tải toàn bộ tệp vào ngữ cảnh của agent.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Ủy quyền việc dịch thuật cho `intlayer fill`

Tuyệt đối không yêu cầu agent dịch trực tiếp. Lệnh [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) áp dụng pipeline đã nêu: chỉ gửi các khóa còn thiếu, chia nhỏ chúng, xử lý song song các ngôn ngữ và ghi kết quả trở lại các tệp nội dung của bạn.

```bash
npx intlayer fill
```

Một số flag giúp giới hạn phạm vi thực thi:

- `--git-diff` (hoặc `--uncommitted`) chỉ xử lý các từ điển bị thay đổi trong nhánh hiện tại.
- `--file` hoặc `--keys` nhắm mục tiêu vào các tệp nội dung cụ thể.
- `--output-locales fr es` giới hạn thực thi cho các ngôn ngữ bạn thực sự cần lúc này.
- `--skip-metadata` bỏ qua bước tạo tiêu đề, mô tả và thẻ tag.
- `--data-serialization toon` gửi dữ liệu gọn gàng hơn đến mô hình (tiết kiệm token, đầu ra có thể hơi khác biệt).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Dịch markdown bằng `doc translate` và `doc review`

Yêu cầu agent dịch tệp `.md` đồng nghĩa với việc dán toàn bộ tài liệu cho từng ngôn ngữ sau mỗi lần thay đổi. Ngược lại, các lệnh [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-translate.md) và [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/doc-review.md) xử lý theo từng khối.

Sử dụng `doc translate` khi tệp dịch chưa tồn tại. Lệnh sẽ chia nhỏ markdown, dịch song song và tạo các tệp đích:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Sử dụng `doc review` khi tệp dịch đã tồn tại. Lệnh sẽ so sánh từng khối với tài liệu gốc, bỏ qua các khối đã được dịch hoặc không đổi, và chỉ gửi các khối có sự khác biệt:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Cả hai lệnh đều tiếp nhận các quy tắc của bạn một lần duy nhất, tránh việc phải lặp lại trong mọi prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Hai chế độ của `doc review` rất hữu ích khi agent cần tham gia vào quy trình mà không làm phát sinh lệnh gọi AI nào từ phía Intlayer:

- `--mode report` ghi lại các khối cần chú ý kèm theo số dòng, giúp agent chỉ chỉnh sửa các khối đó.
- `--mode synthesis` chỉ thông báo tài liệu nào đã cập nhật và tài liệu nào còn các khối cần chỉnh sửa.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Để agent gọi CLI thông qua máy chủ MCP

Với [máy chủ Intlayer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md), agent trả lời dựa trên tài liệu mới nhất và tự chạy `intlayer fill` hoặc `intlayer doc review` thay vì triển khai lại logic đó trong cuộc hội thoại.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Cài đặt [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md) với `npx intlayer init skills` cũng giúp ngăn agent phỏng đoán API của Intlayer và đọc lại tài liệu trong mỗi tác vụ.

### 5. Tái sử dụng gói đăng ký Claude với `claude setup-token`

Chạy cấu hình i18n trong phiên Claude Code tương tác sẽ lưu toàn bộ lịch sử trò chuyện trong ngữ cảnh. Hãy chuyển tác vụ nặng này sang một phiên headless ngắn gọn.

Tạo token dài hạn từ gói đăng ký Claude của bạn:

```bash
claude setup-token
```

Lưu dưới dạng `CLAUDE_CODE_OAUTH_TOKEN` (trong tệp `.env` hoặc trong bí mật CI của bạn), sau đó tái sử dụng cho phiên chạy đơn lẻ thực thi các lệnh Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

Phiên này chỉ mang theo prompt đó và kết quả đầu ra của lệnh, không bao gồm toàn bộ cuộc trò chuyện trước đây. Token tương tự cũng hoạt động trong [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) để chạy `intlayer fill` trên mỗi pull request.

> Token được cấp bởi `claude setup-token` chỉ xác thực cho Claude Code. Token này không thể sử dụng làm khóa Anthropic API trong `ai.apiKey`. Đối với bản dịch, `intlayer fill` sử dụng [tài khoản Intlayer](https://app.intlayer.org) của bạn (đã bao gồm gói miễn phí) hoặc khóa nhà cung cấp riêng được cấu hình trong [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#ai-configuration).

## Tóm tắt

| Tác vụ                              | Người thực hiện          | Token trong ngữ cảnh của agent |
| ----------------------------------- | ------------------------ | ------------------------------ |
| Quyết định nội dung cần bản địa hóa | Claude Code              | Thấp                           |
| Trích xuất chuỗi văn bản            | `intlayer extract`       | Không có                       |
| Dịch nội dung                       | `intlayer fill`          | Không có                       |
| Dịch tài liệu                       | `intlayer doc translate` | Không có                       |
| Cập nhật tài liệu                   | `intlayer doc review`    | Không có                       |
| Chạy các lệnh                       | Headless Claude Code     | Prompt + đầu ra của lệnh       |
