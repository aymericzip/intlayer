---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Tự động hóa dịch thuật trong CI/CD mà không xuất bản nội dung kém chất lượng"
description: Ba giai đoạn tự động hóa i18n, pre-push, pull request và runtime. Cách chặn build dựa trên độ bao phủ, tự động điền an toàn và tránh vòng lặp commit vô tận trong CI.
keywords:
  - tự động hóa dịch thuật ci
  - i18n ci cd
  - github actions dịch thuật
  - husky pre-push
  - bản địa hóa liên tục
  - pipeline dịch thuật
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Tự động hóa dịch thuật trong CI/CD mà không xuất bản nội dung kém chất lượng

Dịch thuật thủ công không thể theo kịp tốc độ phát hành phần mềm hiện đại. Một lập trình viên thêm một chuỗi văn bản vào thứ Sáu, việc trích xuất dời sang sprint tiếp theo, và tới lúc đó ba ngôn ngữ khác đã bị tụt hậu. Tự động hóa bản thân nó rất đơn giản. Tự động hóa mà không âm thầm đưa các bản dịch máy móc chưa qua kiểm duyệt tới khách hàng mới là điều đáng để đầu tư suy nghĩ.

## Mục lục

<TOC/>

## Bạn không cần di chuyển mã nguồn để tự động hóa

Các cấu trúc pipeline dưới đây hoàn toàn độc lập với thư viện, và công cụ cũng vậy. Nếu các thông điệp của bạn là các danh mục JSON cho i18next, next-intl, react-intl, vue-i18n hoặc next-translate, [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) sẽ đọc và ghi trực tiếp vào các file đó tại chỗ:

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

Ứng dụng của bạn vẫn tiếp tục import những gì nó vốn import. Các tác vụ CI sau đó sẽ tự động điền và kiểm tra các danh mục hiện có, và diff mà reviewer nhìn thấy chỉ là thay đổi trên `locales/fr/checkout.json`, không phải là một đợt di chuyển kiến trúc mã nguồn. Ngoài ra còn có [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) cho quy trình gettext và [adapter tương thích](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/index.md) nếu bạn muốn giữ nguyên runtime API.

## Phân tách rào chắn kiểm tra (gate) khỏi quá trình điền dữ liệu (fill)

Hai nhiệm vụ hoàn toàn khác biệt này thường xuyên bị nhầm lẫn.

Một **gate** là một kiểm tra có thể thất bại. Nó tuyên bố bản build này không được phép phát hành vì thiếu các locale bắt buộc. Nó không ghi bất kỳ file nào.

Một **fill** là một thao tác thay đổi dữ liệu. Nó sinh ra các bản dịch còn thiếu và commit chúng. Nó không bao giờ làm fail một bản build.

Chỉ chạy fill đồng nghĩa với việc không bao giờ có gì bị chặn, và văn bản máy dịch chưa qua kiểm duyệt sẽ được đẩy thẳng lên production. Chỉ chạy gate đồng nghĩa với việc build liên tục báo đỏ và con người phải can thiệp thủ công mỗi lần. Hầu hết các đội ngũ đều cần cả hai, gắn với các trigger khác nhau: fill trên pull request, gate khi merge vào release branch.

## Nơi tự động hóa có thể hoạt động

| Giai đoạn      | Trigger   | Phù hợp cho                               | Chi phí                                            |
| :------------- | :-------- | :---------------------------------------- | :------------------------------------------------- |
| Hook pre-push  | Git local | Phản hồi nhanh, không tốn phút CI         | Chạy trên máy lập trình viên và dùng API key riêng |
| Pull request   | Job CI    | Review trước khi merge, tập trung secrets | Tốn phút CI cộng với chi phí gọi model theo mỗi PR |
| Release branch | Job CI    | Rào chắn nghiêm ngặt về độ bao phủ        | Rẻ, không gọi AI model                             |
| Runtime        | CMS       | Sửa nội dung mà không cần build lại       | Phụ thuộc vào dịch vụ lưu trữ                      |

## Pre-push: vòng lặp nhanh nhất

Husky chạy việc điền bản dịch trước khi mã nguồn rời khỏi máy cá nhân, do đó các bản dịch sẽ tới trong cùng một push với các chuỗi mới được tạo ra.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` giới hạn phạm vi xử lý cho các nội dung chưa được push, giúp tránh việc push bị chậm cả phút mỗi lần. `--mode complete` chỉ điền những gì còn thiếu mà không ghi đè lên các mục đã có giá trị, đảm bảo bản dịch đã duyệt không bao giờ bị thay thế âm thầm.

Trong mô hình monorepo, phân chia phạm vi cho từng ứng dụng:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Nhược điểm rất rõ ràng: mỗi lập trình viên đều cần một API key và chi phí đè nặng lên người thực hiện push. Đó là lý do hầu hết các nhóm chuyển bước này sang CI khi quy mô bắt đầu tăng.

## Pull request: điền dữ liệu ngay tại nơi diễn ra review

Cùng một quy trình đó trong GitHub Actions, giới hạn trong phạm vi diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Bốn chi tiết ở đây mang tính quyết định:

- **`fetch-depth: 0`** là bắt buộc để `--git-diff` hoạt động. Bản shallow clone không có base để so sánh diff và việc fill sẽ âm thầm không xử lý gì cả.
- **`[skip ci]` trong commit message** ngăn workflow tự kích hoạt chính nó lặp vô tận. Thiếu nó, commit sẽ kích hoạt lượt chạy mới, lượt chạy đó lại commit tiếp, đốt sạch ngân sách CI qua đêm.
- **`concurrency` kết hợp `cancel-in-progress`** ngăn hai lần push cạnh tranh ghi đè lên cùng các file.
- **`--git-diff`** giới hạn quá trình fill chỉ trong những gì thay đổi ở PR. Bỏ quên cờ này, bạn sẽ dịch lại toàn bộ danh mục ở mọi lượt chạy.

Các bản dịch xuất hiện dưới dạng commit trên nhánh PR, giúp reviewer có thể xem xét chúng trực tiếp trong diff. Đó là toàn bộ lý do nên làm điều này tại PR thay vì đợi sau khi merge.

## Release branch: rào chắn kiểm tra (gate)

Gate không cần gọi model và phải chạy rất nhanh.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Được hỗ trợ bởi một bài test xác nhận độ bao phủ thay vì chỉ trông cậy vào báo cáo văn bản của CLI:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Lệnh `npx intlayer content test` in báo cáo nhưng thoát với mã 0, chỉ có tác dụng thông báo chứ không chặn quy trình. Hãy dùng nó ở máy local; còn trên CI, hãy dùng kiểm thử với assertion. Chi tiết hơn trong [phát hiện bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md).

## `requiredLocales` là yếu tố giúp gate tồn tại trong thực tế

Một rào chắn yêu cầu đủ cả mười tám ngôn ngữ sẽ chặn mọi đợt phát hành cho đến khi ngôn ngữ chậm nhất hoàn tất, và kết quả là nó sẽ bị vô hiệu hóa trong vòng một tháng.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Khai báo tất cả các ngôn ngữ bạn hỗ trợ, nhưng chỉ bắt buộc các ngôn ngữ thực sự cần thiết để chặn đợt phát hành. Phần còn lại được bổ sung bất đồng bộ và không làm gián đoạn kế hoạch deploy.

## Đưa toàn bộ bản dịch ra khỏi kho mã nguồn (repo)

Một mô hình khác là chỉ khai báo một locale gốc trong code và quản lý phần còn lại từ xa thông qua CMS có Live Sync. Việc sửa đổi nội dung lúc này không yêu cầu build lại ứng dụng, tách rời hoàn toàn chu kỳ biên tập nội dung khỏi chu kỳ triển khai kỹ thuật.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Cách này phù hợp với các nhóm nơi người phụ trách nội dung không phải là lập trình viên. Đó là một sự đánh đổi: bạn có được sự tự chủ trong chỉnh sửa nhưng mất đi tính chất git checkout phản ánh chính xác 100% những gì hiển thị trên màn hình. Chi tiết tại [tài liệu CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

Lưu ý rằng `clientSecret` là thông tin xác thực phía server. Nó chỉ được nằm trong CI secrets và biến môi trường server, tuyệt đối không được đưa vào bundle phía client.

## Giới hạn thực tế cần nhìn nhận thẳng thắn

Tất cả những điều trên chỉ tự động hóa **độ bao phủ**, không tự động hóa **chất lượng**. Một lượt điền tự động biến một khoảng trống nhìn thấy được thành một khoảng trống vô hình: audit báo xanh vì key đã có giá trị, nhưng chưa có con người nào đọc qua câu chữ đó.

Điều này có thể chấp nhận được với công cụ nội bộ, changelog hoặc ngôn ngữ beta. Nhưng không thể chấp nhận được với trang bảng giá, điều khoản pháp lý, thông báo lỗi thanh toán hoặc bất cứ điều gì khách hàng đọc trước khi đưa ra quyết định. Hãy chuyển các phần quan trọng đó qua quy trình duyệt của con người và luôn dùng `--mode complete` để văn bản đã duyệt không bao giờ bị ghi đè.

Cung cấp ngữ cảnh cho model để đầu ra ít nhất có sự nhất quán:

```ts
ai: {
  applicationContext: "Ứng dụng xuất hóa đơn B2B. Giọng văn trang trọng. Tuyệt đối không dịch tên sản phẩm.",
}
```

## Các sai lầm thường gặp

- **Quên `[skip ci]` trong commit tự động.** Workflow tự kích hoạt lại trong vòng lặp vô tận.
- **Shallow clone khi dùng `--git-diff`.** Không có base để so sánh, không có gì được điền và không có cảnh báo nào.
- **Điền toàn bộ catalog ở mỗi lần chạy.** Hãy giới hạn với `--git-diff` hoặc `--unpushed` để kiểm soát chi phí.
- **Dùng báo cáo CLI làm rào chắn (gate).** Lệnh thoát với mã 0 nên không chặn được lỗi.
- **Bắt buộc mọi ngôn ngữ.** Rào chắn sẽ bị gỡ bỏ ngay lần đầu tiên nó làm nghẽn đợt phát hành.
- **Có job fill nhưng không có gate ở đâu cả.** Không có gì báo lỗi và văn bản dịch thô từ máy móc lên thẳng production.
- **Để lộ API key của model trong repo.** Phải đưa vào CI secrets tương tự như `clientSecret`.

## Tìm hiểu thêm

- [CI/CD: tự động sinh bản dịch với Husky, GitHub Actions và CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md)
- [Kiểm thử nội dung và chặn bản build dựa trên độ bao phủ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/testing.md)
- [autoFill: sinh file khai báo cho từng locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/autoFill.md)
- [Tài liệu tham khảo cấu hình: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Báo cáo benchmark so sánh giữa các framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/benchmark/index.md)
- [Adapter tương thích i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/compat/i18next.md)
- [Cách phát hiện các bản dịch còn thiếu](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/detecting_missing_translations.md)
- [Cách kiểm thử bản dịch mà không tạo ra các bài test dễ vỡ](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/i18n_testing_strategies.md)
