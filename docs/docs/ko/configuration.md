---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: 설정 (Configuration)
description: 애플리케이션에 Intlayer를 설정하는 방법을 알아보세요. 필요에 따라 Intlayer를 맞춤 설정할 수 있는 다양한 설정과 옵션을 이해하세요.
keywords:
  - 설정
  - 세팅
  - 커스터마이징
  - Intlayer
  - 옵션
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: 'compiler.output' 및 'dictionary.fill'에 대한 로케일별 객체 표기법 추가
  - version: 8.3.0
    date: 2026-03-11
    changes: 'baseDir'을 'content' 설정에서 'system' 설정으로 이동
  - version: 8.2.0
    date: 2026-03-09
    changes: 컴파일러 옵션 업데이트, 'output' 및 'noMetadata' 지원 추가
  - version: 8.1.7
    date: 2026-02-25
    changes: 컴파일러 옵션 업데이트
  - version: 8.1.5
    date: 2026-02-23
    changes: 컴파일러 옵션 'build-only' 및 딕셔너리 접두사 추가
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face 및 Together.ai 제공업체 지원 추가
  - version: 8.0.5
    date: 2026-02-06
    changes: AI 설정에 `dataSerialization` 추가
  - version: 8.0.0
    date: 2026-01-24
    changes: 기본 메커니즘을 더 잘 설명하기 위해 가져오기 모드 `live`를 `fetch`로 변경.
  - version: 8.0.0
    date: 2026-01-22
    changes: 빌드 설정 `importMode`를 `dictionary` 설정으로 이동.
  - version: 8.0.0
    date: 2026-01-22
    changes: 라우팅 설정에 `rewrite` 옵션 추가
  - version: 8.0.0
    date: 2026-01-18
    changes: 시스템 설정을 콘텐츠 설정에서 분리. 내부 경로를 `system` 속성으로 이동. 콘텐츠 파일과 코드 변환을 분리하기 위해 `codeDir` 추가.
  - version: 8.0.0
    date: 2026-01-18
    changes: 딕셔너리 옵션 `location` 및 `schema` 추가
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 및 JSONC 파일 형식 지원 추가
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` 옵션 추가
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` 설정 추가
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware`를 라우팅 설정 `routing`으로 대체
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` 옵션 추가
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` 옵션 업데이트
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` 옵션 추가
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` 필드 및 `i18nextResourcesDir` 필드 삭제
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` 가져오기 모드 추가
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` 필드를 `liveSync`로 대체하고 `liveSyncPort` 및 `liveSyncURL` 필드 추가
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport`를 `importMode` 옵션으로 대체
  - version: 5.6.0
    date: 2025-07-13
    changes: 기본 contentDir을 `['src']`에서 `['.']`로 변경
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` 명령 추가
---

# Intlayer 설정 문서

## 개요

Intlayer 설정 파일을 사용하면 국제화 (internationalization), 미들웨어, 콘텐츠 처리 등 플러그인의 다양한 측면을 맞춤 설정할 수 있습니다. 이 문서는 설정의 각 속성에 대한 심층적인 설명을 제공합니다.

---

## 목차

<TOC/>

---

## 지원되는 설정 파일 형식

Intlayer는 JSON, JS, MJS, TS를 포함한 설정 파일 형식을 허용합니다.

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 설정 파일 예시

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * 사용 가능한 모든 옵션을 보여주는 Intlayer 설정 파일 예시.
 */
const config: IntlayerConfig = {
  /**
   * 국제화 설정 구성.
   */
  internationalization: {
    /**
     * 애플리케이션에서 지원되는 로케일 (locales) 목록.
     * 기본값: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 각 딕셔너리에 정의되어야 하는 필수 로케일 목록.
     * 비어 있는 경우, `strict` 모드에서 모든 로케일이 필수입니다.
     * 기본값: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 국제화된 콘텐츠의 엄격도 수준.
     * - "strict": 선언된 로케일이 누락되었거나 선언되지 않은 경우 오류.
     * - "inclusive": 선언된 로케일이 누락된 경우 경고.
     * - "loose": 기존의 모든 로케일을 수용.
     * 기본값: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * 요청된 로케일을 찾을 수 없을 때 폴백(fallback)으로 요청되는 기본 로케일.
     * 기본값: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * 딕셔너리 작업 및 폴백 동작을 제어하는 설정.
   */
  dictionary: {
    /**
     * 딕셔너리를 가져오는 방법을 제어합니다.
     * - "static": 빌드 시 정적으로 가져옵니다.
     * - "dynamic": Suspense를 사용하여 동적으로 가져옵니다.
     * - "fetch": Live Sync API를 통해 동적으로 가져옵니다.
     * 기본값: "static"
     */
    importMode: "static",

    /**
     * AI를 사용하여 누락된 번역을 자동으로 채우는 전략.
     * 불리언 값 또는 채워진 콘텐츠를 저장할 경로 패턴일 수 있습니다.
     * 기본값: true
     */
    fill: true,

    /**
     * 딕셔너리 파일의 물리적 위치.
     * - "local": 로컬 파일 시스템에 저장.
     * - "remote": Intlayer CMS에 저장.
     * - "hybrid": 로컬과 Intlayer CMS 모두에 저장.
     * - "plugin" (또는 모든 사용자 정의 문자열): 플러그인 또는 사용자 정의 소스에 의해 제공.
     * 기본값: "local"
     */
    location: "local",

    /**
     * 콘텐츠를 자동으로 변환할지 여부 (예: Markdown을 HTML로).
     * 기본값: false
     */
    contentAutoTransformation: false,
  },

  /**
   * 라우팅 및 미들웨어 설정.
   */
  routing: {
    /**
     * 로케일 라우팅 전략.
     * - "prefix-no-default": 기본 로케일을 제외한 모든 로케일에 접두사를 붙입니다 (예: /dashboard, /fr/dashboard).
     * - "prefix-all": 모든 로케일에 접두사를 붙입니다 (예: /en/dashboard, /fr/dashboard).
     * - "no-prefix": URL에 로케일이 없습니다.
     * - "search-params": ?locale=... 사용.
     * 기본값: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * 사용자가 선택한 로케일을 저장할 위치.
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
     * 로케일별 특정 경로에 대한 사용자 정의 URL 리라이트(rewrite) 규칙.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * 콘텐츠 파일 찾기 및 처리와 관련된 설정.
   */
  content: {
    /**
     * 딕셔너리를 스캔하기 위한 파일 확장자.
     * 기본값: ['.content.ts', '.content.js', '.content.json' 등]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content 파일이 위치한 디렉토리.
     * 기본값: ["."]
     */
    contentDir: ["src"],

    /**
     * 소스 코드가 위치한 곳.
     * 빌드 최적화 및 코드 변환에 사용됩니다.
     * 기본값: ["."]
     */
    codeDir: ["src"],

    /**
     * 스캔에서 제외되는 패턴.
     * 기본값: ['node_modules', '.intlayer' 등]
     */
    excludedPath: ["node_modules"],

    /**
     * 개발 중에 변경 사항을 모니터링하고 딕셔너리를 재구축할지 여부.
     * 기본값: 개발 환경에서 true
     */
    watch: true,

    /**
     * 새로 생성/업데이트된 .content 파일을 포맷하는 데 사용되는 명령.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * 비주얼 에디터 (Visual Editor) 설정.
   */
  editor: {
    /**
     * 비주얼 에디터 활성화 여부.
     * 기본값: false
     */
    enabled: true,

    /**
     * 오리진 검증(origin validation)을 위한 애플리케이션 URL.
     * 기본값: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * 로컬 에디터 서버를 위한 포트.
     * 기본값: 8000
     */
    port: 8000,

    /**
     * 에디터의 공개 URL.
     * 기본값: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * 기본값: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * 백엔드 API URL.
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
   * AI 기반 번역 및 구축 설정.
   */
  ai: {
    /**
     * 사용할 AI 제공업체.
     * 옵션: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * 기본값: 'openai'
     */
    provider: "openai",

    /**
     * 사용할 선택된 제공업체의 모델.
     */
    model: "gpt-4o",

    /**
     * 제공업체 API 키.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * 번역 생성 시 AI를 안내하기 위한 전역 컨텍스트.
     */
    applicationContext: "이것은 여행 예약 애플리케이션입니다.",

    /**
     * AI API의 기본 경로 URL.
     */
    baseURL: "http://localhost:3000",

    /**
     * 데이터 직렬화 (Data Serialization)
     *
     * 옵션:
     * - "json": 기본값, 견고함, 더 많은 토큰 소모.
     * - "toon": 토큰 소모 적음, JSON만큼 일관적이지 않을 수 있음.
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
     * - "auto": 애플리케이션 빌드 중에 자동으로 빌드됩니다.
     * - "manual": 명시적인 빌드 명령이 필요합니다.
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
     * 빌드가 TypeScript 유형을 확인해야 하는지 여부를 나타냅니다.
     * 기본값: false
     */
    checkTypes: false,
  },

  /**
   * 로거 (Logger) 설정.
   */
  log: {
    /**
     * 로깅 레벨.
     * - "default": 표준 로깅.
     * - "verbose": 심층 디버그 로깅.
     * - "disabled": 로깅 비활성화.
     * 기본값: "default"
     */
    mode: "default",

    /**
     * 모든 로그 메시지에 대한 접두사.
     * 기본값: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * 시스템 설정 (고급 사용자용)
   */
  system: {
    /**
     * 현지화된 딕셔너리를 저장하기 위한 디렉토리.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript 모듈 증강(module augmentation)을 위한 디렉토리.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * 병합되지 않은 딕셔너리를 저장하기 위한 디렉토리.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * 딕셔너리 유형을 저장하기 위한 디렉토리.
     */
    typesDir: ".intlayer/types",

    /**
     * 기본 애플리케이션 파일이 저장되는 디렉토리.
     */
    mainDir: ".intlayer/main",

    /**
     * 설정 파일이 저장되는 디렉토리.
     */
    configDir: ".intlayer/config",

    /**
     * 캐시 파일이 저장되는 디렉토리.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * 컴파일러 설정 (고급 사용자용)
   */
  compiler: {
    /**
     * 컴파일러 활성화 여부를 나타냅니다.
     *
     * - false: 컴파일러를 비활성화합니다.
     * - true: 컴파일러를 활성화합니다.
     * - "build-only": 개발 중 컴파일러를 건너뛰고 시작 시간을 단축합니다.
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
     * - 경로에 `{{locale}}` 변수를 포함하면 언어별로 별도의 딕셔너리가 생성됩니다.
     *
     * 예시:
     * ```ts
     * {
     *   // 컴포넌트 옆에 다국어 .content.ts 파일 생성
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // 템플릿 문자열을 사용한 동일 방식
     * }
     * ```
     *
     * ```ts
     * {
     *   // 프로젝트 루트의 언어별 중앙 집중식 JSON 생성
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // 템플릿 문자열을 사용한 동일 방식
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
     * 변환된 후 컴포넌트를 저장해야 하는지 여부를 나타냅니다.
     * 이렇게 하면 컴파일러를 한 번만 실행하여 애플리케이션을 변환한 다음 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 생성된 파일에 콘텐츠만 삽입합니다. i18next 또는 ICU MessageFormat 형식의 언어별 JSON 출력에 유용합니다.
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
   * 플러그인 설정.
   */
  plugins: [],
};

export default config;
````

---

## 설정 참조 (Configuration Reference)

다음 섹션은 Intlayer에서 사용 가능한 다양한 설정 항목에 대해 설명합니다.

---

### 국제화 설정 (Internationalization Configuration)

사용 가능한 로케일 및 애플리케이션의 기본 로케일을 포함하여 국제화와 관련된 설정을 정의합니다.

| 필드              | 유형       | 설명                                                                                     | 예시                 | 참고                                                                                                                                                                                                                                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | 애플리케이션에서 지원되는 로케일 목록. 기본값: `[Locales.ENGLISH]`                       | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                       |
| `requiredLocales` | `string[]` | 애플리케이션의 필수 로케일 목록. 기본값: `[]`                                            | `[]`                 | 비어 있는 경우, `strict` 모드에서 모든 로케일이 필수입니다. 필수 로케일이 `locales` 필드에도 정의되어 있는지 확인하세요.                                                                                                                                                              |
| `strictMode`      | `string`   | TypeScript를 사용하여 견고한 국제화 콘텐츠 구현을 보장합니다. 기본값: `inclusive`        |                      | `"strict"`인 경우: `t` 기능은 선언된 모든 로케일이 정의되어야 함을 요구합니다 — 누락되거나 선언되지 않은 경우 오류를 발생시킵니다. `"inclusive"`인 경우: 누락된 로케일에 대해 경고하지만 기존에 선언되지 않은 로케일을 수용합니다. `"loose"`인 경우: 기존의 모든 로케일을 수용합니다. |
| `defaultLocale`   | `string`   | 요청된 로케일을 찾을 수 없을 때 폴백으로 사용되는 기본 로케일. 기본값: `Locales.ENGLISH` | `'en'`               | URL, 쿠키 또는 헤더에 로케일이 지정되지 않은 경우 로케일을 결정하는 데 사용됩니다.                                                                                                                                                                                                    |

---

### 에디터 설정 (Editor Configuration)

서버 포트 및 활동 상태를 포함하여 통합 에디터와 관련된 설정을 정의합니다.

| 필드                         | 유형                      | 설명                                                                                                                                                                                            | 예시                                                                                  | 참고                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | 애플리케이션의 URL. 기본값: `''`                                                                                                                                                                | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | 보안상의 이유로 에디터의 오리진(origin)을 제한하는 데 사용됩니다. `'*'`로 설정하면 모든 오리진에서 에디터에 액세스할 수 있습니다.                                                                                     |
| `port`                       | `number`                  | 비주얼 에디터 서버에서 사용하는 포트. 기본값: `8000`                                                                                                                                            |                                                                                       |                                                                                                                                                                                                                       |
| `editorURL`                  | `string`                  | 에디터 서버 URL. 기본값: `'http://localhost:8000'`                                                                                                                                              | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | 애플리케이션과 상호 작용할 수 있는 오리진을 제한하는 데 사용됩니다. `'*'`로 설정하면 모든 오리진에서 액세스할 수 있습니다. 포트를 변경하거나 에디터가 다른 도메인에서 호스팅되는 경우 설정해야 합니다.                |
| `cmsURL`                     | `string`                  | Intlayer CMS URL. 기본값: `'https://intlayer.org'`                                                                                                                                              | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                       |
| `backendURL`                 | `string`                  | 백엔드 서버 URL. 기본값: `https://back.intlayer.org`                                                                                                                                            | `http://localhost:4000`                                                               |                                                                                                                                                                                                                       |
| `enabled`                    | `boolean`                 | 앱이 비주얼 에디터와 상호 작용할지 여부를 나타냅니다. 기본값: `true`                                                                                                                            | `process.env.NODE_ENV !== 'production'`                                               | `false`인 경우 에디터는 앱과 상호 작용할 수 없습니다. 특정 환경에 대해 비활성화하면 보안이 강화됩니다.                                                                                                                |
| `clientId`                   | `string &#124; undefined` | oAuth2를 사용하여 백엔드에서 인증할 수 있도록 intlayer 패키지를 활성화합니다. 액세스 토큰을 받으려면 [intlayer.org/project](https://app.intlayer.org/project)로 이동하세요. 기본값: `undefined` |                                                                                       | 비밀로 유지하고 환경 변수에 저장하세요.                                                                                                                                                                               |
| `clientSecret`               | `string &#124; undefined` | oAuth2를 사용하여 백엔드에서 인증할 수 있도록 intlayer 패키지를 활성화합니다. 액세스 토큰을 받으려면 [intlayer.org/project](https://app.intlayer.org/project)로 이동하세요. 기본값: `undefined` |                                                                                       | 비밀로 유지하고 환경 변수에 저장하세요.                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | `string`                  | 로컬 딕셔너리와 원격 딕셔너리가 모두 존재하는 경우 딕셔너리 우선순위 지정을 위한 전략. 기본값: `'local_first'`                                                                                  | `'distant_first'`                                                                     | `'distant_first'`: 로컬보다 원격을 우선시합니다. `'local_first'`: 원격보다 로컬을 우선시합니다.                                                                                                                       |
| `liveSync`                   | `boolean`                 | CMS / 비주얼 에디터 / 백엔드에서 변경이 감지될 때 앱 서버 속 콘텐츠를 핫 리로드해야 하는지 여부를 나타냅니다. 기본값: `true`                                                                    | `true`                                                                                | 딕셔너리가 추가/업데이트되면 앱은 페이지 콘텐츠를 업데이트합니다. 라이브 동기화는 콘텐츠를 다른 서버에 원격으로 처리하므로 성능에 약간의 영향을 줄 수 있습니다. 두 가지를 동일한 머신에서 호스팅하는 것이 권장됩니다. |
| `liveSyncPort`               | `number`                  | 라이브 동기화 서버 포트. 기본값: `4000`                                                                                                                                                         | `4000`                                                                                |                                                                                                                                                                                                                       |
| `liveSyncURL`                | `string`                  | 라이브 동기화 서버 URL. 기본값: `'http://localhost:{liveSyncPort}'`                                                                                                                             | `'https://example.com'`                                                               | 기본적으로 localhost를 가리키며, 원격 라이브 동기화 서버로 변경할 수 있습니다.                                                                                                                                        |

### 라우팅 설정 (Routing Configuration)

URL 구조, 로케일 저장 및 미들웨어 처리를 포함하여 라우팅 동작을 제어하는 설정.

| 필드       | 유형                                                                                                                                                 | 설명                                                                                                                                  | 예시                                                                                                                                                                                     | 참고                                                                                                                                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | 로케일 처리를 위한 URL 라우팅 모드. 기본값: `'prefix-no-default'`                                                                     | `'prefix-no-default'`: `/dashboard` (en) 또는 `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: 다른 수단으로 로케일 처리. `'search-params'`: `/dashboard?locale=fr` | 쿠키 또는 로케일 저장소 관리에는 영향을 주지 않습니다.                                                                                                                                                                                                                       |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | 클라이언트에 로케일을 저장하기 위한 구성. 기본값: `['cookie', 'header']`                                                              | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                            | 아래의 저장소 옵션 테이블을 참조하세요.                                                                                                                                                                                                                                      |
| `basePath` | `string`                                                                                                                                             | 애플리케이션 URL의 기본 경로. 기본값: `''`                                                                                            | `'/my-app'`                                                                                                                                                                              | 앱이 `https://example.com/my-app`에 있는 경우 basePath는 `'/my-app'`이며 URL은 `https://example.com/my-app/en`이 됩니다.                                                                                                                                                     |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | 특정 경로에 대해 기본 라우팅 모드를 대체하는 사용자 정의 URL 리라이트 규칙. 동적 매개변수 `[param]`를 지원합니다. 기본값: `undefined` | 아래 예시 참조                                                                                                                                                                           | 리라이트 규칙은 `mode`보다 우선순위가 높습니다. Next.js 및 Vite와 함께 작동합니다. `getLocalizedUrl()`은 일치하는 규칙을 자동으로 적용합니다. [사용자 정의 URL 리라이트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/custom_url_rewrites.md)를 참조하세요. |

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

| 값                 | 설명                                                                          | 참고                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'cookie'`         | 쿠키에 로케일을 저장합니다 — 클라이언트와 서버 측 모두에서 액세스 가능합니다. | GDPR 준수를 위해 적절한 사용자 동의를 얻었는지 확인하세요. `CookiesAttributes`를 통해 맞춤 설정 가능합니다 (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).         |
| `'localStorage'`   | 만료 날짜 없이 브라우저에 로케일을 저장합니다 — 클라이언트 측 전용입니다.     | 명시적으로 삭제하지 않는 한 만료되지 않습니다. Intlayer 프록시는 이에 액세스할 수 없습니다. `StorageAttributes`를 통해 맞춤 설정 가능합니다 (`{ type: 'localStorage', name: 'custom-locale' }`). |
| `'sessionStorage'` | 페이지 세션 동안 로케일을 저장합니다 — 클라이언트 측 전용입니다.              | 탭/창을 닫으면 지워집니다. Intlayer 프록시는 이에 액세스할 수 없습니다. `StorageAttributes`를 통해 맞춤 설정 가능합니다 (`{ type: 'sessionStorage', name: 'custom-locale' }`).                   |
| `'header'`         | HTTP 헤더를 통해 로케일을 저장하거나 전송합니다 — 서버 측 전용입니다.         | API 호출에 유용합니다. 클라이언트 측에서는 액세스할 수 없습니다. `StorageAttributes`를 통해 맞춤 설정 가능합니다 (`{ type: 'header', name: 'custom-locale' }`).                                  |

#### 쿠키 속성 (Cookie Attributes)

쿠키 저장소를 사용할 때 추가 쿠키 속성을 구성할 수 있습니다.

| 필드       | 유형                                  | 설명                                     |
| ---------- | ------------------------------------- | ---------------------------------------- |
| `name`     | `string`                              | 쿠키 이름. 기본값: `'INTLAYER_LOCALE'`   |
| `domain`   | `string`                              | 쿠키 도메인. 기본값: `undefined`         |
| `path`     | `string`                              | 쿠키 경로. 기본값: `undefined`           |
| `secure`   | `boolean`                             | HTTPS가 필요합니다. 기본값: `undefined`  |
| `httpOnly` | `boolean`                             | HTTP 전용 플래그. 기본값: `undefined`    |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite 정책.                           |
| `expires`  | `Date &#124; number`                  | 만료 날짜 또는 일수. 기본값: `undefined` |

#### 로케일 저장소 속성 (Locale Storage Attributes)

localStorage 또는 sessionStorage를 사용할 때:

| 필드   | 유형                                     | 설명                                        |
| ------ | ---------------------------------------- | ------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | 저장소 유형.                                |
| `name` | `string`                                 | 저장소 키 이름. 기본값: `'INTLAYER_LOCALE'` |

#### 설정 예시

새로운 v7 라우팅 구조에 대한 몇 가지 일반적인 설정 예시는 다음과 같습니다.

**기본 구성 (기본값)**:

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

**검색 매개변수 모드 (Search Parameters Mode)**:

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

**사용자 정의 저장소를 사용한 접두사 없음(No Prefix) 모드**:

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

**동적 경로를 사용한 사용자 정의 URL 리라이트**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // 리라이트되지 않은 경로에 대한 폴백
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

### 콘텐츠 설정 (Content Configuration)

애플리케이션 내 콘텐츠 처리와 관련된 설정 (디렉토리 이름, 파일 확장자 및 파생 설정).

| 필드             | 유형       | 설명                                                                                                                                                                               | 예시                                | 참고                                                                                      |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | 딕셔너리를 재구축하기 위해 Intlayer가 콘텐츠 선언 파일의 변경 사항을 감시해야 하는지 여부를 나타냅니다. 기본값: `process.env.NODE_ENV === 'development'`                           |                                     |                                                                                           |
| `fileExtensions` | `string[]` | 콘텐츠 선언 파일을 스캔하는 데 사용되는 파일 확장자. 기본값: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                           |
| `contentDir`     | `string[]` | 콘텐츠 선언 파일이 위치한 디렉토리에 대한 경로. 기본값: `['.']`                                                                                                                    | `['src/content']`                   |                                                                                           |
| `codeDir`        | `string[]` | 애플리케이션 소스 코드 파일이 위치한 디렉토리에 대한 경로. 기본값: `['.']`                                                                                                         | `['src']`                           | 빌드를 최적화하고 코드 변환 및 핫 리로드가 필요한 파일에만 적용되도록 하는 데 사용됩니다. |
| `excludedPath`   | `string[]` | 콘텐츠 스캔에서 제외되는 경로. 기본값: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                   | `['src/styles']`                    |                                                                                           |
| `formatCommand`  | `string`   | 새로 생성되거나 업데이트된 콘텐츠 파일을 포맷하기 위해 실행될 명령. 기본값: `undefined`                                                                                            | `'npx prettier --write "{{file}}"'` | 콘텐츠 추출 시 또는 비주얼 에디터를 통해 사용됩니다.                                      |

---

### 딕셔너리 설정 (Dictionary Configuration)

자동 채우기 동작 및 콘텐츠 생성을 포함하여 딕셔너리 작업을 제어하는 설정입니다.

이 딕셔너리 설정은 두 가지 주요 목적을 가집니다:

1. **기본값**: 콘텐츠 선언 파일을 생성할 때 기본값을 정의합니다.
2. **폴백 동작**: 특정 필드가 정의되지 않았을 때 폴백 값을 제공하여 딕셔너리 작업 동작을 전역적으로 정의할 수 있도록 합니다.

콘텐츠 선언 파일 및 설정값이 적용되는 방식에 대한 자세한 내용은 [콘텐츠 파일 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

| 필드                        | 유형                                                                                            | 설명                                                                                  | 예시           | 참고                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | 자동 채우기(AI 번역) 출력 파일이 생성되는 방식을 제어합니다. 기본값: `true`           | 아래 예시 참조 | `true`: 기본 경로(소스와 동일한 파일). `false`: 비활성화. 문자열/함수 템플릿은 로케일별 파일을 생성합니다. 로케일별 객체: 각 로케일은 자체 패턴에 매핑됩니다. `false`는 해당 로케일을 건너뜁니다. `{{locale}}`을 포함하면 로케일별 생성이 트리거됩니다. 딕셔너리 수준의 `fill`은 항상 이 전역 설정보다 우선합니다. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | 딕셔너리를 가져오는 방법을 제어합니다. 기본값: `'static'`                             | `'dynamic'`    | `'static'`: 정적으로 가져옵니다. `'dynamic'`: Suspense를 통해 동적으로 가져옵니다. `'fetch'`: Live Sync API를 통해 동적으로 가져옵니다. `getIntlayer`, `getDictionary`, `useDictionary` 등에는 영향을 주지 않습니다.                                                                                               |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | 딕셔너리가 저장되는 위치입니다. 기본값: `'local'`                                     | `'remote'`     | `'local'`: 파일 시스템. `'remote'`: Intlayer CMS. `'hybrid'`: 둘 다.                                                                                                                                                                                                                                               |
| `contentAutoTransformation` | `boolean`                                                                                       | 콘텐츠 파일을 자동으로 변환해야 하는지 여부(예: Markdown에서 HTML로). 기본값: `false` | `true`         | @intlayer/markdown을 통해 Markdown 필드를 처리하는 데 유용합니다.                                                                                                                                                                                                                                                  |

**`fill` 예시**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### AI 설정 (AI Configuration)

번역 구축과 같은 Intlayer의 AI 기반 기능에 대한 설정을 정의합니다.

| 필드                 | 유형                   | 설명                                                       | 예시                                        | 참고                                                                                    |
| -------------------- | ---------------------- | ---------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `provider`           | `string`               | 사용할 AI 제공업체.                                        | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                         |
| `model`              | `string`               | 사용할 AI 모델.                                            | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                         |
| `apiKey`             | `string`               | 선택한 제공업체의 API 키.                                  | `process.env.OPENAI_API_KEY`                |                                                                                         |
| `applicationContext` | `string`               | AI 번역 정확도를 높이기 위한 앱에 대한 추가 컨텍스트.      | `'어린이를 위한 학습 플랫폼.'`              |                                                                                         |
| `baseURL`            | `string`               | API 호출을 위한 선택적 기본 URL.                           |                                             | 프록시 또는 로컬 AI 배포를 사용하는 경우 유용합니다.                                    |
| `dataSerialization`  | `'json' &#124; 'toon'` | 데이터를 AI로 전송하는 방법을 정의합니다. 기본값: `'json'` | `'json'`                                    | `'json'`: 더 견고하고 정확함. `'toon'`: 토큰을 적게 소모하지만 안정성이 떨어질 수 있음. |

---

### 빌드 설정 (Build Configuration)

Intlayer 빌드 프로세스 및 최적화 설정.

| 필드           | 유형                     | 설명                                                                                                 | 예시 | 참고 |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | ---- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | 앱의 프리빌드 단계에서 Intlayer가 자동으로 실행되어야 하는지 여부를 나타냅니다. 기본값: `'auto'`     |      |      |
| `optimize`     | `boolean`                | 컴파일된 딕셔너리가 런타임에 최적화되어야 하는지 여부를 나타냅니다. 기본값: 프로덕션 환경에서 `true` |      |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | 생성된 딕셔너리 파일의 출력 형식. 기본값: `['cjs', 'esm']`                                           |      |      |
| `checkTypes`   | `boolean`                | Intlayer가 생성된 파일의 유형을 확인해야 하는지 여부를 나타냅니다. 기본값: `false`                   |      |      |

---

### 시스템 설정 (System Configuration)

이 설정은 고급 사용 사례 및 Intlayer의 내부 구성을 위한 것입니다.

| 필드                      | 유형     | 설명                             | 기본값                            |
| ------------------------- | -------- | -------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | 컴파일된 딕셔너리 디렉토리.      | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript 모듈 확장 디렉토리.   | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | 병합되지 않은 딕셔너리 디렉토리. | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | 생성된 유형 디렉토리.            | `'.intlayer/types'`               |
| `mainDir`                 | `string` | 메인 Intlayer 파일 디렉토리.     | `'.intlayer/main'`                |
| `configDir`               | `string` | 컴파일된 설정 파일 디렉토리.     | `'.intlayer/config'`              |
| `cacheDir`                | `string` | 캐시 파일 디렉토리.              | `'.intlayer/cache'`               |

---

### 컴파일러 설정 (Compiler Configuration)

Intlayer 컴파일러 (`intlayer compiler`) 설정.

| 필드                  | 유형                     | 설명                                                                   | 기본값  |
| --------------------- | ------------------------ | ---------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | 컴파일러 활성화 여부를 나타냅니다.                                     | `false` |
| `output`              | `string &#124; Function` | 추출된 딕셔너리의 출력 경로.                                           |         |
| `saveComponents`      | `boolean`                | 원본 소스 파일을 변환된 버전으로 덮어쓸지 여부를 나타냅니다.           | `false` |
| `noMetadata`          | `boolean`                | `true`인 경우 컴파일러는 생성된 파일에 메타데이터를 포함하지 않습니다. | `false` |
| `dictionaryKeyPrefix` | `string`                 | 선택적 딕셔너리 키 접두사.                                             | `''`    |

---

### 로거 설정 (Logger Configuration)

Intlayer 로그 출력 맞춤 설정을 위한 설정.

| 필드     | 유형                                           | 설명                | 기본값         |
| -------- | ---------------------------------------------- | ------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | 로깅 모드.          | `'default'`    |
| `prefix` | `string`                                       | 로그 메시지 접두사. | `'[intlayer]'` |

---

### 사용자 정의 스키마 (Custom Schemas)

| 필드      | 유형                        | 설명                                                           |
| --------- | --------------------------- | -------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | 딕셔너리 구조를 검증하기 위한 Zod 스키마를 정의할 수 있습니다. |

---

### 플러그인 (Plugins)

| 필드      | 유형               | 설명                             |
| --------- | ------------------ | -------------------------------- |
| `plugins` | `IntlayerPlugin[]` | 활성화할 Intlayer 플러그인 목록. |
