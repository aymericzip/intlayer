---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Xác thực từ điển bằng schema (Zod)"
description: "Khai báo schema Zod trong intlayer.config.ts và gắn chúng vào từ điển để xác thực mọi locale khi build và định kiểu nội dung ngay trong editor."
keywords:
  - Schema
  - Zod
  - Xác thực
  - Từ điển
  - Khai báo nội dung
  - An toàn kiểu
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Xác thực từ điển bằng schema

Schema mô tả cấu trúc mong đợi của nội dung một từ điển. Bạn khai báo nó một lần trong `intlayer.config.ts`, đặt cho nó một tên, rồi gắn tên đó vào bất kỳ từ điển nào thông qua trường `schema`.

Sau đó Intlayer sẽ:

- **Xác thực** từ điển cho mọi locale khi build các từ điển, và báo cáo từng lỗi kèm locale và đường dẫn trường.
- **Định kiểu** nội dung từ điển trong editor của bạn, để một trường bị thiếu hoặc sai kiểu được phát hiện trước khi build.

Schema hữu ích khi nhiều từ điển phải dùng chung một cấu trúc (metadata SEO, thẻ sản phẩm, mục dạng CMS), hoặc khi nội dung phải tuân thủ những ràng buộc mà TypeScript không thể biểu diễn, chẳng hạn độ dài tối đa cho mỗi bản dịch.

<Steps>
<Step number={1} title="Khai báo schema trong cấu hình">

Cài đặt [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Sau đó khai báo các schema dưới key `schemas`. Mỗi key là tên mà bạn sẽ tham chiếu từ các từ điển.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Gắn schema vào từ điển">

Đặt trường `schema` của từ điển thành một trong các tên đã khai báo trong cấu hình.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Một schema có thể được gắn vào bao nhiêu từ điển tùy ý.

</Step>
<Step number={3} title="Build và đọc báo cáo">

Việc xác thực chạy mỗi khi Intlayer build các từ điển: bằng `npx intlayer build`, hoặc thông qua plugin bundler của bạn ở chế độ dev và build. Nếu một bản dịch vi phạm schema, Intlayer ghi log locale, đường dẫn trường và thông báo của Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Một lần chạy riêng lẻ của lệnh `intlayer build` sẽ thất bại nếu tên schema không tồn tại hoặc nội dung không hợp lệ. Ở chế độ theo dõi, Intlayer bỏ qua từ điển không hợp lệ cho đến khi nội dung được sửa.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Metadata Markdown">

Kiểm tra các trường frontmatter như `title`, `description`, `date` và `tags` trước khi hiển thị Markdown. Các trường bắt buộc và kiểu dữ liệu dự kiến được kiểm tra khi xây dựng từ điển. Metadata sai được báo kèm locale và đường dẫn trường.

</Accordion>
<Accordion header="Metadata SEO của trang">

Kiểm tra metadata dùng để hiển thị tiêu đề, mô tả trang, URL chuẩn, ảnh mạng xã hội và chỉ thị lập chỉ mục. Schema có thể yêu cầu tiêu đề dài từ 1 đến 60 ký tự, giới hạn mô tả ở 160 ký tự và xác thực URL. Nội dung locale không hợp lệ sẽ bị loại trước khi gây lỗi hiển thị trang.

</Accordion>
<Accordion header="Nội dung có cấu trúc dùng chung">

Gắn cùng một schema cho các từ điển có cấu trúc nội dung chung, chẳng hạn sản phẩm, mục điều hướng hoặc mẫu email. Trường bị thiếu hoặc giá trị sai kiểu sẽ khiến từ điển không hợp lệ khi build, giúp ngăn nội dung thiếu nhất quán đi vào ứng dụng.

</Accordion>
</AccordionGroup>

## Định kiểu nội dung từ schema

Các tham số generic của `Dictionary` quyết định mức độ nghiêm ngặt khi TypeScript kiểm tra một từ điển:

| Khai báo                                                | Trường `schema`                         | Trường `content`                         |
| ------------------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| `satisfies Dictionary`                                  | Tự động gợi ý, tên không tồn tại là lỗi | Không được TypeScript kiểm tra           |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Phải là `"seo-metadata"`                | Được định kiểu từ schema                 |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Phải là `"seo-metadata"`                | Được định kiểu từ schema và kiểu của bạn |

Với schema đã định kiểu, mỗi trường chấp nhận một giá trị thường hoặc một node nội dung tạo ra giá trị đó, vì vậy `t()` vẫn được phép dùng:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer sinh các kiểu này từ schema Zod của bạn vào `.intlayer/types` mỗi khi build các từ điển. Chỉ cấu trúc được định kiểu: các ràng buộc như `.min()`, `.max()` hay `.regex()` được kiểm tra khi build.

## Những gì được xác thực

Với mỗi locale được liệt kê trong `internationalization.locales`, Intlayer phân giải nội dung từ điển cho locale đó rồi xác thực kết quả. Vì vậy schema mô tả giá trị cuối cùng của một trường (`title: string`), chứ không phải node `t()` chứa các bản dịch.

- **Bản dịch bị thiếu**: với `strictMode` mặc định, bản dịch bị thiếu sẽ dùng locale mặc định thay thế trước khi xác thực. Với `strictMode: "strict"`, bản dịch bị thiếu khiến trường bắt buộc bị lỗi.
- **Các node nội dung khác**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` và `insert()` được phân giải thành hàm, còn `md()` hoặc `html()` thành node. Hãy khai báo các trường này bằng `z.any()`, và giữ ràng buộc trên các trường được phân giải thành giá trị thường.
- **Không được xác thực**: nội dung được cung cấp bởi một hàm hoặc một Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/function_fetching.md)), và các từ điển được lấy từ [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Dùng thư viện xác thực khác

Các mục trong `schemas` không bị ràng buộc với Zod. Bất kỳ object nào có method `safeParse(data)` tương thích với Zod đều dùng được, miễn là nó trả về `{ success: true }` hoặc `{ success: false, error: { issues } }`, trong đó mỗi issue có một mảng `path` và một `message`. Kiểu nội dung chỉ được sinh từ schema Zod: với thư viện khác, nội dung của các từ điển được gắn sẽ có kiểu `any`.

## Câu hỏi thường gặp

<FAQ>

<Question title="Lỗi schema có làm dừng build của tôi không?">

Một lần chạy riêng lẻ của lệnh `intlayer build` sẽ thất bại nếu từ điển không khớp với schema của nó. Ở chế độ theo dõi, Intlayer ghi lại lỗi và bỏ qua từ điển không hợp lệ cho đến khi bạn sửa và lưu nó.

</Question>
<Question title="Nhiều từ điển có thể dùng chung một schema không?">

Có. Schema được tham chiếu theo tên, nên bao nhiêu từ điển cũng có thể trỏ tới nó. Đây là trường hợp sử dụng chính: áp đặt một cấu trúc thống nhất cho mọi metadata trang, mục sản phẩm hay template email.

</Question>
<Question title="Điều gì xảy ra nếu tên schema không tồn tại?">

TypeScript báo lỗi ngay khi có ít nhất một schema được khai báo, vì trường `schema` chỉ chấp nhận các tên đã khai báo. Với tệp JSON, Intlayer báo tên schema không tồn tại trong quá trình build và từ chối từ điển.

</Question>
<Question title="Mọi locale đều được xác thực, hay chỉ locale mặc định?">

Mọi locale được liệt kê trong `internationalization.locales`. Báo cáo nêu rõ locale bị lỗi, nên một bản dịch chỉ quá dài trong tiếng Đức rất dễ phát hiện.

</Question>

</FAQ>

## Liên quan

- [File khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md)
- [Cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
- [Dịch thuật](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md)
