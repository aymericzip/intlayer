---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Vite + React đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
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
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Phát hành lần đầu"
author: aymericzip
---

# Cách làm cho ứng dụng Vite và React hiện có trở thành đa ngôn ngữ (i18n) sau đó (hướng dẫn i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Giải pháp i18n tốt nhất cho Vite và React? Khám phá Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Mã nguồn" value="code">

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

<Steps>

<Step number={1} title="Cài đặt các gói phụ thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), chuyển đổi mã và [các lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Gói tích hợp Intlayer với ứng dụng React. Nó cung cấp các trình cung cấp ngữ cảnh (context providers) và các hook cho việc quốc tế hóa React.

- **vite-intlayer**
  Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưa thích của người dùng, quản lý cookie và xử lý chuyển hướng URL.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

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
     * Cho biết trình biên dịch có nên được bật hay không.
     */
    enabled: true,

    /**
     * Thư mục đầu ra cho các từ điển được tối ưu hóa.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Chỉ chèn nội dung vào tệp đã tạo, không có khóa.
     */
    noMetadata: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Cho biết liệu các thành phần có nên được lưu sau khi được chuyển đổi hay không.
     * Bằng cách đó, trình biên dịch có thể được chạy một lần duy nhất để chuyển đổi ứng dụng, và sau đó nó có thể được gỡ bỏ.
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

</Step>

<Step number={3} title="Tích hợp Intlayer trong cấu hình Vite của bạn">

Thêm plugin intlayer vào cấu hình của bạn.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Plugin Vite `intlayer()` được sử dụng để tích hợp Intlayer với Vite. Nó đảm bảo việc xây dựng các tệp khai báo nội dung và theo dõi chúng trong chế độ phát triển. Nó định nghĩa các biến môi trường Intlayer trong ứng dụng Vite. Ngoài ra, nó cung cấp các bí danh (aliases) để tối ưu hóa hiệu suất.

> Plugin Vite `intlayerCompiler()` được sử dụng để trích xuất nội dung từ component và ghi các tệp `.content`.

</Step>

<Step number={4} title="Biên dịch mã của bạn">

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

</Step>

<Step number={6} title="Thay đổi ngôn ngữ của nội dung" isOptional={true}>

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

</Step>

<Step number={7} title="Điền các bản dịch còn thiếu" isOptional={true}>

Intlayer cung cấp một công cụ CLI để giúp bạn điền các bản dịch còn thiếu. Bạn có thể sử dụng lệnh `intlayer` để kiểm tra và điền các bản dịch còn thiếu từ mã nguồn của bạn.

```bash packageManager="npm"
npx intlayer test         # Kiểm tra xem có bản dịch nào còn thiếu không
```

```bash packageManager="yarn"
yarn intlayer test         # Kiểm tra xem có bản dịch nào còn thiếu không
```

```bash packageManager="pnpm"
pnpm intlayer test         # Kiểm tra xem có bản dịch nào còn thiếu không
```

```bash packageManager="bun"
bun x intlayer test         # Kiểm tra xem có bản dịch nào còn thiếu không
```

```bash packageManager="npm"
npx intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="yarn"
yarn intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Điền các bản dịch còn thiếu
```

```bash packageManager="bun"
bun x intlayer fill         # Điền các bản dịch còn thiếu
```

> Để biết thêm chi tiết, vui lòng tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/ci.md)
> </Step>

</Steps>

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
