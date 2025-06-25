---
docName: intlayer_CMS
url: /doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer CMS | Intlayer CMS에 콘텐츠를 외부화합니다
description: Intlayer CMS에 콘텐츠를 외부화하여 콘텐츠의 관리를 팀에게 위임합니다.
keywords:
  - CMS
  - 비주얼 편집기
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer 콘텐츠 관리 시스템 (CMS) 문서

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS는 Intlayer 프로젝트의 콘텐츠를 외부화할 수 있는 애플리케이션입니다.

이를 위해 Intlayer는 '원격 사전'이라는 개념을 도입합니다.

![Intlayer CMS 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 원격 사전 이해하기

Intlayer는 '로컬' 사전과 '원격' 사전을 구분합니다.

- '로컬' 사전은 Intlayer 프로젝트에서 선언된 사전입니다. 버튼 선언 파일이나 네비게이션 바와 같은 것들입니다. 이 경우 콘텐츠를 외부화하는 것은 큰 의미가 없는데, 이는 이 콘텐츠가 자주 변경되지 않을 것이기 때문입니다.

- '원격' 사전은 Intlayer CMS를 통해 관리되는 사전입니다. 이는 팀이 웹사이트에서 직접 콘텐츠를 관리할 수 있도록 하거나, A/B 테스트 기능 및 SEO 자동 최적화를 사용하는 데 유용할 수 있습니다.

## 비주얼 에디터 vs CMS

[Intlayer 비주얼](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md) 에디터는 로컬 사전을 위한 비주얼 에디터에서 콘텐츠를 관리할 수 있는 도구입니다. 변경이 이루어지면 콘텐츠는 코드베이스에서 대체됩니다. 이는 애플리케이션이 다시 빌드되고 페이지가 새 콘텐츠를 표시하기 위해 다시 로드된다는 것을 의미합니다.

반면, Intlayer CMS는 원격 사전을 위한 비주얼 에디터에서 콘텐츠를 관리할 수 있는 도구입니다. 변경이 이루어지면 콘텐츠는 **코드베이스에 영향을 미치지 않습니다.** 그리고 웹사이트는 변경된 콘텐츠를 자동으로 표시합니다.

## 통합

패키지 설치 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하세요:

### Next.js와 통합

Next.js와의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App과 통합

Create React App과의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React와 통합

Vite + React와의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

## 설정

Intlayer 설정 파일에서 CMS 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 다른 설정
  editor: {
    /**
     * 필수
     *
     * 애플리케이션의 URL입니다.
     * 이는 비주얼 에디터가 타겟팅하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 클라이언트 ID와 클라이언트 비밀 키는 에디터를 활성화하는 데 필요합니다.
     * 이는 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트(https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 CMS의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://intlayer.org로 설정됩니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 백엔드의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://back.intlayer.org로 설정됩니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 설정
  editor: {
    /**
     * 필수
     *
     * 애플리케이션의 URL입니다.
     * 이는 비주얼 에디터가 타겟팅하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 클라이언트 ID와 클라이언트 비밀 키는 에디터를 활성화하는 데 필요합니다.
     * 이는 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트(https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 CMS의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://intlayer.org로 설정됩니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 백엔드의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://back.intlayer.org로 설정됩니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 설정
  editor: {
    /**
     * 필수
     *
     * 애플리케이션의 URL입니다.
     * 이는 비주얼 에디터가 타겟팅하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 클라이언트 ID와 클라이언트 비밀 키는 에디터를 활성화하는 데 필요합니다.
     * 이는 콘텐츠를 편집하는 사용자를 식별할 수 있도록 합니다.
     * Intlayer 대시보드 - 프로젝트(https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 CMS의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://intlayer.org로 설정됩니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 백엔드의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://back.intlayer.org로 설정됩니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> 클라이언트 ID와 클라이언트 비밀 키가 없는 경우, [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## CMS 사용하기

### 설정 푸시하기

Intlayer CMS를 설정하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/intlayer_cli.md) 명령어를 사용할 수 있습니다.

```bash
npx intlayer config push
```

> `intlayer.config.ts` 설정 파일에서 환경 변수를 사용하는 경우, `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash
npx intlayer config push --env production
```

이 명령은 설정을 Intlayer CMS에 업로드합니다.

### 사전 푸시하기

로컬 사전을 원격 사전으로 변환하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/intlayer_cli.md) 명령어를 사용할 수 있습니다.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 설정 파일에서 환경 변수를 사용하는 경우, `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 만듭니다.

### 사전 편집하기

그런 다음 [Intlayer CMS](https://intlayer.org/dashboard/content)에서 사전을 보고 관리할 수 있습니다.

## 핫 리로딩

Intlayer CMS는 변경 사항이 감지되면 사전을 핫 리로드할 수 있습니다.

핫 리로딩 없이 새 콘텐츠를 표시하려면 애플리케이션을 다시 빌드해야 합니다.

[`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) 설정을 활성화하면 변경된 콘텐츠가 감지될 때 애플리케이션이 자동으로 업데이트된 콘텐츠를 대체합니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 다른 설정
  editor: {
    // ... 다른 설정

    /**
     * 애플리케이션이 변경 사항이 감지될 때 로컬 설정을 핫 리로드해야 하는지 여부를 나타냅니다.
     * 예를 들어, 새 사전이 추가되거나 업데이트되면 애플리케이션이 페이지에 표시할 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에 `enterprise` 플랜의 클라이언트만 사용할 수 있습니다.
     *
     * 기본값: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 설정
  editor: {
    // ... 다른 설정

    /**
     * 애플리케이션이 변경 사항이 감지될 때 로컬 설정을 핫 리로드해야 하는지 여부를 나타냅니다.
     * 예를 들어, 새 사전이 추가되거나 업데이트되면 애플리케이션이 페이지에 표시할 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에 `enterprise` 플랜의 클라이언트만 사용할 수 있습니다.
     *
     * 기본값: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 다른 설정
  editor: {
    // ... 다른 설정

    /**
     * 애플리케이션이 변경 사항이 감지될 때 로컬 설정을 핫 리로드해야 하는지 여부를 나타냅니다.
     * 예를 들어, 새 사전이 추가되거나 업데이트되면 애플리케이션이 페이지에 표시할 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에 `enterprise` 플랜의 클라이언트만 사용할 수 있습니다.
     *
     * 기본값: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

핫 리로딩은 서버 및 클라이언트 측 모두에서 콘텐츠를 대체합니다.

- 서버 측에서는 애플리케이션 프로세스가 `.intlayer/dictionaries` 디렉토리에 쓰기 권한이 있는지 확인해야 합니다.
- 클라이언트 측에서는 핫 리로딩을 통해 페이지를 다시 로드하지 않고도 브라우저에서 콘텐츠를 핫 리로드할 수 있습니다. 그러나 이 기능은 클라이언트 컴포넌트에서만 사용할 수 있습니다.

> 핫 리로딩은 `EventListener`를 사용하여 서버와의 지속적인 연결이 필요하기 때문에 `enterprise` 플랜의 클라이언트만 사용할 수 있습니다.

## 디버그

CMS에서 문제가 발생한 경우 다음을 확인하세요:

- 애플리케이션이 실행 중인지 확인합니다.

- Intlayer 설정 파일에서 [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 설정이 올바르게 설정되었는지 확인합니다.

  - 필수 필드:
    - 애플리케이션 URL은 에디터 설정(`applicationURL`)에 설정한 URL과 일치해야 합니다.
    - CMS URL

- 프로젝트 설정이 Intlayer CMS에 푸시되었는지 확인합니다.

- 비주얼 에디터는 iframe을 사용하여 웹사이트를 표시합니다. 웹사이트의 콘텐츠 보안 정책(CSP)이 CMS URL을 `frame-ancestors`로 허용하는지 확인하세요(기본값: 'https://intlayer.org'). 에디터 콘솔에서 오류를 확인하세요.
