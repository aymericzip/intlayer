---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: See how to use the getIntlayerAsync function for intlayer package
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Tài liệu: Hàm `getIntlayerAsync` trong `intlayer`

## Mô tả

Hàm `getIntlayerAsync` chọn một từ điển theo khóa của nó và giải quyết nội dung của nó cho một locale nhất định, **chỉ tải locale đó**.

Nó là phiên bản không đồng bộ của [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md), được sử dụng cho các trường hợp từ điển được đọc bên ngoài quá trình render — route `head` / metadata builders, loaders, server functions.

Nếu như `getIntlayer` kéo trong từ điển đã hợp nhất chứa mọi locale, các [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) sẽ viết lại cuộc gọi này thành `getDictionaryAsync(loaderMap, key, locale)`, chỉ vào các chunks theo locale trong `.intlayer/dynamic_dictionaries/`. Bundle do đó chỉ bao giờ cũng mang lại locale thực sự được yêu cầu.

Nếu không có các plugins này — một build chưa được tối ưu hóa — cuộc gọi sẽ được giải quyết thông qua registry từ điển đồng bộ thay thế: cùng nội dung, nhưng không có sự phân chia theo locale.

**Các tính năng chính:**

- Các khóa, selector và nội dung được trả về giống như `getIntlayer`
- Chỉ tải chunk locale được yêu cầu trong các build được tối ưu hóa
- Các cuộc gọi đồng thời cho cùng một chunk chia sẻ một lần tải
- An toàn để sử dụng trong `async` metadata builders, loaders và server functions

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Bắt buộc
  localeOrSelector?: LocalesValues | DictionarySelector, // Tùy chọn
  plugins?: Plugins[]                         // Tùy chọn
): Promise<DeepTransformContent<...>>
```

---

## Tham số

- `key: DictionaryKeys`
  - **Description**: Khóa của từ điển cần đọc, như được khai báo trong các tệp nội dung của bạn.
  - **Type**: `DictionaryKeys` — một union của mọi khóa từ điển được khai báo.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale để giải thích nội dung với, hoặc một đối tượng selector cho [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).
    - `'fr'` — một locale
    - `{ item: 2 }` — một mục [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/collections.md) (bỏ qua `item` để lấy mọi mục dưới dạng mảng)
    - `{ variant: 'black-friday' }` — một [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md) có tên (bỏ qua để lấy `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — một variant có cấu trúc
    - Bất kỳ selector nào cũng có thể mang theo một locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — mặc định là `defaultLocale` được cấu hình.

- `plugins: Plugins[]`
  - **Description**: Các node transformers tùy chỉnh thay thế các plugin interpreter cơ bản. Chỉ sử dụng nâng cao.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the dictionary, typed from your declaration.

---

## Ví dụ Sử dụng

### Cách sử dụng cơ bản

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Returns            | Nội dung                                                                                                        | Một promise của nội dung                    |
| Dictionary loaded  | Từ điển được hợp nhất (tất cả các locale)                                                                       | Chunk của locale được yêu cầu duy nhất      |
| Best suited for    | Rendering, các đường mã đồng bộ                                                                                 | Metadata, loaders, server functions         |
| Requires a plugin? | No                                                                                                              | No — per-locale split cần các build plugins |

Cả hai chấp nhận các đối số giống nhau và trả về nội dung giống nhau: chuyển đổi từ cái này sang cái khác chỉ thay đổi **khi** và **bao nhiêu** được tải.

---

## Các Hàm Liên Quan

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md): Tương đương đồng bộ đọc từ điển đã hợp nhất.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionaryAsync.md): Hàm cấp thấp hơn mà các build plugins viết lại cuộc gọi này thành.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocale.md): Phát hiện locale của một yêu cầu đến.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
