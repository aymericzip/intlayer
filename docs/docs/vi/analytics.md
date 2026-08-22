---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Theo dõi hiển thị nội dung và chạy thử nghiệm A/B
description: Khám phá cách @intlayer/analytics theo dõi lượt xem trang/ngôn ngữ và lượt hiển thị nội dung, cũng như cách sử dụng nó để chạy thử nghiệm A/B trên nội dung Intlayer của bạn.
keywords:
  - Analytics
  - A/B Testing
  - Audience
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Bật phân tích theo mặc định khi `@intlayer/analytics` được cài đặt"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — gói @intlayer/analytics, theo dõi ở cấp độ provider/node, thử nghiệm A/B, dashboard"
author: aymericzip
---

# Tài liệu Intlayer Analytics

`@intlayer/analytics` là một gói đồng hành tùy chọn cho bạn biết **chính xác nội dung nào được hiển thị** cho khách truy cập của bạn — trang nào, bằng ngôn ngữ (locale) nào và đoạn nội dung được dịch cụ thể nào — để bạn có thể hiểu rõ khán giả của mình và chạy **thử nghiệm A/B trên nội dung**.

## Mục lục

<TOC/>

---

## Những gì nó theo dõi

`@intlayer/analytics` gom nhóm ba loại sự kiện ẩn danh thành các batch:

| Sự kiện            | Bắt ở đâu                                            | Cho bạn biết điều gì                                                                                                                                              |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Cấp độ Provider (`IntlayerProvider`)                 | Trang và ngôn ngữ nào mà một phiên (session) đã xem, khi tải lần đầu, khi chuyển hướng (route change) hoặc chuyển ngôn ngữ.                                       |
| `content_exposure` | Cấp độ Node (`useIntlayer` / plugin trình biên dịch) | Khóa từ điển (dictionary key) / đường dẫn khóa nào thực sự được giải quyết và hiển thị — và nếu là một phần của thử nghiệm, thì đó là **biến thể (variant)** nào. |
| `conversion`       | Bất cứ nơi nào bạn gọi `useConversion()`             | Một mục tiêu đạt được (đăng ký, nhấp chuột, mua hàng...) được quy cho (attributed) biến thể A/B mà phiên đó đã tiếp xúc.                                          |

Các sự kiện được thu thập trong bộ nhớ và được gửi dưới dạng một **yêu cầu batch duy nhất khoảng 20 giây một lần** — không bao giờ gửi trên mỗi lần gõ phím hoặc mỗi lần render — do đó, analytics không bao giờ ảnh hưởng đến thời gian render đầu tiên hoặc thêm một yêu cầu cho mỗi tương tác.

## Cách nó hỗ trợ thử nghiệm A/B trên nội dung

Intlayer đã cho phép bạn khai báo [Biến thể (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md) nội dung (ví dụ: từ điển `hero-banner` có biến thể `control` và `black_friday`). `@intlayer/analytics` khép kín quy trình này:

1. `getVariant(experimentKey, variants)` gán một cách tất định mỗi phiên ẩn danh cho một biến thể — đây là một hàm thuần túy (pure function) của session id và khóa thử nghiệm, vì vậy việc gán là **ổn định trong toàn bộ phiên** và **không cần round-trip đến máy chủ** trước lần render đầu tiên (không bị nhấp nháy (flicker), không thay đổi bố cục (layout shift)).
2. Mỗi sự kiện `content_exposure` mang theo `variant` đã được hiển thị.
3. `useConversion()` cho phép bạn quy một mục tiêu (ví dụ: `"cta_click"`) cho biến thể đó.
4. Điểm cuối (endpoint) kết quả thử nghiệm trên dashboard sẽ so sánh tỷ lệ chuyển đổi trên mỗi biến thể, bao gồm cả ý nghĩa thống kê (kiểm định z).

## Cài đặt

`@intlayer/analytics` là **phụ thuộc tùy chọn** của mọi gói framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), nên hầu hết dự án đã có sẵn. Hãy cài đặt tường minh nếu thiết lập của bạn bỏ qua các phụ thuộc tùy chọn (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Chỉ cần cài gói là đủ để bật phân tích: `analytics.enabled` mặc định là `true`, và `@intlayer/config` sẽ chuyển thành `false` bất cứ khi nào không tìm thấy gói trong dự án của bạn. Nếu bạn không cài đặt nó, mọi điểm tích hợp (integration point) sẽ được coi là một hành động trống (no-op) — xem phần [Không tốn phí khi không được cài đặt](#khong-ton-phi-khi-khong-duoc-cai-dat) bên dưới.

## Cấu hình

Phân tích không cần cấu hình để bắt đầu: nó **được bật theo mặc định** và **tái sử dụng khối cấu hình `editor` sẵn có** cho endpoint và khóa dự án.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Cũng được sử dụng làm điểm cuối nhận dữ liệu (ingestion endpoint) cho analytics
    clientId: "your-client-id", // Cũng được sử dụng làm khóa dự án analytics
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — URL cơ sở mà các sự kiện analytics được gửi đến (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — khóa dự án công khai được gắn vào mọi sự kiện được thu nhận. Nó cũng đóng vai trò là **công tắc bật (enable switch)**: analytics hoàn toàn bị vô hiệu hóa (và được loại bỏ bằng tree-shaking, xem bên dưới) cho đến khi `clientId` được định cấu hình.

Nếu bạn tự lưu trữ (self-host) Intlayer, analytics sẽ tự động trỏ đến phiên bản của riêng bạn vì nó dùng chung `editor.backendURL`.

### Cách tắt (opt-out)

Khối `analytics` tùy chọn cho phép tinh chỉnh — hoặc tắt hẳn — việc thu thập:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Mặc định: true — loại toàn bộ tích hợp khỏi gói ứng dụng
    flushInterval: 20_000, // Số mili giây giữa hai lần gửi theo lô
    sampleRate: 1, // Tỷ lệ phiên được ghi lại, từ 0 (không) đến 1 (tất cả)
  },
};

export default config;
```

Gỡ cài đặt `@intlayer/analytics` có tác dụng tương tự `enabled: false`. Xem [tài liệu tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết danh sách đầy đủ các trường.

## Hỗ trợ Framework

Analytics được liên kết với `IntlayerProvider` dùng chung từ `react-intlayer`, vì vậy nó có sẵn ở bất kỳ đâu provider đó được sử dụng:

| Framework                                                | Trạng thái                                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Có sẵn                                                                                             |
| Next.js (`next-intlayer`)                                | ✅ Có sẵn (thông qua `react-intlayer`)                                                                |
| React Native / Expo (`react-native-intlayer`)            | ✅ Có sẵn (thông qua `react-intlayer`)                                                                |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Đã lên kế hoạch — cùng một client, các ràng buộc cấp provider tuân theo mô hình `@intlayer/editor` |

## Cách sử dụng

### Tự động theo dõi ở cấp độ provider

Không cần thay đổi mã nguồn. Khi `@intlayer/analytics` đã được cài đặt và `editor.clientId` được cấu hình, `IntlayerProvider` sẽ tự động:

- khởi tạo analytics client khi mount,
- ghi lại một `page_view` ở lần tải ban đầu,
- ghi lại một `page_view` mỗi khi thay đổi ngôn ngữ,
- bắt đầu vòng lặp flush ~20 giây và flush mọi sự kiện còn lại khi unmount / đóng tab (thông qua `navigator.sendBeacon`, với fallback là `fetch(..., { keepalive: true })`).

### Tự động theo dõi ở cấp độ node

Mỗi khi `useIntlayer` phân giải một phần nội dung để hiển thị, trình thông dịch sẽ báo cáo một sự kiện `content_exposure` cho chính xác `dictionaryKey` + đường dẫn khóa + ngôn ngữ đó — một lần nữa, không cần thay đổi mã. Các lần hiển thị lặp lại của cùng một node trong cùng một cửa sổ flush sẽ được gộp lại thành một sự kiện duy nhất với thuộc tính `count`, vì vậy một danh sách hiển thị lại (re-render) 50 lần sẽ không gửi 50 sự kiện.

### Theo dõi chuyển đổi cho thử nghiệm A/B

Sử dụng `useConversion()` để quy một mục tiêu cho biến thể mà một phiên đã thấy:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Bắt đầu
    </button>
  );
};
```

### Phân giải biến thể phía client (client-side)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Quyền riêng tư & Hiệu suất

- **Ẩn danh theo thiết kế (Anonymous by design)**: các phiên được xác định bằng một id xoay vòng (rotating id); máy chủ (backend) chỉ lưu trữ **mã băm SHA-256** của id đó — không bao giờ lưu trữ id thô và không bao giờ lưu trữ địa chỉ IP.
- **Vị trí là tương đối**: chỉ có mã quốc gia, bắt nguồn từ các tiêu đề vị trí địa lý của CDN (ví dụ: `cf-ipcountry`, `x-vercel-ip-country`, ...) — không có IP nào được đọc hoặc lưu trữ.
- **URL loại trừ tham số tìm kiếm (search params)** theo mặc định, do đó các chuỗi truy vấn (query strings) không bao giờ bị thu thập.
- **Lấy mẫu (Sampling)**: `sampleRate` cho phép bạn chỉ giữ lại một phần nhỏ các sự kiện hiển thị nội dung trên các ứng dụng có lưu lượng truy cập cao.
- **Xử lý theo batch**: một yêu cầu được gửi sau khoảng 20 giây (`flushInterval`), hoặc sớm hơn nếu bộ đệm bị đầy (`maxBufferSize`) — không bao giờ gửi một yêu cầu cho mỗi sự kiện.

### Không tốn phí khi không được cài đặt

`@intlayer/analytics` tuân theo chính xác cùng một mô hình tùy chọn-dependency như `@intlayer/editor`:

- mọi điểm tích hợp đều tải gói này thông qua việc sử dụng **dynamic `import()` được bao bọc trong khối `try/catch`** — một ứng dụng không bao giờ cài đặt `@intlayer/analytics` sẽ không bao giờ bị tăng kích thước bundle hoặc chi phí thời gian chạy, và không bao giờ thấy lỗi;
- một biến môi trường tại thời điểm biên dịch (`INTLAYER_ANALYTICS_ENABLED`), được `@intlayer/config` tự động đặt thành `'false'` khi gói chưa được cài đặt, `analytics.enabled` là `false`, hoặc `editor.clientId` chưa được cấu hình, cho phép các bundler **loại bỏ toàn bộ tích hợp dưới dạng mã chết (dead-code-eliminate)**;
- analytics bị vô hiệu hóa bên trong iframe xem trước của trình chỉnh sửa / CMS Intlayer, do đó các phiên của trình chỉnh sửa không bao giờ được tính là lưu lượng truy cập thực.

## Dashboard: Trang Analytics

Sau khi dự án của bạn đã thu thập các sự kiện, trang **Analytics** trong [Intlayer dashboard](https://app.intlayer.org/analytics) (hiển thị ở thanh bên sau khi dự án được chọn) sẽ hiển thị:

- **Người dùng đang hoạt động (Active users)** — số lượng khách truy cập duy nhất trong khoảng thời gian cuộn (rolling window) đã chọn (7 / 30 / 90 ngày).
- **Người dùng hôm nay** và **người dùng trong 7 ngày qua**.
- **Lượt xem trang (Page views)** trong khoảng thời gian đã chọn.
- Một **biểu đồ diễn biến (evolution graph)** của số khách truy cập duy nhất hàng ngày.
- Các tab phân tích theo **Ngôn ngữ (Locales)** và **Vị trí (Location)**, xếp hạng khán giả của bạn theo ngôn ngữ và quốc gia.

## Tham khảo API Backend (Backend API reference)

Tất cả các điểm cuối (endpoint) để đọc đều yêu cầu xác thực; việc thu thập dữ liệu (ingestion) là công khai và được quy cho thông qua thuộc tính `clientId` trong phần body.

| Phương thức | Điểm cuối (Endpoint)                        | Mô tả                                                                                             |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST`      | `/api/analytics/events`                     | Thu nhận một lô sự kiện (công khai, được gán bởi `clientId` trong body).                          |
| `GET`       | `/api/analytics/overview`                   | Tổng số trang / ngôn ngữ cho dự án đã được xác thực.                                              |
| `GET`       | `/api/analytics/audience?days=30`           | Khách truy cập duy nhất, lượt xem trang, chuỗi ngày, phân tích theo ngôn ngữ + quốc gia.          |
| `GET`       | `/api/analytics/content-stats`              | Tổng số lượt hiển thị theo mỗi nội dung, được nhóm theo khóa từ điển / đường dẫn khóa / ngôn ngữ. |
| `GET`       | `/api/analytics/experiments/:experimentKey` | Tỷ lệ chuyển đổi cho mỗi biến thể và ý nghĩa thống kê cho một thử nghiệm A/B.                     |

Bạn cũng có thể gọi các API này theo chương trình thông qua [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Các liên kết hữu ích

- [Từ điển Động - Bộ sưu tập & Biến thể (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)
- [Trình chỉnh sửa Trực quan Intlayer (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md)
- [Tham khảo Cấu hình (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Hướng dẫn Tự lưu trữ (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md)
