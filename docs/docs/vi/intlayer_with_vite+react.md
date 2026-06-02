---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: Vite + React i18n - Hướng dẫn đầy đủ để dịch React
description: Giải pháp tốt nhất cho kích thước bundle, SEO, hiệu suất & khả năng bảo trì. Làm cho Vite and React ứng dụng của bạn đa ngôn ngữ vào năm 2026, dịch thuật LLM, Agent Skills & MCP.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Thêm lệnh init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Lịch sử khởi tạo"
---

# Dịch trang web Vite và React của bạn bằng Intlayer | Quốc tế hóa (i18n)

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `react-i18next` hay `i18next`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>

<Accordion header="Bảo hiểm đầy đủ Vite và React">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Vite và React bằng cách cung cấp **phạm vi nội dung cấp thành phần**, **bản dịch được tải từng phần** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

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

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vite và React

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Giải pháp i18n tốt nhất cho Vite và React? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu Ứng Dụng](https://github.com/aymericzip/intlayer-vite-react-template) trên GitHub.

<Steps>

<Step number={1} title="Cài đặt các phụ thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Gói cốt lõi cung cấp các công cụ quốc tế hóa cho quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), biên dịch lại, và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các context provider và hook cho việc quốc tế hóa trong React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [trình đóng gói Vite](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie, và xử lý chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một file cấu hình để cấu hình các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Các ngôn ngữ khác của bạn
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Thông qua tệp cấu hình này, bạn có thể thiết lập URL theo ngôn ngữ, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt các log của Intlayer trên console, và nhiều hơn nữa. Để xem danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Tích hợp Intlayer vào cấu hình Vite của bạn">

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các file khai báo nội dung và giám sát chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó còn cung cấp các bí danh để tối ưu hiệu suất.

</Step>

<Step number={4} title="Khai báo Nội dung của Bạn">

Tạo và quản lý các khai báo nội dung để lưu trữ bản dịch:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Chỉnh sửa <code>src/App.tsx</code> và lưu để thử HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Nhấn vào logo Vite và React để tìm hiểu thêm",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "vi": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "vi": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "vi": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "vi": "số đếm là "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "vi": "Chỉnh sửa src/App.tsx và lưu để kiểm tra HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "vi": "Nhấn vào logo Vite và React để tìm hiểu thêm"
      }
    },
        "vi": "Nhấp vào các logo Vite và React để tìm hiểu thêm"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

> Nếu tệp nội dung của bạn bao gồm mã TSX, bạn nên xem xét việc import `import React from "react";` trong tệp nội dung của bạn.

</Step>

<Step number={5} title="Sử dụng Intlayer trong Mã của Bạn">

Truy cập các từ điển nội dung của bạn trong toàn bộ ứng dụng:

```tsx {5,9} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> Nếu bạn muốn sử dụng nội dung của mình trong một thuộc tính `string`, chẳng hạn như `alt`, `title`, `href`, `aria-label`, v.v., bạn phải gọi giá trị của hàm, như sau:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Để tìm hiểu thêm về hook `useIntlayer`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md).

> Nếu ứng dụng của bạn đã tồn tại, bạn có thể sử dụng [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) kết hợp với [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi hàng nghìn component chỉ trong một giây.

</Step>

<Step number={6} title="Thay đổi ngôn ngữ cho nội dung của bạn" isOptional={true}>

Để thay đổi ngôn ngữ cho nội dung của bạn, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này cho phép bạn thiết lập locale của ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Thay đổi ngôn ngữ sang tiếng Anh
    </button>
  );
};
```

> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Thêm định tuyến theo ngôn ngữ vào ứng dụng của bạn" isOptional={true}>

Mục đích của bước này là tạo các đường dẫn duy nhất cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và các URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Theo mặc định, các tuyến đường không được thêm tiền tố cho ngôn ngữ mặc định. Nếu bạn muốn thêm tiền tố cho ngôn ngữ mặc định, bạn có thể đặt tùy chọn `middleware.prefixDefault` thành `true` trong cấu hình của bạn. Xem thêm tại [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) để biết thêm thông tin.

Để thêm định tuyến theo ngôn ngữ vào ứng dụng của bạn, bạn có thể tạo một thành phần `LocaleRouter` bao bọc các tuyến đường của ứng dụng và xử lý định tuyến dựa trên ngôn ngữ. Dưới đây là ví dụ sử dụng [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer"; // Các hàm tiện ích và kiểu từ 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Kiểu React cho các functional component và props
import { IntlayerProvider } from "react-intlayer"; // Provider cho ngữ cảnh quốc tế hóa
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Các thành phần Router để quản lý điều hướng

/**
 * Một thành phần router thiết lập các tuyến đường theo ngôn ngữ cụ thể.
 * Nó sử dụng React Router để quản lý điều hướng và hiển thị các thành phần được địa phương hóa.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Mẫu tuyến đường để bắt ngôn ngữ (ví dụ: /en/, /fr/) và khớp với tất cả các đường dẫn tiếp theo
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Bao bọc các phần tử con với quản lý ngôn ngữ
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

> Lưu ý: Nếu bạn sử dụng `routing.mode: 'no-prefix' | 'search-params'`, có thể bạn không cần sử dụng hàm `localeMap`.

Sau đó, bạn có thể sử dụng thành phần `LocaleRouter` trong ứng dụng của mình:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Thành phần AppContent của bạn

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

Song song đó, bạn cũng có thể sử dụng `intlayerProxy` để thêm routing phía server cho ứng dụng của bạn. Plugin này sẽ tự động phát hiện locale hiện tại dựa trên URL và thiết lập cookie locale phù hợp. Nếu không có locale nào được chỉ định, plugin sẽ xác định locale phù hợp nhất dựa trên ngôn ngữ trình duyệt của người dùng. Nếu không phát hiện được locale nào, nó sẽ chuyển hướng đến locale mặc định.

> Lưu ý rằng để sử dụng `intlayerProxy` trong môi trường production, bạn cần chuyển gói `vite-intlayer` từ `devDependencies` sang `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    react(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="Thay đổi URL khi thay đổi locale" isOptional={true}>

Để thay đổi URL khi locale thay đổi, bạn có thể sử dụng prop `onLocaleChange` được cung cấp bởi hook `useLocale`. Đồng thời, bạn có thể sử dụng các hook `useLocation` và `useNavigate` từ `react-router-dom` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Lấy đường dẫn URL hiện tại. Ví dụ: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Tạo URL với locale được cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Cập nhật đường dẫn URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Ngôn ngữ - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Tên ngôn ngữ trong chính ngôn ngữ đó - ví dụ: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Tên ngôn ngữ trong ngôn ngữ hiện tại - ví dụ: Francés khi locale hiện tại là Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Tham khảo tài liệu:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Dưới đây là **Bước 9** đã được cập nhật với các giải thích bổ sung và ví dụ mã được tinh chỉnh:

---

</Step>

<Step number={9} title="Chuyển đổi Thuộc tính Ngôn ngữ và Hướng của HTML" isOptional={true}>

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để phù hợp với locale hiện tại là rất quan trọng. Việc này đảm bảo:

- **Khả năng truy cập**: Các trình đọc màn hình và công nghệ hỗ trợ dựa vào thuộc tính `lang` chính xác để phát âm và hiểu nội dung một cách chính xác.
- **Hiển thị văn bản**: Thuộc tính `dir` (hướng) đảm bảo văn bản được hiển thị theo đúng thứ tự (ví dụ: từ trái sang phải cho tiếng Anh, từ phải sang trái cho tiếng Ả Rập hoặc Do Thái), điều này rất cần thiết cho khả năng đọc.
- **SEO**: Các công cụ tìm kiếm sử dụng thuộc tính `lang` để xác định ngôn ngữ của trang, giúp phục vụ nội dung địa phương hóa phù hợp trong kết quả tìm kiếm.

Bằng cách cập nhật các thuộc tính này một cách động khi locale thay đổi, bạn đảm bảo trải nghiệm nhất quán và dễ tiếp cận cho người dùng trên tất cả các ngôn ngữ được hỗ trợ.

#### Triển khai Hook

Tạo một hook tùy chỉnh để quản lý các thuộc tính HTML. Hook này lắng nghe sự thay đổi của locale và cập nhật các thuộc tính tương ứng:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên locale hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc đúng (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Việc cập nhật động này rất cần thiết cho việc hiển thị văn bản đúng cách, khả năng tiếp cận và SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ theo locale hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên locale hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### Sử dụng Hook trong Ứng dụng của Bạn

Tích hợp hook vào thành phần chính của bạn để các thuộc tính HTML được cập nhật mỗi khi locale thay đổi:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Áp dụng hook để cập nhật các thuộc tính lang và dir của thẻ <html> dựa trên locale.
  useI18nHTMLAttributes();

  // ... Phần còn lại của component
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

Bằng cách áp dụng những thay đổi này, ứng dụng của bạn sẽ:

- Đảm bảo thuộc tính **ngôn ngữ** (`lang`) phản ánh chính xác locale hiện tại, điều này quan trọng cho SEO và hành vi của trình duyệt.
- Điều chỉnh **hướng văn bản** (`dir`) theo locale, nâng cao khả năng đọc và trải nghiệm người dùng cho các ngôn ngữ có thứ tự đọc khác nhau.
- Cung cấp trải nghiệm **truy cập tốt hơn**, vì các công nghệ hỗ trợ phụ thuộc vào các thuộc tính này để hoạt động tối ưu.

</Step>

<Step number={10} title="Tạo Component Link Đa Ngôn Ngữ" isOptional={true}>

Để đảm bảo rằng điều hướng của ứng dụng của bạn tuân thủ locale hiện tại, bạn có thể tạo một component `Link` tùy chỉnh. Component này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ, ví dụ, khi người dùng nói tiếng Pháp nhấp vào liên kết đến trang "About", họ sẽ được chuyển hướng đến `/fr/about` thay vì `/about`.

Hành vi này hữu ích vì một số lý do sau:

- **SEO và Trải nghiệm người dùng**: URL có địa phương hóa giúp các công cụ tìm kiếm lập chỉ mục chính xác các trang theo ngôn ngữ và cung cấp nội dung phù hợp với ngôn ngữ ưu tiên của người dùng.
- **Tính nhất quán**: Bằng cách sử dụng liên kết có địa phương hóa trong toàn bộ ứng dụng, bạn đảm bảo điều hướng luôn ở trong locale hiện tại, tránh việc chuyển đổi ngôn ngữ không mong muốn.
- **Dễ bảo trì**: Tập trung logic đa ngôn ngữ vào một component duy nhất giúp đơn giản hóa việc quản lý URL, làm cho codebase của bạn dễ bảo trì và mở rộng khi ứng dụng phát triển.

Dưới đây là triển khai của component `Link` đa ngôn ngữ bằng TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * Hàm tiện ích để kiểm tra xem một URL có phải là liên kết ngoài không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là liên kết ngoài.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Một component Link tùy chỉnh điều chỉnh thuộc tính href dựa trên locale hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố locale vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo việc điều hướng luôn giữ trong cùng một ngữ cảnh locale.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Nếu liên kết là nội bộ và href hợp lệ được cung cấp, lấy URL đã được địa phương hóa.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### Cách Hoạt Động

- **Phát hiện Liên kết Ngoài**:  
  Hàm trợ giúp `checkIsExternalLink` xác định xem một URL có phải là liên kết ngoài hay không. Các liên kết ngoài được giữ nguyên vì không cần phải địa phương hóa.

- **Lấy Ngôn ngữ Hiện tại**:  
  Hook `useLocale` cung cấp ngôn ngữ hiện tại (ví dụ: `fr` cho tiếng Pháp).

- **Địa phương hóa URL**:  
  Đối với các liên kết nội bộ (tức là không phải liên kết ngoài), `getLocalizedUrl` được sử dụng để tự động thêm tiền tố ngôn ngữ vào URL. Điều này có nghĩa là nếu người dùng của bạn đang ở ngôn ngữ Pháp, việc truyền `/about` làm `href` sẽ chuyển thành `/fr/about`.

- **Trả về Liên kết**:  
  Thành phần trả về một phần tử `<a>` với URL đã được địa phương hóa, đảm bảo rằng việc điều hướng nhất quán với ngôn ngữ hiện tại.

Bằng cách tích hợp thành phần `Link` này trong toàn bộ ứng dụng của bạn, bạn duy trì trải nghiệm người dùng nhất quán và nhận biết ngôn ngữ đồng thời tận dụng được lợi ích từ SEO và khả năng sử dụng được cải thiện.
</Step>

<Step number={1} title="Trích xuất nội dung các thành phần của bạn" isOptional={true}>

Nếu bạn có một cơ sở mã hiện có, việc chuyển đổi hàng nghìn tệp có thể tốn nhiều thời gian.

Để đơn giản hóa quy trình này, Intlayer đề xuất một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) / [trình trích xuất](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md) để chuyển đổi các thành phần của bạn và trích xuất nội dung.

Để thiết lập, bạn có thể thêm phần `compiler` vào tệp `intlayer.config.ts` của mình:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Phần còn lại của cấu hình
  compiler: {
    /**
     * Cho biết trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Xác định đường dẫn các tệp đầu ra
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Cho biết các thành phần có nên được lưu sau khi chuyển đổi hay không. Bằng cách đó, trình biên dịch có thể được chạy chỉ một lần để chuyển đổi ứng dụng, sau đó có thể được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Lệnh trích xuất'>

Chạy trình trích xuất để chuyển đổi các thành phần và trích xuất nội dung

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Trình biên dịch Babel'>

Cập nhật `vite.config.ts` của bạn để bao gồm plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Thêm plugin trình biên dịch
  ],
});
```

```bash packageManager="npm"
npm run build # Hoặc npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Cấu hình TypeScript

Intlayer sử dụng module augmentation để tận dụng các lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo cấu hình TypeScript của bạn bao gồm các kiểu được tạo tự động.

```json5 fileName="tsconfig.json"
{
  // ... Cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... Cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu tự động tạo
  ],
}
```

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các chỉ dẫn sau vào tệp `.gitignore` của bạn:

```bash
#  Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [Tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### (Tuỳ chọn) Sitemap và robots.txt (sinh lúc build)

Intlayer cung cấp `generateSitemap` và `getMultilingualUrls` để định dạng `sitemap.xml` đa ngôn ngữ và `robots.txt` cho crawler rồi tự ghi vào `public/`. Thường chạy một script Node nhỏ **trước** Vite (ví dụ hook npm `predev` / `prebuild`).

#### Sitemap

Trình tạo sitemap của Intlayer tôn trọng cấu hình locale và thêm metadata cho crawler.

> Sitemap hỗ trợ không gian tên `xhtml:link` (hreflang). Thay vì chỉ liệt kê URL phẳng, Intlayer nối hai chiều mọi bản địa phương của từng trang (ví dụ `/about`, `/fr/about` hoặc `/about?lang=fr` tùy chế độ routing).

#### Robots.txt

Dùng `getMultilingualUrls` để quy tắc `Disallow` áp dụng cho mọi biến thể URL của đường dẫn nhạy cảm.

#### 1. Thêm `generate-seo.mjs` ở thư mục gốc dự án

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Cần cài `intlayer` để script import. Môi trường production đặt `SITE_URL` (ví dụ trong CI).

> Nên dùng `generate-seo.mjs` cho ESM của Node. Nếu dùng `generate-seo.js`, đặt `"type": "module"` trong `package.json` hoặc bật ESM tương đương.

#### 2. Chạy script trước Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Chỉnh lệnh nếu dùng pnpm hoặc yarn. Có thể gọi từ CI hoặc bước pipeline khác.

### Tiến xa hơn

Để tiến xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) hoặc tách nội dung của bạn ra ngoài bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
