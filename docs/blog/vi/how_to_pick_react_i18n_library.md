---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cách chọn đúng thư viện React i18n năm 2026"
description: Hướng dẫn ra quyết định cho việc quốc tế hóa (i18n) React. Những câu hỏi cần trả lời trước khi so sánh react-i18next, react-intl, Lingui, use-intl, Paraglide và Intlayer, cùng chi phí của từng lựa chọn về bundle size, typing và bảo trì.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - so sánh thư viện i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Cách chọn đúng thư viện React i18n

React không đi kèm primitive i18n nào. Thư viện bạn chọn ngay từ ngày đầu tiên sẽ quyết định cách các bản dịch được lưu trữ, cách chúng được nạp vào bundle, và bạn sẽ phải tự xử lý bao nhiêu công việc trong vài năm tiếp theo. Hầu hết các đội ngũ lựa chọn dựa trên mức độ phổ biến, rồi sau đó mới nhận ra sự đánh đổi khi ứng dụng chạm mốc 2.000 key.

Hướng dẫn này tiếp cận theo hướng ngược lại: hãy trả lời vài câu hỏi về dự án của bạn trước, sau đó đối chiếu các câu trả lời với những thư viện phù hợp. Hướng dẫn tập trung vào React thuần (Vite, React Router, TanStack Start). Next.js có những ràng buộc riêng, được đề cập trong [bài so sánh Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md).

![Hệ sinh thái thư viện React i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Mục lục

<TOC/>

## Sáu câu hỏi cần trả lời trước khi so sánh các thư viện

Bảng so sánh tính năng sẽ vô nghĩa nếu bạn không biết tiêu chí nào thực sự quan trọng với mình. Hãy xem xét các câu hỏi này trước.

1. **Ứng dụng được render như thế nào?** Chỉ SPA, SSR kèm hydration, hay React Server Components. Các hook dựa trên Context hoạt động ở mọi nơi trong SPA. Với RSC, một hook sẽ buộc mọi component render văn bản phải dùng `"use client"`, vì vậy bạn cũng sẽ cần một API phía server.
2. **Ai là người viết bản dịch?** Developer, đội ngũ nội bộ dùng TMS, agency bàn giao file ICU, hay một AI pipeline. Yếu tố này quyết định định dạng catalog nhiều hơn bất kỳ chi tiết API nào.
3. **Có bao nhiêu locale và trang?** Hai locale và năm trang có thể nạp toàn bộ nội dung cùng lúc. Nhưng mười locale và năm mươi route thì không thể, và chiến lược tải dữ liệu (loading strategy) sẽ trở thành chi phí chính.
4. **Bạn có cần type cho các key không?** Lỗi chính tả trong `t("checkout.totl")` vẫn biên dịch bình thường trong mọi thư viện dùng key trừ khi bạn tự cấu hình type. Hãy quyết định xem điều đó có chấp nhận được hay không.
5. **Chuỗi chứa những nội dung gì?** Văn bản thuần túy, số nhiều (plurals), hay các câu có chèn `<Link>` ở giữa. Rich content chính là nơi mà hầu hết các API trở nên cồng kềnh.
6. **Vòng đời dự án kéo dài bao lâu?** Một bản prototype ba tháng và một sản phẩm phát triển năm năm không cần cùng một mức độ công cụ build (build tooling).

Hãy ghi lại các câu trả lời. Mọi phân tích bên dưới đều sẽ đối chiếu lại với chúng.

## Bức tranh toàn cảnh qua một hình ảnh

Mười lăm năm phát triển của JavaScript i18n gói gọn trong bốn làn sóng kiến trúc, và các thư viện React bạn đang so sánh đến từ những làn sóng khác nhau.

![Lịch sử các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionary (2011 đến 2017): i18next, react-intl">

Các catalog JSON được nạp vào bộ nhớ, tra cứu `t("a.b")` tại runtime, cú pháp ICU hoặc cú pháp tùy chỉnh được phân tích trong trình duyệt. Hệ sinh thái lớn nhất, runtime nặng nhất, type safety là tùy chọn (opt-in).

</Accordion>
<Accordion header="Compile-time macro (2018 đến 2021): Lingui, typesafe-i18n">

Message được trích xuất khi build, biên dịch thành các catalog tinh gọn, có kiểu dữ liệu cho tham số. Đổi lấy bundle nhỏ hơn bằng một bước build bổ sung (`extract`, `compile`).

</Accordion>
<Accordion header="Server-first (2022 đến 2024): use-intl / next-intl">

Được thiết kế xoay quanh SSR và Server Components. Render trên server, chỉ hydrate những gì client thực sự cần. Vẫn dựa trên key và tập trung (centralized).

</Accordion>
<Accordion header="Trình biên dịch và colocated content (2024 đến 2026): Paraglide, Intlayer, wuchale">

Nội dung được biên dịch thành các hàm hỗ trợ tree-shaking hoặc dictionary riêng cho từng component. Type được tự động tạo, thiếu bản dịch sẽ làm dừng quá trình build, và dịch thuật AI chạy trực tiếp từ CLI.

</Accordion>
</AccordionGroup>

Bài viết [lịch sử JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md) giải thích chi tiết cách mỗi làn sóng giải quyết các vấn đề của làn sóng trước đó.

## Quyết định quan trọng nhất: nơi lưu trữ nội dung và thời điểm tải

Mọi thư viện React i18n đều có cấu trúc tương tự nhau: một store, một provider, một hook. Bất kể thứ gì provider nhận vào đều sẽ nằm trong client bundle hoặc trong hydration payload. Vì vậy, hai lựa chọn mang tính cấu trúc là:

- **Nội dung tập trung (centralized) hay phân phạm vi (scoped).** Một file `en.json` cho toàn bộ ứng dụng, hoặc một file khai báo riêng cho từng component (hoặc theo namespace).
- **Static import hay dynamic import.** Toàn bộ được đóng gói ngay khi khởi động, hoặc chỉ tải locale và route đang hoạt động theo nhu cầu.

Biểu đồ dưới đây ước tính payload cho một ứng dụng giả định từ 1 đến 10 trang, được dịch sang 1 đến 10 locale, với khoảng 30 KB văn bản trên mỗi trang.

![Hiện tượng rò rỉ nội dung theo từng kiến trúc](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Nội dung tập trung với static import sẽ tăng theo cả hai trục: 10 trang nhân với 10 locale là 300 KB văn bản trên mỗi trang. Dynamic import loại bỏ trục locale. Phân phạm vi (scoping) loại bỏ trục trang. Chỉ khi kết hợp cả hai thì dung lượng mới giữ nguyên không đổi.

Đây không phải là đặc tính của thư viện, mà là vấn đề kỷ luật kiến trúc. `react-i18next` có thể được phân vùng bằng namespace và backend tải lười (lazy backends). `use-intl` có thể được tách theo từng route. Nhưng không có gì ép buộc điều đó, và một `<Button>` dùng chung gọi `t("common:cta")` sẽ âm thầm biến `common` thành dependency của mọi route. Bản [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md) đo lường điều này dưới dạng "rò rỉ từ các route khác" và "rò rỉ từ các locale khác", và đây là nguyên nhân chính tạo nên sự chênh lệch giữa các thư viện.

Nếu câu trả lời của bạn cho câu hỏi 3 là "nhiều locale, nhiều trang", hãy cân nhắc phần này hơn bất kỳ sở thích API nào. Bài viết [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md) sẽ phân tích sâu hơn về khía cạnh bảo trì của cùng lựa chọn này.

## Các ứng cử viên

Kích thước thư viện được lấy từ [bài benchmark trên TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md): provider kèm hook trong một component trống, sau khi bundling, tree-shaking và minification, với 10 trang và 10 locale. Nội dung được đo lường riêng biệt.

| Thư viện                | Làn sóng        | Mô hình nội dung                               | An toàn kiểu                         | Định dạng message             | Kích thước thư viện                                |
| :---------------------- | :-------------- | :--------------------------------------------- | :----------------------------------- | :---------------------------- | :------------------------------------------------- |
| `react-i18next`         | Runtime         | JSON tập trung, namespace                      | 2/5 — Tùy chọn (`CustomTypeOptions`) | i18next (hậu tố số nhiều)     | ~18.4 kB                                           |
| `react-intl` (FormatJS) | Runtime         | JSON tập trung, ICU                            | 2/5 — Tùy chọn (trích xuất + union)  | ICU                           | ~15.3 kB                                           |
| `use-intl`              | Server-first    | JSON tập trung, ICU                            | 2/5 — Tùy chọn (declaration merging) | ICU                           | ~14.1 kB                                           |
| `@tolgee/react`         | Runtime         | Tập trung, chỉnh sửa trực tiếp (in-context)    | 1/5 — Không                          | ICU                           | ~11.1 kB                                           |
| Lingui                  | Macro           | Văn bản nguồn trong code, catalog đã biên dịch | 2/5 — Tốt, từ trình biên dịch        | ICU qua macro                 | ~11.8 kB                                           |
| Paraglide               | Trình biên dịch | Dự án inlang, sinh ra các hàm                  | 3.5/5 — Tự động tạo                  | Riêng                         | Gần như bằng 0 (do mã được sinh ra trong codebase) |
| Intlayer                | Trình biên dịch | `.content.ts` theo từng component              | 5/5 — Tự động tạo, bật mặc định      | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                            |

> Các con số là ảnh chụp nhanh tại các phiên bản benchmark và có thể thay đổi theo các bản phát hành. Hãy chạy benchmark trên chính ứng dụng của bạn trước khi đưa ra quyết định chỉ dựa vào kích thước.
> An toàn kiểu: 5/5 nghĩa là khóa, tham số và mọi locale đều được kiểm tra mà không cần thiết lập thủ công, bao gồm cả trình định dạng URL và các helper.

Có hai điều bảng so sánh không thể hiện. `Paraglide` hầu như không có dung lượng thư viện vì nó sinh mã trực tiếp vào repo của bạn, đồng nghĩa với việc cần thêm bước sinh lại mã trước mỗi lần commit và tiềm ẩn nguy cơ merge conflict trên các file được sinh ra. Còn `Intlayer` yêu cầu một plugin bundler (`vite-intlayer` hoặc tương đương), do đó không thể chạy trong môi trường không có bước build (no-build setup).

## Đối chiếu câu trả lời của bạn với thư viện phù hợp

<AccordionGroup>
<Accordion header="Bản prototype, đội ngũ nhỏ, ít locale">

Hãy chọn giải pháp đơn giản nhất hoạt động được và đừng đầu tư quá mức. `react-i18next` với một file JSON duy nhất cho mỗi locale là đủ tốt, và cả một thập kỷ câu trả lời trên Stack Overflow sẽ giúp bạn tiết kiệm thời gian. Bỏ qua namespace cho đến khi bạn thực sự cần. Nếu bản prototype trở thành một sản phẩm chính thức, hãy lên kế hoạch chuyển đổi sang nội dung phân phạm vi (scoped content), [adapter tương thích react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-i18next.md) sẽ giúp quá trình đó diễn ra từng bước một.

</Accordion>
<Accordion header="Bản dịch đến từ agency hoặc một TMS hỗ trợ ICU">

Định dạng catalog đã được định sẵn cho bạn. `react-intl` hỗ trợ ICU nguyên bản và bộ công cụ trích xuất của FormatJS được xây dựng riêng cho pipeline đó. `use-intl` cũng đọc được định dạng ICU. Trong khi đó, `react-i18next` cần plugin ICU, nếu không sẽ phải dùng các key số nhiều riêng. Khả năng hỗ trợ ICU của Intlayer hiện vẫn ở mức một phần, vì vậy nếu bạn đang nhận các chuỗi ICU hôm nay, hãy coi đó là rào cản cho đến khi tính năng này được hỗ trợ đầy đủ.

</Accordion>
<Accordion header="Ứng dụng lớn, nhiều route, cần tối ưu dung lượng bundle">

Nên ưu tiên scoped content và dynamic loading theo mặc định, thay vì chỉ dựa vào quy ước. `Lingui` và `Paraglide` đạt được điều này thông qua quá trình biên dịch. Intlayer đạt được thông qua khai báo theo từng component, và compiler chỉ xuất ra những gì route đó render. Với `react-i18next` hoặc `use-intl`, hãy lên kế hoạch về namespace và chiến lược lazy-loading ngay từ ngày đầu và kiểm soát chặt chẽ trong code review, vì các công cụ sẽ không tự động làm điều đó thay bạn.

</Accordion>
<Accordion header="Type safety là yêu cầu bắt buộc">

Mọi thư viện dựa trên key đều có thể thêm type, nhưng hầu như không có thư viện nào bật sẵn mặc định. Nếu bạn không muốn duy trì declaration merging vốn rất phức tạp khi kết hợp với các namespace tải lười, hãy chọn một thư viện mà type được sinh tự động từ nội dung: `Lingui`, `Paraglide`, hoặc Intlayer. Bài viết [phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md) sẽ so sánh những gì mỗi thư viện có thể bắt được trong thời gian build.

</Accordion>
<Accordion header="Nhiều nội dung phức tạp: markdown, link lồng trong câu, component riêng theo locale">

Các node rich content là nơi hàm `t()` trả về chuỗi văn bản bộc lộ hạn chế. `react-i18next` và `Lingui` có `<Trans>`, `react-intl` có các thẻ rich text, và tất cả chúng đều phức tạp hơn so với trường hợp chuỗi thông thường. Các node nội dung của Intlayer chấp nhận trực tiếp JSX, markdown và các object lồng nhau, mang lại sự tiện lợi vượt trội nếu nội dung của bạn không chỉ đơn thuần là các nhãn UI.

</Accordion>
<Accordion header="Bản dịch do AI tạo ra và developer review">

Khi đó, một file JSON tập trung không còn là yêu cầu bắt buộc, vì không cần import vào TMS. Nội dung đồng vị trí (colocated content) kết hợp với CLI tự động điền các locale còn thiếu là con đường ngắn nhất. Lệnh `fill` của Intlayer chạy với API key của chính bạn (OpenAI, Anthropic, Mistral, Gemini) và chỉ dịch những nội dung có thay đổi. Paraglide và Tolgee cung cấp các giải pháp tương đương dạng hosted với các gói dịch vụ riêng.

</Accordion>
<Accordion header="Bạn có thể chuyển sang Next.js App Router sau này">

React Context không thể vượt qua ranh giới giữa server và client. Các thư viện chỉ xây dựng dựa trên client hook (`react-i18next`, `react-intl`) sẽ cần một API server song song ngay khi bạn áp dụng RSC. `use-intl` (dưới dạng `next-intl`) và Intlayer (dưới dạng `next-intlayer`) đã có sẵn sự phân chia đó. Hãy đọc [bài viết về Next.js i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/nextjs.md) trước khi chuẩn hóa một mô hình.

</Accordion>
</AccordionGroup>

## Những điểm hạn chế của từng thư viện

Những hạn chế thực tế, bởi vì lựa chọn nào cũng có điểm trừ.

- **`react-i18next`**: thư viện nặng nhất trong danh sách, định dạng số nhiều riêng, type safety cần bạn tự cấu hình và duy trì, các dead key tích tụ âm thầm theo thời gian.
- **`react-intl`**: DX dài dòng (`useIntl()` rồi `formatMessage({ id })`), instance toàn cục gắn với nhiều node.
- **`use-intl`**: dễ bắt đầu nhưng khó tối ưu. Việc kết hợp namespace, dynamic loading và type làm chậm tốc độ phát triển khá nhiều.
- **`Lingui`**: cần thêm bước build `extract` / `compile`, nhiều cú pháp chồng chéo (`t()`, tagged template, `i18n.t()`, `<Trans>`) gây bối rối cho cả lập trình viên lẫn trợ lý AI.
- **`Paraglide`**: sinh các file mã nguồn trực tiếp vào repo, tree-shaking không có tác dụng trong bài benchmark React, và locale được đọc từ bộ lưu trữ trên mỗi node thay vì từ một store.
- **`Tolgee`**: không có type cho key, quá trình làm quen ban đầu khó hơn, điểm mạnh lớn nhất là khả năng chỉnh sửa trực tiếp trong ngữ cảnh (in-context editing).
- **`Intlayer`**: bắt buộc dùng plugin build, hệ sinh thái nhỏ hơn, hỗ trợ ICU ở mức một phần, nội dung phân tán khắp codebase theo thiết kế nên việc xuất một file JSON duy nhất cho biên dịch viên cần công cụ hỗ trợ.
- **`gt-react`, `lingo.dev`**: không được khuyến nghị trong benchmark: lỗi hạn ngạch (quota) khi build, phụ thuộc nhà cung cấp (vendor lock-in), và các vấn đề phản ứng dữ liệu (reactivity) đòi hỏi phải ép provider re-render.

## Mã nguồn thực tế trông như thế nào

Cùng một component, phần tóm tắt giỏ hàng gồm tiêu đề và dạng số nhiều, được viết bằng từng ứng cử viên. Điểm thú vị không nằm ở chính component, mà ở vị trí lưu trữ nội dung và những gì trình kiểm tra kiểu dữ liệu (type checker) nhận biết được về nó.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

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
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Dạng số nhiều là các hậu tố key được phân giải qua `Intl.PluralRules`. `t` có kiểu `(key: string) => string` trừ khi bạn khai báo `CustomTypeOptions`, vì vậy `t("titel")` vẫn biên dịch bình thường.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

Sử dụng ICU toàn diện, đây cũng là định dạng mà hầu hết các nền tảng TMS xuất ra. Type cho `id` có được nhờ bước trích xuất của `formatjs` kết hợp với một union được sinh ra, chứ không có sẵn mặc định.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Cấu trúc tương tự như `next-intl` nhưng không có các binding của Next.js. Các key được định kiểu sau khi bạn mở rộng `AppConfig` với kiểu dữ liệu của message; việc phân chia namespace do bạn tự quản lý.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="Tiếng Tây Ban Nha">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

Ngôn ngữ nguồn nằm ngay trong component; các locale khác nằm trong các file `.po` dưới dạng id băm (hash) sau khi chạy `lingui extract`. Nếu quên chạy `extract` hoặc `compile`, ứng dụng sẽ âm thầm fallback về tiếng Anh.

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
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Mỗi message là một hàm được sinh tự động và có kiểu dữ liệu, do đó một key bị thiếu sẽ là lỗi import. Thư mục `paraglide/` được sinh trực tiếp vào repo của bạn và được tạo lại mỗi khi có thay đổi.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      vi: "Giỏ hàng của bạn",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      vi: plural({ one: "{{count}} sản phẩm", other: "{{count}} sản phẩm" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Tất cả các locale nằm trong một file duy nhất đặt cạnh component. Type được sinh ra khi build, nên `title` có thể tự động hoàn thành và lỗi chính tả sẽ làm fail lệnh `tsc` mà không cần declaration merging. Xóa thư mục component cũng đồng nghĩa với việc xóa sạch các chuỗi liên quan.

  </Tab>
</Tabs>

Bạn đã đang sử dụng `react-i18next`, `react-intl` hoặc `Lingui`? Các adapter tương thích ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/lingui.md)) sẽ tạo alias cho các import ở cấp độ bundler, giúp API hiện tại tiếp tục hoạt động trong khi bạn chuyển đổi từng component một. [Hướng dẫn chuyển đổi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_react-i18next_to_intlayer.md) sẽ hướng dẫn các phần còn lại.

## Trước khi bạn đưa ra quyết định

Bảng tính năng cho bạn biết thư viện làm được gì hôm nay. Những điểm dưới đây sẽ cho bạn biết trải nghiệm sử dụng nó lâu dài sẽ như thế nào.

**Kiểm tra mức độ hoạt động của repository.**

Commits, thời gian phản hồi issue, và liệu bản minor release gần nhất có phải trong năm nay hay không. Một thiết kế tốt nhưng không có người duy trì sẽ sớm trở thành một gánh nặng cần di chuyển mã nguồn sau này.

**Đừng chọn chỉ dựa vào lượt tải trên npm.**

Thư viện có lượt tải nhiều nhất là thư viện ra mắt đầu tiên, chứ không hẳn là thư viện phù hợp nhất cho một codebase React năm 2026. Lượt tải phản ánh lịch sử, không phản ánh mức độ tương thích.

![Bảng xếp hạng các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Hãy hỏi ai là người trả tiền cho maintainer, và họ kinh doanh cái gì.**

`i18next` được hậu thuẫn bởi Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` và Lingui được tài trợ bởi Crowdin. Tolgee, Paraglide (inlang) và Intlayer đều vận hành nền tảng riêng của họ. Một nhà cung cấp có doanh thu đến từ dịch vụ lưu trữ bản dịch (hosted translation) sẽ có rất ít động lực để cung cấp dịch vụ dịch thuật miễn phí ngay trong chuỗi công cụ của bạn. Intlayer là thư viện duy nhất trong số này cung cấp tính năng dịch thuật bằng AI qua CLI bằng API key của chính bạn, cùng một CMS có thể tự host (self-host).

**Thư viện đã sẵn sàng cho AI agent chưa?**

Các agent hiện nay vẫn gặp khó khăn với i18n: chúng quên locale, tự tạo ra key lạ, và trộn lẫn các cú pháp message. Thư viện có cung cấp [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md) hay [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md) để agent có thể liệt kê, điền và kiểm thử nội dung không? Và việc tải nội dung có được tối ưu hóa theo mặc định hay không, hay hàng quý vẫn phải có người rà soát lại namespace và lazy import?

**Tính an toàn kiểu dữ liệu (type safety) có sẵn ngay từ đầu.**

Không phải kiểu "có thể định kiểu với cấu hình bổ sung", mà là "một key sai sẽ làm fail `tsc` ngay trên bản cài đặt mới tinh". Hãy kiểm tra điều gì xảy ra với một key không tồn tại, và với một locale bị thiếu một bản dịch.

**Phát hiện nội dung không sử dụng.**

Các catalog chỉ có xu hướng phình to ra. Quá trình build của Intlayer sẽ loại bỏ các trường không dùng và ghi log lại (`build.purge`). Paraglide đạt được điều này nhờ kiến trúc, vì một hàm message không được gọi sẽ bị loại bỏ qua tree-shaking. Tất cả các thư viện còn lại đều để việc dọn dẹp cho bạn tự xử lý.

**Trải nghiệm lập trình viên (Developer Experience).**

Thời gian thiết lập đến chuỗi dịch đầu tiên, một [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md) hoặc [tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md) hiển thị bản dịch khi hover và nhảy đến phần khai báo, một [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để fill, test và push, một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) hoặc trình trích xuất lấy các chuỗi hard-code ra khỏi component để bạn không phải quản lý từng chuỗi theo từng khóa, cùng phương thức cho người không phải lập trình viên chỉnh sửa nội dung ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)) mà không cần tạo pull request.

## Câu hỏi thường gặp

<FAQ>

<Question title="react-i18next có còn là lựa chọn mặc định tốt trong năm 2026 không?">

Có, đối với hầu hết các đội ngũ. Thư viện này sở hữu hệ sinh thái lớn nhất và lượng câu trả lời phong phú nhất trên internet. Chi phí của nó rất rõ ràng và có thể dự đoán được: runtime nặng nhất, định dạng số nhiều tùy chỉnh, cùng với type safety và scoping mà bạn phải tự thiết lập và duy trì.

</Question>

<Question title="Tôi có cần một thư viện dựa trên trình biên dịch không?">

Chỉ khi dung lượng bundle, type được sinh tự động hoặc kiểm tra thiếu key khi build nằm trong các yêu cầu của bạn. Đối với một ứng dụng nhỏ có hai locale, một thư viện runtime sẽ đơn giản hơn. Bài viết [trình biên dịch so với i18n khai báo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md) giải thích những gì trình biên dịch mang lại và những điểm có thể gặp trục trặc.

</Question>

<Question title="Tôi có thể đổi thư viện sau này mà không cần viết lại mọi component không?">

Một phần. Các thư viện dựa trên key chia sẻ cấu trúc đủ tương đồng để một adapter tương thích có thể tạo alias từ API này sang API khác, đó là cách các adapter của Intlayer hoạt động. Định dạng message (ICU so với i18next so với helper) không tự động chuyển đổi, vì vậy phần số nhiều và nội suy (interpolation) sẽ là phần bạn cần chỉnh sửa.

</Question>

<Question title="Lựa chọn thư viện có ảnh hưởng đến SEO không?">

Ảnh hưởng gián tiếp. Những gì công cụ tìm kiếm (crawler) nhìn thấy được quyết định bởi routing, `hreflang`, `<html lang>` và việc văn bản có nằm trong HTML được render phía server hay không. Một số thư viện cung cấp các helper cho việc đó, hầu hết để bạn tự xử lý. Xem [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Đọc thêm

- [Benchmark các thư viện i18n: kích thước bundle, rò rỉ và thời gian chuyển đổi locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md) và [báo cáo TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/tanstack.md)
- [React i18n: mô hình provider hoạt động như thế nào và chi phí ra sao](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/react.md)
- [react-i18next so với react-intl so với Intlayer, so sánh từng tính năng](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next so với next-intl so với Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/next-i18next_vs_next-intl_vs_intlayer.md)
- [Lịch sử của JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
- [Trình biên dịch so với i18n khai báo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [Cách tối ưu hóa bundle hoạt động trong thời gian build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)
- [Thiết lập i18n trong ứng dụng Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+react.md)
- Hướng dẫn tương tự cho [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_svelte_i18n_library.md) và [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_solid_i18n_library.md)
