---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, 다국어 SEO 가이드"
description: "hreflang이 무엇인지, 검색 엔진이 적용하는 규칙, x-default가 거의 항상 잘못된 이유, 그리고 Next.js와 TanStack Start에서 올바른 태그를 생성하는 방법."
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

# Hreflang: 다국어 SEO 가이드

앱을 번역했습니다. `/en`, `/fr`, `/es`를 배포했습니다. 그런데 프랑스 사용자들은 여전히 영문 페이지에 접속합니다.

번역은 쉬운 부분입니다. 어려운 부분은 검색 엔진에 이 페이지들이 **다른 언어로 된 같은 페이지**이지, 서로 경쟁하는 세 개의 문서가 아니라는 것을 알리는 것입니다. 그것이 `hreflang`이 하는 일이며, 대부분의 다국어 사이트가 조용히 트래픽을 잃는 곳입니다.

---

## hreflang이 실제로 무엇인가

페이지에 대한 주석으로, _이 URL은 저 언어들을 위해 다른 곳에 동등한 버전이 있습니다._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

두 가지를 얻을 수 있습니다: 올바른 사용자에게 올바른 버전이 표시되고, 로케일이 중복으로 서로 경쟁하는 대신 하나의 클러스터로 통합됩니다.

이것이 무엇이 아닌지 명확히 하는 것이 중요합니다. 이것은 **리다이렉트가 아닙니다** — 힌트일 뿐이며, Google이 이를 무시할 수 있습니다. 이것은 **순위 부스트가 아닙니다** — 순위 여부가 아니라 _어느_ 버전이 순위를 얻을지 변경합니다. 그리고 Bing은 이를 완전히 무시하며 대신 `content-language`와 지역 타게팅에 의존합니다.

---

## 선언 위치

세 가지 배치, 모두 유효합니다. 하나를 선택하고 거기에 머물러 있으세요 — 같은 클러스터가 두 곳에서 선언되면 세트가 분산되는 방식입니다.

**HTML `<head>`**는 일반적인 선택입니다. 한 가지 주의사항: hydration 후에 주입된 태그는 신뢰할 수 없습니다. 프레임워크가 클라이언트 측에서만 추가하면 크롤러가 이를 볼 수 없을 수 있습니다.

**XML sitemap**은 규모가 클 때 더 좋습니다. 10개의 로케일에 걸쳐 5,000개의 페이지가 있으면 50,000개의 `<link>` 요소가 브라우저에 전송되는데 아무 의미가 없습니다. sitemap에서는 페이지에 0바이트가 소요됩니다.

**HTTP `Link` header**는 PDF와 같은 non-HTML 파일의 유일한 옵션입니다.

---

## 규칙

### Self-reference와 상호성

`/fr/about`의 집합에는 `/fr/about`을 가리키는 `hreflang="fr"`이 포함되어야 합니다. 그리고 `/about`이 `/fr/about`을 가리킨다면, `/fr/about`은 반드시 다시 가리켜야 합니다. Google은 단방향 참조를 "no return tag"라고 부르며 삭제합니다.

실제로는 **클러스터의 모든 페이지가 동일한 링크 집합을 제공**해야 합니다. 공유된 로케일 목록에서 생성하는 것은 편의성이 아니라 두 개 이상의 로케일이 있을 때 올바르게 유지하는 유일한 방법입니다.

### 절대 URL, 항상

```html
<!-- 자동으로 무시됨 -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- 올바름 -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

이 이유를 암기하기보다는 이해하는 것이 좋습니다. `hreflang`은 cross-document 참조입니다: 검색 엔진은 URL을 키로 하는 cluster를 구축하고, 이를 cluster 내의 모든 페이지에서 공유합니다. 상대 경로는 그것이 포함된 문서에 상대적인 의미만 가지므로, 이를 표현할 수 없습니다. 또한 host를 넘을 수 없으며, locale이 `example.fr` 또는 `fr.example.com`에 있을 때 alternate는 종종 host를 넘습니다. sitemap이나 HTTP header에는 resolve할 base document가 전혀 없습니다.

이것은 코드에 직접적인 결과를 가져옵니다. `getLocalizedUrl("/about", "fr")`는 `/fr/about`을 반환합니다 — 상대 경로 입력, 상대 경로 출력. `hreflang`의 경우 절대 URL을 제공해야 합니다:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ 삭제됨
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

한 가지 예외는 렌더링 전에 상대 값을 해결해주는 프레임워크입니다: Next.js는 상대 `alternates`를 `metadataBase`에 대해 확장합니다. 좋습니다 — 하지만 규칙은 **생성된 HTML**에 적용되므로, DevTools inspector가 아닌 `curl`로 확인하세요.

### 언어 코드

언어는 ISO 639-1, 선택적 지역은 ISO 3166-1 Alpha 2: `fr`, `fr-CA`, `pt-BR`.

두 가지 함정이 거의 모든 사람을 잡아냅니다. 지역만으로는 유효하지 않습니다 — `hreflang="ca"`는 카탈로니아어이지, 캐나다가 아닙니다; `en-CA` 또는 `fr-CA`가 필요합니다. 그리고 `en-UK`는 존재하지 않습니다: 영국의 국가 코드는 `GB`이므로 `en-GB`입니다.

지역을 추가하는 것은 실제로 그 지역에 다른 콘텐츠를 제공할 때만 해야 합니다 — 다른 가격, 다른 법적 공지. 동일한 콘텐츠에서 `fr`과 `fr-FR`은 노이즈일 뿐입니다.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

가장 자주 잊혀지고, 잘못 이해되는 개념은 `x-default`입니다 — 앱의 30% 미만만 이를 올바르게 구현합니다.

이는 귀하의 집합에서 어떤 언어와도 일치하지 않는 사용자에 대한 폴백입니다. 영어, 프랑스어, 스페인어만 제공하는 사이트에 있는 네덜란드어 사용자는 어떤 항목과도 일치하지 않습니다. `x-default`가 없으면 Google이 자동으로 선택합니다.

사람들이 잘못 이해하는 것은 그 의미입니다. `x-default`는 **"영어 버전"이 아니며** **"기본 로케일"도 아닙니다**. 비록 대개 그곳을 가리키지만 말입니다. 이는 _이 집합이 다루지 않는 사용자를 위한 페이지_를 의미합니다. 이것이 정당한 이유이며, 종종 더 나은 이유이기도 한데, `/en` 대신 언어 선택기나 지역 리디렉션 랜딩 페이지를 가리키는 것입니다. 그러한 페이지가 없다면 귀하의 주요 언어가 합리적인 답변입니다.

두 가지를 명확히 해야 합니다: `x-default`는 self-referencing 항목을 대체하는 것이 아니라 세트의 추가 항목이며, 다른 모든 항목처럼 클러스터의 모든 페이지에서 동일하게 나타나야 합니다.

---

## canonical 함정

각 로컬라이제이션된 페이지는 **자신의 canonical이어야 합니다**:

```html
<!-- https://example.com/fr/about에서 -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

모든 로캘의 canonical을 영어 버전으로 가리키면:

```html
<!-- https://example.com/fr/about에서 — 페이지가 삭제됨 -->
<link rel="canonical" href="https://example.com/about" />
```

프랑스 페이지가 인덱싱되지 않아야 하는 중복이라고 말하는 반면, `hreflang`은 프랑스 사용자에게 제공할 페이지라고 말합니다. 신호가 모순되고, canonical이 우선되며, 프랑스 페이지가 인덱스에서 제외됩니다.

**Canonical은 로케일별로 자체 참조입니다. `hreflang`은 클러스터를 설명합니다.**

---

## URL 구조 선택

`hreflang`은 URL에 주석을 달므로 구조가 먼저 정해집니다.

| 구조             | 예시              | 장단점                                                  |
| ---------------- | ----------------- | ------------------------------------------------------- |
| **서브디렉토리** | `example.com/fr/` | 단일 도메인, 공유 권한 — 약한 지역 신호                 |
| **서브도메인**   | `fr.example.com`  | 로케일 추가 또는 제거 용이 — 별도 사이트로 보일 수 있음 |
| **ccTLDs**       | `example.fr`      | 가장 강한 국가 신호 — 도메인별로 구축된 권한            |

대부분의 프로젝트에서 서브디렉토리가 올바른 기본값입니다. ccTLD에 도달하는 것은 정말로 별도의 국가 비즈니스로 운영할 때만입니다.

피해야 할 구조 하나: `Accept-Language` 또는 IP에 기반하여 **동일한 URL**에서 다른 언어를 제공하는 것입니다. 크롤러는 한 버전을 보고 한 버전을 인덱싱합니다. 다른 모든 것은 보이지 않습니다.

> Intlayer는 `routing.mode` 및 `routing.domains`를 통해 세 가지 모두를 지원합니다. [사용자 정의 도메인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/custom_domains.md) 및 [구성 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하십시오.

---

## 구현

이러한 태그를 수동으로 작성하면 두 번째 locale과의 접촉에서 유지되지 않습니다. 대신 locale 목록에서 파생시키세요.

<Steps>

<Step number={1} title="모든 페이지에서 cluster 내보내기">

모든 곳에서 동일한 set, locale별 canonical, 절대 URL, `x-default` 포함.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API는 `alternates.languages`를 노출하고, `getMultilingualUrls`는 구성된 locale에서 전체 record를 빌드합니다:

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
   * getMultilingualUrls(`${SITE_URL}/about`)는 다음을 반환합니다:
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

전체 설정: [Next.js 16 i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

라우트의 `head` 함수가 링크를 빌드합니다. `localeMap`은 설정된 로케일을 반복하므로, 설정에 로케일을 추가하면 한 번에 모든 곳에 추가됩니다:

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

`head`는 서버에서 실행되므로 태그가 초기 HTML에 포함됩니다. 전체 설정: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="또는 모든 것을 sitemap으로 이동">

규모가 커지면 페이지에서 주석을 완전히 제거하세요. `generateSitemap`은 config에서 로케일과 라우팅 모드를 읽어 항목마다 `xhtml:link` alternates를 생성합니다:

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

알아두면 좋은 두 가지 옵션:

- `xhtmlLinks` (기본값 `true`) — alternates는 locale URL이 실제로 다른 경우에만 emit됩니다. `no-prefix` 모드에서는 모든 locale이 하나의 URL을 공유하므로, `routing.domains`에서 locale에 자체 호스트명을 제공하지 않는 한 skip됩니다.
- `entryPerLocale` (기본값 `false`) — 기본적으로 하나의 `<url>` 항목이 모든 대체 언어를 포함합니다. 두 형식 모두 유효하지만, `<loc>`으로 나열된 URL만 Search Console에서 _제출됨_으로 계산되며, 대체 언어 전용 locale은 발견 가능하지만 sitemap에 속하지 않습니다. 이 옵션을 켜면 모든 지역화된 URL이 자체 항목을 가지고 전체 대체 언어 세트가 반복됩니다. 이렇게 하면 항목 수가 locale 수만큼 증가하므로 50,000 URL / 50 MB 제한을 주의하고, 초과하면 sitemap 인덱스로 분할하세요.

</Step>

<Step number={3} title="crawler가 수신하는 내용 확인">

`hreflang`은 조용히 실패하므로, 가정하지 말고 확인하세요.

소스를 읽으세요. 검사기가 아닌 — `curl https://example.com/fr/about | grep hreflang`는 크롤러가 받는 것을 보여줍니다. DevTools는 JavaScript가 실행된 후의 DOM을 보여줍니다. 그런 다음 각 대체 항목을 따라가서 동일한 집합으로 다시 가리키는지 확인하고, 그 중 어느 것도 리다이렉트되지 않는지 확인하세요. Search Console의 국제 타겟팅 보고서는 전체 사이트에서 나머지를 포착합니다.

다국어 특화 크롤링의 경우, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner)는 로컬라이즈된 페이지 전체에서 누락된 태그, 끊어진 대체 항목 및 canonical 충돌을 확인합니다.

</Step>

</Steps>

---

## 체크리스트

- [ ] 각 로캘은 고유하고 크롤 가능한 URL을 가집니다
- [ ] 모든 페이지는 자체 참조하며, 모든 참조는 상호적입니다
- [ ] 동일한 집합이 클러스터의 모든 페이지에 제공됩니다
- [ ] 모든 `href` 값이 emitted HTML에서 절대 경로입니다
- [ ] 코드는 ISO 639-1 + ISO 3166-1 Alpha 2입니다 (`en-GB`, `en-UK` 아님)
- [ ] `x-default`가 존재하며, 매칭되지 않은 사용자가 이동해야 할 위치를 가리킵니다
- [ ] Canonical은 locale별로 자체 참조합니다
- [ ] 태그는 서버에서 렌더링되며, hydration 후에 주입되지 않습니다
- [ ] 정확히 한 곳에서 선언됩니다
- [ ] Alternate 리다이렉트가 없습니다

---

## 마무리

`hreflang`은 단순하면서도 엄격합니다. 하나의 누락된 return 태그, 하나의 상대 URL, 하나의 cross-locale canonical이 있으면 클러스터가 아무 오류 없이 버려집니다. 이 모든 문제는 태그를 수동으로 작성하는 데서 비롯됩니다.

단일 로케일 목록에서 세트를 도출하고, 서버 측에서 렌더링하고, canonical을 자기 참조적으로 유지하며, `x-default`에 그에 맞는 관심을 기울이세요. 한 번 그렇게 하면 정확성 유지가 더 이상 문제가 되지 않습니다.

### 더 알아보기

- [SEO 및 국제화](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md) — 더 넓은 다국어 SEO 그림
- [Next.js의 SEO 및 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)
- [TanStack Start i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)
- [로케일별 커스텀 도메인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/custom_domains.md)
- [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
