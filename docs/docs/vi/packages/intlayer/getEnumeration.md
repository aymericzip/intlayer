---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getEnumeration | intlayer
description: Xem cách sử dụng hàm getEnumeration cho gói intlayer
keywords:
  - getEnumeration
  - dịch thuật
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getEnumeration` trong `intlayer`

## Mô tả

Hàm `getEnumeration` lấy nội dung tương ứng với một số lượng cụ thể dựa trên các điều kiện đã được định nghĩa trước trong một đối tượng liệt kê. Các điều kiện được định nghĩa dưới dạng các khóa, và thứ tự ưu tiên của chúng được xác định theo thứ tự trong đối tượng.

## Tham số

- `enumerationContent: QuantityContent<Content>`
  - **Mô tả**: Một đối tượng trong đó các khóa đại diện cho các điều kiện (ví dụ: `<=`, `<`, `>=`, `=`) và các giá trị đại diện cho nội dung tương ứng. Thứ tự các khóa xác định độ ưu tiên khi so khớp.
  - **Kiểu**: `QuantityContent<Content>`
    - `Content` có thể là bất kỳ kiểu nào.

- `quantity: number`
  - **Mô tả**: Giá trị số được sử dụng để so khớp với các điều kiện trong `enumerationContent`.
  - **Kiểu**: `number`

## Giá trị trả về

- **Kiểu**: `Content`
- **Mô tả**: Nội dung tương ứng với điều kiện đầu tiên được khớp trong `enumerationContent`. Nếu không tìm thấy khớp nào, sẽ xử lý theo cách cài đặt (ví dụ: lỗi hoặc nội dung dự phòng).

## Ví dụ sử dụng

### Sử dụng cơ bản

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

// Lấy nội dung dựa trên số lượng và điều kiện trong enumerationContent
const content = getEnumeration(
  {
    "<=-2.3": "Bạn có ít hơn -2.3",
    "<1": "Bạn có ít hơn một",
    "2": "Bạn có hai",
    ">=3": "Bạn có ba hoặc nhiều hơn",
  },
  2
);

console.log(content); // Kết quả: "Bạn có hai"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

// Lấy nội dung dựa trên số lượng và điều kiện trong enumerationContent
const content = getEnumeration(
  {
    "<1": "Bạn có ít hơn một",
    "2": "Bạn có hai",
    ">=3": "Bạn có ba hoặc nhiều hơn",
  },
  2
);

console.log(content); // Kết quả: "Bạn có hai"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

// Lấy nội dung dựa trên số lượng và điều kiện trong enumerationContent
const content = getEnumeration(
  {
    "<1": "Bạn có ít hơn một",
    "2": "Bạn có hai",
    ">=3": "Bạn có ba hoặc nhiều hơn",
  },
  2
);

console.log(content); // Kết quả: "Bạn có hai"
```

### Ưu tiên của các điều kiện

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Bạn có ít hơn bốn",
    "2": "Bạn có hai",
  },
  2
);

console.log(content); // Kết quả: "Bạn có ít hơn bốn"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Bạn có ít hơn bốn",
    "2": "Bạn có hai",
  },
  2
);

console.log(content); // Kết quả: "Bạn có ít hơn bốn"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Bạn có ít hơn bốn",
    "2": "Bạn có hai",
  },
  2
);

console.log(content); // Kết quả: "Bạn có ít hơn bốn"
```

## Các Trường Hợp Biên

- **Không Có Điều Kiện Phù Hợp:**
  - Nếu không có điều kiện nào phù hợp với số lượng được cung cấp, hàm sẽ trả về `undefined` hoặc xử lý kịch bản mặc định/dự phòng một cách rõ ràng.

- **Điều Kiện Mơ Hồ:**
  - Nếu các điều kiện chồng chéo nhau, điều kiện phù hợp đầu tiên (dựa trên thứ tự trong đối tượng) sẽ được ưu tiên.

- **Khóa Không Hợp Lệ:**
  - Hàm giả định rằng tất cả các khóa trong `enumerationContent` đều hợp lệ và có thể phân tích như các điều kiện. Các khóa không hợp lệ hoặc định dạng sai có thể dẫn đến hành vi không mong muốn.

- **Ràng Buộc TypeScript:**
  - Hàm đảm bảo rằng kiểu `Content` nhất quán trên tất cả các khóa, cho phép an toàn kiểu khi lấy nội dung.

## Ghi Chú

- Tiện ích `findMatchingCondition` được sử dụng để xác định điều kiện phù hợp dựa trên số lượng đã cho.
