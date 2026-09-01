---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Hướng dẫn đầy đủ để dịch ứng dụng của bạn"
description: "Không còn i18next nữa. Hướng dẫn 2026 để xây dựng ứng dụng Vanilla JS đa ngôn ngữ (i18n). Dịch với các AI agent và tối ưu hóa kích thước bundle, SEO và hiệu suất."
keywords:
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Cập nhật cách sử dụng API useIntlayer của Solid sang truy cập thuộc tính trực tiếp"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Dịch trang web Vanilla JS của bạn bằng Intlayer | Quốc tế hóa (i18n)

<Tabs defaultTab="code">
  <Tab label="Mã nguồn" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Bản demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Bản demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Mục lục

<TOC/>

## Tại sao Intlayer thay thế các lựa chọn thay thế?

So với các giải pháp chính như `i18next` hay `i18n.js`, Intlayer là giải pháp đi kèm với các tính năng tối ưu hóa tích hợp như:

<AccordionGroup>
<Accordion header="Phạm vi bảo hiểm đầy đủ của Vanilla JS">

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Vanilla JavaScript bằng cách cung cấp **quản lý nội dung không phụ thuộc vào khung**, **hỗ trợ TypeScript** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

</Accordion>

<Accordion header="Kích thước bundle">

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

</Accordion>

<Accordion header="Khả năng bảo trì">

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

</Accordion>

<Accordion header="Đại lý AI">

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

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

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vanilla JS

<Steps>

<Step number={1} title="Cài đặt các phần phụ thuộc">

Cài đặt các gói cần thiết bằng npm:

```bash packageManager="npm"
# Tạo một bản đóng gói độc lập của intlayer và vanilla-intlayer
# Tệp này sẽ được nhập vào tệp HTML của bạn
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Khởi tạo intlayer với tệp cấu hình
npx intlayer init --no-gitignore

# Xây dựng các từ điển
npx intlayer build
```

```bash packageManager="pnpm"
# Tạo một bản đóng gói độc lập của intlayer và vanilla-intlayer
# Tệp này sẽ được nhập vào tệp HTML của bạn
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Khởi tạo intlayer với tệp cấu hình
pnpm intlayer init --no-gitignore

# Xây dựng các từ điển
pnpm intlayer build
```

```bash packageManager="yarn"
# Tạo một bản đóng gói độc lập của intlayer và vanilla-intlayer
# Tệp này sẽ được nhập vào tệp HTML của bạn
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Khởi tạo tệp cấu hình intlayer, TypeScript nếu đã thiết lập, biến môi trường
yarn intlayer init --no-gitignore

# Xây dựng các từ điển
yarn intlayer build
```

```bash packageManager="bun"
# Tạo một bản đóng gói độc lập của intlayer và vanilla-intlayer
# Tệp này sẽ được nhập vào tệp HTML của bạn
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Khởi tạo intlayer with tệp cấu hình
bun x intlayer init --no-gitignore

# Xây dựng các từ điển
bun x intlayer build
```

- **intlayer**
  Gói cốt lõi cung cấp các công cụ quốc tế hóa để quản lý cấu hình, dịch thuật, [khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md), chuyển mã và [lệnh CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

- **vanilla-intlayer**
  Gói này tích hợp Intlayer với các ứng dụng JavaScript / TypeScript thuần túy. Nó cung cấp một pub/sub singleton (`IntlayerClient`) và các trình trợ trợ dựa trên callback (`useIntlayer`, `useLocale`, v.v.) để bất kỳ phần nào của ứng dụng cũng có thể phản ứng với các thay đổi ngôn ngữ mà không cần phụ thuộc vào khung giao diện người dùng.

> Việc xuất đóng gói (bundling) từ CLI `intlayer standalone` tạo ra một bản dựng được tối ưu hóa thông qua cơ chế loại bỏ mã thừa (tree-shaking) cho các gói, ngôn ngữ không sử dụng và logic không thiết yếu (như chuyển hướng hoặc tiền tố) cụ thể cho cấu hình của bạn.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một tệp cấu hình để định cấu hình các ngôn ngữ của ứng dụng:

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

> Thông qua tệp cấu hình này, bạn có thể thiết lập các URL được bản địa hóa, chuyển hướng phần mềm trung gian, tên cookie, vị trí và phần mở rộng của các khai báo nội dung của mình, tắt nhật ký Intlayer trong console, v.v. Để biết danh sách đầy đủ các tham số có sẵn, hãy tham khảo [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Nhập bundle vào HTML của bạn">

Sau khi bạn đã tạo bundle `intlayer.js`, bạn có thể nhập nó vào tệp HTML của mình:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />

    <!-- Nhập bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Nhập script chính của bạn -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Bundle này cung cấp `Intlayer` và `VanillaIntlayer` dưới dạng các đối tượng toàn cục trên `window`.

</Step>

<Step number={4} title="Khởi động Intlayer tại điểm bắt đầu">

Trong `src/main.js` của bạn, hãy gọi `installIntlayer()` **trước khi** bất kỳ nội dung nào được render để singleton ngôn ngữ toàn cục đã sẵn sàng.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Phải được gọi trước khi hiển thị bất kỳ nội dung i18n nào.
installIntlayer();
```

Nếu bạn cũng muốn sử dụng markdown renderer, hãy gọi `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Khai báo nội dung của bạn">

Tạo và quản lý các khai báo nội dung của bạn để lưu trữ các bản dịch:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Nhấp vào logo Vite để biết thêm thông tin",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={6} title="Sử dụng Intlayer trong JavaScript của bạn">

Đối tượng `window.VanillaIntlayer` cung cấp các API hỗ trợ: `useIntlayer(key, locale?)` trả về nội dung đã dịch cho một khóa nhất định.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Nhận nội dung ban đầu cho ngôn ngữ hiện tại.
// Chuỗi .onChange() để được thông báo bất cứ khi nào ngôn ngữ thay đổi.
const content = useIntlayer("app").onChange((newContent) => {
  // Render lại hoặc vá chỉ các thành phần DOM bị ảnh hưởng
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Render bản thảo ban đầu
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Truy cập các giá trị cuối cùng dưới dạng chuỗi bằng cách bọc chúng trong `String()`, thao tác này sẽ gọi phương thức `toString()` của thành phần đó và trả về văn bản đã dịch.
>
> Khi bạn cần giá trị cho một thuộc tính HTML gốc (ví dụ: `alt`, `aria-label`), hãy sử dụng trực tiếp `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Thay đổi ngôn ngữ nội dung của bạn" isOptional={true}>

Để thay đổi ngôn ngữ của nội dung, hãy sử dụng hàm `setLocale` được cung cấp bởi `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Ngôn ngữ");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Giữ cho dropdown đồng bộ khi ngôn ngữ thay đổi từ nơi khác
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Chuyển đổi ngôn ngữ HTML và các thuộc tính hướng văn bản" isOptional={true}>

Cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để khớp với ngôn ngữ hiện tại phục vụ mục đích hỗ trợ người khuyết tật và SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Tải từ điển theo kiểu trì hoãn (Lazy-load) theo ngôn ngữ" isOptional={true}>

Nếu bạn muốn tải từ điển theo kiểu trì hoãn cho từng ngôn ngữ, bạn có thể sử dụng `useDictionaryDynamic`. Điều này hữu ích nếu bạn không muốn gộp tất cả các bản dịch vào tệp `intlayer.js` ban đầu.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Lưu ý: `useDictionaryDynamic` yêu cầu các từ điển phải có sẵn dưới dạng các tệp ESM riêng biệt. Cách tiếp cận này thường được sử dụng nếu bạn có một máy chủ web phục vụ các từ điển.

</Step>

</Steps>

### Cấu hình TypeScript

Đảm bảo cấu hình TypeScript của bạn bao gồm các tệp định danh được tạo tự động.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Tiện ích mở rộng VS Code

Để cải thiện trải nghiệm phát triển của bạn với Intlayer, bạn có thể cài đặt **Tiện ích mở rộng Intlayer cho VS Code** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các phím dịch.
- **Phát hiện lỗi thời gian thực** cho các bản dịch bị thiếu.
- **Xem trước nội dung được dịch** ngay trong mã.
- **Thao tác nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Tìm hiểu sâu hơn

Để tìm hiểu sâu hơn, bạn có thể triển khai [trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) để quản lý nội dung từ bên ngoài.

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Tôi có thể sử dụng Intlayer mà không cần bundler hoặc framework không?">

Có. Hướng dẫn này dành riêng cho trường hợp đó. Bạn đưa bundle `vanilla-intlayer` trực tiếp vào HTML, khởi tạo nó, và đọc nội dung qua `useIntlayer` hoặc `getIntlayer`.

</Question>

<Question title="i18n làm tăng dung lượng trang của tôi bao nhiêu?">

Ít hơn nhiều so với các catalog truyền thống, vì trang không bao giờ tải ngôn ngữ mà nó không hiển thị. Nội dung được phân phối ở các định dạng tối ưu. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md).

</Question>

<Question title="Tôi có thể di chuyển từ i18next mà không cần viết lại các script của mình không?">

Phần lớn là có. Làm theo [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md).

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Để tự động hóa hoàn toàn, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build và tạo từ điển trên mỗi thay đổi.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Những giải pháp khác nhau nào có sẵn để quốc tế hóa trang web JavaScript thuần?">

- **Đối tượng từ điển thủ công**: không có kiểm tra kiểu hay công cụ xác thực.
- **`i18next`**: thư viện phổ biến cho runtime.
- **`Intlayer`**: khai báo trong tệp nội dung, biên dịch build time tùy chọn, kiểm tra kiểu, visual editor và CMS.

Xem [lý do chọn Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/interest_of_intlayer.md).

</Question>

<Question title="Làm cách nào để đọc bản dịch và đưa vào DOM?">

Gọi `useIntlayer` với khóa từ điển và gán giá trị vào DOM node thủ công, như minh họa ở bước 6.

</Question>

<Question title="Ngôn ngữ của người truy cập được phát hiện như thế nào?">

Từ các nguồn trong `routing.storage`: thường là cookie trước, sau đó là header `Accept-Language`, và trở về ngôn ngữ mặc định. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Question>

<Question title="Làm cách nào để hỗ trợ các ngôn ngữ viết từ phải sang trái?">

Bước 8 giải thích điều này. `getHTMLTextDir` trả về `ltr`, `rtl`, hoặc `auto`, cho phép bạn đặt các thuộc tính `lang` và `dir` trên phần tử `html` hoặc `body`.

</Question>

<Question title="Người truy cập có phải tải về mọi ngôn ngữ không?">

Không, nếu bạn không muốn. Bước 9 hướng dẫn tải chậm (lazy loading) từ điển theo từng locale, nhờ đó trang chỉ tải ngôn ngữ hoạt động.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`. Lệnh này điền các bản dịch còn thiếu bằng LLM bạn chọn sử dụng provider và API key của riêng bạn, và `--git-diff` giới hạn thao tác ở các tệp đã thay đổi. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ dạng số nhiều, giới tính và rich text không?">

Có: [dạng số nhiều (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/plurial.md), [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [chèn (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md), và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Làm thế nào người dịch có thể chỉnh sửa nội dung mà không cần chạm vào mã nguồn?">

Thông qua [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md), cho phép bất kỳ ai chỉnh sửa văn bản trực tiếp trên ứng dụng đang chạy, hoặc qua [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), giúp tách biệt nội dung để cập nhật mà không cần triển khai lại mã nguồn.

</Question>

<Question title="Intlayer có phải là mã nguồn mở và miễn phí không?">

Có, theo giấy phép Apache 2.0, bao gồm cả mục đích thương mại. CMS lưu trữ trên đám mây là một dịch vụ trả phí tùy chọn và cũng có thể [tự lưu trữ (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>
