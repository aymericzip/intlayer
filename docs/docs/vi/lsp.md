---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Máy chủ LSP Intlayer
description: Tìm hiểu cách máy chủ ngôn ngữ Intlayer mang đến khả năng đi tới định nghĩa, tìm tham chiếu, xem trước khi rê chuột, tự động hoàn thành khóa và chẩn đoán cho IDE và tác nhân AI của bạn.
keywords:
  - LSP
  - Máy chủ ngôn ngữ
  - Go to Definition
  - Tự động hoàn thành
  - Chẩn đoán
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Bổ sung tìm tham chiếu, xem nhanh khi rê chuột, tự động hoàn thành và chẩn đoán"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Máy chủ LSP Intlayer

**Máy chủ ngôn ngữ Intlayer** là một hiện thực của [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) giúp IDE — và tác nhân AI — của bạn hiểu Intlayer. Nó kết nối một lệnh gọi như `useIntlayer("home")` với tệp `.content.ts` khai báo nó, theo cả hai chiều.

---

## Tính năng

| Tính năng                  | Phím tắt            | Mô tả                                                                                                     |
| -------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Đi tới định nghĩa**      | `F12` / `Cmd+Nhấp`  | Nhảy từ một khóa từ điển hoặc chỗ dùng một trường tới khai báo của nó trong tệp nội dung                  |
| **Tìm tất cả tham chiếu**  | `Shift+F12`         | Từ một tệp nội dung, liệt kê mọi vị trí gọi có dùng khóa hoặc trường đó                                   |
| **Xem nhanh khi rê chuột** | rê con trỏ          | Xem trước các trường của một từ điển, hoặc giá trị đã dịch của một trường, mà không rời khỏi tệp          |
| **Tự động hoàn thành**     | `"` `'` `` ` `` `.` | Gợi ý các khóa từ điển đã khai báo bên trong getter, và các trường nội dung sau `.` hoặc khi phá cấu trúc |
| **Chẩn đoán**              | tự động             | Cảnh báo khi một khóa không được khai báo trong bất kỳ tệp nội dung nào                                   |

Có hai hành vi bổ sung đáng lưu ý:

- **Từ điển được hợp nhất** — một khóa trải trên nhiều tệp nội dung sẽ trả về một kết quả cho mỗi tệp, nhờ đó bạn có thể tới từng khai báo.
- **Hỗ trợ monorepo** — máy chủ phân giải tệp `intlayer.config.*` _gần nhất_ với mỗi tệp, nhờ đó nhiều dự án trong cùng một workspace đều có từ điển riêng.

### Các lệnh gọi được hỗ trợ

Khóa được đọc từ một đối số chuỗi theo vị trí, hoặc từ một đối tượng tùy chọn (`{ namespace }`, `{ id }`).

| Thư viện                    | Lệnh gọi                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Điều này áp dụng cho mọi gói `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), cũng như cho các gói adapter compat cho phép bạn giữ nguyên cú pháp i18n hiện có.

> Từ điển được đọc từ kết quả build, vì vậy hãy chạy `npx intlayer build` — hoặc giữ máy chủ phát triển đang chạy — để máy chủ có dữ liệu mà phân giải.

---

## Cài đặt

Máy chủ được phát hành dưới dạng tệp nhị phân `intlayer-lsp` trong `@intlayer/lsp`:

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

Hãy cài đặt toàn cục (`npm install -g @intlayer/lsp`) nếu trình soạn thảo của bạn cần `intlayer-lsp` nằm trong `PATH` — đây là trường hợp của plugin Claude Code và của mọi cấu hình bên dưới gọi trực tiếp tệp nhị phân.

---

## Thiết lập

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Cài [tiện ích mở rộng Intlayer cho VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Máy chủ ngôn ngữ đã được đóng gói kèm từ v8.12.0 và tự khởi động — **không cần cấu hình gì**.

Xem [tài liệu tiện ích mở rộng VS Code](https://intlayer.org/doc/vs-code-extension) để biết các tính năng khác.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) và [Windsurf](https://windsurf.com/) là các bản fork của VS Code và dùng chung hệ sinh thái tiện ích mở rộng. Chỉ cần cài [tiện ích mở rộng Intlayer cho VS Code](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) một lần là máy chủ tự kích hoạt — **không cần cấu hình gì**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer cung cấp một **plugin cho Claude Code** được lưu trữ ngay trong kho mã Intlayer. Nó giúp Claude Code phân giải ký hiệu thật sự cho các khóa từ điển thay vì phải dùng `grep`.

Đưa tệp nhị phân vào `PATH`, sau đó đăng ký marketplace và cài plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` cũng đồng thời bật plugin. **Hãy khởi động lại Claude Code** — các máy chủ ngôn ngữ được nạp lúc khởi động, nên trước đó plugin chưa có tác dụng.

Sau đó Claude Code sẽ khởi chạy máy chủ trên các tệp `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` và `.svelte`, đồng thời dùng `goToDefinition`, `findReferences` và `hover` khi duyệt mã của bạn.

Nếu đi tới định nghĩa vẫn không hoạt động, phiên bản Claude Code của bạn có thể đang giới hạn công cụ LSP sau một cờ:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed hỗ trợ LSP sẵn có. Hãy thêm máy chủ vào thiết lập người dùng của bạn:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

Ký hiệu `"..."` giữ lại các máy chủ ngôn ngữ mặc định của Zed bên cạnh máy chủ của Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Dùng [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), hãy đăng ký một cấu hình máy chủ tùy chỉnh:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Khởi chạy máy chủ bằng npx để không cần cài đặt toàn cục
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

Sau khi khởi động lại Neovim, `gd` trên một khóa từ điển sẽ chạy Đi tới định nghĩa và `gr` sẽ chạy Tìm tham chiếu.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Trình soạn thảo khác" value="other">

Mọi trình soạn thảo hỗ trợ LSP đều có thể chạy `@intlayer/lsp`. Hãy trỏ nó tới:

- **Tệp thực thi** — `npx @intlayer/lsp`, hoặc tệp nhị phân `intlayer-lsp`
- **Phương thức truyền** — stdio (chuẩn)
- **Khả năng** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (ký tự kích hoạt `"` `'` `` ` `` `.`), chẩn đoán dạng push, `textDocumentSync: Incremental`
- **Mẫu thư mục gốc** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Hãy tham khảo tài liệu LSP của trình soạn thảo để biết định dạng cấu hình chính xác.

  </Tab>
</Tabs>

---

## Ghi chú về tác nhân AI trên terminal

**Claude Code** hoạt động như một client LSP thực thụ — xem tab ở trên.

**OpenAI Codex** và phần lớn công cụ terminal khác không phải là client LSP: chúng đọc và ghi tệp trực tiếp. Chạy riêng máy chủ không giúp ích cho chúng; giá trị đến từ việc máy chủ đang hoạt động trong một trình soạn thảo đi kèm mà tác nhân có thể truy vấn chỉ mục (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Cách hoạt động

Với mỗi tệp, máy chủ tìm tệp `intlayer.config.*` gần nhất và nạp cấu hình của dự án đó để tìm các từ điển đã biên dịch. Cấu hình, từ điển và danh sách tệp nguồn được lưu vào bộ nhớ đệm với TTL ngắn, và bị vô hiệu mỗi khi một tệp nội dung đang được theo dõi thay đổi.

Khi có yêu cầu, máy chủ phân tích tài liệu (qua [oxc](https://oxc.rs/)) và xem xét vị trí con trỏ:

1. **Trên một chuỗi khóa** (`useIntlayer("home")`) → trả về mọi tệp nội dung khai báo khóa đó, đặt con trỏ tại dòng `key:` của nó.
2. **Trên một chỗ dùng trường** (`content.title`, một thuộc tính được phá cấu trúc, `t('path.to.field')`, `<Trans>`, …) → truy ngược biến về từ điển của nó và trả về trường tương ứng bên trong các tệp nội dung.
3. **Từ một tệp nội dung** → chạy tra cứu ngược, quét mã nguồn dự án để tìm các vị trí gọi khóa hoặc trường đó.

---

## Khắc phục sự cố

| Hiện tượng                                                         | Nguyên nhân có thể             | Cách khắc phục                                                                |
| ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------- |
| Hoàn toàn không có gì xảy ra                                       | Máy chủ không chạy             | Kiểm tra `@intlayer/lsp` đã được cài và trình soạn thảo có khởi chạy nó không |
| Chạy được trong trình soạn thảo nhưng không chạy trong Claude Code | Cài plugin giữa phiên làm việc | Khởi động lại Claude Code — máy chủ ngôn ngữ được nạp lúc khởi động           |
| Không tìm thấy định nghĩa cho một khóa                             | Từ điển chưa được build        | Chạy `npx intlayer build`, hoặc khởi động máy chủ phát triển                  |
| Mọi khóa đều bị báo là chưa khai báo                               | Chưa phân giải được cấu hình   | Kiểm tra có tệp `intlayer.config.ts` (hoặc `.js`) ở gốc dự án                 |
| Dùng nhầm dự án trong monorepo                                     | Thiếu cấu hình cho từng gói    | Thêm `intlayer.config.*` vào mỗi gói có khai báo nội dung riêng               |
| Máy chủ sập khi khởi động                                          | Phiên bản Node.js quá cũ       | Yêu cầu Node.js ≥ 14.18                                                       |

Trong VS Code, máy chủ ghi log vào **Xem → Output → “Intlayer LSP”** — hữu ích để xác nhận cấu hình nào đã được phân giải và tìm thấy bao nhiêu từ điển.
