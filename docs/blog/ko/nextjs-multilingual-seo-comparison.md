---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: Next.js에서의 SEO와 i18n
description: next-intl, next-i18next, Intlayer를 사용하여 Next.js 앱에서 다국어 SEO를 설정하는 방법을 배우세요.
keywords:
  - Intlayer
  - SEO
  - 국제화
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# Next.js에서의 SEO와 i18n: 번역만으로는 충분하지 않습니다

개발자들이 국제화(i18n)를 생각할 때, 첫 번째 반응은 종종 *콘텐츠를 번역하는 것*입니다. 하지만 사람들은 보통 국제화의 주요 목표가 여러분의 웹사이트를 전 세계에 더 잘 보이게 만드는 것임을 잊곤 합니다.
다국어 Next.js 앱이 검색 엔진에 각기 다른 언어 버전을 어떻게 크롤링하고 이해해야 하는지 알려주지 않으면, 대부분의 노력이 무시될 수 있습니다.

이 블로그에서는 **왜 i18n이 SEO의 강력한 무기인지**와 `next-intl`, `next-i18next`, 그리고 `Intlayer`를 사용해 Next.js에서 이를 올바르게 구현하는 방법을 살펴보겠습니다.

---

## 왜 SEO와 i18n인가

언어를 추가하는 것은 단순히 사용자 경험(UX)에 관한 것이 아닙니다. 이는 **유기적 가시성**을 위한 강력한 수단이기도 합니다. 이유는 다음과 같습니다:

1. **더 나은 발견 가능성:** 검색 엔진은 현지화된 버전을 인덱싱하고, 사용자가 자신의 모국어로 검색할 때 해당 버전을 순위에 올립니다.
2. **중복 콘텐츠 방지:** 적절한 정식(canonical) 및 대체(alternate) 태그가 크롤러에게 어떤 페이지가 어떤 로케일에 속하는지 알려줍니다.
3. **더 나은 UX:** 방문자는 즉시 사이트의 올바른 버전에 도착합니다.
4. **경쟁 우위:** 다국어 SEO를 잘 구현하는 사이트가 적기 때문에 돋보일 수 있습니다.

---

## Next.js에서 다국어 SEO를 위한 모범 사례

모든 다국어 앱이 구현해야 할 체크리스트는 다음과 같습니다:

- **`<head>`에 `hreflang` 메타 태그 설정**  
  구글이 각 언어별 버전이 어떤 것인지 이해하는 데 도움을 줍니다.

- **`sitemap.xml`에 모든 번역된 페이지 나열**  
  `xhtml` 스키마를 사용하여 크롤러가 대체 페이지를 쉽게 찾을 수 있도록 합니다.

- **`robots.txt`에서 비공개/현지화된 경로 제외**  
  예: `/dashboard`, `/fr/dashboard`, `/es/dashboard`가 인덱싱되지 않도록 합니다.

- **현지화된 링크 사용**  
  예: 기본 `/about` 대신 `<a href="/fr/about">À propos</a>` 사용.

이것들은 간단한 단계이지만, 건너뛰면 가시성에 큰 영향을 줄 수 있습니다.

---

## 구현 예제

개발자들은 종종 여러 로케일에 걸쳐 페이지를 올바르게 참조하는 것을 잊어버리므로, 다양한 라이브러리에서 이것이 실제로 어떻게 작동하는지 살펴보겠습니다.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... 페이지 코드의 나머지 부분
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** 기본 로케일이 아닌 경우 경로에 로케일 접두사 추가 */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** 절대 URL 헬퍼 */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 올바른 JSON 파일을 동적으로 가져옵니다
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // 매월 변경 빈도
      priority: 0.7, // 우선순위
      alternates: { languages }, // 대체 언어 경로
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 객체를 생성합니다.
   *
   * 예시:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 반환값
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... 페이지 코드의 나머지 부분
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// 모든 다국어 URL을 가져오는 함수
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// robots 메타데이터 설정
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // 모든 사용자 에이전트 허용
    allow: ["/"], // 루트 경로 허용
    disallow: getAllMultilingualUrls(["/dashboard"]), // 대시보드 경로는 접근 금지
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer는 사이트맵용 다국어 URL을 생성하는 `getMultilingualUrls` 함수를 제공합니다.

  </TabItem>
</Tabs>

---

## 결론

Next.js에서 i18n을 제대로 구현하는 것은 단순히 텍스트를 번역하는 것뿐만 아니라, 검색 엔진과 사용자가 정확히 어떤 버전의 콘텐츠를 제공받아야 하는지 아는 것이 중요합니다.
hreflang, 사이트맵, robots 규칙을 설정하는 것이 번역을 실제 SEO 가치로 전환하는 핵심입니다.

next-intl과 next-i18next는 이를 연결하는 견고한 방법을 제공하지만, 일반적으로 로케일 간 일관성을 유지하기 위해 많은 수동 설정이 필요합니다.

이 점에서 Intlayer가 진가를 발휘합니다:

getMultilingualUrls와 같은 내장 도우미를 제공하여 hreflang, 사이트맵, robots 통합을 거의 수월하게 만듭니다.

메타데이터는 JSON 파일이나 커스텀 유틸리티에 흩어져 있지 않고 중앙 집중화되어 유지됩니다.

Next.js를 위해 처음부터 설계되었기 때문에 설정 문제를 디버깅하는 데 시간을 덜 쓰고 실제 배포에 더 많은 시간을 할애할 수 있습니다.

단순히 번역하는 것을 넘어서 다국어 SEO를 원활하게 확장하는 것이 목표라면, Intlayer가 가장 깔끔하고 미래 지향적인 설정을 제공합니다.
