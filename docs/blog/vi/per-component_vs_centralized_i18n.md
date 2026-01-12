---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: i18n theo thành phần so với i18n tập trung: Một cách tiếp cận mới với Intlayer
description: Phân tích sâu các chiến lược quốc tế hóa trong React, so sánh các phương pháp tập trung, theo khóa và theo thành phần, và giới thiệu Intlayer.
keywords:
  - i18n
  - React
  - Quốc tế hóa
  - Intlayer
  - Tối ưu hóa
  - Kích thước bundle
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# i18n theo thành phần so với i18n tập trung

Cách tiếp cận theo thành phần không phải là một khái niệm mới. Ví dụ, trong hệ sinh thái Vue, `vue-i18n` hỗ trợ [i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt cũng cung cấp [bản dịch theo thành phần](https://i18n.nuxtjs.org/docs/guide/per-component-translations), và Angular sử dụng một mẫu tương tự thông qua [Feature Modules](https://v17.angular.io/guide/feature-modules) của nó.

Ngay cả trong một ứng dụng Flutter, chúng ta thường thấy mẫu sau:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Các bản dịch nằm ở đây
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Tuy nhiên, trong thế giới React, chúng ta chủ yếu thấy các cách tiếp cận khác nhau, mà tôi sẽ gom thành ba loại:

<Columns>
  <Column>

**Cách tiếp cận tập trung** (i18next, next-intl, react-intl, lingui)

- (không có namespaces) coi một nguồn duy nhất để truy xuất nội dung. Theo mặc định, bạn tải nội dung từ tất cả các trang khi ứng dụng của bạn tải.

  </Column>
  <Column>

**Tiếp cận chi tiết** (intlayer, inlang)

- phân nhỏ việc truy xuất nội dung theo key, hoặc theo component.

  </Column>
</Columns>

> Trong blog này, tôi sẽ không tập trung vào các giải pháp dựa trên compiler, những cái tôi đã đề cập ở đây: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/compiler_vs_declarative_i18n.md).
> Lưu ý rằng i18n dựa trên compiler (ví dụ: Lingui) chỉ đơn giản tự động hóa việc trích xuất và tải nội dung. Về bản chất, chúng thường chia sẻ những hạn chế tương tự với các phương pháp khác.

> Lưu ý rằng càng phân nhỏ cách bạn truy xuất nội dung, bạn càng có nguy cơ đưa thêm trạng thái và logic vào các component.

Granular approaches are more flexible than centralized ones, but it's often a tradeoff. Even if "tree shaking" is advertised by that libraries, in practice, you'll often end up loading a page in every language.

So, broadly speaking, the decision breaks down like this:

- Nếu ứng dụng của bạn có nhiều trang hơn số ngôn ngữ, bạn nên ưu tiên phương pháp granular.
- Nếu bạn có nhiều ngôn ngữ hơn trang, bạn nên nghiêng về phương pháp tập trung.

Tất nhiên, các tác giả thư viện nhận thức được những giới hạn này và cung cấp các cách khắc phục. Trong số đó: tách thành namespaces, tải động các file JSON (`await import()`), hoặc loại bỏ (purge) nội dung trong quá trình build.

Đồng thời, bạn cần biết rằng khi bạn tải nội dung một cách động, bạn sẽ tạo thêm các yêu cầu tới server. Mỗi `useState` bổ sung hoặc hook đồng nghĩa với một yêu cầu server thêm.

> Để khắc phục vấn đề này, Intlayer đề xuất gom nhiều định nghĩa nội dung dưới cùng một khóa; Intlayer sau đó sẽ hợp nhất những nội dung đó.

Nhưng từ tất cả các giải pháp đó, rõ ràng rằng cách tiếp cận phổ biến nhất là cách tập trung.

### Vậy tại sao phương pháp tập trung lại được ưa chuộng đến vậy?

- Trước hết, i18next là giải pháp đầu tiên được sử dụng rộng rãi, theo triết lý lấy cảm hứng từ các kiến trúc PHP và Java (MVC), vốn dựa trên nguyên tắc tách biệt trách nhiệm nghiêm ngặt (giữ nội dung tách khỏi mã). Nó xuất hiện vào năm 2011, thiết lập các tiêu chuẩn của mình thậm chí trước cả khi có sự dịch chuyển mạnh mẽ sang kiến trúc dựa trên component (Component-Based Architectures) như React.
- Sau đó, một khi một thư viện được chấp nhận rộng rãi, sẽ rất khó để chuyển cả hệ sinh thái sang các mô hình khác.
- Việc sử dụng cách tiếp cận tập trung cũng khiến các công việc trong các hệ thống quản lý bản dịch như Crowdin, Phrase hoặc Localized trở nên dễ dàng hơn.
- Logic đằng sau cách tiếp cận theo từng component phức tạp hơn so với cách tiếp cận tập trung và tốn thêm thời gian để phát triển, đặc biệt khi phải giải quyết các vấn đề như xác định nội dung nằm ở đâu.

### Được, nhưng tại sao không chỉ gắn bó với cách tiếp cận tập trung?

Hãy để tôi nói lý do điều đó có thể gây vấn đề cho ứng dụng của bạn:

- **Dữ liệu không sử dụng:**
  Khi một trang được tải, bạn thường tải luôn nội dung từ tất cả các trang khác. (Trong một ứng dụng 10 trang, đó là 90% nội dung bị tải nhưng không dùng). Bạn lazy-load một modal? Thư viện i18n cũng mặc kệ — nó vẫn tải các chuỗi lên trước.
- **Hiệu năng:**
  Mỗi lần re-render, từng component của bạn đều được hydrated với một payload JSON lớn, điều này ảnh hưởng đến tính phản ứng (reactivity) của app khi nó phát triển.
- **Bảo trì:**
  Quản lý các file JSON lớn rất đau đầu. Bạn phải nhảy giữa các file để chèn bản dịch, đảm bảo không thiếu bản dịch nào và không để lại các **khóa mồ côi (orphan keys)**.
- **Hệ thống thiết kế:**
  Điều đó tạo ra sự không tương thích với design systems (ví dụ: một component `LoginForm`) và hạn chế việc sao chép component giữa các ứng dụng khác nhau.

**"Nhưng chúng ta đã phát minh ra Namespaces!"**

Chắc chắn, và đó là một bước tiến lớn. Hãy xem so sánh kích thước main bundle của một cấu hình Vite + React + React Router v7 + Intlayer. Chúng tôi đã mô phỏng một ứng dụng 20 trang.

Ví dụ đầu tiên không bao gồm việc lazy-load các bản dịch theo locale và không tách namespace. Ví dụ thứ hai bao gồm content purging + tải động các bản dịch.

| Bundle tối ưu hóa                                                                                                         | Bundle không tối ưu hóa                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![gói chưa được tối ưu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![gói được tối ưu](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Nhờ có namespaces, chúng ta đã chuyển từ cấu trúc này:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

sang cấu trúc này:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Bây giờ bạn phải quản lý một cách chi tiết phần nội dung nào của ứng dụng nên được tải và ở đâu. Kết luận là đại đa số các dự án chỉ bỏ qua phần này vì tính phức tạp (xem hướng dẫn [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_using_next-i18next.md) để thấy các thách thức mà việc (chỉ) tuân theo các best practices mang lại).
Do đó, các dự án đó cuối cùng gặp phải vấn đề tải JSON khổng lồ đã được giải thích ở phần trước.

> Lưu ý rằng vấn đề này không đặc thù cho i18next, mà áp dụng cho tất cả các phương pháp tập trung được liệt kê ở trên.

Tuy nhiên, tôi muốn nhắc bạn rằng không phải mọi cách tiếp cận theo hướng phân mảnh đều giải quyết được vấn đề này. Ví dụ, các cách tiếp cận như `vue-i18n SFC` hay `inlang` không tự động lazy load bản dịch theo từng locale, nên bạn chỉ đang đánh đổi vấn đề kích thước bundle này sang một vấn đề khác.

Hơn nữa, nếu không tách biệt rõ ràng các mối quan tâm (separation of concerns), việc trích xuất và cung cấp bản dịch cho người dịch để họ xem xét sẽ trở nên khó khăn hơn nhiều.

### Cách tiếp cận per-component của Intlayer giải quyết vấn đề này

Intlayer thực hiện theo một số bước:

1. **Khai báo:** Khai báo nội dung ở bất kỳ đâu trong codebase của bạn bằng các file `*.content.{ts|jsx|cjs|json|json5|...}`. Điều này đảm bảo tách biệt các mối quan tâm trong khi vẫn giữ nội dung được colocated. Một file nội dung có thể là theo từng locale hoặc đa ngôn ngữ.
2. **Xử lý:** Intlayer thực hiện một bước build để xử lý logic JS, xử lý các fallback cho bản dịch bị thiếu, sinh các kiểu TypeScript, quản lý nội dung trùng lặp, lấy nội dung từ CMS của bạn, và nhiều thứ khác.
3. **Thanh lọc:** Khi ứng dụng của bạn được build, Intlayer sẽ loại bỏ nội dung không dùng (tương tự cách Tailwind quản lý các class) bằng cách thay thế nội dung như sau:

**Khai báo:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Xử lý:** Intlayer xây dựng dictionary dựa trên file `.content` và sinh ra:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Thay thế:** Intlayer biến đổi component của bạn trong quá trình build ứng dụng.

**- Chế độ Import Tĩnh:**

```tsx
// Biểu diễn component theo cú pháp tương tự JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Chế độ Import Động:**

```tsx
// Biểu diễn component theo cú pháp tương tự JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Tương tự cho các ngôn ngữ khác
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` sử dụng cơ chế giống Suspense để chỉ tải JSON đã được địa phương hóa khi cần.

**Lợi ích chính của cách tiếp cận theo thành phần này:**

- Giữ khai báo nội dung gần với các components của bạn giúp việc bảo trì tốt hơn (ví dụ: di chuyển một component sang một app hoặc design system khác. Xóa thư mục component sẽ xóa luôn nội dung liên quan, giống như bạn có lẽ vẫn làm với các file `.test`, `.stories`)

- Cách tiếp cận theo từng component ngăn các agent AI phải lục qua tất cả các file khác nhau của bạn. Nó xử lý tất cả các bản dịch tại một chỗ, giảm độ phức tạp của nhiệm vụ và lượng token sử dụng.

### Hạn chế

Tất nhiên, cách tiếp cận này đi kèm với những đánh đổi:

- Khó kết nối với các hệ thống l10n khác và các tooling bổ sung.
- Bạn có nguy cơ bị lock-in (điều này cơ bản đã xảy ra với bất kỳ giải pháp i18n nào do cú pháp đặc thù của chúng).

Đó là lý do Intlayer cố gắng cung cấp một bộ công cụ hoàn chỉnh cho i18n (100% miễn phí và OSS), bao gồm dịch AI sử dụng AI Provider và API keys của riêng bạn. Intlayer cũng cung cấp công cụ để đồng bộ hóa JSON của bạn, hoạt động giống như các message formatter của ICU / vue-i18n / i18next để ánh xạ nội dung sang định dạng tương ứng.
