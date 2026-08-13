---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint 플러그인 | Intlayer 린트 규칙
description: eslint-plugin-intlayer를 사용하여 하드코딩된 문자열, Intlayer 컴파일러가 최적화할 수 없는 동적 호출, 사용되지 않는 사전 콘텐츠를 감지하세요. React, Vue, Svelte, Angular 및 Astro 전반에서 ESLint 및 oxlint와 함께 작동합니다.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - 린팅
  - i18n
  - 국제화
  - no-raw-text
  - 하드코딩된 문자열
  - 사용되지 않는 번역
  - 미사용 콘텐츠
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "초기 히스토리"
author: aymericzip
---

# ESLint x OXLint 플러그인

`eslint-plugin-intlayer`는 TypeScript가 감지하지 못하는 i18n 실수를 잡아냅니다:

1. 사전에 등록되지 않은 **하드코딩된 텍스트**.
2. 타입 검사를 통과하고 실행되지만 Intlayer 컴파일러가 최적화할 수 없는 **동적 호출**.
3. **미사용 콘텐츠(Dead content)** — 프로젝트 내에서 아무 곳에서도 읽지 않는 사전 및 필드(선택 사항).

알 수 없는 사전 키, 알 수 없는 필드 경로 및 누락된 로케일은 이미 컴파일 에러로 처리되므로 플러그인은 이를 중복 보고하지 않습니다.

## 설치

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 이상(Flat config)이 필요합니다.

## 사용법

이 플러그인은 ESLint와 [oxlint](https://oxc.rs) 모두에서 동일한 규칙과 옵션으로 실행됩니다.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

또는 규칙을 하나씩 활성화할 수 있습니다:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

두 가지 주의 사항: oxlint의 JS 플러그인 지원은 아직 알파 단계이며, 커스텀 파서를 지원하지 않으므로 `.vue`, `.svelte`, `.astro` 및 Angular 템플릿은 oxlint에서 린트되지 않습니다. JS/TS/JSX 파일에는 oxlint를 사용하고 나머지는 ESLint를 계속 사용하세요.

`no-unused-content`는 위에서 의도적으로 제외되었습니다. 이 규칙은 규칙 컨텍스트에서 작업 디렉터리와 린트 대상 파일 경로를 필요로 하지만, 알파 단계의 JS 플러그인 브리지에서는 이를 보장하지 못합니다. 이 규칙은 ESLint에서 실행하세요.

  </Tab>
</Tabs>

### 설정 (Configs)

| 설정            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ 비 JSX 리터럴) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended`는 의도적으로 `no-raw-text`를 `warn`으로 유지합니다. 기존 코드베이스에 적용했을 때 번역되지 않은 모든 문자열이 한 번에 보고되어 첫날부터 빌드가 중단되는 것을 방지하기 위함입니다.

`enforce-adapter-import`는 기본적으로 꺼져 있습니다. 필요한 경우 명시적으로 활성화하세요.

`no-unused-content`는 `strict`를 포함한 모든 사전 설정에서 꺼져 있습니다. 이 규칙은 Intlayer 설정을 읽고 디스크의 소스 파일을 직접 순회하므로, 사전 설정에 의해 자동으로 켜지기보다는 신중한 선택에 따라 활성화해야 합니다.

## 규칙

### `no-raw-text`

사전에 선언되지 않은 사용자 대면 텍스트를 보고합니다. `intlayer extract`와 동일한 감지 방식을 사용하므로 브랜드 이름, CSS 클래스 및 기술적 식별자는 무시됩니다.

```jsx
// ✗ 보고됨
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 정상
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

콘텐츠 선언 파일(`*.content.ts`, …)은 제외됩니다.

파일 전체를 한 번에 수정하려면 `npx intlayer extract`를 실행하여 컴파일러가 문자열을 사전으로 이동하도록 하세요.

**옵션**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 사용자 대면 텍스트가 값인 속성
      // 기본값: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 콘텐츠가 사용자 대면 텍스트가 아닌 요소
      // 기본값: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 보고하지 않을 텍스트의 정규식
      ignorePatterns: ["^Powered by"],

      // 마크업 외부의 문자열 리터럴도 보고할지 여부. 기본값: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

사전 키가 반드시 문자열 리터럴이어야 합니다.

컴파일러는 호출 위치에서 키를 직접 읽을 수 있을 때만 사전을 사전 로드(pre-load)할 수 있습니다. 계산된 키를 사용하면 최적화를 자동으로 건너뛰고 모든 사전을 번들에 포함합니다.

```typescript
// ✗ 보고됨
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 변수는 리터럴이 아닙니다
const key = "home";
useIntlayer(key);

// ✓ 정상
useIntlayer("home");
getTranslations({ namespace: "home" });
```

이는 `useIntlayer`, `getIntlayer` 및 모든 호환 어댑터(`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …)에 적용됩니다.

### `no-dynamic-field-access`

사전에서 읽는 필드가 정적으로 알려져 있어야 합니다.

컴파일러는 사용되지 않는 것으로 판단되는 필드를 제거합니다. 동적 접근은 컴파일러가 감지할 수 없으므로 런타임에 읽기 작업이 `undefined`를 반환할 수 있습니다.

```typescript
// ✗ 보고됨
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ 정상
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

원본 패키지 대신 `@intlayer/*` 호환 어댑터의 사용을 권장합니다. 원본 패키지는 번들러 별칭이 설정된 경우에만 Intlayer로 확인되지만, 어댑터는 항상 확인됩니다. `--fix`로 자동 수정할 수 있습니다.

```typescript
// ✗ 보고됨
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 정상
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**기본적으로 꺼져 있습니다.** 프로젝트 내에서 아무 곳에서도 읽지 않는 콘텐츠와 여러 위치에서 선언된 사전 키를 보고합니다.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ 프로젝트 내 어떤 호출자도 "home"을 요청하지 않을 때 보고됨
  content: {
    title: t({ ko: "제목", en: "Title" }),

    // ✗ `hero`를 읽는 곳이 없을 때 보고됨
    hero: {
      subtitle: t({ ko: "소제목", en: "Subtitle" }),
    },
  },
};
```

다른 규칙과 달리 이 규칙은 현재 파일 하나만으로 판단할 수 없습니다. 필드 사용 여부는 전체 프로젝트와의 관계에서만 파악할 수 있기 때문입니다. 린트 실행 시 첫 번째 콘텐츠 선언을 만났을 때 Intlayer 설정을 로드하고, 해당 설정에 선언된 소스 파일(`build.traversePattern`, `compiler.transformPattern`)을 수집한 후 `@intlayer/lsp` 및 VS Code 확장의 "미사용" 취소선을 지원하는 동일한 사용량 분석기를 실행합니다. 결과는 `cacheTtl` 밀리초 동안 캐시되므로 파일마다 검사하지 않고 1회 실행당 한 번만 검사를 수행합니다.

**옵션**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // 아무 곳에서도 참조하지 않는 사전 키 보고. 기본값: true
      reportUnusedDictionaries: true,

      // 아무 곳에서도 읽지 않는 콘텐츠 필드 보고. 기본값: true
      reportUnusedFields: true,

      // 여러 위치에 선언된 중복 키 보고. 기본값: true
      reportDuplicateKeys: true,

      // 보고하지 않을 필드 경로의 정규식
      ignoreFields: ["^meta"],

      // 검사가 시작되는 프로젝트 루트. 기본값: ESLint 작업 디렉터리
      baseDir: process.cwd(),

      // 한 번의 프로젝트 검사 결과를 재사용하는 시간(ms). 기본값: 30000
      cacheTtl: 30000,
    },
  ],
}
```

오랫동안 실행되는 에디터 서버에서 린트를 수행하며 변경 사항을 더 빨리 반영하고 싶을 때는 `cacheTtl`을 줄이세요. 모노레포에서 단일 린트 실행이 여러 Intlayer 프로젝트에 걸쳐 있을 때는 `baseDir`을 설정하세요.

> **침묵을 우선합니다.** 여기서 거짓 양성(false positive)이 발생하면 필요한 번역이 삭제될 수 있으므로, 분석기가 추적할 수 없는 방식으로 사전을 소비할 때는 아무것도 보고하지 않습니다: 콘텐츠 객체 전체를 그대로 전달, 객체에서 바인딩된 번역 함수(`const t = useTranslations("home")`), 직접 가져오기를 통한 선언 접근(`useDictionary(myDictionary)`), 다른 사전에서의 `nest()`, 또는 스프레드 연산자로 불완전해진 필드 목록 등입니다. 단일 파일 컴포넌트(`.vue`, `.svelte`, `.astro`)는 스크립트 블록이 여기서 파싱되지 않으므로 언급된 사전의 모든 필드를 사용하는 것으로 간주됩니다.

`reportDuplicateKeys`는 빌드 시 `.intlayer/`에 기록되는 병합되지 않은 사전을 읽으므로 프로젝트가 최소 한 번 빌드될 때까지는 동작하지 않습니다. 키를 공유하는 두 선언은 병합되며 이는 올바른 패턴입니다. 다만 양쪽에 정의된 필드가 조용히 둘 중 하나의 값만 유지하기 때문에 이 보고 기능이 제공됩니다.

분석기는 ESM으로 제공되는 `@intlayer/lsp`에서 로드됩니다. 따라서 이 규칙은 ES 모듈을 `require()`할 수 있는 Node 버전(Node 20.19+ 또는 22.12+)이 필요합니다. 이전 버전에서는 린트 실행을 실패시키는 대신 아무것도 보고하지 않습니다.

## 프레임워크

모든 규칙은 Vue, Svelte 및 Angular 템플릿 내부를 포함하여 모든 Intlayer 통합 환경에서 작동합니다. ESLint에 각 파일 형식을 읽을 파서만 지정해 주면 됩니다.

| 프레임워크                | 파일              | 파서                              |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular 템플릿            | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

프로젝트에 필요한 파서만 설치하세요.

> **알려진 제한 사항.** Vue 및 Angular 템플릿에서 `{{ content[key] }}`와 같은 표현식은 `no-dynamic-field-access`에 의해 검사되지 않습니다. 스크립트 블록에 작성된 동적 읽기는 정상적으로 감지됩니다.
