---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cách chọn đúng thư viện Vue i18n năm 2026"
description: Hướng dẫn ra quyết định cho việc quốc tế hóa (i18n) Vue và Nuxt. Những câu hỏi cần trả lời trước khi so sánh vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide và Intlayer, cùng chi phí của từng lựa chọn về bundle size, typing và SSR payload.
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - so sánh thư viện i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Cách chọn đúng thư viện Vue i18n

"Vue i18n" vừa là một thuật ngữ chung vừa là tên của thư viện mà hầu như ai cũng cài đặt. Điều đó vừa tiện lợi vừa dễ gây hiểu lầm: `vue-i18n` là một lựa chọn mặc định tốt, nhưng không phải là lựa chọn duy nhất, và những câu hỏi định hình quyết định (có dùng SSR hay không, bao nhiêu trang, ai là người viết bản dịch) hiếm khi được đặt ra trước khi chạy `npm install`.

Hướng dẫn này sẽ đặt ra những câu hỏi đó trước, sau đó ánh xạ các câu trả lời tới những thư viện phù hợp, cho cả Vite + Vue thuần lẫn Nuxt.

![Hệ sinh thái thư viện Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Mục lục

<TOC/>

## Sáu câu hỏi cần trả lời trước khi so sánh các thư viện

1. **Vite SPA hay Nuxt?** Trong một SPA, chi phí catalog là vấn đề về JS bundle. Trong Nuxt, đó còn là vấn đề về HTML payload, bởi vì các message được serialize vào SSR state và hydrate. Hầu hết các báo cáo "vue-i18n chạy chậm" xuất phát từ các ứng dụng Nuxt chính vì lý do này.
2. **Ai là người viết bản dịch?** Developer, một TMS, một agency bàn giao chuỗi ICU, hay một AI pipeline. `vue-i18n` sử dụng cú pháp số nhiều riêng biệt phân cách bằng dấu gạch đứng (pipe-separated), không phải ICU. Điều này rất quan trọng nếu các chuỗi văn bản đến từ bên ngoài.
3. **Có bao nhiêu locale và trang?** Hai locale và năm trang có thể chuyển giao (ship) tất cả mọi thứ cùng lúc. Mười locale và bốn mươi route thì không thể, và chiến lược tải dữ liệu (loading strategy) sẽ trở thành chi phí chính.
4. **Bạn có cần type trên các key không?** `t("cart.totl")` vẫn biên dịch bình thường trong `vue-i18n` trừ khi bạn truyền một message schema generic, và schema đó lại xung đột với các catalog được lazy load.
5. **Nội dung bao gồm những gì?** Chỉ các nhãn UI, hay cả markdown, liên kết bên trong câu, và các block riêng theo từng locale. Rich content là nơi mà việc `t()` trả về một chuỗi string trở nên bất tiện.
6. **CSP có phải là một ràng buộc không?** Bản build mặc định của `vue-i18n` biên dịch message trong trình duyệt bằng `new Function`. Các bản build runtime-only cần `@intlify/unplugin-vue-i18n` để precompile tại thời điểm build time.

Hãy ghi lại các câu trả lời. Mọi phân tích bên dưới đều sẽ đối chiếu lại với chúng.

## Bức tranh toàn cảnh qua một hình ảnh

Hệ sinh thái Vue có ít thư viện i18n hơn React, và chúng đến từ các làn sóng kiến trúc khác nhau.

![Lịch sử các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionary (2015 đến 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` xuất hiện vào năm 2015 và luôn là lựa chọn mặc định kể từ đó. `@nuxt/i18n` bọc lấy nó với tính năng định tuyến locale (locale routing), thẻ SEO và lazy loading theo từng locale. Các message được biên dịch thành các render function, tại thời điểm build time nếu bạn thêm unplugin, hoặc trực tiếp trong trình duyệt nếu không cấu hình thêm.

</Accordion>
<Accordion header="Định dạng thay thế (2020): fluent-vue">

Các file `.ftl` của Mozilla Fluent mang lại cú pháp message thân thiện hơn cùng các biến thể nhận biết ngữ pháp (grammar-aware). Không có key type, và Vite plugin sẽ nạp mọi locale vào từng trang.

</Accordion>
<Accordion header="Compiler và nội dung đồng vị trí (2024 đến 2026): Paraglide, Intlayer">

Paraglide sinh ra một hàm cho mỗi message và để bundler tự động tree-shake phần còn lại. Intlayer khai báo nội dung theo từng component trong các file `.content.ts`, sinh type tự động, và chỉ chuyển giao những gì một route thực sự render.

</Accordion>
</AccordionGroup>

Bài viết [lịch sử của JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md) đi sâu chi tiết vào từng làn sóng.

## Quyết định quan trọng nhất: nội dung nằm ở đâu và được tải khi nào

Hai lựa chọn mang tính cấu trúc giải thích cho hầu hết sự khác biệt về bundle size giữa các thiết lập:

- **Nội dung tập trung hay phân tán theo phạm vi (scoped).** Một file `locales/en.json` cho toàn bộ ứng dụng, hay một khai báo riêng cho từng component.
- **Static hay dynamic import.** Nạp tất cả mọi thứ khi khởi động, hay chỉ tải locale đang hoạt động (và lý tưởng nhất là route đang hoạt động) theo nhu cầu (on demand).

Biểu đồ ước tính payload cho một ứng dụng trên lý thuyết từ 1 đến 10 trang, được dịch sang 1 đến 10 locale, với khoảng 30 KB văn bản trên mỗi trang.

![Rò rỉ nội dung theo lý thuyết theo từng kiến trúc](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` hỗ trợ trục dynamic: gọi `setLocaleMessage` sau một lệnh `import()` đồng nghĩa với việc bạn không còn phải chuyển giao chín locale mà không ai đọc. Điều mà nó không mang lại cho bạn là trục theo trang. Một catalog locale là một đối tượng duy nhất, và việc nạp nó sẽ nạp toàn bộ nội dung của mọi trang. Trong một SPA, không ai nhận ra điều đó. Nhưng trong Nuxt, với `@nuxtjs/i18n` và nhiều hơn mười trang, mỗi route đều phải gánh các chuỗi của mọi route khác hai lần: trong JS chunk và trong SSR payload.

Bài [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/vue.md) đo lường điều này dưới dạng "rò rỉ từ các route khác" (leakage from other routes) và "rò rỉ từ các locale khác" (leakage from other locales). Nếu câu trả lời của bạn cho câu hỏi 3 là "nhiều trang", phần này sẽ quan trọng hơn bất kỳ sở thích API nào. Bài viết [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md) đề cập đến khía cạnh bảo trì của cùng sự đánh đổi này.

## Các ứng cử viên

Kích thước thư viện được lấy từ bài [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/vue.md): plugin cộng với composable trong một component rỗng, sau khi bundling, tree-shaking và minification, trên một ứng dụng 10 trang, 10 locale. Nội dung được đo lường riêng biệt.

| Thư viện       | Mô hình nội dung                                           | An toàn kiểu                     | Định dạng message                   | Phân tách theo route   | Kích thước thư viện                                |
| :------------- | :--------------------------------------------------------- | :------------------------------- | :---------------------------------- | :--------------------- | :------------------------------------------------- |
| `vue-i18n`     | Catalog tập trung theo locale, tùy chọn SFC `<i18n>` block | 2/5 — Opt-in qua schema generic  | Riêng (pipe plural)                 | Không                  | ~24.3 kB                                           |
| `@nuxtjs/i18n` | Tương tự `vue-i18n`, cộng thêm routing và thẻ SEO          | 2/5 — Tương tự                   | Tương tự                            | Không, chỉ theo locale | ~24.3 kB                                           |
| `fluent-vue`   | File `.ftl` (Mozilla Fluent)                               | 1/5 — Không                      | Fluent                              | Không                  | ~29.7 kB                                           |
| Paraglide      | Project inlang, các hàm được sinh ra                       | 3.5/5 — Được sinh ra             | Riêng                               | Qua tree-shaking       | Gần như bằng 0 (do mã được sinh ra trong codebase) |
| Intlayer       | Một file `.content.ts` cho mỗi component                   | 5/5 — Được sinh ra, bật mặc định | Intlayer (+ ICU, i18next, vue-i18n) | Có, theo component     | ~3.9 kB                                            |

> Các con số là ảnh chụp nhanh tại các phiên bản của bài benchmark. Hãy chạy thử nghiệm trên chính ứng dụng của bạn trước khi đưa ra quyết định chỉ dựa vào kích thước.
> An toàn kiểu: 5/5 nghĩa là khóa, tham số và mọi locale đều được kiểm tra mà không cần thiết lập thủ công, bao gồm cả trình định dạng URL và các helper.

Kích thước thư viện gần như bằng 0 của Paraglide đạt được nhờ thiết kế: runtime được sinh trực tiếp vào repository của bạn, điều này đồng nghĩa với việc cần một bước sinh lại mã (regeneration) trước mỗi lần push và nguy cơ merge conflict trên các file được sinh ra. Intlayer cần `vite-intlayer` (hoặc Nuxt module), vì vậy nó không thể chạy nếu không có một build step.

## Đối chiếu câu trả lời với thư viện phù hợp

<AccordionGroup>
<Accordion header="Vite SPA, team nhỏ, ít locale">

`vue-i18n` ở chế độ Composition (`legacy: false`), kết hợp với `@intlify/unplugin-vue-i18n` để bạn chuyển giao bản build runtime-only. Lazy-load các locale bằng `import()`. Cấu hình này đáp ứng hầu hết các ứng dụng nhỏ và câu trả lời từ cộng đồng có ở khắp mọi nơi. Các block SFC `<i18n>` đặt message đồng vị trí với component, điều này rất hữu ích, nhưng công cụ trích xuất và hỗ trợ TMS xung quanh chúng còn hạn chế hơn so với catalog JSON, vì vậy hãy sớm thống nhất lựa chọn mà team sẽ sử dụng.

</Accordion>
<Accordion header="Nuxt với định tuyến locale, sitemap và hreflang">

`@nuxtjs/i18n` cung cấp chiến lược định tuyến, các thẻ `hreflang` và tự động phát hiện locale mà không cần viết thêm code, và chỉ riêng điều đó đã đủ để chọn nó cho các trang nội dung có vài trang. Giới hạn của nó nằm ở catalog theo từng locale: khi vượt quá khoảng mười trang, SSR payload sẽ phải gánh toàn bộ nội dung của mọi route. Nếu đó là trường hợp của bạn, hãy tự cấu hình thủ công `vue-i18n` với message theo từng route, hoặc chuyển sang mô hình nội dung scoped. Bài viết [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/nuxt.md) sẽ hướng dẫn bạn lựa chọn chiến lược định tuyến trước tiên.

</Accordion>
<Accordion header="Bản dịch đến từ TMS hoặc agency bàn giao định dạng ICU">

Cú pháp số nhiều của `vue-i18n` (`"no item | one item | {count} items"`) không phải là ICU và không mang tính tương thích cao (portable). Các biên dịch viên cần được thông báo trước về điều này, và bản xuất từ TMS thông thường sẽ không tạo ra định dạng đó. Hãy thống nhất định dạng trước khi tạo catalog đầu tiên, hoặc chọn một thư viện có định dạng phù hợp với vendor của bạn. Khả năng hỗ trợ ICU của Intlayer mới ở mức một phần, vì vậy nếu hiện tại bạn nhận chuỗi ICU, hãy cân nhắc đó cũng là một yếu tố cản trở.

</Accordion>
<Accordion header="Ứng dụng lớn, nhiều route, ngân sách bundle hoặc SSR payload hạn chế">

Nên ưu tiên nội dung scoped được biên dịch tại build time. Paraglide đạt được điều này thông qua tree-shaking, hoạt động rất hiệu quả trên Vite. Intlayer đạt được điều này thông qua các khai báo theo từng component và chỉ chuyển giao những gì route thực sự render. Với `vue-i18n`, bạn có thể chia tách message theo route một cách thủ công, nhưng không có gì đảm bảo tính thực thi và một component dùng chung import namespace toàn cục có thể âm thầm phá vỡ cấu trúc đó.

</Accordion>
<Accordion header="Type safety là yêu cầu bắt buộc">

`vue-i18n` có thể được gán type bằng cách truyền một schema generic vào `createI18n`. Cách này hoạt động được, nhưng sẽ bị phá vỡ ngay khi các catalog được lazy load, bởi vì schema mô tả các message có thể chưa được tải về. Nếu không muốn phải tự bảo trì điều đó, hãy chọn thư viện có type được sinh trực tiếp từ nội dung: Paraglide hoặc Intlayer. Bài viết [phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md) so sánh những gì mỗi công cụ phát hiện được tại build time.

</Accordion>
<Accordion header="Nội dung phức tạp hơn các nhãn UI thông thường">

Các trang markdown, câu có chứa `<RouterLink>` ở giữa, hoặc các component riêng biệt theo locale. `vue-i18n` có `<i18n-t>` cho phép nội suy component (component interpolation), hoạt động ổn nhưng khá dài dòng. Content node của Intlayer chấp nhận markdown, HTML và các object lồng nhau trực tiếp, phù hợp hơn nhiều khi ứng dụng chứa nhiều nội dung phong phú.

</Accordion>
<Accordion header="Bản dịch sẽ được tạo bởi AI">

Khi đó, file JSON tập trung không còn đối tượng sử dụng nào để duy trì sự tồn tại của nó. Nội dung đồng vị trí kết hợp với một CLI tự động điền các locale còn thiếu là con đường ngắn hơn nhiều. Lệnh `fill` của Intlayer chạy trực tiếp với API key của chính bạn (OpenAI, Anthropic, Mistral, Gemini) và chỉ dịch lại những gì đã thay đổi.

</Accordion>
</AccordionGroup>

## Hạn chế của từng thư viện

- **`vue-i18n`**: nặng nhất trong nhóm, định dạng số nhiều riêng, type là tùy chọn (opt-in) và dễ vỡ khi lazy loading, không hỗ trợ phân tách phạm vi theo route, các key không dùng tích tụ một cách âm thầm. Việc để lại `legacy: true` trong ứng dụng Vue 3 sẽ giữ lại layer tương thích Vue 2 và làm mất khả năng gõ type của `useI18n()`.
- **`@nuxtjs/i18n`**: thừa hưởng tất cả các nhược điểm trên, và SSR payload sẽ gánh toàn bộ chuỗi ký tự của mọi trang khi ứng dụng vượt quá khoảng một tá route.
- **`fluent-vue`**: cú pháp message tốt, không có key type, và Vite plugin nạp tất cả nội dung ở mọi ngôn ngữ vào từng trang. Nặng nhất trong bài benchmark.
- **Paraglide**: các file được sinh ra phải commit vào repo, cần regenerate trước mỗi lần push, và locale được đọc từ cookie hoặc storage trên mỗi lệnh gọi message thay vì từ một reactive store, làm tốn thêm tài nguyên xử lý khi chuyển đổi locale.
- **Intlayer**: bắt buộc phải có build plugin, hệ sinh thái nhỏ hơn, hỗ trợ ICU một phần, và nội dung phân tán khắp codebase theo thiết kế, vì vậy việc xuất ra một file JSON duy nhất cho biên dịch viên sẽ cần đến công cụ hỗ trợ.

## Mã nguồn thực tế của từng lựa chọn

Cùng một component, phần tóm tắt giỏ hàng với tiêu đề và định dạng số nhiều, được viết bằng từng ứng cử viên. Điểm thú vị không nằm ở template, mà ở vị trí lưu trữ nội dung và những gì `vue-tsc` nhận biết được về nó.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Số nhiều phân cách bằng dấu gạch đứng (pipe) là định dạng riêng của vue-i18n, không phải ICU. `t` chấp nhận bất kỳ chuỗi nào trừ khi bạn truyền một message schema generic vào `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Cú pháp của Fluent xử lý số nhiều và các biến thể ngữ pháp rất tốt. Message id là các chuỗi untyped, và Vite plugin đóng gói mọi locale vào từng trang.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Mỗi message là một hàm được sinh ra và có đầy đủ type, vì vậy một key bị thiếu sẽ dẫn đến lỗi import. Thư mục `paraglide/` được sinh trực tiếp vào repo của bạn và được regenerate lại sau mỗi lần thay đổi.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Tất cả các locale nằm trong một file duy nhất cạnh component. Type được sinh ra tại thời điểm build, vì vậy `title` được tự động gợi ý (autocomplete) và lỗi chính tả sẽ khiến `vue-tsc` báo lỗi ngay. `<title />` render một node mà visual editor có thể nhắm tới; `{{ items(props.count) }}` trả về chuỗi văn bản thuần.

  </Tab>
</Tabs>

Bạn đang sử dụng `vue-i18n`? [Compat adapter `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/vue-i18n.md) alias package ở cấp độ bundler, nhờ đó `useI18n()`, `$t`, pipe plural và `v-t` tiếp tục hoạt động trong khi Intlayer đảm nhận cung cấp nội dung. [Hướng dẫn di chuyển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_vue-i18n_to_intlayer.md) sẽ hướng dẫn bạn cách gỡ bỏ adapter sau đó, và cũng có [hướng dẫn dành riêng cho Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_nuxtjs_i18n_to_intlayer.md).

## Những điều cần cân nhắc trước khi quyết định

Bảng tính năng chỉ cho bạn biết một thư viện có thể làm được gì hôm nay. Những điểm dưới đây cho bạn biết trải nghiệm thực tế khi đồng hành cùng nó sẽ như thế nào.

**Kiểm tra mức độ hoạt động của repository.**

Các commit, thời gian phản hồi issue, và liệu bản phát hành minor gần nhất có diễn ra trong năm nay hay không. Một thiết kế hoàn hảo nhưng không có người duy trì sẽ sớm trở thành một cuộc di chuyển (migration) bắt buộc trong tương lai.

**Đừng chọn thư viện chỉ dựa vào lượt tải trên npm.**

Thư viện được cài đặt nhiều nhất là thư viện xuất hiện đầu tiên, không phải thư viện phù hợp nhất cho một codebase Vue năm 2026. Lượt tải phản ánh lịch sử, không phản ánh sự phù hợp.

![Bảng xếp hạng các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Tìm hiểu xem ai tài trợ cho người duy trì, và họ bán sản phẩm gì.**

`vue-i18n` được bảo trợ bởi Crowdin, tương tự như `next-intl` và `svelte-i18n`. `i18next` được bảo trợ bởi Locize. Tolgee, Paraglide (inlang) và Intlayer tự vận hành nền tảng riêng của mình. Một vendor có nguồn thu đến từ dịch vụ lưu trữ bản dịch (hosted translation) ít có lý do để cung cấp bản dịch miễn phí ngay bên trong chuỗi công cụ của bạn. Intlayer là thư viện duy nhất trong nhóm cung cấp tính năng dịch AI qua CLI bằng chính API key của bạn, cùng một CMS mà bạn có thể tự host.

**Thư viện đã sẵn sàng cho AI-agent chưa?**

Các agent vẫn còn gặp khó khăn với i18n: chúng quên locale, tự tạo key bừa bãi, và trộn lẫn các cú pháp message. Thư viện có cung cấp [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md) hoặc một [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md) để agent có thể liệt kê, điền và kiểm thử nội dung hay không? Và việc nạp nội dung có được tối ưu hóa theo mặc định không, hay ai đó phải xem xét lại các namespace và lazy import mỗi quý một lần?

**Type safety ngay từ đầu.**

Không phải "có thể gõ type nếu cấu hình thêm" mà là "sai key sẽ khiến `tsc` báo lỗi ngay trên một bản cài đặt mới". Hãy kiểm tra xem điều gì sẽ xảy ra khi một key không tồn tại, và khi một locale bị thiếu một bản dịch.

**Phát hiện nội dung không sử dụng.**

Các catalog chỉ có xu hướng phình to. Quá trình build của Intlayer sẽ loại bỏ các trường không sử dụng và ghi log chúng (`build.purge`). Paraglide đạt được điều này nhờ kiến trúc, vì một hàm message không được gọi sẽ bị tree-shake. Tất cả các giải pháp khác đều để lại công việc dọn dẹp cho bạn.

**Trải nghiệm lập trình viên (Developer experience).**

Thời gian thiết lập cho đến chuỗi dịch đầu tiên, một [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md) hoặc [tiện ích mở rộng VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md) hiển thị bản dịch khi hover và nhảy thẳng tới định nghĩa, một [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để fill, test và push, một [trình biên dịch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compiler.md) hoặc trình trích xuất lấy các chuỗi hard-code ra khỏi component để bạn không phải quản lý từng chuỗi theo từng khóa, cùng phương thức để người không phải developer có thể chỉnh sửa nội dung ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)) mà không cần tạo pull request.

## Câu hỏi thường gặp

<FAQ>

<Question title="vue-i18n có còn là lựa chọn mặc định phù hợp trong năm 2026?">

Đối với hầu hết các ứng dụng Vue, câu trả lời là có. Hệ sinh thái lớn nhất, tài liệu kỹ lưỡng, và các chi phí đều có thể dự đoán được: runtime nặng, định dạng số nhiều tùy chỉnh, và việc phân tách phạm vi theo route đòi hỏi bạn phải tự xây dựng và kiểm soát.

</Question>

<Question title="Tôi nên sử dụng @nuxtjs/i18n hay tự cấu hình vue-i18n thủ công trong Nuxt?">

Hãy sử dụng module trừ khi việc định tuyến của bạn có yêu cầu đặc biệt hoặc ứng dụng chỉ có rất ít trang. Cấu hình thủ công đồng nghĩa với việc bạn phải tự xây dựng lại locale route, middleware, `hreflang` và sitemap, và những thứ đó phức tạp hơn vẻ bề ngoài rất nhiều.

</Question>

<Question title="Tôi có cần một thư viện dựa trên compiler không?">

Chỉ khi bundle size, SSR payload, type được sinh tự động hoặc kiểm tra thiếu key tại build time là các yêu cầu thực tế của dự án. Bài viết [so sánh i18n compiler và declarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md) giải thích những gì compiler mang lại và những điểm chúng có thể xử lý chưa tối ưu.

</Question>

<Question title="Việc lựa chọn thư viện có ảnh hưởng đến SEO không?">

Ảnh hưởng gián tiếp. Các công cụ tìm kiếm quan tâm đến định tuyến, `hreflang`, `<html lang>` và việc văn bản có nằm trong HTML được render từ server hay không. Xem thêm [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Tìm hiểu thêm

- [Benchmark Vue i18n: bundle size, độ rò rỉ và thời gian chuyển đổi locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/vue.md)
- [Vue i18n: cách vue-i18n hoạt động và những điểm bất cập](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/vue.md) và [bài viết về Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n so với Intlayer, từng tính năng chi tiết](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/vue-i18n_vs_intlayer.md) và [benchmark vue-i18n so với Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n có lỗi thời không?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/is_vue-i18n_outdated.md)
- [Lịch sử của JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
- [So sánh i18n compiler và declarative](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [i18n theo từng component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [Cài đặt i18n trong ứng dụng Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+vue.md) và trong [ứng dụng Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nuxt.md)
- Cùng hướng dẫn cho [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_svelte_i18n_library.md) và [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_solid_i18n_library.md)
