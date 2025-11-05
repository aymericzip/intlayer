---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm t | next-intlayer
description: Xem cách sử dụng hàm t cho gói next-intlayer
keywords:
  - t
  - dịch thuật
  - Intlayer
  - next-intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `t` trong `next-intlayer`

Hàm `t` trong gói `next-intlayer` là công cụ cơ bản để quốc tế hóa nội tuyến trong ứng dụng Next.js của bạn. Nó cho phép bạn định nghĩa các bản dịch trực tiếp trong các component, giúp hiển thị nội dung địa phương hóa dựa trên locale hiện tại một cách đơn giản.

---

## Tổng quan

Hàm `t` được sử dụng để cung cấp các bản dịch cho các locale khác nhau trực tiếp trong các component của bạn. Bằng cách truyền một đối tượng chứa các bản dịch cho từng locale được hỗ trợ, `t` sẽ trả về bản dịch phù hợp dựa trên ngữ cảnh locale hiện tại trong ứng dụng Next.js của bạn.

---

## Các tính năng chính

- **Dịch nội tuyến**: Lý tưởng cho các đoạn văn bản nhanh, nội tuyến mà không cần khai báo nội dung riêng biệt.
- **Tự động chọn locale**: Tự động trả về bản dịch tương ứng với locale hiện tại.
- **Hỗ trợ TypeScript**: Cung cấp an toàn kiểu và tự động hoàn thành khi sử dụng với TypeScript.
- **Dễ dàng tích hợp**: Hoạt động mượt mà trong cả component phía client và server trong Next.js.

---

## Chữ ký hàm

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Tham số

- `translations`: Một đối tượng trong đó các khóa là mã locale (ví dụ: `en`, `fr`, `es`) và các giá trị là các chuỗi đã được dịch tương ứng.

### Giá trị trả về

- Một chuỗi đại diện cho nội dung đã được dịch cho locale hiện tại.

---

## Ví dụ sử dụng

### Sử dụng `t` trong một Client Component

Đảm bảo bạn thêm chỉ thị `'use client';` ở đầu file component khi sử dụng `t` trong một component phía client.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "Đây là nội dung của một ví dụ component phía client",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "Đây là nội dung của một ví dụ component phía client",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Sử dụng `t` trong một Server Component

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "Đây là nội dung của một ví dụ component phía server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "Đây là nội dung của một ví dụ component phía server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Đây là nội dung của một ví dụ component phía server",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "Đây là nội dung của một ví dụ component phía server",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Đây là nội dung của một ví dụ component phía server",
    })}
  </p>
);
```

### Dịch nội tuyến trong các thuộc tính

Hàm `t` đặc biệt hữu ích cho việc dịch nội tuyến trong các thuộc tính JSX.
Khi bản địa hóa các thuộc tính như `alt`, `title`, `href`, hoặc `aria-label`, bạn có thể sử dụng `t` trực tiếp trong thuộc tính.

```jsx
<button
  aria-label={t({
    en: "Gửi",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Gửi",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "Một cảnh đẹp",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Chủ đề nâng cao

### Tích hợp TypeScript

Hàm `t` an toàn về kiểu khi sử dụng với TypeScript, đảm bảo rằng tất cả các locale cần thiết đều được cung cấp.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Phát hiện Locale và Context

Trong `next-intlayer`, locale hiện tại được quản lý thông qua các context providers: `IntlayerClientProvider` và `IntlayerServerProvider`. Đảm bảo các providers này bao bọc các component của bạn và prop `locale` được truyền đúng cách.

#### Ví dụ:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Các component của bạn ở đây */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Các component của bạn ở đây */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Các component của bạn ở đây */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Lỗi Thường Gặp và Khắc Phục Sự Cố

### `t` Trả Về Giá Trị Undefined hoặc Dịch Sai

- **Nguyên nhân**: Locale hiện tại chưa được thiết lập đúng, hoặc bản dịch cho locale hiện tại bị thiếu.
- **Giải pháp**:
  - Kiểm tra xem `IntlayerClientProvider` hoặc `IntlayerServerProvider` đã được cấu hình đúng với `locale` phù hợp chưa.
  - Đảm bảo rằng đối tượng translations của bạn bao gồm tất cả các locale cần thiết.

### Thiếu Bản Dịch trong TypeScript

- **Nguyên nhân**: Đối tượng translations không đáp ứng đủ các locale yêu cầu, dẫn đến lỗi TypeScript.
- **Giải pháp**: Sử dụng kiểu `IConfigLocales` để đảm bảo tính đầy đủ của bản dịch.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript [!code error]
};

const text = t(translations);
```

---

## Mẹo Sử Dụng Hiệu Quả

1. **Sử dụng `t` cho các bản dịch nội tuyến đơn giản**: Phù hợp để dịch các đoạn văn bản nhỏ trực tiếp trong các component của bạn.
2. **Ưu tiên `useIntlayer` cho nội dung có cấu trúc**: Đối với các bản dịch phức tạp hơn và tái sử dụng nội dung, hãy định nghĩa nội dung trong các file khai báo và sử dụng `useIntlayer`.
3. **Cung cấp locale nhất quán**: Đảm bảo locale của bạn được cung cấp một cách nhất quán trên toàn bộ ứng dụng thông qua các provider phù hợp.
4. **Tận dụng TypeScript**: Sử dụng các kiểu TypeScript để phát hiện các bản dịch còn thiếu và đảm bảo an toàn kiểu.

---

## Kết luận

Hàm `t` trong `next-intlayer` là một công cụ mạnh mẽ và tiện lợi để quản lý các bản dịch nội tuyến trong các ứng dụng Next.js của bạn. Bằng cách tích hợp hiệu quả, bạn nâng cao khả năng quốc tế hóa của ứng dụng, mang lại trải nghiệm tốt hơn cho người dùng trên toàn thế giới.

Để biết thêm chi tiết về cách sử dụng và các tính năng nâng cao, hãy tham khảo [tài liệu next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

---

**Lưu ý**: Hãy nhớ thiết lập `IntlayerClientProvider` và `IntlayerServerProvider` của bạn một cách chính xác để đảm bảo rằng locale hiện tại được truyền đúng xuống các component của bạn. Điều này rất quan trọng để hàm `t` trả về các bản dịch chính xác.
