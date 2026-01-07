---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Intlayer CMS에 콘텐츠 외부화하기
description: 콘텐츠 관리를 팀에 위임하기 위해 Intlayer CMS에 콘텐츠를 외부화하세요.
keywords:
  - CMS
  - 비주얼 에디터
  - 국제화
  - 문서화
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: 라이브 동기화 문서 추가
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` 필드를 `liveSync`로 교체
  - version: 5.5.10
    date: 2025-06-29
    changes: 이력 초기화
---

# Intlayer 콘텐츠 관리 시스템(CMS) 문서

<iframe title="웹 앱을 위한 비주얼 에디터 + CMS: Intlayer 설명" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS는 Intlayer 프로젝트의 콘텐츠를 외부화할 수 있게 해주는 애플리케이션입니다.

이를 위해 Intlayer는 '원격 사전(distant dictionaries)' 개념을 도입했습니다.

![Intlayer CMS 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 원격 사전 이해하기

Intlayer는 '로컬(local)' 사전과 '원격(distant)' 사전을 구분합니다.

- '로컬' 사전은 Intlayer 프로젝트 내에 선언된 사전입니다. 예를 들어 버튼의 선언 파일이나 내비게이션 바가 이에 해당합니다. 이 경우 콘텐츠가 자주 변경되지 않기 때문에 콘텐츠를 외부화하는 것은 의미가 없습니다.

- '원격' 사전은 Intlayer CMS를 통해 관리되는 사전입니다. 이는 팀이 웹사이트에서 직접 콘텐츠를 관리할 수 있도록 하며, 또한 A/B 테스트 기능과 SEO 자동 최적화를 활용하는 데 목적이 있습니다.

## 비주얼 에디터 vs CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 에디터는 로컬 사전을 위한 시각적 편집기에서 콘텐츠를 관리할 수 있는 도구입니다. 변경이 이루어지면, 콘텐츠는 코드베이스에서 교체됩니다. 이는 애플리케이션이 재빌드되고 페이지가 새 콘텐츠를 표시하기 위해 다시 로드된다는 것을 의미합니다.

반면에, Intlayer CMS는 원격 사전을 위한 시각적 편집기에서 콘텐츠를 관리할 수 있는 도구입니다. 변경이 이루어져도 콘텐츠는 코드베이스에 영향을 주지 않습니다. 그리고 웹사이트는 변경된 콘텐츠를 자동으로 표시합니다.

## 통합하기

패키지 설치 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하세요:

### Next.js와 통합하기

Next.js와 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App과 통합하기

Create React App과 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React와 통합하기

Vite + React와 통합하려면 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

## 구성

Intlayer CMS에 로그인하려면 다음 명령을 실행하세요:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bunx intlayer login
```

이렇게 하면 기본 브라우저가 열려 인증 프로세스를 완료하고 Intlayer 서비스를 사용하는 데 필요한 자격 증명(Client ID 및 Client Secret)을 받을 수 있습니다.

Intlayer 구성 파일에서 CMS 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 필수
     *
     * 애플리케이션의 URL입니다.
     * 이 URL은 시각적 편집기가 대상으로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 편집기를 활성화하려면 클라이언트 ID와 클라이언트 시크릿이 필요합니다.
     * 이를 통해 콘텐츠를 편집하는 사용자를 식별할 수 있습니다.
     * Intlayer 대시보드 - 프로젝트(https://app.intlayer.org/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우, CMS의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://intlayer.org 로 설정되어 있습니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우, 백엔드의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 백엔드 URL입니다.
     * 기본값은 https://back.intlayer.org 로 설정되어 있습니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * 애플리케이션의 URL입니다.
     * 이 URL은 시각적 편집기가 대상으로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 편집기를 활성화하려면 클라이언트 ID와 클라이언트 시크릿이 필요합니다.
     * 이를 통해 콘텐츠를 편집하는 사용자를 식별할 수 있습니다.
     * Intlayer 대시보드 - 프로젝트(https://app.intlayer.org/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
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
     * 기본값은 https://intlayer.org 로 설정되어 있습니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 백엔드의 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://back.intlayer.org 로 설정되어 있습니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * 애플리케이션의 URL입니다.
     * 시각적 편집기가 대상으로 하는 URL입니다.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 필수
     *
     * 에디터를 활성화하려면 클라이언트 ID와 클라이언트 시크릿이 필요합니다.
     * 이를 통해 콘텐츠를 편집하는 사용자를 식별할 수 있습니다.
     * Intlayer 대시보드 - 프로젝트(https://app.intlayer.org/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
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
     * 기본값은 https://intlayer.org 로 설정되어 있습니다.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 선택 사항
     *
     * Intlayer CMS를 자체 호스팅하는 경우 백엔드 URL을 설정할 수 있습니다.
     *
     * Intlayer CMS의 URL입니다.
     * 기본값은 https://back.intlayer.org 로 설정되어 있습니다.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> 클라이언트 ID와 클라이언트 시크릿이 없는 경우, [Intlayer 대시보드 - 프로젝트](https://app.intlayer.org/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 확인하려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## CMS 사용하기

### 구성 푸시하기

Intlayer CMS를 구성하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/intlayer_cli.md) 명령어를 사용할 수 있습니다.

```bash
npx intlayer config push
```

> `intlayer.config.ts` 구성 파일에서 환경 변수를 사용하는 경우, `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash
npx intlayer config push --env production
```

이 명령어는 구성을 Intlayer CMS에 업로드합니다.

### 사전 푸시하기

로케일 사전을 원격 사전으로 변환하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/intlayer_cli.md) 명령어를 사용할 수 있습니다.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 구성 파일에서 환경 변수를 사용하는 경우 `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 합니다.

### 사전 편집

그런 다음 [Intlayer CMS](https://app.intlayer.org/content)에서 사전을 보고 관리할 수 있습니다.

## 라이브 동기화

라이브 동기화는 앱이 런타임에 CMS 콘텐츠 변경 사항을 반영할 수 있게 합니다. 재빌드나 재배포가 필요 없습니다. 활성화되면 업데이트가 라이브 동기화 서버로 스트리밍되어 애플리케이션이 읽는 사전을 갱신합니다.

> Live Sync는 지속적인 서버 연결이 필요하며 엔터프라이즈 플랜에서만 사용할 수 있습니다.

Intlayer 구성을 업데이트하여 Live Sync를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 변경 사항이 감지되면 로케일 구성을 핫 리로딩할 수 있도록 활성화합니다.
     * 예를 들어, 사전이 추가되거나 업데이트되면 애플리케이션이
     * 페이지에 표시되는 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에,
     * `enterprise` 플랜 고객에게만 제공됩니다.
     *
     * 기본값: false
     */
    liveSync: true,
  },
  build: {
    /**
     * 사전이 어떻게 가져오는지를 제어합니다:
     *
     * - "live": 사전은 Live Sync API를 사용하여 동적으로 가져옵니다.
     *   useIntlayer를 useDictionaryDynamic으로 대체합니다.
     *
     * 참고: 라이브 모드는 Live Sync API를 사용하여 사전을 가져옵니다. API 호출이
     * 실패하면 사전은 동적으로 가져옵니다.
     * 참고: 원격 콘텐츠가 있고 "live" 플래그가 있는 사전만 라이브 모드를 사용합니다.
     * 나머지는 성능을 위해 동적 모드를 사용합니다.
     */
    importMode: "live",
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
     * 변경 사항이 감지되면 로케일 구성을 핫 리로딩할 수 있도록 활성화합니다.
     * 예를 들어, 사전이 추가되거나 업데이트되면 애플리케이션이 페이지에 표시되는
     * 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하므로,
     * `enterprise` 플랜 클라이언트에서만 사용할 수 있습니다.
     *
     * 기본값: false
     */
    liveSync: true,
  },
  build: {
    /**
     * 사전이 어떻게 가져와지는지 제어합니다:
     *
     * - "live": 사전이 Live Sync API를 사용하여 동적으로 가져와집니다.
     *   useIntlayer를 useDictionaryDynamic으로 대체합니다.
     *
     * 참고: 라이브 모드는 Live Sync API를 사용하여 사전을 가져옵니다. API 호출이
     * 실패하면 사전은 동적으로 가져와집니다.
     * 참고: 원격 콘텐츠가 있고 "live" 플래그가 설정된 사전만 라이브 모드를 사용합니다.
     * 나머지는 성능을 위해 동적 모드를 사용합니다.
     */
    importMode: "live",
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
     * 변경 사항이 감지되면 로케일 구성을 핫 리로딩할 수 있습니다.
     * 예를 들어, 사전이 추가되거나 업데이트되면 애플리케이션이
     * 페이지에 표시되는 내용을 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에,
     * `enterprise` 플랜 클라이언트에서만 사용할 수 있습니다.
     *
     * 기본값: false
     */
    liveSync: true,

    /**
     * Live Sync 서버의 포트입니다.
     *
     * 기본값: 4000
     */
    liveSyncPort: 4000,

    /**
     * Live Sync 서버의 URL입니다.
     *
     * 기본값: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * 사전이 어떻게 임포트되는지 제어합니다:
     *
     * - "live": 사전은 Live Sync API를 사용하여 동적으로 가져옵니다.
     *   useIntlayer를 useDictionaryDynamic으로 대체합니다.
     *
     * 참고: 라이브 모드는 Live Sync API를 사용하여 사전을 가져옵니다. API 호출이 실패하면
     * 사전은 동적으로 임포트됩니다.
     * 참고: 원격 콘텐츠와 "live" 플래그가 있는 사전만 라이브 모드를 사용합니다.
     * 다른 사전은 성능을 위해 동적 모드를 사용합니다.
     */
    importMode: "live",
  },
};

module.exports = config;
```

애플리케이션을 감싸기 위해 Live Sync 서버를 시작하세요:

Next.js 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Vite 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Live Sync 서버는 애플리케이션을 감싸고 도착하는 업데이트된 콘텐츠를 자동으로 적용합니다.

CMS로부터 변경 알림을 받기 위해, Live Sync 서버는 백엔드와 SSE 연결을 유지합니다. CMS에서 콘텐츠가 변경되면, 백엔드는 업데이트를 Live Sync 서버로 전달하고, Live Sync 서버는 새로운 사전을 기록합니다. 애플리케이션은 다음 탐색 또는 브라우저 새로고침 시 업데이트를 반영하며, 재빌드가 필요하지 않습니다.

플로우 차트 (CMS/백엔드 -> Live Sync 서버 -> 애플리케이션 서버 -> 프론트엔드):

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

작동 방식:

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### 개발 워크플로우 (로컬)

- 개발 중에는 애플리케이션이 시작될 때 모든 원격 사전을 가져오므로 업데이트를 빠르게 테스트할 수 있습니다.
- Next.js로 로컬에서 Live Sync를 테스트하려면 개발 서버를 래핑하세요:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Vite용
  },
}
```

개발 중에 Intlayer가 Live import 변환을 적용하도록 최적화를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

이 설정은 개발 서버를 Live Sync 서버와 래핑하고, 시작 시 원격 사전을 가져오며, CMS에서 SSE를 통해 업데이트를 스트리밍합니다. 변경 사항을 보려면 페이지를 새로 고치세요.

참고 사항 및 제약 조건:

- 라이브 싱크 출처를 사이트 보안 정책(CSP)에 추가하세요. 라이브 싱크 URL이 `connect-src`(및 관련이 있다면 `frame-ancestors`)에 허용되어 있는지 확인하세요.
- 라이브 싱크는 정적 출력과 함께 작동하지 않습니다. Next.js의 경우, 런타임에 업데이트를 받으려면 페이지가 동적이어야 합니다(예: 전체 정적 전용 제약을 피하기 위해 `generateStaticParams`, `generateMetadata`, `getServerSideProps` 또는 `getStaticProps`를 적절히 사용).
- CMS에서 각 사전에는 `live` 플래그가 있습니다. `live=true`인 사전만 라이브 싱크 API를 통해 가져오며, 나머지는 동적으로 가져와 런타임에 변경되지 않습니다.
- `live` 플래그는 빌드 시 각 사전에 대해 평가됩니다. 빌드 시 원격 콘텐츠가 `live=true`로 표시되지 않았다면, 해당 사전에 대해 라이브 싱크를 활성화하려면 다시 빌드해야 합니다.
- 라이브 싱크 서버는 `.intlayer`에 쓸 수 있어야 합니다. 컨테이너 환경에서는 `/.intlayer`에 쓰기 권한이 있는지 확인하세요.

## 디버그

CMS에서 문제가 발생하면 다음을 확인하세요:

- 애플리케이션이 실행 중인지 확인하세요.

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 설정이 Intlayer 구성 파일에 올바르게 설정되어 있는지 확인하세요.
  - 필수 필드:
- 애플리케이션 URL은 에디터 구성(`applicationURL`)에 설정한 값과 일치해야 합니다.
- CMS URL

- 프로젝트 구성이 Intlayer CMS에 푸시되었는지 확인하세요.

- 비주얼 에디터는 iframe을 사용하여 웹사이트를 표시합니다. 웹사이트의 콘텐츠 보안 정책(CSP)이 CMS URL을 `frame-ancestors`로 허용하는지 확인하세요(기본값은 'https://intlayer.org'). 에디터 콘솔에서 오류가 있는지 확인하세요.
