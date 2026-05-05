---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Số nhiều (Plural)
description: Khám phá cách khai báo và sử dụng nội dung số nhiều dựa trên ngôn ngữ (dựa trên CLDR) trong trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - Số nhiều
  - Đa dạng hóa
  - CLDR
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# Nội dung số nhiều / Số nhiều trong Intlayer

## Cách hoạt động của số nhiều

Trong Intlayer, nội dung số nhiều được thực hiện thông qua hàm `plural`, hàm này ánh xạ các danh mục số nhiều CLDR — `zero`, `one`, `two`, `few`, `many`, `other` — tới nội dung tương ứng của chúng. Danh mục chính xác được chọn tự động dựa trên ngôn ngữ đang hoạt động và giá trị số lượng, sử dụng API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) tích hợp sẵn của nền tảng.

Không giống như [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md), chọn nội dung dựa trên các phạm vi số do bạn tự xác định, `plural` ủy quyền việc lựa chọn cho các quy tắc CLDR. Đây là điều làm cho nó có thể mở rộng cho các ngôn ngữ có quy tắc số nhiều phức tạp — như tiếng Nga, tiếng Ba Lan, tiếng Ả Rập hoặc tiếng Wales — mà không cần phải tự viết logic modulo.

## Khi nào nên sử dụng `plural` so với `enu`

| Trường hợp sử dụng                                                                   | Trợ giúp |
| ------------------------------------------------------------------------------------ | -------- |
| Các dạng số nhiều ngữ pháp dựa trên ngôn ngữ (một quả táo / hai quả táo / 5 quả táo) | `plural` |
| Phạm vi số tùy chỉnh (`<5`, `>=10`) hoặc các nhóm không thuộc CLDR                   | `enu`    |

Nếu bạn chỉ nhắm mục tiêu tiếng Anh hoặc tiếng Việt (vốn chỉ có `one` / `other` hoặc không có sự thay đổi hình thái phức tạp cho số nhiều), cả hai đều hoạt động. Đối với bất kỳ ngôn ngữ nào có sự phân biệt `few` / `many` / `two`, hãy ưu tiên `plural`.

## Thiết lập nội dung số nhiều

Để thiết lập nội dung số nhiều trong dự án Intlayer của bạn, hãy tạo một mô-đun nội dung sử dụng trợ giúp `plural`. Danh mục `other` là bắt buộc và được sử dụng làm phương án dự phòng khi một ngôn ngữ không xác định danh mục cụ thể hơn.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      vi: plural({
        other: "{{count}} vị trí đang tuyển",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "vi": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} vị trí đang tuyển"
          }
        }
      }
    }
  }
}
```

> Các danh mục được hỗ trợ là `zero`, `one`, `two`, `few`, `many`, `other`. Bạn chỉ cần khai báo các danh mục mà ngôn ngữ mục tiêu của bạn sử dụng — Intlayer sẽ quay lại `other` khi không có danh mục cụ thể nào khớp.
>
> Trình giữ chỗ `{{count}}` được thay thế tự động bằng số lượng bạn chuyển vào lúc thực thi. Bạn cũng có thể bao gồm các trình giữ chỗ khác (xem [Trình giữ chỗ tùy chỉnh](#custom-placeholders) bên dưới).

## Sử dụng nội dung số nhiều với React Intlayer

Để sử dụng nội dung số nhiều bên trong một thành phần React, hãy truy xuất nó thông qua hook `useIntlayer` và gọi nó với một số lượng. Ngôn ngữ đang hoạt động và số lượng được kết hợp để chọn danh mục CLDR phù hợp.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Trong tiếng Anh:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Bạn có thể gọi hàm được trả về theo hai cách tương đương:

```tsx
totalOpenings(21); // viết tắt: chỉ số lượng
totalOpenings({ count: 21 }); // dạng đầy đủ
```

## Trình giữ chỗ tùy chỉnh

Chuỗi số nhiều có thể bao gồm các trình giữ chỗ khác ngoài `{{count}}`. Chuyển chúng dưới dạng đối tượng cùng với `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      other: "{{name}}, bạn có {{count}} tin nhắn mới",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, bạn có 1 tin nhắn mới"

summary({ count: 7, name: "Alice" });
// → "Alice, bạn có 7 tin nhắn mới"
```

## Sơ lược về các danh mục CLDR

Các ngôn ngữ khác nhau sử dụng các tập hợp con khác nhau của các danh mục CLDR. Một vài trường hợp phổ biến:

| Ngôn ngữ                              | Các danh mục được sử dụng                    |
| ------------------------------------- | -------------------------------------------- |
| Tiếng Anh (`en`)                      | `one`, `other`                               |
| Tiếng Pháp (`fr`)                     | `one`, `many`, `other`                       |
| Tiếng Nga (`ru`)                      | `one`, `few`, `many`, `other`                |
| Tiếng Ba Lan (`pl`)                   | `one`, `few`, `many`, `other`                |
| Tiếng Ả Rập (`ar`)                    | `zero`, `one`, `two`, `few`, `many`, `other` |
| Tiếng Nhật / Tiếng Trung / Tiếng Việt | chỉ `other`                                  |

Bạn không cần phải ghi nhớ điều này — hãy khai báo các danh mục bạn có bản dịch và Intlayer sẽ quay lại `other` khi cần thiết.

## Tài nguyên bổ sung

Để biết thêm thông tin chi tiết về cấu hình và cách sử dụng, hãy tham khảo các tài nguyên sau:

- [Tài liệu về Liệt kê (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md)
- [Tài liệu về Chèn (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)
- [Tài liệu về Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
- [Tài liệu về React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_create_react_app.md)
- [Tài liệu về Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_15.md)

Các tài nguyên này cung cấp thêm thông tin chi tiết về việc thiết lập và sử dụng Intlayer trên nhiều môi trường và khung làm việc khác nhau.
