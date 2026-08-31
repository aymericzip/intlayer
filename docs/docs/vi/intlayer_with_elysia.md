---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next. Hướng dẫn năm 2026 để xây dựng ứng dụng Elysia đa ngôn ngữ (i18n). Dịch với các tác nhân AI và tối ưu hóa kích thước gói, SEO và hiệu suất."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Đồng bộ hướng dẫn với template Elysia (typing cho context, thiết lập Bun, scripts)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Dịch trang web backend Elysia của bạn bằng Intlayer | Quốc tế hóa (i18n)

`elysia-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Elysia, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập được trên toàn cầu bằng cách cung cấp các phản hồi được bản địa hóa dựa trên tùy chọn của máy khách.

> Xem triển khai package trên GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Các Trường Hợp Sử Dụng Thực Tế

- **Hiển Thị Lỗi Backend Theo Ngôn Ngữ của Người Dùng**: Khi một lỗi xảy ra, hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ cải thiện sự hiểu biết và giảm bớt sự thất vọng. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần giao diện như toasts hoặc modals.
- **Truy Xuất Nội Dung Đa Ngôn Ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như các trang web thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và nội dung khác bằng ngôn ngữ mà người dùng ưa thích.
- **Gửi Email Đa Ngôn Ngữ**: Cho dù đó là email giao dịch, chiến dịch marketing hay thông báo, gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể mức độ tương tác và hiệu quả.
- **Thông Báo Push Đa Ngôn Ngữ**: Đối với các ứng dụng di động, gửi thông báo push bằng ngôn ngữ ưa thích của người dùng có thể nâng cao sự tương tác và giữ chân người dùng. Điều này tạo ra sự gần gũi và khiến các thông báo cảm thấy liên quan hơn và có thể hành động được.
- **Các Loại Giao Tiếp Khác**: Bất kỳ hình thức giao tiếp nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều được hưởng lợi từ việc sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm người dùng tổng thể.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng các khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt Đầu

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-elysia-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `elysia-intlayer`, cài đặt package bằng npm:

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

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là một AI agent.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các package cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia nhắm tới runtime **Bun**. `elysia-intlayer` dựa trên `AsyncLocalStorage` (thay vì thư viện `cls-hooked` mà các plugin Intlayer chạy trên Node sử dụng) chính vì Bun không triển khai `async_hooks.createHook`.

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo một `intlayer.config.ts` ở thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Locale mặc định được dùng làm fallback nếu không tìm thấy locale được yêu cầu.
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Khai báo Nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "vi": "Ví dụ về nội dung được trả về bằng tiếng Việt",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được đưa vào thư mục `contentDir` (theo mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (theo mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập Elysia Application

Thiết lập ứng dụng Elysia của bạn để sử dụng `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Tải plugin quốc tế hóa
  .use(intlayer())
  // Routes
  .get("/", ({ intlayer }) => ({
    // Locale được sử dụng cho request này, được thương lượng từ `Accept-Language` hoặc đọc từ storage
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      vi: "Xin chào",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin đăng ký context của nó thông qua một `derive` **global**, được Elysia định kiểu là `Partial<{ intlayer: IntlayerContext }>`. Giá trị luôn tồn tại lúc runtime với các route được đăng ký sau `.use(intlayer())`, vì vậy hãy dùng non-null assertion (`intlayer!.locale`) — hoặc optional chaining — để thỏa mãn TypeScript ở chế độ `strict`.

Context của route cung cấp:

| Thuộc tính        | Mô tả                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| `locale`          | Locale dùng cho request này, `locale_storage` được ưu tiên hơn `locale_detected`. |
| `locale_storage`  | Locale được client yêu cầu tường minh qua cookie hoặc header.                     |
| `locale_detected` | Locale được thương lượng từ các header của request.                               |
| `defaultLocale`   | Locale được cấu hình làm fallback trong `intlayer.config.ts`.                     |
| `t`               | Một hàm dịch.                                                                     |
| `getIntlayer`     | Hàm để lấy dictionary theo key.                                                   |
| `getDictionary`   | Hàm để xử lý các đối tượng dictionary.                                            |

Cùng các helper đó cũng được export dưới dạng standalone. Chúng phân giải request hiện tại thông qua `AsyncLocalStorage`, nên bạn có thể gọi chúng mà không cần destructure context:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Ngữ cảnh của request được giải phóng ngay khi response được map, nên các helper độc lập không bao giờ phân giải dựa trên một request đã kết thúc. Khi được gọi bên ngoài một request do plugin xử lý, chúng quay về locale mặc định đã được cấu hình.

### Chạy ứng dụng của bạn

Thêm các script Intlayer vào `package.json` của bạn. `intlayer build` biên dịch các khai báo nội dung vào thư mục `.intlayer` và sinh ra các kiểu TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Sau đó khởi động server:

```bash
bun run dev
```

Kiểm tra việc thương lượng locale với `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` không bắt buộc phải chạy trước `bun run src/index.ts`: plugin cũng chuẩn bị dictionary khi ứng dụng Elysia khởi động. Chạy trước giúp các kiểu được sinh ra luôn đồng bộ cho editor của bạn và tránh chi phí build ở request đầu tiên.

### Tương thích

`elysia-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho các ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho các ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho các ứng dụng Vite

Nó cũng hoạt động liền mạch với bất kỳ giải pháp quốc tế hóa nào trong các môi trường khác nhau, bao gồm trình duyệt và các yêu cầu API.

Theo mặc định, plugin phân giải locale theo thứ tự sau:

1. Cookie `INTLAYER_LOCALE`.
2. Header `x-intlayer-locale`.
3. Thương lượng qua header `Accept-Language`.

Bạn có thể tuỳ chỉnh cookie và header được dùng để phát hiện locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

### Cấu hình TypeScript

`elysia-intlayer` tận dụng các khả năng mạnh mẽ của TypeScript để nâng cao quá trình quốc tế hóa. Kiểu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch được tính đến, giảm nguy hiểm bỏ sót bản dịch và cải thiện khả năng bảo trì.

Đảm bảo các loại tự động tạo (theo mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

### Tiện ích VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích VS Code Intlayer** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích này cung cấp:

- **Autocompletion** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung** dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích này, hãy tham khảo [tài liệu Tiện ích VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Elysia?">

- **Từ điển cơ bản**: không có kiểm tra kiểu hay công cụ hỗ trợ.
- **`Intlayer`**: được tối ưu hóa đặc biệt cho Bun và Elysia, biên dịch build time, kiểu dữ liệu TypeScript nghiêm ngặt và hiệu năng cao.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle server Elysia của tôi bao nhiêu?">

Ít hơn nhiều so với các catalog JSON thông thường. Compiler của Intlayer tối ưu hóa từ điển tại thời điểm build và không phân tích lại từ điển trên mỗi request, giúp duy trì mức sử dụng bộ nhớ và thời gian khởi động nguội (cold start) tối thiểu. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

</Question>

<Question title="Tôi có thể di chuyển từ các thư viện i18n khác mà không cần viết lại handler không?">

Có, bằng cách làm theo hướng dẫn di chuyển và dùng plugin đồng bộ hóa JSON.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build và tạo từ điển trên mỗi thay đổi.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa đến tệp nội dung, trích xuất chuỗi và chạy build, fill, test, push và pull từ command palette.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: go to definition, xem trước giá trị bản dịch khi hover, và tự động hoàn thành khóa trong bất kỳ trình soạn thảo nào hỗ trợ LSP. Cũng xử lý các lệnh gọi `i18next`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Ngôn ngữ của client được phát hiện như thế nào trong các request gửi đến?">

Plugin Elysia đọc tiêu đề và cookie ở giai đoạn `onRequest` hoặc `derive`, đưa locale vào `context.locale`.

</Question>

<Question title="Cùng một khai báo nội dung có thể phục vụ cả phản hồi API và frontend web của tôi không?">

Có, trong monorepo hoặc gói dùng chung, đây là ưu điểm vượt trội. Từ điển được khai báo có thể được import ở backend (email, thông báo lỗi, phản hồi API) và frontend (React, Vue, Svelte, v.v.), duy trì một nguồn sự thật duy nhất cho toàn bộ văn bản.

</Question>

<Question title="Intlayer có làm chậm quá trình xử lý request không?">

Không. Việc phát hiện ngôn ngữ được thực hiện trong middleware cực kỳ nhẹ (đọc cookie, query param hoặc header Accept-Language). Các từ điển đã được biên dịch sẵn tại thời điểm build và nằm trong bộ nhớ, do đó không có thao tác đọc đĩa hay phân tích chuỗi khi có request đến.

</Question>

<Question title="Làm cách nào để bản địa hóa thông báo lỗi, email và thông báo đẩy (push notifications)?">

Bằng cách gọi hàm `getIntlayer` hoặc `t()` dựa trên locale của request. Nếu ngôn ngữ người dùng được lưu trong cơ sở dữ liệu, hàm có thể được gọi với locale đích rõ ràng cho các tác vụ nền ngoài request.

</Question>

<Question title="Intlayer có hoàn toàn tương thích với runtime Bun không?">

Có. Intlayer chạy nguyên bản trên Bun, tận dụng tốc độ tải module nhanh và khả năng thực thi TypeScript trực tiếp.

</Question>

<Question title="Tôi có thể sử dụng thông báo lỗi được bản địa hóa trong schema TypeBox của Elysia không?">

Có. Tại hook `onError`, bạn có thể bắt lỗi xác thực schema và trả về phản hồi đã bản địa hóa qua Intlayer.

</Question>

<Question title="Làm cách nào để quản lý định tuyến dựa trên locale trong URL?">

Sử dụng tham số đường dẫn `/:locale/` trong các tuyến và trả về 404 cho các ngôn ngữ không xác định.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. Lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn sử dụng provider và API key của riêng bạn, và `--git-diff` giới hạn thao tác ở các tệp đã thay đổi. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md).

</Question>

<Question title="Làm thế nào các thành viên không chuyên kỹ thuật có thể chỉnh sửa mẫu email và thông báo lỗi mà không cần chạm vào mã?">

Có hai cách: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung khỏi codebase và cho phép chỉnh sửa văn bản qua giao diện web, hoặc [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), giúp lưu thay đổi trực tiếp vào các tệp mã nguồn cục bộ.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
