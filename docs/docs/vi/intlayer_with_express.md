---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "Express i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Express đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
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
author: aymericzip
---

# Dịch website backend Express của bạn bằng Intlayer | Quốc tế hóa (i18n)

`express-intlayer` là một middleware quốc tế hóa (i18n) mạnh mẽ dành cho các ứng dụng Express, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được địa phương hóa dựa trên sở thích của khách hàng.

### Các Trường Hợp Sử Dụng Thực Tiễn

- **Hiển Thị Lỗi Backend Bằng Ngôn Ngữ Của Người Dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng giúp cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

- **Lấy Nội Dung Đa Ngôn Ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ khác nhau. Điều này rất quan trọng đối với các nền tảng như trang thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và các nội dung khác theo ngôn ngữ mà người dùng ưu tiên.

- **Gửi Email Đa Ngôn Ngữ**: Dù là email giao dịch, chiến dịch marketing hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.

- **Thông Báo Đẩy Đa Ngôn Ngữ**: Đối với các ứng dụng di động, gửi thông báo đẩy bằng ngôn ngữ ưu tiên của người dùng có thể nâng cao sự tương tác và giữ chân người dùng. Sự cá nhân hóa này giúp thông báo trở nên phù hợp và dễ hành động hơn.

- **Các Hình Thức Giao Tiếp Khác**: Bất kỳ hình thức giao tiếp nào từ backend, như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều được hưởng lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể của người dùng.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, trở thành bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt Đầu

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-express-template) trên GitHub.

### Cài Đặt

Để bắt đầu sử dụng `express-intlayer`, hãy cài đặt gói bằng npm:

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Cấu Hình

Cấu hình các thiết lập quốc tế hóa bằng cách tạo một file `intlayer.config.ts` trong thư mục gốc dự án của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Khai báo Nội dung của Bạn

Tạo và quản lý các khai báo nội dung để lưu trữ các bản dịch:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và phù hợp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Cài đặt ứng dụng Express

Cài đặt ứng dụng Express của bạn để sử dụng `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Tải trình xử lý yêu cầu quốc tế hóa
app.use(intlayer());

// Các tuyến đường
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Khởi động server
app.listen(3000, () => console.log(`Lắng nghe trên cổng 3000`));
```

### Tương thích

`express-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho các ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho các ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho các ứng dụng Vite

Nó cũng hoạt động mượt mà với bất kỳ giải pháp quốc tế hóa nào trên nhiều môi trường khác nhau, bao gồm trình duyệt và các yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua header hoặc cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
  middleware: {
    headerName: "my-locale-header", // tên header để phát hiện locale
    cookieName: "my-locale-cookie", // tên cookie để phát hiện locale
  },
};

export default config;
```

Mặc định, `express-intlayer` sẽ giải thích header `Accept-Language` để xác định ngôn ngữ ưu tiên của client.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

### Cấu hình TypeScript

`express-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để nâng cao quá trình quốc tế hóa. Kiểu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm thiểu rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo các kiểu được tạo tự động (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các kiểu được tạo tự động
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung dịch ngay trong dòng**.
- **Hành động nhanh** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

### Cấu hình Git

Khuyến nghị bạn nên bỏ qua các tệp được tạo bởi Intlayer. Điều này giúp bạn tránh việc commit chúng vào kho Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của bạn:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Express?">

Tùy chọn truyền thống là `i18next` với `i18next-http-middleware`, tải các catalog JSON theo namespace và lưu trữ locale trên request. Giải pháp thay thế là `Intlayer` thông qua `express-intlayer`, khai báo nội dung trong các tệp có kiểu dữ liệu dùng chung với frontend của bạn, giải quyết locale theo từng request, đồng thời bổ sung bản dịch bằng AI và CMS.

Lý do để quốc tế hóa backend là phần lớn văn bản mà người dùng đọc không bao giờ đi qua frontend: thông báo lỗi API, email giao dịch, thông báo push, SMS và xuất PDF. Những nội dung này cần ngôn ngữ của người nhận, được giải quyết theo từng yêu cầu thay vì theo từng phiên.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle server Express của tôi bao nhiêu?">

Ít hơn nhiều so với các catalog JSON thông thường. Compiler của Intlayer tối ưu hóa từ điển tại thời điểm build và không phân tích lại từ điển trên mỗi request, giúp duy trì mức sử dụng bộ nhớ và thời gian khởi động nguội (cold start) tối thiểu. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

</Question>

<Question title="Tôi có thể di chuyển từ i18next hoặc các thư viện backend khác mà không cần viết lại handler không?">

Có. Bạn có thể di chuyển dần dần hoặc sử dụng adapter tương thích để giữ nguyên API hiện tại.

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

Middleware `app.use(intlayer())` tuần tự kiểm tra tiền tố URL, cookie, tiêu đề `Accept-Language`, và trở về ngôn ngữ mặc định. Locale được phát hiện sẽ lưu trong `req.locale`.

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

<Question title="Tôi có thể sử dụng bộ phát hiện ngôn ngữ tùy chỉnh không?">

Có. Bạn có thể viết middleware tùy chỉnh để trích xuất locale từ phiên đăng nhập hoặc hồ sơ cơ sở dữ liệu người dùng và gán cho `req.locale`.

</Question>

<Question title="Làm cách nào để sử dụng tiền tố URL được bản địa hóa trong các tuyến đường Express?">

Thông qua tùy chọn định tuyến của Intlayer hoặc thêm phân đoạn `/:locale/` vào các tuyến của bạn. `validatePrefix` xác thực các ngôn ngữ hợp lệ.

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
