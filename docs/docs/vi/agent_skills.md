---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Kỹ năng Agent
description: Tìm hiểu cách sử dụng Intlayer Agent Skills để cải thiện khả năng AI agent hiểu về dự án của bạn, bao gồm các hướng dẫn thiết lập toàn diện cho Metadata, Sitemaps và Server Actions.
keywords:
  - Intlayer
  - Kỹ năng Agent
  - AI Agent
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "Khởi tạo lịch sử"
---

# Kỹ năng Agent

## Thiết lập

### Sử dụng CLI

Lệnh `intlayer init skills` là cách dễ nhất để thiết lập kỹ năng agent trong dự án của bạn. Nó phát hiện môi trường và cài đặt các tập tin cấu hình cần thiết cho các nền tảng bạn ưu tiên.

```bash
npx intlayer init skills
```

### Sử dụng SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Sử dụng tiện ích mở rộng VS Code

1. Mở Command Palette (Ctrl+Shift+P hoặc Cmd+Shift+P).
2. Nhập `Intlayer: Setup AI Agent Skills`
3. Chọn nền tảng bạn sử dụng (ví dụ: `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, v.v.).
4. Chọn các Kỹ năng bạn muốn cài đặt (ví dụ: `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Nhấn Enter.

## Danh sách kỹ năng

**intlayer-config**

- Hiệu quả hóa việc truyền đạt cho agent hiểu các cấu hình i18n cụ thể cho dự án của bạn, cho phép nó định cấu hình chính xác các ngôn ngữ (locales), mẫu định tuyến và chiến lược dự phòng.

**intlayer-cli**

- Cho phép agent tự động quản lý vòng đời dịch thuật của bạn, bao gồm kiểm tra các bản dịch bị thiếu, xây dựng từ điển và đồng bộ hóa nội dung qua dòng lệnh.

**intlayer-angular**

- Trang bị cho agent chuyên môn cụ thể về framework để triển khai chính xác các mẫu i18n phản ứng và tín hiệu (signals) theo các phương pháp hay nhất của Angular.

**intlayer-astro**

- Cung cấp cho agent kiến thức để xử lý các bản dịch phía máy chủ và các mẫu định tuyến được bản địa hóa duy nhất cho hệ sinh thái Astro.

**intlayer-content**

- Dạy agent cách sử dụng các nút nội dung nâng cao—như số nhiều, điều kiện và markdown—để xây dựng các từ điển phong phú, động và được bản địa hóa.

**intlayer-next-js**

- Mang lại cho agent chiều sâu kiến thức để triển khai i18n trên các thành phần Server và Client của Next.js, đảm bảo tối ưu hóa SEO và định tuyến bản địa hóa liền mạch.

**intlayer-react**

- Cung cấp kiến thức chuyên sâu để agent triển khai hiệu quả các thành phần và hook i18n khai báo (declarative) trong bất kỳ môi trường nào dựa trên React.

**intlayer-preact**

- Tối ưu hóa khả năng của agent trong việc triển khai i18n cho Preact, cho phép nó viết các thành phần bản địa hóa nhẹ nhàng bằng cách sử dụng các tín hiệu và mẫu phản ứng hiệu quả.

**intlayer-solid**

- Cho phép agent tận dụng khả năng phản ứng tinh vi của SolidJS để quản lý nội dung bản địa hóa hiệu suất cao.

**intlayer-svelte**

- Dạy agent sử dụng các store của Svelte và cú pháp đặc trưng cho nội dung được bản địa hóa an toàn về kiểu dữ liệu và phản ứng trên các ứng dụng Svelte và SvelteKit.

**intlayer-cms**

- Cho phép agent tích hợp và quản lý nội dung từ xa, cho phép nó xử lý việc đồng bộ hóa trực tiếp và quy trình dịch thuật từ xa thông qua Intlayer CMS.

**intlayer-usage**

- Tiêu chuẩn hóa phương pháp tiếp cận của agent đối với cấu trúc dự án và khai báo nội dung, đảm bảo nó tuân theo các quy trình làm việc hiệu quả nhất cho dự án i18n của bạn.

**intlayer-vue**

- Trang bị cho agent các mẫu cụ thể của Vue—bao gồm Composables và hỗ trợ Nuxt—để xây dựng các ứng dụng web hiện đại, được bản địa hóa.

**intlayer-compiler**

- Đơn giản hóa quy trình làm việc của agent bằng cách cho phép trích xuất nội dung tự động, cho phép nó viết các chuỗi có thể dịch trực tiếp trong mã của bạn mà không cần các tệp từ điển thủ công.
