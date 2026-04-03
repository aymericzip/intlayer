---
createdAt: 2024-08-13
updatedAt: 2026-04-03
title: 구성 (Configuration)
description: 애플리케이션에 Intlayer를 구성하는 방법을 알아보세요. 필요에 따라 Intlayer를 맞춤설정하는 데 사용할 수 있는 다양한 설정과 옵션을 이해하세요.
keywords:
  - 구성
  - 설정
  - 맞춤설정
  - Intlayer
  - 옵션
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-03
    changes: "`currentDomain` 옵션 추가"
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' 및 'dictionary.fill'에 대해 로케일별 객체 표기법 지원 추가"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'content' 구성에서 'system' 구성으로 'baseDir' 이동"
  - version: 8.2.0
    date: 2026-03-09
    changes: "컴파일러 옵션 업데이트, 'output' 및 'noMetadata' 지원 추가"
  - version: 8.1.7
    date: 2026-02-25
    changes: "컴파일러 옵션 업데이트"
  - version: 8.1.5
    date: 2026-02-23
    changes: "컴파일러 'build-only' 옵션 및 딕셔너리 키 접두사 추가"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face 및 Together AI 프로바이더 지원 추가"
  - version: 8.0.5
    date: 2026-02-06
    changes: "AI 구성에 `dataSerialization` 추가"
  - version: 8.0.0
    date: 2026-01-24
    changes: "기본 메커니즘을 더 잘 설명하기 위해 `live` 임포트 모드를 `fetch`로 변경."
  - version: 8.0.0
    date: 2026-01-22
    changes: "빌드 구성 `importMode`를 `dictionary` 구성으로 이동."
  - version: 8.0.0
    date: 2026-01-22
    changes: "라우팅 구성에 `rewrite` 옵션 추가"
  - version: 8.0.0
    date: 2026-01-18
    changes: "콘텐츠 구성에서 시스템 구성을 분리함. 내부 경로를 `system` 속성으로 이동. 콘텐츠 파일과 코드 변환을 분리하기 위해 `codeDir` 추가."
  - version: 8.0.0
    date: 2026-01-18
    changes: "딕셔너리 옵션 `location` 및 `schema` 추가"
  - version: 7.5.1
    date: 2026-01-10
    changes: "JSON5 및 JSONC 파일 형식 지원 추가"
  - version: 7.5.0
    date: 2025-12-17
    changes: "`buildMode` 옵션 추가"
  - version: 7.0.0
    date: 2025-10-25
    changes: "`dictionary` 구성 추가"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware`를 `routing` 구성으로 교체"
  - version: 7.0.0
    date: 2025-10-12
    changes: "`formatCommand` 옵션 추가"
  - version: 6.2.0
    date: 2025-10-12
    changes: "`excludedPath` 옵션 업데이트"
  - version: 6.0.2
    date: 2025-09-23
    changes: "`outputFormat` 옵션 추가"
  - version: 6.0.0
    date: 2025-09-21
    changes: "`dictionaryOutput` 필드 및 `i18nextResourcesDir` 필드 제거"
  - version: 6.0.0
    date: 2025-09-16
    changes: "`live` 임포트 모드 추가"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` 필드를 `liveSync`로 교체하고 `liveSyncPort`, `liveSyncURL` 필드 추가"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport`를 `importMode` 옵션으로 교체"
  - version: 5.6.0
    date: 2025-07-13
    changes: "기본 `contentDir`를 `['src']`에서 `['.']`로 변경"
  - version: 5.5.11
    date: 2025-06-29
    changes: "`docs` 명령 추가"
---

# Intlayer 구성 문서

## 개요

Intlayer 구성 파일을 사용하면 국제화(i18n), 미들웨어, 콘텐츠 관리 등 플러그인의 다양한 측면을 맞춤설정할 수 있습니다. 이 문서는 구성의 각 속성에 대한 자세한 설명을 제공합니다.

---

## 목차

<TOC/>

---

## 구성 파일 지원

Intlayer는 JSON, JS, MJS 및 TS 구성 파일 형식을 허용합니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 구성 파일 예시

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * 사용 가능한 모든 옵션을 보여주는 Intlayer 구성 파일 예시입니다.
 */
const config: IntlayerConfig = {
  /**
   * 국제화 설정 구성.
   */
  internationalization: {
    /**
     * 애플리케이션에서 지원하는 로케일 목록.
     * 기본값: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 각 딕셔너리에 정의되어야 하는 필수 로케일 목록.
     * 비어 있는 경우 `strict` 모드에서는 모든 로케일이 필수입니다.
     * 기본값: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 국제화된 콘텐츠의 엄격도 수준.
     * - "strict": 선언된 로케일이 누락되거나 선언되지 않은 로케일이 사용된 경우 오류.
     * - "inclusive": 선언된 로케일이 누락된 경우 경고.
     * - "loose": 존재하는 모든 로케일을 수용.
     * 기본값: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * 요청된 로케일을 찾을 수 없을 때 폴백으로 사용되는 기본 로케일.
     * 기본값: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * 딕셔너리 작업 및 폴백 동작을 제어하는 설정.
   */
  dictionary: {
    /**
     * 딕셔너리 임포트 방법을 제어합니다.
     * - "static": 빌드 시 정적으로 임포트됩니다.
     * - "dynamic": Suspense를 사용하여 동적으로 임포트됩니다.
     * - "fetch": Live Sync API를 통해 동적으로 가져옵니다.
     * 기본값: "static"
     */
    importMode: "static",

    /**
     * AI를 사용하여 누락된 번역을 자동으로 채우는 전략.
     * 불리언 값이거나 채워진 콘텐츠를 저장할 경로 패턴일 수 있습니다.
     * 기본값: true
     */
    fill: true,

    /**
     * 딕셔너리 파일의 물리적 위치.
     * - "local": 로컬 파일 시스템에 저장됩니다.
     * - "remote": Intlayer CMS에 저장됩니다.
     * - "hybrid": 로컬 및 Intlayer CMS 모두에 저장됩니다.
     * - "plugin" (또는 임의의 문자열): 플러그인이나 사용자 정의 소스에서 제공됩니다.
     * 기본값: "local"
     */
    location: "local",

    /**
     * 콘텐츠를 자동으로 변환할지 여부(예: Markdown을 HTML로).
     * 기본값: false
     */
    contentAutoTransformation: false,
  },

  /**
   * 라우팅 및 미들웨어 구성.
   */
  routing: {
    /**
     * 로케일 라우팅 전략.
     * - "prefix-no-default": 기본 언어를 제외한 모든 언어에 접두사 사용(예: /dashboard, /fr/dashboard).
     * - "prefix-all": 모든 언어에 접두사 사용(예: /en/dashboard, /fr/dashboard).
     * - "no-prefix": URL에 로케일을 표시하지 않음.
     * - "search-params": ?locale=... 사용
     * 기본값: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * 사용자가 선택한 로케일 저장 위치.
     * 옵션: 'cookie', 'localStorage', 'sessionStorage', 'header' 또는 이들의 배열.
     * 기본값: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * 애플리케이션 URL의 기본 경로.
     * 기본값: ""
     */
    basePath: "",

    /**
     * 특정 로케일 경로에 대한 사용자 정의 URL 재작성 규칙.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * 도메인 기반 라우팅을 위해 로케일을 도메인 호스트 이름에 매핑합니다.
     * 이 로케일의 URL은 절대 URL이 됩니다(예: https://intlayer.cn/).
     * 도메인이 로케일을 의미하므로 경로에 로케일 접두사가 추가되지 않습니다.
     * 기본값: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * 콘텐츠 파일을 찾고 처리하기 위한 설정.
   */
  content: {
    /**
     * 딕셔너리 스캔을 위한 파일 확장자.
     * 기본값: ['.content.ts', '.content.js', '.content.json' 등]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content 파일이 위치한 디렉토리.
     * 기본값: ["."]
     */
    contentDir: ["src"],

    /**
     * 소스 코드가 위치한 디렉토리.
     * 빌드 최적화 및 코드 변환에 사용됩니다.
     * 기본값: ["."]
     */
    codeDir: ["src"],

    /**
     * 스캔에서 제외할 패턴.
     * 기본값: ['node_modules', '.intlayer' 등]
     */
    excludedPath: ["node_modules"],

    /**
     * 개발 중 변경 사항을 감시하고 딕셔너리를 재생성할지 여부.
     * 기본값: 개발 모드에서 true
     */
    watch: true,

    /**
     * 새로 생성/업데이트된 .content 파일을 포맷팅하는 명령.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * 비주얼 에디터 구성.
   */
  editor: {
    /**
     * 비주얼 에디터 활성화 여부.
     * 기본값: false
     */
    enabled: true,

    /**
     * 오리진 검증을 위한 애플리케이션 URL.
     * 기본값: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * 로컬 에디터 서버 포트.
     * 기본값: 8000
     */
    port: 8000,

    /**
     * 에디터 공개 URL.
     * 기본값: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * 기본값: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * 백엔드 API 서버 URL.
     * 기본값: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * 실시간 콘텐츠 동기화 활성화 여부.
     * 기본값: false
     */
    liveSync: true,
  },

  /**
   * AI 기반 번역 및 생성 설정.
   */
  ai: {
    /**
     * 사용할 AI 프로바이더.
     * 옵션: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * 기본값: 'openai'
     */
    provider: "openai",

    /**
     * 선택한 프로바이더에 사용할 모델.
     */
    model: "gpt-4o",

    /**
     * 프로바이더의 API 키.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * AI의 번역 생성을 돕기 위한 글로벌 컨텍스트.
     */
    applicationContext: "이것은 여행 예약 애플리케이션입니다.",

    /**
     * AI API의 기본 URL.
     */
    baseURL: "http://localhost:3000",

    /**
     * 데이터 직렬화 (Data Serialization)
     *
     * 옵션:
     * - "json": 기본값, 안정적임; 더 많은 토큰 소비.
     * - "toon": 더 빠르고 토큰 소모가 적지만 JSON보다 일관성이 낮음.
     *
     * 기본값: "json"
     */
    dataSerialization: "json",
  },

  /**
   * 빌드 및 최적화 설정.
   */
  build: {
    /**
     * 빌드 실행 모드.
     * - "auto": 애플리케이션 빌드 중 자동 빌드.
     * - "manual": 명시적인 빌드 명령 필요.
     * 기본값: "auto"
     */
    mode: "auto",

    /**
     * 사용되지 않는 딕셔너리를 제거하여 최종 번들을 최적화할지 여부.
     * 기본값: 프로덕션 환경에서 true
     */
    optimize: true,

    /**
     * 생성된 딕셔너리 파일의 출력 형식.
     * 기본값: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * 빌드 중에 TypeScript 타입 체크를 수행할지 여부.
     * 기본값: false
     */
    checkTypes: false,
  },

  /**
   * 로거 구성.
   */
  log: {
    /**
     * 로깅 모드.
     * - "default": 표준 로깅.
     * - "verbose": 디버깅을 위한 상세 로깅.
     * - "disabled": 로깅 비활성화.
     * 기본값: "default"
     */
    mode: "default",

    /**
     * 모든 로그 메시지의 접두사.
     * 기본값: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * 시스템 구성 (고급 용도)
   */
  system: {
    /**
     * 로컬라이즈된 딕셔너리가 저장되는 디렉토리.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * 모듈 보강(module augmentation) 디렉토리.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * 병합되지 않은 딕셔너리 저장 디렉토리.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * 딕셔너리 타입 디렉토리.
     */
    typesDir: ".intlayer/types",

    /**
     * 주 애플리케이션 파일 위치.
     */
    mainDir: ".intlayer/main",

    /**
     * 컴파일된 구성 파일 디렉토리.
     */
    configDir: ".intlayer/config",

    /**
     * 캐시 파일 디렉토리.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * 컴파일러 구성 (고급 용도)
   */
  compiler: {
    /**
     * 컴파일러 활성화 여부.
     *
     * - false: 컴파일러 비활성화.
     * - true: 컴파일러 활성화.
     * - "build-only": 빠른 시작을 위해 개발 단계에서는 컴파일러 건너뜀.
     *
     * 기본값: false
     */
    enabled: true,

    /**
     * 출력 파일의 경로를 정의합니다. `outputDir`을 대체합니다.
     *
     * - `./` 경로는 컴포넌트 디렉토리를 기준으로 해석됩니다.
     * - `/` 경로는 프로젝트 루트(`baseDir`)를 기준으로 해석됩니다.
     *
     * - 경로에 `{{locale}}` 변수가 포함되어 있으면 언어별로 별도의 딕셔너리 생성을 트리거합니다.
     *
     * 예시:
     * ```ts
     * {
     *   // 컴포넌트 근처에 다국어 .content.ts 파일 생성
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // 템플릿 문자열을 사용한 동일한 동작
     * }
     * ```
     *
     * ```ts
     * {
     *   // 프로젝트 루트의 로케일별 폴더에 JSON 파일 생성
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // 템플릿 문자열을 사용한 동일한 동작
     * }
     * ```
     *
     * 변수 목록:
     *   - `fileName`: 파일 이름.
     *   - `key`: 콘텐츠 키.
     *   - `locale`: 콘텐츠 로케일.
     *   - `extension`: 파일 확장자.
     *   - `componentFileName`: 컴포넌트 파일 이름.
     *   - `componentExtension`: 컴포넌트 파일 확장자.
     *   - `format`: 딕셔너리 형식.
     *   - `componentFormat`: 컴포넌트 딕셔너리 형식.
     *   - `componentDirPath`: 컴포넌트 디렉토리 경로.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부.
     * 이렇게 하면 컴파일러를 한 번 실행하여 앱을 변환한 다음 나중에 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 생성된 파일에 콘텐츠만 유지할지 여부. 로케일별 i18next 또는 ICU MessageFormat JSON 출력에 유용합니다.
     */
    noMetadata: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "", // 추출된 딕셔너리 키에 선택적 접두사 추가
  },

  /**
   * 딕셔너리 콘텐츠 검증을 위한 사용자 정의 스키마.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * 플러그인 구성.
   */
  plugins: [],
};

export default config;
````

---

## 구성 참조

다음 섹션에서는 Intlayer에서 사용 가능한 다양한 구성 설정에 대해 자세히 설명합니다.

---

### 국제화 구성 (Internationalization)

사용 가능한 로케일과 애플리케이션의 기본 로케일을 포함하여 국제화와 관련된 설정을 정의합니다.

| 필드              | 설명                                                              | 타입       | 기본값              | 예시                 | 참고                                                                                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | 애플리케이션에서 지원하는 로케일 목록.                            | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                      |
| `requiredLocales` | 애플리케이션에서 필수적인 로케일 목록.                            | `string[]` | `[]`                | `[]`                 | • 비어 있는 경우 `strict` 모드에서는 모든 로케일이 필수입니다.<br/>• 필수 로케일이 `locales` 필드에도 정의되어 있는지 확인하세요.                                                                                                                                                    |
| `strictMode`      | TypeScript를 사용하여 국제화된 콘텐츠의 강력한 구현을 보장합니다. | `string`   | `'inclusive'`       |                      | • `"strict"`인 경우: `t` 함수는 선언된 모든 로케일이 정의되어야 하며, 누락되거나 선언되지 않은 경우 오류를 발생시킵니다.<br/>• `"inclusive"`인 경우: 로케일 누락 시 경고를 표시하지만, 선언되지 않은 로케일도 수용합니다.<br/>• `"loose"`인 경우: 존재하는 모든 로케일을 수용합니다. |
| `defaultLocale`   | 요청된 로케일을 찾을 수 없을 때 폴백으로 사용되는 기본 로케일.    | `string`   | `Locales.ENGLISH`   | `'en'`               | URL, 쿠키 또는 헤더에 로케일이 지정되지 않은 경우 로케일을 결정하는 데 사용됩니다.                                                                                                                                                                                                   |

---

### 에디터 구성 (Editor)

서버 포트 및 활성화 상태를 포함하여 시각적 에디터 설정을 정의합니다.

| 필드                         | 설명                                                                                                                                                              | 타입                              | 기본값                              | 예시                                                                                            | 참고                                                                                                                                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | 애플리케이션의 URL.                                                                                                                                               | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • 보안을 위해 에디터의 오리진을 제한하는 데 사용됩니다.<br/>• `'*'`로 설정하면 에디터가 모든 오리진에서 접근 가능합니다.                                                                                             |
| `port`                       | 시각적 에디터 서버에서 사용되는 포트.                                                                                                                             | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                      |
| `editorURL`                  | 에디터 서버의 URL.                                                                                                                                                | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • 애플리케이션과 상호작용할 수 있는 오리진을 제한하는 데 사용됩니다.<br/>• `'*'`로 설정하면 모든 오리진에서 접근 가능합니다.<br/>• 포트가 변경되거나 에디터가 다른 도메인에 호스팅되는 경우 설정해야 합니다.         |
| `cmsURL`                     | Intlayer CMS URL.                                                                                                                                                 | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                      |
| `backendURL`                 | 백엔드 서버 URL.                                                                                                                                                  | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                      |
| `enabled`                    | 애플리케이션이 시각적 에디터와 상호작용해야 하는지 여부.                                                                                                          | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • `false`인 경우 에디터가 애플리케이션과 상호작용할 수 없습니다.<br/>• 특정 환경에서 이를 비활성화하면 보안이 강화됩니다.                                                                                            |
| `clientId`                   | oAuth2를 통해 백엔드에서 intlayer 패키지가 인증할 수 있도록 합니다. 액세스 토큰을 받으려면 [intlayer.org/project](https://app.intlayer.org/project)로 이동하세요. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 비밀로 유지해야 하며 환경 변수를 사용하세요.                                                                                                                                                                         |
| `clientSecret`               | oAuth2를 통해 백엔드에서 intlayer 패키지가 인증할 수 있도록 합니다. 액세스 토큰을 받으려면 [intlayer.org/project](https://app.intlayer.org/project)로 이동하세요. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 비밀로 유지해야 하며 환경 변수를 사용하세요.                                                                                                                                                                         |
| `dictionaryPriorityStrategy` | 로컬 및 원격 딕셔너리가 모두 있을 때 딕셔너리 우선순위 전략.                                                                                                      | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: 원격 딕셔너리가 로컬보다 우선합니다.<br/>• `'local_first'`: 로컬 딕셔너리가 원격보다 우선합니다.                                                                                                |
| `liveSync`                   | CMS <br/> 비주얼 에디터 <br/> 백엔드 서버에서 변경 사항이 감지될 때 앱 서버가 콘텐츠를 핫 리로드해야 하는지 여부.                                                 | `boolean`                         | `true`                              | `true`                                                                                          | • 딕셔너리가 추가/업데이트되면 앱이 페이지 콘텐츠를 업데이트합니다.<br/>• Live Sync는 콘텐츠를 다른 서버에 의존하므로 성능에 약간의 영향을 줄 수 있습니다.<br/>• 두 서버를 동일한 머신에 호스팅하는 것이 권장됩니다. |
| `liveSyncPort`               | Live Sync 서버 포트.                                                                                                                                              | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                      |
| `liveSyncURL`                | Live Sync 서버 URL.                                                                                                                                               | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | 기본적으로 localhost를 가리키며, 원격 Live Sync 서버로 변경할 수 있습니다.                                                                                                                                           |

---

### 라우팅 구성 (Routing)

URL 구조, 로케일 저장 및 미들웨어 처리를 포함하여 라우팅 동작을 제어하기 위한 설정입니다.

| 필드       | 설명                                                                                                                                                                               | 타입                                                                                                                                                                                                         | 기본값                 | 예시                                                                                                                                                                                         | 참고                                                                                                                                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | 로케일 처리를 위한 URL 라우팅 모드.                                                                                                                                                | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) 또는 `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: 로케일이 다른 수단으로 관리됨. `'search-params'`: `/dashboard?locale=fr` | 쿠키나 로컬 스토리지 관리에는 영향을 주지 않습니다.                                                                                                                                                                                                                                           |
| `storage`  | 클라이언트에서 로케일을 저장하기 위한 구성.                                                                                                                                        | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                           | 아래의 저장소 옵션 표를 참조하세요.                                                                                                                                                                                                                                                           |
| `basePath` | 애플리케이션 URL의 기본 경로.                                                                                                                                                      | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                  | 앱이 `https://example.com/my-app`에 있는 경우 basePath는 `'/my-app'`이며 URL은 `https://example.com/my-app/en`이 됩니다.                                                                                                                                                                      |
| `rewrite`  | 특정 로케일 경로에 대해 기본 라우팅 모드를 재정의하기 위한 사용자 정의 URL 재작성 규칙. 동적 `[param]` 매개변수를 지원합니다.                                                      | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | 아래 예시 참조                                                                                                                                                                               | • Rewrite 규칙은 `mode`보다 우선순위가 높습니다.<br/>• Next.js 및 Vite와 함께 작동합니다.<br/>• `getLocalizedUrl()`은 일치하는 규칙을 자동으로 적용합니다.<br/>• [사용자 정의 URL 재작성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md)을 참조하세요. |
| `domains`  | 도메인 기반 라우팅을 위해 로케일을 도메인 호스트 이름에 매핑합니다. 설정된 경우 로케일의 URL은 해당 도메인을 베이스(절대 URL)로 사용하며 경로에 로케일 접두사가 추가되지 않습니다. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                  | • 호스트 이름에 포함되지 않은 경우 기본 프로토콜은 `https://`입니다.<br/>• 도메인 자체가 로케일을 식별하므로 `/zh/` 접두사가 추가되지 않습니다.<br/>• `getLocalizedUrl('/', 'zh')`는 `https://intlayer.zh/`를 반환합니다.                                                                     |

**`rewrite` 예시**:

```typescript
routing: {
  mode: "prefix-no-default", // 폴백 전략
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### 저장소 옵션 (Storage Options)

| 값                 | 참고                                                                                                                                                                                            | 설명                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `'cookie'`         | • GDPR 준수를 위해 적절한 사용자 동의를 확인하세요.<br/>• `CookiesAttributes`를 통해 맞춤설정 가능 (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).                | 로케일을 쿠키에 저장하며 클라이언트와 서버 측 모두에서 접근 가능합니다. |
| `'localStorage'`   | • 명시적으로 삭제하지 않는 한 만료되지 않습니다.<br/>• Intlayer Proxy는 접근할 수 없습니다.<br/>• `StorageAttributes`를 통해 맞춤설정 가능 (`{ type: 'localStorage', name: 'custom-locale' }`). | 만료 없이 브라우저에 로케일을 저장합니다(클라이언트 측 전용).           |
| `'sessionStorage'` | • 탭/창이 닫히면 삭제됩니다.<br/>• Intlayer Proxy는 접근할 수 없습니다.<br/>• `StorageAttributes`를 통해 맞춤설정 가능 (`{ type: 'sessionStorage', name: 'custom-locale' }`).                   | 페이지 세션 기간 동안 로케일을 저장합니다(클라이언트 측 전용).          |
| `'header'`         | • API 호출 시 유용합니다.<br/>• 클라이언트 측에서는 접근할 수 없습니다.<br/>• `StorageAttributes`를 통해 맞춤설정 가능 (`{ type: 'header', name: 'custom-locale' }`).                           | HTTP 헤더를 통해 로케일을 전송하거나 유지합니다(서버 측 전용).          |

#### 쿠키 속성 (Cookies Attributes)

쿠키 저장소를 사용하는 경우 추가 쿠키 속성을 구성할 수 있습니다:

| 필드       | 설명                                     | 타입                                                  |
| ---------- | ---------------------------------------- | ----------------------------------------------------- |
| `name`     | 쿠키 이름. 기본값: `'INTLAYER_LOCALE'`   | `string`                                              |
| `domain`   | 쿠키 도메인. 기본값: `undefined`         | `string`                                              |
| `path`     | 쿠키 경로. 기본값: `undefined`           | `string`                                              |
| `secure`   | HTTPS 필요 여부. 기본값: `undefined`     | `boolean`                                             |
| `httpOnly` | HTTP-only 플래그. 기본값: `undefined`    | `boolean`                                             |
| `sameSite` | SameSite 정책.                           | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | 만료 날짜 또는 일수. 기본값: `undefined` | `Date` &#124; <br/> `number`                          |

#### 저장소 속성 (Storage Attributes)

localStorage 또는 sessionStorage 사용 시:

| 필드   | 설명                                          | 타입                                             |
| ------ | --------------------------------------------- | ------------------------------------------------ |
| `type` | 저장소 유형.                                  | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | 스토리지 키 이름. 기본값: `'INTLAYER_LOCALE'` | `string`                                         |

#### 구성 예시

다음은 v7의 새로운 라우팅 구조를 사용하는 몇 가지 일반적인 구성 예시입니다:

**기본 구성 (Standard)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**GDPR 준수 구성**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**검색 매개변수 모드 (Search Params)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**사용자 정의 저장소를 사용한 접두사 없는 모드 (No-Prefix)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**동적 경로를 포함한 사용자 정의 URL 재작성**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // 재작성되지 않은 경로에 대한 폴백
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### 콘텐츠 구성 (Content)

디렉토리 이름, 파일 확장자 및 파생된 구성을 포함하여 애플리케이션의 콘텐츠 관리를 위한 설정입니다.

| 필드             | 설명                                                                                                | 타입       | 기본값                                                                                                                                                                    | 예시                                                                                                                                                                                  | 참고                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Intlayer가 딕셔너리 재생성을 위해 콘텐츠 선언 파일의 변경 사항을 감시해야 하는지 여부를 지정합니다. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                             |
| `fileExtensions` | 딕셔너리 컴파일 시 스캔할 파일 확장자.                                                              | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | 맞춤설정 시 충돌을 피하는 데 도움이 될 수 있습니다.                                                                                         |
| `contentDir`     | 콘텐츠 정의 파일(`.content.*`)이 위치한 디렉토리 경로.                                              | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | 콘텐츠 파일을 추적하고 딕셔너리를 재생성하는 데 사용됩니다.                                                                                 |
| `codeDir`        | 기본 디렉토리를 기준으로 소스 코드가 위치한 디렉토리 경로.                                          | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • 불필요한 부분을 제거하거나 최적화하기 위해 코드 파일 번역 변환을 추적하는 데 사용됩니다.<br/>• `contentDir`과 분리하면 성능이 향상됩니다. |
| `excludedPath`   | 콘텐츠 스캔에서 제외할 디렉토리.                                                                    | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | 현재 사용되지 않으며 미래를 위해 계획되었습니다.                                                                                            |
| `formatCommand`  | Intlayer가 파일 내용을 로컬에 작성할 때 콘텐츠 파일을 포맷팅하는 명령.                              | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}`은 파일 경로로 대체됩니다.<br/>• 정의되지 않은 경우 Intlayer는 자동으로 감지를 시도합니다(prettier, biome, eslint 테스트).      |

---

### 딕셔너리 구성 (Dictionary)

자동 채우기 동작 및 콘텐츠 생성을 포함하여 딕셔너리 작업을 제어하기 위한 옵션입니다.

| 필드                        | 설명                                                                                                                                                   | 타입                                                                                                            | 기본값      | 예시                                                                                        | 참고                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | 자동 채우기(AI 번역) 출력 파일 생성을 제어합니다.                                                                                                      | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`      | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: 기본 경로(소스와 동일한 파일).<br/>• `false`: 비활성화.<br/>• 문자열/함수 패턴은 로케일별 생성을 허용합니다.<br/>• 로케일별 객체: 각 로케일이 자체 패턴을 가지며 `false`는 해당 로케일을 제외합니다.<br/>• `{{locale}}`을 포함하면 로케일별 생성이 가능합니다.<br/>• 딕셔너리 수준의 `fill` 설정은 항상 이 글로벌 설정보다 우선합니다.                               |
| `description`               | 에디터 및 CMS가 딕셔너리의 목적을 이해하는 데 도움이 됩니다. AI 번역 생성을 위한 컨텍스트로도 사용됩니다.                                              | `string`                                                                                                        | `undefined` | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                |
| `locale`                    | 딕셔너리를 특정 로케일 전용 형식으로 전환합니다. 선언된 모든 필드가 번역 노드가 됩니다. 누락된 경우 딕셔너리는 다국어 번역을 포함할 것으로 간주됩니다. | `LocalesValues`                                                                                                 | `undefined` | `'en'`                                                                                      | 여러 번역이 포함된 형식이 아닌 특정 언어 전용 딕셔너리인 경우 사용하세요.                                                                                                                                                                                                                                                                                                      |
| `contentAutoTransformation` | 콘텐츠 문자열을 타입화된 노드(Markdown, HTML 또는 삽입(insertion))로 자동 변환할지 여부.                                                               | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`     | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` .<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` .<br/>• Insertion : `Hello {{name}}` → `insert('Hello {{name}}')` .                                                                                                                                                                                                |
| `location`                  | 딕셔너리 파일이 저장되는 위치와 CMS와의 동기화 방식을 지정합니다.                                                                                      | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`   | `'hybrid'`                                                                                  | • `'local'`: 로컬 관리만 해당.<br/>• `'remote'`: 원격 관리(CMS)만 해당.<br/>• `'hybrid'`: 로컬 및 원격 관리 모두 해당.<br/>• `'plugin'` 또는 사용자 정의 문자열: 플러그인이나 사용자 정의 소스를 통해 관리.                                                                                                                                                                    |
| `importMode`                | 딕셔너리 임포트 방법을 제어합니다.                                                                                                                     | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`  | `'dynamic'`                                                                                 | • `'static'`: 정적 임포트.<br/>• `'dynamic'`: Suspense를 통한 동적 임포트.<br/>• `'fetch'`: Live Sync API를 통한 페칭; 실패 시 `'dynamic'`으로 폴백.<br/>• `@intlayer/babel` 및 `@intlayer/swc` 플러그인이 필요합니다.<br/>• 키가 정적으로 선언되어야 합니다.<br/>• `optimize`가 비활성화된 경우 무시됩니다.<br/>• `getIntlayer`, `getDictionary` 등에는 영향을 주지 않습니다. |
| `priority`                  | 딕셔너리의 우선순위. 딕셔너리 간의 충돌 해결 시 더 높은 값이 낮은 값보다 우선합니다.                                                                   | `number`                                                                                                        | `undefined` | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                |
| `live`                      | DEPRECATED — `importMode: 'fetch'`를 사용하세요. 딕셔너리 콘텐츠를 Live Sync API를 통해 동적으로 가져올지 여부를 나타냈습니다.                         | `boolean`                                                                                                       | `undefined` |                                                                                             | v8.0.0에서 `importMode: 'fetch'`로 이름이 변경되었습니다.                                                                                                                                                                                                                                                                                                                      |
| `schema`                    | JSON 스키마 검증을 위해 Intlayer에서 자동으로 생성합니다.                                                                                              | `'https://intlayer.org/schema.json'`                                                                            | 자동 생성됨 |                                                                                             | 수동으로 편집하지 마세요.                                                                                                                                                                                                                                                                                                                                                      |
| `title`                     | 에디터 및 CMS에서 딕셔너리를 식별하는 데 도움이 됩니다.                                                                                                | `string`                                                                                                        | `undefined` | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                |
| `tags`                      | 딕셔너리를 분류하고 에디터 및 AI에게 컨텍스트나 지침을 제공합니다.                                                                                     | `string[]`                                                                                                      | `undefined` | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                |
| `version`                   | 원격 딕셔너리의 버전. 현재 사용 중인 버전을 추적하는 데 도움이 됩니다.                                                                                 | `string`                                                                                                        | `undefined` | `'1.0.0'`                                                                                   | • CMS에서 관리됩니다.<br/>• 로컬에서 편집하지 마세요.                                                                                                                                                                                                                                                                                                                          |

**`fill` 예시**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### 로거 구성 (Log)

Intlayer 로그 출력 맞춤설정을 위한 설정입니다.

| 필드     | 설명                       | 타입                                                           | 기본값          | 예시             | 참고                                                                                                    |
| -------- | -------------------------- | -------------------------------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `mode`   | 로거 모드를 지정합니다.    | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`      | • `'verbose'`: 디버깅을 위해 더 많은 정보를 기록합니다.<br/>• `'disabled'`: 모든 로깅을 비활성화합니다. |
| `prefix` | 모든 로그 메시지의 접두사. | `string`                                                       | `'[intlayer] '` | `'[my prefix] '` |                                                                                                         |

---

### AI 구성 (AI)

프로바이더, 모델 및 API 키를 포함하여 Intlayer 내의 AI 기능을 관리하기 위한 설정입니다.

[Intlayer Dashboard](https://app.intlayer.org/project)에서 액세스 키를 등록한 경우 이 구성은 선택 사항입니다. Intlayer는 사용자의 필요에 따라 가장 비용 효율적이고 효율적인 AI 솔루션을 자동으로 관리합니다. 기본 설정을 사용하면 Intlayer가 최신 모델을 사용하도록 지속적으로 업데이트되므로 가장 장기적인 지원이 보장됩니다.

자체 API 키나 특정 모델을 선호하는 경우 고유한 AI 구성을 정의할 수 있습니다.
이 AI 구성은 Intlayer 환경에서 전역적으로 사용됩니다. `fill`과 같은 CLI 명령은 이 설정을 기본값으로 사용하며 SDK, 시각적 에디터 및 CMS도 마찬가지입니다. 명령 매개변수를 사용하여 특정 사용 사례에 대해 이러한 기본값을 재정의할 수 있습니다.

Intlayer는 최대의 유연성을 보장하기 위해 다양한 AI 프로바이더를 지원합니다. 현재 지원되는 프로바이더는 다음과 같습니다:

- **OpenAI** (Default)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| 필드                 | 설명                                                                                                             | 타입                                                                                                                                                                                                                                                                                                                                                                                           | 기본값      | 예시                                                          | 참고                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`           | Intlayer AI 기능에 사용할 프로바이더.                                                                            | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | 여러 프로바이더는 서로 다른 API 키가 필요하며 가격 구조도 다릅니다.                                                                                                                        |
| `model`              | AI 기능에 사용할 AI 모델.                                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                       | 없음        | `'gpt-4o-2024-11-20'`                                         | 특정 모델은 프로바이더에 따라 다릅니다.                                                                                                                                                    |
| `temperature`        | AI 응답의 무작위성을 제어합니다.                                                                                 | `number`                                                                                                                                                                                                                                                                                                                                                                                       | 없음        | `0.1`                                                         | 온도가 높을수록 창의적이지만 신뢰성이 낮아집니다.                                                                                                                                          |
| `apiKey`             | 선택한 프로바이더의 API 키.                                                                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                       | 없음        | `process.env.OPENAI_API_KEY`                                  | 비밀로 유지해야 하며 환경 변수를 사용하세요.                                                                                                                                               |
| `applicationContext` | AI가 더 정확한 번역을 생성할 수 있도록 돕는 애플리케이션에 대한 추가 컨텍스트(도메인, 대상 고객, 어조, 용어 등). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | 없음        | `'my custom app context'`                                     | 규칙을 추가하는 데 사용할 수 있습니다 (예: `"URL은 번역하지 마세요"` ).                                                                                                                    |
| `baseURL`            | AI API에 대한 기본 URL.                                                                                          | `string`                                                                                                                                                                                                                                                                                                                                                                                       | 없음        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | 로컬 또는 맞춤형 AI API 엔드포인트를 가리킬 수 있습니다.                                                                                                                                   |
| `dataSerialization`  | AI 기능에 대한 데이터 직렬화 형식.                                                                               | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: 기본값, 안정적임; 더 많은 토큰 소비.<br/>• `'toon'`: 더 적은 토큰 소모, 덜 안정적임.<br/>• 모델에 로직 실행을 위한 추가 파라미터(추론 노력(reasoning effort) 등)를 전달합니다. |

---

### 빌드 구성 (Build)

Intlayer가 애플리케이션의 국제화를 최적화하고 컴파일하는 방법을 제어하기 위한 설정입니다.

빌드 설정은 `@intlayer/babel` 및 `@intlayer/swc` 플러그인에 적용됩니다.

> 개발 모드에서 Intlayer는 개발 프로세스를 용이하게 하기 위해 정적 딕셔너리 임포트를 사용합니다.

> 최적화 시 Intlayer는 딕셔너리 호출을 코드 분할(chunking) 최적화로 대체하여 실제 사용되는 딕셔너리만 임포트되도록 합니다.

| 필드              | 설명                                                                       | 타입                             | 기본값                                                                                                                                                                            | 예시                                                                          | 참고                                                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | 빌드 실행 모드를 제어합니다.                                               | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: 애플리케이션 빌드 중 자동으로 빌드가 트리거됩니다.<br/>• `'manual'`: 명시적인 빌드 명령을 통해서만 실행됩니다.<br/>• 딕셔너리 빌드를 원치 않을 때 유용할 수 있습니다(예: Node.js 환경에서 실행하지 않으려는 경우).                                                                          |
| `optimize`        | 빌드 최적화 수행 여부를 제어합니다.                                        | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • 정의되지 않은 경우 프레임워크 빌드(Vite/Next.js) 중에 트리거됩니다.<br/>• `true`인 경우 개발 모드에서도 최적화를 강제합니다.<br/>• `false`인 경우 비활성화합니다.<br/>• 활성화된 경우 딕셔너리 호출을 chunking 최적화로 대체합니다.<br/>• `@intlayer/babel` 및 `@intlayer/swc` 플러그인이 필요합니다. |
| `checkTypes`      | 빌드 시 TypeScript 타입 체크를 수행하고 오류를 기록할지 여부를 지정합니다. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | 빌드 속도가 느려질 수 있습니다.                                                                                                                                                                                                                                                                         |
| `outputFormat`    | 딕셔너리 출력 형식을 제어합니다.                                           | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                         |
| `traversePattern` | 최적화 중에 스캔할 파일 패턴.                                              | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • 최적화를 관련 파일로 제한하여 빌드 성능을 향상시킵니다.<br/>• `optimize`가 비활성화된 경우 무시됩니다.<br/>• glob 패턴을 사용합니다.                                                                                                                                                                  |

---

### 시스템 구성 (System)

이 설정은 고급 사용자와 Intlayer 내부 구성을 위한 것입니다.

| 필드                      | 설명                                      | 타입     | 기본값                            | 예시 | 참고 |
| ------------------------- | ----------------------------------------- | -------- | --------------------------------- | ---- | ---- |
| `dictionariesDir`         | 컴파일된 딕셔너리의 위치.                 | `string` | `'.intlayer/dictionary'`          |      |      |
| `moduleAugmentationDir`   | TypeScript 모듈 보강이 위치할 디렉토리.   | `string` | `'.intlayer/types'`               |      |      |
| `unmergedDictionariesDir` | 병합되지 않은 딕셔너리가 위치할 디렉토리. | `string` | `'.intlayer/unmerged_dictionary'` |      |      |
| `typesDir`                | 생선된 타입이 위치할 디렉토리.            | `string` | `'.intlayer/types'`               |      |      |
| `mainDir`                 | Intlayer 메인 파일이 위치할 디렉토리.     | `string` | `'.intlayer/main'`                |      |      |
| `configDir`               | 컴파일된 구성 파일이 위치할 디렉토리.     | `string` | `'.intlayer/config'`              |      |      |
| `cacheDir`                | 캐시 파일이 위치할 디렉토리.              | `string` | `'.intlayer/cache'`               |      |      |

---

### 컴파일러 구성 (Compiler)

컴포넌트에서 직접 딕셔너리를 수집하는 Intlayer 컴파일러의 설정을 제어합니다.

| 필드                  | 설명                                                                                                                                                                                                                                                                                                          | 타입                                                                                                            | 기본값      | 예시                                                                                                                                                     | 참고                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | 딕셔너리 수집을 위해 컴파일러 활성화 여부를 나타냅니다.                                                                                                                                                                                                                                                       | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'`는 개발 중 빠른 시작을 위해 컴파일러를 건너뛰며 빌드 명령 중에만 실행됩니다.                                                                                                                |
| `dictionaryKeyPrefix` | 수집된 딕셔너리 키의 접두사.                                                                                                                                                                                                                                                                                  | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | 충돌을 피하기 위해 파일 이름을 기반으로 생성된 키 앞에 추가됩니다.                                                                                                                                        |
| `saveComponents`      | 변환 후 컴포넌트를 저장할지 여부.                                                                                                                                                                                                                                                                             | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • `true`인 경우 원본 파일이 변환된 버전으로 덮어씌워집니다.<br/>• 컴파일러를 한 번 실행하고 나중에 제거할 수 있도록 합니다.                                                                               |
| `output`              | 출력 파일의 경로를 정의합니다. `outputDir`을 대체합니다. 템플릿 변수를 지원합니다: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` . | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` 경로는 컴포넌트 디렉토리를 기준으로 계산됩니다.<br/>• `/` 경로는 프로젝트 루트를 기준으로 계산됩니다.<br/>• `{{locale}}`은 로케일별 생성을 가능하게 합니다.<br/>• 로케일별 객체 정의를 지원합니다. |
| `noMetadata`          | `true`인 경우 컴파일러는 출력물에서 딕셔너리 메타데이터(key, content wrapper)를 제거합니다.                                                                                                                                                                                                                   | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • 로케일별 i18next 또는 ICU MessageFormat JSON 출력에 유용합니다.<br/>• `loadJSON` 플러그인과 잘 작동합니다.                                                                                              |
| `dictionaryKeyPrefix` | 딕셔너리 키 접두사                                                                                                                                                                                                                                                                                            | `string`                                                                                                        | `''`        |                                                                                                                                                          | 추출된 딕셔너리 키에 선택적 접두사를 추가합니다.                                                                                                                                                          |

---

### 사용자 정의 스키마 (Custom Schemas)

| 필드      | 설명                                                                     | 타입                        |
| --------- | ------------------------------------------------------------------------ | --------------------------- |
| `schemas` | 딕셔너리 콘텐츠 구조를 검증하기 위해 Zod 스키마를 정의할 수 있게 합니다. | `Record<string, ZodSchema>` |

---

### 플러그인 (Plugins)

| 필드      | 설명                                 | 타입               |
| --------- | ------------------------------------ | ------------------ |
| `plugins` | 포함할 Intlayer 플러그인 목록입니다. | `IntlayerPlugin[]` |
