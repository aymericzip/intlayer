---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: 簡介
description: 了解 Intlayer 的工作原理。查看 Intlayer 在您的應用程式中使用的步驟。了解不同的套件各自的功能。
keywords:
  - 簡介
  - 入門
  - Intlayer
  - 應用程式
  - 套件
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Intlayer 文件

歡迎來到官方的 Intlayer 文件！在這裡，您將找到整合、配置和掌握 Intlayer 以滿足所有國際化 (i18n) 需求所需的全部內容，無論您是使用 Next.js、React、Vite、Express 還是其他 JavaScript 環境。

## 簡介

### 什麼是 Intlayer？

**Intlayer** 是一個專門為 JavaScript 開發者設計的國際化函式庫。它允許在程式碼的任何位置宣告您的內容。它將多語言內容的宣告轉換為結構化的字典，以便輕鬆整合到您的程式碼中。透過使用 TypeScript，**Intlayer** 使您的開發更加強大和高效。

Intlayer 還提供了一個可選的視覺化編輯器，允許您輕鬆編輯和管理您的內容。該編輯器對於那些更喜歡使用視覺化介面進行內容管理的開發者，或者對於在產生內容時不需要關注程式碼的團隊來說特別有用。

### 使用範例

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      zh: "你好，世界",
      "zh-TW": "你好，世界",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "zh": "你好，世界",
        "zh-TW": "你好，世界"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### 為什麼選擇 Intlayer 而不是其他替代方案？

與 `next-intl` 或 `i18next` 等主流解決方案相比，Intlayer 是一個自帶多項整合最佳化方案的工具，例如：

<AccordionGroup>

<Accordion header="打包體積 (Bundle Size)">

您無需在頁面中載入龐大的 JSON 檔案，而是只載入所需的內容。Intlayer 可以幫助 **將您的打包檔和頁面大小減小高達 50%**。

</Accordion>

<Accordion header="可維護性">

將您的應用程式內容侷限在相應範圍內，**有助於維護**大規模的應用程式。您可以複製或刪除單一功能資料夾，而不會有審查整個內容程式碼庫的心理負擔。此外，Intlayer 是 **完全型別化 (fully typed)** 的，這能夠確保您內容的準確性。

</Accordion>

<Accordion header="AI Agent 支援">

將內容同位放置 **減少了所需的上下文**，這非常適合大型語言模型 (LLM)。Intlayer 還附帶一套工具，例如用於測試缺失翻譯的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/agent_skills.md)**，旨在讓 AI 代理的開發者體驗 (DX) 變得更加順暢。

</Accordion>

<Accordion header="自動化">

使用您選擇的 LLM 並在由您的 AI 提供者承擔費用的情況下，透過自動化在您的 CI/CD 管道中進行翻譯。Intlayer 還提供了一個 **編譯器**，可自動提取內容；並配備了一個 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md) 以幫助您 **在背景執行翻譯**。

</Accordion>

<Accordion header="效能表現 (Performance)">

將龐大的 JSON 檔案連接到元件，可能會導致效能與響應式問題。Intlayer 會在建置時最佳化您的內容載入。

</Accordion>

<Accordion header="無需開發人員的規模化運作 (Scaling with non-dev)">

Intlayer 不僅僅是一個簡單的 i18n 解決方案。它還提供了一個 **支援自託管的[視覺化編輯器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_visual_editor.md)** 以及一個 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md)**。藉此，您可以 **即時** 管理多語言內容，並讓譯者、文案及其他團隊成員之間的協作變得無縫。內容可以儲存在本地和/或遠端伺服器上。

</Accordion>
</AccordionGroup>

## 主要功能

Intlayer 提供了多種功能，旨在滿足現代 Web 開發的需求。以下是主要功能，以及每個功能的詳細文件連結：

- **國際化支援**：透過內建的國際化支援，增強應用程式的全球覆蓋範圍。
- **視覺化編輯器**：使用專為 Intlayer 設計的編輯器外掛，改善您的開發工作流程。請查看 [視覺化編輯器指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_visual_editor.md)。
- **設定靈活性**：透過 [設定指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/configuration.md) 中詳細說明的廣泛設定選項，自訂您的設定。
- **進階 CLI 工具**：使用 Intlayer 的命令列介面高效管理您的專案。在 [CLI 工具文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/cli/index.md) 中探索相關功能。

## 核心概念

### 字典

將多語言內容整理到離程式碼較近的位置，以保持所有內容的一致性和可維護性。

- **[快速入門](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/content_file.md)**  
  學習在 Intlayer 中宣告內容的基礎知識。

- **[翻譯](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/translation.md)**  
  了解在應用程式中如何產生、儲存和利用翻譯。

- **[枚舉](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/enumeration.md)**  
  輕鬆管理各種語言中重複或固定的資料集。

- **[條件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/condition.md)**  
  了解如何在 Intlayer 中使用條件邏輯來建立動態內容。

- **[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/insertion.md)**
  探索如何使用插入佔位符將值插入字串中。

- **[函數獲取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/function_fetching.md)**  
  查看如何使用自訂邏輯動態獲取內容，以符合您的專案工作流程。

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/markdown.md)**  
  了解如何在 Intlayer 中使用 Markdown 來建立富文本內容。

- **[檔案嵌入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/file.md)**  
  發現如何在 Intlayer 中嵌入外部檔案，以便在內容編輯器中使用。

- **[嵌套](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/dictionary/nesting.md)**  
  了解如何在 Intlayer 中嵌套內容以建立複雜的結構。

### 環境與整合

我們在建構 Intlayer 時考慮到了靈活性，提供了在主流框架和建置工具中的無縫整合：

- **[Intlayer 與 Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nextjs_16.md)**
- **[Intlayer 與 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nextjs_15.md)**
- **[Intlayer 與 Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nextjs_14.md)**
- **[Intlayer 與 Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 與 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_create_react_app.md)**
- **[Intlayer 與 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_vite+react.md)**
- **[Intlayer 與 React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_react_router_v7.md)**
- **[Intlayer 與 Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_tanstack.md)**
- **[Intlayer 與 React Native 及 Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_react_native+expo.md)**
- **[Intlayer 與 Lynx 及 React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_lynx+react.md)**
- **[Intlayer 與 Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_vite+preact.md)**
- **[Intlayer 與 Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_vite+vue.md)**
- **[Intlayer 與 Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nuxt.md)**
- **[Intlayer 與 Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_vite+svelte.md)**
- **[Intlayer 與 SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_svelte_kit.md)**
- **[Intlayer 與 Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_express.md)**
- **[Intlayer 與 NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_nestjs.md)**
- **[Intlayer 與 Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_hono.md)**
- **[Intlayer 與 Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_with_angular_21.md)**

每篇整合指南都包含了使用 Intlayer 功能的最佳實踐，例如 **伺服器端渲染**、**動態路由** 或 **客戶端渲染**，以便您可以維護一個快速、SEO 友善且高度可擴展的應用程式。

## 貢獻與反饋

我們非常重視開源和社群驅動開發的力量。如果您想提出改進建議、新增指南或糾正我們文件中的任何問題，請隨時提交 Pull Request 或在我們的 [GitHub 儲存庫](https://github.com/aymericzip/intlayer/blob/main/docs/docs) 中提出 Issue。

**準備好更快速、更高效地翻譯您的應用程式了嗎？** 立即深入我們的文件，開始使用 Intlayer。體驗一個強大且精簡的國際化方法，讓您的內容井井有條，並提高您的團隊工作效率。
