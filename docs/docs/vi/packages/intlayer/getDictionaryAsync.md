---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Tài liệu Hàm getDictionaryAsync | intlayer
description: Xem cách sử dụng hàm getDictionaryAsync cho package intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Tài liệu ban đầu"
author: aymericzip
---

# Documentation: Hàm `getDictionaryAsync` trong `intlayer`

## Mô tả

Hàm `getDictionaryAsync` tải một **single locale chunk** của một từ điển và trả về nội dung được giải thích của nó.

Đây là phần đối ứng của [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionary.md) cho các loader maps theo locale được phát ra trong `.intlayer/dynamic_dictionaries/`: thay vì nhận một từ điển chứa mọi locale, nó nhận loader map và chỉ chờ đợi chunk mà locale được yêu cầu cần.

> Trong mã ứng dụng, bạn thường gọi [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md), không phải hàm này. Các [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) viết lại mọi lệnh gọi `getIntlayerAsync('key', locale)` thành `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` được export cho các custom loaders và cho các công cụ xây dựng loader maps của riêng chúng.

**Các tính năng chính:**

- Tải chỉ locale chunk được yêu cầu
- Hỗ trợ loader maps đơn giản (`locale → loader`) và có đủ điều kiện (`locale → qualifierId → loader`)
- Khử trùng các lần tải đồng thời của cùng một chunk và cache nội dung đã giải quyết
- Các tải thất bại được xóa khỏi cache để một lệnh gọi sau có thể thử lại chunk

---

## Chữ Ký Hàm

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Bắt buộc
  key: string,                                           // Bắt buộc
  localeOrSelector?: LocalesValues | DictionarySelector, // Tùy chọn
  plugins?: Plugins[]                                    // Tùy chọn
): Promise<DeepTransformContent<...>>
```

---

## Tham số

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Bản đồ loader cho từng locale. Bản đồ thông thường liên kết một locale với một loader; bản đồ được xác định (được sử dụng bởi collections và variants) liên kết một locale với một qualifier id, sau đó là một loader. Đối với bản đồ được xác định, chỉ các chunk mà selector nhắm tới được tải.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Khóa từ điển, được sử dụng để đặt tên không gian cho bộ nhớ đệm chunk.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale để diễn giải nội dung với, hoặc một đối tượng selector (`{ item }`, `{ variant }`, tùy chọn với `locale`). Xem [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — mặc định là `defaultLocale` đã cấu hình.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Mặc định là bộ interpreter cơ sở.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## Ví dụ sử dụng

### Với một generated loader map

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Với một custom loader map

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Với một selector trên một qualified map

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Các Ghi Chú về Hành Vi

### Caching và deduplication

Bộ nhớ cache lưu trữ **promise** của mỗi bộ ba `key + locale + selector`, vì vậy các lệnh gọi đồng thời cho cùng một chunk chờ một lần tải duy nhất. Một lần tải bị từ chối sẽ bị loại khỏi bộ nhớ cache, vì vậy một chunk lỗi sẽ được thử lại trong lần gọi tiếp theo thay vì phát lại cùng một lỗi mãi mãi.

### Dự phòng Locale

Một plain loader map được duyệt dọc theo cùng một chuỗi dự phòng như ở chế độ đồng bộ: locale được yêu cầu trước tiên, sau đó là các dự phòng của nó, sau đó là `null` nếu không có chunk nào được phát ra.

---

## Các Hàm Liên Quan

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getIntlayerAsync.md): Hàm mà các ứng dụng gọi; build plugins viết lại nó thành `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getDictionary.md): Đối tác đồng bộ lấy một từ điển đầy đủ.
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md): Các bộ sưu tập và biến thể, cũng như các bản đồ loader mà chúng tạo ra.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
