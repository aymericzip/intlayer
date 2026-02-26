---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite và React i18n - Chuyển đổi ứng dụng hiện có thành ứng dụng đa ngôn ngữ (hướng dẫn i18n 2026)
description: Khám phá cách làm cho ứng dụng Vite và React hiện tại của bạn trở nên đa ngôn ngữ bằng cách sử dụng Intlayer Compiler. Làm theo tài liệu để quốc tế hóa (i18n) và dịch nó bằng AI.
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vite
  - React
  - Trình biên dịch
  - AI
slugs:
  - doc
  - moi-truong
  - vite-va-react
  - trinh-bien-dich
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Phát hành lần đầu
---

# Cách làm cho ứng dụng Vite và React hiện có trở thành đa ngôn ngữ (i18n) sau đó (hướng dẫn i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Giải pháp i18n tốt nhất cho Vite và React? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-vite-react-template) trên GitHub.

## Mục lục

<TOC/>

## Tại sao việc quốc tế hóa một ứng dụng hiện có lại khó khăn?

Nếu bạn đã từng thử thêm nhiều ngôn ngữ vào một ứng dụng vốn chỉ được xây dựng cho một ngôn ngữ, bạn sẽ hiểu được nỗi vất vả đó. Nó không chỉ "khó" mà còn cực kỳ tẻ nhạt. Bạn phải rà soát qua từng tệp tin, săn lùng từng chuỗi văn bản và chuyển chúng vào các tệp từ điển riêng biệt.

Sau đó là phần đầy rủi ro: thay thế toàn bộ văn bản đó bằng các hook mã nguồn mà không làm hỏng giao diện hoặc logic của bạn. Đó là loại công việc khiến việc phát triển tính năng mới bị đình trệ trong nhiều tuần và cảm giác như một quá trình cấu trúc lại mã (refactoring) không bao giờ kết thúc.

## Intlayer Compiler là gì?

**Intlayer Compiler** được xây dựng để bỏ qua những công việc thủ công nặng nhọc đó. Thay vì bạn phải tự trích xuất các chuỗi ký tự, trình biên dịch sẽ làm việc đó cho bạn. Nó quét mã của bạn, tìm văn bản và sử dụng AI để tạo ra các từ điển ở chế độ nền.
Sau đó, nó sửa đổi mã của bạn trong quá trình xây dựng (build) để chèn các hook i18n cần thiết. Về cơ bản, bạn vẫn viết ứng dụng như thể nó chỉ có một ngôn ngữ, và trình biên dịch sẽ tự động xử lý việc chuyển đổi đa ngôn ngữ.

> Tài liệu trình biên dịch: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)

### Hạn chế

Vì trình biên dịch thực hiện phân tích và chuyển đổi mã (chèn hook và tạo từ điển) tại **thời điểm biên dịch**, nó có thể làm **chậm quá trình xây dựng** ứng dụng của bạn.

Để giảm bớt tác động này trong quá trình phát triển, bạn có thể cấu hình trình biên dịch chạy ở chế độ [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) hoặc tắt nó khi không cần thiết.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vite và React

### Bước 1: Cài đặt các gói phụ thuộc

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
bunx intlayer init
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), chuyển đổi mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các trình cung cấp ngữ cảnh (context providers) và các hook cho việc quốc tế hóa React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### Bước 2: Cấu hình dự án của bạn

Tạo một tệp cấu hình để thiết lập các ngôn ngữ cho ứng dụng của bạn:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.VIETNAMESE, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Cho biết liệu trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Thư mục đầu ra cho các từ điển đã được tối ưu hóa.
     */
    outputDir: "compiler",

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Xóa tiền tố cơ bản

    /**
     * Cho biết liệu các thành phần có nên được lưu lại sau khi được biến đổi hay không.
     * Bằng cách này, trình biên dịch có thể được chạy một lần để biến đổi ứng dụng, sau đó nó có thể được gỡ bỏ.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ứng dụng này là một ứng dụng bản đồ", // Lưu ý: bạn có thể tùy chỉnh mô tả ứng dụng này
  },
};

export default config;
```

> **Lưu ý**: Đảm bảo bạn đã đặt `OPEN_AI_API_KEY` trong các biến môi trường của mình.

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được bản địa hóa, chuyển hướng middleware, tên cookie, vị trí và phần mở rộng của các khai báo nội dung, tắt nhật ký Intlayer trong console, v.v. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Bước 3: Tích hợp Intlayer trong cấu hình Vite của bạn

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các bí danh (aliases) để tối ưu hóa hiệu suất.

> Plugin Vite `intlayerCompiler()` được sử dụng để trích xuất nội dung từ component và ghi các tệp `.content`.

### Bước 4: Biên dịch mã của bạn

Chỉ cần viết các component của bạn với các chuỗi ký tự được mã hóa cứng (hardcoded) bằng ngôn ngữ mặc định của bạn. Trình biên dịch sẽ xử lý phần còn lại.

Ví dụ về giao diện trang của bạn có thể trông như sau:

<Tabs>
 <Tab value="Mã nguồn">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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

 </Tab>
 <Tab value="Kết quả">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      vi: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "số đếm là",
        editMessage: "Sửa",
        hmrMessage: "và lưu để kiểm tra HMR",
        readTheDocs: "Nhấp vào logo Vite và React để tìm hiểu thêm",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

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
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
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

 </Tab>
</Tabs>

- **`IntlayerProvider`** được sử dụng để cung cấp ngôn ngữ cho các component con.

### (Tùy chọn) Bước 6: Thay đổi ngôn ngữ của nội dung

Để thay đổi ngôn ngữ của nội dung, bạn có thể sử dụng hàm `setLocale` được cung cấp bởi hook `useLocale`. Hàm này cho phép bạn thiết lập ngôn ngữ của ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx"
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

### (Tùy chọn) Bước 7: Điền các bản dịch còn thiếu

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã nguồn của bạn.

```bash
npx intlayer test         # Kiểm tra xem có bản dịch nào còn thiếu không
```

```bash
npx intlayer fill         # Điền các bản dịch còn thiếu
```

> Để biết thêm chi tiết, vui lòng tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md)

### Cấu hình Git

Khuyên dùng bỏ qua các tệp do Intlayer tạo ra. Điều này giúp bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp do Intlayer tạo ra
.intlayer
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch thuật.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước trực tiếp** nội dung đã dịch.
- **Các hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích, hãy tham khảo [tài liệu Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Đi xa hơn

Để tìm hiểu sâu hơn, bạn có thể triển khai [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) hoặc bên thứ ba hóa nội dung của bạn bằng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
