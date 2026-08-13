---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint 플러그인 | Intlayer용 린트 규칙
description: eslint-plugin-intlayer로 하드코딩된 문자열과 Intlayer 컴파일러가 최적화할 수 없는 동적 호출을 잡아내세요. ESLint와 oxlint에서 동작하며 React, Vue, Svelte, Angular, Astro를 지원합니다.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - 린트
  - i18n
  - 국제화
  - no-raw-text
  - 하드코딩된 문자열
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
    changes: "초기 이력"
author: aymericzip
---

# ESLint x OXLint 플러그인

`eslint-plugin-intlayer`는 TypeScript가 잡을 수 없는 두 가지 i18n 실수를 찾아냅니다.

1. **하드코딩된 텍스트** — 사전에 등록되지 않은 채 남아 있는 텍스트.
2. **동적 호출** — 타입 검사를 통과하고 실행도 되지만 Intlayer 컴파일러가 최적화할 수 없는 호출.

알 수 없는 사전 key, 알 수 없는 필드 경로, 누락된 로케일은 이미 컴파일 오류이므로 플러그인은 이를 반복해서 보고하지 않습니다.

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

ESLint 9 이상(flat config)이 필요합니다.

## 사용법

이 플러그인은 ESLint와 [oxlint](https://oxc.rs) 양쪽에서 동작합니다. 규칙과 옵션은 동일합니다.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

또는 규칙을 하나씩 활성화합니다.

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

두 가지 주의사항이 있습니다. oxlint의 JS 플러그인 지원은 아직 alpha 단계이며, oxlint는 커스텀 parser를 지원하지 않습니다. 따라서 `.vue`, `.svelte`, `.astro` 파일과 Angular 템플릿은 그곳에서 검사되지 않습니다. JS/TS/JSX 파일에는 oxlint를, 나머지에는 ESLint를 사용하세요.

  </Tab>
</Tabs>

### 구성

| 구성            | `no-raw-text`            | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ------------------------ | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                     | error                   | error                     | off                      |
| `strict`        | error(+ JSX 외부 리터럴) | error                   | error                     | error                    |
| `contract-only` | off                      | error                   | error                     | off                      |

`recommended`가 `no-raw-text`를 `warn`으로 두는 것은 의도적입니다. 기존 codebase에 적용하면 번역되지 않은 문자열이 한 번에 모두 드러나는데, 그것이 첫날부터 빌드를 깨뜨려서는 안 되기 때문입니다.

`enforce-adapter-import`는 기본적으로 꺼져 있습니다. 필요하면 명시적으로 활성화하세요.

## 규칙

### `no-raw-text`

사전에 선언되지 않은 사용자 대상 텍스트를 보고합니다. `intlayer extract`와 동일한 탐지 로직을 사용하므로 브랜드명, CSS 클래스, 기술적 식별자는 무시됩니다.

```jsx
// ✗ 보고됨
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 정상
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

콘텐츠 선언 파일(`*.content.ts` 등)은 건너뜁니다.

파일 전체를 한 번에 수정하려면 `npx intlayer extract`를 실행해 컴파일러가 문자열을 사전으로 옮기도록 하세요.

**옵션**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 값이 사용자 대상 텍스트인 속성.
      // 기본값: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 내용이 절대 사용자 대상 텍스트가 아닌 요소.
      // 기본값: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 절대 보고하지 않을 텍스트의 정규 표현식.
      ignorePatterns: ["^Powered by"],

      // 마크업 외부의 문자열 리터럴도 보고. 기본값: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

사전 key가 문자열 리터럴이어야 합니다.

컴파일러는 호출 지점에서 key를 직접 읽을 수 있을 때만 사전을 미리 로드할 수 있습니다. 계산된 key를 쓰면 최적화를 조용히 건너뛰고 대신 모든 사전을 번들에 포함합니다.

```typescript
// ✗ 보고됨
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 변수는 여전히 리터럴이 아닙니다
const key = "home";
useIntlayer(key);

// ✓ 정상
useIntlayer("home");
getTranslations({ namespace: "home" });
```

이는 `useIntlayer`, `getIntlayer` 및 모든 compat 어댑터(`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>` 등)에 적용됩니다.

### `no-dynamic-field-access`

사전에서 읽는 필드가 정적으로 알려져 있어야 합니다.

컴파일러는 사용이 확인되지 않는 필드를 제거합니다. 계산된 접근은 컴파일러에게 보이지 않으므로, 런타임에 `undefined`가 반환될 수 있습니다.

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

원본 패키지보다 `@intlayer/*` compat 어댑터를 선호합니다. 원본은 번들러 별칭이 설정된 경우에만 Intlayer로 해석되지만, 어댑터는 항상 그렇습니다. `--fix`로 자동 수정할 수 있습니다.

```typescript
// ✗ 보고됨
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 정상
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## 프레임워크

모든 규칙은 Vue, Svelte, Angular 템플릿 내부를 포함해 모든 Intlayer 통합에서 동작합니다. 어떤 parser가 어떤 파일 유형을 읽는지 ESLint에 알려주기만 하면 됩니다.

| 프레임워크                | 파일              | Parser                            |
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

프로젝트에 필요한 parser만 설치하세요.

> **알려진 제한 사항.** Vue와 Angular 템플릿에서는 `{{ content[key] }}` 같은 표현식이 `no-dynamic-field-access`의 검사 대상이 아닙니다. script 블록에 작성된 동적 읽기는 정상적으로 감지됩니다.
