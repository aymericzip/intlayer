---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Bộ ánh xạ Locale
description: Tìm hiểu cách Bộ ánh xạ Locale hoạt động. Xem các bước được Bộ ánh xạ Locale sử dụng trong ứng dụng của bạn. Xem các gói khác nhau thực hiện những gì.
keywords:
  - Bộ ánh xạ Locale
  - Bắt đầu
  - Intlayer
  - Ứng dụng
  - Gói
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Thêm tài liệu bộ ánh xạ locale
---

# Bộ ánh xạ Locale

Bộ ánh xạ Locale là một tiện ích mạnh mẽ giúp bạn làm việc với dữ liệu quốc tế hóa trong ứng dụng Intlayer của bạn. Nó cung cấp ba hàm chính để chuyển đổi và tổ chức dữ liệu theo locale: `localeMap`, `localeFlatMap`, và `localeRecord`.

## Cách Bộ ánh xạ Locale hoạt động

Bộ ánh xạ Locale hoạt động trên một đối tượng `LocaleData` chứa tất cả thông tin cần thiết về một locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Mã locale hiện tại (ví dụ: 'en', 'fr')
  defaultLocale: LocalesValues; // Mã locale mặc định
  isDefault: boolean; // Có phải đây là locale mặc định hay không
  locales: LocalesValues[]; // Mảng tất cả các locale có sẵn
  urlPrefix: string; // Tiền tố URL cho locale này (ví dụ: '/fr' hoặc '')
};
```

Các hàm mapper tự động tạo dữ liệu này cho mỗi locale trong cấu hình của bạn, dựa trên:

- Danh sách các locale bạn đã cấu hình
- Cài đặt locale mặc định
- Việc có nên thêm tiền tố cho locale mặc định trong URL hay không

## Các hàm chính

### `localeMap`

Chuyển đổi mỗi locale thành một đối tượng duy nhất bằng cách sử dụng một hàm mapper.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Ví dụ: Tạo các đối tượng route**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Kết quả:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Tương tự như `localeMap`, nhưng hàm mapper trả về một mảng các đối tượng và được làm phẳng thành một mảng duy nhất.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Ví dụ: Tạo nhiều route cho mỗi locale**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// Kết quả:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Tạo một đối tượng record, trong đó mỗi locale là một khóa ánh xạ tới một giá trị được biến đổi bởi hàm mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Ví dụ: Tải các file dịch**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Kết quả:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Cấu hình Locale Mapper

Locale Mapper tự động sử dụng cấu hình Intlayer của bạn, nhưng bạn có thể ghi đè các giá trị mặc định bằng cách truyền các tham số:

### Sử dụng cấu hình mặc định

```typescript
import { localeMap } from "intlayer";

// Sử dụng cấu hình từ intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Ghi đè cấu hình

```typescript
import { localeMap } from "intlayer";

// Ghi đè locales và locale mặc định
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Các locales tùy chỉnh
  "en", // Locale mặc định tùy chỉnh
  true // Thêm tiền tố locale mặc định vào URL
);
```

## Ví dụ Sử dụng Nâng cao

### Tạo Menu Điều hướng

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Tạo Dữ liệu Sitemap

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Tải Dịch Thuật Động

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // hướng văn bản
  },
}));
```

## Tích Hợp Cấu Hình

Locale Mapper tích hợp liền mạch với cấu hình Intlayer của bạn:

- **Locales**: Tự động sử dụng `configuration.internationalization.locales`
- **Ngôn ngữ Mặc định**: Sử dụng `configuration.internationalization.defaultLocale`
- **Tiền tố URL**: Tuân thủ `configuration.middleware.prefixDefault`

Điều này đảm bảo tính nhất quán trên toàn bộ ứng dụng của bạn và giảm thiểu sự trùng lặp trong cấu hình.
