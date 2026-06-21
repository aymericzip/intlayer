---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: Plugin Đồng bộ JSON
description: Đồng bộ từ điển Intlayer với các tệp JSON i18n của bên thứ ba (i18next, next-intl, react-intl, vue-i18n và nhiều hơn nữa). Giữ nguyên i18n hiện có của bạn trong khi sử dụng Intlayer để quản lý, dịch và kiểm tra các thông điệp của bạn.
keywords:
  - Intlayer
  - Đồng bộ JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - bản dịch
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Thêm tùy chọn splitKeys (một từ điển cho mỗi khóa namespace cấp cao nhất) cho bố cục tệp đơn của next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Thêm hỗ trợ định dạng ICU và i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Tài liệu Plugin Đồng bộ JSON ban đầu"
author: aymericzip
---

# Đồng bộ JSON (cầu nối i18n) - Đồng bộ JSON với hỗ trợ ICU / i18next

<iframe title="Cách giữ bản dịch JSON của bạn đồng bộ với Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Sử dụng Intlayer như một tiện ích bổ sung cho bộ công cụ i18n hiện có của bạn. Plugin này giữ cho các thông điệp JSON của bạn đồng bộ với từ điển Intlayer để bạn có thể:

- Giữ nguyên i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, v.v.
- Quản lý và dịch các thông điệp của bạn với Intlayer (CLI, CI, nhà cung cấp, CMS), mà không cần tái cấu trúc ứng dụng của bạn.
- Phát hành các hướng dẫn và nội dung SEO nhắm mục tiêu từng hệ sinh thái, đồng thời đề xuất Intlayer như lớp quản lý JSON.

Ghi chú và phạm vi hiện tại:

- Việc ngoại hóa sang CMS hoạt động cho cả bản dịch và văn bản cổ điển.
- Chưa hỗ trợ chèn, số nhiều/ICU, hoặc các tính năng runtime nâng cao của các thư viện khác.
- Trình chỉnh sửa trực quan chưa được hỗ trợ cho các đầu ra i18n của bên thứ ba.

### Khi nào nên sử dụng plugin này

- Bạn đã sử dụng một thư viện i18n và lưu trữ các thông điệp trong các tệp JSON.
- Bạn muốn hỗ trợ điền bằng AI, kiểm tra trong CI, và vận hành nội dung mà không thay đổi runtime kết xuất của bạn.

## Cài đặt

```bash
pnpm add -D @intlayer/sync-json-plugin
# hoặc
npm i -D @intlayer/sync-json-plugin
```

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

Add the plugin to your `intlayer.config.ts` and point it at your existing JSON structure.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Giữ cho các tệp JSON hiện tại của bạn đồng bộ với từ điển Intlayer
  plugins: [
    syncJSON({
      // Bố cục theo từng locale, từng namespace (ví dụ: next-intl, i18next với namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Phương án thay thế: một tệp duy nhất cho mỗi locale (thường dùng với i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

### Cách hoạt động

- Đọc: plugin phát hiện các tệp JSON từ builder `source` của bạn và tải chúng như các từ điển Intlayer.
- Ghi: sau khi build và điền, plugin ghi các tệp JSON đã được bản địa hóa trở lại cùng đường dẫn (với một dòng mới cuối cùng để tránh lỗi định dạng).
- Tự động điền: plugin khai báo một đường dẫn `autoFill` cho mỗi từ điển. Chạy lệnh `intlayer fill` sẽ chỉ cập nhật các bản dịch còn thiếu trong các tệp JSON của bạn theo mặc định.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // bắt buộc
  location?: string, // nhãn tùy chọn, mặc định: "plugin"
  priority?: number, // ưu tiên tùy chọn để giải quyết xung đột, mặc định: 0
  format?: 'intlayer' | 'icu' | 'i18next', // bộ định dạng tùy chọn, được sử dụng cho tương thích runtime Intlayer
  splitKeys?: boolean, // tùy chọn, chia một tệp thành một từ điển cho mỗi khóa cấp cao nhất (tự động phát hiện)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Chỉ định bộ định dạng sẽ được sử dụng cho nội dung từ điển khi đồng bộ hóa các tệp JSON. Điều này cho phép sử dụng các cú pháp định dạng thông báo khác nhau tương thích với runtime Intlayer.

- `undefined`: Không sử dụng bộ định dạng nào, nội dung JSON sẽ được sử dụng nguyên trạng.
- `'intlayer'`: Bộ định dạng Intlayer mặc định (mặc định).
- `'icu'`: Sử dụng định dạng thông báo ICU (tương thích với các thư viện như react-intl, vue-i18n).
- `'i18next'`: Sử dụng định dạng thông báo i18next (tương thích với i18next, next-i18next, Solid-i18next).

> Lưu ý rằng việc sử dụng bộ định dạng sẽ chuyển đổi nội dung JSON của bạn ở đầu vào và đầu ra. Đối với các quy tắc JSON phức tạp như số nhiều ICU, việc phân tích có thể không đảm bảo ánh xạ 1 đối 1 giữa đầu vào và đầu ra.
> Nếu bạn không sử dụng runtime Intlayer, bạn có thể muốn không thiết lập bộ định dạng.

**Ví dụ:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Sử dụng định dạng i18next để tương thích
}),
```

#### `splitKeys` (boolean)

Kiểm soát liệu một tệp JSON duy nhất mà **các khóa cấp đầu tiên là các namespace** có nên trở thành một từ điển cho mỗi khóa cấp cao nhất, thay vì một từ điển duy nhất chứa toàn bộ tệp.

Điều này phù hợp với mô hình namespace của các thư viện như `next-intl` và `react-intl`, nơi một tệp `messages/{locale}.json` nhóm nhiều namespace theo các khóa cấp đầu tiên của nó, mỗi khóa được xử lý độc lập (ví dụ: `useTranslations('Hero')` phân giải thành từ điển `Hero`).

- `undefined` (mặc định): **tự động phát hiện** — tệp được chia khi mẫu `source` không có phân đoạn `{key}` (một tệp chứa mọi namespace), và được giữ dưới dạng một từ điển duy nhất nếu không (một tệp cho mỗi khóa).
- `true`: luôn chia mỗi khóa cấp cao nhất thành từ điển riêng của nó.
- `false`: không bao giờ chia; toàn bộ tệp trở thành một từ điển duy nhất.

Given a single `messages/{locale}.json` file:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // implied because the pattern has no `{key}` segment
}),
```

Điều này tạo ra ba từ điển — `Hero`, `Nav`, và `About` — do đó `useTranslations('Hero')` (next-intl) phân giải chính xác. Khi ghi lại, tất cả các namespace được tập hợp lại vào cùng một tệp theo từng locale.

> Khi bạn giữ phân đoạn `{key}` rõ ràng trong `source` của mình (ví dụ: `./locales/${locale}/${key}.json`), mỗi tệp đã là một namespace, vì vậy việc chia tách bị tắt theo mặc định.

### Multiple JSON sources and priority

You can add multiple `syncJSON` plugins to synchronize different JSON sources. This is useful when you have multiple i18n libraries or different JSON structures in your project.

#### Priority system

When multiple plugins target the same dictionary key, the `priority` parameter determines which plugin takes precedence:

- Higher priority numbers win over lower ones
- Default priority of `.content` files is `0`
- Default priority of plugins is `0`
- Plugins with the same priority are processed in the order they appear in the configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Nguồn JSON chính (ưu tiên cao nhất)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Nguồn JSON dự phòng (ưu tiên thấp hơn)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Nguồn JSON kế thừa (ưu tiên thấp nhất)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing JSON files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: per‑locale layout, still read‑only (only the selected locale is loaded):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching JSON files.
- Ingest: loads each JSON file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncJSON` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` pattern so `intlayer content fill` can populate missing keys.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Split a single file into one dictionary per top-level key (auto-detected)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Chỉ định bộ định dạng sẽ được sử dụng cho nội dung từ điển khi tải các tệp JSON. Điều này cho phép sử dụng các cú pháp định dạng thông báo khác nhau tương thích với các thư viện i18n khác nhau.

- `'intlayer'`: Bộ định dạng Intlayer mặc định (mặc định).
- `'icu'`: Sử dụng định dạng thông báo ICU (tương thích với các thư viện như react-intl, vue-i18n).
- `'i18next'`: Sử dụng định dạng thông báo i18next (tương thích với i18next, next-i18next, Solid-i18next).

**Ví dụ:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Sử dụng định dạng ICU để tương thích
}),
```

#### `splitKeys` (boolean)

Hành vi tương tự như trong [`syncJSON`](#splitkeys-boolean): khi một tệp JSON duy nhất nhóm nhiều namespace theo các khóa cấp đầu tiên của nó, mỗi khóa cấp cao nhất sẽ trở thành từ điển riêng của nó.

- `undefined` (mặc định): **tự động phát hiện** — chia khi mẫu `source` không có phân đoạn `{key}`, nếu không thì là một từ điển duy nhất.
- `true` / `false`: buộc hoặc tắt chia tách.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Behavior and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- Nếu không có phân đoạn `{key}` trong mặt nạ của bạn, mỗi khóa cấp cao nhất của tệp sẽ trở thành từ điển riêng của nó theo mặc định (xem [`splitKeys`](#splitkeys-boolean)). Đặt `splitKeys: false` để thay vào đó tải toàn bộ tệp dưới dạng một từ điển `index` duy nhất.
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

When the same translation key exists in multiple JSON sources:

1. The plugin with the highest priority determines the final value
2. Lower priority sources are used as fallbacks for missing keys
3. This allows you to maintain legacy translations while gradually migrating to new structures

## CLI

Các tệp JSON được đồng bộ sẽ được coi như các tệp `.content` khác. Điều đó có nghĩa là tất cả các lệnh intlayer sẽ có sẵn cho các tệp JSON được đồng bộ. Bao gồm:

- `intlayer content test` để kiểm tra xem có bản dịch nào bị thiếu không
- `intlayer content list` để liệt kê các tệp JSON được đồng bộ
- `intlayer content fill` để điền các bản dịch bị thiếu
- `intlayer content push` để đẩy các tệp JSON được đồng bộ lên
- `intlayer content pull` để kéo các tệp JSON được đồng bộ về

Xem [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để biết thêm chi tiết.

## Limitations (current)

- Không hỗ trợ chèn hoặc số nhiều/ICU khi nhắm mục tiêu các thư viện bên thứ ba.
- Trình chỉnh sửa trực quan chưa có sẵn cho các runtime không phải Intlayer.
- Chỉ đồng bộ JSON; không hỗ trợ các định dạng danh mục không phải JSON.

## Why this matters

- Chúng ta có thể đề xuất các giải pháp i18n đã được thiết lập và định vị Intlayer như một tiện ích bổ sung.
- Chúng ta tận dụng SEO/từ khóa của họ với các hướng dẫn kết thúc bằng việc gợi ý sử dụng Intlayer để quản lý JSON.
- Mở rộng đối tượng người dùng từ “dự án mới” sang “bất kỳ nhóm nào đã sử dụng i18n”.
