---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Tài liệu Hook useLocale | astro-intlayer
description: Xem cách sử dụng hook useLocale trong các ứng dụng Astro để truy cập và quản lý ngôn ngữ hiện tại.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Hook useLocale

Hook `useLocale` từ `astro-intlayer` cung cấp quyền truy cập vào ngôn ngữ yêu cầu hiện tại, ngôn ngữ mặc định được định cấu hình và tất cả các ngôn ngữ khả dụng trong các ứng dụng Astro.

Nó hoạt động nhất quán trên frontmatter `.astro` được render trên máy chủ và các khối script `<script>` phía client.

## Cách sử dụng

### Trong Frontmatter Thành phần (Render trên máy chủ)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Hiện tại: {locale}</span>
      <span>Mặc định: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### Trong `<script>` Client (Tương tác)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Giá trị trả về

Hook trả về một đối tượng thuộc kiểu `UseLocaleResult`:

| Thuộc tính         | Kiểu                                   | Mô tả                                                                                     |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Ngôn ngữ đang hoạt động.                                                                  |
| `defaultLocale`    | `DeclaredLocales`                      | Ngôn ngữ dự phòng mặc định được cấu hình trong `intlayer.config.ts`.                      |
| `availableLocales` | `DeclaredLocales[]`                    | Mảng tất cả các ngôn ngữ được hỗ trợ đã cấu hình cho dự án.                               |
| `setLocale`        | `(locale: LocalesValues) => void`      | Hàm cập nhật ngôn ngữ. (Tương tác trong `<script>` client, cảnh báo trong quá trình SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Đăng ký theo dõi các thay đổi ngôn ngữ phía client.                                       |

## Hành vi Máy chủ và Client

- **Trong quá trình SSR / Render Máy chủ**: Một yêu cầu được render một lần với các tham số cố định. Việc gọi `setLocale()` trong quá trình render trên máy chủ không có tác dụng và đưa ra cảnh báo; việc chuyển đổi ngôn ngữ nên được thực hiện ở client hoặc bằng cách điều hướng đến URL ngôn ngữ đích.
- **Trong Script Client**: `setLocale` cập nhật store phía client và cập nhật cookie hoặc local storage đã lưu theo cấu hình Intlayer của bạn.

## Tài liệu liên quan

- [Tích hợp `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useDictionary.md)
