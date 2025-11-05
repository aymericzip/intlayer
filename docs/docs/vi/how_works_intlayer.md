---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Cách Thức Hoạt Động của Intlayer
description: Tìm hiểu cách Intlayer hoạt động bên trong. Hiểu kiến trúc và các thành phần làm cho Intlayer mạnh mẽ.
keywords:
  - Intlayer
  - Cách thức hoạt động
  - Kiến trúc
  - Thành phần
  - Hoạt động nội bộ
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Lịch sử khởi tạo
---

# Cách Thức Hoạt Động của Intlayer

## Mục Lục

<TOC/>

## Tổng Quan

Ý tưởng chính đằng sau Intlayer là áp dụng quản lý nội dung theo từng thành phần. Vì vậy, ý tưởng của Intlayer là cho phép bạn khai báo nội dung ở bất cứ đâu trong codebase của bạn, ví dụ như trong cùng thư mục với thành phần của bạn.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Để làm được điều đó, vai trò của Intlayer là tìm tất cả các `file khai báo nội dung` của bạn, ở tất cả các định dạng khác nhau có trong dự án của bạn, sau đó nó sẽ tạo ra các `từ điển` từ chúng.

Vì vậy, có hai bước chính:

- Bước xây dựng
- Bước diễn giải

### Bước xây dựng từ điển

Bước xây dựng có thể được thực hiện theo ba cách:

- sử dụng CLI với lệnh `npx intlayer build`
- sử dụng [extension vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)
- sử dụng các plugin của ứng dụng như [`gói vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vite-intlayer/index.md), hoặc các plugin tương đương cho [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/index.md). Khi bạn sử dụng một trong những plugin này, Intlayer sẽ tự động xây dựng các từ điển của bạn khi bạn khởi động (dev) hoặc xây dựng (prod) ứng dụng của mình.

1. Khai báo các file nội dung
   - Các file nội dung có thể được định nghĩa dưới nhiều định dạng khác nhau, chẳng hạn như TypeScript, ECMAScript, CommonJS hoặc JSON.
   - Các file nội dung có thể được định nghĩa ở bất cứ đâu trong dự án, điều này cho phép bảo trì và mở rộng tốt hơn. Việc tuân thủ quy ước phần mở rộng file cho các file nội dung là rất quan trọng. Phần mở rộng mặc định là `*.content.{js|cjs|mjs|ts|tsx|json}`, nhưng có thể được thay đổi trong [file cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

2. Tạo `dictionaries`
   - Các từ điển được tạo ra từ các file nội dung. Theo mặc định, các từ điển Intlayer được tạo trong thư mục `.intlayer/dictionaries` của dự án.
   - Các từ điển này được tạo ra ở nhiều định dạng khác nhau để đáp ứng mọi nhu cầu và tối ưu hiệu suất của ứng dụng.

3. Tạo các kiểu cho từ điển

Dựa trên các `dictionaries` của bạn, Intlayer sẽ tạo các kiểu để có thể sử dụng chúng trong ứng dụng của bạn.

- Các kiểu từ điển được tạo từ các `file khai báo nội dung` của Intlayer. Theo mặc định, các kiểu từ điển Intlayer được tạo trong thư mục `.intlayer/types` của dự án.

- Intlayer [mở rộng module](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) là một tính năng của TypeScript cho phép bạn định nghĩa các kiểu bổ sung cho Intlayer. Điều này giúp trải nghiệm phát triển dễ dàng hơn bằng cách gợi ý các đối số có sẵn hoặc các đối số bắt buộc.
  Trong số các kiểu được tạo ra, các kiểu từ điển Intlayer hoặc thậm chí các kiểu cấu hình ngôn ngữ được thêm vào file `types/intlayer.d.ts`, và được sử dụng bởi các package khác. Để làm được điều này, cần phải cấu hình file `tsconfig.json` để bao gồm thư mục `types` của dự án.

### Bước diễn giải từ điển

Sử dụng Intlayer, bạn sẽ truy cập nội dung trong ứng dụng của mình bằng cách sử dụng hook `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Hook này sẽ quản lý việc phát hiện locale cho bạn và trả về nội dung cho locale hiện tại. Sử dụng hook này, bạn cũng có thể diễn giải markdown, quản lý số nhiều, và nhiều hơn nữa.

> Để xem tất cả các tính năng của Intlayer, bạn có thể đọc [tài liệu từ điển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

## Nội dung từ xa

Intlayer cho phép bạn khai báo nội dung cục bộ, sau đó xuất chúng sang CMS để đội ngũ không chuyên về kỹ thuật của bạn có thể chỉnh sửa.

Vì vậy, bạn sẽ có thể đẩy và kéo nội dung từ CMS về ứng dụng của mình, tương tự như cách bạn làm với Git cho mã nguồn của mình.

Đối với các từ điển được externalize sử dụng CMS, Intlayer thực hiện một thao tác fetch cơ bản để lấy các từ điển từ xa và hợp nhất chúng với các từ điển cục bộ của bạn. Nếu được cấu hình trong dự án, Intlayer sẽ tự động quản lý việc lấy nội dung từ CMS khi ứng dụng khởi động (dev) / build (prod).

## Trình chỉnh sửa trực quan

Intlayer cũng cung cấp một trình soạn thảo trực quan để cho phép bạn chỉnh sửa nội dung một cách trực quan. [Trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) này có trong gói bên ngoài `intlayer-editor`.

![trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Server là một ứng dụng Express đơn giản lắng nghe các yêu cầu từ client và lấy nội dung của ứng dụng của bạn, chẳng hạn như `dictionaries` và cấu hình để làm cho nó có thể truy cập được trên phía client.
- Mặt khác, client là một ứng dụng React được sử dụng để tương tác với nội dung của bạn thông qua giao diện trực quan.

Khi bạn gọi nội dung của mình bằng cách sử dụng `useIntlayer` và trình soạn thảo được bật, nó sẽ tự động bao bọc các chuỗi của bạn bằng một đối tượng Proxy có tên là `IntlayerNode`. Node này sử dụng `window.postMessage` để giao tiếp với một iframe được bao bọc chứa giao diện trình soạn thảo trực quan.
Ở phía trình soạn thảo, trình soạn thảo lắng nghe các thông điệp này và mô phỏng tương tác thực với nội dung của bạn, cho phép bạn chỉnh sửa văn bản trực tiếp trong ngữ cảnh ứng dụng của bạn.

## Tối ưu hóa build ứng dụng

Để tối ưu kích thước gói của ứng dụng của bạn, Intlayer cung cấp hai plugin để tối ưu quá trình build ứng dụng của bạn: các plugin `@intlayer/babel` và `@intlayer/swc`.

Các plugin Babel và SWC hoạt động bằng cách phân tích Cây Cú Pháp Trừu Tượng (AST) của ứng dụng của bạn để thay thế các lời gọi hàm Intlayer bằng mã được tối ưu hóa. Quá trình này giúp gói cuối cùng của bạn nhẹ hơn trong môi trường production bằng cách đảm bảo chỉ những từ điển thực sự được sử dụng mới được nhập khẩu, tối ưu hóa việc chia nhỏ gói và giảm kích thước gói.

Trong chế độ phát triển, Intlayer sử dụng việc nhập khẩu tĩnh tập trung cho các từ điển nhằm đơn giản hóa trải nghiệm phát triển.

Bằng cách kích hoạt tùy chọn `importMode = "dynamic"` trong [cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md), Intlayer sẽ sử dụng import động để tải các từ điển. Tùy chọn này mặc định bị tắt để tránh xử lý bất đồng bộ khi render ứng dụng.

> `@intlayer/babel` có sẵn theo mặc định trong gói `vite-intlayer`,

> `@intlayer/swc` không được cài đặt theo mặc định trong gói `next-intlayer` vì các plugin SWC vẫn đang trong giai đoạn thử nghiệm trên Next.js.

Để xem cách cấu hình quá trình build ứng dụng của bạn, bạn có thể đọc [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

## Các gói

Intlayer bao gồm nhiều gói, mỗi gói có một vai trò cụ thể trong quá trình dịch thuật. Dưới đây là biểu đồ thể hiện cấu trúc của các gói này:

![các gói của intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Gói `intlayer` được sử dụng trong các ứng dụng để khai báo nội dung trong các tệp nội dung.

### react-intlayer

Gói `react-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng React.

### next-intlayer

Gói `next-intlayer` được sử dụng như một lớp trên `react-intlayer` để làm cho các từ điển Intlayer có thể sử dụng trong các ứng dụng Next.js. Nó tích hợp các tính năng thiết yếu để làm cho Intlayer hoạt động trong môi trường Next.js, chẳng hạn như middleware dịch thuật, định tuyến, hoặc cấu hình tệp `next.config.js`.

### vue-intlayer

Gói `vue-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng Vue.

### nuxt-intlayer

Gói `nuxt-intlayer` là một module Nuxt để làm cho các từ điển Intlayer có thể sử dụng trong các ứng dụng Nuxt. Nó tích hợp các tính năng thiết yếu để làm cho Intlayer hoạt động trong môi trường Nuxt, chẳng hạn như middleware dịch thuật, định tuyến, hoặc cấu hình tệp `nuxt.config.js`.

### svelte-intlayer (Đang phát triển)

Gói `svelte-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng Svelte.

### solid-intlayer (Đang phát triển)

Gói `solid-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng Solid.js.

### preact-intlayer

Gói `preact-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng Preact.

### angular-intlayer (Đang phát triển)

Gói `angular-intlayer` được sử dụng để diễn giải các từ điển Intlayer và làm cho chúng có thể sử dụng trong các ứng dụng Angular.

### express-intlayer

Gói `express-intlayer` được sử dụng để dùng Intlayer trên backend Express.js.

### react-native-intlayer

Gói `react-native-intlayer` cung cấp các công cụ tích hợp plugin để Intlayer hoạt động với Metro bundler.

### lynx-intlayer

Gói `lynx-intlayer` cung cấp các công cụ tích hợp plugin để Intlayer hoạt động với Lynx bundler.

### vite-intlayer

Bao gồm plugin Vite để tích hợp Intlayer với [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), cũng như middleware để phát hiện ngôn ngữ ưu tiên của người dùng, quản lý cookie và xử lý chuyển hướng URL.

### react-scripts-intlayer

Bao gồm các lệnh và plugin `react-scripts-intlayer` để tích hợp Intlayer với ứng dụng dựa trên Create React App. Các plugin này dựa trên [craco](https://craco.js.org/) và bao gồm cấu hình bổ sung cho bundler [Webpack](https://webpack.js.org/).

### intlayer-editor

Gói `intlayer-editor` được sử dụng để cho phép sử dụng trình soạn thảo trực quan. Gói này là tùy chọn, có thể được cài đặt trong các ứng dụng và sẽ được gói `react-intlayer` sử dụng.
Nó bao gồm hai phần: server và client.

Client chứa các thành phần giao diện người dùng sẽ được `react-intlayer` sử dụng.

Server, dựa trên Express, được sử dụng để nhận các yêu cầu từ trình soạn thảo trực quan và quản lý hoặc chỉnh sửa các tệp nội dung.

### intlayer-cli

Gói `intlayer-cli` có thể được sử dụng để tạo từ điển bằng lệnh `npx intlayer dictionaries build`. Nếu `intlayer` đã được cài đặt, CLI sẽ tự động được cài đặt và gói này không cần thiết.

### @intlayer/core

Gói `@intlayer/core` là gói chính của Intlayer. Nó chứa các chức năng quản lý dịch thuật và từ điển. `@intlayer/core` đa nền tảng và được các gói khác sử dụng để thực hiện việc diễn giải từ điển.

### @intlayer/config

Gói `@intlayer/config` được sử dụng để cấu hình các thiết lập của Intlayer, chẳng hạn như các ngôn ngữ có sẵn, các tham số middleware của Next.js, hoặc các thiết lập của trình soạn thảo tích hợp.

### @intlayer/webpack

Gói `@intlayer/webpack` được sử dụng để cung cấp cấu hình Webpack nhằm giúp một ứng dụng dựa trên Webpack hoạt động với Intlayer. Gói này cũng cung cấp một plugin để thêm vào một ứng dụng Webpack hiện có.

### @intlayer/cli

Gói `@intlayer/cli` là một gói NPM được sử dụng để khai báo các script liên quan đến giao diện dòng lệnh Intlayer. Nó đảm bảo tính đồng nhất của tất cả các lệnh CLI của Intlayer. Gói này đặc biệt được sử dụng bởi các gói [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/vi/packages/intlayer-cli/index.md) và [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/vi/packages/intlayer/index.md).

### @intlayer/mcp

Gói `@intlayer/mcp` cung cấp một server MCP (Model Context Protocol) mang đến sự hỗ trợ IDE được trang bị AI, được tùy chỉnh cho hệ sinh thái Intlayer. Nó tự động tải tài liệu và tích hợp với CLI của Intlayer.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Gói `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` và `@intlayer/dynamic-dictionaries-entry` trả về đường dẫn entry của các từ điển Intlayer. Vì việc tìm kiếm hệ thống tập tin từ trình duyệt là không thể, nên việc sử dụng các bundler như Webpack hoặc Rollup để lấy đường dẫn entry của các từ điển cũng không khả thi. Các gói này được thiết kế để được alias, cho phép tối ưu hóa bundling trên nhiều bundler khác nhau như Vite, Webpack và Turbopack.

### @intlayer/chokidar

Gói `@intlayer/chokidar` được sử dụng để giám sát các tập tin nội dung và tái tạo lại từ điển đã chỉnh sửa mỗi khi có thay đổi.

### @intlayer/editor

Gói `@intlayer/editor` cung cấp các tiện ích liên quan đến trình chỉnh sửa từ điển. Nó đặc biệt bao gồm API để kết nối một ứng dụng với trình chỉnh sửa Intlayer, và các tiện ích để thao tác với các từ điển. Gói này hỗ trợ đa nền tảng.

### @intlayer/editor-react

Gói `@intlayer/editor-react` cung cấp các state, context, hook và component để kết nối một ứng dụng React với trình chỉnh sửa Intlayer.

### @intlayer/babel

Gói `@intlayer/babel` cung cấp các công cụ tối ưu hóa việc bundling các từ điển cho các ứng dụng dựa trên Vite và Webpack.

### @intlayer/swc

Gói `@intlayer/swc` cung cấp các công cụ tối ưu hóa việc bundling các từ điển cho các ứng dụng Next.js.

### @intlayer/api

Gói `@intlayer/api` là một SDK API để tương tác với backend.

### @intlayer/design-system

Gói `@intlayer/design-system` được sử dụng để chia sẻ các yếu tố thiết kế giữa CMS và trình chỉnh sửa Visual.

### @intlayer/backend

Gói `@intlayer/backend` xuất các kiểu backend và sẽ sớm cung cấp backend như một gói độc lập trong tương lai.

## Trò chuyện với tài liệu thông minh của chúng tôi

- [Đặt câu hỏi của bạn với tài liệu thông minh của chúng tôi](https://intlayer.org/doc/chat)
