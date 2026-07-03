---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: 웹사이트 스캔
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
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan 명령어 추가"
author: aymericzip
---

# 웹사이트 스캔

`scan` 명령어는 공개 URL을 가져와 총 페이지 크기를 측정하고 페이지의 i18n 및 SEO 상태를 감사(audit)합니다. HTML 속성, 정규(canonical) 링크, hreflang 태그, robots.txt, sitemap.xml, 로컬라이즈된 내부 링크, 그리고 JavaScript 번들의 로케일 가중치를 다루는 평가 보고서(0-100)를 생성합니다.

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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

- **`--base-dir`** — `intlayer.config.*` 파일을 찾는 데 사용되는 기준 디렉토리.
- **`-e, --env`** — 대상 환경 (예: `development`, `production`).
- **`--env-file`** — 사용자 지정 `.env` 파일의 경로.
- **`--no-cache`** — 설정 캐시를 비활성화합니다.
- **`--verbose`** — 세부 로깅을 활성화합니다 (CLI 모드에서 기본값).
- **`--prefix`** — 사용자 지정 로그 접두사.

## 검사 항목

| 검사 항목                 | 설명                                                                         | 점수 가중치 |
| ------------------------- | ---------------------------------------------------------------------------- | ----------- |
| `html lang`               | `<html lang="…">` 속성 존재 여부                                             | 9           |
| `html dir`                | `<html dir="…">` 속성 존재 여부                                              | 3           |
| `canonical`               | `<link rel="canonical">` 존재 여부                                           | 10          |
| `hreflang`                | `<link rel="alternate" hreflang="…">` 태그 존재 여부                         | 9           |
| `x-default hreflang`      | `x-default` hreflang 대체 링크 존재 여부                                     | 7           |
| `localized links`         | 하나 이상의 내부 링크에 로케일 세그먼트가 포함되어 있는지 여부               | 5           |
| `all links localized`     | 모든 내부 링크에 로케일 세그먼트가 포함되어 있는지 여부                      | 5           |
| `current locale`          | 페이지 로케일 감지 가능 여부                                                 | 3           |
| `robots.txt present`      | `/robots.txt`가 200 응답을 반환하는지 여부                                   | 10          |
| `robots.txt locale paths` | robots.txt에서 로케일 경로가 차단되지 않았는지 여부                          | 10          |
| `sitemap.xml present`     | `/sitemap.xml`이 200 응답을 반환하는지 여부                                  | 10          |
| `sitemap locale coverage` | 감지된 모든 로케일이 사이트맵에 나타나는지 여부                              | 10          |
| `sitemap alternates`      | 사이트맵에 `hreflang` 대체 링크가 포함되어 있는지 여부                       | 5           |
| `sitemap x-default`       | 사이트맵에 `x-default` hreflang이 포함되어 있는지 여부                       | 5           |
| `unused bundle content`   | JS 번들에 불필요하게 사용되지 않는 로케일 데이터가 포함되어 있지 않은지 여부 | 9           |

최종 점수는 모든 통과된 검사의 가중치 합계를 백분율(0-100)로 나타낸 것입니다.

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
