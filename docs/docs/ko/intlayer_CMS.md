---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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
    date: 2026-07-08
    changes: "'라이브 동기화' 섹션을 별도 페이지(live-sync.md)로 이동하고, 여기에는 간단한 소개와 링크만 남김"
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

전체 설정 가이드(구성 활성화, Live Sync 서버 시작, 로컬 개발 워크플로, 제약 사항)는 [Live Sync 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/live-sync.md)를 참조하세요.

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

## 자주 묻는 질문

<FAQ>

<Question title="Intlayer CMS와 비주얼 에디터의 차이점은 무엇인가요?">

[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)는 로컬 사전을 편집하고 변경 사항을 코드베이스에 다시 기록하므로, 앱이 다시 빌드되고 정상적인 코드 리뷰 및 배포 과정을 거칩니다. CMS는 원격 사전을 편집합니다: 변경 사항이 코드베이스를 건드리지 않으며 실행 중인 웹사이트가 배포 없이 즉시 업데이트를 반영합니다. 팀에서는 두 가지를 함께 사용하는 경우가 많습니다. 즉, 개발자가 소유하는 UI 콘텐츠에는 에디터를 사용하고 마케팅 팀이 매주 변경하는 콘텐츠에는 CMS를 사용합니다.

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

<Question title="어떤 콘텐츠를 CMS로 이동해야 하나요?">

릴리스 주기와 무관하게 자주 변경되는 콘텐츠가 적합합니다: 랜딩 페이지 문구, 요금제 설명, 공지사항 등 마케팅 팀이 직접 관리하는 모든 항목이 여기에 해당합니다. 버튼 레이블이나 폼 오류 메시지와 같이 사용자 인터페이스의 필수적인 부분인 콘텐츠는 이를 사용하는 코드와 함께 검토될 수 있도록 로컬 사전으로 유지하는 것이 좋습니다.

</Question>

<Question title="CMS에 연결할 수 없으면 어떻게 되나요?">

애플리케이션은 사전의 로컬 선언으로 자동 폴백되므로 네트워크 장애나 서비스 중단이 발생하더라도 빈 페이지가 표시되지 않고 빌드 시 포함된 콘텐츠가 안전하게 렌더링됩니다. 이것이 모든 원격 사전에 대해 로컬 선언을 함께 유지해야 하는 이유입니다.

</Question>

<Question title="CMS를 자체 호스팅(self-host)할 수 있나요?">

네. CMS를 자체 인프라에서 실행할 수 있으며, 콘텐츠가 내부 네트워크 외부로 유출되어서는 안 되는 환경에서 주로 사용됩니다. [Intlayer 자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)을 참조하세요.

</Question>

<Question title="콘텐츠 편집자가 변경 사항을 게시하기 위해 개발자의 도움이 필요한가요?">

아닙니다. 그것이 원격 사전의 핵심 목적입니다: 편집자가 CMS에서 텍스트를 변경하면 사이트에 즉시 반영되며, [실시간 동기화(live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md)를 통해 빌드를 기다리지 않고 런타임에 업데이트가 적용됩니다.

</Question>

<Question title="인터페이스를 사용하는 대신 CMS 작업을 자동화할 수 있나요?">

네. `@intlayer/api` SDK는 UI와 동일한 엔드포인트를 노출하므로 스크립트나 CI 파이프라인에서 프로젝트를 조회하고 사전을 읽으며 업데이트를 푸시할 수 있습니다. 위 섹션에서 인증 방식과 엔드포인트를 확인할 수 있습니다.

</Question>

<Question title="CMS에서 번역 A/B 테스트를 지원하나요?">

네. 원격 사전은 [콘텐츠 변형(content variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md)을 지원하며, [애널리틱스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/analytics.md)를 통해 각 변형이 어떻게 노출되었는지 보고하므로 주관적인 토론 대신 데이터에 기반하여 문구 변경 효과를 측정할 수 있습니다.

</Question>

<Question title="CMS는 무료인가요?">

Intlayer 라이브러리, CLI, 컴파일러 및 비주얼 에디터는 Apache 2.0 라이선스에 따라 무료 오픈 소스로 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 대안으로 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)할 수도 있습니다.

</Question>

</FAQ>
