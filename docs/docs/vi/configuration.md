---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Cấu hình (Configuration)
description: Tìm hiểu cách cấu hình Intlayer cho ứng dụng của bạn. Hiểu các cài đặt và tùy chọn khác nhau có sẵn để tùy chỉnh Intlayer theo nhu cầu của bạn.
keywords:
  - Cấu hình
  - Cài đặt
  - Tùy chỉnh
  - Intlayer
  - Tùy chọn
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Thêm ký hiệu đối tượng theo từng ngôn ngữ cho 'compiler.output' và 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Chuyển 'baseDir' từ cấu hình 'content' sang cấu hình 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Cập nhật các tùy chọn của trình biên dịch (compiler), thêm hỗ trợ cho 'output' và 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Cập nhật tùy chọn trình biên dịch
  - version: 8.1.5
    date: 2026-02-23
    changes: Thêm tùy chọn trình biên dịch 'build-only' và tiền tố từ điển
  - version: 8.0.6
    date: 2026-02-12
    changes: Thêm hỗ trợ cho các nhà cung cấp Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face và Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Thêm `dataSerialization` vào cấu hình AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Đổi tên chế độ nhập `live` thành `fetch` để mô tả tốt hơn cơ chế cơ bản.
  - version: 8.0.0
    date: 2026-01-22
    changes: Chuyển cấu hình build `importMode` sang cấu hình từ điển `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Thêm tùy chọn `rewrite` cho cấu hình routing
  - version: 8.0.0
    date: 2026-01-18
    changes: Tách cấu hình hệ thống khỏi cấu hình nội dung. Chuyển các đường dẫn nội bộ vào thuộc tính `system`. Thêm `codeDir` để tách biệt các tệp nội dung và chuyển đổi mã.
  - version: 8.0.0
    date: 2026-01-18
    changes: Thêm các tùy chọn từ điển `location` và `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Thêm hỗ trợ cho các định dạng tệp JSON5 và JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Thêm tùy chọn `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Thêm cấu hình `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Thay thế `middleware` bằng cấu hình routing `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Thêm tùy chọn `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Cập nhật tùy chọn `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Thêm tùy chọn `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Xóa trường `dictionaryOutput` và trường `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Thêm chế độ nhập `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Thay thế trường `hotReload` bằng `liveSync`, và thêm các trường `liveSyncPort` và `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Thay thế `activateDynamicImport` bằng tùy chọn `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Thay đổi contentDir mặc định từ `['src']` thành `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Thêm các lệnh `docs`
---

# Tài liệu Cấu hình Intlayer

## Tổng quan

Các tệp cấu hình Intlayer cho phép bạn tùy chỉnh các khía cạnh khác nhau của plugin, chẳng hạn như quốc tế hóa (internationalization), middleware và xử lý nội dung. Tài liệu này cung cấp mô tả chi tiết về từng thuộc tính trong cấu hình.

---

## Mục lục

<TOC/>

---

## Các định dạng tệp cấu hình được hỗ trợ

Intlayer chấp nhận các định dạng tệp cấu hình JSON, JS, MJS và TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Ví dụ tệp cấu hình

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Ví dụ tệp cấu hình Intlayer hiển thị tất cả các tùy chọn có sẵn.
 */
const config: IntlayerConfig = {
  /**
   * Cấu hình cài đặt quốc tế hóa.
   */
  internationalization: {
    /**
     * Danh sách các ngôn ngữ (locales) được hỗ trợ trong ứng dụng.
     * Mặc định: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Danh sách các ngôn ngữ bắt buộc phải được định nghĩa trong mỗi từ điển.
     * Nếu để trống, tất cả các ngôn ngữ đều bắt buộc trong chế độ `strict`.
     * Mặc định: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Mức độ nghiêm ngặt cho nội dung được quốc tế hóa.
     * - "strict": Báo lỗi nếu thiếu bất kỳ ngôn ngữ nào đã khai báo hoặc nếu không được khai báo.
     * - "inclusive": Cảnh báo nếu thiếu ngôn ngữ đã khai báo.
     * - "loose": Chấp nhận bất kỳ ngôn ngữ nào hiện có.
     * Mặc định: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Ngôn ngữ mặc định được sử dụng làm phương án dự phòng (fallback) trong trường hợp không tìm thấy ngôn ngữ yêu cầu.
     * Mặc định: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Các cài đặt kiểm soát hoạt động của từ điển và hành vi dự phòng.
   */
  dictionary: {
    /**
     * Kiểm soát cách nhập từ điển.
     * - "static": Được nhập tĩnh tại thời điểm build.
     * - "dynamic": Được nhập động bằng Suspense.
     * - "fetch": Được truy xuất động qua Live Sync API.
     * Mặc định: "static"
     */
    importMode: "static",

    /**
     * Chiến lược tự động điền các bản dịch còn thiếu bằng AI.
     * Có thể là giá trị boolean hoặc một mẫu đường dẫn để lưu nội dung được điền.
     * Mặc định: true
     */
    fill: true,

    /**
     * Vị trí vật lý của các tệp từ điển.
     * - "local": Được lưu trữ trong hệ thống tệp cục bộ.
     * - "remote": Được lưu trữ trong Intlayer CMS.
     * - "hybrid": Được lưu trữ cả cục bộ và trong Intlayer CMS.
     * - "plugin" (hoặc bất kỳ chuỗi tùy chỉnh nào): Được cung cấp bởi một plugin hoặc nguồn tùy chỉnh.
     * Mặc định: "local"
     */
    location: "local",

    /**
     * Nội dung có nên được tự động chuyển đổi hay không (ví dụ: Markdown sang HTML).
     * Mặc định: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Cấu hình routing và middleware.
   */
  routing: {
    /**
     * Chiến lược định tuyến ngôn ngữ.
     * - "prefix-no-default": Thêm tiền tố cho tất cả trừ ngôn ngữ mặc định (ví dụ: /dashboard, /fr/dashboard).
     * - "prefix-all": Thêm tiền tố cho tất cả các ngôn ngữ (ví dụ: /en/dashboard, /fr/dashboard).
     * - "no-prefix": Không có ngôn ngữ trong URL.
     * - "search-params": Sử dụng ?locale=...
     * Mặc định: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Nơi lưu trữ ngôn ngữ đã chọn của người dùng.
     * Tùy chọn: 'cookie', 'localStorage', 'sessionStorage', 'header' hoặc mảng của chúng.
     * Mặc định: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Đường dẫn cơ sở cho các URL của ứng dụng.
     * Mặc định: ""
     */
    basePath: "",

    /**
     * Các quy tắc ghi đè URL tùy chỉnh cho các đường dẫn cụ thể theo từng ngôn ngữ.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Các cài đặt liên quan đến việc tìm kiếm và xử lý tệp nội dung.
   */
  content: {
    /**
     * Phần mở rộng tệp để quét từ điển.
     * Mặc định: ['.content.ts', '.content.js', '.content.json', v.v.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Các thư mục chứa các tệp .content.
     * Mặc định: ["."]
     */
    contentDir: ["src"],

    /**
     * Nơi chứa mã nguồn.
     * Được sử dụng để tối ưu hóa build và chuyển đổi mã.
     * Mặc định: ["."]
     */
    codeDir: ["src"],

    /**
     * Các mẫu bị loại trừ khỏi quá trình quét.
     * Mặc định: ['node_modules', '.intlayer', v.v.]
     */
    excludedPath: ["node_modules"],

    /**
     * Có theo dõi các thay đổi và build lại từ điển trong quá trình phát triển không.
     * Mặc định: true trong môi trường phát triển
     */
    watch: true,

    /**
     * Lệnh được sử dụng để định dạng các tệp .content mới tạo / cập nhật.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Cấu hình Trình chỉnh sửa trực quan (Visual Editor).
   */
  editor: {
    /**
     * Có bật trình chỉnh sửa trực quan hay không.
     * Mặc định: false
     */
    enabled: true,

    /**
     * URL ứng dụng của bạn để xác thực nguồn (origin validation).
     * Mặc định: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Cổng cho máy chủ trình chỉnh sửa cục bộ.
     * Mặc định: 8000
     */
    port: 8000,

    /**
     * URL công khai cho trình chỉnh sửa.
     * Mặc định: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL của Intlayer CMS.
     * Mặc định: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL của Backend API.
     * Mặc định: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Có bật đồng bộ nội dung thời gian thực không.
     * Mặc định: false
     */
    liveSync: true,
  },

  /**
   * Các cài đặt cho việc dịch và build dựa trên AI.
   */
  ai: {
    /**
     * Nhà cung cấp AI sẽ sử dụng.
     * Tùy chọn: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Mặc định: 'openai'
     */
    provider: "openai",

    /**
     * Model của nhà cung cấp đã chọn để sử dụng.
     */
    model: "gpt-4o",

    /**
     * API key của nhà cung cấp.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Ngữ cảnh toàn cục để hướng dẫn AI khi build các bản dịch.
     */
    applicationContext: "Đây là một ứng dụng đặt vé du lịch.",

    /**
     * URL đường dẫn cơ sở cho AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Tuần tự hóa dữ liệu (Data Serialization)
     *
     * Tùy chọn:
     * - "json": Mặc định, mạnh mẽ; tiêu tốn nhiều token hơn.
     * - "toon": Tiêu tốn ít token hơn, có thể không nhất quán như JSON.
     *
     * Mặc định: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Các cài đặt build và tối ưu hóa.
   */
  build: {
    /**
     * Chế độ thực thi build.
     * - "auto": Sẽ được build tự động trong quá trình build ứng dụng.
     * - "manual": Yêu cầu lệnh build rõ ràng.
     * Mặc định: "auto"
     */
    mode: "auto",

    /**
     * Có tối ưu hóa bundle cuối cùng bằng cách loại bỏ các từ điển không sử dụng không.
     * Mặc định: true trong môi trường production
     */
    optimize: true,

    /**
     * Định dạng đầu ra cho các tệp từ điển được tạo.
     * Mặc định: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Xác định xem tiến trình build có nên kiểm tra các kiểu TypeScript hay không.
     * Mặc định: false
     */
    checkTypes: false,
  },

  /**
   * Cấu hình trình ghi nhật ký (Logger).
   */
  log: {
    /**
     * Mức độ ghi nhật ký.
     * - "default": Ghi nhật ký tiêu chuẩn.
     * - "verbose": Ghi nhật ký gỡ lỗi chuyên sâu.
     * - "disabled": Tắt ghi nhật ký.
     * Mặc định: "default"
     */
    mode: "default",

    /**
     * Tiền tố cho tất cả các thông báo nhật ký.
     * Mặc định: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Cấu hình hệ thống (Để sử dụng nâng cao)
   */
  system: {
    /**
     * Thư mục để lưu trữ các từ điển đã được bản địa hóa.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Thư mục cho việc mở rộng module TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Thư mục để lưu trữ các từ điển chưa hợp nhất (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Thư mục để lưu trữ các kiểu từ điển.
     */
    typesDir: ".intlayer/types",

    /**
     * Thư mục chứa các tệp ứng dụng chính.
     */
    mainDir: ".intlayer/main",

    /**
     * Thư mục chứa các tệp cấu hình.
     */
    configDir: ".intlayer/config",

    /**
     * Thư mục chứa các tệp bộ nhớ đệm (cache).
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Cấu hình Trình biên dịch (Để sử dụng nâng cao)
   */
  compiler: {
    /**
     * Xác định xem trình biên dịch có nên được bật hay không.
     *
     * - false: Tắt trình biên dịch.
     * - true: Bật trình biên dịch.
     * - "build-only": Bỏ qua trình biên dịch trong quá trình phát triển và tăng tốc thời gian khởi động.
     *
     * Mặc định: false
     */
    enabled: true,

    /**
     * Định nghĩa đường dẫn cho các tệp đầu ra. Thay thế `outputDir`.
     *
     * - Các đường dẫn có `./` được giải quyết tương đối với thư mục thành phần.
     * - Các đường dẫn có `/` được giải quyết tương đối với thư mục gốc của dự án (`baseDir`).
     *
     * - Việc bao gồm biến `{{locale}}` trong đường dẫn sẽ kích hoạt việc tạo các từ điển riêng biệt cho từng ngôn ngữ.
     *
     * Ví dụ:
     * ```ts
     * {
     *   // Tạo các tệp .content.ts đa ngôn ngữ bên cạnh thành phần
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Tương đương khi sử dụng template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Tạo các tệp JSON tập trung cho từng ngôn ngữ tại thư mục gốc của dự án
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Tương đương khi sử dụng template string
     * }
     * ```
     *
     * Danh sách các biến:
     *   - `fileName`: Tên tệp.
     *   - `key`: Khóa nội dung (key).
     *   - `locale`: Ngôn ngữ nội dung.
     *   - `extension`: Phần mở rộng tệp.
     *   - `componentFileName`: Tên tệp thành phần.
     *   - `componentExtension`: Phần mở rộng tệp thành phần.
     *   - `format`: Định dạng từ điển.
     *   - `componentFormat`: Định dạng từ điển thành phần.
     *   - `componentDirPath`: Đường dẫn thư mục thành phần.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Xác định xem các thành phần có nên được lưu sau khi được chuyển đổi hay không.
     * Theo cách này, trình biên dịch có thể chỉ chạy một lần để chuyển đổi ứng dụng của bạn và sau đó được gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Chỉ chèn nội dung vào tệp được tạo. Hữu ích cho đầu ra JSON theo từng ngôn ngữ cho i18next hoặc ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Tiền tố khóa từ điển
     */
    dictionaryKeyPrefix: "", // Thêm một tiền tố tùy chọn vào các khóa từ điển được trích xuất
  },

  /**
   * Các schema tùy chỉnh (Schemas) để xác thực nội dung từ điển.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Cấu hình các plugin (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Tham chiếu cấu hình (Configuration Reference)

Các phần sau đây mô tả các tùy chọn cấu hình khác nhau có sẵn trong Intlayer.

---

### Cấu hình quốc tế hóa (Internationalization Configuration)

Định nghĩa các cài đặt liên quan đến quốc tế hóa, bao gồm các ngôn ngữ có sẵn và ngôn ngữ mặc định cho ứng dụng.

| Trường            | Kiểu       | Mô tả                                                                                                         | Ví dụ                | Lưu ý                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | `string[]` | Danh sách các ngôn ngữ được hỗ trợ trong ứng dụng. Mặc định: `[Locales.ENGLISH]`                              | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                            |
| `requiredLocales` | `string[]` | Danh sách các ngôn ngữ bắt buộc trong ứng dụng. Mặc định: `[]`                                                | `[]`                 | Nếu để trống, tất cả các ngôn ngữ đều bắt buộc trong chế độ `strict`. Đảm bảo các ngôn ngữ bắt buộc cũng được định nghĩa trong trường `locales`.                                                                                                                                           |
| `strictMode`      | `string`   | Đảm bảo triển khai mạnh mẽ nội dung được quốc tế hóa thông qua việc sử dụng TypeScript. Mặc định: `inclusive` |                      | Nếu `"strict"`: hàm `t` yêu cầu mọi ngôn ngữ đã khai báo phải được định nghĩa — báo lỗi nếu thiếu hoặc không được khai báo. Nếu `"inclusive"`: cảnh báo về các ngôn ngữ bị thiếu nhưng chấp nhận các ngôn ngữ chưa khai báo hiện có. Nếu `"loose"`: chấp nhận bất kỳ ngôn ngữ nào hiện có. |
| `defaultLocale`   | `string`   | Ngôn ngữ mặc định được sử dụng làm dự phòng nếu không tìm thấy ngôn ngữ yêu cầu. Mặc định: `Locales.ENGLISH`  | `'en'`               | Được sử dụng để xác định ngôn ngữ khi không có ngôn ngữ nào được chỉ định trong URL, cookie hoặc header.                                                                                                                                                                                   |

---

### Cấu hình trình chỉnh sửa (Editor Configuration)

Định nghĩa các cài đặt liên quan đến trình chỉnh sửa tích hợp, bao gồm cổng máy chủ và trạng thái hoạt động.

| Trường                       | Kiểu                      | Mô tả                                                                                                                                                                          | Ví dụ                                                                                 | Lưu ý                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | `string`                  | URL ứng dụng của bạn. Mặc định: `''`                                                                                                                                           | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Được sử dụng để hạn chế các nguồn (origins) của trình chỉnh sửa vì lý do bảo mật. Nếu được đặt thành `'*'`, trình chỉnh sửa có thể được truy cập từ bất kỳ nguồn nào.                                                    |
| `port`                       | `number`                  | Cổng được sử dụng bởi máy chủ Trình chỉnh sửa trực quan. Mặc định: `8000`                                                                                                      |                                                                                       |                                                                                                                                                                                                                          |
| `editorURL`                  | `string`                  | URL máy chủ trình chỉnh sửa. Mặc định: `'http://localhost:8000'`                                                                                                               | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Được sử dụng để hạn chế các nguồn có thể tương tác với ứng dụng. Nếu được đặt thành `'*'`, có thể truy cập từ bất kỳ nguồn nào. Phải được đặt nếu bạn thay đổi cổng hoặc trình chỉnh sửa được host trên một domain khác. |
| `cmsURL`                     | `string`                  | URL của Intlayer CMS. Mặc định: `'https://intlayer.org'`                                                                                                                       | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                          |
| `backendURL`                 | `string`                  | URL của máy chủ backend. Mặc định: `https://back.intlayer.org`                                                                                                                 | `http://localhost:4000`                                                               |                                                                                                                                                                                                                          |
| `enabled`                    | `boolean`                 | Xác định xem ứng dụng có tương tác với trình chỉnh sửa trực quan hay không. Mặc định: `true`                                                                                   | `process.env.NODE_ENV !== 'production'`                                               | Nếu là `false`, trình chỉnh sửa không thể tương tác với ứng dụng. Tắt nó cho các môi trường cụ thể giúp tăng cường bảo mật.                                                                                              |
| `clientId`                   | `string &#124; undefined` | Cho phép các gói intlayer xác thực với backend bằng oAuth2. Để nhận access token, hãy truy cập [intlayer.org/project](https://app.intlayer.org/project). Mặc định: `undefined` |                                                                                       | Giữ bí mật; lưu trữ trong biến môi trường.                                                                                                                                                                               |
| `clientSecret`               | `string &#124; undefined` | Cho phép các gói intlayer xác thực với backend bằng oAuth2. Để nhận access token, hãy truy cập [intlayer.org/project](https://app.intlayer.org/project). Mặc định: `undefined` |                                                                                       | Giữ bí mật; lưu trữ trong biến môi trường.                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | `string`                  | Chiến lược ưu tiên từ điển khi tồn tại cả từ điển cục bộ và từ xa. Mặc định: `'local_first'`                                                                                   | `'distant_first'`                                                                     | `'distant_first'`: Ưu tiên từ xa thay vì cục bộ. `'local_first'`: Ưu tiên cục bộ thay vì từ xa.                                                                                                                          |
| `liveSync`                   | `boolean`                 | Xác định xem máy chủ ứng dụng có nên hot reload nội dung khi phát hiện thay đổi trong CMS / Trình chỉnh sửa trực quan / Backend hay không. Mặc định: `true`                    | `true`                                                                                | Khi một từ điển được thêm/cập nhật, ứng dụng sẽ cập nhật nội dung trang. Live sync thuê ngoài nội dung cho một máy chủ khác, điều này có thể ảnh hưởng nhẹ đến hiệu năng. Khuyến nghị host cả hai trên cùng một máy.     |
| `liveSyncPort`               | `number`                  | Cổng máy chủ Live Sync. Mặc định: `4000`                                                                                                                                       | `4000`                                                                                |                                                                                                                                                                                                                          |
| `liveSyncURL`                | `string`                  | URL máy chủ Live Sync. Mặc định: `'http://localhost:{liveSyncPort}'`                                                                                                           | `'https://example.com'`                                                               | Chỉ đến localhost theo mặc định; có thể thay đổi thành máy chủ live sync từ xa.                                                                                                                                          |

### Cấu hình routing (Routing Configuration)

Các cài đặt kiểm soát hành vi định tuyến, bao gồm cấu trúc URL, lưu trữ ngôn ngữ và xử lý middleware.

| Trường     | Kiểu                                                                                                                                                 | Mô tả                                                                                                                                                   | Ví dụ                                                                                                                                                                                                                | Lưu ý                                                                                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Chế độ routing URL để xử lý ngôn ngữ. Mặc định: `'prefix-no-default'`                                                                                   | `'prefix-no-default'`: `/dashboard` (en) hoặc `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: ngôn ngữ được xử lý bằng các phương tiện khác. `'search-params'`: sử dụng `/dashboard?locale=fr` | Không ảnh hưởng đến quản lý cookie hoặc lưu trữ ngôn ngữ (locale storage).                                                                                                                                                                          |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Cấu hình để lưu trữ ngôn ngữ trên client. Mặc định: `['cookie', 'header']`                                                                              | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                        | Xem bảng Tùy chọn lưu trữ bên dưới.                                                                                                                                                                                                                 |
| `basePath` | `string`                                                                                                                                             | Đường dẫn cơ sở cho các URL của ứng dụng. Mặc định: `''`                                                                                                | `'/my-app'`                                                                                                                                                                                                          | Nếu ứng dụng nằm trên `https://example.com/my-app`, basePath là `'/my-app'` và các URL trở thành `https://example.com/my-app/en`.                                                                                                                   |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Các quy tắc ghi đè URL tùy chỉnh thay thế chế độ định tuyến mặc định cho các đường dẫn cụ thể. Hỗ trợ các tham số động `[param]`. Mặc định: `undefined` | Xem ví dụ bên dưới                                                                                                                                                                                                   | Các quy tắc ghi đè có ưu tiên hơn `mode`. Hoạt động với Next.js và Vite. `getLocalizedUrl()` tự động áp dụng các quy tắc phù hợp. Xem [Ghi đè URL tùy chỉnh](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/custom_url_rewrites.md). |

**Ví dụ về `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Chiến lược dự phòng
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Tùy chọn lưu trữ (Storage Options)

| Giá trị            | Mô tả                                                                      | Lưu ý                                                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Lưu ngôn ngữ trong cookie — có thể truy cập từ cả phía client và server.   | Để tuân thủ GDPR, hãy đảm bảo đã nhận được sự đồng ý thích hợp của người dùng. Có thể tùy chỉnh qua `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Lưu ngôn ngữ trong trình duyệt mà không có ngày hết hạn — chỉ phía client. | Không hết hạn trừ khi bị xóa rõ ràng. Proxy của Intlayer không thể truy cập cái này. Có thể tùy chỉnh qua `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                    |
| `'sessionStorage'` | Lưu ngôn ngữ trong suốt thời gian của phiên trang — chỉ phía client.       | Bị xóa khi đóng tab/cửa sổ. Proxy của Intlayer không thể truy cập cái này. Có thể tùy chỉnh qua `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                            |
| `'header'`         | Lưu hoặc truyền ngôn ngữ qua các HTTP header — chỉ phía server.            | Hữu ích cho các cuộc gọi API. Phía client không thể truy cập. Có thể tùy chỉnh qua `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                 |

#### Thuộc tính Cookie (Cookie Attributes)

Khi sử dụng lưu trữ qua cookie, bạn có thể cấu hình các thuộc tính cookie bổ sung:

| Trường     | Kiểu                                  | Mô tả                                            |
| ---------- | ------------------------------------- | ------------------------------------------------ |
| `name`     | `string`                              | Tên của cookie. Mặc định: `'INTLAYER_LOCALE'`    |
| `domain`   | `string`                              | Domain của cookie. Mặc định: `undefined`         |
| `path`     | `string`                              | Đường dẫn của cookie. Mặc định: `undefined`      |
| `secure`   | `boolean`                             | Yêu cầu HTTPS. Mặc định: `undefined`             |
| `httpOnly` | `boolean`                             | Cờ HTTP-only. Mặc định: `undefined`              |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Chính sách SameSite.                             |
| `expires`  | `Date &#124; number`                  | Ngày hết hạn hoặc số ngày. Mặc định: `undefined` |

#### Thuộc tính lưu trữ ngôn ngữ (Locale Storage Attributes)

Khi sử dụng localStorage hoặc sessionStorage:

| Trường | Kiểu                                     | Mô tả                                               |
| ------ | ---------------------------------------- | --------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Kiểu lưu trữ.                                       |
| `name` | `string`                                 | Tên của khóa lưu trữ. Mặc định: `'INTLAYER_LOCALE'` |

#### Các ví dụ cấu hình

Dưới đây là một số ví dụ cấu hình phổ biến cho cấu trúc định tuyến v7 mới:

**Cấu hình cơ bản (Mặc định)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Cấu hình tuân thủ GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Chế độ tham số tìm kiếm (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Chế độ không tiền tố (No Prefix Mode) với lưu trữ tùy chỉnh**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Ghi đè URL tùy chỉnh với đường dẫn động**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Chiến lược dự phòng cho các đường dẫn không được ghi đè
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Cấu hình nội dung (Content Configuration)

Các cài đặt liên quan đến việc xử lý nội dung trong ứng dụng (tên thư mục, phần mở rộng tệp và các cấu hình phái sinh).

| Trường           | Kiểu       | Mô tả                                                                                                                                                                                                | Ví dụ                               | Lưu ý                                                                                                                     |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Xác định xem Intlayer có nên theo dõi các thay đổi trong các tệp khai báo nội dung để build lại từ điển hay không. Mặc định: `process.env.NODE_ENV === 'development'`                                |                                     |                                                                                                                           |
| `fileExtensions` | `string[]` | Các phần mở rộng tệp được sử dụng để quét các tệp khai báo nội dung. Mặc định: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                           |
| `contentDir`     | `string[]` | Đường dẫn đến các thư mục chứa các tệp khai báo nội dung. Mặc định: `['.']`                                                                                                                          | `['src/content']`                   |                                                                                                                           |
| `codeDir`        | `string[]` | Đường dẫn đến các thư mục chứa các tệp mã nguồn của ứng dụng. Mặc định: `['.']`                                                                                                                      | `['src']`                           | Được sử dụng để tối ưu hóa build và đảm bảo rằng việc chuyển đổi mã và hot reload chỉ được áp dụng cho các tệp cần thiết. |
| `excludedPath`   | `string[]` | Các đường dẫn bị loại trừ khỏi việc quét nội dung. Mặc định: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                               | `['src/styles']`                    |                                                                                                                           |
| `formatCommand`  | `string`   | Lệnh sẽ được chạy để định dạng các tệp nội dung mới tạo hoặc cập nhật. Mặc định: `undefined`                                                                                                         | `'npx prettier --write "{{file}}"'` | Được sử dụng trong quá trình trích xuất nội dung hoặc qua trình chỉnh sửa trực quan.                                      |

---

### Cấu hình từ điển (Dictionary Configuration)

Các cài đặt kiểm soát hoạt động của từ điển, bao gồm hành vi tự động điền và tạo nội dung.

Cấu hình từ điển này có hai mục đích chính:

1. **Giá trị mặc định**: Định nghĩa các giá trị mặc định khi tạo các tệp khai báo nội dung.
2. **Hành vi dự phòng**: Cho phép thiết lập hành vi của các hoạt động từ điển trên toàn cầu, cung cấp các giá trị dự phòng khi các trường cụ thể không được định nghĩa.

Để biết thêm thông tin về cách áp dụng các tệp khai báo nội dung và giá trị cấu hình, hãy xem [tài liệu tệp nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

| Trường                      | Kiểu                                                                                            | Mô tả                                                                                                  | Ví dụ              | Lưu ý                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Kiểm soát cách tạo các tệp đầu ra tự động điền (dịch bằng AI). Mặc định: `true`                        | Xem ví dụ bên dưới | `true`: đường dẫn mặc định (cùng tệp với nguồn). `false`: tắt. Các mẫu chuỗi/hàm tạo các tệp theo từng ngôn ngữ. Đối tượng theo từng ngôn ngữ: mỗi ngôn ngữ ánh xạ tới mẫu riêng; `false` sẽ bỏ qua ngôn ngữ đó. Việc bao gồm biến `{{locale}}` sẽ kích hoạt việc tạo theo từng ngôn ngữ. `fill` ở cấp độ từ điển luôn được ưu tiên hơn cấu hình toàn cầu này. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Kiểm soát cách nhập từ điển. Mặc định: `'static'`                                                      | `'dynamic'`        | `'static'`: Được nhập tĩnh. `'dynamic'`: Được nhập động qua 'Suspense'. `'fetch'`: Được truy xuất động qua 'Live Sync API'. Không ảnh hưởng đến `getIntlayer`, `getDictionary`, `useDictionary`, v.v.                                                                                                                                                          |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Nơi lưu trữ từ điển. Mặc định: `'local'`                                                               | `'remote'`         | `'local'`: hệ thống tệp. `'remote'`: Intlayer CMS. `'hybrid'`: cả hai.                                                                                                                                                                                                                                                                                         |
| `contentAutoTransformation` | `boolean`                                                                                       | Có nên tự động chuyển đổi các tệp nội dung hay không (ví dụ: từ Markdown sang HTML). Mặc định: `false` | `true`             | Hữu ích để xử lý các trường Markdown qua @intlayer/markdown.                                                                                                                                                                                                                                                                                                   |

**Ví dụ về `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Cấu hình AI (AI Configuration)

Định nghĩa các cài đặt cho các tính năng được hỗ trợ bởi AI của Intlayer, chẳng hạn như bản dịch build.

| Trường               | Kiểu                   | Mô tả                                                                           | Ví dụ                                       | Lưu ý                                                                                             |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Nhà cung cấp AI sẽ sử dụng.                                                     | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                   |
| `model`              | `string`               | Model AI sẽ sử dụng.                                                            | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                   |
| `apiKey`             | `string`               | API key cho nhà cung cấp đã chọn.                                               | `process.env.OPENAI_API_KEY`                |                                                                                                   |
| `applicationContext` | `string`               | Ngữ cảnh bổ sung về ứng dụng của bạn để cải thiện độ chính xác của bản dịch AI. | `'Nền tảng học tập cho trẻ em.'`            |                                                                                                   |
| `baseURL`            | `string`               | URL đường dẫn cơ sở tùy chọn cho các cuộc gọi API.                              |                                             | Hữu ích nếu bạn đang sử dụng proxy hoặc triển khai AI cục bộ.                                     |
| `dataSerialization`  | `'json' &#124; 'toon'` | Định nghĩa cách gửi dữ liệu cho AI. Mặc định: `'json'`                          | `'json'`                                    | `'json'`: mạnh mẽ và chính xác hơn. `'toon'`: tiêu tốn ít token hơn nhưng có thể kém ổn định hơn. |

---

### Cấu hình build (Build Configuration)

Các cài đặt của quá trình build và tối ưu hóa Intlayer.

| Trường         | Kiểu                     | Mô tả                                                                                                             | Ví dụ | Lưu ý |
| -------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----- | ----- |
| `mode`         | `'auto' &#124; 'manual'` | Xác định xem Intlayer có nên chạy tự động trong các bước pre-build của ứng dụng hay không. Mặc định: `'auto'`     |       |       |
| `optimize`     | `boolean`                | Xác định xem các từ điển đã biên dịch có nên được tối ưu hóa cho runtime không. Mặc định: `true` trong production |       |       |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Định dạng đầu ra cho các tệp từ điển được tạo. Mặc định: `['cjs', 'esm']`                                         |       |       |
| `checkTypes`   | `boolean`                | Xác định xem Intlayer có nên kiểm tra các kiểu trong các tệp được tạo hay không. Mặc định: `false`                |       |       |

---

### Cấu hình hệ thống (System Configuration)

Các cài đặt này dành cho các trường hợp sử dụng nâng cao và cho cấu hình nội bộ của Intlayer.

| Trường                    | Kiểu     | Mô tả                                       | Mặc định                          |
| ------------------------- | -------- | ------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Thư mục từ điển đã biên dịch.               | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Thư mục cho việc mở rộng module TypeScript. | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Thư mục từ điển chưa hợp nhất.              | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Thư mục các kiểu đã tạo.                    | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Thư mục tệp Intlayer chính.                 | `'.intlayer/main'`                |
| `configDir`               | `string` | Thư mục các tệp cấu hình đã biên dịch.      | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Thư mục các tệp bộ nhớ đệm.                 | `'.intlayer/cache'`               |

---

### Cấu hình trình biên dịch (Compiler Configuration)

Cài đặt cho trình biên dịch Intlayer (`intlayer compiler`).

| Trường                | Kiểu                     | Mô tả                                                                                         | Mặc định |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------------- | -------- |
| `enabled`             | `boolean`                | Xác định xem trình biên dịch có hoạt động không.                                              | `false`  |
| `output`              | `string &#124; Function` | Đường dẫn đầu ra cho các từ điển được trích xuất.                                             |          |
| `saveComponents`      | `boolean`                | Xác định xem các tệp nguồn gốc có nên được ghi đè bằng các phiên bản đã chuyển đổi hay không. | `false`  |
| `noMetadata`          | `boolean`                | Nếu là `true`, trình biên dịch sẽ không bao gồm metadata trong các tệp được tạo.              | `false`  |
| `dictionaryKeyPrefix` | `string`                 | Tiền tố khóa từ điển tùy chọn.                                                                | `''`     |

---

### Cấu hình trình ghi nhật ký (Logger Configuration)

Các cài đặt để tùy chỉnh đầu ra nhật ký của Intlayer.

| Trường   | Kiểu                                           | Mô tả                      | Mặc định       |
| -------- | ---------------------------------------------- | -------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Chế độ ghi nhật ký.        | `'default'`    |
| `prefix` | `string`                                       | Tiền tố thông báo nhật ký. | `'[intlayer]'` |

---

### Schema tùy chỉnh (Custom Schemas)

| Trường    | Kiểu                        | Mô tả                                                                        |
| --------- | --------------------------- | ---------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Cho phép bạn định nghĩa các Zod schema để xác thực cấu trúc của các từ điển. |

---

### Plugin (Plugins)

| Trường    | Kiểu               | Mô tả                                        |
| --------- | ------------------ | -------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Danh sách các plugin Intlayer cần kích hoạt. |
