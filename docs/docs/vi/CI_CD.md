---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Tích hợp CI/CD
description: Tìm hiểu cách tích hợp Intlayer vào pipeline CI/CD của bạn để quản lý và triển khai nội dung tự động.
keywords:
  - CI/CD
  - Tích hợp liên tục
  - Triển khai liên tục
  - Tự động hóa
  - Quốc tế hóa
  - Tài liệu
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tự động tạo bản dịch trong pipeline CI/CD

Intlayer cho phép tự động tạo các bản dịch cho các file khai báo nội dung của bạn. Có nhiều cách để thực hiện điều này tùy thuộc vào quy trình làm việc của bạn.

## Mục lục

<TOC/>

## Sử dụng CMS

Với Intlayer, bạn có thể áp dụng một quy trình làm việc trong đó chỉ một locale duy nhất được khai báo cục bộ, trong khi tất cả các bản dịch được quản lý từ xa thông qua CMS. Điều này cho phép nội dung và các bản dịch hoàn toàn tách biệt khỏi codebase, mang lại sự linh hoạt hơn cho các biên tập viên nội dung và kích hoạt Live Sync (không cần phải xây dựng lại ứng dụng để áp dụng các thay đổi).

### Cấu hình ví dụ

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Các locale tùy chọn sẽ được quản lý từ xa
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    // Thông tin xác thực CMS nếu bạn sử dụng CMS
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
  ai: {
    applicationContext: "Đây là một ứng dụng thử nghiệm", // Giúp đảm bảo việc tạo bản dịch nhất quán
  },
};

export default config;
```

Để tìm hiểu thêm về CMS, tham khảo [tài liệu chính thức](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md).

## Sử dụng Husky

Bạn có thể tích hợp việc tạo bản dịch vào quy trình làm việc Git cục bộ của mình bằng cách sử dụng [Husky](https://typicode.github.io/husky/).

### Cấu hình ví dụ

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Các ngôn ngữ tùy chọn được xử lý từ xa
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Sử dụng khóa API của bạn

    applicationContext: "Đây là một ứng dụng thử nghiệm", // Giúp đảm bảo việc tạo bản dịch nhất quán
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Để đảm bảo từ điển được cập nhật
npx intlayer fill --unpushed --mode fill    # Chỉ điền nội dung còn thiếu, không cập nhật những nội dung đã có
```

> Để biết thêm thông tin về các lệnh Intlayer CLI và cách sử dụng chúng, hãy tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).

> Nếu bạn có nhiều ứng dụng trong kho mã của mình sử dụng các instance intlayer riêng biệt, bạn có thể sử dụng đối số `--base-dir` như sau:

```bash fileName=".husky/pre-push"
# Ứng dụng 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# Ứng dụng 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Sử dụng GitHub Actions

Intlayer cung cấp một lệnh CLI để tự động điền và xem lại nội dung từ điển. Điều này có thể được tích hợp vào quy trình CI/CD của bạn bằng cách sử dụng GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Tự động điền Intlayer
# Điều kiện kích hoạt cho workflow này
on:
  pull_request:
    branches:
      - "main"

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
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Bước 1: Lấy mã nguồn mới nhất từ kho lưu trữ
      - name: ⬇️ Kiểm tra kho lưu trữ
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Giữ lại thông tin xác thực để tạo PR
          fetch-depth: 0 # Lấy toàn bộ lịch sử git để phân tích sự khác biệt

      # Bước 2: Thiết lập môi trường Node.js
      - name: 🟢 Thiết lập Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Sử dụng Node.js 20 LTS để đảm bảo ổn định

      # Bước 3: Cài đặt các phụ thuộc của dự án
      - name: 📦 Cài đặt phụ thuộc
        run: npm install

      # Bước 4: Cài đặt Intlayer CLI toàn cục để quản lý bản dịch
      - name: 📦 Cài đặt Intlayer
        run: npm install -g intlayer-cli

      # Bước 5: Xây dựng dự án Intlayer để tạo các file bản dịch
      - name: ⚙️ Xây dựng dự án Intlayer
        run: npx intlayer build

      # Bước 6: Sử dụng AI để tự động điền các bản dịch còn thiếu
      - name: 🤖 Tự động điền bản dịch còn thiếu
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Bước 7: Kiểm tra xem có thay đổi nào không và commit chúng
      - name: � Kiểm tra thay đổi
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Bước 8: Commit và đẩy các thay đổi nếu có
      - name: 📤 Commit và đẩy thay đổi
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: tự động điền bản dịch còn thiếu [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Để thiết lập các biến môi trường, hãy vào GitHub → Settings → Secrets and variables → Actions và thêm secret .

> Tương tự như với Husky, trong trường hợp monorepo, bạn có thể sử dụng đối số `--base-dir` để xử lý tuần tự từng ứng dụng.

> Mặc định, đối số `--git-diff` lọc các từ điển bao gồm các thay đổi từ base (mặc định `origin/main`) đến nhánh hiện tại (mặc định: `HEAD`).

> Để biết thêm thông tin về các lệnh Intlayer CLI và cách sử dụng chúng, hãy tham khảo [tài liệu CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/index.md).
