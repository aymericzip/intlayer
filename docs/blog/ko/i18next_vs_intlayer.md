---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: 2026 벤치마크 및 비교"
description: "Next.js 및 TanStack Start 환경에서 react-i18next와 next-i18next를 Intlayer와 비교 측정한 결과. 번들 크기, 콘텐츠 누출, 로케일 전환 반응성 및 개발자 경험 분석."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - 국제화
  - i18n
  - 벤치마크
  - 번들 크기
  - 블로그
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js 국제화 (i18n) 벤チ마크 비교

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next`는 JavaScript 생태계에서 가장 널리 사용되는 i18n 프레임워크입니다. `react-i18next`와 `next-i18next`를 통해 수많은 React 및 Next.js 애플리케이션의 다국어를 지원하고 있습니다. Intlayer는 컴파일러 기반의 컴포넌트 스코프 콘텐츠 아키텍처를 제공하는 대안입니다.

이 글에서는 단순한 기능 나열 대신 실제 측정 지표를 바탕으로 두 솔루션을 비교합니다. 모든 수치는 동일한 애플리케이션을 각 라이브러리로 빌드하고 브라우저가 실제로 다운로드하는 리소스를 기록하는 오픈 소스 벤치마크 제품군 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 추출되었습니다.

<TOC/>

> **요약**: `i18next`는 벤치마크에서 가장 무거운 런타임입니다. 기본 설정의 Next.js에서 **페이지당 +77 KB gzip**, 네임스페이스와 지연 로딩을 완전히 최적화한 후에도 **+22 KB**가 추가됩니다. 반면 Intlayer의 증가량은 **+0.3 KB**에 불과합니다. 완전히 스코프가 분리된 설정을 제외한 모든 `i18next` 구성은 **방문하지 않은 페이지의 문자열을 약 90% 누출**시키지만, Intlayer는 기본적으로 **0%**입니다. 지연 로드 백엔드를 통한 로케일 전환 시간은 `react-i18next`가 **123-185 ms**인 반면 Intlayer는 **3-4 ms**였습니다. `i18next` API를 그대로 유지하는 호환 어댑터 `@intlayer/next-i18next`는 원본의 **218.5 KB**에서 **150.7 KB**로 페이지 크기를 줄였습니다.

## 요약 비교

- **i18next / react-i18next / next-i18next** - 성숙하고 플러그인이 풍부하며 프레임워크에 구애받지 않습니다. 네임스페이스, 언어 감지기, 백엔드, 플러그인을 통한 ICU 지원, 서식 있는 텍스트를 위한 `<Trans>` 컴포넌트를 제공합니다. 콘텐츠는 `locales/{lng}/{ns}.json`에 중앙 집중화되어 관리됩니다. 강력하지만 모든 최적화(네임스페이스 분할, 페이지별 로딩, 타입 안전성)를 개발자가 직접 구성하고 관리해야 합니다.
- **Intlayer** - 컴포넌트 중심의 콘텐츠 모델입니다. `.content.ts` 사전 파일이 지원하는 컴포넌트 바로 옆에 위치하며, 빌드 타임 컴파일러가 컴포넌트 및 로케일별로 트리 쉐이킹과 지연 로딩을 수행합니다. 작성한 콘텐츠로부터 엄격한 TypeScript 타입이 자동 생성되고, 번역 누락 시 빌드가 실패합니다. 미들웨어, SEO 헬퍼, 비주얼 에디터 / CMS 및 AI 기반 번역 기능을 기본 탑재하고 있습니다.

| 라이브러리              | GitHub 스타                                                                                                                                                                        | 총 커밋 수                                                                                                                                                                             | 최근 커밋                                                                                                                                               | 최초 출시   | NPM 버전                                                                                                              | NPM 다운로드 수                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | 2024년 4월  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | 2012년 1월  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | 2015년 12월 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | 2018년 11월 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> 배지는 자동으로 업데이트됩니다. 스냅샷 수치는 시간에 따라 달라질 수 있습니다.

## 주요 기능 비교

| 기능                                     | Intlayer (`react-intlayer` / `next-intlayer`)                                     | i18next (`react-i18next` / `next-i18next`)                    |
| ---------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **컴포넌트 인근 번역 정의**              | ✅ 가능, 컴포넌트와 동일 디렉터리에 `.content.ts` 배치                            | ❌ 불가, `locales/{lng}/{ns}.json` 중앙 집중 관리             |
| **TypeScript 통합**                      | ✅ 콘텐츠 기반 엄격한 타입 자동 생성                                              | ⚠️ 기본 지원; 엄격한 키 사용 시 `CustomTypeOptions` 확장 필요 |
| **누락된 번역 감지**                     | ✅ TypeScript 에러 + 빌드 시 오류/경고 발생                                       | ⚠️ 런타임 폴백 (`saveMissing`, 키 반환)                       |
| **서식 있는 콘텐츠 (JSX / Markdown)**    | ✅ 네이티브 지원                                                                  | ⚠️ 인덱스 태그 기반 `<Trans>` 사용                            |
| **ICU 형식 지원**                        | ⚠️ 개발 중                                                                        | ⚠️ 플러그인 필요 (`i18next-icu`)                              |
| **복수형(Pluralization) 처리**           | ✅ 열거형 기반 패턴                                                               | ✅ `_one` / `_other` 접미사 (Intl.PluralRules)                |
| **서식 지정 (날짜, 숫자, 통화)**         | ✅ `useNumber`, `useDate` 등 (내부적으로 Intl 활용)                               | ⚠️ 보간 포매터 또는 수동 `Intl.*` 호출                        |
| **지역화된 라우팅 및 미들웨어**          | ✅ 내장 프록시/미들웨어, `getMultilingualUrls`                                    | ⚠️ 기본 미포함; 커스텀 미들웨어 또는 외부 라이브러리 필요     |
| **SEO 헬퍼 (hreflang, sitemap, robots)** | ✅ 내장 헬퍼 제공                                                                 | ❌ 수동 구현                                                  |
| **동기식 서버 컴포넌트**                 | ✅ `next-intlayer/server`의 `useIntlayer`를 모든 서버 컴포넌트에서 직접 사용 가능 | ⚠️ 페이지 레벨에서 `getFixedT` 호출 후 Props로 `t` 전달       |
| **트리 쉐이킹 (사용된 콘텐츠만 배포)**   | ✅ 컴포넌트 및 로케일 단위로 컴파일러가 자동 처리                                 | ⚠️ 수동: 네임스페이스 분할 + 페이지별 `ns` 목록 + 백엔드 구성 |
| **지연 로딩 (Lazy Loading)**             | ✅ `importMode: 'dynamic'` (설정 파일 한 줄 추가)                                 | ✅ 백엔드 플러그인 활용 (`i18next-resources-to-backend` 등)   |
| **미사용 콘텐츠 제거 (Purge)**           | ✅ 참조되지 않는 사전은 빌드 시 자동 제거                                         | ❌ 기본 기능 없음                                             |
| **누락 번역 테스트 (CLI / CI)**          | ✅ `npx intlayer content test`                                                    | ⚠️ `i18next-parser` 등 외부 도구 필요                         |
| **AI 기반 번역 지원**                    | ✅ 내장 제공, 사용자 고유 API 키 사용                                             | ❌ 없음 (Locize 등 별도 유료 서비스 필요)                     |
| **비주얼 에디터 / CMS**                  | ✅ 무료 비주얼 에디터 + 선택형 CMS 제공                                           | ❌ 없음 (Locize 등 외부 플랫폼 필요)                          |
| **MCP 서버 & Agent Skills**              | ✅ 지원                                                                           | ❌ 미지원                                                     |
| **생태계 및 커뮤니티**                   | ⚠️ 비교적 최신이나 빠르게 성장 중                                                 | ✅ 가장 크고 성숙함                                           |

## 벤치마크

### 측정 기준 및 환경

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 테스트 스위트는 각 라이브러리를 사용하여 **완전히 동일한 애플리케이션**을 빌드합니다: **10개 페이지**(홈, 소개, 블로그, 채용, 문의, FAQ, 가격, 제품, 설정, 팀), **10개 로케일**(`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠. 측정은 `en`과 `fr` 페이지를 대상으로 진행되었습니다. 각 라이브러리는 최소 설정부터 최적화 설정까지 최대 네 가지 **로딩 전략**으로 구현되었습니다:

| 전략               | 설명                                                                              | 사용 사례                              |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------- |
| **static**         | 모든 로케일과 페이지 번들을 하나로 묶음 (`init()`에 `resources` 직접 인라인 삽입) | 빠른 프로토타입, AI 생성 코드          |
| **dynamic**        | 백엔드를 통해 활성 로케일만 로드하지만, 모든 네임스페이스를 한 번에 가져옴        | 대부분의 일반 프로젝트                 |
| **scoped-static**  | 라우트별로 하나의 네임스페이스를 분할하되, 초기 번들에 사전 포함                  | 드문 구성                              |
| **scoped-dynamic** | 라우트별 네임스페이스 분할 + 백엔드 지연 로딩. 현재 페이지 및 현재 로케일만 로드  | 엄격한 성능 예산이 필요한 애플리케이션 |

Intlayer는 별도의 "scoped" 변형이 없습니다. 컴파일러가 콘텐츠를 **컴포넌트 단위**로 자동 분리하므로 `static`과 `dynamic` 행이 이미 최적화된 상태입니다.

각 빌드에 대해 측정된 메트릭:

- **Lib size**: i18n 라이브러리만 import하는 빈 컴포넌트의 gzip 크기. 런타임의 기본 오버헤드.
- **Page JS**: 페이지당 다운로드되는 JavaScript gzip 크기 (전체 페이지 및 로케일의 평균).
- **Locale leak %**: 다운로드된 JS 내 번역 문자열 중 사용자가 **보고 있지 않은** 언어의 비율.
- **Page leak %**: 다운로드된 JS 내 번역 문자열 중 사용자가 **머물고 있지 않은** 페이지의 비율.
- **Component avg**: 개별적으로 격리 컴파일된 각 컴포넌트의 평균 gzip 크기.
- **E2E reactivity**: 새 언어를 선택한 시점부터 DOM의 `html[lang]`이 업데이트될 때까지의 실제 소요 시간 (Playwright 5회 측정).
- **Hydration**: React 하이드레이션 단계 소요 시간.

> 아래 수치는 `next-i18next` 16.3.0, `react-i18next` 17.0.13, `intlayer` 9.5.1을 사용한 **2026-09-12** 측정 결과입니다. 테스트 애플리케이션은 의도적으로 작게 설계되었으므로(로케일당 수십 개 문자열), 누출 백분율은 **패턴**을 나타냅니다. 콘텐츠가 늘어날수록 누출량은 증가하지만 런타임 비용은 고정됩니다.

### Next.js 결과 (`next-i18next`)

관심 있는 지표와 라이브러리를 선택하세요:

<I18nBenchmark framework="nextjs" vertical/>

| 라이브러리                      | 전략           | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) |  E2E 반응성 | Hydration |
| ------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ----------: | --------: |
| **base** (i18n 없음)            | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |     13.4 ms |   11.8 ms |
| `next-i18next`                  | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |     16.4 ms |   15.6 ms |
| `next-i18next`                  | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |     15.4 ms |   27.7 ms |
| `next-i18next`                  | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |     16.4 ms |   14.7 ms |
| `next-i18next`                  | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |     15.9 ms |   15.1 ms |
| **`next-intlayer`**             | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** | **15.5 ms** |   16.9 ms |
| **`next-intlayer`**             | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** | **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (호환) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |     10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (호환) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |     11.9 ms |   10.6 ms |

**결과 분석**

- **런타임 오버헤드**: `i18next` 코어와 `react-i18next`의 결합은 측정된 런타임 중 가장 무거운 **19.7 KB gzip**을 기록했습니다 (Intlayer는 5.5 KB).
- **기본 구성의 비효율**: `init()`에 `resources`를 직접 넣는 방식은 기본 앱 대비 +77.5 KB 증가한 **218.5 KB/페이지**를 다운로드합니다. 모든 페이지에 모든 네임스페이스가 포함되기 때문입니다.
- **최적화에 필요한 많은 비용**: 백엔드 방식(`dynamic`)을 도입하면 49 KB를 절감하지만 여전히 **타 페이지 문자열이 90% 누출**되며, 이 구성에서는 절반이 다른 로케일의 문자열입니다. 라우트별 네임스페이스 분할(`scoped-dynamic`)을 적용해야 비로소 0% 누출과 **163.4 KB**에 도달하지만, 설정이 전혀 필요 없는 Intlayer(141.3 KB)보다 여전히 **+22.4 KB/페이지** 더 큽니다.
- **컴포넌트 크기**: `useTranslation()`을 호출하는 컴포넌트는 설정에 따라 26~79 KB에 달하지만, `useIntlayer()`를 사용하는 동일 컴포넌트는 6.9 KB에 불과합니다.
- **하이드레이션 지연**: `dynamic` 구성에서 하이드레이션 시간이 27.7 ms로 급증합니다. React가 하이드레이션을 수행하기 전에 클라이언트에서 i18next 인스턴스가 초기화되고 백엔드를 처리해야 하기 때문입니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 전체 라이브러리와 전략이 포함된 상세 표는 [Next.js 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/nextjs)에서 확인하세요.

### TanStack Start 결과 (`react-i18next`)

Next.js 특유의 구조적 차이를 배제하고 TanStack Start 환경에서 순수 `react-i18next`로 측정한 결과입니다.

<I18nBenchmark framework="tanstack" vertical/>

| 라이브러리           | 전략           | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E 반응성 | Hydration |
| -------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ---------: | --------: |
| **base** (i18n 없음) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |     8.1 ms |   21.6 ms |
| `react-i18next`      | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |    12.9 ms |   85.1 ms |
| `react-i18next`      | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |   123.1 ms |   32.9 ms |
| `react-i18next`      | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |   185.1 ms |   25.2 ms |
| `react-i18next`      | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |    17.6 ms |   11.3 ms |
| **`intlayer`**       | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** | **3.2 ms** |   11.5 ms |
| **`intlayer`**       | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** | **3.6 ms** |   14.1 ms |

**결과 분석**

- 기본 `react-i18next` 앱은 기준 앱 대비 **+69 KB/페이지**를 다운로드하며, 하이드레이션에 **85 ms**(기준 앱의 4배)가 소요됩니다. 첫 렌더링 전에 전체 리소스 트리가 클라이언트에서 파싱 및 등록되기 때문입니다.
- **로케일 전환 시 지연 문제**: 리소스를 필요할 때 로드하는 백엔드를 사용할 경우 언어 변경 시 네트워크 왕복이 발생하여 `html[lang]` 갱신까지 지연이 발생합니다: `dynamic`에서 **123 ms**, `scoped-static`에서 **185 ms**. 반면 Intlayer는 두 모드 모두에서 **3-4 ms** 내에 DOM을 업데이트합니다.
- 고도로 최적화된 `scoped-dynamic` 설정도 127.2 KB로 여전히 Intlayer의 `dynamic`보다 **+8.6 KB** 더 무거우며, 이를 위해 라우트-네임스페이스 맵, 백엔드 및 Suspense 설정이 필요했습니다.
- Intlayer의 `static`은 해당 페이지의 컴포넌트가 직접 임포트한 사전만 포함하므로 이미 **페이지 누출 0%**를 달성합니다. `importMode: 'dynamic'`을 활성화하면 로케일 누출도 완전히 제거됩니다.
- **컴포넌트 크기**: `react-i18next` 컴포넌트가 24-27 KB인 반면 Intlayer는 6-8 KB입니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 상세 표는 [TanStack Start 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/tanstack)에서 확인하세요.

## 차이의 원인: 글로벌 인스턴스 vs 컴파일된 사전

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next`는 2012년에 런타임 중심 모델로 설계되었습니다: 글로벌 인스턴스가 리소스 저장소를 관리하고 플러그인이 이를 확장하며, 렌더링 시 `t()`가 키를 조회합니다. 이는 매우 유연하지만(어떤 프레임워크나 포맷도 지원) 구조적인 오버헤드를 유발합니다:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # ["common", "about"] 필요 여부를 직접 알아야 함
```

인스턴스는 컴포넌트가 어떤 키를 요청할지 미리 알 수 없으므로 지시된 모든 네임스페이스를 유지합니다. 따라서 최적화를 위해 **개발자**가 카탈로그를 분할하고, 페이지별 네임스페이스를 정의하고, 컴포넌트 이동 시마다 이를 관리해야 합니다.

낭비되는 리소스는 페이지와 로케일 두 가지 축으로 동시에 증가합니다:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

[벤치마크 노트](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)에서 언급하듯 "타입 안전성을 유지하면서 각 페이지에 필요한 네임스페이스를 완벽히 파악하는 것은 매우 번거로운 일"입니다.

Intlayer는 글로벌 인스턴스를 사용하지 않습니다. 콘텐츠가 컴포넌트 옆에 선언되며 컴파일러가 빌드 타임에 종속성 트리를 분석합니다:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel`은 어떤 컴포넌트가 어떤 사전을 임포트하는지 확인하여 활성 언어에 필요한 것만 번들링하고 사용되지 않는 항목은 제거합니다. "scoped-dynamic" 패턴이 수동 관리 없이 빌드 결과물로 자동 도출됩니다.

> `dynamic` 행의 성능을 적용하려면 `intlayer.config.ts`에서 `dictionary.importMode: 'dynamic'`을 설정하십시오. 자세한 내용은 [번들 최적화 문서](https://intlayer.org/ko/doc/concept/bundle-optimization)를 참고하세요.

## 개발자 경험 (DX)

### 초기 설정 비교

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

여기에 추가로 클라이언트용 `I18nProvider`, `generateStaticParams`, 그리고 각 페이지의 `namespaces` 목록 관리가 필요합니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### 클라이언트 컴포넌트

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> 이 컴포넌트를 렌더링하는 페이지는 `about` 네임스페이스를 로드해야 하며, `CustomTypeOptions`를 확장하지 않으면 `t("counter.label")`에 엄격한 타입이 적용되지 않습니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

`label`과 `increment`는 엄격히 타입이 지정됩니다. 오타는 TypeScript 에러가 되고, 프랑스어 번역 누락은 빌드 에러로 처리됩니다.

</Tab>
</Tabs>

### 동기식 서버 컴포넌트

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

페이지에서 `i18n.getFixedT(locale, "about")`를 호출한 후 하위 컴포넌트로 `t`와 `locale`을 넘겨주어야 합니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## i18next API를 유지하면서 Intlayer의 성능 얻기

기존 컴포넌트를 전부 다시 작성하지 않고도 벤치마크 성능을 누릴 수 있습니다. `@intlayer/i18next`, `@intlayer/react-i18next`, `@intlayer/next-i18next`는 드롭인 호환 어댑터입니다: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, 복수형 접미사, 컨텍스트 접미사 및 `returnObjects`가 그대로 작동하며, 백그라운드에서는 Intlayer 컴파일러가 사전을 공급합니다.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

벤치마크에서 동일한 Next.js 앱의 호환 빌드는 애플리케이션 코드를 수정하지 않고도 페이지당 **218.5 KB에서 150.7 KB**로, 컴포넌트당 **78.5 KB에서 9.7 KB**로, 페이지 누출은 **~90%에서 0%**로, 하이드레이션은 15.6 ms에서 11.3 ms로 단축되었습니다. 기존의 `locales/{lng}/{ns}.json` 파일은 JSON 동기화 플러그인을 통해 신뢰할 수 있는 단일 원천(source of truth)으로 계속 사용할 수 있습니다.

마이그레이션 가이드를 참고하세요: [i18next](https://intlayer.org/ko/doc/migration/i18next), [react-i18next](https://intlayer.org/ko/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ko/doc/migration/next-i18next).

## 어떤 도구를 선택해야 할까요?

<AccordionGroup>
<Accordion header="i18next를 선택해야 하는 경우">

광범위한 플러그인 생태계(감지기, 백엔드, ICU, Locize 등)가 필수적이거나, React 외부 환경(Node 서비스, Vanilla JS, 기타 프레임워크)에서도 동일하게 사용해야 하거나, 팀원들이 이미 익숙하거나, 번역 플랫폼이 `locales/{lng}/{ns}.json`을 요구할 때. 단, 성능이 중요하다면 네임스페이스 분할과 라우트 매핑 관리에 시간을 투자해야 합니다.

</Accordion>
<Accordion header="Intlayer를 선택해야 하는 경우">

**컴포넌트 단위 콘텐츠 관리**, **엄격한 TypeScript 지원**, **빌드 시점 누락 키 감지**, **별도 설정 없는 Tree-shaking 및 지연 로딩**, 즉각적인 로케일 전환, 동기식 서버 컴포넌트, 내장 편집 도구([시각적 편집기](https://intlayer.org/ko/doc/concept/editor), [CMS](https://intlayer.org/ko/doc/concept/cms), [AI 자동 번역](https://intlayer.org/ko/doc/concept/auto-fill), [MCP 서버](https://intlayer.org/ko/doc/mcp-server))를 원할 때 적합합니다. 대규모 모듈식 코드베이스와 디자인 시스템에 특히 유용합니다.

</Accordion>
<Accordion header="@intlayer/*-i18next 어댑터를 선택해야 하는 경우">

이미 i18next를 사용 중이며 컴포넌트를 다시 작성하지 않고 번들 크기 축소와 반응성 향상을 원할 때 적합합니다. 기존 `locales/{lng}/{ns}.json` 파일이 그대로 진실의 원천으로 유지됩니다. [i18next vs @intlayer/i18next](https://intlayer.org/ko/blog/i18next-vs-intlayer-i18next)에서 나란히 측정되었습니다.

</Accordion>
</AccordionGroup>

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="왜 i18next는 다른 최신 라이브러리보다 훨씬 무거운가요?">

프레임워크에 구애받지 않는 범용 런타임으로 설계되었기 때문입니다. 전역 인스턴스, 플러그인 파이프라인, 리소스 저장소, 키 해석기를 포함합니다. 이러한 유연성이 모든 번들에 컴파일됩니다. 라이브러리만 임포트하는 빈 컴포넌트도 `next-i18next`는 **19.7 KB gzip**, `next-intlayer`는 **5.5 KB**를 차지하며, 이 비용은 콘텐츠 크기와 무관하게 모든 페이지에서 발생합니다.

</Question>

<Question title="백엔드를 통한 지연 로딩으로 해결할 수 있나요?">

용량은 줄어들지만 지연 시간(레이턴시)은 해결되지 않습니다. `i18next-resources-to-backend`로 전환하면 페이지당 약 49 KB가 절약되지만, 언어 전환 시 네트워크 왕복이 발생합니다. Intlayer의 **3-4 ms**에 비해 `dynamic` 설정은 **123 ms**, `scoped-static`은 **185 ms**가 걸립니다. 또한 React가 하이드레이션하기 전에 인스턴스가 백엔드를 해석해야 하므로 하이드레이션 시간도 27.7 ms로 급증합니다.

</Question>

<Question title="i18next로 0% 콘텐츠 누출을 달성할 수 있나요?">

네, `scoped-dynamic` 설정을 통해 가능합니다. 라우트당 하나의 네임스페이스, 리소스 백엔드, 직접 유지 관리하는 페이지-네임스페이스 맵이 필요합니다. Next.js에서 페이지당 163.4 KB에 도달하지만, 아무런 설정도 필요 없는 Intlayer(141.3 KB)보다 여전히 **+22 KB** 무겁습니다. [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization)를 참조하세요.

</Question>

<Question title="마이그레이션하려면 컴포넌트를 모두 다시 작성해야 하나요?">

아닙니다. `@intlayer/i18next`, `@intlayer/react-i18next`, `@intlayer/next-i18next`는 `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other` 복수형, 컨텍스트 접미사, `returnObjects`를 그대로 유지합니다. `next.config.ts`나 `vite.config.ts`에 플러그인 한 줄만 추가하면 됩니다. 단계별 안내는 [next-i18next 마이그레이션 가이드](https://intlayer.org/ko/doc/migration/next-i18next)를 확인하세요.

</Question>

<Question title="기존 i18next 플러그인은 어떻게 되나요?">

백엔드 및 언어 감지 플러그인은 허용되지만 비활성 상태로 유지됩니다. 런타임에 로드하거나 감지할 것이 남아있지 않기 때문입니다. 언어 감지는 Intlayer의 라우팅 설정(URL 접두사, 쿠키, 헤더)으로 대체됩니다. 앱이 요청 시 CMS에서 번역을 가져오는 구조라면 [Intlayer CMS](https://intlayer.org/ko/doc/concept/cms)나 `intlayer pull` / `push`를 사용하세요.

</Question>

</FAQ>

## 관련 비교 자료

동일 벤치마크, 다른 라이브러리 비교:

- [next-intl vs Intlayer](https://intlayer.org/ko/blog/next-intl-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/ko/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ko/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ko/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ko/blog/react-i18next-vs-react-intl-vs-intlayer)

i18next에 대해 더 알아보기:

- [i18next vs @intlayer/i18next](https://intlayer.org/ko/blog/i18next-vs-intlayer-i18next), 동일한 앱에서 측정된 어댑터 비교
- [i18next는 구식인가요?](https://intlayer.org/ko/blog/is-i18next-outdated)
- [i18next와 함께 Intlayer 사용하기](https://intlayer.org/ko/blog/intlayer-with-i18next) 및 [react-i18next와 함께 사용](https://intlayer.org/ko/blog/intlayer-with-react-i18next)
- [next-i18next로 Next.js 앱 국제화하기](https://intlayer.org/ko/blog/nextjs-internationalization-using-next-i18next)

참고 문서:

- [Next.js 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/nextjs) 및 [TanStack Start 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/tanstack)
- 호환 어댑터: [i18next](https://intlayer.org/ko/doc/compatibility/i18next), [react-i18next](https://intlayer.org/ko/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/ko/doc/compatibility/next-i18next)
- 마이그레이션 가이드: [i18next](https://intlayer.org/ko/doc/migration/i18next), [react-i18next](https://intlayer.org/ko/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ko/doc/migration/next-i18next)
- [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization) 및 [Intlayer 컴파일러](https://intlayer.org/ko/doc/compiler)
- [컴포넌트별 vs 중앙 집중식 i18n](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)
- [컴파일러 기반 vs 선언적 i18n](https://intlayer.org/ko/blog/compiler-vs-declarative-i18n)

## GitHub 스타

GitHub 스타는 프로젝트의 인기, 커뮤니티의 신뢰도 및 장기적인 지속 가능성을 보여주는 중요한 지표입니다. 기술적 완성도를 직접적으로 나타내는 것은 아니지만, 많은 개발자가 해당 프로젝트의 가치를 인정하고 활발히 채택하고 있음을 반영합니다.

[![스타 기록 차트](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## 결론

`i18next`는 뛰어난 범용성과 강력한 플러그인 생태계로 지난 10년 이상 업계 표준의 위치를 지켜왔습니다. 그러나 벤치마크는 런타임 중심 아키텍처가 야기하는 비용을 명확히 보여줍니다. 일반적인 설정은 **페이지당 +70~77 KB gzip**을 소모하고, **타 페이지 문자열을 ~90% 누출**시키며, 지연 로딩 시 언어 전환에 **100 ms 이상**이 걸립니다. 수동 최적화로 누출을 0%로 줄일 수는 있지만 많은 관리 비용이 수반되며, 그럼에도 Intlayer보다 **9~22 KB** 무겁습니다.

Intlayer는 이러한 모든 작업을 컴파일러로 이전했습니다. 컴포넌트별 사전 분할, 로케일별 지연 로딩, 미사용 콘텐츠 제거가 빌드 과정에서 자동으로 이루어집니다. 동일한 앱에서: **페이지당 +0.3 KB**, **누출 0%**, **3~10배 작은 컴포넌트**, **3~4 ms 로케일 전환**을 경험할 수 있습니다.

모든 원시 데이터, 테스트 앱 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에서 직접 확인하고 검증하실 수 있습니다.

자세한 내용은 ['왜 Intlayer인가요?' 문서](https://intlayer.org/ko/doc/why)를 참조하십시오.
