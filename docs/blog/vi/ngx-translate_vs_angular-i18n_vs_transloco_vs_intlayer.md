---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "So sánh ngx-translate, Angular i18n, Transloco và Intlayer (2026)"
description: "Chọn ngx-translate, @angular/localize, Transloco hay Intlayer? So sánh thư viện Angular i18n về đổi ngôn ngữ khi chạy, an toàn kiểu, tải lười, số nhiều và SSR."
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - quốc tế hóa Angular
  - ngx-translate và Transloco
  - Intlayer
  - so sánh thư viện i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# So sánh ngx-translate, Angular i18n, Transloco và Intlayer

Angular là framework lớn duy nhất tích hợp i18n riêng, với cách tiếp cận ngược với các thư viện cộng đồng. `@angular/localize` dịch khi build và tạo một ứng dụng cho mỗi ngôn ngữ. `ngx-translate` và Transloco dịch khi chạy từ tệp JSON. Intlayer biên dịch nội dung khi build nhưng vẫn giữ một ứng dụng duy nhất, đổi ngôn ngữ khi chạy.

Bài viết so sánh bốn lựa chọn theo những yếu tố quyết định trong thực tế: cách đổi locale, nơi lưu nội dung, lỗi compiler phát hiện được và những gì trình duyệt phải tải.

## Mục lục

<TOC/>

## Tóm tắt

- **`@angular/localize`** (Angular i18n): không có chi phí xử lý i18n khi chạy, hỗ trợ ICU sẵn, nhưng phải build và triển khai riêng cho từng locale; đổi ngôn ngữ sẽ tải lại ứng dụng.
- **`ngx-translate`**: lựa chọn runtime lâu đời và đơn giản nhất. Tải một tệp JSON cho mỗi locale qua HTTP, khóa không có kiểu, số nhiều cần plugin.
- **Transloco**: lựa chọn runtime cho ứng dụng lớn. Scope tải bản dịch theo tính năng; plugin hỗ trợ ICU, định dạng theo locale và trích xuất khóa.
- **Intlayer**: khai báo nội dung cạnh component, tạo kiểu khi build, chia theo component và locale, đổi ngôn ngữ khi chạy. Cần esbuild builder tùy chỉnh.

> Để hiểu nguồn gốc các thư viện, đọc [lịch sử i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md).

- [Lịch sử i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/history_of_i18n.md)

## Build hay runtime: lựa chọn phân chia các giải pháp

**`@angular/localize`** chèn bản dịch trực tiếp vào template đã biên dịch. `ng build --localize` xuất `dist/app/en`, `dist/app/fr`…, mỗi thư mục chỉ chứa một ngôn ngữ. Không cần tải hay diễn giải bản dịch khi chạy, nên đây là lựa chọn nhanh nhất sau khi tải xong. Đổi lại là chi phí vận hành: kiểm thử N bản build, triển khai N thư mục, cấu hình server hoặc CDN chuyển `/fr/` đến đúng nơi và tải lại toàn trang khi người dùng đổi ngôn ngữ. `ng serve` cũng chỉ chạy một locale mỗi lần.

**`ngx-translate` và Transloco** dùng một bản build. Khi đổi locale, service tải `fr.json` và các pipe hoặc directive render lại. Việc chuyển đổi tức thì, nhưng lần render đầu phải chờ HTTP, khóa là chuỗi thường và loader phải chạy được trên server khi dùng SSR. Có thể dùng URL tuyệt đối hoặc loader đọc hệ thống tệp, kèm `TransferState` để tránh tải hai lần.

**Intlayer** cũng dùng một bản build nhưng biên dịch nội dung vào bundle thay vì tải JSON thô. `useIntlayer()` trả về Signal, nên đổi locale cập nhật các component đọc Signal mà không cần tải lại.

Một chi tiết Angular dễ bỏ sót: `DatePipe`, `CurrencyPipe` và `DecimalPipe` đọc `LOCALE_ID`, được cố định lúc bootstrap. Đổi ngôn ngữ bằng `ngx-translate` không đổi định dạng ngày và giá. Transloco giải quyết bằng `@jsverse/transloco-locale`; Intlayer dùng `useDate`, `useNumber` và `useCurrency` theo locale hiện tại. `@angular/localize` không gặp vấn đề này vì mỗi bản build có `LOCALE_ID` riêng. Xem phần `Intl` trong [hướng dẫn định dạng ngày, giờ và số](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/date_time_number_formatting_locales.md).

- [Hướng dẫn định dạng ngày, giờ và số](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/date_time_number_formatting_locales.md)

## So sánh tính năng

|                                    | `@angular/localize`                                     | `ngx-translate`                                  | Transloco                                     | Intlayer                                                                        |
| :--------------------------------- | :------------------------------------------------------ | :----------------------------------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------ |
| **Áp dụng bản dịch**               | Chèn trực tiếp khi build                                | Runtime                                          | Runtime                                       | Biên dịch khi build, phân giải khi chạy                                         |
| **Số bản build mỗi lần phát hành** | Một cho mỗi locale                                      | Một                                              | Một                                           | Một                                                                             |
| **Đổi locale**                     | Tải lại sang bản build khác                             | Tức thì                                          | Tức thì                                       | Tức thì                                                                         |
| **Vị trí nội dung**                | Gốc trong template, dịch trong XLIFF/JSON               | JSON theo locale                                 | JSON theo locale và scope                     | `.content.ts`/JSON cạnh component, hoặc tập trung                               |
| **Số nhiều / ICU**                 | ✅ ICU có sẵn trong template                            | ⚠️ Plugin `ngx-translate-messageformat-compiler` | ⚠️ Plugin `@jsverse/transloco-messageformat`  | ✅ `plural()` theo CLDR, ⚠️ hỗ trợ một phần chuỗi ICU                           |
| **Kiểu cho khóa**                  | Không áp dụng, văn bản gốc là thông điệp                | ❌ Không                                         | ❌ Không, Keys Manager tìm khóa thiếu qua CLI | ✅ Tự tạo, sai khóa làm `ng build` thất bại                                     |
| **Thiếu bản dịch**                 | Cảnh báo build hoặc lỗi với `i18nMissingTranslation`    | Hiện khóa thô khi chạy                           | Ngôn ngữ dự phòng khi chạy, kiểm tra CLI      | TypeScript phát hiện, `intlayer test` trong CI                                  |
| **Tải lười**                       | Không cần, mỗi build chỉ có một locale                  | Cả tệp locale, tự chia thủ công                  | ✅ Theo scope (route hoặc component)          | ✅ Theo component và locale                                                     |
| **Signals**                        | Không áp dụng, văn bản tĩnh                             | Pipe và Observable                               | `translateSignal()`                           | `useIntlayer()` trả về Signal                                                   |
| **Thiết lập build**                | `ng add @angular/localize`, locale trong `angular.json` | Không                                            | Không                                         | `@angular-builders/custom-esbuild` và plugin esbuild                            |
| **Quy trình dịch**                 | ✅ XLIFF, định dạng các TMS hỗ trợ                      | JSON                                             | JSON                                          | `.content.ts`/JSON, plugin đồng bộ, trình chỉnh sửa trực quan, CLI điền bằng AI |

Một số dòng cần giải thích thêm.

**ID thông điệp trong `@angular/localize`.** Nếu không đặt ID tùy chỉnh (`i18n="@@cartTitle"`), ID là hash của văn bản gốc. Chỉ cần sửa một lỗi chính tả tiếng Anh là mọi bản dịch của thông điệp mất liên kết, cho đến khi người dịch xử lý lại. Hãy đặt ID tùy chỉnh ngay từ đầu.

**Chia nhỏ với `ngx-translate`.** Loader mặc định tải toàn bộ `fr.json`, nên mỗi trang nhận cả chuỗi của các trang khác. Có thể chia theo tính năng bằng loader tùy chỉnh hoặc nhiều instance `TranslateService`, nhưng không có cơ chế bắt buộc. Xem [i18n theo component và tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md).

- [i18n theo component và tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)

**Scope trong Transloco.** Scope là thư mục JSON (`i18n/cart/en.json`), được tải khi route hoặc component cung cấp nó. Đây là cách gần với nội dung theo component nhất trong các thư viện runtime; hoạt động tốt khi component dùng chung không truy cập scope của tính năng khác.

**Builder của Intlayer.** Angular CLI không cho truy cập plugin esbuild, nên Intlayer cần `@angular-builders/custom-esbuild` trong `angular.json`. Thay đổi nhỏ, nhưng phải giữ builder bên thứ ba tương thích khi nâng cấp Angular. Xem cấu hình đầy đủ trong [hướng dẫn Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md).

- [Hướng dẫn Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md)

## Hoạt động commit

`@angular/localize` nằm trong monorepo `angular/angular`, nên số commit không thể so sánh trực tiếp và được loại khỏi biểu đồ.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Lượt tải npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Lượt tải phản ánh lịch sử hơn lựa chọn hiện tại: các ứng dụng ra đời trước Transloco vẫn cài `ngx-translate`, và trợ lý AI vẫn đề xuất nó vì xuất hiện nhiều trong mã huấn luyện. Transloco chuyển từ `@ngneat/transloco` sang `@jsverse/transloco` năm 2024; scope cũ vẫn được tải.

## Cùng một component với từng thư viện

Ví dụ là phần tóm tắt giỏ hàng có tiêu đề và số nhiều. Template gần như không đổi; khác biệt nằm ở nơi lưu chuỗi và những gì compiler biết về chúng.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Tiếng Anh ở lại trong template. Người dịch làm việc với XLIFF được trích xuất, mỗi locale trở thành một bản build riêng. Chuỗi trong TypeScript dùng thẻ `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Số nhiều ICU chỉ hoạt động với `ngx-translate-messageformat-compiler`; parser mặc định chỉ thay `{{count}}`. `"cart.titel"` vẫn biên dịch nhưng hiện khóa thô khi chạy.

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="Tiếng Anh">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Tiếng Pháp">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Scope `cart` được tải khi component render lần đầu. Số nhiều ICU cần `@jsverse/transloco-messageformat`. Khóa không có kiểu; `transloco-keys-manager` báo khóa thiếu và không dùng.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ vi: "Giỏ hàng của bạn", en: "Your cart", fr: "Votre panier" }),
    items: t({
      vi: plural({ other: "{{count}} sản phẩm" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Mọi locale nằm trong một tệp cạnh component. Kiểu được tạo khi build, nên `content().titel` làm `ng build` thất bại; locale thiếu trong `t()` được báo trong trình soạn thảo.

  </Tab>
</Tabs>

## Lựa chọn nào phù hợp với ứng dụng

<AccordionGroup>
<Accordion header="Trang công khai, ít tương tác, ưu tiên SEO">

`@angular/localize`. Mỗi locale có bản build và URL riêng; trang prerender đã được dịch, không phải tải i18n runtime. Chi phí build theo locale thấp nếu ứng dụng chủ yếu là nội dung và ít đổi ngôn ngữ. Kết hợp thẻ `hreflang` đúng, xem [hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md).

- [Hướng dẫn hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard hoặc SaaS cho phép đổi ngôn ngữ trong ứng dụng">

Chọn runtime. Tải lại sang bản build khác làm mất trạng thái trong bộ nhớ, và menu ngôn ngữ tải lại cả ứng dụng tạo cảm giác không ổn. `ngx-translate` đủ cho ứng dụng nhỏ có hai, ba locale. Khi vượt quá khoảng chục tính năng, Transloco an toàn hơn nhờ scope.

</Accordion>
<Accordion header="Bản dịch đến từ TMS hoặc đơn vị dịch thuật">

`@angular/localize` xuất XLIFF mà các TMS đều đọc được, còn văn bản gốc trong template cung cấp ngữ cảnh cho người dịch. JSON của `ngx-translate` và Transloco cũng được hỗ trợ rộng rãi. Kiểm tra nhà cung cấp xử lý được số nhiều ICU trước khi chọn thư viện runtime, vì cả hai cần plugin.

</Accordion>
<Accordion header="Ứng dụng lớn, nhiều route tải lười, giới hạn bundle">

Scope của Transloco hoặc Intlayer. Cả hai tránh gửi chuỗi của mọi tính năng đến mọi route. Khác biệt là mức bảo đảm: scope Transloco là quy ước, còn từ điển Intlayer chỉ vào bundle tại nơi `useIntlayer()` import nó. Xem [tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md) và [từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md).

- [Tối ưu bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/bundle_optimization.md)
- [Từ điển động](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="An toàn kiểu là yêu cầu bắt buộc">

Chỉ Intlayer có sẵn kiểu cho khóa. Với `ngx-translate` và Transloco, khóa gõ sai vẫn biên dịch và hiện nguyên khóa ở production. Transloco Keys Manager có thể phát hiện trong CI, hữu ích nhưng không giống lỗi biên dịch. Xem [phát hiện bản dịch thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md).

- [Phát hiện bản dịch thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md)

</Accordion>
<Accordion header="Bản dịch sẽ được tạo bằng AI">

Nội dung cạnh component cùng CLI điền locale thiếu là đường ngắn nhất. [Lệnh `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) của Intlayer dùng API key của bạn và chỉ dịch lại phần thay đổi. Với catalog XLIFF hoặc JSON, bạn phải tự viết script cho quy trình tương tự.

- [Lệnh `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md)

</Accordion>
</AccordionGroup>

## Hạn chế của từng lựa chọn

- **`@angular/localize`**: build và triển khai riêng theo locale, tải lại khi đổi ngôn ngữ, ID hash khiến bản dịch mất liên kết khi nguyên bản thay đổi. Muốn tải bản dịch từ CMS sau build phải can thiệp bootstrap.
- **`ngx-translate`**: khóa không có kiểu, số nhiều và ICU qua plugin, tải cả tệp locale trên mỗi trang, pipe không thuần đánh giá lại ở mỗi chu kỳ change detection, không xử lý `LOCALE_ID` cho ngày và số.
- **Transloco**: khóa không có kiểu, ICU qua plugin, scope là quy ước chứ không bảo đảm. Cần ghép nhiều plugin để có tính năng mà `@angular/localize` cung cấp sẵn.
- **Intlayer**: cần builder bên thứ ba trong `angular.json`, cộng đồng Angular nhỏ hơn ba lựa chọn kia, hỗ trợ ICU một phần. Nội dung cố ý phân tán trong codebase, nên xuất một tệp cho người dịch cần [plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) hoặc CLI.

- [Plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)

## Chuyển từ ngx-translate

[Adapter tương thích `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/ngx-translate.md) giữ `TranslateService`, pipe `translate` và directive `[translate]` hoạt động trong khi Intlayer cung cấp nội dung, cho phép chuyển từng template. Xem [hướng dẫn di chuyển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_ngx-translate_to_intlayer.md). Với Transloco hoặc `@angular/localize`, [plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ catalog JSON hiện tại làm nguồn dữ liệu chuẩn trong quá trình chuyển đổi.

- [Adapter tương thích `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/ngx-translate.md)
- [Hướng dẫn di chuyển](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/migration_from_ngx-translate_to_intlayer.md)
- [Plugin đồng bộ JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md)

## Câu hỏi thường gặp

<FAQ>
<Question title="ngx-translate vẫn được duy trì chứ?">

Có. Sau nhiều năm ít hoạt động, dự án có người bảo trì mới năm 2024 và đã phát hành API standalone như `provideTranslateService`. Thiết kế vẫn là JSON runtime, khóa chuỗi, số nhiều qua plugin.

</Question>
<Question title="Ứng dụng Angular mới nên chọn ngx-translate hay Transloco?">

Transloco, trừ khi ứng dụng nhỏ. Nó có các tính năng của `ngx-translate` cộng thêm scope, helper Signal, hướng dẫn SSR và công cụ cho khóa. Hai API khá gần nên đổi sau này chủ yếu là thao tác cơ học, nhưng nếu ứng dụng sẽ lớn lên thì không cần bắt đầu từ lựa chọn đơn giản hơn.

</Question>
<Question title="@angular/localize có thể đổi ngôn ngữ mà không tải lại không?">

Không theo thiết kế gốc. Bản dịch được chèn lúc build nên ngôn ngữ khác cần build khác. Có thể gọi `loadTranslations()` trước bootstrap để tải bản dịch khi chạy, nhưng chuyển đổi vẫn cần khởi động lại ứng dụng.

</Question>
<Question title="Lựa chọn nào tốt nhất cho SEO Angular?">

Routing quan trọng hơn thư viện: một URL cho mỗi locale, thẻ `hreflang`, `<html lang>` và HTML render trên server đã dịch. `@angular/localize` dễ đáp ứng vì mỗi locale là bản build riêng. Thư viện runtime cần SSR và route bản địa hóa để tương đương. Xem [quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md).

- [Quốc tế hóa và SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md)

</Question>
<Question title="Intlayer dùng được với Analog không?">

Có, thông qua Vite. Xem [hướng dẫn Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_analog.md).

- [Hướng dẫn Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_analog.md)

</Question>
</FAQ>

## Đọc thêm

- [Thiết lập Intlayer trong Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_21.md)
- [Thiết lập Intlayer trong Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_angular_19.md)
- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Compiler và i18n khai báo](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md)
- [Định dạng thông điệp ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md)
- [Adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md)

So sánh tương tự cho:

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/how_to_pick_solid_i18n_library.md)
