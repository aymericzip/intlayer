---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: Vanilla JS i18n - Hướng dẫn đầy đủ để dịch Vanilla JS
description: Giải pháp tốt nhất cho kích thước bundle, SEO, hiệu suất & khả năng bảo trì. Làm cho Vanilla JS trang web của bạn đa ngôn ngữ vào năm 2026, dịch thuật LLM, Agent Skills & MCP.
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

**Phạm vi bảo hiểm đầy đủ của Vanilla JS**

Intlayer được tối ưu hóa để hoạt động hoàn hảo với Vanilla JavaScript bằng cách cung cấp **quản lý nội dung không phụ thuộc vào khung**, **hỗ trợ TypeScript** và tất cả các tính năng cần thiết để mở rộng quy mô quốc tế hóa (i18n).

**Kích thước bundle**

Thay vì tải các tệp JSON lớn vào trang của bạn, hãy chỉ tải nội dung cần thiết. Intlayer giúp **giảm tới 50% kích thước bundle và kích thước trang**.

**Khả năng bảo trì**

Xác định phạm vi nội dung ứng dụng của bạn **tạo điều kiện bảo trì** cho các ứng dụng quy mô lớn. Bạn có thể sao chép hoặc xóa một thư mục tính năng mà không phải lo lắng về việc xem lại toàn bộ cơ sở mã nội dung của mình. Ngoài ra, Intlayer **được nhập đầy đủ** để đảm bảo tính chính xác cho nội dung của bạn.

**Đại lý AI**

Nội dung cùng định vị **giảm ngữ cảnh cần thiết** của Mô hình ngôn ngữ lớn (LLM). Intlayer cũng đi kèm một bộ công cụ, chẳng hạn như **CLI** để kiểm tra các bản dịch bị thiếu,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** và **[agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, để giúp trải nghiệm của nhà phát triển (DX) trở nên mượt mà hơn nữa đối với các tác nhân AI.

**Tự động hóa**

Sử dụng tính năng tự động hóa để dịch trong quy trình CI/CD của bạn bằng cách sử dụng LLM mà bạn chọn với chi phí do nhà cung cấp AI của bạn chi trả. Intlayer cũng cung cấp **trình biên dịch** để tự động trích xuất nội dung cũng như [nền tảng web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) để giúp **dịch ở chế độ nền**.

**Hiệu suất**

Việc kết nối các tệp JSON lớn với các thành phần có thể dẫn đến các vấn đề về hiệu suất và khả năng phản hồi. Intlayer tối ưu hóa việc tải nội dung của bạn tại thời điểm build.

**Mở rộng quy mô không có nhà phát triển**

Không chỉ là giải pháp i18n, Intlayer còn cung cấp **[trình chỉnh sửa trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** và **[CMS đầy đủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** để giúp bạn quản lý nội dung đa ngôn ngữ của mình trong **thời gian thực**, giúp việc cộng tác với người dịch, người viết quảng cáo và các thành viên khác trong nhóm trở nên liền mạch. Nội dung có thể được lưu trữ cục bộ và/hoặc từ xa.

---

## Hướng dẫn từng bước để thiết lập Intlayer trong ứng dụng Vanilla JS

### Bước 1: Cài đặt các phần phụ thuộc

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

### Bước 2: Cấu hình dự án của bạn

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

### Bước 3: Nhập bundle vào HTML của bạn

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

### Bước 4: Khởi động Intlayer tại điểm bắt đầu

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

### Bước 5: Khai báo nội dung của bạn

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

> Các khai báo nội dung của bạn có thể được định nghĩa ở bất kỳ đâu trong ứng dụng miễn là chúng được đưa vào thư mục `contentDir` (mặc định là `./src`). Và khớp với phần mở rộng tệp khai báo nội dung (mặc định là `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Để biết thêm chi tiết, hãy tham khảo [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

### Bước 6: Sử dụng Intlayer trong JavaScript của bạn

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

### (Tùy chọn) Bước 7: Thay đổi ngôn ngữ nội dung của bạn

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

### (Tùy chọn) Bước 8: Chuyển đổi ngôn ngữ HTML và các thuộc tính hướng văn bản

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

### (Tùy chọn) Bước 9: Tải từ điển theo kiểu trì hoãn (Lazy-load) theo ngôn ngữ

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
