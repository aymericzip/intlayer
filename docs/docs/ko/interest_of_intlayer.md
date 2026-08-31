---
createdAt: 2024-08-14
updatedAt: 2026-08-30
title: Intlayer의 장점
description: 프로젝트에서 Intlayer를 사용할 때의 이점과 장점을 알아보세요. 다른 프레임워크 중에서 Intlayer가 왜 뛰어난지 이해해보세요.
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
  - version: 8.11.2
    date: 2026-05-31
    changes: "다른 대안 대신 Intlayer인 이유 섹션 추가"
  - version: 7.3.1
    date: 2025-11-27
    changes: "컴파일러 출시"
  - version: 5.8.0
    date: 2025-08-19
    changes: "비교표 업데이트"
  - version: 5.5.10
    date: 2025-06-29
    changes: "기록 초기화"
author: aymericzip
---

# 왜 Intlayer를 고려해야 할까요?

## Intlayer란 무엇인가요?

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화(i18n) 라이브러리입니다. 코드 내 어디에서나 콘텐츠를 선언할 수 있도록 해줍니다. 다국어 콘텐츠 선언을 구조화된 사전(dictionaries)으로 변환하여 코드에 쉽게 통합할 수 있게 돕습니다. TypeScript를 활용함으로써, **Intlayer**는 개발 프로세스를 더욱 강력하고 효율적으로 만들어 줍니다.

## 왜 다른 대안 대신 Intlayer인가요?

`next-intl`이나 `i18next`와 같은 주요 솔루션과 비교할 때, Intlayer는 다음과 같은 통합된 최적화를 제공합니다:

<AccordionGroup>

<Accordion header="번들 크기">

페이지에 대용량 JSON 파일을 로드하는 대신, 꼭 필요한 콘텐츠만 로드합니다. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이는 데** 기여합니다.

</Accordion>

<Accordion header="유지보수성">

애플리케이션 콘텐츠의 범위를 컴포넌트 단위로 분할하여 **대규모 애플리케이션의 유지보수를 원활하게** 합니다. 전체 콘텐츠 코드베이스를 전부 검토해야 하는 인지적 부담 없이 단일 기능 폴더를 간편하게 복제하거나 삭제할 수 있습니다. 또한, Intlayer는 **완전한 타입 지원**을 통해 콘텐츠 선언의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠 선언을 컴포넌트와 동일한 위치에 두는 것(Co-location)은 대형 언어 모델(LLM)에 필요한 **콘텍스트 크기를 크게 줄여줍니다**. Intlayer는 번역 누락을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)** 등 일련의 도구를 지원하여 AI 에이전트를 위한 개발자 경험(DX)을 더욱 매끄럽게 만듭니다.

</Accordion>

<Accordion header="기능성">

Intlayer는 다른 i18n 솔루션에는 없는 [Markdown 지원](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), [외부 콘텐츠 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md), [파일 콘텐츠 로드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file.md), [실시간 콘텐츠 업데이트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md), [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 등 폭넓은 추가 기능을 제공합니다.

</Accordion>

<Accordion header="자동화">

CI/CD 파이프라인에서 원하는 LLM을 사용하여 AI 제공업체의 직접 비용 수준으로 손쉽게 자동 번역을 적용할 수 있습니다. Intlayer는 콘텐츠 추출을 자동화하는 **컴파일러**와 함께 **백그라운드에서 편리하게 번역할 수 있는** [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 컴포넌트에 직접 연결하는 작업은 성능 저하와 반응성 문제를 초래할 수 있습니다. Intlayer는 빌드 시점에 콘텐츠 로드를 최적화하여 이를 해결합니다.

</Accordion>

<Accordion header="비개발 팀과의 협업 확장">

단순한 i18n 솔루션 이상의 가치를 제공하기 위해, Intlayer는 직접 호스팅 가능한 **[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[전체 기능을 제공하는 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 지원합니다. 이를 통해 번역가, 카피라이터 및 기타 협업 부서와 **실시간**으로 다국어 콘텐츠를 매끄럽게 관리할 수 있습니다. 콘텐츠는 로컬 또는 원격으로 유연하게 저장될 수 있습니다.

</Accordion>

<Accordion header="크로스 프레임워크 디자인">

애플리케이션의 여러 영역에서 서로 다른 프레임워크를 사용하고 있는 경우(예: React, React-native, Vue, Angular, Svelte 등), Intlayer는 **모든 주요 프론트엔드 프레임워크에서 범용 구문과 구현을 사용하는 방법**을 제공합니다. 디자인 시스템, 모바일 앱, 백엔드 서비스 전반에 걸쳐 콘텐츠 선언을 손쉽게 공유할 수 있습니다.

</Accordion>
</AccordionGroup>

## 왜 Intlayer가 만들어졌나요?

Intlayer는 `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` 및 `vue-i18n` 등 기존의 모든 대중적인 i18n 라이브러리들이 공유하고 있는 구조적 고충을 해결하기 위해 개발되었습니다.

이러한 솔루션들은 모두 하나의 중앙 공간에서 다국어 콘텐츠를 나열하고 관리하는 방식을 채택하고 있습니다. 예를 들면 다음과 같습니다:

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

또는 아래와 같이 네임스페이스(namespaces)를 구성하기도 합니다:

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

이와 같은 설계 방식은 아래와 같은 여러 요인으로 인해 개발 속도를 저하시키고 유지보수를 복잡하게 만듭니다:

1. **새로운 컴포넌트를 생성할 때마다 개발자가 매번 수행해야 할 작업:**
   - `locales` 폴더에 새로운 리소스/네임스페이스 파일 생성
   - 해당 네임스페이스를 페이지나 컴포넌트에 직접 임포트
   - 수동으로 콘텐츠 번역 적용 (대개 번역기나 AI 도구에서 수작업으로 복사/붙여넣기)

2. **기존 컴포넌트에 사소한 수정을 가할 때마다 수행해야 할 작업:**
   - 컴포넌트 파일과 멀리 떨어진 해당 리소스/네임스페이스 파일을 탐색
   - 수정 사항 번역
   - 모든 지원 언어에 변경 사항이 일관되게 최신 상태인지 수동 검증
   - 네임스페이스 파일 내에 사용하지 않는 키/값이 방치되어 있는지 확인
   - 모든 언어별 JSON 파일의 구조가 서로 완벽히 대칭을 이루고 있는지 체크

전문적인 프로덕션 환경에서는 이러한 솔루션의 한계를 보완하기 위해 대개 유료 로컬라이제이션 플랫폼을 연동하곤 합니다. 그러나 이는 대규모 프로젝트에서 장기적으로 상당한 비용 부담이 될 수 있습니다.

이를 명쾌하게 해결하기 위해, Intlayer는 스타일시트(`styled-components`), 타입 선언, 문서화(`storybook`) 또는 단위 테스트(`jest`)가 지향하는 것처럼 **각 컴포넌트 내에 관련 다국어 콘텐츠 선언을 귀속시키고 컴포넌트 파일 바로 옆에 배치**하는 컴포넌트별 스코프 중심의 접근 방식을 채택합니다.

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

이러한 방식을 적용하면 다음과 같은 혁신적인 효과를 얻을 수 있습니다:

1. **개발 생산성의 대폭 향상**
   - `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` 파일 선언을 돕는 VSCode 공식 확장 프로그램 지원
   - IDE의 AI 자동완성 도구(예: GitHub Copilot)가 문맥을 정확히 파악하여 콘텐츠 선언을 도와 복사/붙여넣기 수작업이 극적으로 축소됨

2. **청결한 코드베이스 유지**
   - 개발 복잡성을 최소화
   - 구조 유지보수성을 극대화

3. **컴포넌트 및 관련 다국어 콘텐츠 복제의 편리성 (예: 로그인/회원가입 기능 모듈 복사 등)**
   - 다른 컴포넌트나 글로벌 리소스와의 충돌 위험 배제
   - 외부 의존성 걱정 없이, 개발된 개별 컴포넌트 단위를 손쉽게 복사/붙여넣기하여 다른 애플리케이션으로 마이그레이션 가능

4. **더 이상 사용하지 않는 컴포넌트의 유령 키/값 잔존 원천 차단**
   - 해당 컴포넌트를 임포트하지 않으면 관련 리소스가 앱 빌드 번들에 전혀 로드되지 않음
   - 컴포넌트를 삭제할 때 동일 폴더 내의 콘텐츠 정의가 같이 정리되어 쓰레기 코드가 방치되지 않음

5. **AI 에이전트의 다국어 콘텐츠 구현을 위한 추론(Reasoning) 비용 극대화 축소**
   - AI 개발 에이전트가 코드를 이식하거나 수정하기 위해 코드베이스 전체를 불필요하게 검토하지 않아도 됨
   - IDE 내 AI 보조 도구들이 컴포넌트의 문맥을 토대로 손쉽게 다국어 선언 및 자동 번역을 제안함

6. **로딩 성능 최적화**
   - 컴포넌트가 지연 로딩(lazy-loading)되면 해당 컴포넌트에 매핑된 다국어 사전 콘텐츠도 완벽히 동기화되어 필요한 시점에 함께 지연 로드됨

## Intlayer의 추가 기능

| 기능                                                                                                                      | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **크로스 프레임워크 범용 지원**<br><br>Intlayer는 Next.js, React, Vite, Vue.js, Nuxt, Preact, Express 등 다양한 대중적인 프레임워크 및 라이브러리와 완벽하게 호환됩니다.                                                                                                                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript 구문 기반의 동적 콘텐츠 관리**<br><br>JavaScript/TypeScript의 높은 유연성을 활용하여 복잡하고 세련된 콘텐츠 구조를 효율적으로 구성할 수 있습니다. <br><br> - [콘텐츠 선언 가이드](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **지능형 컴파일러**<br><br>Intlayer 컴파일러는 프로젝트 소스 코드에서 다국어 콘텐츠를 자동으로 분석 및 추출하여 최적화된 사전 파일을 빌드합니다.<br><br> - [컴파일러 기술 문서](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **언어별 독립 선언 파일 기능**<br><br>각 언어별 콘텐츠 선언을 분리함으로써 정밀하고 깔끔하게 파일 구조를 분할 및 확장할 수 있습니다.<br><br> - [언어별 파일 가이드](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **엄격한 타입 안전성 보장**<br><br>TypeScript의 강력한 타입 체크를 활용해 휴먼 에러를 완전 차단하고, IDE에서 제공하는 최적의 사전 키 자동완성 힌트를 활용해 보세요.<br><br> - [TypeScript 설정 가이드](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **직관적인 설정 및 시작**<br><br>최소한의 기본 구문 설정으로 앱을 신속히 배포해 보세요. 라우팅, 국제화, 빌드 및 콘텐츠 분석과 관련된 전반적인 제어가 편리합니다. <br><br> - [Next.js 통합 알아보기](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **간편한 콘텐츠 조회**<br><br>자잘한 구문마다 매번 수동으로 `t` 번역 헬퍼를 결합하지 않아도 됩니다. 통합 훅(Hook)을 결합해 필요한 범위의 콘텐츠 딕셔너리를 단번에 인출할 수 있습니다.<br><br> - [React 통합 레퍼런스](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **일관된 서버 컴포넌트 설계**<br><br>Next.js 서버 컴포넌트(RSC)에 최적화된 아키텍처로, 클라이언트 사이드와 서버 사이드 모두 동일한 훅과 구문 형태를 적용할 수 있어 번거롭게 `t` 함수를 컴포넌트 트리에 수동 전달할 필요가 없습니다. <br><br> - [서버 컴포넌트 가이드](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **고도로 조직화된 코드베이스**<br><br>코드 설계를 간결하게 분리합니다: 1 기능 컴포넌트 폴더 내에 해당 사전 딕셔너리가 결합되어 높은 가독성을 유도합니다. <br><br> - [Intlayer 작동 개념](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **강력한 로컬라이즈 라우팅**<br><br>경로 다국어 처리를 기본 탑재하여 Next.js, React, Vite, Vue.js 등을 활용해 복잡하게 얽힌 하위 페이지 주소를 정교하게 분리해 줍니다.<br><br> - [Next.js 통합 가이드](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 기본 연동**<br><br>서비스 약관, 법적 공지, 테크니컬 가이드 등 텍스트 서식이 가미된 Markdown 파일 처리를 기본 제공하여, 프론트 코드 내에서 서식 및 메타데이터를 정밀히 매핑할 수 있습니다.<br><br> - [Markdown 활용 가이드](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **무료 비주얼 에디터 & 헤드리스 CMS**<br><br>마케터, 기획자, 번역가 등 비개발 협업자가 직관적으로 텍스트를 고칠 수 있는 비주얼 편집 도구와 CMS를 무료 제공합니다. Git 동기화 또는 CMS 원격 결합 방식을 유연하게 설정할 수 있습니다.<br><br> - [비주얼 에디터 문서](https://intlayer.org/doc/concept/editor) <br> - [헤드리스 CMS 문서](https://intlayer.org/doc/concept/cms)                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shaking 지원을 통한 초경량 배포**<br><br>빌드 시점에 사용하지 않는 언어와 사전을 완벽히 배포 대상에서 쳐내어 최종 번들 용량을 획기적으로 낮춥니다. 모듈별 레이지 로딩을 원활하게 수행합니다. <br><br> - [빌드 최적화 알아보기](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **정적 정밀 렌더링(SSG) 최적화**<br><br>정적 생성(Static Rendering) 모듈 작동을 방해하지 않고 부드럽게 작동합니다. <br><br> - [Next.js 정적 빌드](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **원클릭 지능형 AI 번역**<br><br>개발자가 직접 등록한 AI 프로바이더 구성을 바탕으로, CLI 한 번으로 최대 231개 이상의 전 세계 로케일 번역을 자동으로 일괄 적용해 줍니다. <br><br> - [CI/CD 자동 번역](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI 연동](https://intlayer.org/doc/concept/cli) <br> - [자동 채우기](https://intlayer.org/doc/concept/auto-fill)                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 서버 연동**<br><br>에디터 자동화 표준 프로토콜인 MCP(Model Context Protocol) 서버를 탑재하여, IDE 개발 보조 인공지능이 코드 번역 작업을 훨씬 능동적이고 정확하게 제어하도록 지원합니다. <br><br> - [MCP 서버 정보](https://github.com/aymericzip/intlayer/blob/main/docs/ko/mcp_server.md)                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 공식 확장 프로그램**<br><br>사전 딕셔너리 관리, 자동 번역 결합 및 사전 빌드 상태 확인 등을 돕는 전용 에디터 확장을 연동해 보세요. <br><br> - [에디터 확장 프로그램](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **높은 상호 운용성**<br><br>기존 react-i18next, next-i18next, next-intl, react-intl 등 기존 모듈 규격에서 손쉽게 마이그레이션하거나 공존할 수 있는 통합 API를 구축했습니다. <br><br> - [react-intl 연동](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [next-intl 연동](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [next-i18next 연동](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer 호환 어댑터](https://intlayer.org/doc/compatibility) |
| 번역 누락 테스트(CLI/CI)                                                                                                  | ✅ CLI: npx intlayer content test (CI 친화적인 자동 진단)                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## Intlayer와 다른 솔루션 비교

| 기능                                     | `intlayer`                                                                                      | `react-i18next`                                                                                         | `react-intl` (FormatJS)                                                                           | `lingui`                                                  | `next-intl`                                                                                             | `next-i18next`                                                                                          | `vue-i18n`                                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **컴포넌트 인근 번역 관리**              | ✅ 예, 컴포넌트와 동일한 위치에 콘텐츠 저장                                                     | ❌ 아니오                                                                                               | ❌ 아니오                                                                                         | ❌ 아니오                                                 | ❌ 아니오                                                                                               | ❌ 아니오                                                                                               | ✅ 예 - `Single File Components` (SFCs) 적용 시                    |
| **TypeScript 밀착 연동**                 | ✅ 고도의 타입 안전, 엄격한 사전 타입 자동 빌드                                                 | ⚠️ 기본 지원; 엄격한 검사를 위해 수동 설정 필수                                                         | ✅ 양호하나 비교적 유연한 편                                                                      | ⚠️ 기본 타입 지원, 별도 구성 필요                         | ✅ 양호                                                                                                 | ⚠️ 기본 지원                                                                                            | ✅ 양호 (타입 사용 가능; 키의 철저한 안전 검사에는 추가 설정 요함) |
| **번역 누락 검출**                       | ✅ TypeScript 코드 경고 및 컴파일/빌드 시점에 에러/경고 표시                                    | ⚠️ 대부분 런타임에 대체(Fallback) 텍스트로 대체 처리                                                    | ⚠️ 런타임 대체 텍스트 처리                                                                        | ⚠️ 별도의 복잡한 도구 설정 요구                           | ⚠️ 런타임 대체 텍스트                                                                                   | ⚠️ 런타임 대체 텍스트                                                                                   | ⚠️ 런타임 대체 텍스트 및 경고 (구성 가능)                          |
| **리ッチ 콘텐츠(JSX/Markdown/컴포넌트)** | ✅ 즉시 직접 결합 지원                                                                          | ⚠️ 제한적 / 변수 보간 기능 중심                                                                         | ⚠️ ICU 마크업 구문 활용, 실제 React JSX 아님                                                      | ⚠️ 제한적                                                 | ❌ 리치 컴포넌트 임베딩을 고려해 설계되지 않음                                                          | ⚠️ 제한적                                                                                               | ⚠️ 제한적 (컴포넌트는 `<i18n-t>`, 마크다운은 플러그인 이용)        |
| **AI 연동 번역**                         | ✅ 예, 다양한 상용 AI API 탑재 가능. 개발자 키 사용. 앱의 문맥 구조와 컴포넌트 관계를 통합 판단 | ❌ 아니오                                                                                               | ❌ 아니오                                                                                         | ❌ 아니오                                                 | ❌ 아니오                                                                                               | ❌ 아니오                                                                                               | ❌ 아니오                                                          |
| **비주얼 편집 도구**                     | ✅ 예, 로컬 비주얼 에디터 + 원격 헤드리스 CMS 무료 지원; 사전 딕셔너리 이식 가능                | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도                                                 | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도                                           | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도   | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도                                                 | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도                                                 | ❌ 지원 불가 / 유료 외부 번역 대행 플랫폼으로 별도 유도            |
| **로컬라이즈 라우팅**                    | ✅ 예, 정교한 다국어 주소 라우팅 기본 결합 (Next.js & Vite와 매끄럽게 호환)                     | ⚠️ 기본 내장 없음, 복잡한 플러그인(예: `next-i18next`)이나 별도 커스텀 구현 필수                        | ❌ 지원 안 함, 메시지 포맷만 지원하며 주소 라우팅은 수동 설계 필요                                | ⚠️ 기본 내장 없음, 플러그인 연동 및 복잡한 수동 구성 필요 | ✅ 내장 지원, Next App Router의 `[locale]` 세그먼트 완벽 호환                                           | ✅ 내장 지원                                                                                            | ✅ 내장 지원                                                       |
| **동적 다국어 경로 생성**                | ✅ 예                                                                                           | ⚠️ 플러그인 생태계 혹은 수동 구현 필수                                                                  | ❌ 제공되지 않음                                                                                  | ⚠️ 플러그인 연동/수동 구현                                | ✅ 예                                                                                                   | ✅ 예                                                                                                   | ❌ 제공되지 않음 (Nuxt i18n 환경은 제공)                           |
| **복수형 처리(Pluralization)**           | ✅ 열거형 패턴 중심의 고급 제어                                                                 | ✅ 플러그인 결합(i18next-icu 등) 시 가능                                                                | ✅ (ICU 구문 지원)                                                                                | ✅ (ICU/messageformat 규격)                               | ✅ 안정적인 복수형 제어                                                                                 | ✅ 안정적인 복수형 제어                                                                                 | ✅ 기본 제공 복수형 처리 구문                                      |
| **기본 포맷팅 (날짜, 수치, 통화 등)**    | ✅ 네이티브 Intl 기반 최적화 포맷터                                                             | ⚠️ 플러그인 연동 또는 수동으로 Intl 연계 구현                                                           | ✅ ICU 규격 포맷터 제공                                                                           | ✅ ICU 규격 / CLI 제공                                    | ✅ 안정적 지원 (Intl 연계)                                                                              | ✅ 안정적 지원 (Intl 연계)                                                                              | ✅ 날짜/숫자 포맷터 내장 (Intl)                                    |
| **콘텐츠 포맷 규격**                     | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 릴리즈 예정)                                        | ⚠️ .json                                                                                                | ✅ .json, .js                                                                                     | ⚠️ .po, .json                                             | ✅ .json, .js, .ts                                                                                      | ⚠️ .json                                                                                                | ✅ .json, .js                                                      |
| **ICU 문법 지원**                        | ⚠️ 배포 준비 중                                                                                 | ⚠️ 플러그인 연동 (i18next-icu)                                                                          | ✅ 예                                                                                             | ✅ 예                                                     | ✅ 예                                                                                                   | ⚠️ 플러그인 연동 (`i18next-icu`)                                                                        | ⚠️ 커스텀 포맷터나 번역용 빌더 구성 필요                           |
| **SEO 최적화 도구 (hreflang, sitemap)**  | ✅ 다국어 사이트맵, robots.txt, 메타데이터 연동 헬퍼 기본 탑재                                  | ⚠️ 커뮤니티 플러그인 탐색 및 수동 설계                                                                  | ❌ 코어 미지원                                                                                    | ❌ 코어 미지원                                            | ✅ 양호                                                                                                 | ✅ 양호                                                                                                 | ❌ 코어 미지원 (Nuxt i18n 라이브러리는 헬퍼 제공)                  |
| **커뮤니티 및 개발 생태계**              | ⚠️ 작지만 빠른 릴리즈 및 개발사의 고도로 민첩한 응대                                            | ✅ 극히 거대하고 오랜 기간 성숙됨                                                                       | ✅ 거대함                                                                                         | ⚠️ 소규모                                                 | ✅ 중간 규모, Next.js 프레임워크 타겟 편중                                                              | ✅ 중간 규모, Next.js 프레임워크 타겟 편중                                                              | ✅ Vue 개발 에코시스템 내 지배적인 점유율                          |
| **SSR 및 React 서버 컴포넌트**           | ✅ 예, SSR 및 RSC 서버/클라이언트 동일 훅으로 매끄럽게 작동 설계                                | ⚠️ 페이지 단위는 지원되나, 하위 서버 컴포넌트 딕셔너리 공유를 위해 t 함수를 수동으로 계속 흘려주어야 함 | ⚠️ 복잡한 구성 수반, 하위 서버 컴포넌트 딕셔너리 공유를 위해 t 함수를 수동으로 계속 흘려주어야 함 | ✅ 지원, 별도 아키텍처 설정 필요                          | ⚠️ 페이지 단위는 지원되나, 하위 서버 컴포넌트 딕셔너리 공유를 위해 t 함수를 수동으로 계속 흘려주어야 함 | ⚠️ 페이지 단위는 지원되나, 하위 서버 컴포넌트 딕셔너리 공유를 위해 t 함수를 수동으로 계속 흘려주어야 함 | ✅ Nuxt/Vue SSR 기반의 SSR 지원 (RSC 미지원)                       |
| **트리 셰이킹 (용량 효율화)**            | ✅ 예, 빌드 시점에 Babel/SWC 컴파일러 플러그인을 통한 컴포넌트별 용량 정밀 제어                 | ⚠️ 대개 전체 언어 사전 로드 (네임스페이스 분할로 일부 대응 가능하나 번거로움)                           | ⚠️ 대개 모든 다국어 정의가 통째로 브라우저에 배포                                                 | ❌ 기본 활성 미지원                                       | ⚠️ 일부 로케일 분리 대응 가능                                                                           | ⚠️ 일부 로케일 분리 대응 가능                                                                           | ⚠️ 부분 지원 (코드 스플리팅 적용 시 가능)                          |
| **지연 로딩 (Lazy Loading)**             | ✅ 예, 로케일별 / 사전 파일별 정교한 분리 로딩                                                  | ✅ 예 (외부 사전 로더 등 결합 시)                                                                       | ✅ 예 (언어 파일 사전 빌드 분리)                                                                  | ✅ 예 (사전 카탈로그 비동기 임포트)                       | ✅ 예 (경로 단위 분할 가능), 네임스페이스 수동 분할 작업이 복잡함                                       | ✅ 예 (경로 단위 분할 가능), 네임스페이스 수동 분할 작업이 복잡함                                       | ✅ 예 (로케일 메시지 비동기 임포트)                                |
| **미사용 언어 사전 정리 (Purge)**        | ✅ 예, 빌드 시 컴파일러가 미사용 사전을 전수 파악해 번들 대상서 축출                            | ❌ 지원 불가, 수작업 네임스페이스 격리 필수                                                             | ❌ 지원 불가, 모든 다국어 선언이 빌드 번들에 편입                                                 | ✅ 예, 빌드 시 코드 내 미사용 키를 검사하여 파일서 소거   | ❌ 지원 불가, 네임스페이스 수작업 격리 및 번거로운 구성 수반                                            | ❌ 지원 불가, 네임스페이스 수작업 격리 및 번거로운 구성 수반                                            | ❌ 지원 불가, 레이지 로딩 직접 구성 외에는 수동 통제 불가          |
| **대규모 프로젝트 확장 제어**            | ✅ 개별 컴포넌트와 사전이 귀속되어 마이크로 아키텍처 및 디자인 시스템 최적화                    | ⚠️ 높은 파일 디렉토리 보존 훈련 요구                                                                    | ⚠️ 중앙화된 대용량 사전 파일이 극단적으로 팽창 가능                                               | ⚠️ 점진적으로 의존성 관리가 꼬이기 쉬움                   | ✅ 폴더 구조 구성 시 일부 대응 가능                                                                     | ✅ 폴더 구조 구성 시 일부 대응 가능                                                                     | ✅ Vue Router 및 Nuxt i18n 모듈과의 아키텍처 연계 필요             |

## GitHub Star 연혁

GitHub Star 수는 프로젝트의 인지도, 커뮤니티의 신뢰도 및 장기적인 생명력을 파악하는 중요한 척도입니다. 이것이 서비스 모듈의 기술적 안전성을 100% 대변하는 절대 지표는 아니지만, 얼마나 많은 실무 개발자들이 해당 솔루션을 검토하고 관심을 가지고 적극적으로 프로젝트 도입을 추진하는지 투명하게 반증합니다. Intlayer의 Star 연혁을 비교해 보면, 타 솔루션 대비 얼마나 빠르게 성장하며 생태계를 확장하고 있는지 그 추세를 정밀히 비교해 보실 수 있습니다.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## 상호 운용성

`intlayer`는 기존의 `react-intl`, `react-i18next`, `next-intl`, `next-i18next` 및 `vue-i18n` 사전 네임스페이스들을 동시에 손쉽게 지배하고 가공하도록 지원합니다.

`intlayer` 문법 형태로 다국어를 간편히 선언만 해두면, intlayer가 번거롭고 복잡한 기존 프레임워크 규격(예: `/messages/{{locale}}/{{namespace}}.json`)에 맞춰 빌드 타임에 자동으로 사전 파일을 추출 및 변환해 줍니다.

현재 사용 중인 i18n 라이브러리의 API를 그대로 유지하고 싶다면, `intlayer`는 **호환 어댑터(compat adapters)** 도 제공합니다. `react-i18next`, `next-intl`, `react-intl`, `vue-i18n` 등과 완전히 동일한 API를 노출하지만, 실제 콘텐츠는 Intlayer 사전에서 제공되는 패키지입니다. 덕분에 코드를 다시 작성하지 않고 점진적으로 마이그레이션할 수 있습니다. [호환 어댑터 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 참고하세요.

## 자주 묻는 질문

<FAQ>

<Question title="JavaScript 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

이 분야는 크게 세 세대로 공존하고 있습니다:

- **런타임 카탈로그 라이브러리**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`, `svelte-i18n`. 메시지가 런타임에 로드되는 JSON 네임스페이스에 존재합니다. 성숙하고 프레임워크에 구애받지 않지만 타입이 없고 번들 전체가 페이지에 전달됩니다.
- **컴파일 타임 메시지 라이브러리**: `Lingui`, `Paraglide`, 그리고 추출 단계를 거치는 `react-intl`, `next-intl`. 더 나은 번들 동작과 일부 타입 검사를 제공하지만 여전히 중앙 집중식 카탈로그에 의존합니다.
- **콘텐츠 레이어 라이브러리**: `Intlayer`. 컴포넌트별로 콘텐츠를 선언하고 컴파일하므로 타입 안전성, 트리 쉐이킹(tree-shaking), 편집 도구 및 AI 번역이 모두 동일한 선언에서 제공됩니다.

</Question>

<Question title="i18n이 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 서버 렌더링 마크업은 서버에서 콘텐츠를 확인하고, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거됩니다. [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 i18next, next-intl 또는 react-i18next에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md) 또는 [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)를 따라 점진적으로 이전할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다: [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` 및 `Lingui`와 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 컴포넌트 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 소스 파일을 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다. 정적 분석으로 작동하므로 런타임에만 존재하는 문자열은 제외되며, 사용자 텍스트와 애플리케이션 로직을 구분하기 위해 몇 가지 주석이 필요합니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="Intlayer는 next-intl과 어떻게 다른가요?">

`next-intl`은 Next.js를 위한 메시지 계층입니다: 로케일별로 JSON 메시지 파일을 유지하고 `useTranslations`를 통해 읽습니다. Intlayer는 콘텐츠 계층입니다: 선언이 컴포넌트 바로 옆에 위치하며, 선언 자체에서 타입이 지정되고, 컴포넌트별로 컴파일되므로 페이지는 렌더링하는 데 필요한 것만 전달합니다. 또한 Intlayer는 `next-intl`이 다루지 않는 AI 번역, 비주얼 에디터, CMS 및 CI에서의 누락 번역 검사를 모두 기본 제공합니다. `next-intl` API를 그대로 유지하고 싶다면 [호환 어댑터(compat adapter)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 통해 Intlayer 사전에서 이를 제공받을 수 있습니다.

</Question>

<Question title="Intlayer는 i18next 및 react-i18next와 어떻게 다른가요?">

`i18next`는 런타임에 네임스페이스에 대해 문자열 키를 확인하므로 키 이름이 변경되거나 오타가 발생하면 조용히 실패하며 페이지가 접근하는 모든 네임스페이스가 통째로 다운로드됩니다. Intlayer는 빌드 타임에 생성된 타입에 대해 콘텐츠를 확인하므로 잘못된 키는 컴파일 오류가 되며 컴포넌트가 렌더링하는 항목만 번들에 포함됩니다. `i18next`는 더 큰 플러그인 생태계와 오랜 역사를 가지고 있지만, Intlayer는 정밀한 타입 검사, 번들 최적화, 그리고 비주얼 편집 및 자동화 도구에서 압도적인 장점을 제공합니다. [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md) 또는 [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 참조하세요.

</Question>

<Question title="Intlayer는 다른 대안들보다 더 빠르고 가볍나요?">

번들 및 페이지 크기 측면에서 확실히 그렇습니다. 페이지에서 렌더링하지 않는 카탈로그를 로드하지 않음으로써 네임스페이스 기반 설정 대비 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)에서는 [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md) 등 각 프레임워크별 측정 방법과 수치를 투명하게 공개하고 있어 직접 재현해 볼 수 있습니다.

</Question>

<Question title="기존 앱을 마이그레이션할 가치가 있나요?">

현재 프로젝트가 겪고 있는 병목에 따라 다릅니다. 번들 크기 증가, 조용히 누락되는 번역 오류, 또는 개발자의 도움 없이는 작업할 수 없는 번역팀과의 협업이 고민이라면 마이그레이션은 충분한 가치가 있습니다. 카탈로그가 작고 안정적이라면 체감 효과는 상대적으로 적을 수 있습니다. 어떤 경우든 전면 재작성 없이 이전할 수 있습니다: [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 현재 API를 그대로 유지해 주며, [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 두 계층이 공존하는 동안 기존 JSON 파일을 단일 진실 공급원으로 유지해 줍니다.

</Question>

<Question title="다른 i18n 라이브러리에는 없는 Intlayer만의 특별한 기능은 무엇인가요?">

[Markdown 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), [외부 소스에서 가져온 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 파일 콘텐츠 로딩, [실시간 콘텐츠 업데이트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md), [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md), 기존 컴포넌트에서 콘텐츠를 추출하는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md), A/B 테스트를 위한 [콘텐츠 변형(content variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md), 콘텐츠 노출 [애널리틱스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/analytics.md), [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md) 및 [에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)을 제공합니다.

</Question>

<Question title="현재 사용 중인 라이브러리를 유지하면서 Intlayer를 번역 관리 도구로만 사용할 수 있나요?">

네. Intlayer는 현재 라이브러리가 요구하는 형식과 위치(예: `/messages/{locale}/{namespace}.json`)로 네임스페이스를 생성할 수 있으므로, 애플리케이션 코드는 기존 i18n 라이브러리를 그대로 사용하면서 AI 번역, 비주얼 에디터 및 CI 검사 기능의 혜택을 누릴 수 있습니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
