---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Tài liệu hàm getDictionary | intlayer
description: Xem cách sử dụng hàm getDictionary cho package intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Tài liệu: Hàm `getDictionary` trong `intlayer`

## Mô tả

Hàm `getDictionary` giải thích một dictionary **object mà bạn tự truyền vào** và trả về nội dung đã được giải quyết cho một locale nhất định. Nó duyệt qua nội dung trong một lần duy nhất và áp dụng từng plugin interpreter khi cần thiết, giải quyết các bản dịch `t()`, enumerations, conditions, insertions, nesting, markdown, HTML và file nodes.

Không giống như [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md), cái mà tìm kiếm một dictionary theo key trong registry được tạo, `getDictionary` nhận chính dictionary đó. Điều đó làm cho nó trở thành công cụ phù hợp cho nội dung được xây dựng tại runtime, được lấy từ một API hoặc CMS, hoặc được khai báo inline trong một test.

**Các tính năng chính:**

- Hoạt động với bất kỳ object nào tuân theo cấu trúc dictionary (`{ key, content }`)
- Cũng chấp nhận một qualified dictionary group (collections, variants) cùng với một selector
- Hoàn toàn có kiểu: object được trả về phản ánh `content` mà bạn đã truyền vào
- Chấp nhận các custom interpreter plugins

---

## Function Signature

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Bắt buộc
  localeOrSelector?: LocalesValues | DictionarySelector, // Tùy chọn
  plugins?: Plugins[]                                // Tùy chọn
): DeepTransformContent<...>
```

---

## Tham số

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: Từ điển (hoặc nhóm từ điển đủ điều kiện) để diễn giải.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale để diễn giải nội dung, hoặc một object selector (`{ item }`, `{ variant }`, tùy chọn với `locale`). Xem [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — mặc định là `defaultLocale` đã cấu hình.

- `plugins: Plugins[]`
  - **Description**: Một mảng các node transformers xác định cách các node được nhận dạng được diễn giải. Nếu bỏ qua, bộ plugin interpreter mặc định sẽ được sử dụng.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Kết quả trả về

- **Loại**: Nội dung đã được diễn giải của từ điển.
- **Mô tả**: `content` bạn đã truyền, với mọi nút Intlayer được phân giải cho ngôn ngữ được yêu cầu. Đối với một nhóm bộ sưu tập mà không có bộ chọn `item`, một mảng các mục đã được diễn giải theo thứ tự được trả về; `null` được trả về khi bộ chọn không nhắm đến gì.

---

## Ví dụ Sử dụng

### Sử dụng Cơ Bản

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        vi: "Xin chào",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "vi"
);

console.log(content.greeting); // "Xin chào"
```

### Diễn giải nội dung được tìm nạp tại thời gian chạy

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Với một selector

```typescript
import { getDictionary } from "intlayer";

// Một qualified dictionary group được resolve thành một single entry…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …hoặc thành một ordered array khi không có `item` được cung cấp
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Các Hàm Liên Quan

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md): Cách diễn giải tương tự, nhưng từ điển được tìm kiếm theo khóa trong registry được tạo ra.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionaryAsync.md): Đối tác cho các bản đồ loader theo từng ngôn ngữ.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useDictionary.md): Hook React tương đương, đọc ngôn ngữ từ provider.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
