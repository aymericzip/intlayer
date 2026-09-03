---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: glob import, 청크 분할 및 빌드 타임 메시지"
description: i18n에서 실제로 Vite 고유의 영역은 무엇인가. import.meta.glob을 활용한 지연 로딩, 라우트별 분할이 의도대로 동작하지 않는 이유, HMR 누락과 빌드 타임 플러그인을 다룹니다.
keywords:
  - vite i18n
  - import.meta.glob
  - vite 코드 분할
  - 번역 지연 로딩
  - vite 플러그인 i18n
  - rollup 청크
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: 프레임워크가 아닌 Vite 자체에 관한 아키텍처

대부분의 "Vite i18n" 튜토리얼은 단지 Vite를 번들러로 사용할 뿐인 React나 Vue 튜토리얼에 가깝습니다. 이 글은 그 아래 계층을 다룹니다: 카탈로그가 어떻게 임포트되고, Rollup이 이를 어떻게 번들링하며, 직접 작성한 지연 로딩(lazy loading) 코드가 왜 실제로는 지연 로딩되지 않는지 살펴봅니다.

## 목차

<TOC/>

## 정적 임포트는 기본 동작이며 즉시 로딩됩니다

가장 단순한 설정은 모듈 최상단에서 모든 언어 카탈로그를 정적으로 임포트하는 것입니다:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

이렇게 하면 세 개의 카탈로그가 엔트리 청크에 포함되어 모든 페이지, 모든 사용자에게 전달됩니다. 지원 언어가 두 개이고 텍스트가 백 개 정도라면 문제없지만, 언어가 열 개를 넘어서면 번들 크기에서 가장 불필요한 낭비 요소가 됩니다.

## `import.meta.glob`과 흔히 범하는 설정 실수

Vite의 glob import 기능은 이에 대한 일반적인 해결책입니다:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

지연 로딩(Lazy)이 기본값입니다. 각 엔트리는 동적 임포트를 반환하는 함수가 되며, Rollup은 파일별로 독립된 청크를 생성합니다. 여기에 `{ eager: true }`를 추가하면 모든 파일이 부모 모듈 안에 인라인으로 포함되어, 방지하고자 했던 바로 그 문제가 다시 발생합니다:

```ts
// 모든 언어가 엔트리 청크에 한꺼번에 포함됩니다 (비권장)
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

주의할 점은 개발 환경에서는 Vite가 개별 모듈을 번들링하지 않고 직접 제공하므로 두 방식 모두 정상 작동한다는 것입니다. 차이는 빌드 결과물인 `dist` 디렉터리에서만 나타납니다. `npx vite build && npx vite preview` 명령으로 빌드한 뒤 엔트리 청크에 무엇이 포함되어 있는지 직접 확인해 보세요.

## 라우트별 분할이 의도대로 쪼개지지 않는 이유

많은 개발자들이 예상치 못하는 부분입니다. 페이지별로 카탈로그를 분리했다고 가정해 봅시다:

```
locales/en/home.json
locales/en/checkout.json
```

그런 다음 서로 다른 두 라우트가 `checkout.json`을 임포트하면, Rollup은 이를 두 페이지 모두에서 로드되는 공통 청크(shared chunk)로 격상시킵니다. Rollup의 청크 분할 알고리즘은 폴더 이름이 아니라 모듈 그래프의 의존 관계를 기반으로 작동합니다. 두 개 이상의 엔트리 포인트에서 접근 가능한 모듈은 자동으로 공통 청크가 됩니다. 세 번째 라우트가 추가되어도 변함이 없으며, 네 번째 라우트가 추가되면 청크 구성이 전혀 다르게 재편될 수도 있습니다.

따라서 라우트별 카탈로그 분할은 임포트 그래프가 완전히 독립적일 때만 유지됩니다. 번들 최적화가 중요하다면 추측에 의존하지 말고 시각화 도구로 검증하세요:

```bash
npx vite build && npx vite-bundle-visualizer
```

청크 경계를 강제해야 한다면 `build.rollupOptions.output.manualChunks`를 활용할 수 있지만 수동 관리 비용이 발생합니다.

## 카탈로그는 자동으로 핫 리로드(HMR)되지 않습니다

컴포넌트를 수정하면 Vite가 즉시 화면을 교체합니다. 그러나 `locales/fr.json`을 수정하면 임포트 방식에 따라 아무 일도 일어나지 않을 수 있습니다. 동적으로 임포트된 JSON 파일은 자체적인 HMR 경계가 없으므로 모듈 그래프가 이를 사용하는 컴포넌트를 무효화해야 하는지 알지 못합니다.

텍스트를 수정할 때마다 개발 서버를 재시작하는 개발자가 많지만, 이는 플러그인 레벨에서 해결 가능한 문제입니다. i18n 플러그인이 HMR 업데이트를 수신하여 실행 중인 앱에 새로운 메시지를 즉시 주입해 주어야 합니다. 라이브러리를 검토할 때 해당 Vite 플러그인이 이를 지원하는지 확인하세요.

## `define`은 로케일을 빌드 결과물에 박아 넣습니다

빌드 시점에 기본 로케일을 고정하고 싶은 유혹이 들 수 있습니다:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define`은 컴파일 시점에 수행되는 단순 텍스트 치환입니다. 빌드 시 지정된 값이 코드에 영구적으로 박히기 때문에, 결과적으로 언어별로 별도의 빌드를 수행해야 합니다. 이는 Angular의 공식 i18n처럼 유효한 전략 중 하나이지만, 단일 배포본으로 모든 언어를 서비스하려는 목적에는 부합하지 않습니다.

요청별로 달라져야 하는 값은 `define`에 넣지 말고 런타임에서 결정하도록 유지해야 합니다.

## 메시지 파싱을 빌드 타임으로 이전하기

이 생태계의 성숙한 도구들은 공통적으로 브라우저 내부에서 메시지를 파싱하는 방식을 중단하고 있습니다.

| 플러그인                     | 빌드 타임으로 이전하는 작업                                             |
| :--------------------------- | :---------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | vue-i18n 메시지를 렌더 함수로 컴파일 (런타임 전용 가벼운 번들 배포)     |
| Lingui (매크로 + 플러그인)   | 카탈로그를 추출 및 컴파일하고 매크로를 메시지 ID로 치환                 |
| Paraglide (inlang)           | 각 메시지를 트리쉐이킹 가능한 개별 함수로 컴파일                        |
| `vite-intlayer`              | 컴포넌트 단위 딕셔너리 구축, 미사용 필드 제거(purge) 및 키 단축(minify) |

이로써 두 가지 이점을 얻습니다: 런타임 메시지 컴파일러가 최종 번들에서 제외되고, 사용되지 않는 번역 항목을 정적으로 제거할 수 있습니다. 반면 개발 서버와 CI 모두에 플러그인이 필수적이며, Vite 환경 밖에서 단독 `tsc`나 테스트를 실행할 때 추가 설정이 필요합니다.

vue-i18n이 대표적입니다. `@intlify/unplugin-vue-i18n`이 없으면 브라우저에서 `new Function`을 호출하는 컴파일러를 배포해야 하므로 불필요한 번들 크기와 CSP(Content Security Policy) 문제가 발생합니다.

## SSR: 로케일 상태를 모듈 스코프에 보관하지 마세요

프레임워크나 `vite-plugin-ssr`을 통해 SSR을 도입할 때 반드시 지켜야 할 원칙이 있습니다: 현재 로케일을 저장하는 모듈 레벨 변수는 해당 서버 프로세스의 모든 동시 요청 간에 공유됩니다.

```ts
// 브라우저에서는 안전하지만 서버에서는 요청 간 데이터 유출을 유발합니다
export let currentLocale = "en";
```

동시에 서버에 접속한 두 사용자는 레이스 컨디션에 빠지게 되며, 한 사용자가 다른 사용자의 언어로 렌더링된 화면을 보게 됩니다. 로컬 개발 환경에서는 단일 요청만 발생하므로 재현되지 않습니다. 로케일은 반드시 매 요청마다 결정하여 컨텍스트나 프레임워크의 요청 로컬 저장소를 통해 명시적으로 전달하세요.

## Intlayer의 Vite 플러그인

Intlayer는 딕셔너리 빌드, 개발 모드 감시, 번들 최적화 파이프라인을 통합 처리하는 단일 플러그인을 제공합니다:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

임포트 재작성, 미사용 콘텐츠 제거(purge), 키 축약(minify)이 기본 활성화되어 있습니다. 핵심 옵션은 `intlayer.config.ts`에서 설정합니다:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 컴포넌트가 읽지 않는 콘텐츠 필드 자동 제거
    minify: true, // 콘텐츠 키를 짧은 별칭으로 축약
  },
};

export default config;
```

콘텐츠가 거대한 전역 파일 대신 각 컴포넌트 단위로 선언되므로, purge 단계에서 모듈 의존성 그래프를 정확히 분석하여 안전하게 사용되지 않는 텍스트를 걸러낼 수 있습니다. 자세한 내용은 [번들 최적화 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참고하세요.

## 흔한 실수들

- **지연 로딩하려던 glob에 `{ eager: true }` 설정.** 개발 환경에서는 잘 돌아가지만 프로덕션에 모든 언어가 함께 배포됩니다.
- **폴더 구조가 알아서 청크를 나눌 것이라 신뢰.** Rollup은 폴더가 아니라 임포트 관계를 따릅니다. 빌드 결과를 직접 측정하세요.
- **번역 변경 사항을 보려고 개발 서버를 재시작.** 정상적인 동작이 아니며 플러그인의 HMR 핸들러 부재 때문입니다.
- **`define`에 로케일을 주입.** 언어별 독립 빌드를 강제하게 됩니다.
- **SSR 환경에서 모듈 레벨에 로케일 상태 저장.** 동시 요청 시 언어가 뒤섞이는 심각한 버그가 발생합니다.
- **개발 서버에서 번들 성능 벤치마크.** 번들링되지 않은 모듈의 동작은 프로덕션 번들과 아무 상관이 없습니다.

## 더 알아보기

- [번들 최적화: purge, minify 및 실제 브라우저로 전송되는 데이터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [프레임워크 간 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [설정 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [Vite 및 React 환경에서 Intlayer 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- [i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)
- [React i18n: 프로바이더 모델의 동작 원리](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: 작동 원리와 주의점](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/vue.md)
- [컴포넌트 단위 i18n vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
