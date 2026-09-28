---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: 웹사이트의 i18n과 SEO 점검"
description: Intlayer CLI scan 명령어를 사용하여 모든 웹사이트의 페이지 크기를 측정하고 i18n/SEO 상태를 감사하는 방법을 알아봅니다.
keywords:
  - Scan
  - SEO
  - i18n
  - 감사
  - CLI
  - Intlayer
  - 페이지 크기
  - 번들
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "라우팅 전략 및 i18n 스택(라이브러리, TMS) 감지 기능 추가; hreflang 상호 참조, og:locale 및 언어 전환기 검사 추가; robots.txt 사이트맵, 사이트맵 인덱스 및 gzip 압축 사이트맵 추적 지원"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` 플래그 추가"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan 명령어 추가"
author: aymericzip
---

# 웹사이트 스캔

`scan` 명령어는 공개 URL을 가져와 총 페이지 크기를 측정하고 페이지의 i18n 및 SEO 상태를 감사(audit)합니다. HTML 속성, 정규(canonical) 링크, hreflang 태그 및 상호 반환 링크, robots.txt, 사이트맵, 로컬라이즈된 내부 링크, 그리고 JavaScript 번들의 로케일 가중치를 다루는 평가 보고서(0-100)를 생성합니다.

또한 사이트가 URL에 로케일을 인코딩하는 방식(라우팅 전략)과 사용하는 프레임워크, i18n 라이브러리, 번역 관리 시스템(TMS) 또는 번역 프록시를 보고합니다. 동일한 검사가 [온라인 i18n SEO 스캐너](https://intlayer.org/i18n-seo-scanner) 및 Intlayer Chrome 확장 프로그램에도 적용되어 있습니다.

추가적인 종속성은 필요하지 않습니다. [puppeteer](https://pptr.dev/)가 설치된 경우, 더 정밀한 번들 분석을 위해 지연 로드(lazy-loaded)되는 JavaScript 청크를 캡처할 수 있으며, 그렇지 않은 경우 HTML에 선언된 즉시 로드되는 스크립트를 검사하는 기본 방식으로 대체됩니다.

## 사용법

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### 예시

```bash packageManager="npm"
npx intlayer scan https://example.com
```

출력 예시:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## 옵션

### `<url>` (필수)

스캔할 정규 URL(예: `https://example.com`).

### `--no-deep`

렌더링 기반의 정밀 스캔을 비활성화합니다.

기본적으로 명령어는 [puppeteer](https://pptr.dev/)를 사용하여 헤드리스 브라우저에서 페이지를 렌더링하고, 지연 로드되는 JavaScript 청크를 캡처하여 실제 전송 크기를 측정하려고 시도합니다. puppeteer가 설치되어 있지 않으면 자동으로 기본 모드로 대체됩니다.

puppeteer가 활성화되어 있어도 기본 모드를 강제하려면 `--no-deep`을 전달하십시오.

> 예시: `npx intlayer scan https://example.com --no-deep`

### `--json`

서식화된 보고서 대신 전체 스캔 결과를 JSON 객체로 출력합니다. 프로그램 방식의 소비 또는 CI 파이프라인에 유용합니다.

> 예시: `npx intlayer scan https://example.com --json`

### 표준 설정 옵션

- **`--base-dir`**: `intlayer.config.*` 파일을 찾는 데 사용되는 기준 디렉토리.
- **`-e, --env`**: 대상 환경 (예: `development`, `production`).
- **`--env-file`**: 사용자 지정 `.env` 파일의 경로.
- **`--no-cache`**: 설정 캐시를 비활성화합니다.
- **`--ci`**: 모노레포의 모든 Intlayer 프로젝트에서 명령어를 실행합니다(프로젝트 디렉터리 안에서 실행하면 해당 프로젝트만). 프로젝트별 자격 증명은 프로젝트 경로를 `{ "clientId", "clientSecret" }`에 매핑하는 JSON 객체인 `INTLAYER_PROJECT_CREDENTIALS`를 통해 주입할 수 있습니다.
- **`--verbose`**: 세부 로깅을 활성화합니다 (CLI 모드에서 기본값).
- **`--prefix`**: 사용자 지정 로그 접두사.

## 라우팅 전략

페이지의 hreflang 대체 링크들이 공유하는 로케일 패턴을 통해 사이트가 로케일을 라우팅하는 방식을 파악합니다. 대체 링크가 없는 경우 스캔된 URL만 사용됩니다(신뢰도 낮음).

| 전략                | 예시                                |
| ------------------- | ----------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`            |
| `prefix-no-default` | `/about` (기본 로케일), `/fr/about` |
| `search-params`     | `/about?lang=fr`                    |
| `subdomain`         | `fr.example.com`                    |
| `domain`            | `example.fr`, `example.de`          |
| `no-prefix`         | 모든 로케일에 단일 URL 사용 (쿠키)  |

링크, canonical, robots.txt 및 사이트맵 검사는 이 전략을 통해 모든 URL을 해석합니다. 예를 들어 접두사가 없는 링크는 `prefix-no-default` 사이트의 기본 로케일에서는 올바르지만, `search-params` 사이트에서는 `?lang=`이 없는 링크가 로케일을 벗어난 것으로 간주됩니다.

## 감지된 스택

프레임워크, i18n 라이브러리(Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), 번역 관리 시스템(Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) 및 번역 프록시(Weglot, Localize, GTranslate…)가 HTML, 로드된 리소스 및 JavaScript 번들을 기반으로 식별됩니다. 심층(deep) 모드에서는 window 전역 변수 및 쿠키도 함께 확인합니다.

## 검사 항목

| 검사 항목                       | 설명                                                                                              | 점수 가중치 |
| ------------------------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `html lang`                     | `<html lang>` 속성이 존재하며 올바른 BCP 47 태그인지 여부                                         | 9           |
| `html dir`                      | 우측에서 좌측으로 쓰는 언어에 대해 `dir="rtl"`이 설정되어 있는지 여부 (`ltr`이 기본값)            | 3           |
| `locale signals consistent`     | `<html lang>`, URL 로케일 및 자체 참조 hreflang 항목이 서로 일치하는지 여부                       | 5           |
| `og:locale`                     | `og:locale`이 설정되어 있으며 `<html lang>`과 일치하는지 여부                                     | 3           |
| `canonical`                     | 정규(canonical) 링크가 존재하며 다른 로케일 버전을 가리키지 않는지 여부                           | 10          |
| `hreflang`                      | 유효한 코드, 절대 URL, 중복 없음, 자체 참조를 포함한 hreflang 태그가 존재하는지 여부              | 9           |
| `x-default hreflang`            | `x-default` hreflang 대체 링크가 존재하는지 여부                                                  | 7           |
| `hreflang alternates link back` | 대체 페이지가 200으로 응답하고 리디렉션되지 않으며 상호 링크를 반환하고 언어를 선언하는지 여부    | 8           |
| `localized links`               | 내부 링크가 페이지 로케일을 가리키는지 여부                                                       | 8           |
| `all links keep the locale`     | 내부 링크가 로케일을 전환하거나 누락하지 않는지 여부                                              | 6           |
| `language switcher`             | 다른 언어 버전으로 연결되는 크롤링 가능한 `<a href>` 링크가 존재하는지 여부                       | 6           |
| `robots.txt present`            | `/robots.txt`가 200 응답을 반환하는지 여부                                                        | 10          |
| `robots.txt localized URLs`     | 사이트 및 로컬라이즈된 URL이 Googlebot에 차단되지 않았는지 여부                                   | 8           |
| `sitemap present`               | 사이트맵이 발견되는지 여부 (robots.txt의 `Sitemap:` 지시어, `/sitemap.xml`, `/sitemap_index.xml`) | 10          |
| `sitemap locale coverage`       | 모든 로케일이 나열되어 있으며 대체 링크가 있는 항목이 자신도 나열하는지 여부                      | 9           |
| `sitemap alternates`            | 사이트맵에 `hreflang` 대체 링크가 포함되어 있는지 여부                                            | 8           |
| `sitemap x-default`             | 사이트맵에 `x-default` hreflang이 포함되어 있는지 여부                                            | 7           |
| `unused bundle content`         | 메인 JS 번들에 다른 로케일의 번역 데이터가 불필요하게 포함되지 않았는지 여부                      | 8           |

경고는 가중치의 절반을 받습니다. 최종 점수는 실행된 검사의 가중치 합계를 백분율(0-100)로 나타낸 것입니다. 실패한 검사는 처음 발견된 문제를 출력합니다. 전체 세부 정보는 `--json`을 사용하세요.

## 프로그램 방식으로 스캔 함수 사용하기

`scan` 함수는 `@intlayer/cli`에서도 내보내지므로 사용자 지정 스크립트에서 직접 호출할 수 있습니다:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

더 낮은 수준의 액세스를 위해 `@intlayer/engine/scan`의 `scanWebsite`는 구조화된 `ScanResult` 객체를 반환합니다:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
