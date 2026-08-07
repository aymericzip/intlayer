---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Intlayer Analytics | 콘텐츠 노출 추적 및 A/B 테스트 실행
description: "@intlayer/analytics가 페이지/로케일 뷰와 콘텐츠 노출을 추적하는 방법, 그리고 이를 활용해 Intlayer 콘텐츠에서 A/B 테스트를 실행하는 방법을 알아보세요."
keywords:
  - Analytics (분석)
  - A/B 테스트
  - Audience (오디언스)
  - Internationalization (국제화)
  - Documentation (문서)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics 패키지, 프로바이더/노드 레벨 추적, A/B 테스트, 대시보드"
author: aymericzip
---

# Intlayer Analytics 문서

`@intlayer/analytics`는 방문자에게 **어떤 콘텐츠가 실제로 노출되었는지**(어떤 페이지, 어떤 로케일에서, 번역된 콘텐츠 중 어떤 특정 항목이 노출되었는지)를 알려주는 선택적 보조 패키지입니다. 이를 통해 오디언스를 이해하고 **콘텐츠를 대상으로 A/B 테스트를 실행**할 수 있습니다.

## 목차

<TOC/>

---

## 추적 대상

`@intlayer/analytics`는 다음 세 가지 종류의 익명 이벤트를 일괄 처리(batch)하여 수집합니다:

| 이벤트 (Event)     | 캡처되는 위치                               | 알 수 있는 정보                                                                                                        |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | 프로바이더 레벨 (`IntlayerProvider`)        | 초기 로드, 경로 변경, 또는 로케일 전환 시 세션이 어떤 페이지와 로케일을 조회했는지 확인.                               |
| `content_exposure` | 노드 레벨 (`useIntlayer` / 해석기 플러그인) | 어떤 사전 키(dictionary key) / 키 경로가 실제로 해석되어 표시되었는지 — 실험의 일부인 경우 어떤 **변형(variant)**인지. |
| `conversion`       | `useConversion()`을 호출하는 모든 곳        | 세션에 노출된 A/B 변형과 기여(attributed)된 달성 목표(가입, 클릭, 구매 등).                                            |

이벤트는 메모리에 수집되어 키 입력이나 렌더링마다 전송되지 않고 **약 20초마다 한 번씩 일괄 요청(batch request)으로 전송**됩니다. 따라서 분석은 첫 렌더링 시간에 영향을 주지 않으며 사용자 상호작용마다 요청을 추가하지 않습니다.

## 콘텐츠 A/B 테스트를 지원하는 방법

Intlayer에서는 이미 콘텐츠 [변형(Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 선언할 수 있습니다(예: `control` 및 `black_friday` 변형이 포함된 `hero-banner` 사전). `@intlayer/analytics`는 다음을 통해 사이클을 완성합니다:

1. `getVariant(experimentKey, variants)`는 결정론적(deterministically)으로 각 익명 세션을 변형에 할당합니다 — 이는 세션 ID와 실험 키의 순수 함수이므로 할당은 **세션 전체에 걸쳐 안정적**이며 첫 렌더링 전에 **서버 왕복이 필요 없습니다**(깜빡임, 레이아웃 변경 없음).
2. 모든 `content_exposure` 이벤트에는 화면에 표시된 `variant` 정보가 포함됩니다.
3. `useConversion()`을 사용하면 해당 변형에 목표(예: `"cta_click"`)를 기여(attribute)시킬 수 있습니다.
4. 대시보드의 실험 결과 엔드포인트는 통계적 유의성(z-test)을 포함하여 각 변형의 전환율을 비교합니다.

## 설치

`@intlayer/analytics`는 **선택적 피어 의존성(peer, optional dependency)**으로, 프레임워크 패키지에 의해 자동으로 설치되지 않습니다. `intlayer`와 함께 설치하세요:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

패키지를 설치하지 않으면 모든 통합 지점이 아무 동작도 수행하지 않는(no-op) 상태로 해석됩니다 — 아래의 [미설치 시 제로 비용](#미설치-시-제로-비용)을 참고하세요.

## 구성

Analytics는 **기존 `editor` 구성 블록을 재사용**합니다. 채워야 할 별도의 `analytics` 구성 스키마는 없습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Analytics 이벤트 수집 엔드포인트로도 사용됨
    clientId: "your-client-id", // Analytics 프로젝트 키로도 사용됨
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — 분석 이벤트가 전송되는 기본 URL (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — 수집되는 모든 이벤트에 기여하는 퍼블릭 프로젝트 키. 이는 **활성화 스위치**의 역할도 합니다: `clientId`가 구성될 때까지 분석 기능은 완전히 비활성화(tree-shake 됨) 상태로 유지됩니다.

직접 Intlayer를 호스팅(self-host)하는 경우, `editor.backendURL`을 공유하므로 분석은 자동으로 사용자 자체 인스턴스를 가리킵니다.

## 프레임워크 지원

Analytics는 `react-intlayer`의 공유된 `IntlayerProvider`와 연결되어 있으므로, 이 Provider가 사용되는 곳이라면 어디서든 바로 사용할 수 있습니다:

| 프레임워크                                               | 상태                                                                                                  |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ 지원됨                                                                                             |
| Next.js (`next-intlayer`)                                | ✅ 지원됨 (`react-intlayer`를 통해)                                                                   |
| React Native / Expo (`react-native-intlayer`)            | ✅ 지원됨 (`react-intlayer`를 통해)                                                                   |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 계획됨 — `@intlayer/editor` 배포 패턴을 따르는 동일한 클라이언트, 프로바이더 레벨 바인딩 제공 예정 |

## 사용법

### 자동 프로바이더 레벨 추적

코드를 변경할 필요가 없습니다. `@intlayer/analytics`가 설치되고 `editor.clientId`가 구성되면, `IntlayerProvider`는 자동으로 다음을 수행합니다:

- 마운트 시 Analytics 클라이언트를 초기화,
- 초기 로드 시 `page_view`를 기록,
- 로케일 변경 시마다 `page_view`를 기록,
- 약 20초의 플러시 루프(flush loop)를 시작하고, 언마운트 / 탭 닫기 시 남은 이벤트를 플러시합니다 (`navigator.sendBeacon`을 사용하며, `fetch(..., { keepalive: true })`로 폴백).

### 자동 노드 레벨 추적

`useIntlayer`가 표시할 콘텐츠 조각을 해석할 때마다, 해석기(interpreter)는 해당 정확한 `dictionaryKey` + 키 경로 + 로케일에 대해 `content_exposure` 이벤트를 보고합니다 — 이 역시 코드를 변경할 필요가 없습니다. 플러시 창(flush window) 내에 같은 노드가 반복해서 노출되면 이벤트는 `count` 속성을 포함한 단일 이벤트로 병합(coalesced)되므로, 리스트가 50번 리렌더링된다고 해서 50개의 이벤트가 전송되지 않습니다.

### A/B 테스트를 위한 전환(Conversion) 추적

`useConversion()`을 사용하여 세션이 본 변형에 목표를 연결(attribute)하세요:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      시작하기
    </button>
  );
};
```

### 클라이언트 측에서 변형 해결(Resolving a variant)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## 프라이버시 & 성능

- **설계상 익명(Anonymous by design)**: 세션은 회전하는(rotating) ID로 식별되며, 백엔드는 해당 ID의 **SHA-256 해시**만 저장합니다 — 원시 ID나 IP 주소는 절대 저장하지 않습니다.
- **대략적인 위치 정보**: CDN 지리적 위치 헤더(`cf-ipcountry`, `x-vercel-ip-country` 등)에서 도출된 국가 코드만 포함되며 — IP를 읽거나 저장하지 않습니다.
- **URL은 쿼리 매개변수 제외**: 쿼리 문자열은 절대 캡처되지 않도록 기본 설정되어 있습니다.
- **샘플링**: 트래픽이 높은 앱의 경우 `sampleRate`를 사용하여 콘텐츠 노출 이벤트의 일부만 유지할 수 있습니다.
- **일괄 처리(Batched)**: 약 20초마다 한 번씩 요청(`flushInterval`)하거나 버퍼가 가득 찼을 때(`maxBufferSize`) 요청을 보냅니다 — 이벤트별로 단일 요청을 보내는 일은 없습니다.

### 미설치 시 제로 비용

`@intlayer/analytics`는 `@intlayer/editor`와 완전히 동일한 선택적 의존성 패턴을 따릅니다:

- 모든 통합 지점은 **`try/catch`로 래핑된 동적 `import()`**를 통해 패키지를 로드합니다 — `@intlayer/analytics`를 아예 설치하지 않는 앱은 번들 크기나 런타임 비용을 지불하지 않으며, 오류가 발생하지 않습니다.
- `editor.clientId`가 구성되지 않은 경우 `@intlayer/config`에 의해 `'false'`로 자동 설정되는 컴파일 타임 환경 변수(`INTLAYER_ANALYTICS_ENABLED`)는, 번들러가 통합된 코드 전체를 **데드 코드 제거(dead-code-eliminate)**할 수 있게 해줍니다.
- Intlayer 에디터/CMS 미리보기 iframe 내부에서는 Analytics 기능이 비활성화되므로 에디터 세션이 실제 트래픽으로 계산되지 않습니다.

## 대시보드: Analytics 페이지

프로젝트에 이벤트가 수집되기 시작하면, [Intlayer 대시보드](https://app.intlayer.org/analytics)의 **Analytics** 페이지(프로젝트 선택 후 사이드바에 표시됨)에서 다음을 확인할 수 있습니다:

- **활성 사용자(Active users)** — 선택된 롤링 창(7 / 30 / 90일) 동안의 순 방문자.
- **오늘의 사용자** 및 **지난 7일간 사용자**.
- 선택된 기간 동안의 **페이지 뷰**.
- 일별 순 방문자의 **변화 추이 그래프**.
- **로케일(Locales)** 및 **위치(Location)** 분석 탭을 통해 로케일 및 국가별 오디언스 순위를 제공.

## 백엔드 API 참조

모든 읽기 엔드포인트는 인증이 필요합니다; 이벤트 수집(ingestion) 엔드포인트는 퍼블릭하며 본문의 `clientId`로 기여(attributed)를 수행합니다.

| Method | Endpoint                                    | Description                                                            |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | 일괄 이벤트를 수집(public, body의 `clientId`에 의해 귀속됨).           |
| `GET`  | `/api/analytics/overview`                   | 인증된 프로젝트의 페이지/로케일 총합(totals).                          |
| `GET`  | `/api/analytics/audience?days=30`           | 순 방문자, 페이지 뷰, 일별 시계열 데이터, 로케일 + 국가별 분석 데이터. |
| `GET`  | `/api/analytics/content-stats`              | 콘텐츠 노출 총합(사전 키 / 키 경로 / 로케일 별로 그룹화됨).            |
| `GET`  | `/api/analytics/experiments/:experimentKey` | A/B 실험을 위한 변형(variant)별 전환율 및 통계적 유의성.               |

[CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 프로그래밍 방식으로 호출할 수도 있습니다:

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## 유용한 링크

- [Dynamic Dictionaries - Collections & Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- [Configuration Reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)
