---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: "Tài liệu hàm getIntlayerAsync | intlayer"
description: "Dùng getIntlayerAsync để tải và đọc nội dung từ điển chỉ cho một locale, không đóng gói các ngôn ngữ khác."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Khi không có locale, chờ locale của request (headers và cookies của Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Tài liệu ban đầu"
author: aymericzip
---

# Tài liệu: Hàm `getIntlayerAsync` trong `intlayer`

## Mô tả

Hàm `getIntlayerAsync` chọn một từ điển theo khóa của nó và giải quyết nội dung của nó cho một locale nhất định, **chỉ tải locale đó**.

Nó là phiên bản không đồng bộ của [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md), được sử dụng cho các trường hợp từ điển được đọc bên ngoài quá trình render, route `head` / metadata builders, loaders, server functions.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md)

Nếu như `getIntlayer` kéo trong từ điển đã hợp nhất chứa mọi locale, các [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) sẽ viết lại cuộc gọi này thành `getDictionaryAsync(loaderMap, key, locale)`, chỉ vào các chunks theo locale trong `.intlayer/dynamic_dictionaries/`. Bundle do đó chỉ bao giờ cũng mang lại locale thực sự được yêu cầu.

- [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)

Nếu không có các plugins này, một build chưa được tối ưu hóa, cuộc gọi sẽ được giải quyết thông qua registry từ điển đồng bộ thay thế: cùng nội dung, nhưng không có sự phân chia theo locale.

**Các tính năng chính:**

- Các khóa, selector và nội dung được trả về giống như `getIntlayer`
- Chỉ tải chunk locale được yêu cầu trong các build được tối ưu hóa
- Các cuộc gọi đồng thời cho cùng một chunk chia sẻ một lần tải
- An toàn để sử dụng trong `async` metadata builders, loaders và server functions

## Chữ ký hàm

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Bắt buộc
  localeOrSelector?: LocalesValues | DictionarySelector, // Tùy chọn
  plugins?: Plugins[]                         // Tùy chọn
): Promise<DeepTransformContent<...>>
```

## Tham số

- `key: DictionaryKeys`
  - **Mô tả**: Khóa của từ điển cần đọc, như được khai báo trong các tệp nội dung của bạn.
  - **Kiểu**: `DictionaryKeys`, một union của mọi khóa từ điển được khai báo.
  - **Bắt buộc**: Có

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Mô tả**: Locale để giải thích nội dung với, hoặc một đối tượng selector cho [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).
    - `'fr'`: một locale
    - `{ item: 2 }`: một mục [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/collections.md) (bỏ qua `item` để lấy mọi mục dưới dạng mảng)
    - `{ variant: 'black-friday' }`: một [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/variants.md) có tên (bỏ qua để lấy `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: một variant có cấu trúc
    - Bất kỳ selector nào cũng có thể mang theo một locale: `{ item: 2, locale: 'fr' }`
  - **Kiểu**: `LocalesValues | DictionarySelector`
  - **Bắt buộc**: Không (tùy chọn). Nếu bỏ qua, được resolve giống như [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md) (locale của request, sau đó locale đã lưu, sau đó `defaultLocale`). Vì là hàm bất đồng bộ, nó cũng có thể chờ locale của request khi locale này chỉ đọc được bất đồng bộ: trong Server Components của Next.js, `generateMetadata` và route handler, nó đọc `headers()` và `cookies()` của request, giống `getLocale()` từ `next-intlayer/server`. Việc đọc này chuyển route sang rendering động, nên nó chỉ diễn ra khi `IntlayerProvider` chưa cung cấp locale.

- `plugins: Plugins[]`
  - **Mô tả**: Các node transformers tùy chỉnh thay thế các plugin interpreter cơ bản. Chỉ sử dụng nâng cao.
  - **Kiểu**: `Plugins[]`
  - **Bắt buộc**: Không (tùy chọn)

### Returns

- **Kiểu**: `Promise<Content>`, một promise resolve thành nội dung đã được diễn giải của từ điển, được định kiểu từ khai báo của bạn.

## Ví dụ Sử dụng

### Cách sử dụng cơ bản

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Returns            | Nội dung                                                                                                        | Một promise của nội dung                   |
| Dictionary loaded  | Từ điển được hợp nhất (tất cả các locale)                                                                       | Chunk của locale được yêu cầu duy nhất     |
| Best suited for    | Rendering, các đường mã đồng bộ                                                                                 | Metadata, loaders, server functions        |
| Requires a plugin? | No                                                                                                              | No, per-locale split cần các build plugins |

Cả hai chấp nhận các đối số giống nhau và trả về nội dung giống nhau: chuyển đổi từ cái này sang cái khác chỉ thay đổi **khi** và **bao nhiêu** được tải.

## Các Hàm Liên Quan

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocale.md)

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
