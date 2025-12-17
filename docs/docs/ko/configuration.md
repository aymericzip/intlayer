---
createdAt: 2024-08-13
updatedAt: 2025-09-16
title: 구성
description: 애플리케이션에 맞게 Intlayer를 구성하는 방법을 배우세요. Intlayer를 사용자 요구에 맞게 맞춤 설정할 수 있는 다양한 설정과 옵션을 이해하세요.
keywords:
  - 구성
  - 설정
  - 맞춤화
  - Intlayer
  - 옵션
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` 옵션 추가
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` 가져오기 모드 추가
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` import 모드 추가
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` 필드를 `liveSync`로 교체하고 `liveSyncPort` 및 `liveSyncURL` 필드 추가
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport`을 `importMode` 옵션으로 교체
  - version: 5.6.0
    date: 2025-07-13
    changes: 기본 contentDir를 `['src']`에서 `['.']`로 변경
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` 명령어 추가
---

# Intlayer 구성 문서

## 개요

Intlayer 구성 파일은 국제화, 미들웨어, 콘텐츠 처리 등 플러그인의 다양한 측면을 사용자 정의할 수 있게 합니다. 이 문서는 구성 내 각 속성에 대한 자세한 설명을 제공합니다.

---

## 목차

<TOC/>

---

## 구성 파일 지원

Intlayer는 JSON, JS, MJS, TS 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 예제 구성 파일

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // 지원하는 로케일 목록
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // 자동 채우기 콘텐츠 파일 경로
    contentDir: ["src", "../ui-library"], // 콘텐츠 디렉토리 목록
  },
  middleware: {
    noPrefix: false, // 미들웨어 접두사 사용 여부
  },
  editor: {
    applicationURL: "https://example.com", // 에디터 애플리케이션 URL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API 키
    applicationContext: "This is a test application", // 애플리케이션 컨텍스트 설명
  },
  build: {
    importMode: "dynamic", // 빌드 시 모듈 임포트 모드
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // 지원하는 로케일 목록
  },
  content: {
    contentDir: ["src", "../ui-library"], // 콘텐츠 디렉토리 목록
  },
  middleware: {
    noPrefix: false, // 미들웨어 접두사 사용 여부
  },
  editor: {
    applicationURL: "https://example.com", // 에디터 애플리케이션 URL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API 키
    applicationContext: "This is a test application", // 애플리케이션 컨텍스트 설명
  },
  build: {
    importMode: "dynamic", // 빌드 시 모듈 임포트 모드
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // 지원하는 로케일 목록
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // 콘텐츠 디렉토리 목록
  },
  "middleware": {
    "noPrefix": false, // 미들웨어 접두사 사용 여부
  },
  "editor": {
    "applicationURL": "https://example.com", // 에디터 애플리케이션 URL
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "이것은 테스트 애플리케이션입니다",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## 구성 참조

다음 섹션에서는 Intlayer에서 사용할 수 있는 다양한 구성 설정에 대해 설명합니다.

---

### 국제화 구성

애플리케이션에서 사용 가능한 로케일과 기본 로케일을 포함하여 국제화와 관련된 설정을 정의합니다.

#### 속성

- **locales**:
  - _유형_: `string[]`
  - _기본값_: `['en']`
  - _설명_: 애플리케이션에서 지원하는 로케일 목록입니다.
  - _예시_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _유형_: `string[]`
  - _기본값_: `[]`
  - _설명_: 애플리케이션에서 필수로 요구되는 로케일 목록입니다.
  - _예시_: `[]`
  - _참고_: 비어 있으면 `strict` 모드에서 모든 로케일이 필수입니다.
  - _참고_: 필수 로케일이 `locales` 필드에도 정의되어 있는지 확인하세요.
- **strictMode**:
  - _유형_: `string`
  - _기본값_: `inclusive`
  - _설명_: 타입스크립트를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다.
  - _참고_: "strict"로 설정하면, 번역 함수 `t`는 선언된 각 로케일이 정의되어 있어야 합니다. 하나의 로케일이 누락되었거나 구성에 선언되지 않은 로케일이 있으면 오류를 발생시킵니다.
  - _참고_: "inclusive"로 설정하면, 번역 함수 `t`는 선언된 각 로케일이 정의되어 있어야 합니다. 하나의 로케일이 누락되면 경고를 발생시키지만, 구성에 선언되지 않았더라도 존재하는 로케일은 허용합니다.
  - _참고_: "loose"로 설정하면, 번역 함수 `t`는 존재하는 모든 로케일을 허용합니다.

- **defaultLocale**:
  - _유형_: `string`
  - _기본값_: `'en'`
  - _설명_: 요청한 로케일을 찾을 수 없을 때 대체로 사용되는 기본 로케일입니다.
  - _예시_: `'en'`
  - _참고_: URL, 쿠키 또는 헤더에 로케일이 지정되지 않은 경우 이 값을 사용하여 로케일을 결정합니다.

---

### 에디터 구성

통합 에디터와 관련된 설정을 정의하며, 서버 포트와 활성 상태를 포함합니다.

#### 속성

- **applicationURL**:
  - _유형_: `string`
  - _기본값_: `http://localhost:3000`
  - _설명_: 애플리케이션의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다.
  - _예시_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
- `process.env.INTLAYER_EDITOR_URL`
  - _참고_: 애플리케이션의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다. `'*'`로 설정하면 에디터는 모든 출처에서 접근할 수 있습니다.

- **port**:
  - _유형_: `number`
  - _기본값_: `8000`
  - _설명_: 비주얼 에디터 서버가 사용하는 포트입니다.

- **editorURL**:
  - _유형_: `string`
  - _기본값_: `'http://localhost:8000'`
  - _설명_: 에디터 서버의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _참고_: 애플리케이션에서 접근하는 에디터 서버의 URL입니다. 보안상의 이유로 애플리케이션과 상호작용할 수 있는 출처를 제한하는 데 사용됩니다. `'*'`로 설정하면 모든 출처에서 에디터에 접근할 수 있습니다. 포트가 변경되었거나 에디터가 다른 도메인에 호스팅되는 경우 설정해야 합니다.

- **cmsURL**:
  - _유형_: `string`
  - _기본값_: `'https://intlayer.org'`
  - _설명_: Intlayer CMS의 URL입니다.
  - _예시_: `'https://intlayer.org'`
  - _참고_: Intlayer CMS의 URL입니다.

- **backendURL**:
  - _유형_: `string`
  - _기본값_: `https://back.intlayer.org`
  - _설명_: 백엔드 서버의 URL입니다.
  - _예시_: `http://localhost:4000`

- **enabled**:
  - _유형_: `boolean`
  - _기본값_: `true`
  - _설명_: 애플리케이션이 비주얼 에디터와 상호작용하는지 여부를 나타냅니다.
  - _예시_: `process.env.NODE_ENV !== 'production'`
  - _참고_: true인 경우, 에디터가 애플리케이션과 상호작용할 수 있습니다. false인 경우, 에디터가 애플리케이션과 상호작용할 수 없습니다. 어떤 경우든 에디터는 비주얼 에디터에 의해서만 활성화될 수 있습니다. 특정 환경에서 에디터를 비활성화하는 것은 보안을 강화하는 방법입니다.

- **clientId**:
  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId와 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://intlayer.org/dashboard/project 에서 계정을 생성하세요.
  - _예시_: `true`
  - _참고_: 중요: clientId와 clientSecret은 비밀로 유지되어야 하며 공개적으로 공유되어서는 안 됩니다. 환경 변수와 같은 안전한 위치에 보관하시기 바랍니다.

- **clientSecret**:
  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId와 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://intlayer.org/dashboard/project 에서 계정을 생성하세요.
  - _예시_: `true`
  - _참고_: 중요: clientId와 clientSecret은 비밀로 유지되어야 하며 공개적으로 공유해서는 안 됩니다. 환경 변수와 같은 안전한 위치에 보관하시기 바랍니다.

- **dictionaryPriorityStrategy**:
  - _유형_: `string`
  - _기본값_: `'local_first'`
  - _설명_: 로컬 사전과 원격 사전이 모두 존재할 경우 사전의 우선순위를 정하는 전략입니다. `'distant_first'`로 설정하면 애플리케이션이 원격 사전을 로컬 사전보다 우선시합니다. `'local_first'`로 설정하면 애플리케이션이 로컬 사전을 원격 사전보다 우선시합니다.
  - _예시_: `'distant_first'`

- **liveSync**:
  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: CMS / 비주얼 에디터 / 백엔드에서 변경 사항이 감지되었을 때 애플리케이션 서버가 콘텐츠를 핫 리로드할지 여부를 나타냅니다.
  - _예시_: `true`
  - _참고_: 예를 들어, 새로운 사전이 추가되거나 업데이트되면 애플리케이션이 페이지에 표시할 콘텐츠를 업데이트합니다.
  - _참고_: 라이브 싱크는 애플리케이션의 콘텐츠를 다른 서버로 외부화해야 합니다. 이는 애플리케이션 성능에 약간의 영향을 미칠 수 있음을 의미합니다. 이를 제한하기 위해 애플리케이션과 라이브 싱크 서버를 동일한 머신에 호스팅할 것을 권장합니다. 또한, 라이브 싱크와 `optimize`의 조합은 라이브 싱크 서버에 상당한 수의 요청을 발생시킬 수 있습니다. 인프라 환경에 따라 두 옵션과 그 조합을 테스트해보는 것을 권장합니다.

- **liveSyncPort**:
  - _유형_: `number`
  - _기본값_: `4000`
  - _설명_: 라이브 싱크 서버의 포트입니다.
  - _예시_: `4000`
  - _참고_: 라이브 싱크 서버의 포트입니다.

- **liveSyncURL**:
  - _유형_: `string`
  - _기본값_: `'http://localhost:{liveSyncPort}'`
  - _설명_: 라이브 싱크 서버의 URL입니다.
  - _예시_: `'https://example.com'`
  - _참고_: 기본적으로 localhost를 가리키지만 원격 라이브 싱크 서버의 경우 어떤 URL로도 변경할 수 있습니다.

### 미들웨어 설정

애플리케이션이 쿠키, 헤더 및 로케일 관리를 위한 URL 접두사를 처리하는 방식을 제어하는 설정입니다.

#### 속성

- **headerName**:
  - _유형_: `string`
  - _기본값_: `'x-intlayer-locale'`
  - _설명_: 로케일을 결정하는 데 사용되는 HTTP 헤더의 이름입니다.
  - _예시_: `'x-custom-locale'`
  - _참고_: API 기반 로케일 결정에 유용합니다.

- **cookieName**:
  - _유형_: `string`
  - _기본값_: `'intlayer-locale'`
  - _설명_: 로케일을 저장하는 데 사용되는 쿠키의 이름입니다.
  - _예시_: `'custom-locale'`
  - _참고_: 세션 간 로케일을 유지하는 데 사용됩니다.

- **prefixDefault**:
  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: 기본 로케일을 URL에 포함할지 여부입니다.
  - _예시_: `true`
  - _참고_:
    - `true`이고 `defaultLocale = 'en'`인 경우: 경로 = `/en/dashboard` 또는 `/fr/dashboard`
    - `false`이고 `defaultLocale = 'en'`인 경우: 경로 = `/dashboard` 또는 `/fr/dashboard`

- **basePath**:
  - _유형_: `string`
  - _기본값_: `''`
  - _설명_: 애플리케이션 URL의 기본 경로입니다.
  - _예시_: `'/my-app'`
  - _참고_:
    - 애플리케이션이 `https://example.com/my-app`에 호스팅되는 경우
    - 기본 경로는 `'/my-app'`입니다.
    - URL은 `https://example.com/my-app/en`이 됩니다.
    - 기본 경로가 설정되지 않은 경우, URL은 `https://example.com/en`이 됩니다.

- **serverSetCookie**:
  - _유형_: `string`
  - _기본값_: `'always'`
  - _설명_: 서버에서 로케일 쿠키를 설정하는 규칙입니다.
  - _옵션_: `'always'`, `'never'`
  - _예시_: `'never'`
  - _참고_: 로케일 쿠키를 모든 요청마다 설정할지 또는 전혀 설정하지 않을지를 제어합니다.

- **noPrefix**:
  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: URL에서 로케일 접두사를 생략할지 여부입니다.
  - _예시_: `true`
  - _참고_:
    - `true`인 경우: URL에 접두사가 없습니다.
    - `false`인 경우: URL에 접두사가 있습니다.
    - `basePath = '/my-app'`인 경우 예시:
      - `noPrefix = false`인 경우: URL은 `https://example.com/my-app/en`이 됩니다.
      - `noPrefix = true`인 경우: URL은 `https://example.com`이 됩니다.

---

### 콘텐츠 구성

애플리케이션 내 콘텐츠 처리와 관련된 설정으로, 디렉터리 이름, 파일 확장자 및 파생 구성 등을 포함합니다.

#### 속성

- **autoFill**:
  - _유형_: `boolean | string | { [key in Locales]?: string }`
  - _기본값_: `undefined`
  - _설명_: AI를 사용하여 콘텐츠를 자동으로 채우는 방식을 지정합니다. `intlayer.config.ts` 파일에서 전역으로 선언할 수 있습니다.
  - _예시_: true
  - _예시_: `'./{{fileName}}.content.json'`
  - _예시_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _참고_: 자동 채우기 설정은 다음과 같이 구성할 수 있습니다:
    - boolean: 모든 로케일에 대해 자동 채우기 활성화
    - string: 단일 파일 경로나 변수 템플릿 경로
    - object: 로케일별 파일 경로

- **watch**:
  - _타입_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'development'`
  - _설명_: Intlayer가 앱 내 콘텐츠 선언 파일의 변경 사항을 감지하여 관련 사전을 재빌드할지 여부를 나타냅니다.

- **fileExtensions**:
  - _타입_: `string[]`
  - _기본값_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _설명_: 사전을 빌드할 때 찾을 파일 확장자들입니다.
  - _예시_: `['.data.ts', '.data.js', '.data.json']`
  - _참고_: 파일 확장자를 사용자 정의하면 충돌을 방지할 수 있습니다.

- **baseDir**:
  - _유형_: `string`
  - _기본값_: `process.cwd()`
  - _설명_: 프로젝트의 기본 디렉토리입니다.
  - _예시_: `'/path/to/project'`
  - _참고_: 모든 Intlayer 관련 디렉토리를 해석하는 데 사용됩니다.

- **dictionaryOutput**:
  - _유형_: `string[]`
  - _기본값_: `['intlayer']`
  - _설명_: 사용할 사전 출력 유형입니다. 예: `'intlayer'` 또는 `'i18next'`.

- **contentDir**:
  - _유형_: `string[]`
  - _기본값_: `['.']`
  - _예시_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _설명_: 콘텐츠가 저장된 디렉토리 경로입니다.

- **dictionariesDir**:
  - _타입_: `string`
  - _기본값_: `'.intlayer/dictionaries'`
  - _설명_: 중간 결과나 출력 결과를 저장하는 디렉토리 경로입니다.

- **moduleAugmentationDir**:
  - _타입_: `string`
  - _기본값_: `'.intlayer/types'`
  - _설명_: 모듈 확장을 위한 디렉토리로, IDE의 더 나은 제안과 타입 검사를 가능하게 합니다.
  - _예시_: `'intlayer-types'`
  - _참고_: 반드시 `tsconfig.json`에 포함시켜야 합니다.

- **unmergedDictionariesDir**:
  - _타입_: `string`
  - _기본값_: `'.intlayer/unmerged_dictionary'`
  - _설명_: 병합되지 않은 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`

- **dictionariesDir**:
  - _유형_: `string`
  - _기본값_: `'.intlayer/dictionary'`
  - _설명_: 지역화 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`

- **i18nextResourcesDir**:
  - _유형_: `string`
  - _기본값_: `'i18next_dictionary'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`
  - _참고_: 이 디렉토리가 i18next 출력 유형에 맞게 구성되어 있는지 확인하세요.

- **typesDir**:
  - _유형_: `string`
  - _기본값_: `'types'`
  - _설명_: 사전 타입을 저장하는 디렉토리입니다.
  - _예시_: `'intlayer-types'`

- **mainDir**:
  - _유형_: `string`
  - _기본값_: `'main'`
  - _설명_: 주요 애플리케이션 파일이 저장되는 디렉토리입니다.
  - _예시_: `'intlayer-main'`

- **excludedPath**:
  - _유형_: `string[]`
  - _기본값_: `['node_modules']`
  - _설명_: 콘텐츠 검색에서 제외할 디렉토리 목록입니다.
  - _참고_: 이 설정은 아직 사용되지 않았으며, 향후 구현될 예정입니다.

### 로거 설정

로거를 제어하는 설정으로, 사용할 접두사(prefix)를 포함합니다.

#### 속성

- **mode**:
  - _유형_: `string`
  - _기본값_: `default`
  - _설명_: 로거의 모드를 나타냅니다.
  - _옵션_: `default`, `verbose`, `disabled`
  - _예시_: `default`
  - _참고_: 로거의 모드입니다. verbose 모드는 더 많은 정보를 기록하지만 디버깅 목적으로 사용할 수 있습니다. disabled 모드는 로거를 비활성화합니다.

- **prefix**:
  - _유형_: `string`
  - _기본값_: `'[intlayer] '`
  - _설명_: 로거의 접두사입니다.
  - _예시_: `'[my custom prefix] '`
  - _Note_: 로거의 접두사입니다.

### AI 구성

Intlayer의 AI 기능을 제어하는 설정으로, 제공자(provider), 모델(model), API 키를 포함합니다.

이 구성은 [Intlayer 대시보드](https://intlayer.org/dashboard/project)에 액세스 키로 등록된 경우 선택 사항입니다. Intlayer는 귀하의 요구에 가장 효율적이고 비용 효과적인 AI 솔루션을 자동으로 관리합니다. 기본 옵션을 사용하면 Intlayer가 가장 적합한 모델을 지속적으로 업데이트하므로 장기적인 유지 관리가 더 용이합니다.

자신의 API 키나 특정 모델을 사용하려는 경우, 사용자 정의 AI 구성을 정의할 수 있습니다.
이 AI 구성은 Intlayer 환경 전반에 걸쳐 전역적으로 사용됩니다. CLI 명령어는 이 설정을 기본값으로 사용하며(예: `fill`), SDK, 비주얼 에디터, CMS에서도 동일하게 적용됩니다. 특정 사용 사례에 대해서는 명령어 매개변수를 사용하여 이러한 기본값을 재정의할 수 있습니다.

Intlayer는 향상된 유연성과 선택권을 위해 여러 AI 공급자를 지원합니다. 현재 지원되는 공급자는 다음과 같습니다:

- **OpenAI** (기본값)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### 속성

- **provider**:
  - _유형_: `string`
  - _기본값_: `'openai'`
  - _설명_: Intlayer의 AI 기능에 사용할 공급자입니다.
  - _옵션_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _예시_: `'anthropic'`
  - _참고_: 서로 다른 공급자는 서로 다른 API 키와 가격 모델을 요구할 수 있습니다.

- **model**:
  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: Intlayer의 AI 기능에 사용할 모델입니다.
  - _예시_: `'gpt-4o-2024-11-20'`
  - _참고_: 사용할 특정 모델은 공급자에 따라 다릅니다.

- **temperature**:
  - _유형_: `number`
  - _기본값_: 없음
  - _설명_: temperature는 AI 응답의 무작위성을 제어합니다.
  - _예시_: `0.1`
  - _참고_: 더 높은 temperature는 AI를 더 창의적이고 예측 불가능하게 만듭니다.

- **apiKey**:
  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: 선택한 공급자에 대한 API 키입니다.
  - _예시_: `process.env.OPENAI_API_KEY`
  - _참고_: 중요: API 키는 비밀로 유지해야 하며 공개적으로 공유해서는 안 됩니다. 환경 변수와 같은 안전한 위치에 보관하시기 바랍니다.

- **applicationContext**:
  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: AI 모델에 애플리케이션에 대한 추가 컨텍스트를 제공하여 더 정확하고 상황에 적합한 번역을 생성하도록 돕습니다. 여기에는 앱의 도메인, 대상 사용자, 톤 또는 특정 용어에 대한 정보가 포함될 수 있습니다.

### 빌드 구성

Intlayer가 애플리케이션의 국제화를 최적화하고 빌드하는 방식을 제어하는 설정입니다.

빌드 옵션은 `@intlayer/babel` 및 `@intlayer/swc` 플러그인에 적용됩니다.

> 개발 모드에서는 Intlayer가 사전을 정적 임포트하여 개발 경험을 단순화합니다.

> 최적화 시, Intlayer는 청크 최적화를 위해 사전 호출을 대체하여 최종 번들이 실제로 사용되는 사전만 임포트하도록 합니다.

#### 속성

- **mode**:
  - _타입_: `'auto' | 'manual'`
  - _기본값_: `'auto'`
  - _설명_: 빌드 모드를 제어합니다.
  - _예시_: `'manual'`
  - _참고_: 'auto'인 경우, 애플리케이션이 빌드될 때 빌드가 자동으로 활성화됩니다.
  - _참고_: 'manual'인 경우, 빌드 명령이 실행될 때만 빌드가 설정됩니다.
  - _참고_: 사전 빌드를 비활성화하는 데 사용할 수 있습니다. 예를 들어 Node.js 환경에서 실행을 피해야 하는 경우입니다.

- **optimize**:
  - _타입_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'production'`
  - _설명_: 빌드를 최적화할지 여부를 제어합니다.
  - _예시_: `true`
  - _참고_: 활성화되면 Intlayer는 청크 최적화를 위해 모든 사전 호출을 대체합니다. 이렇게 하면 최종 번들은 사용되는 사전만 임포트합니다. 모든 임포트는 사전 로딩 시 비동기 처리를 피하기 위해 정적 임포트로 유지됩니다.
  - _참고_: Intlayer는 `importMode` 옵션에 정의된 모드에 따라 모든 `useIntlayer` 호출을 대체하며, `getIntlayer`는 `getDictionary`로 대체합니다.
  - _참고_: 이 옵션은 `@intlayer/babel` 및 `@intlayer/swc` 플러그인에 의존합니다.
  - _참고_: `useIntlayer` 호출에서 모든 키가 정적으로 선언되어 있는지 확인하세요. 예: `useIntlayer('navbar')`.

- **importMode**:
  - _유형_: `'static' | 'dynamic' | 'live'`
  - _기본값_: `'static'`
  - _설명_: 사전을 어떻게 가져올지 제어합니다.
  - _예시_: `'dynamic'`
  - _참고_: 사용 가능한 모드:
    - "static": 사전을 정적으로 가져옵니다. `useIntlayer`를 `useDictionary`로 대체합니다.
    - "dynamic": Suspense를 사용하여 사전을 동적으로 가져옵니다. `useIntlayer`를 `useDictionaryDynamic`으로 대체합니다.
- "live": 사전은 라이브 동기화 API를 사용하여 동적으로 가져옵니다. `useIntlayer`를 `useDictionaryFetch`로 대체합니다.
- _참고_: 동적 임포트는 Suspense에 의존하며 렌더링 성능에 약간의 영향을 줄 수 있습니다.
- _참고_: 비활성화하면 사용되지 않는 로케일이라도 모든 로케일이 한 번에 로드됩니다.
- _참고_: 이 옵션은 `@intlayer/babel` 및 `@intlayer/swc` 플러그인에 의존합니다.
- _참고_: `useIntlayer` 호출에서 모든 키가 정적으로 선언되어 있는지 확인하세요. 예: `useIntlayer('navbar')`.
- _참고_: `optimize`가 비활성화된 경우 이 옵션은 무시됩니다.
  - _참고_: "live"로 설정된 경우, 원격 콘텐츠를 포함하고 "live" 플래그가 설정된 사전만 라이브 모드로 변환됩니다. 나머지는 가져오기 쿼리 수와 로드 성능을 최적화하기 위해 "dynamic" 모드로 동적으로 가져옵니다.
  - _참고_: 라이브 모드는 라이브 동기화 API를 사용하여 사전을 가져옵니다. API 호출이 실패하면 사전은 "dynamic" 모드로 동적으로 가져와집니다.
  - _참고_: 이 옵션은 `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` 및 `useDictionaryDynamic` 함수에는 영향을 미치지 않습니다.

- **traversePattern**:
  - _유형_: `string[]`
  - _기본값_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _설명_: 최적화 중에 탐색할 파일을 정의하는 패턴입니다.
    - _예시_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _참고_: 최적화를 관련 코드 파일로 제한하여 빌드 성능을 향상시키는 데 사용합니다.
  - _참고_: `optimize`가 비활성화된 경우 이 옵션은 무시됩니다.
  - _참고_: glob 패턴을 사용하세요.
