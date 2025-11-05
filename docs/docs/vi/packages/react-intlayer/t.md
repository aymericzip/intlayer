---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm t | react-intlayer
description: Xem cách sử dụng hàm t cho gói react-intlayer
keywords:
  - t
  - dịch thuật
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `t` trong `react-intlayer`

Hàm `t` trong gói `react-intlayer` là một công cụ cơ bản cho việc quốc tế hóa nội tuyến trong ứng dụng React của bạn. Nó cho phép bạn định nghĩa các bản dịch trực tiếp trong các component, giúp hiển thị nội dung được bản địa hóa dựa trên locale hiện tại một cách đơn giản.

---

## Tổng quan

Hàm `t` được sử dụng để cung cấp các bản dịch cho các locale khác nhau trực tiếp trong các component của bạn. Bằng cách truyền một đối tượng chứa các bản dịch cho từng locale được hỗ trợ, `t` sẽ trả về bản dịch phù hợp dựa trên ngữ cảnh locale hiện tại trong ứng dụng React của bạn.

---

## Các tính năng chính

- **Dịch nội tuyến**: Lý tưởng cho các đoạn văn bản nhanh, nội tuyến mà không cần khai báo nội dung riêng biệt.
- **Tự động chọn locale**: Tự động trả về bản dịch tương ứng với locale hiện tại.
- **Hỗ trợ TypeScript**: Cung cấp an toàn kiểu và tự động hoàn thành khi sử dụng với TypeScript.
- **Dễ dàng tích hợp**: Hoạt động mượt mà trong các component React.

---

## Chữ ký hàm

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Tham số

- `translations`: Một đối tượng trong đó các khóa là mã locale (ví dụ: `en`, `fr`, `es`) và các giá trị là các chuỗi đã được dịch tương ứng.

### Trả về

- Một chuỗi đại diện cho nội dung đã được dịch cho locale hiện tại.

---

## Ví dụ sử dụng

### Sử dụng cơ bản của `t` trong một Component

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Dịch nội tuyến trong các thuộc tính

Hàm `t` đặc biệt hữu ích cho việc dịch nội tuyến trong các thuộc tính JSX. Khi bản địa hóa các thuộc tính như `alt`, `title`, `href`, hoặc `aria-label`, bạn có thể sử dụng `t` trực tiếp bên trong thuộc tính.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Các chủ đề nâng cao

### Tích hợp TypeScript

Hàm `t` an toàn về kiểu khi sử dụng với TypeScript, đảm bảo rằng tất cả các locale cần thiết đều được cung cấp.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
// @type {import('react-intlayer').IConfigLocales<string>} định nghĩa kiểu cho biến translations
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
// @type {import('react-intlayer').IConfigLocales<string>} định nghĩa kiểu cho biến translations
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Phát hiện Locale và Ngữ cảnh

Trong `react-intlayer`, locale hiện tại được quản lý thông qua `IntlayerProvider`. Đảm bảo rằng provider này bao bọc các component của bạn và prop `locale` được truyền đúng cách.

#### Ví dụ:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Các component của bạn ở đây */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Các component của bạn ở đây */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Các component của bạn ở đây */}
  </IntlayerProvider>
);
```

---

## Các lỗi phổ biến và cách khắc phục

### `t` Trả về giá trị Undefined hoặc bản dịch không chính xác

- **Nguyên nhân**: Locale hiện tại chưa được thiết lập đúng, hoặc bản dịch cho locale hiện tại bị thiếu.
- **Giải pháp**:
  - Kiểm tra xem `IntlayerProvider` đã được cấu hình đúng với `locale` phù hợp chưa.
  - Đảm bảo rằng đối tượng bản dịch của bạn bao gồm tất cả các locale cần thiết.

### Thiếu bản dịch trong TypeScript

- **Nguyên nhân**: Đối tượng bản dịch không đáp ứng đủ các locale yêu cầu, dẫn đến lỗi TypeScript.
- **Giải pháp**: Sử dụng kiểu `IConfigLocales` để đảm bảo bản dịch của bạn đầy đủ.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Thiếu 'es' sẽ gây lỗi TypeScript
};

const text = t(translations);
```

---

## Mẹo Sử Dụng Hiệu Quả

1. **Sử dụng `t` cho các bản dịch nội tuyến đơn giản**: Phù hợp để dịch các đoạn văn bản nhỏ trực tiếp trong các component của bạn.
2. **Ưu tiên `useIntlayer` cho nội dung có cấu trúc**: Đối với các bản dịch phức tạp hơn và tái sử dụng nội dung, hãy định nghĩa nội dung trong các file khai báo và sử dụng `useIntlayer`.
3. **Cung cấp locale nhất quán**: Đảm bảo locale của bạn được cung cấp một cách nhất quán trên toàn bộ ứng dụng thông qua `IntlayerProvider`.
4. **Tận dụng TypeScript**: Sử dụng các kiểu TypeScript để phát hiện các bản dịch còn thiếu và đảm bảo an toàn kiểu.

---

## Kết Luận

Hàm `t` trong `react-intlayer` là một công cụ mạnh mẽ và tiện lợi để quản lý các bản dịch nội tuyến trong các ứng dụng React của bạn. Bằng cách tích hợp hiệu quả, bạn nâng cao khả năng quốc tế hóa của ứng dụng, mang lại trải nghiệm tốt hơn cho người dùng trên toàn thế giới.

Để biết thêm chi tiết về cách sử dụng và các tính năng nâng cao, hãy tham khảo [tài liệu react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md).

---

**Lưu ý**: Hãy nhớ thiết lập `IntlayerProvider` đúng cách để đảm bảo locale hiện tại được truyền chính xác đến các component của bạn. Điều này rất quan trọng để hàm `t` trả về các bản dịch chính xác.
