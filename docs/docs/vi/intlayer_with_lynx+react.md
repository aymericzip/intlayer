---
createdAt: 2025-03-09
updatedAt: 2025-12-30
title: Cách dịch ứng dụng di động Lynx và React của bạn – Hướng dẫn i18n 2026
description: Khám phá cách làm cho ứng dụng di động Lynx và React của bạn đa ngôn ngữ. Theo dõi tài liệu để quốc tế hóa (i18n) và dịch nó.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Thêm lệnh init
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Dịch trang web ứng dụng di động Lynx và React của bạn bằng Intlayer | Quốc tế hóa (i18n)

Xem [Application Template](https://github.com/aymericzip/intlayer-lynx-template) trên GitHub.

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-lynx-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Intlayer là gì?

**Intlayer** là một **thư viện quốc tế hóa (i18n) mã nguồn mở, sáng tạo** giúp đơn giản hóa việc hỗ trợ đa ngôn ngữ trong các ứng dụng hiện đại. Nó hoạt động trong nhiều môi trường JavaScript/TypeScript, **bao gồm cả Lynx** (thông qua gói `react-intlayer`).

Với Intlayer, bạn có thể:

- **Dễ dàng quản lý bản dịch** bằng cách sử dụng các từ điển khai báo ở cấp độ component.
- **Đảm bảo hỗ trợ TypeScript** với các kiểu được tự động tạo.
- **Địa phương hóa nội dung một cách động**, bao gồm **chuỗi giao diện người dùng** (và trong React cho web, nó cũng có thể địa phương hóa metadata HTML, v.v.).
- **Hưởng lợi từ các tính năng nâng cao**, như phát hiện và chuyển đổi ngôn ngữ động.

---

## Bước 1: Cài đặt các phụ thuộc

Từ dự án Lynx của bạn, cài đặt các gói sau:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
```

### Các gói

- **intlayer**
- **intlayer**  
  Bộ công cụ i18n cốt lõi cho cấu hình, nội dung từ điển, tạo kiểu và các lệnh CLI.

- **react-intlayer**  
  Tích hợp React cung cấp các context providers và React hooks mà bạn sẽ sử dụng trong Lynx để lấy và chuyển đổi ngôn ngữ.

- **lynx-intlayer**  
  Tích hợp Lynx cung cấp plugin để tích hợp Intlayer với trình đóng gói Lynx.

---

## Bước 2: Tạo cấu hình Intlayer

Trong thư mục gốc dự án của bạn (hoặc bất kỳ nơi nào thuận tiện), tạo một tệp **cấu hình Intlayer**. Nó có thể trông như sau:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Thêm bất kỳ ngôn ngữ nào khác bạn cần
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// cấu hình cho Intlayer
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Thêm bất kỳ ngôn ngữ nào khác bạn cần
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// cấu hình cho Intlayer
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Trong cấu hình này, bạn có thể:

- Cấu hình **danh sách các ngôn ngữ được hỗ trợ**.
- Đặt một ngôn ngữ **mặc định**.
- Sau này, bạn có thể thêm các tùy chọn nâng cao hơn (ví dụ: ghi log, thư mục nội dung tùy chỉnh, v.v.).
- Xem thêm tại [tài liệu cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Bước 3: Thêm plugin Intlayer vào trình đóng gói Lynx

Để sử dụng Intlayer với Lynx, bạn cần thêm plugin vào file `lynx.config.ts` của bạn:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... các plugin khác
    pluginIntlayerLynx(),
  ],
});
```

## Bước 4: Thêm provider Intlayer

Để giữ đồng bộ ngôn ngữ người dùng trên toàn bộ ứng dụng của bạn, bạn cần bao bọc component gốc của bạn với component `IntlayerProvider` từ `react-intlayer`.

Ngoài ra, bạn cần thêm file hàm `intlayerPolyfill` để đảm bảo Intlayer hoạt động đúng cách.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Bước 5: Khai báo Nội dung của bạn

Tạo các file **khai báo nội dung** ở bất kỳ đâu trong dự án của bạn (thường là trong `src/`), sử dụng bất kỳ định dạng phần mở rộng nào mà Intlayer hỗ trợ:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- v.v.

Ví dụ:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Chỉnh sửa",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "để xem các cập nhật!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "trên Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Chạm vào logo và vui chơi!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Chỉnh sửa",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "để xem các cập nhật!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "trên Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Chạm vào logo và vui chơi!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Chỉnh sửa",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "để xem các cập nhật!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Để biết chi tiết về khai báo nội dung, xem [tài liệu nội dung của Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

---

## Bước 4: Sử dụng Intlayer trong các Component của bạn

Sử dụng hook `useIntlayer` trong các component con để lấy nội dung đã được địa phương hóa.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "chỉ nền";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Khi sử dụng `content.someKey` trong các props dạng chuỗi (ví dụ, `title` của một nút hoặc `children` của một component `Text`), **hãy gọi `content.someKey.value`** để lấy chuỗi thực tế.

---

## (Tùy chọn) Bước 5: Thay đổi Locale của Ứng dụng

Để chuyển đổi locale từ bên trong các component của bạn, bạn có thể sử dụng phương thức `setLocale` của hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Điều này kích hoạt việc render lại tất cả các component sử dụng nội dung Intlayer, giờ đây hiển thị bản dịch cho locale mới.

> Xem thêm tài liệu [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md) để biết thêm chi tiết.

## Cấu hình TypeScript (nếu bạn sử dụng TypeScript)

Intlayer tạo các định nghĩa kiểu trong một thư mục ẩn (mặc định là `.intlayer`) để cải thiện tính năng tự động hoàn thành và phát hiện lỗi dịch thuật:

```json5
// tsconfig.json
{
  // ... cấu hình TS hiện có của bạn
  "include": [
    "src", // mã nguồn của bạn
    ".intlayer/types/**/*.ts", // <-- đảm bảo bao gồm các kiểu được tạo tự động
    // ... bất cứ thứ gì khác bạn đã bao gồm
  ],
}
```

Điều này cho phép các tính năng như:

- **Tự động hoàn thành** cho các khóa trong từ điển của bạn.
- **Kiểm tra kiểu** cảnh báo nếu bạn truy cập vào khóa không tồn tại hoặc không khớp kiểu.

---

## Cấu hình Git

Để tránh commit các file được tạo tự động bởi Intlayer, hãy thêm đoạn sau vào `.gitignore` của bạn:

```plaintext
# Bỏ qua các file được tạo bởi Intlayer
.intlayer
```

---

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, tham khảo [Tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Đi xa hơn

- **Trình chỉnh sửa trực quan**: Sử dụng [Trình chỉnh sửa trực quan Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) để quản lý bản dịch một cách trực quan.
- **Tích hợp CMS**: Bạn cũng có thể ngoại vi hóa và lấy nội dung từ điển của mình từ một [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).
- **Lệnh CLI**: Khám phá [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_cli.md) cho các tác vụ như **trích xuất bản dịch** hoặc **kiểm tra các khóa bị thiếu**.

---
