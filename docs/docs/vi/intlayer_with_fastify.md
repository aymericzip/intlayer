---
createdAt: 2025-12-30
updatedAt: 2026-05-31
priority: 9
title: "Fastify i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Thiết lập Intlayer trong Fastify: nhận diện locale theo từng request bằng plugin, dịch phản hồi API và thông báo lỗi, có kiểu từ đầu đến cuối."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Thêm lệnh init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web backend Fastify của bạn bằng Intlayer

`fastify-intlayer` là một plugin quốc tế hóa (i18n) mạnh mẽ cho các ứng dụng Fastify, được thiết kế để làm cho dịch vụ backend của bạn có thể truy cập toàn cầu bằng cách cung cấp các phản hồi được địa phương hóa dựa trên sở thích của khách hàng.

> Xem [triển khai gói trên GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

## Các trường hợp sử dụng thực tế

- **Hiển thị lỗi Backend bằng ngôn ngữ của người dùng**: Khi xảy ra lỗi, việc hiển thị thông báo bằng ngôn ngữ mẹ đẻ của người dùng sẽ cải thiện sự hiểu biết và giảm bớt sự khó chịu. Điều này đặc biệt hữu ích cho các thông báo lỗi động có thể được hiển thị trong các thành phần giao diện người dùng như toast hoặc modal.
- **Truy xuất nội dung đa ngôn ngữ**: Đối với các ứng dụng lấy nội dung từ cơ sở dữ liệu, việc quốc tế hóa đảm bảo rằng bạn có thể phục vụ nội dung này bằng nhiều ngôn ngữ. Điều này rất quan trọng đối với các nền tảng như trang web thương mại điện tử hoặc hệ thống quản lý nội dung cần hiển thị mô tả sản phẩm, bài viết và nội dung khác bằng ngôn ngữ ưa thích của người dùng.
- **Gửi Email đa ngôn ngữ**: Cho dù đó là email giao dịch, chiến dịch tiếp thị hay thông báo, việc gửi email bằng ngôn ngữ của người nhận có thể tăng đáng kể sự tương tác và hiệu quả.
- **Thông báo đẩy đa ngôn ngữ**: Đối với ứng dụng di động, việc gửi thông báo đẩy bằng ngôn ngữ ưa thích của người dùng có thể tăng cường sự tương tác và giữ chân người dùng. Sự cá nhân hóa này có thể làm cho các thông báo cảm thấy phù hợp và có thể hành động hơn.
- **Các giao tiếp khác**: Bất kỳ hình thức giao tiếp nào từ backend, chẳng hạn như tin nhắn SMS, cảnh báo hệ thống hoặc cập nhật giao diện người dùng, đều có lợi khi sử dụng ngôn ngữ của người dùng, đảm bảo sự rõ ràng và nâng cao trải nghiệm người dùng tổng thể.

Bằng cách quốc tế hóa backend, ứng dụng của bạn không chỉ tôn trọng sự khác biệt văn hóa mà còn phù hợp hơn với nhu cầu thị trường toàn cầu, khiến nó trở thành một bước quan trọng trong việc mở rộng quy mô dịch vụ của bạn trên toàn thế giới.

## Bắt đầu

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách Quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Mẫu ứng dụng](https://github.com/aymericzip/intlayer-fastify-template) trên GitHub.

### Cài đặt

Để bắt đầu sử dụng `fastify-intlayer`, hãy cài đặt gói bằng npm:

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
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Thiết lập

Cấu hình các cài đặt quốc tế hóa bằng cách tạo tệp `intlayer.config.ts` trong thư mục gốc của dự án:

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
      "es-MX": "Ejemplo de nội dung devuelto en español (México)",
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
        "es-MX": "Ejemplo de nội dung devuelto en español (México)"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng của bạn miễn là chúng được bao gồm trong thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

- [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)

### Thiết lập ứng dụng Fastify

Thiết lập ứng dụng Fastify của bạn để sử dụng `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Tải plugin quốc tế hóa
await fastify.register(intlayer);

// Các tuyến đường
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de nội dung devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Khởi động máy chủ
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Tính tương thích

`fastify-intlayer` hoàn toàn tương thích với:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/exports.md) cho ứng dụng React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/exports.md) cho ứng dụng Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/exports.md) cho ứng dụng Vite

Nó cũng hoạt động trơn tru với bất kỳ giải pháp quốc tế hóa nào trong các môi trường khác nhau, bao gồm trình duyệt và yêu cầu API. Bạn có thể tùy chỉnh middleware để phát hiện locale thông qua header hoặc cookie:

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

Theo mặc định, `fastify-intlayer` sẽ diễn giải tiêu đề `Accept-Language` để xác định ngôn ngữ ưa thích của ứng dụng khách.

> Để biết thêm thông tin về cấu hình và các chủ đề nâng cao, hãy truy cập [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) của chúng tôi.

- [Cấu hình Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

### Cấu hình TypeScript

`fastify-intlayer` tận dụng khả năng mạnh mẽ của TypeScript để cải thiện quá trình quốc tế hóa. Việc nhập tĩnh của TypeScript đảm bảo rằng mọi khóa dịch đều được tính đến, giảm rủi ro thiếu bản dịch và cải thiện khả năng bảo trì.

Đảm bảo các loại được tạo tự động (mặc định tại ./types/intlayer.d.ts) được bao gồm trong tệp tsconfig.json của bạn.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện tại của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện tại của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tạo tự động
  ],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

- [Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội tuyến** nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md).

- [tài liệu Tiện ích mở rộng Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)

### Cấu hình Git

Nên bỏ qua các tệp được tạo bởi Intlayer. Điều này cho phép bạn tránh việc commit chúng vào kho lưu trữ Git của mình.

Để làm điều này, bạn có thể thêm các hướng dẫn sau vào tệp `.gitignore` của mình:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer

```

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa ứng dụng Fastify?">

- **Plugin Fastify cho `i18next`**: thư viện runtime dựa trên namespace JSON.
- **`Intlayer`**: plugin `fastify-intlayer` được tối ưu hóa cho vòng đời Fastify, kiểu dữ liệu TypeScript đầy đủ, dịch thuật AI và từ điển hợp nhất với frontend.

Lý do chính để quốc tế hóa backend là vì một phần lớn văn bản mà người dùng đọc không bao giờ đi qua frontend: thông báo lỗi API, email giao dịch, thông báo đẩy, SMS và xuất file PDF. Những nội dung này cần ngôn ngữ của người nhận, được phân giải theo từng yêu cầu thay vì theo phiên.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

- [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md)

</Question>
<Question title="i18n làm tăng kích thước bundle server Fastify của tôi bao nhiêu?">

Rất ít. Các từ điển được biên dịch trước (ahead of time) và chỉ những locale bạn khai báo mới được đưa vào, vì vậy không có việc tải catalog khi khởi động và không có việc đọc tệp trên đường xử lý request. Điều này quan trọng nhất với các triển khai serverless và edge, nơi kích thước bundle quyết định thời gian khởi động nguội (cold start). Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

- [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)

</Question>
<Question title="Tôi có thể di chuyển từ `i18next` mà không cần viết lại handler không?">

Có, và có hai hướng đi. Bạn có thể di chuyển nội dung dần dần với [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md). Hoặc bạn có thể giữ nguyên hoàn toàn API hiện tại: các [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp chính xác API giống `i18next`, nhưng được phục vụ bởi từ điển Intlayer, vì vậy chỉ các import thay đổi còn mã handler thì không.

- [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md)
- [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

</Question>
<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

- [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)
- [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md)
- [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md)

</Question>
<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại một diff thay vì sao chép từng chuỗi vào catalog. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

- [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md)

Ở phía frontend của cùng dự án, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) còn đi xa hơn và tạo từ điển tại thời điểm build từ mã nguồn JSX, TSX, Vue hoặc Svelte của bạn, để hai nửa của ứng dụng dùng chung một lớp nội dung mà không có khóa nào phải quản lý thủ công.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md)

</Question>
<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ một khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ một component, và chạy build, fill, test, push và pull từ command palette hoặc một tab Intlayer riêng.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: cùng khả năng nhận biết đó trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, find all references, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa và trường, và cảnh báo khi một khóa không được khai báo ở đâu cả. Nó cũng phân giải các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`, giúp ích trong quá trình di chuyển.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT, để trợ lý trả lời dựa trên tài liệu hiện hành thay vì phỏng đoán, và có thể tự chạy các lệnh như `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`, cùng một kỹ năng cho mỗi framework, giúp agent hiểu cấu hình routing của bạn và các loại node nội dung.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: `no-raw-text` đánh dấu các chuỗi hardcode, cùng các quy tắc khác cho khóa từ điển tĩnh và nội dung không được sử dụng.

</Question>
<Question title="Làm thế nào Intlayer biết phải trả lời bằng ngôn ngữ nào?">

Mặc định, `fastify-intlayer` đọc tiêu đề `Accept-Language` của request gửi đến và chọn locale đã khai báo gần nhất, nếu không có thì dùng locale mặc định của bạn. Bạn có thể thay đổi nguồn bằng `routing.storage`, ví dụ một header tùy chỉnh hoặc cookie do frontend đặt, để API trả lời bằng ngôn ngữ người dùng thực sự đã chọn thay vì ngôn ngữ mà trình duyệt của họ thông báo. Xem [tài liệu tham khảo cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

- [tài liệu tham khảo cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)

</Question>
<Question title="Locale có được cô lập theo từng request không?">

Có. Plugin giới hạn locale đang hoạt động trong phạm vi request, vì vậy hai request đồng thời bằng các ngôn ngữ khác nhau không bao giờ đọc locale của nhau. Đó là điều giúp việc gọi `t()` và `getIntlayer()` từ một service trở nên an toàn mà không cần truyền đối số locale qua mọi hàm.

</Question>
<Question title="Làm cách nào để gửi email giao dịch bằng ngôn ngữ của người nhận?">

Khai báo nội dung email trong một tệp nội dung như mọi nội dung khác, sau đó lấy nó bằng `getIntlayer` cho locale đã lưu của người nhận thay vì locale của request. Điều này quan trọng với các job và hàng đợi (queue), nơi ngôn ngữ thuộc về bản ghi người dùng và không có request đến nào để đọc header.

</Question>
<Question title="Làm cách nào để bản địa hóa thông báo lỗi API?">

Bọc thông báo trong `t()` tại nơi lỗi được tạo ra. Locale của request đang hoạt động sẽ phân giải nó, vì vậy client nhận được thông báo có thể hiển thị trực tiếp, và frontend của bạn không cần một catalog mã lỗi song song.

</Question>
<Question title="Nó có hoạt động với vòng đời plugin và cơ chế đóng gói (encapsulation) của Fastify không?">

Có. `fastify-intlayer` được đăng ký như một plugin Fastify tiêu chuẩn, vì vậy nó tuân theo các quy tắc encapsulation thông thường. Hãy đăng ký nó ở cấp root, hoặc bên trong scope cần đến nó, trước các route đọc nội dung.

</Question>
<Question title="Làm cách nào để dịch nội dung backend tự động bằng AI?">

Chạy `npx intlayer fill`, lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn, sử dụng nhà cung cấp và khóa API của riêng bạn. Thêm `--git-diff` để chỉ dịch nội dung đã thay đổi trên nhánh. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

- [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md)
- [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md)

</Question>
<Question title="Intlayer có hỗ trợ số nhiều, giới tính và giá trị nội suy phía server không?">

Có: [dạng số nhiều](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung theo giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md) cho các giá trị nội suy, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md) cho nội dung email, và [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày và tiền tệ.

- [dạng số nhiều](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md)
- [nội dung theo giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md)
- [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/markdown.md)
- [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md)

</Question>
<Question title="Tôi có được tự động hoàn thành TypeScript phía server không?">

Có. Intlayer tạo các kiểu của từ điển vào `./types/intlayer.d.ts`, vì vậy một khóa không tồn tại sẽ là lỗi biên dịch thay vì một chuỗi rỗng khi chạy. Chạy `npx intlayer test` trong CI để làm build thất bại khi một locale đã khai báo bị thiếu nội dung.

</Question>
<Question title="Frontend và backend có thể dùng chung nội dung không?">

Có, và đó là cách thiết lập thông thường. `fastify-intlayer` hoạt động cùng `react-intlayer`, `next-intlayer` và `vite-intlayer` trên cùng nội dung đã khai báo, vì vậy một nhãn được dùng cả trong phản hồi API lẫn trên một trang chỉ cần khai báo một lần. Xem [cách Intlayer hoạt động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/how_works_intlayer.md).

- [cách Intlayer hoạt động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/how_works_intlayer.md)

</Question>
<Question title="Intlayer có miễn phí và mã nguồn mở không?">

Có, theo giấy phép Apache 2.0, bao gồm cả sử dụng thương mại. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) được lưu trữ là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- [tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md)

</Question>

</FAQ>
