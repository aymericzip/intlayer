---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Intlayer 的重要性
description: 探索在項目中使用 Intlayer 的好處和優勢。了解為什麼 Intlayer 在其他框架中脫穎而出。
keywords:
  - 好處
  - 優勢
  - Intlayer
  - 框架
  - 對比
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "添加為什麼選擇 Intlayer 而不是其他替代方案的章節"
  - version: 7.3.1
    date: 2025-11-27
    changes: "發布編譯器"
  - version: 5.8.0
    date: 2025-08-19
    changes: "更新對比表"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化歷史記錄"
---

# 為什麼你應該考慮使用 Intlayer？

## 什麼是 Intlayer？

**Intlayer** 是一個專門為 JavaScript 開發者設計的國際化（i18n）庫。它允許你在代码中的任何地方宣告你的內容。它將多語言內容的宣告轉換為結構化的字典，以便輕鬆集成到你的代码中。通過使用 TypeScript，**Intlayer** 讓你的開發工作更加穩固和高效。

## 為什麼選擇 Intlayer 而不是其他替代方案？

與 `next-intl` 或 `i18next` 等主要解決方案相比，Intlayer 是一個自帶集成優化的解決方案，例如：

**打包體積 (Bundle size)**

無需在頁面中載入龐大的 JSON 文件，只需載入必要的特定內容。Intlayer 可以幫助你**將打包體積和頁面大小減少多達 50%**。

**可維護性 (Maintainability)**

對應用程式的內容進行組件級的範圍限制，**大大簡化了大型應用程式的維護工作**。你可以複製或刪除單個功能文件夾，而無需承擔審查整個內容代码庫的精神負擔。此外，Intlayer 是**完全類型化**的，以確保你內容的準確性。

**AI 智能體支持 (AI Agent)**

將內容與組件共同放置（Co-location）**減少了大型語言模型（LLMs）所需的上下文**。Intlayer 還提供了一套工具，例如用於測試缺失翻譯的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/agent_skills.md)**，使 AI 智能體的開發體驗（DX）更加流暢。

**功能豐富 (Feature)**

Intlayer 提供了其他 i18n 解決方案所沒有的一系列附加功能，例如 [Markdown 支持](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/markdown.md)、[外部內容獲取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/function_fetching.md)、[文件內容載入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/file.md)、[實時內容更新](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/cli/live.md)、[可視化編輯器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_visual_editor.md)等。

**自動化 (Automation)**

使用自動化在你的 CI/CD 流程中翻譯，可以使用你選擇的任何 LLM，成本完全取決於你的 AI 提供商。Intlayer 還提供了一個**編譯器**來自動提取內容，以及一個 [網頁平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md) 來幫助你**在后台進行翻譯工作**。

**性能表現 (Performance)**

將龐大的 JSON 文件連接到組件上可能會導致性能和響應性問題。Intlayer 在構築時優化了你的內容載入方式。

**擴展至非開發團隊 (Scaling with non-dev)**

不僅僅是一個 i18n 解決方案，Intlayer 還提供了一個**自主托管的可視化編輯器[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_visual_editor.md)**和一個**[功能完備的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md)**，幫助你**實時**管理多語言內容，使與翻譯人員、文案人員和其他團隊成員的協作變得無縫銜接。內容可以存儲在本地和/或遠程。

**跨框架設計 (Cross framework design)**

如果你在應用程式的不同部分使用不同的框架（例如 React、React-native, Vue, Angular, Svelte 等），Intlayer 提供了一種**在所有主流前端框架中使用通用語法和實現**的方法。你還可以跨設計系統、應用、后端等共享你的內容宣告。

## 為什麼要創建 Intlayer？

創建 Intlayer 是為了解決一個普遍影響所有常見 i18n 庫（如 `next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`react-intl` 和 `vue-i18n`）的痛點。

所有這些解決方案都採用集中式方法來列出和管理你的內容。例如：

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

或者使用命名空間（namespaces）：

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

由於以下幾個原因，這種架構會降低開發速度，並使代码庫的維護變得更加複雜：

1. **對於創建的 any 新組件，你都必須：**
   - 在 `locales` 文件夾中創建新的資源/命名空間
   - 記住在頁面中導入新的命名空間
   - 翻譯你的內容（通常是通過從 AI 提供商手動複製/粘貼來完成）

2. **對於對組件進行的 any 更改，你都必須：**
   - 尋找相關的資源/命名空間（遠離組件本身）
   - 翻譯你的內容
   - 確保你的內容在所有語言（locales）中都是最新的
   - 驗證你的命名空間不包含未使用的鍵/值
   - 確保你的 JSON 文件結構在所有語言中都是相同的

在採用這些解決方案的專業項目中，通常會使用定位管理平台來協助管理內容的翻譯。然而，對於大型項目來說，這很快就會變得昂貴。

為了解決这个问题，Intlayer 採用了一种將內容按組件作用域劃分的方法，并将你的內容保持在組件附近，就像我們通常對 CSS (`styled-components`)、類型、文檔 (`storybook`) 或單元測試 (`jest`) 所做的那样。

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

這種方法允許你：

1. **提高開發速度**
   - 可以使用 VSCode 插件創建 `.content.{{ts|mjs|cjs|json}}` 文件
   - IDE 中的 AI 自動補全工具（例如 GitHub Copilot）可以幫助你宣告內容，減少複製/粘貼

2. **保持代码庫的整潔**
   - 降低複雜度
   - 提高可維護性

3. **更容易地複製組件及其相關內容（例如：登錄/註冊組件等）**
   - 限制影響其他組件內容的風險
   - 將你的內容從一個應用複製到另一個應用，而無需 any 外部依賴

4. **避免在未使用的組件中殘留未使用的鍵/值以污染代码庫**
   - 如果你不使用某个組件，Intlayer 將不會導入其相關內容
   - 如果你刪除了一個組件，你更容易記得移除其相關內容，因為它就存在於同一个文件夾中

5. **減少 AI 智能體宣告多語言內容的推斷成本**
   - AI 智能體無需掃描你整個代码庫來了解在哪里實現你的內容
   - 翻譯可以通過 IDE 中的 AI 自動補全工具（例如 GitHub Copilot）輕鬆完成

6. **優化載入性能**
   - 如果一個組件是懶載入的，其相關內容將在同一時間被載入

## Intlayer 附加功能

| 功能                                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **跨框架支持**<br><br>Intlayer 兼容所有主流框架和庫，包括 Next.js, React, Vite, Vue.js, Nuxt, Preact, Express 等。                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript 驅動的內容管理**<br><br>利用 JavaScript 的靈活性來高效地定義和管理你的內容。<br><br> - [內容宣告](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **編譯器**<br><br>Intlayer 編譯器可自動从組件中提取內容并生成字典文件。<br><br> - [編譯器](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **單語言內容宣告文件**<br><br>在自動生成前，通過僅宣告一次你的內容來加速開發。<br><br> - [單語言內容宣告文件](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **類型安全環境**<br><br>利用 TypeScript 確保你的內容定義和代码沒有錯誤，同時還能享受 IDE 的自動補全功能。<br><br> - [TypeScript 配置](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **簡易配置**<br><br>僅需極簡的配置即可快速啟動并運行。輕鬆調整國際化、路由、AI、構築以及內容處理的設置。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **簡化內容檢索**<br><br>無需為每一小段內容調用 `t` 函數。使用單一的 hook 即可直接檢索你的所有內容。<br><br> - [React 集成](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一致的服務器組件實現**<br><br>完美適合 Next.js 服務器組件，客戶端和服務器組件使用相同的實現，無需跨每个服務器組件傳遞你的 `t` 函數。<br><br> - [服務器組件](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **有條理的代码庫**<br><br>保持代码庫更有條理：1 組件 = 在同一文件夾下的 1 個字典。靠近其各自組件的翻譯有助於提高可維護性和清晰度。<br><br> - [Intlayer 運行機制](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **增強的路由功能**<br><br>完全支持應用路由，無縫適應複雜的應用結構，適用於 Next.js, React, Vite, Vue.js 等。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 支持**<br><br>導入并解譯本地文件以及遠程 Markdown，以獲得隱私政策、文檔等多語言內容。解譯并在你的代码中使 Markdown 元數據可被訪問。<br><br> - [內容文件](https://intlayer.org/doc/concept/content/file)                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **免費的可視化編輯器與 CMS**<br><br>視覺編輯器和 CMS 免費向內容創作者開放，消除对第三方本地化平台的依賴。使用 Git 保持內容同步，或使用 CMS 徹底或部分外置管理它。<br><br> - [Intlayer 編輯器](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **構築時搖樹優化 (Tree-shakable) 內容**<br><br>構築時搖樹優化內容，減小最終包的體積。按組件載入內容，并从打包體積中排除 any 未使用的內容。支持懶載入以提高應用載入效率。<br><br> - [應用構築優化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **靜態渲染**<br><br>不阻碍靜態渲染（Static Rendering）。<br><br> - [Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI 驅動翻譯**<br><br>使用您自己的 AI 提供商/API 金鑰，點擊一下即可將您的網站翻譯成 231 種語言，得益於 Intlayer 先進的 AI 翻譯工具。<br><br> - [CI/CD 集成](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動填充](https://intlayer.org/doc/concept/auto-fill)                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 服務器集成**<br><br>提供用於 IDE 自動化的 MCP（Model Context Protocol）服務器，能夠直接在你的開發環境中實現無縫的內容管理和 i18n 工作流。<br><br> - [MCP 服務器](https://github.com/aymericzip/intlayer/blob/main/docs/zh-TW/mcp_server.md)                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 插件**<br><br>Intlayer 提供 VSCode 插件協助管理你的內容和翻譯，構築你的字典，翻譯你的內容等。<br><br> - [VSCode 插件](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **互操作性**<br><br>允許與 react-i18next、next-i18next, next-intl 和 react-intl 互操作。<br><br> - [Intlayer 與 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 與 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 與 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |
| 測試缺失翻譯 (CLI/CI)                                                                                                     | ✅ CLI: npx intlayer content test (对 CI 友好的審計)                                                                                                                                                                                                                                                                                                      |

## Intlayer 與其他解決方案 of 比較

| 功能                                          | `intlayer`                                                                       | `react-i18next`                                                | `react-intl` (FormatJS)                                                    | `lingui`                            | `next-intl`                                                    | `next-i18next`                                                 | `vue-i18n`                                        |
| --------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------- |
| **翻譯就近組件**                              | ✅ 是，內容與每个組件協同定位                                                    | ❌ 否                                                          | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                          | ❌ 否                                                          | ✅ 是 - 使用 `Single File Components` (SFCs)      |
| **TypeScript 集成**                           | ✅ 高級，自動生成嚴格類型                                                        | ⚠️ 基礎；為確保安全需額外配置                                  | ✅ 良好，但不够嚴格                                                        | ⚠️ 類型定義，需要配置               | ✅ 良好                                                        | ⚠️ 基礎                                                        | ✅ 良好（類型可用；鍵安全需要設置）               |
| **缺失翻譯檢測**                              | ✅ TypeScript 錯誤高亮及構築時錯誤/警告                                          | ⚠️ 運行時多為回退字符串                                        | ⚠️ 回退字符串                                                              | ⚠️ 需要額外配置                     | ⚠️ 運行時回退                                                  | ⚠️ 運行時回退                                                  | ⚠️ 運行時回退/警告（可配置）                      |
| **富內容 (JSX/Markdown/組件)**                | ✅ 直接支持                                                                      | ⚠️ 受限 / 僅插值                                               | ⚠️ ICU 語法，非真實 JSX                                                    | ⚠️ 受限                             | ❌ 非針對富節點設計                                            | ⚠️ 受限                                                        | ⚠️ 受限（組件通過 `<i18n-t>`，Markdown 通過插件） |
| **AI 驅動翻譯**                               | ✅ 是，支持多個 AI 提供商。可使用您自己的 API 金鑰。考慮您的應用上下文和內容範圍 | ❌ 否                                                          | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                          | ❌ 否                                                          | ❌ 否                                             |
| **可視化編輯器**                              | ✅ 是，本地可視化編輯器 + 可選 CMS；能外置代码庫內容；可嵌入                     | ❌ 否 / 只能通過外部定位平台獲取                               | ❌ 否 / 只能通過外部定位平台獲取                                           | ❌ 否 / 只能通過外部定位平台獲取    | ❌ 否 / 只能通過外部定位平台獲取                               | ❌ 否 / 只能通過外部定位平台獲取                               | ❌ 否 / 只能通過外部定位平台獲取                  |
| **路由本地化**                                | ✅ 是，原生支持本地化路徑（兼容 Next.js & Vite）                                 | ⚠️ 沒內置，需要插件（例如 `next-i18next`）或自定義路由配置     | ❌ 否，只有消息格式化，路由需手動                                          | ⚠️ 沒內置，需要插件或手動配置       | ✅ 內置，App Router 支持 `[locale]` 分段                       | ✅ 內置                                                        | ✅ 內置                                           |
| **動態路由生成**                              | ✅ 是                                                                            | ⚠️ 插件/生態系統或手動設置                                     | ❌ 未提供                                                                  | ⚠️ 插件/手動                        | ✅ 是                                                          | ✅ 是                                                          | ❌ 未提供 (Nuxt i18n 提供)                        |
| **複數形式**                                  | ✅ 基于枚舉的模式                                                                | ✅ 可配置（像 i18next-icu 插件）                               | ✅ (ICU)                                                                   | ✅ (ICU/messageformat)              | ✅ 良好                                                        | ✅ 良好                                                        | ✅ 內置複數規則                                   |
| **格式化 (日期、數字、貨幣)**                 | ✅ 優化格式化程序 (底層使用 Intl)                                                | ⚠️ 通過插件或自定義使用 Intl                                   | ✅ ICU 格式化程序                                                          | ✅ ICU/CLI 助手                     | ✅ 良好 (Intl 助手)                                            | ✅ 良好 (Intl 助手)                                            | ✅ 內置日期/數字格式化程序 (Intl)                 |
| **內容格式**                                  | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 研發中)                              | ⚠️ .json                                                       | ✅ .json, .js                                                              | ⚠️ .po, .json                       | ✅ .json, .js, .ts                                             | ⚠️ .json                                                       | ✅ .json, .js                                     |
| **ICU 支持**                                  | ⚠️ 研發中                                                                        | ⚠️ 通過插件 (i18next-icu)                                      | ✅ 是                                                                      | ✅ 是                               | ✅ 是                                                          | ⚠️ 通過插件 (`i18next-icu`)                                    | ⚠️ 通過自定義格式化程序/編譯器                    |
| **SEO 助手 (hreflang, sitemap)**              | ✅ 內置工具：sitemap、robots.txt、metadata 助手                                  | ⚠️ 社區插件/手動                                               | ❌ 非核心功能                                                              | ❌ 非核心功能                       | ✅ 良好                                                        | ✅ 良好                                                        | ❌ 非核心功能 (Nuxt i18n 提供助手)                |
| **生態系統 / 社區**                           | ⚠️ 較小但增長迅速且響應迅速                                                      | ✅ 最大且最成熟                                                | ✅ 大                                                                      | ⚠️ 較小                             | ✅ 中等規模，專注於 Next.js                                    | ✅ 中等規模，專注於 Next.js                                    | ✅ 在 Vue 生態系统中巨大                          |
| **服務端渲染與服務端組件**                    | ✅ 是，為 SSR / React 服务器組件而優化                                           | ⚠️ 頁面層級支持，但需要沿組件樹傳遞 t 函數以供子服務端組件使用 | ⚠️ 頁面層級在額外設置下支持，但需要沿組件樹傳遞 t 函數以供子服務端組件使用 | ✅ 支持，需要配置                   | ⚠️ 頁面層級支持，但需要沿組件樹傳遞 t 函數以供子服務端組件使用 | ⚠️ 頁面層級支持，但需要沿組件樹傳遞 t 函數以供子服務端組件使用 | ✅ 通過 Nuxt/Vue SSR 實現 SSR (無 RSC)            |
| **搖樹優化 (Tree-shaking)（僅載入所用內容）** | ✅ 是，構築時通過 Babel/SWC 插件按組件進行                                       | ⚠️ 通常載入全部（可利用命名空間/代码分拆改善）                 | ⚠️ 通常載入全部                                                            | ❌ 非默認                           | ⚠️ 部分                                                        | ⚠️ 部分                                                        | ⚠️ 部分（使用代码分拆/手動配置）                  |
| **延遲載入 (Lazy loading)**                   | ✅ 是，按語言 / 按字典                                                           | ✅ 是（例如，按需的服務端/命名空間）                           | ✅ 是（分拆語言包）                                                        | ✅ 是（動態目錄導入）               | ✅ 是（按路由/按語言），需要命名空間管理                       | ✅ 是（按路由/按語言），需要命名空間管理                       | ✅ 是（異步語言消息）                             |
| **清除未使用的內容**                          | ✅ 是，構築時按字典進行                                                          | ❌ 否，僅可通過手動命名空間分段完成                            | ❌ 否，打包了所有宣告的消息                                                | ✅ 是，在構築時檢測並丟棄未使用的鍵 | ❌ 否，可通過命名空間管理進行手動處理                          | ❌ 否，可通過命名空間管理進行手動處理                          | ❌ 否，僅可通過手動延遲載入實現                   |
| **大型項目管理**                              | ✅ 鼓勵模塊化，適合設計系統                                                      | ⚠️ 需要良好的文件規範                                          | ⚠️ 中央目錄可能會變得龐大                                                  | ⚠️ 可能會變得複雜                   | ✅ 配合配置實現模塊化                                          | ✅ 配合配置實現模塊化                                          | ✅ 配合 Vue Router/Nuxt i18n 配置實現模塊化       |

## GitHub 星星歷史

GitHub 星星數是衡量項目受歡迎程度、社區信任度以及長期相關性的一個強有力指標。雖然它們不是技術質量的直接度量標準，但它們反映了有多少開發者發現該項目有用，關注其進展並有可能採用它。對於評估項目的價值來說，星星能夠幫助對比替代方案之間的吸引力，並提供有關生態系統增長的見解。

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## 互操作性

`intlayer` 還可以幫助管理你的 `react-intl`、`react-i18next`、`next-intl`、`next-i18next` 以及 `vue-i18n` 命名空間。

使用 `intlayer`，你可以宣告你喜歡的 i18n 庫格式的內容，並且 intlayer 將在你想指定的路徑下生成命名空間（例如：`/messages/{{locale}}/{{namespace}}.json`）。
