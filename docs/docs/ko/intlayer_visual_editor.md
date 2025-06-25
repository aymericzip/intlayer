---
docName: intlayer_visual_editor
url: https://intlayer.org/doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer 비주얼 편집기 | 비주얼 편집기를 사용하여 콘텐츠를 편집합니다
description: Intlayer 편집기를 사용하여 다국어 웹사이트를 관리하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정하세요.
keywords:
  - 편집자
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Visual Editor Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor는 시각적 편집기를 사용하여 콘텐츠 선언 파일과 상호작용할 수 있도록 웹사이트를 래핑하는 도구입니다.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

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

- 웹사이트를 iframe에 표시하는 프론트엔드 애플리케이션. 웹사이트가 Intlayer를 사용하는 경우, 시각적 편집기는 콘텐츠를 자동으로 감지하고 상호작용할 수 있도록 합니다. 수정이 이루어지면 변경 사항을 다운로드할 수 있습니다.

- 다운로드 버튼을 클릭하면, 시각적 편집기가 서버에 요청을 보내 프로젝트 내에 선언된 콘텐츠 파일을 새 콘텐츠로 교체합니다.

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

## 구성

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * 시각적 편집기 서버가 사용하는 포트입니다.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 선택 사항
     * 기본값은 "http://localhost:8000"입니다.
     * 애플리케이션에서 접근할 수 있는 편집기 서버의 URL입니다. 보안상의 이유로 애플리케이션과 상호작용할 수 있는 출처를 제한하는 데 사용됩니다. `'*'`로 설정하면 모든 출처에서 편집기에 접근할 수 있습니다. 포트가 변경되거나 편집기가 다른 도메인에 호스팅되는 경우 설정해야 합니다.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 필수
     * 애플리케이션의 URL.
     * 시각적 편집기가 대상으로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
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
    /**
     * 선택 사항
     * 기본값은 `true`입니다. `false`로 설정하면 편집기가 비활성화되어 접근할 수 없습니다.
     * 보안상의 이유로 특정 환경(예: 프로덕션)에서 편집기를 비활성화하는 데 사용할 수 있습니다.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

2. 제공된 URL을 엽니다. 기본값은 `http://localhost:8000`입니다.

   Intlayer에 의해 색인된 각 필드를 커서를 사용하여 콘텐츠 위로 이동하면 볼 수 있습니다.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. 콘텐츠가 윤곽선으로 표시되면, 길게 눌러 편집 서랍을 표시할 수 있습니다.

## 디버그

시각적 편집기에서 문제가 발생하면 다음을 확인하세요:

- 시각적 편집기와 애플리케이션이 실행 중인지 확인하세요.

- Intlayer 구성 파일에서 [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 구성이 올바르게 설정되었는지 확인하세요.

  - 필수 필드:
    - 애플리케이션 URL은 편집기 구성(`applicationURL`)에 설정한 URL과 일치해야 합니다.

- 시각적 편집기는 iframe을 사용하여 웹사이트를 표시합니다. 웹사이트의 콘텐츠 보안 정책(CSP)이 CMS URL을 `frame-ancestors`로 허용하는지 확인하세요(기본값은 'http://localhost:8000'). 편집기 콘솔에서 오류를 확인하세요.
