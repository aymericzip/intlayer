---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer có nhẹ hơn Paraglide không?
description: Paraglide trông gần như miễn phí trong các bài kiểm chuẩn i18n vì mã nguồn của nó được tạo trực tiếp vào kho lưu trữ của bạn. Cùng tìm hiểu xem dung lượng đó thực sự đi đâu, tại sao việc đọc locale trên từng nút lại gây tốn tài nguyên và cách tải động của Intlayer chỉ gửi một ngôn ngữ thay vì tất cả.
keywords:
  - Paraglide
  - Intlayer
  - Quốc tế hóa
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer có nhẹ hơn Paraglide không?

Có.

`Paraglide` nổi tiếng là giải pháp i18n nhẹ nhất hiện nay, và thoạt nhìn bảng [benchmark](https://intlayer.org/vi/doc/benchmark/tanstack) cũng đồng tình với điều đó: kích thước thư viện của nó gần như bằng không. Tuy nhiên, kích thước thư viện bằng không không đồng nghĩa với việc không có byte nào được gửi đến trình duyệt. Nó chỉ có nghĩa là các byte đó nằm ở một nơi mà chỉ số này không quét tới.

<TOC/>

## Những điểm cốt lõi

**Kích thước thư viện bị ẩn đi chứ không hề biến mất:**

Paraglide tạo runtime và các hàm thông điệp ngay trong codebase của bạn. Đoạn mã đó vẫn được gửi tới trình duyệt, nhưng được tính là mã của _chính bạn_, chứ không phải của thư viện.

**Không có provider không phải là một món hời miễn phí:**

Mỗi lần gọi `m.my_key()` đều tự giải quyết locale độc lập, đọc cookie hoặc bộ nhớ lưu trữ cho từng node được render, thay vì đọc một lần duy nhất từ context.

**Không có cơ chế tải động (Dynamic Loading):**

Paraglide import tất cả ngôn ngữ của một thông điệp vào client bundle. Ngược lại, Intlayer với `importMode: 'dynamic'` hoặc `'fetch'` chỉ tải duy nhất ngôn ngữ đang được hiển thị.

**Tree shaking không được đảm bảo:**

Trong một số bài kiểm tra hiệu năng của chúng tôi, tính năng tree shaking được quảng cáo của Paraglide đã không hoạt động. Hãy kiểm tra bundle thực tế của bạn.

## Dung lượng của Paraglide thực sự nằm ở đâu?

Trong các báo cáo kiểm chuẩn, chỉ số "kích thước thư viện" đo lường provider và các hook của mỗi thư viện i18n bên trong một component rỗng, trước khi có bất kỳ nội dung nào được thêm vào.

| Thư viện (TanStack Start)     | Dung lượng lib (gz) | Dung lượng lib (min) |
| ----------------------------- | ------------------- | -------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB              | 4.5 KB               |
| `react-intlayer@9.5.1`        | 5.0 KB              | 15.2 KB              |

Nếu chỉ nhìn riêng số liệu này, Paraglide dường như chiến thắng. Nhưng Paraglide là một trình biên dịch: nó đọc các tệp `messages/*.json` và tạo một thư mục `paraglide/` trong kho mã của bạn, chứa tệp `runtime.js` (phát hiện ngôn ngữ, chiến lược cookie và storage, bản địa hóa URL) cùng một hàm JavaScript cho mỗi thông điệp.

```bash
src/paraglide/
├── runtime.js      # phát hiện locale, chiến lược, helper URL
├── server.js
├── messages.js     # re-export tất cả thông điệp
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Vì mã này nằm trong thư mục `src/` và bạn import nó qua đường dẫn tương đối, bundler sẽ tính nó vào ứng dụng của bạn chứ không phải một gói trong `node_modules`. Cột kích thước thư viện hiển thị gần như bằng không, trong khi logic tương tự vẫn được chuyển vào bundle trang của bạn.

Việc tự động sinh mã không phải là ý tưởng tồi: runtime được sinh ra chỉ bao gồm logic mà cấu hình của bạn yêu cầu (chiến lược tiền tố, cookie so với local storage, v.v.). Intlayer đạt được kết quả tương tự theo cách khác, bằng cách chèn các biến môi trường vào thời điểm build để bundler tự động loại bỏ các nhánh mã không được sử dụng. Cả hai giải pháp đều nhẹ hơn từ 3 đến 10 lần so với `i18next` hoặc `next-intl`.

Vì vậy, so sánh công bằng không nằm ở kích thước thư viện. Đó là **lượng JavaScript thực sự được gửi trên mỗi trang**.

## Dung lượng trang thực tế qua đo đạc

Ứng dụng TanStack Start, 10 trang, đo trên các route `en` và `fr`, nén bằng gzip:

| Cấu hình                           | JS trang TB (gz) | So với gốc  | Rò rỉ locale | Rò rỉ trang khác |
| ---------------------------------- | ---------------- | ----------- | ------------ | ---------------- |
| Gốc (không i18n)                   | 111.0 KB         | -           | 0.0%         | 0.0%             |
| `paraglide` (mọi chiến lược)       | 125.1 KB         | +14.1 KB    | 49.7%        | 0.0%             |
| `intlayer` (`importMode: static`)  | 125.8 KB         | +14.8 KB    | 50.0%        | 0.0%             |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**     | **+7.6 KB** | **0.0%**     | **0.0%**         |

Next.js 16 App Router, cùng ứng dụng:

| Cấu hình         | JS trang TB (gz) | So với gốc  |
| ---------------- | ---------------- | ----------- |
| Gốc (không i18n) | 141.0 KB         | -           |
| `paraglide-next` | 155.3 KB         | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**     | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Dữ liệu đầy đủ có trong [báo cáo benchmark TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack) và [báo cáo benchmark Next.js](https://intlayer.org/vi/doc/benchmark/nextjs). Từng bundle có thể được kiểm tra tại [kho lưu trữ benchmark](https://github.com/intlayer-org/benchmark-i18n).

Hai điểm nổi bật rõ ràng:

- Ở chế độ `static`, Intlayer gửi lượng nội dung gần như tương đương Paraglide (125.8 KB so với 125.1 KB). Điều này hoàn toàn dễ hiểu: cả hai đều bao gồm mọi ngôn ngữ của các thông điệp mà trang sử dụng.
- Paraglide giữ nguyên kích thước 125.1 KB dù áp dụng bất kỳ chiến lược nào, bởi vì nó không hỗ trợ chế độ tải động. Mỗi hàng trong bảng trên tương đương với chế độ tĩnh.

## Không có Provider: Ý tưởng tưởng chừng tốt nhưng không phải

Paraglide không cần provider. Bạn import một thông điệp và gọi nó:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Không context, không wrapper, không hook. Nhìn qua có vẻ đơn giản hơn. Nhưng thông tin ngôn ngữ vẫn phải được lấy từ một nơi nào đó. Mỗi hàm thông điệp được tạo ra trông gần giống thế này (dạng rút gọn):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // được xử lý mỗi lần hàm được gọi

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...mỗi ngôn ngữ một nhánh
};
```

Và hàm `getLocale()` duyệt qua các chiến lược đã cấu hình (cookie, local storage, URL, locale mặc định) để tìm ngôn ngữ hiện tại. Do đó, mỗi node văn bản bạn render (`<>{m.my_key()}</>`) đều tự thực hiện việc giải quyết locale riêng, bao gồm cả thao tác đọc `document.cookie` trong trình duyệt. Một trang có 200 chuỗi dịch sẽ thực hiện giải quyết locale 200 lần trong mỗi lượt render, và lặp lại liên tục sau mỗi lần re-render.

Một thư viện dùng provider chỉ đọc locale **một lần duy nhất**, lưu vào context (hoặc signal, hoặc store), và mỗi node chỉ việc đọc giá trị đã có sẵn trong bộ nhớ. Provider chỉ tốn vài trăm byte. Bỏ qua provider sẽ làm hao tốn chu kỳ CPU trong mỗi lần render, và điều này thể hiện rõ ràng trong bài benchmark: thời gian tải trang và tốc độ chuyển đổi ngôn ngữ của Paraglide luôn xếp sau Intlayer trên TanStack Start (thời gian tải trang 22.1 ms so với 14.6 ms, độ phản hồi E2E 4.3 ms so với 3.2 ms).

## Trải nghiệm lập trình viên (DX)

Nguồn dữ liệu gốc của Paraglide là JSON, nhưng bạn không bao giờ import trực tiếp tệp JSON. Bạn import tệp `.js` được tạo ra:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/vi.json"
{
  "hero_title": "Phát hành ứng dụng của bạn bằng mọi ngôn ngữ"
}
```

```tsx fileName="Hero.tsx"
// Chỉ tồn tại sau khi trình biên dịch tạo lại từ JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      vi: "Phát hành ứng dụng của bạn bằng mọi ngôn ngữ",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Quy trình phát triển này mang lại những bất tiện:

- Mỗi thay đổi đối với tệp JSON đều yêu cầu tạo lại mã trước khi import có thể nhận diện hoặc type được cập nhật.
- Thư mục sinh ra `paraglide/` hoặc phải được commit lên git (gây ra xung đột merge trên các tệp sinh tự động ở mọi PR chỉnh sửa nội dung), hoặc bị bỏ qua (đòi hỏi bước biên dịch trước mỗi lần kiểm tra type, test và chạy CI).
- Mọi chuỗi văn bản đều biến thành lời gọi hàm. Các hằng số trở thành `m.key()` ở khắp mọi nơi, ngay cả ở những vị trí chỉ cần một giá trị tĩnh đơn thuần.

## Tree Shaking: Hãy kiểm tra bundle của bạn

Lời hứa hẹn lớn nhất của Paraglide là các thông điệp không dùng đến sẽ được loại bỏ thông qua tree shaking, vì mỗi thông điệp là một export độc lập. Trong thử nghiệm với Svelte + Vite, tính năng này hoạt động đúng như quảng cáo.

Nhưng trong các môi trường khác thì không như vậy. Trong lần thử nghiệm trên [Next.js](https://intlayer.org/vi/doc/benchmark/nextjs), các trang của Paraglide nặng hơn ứng dụng gốc tới 14 KB, trong khi `next-intlayer` chỉ thêm 0.3 KB. Các bài đo trước đó trên TanStack Start cũng cho thấy thông điệp từ những trang khác bị kéo vào bundle của route hiện tại.

Tree shaking phụ thuộc chặt chẽ vào bundler (Turbopack, Rolldown, Rollup), cách thức import thông điệp (`import { m }` so với `import * as m`) và khả năng phân tích tác dụng phụ (side-effects). Nếu bạn chọn Paraglide vì kích thước nhỏ gọn, hãy mở công cụ phân tích bundle và kiểm tra xem điều đó có thực sự đúng với ứng dụng của bạn hay không.

## Không có cơ chế tải động

Đây là giới hạn về mặt kiến trúc. Paraglide không có cách nào để tải từng ngôn ngữ một: mỗi hàm thông điệp đều import tĩnh phần triển khai của từng ngôn ngữ, do đó toàn bộ ngôn ngữ đều kết thúc trong client bundle của bạn.

Với 2 ngôn ngữ, bạn đã lãng phí một nửa dữ liệu dịch thuật, khớp với mức ~50% rò rỉ locale được đo lường ở trên. Với 10 ngôn ngữ, con số lãng phí lên tới 90%. Với 30 ngôn ngữ, con số này là 97%.

Chuyển sang tải động cũng không thể giải quyết triệt để: với mỗi thông điệp là một hàm riêng biệt, việc lazy load từng hàm sẽ tạo ra hàng nghìn request qua mạng.

Intlayer cho phép bạn linh hoạt lựa chọn theo phạm vi toàn cục hoặc trên từng từ điển:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Dữ liệu được gửi tới client                                  | So sánh với Paraglide            |
| ------------ | ------------------------------------------------------------ | -------------------------------- |
| `static`     | Tất cả ngôn ngữ của các từ điển trang đang sử dụng           | Về lý thuyết cùng dung lượng     |
| `dynamic`    | Chỉ ngôn ngữ hiện tại, tải theo cơ chế lazy cho từng từ điển | **Nhẹ hơn N lần** với N ngôn ngữ |
| `fetch`      | Chỉ ngôn ngữ hiện tại, lấy trực tiếp qua Live Sync API       | **Nhẹ hơn N lần** với N ngôn ngữ |

Nhờ [chuyển đổi trong quá trình build](https://intlayer.org/vi/doc/concept/bundle-optimization) và chế độ `importMode: 'static'`, Intlayer về mặt lý thuyết tải lượng nội dung hoàn toàn giống với Paraglide. Với `'dynamic'` hoặc `'fetch'`, nó chỉ tải những gì ngôn ngữ hiện tại cần: đối với ứng dụng có N ngôn ngữ, dung lượng dịch thuật nhẹ hơn N lần so với Paraglide.

## Những trường hợp Paraglide vẫn phù hợp

<AccordionGroup>
<Accordion header="Svelte + Vite với số lượng ít ngôn ngữ">

Nếu hệ thống của bạn dùng Svelte với Vite và bạn chỉ hỗ trợ 2 đến 3 ngôn ngữ, tree shaking hoạt động hiệu quả như mong đợi và chi phí tăng thêm cho các ngôn ngữ khác vẫn ở mức nhỏ.

</Accordion>
<Accordion header="Quy trình làm việc có sẵn với inlang">

Nếu đội ngũ của bạn đã sử dụng hệ sinh thái inlang (Fink, Sherlock, plugin định dạng thông điệp), Paraglide sẽ tích hợp một cách tự nhiên.

</Accordion>
</AccordionGroup>

## Trải nghiệm trực tiếp trên ứng dụng của bạn

Kiểm tra dung lượng và hiện tượng rò rỉ ngôn ngữ trên ứng dụng đang chạy thực tế với công cụ miễn phí [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Cài đặt Intlayer:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## Đọc thêm

- [Benchmark i18n TanStack Start](https://intlayer.org/vi/doc/benchmark/tanstack)
- [Benchmark i18n Next.js](https://intlayer.org/vi/doc/benchmark/nextjs)
- [Tối ưu hóa Bundle và `importMode`](https://intlayer.org/vi/doc/concept/bundle-optimization)
- [Cách chọn thư viện i18n phù hợp cho React](https://intlayer.org/vi/blog/how-to-pick-react-i18n-library)
- [Lợi ích của quốc tế hóa dựa trên trình biên dịch](https://intlayer.org/vi/blog/compiler-vs-declarative-i18n)
