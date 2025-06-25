---
docName: configuration
url: /doc/concept/configuration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md
createdAt: 2024-08-13
updatedAt: 2024-08-13
title: 구성
description: 애플리케이션을 위해 Intlayer를 구성하는 방법을 알아보세요. Intlayer를 필요에 맞게 사용자 정의하는 데 사용할 수 있는 다양한 설정과 옵션을 이해합니다.
keywords:
  - 구성
  - 설정
  - 사용자화
  - Intlayer
  - 옵션
---

# Intlayer 구성 문서

## 개요

Intlayer 구성 파일은 국제화, 미들웨어 및 콘텐츠 처리와 같은 플러그인의 다양한 측면을 사용자 정의할 수 있도록 합니다. 이 문서는 구성의 각 속성에 대한 자세한 설명을 제공합니다.

---

## 구성 파일 지원

Intlayer는 JSON, JS, MJS 및 TS 구성 파일 형식을 지원합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 구성 파일 예제

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## 구성 참조

다음 섹션에서는 Intlayer에 사용할 수 있는 다양한 구성 설정을 설명합니다.

---

### 국제화 구성

애플리케이션의 사용 가능한 로케일 및 기본 로케일을 포함한 국제화와 관련된 설정을 정의합니다.

#### 속성

- **locales**:

  - _유형_: `string[]`
  - _기본값_: `['en']`
  - _설명_: 애플리케이션에서 지원되는 로케일 목록입니다.
  - _예제_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _유형_: `string[]`
  - _기본값_: `[]`
  - _설명_: 애플리케이션에서 필수 로케일 목록입니다.
  - _예제_: `[]`
  - _참고_: 비어 있으면 `strict` 모드에서 모든 로케일이 필수로 간주됩니다.
  - _참고_: 필수 로케일은 `locales` 필드에도 정의되어야 합니다.
- **strictMode**:

  - _유형_: `string`
  - _기본값_: `inclusive`
  - _설명_: 타입스크립트를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다.
  - _참고_: "strict"로 설정하면 번역 `t` 함수는 선언된 각 로케일이 정의되어야 합니다. 로케일이 누락되었거나 구성에 선언되지 않은 경우 오류가 발생합니다.
  - _참고_: "inclusive"로 설정하면 번역 `t` 함수는 선언된 각 로케일이 정의되어야 합니다. 로케일이 누락된 경우 경고가 표시됩니다. 그러나 구성에 선언되지 않은 로케일이 존재하더라도 허용됩니다.
  - _참고_: "loose"로 설정하면 번역 `t` 함수는 모든 기존 로케일을 허용합니다.

- **defaultLocale**:

  - _유형_: `string`
  - _기본값_: `'en'`
  - _설명_: 요청된 로케일을 찾을 수 없는 경우 대체로 사용되는 기본 로케일입니다.
  - _예제_: `'en'`
  - _참고_: URL, 쿠키 또는 헤더에 로케일이 지정되지 않은 경우 로케일을 결정하는 데 사용됩니다.

---

### 에디터 구성

서버 포트 및 활성 상태를 포함한 통합 에디터와 관련된 설정을 정의합니다.

#### 속성

- **applicationURL**:

  - _유형_: `string`
  - _기본값_: `http://localhost:3000`
  - _설명_: 애플리케이션의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다.
  - _예제_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _참고_: 애플리케이션의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다. `'*'`로 설정하면 에디터는 모든 출처에서 접근할 수 있습니다.

- **port**:

  - _유형_: `number`
  - _기본값_: `8000`
  - _설명_: 시각적 에디터 서버에서 사용하는 포트입니다.

- **editorURL**:

  - _유형_: `string`
  - _기본값_: `'http://localhost:8000'`
  - _설명_: 에디터 서버의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _참고_: 애플리케이션에서 접근할 수 있는 에디터 서버의 URL입니다. 애플리케이션과 상호작용할 수 있는 출처를 제한하는 데 사용됩니다. `'*'`로 설정하면 에디터는 모든 출처에서 접근할 수 있습니다. 포트가 변경되었거나 에디터가 다른 도메인에 호스팅된 경우 설정해야 합니다.

- **cmsURL**:

  - _유형_: `string`
  - _기본값_: `'https://intlayer.org'`
  - _설명_: Intlayer CMS의 URL입니다.
  - _예제_: `'https://intlayer.org'`
  - _참고_: Intlayer CMS의 URL입니다.

- **backendURL**:

  - _유형_: `string`
  - _기본값_: `https://back.intlayer.org`
  - _설명_: 백엔드 서버의 URL입니다.
  - _예제_: `http://localhost:4000`

- **enabled**:

  - _유형_: `boolean`
  - _기본값_: `true`
  - _설명_: 애플리케이션이 시각적 에디터와 상호작용할 수 있는지 여부를 나타냅니다.
  - _예제_: `process.env.NODE_ENV !== 'production'`
  - _참고_: true로 설정하면 에디터가 애플리케이션과 상호작용할 수 있습니다. false로 설정하면 에디터는 애플리케이션과 상호작용할 수 없습니다. 어떤 경우에도 에디터는 시각적 에디터에 의해 활성화될 수 있습니다. 특정 환경에서 에디터를 비활성화하는 것은 보안을 강화하는 방법입니다.

- **clientId**:

  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId 및 clientSecret은 Intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://intlayer.org/dashboard/project 에서 계정을 생성하십시오.
  - _예제_: `true`
  - _참고_: 중요: clientId 및 clientSecret은 비공개로 유지되어야 하며 공개적으로 공유되지 않아야 합니다. 환경 변수와 같은 안전한 위치에 보관하십시오.

- **clientSecret**:

  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId 및 clientSecret은 Intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://intlayer.org/dashboard/project 에서 계정을 생성하십시오.
  - _예제_: `true`
  - _참고_: 중요: clientId 및 clientSecret은 비공개로 유지되어야 하며 공개적으로 공유되지 않아야 합니다. 환경 변수와 같은 안전한 위치에 보관하십시오.

- **hotReload**:

  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: 애플리케이션이 변경 사항을 감지할 때 로케일 구성을 핫 리로드해야 하는지 여부를 나타냅니다.
  - _예제_: `true`
  - _참고_: 예를 들어, 새 사전이 추가되거나 업데이트될 때 애플리케이션은 페이지에 표시할 콘텐츠를 업데이트합니다.
  - _참고_: 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에 `enterprise` 플랜의 클라이언트만 사용할 수 있습니다.

- **dictionaryPriorityStrategy**:
  - _유형_: `string`
  - _기본값_: `'local_first'`
  - _설명_: 로컬 및 원격 사전이 모두 존재하는 경우 사전의 우선 순위를 결정하는 전략입니다. `'distant_first'`로 설정하면 애플리케이션은 로컬 사전보다 원격 사전을 우선시합니다. `'local_first'`로 설정하면 애플리케이션은 원격 사전보다 로컬 사전을 우선시합니다.
  - _예제_: `'distant_first'`

### 미들웨어 구성

애플리케이션이 쿠키, 헤더 및 로케일 관리를 위한 URL 접두사를 처리하는 방식을 제어하는 미들웨어 동작 설정입니다.

#### 속성

- **headerName**:

  - _유형_: `string`
  - _기본값_: `'x-intlayer-locale'`
  - _설명_: 로케일을 결정하는 데 사용되는 HTTP 헤더의 이름입니다.
  - _예제_: `'x-custom-locale'`
  - _참고_: API 기반 로케일 결정에 유용합니다.

---

- **cookieName**:

  - _유형_: `string`
  - _기본값_: `'intlayer-locale'`
  - _설명_: 로케일을 저장하는 데 사용되는 쿠키의 이름입니다.
  - _예시_: `'custom-locale'`
  - _참고_: 세션 간 로케일을 유지하는 데 사용됩니다.

- **prefixDefault**:

  - _유형_: `boolean`
  - _기본값_: `true`
  - _설명_: URL에 기본 로케일을 포함할지 여부를 나타냅니다.
  - _예시_: `false`
  - _참고_: `false`로 설정하면 기본 로케일의 URL에는 로케일 접두사가 포함되지 않습니다.

- **basePath**:

  - _유형_: `string`
  - _기본값_: `''`
  - _설명_: 애플리케이션 URL의 기본 경로입니다.
  - _예시_: `'/my-app'`
  - _참고_: 이 설정은 애플리케이션의 URL 구성 방식에 영향을 미칩니다.

- **serverSetCookie**:

  - _유형_: `string`
  - _기본값_: `'always'`
  - _설명_: 서버에서 로케일 쿠키를 설정하는 규칙입니다.
  - _옵션_: `'always'`, `'never'`
  - _예시_: `'never'`
  - _참고_: 로케일 쿠키를 모든 요청에서 설정할지 또는 설정하지 않을지를 제어합니다.

- **noPrefix**:
  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: URL에서 로케일 접두사를 생략할지 여부를 나타냅니다.
  - _예시_: `true`
  - _참고_: `true`로 설정하면 URL에 로케일 정보가 포함되지 않습니다.

---

### 콘텐츠 설정

애플리케이션 내 콘텐츠 처리와 관련된 설정으로, 디렉토리 이름, 파일 확장자 및 파생된 구성을 포함합니다.

#### 속성

- **watch**:

  - _유형_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'development'`
  - _설명_: Intlayer가 앱 내 콘텐츠 선언 파일의 변경 사항을 감지하여 관련 사전을 다시 빌드할지 여부를 나타냅니다.

- **fileExtensions**:

  - _유형_: `string[]`
  - _기본값_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _설명_: 사전을 빌드할 때 검색할 파일 확장자입니다.
  - _예시_: `['.data.ts', '.data.js', '.data.json']`
  - _참고_: 파일 확장자를 사용자 정의하면 충돌을 방지할 수 있습니다.

- **baseDir**:

  - _유형_: `string`
  - _기본값_: `process.cwd()`
  - _설명_: 프로젝트의 기본 디렉토리입니다.
  - _예시_: `'/path/to/project'`
  - _참고_: Intlayer 관련 모든 디렉토리를 해결하는 데 사용됩니다.

- **dictionaryOutput**:

  - _유형_: `string[]`
  - _기본값_: `['intlayer']`
  - _설명_: 사용할 사전 출력 유형입니다. 예: `'intlayer'` 또는 `'i18next'`.

- **contentDir**:

  - _유형_: `string[]`
  - _기본값_: `['src']`
  - _설명_: 콘텐츠가 저장된 디렉토리 경로입니다.

- **dictionariesDir**:

  - _유형_: `string`
  - _기본값_: `'.intlayer/dictionaries'`
  - _설명_: 중간 또는 출력 결과를 저장하는 디렉토리 경로입니다.

- **moduleAugmentationDir**:

  - _유형_: `string`
  - _기본값_: `'.intlayer/types'`
  - _설명_: 모듈 보강을 위한 디렉토리로, IDE 제안 및 타입 검사를 개선합니다.
  - _예시_: `'intlayer-types'`
  - _참고_: 이 디렉토리를 `tsconfig.json`에 포함해야 합니다.

- **unmergedDictionariesDir**:

  - _유형_: `string`
  - _기본값_: `'.intlayer/unmerged_dictionary'`
  - _설명_: 병합되지 않은 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`

- **dictionariesDir**:

  - _유형_: `string`
  - _기본값_: `'.intlayer/dictionary'`
  - _설명_: 로컬라이제이션 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`

- **i18nextResourcesDir**:

  - _유형_: `string`
  - _기본값_: `'i18next_dictionary'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`
  - _참고_: 이 디렉토리가 i18next 출력 유형에 대해 구성되었는지 확인하십시오.

- **typesDir**:

  - _유형_: `string`
  - _기본값_: `'types'`
  - _설명_: 사전 유형을 저장하는 디렉토리입니다.
  - _예시_: `'intlayer-types'`

- **mainDir**:

  - _유형_: `string`
  - _기본값_: `'main'`
  - _설명_: 주요 애플리케이션 파일이 저장된 디렉토리입니다.
  - _예시_: `'intlayer-main'`

- **excludedPath**:
  - _유형_: `string[]`
  - _기본값_: `['node_modules']`
  - _설명_: 콘텐츠 검색에서 제외된 디렉토리입니다.
  - _참고_: 이 설정은 아직 사용되지 않지만, 향후 구현될 예정입니다.

### 로거 설정

로거를 제어하는 설정으로, 사용할 접두사를 포함합니다.

#### 속성

- **mode**:

  - _유형_: `string`
  - _기본값_: `default`
  - _설명_: 로거의 모드를 나타냅니다.
  - _옵션_: `default`, `verbose`, `disabled`
  - _예시_: `default`
  - _참고_: 로거의 모드입니다. 자세한 모드는 더 많은 정보를 기록하지만 디버깅 목적으로 사용할 수 있습니다. 비활성화 모드는 로거를 비활성화합니다.

- **prefix**:

  - _유형_: `string`
  - _기본값_: `'[intlayer] '`
  - _설명_: 로거의 접두사입니다.
  - _예시_: `'[my custom prefix] '`
  - _참고_: 로거의 접두사입니다.

### AI 설정

Intlayer의 AI 기능을 제어하는 설정으로, 제공자, 모델 및 API 키를 포함합니다.

이 설정은 [Intlayer 대시보드](https://intlayer.org/dashboard/project)에서 액세스 키를 사용하여 등록된 경우 선택 사항입니다. Intlayer는 귀하의 요구에 가장 효율적이고 비용 효율적인 AI 솔루션을 자동으로 관리합니다. 기본 옵션을 사용하면 Intlayer가 가장 관련성 높은 모델을 지속적으로 업데이트하므로 장기적인 유지 관리가 더 용이합니다.

자체 API 키 또는 특정 모델을 사용하려면 사용자 정의 AI 구성을 정의할 수 있습니다. 이 AI 구성은 Intlayer 환경 전반에서 전역적으로 사용됩니다. CLI 명령은 이 설정을 명령의 기본값으로 사용하며(e.g. `fill`), SDK, 시각적 편집기 및 CMS에서도 사용됩니다. 특정 사용 사례에 대해 명령 매개변수를 사용하여 이러한 기본값을 재정의할 수 있습니다.

Intlayer는 유연성과 선택을 강화하기 위해 여러 AI 제공자를 지원합니다. 현재 지원되는 제공자는 다음과 같습니다:

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
  - _설명_: Intlayer의 AI 기능에 사용할 제공자입니다.
  - _옵션_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _예시_: `'anthropic'`
  - _참고_: 제공자마다 다른 API 키가 필요하며, 가격 모델도 다를 수 있습니다.

- **model**:

  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: Intlayer의 AI 기능에 사용할 모델입니다.
  - _예시_: `'gpt-4o-2024-11-20'`
  - _참고_: 제공자에 따라 사용할 특정 모델이 다릅니다.

- **temperature**:

  - _유형_: `number`
  - _기본값_: 없음
  - _설명_: 온도는 AI 응답의 무작위성을 제어합니다.
  - _예시_: `0.1`
  - _참고_: 높은 온도는 AI를 더 창의적이고 예측 불가능하게 만듭니다.

- **apiKey**:

  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: 선택한 제공자의 API 키입니다.
  - _예시_: `process.env.OPENAI_API_KEY`
  - _참고_: 중요: API 키는 비공개로 유지되어야 하며, 공개적으로 공유되지 않아야 합니다. 환경 변수와 같은 안전한 위치에 보관하십시오.

- **applicationContext**:

  - _유형_: `string`
  - _기본값_: 없음
  - _설명_: AI 모델에 애플리케이션에 대한 추가 컨텍스트를 제공하여 더 정확하고 상황에 맞는 번역을 생성하는 데 도움을 줍니다. 여기에는 앱의 도메인, 대상 사용자, 톤 또는 특정 용어에 대한 정보가 포함될 수 있습니다.

### 빌드 구성

Intlayer가 애플리케이션의 국제화를 최적화하고 빌드하는 방법을 제어하는 설정입니다.

빌드 옵션은 `@intlayer/babel` 및 `@intlayer/swc` 플러그인에 적용됩니다.

> 개발 모드에서 Intlayer는 개발 경험을 단순화하기 위해 사전에 대해 중앙 집중식 정적 가져오기를 사용합니다.

> 빌드를 최적화함으로써 Intlayer는 청킹을 최적화하기 위해 모든 사전 호출을 대체합니다. 이렇게 하면 최종 번들은 사용되는 사전만 가져옵니다.

- **참고**: `@intlayer/babel`은 `vite-intlayer` 패키지에서 기본적으로 사용할 수 있지만, `@intlayer/swc`는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 `next-intlayer` 패키지에서 기본적으로 설치되지 않습니다.

#### 속성

- **optimize**:

  - _유형_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'production'`
  - _설명_: 빌드를 최적화해야 하는지 여부를 제어합니다.
  - _예시_: `true`
  - _참고_: 번들에 사용되는 사전만 가져올 수 있습니다. 하지만 모든 가져오기는 사전을 로드할 때 비동기 처리를 피하기 위해 정적 가져오기로 유지됩니다.
  - _참고_: 활성화되면 Intlayer는 모든 `useIntlayer` 호출을 `useDictionary`로, `getIntlayer`를 `getDictionary`로 대체하여 사전 청킹을 최적화합니다.
  - _참고_: 모든 키가 `useIntlayer` 호출에서 정적으로 선언되어 있는지 확인하세요. 예: `useIntlayer('navbar')`.

- **activateDynamicImport**:

  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: 사전 콘텐츠를 로케일별로 동적으로 가져와야 하는지 여부를 제어합니다.
  - _예시_: `true`
  - _참고_: 현재 로케일의 사전 콘텐츠만 동적으로 가져올 수 있습니다.
  - _참고_: 동적 가져오기는 React Suspense에 의존하며 렌더링 성능에 약간의 영향을 미칠 수 있습니다. 하지만 비활성화되면 사용되지 않더라도 모든 로케일이 한 번에 로드됩니다.
  - _참고_: 활성화되면 Intlayer는 모든 `useIntlayer` 호출을 `useDynamicDictionary`로 대체하여 사전 청킹을 최적화합니다.
  - _참고_: 이 옵션은 `optimize`가 비활성화된 경우 무시됩니다.
  - _참고_: 모든 키가 `useIntlayer` 호출에서 정적으로 선언되어 있는지 확인하세요. 예: `useIntlayer('navbar')`.

- **traversePattern**:
  - _유형_: `string[]`
  - _기본값_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx,vue,svelte,svte}', '!**/node_modules/**']`
  - _설명_: 최적화 중에 순회해야 하는 파일을 정의하는 패턴입니다.
  - _예시_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _참고_: 관련 코드 파일로 최적화를 제한하고 빌드 성능을 향상시키기 위해 사용하세요.
  - _참고_: 이 옵션은 `optimize`가 비활성화된 경우 무시됩니다.
  - _참고_: glob 패턴을 사용하세요.
