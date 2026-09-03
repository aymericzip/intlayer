---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cách kiểm thử bản dịch mà không tạo ra các bài test dễ vỡ"
description: Những gì đáng để kiểm thử trong một ứng dụng i18n và những gì không nên. Kiểm thử render dựa trên Provider, giả bản địa hóa (pseudolocalization), độ bao phủ RTL và số nhiều, cùng bẫy snapshot.
keywords:
  - kiểm thử bản dịch
  - i18n testing
  - testing library i18n
  - giả bản địa hóa
  - test provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Cách kiểm thử bản dịch mà không tạo ra các bài test dễ vỡ

Hầu hết các bộ kiểm thử i18n đều thất bại theo một trong hai cách. Hoặc là chúng xác nhận văn bản theo nghĩa đen, khiến mọi thay đổi nhỏ về từ ngữ làm hỏng năm mươi bài test và đội ngũ phát triển quyết định xóa bỏ chúng. Hoặc là chúng chỉ render mọi thứ ở locale mặc định, không chứng minh được điều gì về mười bảy ngôn ngữ còn lại. Cả hai đều dẫn đến cùng một kết quả: một bộ test không ai tin tưởng.

## Mục lục

<TOC/>

## Các mẫu kiểm thử không phụ thuộc vào thư viện

Mọi mẫu bên dưới đều hoạt động trên bất kỳ stack i18n nào. Thay thế provider bằng `I18nextProvider`, `NextIntlClientProvider` hoặc `IntlProvider` thì các bài kiểm thử vẫn giống hệt nhau, bởi vì chúng xác nhận kết quả được render thay vì kiểm tra API riêng của thư viện.

Công cụ kiểm tra độ bao phủ cũng có thể chuyển đổi dễ dàng: với [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) trỏ vào các danh mục hiện có, hoặc một [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) đặt bí danh cho các import hiện tại, xác nhận độ bao phủ sẽ chạy trực tiếp trên file JSON bạn đang có.

## Xác định những gì bạn thực sự đang kiểm thử

Chất lượng dịch thuật không thể kiểm tra bằng mã test. Không có assertion nào có thể cho bạn biết tiếng Đức có tự nhiên hay không, và cố gắng làm điều đó chỉ khiến bộ test ngập tràn các chuỗi hardcode.

Những gì máy móc có thể và đáng để kiểm thử:

| Đáng kiểm thử                              | Không đáng kiểm thử              |
| :----------------------------------------- | :------------------------------- |
| Mỗi locale bắt buộc đều có giá trị         | Câu từ có mượt mà hay không      |
| Đúng locale được truyền vào component      | Văn bản chính xác của từng nhãn  |
| Dạng số nhiều hoạt động cho từng phân loại | Người dịch có làm tốt việc không |
| Locale RTL thiết lập đúng hướng và mirror  | Mọi chuỗi trong tất cả ngôn ngữ  |
| Ngày và số được định dạng theo đúng locale | Tính chính xác nội bộ của `Intl` |

Độ bao phủ nên được kiểm tra trong một bài test hướng dữ liệu duy nhất, không phải trong bài test component. Điều này được thảo luận trong [cách phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md); bài viết này tập trung vào phần còn lại.

## Render dưới Provider và truy vấn theo Role

Mẫu cốt lõi là gắn component bên trong một locale provider và truy vấn theo role hoặc test id thay vì theo chuỗi văn bản.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("render tiêu đề tóm tắt bằng tiếng Pháp", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Truy vấn bằng `getByRole("heading")` vẫn an toàn khi văn bản thay đổi. `getByText("Récapitulatif")` sẽ hỏng ngay khi sửa chữ. Chỉ sử dụng chuỗi văn bản cố định khi chính chuỗi đó là đối tượng cần kiểm tra, điều vốn hiếm khi xảy ra.

Đối với các thuộc tính như `aria-label`, bạn cần chuỗi thô thay vì một node có thể render. Trong React, các mục `useIntlayer` cung cấp trường `.value` cho mục đích này.

## Tham số hóa các bài kiểm thử qua nhiều locale

Một khối kiểm thử duy nhất chạy trên tất cả các locale có giá trị hơn nhiều so với việc viết từng bài test riêng cho mỗi ngôn ngữ.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("render mà không bị fallback về key", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Việc key bị render có nghĩa là quá trình tìm kiếm thất bại.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("thiết lập đúng hướng văn bản", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

Assertion đầu tiên mang lại lợi ích phổ quát: nếu việc tìm kiếm thất bại và thư viện in ra key, DOM sẽ xuất hiện cấu trúc dạng `cart.summary.title`. Điều này bắt được cả một nhóm lỗi mà không cần chỉ định bất kỳ chuỗi cụ thể nào.

## Giả bản địa hóa (Pseudolocalization) phát hiện những gì danh mục bỏ sót

Thêm một locale giả để biến đổi mọi chuỗi, ví dụ biến `Checkout` thành `[!!! Çĥéçķöũţ !!!]`. Sau đó render trang web bằng locale này.

Bất cứ nội dung nào vẫn hiển thị bằng tiếng Anh thông thường đều là nội dung bị hardcode trong mã nguồn. Không một quy trình kiểm tra danh mục nào có thể thấy được điều này, bởi vì đối với công cụ, chuỗi đó chưa từng tồn tại. Các dấu ngoặc vuông đóng vai trò thứ hai: chúng kéo dài văn bản thêm khoảng 30 phần trăm, làm lộ ra các lỗi vỡ giao diện trước khi gặp phải chúng trong tiếng Đức.

Nên chạy bước này như một đợt kiểm thử trực quan hoặc end-to-end thay vì unit test, vì lỗi hiển thị trực tiếp trước mắt.

## Số nhiều cần bài kiểm tra theo từng danh mục, không phải theo ngôn ngữ

Lỗi số nhiều thường bị ẩn đi vì tiếng Anh chỉ có hai dạng và hầu hết lập trình viên chỉ kiểm thử hai dạng đó. Tiếng Ba Lan có bốn dạng, tiếng Ả Rập có sáu dạng.

```ts fileName="plural.test.ts"
// Tiếng Ả Rập kiểm tra zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("số lượng %i", (count) => {
  it("tạo ra một chuỗi không rỗng trong tiếng Ả Rập", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Hãy chọn các con số tương ứng với từng danh mục CLDR cho ngôn ngữ phức tạp nhất của bạn thay vì chỉ thử 1 và 2 ở mọi nơi. `Intl.PluralRules` cho biết một số rơi vào danh mục nào, giúp bạn xây dựng tập mẫu mà không phải đoán mò. Xem thêm về các danh mục trong [bài viết về định dạng thông điệp ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md).

## Cái bẫy của Snapshot test

Snapshot và i18n là một sự kết hợp tồi. Snapshot của một component đa ngôn ngữ sẽ mã hóa toàn bộ văn bản trong đó: khi một dịch giả sửa lỗi chính tả trong tiếng Bồ Đào Nha, một bài test xanh biến thành đỏ trong một file mà người review không thể hiểu rõ. Sau vài lần như vậy, ai đó sẽ chạy `-u` mà không đọc diff, và snapshot hoàn toàn mất đi giá trị.

Nếu bạn muốn dùng snapshot, hãy chỉ chụp trên một locale duy nhất và coi đó là kiểm tra cấu trúc chứ không phải kiểm tra nội dung. Mọi chi tiết phụ thuộc locale nên nằm trong các assertion rõ ràng.

## Kiểm thử quá trình xác định locale, không chỉ là việc render

Lỗi i18n phổ biến nhất trên môi trường production không phải là chuỗi bị thiếu. Đó là việc chọn sai locale: URL ghi `/fr/`, client đọc `navigator.language`, và hai bên xung đột.

Kiểm tra trực tiếp thứ tự giải quyết locale như một hàm thuần túy, tách biệt khỏi component:

```ts fileName="locale-resolution.test.ts"
it("ưu tiên URL hơn tùy chọn đã lưu", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("fallback về header khi URL không có tiền tố", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Đây là bài kiểm tra i18n có giá trị cao nhất mà hầu hết dự án đều thiếu, và nó hoàn toàn không cần tới DOM.

## Chạy cái gì và ở đâu

- **Unit**: Lựa chọn locale, bộ định dạng, các danh mục số nhiều. Nhanh, không cần DOM.
- **Component**: Một lần render dựa trên provider cho mỗi locale, kiểm tra role và việc không có key thô.
- **Độ bao phủ**: Một bài test hướng dữ liệu xác nhận không thiếu locale bắt buộc nào.
- **Visual hoặc E2E**: Chạy thử pseudolocalization và một trang RTL, vì đây là các lỗi giao diện trực quan.

Giữ ba phần đầu trong pipeline CI tại mỗi commit. Phần cuối cùng nên chạy định kỳ ban đêm để tiết kiệm tài nguyên.

## Các sai lầm thường gặp

- **Xác nhận văn bản theo nghĩa đen ở khắp nơi.** Khiến bộ test chắc chắn bị xóa bỏ sau vài tháng.
- **Chụp snapshot các component đã địa phương hóa.** Người dịch làm đứt gãy build và reviewer phê duyệt mà không đọc.
- **Chỉ kiểm thử locale mặc định.** Locale duy nhất không bao giờ bị thiếu.
- **Chỉ kiểm thử 1 và 2 cho dạng số nhiều.** Bỏ sót toàn bộ danh mục mà tiếng Anh không có.
- **Mock toàn bộ thư viện i18n.** Lúc đó bạn chỉ đang kiểm tra xem mock có trả về chuỗi hay không.
- **Không bao giờ kiểm tra logic chọn locale.** Lỗi phổ biến nhất ngoài đời thực và dễ kiểm thử nhất.

## Tìm hiểu thêm

- [Kiểm thử nội dung: kiểm toán CLI, API lập trình và UI assertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md)
- [Plugin ESLint: phát hiện chuỗi hardcode và nội dung không sử dụng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)
- [Bộ định dạng và tiện ích locale, bao gồm `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md)
- [Báo cáo benchmark so sánh giữa các framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Adapter tương thích react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/react-i18next.md)
- [Cách phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md)
- [Định dạng thông điệp ICU: số nhiều, select và skeleton](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/icu_message_format.md)
