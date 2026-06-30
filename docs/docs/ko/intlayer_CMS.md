---
createdAt: 2025-08-23
updatedAt: 2026-06-29
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
  - version: 9.0.0
    date: 2026-06-30
    changes: "Self-Hosting 섹션 추가: Docker Compose 부트스트랩, 서비스 인벤토리, SDK 구성, 선택적 기능 및 업그레이드 참고 사항"
  - version: 9.0.0
    date: 2026-06-29
    changes: "프로그래밍 방식 CMS 액세스를 위한 @intlayer/api SDK (createIntlayerCMS) 섹션 추가"
  - version: 6.0.1
    date: 2025-09-22
    changes: "라이브 동기화 문서 추가"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` 필드를 `liveSync`로 교체"
  - version: 5.5.10
    date: 2025-06-29
    changes: "이력 초기화"
author: aymericzip
---

# Intlayer 콘텐츠 관리 시스템(CMS) 문서

<iframe title="웹 앱을 위한 비주얼 에디터 + CMS: Intlayer 설명" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS는 Intlayer 프로젝트의 콘텐츠를 외부화할 수 있게 해주는 애플리케이션입니다.

이를 위해 Intlayer는 '원격 사전(distant dictionaries)' 개념을 도입했습니다.

![Intlayer CMS 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 목차

<TOC/>

---

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
bun x intlayer login
```

이렇게 하면 기본 브라우저가 열려 인증 프로세스를 완료하고 Intlayer 서비스를 사용하는 데 필요한 자격 증명(Client ID 및 Client Secret)을 받을 수 있습니다.

Intlayer 구성 파일에서 CMS 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 클라이언트 ID와 클라이언트 시크릿이 없는 경우, [Intlayer 대시보드 - 프로젝트](https://app.intlayer.org/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 확인하려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## CMS 사용하기

### 구성 푸시하기

Intlayer CMS를 구성하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/cli/index.md) 명령어를 사용할 수 있습니다.

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> `intlayer.config.ts` 구성 파일에서 환경 변수를 사용하는 경우, `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

이 명령어는 구성을 Intlayer CMS에 업로드합니다.

### 사전 푸시하기

로케일 사전을 원격 사전으로 변환하려면 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ko/cli/index.md) 명령어를 사용할 수 있습니다.

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 구성 파일에서 환경 변수를 사용하는 경우 `--env` 인수를 사용하여 원하는 환경을 지정할 수 있습니다:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 합니다.

### 사전 편집

그런 다음 [Intlayer CMS](https://app.intlayer.org/content)에서 사전을 보고 관리할 수 있습니다.

## `@intlayer/api` SDK를 사용한 프로그래밍 방식 액세스

CLI 및 시각적 편집기를 넘어, Intlayer는 [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) 패키지에 타입이 지정된 SDK를 제공합니다. 이를 통해 CMS를 **헤드리스 콘텐츠 데이터베이스**로 취급할 수 있습니다. 프로젝트를 가져오고, 사전을 가져오며, 자신만의 애플리케이션, 스크립트 또는 CI 파이프라인에서 직접 푸시하거나 업데이트할 수 있습니다.

SDK는 인증을 자동으로 처리합니다. `clientId` 및 `clientSecret`이 (Intlayer 구성 또는 환경에서) 사용 가능한 한, OAuth2 액세스 토큰을 자동으로 획득하고 새로 고치며 모든 요청에 서명합니다.

### 설치

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### 작동 방식: 인증기 + 엔드포인트

SDK는 번들 크기를 작게 유지하기 위해 의도적으로 **두 개의 개별 임포트**로 분리되어 있습니다:

1.  `createIntlayerCMS` — 경량 **인증기**를 생성합니다. 자격 증명과 관리되는 액세스 토큰만 포함하며, 특정 도메인에 대해서는 알지 못합니다.
2.  `dictionaryEndpoint`, `projectEndpoint`, … — 도메인별 **엔드포인트 바인더**로, 각각 자체 하위 경로 (`@intlayer/api/dictionary`, `@intlayer/api/project`, …)에서 임포트됩니다. 필요한 엔드포인트에 인증기를 전달합니다.

각 엔드포인트가 개별적으로 임포트되므로, 번들에는 실제로 사용하는 도메인만 포함됩니다. `dictionaryEndpoint`를 임포트해도 프로젝트, AI 또는 다른 도메인 클라이언트가 함께 포함되지 않습니다.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// 구성은 선택 사항입니다: 생략하면, 자격 증명은
// INTLAYER_CLIENT_ID 및 INTLAYER_CLIENT_SECRET 환경 변수를 해석하는
// `@intlayer/config/built`에서 읽어옵니다.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> CMS 자격 증명 (`clientId` / `clientSecret`)은 콘텐츠에 대한 **쓰기 권한**을 부여합니다. 인증기는 **서버 측**에서만 생성해야 합니다 (서버 액션, 라우트 핸들러, 스크립트, CI). 클라이언트 측 코드에 임포트하거나 브라우저에 자격 증명을 노출하지 마십시오.

빌드 시간 구성에 의존하지 않으려면 자격 증명을 명시적으로 전달하세요:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // 선택 사항, 자체 호스팅 백엔드의 경우:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> [Intlayer Dashboard - Projects](https://app.intlayer.org/projects)에서 새 액세스 키를 생성하여 자격 증명을 얻으세요.

### 프로젝트 가져오기

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// 자격 증명으로 액세스 가능한 프로젝트 목록을 가져옵니다.
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// 선택된 프로젝트의 통합된 현지화 인사이트를 읽습니다.
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### 사전 가져오기

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// 프로젝트의 모든 원격 사전을 나열합니다.
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// 또는 키로 단일 사전을 가져옵니다.
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### 사전 푸시 및 업데이트

CMS를 데이터베이스로 사용하여 콘텐츠를 다시 작성합니다:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// 새 사전을 생성합니다.
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// 사전 배치(batch)를 Upsert 합니다 (한 번의 호출로 생성 또는 업데이트).
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// 기존 사전을 업데이트합니다.
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> 팁: 바인딩된 엔드포인트를 재사용하여 반복을 피하세요:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### 단일 메서드 추출

모든 엔드포인트 메서드는 이미 인증되어 있으며 독립적입니다 (자체 토큰 처리 기능을 가짐). 따라서 메서드를 추출하여 전달할 수 있습니다. 예를 들어 종속성으로 주입하는 경우입니다.

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// 이미 인증됨 — 각 호출 시 토큰을 자동으로 새로 고칩니다.
export const pushDictionaries = dictionary.pushDictionaries;

// 사용 예시
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## 라이브 동기화

라이브 동기화는 앱이 런타임에 CMS 콘텐츠 변경 사항을 반영할 수 있게 합니다. 재빌드나 재배포가 필요 없습니다. 활성화되면 업데이트가 라이브 동기화 서버로 스트리밍되어 애플리케이션이 읽는 사전을 갱신합니다.

> Live Sync는 지속적인 서버 연결이 필요하며 엔터프라이즈 플랜에서만 사용할 수 있습니다.

Intlayer 구성을 업데이트하여 Live Sync를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
    /**
     * 사전이 어떻게 가져오는지를 제어합니다:
     *
     * - "fetch": 사전은 Live Sync API를 사용하여 동적으로 가져옵니다.
     *   useIntlayer를 useDictionaryDynamic으로 대체합니다.
     *
     * 참고: 라이브 모드는 Live Sync API를 사용하여 사전을 가져옵니다. API 호출이
     * 실패하면 사전은 동적으로 가져옵니다.
     * 참고: 원격 콘텐츠가 있고 "live" 플래그가 있는 사전만 라이브 모드를 사용합니다.
     * 나머지는 성능을 위해 동적 모드를 사용합니다.
     */
    importMode: "fetch",
  },
};

export default config;
```

애플리케이션을 감싸기 위해 Live Sync 서버를 시작하세요:

독립형 서버 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "live:start": "npx intlayer live",
  },
}
```

`--process` 인수를 사용하여 애플리케이션 서버를 병렬로 사용할 수도 있습니다.

Next.js 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync 서버는 애플리케이션을 감싸고 도착하는 업데이트된 콘텐츠를 자동으로 적용합니다.

CMS로부터 변경 알림을 받기 위해, Live Sync 서버는 백엔드와 SSE 연결을 유지합니다. CMS에서 콘텐츠가 변경되면, 백엔드는 업데이트를 Live Sync 서버로 전달하고, Live Sync 서버는 새로운 사전을 기록합니다. 애플리케이션은 다음 탐색 또는 브라우저 새로고침 시 업데이트를 반영하며, 재빌드가 필요하지 않습니다.

플로우 차트 (CMS/백엔드 -> Live Sync 서버 -> 애플리케이션 서버 -> 프론트엔드):

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

작동 방식:

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### 개발 워크플로우 (로컬)

- 개발 중에는 애플리케이션이 시작될 때 모든 원격 사전을 가져오므로 업데이트를 빠르게 테스트할 수 있습니다.
- Next.js로 로컬에서 Live Sync를 테스트하려면 개발 서버를 래핑하세요:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite용
  },
}
```

개발 중에 Intlayer가 Live import 변환을 적용하도록 최적화를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // 기본값: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

이 설정은 개발 서버를 Live Sync 서버와 래핑하고, 시작 시 원격 사전을 가져오며, CMS에서 SSE를 통해 업데이트를 스트리밍합니다. 변경 사항을 보려면 페이지를 새로 고치세요.

참고 사항 및 제약 조건:

- 라이브 싱크 출처를 사이트 보안 정책(CSP)에 추가하세요. 라이브 싱크 URL이 `connect-src`(및 관련이 있다면 `frame-ancestors`)에 허용되어 있는지 확인하세요.
- 라이브 싱크는 정적 출력과 함께 작동하지 않습니다. Next.js의 경우, 런타임에 업데이트를 받으려면 페이지가 동적이어야 합니다(예: 전체 정적 전용 제약을 피하기 위해 `generateStaticParams`, `generateMetadata`, `getServerSideProps` 또는 `getStaticProps`를 적절히 사용).
- CMS에서 각 사전에는 `live` 플래그가 있습니다. `live=true`인 사전만 라이브 싱크 API를 통해 가져오며, 나머지는 동적으로 가져와 런타임에 변경되지 않습니다.
- `live` 플래그는 빌드 시 각 사전에 대해 평가됩니다. 빌드 시 원격 콘텐츠가 `live=true`로 표시되지 않았다면, 해당 사전에 대해 라이브 싱크를 활성화하려면 다시 빌드해야 합니다.
- 라이브 싱크 서버는 `.intlayer`에 쓸 수 있어야 합니다. 컨테이너 환경에서는 `/.intlayer`에 쓰기 권한이 있는지 확인하세요.

## 자체 호스팅

Intlayer는 자체 인프라에서 완전히 실행될 수 있습니다. 한 줄의 명령어로 Docker Compose를 사용하여 전체 스택(대시보드, API, 데이터베이스, 객체 스토리지 및 이메일)을 부트스트랩할 수 있습니다:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

전체 설정 가이드, 환경 변수 참조, 업그레이드 지침 및 백업/복원 절차는 [자체 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)를 참조하세요.

---

## 디버그

CMS에서 문제가 발생하면 다음을 확인하세요:

- 애플리케이션이 실행 중인지 확인하세요.

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 설정이 Intlayer 구성 파일에 올바르게 설정되어 있는지 확인하세요.
  - 필수 필드:
- 애플리케이션 URL은 에디터 구성(`applicationURL`)에 설정한 값과 일치해야 합니다.
- CMS URL

- 프로젝트 구성이 Intlayer CMS에 푸시되었는지 확인하세요.

- 비주얼 에디터는 iframe을 사용하여 웹사이트를 표시합니다. 웹사이트의 콘텐츠 보안 정책(CSP)이 CMS URL을 `frame-ancestors`로 허용하는지 확인하세요(기본값은 'https://app.intlayer.org'). 에디터 콘솔에서 오류가 있는지 확인하세요.
