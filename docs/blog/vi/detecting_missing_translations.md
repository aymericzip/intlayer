---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cách phát hiện các bản dịch còn thiếu trước khi người dùng nhìn thấy"
description: Các bản dịch còn thiếu thường lỗi trong im lặng. Tại sao fallback lại che giấu chúng, bốn tầng phát hiện thực sự hiệu quả và cách làm fail một bản build khi có key chưa được dịch.
keywords:
  - tìm bản dịch còn thiếu
  - key dịch thuật bị thiếu
  - audit i18n
  - chuỗi chưa được dịch
  - độ bao phủ dịch thuật
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Cách phát hiện các bản dịch còn thiếu trước khi người dùng nhìn thấy

Một bản dịch bị thiếu hầu như không bao giờ ném ra exception làm gián đoạn chương trình. Tùy theo cấu hình, nó hoặc hiển thị chuỗi tiếng Anh cho một người dùng Nhật Bản, hoặc in thẳng `checkout.summary.total` trên trang web đang hoạt động ở môi trường production. Cả hai trường hợp đều được deploy, đều vượt qua code review, và cuối cùng đều bị phát hiện bởi khách hàng thay vì bởi đội ngũ phát triển.

## Mục lục

<TOC/>

## Áp dụng cho bất kỳ thư viện nào bạn đang sử dụng

Không có nội dung nào ở đây bị giới hạn trong một stack công nghệ cụ thể. Các tầng phát hiện bên dưới hoạt động tương tự nhau trên i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate hay Lingui, bởi vì chúng đều phân giải key theo cùng một cơ chế và thất bại theo cùng một cách.

Bộ công cụ cũng rất linh hoạt. Nếu các thông điệp của bạn hiện nằm trong các catalog JSON, [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) sẽ trỏ Intlayer tới các file đó, giúp bạn có được các lệnh audit, fill và test mà không cần di chuyển nội dung hay thay đổi một dòng import nào:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // hoặc "icu" cho next-intl / react-intl
    }),
  ],
};

export default config;
```

Nếu bạn muốn runtime API giữ nguyên không đổi, các [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) sẽ tạo alias cho `useTranslation`, `$t` và các hàm tương đương ở cấp độ bundler. Dù thế nào đi nữa, hãy xem các câu lệnh dưới đây là một phương án triển khai cụ thể của nguyên lý, chứ không phải một điều kiện bắt buộc.

## Tại sao các chỗ thiếu lại vô hình?

Mọi thư viện i18n đều phân giải một key qua cùng một chuỗi: tìm locale đang hoạt động, chuyển sang locale mặc định (fallback), và nếu vẫn thất bại, trả về chính chuỗi key đó. Bước cuối cùng này chính là nguồn cơn của vấn đề. Không có lỗi nào, không có cảnh báo nào trên production và không có bài test nào bị fail, bởi vì không có thành phần nào trong pipeline coi một key bị thiếu là điều bất thường.

Cơ chế fallback khiến tình hình tồi tệ hơn chứ không hề cải thiện. Một trang web âm thầm render bằng tiếng Anh trông hoàn toàn bình thường đối với một lập trình viên nói tiếng Anh và đối với mọi kiểm tra tự động của bạn. Lỗi chỉ hiển thị trước mắt người không đọc hiểu được ngôn ngữ đó.

Vì vậy, câu hỏi không phải là "làm thế nào để xử lý các bản dịch còn thiếu ở runtime". Mà là "làm thế nào để ngăn chặn tuyệt đối việc merge một bản dịch còn thiếu".

## Bốn tầng giúp bạn phát hiện ra chúng

Mỗi tầng sẽ bắt được những lỗi mà các tầng khác bỏ sót. Bạn sẽ muốn kết hợp nhiều tầng.

| Tầng         | Phát hiện được                                | Bỏ sót                                           |
| :----------- | :-------------------------------------------- | :----------------------------------------------- |
| Kiểu dữ liệu | Các key hoàn toàn không tồn tại               | Key có tồn tại nhưng bị bỏ trống trong `ja`      |
| Linter       | Các chuỗi hardcode chưa từng được đem đi dịch | Các key bị thiếu trong một catalog               |
| Audit        | Độ bao phủ ngôn ngữ trên mọi key đã khai báo  | Đoạn text chưa từng được chuyển thành chuỗi dịch |
| Test render  | Các key được phân giải nhưng hiển thị sai     | Mọi thứ không được bài test bao phủ              |

Lỗ hổng phổ biến nhất ở các đội ngũ là dòng thứ ba: họ biết các key của mình hợp lệ về mặt cú pháp, nhưng không có gì kiểm tra xem cả mười tám locale có thực sự mang giá trị hay không.

## Tầng 1: Biến key thành kiểu dữ liệu (Type), không phải chuỗi thuần túy

`t("checkout.summry.total")` là một lỗi chính tả nhưng vẫn compile hoàn toàn bình thường. Nếu key chỉ là chuỗi string đơn giản, mỗi lần đổi tên đều tiềm ẩn rủi ro production và mỗi lần xóa bỏ đều để lại key rác mồ côi.

Key có kiểu dữ liệu (typed keys) sẽ biến lỗi này thành lỗi build. `react-i18next` hỗ trợ qua declaration merging, `next-intl` suy luận từ cấu trúc thông điệp, Lingui tạo ID từ văn bản nguồn, và Intlayer sinh kiểu dữ liệu nghiêm ngặt từ các file khai báo nội dung. Tất cả đều hiệu quả; điều khác biệt là bạn phải cấu hình nhiều hay ít.

Tầng này là cần thiết nhưng chưa đủ. Type chỉ mô tả cấu trúc của catalog mặc định. Chúng không thể chứng minh liệu tiếng Hàn có giá trị cho key đó hay chưa.

## Tầng 2: Lint các chuỗi chưa từng trở thành key

Bản dịch mà bạn không thể tìm thấy thường là bản dịch chưa từng được tách ra ngoài. Một nhãn chữ bị hardcode trong một component sẽ hoàn toàn vô hình trước mọi công cụ audit catalog, bởi vì đối với bộ công cụ, chuỗi đó chưa từng tồn tại.

Plugin ESLint của Intlayer giải quyết điều này bằng `no-raw-text`, đi kèm với `no-unused-content` cho trường hợp ngược lại: nội dung đã khai báo nhưng không còn được đọc bởi bất kỳ đâu.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` là quy tắc giúp catalog không bị phình to vô hạn. Key rác không làm hỏng logic phần mềm, nhưng chúng làm cho hóa đơn của các nhà cung cấp dịch vụ dịch thuật tăng cao ngoài ý muốn. Xem danh sách quy tắc đầy đủ trong [tài liệu plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md).

## Tầng 3: Audit độ bao phủ locale

Đây là tầng giải đáp trực tiếp câu hỏi cốt lõi. Intlayer cung cấp nó dưới dạng lệnh CLI:

```bash packageManager="npm"
npx intlayer content test
```

Lệnh này đọc các locale đã cấu hình và các từ điển đã khai báo, sau đó báo cáo chính xác key nào đang thiếu những locale nào và nằm ở file nào.

Một chi tiết rất đáng lưu ý trước khi gắn nó vào pipeline: **CLI in báo cáo nhưng thoát với mã 0 (thành công).** Nếu bạn đưa nó vào pipeline với kỳ vọng nó sẽ chặn đứng build khi có lỗi, bạn sẽ nhận được một build màu xanh kèm theo một danh sách cảnh báo mà không ai để mắt tới. Để chặn build, hãy dùng API dạng code được mô tả dưới đây.

## Tầng 4: Kiểm tra bằng Assertion trong bộ test suite

`listMissingTranslations()` trả về cho bạn cùng một dữ liệu audit đó dưới dạng cấu trúc dữ liệu, hoàn hảo cho một rào chắn kiểm tra khi build (build gate).

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("không có locale bắt buộc nào bị thiếu", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Có ba trường được trả về với sự phân biệt rõ ràng:

- `missingTranslations`: theo từng key, những locale nào bị thiếu và ở file nào. Đây là dữ liệu bạn in ra khi test fail.
- `missingLocales`: tập hợp tất cả các locale bị thiếu trên mọi key.
- `missingRequiredLocales`: giới hạn trong phạm vi các `requiredLocales` từ file cấu hình của bạn, hoặc toàn bộ locale nếu bạn chưa thiết lập giá trị này.

## `requiredLocales` là tùy chọn giúp gate tồn tại được trong thực tế

Hỗ trợ mười tám ngôn ngữ không có nghĩa là cả mười tám ngôn ngữ đều phải hoàn thiện 100% mới được deploy. Phần lớn các đội ngũ đều phân chia thành một nhóm bắt buộc chặn đợt release và một nhóm được hoàn thiện dần theo tiến độ.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Nếu không có `requiredLocales`, mọi locale được khai báo đều trở thành bắt buộc và build của bạn sẽ liên tục bị lỗi đỏ cho đến khi ngôn ngữ cuối cùng được cập nhật xong. Đó là lý do khiến các đội ngũ cuối cùng phải tắt hoàn toàn bài kiểm tra này, điều này còn tệ hơn là không có bài kiểm tra nào.

## Tìm kiếm các phần thiếu đã tồn tại trên production

Các tầng ở trên ngăn ngừa phát sinh khoảng trống mới. Đối với một ứng dụng đã phát hành, hai phương pháp sau đây rất hữu ích.

**Pseudolocalization (Bản địa hóa giả lập).** Chạy một locale giả lập nơi mọi chuỗi ký tự đều bị biến đổi, ví dụ `[!!! Ĉĥéçķöũţ !!!]`. Bất kỳ nội dung nào vẫn hiển thị bằng tiếng Anh nguyên bản đều chắc chắn là chuỗi bị hardcode. Phương pháp này chỉ mất mười phút để phát hiện những gì mà audit catalog hoàn toàn không thể thấy, vì nó kiểm tra trang web đã được render thực tế.

**Thu thập dữ liệu (crawl) chính trang web của bạn.** Nếu bạn sử dụng các URL theo locale, hãy tải một mẫu các trang theo từng ngôn ngữ và tìm kiếm chuỗi của ngôn ngữ mặc định trong mã nguồn HTML. Một trang trong `/ja/` có chứa cụm từ "Add to cart" chắc chắn là một bản dịch bị thiếu hoặc một fallback ngoài ý muốn.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Lấp đầy các khoảng trống

Khi bạn đã biết phần nào bị thiếu, `intlayer fill` sẽ tự động điền các mục còn trống, và tùy chọn `autoFill` có thể tạo các file theo từng locale ngay khi nội dung được khai báo. Xem [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md).

Cần nhìn nhận thẳng thắn: bản dịch do máy tự điền sẽ biến một khoảng trống **nhìn thấy được** thành một khoảng trống **vô hình**. Key hiện đã có giá trị, audit báo xanh, nhưng chưa có bất kỳ ai đọc lại câu từ đó. Hãy dùng nó để gỡ nút thắt cho đợt release, sau đó bắt buộc phải có người duyệt lại đối với bất kỳ nội dung nào mà khách hàng đọc trước khi đưa ra quyết định. Đó là giàn giáo tạm thời, không phải là kết quả sau cùng.

## Các sai lầm thường gặp

- **Coi fallback là một tính năng an toàn.** Nó chỉ là chiến lược hiển thị dự phòng, không phải lưới an toàn. Một trang âm thầm hiển thị tiếng Anh là một bug không ai hay biết.
- **Dựa vào báo cáo CLI để chặn CI.** `intlayer content test` luôn thoát với mã 0. Hãy dùng assertion trong test suite.
- **Bắt buộc toàn bộ ngôn ngữ.** Kiểm tra sẽ bị gỡ bỏ ngay lần đầu tiên nó làm gián đoạn kế hoạch release khẩn cấp.
- **Audit catalog nhưng không bao giờ nhìn vào giao diện render.** Chuỗi hardcode về mặt định nghĩa không thể xuất hiện trong catalog.
- **Chỉ test ngôn ngữ mặc định.** Đó là ngôn ngữ duy nhất không bao giờ có nguy cơ bị thiếu.
- **Dừng lại ở việc tự động điền bằng máy.** Audit xanh nhưng câu chữ chưa từng được duyệt.

## Tìm hiểu thêm

- [Kiểm thử nội dung: CLI audit, programmatic API và assertion giao diện UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md)
- [Các quy tắc plugin ESLint (bao gồm `no-raw-text` và `no-unused-content`)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)
- [autoFill: sinh các file khai báo theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md)
- [Tài liệu tham khảo cấu hình: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Báo cáo benchmark so sánh các framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Adapter tương thích i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md)
- [Bản chất thực sự của quốc tế hóa bao gồm những gì](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/what_is_internationalization.md)
- [i18n theo component so với i18n tập trung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/per-component_vs_centralized_i18n.md)
