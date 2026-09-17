---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cách chọn thư viện i18n phù hợp cho Svelte vào năm 2026"
description: Hướng dẫn đưa ra quyết định quốc tế hóa cho Svelte và SvelteKit. Những câu hỏi cần trả lời trước khi so sánh svelte-i18n, Paraglide, typesafe-i18n, wuchale và Intlayer, cùng chi phí của từng lựa chọn về bundle size, typing và an toàn SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - so sánh thư viện i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Cách chọn thư viện i18n phù hợp cho Svelte

Svelte không cung cấp sẵn bất kỳ công cụ nào cho i18n. Không có `$t`, không có primitive cho locale, không có định dạng message. Mọi lựa chọn đều đến từ bên thứ ba, và hệ sinh thái Svelte là nơi i18n tại compile-time phát triển mạnh mẽ nhất, do đó các ứng viên khác biệt nhau nhiều hơn so với bên React hoặc Vue.

Hướng dẫn này liệt kê các câu hỏi cần trả lời trước tiên, sau đó đối chiếu câu trả lời với `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` và Intlayer, dành cho Vite + Svelte và SvelteKit.

![Hệ sinh thái thư viện Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Mục lục

<TOC/>

## Sáu câu hỏi cần trả lời trước khi so sánh các thư viện

1. **Vite SPA hay SvelteKit?** Trong một SPA, module-level store là hoàn toàn chuẩn xác: một tab, một người dùng, một locale. Trên SvelteKit, chính singleton đó lại được chia sẻ giữa các request đồng thời trên server, khiến request B render bằng ngôn ngữ của request A. Thư viện sẽ cung cấp cơ chế xử lý theo từng request (context, `locals`) hoặc để bạn tự xử lý.
2. **Ai là người viết bản dịch?** Developer, một TMS, một agency cung cấp chuỗi ICU, hay một pipeline AI. `svelte-i18n` hỗ trợ ICU. Paraglide và `typesafe-i18n` sử dụng cú pháp riêng của họ. Hãy chọn thư viện tương thích với nguồn cung cấp.
3. **Có bao nhiêu locale và trang?** Hai locale và năm trang có thể đóng gói tất cả vào bundle. Mười locale và bốn mươi route thì không thể, và sự khác biệt giữa runtime catalog và compiled message sẽ trở thành chi phí chính.
4. **Bạn có cần type cho các key không?** `$_("cart.totl")` là lỗi runtime trong `svelte-i18n`. Các thư viện compile-time sẽ biến nó thành lỗi type ngay từ khi biên dịch.
5. **Svelte 4 stores hay Svelte 5 runes?** Runes thay đổi cú pháp của locale state, chứ không thay đổi vấn đề chia sẻ state. Nhưng `$state` trong file `.ts` biên dịch thành một biến thông thường, vì vậy runtime của thư viện phải hỗ trợ rune nếu bạn đang dùng Svelte 5.
6. **Bạn có chấp nhận các file được generate trong repo không?** Cả Paraglide và `typesafe-i18n` đều generate JavaScript hoặc TypeScript vào source tree của bạn. Một số team cảm thấy ổn với điều đó, những team khác lại gặp xung đột merge trên mỗi branch song song.

Hãy ghi lại các câu trả lời. Mọi nội dung bên dưới đều tham chiếu đến chúng.

## Toàn cảnh hệ sinh thái trong một bức tranh

Svelte i18n xuất hiện muộn hơn React hoặc Vue, và đã tiến thẳng tới các làn sóng compile-time.

![Lịch sử các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries (2019 đến 2020): svelte-i18n, sveltekit-i18n">

Catalog dạng JSON, ICU được parse trong trình duyệt thông qua `intl-messageformat`, locale nằm trong module-level store (`$locale`, `$_`). Được áp dụng nhiều nhất, tài liệu đầy đủ, nhưng phần kết nối SSR là do bạn tự cấu hình.

</Accordion>
<Accordion header="Generated types (2020 đến 2022): typesafe-i18n">

Một generator theo dõi các catalog của bạn và xuất ra các accessor có kiểu dữ liệu (`$LL.cart.total()`). Mô hình tốt, sinh file trong repo, và repository này gần đây không có nhiều cập nhật.

</Accordion>
<Accordion header="Compiler và colocated content (2022 đến 2026): Paraglide, wuchale, Intlayer">

Paraglide biên dịch mỗi message thành một export function để bundler có thể tree-shake những gì route không bao giờ gọi. `wuchale` trích xuất các chuỗi từ markup lúc build. Intlayer khai báo nội dung theo từng component và generate type cùng dictionary cho từng component.

</Accordion>
</AccordionGroup>

Bài viết về [lịch sử JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md) phân tích chi tiết từng làn sóng.

## Quyết định quan trọng nhất: nơi lưu trữ nội dung và thời điểm tải

Hai lựa chọn về mặt cấu trúc giải thích phần lớn sự khác biệt về bundle giữa các thiết lập:

- **Nội dung tập trung hay theo phạm vi (scoped).** Một file `locales/en.json` cho toàn bộ app, hay một khai báo riêng cho từng component.
- **Import tĩnh hay động.** Tải toàn bộ khi khởi động, hay chỉ tải locale đang hoạt động (và lý tưởng nhất là route đang hoạt động) theo nhu cầu.

Biểu đồ ước tính dung lượng payload cho một ứng dụng giả định từ 1 đến 10 trang, được dịch sang 1 đến 10 locale, với khoảng 30 KB văn bản cho mỗi trang.

![Mức độ rò rỉ nội dung theo lý thuyết dựa trên kiến trúc](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` mặc định nằm ở góc trên bên trái: `register("fr", () => import("./fr.json"))` cho phép tải động theo từng locale, nhưng catalog của một locale là một object duy nhất và việc tải nó sẽ tải toàn bộ nội dung của mọi trang. Paraglide là trường hợp thú vị: vì mỗi message là một export riêng biệt, tree-shaking tự động tối ưu theo từng trang, và [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/svelte.md) xác nhận nó hoạt động đúng như quảng cáo trên Vite + Svelte (điều này không xảy ra trong các benchmark React và Next.js). Intlayer đạt được kết quả tương tự thông qua việc khai báo theo từng component.

Nếu câu trả lời của bạn cho câu hỏi 3 là "nhiều trang", hãy cân nhắc phần này nhiều hơn bất kỳ sở thích API nào. Bài viết [i18n theo component so với tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md) đề cập đến khía cạnh bảo trì của cùng một sự đánh đổi này.

## Các ứng viên

Kích thước thư viện được lấy từ [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/svelte.md): store cùng với accessor trong một component rỗng, sau khi bundle, tree-shaking và minification, trên một ứng dụng 10 trang, 10 locale. Nội dung được đo lường riêng biệt.

| Thư viện        | Nơi lưu trữ message               | Trạng thái locale                           | Type trên key                  | Định dạng message | Tách theo route            | Kích thước thư viện |
| :-------------- | :-------------------------------- | :------------------------------------------ | :----------------------------- | :---------------- | :------------------------- | :------------------ |
| `svelte-i18n`   | JSON catalog theo từng locale     | Module-level Svelte store                   | Union thủ công                 | ICU               | Không                      | ~16.6 kB            |
| `typesafe-i18n` | Module TS được generate           | Store adapter                               | Được generate                  | Riêng             | Một phần                   | Nhỏ                 |
| Paraglide       | Dự án inlang, biên dịch thành hàm | Đọc mỗi lần gọi từ cookie, URL hoặc storage | Được generate                  | Riêng             | Có, thông qua tree-shaking | Gần như bằng 0      |
| `wuchale`       | Trích xuất từ markup lúc build    | Store                                       | Không áp dụng (không dùng key) | Riêng             | Có                         | Nhỏ                 |
| Intlayer        | `.content.ts` đặt cạnh component  | Context kết hợp store, hỗ trợ rune          | Được generate, mặc định        | Helper            | Có, theo component         | Mức chuẩn           |

> Các con số là ảnh chụp nhanh tại phiên bản của benchmark. Hãy chạy thử trên ứng dụng của riêng bạn trước khi quyết định chỉ dựa trên kích thước.

Kích thước thư viện gần như bằng 0 của Paraglide là do cấu trúc: runtime được generate trực tiếp vào repository của bạn. Intlayer cần `vite-intlayer`, vì vậy nó không thể chạy nếu thiếu bước build.

## Đối chiếu câu trả lời của bạn với thư viện phù hợp

<AccordionGroup>
<Accordion header="Vite SPA, team nhỏ, ít locale">

`svelte-i18n`. Đây là lựa chọn có nhiều tài liệu nhất, `$_` đọc rất tự nhiên trong markup, và `register` kết hợp `waitLocale()` xử lý tốt việc lazy loading theo từng locale. Hãy chặn lần render đầu tiên dựa trên `isLoading`, nếu không bạn sẽ bị nháy các raw key. Nếu ứng dụng có thể phát triển thêm server sau này, hãy đưa locale vào Svelte context ngay từ ngày đầu thay vì phụ thuộc vào module store; điều này không tốn kém gì ở hiện tại nhưng sẽ tránh được lỗi chỉ xuất hiện trên production sau này.

</Accordion>
<Accordion header="SvelteKit với định tuyến locale và SSR">

Vấn đề chia sẻ state sẽ quyết định trường hợp này. `svelte-i18n` hoạt động trên SvelteKit nhưng cấu hình theo từng request (`hooks.server.ts`, `locals`, `load`, sau đó là `setContext`) bạn phải tự viết và rất dễ mắc lỗi tinh vi. Paraglide cung cấp sẵn tích hợp cho SvelteKit giúp xử lý routing và đọc locale theo từng lệnh gọi, tránh được vấn đề singleton. Intlayer thiết lập locale từ dữ liệu của `load` vào context. Bài viết [SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/sveltekit.md) giải thích sự lựa chọn giữa `[[lang]]` và `reroute`, điều bạn nên cân nhắc trước khi chọn thư viện.

</Accordion>
<Accordion header="Bản dịch đến từ TMS hoặc agency cung cấp chuỗi ICU">

`svelte-i18n` hỗ trợ ICU gốc thông qua `intl-messageformat`, nên nó kết nối trực tiếp với hầu hết các nhà cung cấp. Paraglide và `typesafe-i18n` sử dụng cú pháp riêng và cần chuyển đổi. Khả năng hỗ trợ ICU của Intlayer mới là một phần, vì vậy nếu hiện tại bạn nhận chuỗi ICU, hãy xem đó là một rào cản.

</Accordion>
<Accordion header="Bundle size là ưu tiên hàng đầu">

Compile-time. Khả năng tree-shaking của Paraglide hoạt động tốt trên Vite + Svelte và chi phí thư viện gần như bằng 0. Dictionary theo từng component của Intlayer mang lại kết quả tương tự mà không cần generate file trong repo. `svelte-i18n` kèm theo bộ parser ICU cùng toàn bộ catalog và chiếm dung lượng khoảng gấp 4.5 lần `svelte-intlayer` trong benchmark trước khi tính bất kỳ nội dung nào.

</Accordion>
<Accordion header="Type safety là yêu cầu bắt buộc">

Bất kỳ lựa chọn nào ngoại trừ thiết lập `svelte-i18n` thuần túy, nơi typing duy nhất là một union viết tay và sẽ nhanh chóng lệch khỏi JSON. `typesafe-i18n`, Paraglide và Intlayer đều generate type từ nội dung. Hãy kiểm tra mức độ hoạt động của repository `typesafe-i18n` trước khi áp dụng cho codebase. Bài viết [phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md) so sánh những gì mỗi thư viện có thể bắt được tại thời điểm build.

</Accordion>
<Accordion header="Bạn không muốn có file được generate trong repo">

Điều đó loại bỏ Paraglide và `typesafe-i18n`. `svelte-i18n` và Intlayer lưu trữ output của chúng trong `node_modules` hoặc thư mục build; với Intlayer, các file `.content.ts` là mã nguồn do bạn viết tay, còn dictionary và type được biên dịch sẽ nằm trong `.intlayer/` và được đưa vào ignore.

</Accordion>
<Accordion header="Bản dịch sẽ được tạo bởi AI">

Khi đó, file JSON tập trung không còn đối tượng sử dụng nào để duy trì sự cần thiết của nó. Nội dung được đặt cạnh component kết hợp với một CLI để điền các locale còn thiếu là con đường ngắn hơn. Lệnh `fill` của Intlayer chạy với API key của chính bạn (OpenAI, Anthropic, Mistral, Gemini) và chỉ dịch lại những gì đã thay đổi. Hệ sinh thái inlang của Paraglide cung cấp các giải pháp hosted tương đương với các gói dịch vụ riêng của họ.

</Accordion>
</AccordionGroup>

## Hạn chế của từng thư viện

- **`svelte-i18n`**: nặng nhất trong nhóm, không có type cho key, không tách theo route, module-level store bị rò rỉ giữa các request trên SvelteKit trừ khi bạn tự cấu hình context.
- **`typesafe-i18n`**: cần quy trình watcher, sinh file trong repo, và repository gần đây không có nhiều cập nhật.
- **Paraglide**: các file generate phải commit vào repo và generate lại trước mỗi lần push, gây xung đột merge trên các branch song song, và locale được đọc từ cookie hoặc storage trên mỗi lệnh gọi message thay vì từ store, gây tốn tài nguyên khi thay đổi locale.
- **`wuchale`**: ý tưởng trích xuất thú vị, nhưng vẫn còn ở giai đoạn đầu. Benchmark React gặp vấn đề về reactivity đòi hỏi phải ép provider re-render, và tài liệu còn ít.
- **Intlayer**: bắt buộc phải dùng build plugin, hệ sinh thái nhỏ hơn, hỗ trợ ICU một phần, và nội dung nằm rải rác khắp codebase theo thiết kế, vì vậy việc xuất một file JSON duy nhất cho biên dịch viên cần có công cụ hỗ trợ.

## Code thực tế của từng lựa chọn trông như thế nào

Cùng một component, phần tóm tắt giỏ hàng với tiêu đề và số nhiều, được viết bằng từng ứng viên. Điểm thú vị không nằm ở phần markup, mà ở nơi lưu trữ nội dung, cách lưu trữ locale và những gì type checker nhận biết được.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU thông qua `intl-messageformat`, locale nằm trong module-level store. `$_` chấp nhận bất kỳ chuỗi nào; typing duy nhất là một union bạn tự viết bằng tay.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Mỗi message là một hàm được generate có kiểu dữ liệu, được tree-shake nếu không bao giờ được gọi. Thư mục `paraglide/` được generate vào repo của bạn, và locale được đọc theo mỗi lần gọi thay vì từ một store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Các accessor có kiểu dữ liệu được generate bởi một quy trình watcher. Mô hình rất tốt; các file được generate nằm trong repo và dự án gần đây khá yên ắng.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Tất cả các locale trong một file duy nhất đặt cạnh component. `useIntlayer` trả về một readable store, do đó `$content` là cơ chế auto-subscription quen thuộc, và locale được giữ trong context (an toàn cho SSR) thay vì module singleton.

  </Tab>
</Tabs>

Đang sử dụng `svelte-i18n`? [Compat adapter `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/svelte-i18n.md) tạo alias cho package ở cấp độ bundler để `$_`, `$date`, `$number` và các flat key của bạn tiếp tục hoạt động trong khi Intlayer cung cấp nội dung.

## Trước khi bạn đưa ra cam kết

Một bảng tính năng chỉ cho bạn biết thư viện làm được gì hôm nay. Những điểm sau đây cho bạn biết quá trình sử dụng thực tế sẽ như thế nào.

**Kiểm tra mức độ hoạt động của repository.**

Số lượng commit, thời gian phản hồi issue, và liệu bản minor release gần nhất có diễn ra trong năm nay không. Một thiết kế tốt nhưng không có người duy trì sẽ sớm trở thành một cuộc migration trong tương lai.

**Đừng chọn chỉ dựa vào lượt tải npm.**

Thư viện được cài đặt nhiều nhất là thư viện ra mắt đầu tiên, không phải thư viện phù hợp nhất cho codebase Svelte vào năm 2026. Lượt tải phản ánh lịch sử, không phản ánh mức độ phù hợp.

![Bảng xếp hạng các thư viện JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Tìm hiểu ai tài trợ cho maintainer và họ kinh doanh gì.**

`svelte-i18n` được bảo trợ bởi Crowdin, tương tự như `next-intl` và `vue-i18n`. `i18next` được bảo trợ bởi Locize. Tolgee, Paraglide (inlang) và Intlayer đều vận hành nền tảng riêng của họ. Một nhà cung cấp có doanh thu đến từ dịch vụ dịch thuật hosted có rất ít lý do để cung cấp bản dịch miễn phí ngay trong toolchain của bạn. Intlayer là thư viện duy nhất trong nhóm cung cấp tính năng dịch thuật bằng AI qua CLI bằng API key của chính bạn, cùng một CMS mà bạn có thể tự host.

**Thư viện đã sẵn sàng cho AI agent chưa?**

Agent vẫn còn gặp khó khăn với i18n: chúng quên locale, tự tạo key và trộn lẫn các cú pháp message. Thư viện có cung cấp [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md) hoặc [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md) để agent có thể liệt kê, điền và kiểm thử nội dung không? Và việc tải nội dung có được tối ưu mặc định hay cần ai đó phải xem xét lại namespace và lazy import mỗi quý?

**Type safety có sẵn ngay khi cài đặt.**

Không phải là "có thể định kiểu bằng cấu hình thêm" mà là "sai key sẽ báo lỗi `tsc` ngay trên bản cài đặt mới". Hãy kiểm tra điều gì xảy ra với một key không tồn tại, và với một locale bị thiếu một bản dịch.

**Phát hiện nội dung không sử dụng.**

Các catalog chỉ có tăng dần theo thời gian. Quá trình build của Intlayer sẽ dọn dẹp các field không sử dụng và ghi log (`build.purge`). Paraglide đạt được điều này nhờ kiến trúc, vì một hàm message không được gọi sẽ bị tree-shake. Tất cả các lựa chọn khác đều để việc dọn dẹp lại cho bạn.

**Trải nghiệm lập trình viên (Developer Experience).**

Thời gian thiết lập cho đến chuỗi dịch đầu tiên, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md) hoặc [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md) hiển thị bản dịch khi hover và nhảy tới phần khai báo, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md) để fill, test và push, cùng phương thức cho người không phải developer chỉnh sửa nội dung ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_visual_editor.md) hoặc [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md)) mà không cần pull request.

## Câu hỏi thường gặp

<FAQ>

<Question title="svelte-i18n có còn là lựa chọn mặc định phù hợp vào năm 2026?">

Đối với Vite SPA với catalog nhỏ, câu trả lời là có. Đây là lựa chọn có nhiều tài liệu nhất và khả năng tương thích ICU rất quan trọng đối với nhiều team. Trên SvelteKit hoặc khi ứng dụng vượt quá vài chục trang, các chi phí của nó (không có type, không phân tách phạm vi, store dùng chung) bắt đầu gia tăng.

</Question>

<Question title="Khả năng tree-shaking của Paraglide có thực sự hiệu quả?">

Trên Vite + Svelte, có, benchmark đã xác nhận điều đó. Trên React với TanStack Start hoặc Next.js, tính năng này không phát huy tác dụng trong cùng một benchmark. Hãy kiểm chứng trên chính stack của bạn thay vì tin tưởng hoàn toàn vào một trong hai kết quả.

</Question>

<Question title="Runes có làm thay đổi việc tôi nên chọn thư viện nào không?">

Chúng thay đổi cú pháp của locale state của riêng bạn, chứ không thay đổi vấn đề chia sẻ state. Điều quan trọng là runtime của thư viện có hỗ trợ rune trên Svelte 5 hay không và nó có sử dụng context thay vì module store hay không. Hãy kiểm tra cả hai yếu tố.

</Question>

<Question title="Lựa chọn thư viện có ảnh hưởng đến SEO không?">

Ảnh hưởng gián tiếp. Bot tìm kiếm quan tâm đến định tuyến, `hreflang`, `<html lang>` và việc văn bản có nằm trong HTML được render phía server hay không. Xem [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Tìm hiểu thêm

- [Svelte i18n benchmark: kích thước bundle, độ rò rỉ và thời gian chuyển đổi locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/svelte.md)
- [Svelte i18n: store, rune và cái bẫy module-level](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/svelte.md) và [SvelteKit i18n: định tuyến, SSR và shared state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/list_i18n_technologies/frameworks/sveltekit.md)
- [Compat adapter thay thế trực tiếp cho `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/svelte-i18n.md)
- [Lịch sử JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [i18n theo component vs tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
- [Cách thức tối ưu hóa bundle khi build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)
- [Thiết lập i18n trong ứng dụng Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_vite+svelte.md) và trong [ứng dụng SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_svelte_kit.md)
- Hướng dẫn tương tự cho [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_vue_i18n_library.md) và [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_solid_i18n_library.md)
