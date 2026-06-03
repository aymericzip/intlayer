---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Máy chủ Intlayer LSP
description: Tìm hiểu cách Máy chủ Ngôn ngữ Intlayer cung cấp tính năng Đi tới Định nghĩa (Go-to-Definition) và các tính năng IDE khác cho useIntlayer, getIntlayer và các lệnh gọi liên quan trên tất cả các trình soạn thảo được hỗ trợ.
keywords:
  - LSP
  - Máy chủ Ngôn ngữ
  - Đi tới Định nghĩa
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# Máy chủ Intlayer LSP

**Máy chủ Ngôn ngữ Intlayer (LSP)** là một triển khai của [Giao thức Máy chủ Ngôn ngữ (LSP)](https://microsoft.github.io/language-server-protocol/) nhằm nâng cao IDE của bạn bằng trí thông minh nhận biết cấu trúc Intlayer. Hiện tại, máy chủ cung cấp tính năng **Đi tới Định nghĩa (Go to Definition)** cho các lệnh gọi khóa từ điển, cho phép bạn nhảy trực tiếp từ `useIntlayer("my-key")` trong thành phần của mình sang tệp `.content.ts` khai báo khóa đó.

---

## Tại sao nên sử dụng LSP?

Khi bạn sử dụng Intlayer, kết nối giữa một lệnh gọi như `useIntlayer("homepage")` và khai báo của nó trong `src/homepage.content.ts` là ẩn định. Nếu không có công cụ, bạn phải tìm kiếm tệp theo cách thủ công. LSP làm cho liên kết đó trở nên rõ ràng:

**Nhận thức của tác nhân AI**

Các tác nhân lập trình AI (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) dựa vào máy chủ ngôn ngữ để giải quyết các ký hiệu và hiểu mối quan hệ chéo giữa các tệp. Khi Intlayer LSP đang chạy, các tác nhân có thể đi theo lệnh gọi `useIntlayer("key")` trở lại khai báo của nó, mang lại cho chúng ngữ cảnh chính xác về các khóa nội dung có sẵn, cấu trúc của từng từ điển và tệp nào cần đọc hoặc chỉnh sửa.

**Đi tới Định nghĩa**

Đặt con trỏ của bạn lên bất kỳ chuỗi khóa từ điển nào bên trong lệnh gọi getter được hỗ trợ và nhấn `F12` (hoặc `Cmd/Ctrl+Click`). Trình soạn thảo sẽ mở tệp khai báo nội dung và đặt con trỏ vào dòng `key:`.

**Hỗ trợ từ điển được gộp**

Một khóa có thể được chia ra ở nhiều tệp nội dung khác nhau (Intlayer sẽ gộp chúng lại). Máy chủ trả về một vị trí (`Location`) trên mỗi tệp nguồn để bạn có thể điều hướng đến từng khai báo.

**Hoạt động ở mọi nơi**

Hỗ trợ tất cả các gói `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Các lệnh gọi getter được hỗ trợ

Máy chủ phát hiện các lệnh gọi hàm sau và trích xuất đối số chuỗi ký tự đầu tiên làm khóa từ điển:

| Hàm           | Ví dụ                         |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

Các generic của TypeScript và các đối số bổ sung đều bị bỏ qua — chỉ chuỗi khóa mới quan trọng.

> `useDictionary` và `getDictionary` nhận một đối tượng `Dictionary` đã được nhập làm đối số đầu tiên của chúng thay vì một khóa chuỗi, do đó chúng không được hưởng lợi từ tính năng Đi tới Định nghĩa và không được theo dõi bởi máy chủ.

---

## Cài đặt

Máy chủ LSP được phân phối như một phần của `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

Gói này cung cấp tệp nhị phân `intlayer-lsp`, được trình soạn thảo sử dụng làm tệp thực thi của máy chủ.

---

## Thiết lập như một Plugin Claude Code

Intlayer LSP có sẵn dưới dạng **plugin Claude Code** được lưu trữ trực tiếp trong kho lưu trữ GitHub của Intlayer. Việc cài đặt nó giúp Claude Code có nhận thức gốc về tính năng Đi tới Định nghĩa cho tất cả các lệnh gọi `useIntlayer` / `getIntlayer` của bạn.

### 1. Cài đặt tệp nhị phân máy chủ ngôn ngữ

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Thao tác này sẽ đặt tệp nhị phân `intlayer-lsp` vào biến môi trường PATH của bạn, đây là tệp được gọi bởi mục `lspServers` trong plugin.

### 2. Đăng ký thị trường Intlayer và cài đặt plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code sẽ thêm `"intlayer-lsp@intlayer": true` vào danh sách `enabledPlugins` của bạn và tự động khởi động máy chủ ngôn ngữ trên các loại tệp được hỗ trợ (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Bật công cụ LSP (nếu chưa hoạt động)

Một số phiên bản Claude Code yêu cầu cờ tính năng LSP phải được đặt. Thêm nội dung sau vào tệp `~/.claude/settings.json` của bạn nếu tính năng Đi tới Định nghĩa không hoạt động sau khi cài đặt:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Khởi động lại Claude Code — từ giờ nó sẽ sử dụng `goToDefinition`, `findReferences` và các thao tác LSP khác khi điều hướng cơ sở mã Intlayer của bạn thay vì sử dụng `grep`.

---

## Thiết lập trong VS Code (thông qua tiện ích mở rộng — khuyến nghị)

Nếu bạn đã cài đặt [tiện ích mở rộng Intlayer VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension), máy chủ ngôn ngữ sẽ tự động bắt đầu. Không cần cấu hình thêm. LSP được tích hợp trực tiếp vào tiện ích mở rộng VSCode từ phiên bản 8.12.0.

> Xem [tài liệu tiện ích mở rộng VS Code](https://intlayer.org/doc/vs-code-extension) để biết cách cài đặt và các tính năng khác.

---

## Thiết lập thủ công trong VS Code

Nếu bạn không sử dụng tiện ích mở rộng Intlayer, bạn có thể kết nối máy chủ ngôn ngữ theo cách thủ công bằng cách sử dụng một tiện ích mở rộng ứng dụng khách LSP chung như [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) hoặc bằng cách viết một tiện ích mở rộng nhỏ của riêng bạn. Phương pháp khuyến nghị là sử dụng tiện ích mở rộng Intlayer.

Để tham khảo, máy chủ được khởi chạy thông qua tệp nhị phân `intlayer-lsp` qua stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Tiện ích mở rộng Intlayer đọc các cài đặt này để khởi chạy máy chủ. Nếu bạn chỉ dựa vào tiện ích mở rộng, không cần cài đặt thủ công.

---

## Thiết lập trong Cursor

[Cursor](https://www.cursor.com/) là một bản phân nhánh của VS Code với các tính năng AI tích hợp. Nó sử dụng cùng một hệ sinh thái tiện ích mở rộng, vì vậy **tiện ích mở rộng Intlayer VS Code** hoạt động mà không cần bất kỳ cấu hình bổ sung nào — hãy cài đặt nó một lần và Cursor sẽ tự động phát hiện.

Nếu bạn thích cấu hình thủ công, Cursor cũng đọc tệp `.vscode/settings.json` từ thư mục gốc của không gian làm việc, do đó đoạn mã VS Code ở trên sẽ áp dụng trực tiếp.

---

## Thiết lập trong Windsurf

[Windsurf](https://windsurf.com/) (phát triển bởi Codeium) là một trình soạn thảo dựa trên VS Code khác. Cài đặt tiện ích mở rộng Intlayer từ VS Code Marketplace và máy chủ ngôn ngữ sẽ tự động được kích hoạt, giống hệt như trong VS Code và Cursor.

Để cấu hình thủ công, hãy tạo tệp `.vscode/settings.json` tại thư mục gốc của dự án:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Thiết lập trong Zed

[Zed](https://zed.dev/) hỗ trợ LSP gốc thông qua cài đặt ngôn ngữ của nó. Thêm một mục trong cài đặt người dùng Zed của bạn (`~/.config/zed/settings.json`):

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

Dấu giữ chỗ `"..."` yêu cầu Zed giữ các máy chủ ngôn ngữ mặc định của nó cùng với máy chủ Intlayer.

---

## Thiết lập cho CLI Tác nhân AI (Claude Code, Codex, v.v.)

**Claude Code** có hỗ trợ plugin LSP hạng nhất — hãy làm theo các bước [thiết lập Plugin Claude Code](#thiết-lập-như-một-plugin-claude-code) ở trên để có được trải nghiệm Đi tới Định nghĩa đầy đủ trực tiếp trong các phiên terminal của bạn.

**OpenAI Codex** và các công cụ dựa trên terminal khác chưa hoạt động như máy chủ khách LSP — chúng đọc và ghi tệp trực tiếp thay vì duy trì một phiên máy chủ ngôn ngữ liên tục. Đối với những công cụ đó, giá trị của việc chạy LSP đến một cách gián tiếp: khi máy chủ hoạt động trong một trình soạn thảo đồng hành (VS Code, Cursor, Windsurf, ...), chỉ mục trực tiếp của trình soạn thảo sẽ có sẵn cho bất kỳ tác nhân AI nào có thể truy vấn nó thông qua ngữ cảnh do trình soạn thảo cung cấp (ví dụ: Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Nếu bạn chỉ làm việc trong terminal mà không mở trình soạn thảo, bạn có thể khởi động máy chủ ngôn ngữ trong nền để nó sẵn sàng cho bất kỳ trình soạn thảo nào sau đó kết nối với cùng một không gian làm việc:

```bash
# Giữ cho máy chủ tiếp tục chạy trong nền
npx @intlayer/lsp &
```

---

## Thiết lập thủ công trong Neovim

Sử dụng [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), đăng ký cấu hình máy chủ tùy chỉnh:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Khởi chạy máy chủ bằng npx để bạn không cần cài đặt toàn cục
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Sau khi khởi động lại Neovim, việc nhấn `gd` trên một khóa Intlayer sẽ kích hoạt Đi tới Định nghĩa.

---

## Thiết lập thủ công trong các Trình soạn thảo khác

Bất kỳ trình soạn thảo nào hỗ trợ Giao thức Máy chủ Ngôn ngữ đều có thể sử dụng `@intlayer/lsp`. Máy chủ:

- **Truyền tải** – Node.js IPC / stdio (tiêu chuẩn)
- **Tệp thực thi** – `npx @intlayer/lsp` (hoặc tệp nhị phân `intlayer-lsp` được cài đặt cục bộ)
- **Khả năng** – `definitionProvider: true`, `textDocumentSync: Incremental`

Tham khảo tài liệu LSP của trình soạn thảo của bạn để biết định dạng cấu hình chính xác (ví dụ: `languageserver.json` cho [coc.nvim](https://github.com/neoclide/coc.nvim), hoặc cài đặt ứng dụng khách LSP trong [Helix](https://helix-editor.com)).

### Ví dụ: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### Ví dụ: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Cách hoạt động

Khi máy chủ khởi động, nó sẽ giải quyết cấu hình Intlayer từ thư mục gốc của không gian làm việc bằng cách sử dụng `getConfiguration()`. Điều này cung cấp cho nó các đường dẫn `build` và `system` cần thiết để tìm các từ điển được biên dịch.

Trên mỗi yêu cầu **Đi tới Định nghĩa**:

1. Máy chủ đọc toàn bộ văn bản của tài liệu đang mở.
2. Nó quét các lệnh gọi getter (`useIntlayer`, `getIntlayer`, v.v.) bằng cách sử dụng một biểu thức chính quy.
3. Nó kiểm tra xem vị trí con trỏ có nằm trong một trong những lệnh gọi đó hay không.
4. Nếu có, nó sẽ trích xuất khóa từ điển (nhóm chụp 3 của biểu thức chính quy) và gọi `getUnmergedDictionaries()` để xác định vị trí của từng tệp nội dung khai báo khóa đó.
5. Nó đọc từng tệp phù hợp và tìm dòng chính xác chứa `key: "<key>"` để định vị con trỏ một cách chính xác.
6. Nó trả về một mảng gồm các đối tượng `Location` — một đối tượng trên mỗi tệp nguồn.

Cấu hình được giải quyết một cách lazy và được lưu vào bộ nhớ cache cho mỗi phiên; nó sẽ được đặt lại trên mỗi yêu cầu `initialize` (ví dụ: khi bạn mở một thư mục không gian làm việc mới).

---

## Khắc phục sự cố

| Triệu chứng                            | Nguyên nhân có thể                | Giải pháp                                                                                                 |
| -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Đi tới Định nghĩa không hoạt động      | Máy chủ không chạy                | Kiểm tra xem `@intlayer/lsp` đã được cài đặt chưa và trình soạn thảo có đang khởi chạy nó không           |
| Phát hiện sai thư mục gốc              | Nhiều thư mục không gian làm việc | Đảm bảo thư mục chứa `intlayer.config.ts` là thư mục không gian làm việc đầu tiên                         |
| Không tìm thấy định nghĩa cho một khóa | Cấu hình chưa được giải quyết     | Xác minh xem `intlayer.config.ts` (hoặc `.js`) có tồn tại trong thư mục gốc của không gian làm việc không |
| Máy chủ gặp sự cố khi khởi động        | Phiên bản Node.js quá cũ          | Yêu cầu Node.js ≥ 14.18                                                                                   |
