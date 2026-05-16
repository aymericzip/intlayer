---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Intlayer의 장점
description: 프로젝트에서 Intlayer를 사용할 때의 이점과 장점을 알아보세요. Intlayer가 다른 프레임워크와 차별화되는 이유를 이해해 보세요.
keywords:
  - 이점
  - 장점
  - Intlayer
  - 프레임워크
  - 비교
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "컴파일러 릴리스"
  - version: 5.8.0
    date: 2025-08-19
    changes: "비교 표 업데이트"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 기록"
---

# 왜 Intlayer를 고려해야 하나요?

## Intlayer란 무엇인가요?

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드의 모든 곳에서 콘텐츠를 선언할 수 있게 해줍니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있도록 합니다. TypeScript를 사용하여 **Intlayer**는 개발을 더 강력하고 효율적으로 만듭니다.

## Intlayer는 왜 만들어졌나요?

Intlayer는 `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl`, 그리고 `vue-i18n`과 같은 모든 일반적인 i18n 라이브러리에 영향을 미치는 공통적인 문제를 해결하기 위해 만들어졌습니다.

이 모든 솔루션은 콘텐츠를 나열하고 관리하기 위해 중앙 집중식 접근 방식을 채택합니다. 예를 들어:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

또는 네임스페이스를 사용하는 경우:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

이러한 유형의 아키텍처는 개발 프로세스를 늦추고 다음과 같은 여러 이유로 코드베이스를 유지 관리하기 복잡하게 만듭니다.

1. **새로운 컴포넌트를 생성할 때마다 다음을 수행해야 합니다.**
   - `locales` 폴더에 새로운 리소스/네임스페이스 생성
   - 페이지에서 새로운 네임스페이스를 가져오는 것을 잊지 않기
   - 콘텐츠 번역(종종 AI 제공업체로부터 복사/붙여넣기를 통해 수동으로 수행됨)

2. **컴포넌트를 변경할 때마다 다음을 수행해야 합니다.**
   - 관련 리소스/네임스페이스 검색(컴포넌트에서 멀리 떨어져 있음)
   - 콘텐츠 번역
   - 모든 로케일에 대해 콘텐츠가 최신 상태인지 확인
   - 네임스페이스에 사용되지 않는 키/값이 포함되어 있지 않은지 확인
   - 모든 로케일에 대해 JSON 파일 구조가 동일한지 확인

이러한 솔루션을 사용하는 전문 프로젝트에서는 콘텐츠 번역 관리를 돕기 위해 종종 로컬라이제이션 플랫폼이 사용됩니다. 그러나 대규모 프로젝트의 경우 이는 빠르게 비용이 많이 들 수 있습니다.

이 문제를 해결하기 위해 Intlayer는 콘텐츠를 컴포넌트별로 범위를 지정하고, 우리가 종종 CSS(`styled-components`), 타입, 문서(`storybook`), 또는 유닛 테스트(`jest`)에서 하듯이 콘텐츠를 컴포넌트 근처에 유지하는 접근 방식을 채택합니다.

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

이 접근 방식은 다음과 같은 이점을 제공합니다.

1. **개발 속도 향상**
   - VSCode 확장 프로그램을 사용하여 `.content.{{ts|mjs|cjs|json}}` 파일을 생성할 수 있습니다.
   - IDE의 자동 완성 AI 도구(예: GitHub Copilot)가 콘텐츠 선언을 도와 복사/붙여넣기를 줄여줍니다.

2. **코드베이스 정리**
   - 복잡성 감소
   - 유지 관리 용이성 향상

3. **컴포넌트 및 관련 콘텐츠를 더 쉽게 복제(예: 로그인/가입 컴포넌트 등)**
   - 다른 컴포넌트의 콘텐츠에 영향을 줄 위험 제한
   - 외부 종속성 없이 한 애플리케이션에서 다른 애플리케이션으로 콘텐츠를 복사/붙여넣기

4. **사용되지 않는 컴포넌트에 대해 사용되지 않는 키/값으로 코드베이스가 오염되는 것을 방지**
   - 컴포넌트를 사용하지 않으면 Intlayer는 관련 콘텐츠를 가져오지 않습니다.
   - 컴포넌트를 삭제하면 같은 폴더에 있으므로 관련 콘텐츠를 삭제하는 것을 더 쉽게 기억할 수 있습니다.

5. **AI 에이전트가 다국어 콘텐츠를 선언하기 위한 추론 비용 감소**
   - AI 에이전트는 콘텐츠를 구현할 위치를 알기 위해 전체 코드베이스를 스캔할 필요가 없습니다.
   - IDE의 자동 완성 AI 도구(예: GitHub Copilot)를 통해 번역을 쉽게 수행할 수 있습니다.

6. **로드 성능 최적화**
   - 컴포넌트가 지연 로드(lazy-load)되는 경우 관련 콘텐츠도 동시에 로드됩니다.

## Intlayer의 추가 기능

| 기능                                                                                                                      | 설명                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![기능](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                             | **교차 프레임워크 지원**<br><br>Intlayer는 Next.js, React, Vite, Vue.js, Nuxt, Preact, Express 등을 포함한 모든 주요 프레임워크 및 라이브러리와 호환됩니다.                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript 기반 콘텐츠 관리**<br><br>JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리하세요. <br><br> - [콘텐츠 선언](https://intlayer.org/doc/concept/content)                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="기능" width="700">     | **컴파일러**<br><br>Intlayer 컴파일러는 컴포넌트에서 콘텐츠를 자동으로 추출하고 사전 파일을 생성합니다.<br><br> - [컴파일러](https://intlayer.org/doc/compiler)                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **로케일별 콘텐츠 선언 파일**<br><br>자동 생성 전 콘텐츠를 한 번 선언하여 개발 속도를 높이세요.<br><br> - [로케일별 콘텐츠 선언 파일](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **타입 안전 환경**<br><br>TypeScript를 활용하여 콘텐츠 정의와 코드가 오류가 없는지 확인하고 IDE 자동 완성의 이점을 누리세요.<br><br> - [TypeScript 구성](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **간소화된 설정**<br><br>최소한의 구성으로 신속하게 시작하고 실행하세요. 국제화, 라우팅, AI, 빌드 및 콘텐츠 처리 설정을 쉽게 조정하세요. <br><br> - [Next.js 통합 알아보기](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **간소화된 콘텐츠 검색**<br><br>각 콘텐츠 항목에 대해 `t` 함수를 호출할 필요가 없습니다. 단일 후크를 사용하여 모든 콘텐츠를 직접 검색하세요.<br><br> - [React 통합](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **일관된 서버 컴포넌트 구현**<br><br>Next.js 서버 컴포넌트에 완벽하게 적합하며, 클라이언트 및 서버 컴포넌트 모두에 동일한 구현을 사용하므로 각 서버 컴포넌트에 `t` 함수를 전달할 필요가 없습니다. <br><br> - [서버 컴포넌트](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **정리된 코드베이스**<br><br>코드베이스를 더 체계적으로 유지하세요: 1 컴포넌트 = 동일한 폴더 내 1 사전. 각 컴포넌트와 가까운 번역은 유지 관리성과 명확성을 향상시킵니다. <br><br> - [Intlayer 작동 방식](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **향상된 라우팅**<br><br>앱 라우팅을 완벽하게 지원하여 Next.js, React, Vite, Vue.js 등의 복잡한 애플리케이션 구조에 원활하게 적응합니다.<br><br> - [Next.js 통합 알아보기](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 지원**<br><br>개인정보 보호정책, 문서 등과 같은 다국어 콘텐츠를 위해 로케일 파일 및 원격 Markdown을 가져오고 해석합니다. Markdown 메타데이터를 해석하고 코드에서 액세스할 수 있도록 합니다.<br><br> - [콘텐츠 파일](https://intlayer.org/doc/concept/content/file)                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **무료 비주얼 에디터 및 CMS**<br><br>콘텐츠 작성자를 위해 무료 비주얼 에디터와 CMS가 제공되므로 로컬라이제이션 플랫폼이 필요하지 않습니다. Git을 사용하여 콘텐츠를 동기화하거나 CMS를 사용하여 전체 또는 일부를 외부화하세요.<br><br> - [Intlayer 에디터](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable 콘텐츠**<br><br>최종 번들 크기를 줄여주는 Tree-shakable 콘텐츠입니다. 컴포넌트당 콘텐츠를 로드하여 번들에서 사용되지 않는 콘텐츠를 제외합니다. 앱 로딩 효율성을 높이기 위해 지연 로드를 지원합니다. <br><br> - [앱 빌드 최적화](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **정적 렌더링**<br><br>정적 렌더링을 차단하지 않습니다. <br><br> - [Next.js 통합](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI 기반 번역**<br><br>자체 AI 제공업체/API 키를 사용하여 Intlayer의 고급 AI 기반 번역 도구로 단 한 번의 클릭으로 웹사이트를 231개 언어로 변환하세요. <br><br> - [CI/CD 통합](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [자동 채우기](https://intlayer.org/doc/concept/auto-fill)                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 서버 통합**<br><br>IDE 자동화를 위한 MCP(Model Context Protocol) 서버를 제공하여 개발 환경 내에서 원활한 콘텐츠 관리 및 i18n 워크플로우를 가능하게 합니다. <br><br> - [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/ko/mcp_server.md)                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 확장 프로그램**<br><br>Intlayer는 콘텐츠 및 번역 관리, 사전 구축, 콘텐츠 번역 등을 돕는 VSCode 확장 프로그램을 제공합니다. <br><br> - [VSCode 확장 프로그램](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **상호 운용성**<br><br>react-i18next, next-i18next, next-intl 및 react-intl과의 상호 운용성을 지원합니다. <br><br> - [Intlayer 및 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 및 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 및 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |
| 누락된 번역 테스트 (CLI/CI)                                                                                               | ✅ CLI: npx intlayer content test (CI 친화적 감사)                                                                                                                                                                                                                                                                                                                          |

## Intlayer와 다른 솔루션 비교

| 기능                                      | `intlayer`                                                                                                 | `react-i18next`                                                                         | `react-intl` (FormatJS)                                                                               | `lingui`                                                | `next-intl`                                                                             | `next-i18next`                                                                          | `vue-i18n`                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **컴포넌트 근처의 번역**                  | ✅ 예, 콘텐츠가 각 컴포넌트와 동일한 위치에 있음                                                           | ❌ 아니요                                                                               | ❌ 아니요                                                                                             | ❌ 아니요                                               | ❌ 아니요                                                                               | ❌ 아니요                                                                               | ✅ 예 - `Single File Components`(SFC) 사용 시                    |
| **TypeScript 통합**                       | ✅ 고급, 자동 생성된 엄격한 타입                                                                           | ⚠️ 기본; 안전을 위해 추가 구성 필요                                                     | ✅ 좋음, 하지만 덜 엄격함                                                                             | ⚠️ 타이핑, 구성 필요                                    | ✅ 좋음                                                                                 | ⚠️ 기본                                                                                 | ✅ 좋음 (타입 사용 가능; 키 안전에는 설정 필요)                  |
| **누락된 번역 감지**                      | ✅ TypeScript 오류 강조 표시 및 빌드 시 오류/경고                                                          | ⚠️ 주로 런타임 시 폴백(fallback) 문자열                                                 | ⚠️ 폴백 문자열                                                                                        | ⚠️ 추가 구성 필요                                       | ⚠️ 런타임 폴백                                                                          | ⚠️ 런타임 폴백                                                                          | ⚠️ 런타임 폴백/경고 (구성 가능)                                  |
| **풍부한 콘텐츠 (JSX/Markdown/컴포넌트)** | ✅ 직접 지원                                                                                               | ⚠️ 제한적 / 보간만 가능                                                                 | ⚠️ ICU 구문, 실제 JSX 아님                                                                            | ⚠️ 제한적                                               | ❌ 풍부한 노드용으로 설계되지 않음                                                      | ⚠️ 제한적                                                                               | ⚠️ 제한적 (`<i18n-t>`를 통한 컴포넌트, 플러그인을 통한 Markdown) |
| **AI 기반 번역**                          | ✅ 예, 여러 AI 제공업체 지원. 자체 API 키를 사용하여 사용 가능. 애플리케이션의 문맥과 콘텐츠 범위를 고려함 | ❌ 아니요                                                                               | ❌ 아니요                                                                                             | ❌ 아니요                                               | ❌ 아니요                                                                               | ❌ 아니요                                                                               | ❌ 아니요                                                        |
| **비주얼 에디터**                         | ✅ 예, 로컬 비주얼 에디터 + 선택적 CMS; 코드베이스 콘텐츠 외부화 가능; 임베드 가능                         | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능                                 | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능                                               | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능 | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능                                 | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능                                 | ❌ 아니요 / 외부 로컬라이제이션 플랫폼을 통해 사용 가능          |
| **로컬라이즈드 라우팅**                   | ✅ 예, 기본적으로 로컬라이즈드 경로 지원 (Next.js 및 Vite와 작동)                                          | ⚠️ 내장 기능 없음, 플러그인(예: `next-i18next`) 또는 커스텀 라우터 구성 필요            | ❌ 아니요, 메시지 포맷팅만 제공, 라우팅은 수동이어야 함                                               | ⚠️ 내장 기능 없음, 플러그인 또는 수동 구성 필요         | ✅ 내장, App Router는 `[locale]` 세그먼트 지원                                          | ✅ 내장                                                                                 | ✅ 내장                                                          |
| **동적 경로 생성**                        | ✅ 예                                                                                                      | ⚠️ 플러그인/에코시스템 또는 수동 설정                                                   | ❌ 제공되지 않음                                                                                      | ⚠️ 플러그인/수동                                        | ✅ 예                                                                                   | ✅ 예                                                                                   | ❌ 제공되지 않음 (Nuxt i18n에서 제공)                            |
| **복수형화**                              | ✅ 열거형 기반 패턴                                                                                        | ✅ 구성 가능 (i18next-icu와 같은 플러그인)                                              | ✅ (ICU)                                                                                              | ✅ (ICU/messageformat)                                  | ✅ 좋음                                                                                 | ✅ 좋음                                                                                 | ✅ 내장 복수형 규칙                                              |
| **포맷팅 (날짜, 숫자, 통화)**             | ✅ 최적화된 포맷터 (내부적으로 Intl 사용)                                                                  | ⚠️ 플러그인 또는 커스텀 Intl 사용을 통해                                                | ✅ ICU 포맷터                                                                                         | ✅ ICU/CLI 헬퍼                                         | ✅ 좋음 (Intl 헬퍼)                                                                     | ✅ 좋음 (Intl 헬퍼)                                                                     | ✅ 내장 날짜/숫자 포맷터 (Intl)                                  |
| **콘텐츠 형식**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 작업 중)                                                       | ⚠️ .json                                                                                | ✅ .json, .js                                                                                         | ⚠️ .po, .json                                           | ✅ .json, .js, .ts                                                                      | ⚠️ .json                                                                                | ✅ .json, .js                                                    |
| **ICU 지원**                              | ⚠️ 작업 중                                                                                                 | ⚠️ 플러그인(i18next-icu)을 통해                                                         | ✅ 예                                                                                                 | ✅ 예                                                   | ✅ 예                                                                                   | ⚠️ 플러그인(`i18next-icu`)을 통해                                                       | ⚠️ 커스텀 포맷터/컴파일러를 통해                                 |
| **SEO 헬퍼 (hreflang, sitemap)**          | ✅ 내장 도구: sitemap, robots.txt, 메타데이터용 헬퍼                                                       | ⚠️ 커뮤니티 플러그인/수동                                                               | ❌ 핵심 기능 아님                                                                                     | ❌ 핵심 기능 아님                                       | ✅ 좋음                                                                                 | ✅ 좋음                                                                                 | ❌ 핵심 기능 아님 (Nuxt i18n에서 헬퍼 제공)                      |
| **에코시스템 / 커뮤니티**                 | ⚠️ 규모는 작지만 빠르게 성장 중이며 반응이 빠름                                                            | ✅ 가장 크고 성숙함                                                                     | ✅ 큼                                                                                                 | ⚠️ 작음                                                 | ✅ 중간 규모, Next.js 중심                                                              | ✅ 중간 규모, Next.js 중심                                                              | ✅ Vue 에코시스템에서 큼                                         |
| **서버 사이드 렌더링 및 서버 컴포넌트**   | ✅ 예, SSR / React 서버 컴포넌트에 최적화됨                                                                | ⚠️ 페이지 레벨에서 지원되지만 하위 서버 컴포넌트의 컴포넌트 트리에 t-함수를 전달해야 함 | ⚠️ 추가 설정으로 페이지 레벨에서 지원되지만 하위 서버 컴포넌트의 컴포넌트 트리에 t-함수를 전달해야 함 | ✅ 지원, 설정 필요                                      | ⚠️ 페이지 레벨에서 지원되지만 하위 서버 컴포넌트의 컴포넌트 트리에 t-함수를 전달해야 함 | ⚠️ 페이지 레벨에서 지원되지만 하위 서버 컴포넌트의 컴포넌트 트리에 t-함수를 전달해야 함 | ✅ Nuxt/Vue SSR을 통한 SSR (RSC 없음)                            |
| **Tree-shaking (사용된 콘텐츠만 로드)**   | ✅ 예, Babel/SWC 플러그인을 통해 빌드 시 컴포넌트별로 수행                                                 | ⚠️ 일반적으로 모두 로드 (네임스페이스/코드 분할로 개선 가능)                            | ⚠️ 일반적으로 모두 로드                                                                               | ❌ 기본 아님                                            | ⚠️ 부분적                                                                               | ⚠️ 부분적                                                                               | ⚠️ 부분적 (코드 분할/수동 설정 사용 시)                          |
| **지연 로딩**                             | ✅ 예, 로케일별 / 사전별                                                                                   | ✅ 예 (예: 온디맨드 백엔드/네임스페이스)                                                | ✅ 예 (로케일 번들 분할)                                                                              | ✅ 예 (동적 카탈로그 가져오기)                          | ✅ 예 (경로별/로케일별), 네임스페이스 관리 필요                                         | ✅ 예 (경로별/로케일별), 네임스페이스 관리 필요                                         | ✅ 예 (비동기 로케일 메시지)                                     |
| **사용되지 않는 콘텐츠 삭제**             | ✅ 예, 빌드 시 사전별로 수행                                                                               | ❌ 아니요, 수동 네임스페이스 분할을 통해서만 가능                                       | ❌ 아니요, 선언된 모든 메시지가 번들링됨                                                              | ✅ 예, 사용되지 않는 키가 감지되어 빌드 시 삭제됨       | ❌ 아니요, 네임스페이스 관리를 통해 수동으로 관리 가능                                  | ❌ 아니요, 네임스페이스 관리를 통해 수동으로 관리 가능                                  | ❌ 아니요, 수동 지연 로딩을 통해서만 가능                        |
| **대규모 프로젝트 관리**                  | ✅ 모듈화를 장려하며 디자인 시스템에 적합함                                                                | ⚠️ 양호한 파일 규율 필요                                                                | ⚠️ 중앙 카탈로그가 커질 수 있음                                                                       | ⚠️ 복잡해질 수 있음                                     | ✅ 구성을 통한 모듈화                                                                   | ✅ 구성을 통한 모듈화                                                                   | ✅ Vue Router/Nuxt i18n 구성을 통한 모듈화                       |

---

## GitHub 스타

GitHub 스타는 프로젝트의 인기, 커뮤니티 신뢰 및 장기적인 관련성을 나타내는 강력한 지표입니다. 기술적 품질을 직접적으로 측정하는 것은 아니지만, 얼마나 많은 개발자가 프로젝트가 유용하다고 생각하고 진행 상황을 팔로우하며 채택할 가능성이 있는지를 반영합니다. 프로젝트의 가치를 평가할 때 스타는 대안 간의 견인력을 비교하는 데 도움이 되며 생태계 성장에 대한 통찰력을 제공합니다.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## 상호 운용성

`intlayer`는 `react-intl`, `react-i18next`, `next-intl`, `next-i18next` 및 `vue-i18n` 네임스페이스 관리를 도울 수 있습니다.

`intlayer`를 사용하면 선호하는 i18n 라이브러리 형식으로 콘텐츠를 선언할 수 있으며, intlayer는 선택한 위치(예: `/messages/{{locale}}/{{namespace}}.json`)에 네임스페이스를 생성합니다.

자세한 내용은 [`dictionaryOutput` 및 `i18nextResourcesDir` 옵션](https://intlayer.org/doc/concept/configuration#content-configuration)을 참조하십시오.
