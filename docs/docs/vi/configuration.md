---
createdAt: 2024-08-13
updatedAt: 2026-08-22
title: Cấu hình (Configuration)
description: Tìm hiểu cách cấu hình Intlayer cho ứng dụng của bạn. Hiểu các cài đặt và tùy chọn khác nhau có sẵn để tùy chỉnh Intlayer theo nhu cầu của bạn.
keywords:
  - cấu hình
  - cài đặt
  - tùy chỉnh
  - Intlayer
  - tùy chọn
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Bật phân tích theo mặc định khi `@intlayer/analytics` được cài đặt"
  - version: 9.1.3
    date: 2026-08-06
    changes: "Chuyển `routing.enableProxy` thành ba trạng thái: không đặt (auto), `true`, `false`"
  - version: 9.0.0
    date: 2026-07-11
    changes: "Thêm cấu hình `analytics`"
  - version: 9.0.0
    date: 2026-06-24
    changes: "Add `enableProxy` option to the routing configuration"
  - version: 8.10.0
    date: 2026-06-17
    changes: "Thêm tùy chọn `format` vào cấu hình từ điển"
  - version: 8.9.4
    date: 2026-05-12
    changes: "Thêm hỗ trợ cho nhà cung cấp LM Studio"
  - version: 8.7.0
    date: 2026-04-07
    changes: "Thêm tùy chọn `minify` và `prune` vào cấu hình build"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Thêm tùy chọn `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Thêm hỗ trợ định nghĩa đường dẫn theo từng locale cho 'compiler.output' và 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Di chuyển 'baseDir' từ cấu hình 'content' sang cấu hình 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Cập nhật các tùy chọn compiler, thêm hỗ trợ cho 'output' và 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Cập nhật các tùy chọn compiler"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Thêm tùy chọn compiler 'build-only' và dictionary key prefix"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Thêm hỗ trợ cho các nhà cung cấp Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face và Together AI"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Thêm `dataSerialization` vào cấu hình AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Đổi tên chế độ import `live` thành `fetch` để mô tả tốt hơn cơ chế cơ bản."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Di chuyển cấu hình build `importMode` vào cấu hình `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Thêm tùy chọn `rewrite` vào cấu hình routing"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Tách cấu hình hệ thống khỏi cấu hình nội dung. Di chuyển các đường dẫn nội bộ sang thuộc tính `system`. Thêm `codeDir` để tách các tệp nội dung khỏi các chuyển đổi mã (code transformations)."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Thêm các tùy chọn dictionary `location` và `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Thêm hỗ trợ cho các định dạng tệp JSON5 và JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Thêm tùy chọn `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Thêm cấu hình `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Thay thế `middleware` bằng cấu hình `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Thêm tùy chọn `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Cập nhật tùy chọn `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Thêm tùy chọn `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Loại bỏ các trường `dictionaryOutput` và `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Thêm chế độ import `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Thay thế trường `hotReload` bằng `liveSync` và thêm các trường `liveSyncPort`, `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Thay thế tùy chọn `activateDynamicImport` bằng `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Thay đổi `contentDir` mặc định từ `['src']` thành `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Thêm các lệnh `docs`"
author: aymericzip
---

# Tài liệu Cấu hình Intlayer

## Tổng quan

Các tệp cấu hình Intlayer cho phép bạn tùy chỉnh các khía cạnh khác nhau của plugin, chẳng hạn như quốc tế hóa (i18n), middleware và quản lý nội dung. Tài liệu này cung cấp mô tả chi tiết về từng thuộc tính trong cấu hình.

---

## Mục lục

<TOC/>

---

## Hỗ trợ Tệp Cấu hình

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

## Ví dụ Tệp Cấu hình

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { syncJSON } from "@intlayer/sync-json-plugin";
import { z } from "zod";

/**
 * Ví dụ về tệp cấu hình Intlayer với tất cả các tùy chọn có sẵn.
 */
const config: IntlayerConfig = {
  /**
   * Cấu hình cài đặt quốc tế hóa.
   */
  internationalization: {
    /**
     * Danh sách các locale được hỗ trợ trong ứng dụng.
     * Mặc định: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Danh sách các locale bắt buộc phải được định nghĩa trong mỗi dictionary.
     * Nếu để trống, tất cả các locale đều bắt buộc trong chế độ `strict`.
     * Mặc định: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Mức độ nghiêm ngặt cho nội dung quốc tế hóa.
     * - "strict": Báo lỗi nếu thiếu các locale đã khai báo hoặc nếu khai báo các locale không có sẵn.
     * - "inclusive": Cảnh báo nếu thiếu các locale đã khai báo.
     * - "loose": Chấp nhận bất kỳ locale nào hiện có.
     * Mặc định: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Locale mặc định được sử dụng làm dự phòng nếu locale được yêu cầu không khả dụng.
     * Mặc định: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Cài đặt kiểm soát các hoạt động của dictionary và hành vi khi thiếu nội dung.
   */
  dictionary: {
    /**
     * Kiểm soát cách các dictionary được import.
     * - "static": Import tĩnh tại thời điểm build.
     * - "dynamic": Import động bằng cách sử dụng Suspense.
     * - "fetch": Lấy dữ liệu động thông qua Live Sync API.
     * Mặc định: "static"
     */
    importMode: "static",

    /**
     * Chiến lược tự động điền các bản dịch còn thiếu bằng AI.
     * Có thể là một boolean hoặc một pattern đường dẫn để lưu trữ nội dung đã điền.
     * Mặc định: true
     */
    fill: true,

    /**
     * Vị trí vật lý của các tệp dictionary.
     * - "local": Được lưu trữ trong hệ thống tệp cục bộ.
     * - "remote": Được lưu trữ trong Intlayer CMS.
     * - "hybrid": Được lưu trữ cả cục bộ và trong Intlayer CMS.
     * - "plugin" (hoặc bất kỳ chuỗi tùy chỉnh nào): Được cung cấp bởi một plugin hoặc nguồn tùy chỉnh.
     * Mặc định: "local"
     */
    location: "local",

    /**
     * Liệu có tự động chuyển đổi nội dung (ví dụ: Markdown sang HTML).
     * Mặc định: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Cấu hình routing và middleware.
   */
  routing: {
    /**
     * Chiến lược routing theo từng locale.
     * - "prefix-no-default": Tiền tố cho tất cả các locale ngoại trừ mặc định (ví dụ: /dashboard, /fr/dashboard).
     * - "prefix-all": Tiền tố cho tất cả các locale (ví dụ: /en/dashboard, /fr/dashboard).
     * - "no-prefix": Không có locale trong URL.
     * - "search-params": Sử dụng ?locale=...
     * Mặc định: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Bật proxy định tuyến locale của Intlayer (middleware).
     * Xử lý phát hiện locale, chuyển hướng và ghi lại URL ở dev, preview và SSR.
     * - không đặt (auto): máy chủ dev và preview giữ định tuyến theo URL bằng cách bỏ qua
     *   locale lưu trong cookie và header. Tiền tố vẫn được phân giải, locale vẫn được lưu,
     *   và phát hiện Accept-Language vẫn áp dụng. Ở production hoạt động như `true`.
     * - true: hành vi đầy đủ trong mọi môi trường.
     * - false: không định tuyến locale.
     * Mặc định: undefined (auto)
     */
    enableProxy: undefined,

    /**
     * Nơi lưu trữ locale được người dùng chọn.
     * Tùy chọn: 'cookie', 'localStorage', 'sessionStorage', 'header' hoặc một mảng của chúng.
     * Mặc định: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Đường dẫn cơ sở của URL ứng dụng.
     * Mặc định: ""
     */
    basePath: "",

    /**
     * Các quy tắc URL rewrite tùy chỉnh cho các đường dẫn cụ thể theo locale.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Ánh xạ các locale với tên máy chủ tên miền để routing dựa trên tên miền.
     * URL cho các locale này sẽ là tuyệt đối (ví dụ: https://intlayer.cn/).
     * Tên miền ngụ ý locale, vì vậy không có tiền tố locale nào được thêm vào đường dẫn.
     * Mặc định: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Cài đặt để khám phá và xử lý các tệp nội dung.
   */
  content: {
    /**
     * Các phần mở rộng tệp để quét các dictionary.
     * Mặc định: ['.content.ts', '.content.js', '.content.json', v.v.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Thư mục chứa các tệp .content.
     * Mặc định: ["."]
     */
    contentDir: ["src"],

    /**
     * Thư mục mã nguồn.
     * Được sử dụng để tối ưu hóa build và chuyển đổi mã.
     * Mặc định: ["."]
     */
    codeDir: ["src"],

    /**
     * Các pattern cần loại bỏ khỏi quá trình quét.
     * Mặc định: ['node_modules', '.intlayer', v.v.]
     */
    excludedPath: ["node_modules"],

    /**
     * Liệu có theo dõi các thay đổi và tạo lại các dictionary trong quá trình phát triển (development).
     * Mặc định: true trong chế độ development
     */
    watch: true,

    /**
     * Lệnh để định dạng các tệp .content mới tạo / cập nhật.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Cấu hình Visual Editor.
   */
  editor: {
    /**
     * Liệu Visual Editor có được bật hay không.
     * Mặc định: false
     */
    enabled: true,

    /**
     * URL ứng dụng của bạn để xác thực origin.
     * Mặc định: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Cổng của máy chủ editor cục bộ.
     * Mặc định: 8000
     */
    port: 8000,

    /**
     * URL công khai của editor.
     * Mặc định: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL của Intlayer CMS.
     * Mặc định: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL của máy chủ API backend.
     * Mặc định: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Liệu có bật đồng bộ hóa nội dung thời gian thực.
     * Mặc định: false
     */
    liveSync: true,
  },

  /**
   * Cấu hình phân tích (analytics).
   */
  analytics: {
    /**
     * Có bật thu thập dữ liệu phân tích hay không (lượt xem trang, hiển thị nội dung, sự kiện A/B).
     * Yêu cầu đã cài đặt `@intlayer/analytics` và thiết lập `editor.clientId` để phục vụ việc quy kết (attribution).
     * Mặc định: true
     */
    enabled: true,

    /**
     * Số mili giây giữa các lần gửi hàng loạt tự động đến backend.
     * Mặc định: 20000
     */
    flushInterval: 20000,

    /**
     * Tỷ lệ phiên được ghi lại, từ 0 (không có) đến 1 (tất cả).
     * Mặc định: 1
     */
    sampleRate: 1,
  },

  /**
   * Cài đặt cho các bản dịch và thế hệ (generation) bằng AI.
   */
  ai: {
    /**
     * Nhà cung cấp AI được sử dụng.
     * Tùy chọn: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai', 'lmstudio', 'moonshotai'
     * Mặc định: 'openai'
     */
    provider: "openai",

    /**
     * Model được sử dụng cho nhà cung cấp đã chọn.
     */
    model: "gpt-4o",

    /**
     * Khóa API cho nhà cung cấp.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Ngữ cảnh toàn cầu để hướng dẫn AI khi tạo bản dịch.
     */
    applicationContext: "Đây là một ứng dụng đặt vé du lịch.",

    /**
     * URL cơ sở cho AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Tuần tự hóa dữ liệu (Data Serialization)
     *
     * Tùy chọn:
     * - "json": mặc định, đáng tin cậy; sử dụng nhiều token hơn.
     * - "toon": nhanh hơn, ít token hơn, kém ổn định hơn JSON.
     *
     * Mặc định: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Cài đặt build và tối ưu hóa.
   */
  build: {
    /**
     * Chế độ thực thi build.
     * - "auto": Tự động build trong quá trình build ứng dụng.
     * - "manual": Yêu cầu lệnh build rõ ràng.
     * Mặc định: "auto"
     */
    mode: "auto",

    /**
     * Liệu có tối ưu hóa gói ứng dụng bằng cách loại bỏ các dictionary không được sử dụng.
     * Mặc định: true trong production
     */
    optimize: true,

    /**
     * Nén (Minify) các từ điển để giảm kích thước bundle.
     * Mặc định: false
     *
     * Lưu ý:
     * - Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị tắt.
     * - Tùy chọn này sẽ bị bỏ qua nếu `editor.enabled` là true.
     */
    minify: true,

    /**
     * Loại bỏ (Purge) các khóa không sử dụng trong từ điển.
     * Mặc định: false
     *
     * Lưu ý:
     * - Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị tắt.
     */
    purge: true,

    /**
     * Nhóm các phần từ điển theo ngôn ngữ dựa trên ranh giới tách mã sử dụng
     * chúng, để một trang tải lười lấy nội dung của nó trong một yêu cầu duy nhất.
     * Mặc định: true
     *
     * Lưu ý:
     * - Chỉ áp dụng cho các từ điển dùng `importMode: 'dynamic'`.
     */
    chunkGrouping: true,

    /**
     * Tải từ điển cùng với phần mã sử dụng nó, thay vì lấy về sau khi phần mã đó
     * render. Việc đọc được render đồng bộ thay vì bị treo, nên điều hướng không
     * còn nhấp nháy trạng thái đang tải.
     * Mặc định: true
     *
     * Lưu ý:
     * - Chỉ ngôn ngữ đã xác định mới được chờ, nên trang chỉ tải đúng ngôn ngữ mà
     *   nó hiển thị.
     */
    dictionariesPreload: true,

    /**
     * Định dạng đầu ra cho các tệp dictionary được tạo.
     * Mặc định: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Liệu có thực hiện kiểm tra kiểu dữ liệu TypeScript trong quá trình build.
     * Mặc định: false
     */
    checkTypes: false,
  },

  /**
   * Cấu hình Logger.
   */
  log: {
    /**
     * Mức độ ghi log.
     * - "default": Ghi log tiêu chuẩn.
     * - "verbose": Ghi log gỡ lỗi (debug) chi tiết.
     * - "disabled": Tắt ghi log.
     * Mặc định: "default"
     */
    mode: "default",

    /**
     * Tiền tố cho tất cả các thông báo trong log.
     * Mặc định: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Cấu hình hệ thống (cho mục đích nâng cao)
   */
  system: {
    /**
     * Thư mục lưu trữ các dictionary đã được địa phương hóa.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Thư mục cho module augmentation (bổ sung module).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Thư mục lưu trữ các dictionary chưa được hợp nhất (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Thư mục lưu trữ các kiểu dữ liệu dictionary.
     */
    typesDir: ".intlayer/types",

    /**
     * Nơi chứa các tệp chính của ứng dụng.
     */
    mainDir: ".intlayer/main",

    /**
     * Thư mục chứa các tệp cấu hình đã được biên dịch.
     */
    configDir: ".intlayer/config",

    /**
     * Thư mục cho các tệp cache.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Cấu hình Compiler (cho mục đích nâng cao)
   */
  compiler: {
    /**
     * Liệu compiler có được bật hay không.
     *
     * - false: tắt compiler.
     * - true: bật compiler.
     * - "build-only": bỏ qua compiler trong quá trình phát triển để khởi động nhanh hơn.
     *
     * Mặc định: false
     */
    enabled: true,

    /**
     * Xác định đường dẫn tệp đầu ra. Thay thế `outputDir`.
     *
     * - Đường dẫn bắt đầu bằng `./` được giải quyết tương đối với thư mục component.
     * - Đường dẫn bắt đầu bằng `/` được giải quyết tương đối với thư mục cơ sở dự án (`baseDir`).
     *
     * - Sự hiện diện của biến `{{locale}}` trong đường dẫn cho phép tạo dictionary theo từng locale.
     *
     * Ví dụ:
     * ```ts
     * {
     *   // Tạo các tệp .content.ts đa ngôn ngữ bên cạnh component
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Tương đương thông qua chuỗi template (template string)
     * }
     * ```
     *
     * ```ts
     * {
     *   // Tạo các JSON tập trung theo từng locale trong thư mục gốc của dự án
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Tương đương thông qua chuỗi template
     * }
     * ```
     *
     * Danh sách các biến:
     *   - `fileName`: Tên tệp.
     *   - `key`: Khóa nội dung (content key).
     *   - `locale`: Locale nội dung.
     *   - `extension`: Phần mở rộng tệp.
     *   - `componentFileName`: Tên tệp component.
     *   - `componentExtension`: Phần mở rộng tệp component.
     *   - `format`: Định dạng dictionary.
     *   - `componentFormat`: Định dạng dictionary của component.
     *   - `componentDirPath`: Đường dẫn thư mục component.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Liệu có lưu các component sau khi chúng đã được chuyển đổi.
     * Theo cách này, compiler có thể được chạy một lần để chuyển đổi ứng dụng và sau đó gỡ bỏ.
     */
    saveComponents: false,

    /**
     * Chỉ giữ lại nội dung trong tệp được tạo. Hữu ích cho định dạng i18next hoặc đầu ra ICU MessageFormat JSON theo từng locale.
     */
    noMetadata: false,

    /**
     * Tiền tố khóa dictionary (Dictionary key prefix)
     */
    dictionaryKeyPrefix: "", // Thêm tiền tố tùy chọn cho các khóa dictionary được trích xuất
  },

  /**
   * Các schema tùy chỉnh để xác thực nội dung dictionary.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Cấu hình từ điển.
   */
  dictionary: {
    /**
     * Kiểm soát cách các từ điển được nhập.
     * - "static": Nhập tĩnh tại thời điểm xây dựng.
     * - "dynamic": Nhập động sử dụng Suspense.
     * - "fetch": Tìm nạp động qua API đồng bộ trực tiếp.
     */
    importMode: "static",

    /**
     * Định dạng tin nhắn mặc định cho tất cả các từ điển trong dự án.
     * - 'intlayer': Định dạng intlayer gốc (mặc định).
     * - 'icu': Định dạng tin nhắn ICU.
     * - 'i18next': Định dạng i18next.
     * - 'vue-i18n': Định dạng Vue I18n.
     * - 'po': Định dạng GNU Gettext PO.
     */
    format: "icu",
  },

  /**
   * Cấu hình plugin.
   */
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
````

---

## Hướng dẫn Tham khảo Cấu hình

Dưới đây là mô tả chi tiết về các tham số cấu hình khác nhau có sẵn trong Intlayer.

---

### Cấu hình Quốc tế hóa (Internationalization)

Xác định các cài đặt liên quan đến quốc tế hóa, bao gồm các locale có sẵn và locale mặc định.

| Trường            | Mô tả                                                                             | Kiểu dữ liệu | Mặc định            | Ví dụ                | Nhận xét                                                                                                                                                                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------- | ------------ | ------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Danh sách các locale được hỗ trợ trong ứng dụng.                                  | `string[]`   | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                           |
| `requiredLocales` | Danh sách các locale bắt buộc trong ứng dụng.                                     | `string[]`   | `[]`                | `[]`                 | • Nếu để trống, tất cả các locale đều bắt buộc trong chế độ `strict`.<br/>• Đảm bảo rằng các locale bắt buộc cũng được định nghĩa trong trường `locales`.                                                                                                                                                 |
| `strictMode`      | Đảm bảo thực thi mạnh mẽ các nội dung quốc tế hóa bằng TypeScript.                | `string`     | `'inclusive'`       |                      | • Nếu `"strict"`: Việc định nghĩa mọi locale đã khai báo là bắt buộc cho hàm `t` - báo lỗi nếu thiếu hoặc nếu chưa khai báo.<br/>• Nếu `"inclusive"`: Cảnh báo cho các locale bị thiếu nhưng cho phép sử dụng các locale hiện có chưa khai báo.<br/>• Nếu `"loose"`: Chấp nhận bất kỳ locale nào hiện có. |
| `defaultLocale`   | Locale mặc định được sử dụng làm dự phòng nếu locale được yêu cầu không khả dụng. | `string`     | `Locales.ENGLISH`   | `'en'`               | Được sử dụng để xác định locale nếu không được chỉ định trong URL, cookie hoặc header.                                                                                                                                                                                                                    |

---

### Cấu hình Editor (Editor)

Xác định cài đặt cho visual editor, bao gồm cổng máy chủ và trạng thái bật/tắt.

| Trường                       | Mô tả                                                                                                                                                             | Kiểu dữ liệu                      | Mặc định                            | Ví dụ                                                                                           | Nhận xét                                                                                                                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL ứng dụng của bạn.                                                                                                                                             | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Được sử dụng để hạn chế origin của editor vì lý do bảo mật.<br/>• Nếu được đặt thành `'*'`, editor có thể truy cập được từ bất kỳ origin nào.                                                                                             |
| `port`                       | Cổng của máy chủ visual editor.                                                                                                                                   | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                             |
| `editorURL`                  | URL của máy chủ editor.                                                                                                                                           | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Được sử dụng để hạn chế các origin có thể giao tiếp với ứng dụng.<br/>• Nếu được đặt thành `'*'`, nó có thể truy cập được từ bất kỳ origin nào.<br/>• Cần thiết nếu cổng bị thay đổi hoặc nếu editor được lưu trữ trên một tên miền khác. |
| `cmsURL`                     | URL của Intlayer CMS.                                                                                                                                             | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                             |
| `backendURL`                 | URL của máy chủ backend.                                                                                                                                          | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                             |
| `enabled`                    | Liệu ứng dụng có nên giao tiếp với visual editor hay không.                                                                                                       | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Nếu `false`, editor sẽ không thể giao tiếp với ứng dụng.<br/>• Vô hiệu hóa tính năng này cho một số môi trường sẽ tăng cường bảo mật.                                                                                                     |
| `clientId`                   | Cho phép các gói intlayer xác thực với backend thông qua oAuth2. Truy cập [intlayer.org/project](https://app.intlayer.org/project) để lấy token truy cập của bạn. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Phải được giữ bí mật; sử dụng biến môi trường.                                                                                                                                                                                              |
| `clientSecret`               | Cho phép các gói intlayer xác thực với backend thông qua oAuth2. Truy cập [intlayer.org/project](https://app.intlayer.org/project) để lấy token truy cập của bạn. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Phải được giữ bí mật; sử dụng biến môi trường.                                                                                                                                                                                              |
| `dictionaryPriorityStrategy` | Chiến lược ưu tiên dictionary khi cả dictionary cục bộ và từ xa đều hiện diện.                                                                                    | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: Ưu tiên dictionary từ xa hơn dictionary cục bộ.<br/>• `'local_first'`: Ưu tiên dictionary cục bộ hơn dictionary từ xa.                                                                                                 |
| `liveSync`                   | Liệu máy chủ ứng dụng có tải lại nội dung ngay lập tức khi phát hiện thay đổi trong <br/> CMS <br/> Visual Editor <br/> Máy chủ Backend.                          | `boolean`                         | `true`                              | `true`                                                                                          | • Làm mới nội dung trang ứng dụng khi các dictionary được thêm/cập nhật.<br/>• Live Sync chấp nhận nội dung từ một máy chủ khác, điều này có thể ảnh hưởng nhẹ đến hiệu suất.<br/>• Khuyên dùng lưu trữ cả hai trên cùng một máy.           |
| `liveSyncPort`               | Cổng của máy chủ Live Sync.                                                                                                                                       | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                             |
| `liveSyncURL`                | URL của máy chủ Live Sync.                                                                                                                                        | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Trỏ đến localhost theo mặc định; có thể được thay đổi để trỏ đến máy chủ Live Sync từ xa.                                                                                                                                                   |

### Cấu hình Phân tích (Analytics)

Xác định các cài đặt liên quan đến phân tích của Intlayer: thu thập dữ liệu về nội dung thực sự được hiển thị cho người dùng (lượt xem trang, hiển thị nội dung) và hỗ trợ thử nghiệm A/B trên nội dung.

Tính năng phân tích là tùy chọn từ chối (opt-out): nó được bật theo mặc định và bắt đầu thu thập ngay khi gói `@intlayer/analytics` được cài đặt **và** một khóa dự án (`editor.clientId`) được cấu hình để quy kết. Đặt `analytics.enabled` thành `false` — hoặc không cài gói — thì toàn bộ tích hợp phân tích sẽ bị loại bỏ khỏi gói ứng dụng của bạn (dead-code elimination).

| Trường          | Mô tả                                                                            | Kiểu      | Mặc định | Ví dụ   | Ghi chú                                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------- | --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | Bật thu thập dữ liệu phân tích (lượt xem trang, hiển thị nội dung, sự kiện A/B). | `boolean` | `true`   | `false` | Yêu cầu đã cài đặt `@intlayer/analytics` và thiết lập `editor.clientId` để phục vụ việc quy kết; nếu không, phân tích vẫn bị vô hiệu hóa ngay cả khi `enabled` là `true`. |
| `flushInterval` | Số mili giây giữa các lần gửi hàng loạt tự động đến backend.                     | `number`  | `20000`  | `10000` |                                                                                                                                                                           |
| `sampleRate`    | Tỷ lệ phiên được ghi lại, từ `0` (không có) đến `1` (tất cả).                    | `number`  | `1`      | `0.5`   | Việc lấy mẫu là xác định theo từng phiên, vì vậy một phiên được ghi lại sẽ báo cáo tất cả các sự kiện của nó (không có phễu một phần).                                    |

---

### Cấu hình Routing (Routing)

Cài đặt kiểm soát hành vi routing, bao gồm cấu trúc URL, lưu trữ locale và quản lý middleware.

| Trường        | Mô tả                                                                                                                                                                                                                    | Kiểu dữ liệu                                                                                                                                                                                                 | Mặc định               | Ví dụ                                                                                                                                                                                              | Nhận xét                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | Chế độ cấu trúc URL cho việc quản lý locale.                                                                                                                                                                             | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) hoặc `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard` . `'no-prefix'`: locale được quản lý theo cách khác. `'search-params'`: `/dashboard?locale=fr` | Không ảnh hưởng đến quản lý cookie hoặc local storage.                                                                                                                                                                                                                                                                                                            |
| `enableProxy` | Bật proxy định tuyến locale của Intlayer (middleware).                                                                                                                                                                   | `boolean` &#124; <br/> `undefined`                                                                                                                                                                           | `undefined` (auto)     | `true`                                                                                                                                                                                             | • Không đặt (auto): máy chủ dev và preview bỏ qua locale lưu trong cookie/header làm nguồn chuyển hướng; tiền tố, việc lưu locale và phát hiện `Accept-Language` vẫn áp dụng. Ở production hoạt động như `true`.<br/>• `true`: hành vi đầy đủ ở mọi nơi.<br/>• `false`: không định tuyến locale. Trên Next.js, middleware `intlayerProxy` trở thành pass-through. |
| `storage`     | Cấu hình cho việc lưu trữ locale phía client.                                                                                                                                                                            | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                 | Xem bảng tham số lưu trữ bên dưới.                                                                                                                                                                                                                                                                                                                                |
| `basePath`    | Đường dẫn cơ sở cho các URL ứng dụng.                                                                                                                                                                                    | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                        | Nếu ứng dụng của bạn nằm tại `https://example.com/my-app`, basePath là `'/my-app'` và các URL trỏ tới `https://example.com/my-app/en` .                                                                                                                                                                                                                           |
| `rewrite`     | Các quy tắc rewrite URL tùy chỉnh để ghi đè chế độ routing mặc định cho các đường dẫn cụ thể. Hỗ trợ các tham số động `[param]`.                                                                                         | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Xem Ví dụ bên dưới                                                                                                                                                                                 | • Quy tắc rewrite có độ ưu tiên cao hơn `mode`.<br/>• Hoạt động với Next.js và Vite.<br/>• `getLocalizedUrl()` tự động áp dụng các quy tắc phù hợp.<br/>• Xem [Rewrite URL tùy chỉnh](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).                                                                                      |
| `domains`     | Ánh xạ các locale với tên máy chủ tên miền để routing dựa trên tên miền. Khi được thiết lập, URL cho một locale sẽ sử dụng tên miền đó làm cơ sở (URL tuyệt đối) và không có tiền tố locale nào được thêm vào đường dẫn. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                        | • Giao thức mặc định là `https://` khi không được bao gồm trong tên máy chủ.<br/>• Bản thân tên miền xác định locale, vì vậy không có tiền tố `/zh/` nào được thêm vào.<br/>• `getLocalizedUrl('/', 'zh')` trả về `https://intlayer.zh/`.                                                                                                                         |

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

#### Tham số Lưu trữ (Storage)

| Giá trị            | Nhận xét                                                                                                                                                                                             | Mô tả                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `'cookie'`         | • Đảm bảo sự đồng ý của người dùng phù hợp để thực thi GDPR.<br/>• Có thể cấu hình thông qua `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).       | Lưu trữ locale trong cookie - có thể truy cập được từ cả client và server.         |
| `'localStorage'`   | • Không hết hạn trừ khi bị xóa rõ ràng.<br/>• Intlayer Proxy không thể truy cập nó.<br/>• Có thể cấu hình thông qua `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).         | Lưu trữ locale trong trình duyệt mà không có thời gian hết hạn - chỉ phía client.  |
| `'sessionStorage'` | • Bị xóa khi cửa sổ/tab trình duyệt đóng lại.<br/>• Intlayer Proxy không thể truy cập nó.<br/>• Có thể cấu hình thông qua `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`). | Lưu trữ locale trong thời gian diễn ra phiên làm việc của trang - chỉ phía client. |
| `'header'`         | • Hữu ích cho các lệnh gọi API.<br/>• Phía client không thể truy cập nó.<br/>• Có thể cấu hình thông qua `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                          | Lưu trữ hoặc chuyển qua locale thông qua các HTTP header - chỉ phía server.        |

#### Thuộc tính Cookie (Cookies Attributes)

Khi sử dụng bộ nhớ lưu trữ trong cookie, bạn có thể thiết lập các thuộc tính bổ sung:

| Trường     | Mô tả                                                                                                              | Kiểu dữ liệu                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `name`     | Tên của cookie. Mặc định: `'INTLAYER_LOCALE'`                                                                      | `string`                                              |
| `domain`   | Tên miền của cookie. Mặc định: `undefined`                                                                         | `string`                                              |
| `path`     | Đường dẫn của cookie. Mặc định: `undefined`                                                                        | `string`                                              |
| `secure`   | Yêu cầu HTTPS. Mặc định: `undefined`                                                                               | `boolean`                                             |
| `httpOnly` | Gờ (flag) HTTP-only. Mặc định: `undefined`                                                                         | `boolean`                                             |
| `sameSite` | Chính sách SameSite.                                                                                               | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Số đại diện cho số ngày kể từ khi tạo; ngày (hoặc chuỗi ngày ISO) là ngày hết hạn tuyệt đối. Mặc định: `undefined` | `Date` &#124; <br/> `number` &#124; <br/> `string`    |
| `maxAge`   | Thời gian tồn tại tính bằng giây kể từ khi tạo. Được ưu tiên hơn `expires`. Mặc định: `undefined`                  | `number`                                              |

#### Thuộc tính Lưu trữ (Storage Attributes)

Khi sử dụng localStorage hoặc sessionStorage:

| Trường | Mô tả                                                          | Kiểu dữ liệu                                     |
| ------ | -------------------------------------------------------------- | ------------------------------------------------ |
| `type` | Kiểu lưu trữ.                                                  | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Tên của khóa (key) trong bộ nhớ. Mặc định: `'INTLAYER_LOCALE'` | `string`                                         |

#### Các ví dụ Cấu hình

Dưới đây là một số ví dụ cấu hình phổ biến cho cấu trúc routing v7 mới:

**Cấu hình Cơ bản (Mặc định)**:

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

**Chế độ tham số Tìm kiếm (Search Params)**:

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

**Chế độ Không tiền tố (No-Prefix) với Bộ nhớ lưu trữ Tùy chỉnh**:

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

**Rewrite URL tùy chỉnh với các đường dẫn động**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Dự phòng cho các đường dẫn chưa được rewrite
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

### Cấu hình Nội dung (Content)

Các cài đặt về cách nội dung được quản lý trong ứng dụng, bao gồm tên thư mục, phần mở rộng tệp và các cấu hình phái sinh khác.

| Trường           | Mô tả                                                                                                                | Kiểu dữ liệu | Mặc định                                                                                                                                                                  | Ví dụ                                                                                                                                                                                 | Nhận xét                                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Biểu thị liệu Intlayer có nên theo dõi các thay đổi trong các tệp khai báo nội dung để tạo lại dictionary hay không. | `boolean`    | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                                             |
| `fileExtensions` | Phần mở rộng tệp cần quét trong quá trình biên dịch dictionary.                                                      | `string[]`   | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Có thể giúp tránh xung đột tùy chỉnh.                                                                                                                                       |
| `contentDir`     | Đường dẫn thư mục nơi lưu trữ các tệp định nghĩa nội dung (`.content.*`).                                            | `string[]`   | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Được sử dụng để theo dõi tệp nội dung và tạo lại dictionary.                                                                                                                |
| `codeDir`        | Thư mục đường dẫn nơi đặt mã nguồn, tương đối với thư mục cơ sở.                                                     | `string[]`   | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Được sử dụng để theo dõi tệp mã nguồn để phục vụ việc chuyển đổi (loại bỏ các phần không cần thiết, tối ưu hóa).<br/>• Tách khỏi `contentDir` có thể cải thiện hiệu suất. |
| `excludedPath`   | Các thư mục cần loại bỏ khỏi quá trình quét nội dung.                                                                | `string[]`   | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Hiện tại chưa được sử dụng; được lên kế hoạch cho tương lai.                                                                                                                |
| `formatCommand`  | Lệnh định dạng các tệp nội dung khi Intlayer ghi chúng cục bộ.                                                       | `string`     | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` sẽ được thay thế bằng đường dẫn tệp.<br/>• Nếu chưa được định nghĩa, Intlayer sẽ cố gắng suy luận (thử nghiệm prettier, biome, eslint).                        |

---

### Cấu hình Hệ thống

Các cài đặt liên quan đến các đường dẫn nội bộ và kết quả đầu ra của Intlayer. Các cài đặt này thường là nội bộ và không cần phải được sửa đổi bởi người dùng.

| Field                     | Description                                                                   | Type     | Default                           | Example              | Note                                                                  |
| ------------------------- | ----------------------------------------------------------------------------- | -------- | --------------------------------- | -------------------- | --------------------------------------------------------------------- |
| `baseDir`                 | Thư mục cơ sở cho dự án.                                                      | `string` | `process.cwd()`                   | `'/path/to/project'` | Được sử dụng để giải quyết tất cả các thư mục liên quan đến Intlayer. |
| `dictionariesDir`         | Đường dẫn thư mục để lưu trữ từ điển bản địa hóa.                             | `string` | `'.intlayer/dictionary'`          |                      |                                                                       |
| `moduleAugmentationDir`   | Thư mục để tăng cường module, cho phép có gợi ý IDE tốt hơn và kiểm tra loại. | `string` | `'.intlayer/types'`               | `'intlayer-types'`   | Hãy chắc chắn bao gồm điều này trong `tsconfig.json`.                 |
| `unmergedDictionariesDir` | Thư mục để lưu trữ các từ điển chưa được hợp nhất.                            | `string` | `'.intlayer/unmerged_dictionary'` |                      |                                                                       |
| `typesDir`                | Thư mục để lưu trữ các loại từ điển.                                          | `string` | `'.intlayer/types'`               |                      |                                                                       |
| `mainDir`                 | Thư mục nơi lưu trữ các tệp ứng dụng chính.                                   | `string` | `'.intlayer/main'`                |                      |                                                                       |
| `configDir`               | Thư mục nơi lưu trữ các tệp cấu hình.                                         | `string` | `'.intlayer/config'`              |                      |                                                                       |
| `cacheDir`                | Thư mục nơi lưu trữ các tệp bộ nhớ đệm.                                       | `string` | `'.intlayer/cache'`               |                      |                                                                       |

### Cấu hình Dictionary (Dictionary)

Tham số điều khiển các hoạt động của dictionary, bao gồm hành vi tự động điền (auto-fill) và thế hệ nội dung.

Cấu hình từ điển này phục vụ hai mục đích chính:

1. **Giá trị mặc định**: Xác định giá trị mặc định khi tạo tệp khai báo nội dung
2. **Hành vi dự phòng**: Cung cấp giá trị dự phòng khi các trường cụ thể không được xác định, cho phép bạn xác định hành vi hoạt động của từ điển trên toàn cầu

Để biết thêm thông tin về các tệp khai báo nội dung và cách các giá trị cấu hình được áp dụng, hãy xem [Tài liệu Tệp Nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

| Trường                      | Mô tả                                                                                                                                                      | Kiểu dữ liệu                                                                                                    | Mặc định     | Ví dụ                                                                                       | Nhận xét                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Điều khiển cách các tệp đầu ra auto-fill (bản dịch bằng AI) được tạo ra.                                                                                   | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`       | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: Đường dẫn mặc định (cùng tệp với nguồn).<br/>• `false`: Vô hiệu hóa.<br/>• Template string/Hàm bật tạo tệp theo từng locale.<br/>• Đối tượng theo từng locale: Mỗi locale khớp với template của riêng nó; `false` loại bỏ locale đó.<br/>• Việc bao gồm `{{locale}}` bật tạo tệp theo từng locale.<br/>• Cài đặt `fill` ở cấp độ dictionary luôn được ưu tiên hơn cài đặt toàn cầu này. |
| `description`               | Giúp editor và CMS hiểu được mục đích của dictionary. Cũng được sử dụng làm ngữ cảnh để tạo các bản dịch bằng AI.                                          | `string`                                                                                                        | `undefined`  | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                   |
| `locale`                    | Chuyển đổi dictionary thành định dạng cho một locale cụ thể. Mỗi trường đã khai báo trở thành một nút dịch. Nếu thiếu, dictionary được coi là đa ngôn ngữ. | `LocalesValues`                                                                                                 | `undefined`  | `'en'`                                                                                      | Sử dụng tính năng này nếu dictionary dành cho một locale cụ thể thay vì chứa các bản dịch đa ngôn ngữ.                                                                                                                                                                                                                                                                                            |
| `contentAutoTransformation` | Liệu có tự động chuyển đổi các chuỗi nội dung thành các nút có kiểu (Markdown, HTML hoặc chèn biến).                                                       | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`      | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` .<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` .<br/>• Chèn biến : `Hello {{name}}` → `insert('Hello {{name}}')` .                                                                                                                                                                                                                   |
| `location`                  | Chỉ ra nơi lưu trữ các tệp dictionary và cách chúng được đồng bộ hóa với CMS.                                                                              | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`    | `'hybrid'`                                                                                  | • `'local'`: Chỉ quản lý cục bộ.<br/>• `'remote'`: Chỉ quản lý từ xa (CMS).<br/>• `'hybrid'`: Cả quản lý cục bộ và từ xa.<br/>• `'plugin'` hoặc các chuỗi tùy chỉnh: Quản lý thông qua plugin hoặc nguồn tùy chỉnh.                                                                                                                                                                               |
| `importMode`                | Kiểm soát cách các dictionary được import.                                                                                                                 | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`   | `'dynamic'`                                                                                 | • `'static'`: Import tĩnh.<br/>• `'dynamic'`: Import động thông qua Suspense.<br/>• `'fetch'`: Lấy dữ liệu thông qua Live Sync API; dự phòng về `'dynamic'` nếu thất bại.<br/>• Yêu cầu các plugin `@intlayer/babel` và `@intlayer/swc`.<br/>• Các khóa (keys) phải được khai báo tĩnh.<br/>• Bị bỏ qua nếu `optimize` tắt.<br/>• Không ảnh hưởng đến `getIntlayer`, `getDictionary`, v.v.        |
| `format`                    | Định dạng tin nhắn mặc định cho tất cả các từ điển trong dự án.                                                                                            | `'intlayer'` &#124; <br/> `'icu'` &#124; <br/> `'i18next'` &#124; <br/> `'vue-i18n'` &#124; <br/> `'po'`        | `'intlayer'` | `'icu'`                                                                                     | • `'intlayer'`: Định dạng intlayer gốc.<br/>• `'icu'`: Định dạng tin nhắn ICU.<br/>• `'i18next'`: Định dạng i18next.<br/>• `'vue-i18n'`: Định dạng Vue I18n.<br/>• `'po'`: Định dạng GNU Gettext PO.                                                                                                                                                                                              |
| `priority`                  | Độ ưu tiên của dictionary. Khi giải quyết xung đột giữa các dictionary, giá trị cao hơn sẽ giành chiến thắng trước các giá trị thấp hơn.                   | `number`                                                                                                        | `undefined`  | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                   |
| `live`                      | ĐÃ LỖI THỜI - sử dụng `importMode: 'fetch'`. Từng biểu thị nội dung dictionary có nên được lấy dữ liệu động thông qua Live Sync API hay không.             | `boolean`                                                                                                       | `undefined`  |                                                                                             | Được đổi tên thành `importMode: 'fetch'` trong v8.0.0.                                                                                                                                                                                                                                                                                                                                            |
| `schema`                    | Được tạo tự động bởi Intlayer để xác thực JSON schema.                                                                                                     | `'https://intlayer.org/schema.json'`                                                                            | Tự động tạo  |                                                                                             | Không chỉnh sửa thủ công.                                                                                                                                                                                                                                                                                                                                                                         |
| `title`                     | Giúp xác định các dictionary trong editor và CMS.                                                                                                          | `string`                                                                                                        | `undefined`  | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                   |
| `tags`                      | Phân loại các dictionary và cung cấp ngữ cảnh hoặc hướng dẫn cho editor và AI.                                                                             | `string[]`                                                                                                      | `undefined`  | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                   |
| `version`                   | Phiên bản của dictionary từ xa; giúp theo dõi phiên bản hiện đang được sử dụng.                                                                            | `string`                                                                                                        | `undefined`  | `'1.0.0'`                                                                                   | • Được quản lý trong CMS.<br/>• Đừng chỉnh sửa cục bộ.                                                                                                                                                                                                                                                                                                                                            |

**Ví dụ về `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Cấu hình Logger (Log)

Các tham số để tùy chỉnh đầu ra log của Intlayer.

| Trường   | Mô tả                                 | Kiểu dữ liệu                                                   | Mặc định        | Ví dụ                  | Nhận xét                                                                                                           |
| -------- | ------------------------------------- | -------------------------------------------------------------- | --------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `mode`   | Biểu thị chế độ logger.               | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`            | • `'verbose'`: Ghi lại nhiều thông tin hơn cho quá trình gỡ lỗi.<br/>• `'disabled'`: Vô hiệu hóa logger hoàn toàn. |
| `prefix` | Tiền tố cho tất cả các thông báo log. | `string`                                                       | `'[intlayer] '` | `'[tiền tố của tôi] '` |                                                                                                                    |

### Cấu hình AI (AI)

Cài đặt điều khiển các tính năng AI của Intlayer, bao gồm nhà cung cấp, model và khóa API.

Cấu hình này là tùy chọn nếu bạn đăng ký với một khóa truy cập (access key) trên [Intlayer Dashboard](https://app.intlayer.org/project). Intlayer sẽ tự động quản lý giải pháp AI tiết kiệm chi phí và hiệu quả nhất cho nhu cầu của bạn. Sử dụng các tùy chọn mặc định đảm bảo hỗ trợ lâu dài tốt nhất vì Intlayer liên tục được cập nhật để sử dụng các model mới nhất.

Nếu bạn thích sử dụng khóa API riêng hoặc một model cụ thể, bạn có thể tự định nghĩa cấu hình AI cho mình.
Cấu hình AI này sẽ được sử dụng toàn cầu trong môi trường Intlayer của bạn. Các lệnh CLI như `fill` sẽ sử dụng các cài đặt này theo mặc định, cũng như SDK, Visual Editor và CMS. Bạn có thể ghi đè các giá trị mặc định này trong các trường hợp cụ thể thông qua các tham số lệnh.

Intlayer hỗ trợ đa dạng các nhà cung cấp AI để mang lại sự linh hoạt tối đa. Các nhà cung cấp được hỗ trợ hiện tại bao gồm:

- **OpenAI** (Mặc định)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**
- **LM Studio**

| Trường               | Mô tả                                                                                                                                   | Kiểu dữ liệu                                                                                                                                                                                                                                                                                                                                                                                                                                         | Mặc định    | Ví dụ                                                         | Nhận xét                                                                                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Nhà cung cấp được sử dụng cho các tính năng AI của Intlayer.                                                                            | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` &#124; <br/> `'lmstudio'` &#124; <br/> `'moonshotai'` | `undefined` | `'anthropic'`                                                 | Các nhà cung cấp khác nhau yêu cầu các khóa API khác nhau và có mức giá khác nhau.                                                                                                              |
| `model`              | Model AI được sử dụng cho các tính năng AI.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | Không có    | `'gpt-4o-2024-11-20'`                                         | Các model cụ thể phụ thuộc vào nhà cung cấp.                                                                                                                                                    |
| `temperature`        | Điều khiển tính ngẫu nhiên của phản hồi AI.                                                                                             | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                             | Không có    | `0.1`                                                         | Nhiệt độ cao hơn = sáng tạo hơn và kém đáng tin cậy hơn.                                                                                                                                        |
| `apiKey`             | Khóa API của bạn cho nhà cung cấp đã chọn.                                                                                              | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | Không có    | `process.env.OPENAI_API_KEY`                                  | Phải được giữ bí mật; sử dụng biến môi trường.                                                                                                                                                  |
| `applicationContext` | Ngữ cảnh bổ sung về ứng dụng của bạn để giúp AI tạo ra các bản dịch chính xác hơn (lĩnh vực, đối tượng mục tiêu, tông điệu, thuật ngữ). | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | Không có    | `'ngữ cảnh ứng dụng tùy chỉnh của tôi'`                       | Có thể được sử dụng để thêm các quy tắc (ví dụ: `"Bạn không nên dịch các URL của bạn"` ).                                                                                                       |
| `baseURL`            | URL cơ sở cho AI API.                                                                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | Không có    | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Có thể trỏ tới các endpoint AI API cục bộ hoặc tùy chỉnh.                                                                                                                                       |
| `dataSerialization`  | Định dạng tuần tự hóa dữ liệu cho các tính năng AI.                                                                                     | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                                                                       | `undefined` | `'toon'`                                                      | • `'json'`: mặc định, đáng tin cậy; sử dụng nhiều token hơn.<br/>• `'toon'`: ít token hơn, kém ổn định hơn.<br/>• Chuyển ngữ cảnh cho model dưới dạng một tham số phụ (reasoning effort, v.v.). |

### Cấu hình Build (Build)

Các tham số kiểm soát cách Intlayer tối ưu hóa và biên dịch quá trình quốc tế hóa ứng dụng của bạn.

Các tùy chọn build được áp dụng cho các plugin `@intlayer/babel` và `@intlayer/swc`.

> Trong chế độ development, Intlayer sử dụng import tĩnh các dictionary để tạo thuận lợi cho quá trình phát triển.

> Trong quá trình tối ưu hóa, Intlayer sẽ thay thế các lời gọi dictionary để tối ưu hóa việc phân tách mã (chunking) sao cho gói kết quả chỉ import những dictionary thực sự được sử dụng.

| Trường                | Mô tả                                                                                                              | Kiểu dữ liệu                     | Mặc định                                                                                                                                                                          | Ví dụ                                                                         | Nhận xét                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                | Kiểm soát chế độ build.                                                                                            | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: Quá trình build được khởi chạy tự động trong quá trình build ứng dụng.<br/>• `'manual'`: Chỉ được thực thi thông qua một lệnh build rõ ràng.<br/>• Có thể được sử dụng để ngăn chặn quá trình build dictionary (ví dụ: để tránh chạy trong môi trường Node.js).                                                                                                                                                                                                                           |
| `optimize`            | Kiểm soát liệu các tối ưu hóa build có nên được thực hiện hay không.                                               | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Nếu chưa được định nghĩa, quá trình tối ưu hóa được khởi chạy trong quá trình build framework (Vite/Next.js).<br/>• `true` buộc thực hiện tối ưu hóa ngay cả trong chế độ dev.<br/>• `false` vô hiệu hóa nó.<br/>• Nếu bật, nó sẽ thay thế các lệnh gọi dictionary để phục vụ tối ưu hóa chunking.<br/>• Yêu cầu các plugin `@intlayer/babel` và `@intlayer/swc`.                                                                                                                                   |
| `minify`              | Nén (Minify) các từ điển để giảm kích thước bundle.                                                                | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Cho biết bundle có nên được rút gọn không.<br/>• Mặc định: `true` trong production.<br/>• Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị tắt.<br/>• Tùy chọn này sẽ bị bỏ qua nếu `editor.enabled` là true.                                                                                                                                                                                                                                                                                            |
| `purge`               | Loại bỏ (Purge) các khóa không sử dụng trong từ điển.                                                              | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Cho biết bundle có nên được loại bỏ các khóa không sử dụng không.<br/>• Mặc định: `true` trong production.<br/>• Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị tắt.                                                                                                                                                                                                                                                                                                                                   |
| `checkTypes`          | Biểu thị liệu build có nên kiểm tra các kiểu dữ liệu TypeScript và ghi nhật ký lỗi hay không.                      | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Có thể làm chậm quá trình build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `chunkGrouping`       | Xác định có nhóm các phần từ điển theo ngôn ngữ dựa trên ranh giới tách mã sử dụng chúng hay không.                | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Không nhóm, một trang gồm nhiều thành phần sẽ gửi một yêu cầu cho mỗi từ điển.<br/>• Các từ điển được truy cập từ nhiều ranh giới sẽ chuyển sang phần dùng chung, nên không trang nào mang nội dung của trang khác.<br/>• Chỉ áp dụng cho các từ điển dùng `importMode: 'dynamic'`.<br/>• Chỉ áp dụng cho bản build phía client, và chỉ khi đóng gói (không phải ở chế độ dev).                                                                                                                     |
| `dictionariesPreload` | Xác định từ điển có được tải cùng với phần mã sử dụng nó hay không, thay vì được lấy về sau khi phần mã đó render. | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Điểm vào được tạo sẽ chờ ngôn ngữ duyệt ở cấp cao nhất, nên một route tải lười chưa được coi là đã tải cho đến khi có nội dung.<br/>• Việc đọc được render đồng bộ thay vì bị treo, nên điều hướng không còn nhấp nháy trạng thái đang tải.<br/>• Chỉ ngôn ngữ đã xác định mới được chờ, nên trang chỉ tải đúng ngôn ngữ mà nó hiển thị.<br/>• Chỉ áp dụng cho các từ điển dùng `importMode: 'dynamic'`, ở bản build phía client.<br/>• Yêu cầu bộ đóng gói hỗ trợ top-level await (Vite, esbuild). |
| `outputFormat`        | Kiểm soát định dạng đầu ra cho các dictionary.                                                                     | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `traversePattern`     | Pattern chỉ rõ các tệp cần quét trong quá trình tối ưu hóa.                                                        | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Hạn chế tối ưu hóa cho các tệp có liên quan để cải thiện hiệu suất build.<br/>• Bị bỏ qua nếu `optimize` tắt.<br/>• Sử dụng các pattern glob.                                                                                                                                                                                                                                                                                                                                                       |

---

### Cấu hình Compiler (Compiler)

Trình kiểm soát trình biên dịch Intlayer, thu thập các bộ từ điển trực tiếp từ các component của bạn.

| Trường                | Mô tả                                                                                                                                                                                                                                                                                                     | Kiểu dữ liệu                                                                                                    | Mặc định    | Ví dụ                                                                                                                                                    | Nhận xét                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Cho biết liệu compiler có nên hoạt động để thu thập các từ điển hay không.                                                                                                                                                                                                                                | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` bỏ qua trình biên dịch trong quá trình phát triển để xây dựng nhanh hơn; chỉ chạy trong quá trình thực hiện các lệnh build.                                                                                                               |
| `dictionaryKeyPrefix` | Tiền tố cho các khóa (keys) từ điển đã thu thập.                                                                                                                                                                                                                                                          | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | Được thêm vào phía trước khóa đã được tạo (dựa trên tên tệp) để tránh xung đột.                                                                                                                                                                          |
| `saveComponents`      | Liệu các component có nên được lưu sau khi chúng đã được chuyển đổi hay không.                                                                                                                                                                                                                            | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Nếu `true`, các tệp gốc sẽ bị ghi đè bởi phiên bản đã được chuyển đổi.<br/>• Cho phép gỡ bỏ trình biên dịch sau khi đã chạy nó một lần.                                                                                                                |
| `output`              | Xác định đường dẫn tệp đầu ra. Thay thế `outputDir`. Hỗ trợ các biến template: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` . | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Các đường dẫn `./` được giải quyết tương đối so với thư mục component.<br/>• Các đường dẫn `/` tương đối so với thư mục gốc của dự án.<br/>• `{{locale}}` cho phép tạo tệp riêng theo từng locale.<br/>• Hỗ trợ định nghĩa theo đối tượng từng locale. |
| `noMetadata`          | Nếu `true`, trình biên dịch sẽ xóa siêu dữ liệu (metadata) của từ điển (khóa, content wrapper) khỏi đầu ra.                                                                                                                                                                                               | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Hữu ích cho định dạng i18next hoặc đầu ra ICU MessageFormat JSON.<br/>• Hoạt động tốt với plugin `loadJSON`.                                                                                                                                           |
| `dictionaryKeyPrefix` | Tiền tố khóa từ điển (Dictionary key prefix)                                                                                                                                                                                                                                                              | `string`                                                                                                        | `''`        |                                                                                                                                                          | Thêm tiền tố tùy chọn cho các khóa bộ từ điển được trích xuất                                                                                                                                                                                            |

### Các Schema Tùy chỉnh (Custom Schemas)

| Trường    | Mô tả                                                                           | Kiểu dữ liệu                |
| --------- | ------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Cho phép bạn định nghĩa các Zod schema để xác thực cấu trúc bộ từ điển của bạn. | `Record<string, ZodSchema>` |

---

### Plugin (Plugins)

| Trường    | Mô tả                                      | Kiểu dữ liệu       |
| --------- | ------------------------------------------ | ------------------ |
| `plugins` | Danh sách các plugin Intlayer cần bao gồm. | `IntlayerPlugin[]` |

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Tệp intlayer.config.ts nên đặt ở đâu?">

Ở thư mục gốc dự án của bạn, cạnh `package.json`. Intlayer quét thư mục làm việc và các thư mục cha để tìm `intlayer.config.ts`, `intlayer.config.js`, `intlayer.config.mjs`, hoặc `intlayer.config.cjs`. Bạn cũng có thể chỉ định đường dẫn tùy chỉnh qua flag `--config` trong các lệnh CLI.

</Question>

<Question title="i18n làm tăng kích thước bundle của tôi bao nhiêu?">

Ít hơn nhiều so with các cấu hình dựa trên namespace, vì trang không bao giờ tải catalog mà nó không hiển thị. Mã hiển thị trên server phân giải nội dung ngay trên server, và compiler tại thời điểm build thay thế các lệnh gọi `useIntlayer` bằng chính xác các mục từ điển mà component sử dụng, do đó các khóa và ngôn ngữ không sử dụng sẽ bị loại bỏ. [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) chia phần còn lại theo từng locale. So với các giải pháp thông thường, Intlayer giảm kích thước bundle và trang tới 50%. Xem [tối ưu hóa bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md).

</Question>

<Question title="Tôi có thể di chuyển từ i18next, next-intl hoặc react-i18next mà không cần viết lại component không?">

Có, theo hai cách. Bạn có thể di chuyển nội dung dần dần bằng [hướng dẫn di chuyển từ i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md) hoặc [hướng dẫn di chuyển từ next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_next-intl_to_intlayer.md). Hoặc bạn có thể giữ nguyên API hiện tại: [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) cung cấp chính xác các API tương tự như `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` và `Lingui`, nhưng chạy trên các từ điển Intlayer, nhờ đó chỉ có các lệnh import thay đổi còn mã component vẫn giữ nguyên.

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các tệp `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm điều tương tự cho các catalog gettext, và [các tệp theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một tệp.

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo tệp `.content` bên cạnh mỗi tệp, nhờ đó bạn xem lại diff thay vì sao chép chuỗi vào catalog thủ công. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

Đối với quy trình làm việc hoàn toàn tự động, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) thực hiện việc tương tự trong quá trình build trên mã JSX, TSX, Vue và Svelte, tạo từ điển trên mỗi thay đổi mà không cần quản lý khóa thủ công.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm công cụ, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ khóa `useIntlayer` đến tệp nội dung khai báo nó, trích xuất nội dung từ component, và chạy build, fill, test, push và pull từ command palette hoặc tab Intlayer.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: trải nghiệm tương tự trong bất kỳ trình soạn thảo nào hỗ trợ LSP, với go to definition, xem trước giá trị bản dịch khi hover, tự động hoàn thành khóa, và cảnh báo khi khóa chưa được khai báo ở bất kỳ đâu. Hỗ trợ cả các lệnh gọi `i18next`, `react-i18next`, `next-intl` và `use-intl`.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: cung cấp tài liệu và CLI Intlayer cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng chuyên biệt như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: quy tắc `no-raw-text` phát hiện các chuỗi chưa được bản địa hóa.

</Question>

<Question title="Làm cách nào để thêm ngôn ngữ mới vào ứng dụng của tôi?">

Thêm mã locale vào mảng `internationalization.locales`, sau đó chạy `npx intlayer fill` để tự động dịch nội dung hiện có. Compiler sẽ bao gồm ngôn ngữ mới trong lần build tiếp theo.

</Question>

<Question title="Làm cách nào để xóa tiền tố locale khỏi URL?">

Đặt `routing.mode`. Giá trị `"no-prefix"` xóa tiền tố cho tất cả ngôn ngữ, xác định locale qua cookie, tiêu đề hoặc tên miền. Giá trị `"prefix-no-default"` (mặc định) chỉ ẩn tiền tố cho ngôn ngữ chính.

</Question>

<Question title="Tôi có thể phục vụ mỗi ngôn ngữ từ tên miền riêng không?">

Có. Tùy chọn `routing.domains` ánh xạ từng locale tới một hostname, ví dụ `{ vi: 'example.vn', en: 'example.com' }`. Việc phát hiện theo tên miền được ưu tiên hơn tiền tố đường dẫn, và `getMultilingualUrls` tạo URL đầy đủ cho `hreflang`.

</Question>

<Question title="Ngôn ngữ của người dùng được phát hiện như thế nào?">

Thông qua `routing.storage`, liệt kê các nguồn theo thứ tự ưu tiên: thường là URL trước, sau đó là cookie, tiếp theo là tiêu đề `Accept-Language`, và trở về ngôn ngữ mặc định nếu không tìm thấy.

</Question>

<Question title="routing.enableProxy làm nhiệm vụ gì?">

Kiểm soát proxy định tuyến locale, middleware xử lý tiền tố và chuyển hướng. Mặc định proxy hoạt động ở chế độ dev và production. Đặt thành `false` nếu bạn tự quản lý đường dẫn.

</Question>

<Question title="Sự khác biệt giữa importMode static, dynamic và fetch là gì?">

`"static"` (mặc định) import từ điển tĩnh để chúng được đóng gói và đọc đồng bộ. `"dynamic"` tải từ điển bất đồng bộ theo từng ngôn ngữ để giảm kích thước bundle ban đầu. `"fetch"` lấy từ điển từ server hoặc CMS tại thời điểm runtime.

</Question>

<Question title="Tôi thiết lập AI provider và API key cho việc dịch tự động ở đâu?">

Trong tệp cấu hình tại phần `ai` hoặc trên dòng lệnh bằng các flag `--provider`, `--model`, và `--api-key`. Khóa API nằm ở môi trường cục bộ của bạn và không bao giờ gửi ra ngoài. Xem [tài liệu cấu hình AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Question>

<Question title="Tôi có cần khởi động lại dev server sau khi thay đổi cấu hình không?">

Thường là không. Watcher của Intlayer giám sát tệp `intlayer.config.ts`: khi bạn lưu tệp, nó sẽ tự động tải lại cấu hình và cập nhật từ điển ở chế độ nền.

</Question>

</FAQ>
