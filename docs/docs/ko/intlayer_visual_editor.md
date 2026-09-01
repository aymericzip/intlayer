---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Intlayer 비주얼 편집기 | 비주얼 편집기를 사용하여 콘텐츠를 편집합니다
description: Intlayer 편집기를 사용하여 다국어 웹사이트를 관리하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정하세요.
keywords:
  - 편집기
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# Intlayer Visual Editor Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor는 시각적 편집기를 사용하여 콘텐츠 선언 파일과 상호작용할 수 있도록 웹사이트를 래핑하는 도구입니다.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며, React (Create React App), Vite + React, Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

## 시각적 편집기 vs CMS

Intlayer Visual Editor는 로컬 사전(dictionary)을 위한 시각적 편집기에서 콘텐츠를 관리할 수 있는 도구입니다. 변경 사항이 이루어지면 콘텐츠가 코드베이스에서 교체됩니다. 즉, 애플리케이션이 다시 빌드되고 페이지가 새 콘텐츠를 표시하기 위해 다시 로드됩니다.

반면, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 원격 사전(dictionary)을 위한 시각적 편집기에서 콘텐츠를 관리할 수 있는 도구입니다. 변경 사항이 이루어지더라도 콘텐츠가 코드베이스에 영향을 미치지 않습니다. 그리고 웹사이트는 변경된 콘텐츠를 자동으로 표시합니다.

## 애플리케이션에 Intlayer 통합

Intlayer를 통합하는 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하세요:

### Next.js와 통합

Next.js와 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App과 통합

Create React App과 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React와 통합

Vite + React와 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

## Intlayer Editor 작동 방식

시각적 편집기는 두 가지 요소를 포함하는 애플리케이션입니다:

- 웹사이트를 iframe에 표시하는 프론트엔드 애플리케이션. 웹사이트가 Intlayer를 사용하는 경우, 시각적 편집기가 콘텐츠를 자동으로 감지하고 상호작용할 수 있도록 합니다. 수정이 이루어지면 변경 사항을 다운로드할 수 있습니다.

- 다운로드 버튼을 클릭하면, 시각적 편집기가 서버에 요청을 보내 프로젝트 내에 선언된 콘텐츠 선언 파일을 새 콘텐츠로 교체합니다.

> 현재 Intlayer Editor는 콘텐츠 선언 파일을 JSON 파일로 작성합니다.

## 설치

프로젝트에서 Intlayer가 구성된 후, `intlayer-editor`를 개발 의존성으로 설치하세요:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

`--with` 플래그를 사용하면 다른 명령과 병렬로 편집기를 시작할 수 있습니다:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## 구성

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 필수
     * 애플리케이션의 URL.
     * 시각적 편집기가 대상으로 하는 URL입니다.
     * 예: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`로 설정하면 편집기가 비활성화되어 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경(예: 프로덕션)에서 편집기를 비활성화하는 데 사용할 수 있습니다.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 선택 사항
     * 기본값은 `8000`입니다.
     * 편집기 서버의 포트입니다.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 선택 사항
     * 기본값은 "http://localhost:8000"입니다.
     * 편집기 서버의 URL입니다.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> 사용 가능한 모든 매개변수를 보려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## 편집기 사용

1. 편집기가 설치되면 다음 명령어를 사용하여 편집기를 시작할 수 있습니다:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **애플리케이션을 병렬로 실행해야 합니다.** 애플리케이션 URL은 편집기 구성(`applicationURL`)에 설정한 URL과 일치해야 합니다.

> **참고: 이 명령은 `intlayer` 패키지에서 재내보내집니다. 대신 `npx intlayer editor start`를 사용할 수 있습니다.**

2. 그런 다음 제공된 URL을 엽니다. 기본값은 `http://localhost:8000`입니다.

   Intlayer에 의해 색인된 각 필드를 커서를 사용하여 콘텐츠 위로 이동하면 볼 수 있습니다.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. 콘텐츠가 윤곽선으로 표시되면, 길게 눌러 편집 서랍을 표시할 수 있습니다.

## 환경 구성

편집기는 특정 환경 파일을 사용하도록 구성할 수 있습니다. 이는 개발과 프로덕션에서 동일한 구성 파일을 사용하려는 경우에 유용합니다.

특정 환경 파일을 사용하려면 편집기를 시작할 때 `--env-file` 또는 `-f` 플래그를 사용할 수 있습니다:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> 환경 파일은 프로젝트의 루트 디렉터리에 위치해야 합니다.

또는 `--env` 또는 `-e` 플래그를 사용하여 환경을 지정할 수 있습니다:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## 디버그

시각적 편집기에서 문제가 발생하면 다음을 확인하세요:

- 시각적 편집기와 애플리케이션이 실행 중인지 확인하세요.

- Intlayer 구성 파일에서 [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 구성이 올바르게 설정되었는지 확인하세요.
  - 필수 필드:
    - 애플리케이션 URL은 편집기 구성(`applicationURL`)에 설정한 URL과 일치해야 합니다.

- 비주얼 에디터는 iframe을 사용하여 웹사이트를 표시합니다. 웹사이트의 콘텐츠 보안 정책(CSP)이 CMS URL을 `frame-ancestors`로 허용하는지 확인하세요(기본값은 `http://localhost:8000`입니다). 에디터 콘솔에서 오류가 있는지 확인하세요.

## 자주 묻는 질문

<FAQ>

<Question title="비주얼 에디터와 CMS의 차이점은 무엇인가요?">

비주얼 에디터는 로컬 사전을 편집하고 변경 사항을 코드베이스에 다시 기록하므로 일반적인 코드 리뷰 및 배포 과정을 거칩니다. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 원격 사전을 편집하여 배포 없이 실행 중인 웹사이트에서 콘텐츠를 변경합니다. 에디터는 개발자가 소유하는 콘텐츠에 적합하며, CMS는 마케팅 팀이 소유하는 콘텐츠에 적합합니다.

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

<Question title="비주얼 에디터는 어디에서 실행되나요?">

사용자의 자체 인프라에서 실행됩니다. iframe 내에 애플리케이션을 로드하고 로컬 에디터 서버와 통신하므로 콘텐츠가 내부 환경 외부로 절대 유출되지 않습니다. 따라서 외부 호스팅 서비스로 사본을 보낼 수 없는 민감한 프로젝트에서도 안전하게 사용할 수 있습니다.

</Question>

<Question title="편집자가 코딩 지식을 알아야 하나요?">

아닙니다. 사이트를 열고 텍스트를 클릭하여 그 자리에서 직접 편집하면 됩니다. 에디터가 해당 텍스트를 지원하는 사전 항목을 확인하고 올바른 콘텐츠 파일에 변경 사항을 기록하므로 번역가가 파일을 직접 찾거나 키 이름을 알 필요가 없습니다.

</Question>

<Question title="비주얼 에디터를 통한 편집이 소스 파일을 변경하나요?">

네, 바로 그것이 의도된 동작입니다. 변경 사항이 코드베이스의 콘텐츠 선언 파일에 직접 기록되므로 일반적인 Git diff 형태로 검토하고 커밋할 수 있으며 애플리케이션이 다시 빌드되어 변경 사항을 화면에 표시합니다.

</Question>

<Question title="에디터에 빈 페이지가 표시되거나 사이트 로드를 거부합니다. 무엇을 확인해야 하나요?">

에디터는 iframe을 사용하여 애플리케이션을 표시하므로 콘텐츠 보안 정책(CSP)에서 에디터 출처를 `frame-ancestors`로 허용해야 합니다(기본값은 `http://localhost:8000`). 또한 에디터 구성의 `applicationURL`이 앱이 실제로 서비스되는 URL과 일치하는지 확인하세요. 에디터 콘솔에서 두 가지 실패 원인을 모두 확인할 수 있습니다.

</Question>

<Question title="프로덕션 환경에서 비주얼 에디터를 사용할 수 있나요?">

비주얼 에디터는 편집 후 재빌드가 허용되는 개발 및 스테이징 환경용으로 설계되었습니다. 배포 없이 실시간 사이트의 콘텐츠를 편집하려면 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)와 원격 사전을 사용하는 것이 좋습니다.

</Question>

<Question title="비주얼 에디터는 무료인가요?">

네. 비주얼 에디터는 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 오픈 소스 프로젝트의 일부로 제공됩니다. 호스팅형 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)만 유료 서비스이며, CMS 또한 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)이 가능합니다.

</Question>

</FAQ>
