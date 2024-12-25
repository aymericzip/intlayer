# Intlayer 구성 문서

## 개요

Intlayer 구성 파일은 국제화, 미들웨어 및 콘텐츠 처리와 같은 플러그인의 다양한 측면을 사용자화할 수 있도록 합니다. 이 문서는 구성의 각 속성에 대한 자세한 설명을 제공합니다.

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

## 예시 구성 파일

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
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

다음 섹션은 Intlayer에서 사용 가능한 다양한 구성 설정을 설명합니다.

---

### 국제화 구성

국제화와 관련된 설정을 정의하며, 사용 가능한 로케일과 응용 프로그램의 기본 로케일을 포함합니다.

#### 속성

- **locales**:
  - _형식_: `string[]`
  - _기본값_: `['en']`
  - _설명_: 응용 프로그램에서 지원하는 로케일 목록입니다.
  - _예시_: `['en', 'fr', 'es']`
- **strictMode**:

  - _형식_: `string`
  - _기본값_: `required_only`
  - _설명_: 타입스크립트를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다.
  - _참고_: "strict"로 설정하면 번역 `t` 함수가 선언된 각 로케일이 정의되어야 합니다. 하나의 로케일이 누락되거나, 구성에 선언되지 않은 로케일이 있을 경우 오류를 발생시킵니다.
  - _참고_: "required_only"로 설정하면 번역 `t` 함수가 선언된 각 로케일이 정의되어야 하며, 하나의 로케일이 누락될 경우 경고를 발생시킵니다. 그러나 구성에 선언되지 않은 로케일이 존재하는 경우 수용합니다.
  - _참고_: "loose"로 설정하면 번역 `t` 함수가 존재하는 모든 로케일을 수용합니다.

- **defaultLocale**:
  - _형식_: `string`
  - _기본값_: `'en'`
  - _설명_: 요청된 로케일이 발견되지 않을 경우 대체로 사용되는 기본 로케일입니다.
  - _예시_: `'en'`
  - _참고_: URL, 쿠키 또는 헤더에서 지정되지 않은 경우 로케일을 결정하는 데 사용됩니다.

---

### 편집기 구성

서버 포트 및 활성 상태를 포함하여 통합 편집기와 관련된 설정을 정의합니다.

#### 속성

- **backendURL**:

  - _형식_: `string`
  - _기본값_: `https://back.intlayer.org`
  - _설명_: 백엔드 서버의 URL입니다.
  - _예시_: `http://localhost:4000`

- **enabled**:

  - _형식_: `boolean`
  - _기본값_: `true`
  - _설명_: 편집기가 활성 상태인지 표시합니다.
  - _예시_: `true`
  - _참고_: NODE_ENV 또는 다른 전용 환경 변수를 사용하여 설정할 수 있습니다.

- **clientId**:

  - _형식_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId와 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증하는 데 필요합니다. 접근 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 접근 토큰을 얻으려면 https://back.intlayer.org/dashboard/project 로 가서 계정을 만드세요.
  - _예시_: `true`
  - _참고_: 중요: clientId와 clientSecret은 비공식적으로 공개되어서는 안 되며, 안전한 위치(예: 환경 변수)에 보관해야 합니다.

- **clientSecret**:
  - _형식_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId와 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증하는 데 필요합니다. 접근 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다. 접근 토큰을 얻으려면 https://back.intlayer.org/dashboard/project 로 가서 계정을 만드세요.
  - _예시_: `true`
  - _참고_: 중요: clientId와 clientSecret은 비공식적으로 공개되어서는 안 되며, 안전한 위치(예: 환경 변수)에 보관해야 합니다.

### 미들웨어 구성

쿠키, 헤더 및 로케일 관리를 위한 URL 접두사 처리 방식을 포함하여 미들웨어 동작을 제어하는 설정입니다.

#### 속성

- **headerName**:
  - _형식_: `string`
  - _기본값_: `'x-intlayer-locale'`
  - _설명_: 로케일을 결정하는 데 사용되는 HTTP 헤더의 이름입니다.
  - _예시_: `'x-custom-locale'`
  - _참고_: API 기반 로케일 결정에 유용합니다.
- **cookieName**:
  - _형식_: `string`
  - _기본값_: `'intlayer-locale'`
  - _설명_: 로케일을 저장하는 데 사용되는 쿠키의 이름입니다.
  - _예시_: `'custom-locale'`
  - _참고_: 세션 간에 로케일을 지속하는 데 사용됩니다.
- **prefixDefault**:
  - _형식_: `boolean`
  - _기본값_: `true`
  - _설명_: URL에 기본 로케일을 포함할지 여부입니다.
  - _예시_: `false`
  - _참고_: `false`인 경우 기본 로케일에 대한 URL에는 로케일 접두사가 포함되지 않습니다.
- **basePath**:
  - _형식_: `string`
  - _기본값_: `''`
  - _설명_: 응용 프로그램 URL의 기본 경로입니다.
  - _예시_: `'/my-app'`
  - _참고_: 이것은 응용 프로그램의 URL 구성 방식에 영향을 미칩니다.
- **serverSetCookie**:
  - _형식_: `string`
  - _기본값_: `'always'`
  - _설명_: 서버에서 로케일 쿠키를 설정하는 규칙입니다.
  - _옵션_: `'always'`, `'never'`
  - _예시_: `'never'`
  - _참고_: 모든 요청에서 로케일 쿠키가 설정될지 여부를 제어합니다.
- **noPrefix**:
  - _형식_: `boolean`
  - _기본값_: `false`
  - _설명_: URL에서 로케일 접두사를 생략할지 여부입니다.
  - _예시_: `true`
  - _참고_: `true`인 경우 URL에는 로케일 정보가 포함되지 않습니다.

---

### 콘텐츠 구성

디렉토리 이름, 파일 확장자 및 파생 구성과 함께 응용 프로그램 내 콘텐츠 처리를 다루는 설정입니다.

#### 속성

- **watch**:
  - _형식_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'development'`
  - _설명_: Intlayer가 앱 내 콘텐츠 선언 파일의 변경 사항을 감시하여 관련 사전을 재구성해야 하는지 여부를 나타냅니다.
- **fileExtensions**:
  - _형식_: `string[]`
  - _기본값_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _설명_: 사전을 구축할 때 찾아야 할 파일 확장자입니다.
  - _예시_: `['.data.ts', '.data.js', '.data.json']`
  - _참고_: 파일 확장자를 사용자화하면 충돌을 피하는 데 도움이 될 수 있습니다.
- **baseDir**:
  - _형식_: `string`
  - _기본값_: `process.cwd()`
  - _설명_: 프로젝트의 기본 디렉토리입니다.
  - _예시_: `'/path/to/project'`
  - _참고_: 이는 모든 Intlayer 관련 디렉토리를 해결하는 데 사용됩니다.
- **dictionaryOutput**:
  - _형식_: `string[]`
  - _기본값_: `['intlayer']`
  - _설명_: 사용할 사전 출력을 정의합니다: 예를 들어, `'intlayer'` 또는 `'i18next'`입니다.
- **contentDirName**:
  - _형식_: `string`
  - _기본값_: `'src'`
  - _설명_: 콘텐츠가 저장되는 디렉토리의 이름입니다.
  - _예시_: `'data'`, `'content'`, `'locales'`
  - _참고_: 기본 디렉토리 수준에 있지 않으면 `contentDir`를 업데이트해야 합니다.
- **contentDir**:

  - _형식_: `string`
  - _파생_: `'baseDir'` / `'contentDirName'`
  - _설명_: 콘텐츠가 저장되는 디렉토리 경로입니다.

- **resultDirName**:
  - _형식_: `string`
  - _기본값_: `'.intlayer'`
  - _설명_: 결과가 저장되는 디렉토리의 이름입니다.
  - _예시_: `'outputOFIntlayer'`
  - _참고_: 이 디렉토리가 기본 수준에 없으면 `resultDir`를 업데이트해야 합니다.
- **resultDir**:

  - _형식_: `string`
  - _파생_: `'baseDir'` / `'resultDirName'`
  - _설명_: 중간 또는 출력 결과를 저장하는 디렉토리 경로입니다.

- **moduleAugmentationDirName**:

  - _형식_: `string`
  - _기본값_: `'types'`
  - _설명_: 모듈 확장을 위한 디렉토리로, 더 나은 IDE 제안을 제공하고 타입 검사를 지원합니다.
  - _예시_: `'intlayer-types'`
  - _참고_: 이는 `tsconfig.json`에 포함해야 합니다.

- **moduleAugmentationDir**:

  - _형식_: `string`
  - _파생_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _설명_: 모듈 확장 및 추가 타입 정의를 위한 경로입니다.

- **dictionariesDirName**:
  - _형식_: `string`
  - _기본값_: `'dictionary'`
  - _설명_: 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`
  - _참고_: 결과 디렉토리 수준에 없으면 `dictionariesDir`를 업데이트해야 합니다.
- **dictionariesDir**:

  - _형식_: `string`
  - _파생_: `'resultDir'` / `'dictionariesDirName'`
  - _설명_: 로케일 사전을 저장하는 디렉토리입니다.

- **i18nDictionariesDirName**:
  - _형식_: `string`
  - _기본값_: `'i18n_dictionary'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _예시_: `'translations'`
  - _참고_: 결과 디렉토리 수준에 없으면 `i18nDictionariesDir`를 업데이트해야 합니다.
  - _참고_: i18n 사전 출력에 i18next를 포함하여 i18next를 위한 사전을 구축해야 합니다.
- **i18nDictionariesDir**:

  - _형식_: `string`
  - _파생_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _참고_: 이 디렉토리는 i18next 출력 형식에 대해 구성되어야 합니다.

- **typeDirName**:

  - _형식_: `string`
  - _기본값_: `'types'`
  - _설명_: 사전 타입을 저장하는 디렉토리입니다.
  - _예시_: `'intlayer-types'`
  - _참고_: 결과 디렉토리 수준에 없으면 `typesDir`를 업데이트해야 합니다.

- **typesDir**:

  - _형식_: `string`
  - _파생_: `'resultDir'` / `'typeDirName'`
  - _설명_: 사전 타입을 저장하는 디렉토리입니다.

- **mainDirName**:
  - _형식_: `string`
  - _기본값_: `'main'`
  - _설명_: 주요 파일을 저장하는 디렉토리입니다.
  - _예시_: `'intlayer-main'`
  - _참고_: 결과 디렉토리 수준에 없으면 `mainDir`를 업데이트해야 합니다.
- **mainDir**:
  - _형식_: `string`
  - _파생_: `'resultDir'` / `'mainDirName'`
  - _설명_: 주요 응용 프로그램 파일이 저장되는 디렉토리입니다.
- **excludedPath**:
  - _형식_: `string[]`
  - _기본값_: `['node_modules']`
  - _설명_: 콘텐츠 검색에서 제외된 디렉토리입니다.
  - _참고_: 이 설정은 아직 사용되지 않지만 향후 구현 예정입니다.

### 로거 구성

로거를 제어하는 설정으로, 로깅 수준과 사용할 접두사에 대한 정보를 포함합니다.

#### 속성

- **enabled**:
  - _형식_: `boolean`
  - _기본값_: `true`
  - _설명_: 로거가 활성화되어 있는지 여부를 나타냅니다.
  - _예시_: `true`
  - _참고_: NODE_ENV 또는 다른 전용 환경 변수를 사용하여 설정할 수 있습니다.
- **level**:
  - _형식_: `'info' | 'warn' | 'debug' | 'log'`
  - _기본값_: `'log'`
  - _설명_: 로거의 수준입니다.
  - _예시_: `'info'`
  - _참고_: 로거의 수준은 'log', 'info', 'warn', 'error' 또는 'debug' 중 하나일 수 있습니다.
- **prefix**:
  - _형식_: `string`
  - _기본값_: `'[intlayer] '`
  - _설명_: 로거의 접두사입니다.
  - _예시_: `'[my custom prefix] '`
  - _참고_: 로거의 접두사입니다.
