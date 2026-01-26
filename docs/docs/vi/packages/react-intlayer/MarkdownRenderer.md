---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Component MarkdownRenderer | react-intlayer
description: Xem cách sử dụng component MarkdownRenderer cho package react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# Tài liệu Component MarkdownRenderer

Component `MarkdownRenderer` hiển thị nội dung markdown bằng các component tùy chỉnh.

## Sử dụng

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Thuộc tính (Props)

| Thuộc tính   | Kiểu              | Mô tả                                                                       |
| ------------ | ----------------- | --------------------------------------------------------------------------- |
| `children`   | `string`          | Nội dung markdown để render.                                                |
| `components` | `Overrides`       | Một map các component tùy chỉnh để sử dụng cho các phần tử markdown cụ thể. |
| `options`    | `MarkdownOptions` | Các tuỳ chọn bổ sung cho trình render Markdown.                             |
