---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Tài liệu Hàm getIntlayer | intlayer
description: Xem cách sử dụng hàm getIntlayer cho gói intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Tài liệu: Hàm `getIntlayer` trong `intlayer`

## Mô tả

Hàm `getIntlayer` chọn một từ điển theo khóa của nó và trả về nội dung được diễn giải cho một locale nhất định. Đây là phiên bản độc lập với framework tương ứng với hook `useIntlayer`: cùng nội dung, cùng selectors, nhưng có thể sử dụng ở bất kỳ đâu mà React context không khả dụng — các script Node, server functions, route loaders, metadata builders, Express/Fastify handlers, tests.

Nó đọc các từ điển được tạo bởi Intlayer trong `.intlayer/`, vì vậy argument `key` được gõ và tự động hoàn thành từ các khai báo nội dung của bạn, và đối tượng được trả về được gõ đầy đủ đến từng leaf.

**Các tính năng chính:**

- Các khóa từ điển được gõ và nội dung được trả về được gõ
- Diễn giải mọi nút nội dung (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Chấp nhận một locale hoặc một đối tượng selector (collections, variants)
- Kết quả được ghi nhớ mỗi `key + locale + selector`
- Quay lại một proxy an toàn trong quá trình phát triển khi một từ điển bị thiếu, thay vì gặp lỗi

---

## Function Signature

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Bắt buộc
  localeOrSelector?: LocalesValues | DictionarySelector, // Tùy chọn
  plugins?: Plugins[]                         // Tùy chọn
): DeepTransformContent<...>
```

---

## Tham số

- `key: DictionaryKeys`
  - **Description**: Khóa của từ điển cần đọc, được khai báo trong các tệp nội dung của bạn.
  - **Type**: `DictionaryKeys` — một union của mọi khóa từ điển được khai báo.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale để diễn giải nội dung với, hoặc một object selector cho [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).
    - `'fr'` — một locale
    - `{ item: 2 }` — một mục [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/collections.md) (bỏ qua `item` để lấy mọi mục dưới dạng mảng)
    - `{ variant: 'black-friday' }` — một [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md) được đặt tên (bỏ qua để lấy variant `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — một variant có cấu trúc
    - Bất kỳ selector nào cũng có thể mang theo một locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — mặc định là `defaultLocale` được cấu hình.

- `plugins: Plugins[]`
  - **Description**: Các node transformers tùy chỉnh thay thế các plugins interpreter cơ bản. Chỉ dùng cho các trường hợp nâng cao; bỏ qua để giữ hành vi mặc định.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: Nội dung được diễn giải của từ điển, được gõ từ khai báo của bạn.
- **Description**: Một plain object phản ánh trường `content` của từ điển của bạn, trong đó mỗi nút Intlayer đã được giải quyết thành giá trị cuối cùng cho ngôn ngữ được yêu cầu.

---

## Ví dụ sử dụng

### Cách Sử Dụng Cơ Bản

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      vi: "Xin chào",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Không có locale

Bỏ qua locale sẽ diễn giải nội dung với `defaultLocale` được khai báo trong [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của bạn.

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Diễn giải với locale mặc định
```

### Bên trong một server handler

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### With a selector (collections and variants)

```typescript
import { getIntlayer } from "intlayer";

// Một item của collection
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Mọi item của collection, dưới dạng một mảng có thứ tự
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Một variant được đặt tên
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Ghi chú về Hành vi

### Caching

Kết quả được memoized trong một module-level cache được khóa bằng `key + locale + selector`. Gọi `getIntlayer("app", "fr")` nhiều lần sẽ chỉ diễn dịch dictionary một lần và trả về cùng một object sau đó.

### Từ điển bị thiếu

Trong quá trình phát triển, yêu cầu một khóa không có từ điển được tạo sẽ ghi lại một cảnh báo một lần và trả về một proxy dự phòng an toàn: đọc `content.title` sẽ trả về chuỗi `"app.title"` thay vì ném lỗi. Điều này giữ cho trang có thể sử dụng được trong khi khai báo bị thiếu được sửa chữa. Chạy bản dựng Intlayer (hoặc máy chủ dev) để từ điển được tạo.

### Kích thước Bundle

`getIntlayer` đọc từ từ điển hợp nhất, chứa **mọi** locale. Trong client bundles, các [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) viết lại cuộc gọi để chỉ nội dung cần thiết được gửi đi. Khi bạn đọc nội dung bên ngoài rendering (metadata, loaders, server functions) và muốn một locale duy nhất được tải theo yêu cầu, hãy sử dụng [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md) thay thế.

---

## Các Hàm Liên Quan

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md): Phiên bản async tải một chunk locale duy nhất.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionary.md): Diễn giải một đối tượng dictionary mà bạn truyền vào, thay vì tìm kiếm theo khóa.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useIntlayer.md): Hook React tương đương, đọc locale từ provider.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
