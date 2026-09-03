---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "AdonisJS i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng AdonisJS đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch website backend AdonisJS của bạn bằng Intlayer | Quốc tế hóa (i18n)

`adonis-intlayer` là một gói quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng AdonisJS, được thiết kế để làm cho các dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được bản địa hóa dựa trên sở thích của khách hàng.

### Các trường hợp sử dụng thực tế

- **Hiển thị lỗi backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ giúp cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần front-end như toast hoặc modal.

- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như trang thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và các nội dung khác bằng ngôn ngữ mà người dùng ưa thích.

- **Gửi email đa ngôn ngữ**: Cho dù đó là email giao dịch, chiến dịch tiếp thị hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.

- **Thông báo push đa ngôn ngữ**: Đối với các ứng dụng di động, gửi thông báo push bằng ngôn ngữ ưu tiên của người dùng có thể tăng cường sự tương tác và giữ chân người dùng. Sự tiếp xúc cá nhân này có thể làm cho các thông báo cảm thấy phù hợp và có thể hành động hơn.

- **Các hình thức liên lạc khác**: Bất kỳ hình thức liên lạc nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều có lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm tổng thể của người dùng.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `adonis-intlayer`, hãy cài đặt gói bằng npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> cờ `--interactive` là tùy chọn. Sử dụng `intlayer-cli init` nếu bạn là tác nhân AI.

> Lệnh này sẽ phát hiện môi trường của bạn và cài đặt các gói cần thiết. Ví dụ:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo một tệp `intlayer.config.ts` trong thư mục gốc của dự án:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Khai báo nội dung của bạn

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "vi": "Ví dụ về nội dung được trả về bằng tiếng Việt",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src` hoặc `./app`) và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Thiết lập ứng dụng AdonisJS

Thiết lập ứng dụng AdonisJS của bạn để sử dụng `adonis-intlayer`.

#### Đăng ký middleware

Trước tiên, bạn cần đăng ký middleware `intlayer` trong ứng dụng của mình.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Định nghĩa các route của bạn

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de nội dung renvoyé en français",
    vi: "Ví dụ về nội dung được trả về bằng tiếng Việt",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Các hàm

`adonis-intlayer` xuất ra một số hàm để xử lý quốc tế hóa trong ứng dụng của bạn:

- `t(content, locale?)`: Hàm dịch cơ bản.
- `getIntlayer(key, locale?)`: Truy xuất nội dung bằng khóa từ các từ điển của bạn.
- `getDictionary(dictionary, locale?)`: Truy xuất nội dung từ một đối tượng từ điển cụ thể.
- `getLocale()`: Truy xuất ngôn ngữ hiện tại từ ngữ cảnh yêu cầu.

#### Sử dụng trong Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        vi: "Xin chào từ bộ điều khiển",
      })
    );
  }
}
```

### Khả năng tương thích

`adonis-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/index.md) cho các ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md) cho các ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md) cho các ứng dụng Vite

Nó cũng hoạt động liền mạch với bất kỳ giải pháp quốc tế hóa nào trên nhiều môi trường khác nhau, bao gồm trình duyệt và yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện ngôn ngữ thông qua header hoặc cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

Theo mặc định, `adonis-intlayer` sẽ diễn giải header `Accept-Language` để xác định ngôn ngữ ưa thích của khách hàng.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

### Cấu hình TypeScript

`adonis-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để cải thiện quá trình quốc tế hóa. Việc nhập liệu tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

![Tự động hoàn thành](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Lỗi bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Đảm bảo các loại được tự động tạo (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch còn thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/vi/doc/vs-code-extension).

### Cấu hình Git

Khuyến nghị bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh cam kết chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng AdonisJS?">

- **`@adonisjs/i18n`**: gói chính thức của AdonisJS.
- **`Intlayer`**: tích hợp cho cả backend và frontend hiện đại, kiểu dữ liệu TypeScript đầy đủ, dịch thuật AI và CMS.

Lý do chính để quốc tế hóa backend là vì một phần lớn văn bản mà người dùng đọc không bao giờ đi qua frontend: thông báo lỗi API, email giao dịch, thông báo đẩy, SMS và xuất file PDF. Những nội dung này cần ngôn ngữ của người nhận, được phân giải theo từng yêu cầu thay vì theo phiên.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="i18n làm tăng kích thước bundle server AdonisJS của tôi bao nhiêu?">

Ít hơn nhiều so với các catalog JSON thông thường. Compiler của Intlayer tối ưu hóa từ điển tại thời điểm build và không phân tích lại từ điển trên mỗi request, giúp duy trì mức sử dụng bộ nhớ và thời gian khởi động nguội (cold start) tối thiểu. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

</Question>

<Question title="Tôi có thể di chuyển từ @adonisjs/i18n mà không cần viết lại handler không?">

Phần lớn là có. [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ nguyên các tệp dịch hiện có.

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

HTTP middleware của AdonisJS kiểm tra cookie và tiêu đề qua `HttpContext`, lưu locale trong `ctx.locale`.

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

<Question title="Intlayer có hoạt động với template Edge (EdgeJS) không?">

Có. Bằng cách gắn các helper của Intlayer vào biến toàn cục Edge, bạn có thể render văn bản đã bản địa hóa trực tiếp trong các tệp `.edge`.

</Question>

<Question title="Làm cách nào để bản địa hóa thông báo xác thực VineJS?">

Trong các quy tắc VineJS, bạn có thể gọi `t()` hoặc `getIntlayer()` để tạo thông báo lỗi phù hợp với ngôn ngữ người dùng.

</Question>

<Question title="Làm cách nào để quản lý các phân đoạn locale trong các tuyến AdonisJS?">

Định nghĩa các nhóm tuyến với `prefix('/:locale')` và áp dụng middleware xác thực locale.

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
