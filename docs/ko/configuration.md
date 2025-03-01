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

다음 섹션에서는 Intlayer에서 사용할 수 있는 다양한 구성 설정에 대해 설명합니다.

---

### 국제화 구성

애플리케이션의 사용 가능한 로케일 및 기본 로케일을 포함한 국제화와 관련된 설정을 정의합니다.

#### 속성

- **locales**:

  - _유형_: `string[]`
  - _기본값_: `['en']`
  - _설명_: 애플리케이션에서 지원하는 로케일 목록입니다.
  - _예제_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _유형_: `string[]`
  - _기본값_: `[]`
  - _설명_: 애플리케이션에서 필수로 요구되는 로케일 목록입니다.
  - _예제_: `[]`
  - _참고_: 비어 있으면 `strict` 모드에서 모든 로케일이 필수로 간주됩니다.
  - _참고_: 필수 로케일은 `locales` 필드에도 정의되어야 합니다.
- **strictMode**:

  - _유형_: `string`
  - _기본값_: `inclusive`
  - _설명_: TypeScript를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다.
  - _참고_: "strict"로 설정하면 번역 `t` 함수는 선언된 각 로케일이 정의되어야 합니다. 하나의 로케일이 누락되거나 구성에 선언되지 않은 로케일이 있으면 오류가 발생합니다.
  - _참고_: "inclusive"로 설정하면 번역 `t` 함수는 선언된 각 로케일이 정의되어야 합니다. 하나의 로케일이 누락되면 경고가 발생하지만, 구성에 선언되지 않았지만 존재하는 로케일은 허용됩니다.
  - _참고_: "loose"로 설정하면 번역 `t` 함수는 모든 기존 로케일을 허용합니다.

- **defaultLocale**:
  - _유형_: `string`
  - _기본값_: `'en'`
  - _설명_: 요청된 로케일을 찾을 수 없을 때 기본적으로 사용되는 로케일입니다.
  - _예제_: `'en'`
  - _참고_: URL, 쿠키 또는 헤더에 로케일이 지정되지 않은 경우 로케일을 결정하는 데 사용됩니다.

---

### 에디터 구성

서버 포트 및 활성 상태를 포함한 통합 에디터와 관련된 설정을 정의합니다.

#### 속성

- **applicationURL**:

  - _유형_: `string`
  - _기본값_: `'*'`
  - _설명_: 애플리케이션의 URL입니다. 보안상의 이유로 에디터의 출처를 제한하는 데 사용됩니다.
  - _예제_:
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _참고_: `'*'`로 설정된 경우 에디터는 모든 출처에서 접근 가능합니다.

- **port**:

  - _유형_: `number`
  - _기본값_: `8000`
  - _설명_: 시각적 에디터 서버에서 사용하는 포트입니다.

- **editorURL**:

  - _유형_: `string`
  - _기본값_: `'http://localhost:8000'`
  - _설명_: 에디터 서버의 URL입니다. 보안상의 이유로 애플리케이션과 상호작용할 수 있는 출처를 제한하는 데 사용됩니다.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
    - `''*'`
  - _참고_: 포트가 변경되었거나 에디터가 다른 도메인에 호스팅된 경우 설정해야 합니다.

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
  - _참고_: true로 설정된 경우 에디터는 애플리케이션과 상호작용할 수 있습니다. false로 설정된 경우 에디터는 애플리케이션과 상호작용할 수 없습니다.

- **clientId**:

  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId 및 clientSecret은 Intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다.
  - _예제_: `true`
  - _참고_: clientId 및 clientSecret은 비공개로 유지되어야 하며 공개적으로 공유되지 않아야 합니다.

- **clientSecret**:

  - _유형_: `string` | `undefined`
  - _기본값_: `undefined`
  - _설명_: clientId 및 clientSecret은 Intlayer 패키지가 oAuth2 인증을 사용하여 백엔드와 인증할 수 있도록 합니다. 액세스 토큰은 프로젝트와 관련된 사용자를 인증하는 데 사용됩니다.
  - _예제_: `true`
  - _참고_: clientId 및 clientSecret은 비공개로 유지되어야 하며 공개적으로 공유되지 않아야 합니다.

- **hotReload**:

  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: 애플리케이션이 변경 사항을 감지할 때 로케일 구성을 핫 리로드해야 하는지 여부를 나타냅니다.
  - _예제_: `true`
  - _참고_: 새 사전이 추가되거나 업데이트될 때 애플리케이션은 페이지에 표시할 콘텐츠를 업데이트합니다.

- **dictionaryPriorityStrategy**:
  - _유형_: `string`
  - _기본값_: `'local_first'`
  - _설명_: 로컬 및 원격 사전이 모두 존재하는 경우 사전의 우선 순위를 결정하는 전략입니다.
  - _예제_: `'distant_first'`

---

### 미들웨어 구성

쿠키, 헤더 및 로케일 관리를 위한 URL 접두사 처리와 같은 미들웨어 동작을 제어하는 설정입니다.

#### 속성

- **headerName**:
  - _유형_: `string`
  - _기본값_: `'x-intlayer-locale'`
  - _설명_: 로케일을 결정하는 데 사용되는 HTTP 헤더의 이름입니다.
  - _예제_: `'x-custom-locale'`
  - _참고_: API 기반 로케일 결정에 유용합니다.
- **cookieName**:
  - _유형_: `string`
  - _기본값_: `'intlayer-locale'`
  - _설명_: 로케일을 저장하는 데 사용되는 쿠키의 이름입니다.
  - _예제_: `'custom-locale'`
  - _참고_: 세션 간 로케일을 유지하는 데 사용됩니다.
- **prefixDefault**:
  - _유형_: `boolean`
  - _기본값_: `true`
  - _설명_: URL에 기본 로케일을 포함할지 여부입니다.
  - _예제_: `false`
  - _참고_: `false`로 설정된 경우 기본 로케일의 URL에는 로케일 접두사가 포함되지 않습니다.
- **basePath**:
  - _유형_: `string`
  - _기본값_: `''`
  - _설명_: 애플리케이션 URL의 기본 경로입니다.
  - _예제_: `'/my-app'`
  - _참고_: 애플리케이션 URL이 구성되는 방식에 영향을 미칩니다.
- **serverSetCookie**:
  - _유형_: `string`
  - _기본값_: `'always'`
  - _설명_: 서버에서 로케일 쿠키를 설정하는 규칙입니다.
  - _옵션_: `'always'`, `'never'`
  - _예제_: `'never'`
  - _참고_: 로케일 쿠키를 매 요청마다 설정할지 여부를 제어합니다.
- **noPrefix**:
  - _유형_: `boolean`
  - _기본값_: `false`
  - _설명_: URL에서 로케일 접두사를 생략할지 여부입니다.
  - _예제_: `true`
  - _참고_: `true`로 설정된 경우 URL에는 로케일 정보가 포함되지 않습니다.

---

### 콘텐츠 구성

애플리케이션 내 콘텐츠 처리와 관련된 설정으로, 디렉토리 이름, 파일 확장자 및 파생 구성을 포함합니다.

#### 속성

- **watch**:
  - _유형_: `boolean`
  - _기본값_: `process.env.NODE_ENV === 'development'`
  - _설명_: Intlayer가 앱의 콘텐츠 선언 파일 변경 사항을 감지하여 관련 사전을 다시 빌드해야 하는지 여부를 나타냅니다.
- **fileExtensions**:
  - _유형_: `string[]`
  - _기본값_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _설명_: 사전을 빌드할 때 검색할 파일 확장자입니다.
  - _예제_: `['.data.ts', '.data.js', '.data.json']`
  - _참고_: 파일 확장자를 사용자 정의하면 충돌을 방지할 수 있습니다.
- **baseDir**:
  - _유형_: `string`
  - _기본값_: `process.cwd()`
  - _설명_: 프로젝트의 기본 디렉토리입니다.
  - _예제_: `'/path/to/project'`
  - _참고_: 모든 Intlayer 관련 디렉토리를 해결하는 데 사용됩니다.
- **dictionaryOutput**:
  - _유형_: `string[]`
  - _기본값_: `['intlayer']`
  - _설명_: 사용할 사전 출력 유형입니다. 예: `'intlayer'` 또는 `'i18next'`.
- **contentDirName**:
  - _유형_: `string`
  - _기본값_: `'src'`
  - _설명_: 콘텐츠가 저장되는 디렉토리의 이름입니다.
  - _예제_: `'data'`, `'content'`, `'locales'`
  - _참고_: 기본 디렉토리 수준에 있지 않은 경우 `contentDir`을 업데이트하십시오.
- **contentDir**:

  - _유형_: `string`
  - _파생됨_: `'baseDir'` / `'contentDirName'`
  - _설명_: 콘텐츠가 저장되는 디렉토리 경로입니다.

- **resultDirName**:
  - _유형_: `string`
  - _기본값_: `'.intlayer'`
  - _설명_: 결과가 저장되는 디렉토리의 이름입니다.
  - _예제_: `'outputOFIntlayer'`
  - _참고_: 이 디렉토리가 기본 수준에 있지 않은 경우 `resultDir`을 업데이트하십시오.
- **resultDir**:

  - _유형_: `string`
  - _파생됨_: `'baseDir'` / `'resultDirName'`
  - _설명_: 중간 또는 출력 결과를 저장하는 디렉토리 경로입니다.

- **moduleAugmentationDirName**:

  - _유형_: `string`
  - _기본값_: `'types'`
  - _설명_: 모듈 확장을 위한 디렉토리로, IDE 제안 및 타입 검사를 개선합니다.
  - _예제_: `'intlayer-types'`
  - _참고_: 이를 `tsconfig.json`에 포함해야 합니다.

- **moduleAugmentationDir**:

  - _유형_: `string`
  - _파생됨_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _설명_: 모듈 확장 및 추가 타입 정의를 위한 경로입니다.

- **dictionariesDirName**:
  - _유형_: `string`
  - _기본값_: `'dictionary'`
  - _설명_: 사전을 저장하는 디렉토리입니다.
  - _예제_: `'translations'`
  - _참고_: 결과 디렉토리 수준에 있지 않은 경우 `dictionariesDir`을 업데이트하십시오.
- **dictionariesDir**:

  - _유형_: `string`
  - _파생됨_: `'resultDir'` / `'dictionariesDirName'`
  - _설명_: 로컬라이제이션 사전을 저장하는 디렉토리입니다.

- **i18nextResourcesDirName**:
  - _유형_: `string`
  - _기본값_: `'i18next_dictionary'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _예제_: `'translations'`
  - _참고_: 결과 디렉토리 수준에 있지 않은 경우 `i18nextResourcesDir`을 업데이트하십시오.
  - _참고_: i18next 사전을 빌드하려면 i18next 출력을 포함해야 합니다.
- **i18nextResourcesDir**:

  - _유형_: `string`
  - _파생됨_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _설명_: i18n 사전을 저장하는 디렉토리입니다.
  - _참고_: 이 디렉토리가 i18next 출력 유형에 대해 구성되었는지 확인하십시오.

- **typeDirName**:

  - _유형_: `string`
  - _기본값_: `'types'`
  - _설명_: 사전 타입을 저장하는 디렉토리입니다.
  - _예제_: `'intlayer-types'`
  - _참고_: 결과 디렉토리 수준에 있지 않은 경우 `typesDir`을 업데이트하십시오.

- **typesDir**:

  - _유형_: `string`
  - _파생됨_: `'resultDir'` / `'typeDirName'`
  - _설명_: 사전 타입을 저장하는 디렉토리입니다.

- **mainDirName**:
  - _유형_: `string`
  - _기본값_: `'main'`
  - _설명_: 메인 파일을 저장하는 디렉토리입니다.
  - _예제_: `'intlayer-main'`
  - _참고_: 결과 디렉토리 수준에 있지 않은 경우 `mainDir`을 업데이트하십시오.
- **mainDir**:
  - _유형_: `string`
  - _파생됨_: `'resultDir'` / `'mainDirName'`
  - _설명_: 메인 애플리케이션 파일이 저장되는 디렉토리입니다.
- **excludedPath**:
  - _유형_: `string[]`
  - _기본값_: `['node_modules']`
  - _설명_: 콘텐츠 검색에서 제외된 디렉토리입니다.
  - _참고_: 이 설정은 아직 사용되지 않았지만 향후 구현될 예정입니다.

---

### 로거 구성

로거를 제어하는 설정으로, 사용할 접두사를 포함합니다.

#### 속성

- **mode**:
  - _유형_: `string`
  - _기본값_: `default`
  - _설명_: 로거의 모드를 나타냅니다.
  - _옵션_: `default`, `verbose`, `disabled`
  - _예제_: `default`
  - _참고_: 로거의 모드입니다. Verbose 모드는 더 많은 정보를 기록하지만 디버깅 목적으로 사용할 수 있습니다. Disabled 모드는 로거를 비활성화합니다.
- **prefix**:
  - _유형_: `string`
  - _기본값_: `'[intlayer] '`
  - _설명_: 로거의 접두사입니다.
  - _예제_: `'[my custom prefix] '`
  - _참고_: 로거의 접두사입니다.
