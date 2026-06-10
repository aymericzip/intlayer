---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: "Lynx + React i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Lynx + React đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Khởi tạo lịch sử"
---

# Dịch trang web ứng dụng di động Lynx và React của bạn bằng Intlayer | Quốc tế hóa (i18n)

Xem [Application Template](https://github.com/aymericzip/intlayer-lynx-template) trên GitHub.

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-lynx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `react-native-localize` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>

<Accordion header="Bảo hiểm Lynx đầy đủ">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Lynx và React bằng cách cung cấp **phạm vi nội dung cấp thành phần**, **hỗ trợ TypeScript** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

</Accordion>

<Accordion header="Tự động hóa">

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

</Accordion>

<Accordion header="Hiệu suất">

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

</Accordion>

<Accordion header="Mở rộng quy mô không có nhà phát triển">

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

</Accordion>
</AccordionGroup>

---

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

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
bun x intlayer init
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

</Step>

<Step number={2} title="Tạo cấu hình Intlayer">

Trong thư mục gốc dự án của bạn (hoặc bất kỳ nơi nào thuận tiện), tạo một tệp **cấu hình Intlayer**. Nó có thể trông như sau:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

Trong cấu hình này, bạn có thể:

- Cấu hình **danh sách các ngôn ngữ được hỗ trợ**.
- Đặt một ngôn ngữ **mặc định**.
- Sau này, bạn có thể thêm các tùy chọn nâng cao hơn (ví dụ: ghi log, thư mục nội dung tùy chỉnh, v.v.).
- Xem thêm tại [tài liệu cấu hình Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Thêm plugin Intlayer vào trình đóng gói Lynx">

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

</Step>

<Step number={4} title="Thêm provider Intlayer">

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

</Step>

<Step number={5} title="Khai báo Nội dung của bạn">

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

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={6} title="Sử dụng Intlayer trong các Component của bạn">

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

</Step>

<Step number={7} title="Thay đổi Locale của Ứng dụng" isOptional={true}>

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

</Step>

</Steps>

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

```bash
#  Bỏ qua các file được tạo bởi Intlayer
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
- **Lệnh CLI**: Khám phá [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) cho các tác vụ như **trích xuất bản dịch** hoặc **kiểm tra các khóa bị thiếu**.

---
