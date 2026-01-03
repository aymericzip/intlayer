---
createdAt: 2024-08-13
updatedAt: 2025-10-25
title: Cấu hình
description: Tìm hiểu cách cấu hình Intlayer cho ứng dụng của bạn. Hiểu các thiết lập và tùy chọn khác nhau để tùy chỉnh Intlayer theo nhu cầu của bạn.
keywords:
  - Cấu hình
  - Thiết lập
  - Tùy chỉnh
  - Intlayer
  - Tùy chọn
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 7.5.0
    date: 2025-12-17
    changes: Thêm tùy chọn `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Thêm cấu hình `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Thay thế `middleware` bằng cấu hình `routing`
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
    changes: Loại bỏ trường `dictionaryOutput` và trường `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Thêm chế độ nhập khẩu `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Thay thế trường `hotReload` bằng `liveSync` và thêm các trường `liveSyncPort` và `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Thay thế `activateDynamicImport` bằng tùy chọn `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Thay đổi giá trị mặc định của contentDir từ `['src']` thành `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Thêm các lệnh `docs`
---

# Tài liệu Cấu hình Intlayer

## Tổng quan

Các tệp cấu hình Intlayer cho phép tùy chỉnh nhiều khía cạnh khác nhau của plugin, chẳng hạn như quốc tế hóa, middleware và xử lý nội dung. Tài liệu này cung cấp mô tả chi tiết về từng thuộc tính trong cấu hình.

---

## Mục lục

<TOC/>

---

## Hỗ trợ tệp cấu hình

Intlayer chấp nhận các định dạng tệp cấu hình JSON, JS, MJS và TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Ví dụ tệp cấu hình

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  dictionary: {
    fill: "./{{fileName}}.content.json",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Đây là một ứng dụng thử nghiệm", // ngữ cảnh ứng dụng AI
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "Đây là một ứng dụng thử nghiệm", // ngữ cảnh ứng dụng AI
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "dictionary": {
    "fill": "./{{fileName}}.content.json",
  },
  "routing": {
    "mode": "prefix-no-default",
    "storage": "cookie",
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Đây là một ứng dụng thử nghiệm", // ngữ cảnh ứng dụng AI
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Tham chiếu Cấu hình

Các phần sau mô tả các thiết lập cấu hình khác nhau có sẵn cho Intlayer.

---

### Cấu hình Quốc tế hóa

Định nghĩa các thiết lập liên quan đến quốc tế hóa, bao gồm các ngôn ngữ có sẵn và ngôn ngữ mặc định cho ứng dụng.

#### Thuộc tính

- **locales**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `['en']`
  - _Mô tả_: Danh sách các ngôn ngữ được hỗ trợ trong ứng dụng.
  - _Ví dụ_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `[]`
  - _Mô tả_: Danh sách các ngôn ngữ bắt buộc trong ứng dụng.
  - _Ví dụ_: `[]`
  - _Lưu ý_: Nếu để trống, tất cả các ngôn ngữ đều bắt buộc trong chế độ `strict`.
  - _Lưu ý_: Đảm bảo các ngôn ngữ bắt buộc cũng được định nghĩa trong trường `locales`.
- **strictMode**:
  - _Kiểu_: `string`
  - _Mặc định_: `inclusive`
  - _Mô tả_: Đảm bảo việc triển khai nội dung quốc tế hóa mạnh mẽ bằng cách sử dụng typescript.
  - _Lưu ý_: Nếu được đặt thành "strict", hàm dịch `t` sẽ yêu cầu mỗi ngôn ngữ được khai báo phải được định nghĩa. Nếu thiếu một ngôn ngữ hoặc nếu một ngôn ngữ không được khai báo trong cấu hình của bạn, nó sẽ báo lỗi.
  - _Lưu ý_: Nếu được đặt thành "inclusive", hàm dịch `t` sẽ yêu cầu mỗi ngôn ngữ được khai báo phải được định nghĩa. Nếu thiếu một ngôn ngữ, nó sẽ cảnh báo. Nhưng sẽ chấp nhận nếu một ngôn ngữ không được khai báo trong cấu hình của bạn nhưng tồn tại.
  - _Lưu ý_: Nếu được đặt thành "loose", hàm dịch `t` sẽ chấp nhận bất kỳ ngôn ngữ nào tồn tại.

- **defaultLocale**:
  - _Kiểu_: `string`
  - _Mặc định_: `'en'`
  - _Mô tả_: Ngôn ngữ mặc định được sử dụng làm dự phòng nếu ngôn ngữ yêu cầu không được tìm thấy.
  - _Ví dụ_: `'en'`
  - _Lưu ý_: Điều này được sử dụng để xác định ngôn ngữ khi không có ngôn ngữ nào được chỉ định trong URL, cookie hoặc header.

---

### Cấu hình Trình soạn thảo

Định nghĩa các thiết lập liên quan đến trình soạn thảo tích hợp, bao gồm cổng máy chủ và trạng thái hoạt động.

#### Thuộc tính

- **applicationURL**:
  - _Kiểu_: `string`
  - _Mặc định_: `http://localhost:3000`
  - _Mô tả_: URL của ứng dụng. Được sử dụng để giới hạn nguồn gốc của trình soạn thảo vì lý do bảo mật.
  - _Ví dụ_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Lưu ý_: URL của ứng dụng. Được sử dụng để giới hạn nguồn gốc của trình soạn thảo vì lý do bảo mật. Nếu được đặt thành `'*'`, trình soạn thảo có thể truy cập từ bất kỳ nguồn gốc nào.

- **port**:
  - _Kiểu_: `number`
  - _Mặc định_: `8000`
  - _Mô tả_: Cổng được sử dụng bởi máy chủ trình soạn thảo trực quan.

- **editorURL**:
  - _Kiểu_: `string`
  - _Mặc định_: `'http://localhost:8000'`
  - _Mô tả_: URL của máy chủ trình soạn thảo. Được sử dụng để giới hạn nguồn gốc của trình soạn thảo vì lý do bảo mật.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Lưu ý_: URL của máy chủ trình soạn thảo để truy cập từ ứng dụng. Được sử dụng để giới hạn các nguồn gốc có thể tương tác với ứng dụng vì lý do bảo mật. Nếu được đặt thành `'*'`, trình soạn thảo có thể truy cập từ bất kỳ nguồn gốc nào. Nên được đặt nếu cổng bị thay đổi, hoặc nếu trình soạn thảo được lưu trữ trên một miền khác.

- **cmsURL**:
  - _Kiểu_: `string`
  - _Mặc định_: `'https://intlayer.org'`
  - _Mô tả_: URL của Intlayer CMS.
  - _Ví dụ_: `'https://intlayer.org'`
  - _Lưu ý_: URL của Intlayer CMS.

- **backendURL**:
  - _Kiểu_: `string`
  - _Mặc định_: `https://back.intlayer.org`
  - _Mô tả_: URL của máy chủ backend.
  - _Ví dụ_: `http://localhost:4000`

- **enabled**:
  - _Kiểu_: `boolean`
  - _Mặc định_: `true`
  - _Mô tả_: Chỉ ra liệu ứng dụng có tương tác với trình soạn thảo trực quan hay không.
  - _Ví dụ_: `process.env.NODE_ENV !== 'production'`
  - _Lưu ý_: Nếu là true, trình soạn thảo sẽ có thể tương tác với ứng dụng. Nếu là false, trình soạn thảo sẽ không thể tương tác với ứng dụng. Trong mọi trường hợp, trình soạn thảo chỉ có thể được kích hoạt bởi trình soạn thảo trực quan. Việc vô hiệu hóa trình soạn thảo cho các môi trường cụ thể là một cách để tăng cường bảo mật.

- **clientId**:
  - _Kiểu_: `string` | `undefined`
  - _Mặc định_: `undefined`
  - _Mô tả_: clientId và clientSecret cho phép các package của intlayer xác thực với backend sử dụng xác thực oAuth2. Một access token được sử dụng để xác thực người dùng liên quan đến dự án. Để lấy access token, truy cập https://app.intlayer.org/project và tạo một tài khoản.
  - _Ví dụ_: `true`
  - _Lưu ý_: Quan trọng: clientId và clientSecret cần được giữ bí mật và không được chia sẻ công khai. Vui lòng đảm bảo giữ chúng ở nơi an toàn, chẳng hạn như biến môi trường.

- **clientSecret**:
  - _Kiểu_: `string` | `undefined`
  - _Mặc định_: `undefined`
  - _Mô tả_: clientId và clientSecret cho phép các package của intlayer xác thực với backend sử dụng xác thực oAuth2. Một access token được sử dụng để xác thực người dùng liên quan đến dự án. Để lấy access token, truy cập https://app.intlayer.org/project và tạo một tài khoản.
  - _Ví dụ_: `true`
  - _Lưu ý_: Quan trọng: clientId và clientSecret cần được giữ bí mật và không được chia sẻ công khai. Vui lòng đảm bảo giữ chúng ở nơi an toàn, chẳng hạn như biến môi trường.

- **dictionaryPriorityStrategy**:
  - _Kiểu_: `string`
  - _Mặc định_: `'local_first'`
  - _Mô tả_: Chiến lược ưu tiên từ điển trong trường hợp có cả từ điển cục bộ và từ điển từ xa. Nếu được đặt thành `'distant_first'`, ứng dụng sẽ ưu tiên từ điển từ xa hơn từ điển cục bộ. Nếu được đặt thành `'local_first'`, ứng dụng sẽ ưu tiên từ điển cục bộ hơn từ điển từ xa.
  - _Ví dụ_: `'distant_first'`

- **liveSync**:
  - _Kiểu_: `boolean`
  - _Mặc định_: `false`
  - _Mô tả_: Chỉ định liệu server ứng dụng có nên tải lại nóng nội dung của ứng dụng khi phát hiện có thay đổi trên CMS / Visual Editor / Backend hay không.
  - _Ví dụ_: `true`
  - _Lưu ý_: Ví dụ, khi một từ điển mới được thêm hoặc cập nhật, ứng dụng sẽ cập nhật nội dung để hiển thị trên trang.
  - _Lưu ý_: Live sync cần phải đưa nội dung của ứng dụng ra một server khác. Điều này có nghĩa là nó có thể ảnh hưởng nhẹ đến hiệu năng của ứng dụng. Để hạn chế điều này, chúng tôi khuyến nghị nên host ứng dụng và server live sync trên cùng một máy. Ngoài ra, sự kết hợp giữa live sync và `optimize` có thể tạo ra một số lượng lớn các yêu cầu đến server live sync. Tùy thuộc vào hạ tầng của bạn, chúng tôi khuyến nghị nên thử nghiệm cả hai tùy chọn và sự kết hợp của chúng.

- **liveSyncPort**:
  - _Kiểu_: `number`
  - _Mặc định_: `4000`
  - _Mô tả_: Cổng của server live sync.
  - _Ví dụ_: `4000`
  - _Lưu ý_: Cổng của server live sync.

- **liveSyncURL**:
  - _Kiểu_: `string`
  - _Mặc định_: `'http://localhost:{liveSyncPort}'`
  - _Mô tả_: URL của server live sync.
  - _Ví dụ_: `'https://example.com'`
  - _Lưu ý_: Mặc định trỏ tới localhost nhưng có thể thay đổi thành bất kỳ URL nào trong trường hợp server live sync từ xa.

### Cấu hình Routing

Các thiết lập kiểm soát hành vi routing, bao gồm cấu trúc URL, lưu trữ locale và xử lý middleware.

#### Thuộc tính

- **mode**:
  - _Kiểu_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Mặc định_: `'prefix-no-default'`
  - _Mô tả_: Chế độ routing URL để xử lý locale.
  - _Ví dụ_:
    - `'prefix-no-default'`: `/dashboard` (en) hoặc `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) hoặc `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale được xử lý bằng cách khác)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Lưu ý_: Thiết lập này không ảnh hưởng đến quản lý cookie hoặc lưu trữ locale.

- **storage**:
  - _Kiểu_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Mặc định_: `'localStorage'`
  - _Mô tả_: Cấu hình để lưu trữ locale trên client.

  - **cookie**:
    - _Mô tả_: Lưu dữ liệu trong cookie, các mẩu dữ liệu nhỏ được lưu trên trình duyệt của client, có thể truy cập cả phía client và server.
    - _Lưu ý_: Để tuân thủ GDPR, cần đảm bảo có sự đồng ý của người dùng trước khi sử dụng.
    - _Lưu ý_: Các tham số cookie có thể tùy chỉnh nếu được đặt dưới dạng CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Mô tả_: Lưu dữ liệu trong trình duyệt mà không có ngày hết hạn, cho phép dữ liệu tồn tại qua các phiên làm việc, chỉ có thể truy cập ở phía client.
    - _Lưu ý_: Phù hợp để lưu trữ dữ liệu lâu dài nhưng cần lưu ý về các vấn đề bảo mật và quyền riêng tư do dữ liệu không hết hạn trừ khi được xóa rõ ràng.
    - _Lưu ý_: Bộ lưu trữ locale chỉ có thể truy cập ở phía client, proxy intlayer sẽ không thể truy cập được.
    - _Lưu ý_: Các tham số lưu trữ locale có thể tùy chỉnh nếu được đặt dưới dạng StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Mô tả_: Lưu dữ liệu trong suốt phiên làm việc của trang, nghĩa là dữ liệu sẽ bị xóa khi tab hoặc cửa sổ trình duyệt đóng, chỉ có thể truy cập ở phía client.
    - _Lưu ý_: Phù hợp để lưu trữ dữ liệu tạm thời cho mỗi phiên làm việc.
    - _Lưu ý_: Bộ lưu trữ locale chỉ có thể truy cập ở phía client, proxy intlayer sẽ không thể truy cập được.
    - _Lưu ý_: Các tham số lưu trữ locale có thể tùy chỉnh nếu được đặt dưới dạng StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Mô tả_: Sử dụng các header HTTP để lưu trữ hoặc truyền dữ liệu locale, phù hợp cho việc xác định ngôn ngữ phía server.
    - _Lưu ý_: Hữu ích trong các cuộc gọi API để duy trì cài đặt ngôn ngữ nhất quán qua các yêu cầu.
    - _Lưu ý_: Header chỉ có thể truy cập ở phía server, phía client sẽ không thể truy cập được.
    - _Lưu ý_: Tên header có thể tùy chỉnh nếu được đặt dưới dạng StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Kiểu_: `string`
  - _Mặc định_: `''`
  - _Mô tả_: Đường dẫn cơ sở cho các URL của ứng dụng.
  - _Ví dụ_: `'/my-app'`
  - _Lưu ý_:
    - Nếu ứng dụng được lưu trữ tại `https://example.com/my-app`
    - Đường dẫn cơ sở là `'/my-app'`
    - URL sẽ là `https://example.com/my-app/en`
    - Nếu không đặt đường dẫn cơ sở, URL sẽ là `https://example.com/en`

#### Thuộc tính Cookie

Khi sử dụng lưu trữ cookie, bạn có thể cấu hình thêm các thuộc tính cookie:

- **name**: Tên cookie (mặc định: `'INTLAYER_LOCALE'`)
- **domain**: Miền cookie (mặc định: không xác định)
- **path**: Đường dẫn cookie (mặc định: không xác định)
- **secure**: Yêu cầu HTTPS (mặc định: không xác định)
- **httpOnly**: Cờ chỉ HTTP (mặc định: không xác định)
- **sameSite**: Chính sách SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Ngày hết hạn hoặc số ngày (mặc định: không xác định)

#### Thuộc tính lưu trữ Locale

Khi sử dụng localStorage hoặc sessionStorage:

- **type**: Loại lưu trữ (`'localStorage' | 'sessionStorage'`)
- **name**: Tên khóa lưu trữ (mặc định: `'INTLAYER_LOCALE'`)

#### Ví dụ cấu hình

Dưới đây là một số ví dụ cấu hình phổ biến cho cấu trúc routing mới v7:

**Cấu hình cơ bản (Mặc định)**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Cấu hình tuân thủ GDPR**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Chế độ Tham số Tìm kiếm**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Chế độ Không Tiền Tố với Bộ Lưu Trữ Tùy Chỉnh**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-custom-locale",
    basePath: "/my-app",
  },
});
```

---

### Cấu hình Nội dung

Các thiết lập liên quan đến việc xử lý nội dung trong ứng dụng, bao gồm tên thư mục, phần mở rộng tệp, và các cấu hình dẫn xuất.

#### Thuộc tính

- **watch**:
  - _Kiểu_: `boolean`
  - _Mặc định_: `process.env.NODE_ENV === 'development'`
  - _Mô tả_: Chỉ định liệu Intlayer có nên theo dõi các thay đổi trong các tệp khai báo nội dung trong ứng dụng để xây dựng lại các từ điển liên quan hay không.

- **fileExtensions**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Mô tả_: Các phần mở rộng tệp cần tìm khi xây dựng từ điển.
  - _Ví dụ_: `['.data.ts', '.data.js', '.data.json']`
  - _Lưu ý_: Tùy chỉnh phần mở rộng tệp có thể giúp tránh xung đột.

- **baseDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `process.cwd()`
  - _Mô tả_: Thư mục gốc của dự án.
  - _Ví dụ_: `'/path/to/project'`
  - _Lưu ý_: Được sử dụng để giải quyết tất cả các thư mục liên quan đến Intlayer.

- **contentDir**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `['.']`
  - _Ví dụ_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Mô tả_: Đường dẫn thư mục nơi lưu trữ nội dung.

- **dictionariesDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'.intlayer/dictionaries'`
  - _Mô tả_: Đường dẫn thư mục để lưu trữ kết quả trung gian hoặc đầu ra.

- **moduleAugmentationDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'.intlayer/types'`
  - _Mô tả_: Thư mục dành cho việc mở rộng module, giúp IDE gợi ý và kiểm tra kiểu tốt hơn.
  - _Ví dụ_: `'intlayer-types'`
  - _Lưu ý_: Hãy chắc chắn bao gồm thư mục này trong `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'.intlayer/unmerged_dictionary'`
  - _Mô tả_: Thư mục để lưu trữ các từ điển chưa được hợp nhất.
  - _Ví dụ_: `'translations'`

- **dictionariesDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'.intlayer/dictionary'`
  - _Mô tả_: Thư mục để lưu trữ các từ điển bản địa hóa.
  - _Ví dụ_: `'translations'`

- **typesDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'types'`
  - _Mô tả_: Thư mục để lưu trữ các kiểu của từ điển.
  - _Ví dụ_: `'intlayer-types'`

- **mainDir**:
  - _Kiểu_: `string`
  - _Mặc định_: `'main'`
  - _Mô tả_: Thư mục nơi lưu trữ các tệp chính của ứng dụng.
  - _Ví dụ_: `'intlayer-main'`

- **excludedPath**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Mô tả_: Các thư mục bị loại trừ khỏi việc tìm kiếm nội dung.
  - _Lưu ý_: Cài đặt này hiện chưa được sử dụng, nhưng dự kiến sẽ được triển khai trong tương lai.

- **formatCommand**:
  - _Kiểu_: `string`
  - _Mặc định_: `undefined`
  - _Mô tả_: Lệnh để định dạng nội dung. Khi Intlayer ghi các tệp .content của bạn trên máy cục bộ, lệnh này sẽ được sử dụng để định dạng nội dung.
  - _Ví dụ_: `'npx prettier --write "{{file}}" --log-level silent'` Sử dụng Prettier
  - _Ví dụ_: `'npx biome format "{{file}}" --write --log-level none'` Sử dụng Biome
  - _Ví dụ_: `'npx eslint --fix "{{file}}"  --quiet'` Sử dụng ESLint
  - _Lưu ý_: Intlayer sẽ thay thế {{file}} bằng đường dẫn của tệp cần định dạng.
  - _Lưu ý_: Nếu không được thiết lập, Intlayer sẽ cố gắng tự động phát hiện lệnh định dạng. Bằng cách thử giải quyết các lệnh sau: prettier, biome, eslint.

### Cấu hình Từ điển

Các cài đặt kiểm soát hoạt động của từ điển, bao gồm hành vi tự động điền và tạo nội dung.

Cấu hình từ điển này phục vụ hai mục đích chính:

1. **Giá trị Mặc định**: Định nghĩa các giá trị mặc định khi tạo các tệp khai báo nội dung
2. **Hành vi Dự phòng**: Cung cấp các giá trị dự phòng khi các trường cụ thể không được định nghĩa, cho phép bạn định nghĩa hành vi hoạt động của từ điển trên toàn cục

Để biết thêm thông tin về các tệp khai báo nội dung và cách các giá trị cấu hình được áp dụng, xem [Tài liệu Tệp Nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

#### Thuộc tính

- **fill**
- **description**
- **locale**
- **priority**
- **live**
- **title**
- **tags**
- **version**

---

### Cấu hình Logger

Các cài đặt kiểm soát logger, bao gồm tiền tố sử dụng.

#### Thuộc tính

- **mode**:
  - _Kiểu_: `string`
  - _Mặc định_: `default`
  - _Mô tả_: Chỉ định chế độ của logger.
  - _Tùy chọn_: `default`, `verbose`, `disabled`
  - _Ví dụ_: `default`
  - _Lưu ý_: Chế độ của logger. Chế độ verbose sẽ ghi lại nhiều thông tin hơn, nhưng có thể được sử dụng cho mục đích gỡ lỗi. Chế độ disabled sẽ tắt logger.

- **prefix**:
  - _Kiểu_: `string`
  - _Mặc định_: `'[intlayer] '`
  - _Mô tả_: Tiền tố của logger.
  - _Ví dụ_: `'[my custom prefix] '`
  - _Lưu ý_: Tiền tố của logger.

### Cấu hình AI

Các cài đặt kiểm soát các tính năng AI của Intlayer, bao gồm nhà cung cấp, mô hình và khóa API.

Cấu hình này là tùy chọn nếu bạn đã đăng ký trên [Bảng điều khiển Intlayer](https://app.intlayer.org/project) bằng khóa truy cập. Intlayer sẽ tự động quản lý giải pháp AI hiệu quả và tiết kiệm chi phí nhất cho nhu cầu của bạn. Sử dụng các tùy chọn mặc định đảm bảo khả năng bảo trì lâu dài tốt hơn khi Intlayer liên tục cập nhật để sử dụng các mô hình phù hợp nhất.

Nếu bạn muốn sử dụng khóa API riêng hoặc mô hình cụ thể, bạn có thể định nghĩa cấu hình AI tùy chỉnh của mình.
Cấu hình AI này sẽ được sử dụng toàn cục trong môi trường Intlayer của bạn. Các lệnh CLI sẽ sử dụng các cài đặt này làm mặc định cho các lệnh (ví dụ: `fill`), cũng như SDK, Visual Editor và CMS. Bạn có thể ghi đè các giá trị mặc định này cho các trường hợp sử dụng cụ thể bằng cách sử dụng các tham số lệnh.

Intlayer hỗ trợ nhiều nhà cung cấp AI để tăng tính linh hoạt và lựa chọn. Các nhà cung cấp hiện được hỗ trợ bao gồm:

- **OpenAI** (mặc định)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Thuộc tính

- **provider**:
  - _Kiểu_: `string`
  - _Mặc định_: `'openai'`
  - _Mô tả_: Nhà cung cấp được sử dụng cho các tính năng AI của Intlayer.
  - _Tùy chọn_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`
  - _Ví dụ_: `'anthropic'`
  - _Lưu ý_: Các nhà cung cấp khác nhau có thể yêu cầu các khóa API khác nhau và có các mô hình giá khác nhau.

- **model**:
  - _Kiểu_: `string`
  - _Mặc định_: Không có
  - _Mô tả_: Mô hình được sử dụng cho các tính năng AI của Intlayer.
  - _Ví dụ_: `'gpt-4o-2024-11-20'`
  - _Lưu ý_: Mô hình cụ thể được sử dụng sẽ khác nhau tùy theo nhà cung cấp.

- **temperature**:
  - _Kiểu_: `number`
  - _Mặc định_: Không có
  - _Mô tả_: Tham số temperature điều khiển độ ngẫu nhiên trong các phản hồi của AI.
  - _Ví dụ_: `0.1`
  - _Lưu ý_: Temperature cao hơn sẽ làm AI sáng tạo hơn và ít dự đoán được hơn.

- **apiKey**:
  - _Kiểu_: `string`
  - _Mặc định_: Không có
  - _Mô tả_: Khóa API của bạn cho nhà cung cấp đã chọn.
  - _Ví dụ_: `process.env.OPENAI_API_KEY`
  - _Lưu ý_: Quan trọng: Các khóa API cần được giữ bí mật và không được chia sẻ công khai. Vui lòng đảm bảo giữ chúng ở một vị trí an toàn, chẳng hạn như biến môi trường.

- **applicationContext**:
  - _Kiểu_: `string`
  - _Mặc định_: Không có
  - _Mô tả_: Cung cấp bối cảnh bổ sung về ứng dụng của bạn cho mô hình AI, giúp nó tạo ra các bản dịch chính xác hơn và phù hợp với ngữ cảnh. Điều này có thể bao gồm thông tin về lĩnh vực ứng dụng, đối tượng mục tiêu, giọng điệu hoặc thuật ngữ cụ thể của bạn.

- **baseURL**:
  - _Kiểu_: `string`
  - _Mặc định_: Không có
  - _Mô tả_: URL cơ sở cho API AI.
  - _Ví dụ_: `'https://api.openai.com/v1'`
  - _Lưu ý_: Có thể được sử dụng để trỏ đến một điểm cuối API AI cục bộ hoặc tùy chỉnh.

### Cấu hình Build

Các thiết lập kiểm soát cách Intlayer tối ưu hóa và xây dựng tính quốc tế hóa của ứng dụng bạn.

Các tùy chọn build áp dụng cho các plugin `@intlayer/babel` và `@intlayer/swc`.

> Ở chế độ phát triển, Intlayer sử dụng các import tĩnh cho từ điển để đơn giản hóa trải nghiệm phát triển.

> Khi được tối ưu hóa, Intlayer sẽ thay thế các lệnh gọi từ điển để tối ưu hóa việc chia nhỏ, do đó gói cuối cùng chỉ nhập các từ điển thực sự được sử dụng.

#### Thuộc tính

- **mode**:
  - _Kiểu_: `'auto' | 'manual'`
  - _Mặc định_: `'auto'`
  - _Mô tả_: Điều khiển chế độ build.
  - _Ví dụ_: `'manual'`
  - _Lưu ý_: Nếu 'auto', build sẽ được bật tự động khi ứng dụng được build.
  - _Lưu ý_: Nếu 'manual', build sẽ chỉ được đặt khi lệnh build được thực thi.
  - _Lưu ý_: Có thể được sử dụng để vô hiệu hóa build từ điển, ví dụ khi nên tránh thực thi trong môi trường Node.js.

- **optimize**:
  - _Kiểu_: `boolean`
  - _Mặc định_: `process.env.NODE_ENV === 'production'`
  - _Mô tả_: Điều khiển việc có nên tối ưu hóa quá trình build hay không.
  - _Ví dụ_: `true`
  - _Lưu ý_: Khi được bật, Intlayer sẽ thay thế tất cả các lệnh gọi từ điển để tối ưu hóa việc chia nhỏ. Bằng cách đó, gói cuối cùng sẽ chỉ nhập các từ điển được sử dụng. Tất cả các import sẽ vẫn giữ ở dạng import tĩnh để tránh xử lý bất đồng bộ khi tải các từ điển.
  - _Lưu ý_: Intlayer sẽ thay thế tất cả các lệnh gọi `useIntlayer` bằng chế độ được định nghĩa trong tùy chọn `importMode` và `getIntlayer` bằng `getDictionary`.
  - _Lưu ý_: Tùy chọn này dựa vào các plugin `@intlayer/babel` và `@intlayer/swc`.
  - _Lưu ý_: Đảm bảo tất cả các khóa được khai báo tĩnh trong các lệnh gọi `useIntlayer`. Ví dụ: `useIntlayer('navbar')`.

- **importMode**:
  - _Kiểu_: `'static' | 'dynamic' | 'live'`
  - _Mặc định_: `'static'`
  - _Mô tả_: Điều khiển cách các từ điển được nhập.
  - _Ví dụ_: `'dynamic'`
  - _Lưu ý_: Các chế độ có sẵn:
    - "static": Các từ điển được nhập một cách tĩnh. Thay thế `useIntlayer` bằng `useDictionary`.
    - "dynamic": Các từ điển được nhập động sử dụng Suspense. Thay thế `useIntlayer` bằng `useDictionaryDynamic`.
    - "live": Các từ điển được lấy động bằng cách sử dụng API đồng bộ trực tiếp (live sync API). Thay thế `useIntlayer` bằng `useDictionaryDynamic`.
  - _Lưu ý_: Việc nhập động dựa vào Suspense và có thể ảnh hưởng nhẹ đến hiệu suất render.
  - _Lưu ý_: Nếu tắt, tất cả các locale sẽ được tải cùng một lúc, ngay cả khi chúng không được sử dụng.
  - _Lưu ý_: Tùy chọn này dựa vào các plugin `@intlayer/babel` và `@intlayer/swc`.
  - _Lưu ý_: Đảm bảo tất cả các khóa được khai báo tĩnh trong các lệnh gọi `useIntlayer`. Ví dụ: `useIntlayer('navbar')`.
  - _Lưu ý_: Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị tắt.
  - _Lưu ý_: Nếu được đặt thành "live", chỉ những từ điển bao gồm nội dung từ xa và được đánh dấu là "live" mới được chuyển đổi sang chế độ live. Các từ điển khác sẽ được nhập động dưới dạng chế độ "dynamic" để tối ưu số lượng truy vấn fetch và hiệu suất tải.
  - _Lưu ý_: Chế độ live sẽ sử dụng live sync API để lấy các từ điển. Nếu cuộc gọi API thất bại, các từ điển sẽ được nhập động dưới dạng chế độ "dynamic".
  - _Lưu ý_: Tùy chọn này sẽ không ảnh hưởng đến các hàm `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` và `useDictionaryDynamic`.
- **outputFormat**:
  - _Kiểu_: `'esm' | 'cjs'`
  - _Mặc định_: `'esm'`
  - _Mô tả_: Điều khiển định dạng đầu ra của các từ điển.
  - _Ví dụ_: `'cjs'`
  - _Lưu ý_: Định dạng đầu ra của các từ điển.

- **traversePattern**:
  - _Kiểu_: `string[]`
  - _Mặc định_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Mô tả_: Các mẫu định nghĩa những tệp nào sẽ được duyệt trong quá trình tối ưu hóa.
    - _Ví dụ_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Lưu ý_: Sử dụng để giới hạn tối ưu hóa chỉ cho các tệp mã liên quan và cải thiện hiệu suất xây dựng.
  - _Lưu ý_: Tùy chọn này sẽ bị bỏ qua nếu `optimize` bị vô hiệu hóa.
  - _Lưu ý_: Sử dụng mẫu glob.
