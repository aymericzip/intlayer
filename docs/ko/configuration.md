# Intlayer 구성 문서

## 개요

Intlayer 구성 파일은 국제화, 미들웨어 및 콘텐츠 처리를 포함한 플러그인의 여러 측면을 사용자 정의할 수 있도록 합니다. 이 문서는 구성의 각 속성에 대한 자세한 설명을 제공합니다.

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

## 예제 구성 파일

```typescript
// intlayer.config.ts

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

```javascript
// intlayer.config.cjs

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

```json5
// .intlayerrc

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

다음 섹션에서는 Intlayer에서 사용할 수 있는 다양한 구성 설정에 대해 설명합니다.

---

### 국제화 구성

애플리케이션의 사용 가능한 로케일 및 기본 로케일을 포함하여 국제화와 관련된 설정을 정의합니다.

#### 속성

- **locales**:
  - _Type_: `string[]`
  - _Default_: `['en']`
  - _Description_: 애플리케이션에서 지원하는 로케일 목록입니다.
  - _Example_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Type_: `string`
  - _Default_: `required_only`
  - _Description_: Typescript를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다.
  - _Note_: "strict"로 설정하면 번역 `t` 함수가 각 선언된 로케일을 정의해야 합니다. 로케일 중 하나가 누락되거나 구성에서 선언되지 않은 로케일이 있으면 오류가 발생합니다.
  - _Note_: "required_only"로 설정하면 번역 `t` 함수가 각 선언된 로케일을 정의해야 합니다. 로케일 중 하나가 누락되면 경고가 발생하지만, 구성에서 선언되지 않았지만 존재하는 로케일은 수락합니다.
  - _Note_: "loose"로 설정하면 번역 `t` 함수가 존재하는 모든 로케일을 수락합니다.

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: 요청된 로케일이 발견되지 않을 경우 fallback으로 사용되는 기본 로케일입니다.
  - _Example_: `'en'`
  - _Note_: 이는 URL, 쿠키 또는 헤더에서 지정된 로케일이 없을 때 로케일을 결정하는 데 사용됩니다.

---

### 편집기 구성

서버 포트 및 활성 상태를 포함하여 통합 편집기와 관련된 설정을 정의합니다.

#### 속성

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: 백엔드 서버의 URL입니다.
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: 편집기가 활성 상태인지 여부를 나타냅니다.
  - _Example_: `true`
  - _Note_: NODE_ENV 또는 다른 전용 환경 변수를 사용하여 설정할 수 있습니다.

- **clientId**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId 및 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증하도록 허용합니다. 액세스 토큰은 프로젝트 관련 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://back.intlayer.org/dashboard/project로 이동하여 계정을 생성하십시오.
  - _Example_: `true`
  - _Note_: 중요: clientId 및 clientSecret은 비밀로 유지되어야 하며 공개적으로 공유되어서는 안 됩니다. 환경 변수와 같은 안전한 위치에 보관하십시오.

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId 및 clientSecret은 intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증하도록 허용합니다. 액세스 토큰은 프로젝트 관련 사용자를 인증하는 데 사용됩니다. 액세스 토큰을 얻으려면 https://back.intlayer.org/dashboard/project로 이동하여 계정을 생성하십시오.
  - _Example_: `true`
  - _Note_: 중요: clientId 및 clientSecret은 비밀로 유지되어야 하며 공개적으로 공유되어서는 안 됩니다. 환경 변수와 같은 안전한 위치에 보관하십시오.

### 미들웨어 구성

쿠키, 헤더 및 로케일 관리를 위한 URL 프리픽스를 처리하는 애플리케이션 동작을 제어하는 설정입니다.

#### 속성

- **headerName**:
  - _Type_: `string`
  - _Default_: `'x-intlayer-locale'`
  - _Description_: 로케일을 결정하는 데 사용되는 HTTP 헤더의 이름입니다.
  - _Example_: `'x-custom-locale'`
  - _Note_: 이는 API 기반의 로케일 결정에 유용합니다.
- **cookieName**:
  - _Type_: `string`
  - _Default_: `'intlayer-locale'`
  - _Description_: 로케일을 저장하는 데 사용되는 쿠키의 이름입니다.
  - _Example_: `'custom-locale'`
  - _Note_: 세션 간 로케일을 유지하는 데 사용됩니다.
- **prefixDefault**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: URL에서 기본 로케일을 포함할지 여부입니다.
  - _Example_: `false`
  - _Note_: `false`인 경우 기본 로케일의 URLs에는 로케일 프리픽스가 없습니다.
- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: 애플리케이션 URLs의 기본 경로입니다.
  - _Example_: `'/my-app'`
  - _Note_: 이는 애플리케이션의 URLs를 구성하는 방식에 영향을 미칩니다.
- **serverSetCookie**:
  - _Type_: `string`
  - _Default_: `'always'`
  - _Description_: 서버에서 로케일 쿠키를 설정하는 규칙입니다.
  - _Options_: `'always'`, `'never'`
  - _Example_: `'never'`
  - _Note_: 모든 요청에서 로케일 쿠키가 설정될지 또는 전혀 설정되지 않을지를 제어합니다.
- **noPrefix**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: URLs에서 로케일 프리픽스를 생략할지 여부입니다.
  - _Example_: `true`
  - _Note_: `true`인 경우 URLs는 로케일 정보를 포함하지 않습니다.

---

### 콘텐츠 구성

디렉토리 이름, 파일 확장자 및 파생 구성을 포함하여 애플리케이션 내에서 콘텐츠 처리를 위해 관련된 설정입니다.

#### 속성

- **watch**:
  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Description_: Intlayer가 앱 내 콘텐츠 선언 파일의 변경 사항을 감시하여 관련 사전을 재구축해야 하는지 여부입니다.
- **fileExtensions**:
  - _Type_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_: 사전을 구축할 때 찾을 파일 확장자입니다.
  - _Example_: `['.data.ts', '.data.js', '.data.json']`
  - _Note_: 파일 확장자를 사용자 정의하면 충돌을 피하는 데 도움이 될 수 있습니다.
- **baseDir**:
  - _Type_: `string`
  - _Default_: `process.cwd()`
  - _Description_: 프로젝트의 기본 디렉토리입니다.
  - _Example_: `'/path/to/project'`
  - _Note_: 이는 모든 Intlayer 관련 디렉토리를 해결하는 데 사용됩니다.
- **dictionaryOutput**:
  - _Type_: `string[]`
  - _Default_: `['intlayer']`
  - _Description_: 사용할 사전 출력의 유형입니다, 예: `'intlayer'` 또는 `'i18next'`.
- **contentDirName**:
  - _Type_: `string`
  - _Default_: `'src'`
  - _Description_: 콘텐츠가 저장되는 디렉토리의 이름입니다.
  - _Example_: `'data'`, `'content'`, `'locales'`
  - _Note_: 기본 디렉토리 수준에 있지 않은 경우 `contentDir`를 업데이트하십시오.
- **contentDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Description_: 콘텐츠가 저장되는 디렉토리 경로입니다.

- **resultDirName**:
  - _Type_: `string`
  - _Default_: `'.intlayer'`
  - _Description_: 결과가 저장되는 디렉토리의 이름입니다.
  - _Example_: `'outputOFIntlayer'`
  - _Note_: 이 디렉토리가 기본 수준에 있지 않은 경우 `resultDir`를 업데이트하십시오.
- **resultDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Description_: 중간 또는 출력 결과를 저장하는 디렉토리 경로입니다.

- **moduleAugmentationDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: 더 나은 IDE 제안 및 유형 검사를 위한 모듈 증강 디렉토리입니다.
  - _Example_: `'intlayer-types'`
  - _Note_: 이를 `tsconfig.json`에 포함해야 합니다.

- **moduleAugmentationDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_: 모듈 증강 및 추가 유형 정의를 위한 경로입니다.

- **dictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'dictionary'`
  - _Description_: 사전을 저장하는 디렉토리입니다.
  - _Example_: `'translations'`
  - _Note_: 결과 디렉토리 수준에 있지 않은 경우 `dictionariesDir`를 업데이트하십시오.
- **dictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Description_: 로컬라이제이션 사전을 저장하는 디렉토리입니다.

- **i18nDictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'i18n_dictionary'`
  - _Description_: i18n 사전을 저장하는 디렉토리입니다.
  - _Example_: `'translations'`
  - _Note_: 결과 디렉토리 수준에 있지 않은 경우 `i18nDictionariesDir`를 업데이트하십시오.
  - _Note_: i18n 사전 출력을 i18next에 포함시켜야 사전을 빌드할 수 있습니다.
- **i18nDictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_: i18n 사전을 저장하는 디렉토리입니다.
  - _Note_: 이 디렉토리는 i18next 출력 유형에 맞게 구성되어야 합니다.

- **typeDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: 사전 유형을 저장하는 디렉토리입니다.
  - _Example_: `'intlayer-types'`
  - _Note_: 결과 디렉토리 수준에 있지 않은 경우 `typesDir`를 업데이트하십시오.

- **typesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Description_: 사전 유형을 저장하는 디렉토리입니다.

- **mainDirName**:
  - _Type_: `string`
  - _Default_: `'main'`
  - _Description_: 주요 파일을 저장하는 디렉토리입니다.
  - _Example_: `'intlayer-main'`
  - _Note_: 결과 디렉토리 수준에 있지 않은 경우 `mainDir`를 업데이트하십시오.
- **mainDir**:
  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Description_: 주요 애플리케이션 파일이 저장되는 디렉토리입니다.
- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: 콘텐츠 검색에서 제외된 디렉토리입니다.
  - _Note_: 이 설정은 아직 사용되지 않지만 향후 구현을 계획하고 있습니다.
