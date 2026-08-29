---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, hướng dẫn cho SEO đa ngôn ngữ"
description: "Hreflang là gì, các quy tắc mà các search engine thực thi, tại sao x-default hầu như luôn sai, và cách tạo các tags chính xác trong Next.js và TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: hướng dẫn cho SEO đa ngôn ngữ

Bạn đã dịch ứng dụng của mình. Bạn đã triển khai `/en`, `/fr`, `/es`. Và người dùng Pháp vẫn tiếp tục đổ bộ vào trang tiếng Anh.

Dịch là nửa dễ. Nửa khó là báo cho các search engine biết rằng những trang này là **cùng một trang ở ngôn ngữ khác**, không phải ba tài liệu cạnh tranh với nhau. Đó là cái `hreflang` làm, và đó là nơi hầu hết các site đa ngôn ngữ lặng lẽ mất lưu lượng của họ.

---

## hreflang thực sự là gì

Một annotation trên một trang nói: _URL này có các phiên bản tương đương ở đó, cho những ngôn ngữ đó._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Nó mang lại cho bạn hai điều: phiên bản phù hợp được hiển thị cho người dùng phù hợp, và các locale của bạn được hợp nhất thành một cụm thay vì tự hủy diệt lẫn nhau như những bản sao.

Điều quan trọng là phải rõ ràng về những gì nó không phải. Nó **không phải là một chuyển hướng** — nó là một gợi ý, và Google có thể ghi đè nó. Nó **không phải là một tăng thứ hạng** — nó thay đổi _phiên bản nào_ được xếp hạng, không phải _liệu_ bạn có được xếp hạng hay không. Và Bing hoàn toàn bỏ qua nó, thay vào đó dựa vào `content-language` và geo-targeting.

---

## Nơi khai báo nó

Ba vị trí, tất cả đều hợp lệ. Chọn một và ở lại đó — cụm tương tự được khai báo ở hai nơi là cách làm cho các tập hợp trôi nổi.

**HTML `<head>`** là lựa chọn thông thường. Một lưu ý: các thẻ được chèn sau hydration không đáng tin cậy. Nếu framework của bạn chỉ thêm chúng phía client-side, crawler có thể không bao giờ thấy chúng.

**XML sitemap** tốt hơn ở quy mô lớn. Mười locale trên 5 000 trang có nghĩa là 50 000 phần tử `<link>` được gửi đến trình duyệt mà không có lý do gì; trong sitemap nó không tốn bytes cho trang của bạn.

**HTTP `Link` header** là lựa chọn duy nhất cho các tệp không phải HTML như PDF.

---

## Các quy tắc

### Tự tham chiếu và tính thuận nghịch

Tập hợp trên `/fr/about` phải bao gồm `hreflang="fr"` chỉ đến `/fr/about`. Và nếu `/about` chỉ đến `/fr/about`, `/fr/about` phải chỉ lại. Google gọi tham chiếu một chiều là "no return tag" và bỏ qua nó.

Trong thực tế, điều này có nghĩa là **mọi trang trong một cụm đều gửi bộ liên kết giống hệt nhau**. Tạo chúng từ một danh sách locale được chia sẻ không phải là một tiện lợi, đó là cách duy nhất để giữ tính chính xác khi bạn có nhiều hơn hai locale.

### URL tuyệt đối, luôn luôn

```html
<!-- Bỏ qua im lặng -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Chính xác -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Lý do đó là đáng hiểu hơn là ghi nhớ. `hreflang` là một tham chiếu qua tài liệu: các công cụ tìm kiếm xây dựng một cụm được khóa bằng URL, được chia sẻ trên mọi trang trong đó. Một đường dẫn tương đối chỉ có ý nghĩa tương đối với tài liệu chứa nó, vì vậy nó không thể biểu thị điều đó. Nó cũng không thể vượt qua một máy chủ — và một alternate rất thường xuyên làm như vậy, khi một locale nằm trên `example.fr` hoặc `fr.example.com`. Trong một sitemap hoặc HTTP header, không có tài liệu cơ sở để phân giải lại.

Điều này có hệ quả trực tiếp trong code. `getLocalizedUrl("/about", "fr")` trả về `/fr/about` — relative vào, relative ra. Đối với `hreflang` bạn phải cung cấp cho nó một URL tuyệt đối:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ bị loại bỏ
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Ngoại lệ duy nhất là một framework giải quyết các giá trị relative cho bạn trước khi rendering: Next.js mở rộng `alternates` relative so với `metadataBase`. Được — nhưng quy tắc áp dụng cho **HTML được phát hành**, vì vậy hãy kiểm tra bằng `curl`, không phải DevTools inspector.

### Mã ngôn ngữ

ISO 639-1 cho ngôn ngữ, ISO 3166-1 Alpha 2 cho region tùy chọn: `fr`, `fr-CA`, `pt-BR`.

Hai cạm bẫy bắt gần như tất cả mọi người. Một region riêng lẻ là không hợp lệ — `hreflang="ca"` là Catalan, không phải Canada; bạn cần `en-CA` hoặc `fr-CA`. Và `en-UK` không tồn tại: mã quốc gia cho Vương quốc Anh là `GB`, vì vậy nó là `en-GB`.

Chỉ thêm region khi bạn thực sự phục vụ nội dung khác cho region đó — giá khác, thông báo pháp lý khác. `fr` và `fr-FR` trên nội dung giống hệt là tiếng ồn.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Một khái niệm mà thường xuyên bị quên và hiểu sai nhất là `x-default` — ít hơn 30% các ứng dụng thực hiện nó đúng cách.

Đó là fallback cho những người dùng có ngôn ngữ không khớp với bất kỳ mục nào trong tập hợp của bạn. Một người nói tiếng Hà Lan trên một trang cung cấp tiếng Anh, tiếng Pháp và tiếng Tây Ban Nha không khớp với bất kỳ mục nào; nếu không có `x-default`, Google sẽ chọn cho bạn.

Điều mà mọi người hiểu sai là ý nghĩa của nó. `x-default` **không phải là "phiên bản tiếng Anh"** và **không phải là "locale mặc định"**, mặc dù nó thường trỏ đến đó. Nó có nghĩa là _trang dành cho những người dùng mà tập hợp này không bao gồm_. Đó là lý do tại sao việc trỏ nó đến một trang đích chọn ngôn ngữ hoặc đích đến chuyển hướng địa lý là hợp pháp — và thường tốt hơn — thay vì trỏ đến `/en`. Nếu bạn không có trang như vậy, ngôn ngữ chính của bạn là câu trả lời hợp lý.

Hai điều cần phân biệt rõ: `x-default` là một mục bổ sung trong tập hợp, không phải là sự thay thế cho mục tự tham chiếu, và giống như mọi mục khác, nó phải xuất hiện giống hệt nhau trên mọi trang trong cụm.

---

## Bẫy canonical

Mỗi trang được bản địa hóa phải là **canonical của chính nó**:

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Trỏ canonical của mọi locale tại phiên bản tiếng Anh thay vào đó:

```html
<!-- On https://example.com/fr/about — kills the page -->
<link rel="canonical" href="https://example.com/about" />
```

cho biết trang tiếng Pháp là một bản sao không nên được lập chỉ mục, trong khi `hreflang` cho biết đó là trang phục vụ người dùng tiếng Pháp. Các tín hiệu mâu thuẫn, canonical chiến thắng, và các trang tiếng Pháp của bạn rơi ra khỏi chỉ mục.

**Canonical là tự tham chiếu cho từng locale. `hreflang` mô tả cluster.**

---

## Chọn cấu trúc URL

`hreflang` chú thích các URL, vì vậy cấu trúc đến trước.

| Cấu trúc           | Ví dụ             | Cân bằng                                                                   |
| ------------------ | ----------------- | -------------------------------------------------------------------------- |
| **Subdirectories** | `example.com/fr/` | Một domain, cấu trúc quyền chia sẻ — tín hiệu địa lý yếu hơn               |
| **Subdomains**     | `fr.example.com`  | Dễ dàng thêm hoặc xóa một locale — có thể được hiểu là một site riêng biệt |
| **ccTLDs**         | `example.fr`      | Tín hiệu quốc gia mạnh nhất — quyền lực được xây dựng trên mỗi domain      |

Subdirectories là lựa chọn mặc định phù hợp cho hầu hết các dự án. Chỉ nên sử dụng ccTLDs khi bạn thực sự hoạt động như những doanh nghiệp riêng biệt ở các quốc gia khác nhau.

Cấu trúc duy nhất cần tránh: phục vụ các ngôn ngữ khác nhau tại **cùng một URL** dựa trên `Accept-Language` hoặc IP. Crawlers chỉ thấy một phiên bản và index một phiên bản; mọi thứ khác không hiển thị.

> Intlayer bao gồm cả ba thông qua `routing.mode` và `routing.domains`. Xem [tùy chỉnh domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/custom_domains.md) và [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

---

## Triển khai

Viết thủ công những tag này không tồn tại khi tiếp xúc với locale thứ hai. Thay vào đó, hãy lấy chúng từ danh sách locale của bạn.

<Steps>

<Step number={1} title="Phát hành cluster trên mỗi trang">

Cùng một bộ ở mọi nơi, canonical cho mỗi locale, các URL tuyệt đối, `x-default` được bao gồm.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API công bố `alternates.languages`, và `getMultilingualUrls` xây dựng toàn bộ record từ các locale được cấu hình của bạn:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) trả về:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Cấu hình đầy đủ: [Hướng dẫn Next.js 16 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Hàm `head` của route xây dựng các liên kết. `localeMap` lặp qua các locale được cấu hình của bạn, vì vậy việc thêm một locale vào config sẽ thêm nó ở khắp mọi nơi cùng một lúc:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` chạy trên server, vì vậy các tag sẽ được đưa vào HTML ban đầu. Thiết lập đầy đủ: [Hướng dẫn i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Hoặc di chuyển tất cả vào sitemap">

Ở quy mô lớn, hãy loại bỏ hoàn toàn các annotation khỏi các trang của bạn. `generateSitemap` phát ra các alternate `xhtml:link` cho mỗi entry, đọc locales và routing mode từ config của bạn:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Hai tùy chọn đáng chú ý:

- `xhtmlLinks` (mặc định `true`) — các liên kết thay thế chỉ được phát hành nơi URL locale thực sự khác nhau. Ở chế độ `no-prefix` mọi locale dùng chung một URL, vì vậy chúng bị bỏ qua trừ khi `routing.domains` cấp cho các locale tên miền riêng của chúng.
- `entryPerLocale` (default `false`) — theo mặc định một mục `<url>` mang tất cả các alternates. Cả hai hình thức đều hợp lệ, nhưng chỉ một URL được liệt kê dưới dạng `<loc>` mới được tính là _submitted_ trong Search Console; các locale chỉ có alternate vẫn có thể khám phá được nhưng không được ghi vào sitemap. Bật tùy chọn này sẽ cho mỗi URL đã định địa phương một mục riêng với toàn bộ tập hợp alternate được lặp lại. Nó nhân các mục theo số lượng locale, vì vậy hãy chú ý đến giới hạn 50 000 URL / 50 MB và chia thành một sitemap index nếu vượt quá.

</Step>

<Step number={3} title="Xác minh những gì crawler nhận được">

`hreflang` thất bại im lặng, vì vậy hãy kiểm tra nó thay vì giả định.

Đọc nguồn, không phải trình kiểm tra — `curl https://example.com/fr/about | grep hreflang` hiển thị những gì một crawler nhận được; DevTools hiển thị DOM sau khi JavaScript chạy. Sau đó, theo từng alternate và xác nhận nó trỏ lại với bộ giống hệt, và không có cái nào trong số chúng chuyển hướng. International Targeting report của Search Console bắt phần còn lại trên toàn bộ trang web.

Để crawl đặc trưng cho đa ngôn ngữ, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) kiểm tra các thẻ bị thiếu, alternates bị hỏng và xung đột canonical trên các trang được bản địa hóa của bạn.

</Step>

</Steps>

---

## Danh sách kiểm tra

- [ ] Mỗi locale có URL riêng, có thể crawl được
- [ ] Mỗi trang tự tham chiếu, và mỗi tham chiếu là lẫn nhau
- [ ] Bộ giống hệt được gửi trên mỗi trang trong cụm
- [ ] Tất cả các giá trị `href` là tuyệt đối trong HTML được phát hành
- [ ] Các mã là ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, không phải `en-UK`)
- [ ] `x-default` có mặt, và chỉ đến nơi người dùng không khớp nên truy cập
- [ ] Canonical tự tham chiếu theo từng locale
- [ ] Các thẻ được render phía máy chủ, không được chèn sau hydration
- [ ] Được khai báo trong chính xác một nơi
- [ ] Không có redirect giữa các locale

---

## Kết luận

`hreflang` là đơn giản và không tha thứ. Một thẻ trả về bị thiếu, một URL tương đối, một canonical xuyên locale, và cụm từ sẽ bị loại bỏ mà không có lỗi ở bất kỳ đâu. Mỗi một trong những lỗi đó đều xuất phát từ việc viết các thẻ bằng tay.

Lấy tập hợp từ một danh sách locale duy nhất, render nó phía server, giữ canonical tự tham chiếu, và cho `x-default` sự chú ý mà nó xứng đáng. Làm điều đó một lần và tính đúng đắn sẽ không còn là thứ bạn phải duy trì.

### Đi sâu hơn

- [SEO và Quốc tế hóa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/internationalization_and_SEO.md) — bức tranh SEO đa ngôn ngữ rộng hơn
- [SEO và i18n trong Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/vi/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Hướng dẫn i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_nextjs_16.md)
- [Hướng dẫn i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_tanstack.md)
- [Các domain tùy chỉnh cho từng locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/custom_domains.md)
- [Tham chiếu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md)
