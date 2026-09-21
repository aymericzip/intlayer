---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cách chọn đúng thư viện Solid i18n năm 2026"
description: Hướng dẫn ra quyết định cho việc quốc tế hóa (i18n) SolidJS và SolidStart. Những câu hỏi cần trả lời trước khi so sánh @solid-primitives/i18n, solid-i18next, Paraglide, Lingui và Intlayer, cùng chi phí của từng lựa chọn về tính phản ứng (reactivity), bundle size và typing.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalization
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - so sánh thư viện i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Cách chọn đúng thư viện Solid i18n

Mô hình phản ứng (reactivity) của Solid làm thay đổi hoàn toàn những gì một thư viện i18n cần phải làm. Các component chỉ chạy một lần duy nhất, vì vậy bản dịch được lưu trong một `const` lúc setup sẽ trở thành một chuỗi bị đóng băng (frozen string), và một thư viện trả về chuỗi thay vì accessors sẽ tạo ra một trang web chuyển đổi ngôn ngữ ở khắp mọi nơi ngoại trừ ba component mà ai đó đã viết như vậy. Việc chọn thư viện cho Solid một phần là về API, và một phần là về việc thư viện nào giúp bạn tránh mắc phải sai lầm đó nhất.

Hướng dẫn này liệt kê các câu hỏi cần trả lời trước, sau đó đối chiếu chúng với `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` và Intlayer, dành cho Vite + Solid và cho SolidStart.

![Hệ sinh thái thư viện Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Mục lục

<TOC/>

## Sáu câu hỏi cần trả lời trước khi so sánh các thư viện

1. **Vite SPA hay SolidStart?** Trong một SPA, locale có thể nằm hoàn toàn trong một signal. Trên SolidStart, locale phải được resolve trên server từ URL, và bất kỳ nội dung nào crawler cần thấy mà không cần JavaScript (`<html lang>`, `hreflang`) đều thuộc về `entry-server.tsx`.
2. **Khả năng phản ứng (reactivity) khi thay đổi locale cần mức độ nào?** Việc tải lại toàn bộ trang khi chuyển đổi ngôn ngữ có thể chấp nhận được với một số ứng dụng. Nếu không, các giá trị của thư viện phải là signals hoặc accessors, và việc đọc chúng phải được track (theo dõi), chứ không phải copy.
3. **Ai là người viết bản dịch?** Developer, một TMS, một agency bàn giao các chuỗi ICU, hay một AI pipeline. `solid-i18next` sử dụng định dạng của i18next. `@solid-primitives/i18n` nhận bất kỳ dictionary object nào của bạn. Hãy chọn thư viện khớp với bên cung cấp bản dịch.
4. **Có bao nhiêu locale và trang?** Hai locale và năm trang có thể đóng gói toàn bộ nội dung. Mười locale và bốn mươi route thì không thể, và lazy catalog kèm scoping sẽ trở thành chi phí chính.
5. **Bạn có cần type cho các key không?** `@solid-primitives/i18n` tự suy luận type từ source dictionary. `solid-i18next` yêu cầu khai báo thủ công. Các thư viện dạng compile-time sẽ tự động generate ra chúng.
6. **Bạn cần phạm vi tính năng (feature surface) nhiều đến mức nào?** Quản lý cookie, routing có tiền tố locale, redirects, formatters. Lựa chọn nhẹ nhất không có tính năng nào trong số này, và điều đó hoàn toàn ổn cho đến khi bạn thực sự cần chúng.

Hãy ghi lại các câu trả lời. Mọi nội dung bên dưới đều sẽ đối chiếu lại với chúng.

## Bức tranh toàn cảnh qua một hình ảnh

Solid là hệ sinh thái trẻ nhất ở đây và có ít lựa chọn nhất, trải qua ba làn sóng.

![Lịch sử các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries: solid-i18next">

i18next được bọc lại cho Solid. Namespaces, backends, detectors, cùng một thập kỷ phát triển plugin. Là lựa chọn nặng nhất trong nhóm, mang chi phí tra cứu `t("a.b")` tương tự như trong React.

</Accordion>
<Accordion header="Primitives tối giản (2022): @solid-primitives/i18n">

Một dictionary phẳng do bạn làm chủ, một hàm `translator()` trả về các accessors, type được suy luận trực tiếp từ source object. Rất nhỏ gọn, không có scoping, không có routing, không có formatters. Đây là mặc định của cộng đồng.

</Accordion>
<Accordion header="Trình biên dịch và colocated content (2024 đến 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide tạo ra một hàm cho mỗi message. Intlayer khai báo nội dung theo từng component trong các file `.content.ts` và trả về các node được hỗ trợ bởi signal. Binding cho Solid của Lingui ra mắt năm 2026, mang lại khả năng trích xuất dựa trên macro.

</Accordion>
</AccordionGroup>

Bài viết [lịch sử JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md) phân tích chi tiết từng làn sóng.

## Quyết định quan trọng nhất: nơi lưu trữ nội dung và thời điểm tải

Hai lựa chọn mang tính cấu trúc giải thích phần lớn sự khác biệt về kích thước bundle giữa các thiết lập:

- **Nội dung tập trung (centralized) hay phân phạm vi (scoped).** Một dictionary duy nhất cho toàn ứng dụng, hoặc một khai báo riêng cho từng component.
- **Static import hay dynamic import.** Toàn bộ nội dung khi khởi động, hoặc chỉ tải locale đang hoạt động (và lý tưởng nhất là route đang hoạt động) theo yêu cầu.

Biểu đồ dưới đây ước tính payload cho một ứng dụng giả định từ 1 đến 10 trang, được dịch sang 1 đến 10 locale, với khoảng 30 KB văn bản trên mỗi trang.

![Hiện tượng rò rỉ nội dung theo từng kiến trúc](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` không can thiệp vào cả hai trục: bạn dùng `createResource` cho dictionary của từng locale để tải động (dynamic loading), phần còn lại bạn tự xử lý. `solid-i18next` hỗ trợ namespaces và lazy backends, nhưng không có gì đảm bảo sự phân tách này, vì vậy một component dùng chung import `common` sẽ biến nó thành dependency của mọi route. Paraglide xử lý trục trang thông qua tree-shaking, mặc dù điều này chưa phát huy tác dụng trong triển khai [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/solid.md). Intlayer đạt được điều đó thông qua việc khai báo nội dung theo từng component.

Nếu câu trả lời của bạn cho câu hỏi 4 là "nhiều trang", hãy cân nhắc phần này hơn bất kỳ sở thích API nào. Bài viết [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md) phân tích khía cạnh bảo trì của cùng sự đánh đổi này.

## Các ứng cử viên

Kích thước thư viện được lấy từ [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/solid.md): provider kèm accessor trong một component trống, sau khi bundling, tree-shaking và minification, trên ứng dụng 10 trang và 10 locale. Nội dung được đo lường riêng biệt.

| Thư viện                 | Mô hình nội dung                           | Tính phản ứng khi đổi locale               | An toàn kiểu                        | Scoping và lazy loading            | Kích thước thư viện                                |
| :----------------------- | :----------------------------------------- | :----------------------------------------- | :---------------------------------- | :--------------------------------- | :------------------------------------------------- |
| `@solid-primitives/i18n` | Dictionary phẳng do bạn làm chủ            | Signal, accessors trả về từ translator     | 3/5 — Suy luận từ source dictionary | Không có sẵn                       | ~0.6 kB                                            |
| `solid-i18next`          | Catalog và namespace của i18next           | Store, re-render qua provider              | 2/5 — Khai báo thủ công             | Namespaces, lazy backends          | ~14.9 kB                                           |
| Paraglide                | inlang project, các hàm được generate      | Đọc mỗi lần gọi từ cookie hoặc storage     | 3.5/5 — Được generate               | Tree-shaking (chưa có trong bench) | Gần như bằng 0 (do mã được sinh ra trong codebase) |
| `@lingui/solid`          | Source text trong code, catalog đã compile | Dựa trên signal                            | 2/5 — Từ trình biên dịch            | Theo từng catalog                  | ~11.8 kB                                           |
| Intlayer                 | Một file `.content.ts` cho mỗi component   | Node hỗ trợ signal, không re-run component | 5/5 — Được generate, bật mặc định   | Có, theo từng component            | ~4.3 kB                                            |

> Các con số là ảnh chụp nhanh tại các phiên bản của bài benchmark. Kích thước của `@lingui/solid` lấy từ benchmark TanStack Start. Hãy chạy thử nghiệm trên ứng dụng của riêng bạn trước khi đưa ra quyết định chỉ dựa vào kích thước.
> An toàn kiểu: 5/5 nghĩa là khóa, tham số và mọi locale đều được kiểm tra mà không cần thiết lập thủ công, bao gồm cả trình định dạng URL và các helper.

Kích thước thư viện gần như bằng 0 của Paraglide là do bản chất thiết kế: runtime được generate trực tiếp vào repository của bạn. Intlayer cần `vite-intlayer`, vì vậy nó không thể chạy nếu không có bước build.

## Đối chiếu câu trả lời của bạn với thư viện phù hợp

<AccordionGroup>
<Accordion header="Vite SPA, catalog nhỏ, bạn muốn sự tối giản tối đa">

`@solid-primitives/i18n`. Một dictionary phẳng, một `translator()` trả về các accessors, type được suy luận mà không cần cấu hình phức tạp. Đây là câu trả lời chuẩn xác cho một ứng dụng nhỏ, và việc đọc source code chỉ mất mười phút. Những gì bạn sẽ phải tự viết: lưu trữ locale (locale persistence), routing, formatters và tách code theo route (per-route splitting). Nếu danh sách đó dài ra, đó là tín hiệu để chuyển đổi giải pháp.

</Accordion>
<Accordion header="Chuyển từ React sang với một codebase dùng i18next">

`solid-i18next` cho phép bạn tái sử dụng catalogs, namespaces, backends và detectors nguyên trạng. Đây là lựa chọn nặng nhất và mang lại các chi phí tương tự như `react-i18next`: khai báo type thủ công, tối ưu hóa khả thi nhưng tốn thời gian, và hàm `t()` trả về chuỗi, khiến lỗi đóng băng bản dịch (frozen translation) rất dễ xảy ra. Hãy bọc các lần đọc trong JSX hoặc một memo và không bao giờ lưu trữ chúng lúc setup.

</Accordion>
<Accordion header="SolidStart với route có tiền tố locale và SSR">

Locale phải được lấy từ URL phía server để cả hai bên đồng bộ; việc phát hiện locale ở client là quá muộn. `@solid-primitives/i18n` và `solid-i18next` để bạn tự xử lý route `[[locale]]`, `matchFilters`, redirect và các thẻ trong `entry-server.tsx`. Paraglide có một plugin Vite giúp xử lý routing. Intlayer cung cấp sẵn middleware và các helper cho route. Dù chọn giải pháp nào, hãy đặt `<html lang>` và `hreflang` trong `entry-server.tsx`; `@solidjs/meta` chỉ áp dụng trên client sau khi hydration trong SolidStart v2. Bài viết [Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/solid.md) hướng dẫn chi tiết cách thiết lập này.

</Accordion>
<Accordion header="Việc đổi locale phải tức thì và phân mảnh chi tiết (fine-grained)">

Hãy chọn một thư viện có giá trị là signals hoặc accessors và việc đọc giá trị được track đầy đủ. Accessors của `@solid-primitives/i18n` và các node của Intlayer đều chỉ cập nhật đúng các DOM node đọc chúng mà không làm component chạy lại (re-run). `solid-i18next` re-render thông qua provider. Paraglide đọc locale từ cookie hoặc storage trên mỗi lần gọi message thay vì từ một signal, cách này hoạt động được nhưng xử lý nhiều công việc trên mỗi node hơn mức cần thiết.

</Accordion>
<Accordion header="Ứng dụng lớn, nhiều route, giới hạn nghiêm ngặt về bundle">

Nội dung phân phạm vi (scoped) được biên dịch tại thời điểm build. Intlayer chỉ tải những gì một route thực sự render. Paraglide trên lý thuyết đạt được điều này qua tree-shaking; hãy kiểm tra lại trong thiết lập của bạn vì nó chưa phát huy tác dụng trong bài benchmark. Với `solid-i18next`, hãy lên kế hoạch cho chiến lược namespace và lazy-loading ngay từ ngày đầu và kiểm soát chặt chẽ khi code review.

</Accordion>
<Accordion header="Type safety là yêu cầu bắt buộc">

`@solid-primitives/i18n` cung cấp type được suy luận miễn phí, điều mà hầu hết các thư viện React không có. Đối với type được generate mà vẫn giữ được tính toàn vẹn qua lazy loading và chia tách route, Paraglide, `@lingui/solid` và Intlayer đều tạo ra type từ chính nội dung. Bài viết [phát hiện thiếu bản dịch](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md) so sánh những gì mỗi thư viện có thể bắt lỗi được tại thời điểm build.

</Accordion>
<Accordion header="Bản dịch sẽ được tạo bởi AI">

Khi đó, một dictionary tập trung không còn đối tượng sử dụng nào để biện minh cho sự tồn tại của nó. Nội dung đặt cùng component (colocated) kết hợp với một CLI tự động điền các locale còn thiếu là con đường ngắn hơn. Lệnh `fill` của Intlayer chạy với API key của riêng bạn (OpenAI, Anthropic, Mistral, Gemini) và chỉ dịch lại những gì đã thay đổi.

</Accordion>
</AccordionGroup>

## Nhược điểm của từng thư viện

- **`@solid-primitives/i18n`**: không có lazy loading hay scoping ngoài những gì bạn tự xây dựng, không có routing, không xử lý cookie, không có formatters. Tuyệt vời cho các ứng dụng nhỏ, nhanh chóng bộc lộ hạn chế đối với các ứng dụng chuyên nghiệp.
- **`solid-i18next`**: nặng nhất trong nhóm, type thủ công, định dạng số nhiều riêng, và `t()` trả về chuỗi nên bản dịch bị đóng băng nếu lưu tại bước setup.
- **Paraglide**: các file được generate phải commit vào repo và phải regenerate trước mỗi lần push, tree-shaking chưa hoạt động trong bài Solid benchmark, và locale được đọc từ storage trong mỗi lần gọi thay vì từ signal.
- **`@lingui/solid`**: mới ra mắt năm 2026, nên chưa có nhiều phản hồi từ môi trường production thực tế. Thừa hưởng bước build `extract` / `compile` của Lingui cùng nhiều cú pháp chồng chéo nhau.
- **Intlayer**: bắt buộc phải có build plugin, hệ sinh thái nhỏ hơn, hỗ trợ ICU một phần, và nội dung nằm rải rác trong codebase theo thiết kế, vì vậy việc xuất một file JSON duy nhất cho biên dịch viên cần công cụ hỗ trợ.

## Cú pháp code của từng lựa chọn

Cùng một component, bản tóm tắt giỏ hàng gồm tiêu đề và dạng số nhiều, được viết bằng từng ứng cử viên. Hãy chú ý vị trí đọc bản dịch: trong JSX nó được track, trong phần thân của setup nó là một chuỗi đóng băng.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Key được định kiểu type từ object tiếng Anh mà không cần codegen. Không có quy tắc số nhiều, không có lazy loading và không có routing; bạn sẽ cần tự bổ sung từng phần.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Sử dụng catalogs, namespaces và plugins của i18next nguyên trạng. `t` trả về chuỗi, vì vậy `const title = t("cart:title")` lúc setup sẽ làm nó bị đóng băng; hãy giữ lệnh gọi bên trong JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Mỗi message là một hàm có type được generate sẵn. Locale được đọc từ cookie hoặc storage trên mỗi lần gọi thay vì từ một signal, vì vậy khả năng phản ứng khi đổi ngôn ngữ bạn sẽ phải tự cấu hình.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: plural({
      one: t({ en: "{{count}} item", fr: "{{count}} article" }),
      other: t({ en: "{{count}} items", fr: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Tất cả các locale nằm trong một file duy nhất cạnh component. `useIntlayer` trả về các node hỗ trợ signal, vì vậy việc thay đổi locale chỉ cập nhật đúng các DOM node đọc chúng. `{content.title}` trong JSX được track; `content.title.value` trong thân của setup thì không.

  </Tab>
</Tabs>

Trên một codebase i18next hiện có, [i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md) tạo alias cho package ở cấp độ bundler để các catalog và `t()` tiếp tục hoạt động trong khi Intlayer phân phối nội dung, và [hướng dẫn chuyển đổi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md) sẽ phụ trách phần còn lại.

## Trước khi bạn đưa ra quyết định

Một bảng tính năng chỉ cho bạn biết một thư viện làm được gì hôm nay. Những điểm dưới đây cho bạn biết trải nghiệm sử dụng lâu dài sẽ ra sao.

**Kiểm tra mức độ hoạt động của repository.**

Số lượng commit, thời gian phản hồi issue, và liệu bản minor release gần nhất có diễn ra trong năm nay không. Một thiết kế tốt nhưng không có người duy trì sẽ là một cuộc di cư (migration) đang chờ đón bạn trong tương lai.

**Đừng chọn chỉ dựa vào lượt tải trên npm.**

Thư viện được cài đặt nhiều nhất là thư viện xuất hiện đầu tiên, chứ không phải thư viện phù hợp nhất với một codebase Solid năm 2026. Lượt tải đo lường lịch sử, không đo lường độ tương thích.

![Bảng xếp hạng các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Tìm hiểu xem ai tài trợ cho người bảo trì, và họ bán sản phẩm gì.**

`i18next` (đứng sau `solid-i18next`) được hậu thuẫn bởi Locize. `next-intl`, `vue-i18n`, `svelte-i18n` và Lingui được tài trợ bởi Crowdin. Tolgee, Paraglide (inlang) và Intlayer đều vận hành nền tảng riêng của họ. Một nhà cung cấp có doanh thu đến từ dịch vụ lưu trữ bản dịch (hosted translation) sẽ có rất ít lý do để cung cấp bản dịch miễn phí ngay bên trong chuỗi công cụ (toolchain) của bạn. Intlayer là thư viện duy nhất trong nhóm cung cấp tính năng dịch thuật bằng AI qua CLI với API key của chính bạn, cùng một CMS mà bạn có thể tự host (self-host).

**Thư viện đã sẵn sàng cho AI agent chưa?**

Các agent vẫn gặp khó khăn với i18n: chúng quên locale, tự bịa ra key và trộn lẫn các cú pháp message. Thư viện có cung cấp [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md) hoặc [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md) để agent có thể liệt kê, điền và kiểm thử nội dung không? Và việc nạp nội dung có được tối ưu hóa theo mặc định hay ai đó phải định kỳ rà soát namespaces và lazy imports hàng quý?

**Type safety ngay từ đầu.**

Không phải là "có thể định kiểu với cấu hình bổ sung" mà là "một key sai sẽ khiến `tsc` báo lỗi ngay trên một bản cài đặt mới". Hãy kiểm tra điều gì xảy ra với một key không tồn tại, và với một locale bị thiếu một bản dịch.

**Phát hiện nội dung không sử dụng.**

Các catalog chỉ có xu hướng phình to ra. Quá trình build của Intlayer sẽ loại bỏ các trường không dùng và ghi log (`build.purge`). Paraglide đạt được điều này nhờ kiến trúc, vì một hàm message không được gọi sẽ bị loại bỏ qua tree-shaking. Tất cả các thư viện khác đều để lại công việc dọn dẹp cho bạn.

**Developer experience.**

Thời gian setup cho đến chuỗi dịch đầu tiên, một [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md) hoặc [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md) hiển thị bản dịch khi hover và nhảy tới khai báo, một [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để fill, test và push, một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) hoặc trình trích xuất lấy các chuỗi hard-code ra khỏi component để bạn không phải quản lý từng chuỗi theo từng khóa, cùng cách để người không phải lập trình viên có thể chỉnh sửa nội dung ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)) mà không cần tạo pull request.

## Câu hỏi thường gặp

<FAQ>

<Question title="Liệu @solid-primitives/i18n có đủ cho một ứng dụng production không?">

Với ứng dụng nhỏ, câu trả lời là có, và đây là lựa chọn nhẹ nhất hiện có. Nó sẽ không còn đủ khi bạn cần lazy catalog theo từng route, routing theo locale trên SolidStart, lưu trữ cookie hoặc formatters, bởi vì toàn bộ những phần đó bạn sẽ phải tự xây dựng.

</Question>

<Question title="Tại sao bản dịch của tôi không cập nhật khi đổi locale?">

Bởi vì các component trong Solid chỉ chạy một lần. Một bản dịch được đọc vào một `const` lúc setup là một chuỗi thông thường, không phải một subscription. Hãy đọc nó bên trong JSX, một effect hoặc một memo, hoặc chọn một thư viện có các giá trị là accessors để khó viết sai hơn.

</Question>

<Question title="Tôi có cần một thư viện dựa trên trình biên dịch (compiler) không?">

Chỉ khi bundle size, generated types hoặc việc kiểm tra thiếu key tại thời điểm build là các yêu cầu thực tế. Bài viết [i18n dạng compiler so với declarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md) giải thích những gì trình biên dịch mang lại và những trường hợp chúng có thể xử lý không đúng.

</Question>

<Question title="Việc chọn thư viện có ảnh hưởng đến SEO không?">

Có, một cách gián tiếp. Các công cụ tìm kiếm quan tâm đến routing, `hreflang`, `<html lang>` và liệu văn bản có nằm trong HTML được render trên server hay không, điều mà trên SolidStart gắn liền với `entry-server.tsx`. Xem thêm [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Tìm hiểu thêm

- [Solid i18n benchmark: kích thước bundle, độ rò rỉ và thời gian chuyển đổi locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/solid.md)
- [Solid i18n: tại sao bản dịch bị đóng băng khi đổi locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/solid.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md) và [hướng dẫn chuyển đổi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_i18next_to_intlayer.md)
- [Lịch sử JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
- [i18n dạng compiler so với declarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [Cách tối ưu hóa bundle hoạt động tại thời điểm build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)
- [Thiết lập i18n trong ứng dụng Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+solid.md) và trong [ứng dụng SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_solid_start.md)
- Hướng dẫn tương tự cho [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_vue_i18n_library.md) và [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_svelte_i18n_library.md)
