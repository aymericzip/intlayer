---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt 플러그인 | Intlayer 번역 정렬
description: "prettier-plugin-intlayer를 사용하여 t()의 로케일, plural()의 카테고리, enu()의 조건, select()의 케이스 및 콘텐츠 선언의 키를 정렬하세요. Prettier와 oxfmt에서 모두 동작합니다."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - 서식 지정
  - 번역 정렬
  - 로케일 정렬
  - i18n
  - 국제화
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "초기 이력"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt 사용법 추가"
author: aymericzip
---

# Prettier x Oxfmt 플러그인

`prettier-plugin-intlayer`는 Prettier가 파일을 포맷할 때마다 번역 키를 고정된 순서로 정렬합니다. diff를 작게 유지하고, 병합 충돌을 줄이며, 누락된 로케일을 쉽게 발견할 수 있습니다.

```ts
// 전
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// 후
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## 설치

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Prettier 3 이상이 필요합니다.

프로젝트에서 이미 Prettier를 사용 중인 경우 `intlayer init prettier` 명령을 실행하면 플러그인이 설치되고 설정에 자동으로 추가됩니다.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt는 서드파티 플러그인을 불러올 수 없으므로 정렬은 Prettier를 통해 이루어집니다. oxfmt와 함께 Prettier를 설치하세요. Prettier는 콘텐츠 선언을 정렬하는 데만 사용되며, 프로젝트 포맷은 계속 oxfmt가 담당합니다.

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Prettier 3 이상이 필요합니다. `intlayer init`은 이미 Prettier를 사용하는 프로젝트에서만 플러그인을 설정하므로, 아래와 같이 직접 설정하세요.

  </Tab>
</Tabs>

## 사용법

이 플러그인은 Prettier와 [oxfmt](https://oxc.rs/docs/guide/usage/formatter)에서 모두 동작합니다.

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Prettier 설정 파일에 플러그인을 추가합니다:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

콘텐츠 선언 파일에만 적용하려면 override를 사용하세요:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

format 스크립트는 각각 하나의 역할을 가진 두 도구를 실행합니다.

1. **Prettier**는 플러그인으로 콘텐츠 선언을 정렬합니다. glob이 대상을 `*.content.*` 파일로 제한합니다.
2. **oxfmt**는 콘텐츠 선언을 포함한 프로젝트 전체를 포맷합니다.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

이 순서를 지키세요. oxfmt는 Prettier가 작성한 레이아웃을 자체 레이아웃으로 바꾸지만, 객체 키의 순서는 절대 바꾸지 않으므로 정렬된 순서가 유지됩니다.

이 구성에는 몇 가지 제한이 있습니다.

- **저장 시 포맷.** oxfmt로 포맷하는 에디터는 정렬하지 않습니다. 정렬하려면 `format` 스크립트를 실행하세요.
- **check 모드.** oxfmt로 포맷된 파일에는 `prettier --check`를 사용하지 마세요. 레이아웃이 달라 모든 파일을 보고합니다. CI에서 순서를 확인하려면 `format` 스크립트를 실행하고 변경 사항이 있으면 job을 실패시키세요.

```bash
npm run format && git diff --exit-code
```

  </Tab>
</Tabs>

## 정렬되는 대상

### `t()`: 로케일

고정된(pinned) 로케일이 먼저 옵니다(기본값은 `en`). 나머지 로케일은 알파벳 순서대로 정렬됩니다.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR 순서

카테고리는 가장 작은 수량부터 대체값(fallback) 순으로 정렬됩니다: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
});
```

### `enu()`: 오름차순 임계값

조건은 숫자 순으로 정렬된 후 연산자 순(`<1`, `<=1`, `1`, `>=1`, `>1`)으로 정렬됩니다. `fallback`은 마지막에 위치합니다.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

런타임에서는 먼저 일치하는 조건이 적용됩니다. 플러그인은 모든 수량이 동일한 콘텐츠로 확인될 때에만 새 순서를 적용합니다. 순서가 결과에 영향을 미치는 경우 객체는 작성된 상태 그대로 유지됩니다. 예를 들어 `{ '<1': …, '<=-2.3': … }`에서는 `'<1'` 키가 모든 음수를 처리합니다.

### `select()`: 알파벳 순서

케이스는 알파벳 순서로 정렬되며 `fallback`이 마지막에 배치됩니다.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

`fallback`이나 `other` 키가 없는 경우 마지막 케이스가 fallback으로 사용됩니다. 해당 케이스는 마지막에 유지되고 이전 케이스들만 정렬됩니다.

### `.content.json` 파일

직렬화된 형태도 동일한 방식으로 정렬됩니다: `{ "nodeType": "translation", "translation": { … } }`, 그리고 `plural`, `enumeration`, `select` 노드도 마찬가지입니다.

### 동일한 번역

`*.content.*` 파일에서 모든 로케일이 같은 문자열을 가진 `t()`는 그 문자열로 바뀝니다. 일반 문자열은 모든 로케일에 제공되므로 결과는 달라지지 않습니다.

```ts
// 전
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// 후
nextjs: "Next.js",
```

로케일이 하나뿐이거나, 타입 인자(`t<string>()`), 주석 또는 문자열이 아닌 값을 가진 `t()`는 그대로 유지됩니다. 끄려면 `intlayerCollapseIdenticalTranslations: false`로 설정하세요.

### 콘텐츠 키 (선택 사항)

`intlayerSortContentKeys: true`를 지정하면 플러그인이 딕셔너리 `content`의 키도 모든 중첩 수준에서 알파벳순으로 정렬합니다. 이는 `*.content.*` 파일에만 적용됩니다.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

정렬은 각 헬퍼 함수(`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…)를 거쳐 내부 객체까지 적용됩니다. 각 헬퍼 자체의 키 구조는 고유한 순서를 유지합니다. `cond()` 및 `gender()`에 전달된 키는 마지막 키가 fallback 역할을 하므로 순서가 재정렬되지 않습니다. `content`와 같은 수준의 필드(`key`, `title`, `locale`…)는 원래 상태를 유지합니다.

## 옵션

| 옵션                                    | 기본값   | 설명                                                                                      |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | `t()`에서 우선적으로 앞에 유지할 로케일 목록. 모든 로케일을 정렬하려면 `[]`를 전달하세요. |
| `intlayerSortContentKeys`               | `false`  | `*.content.*` 파일에서 딕셔너리의 콘텐츠 키 및 중첩된 객체도 정렬합니다.                  |
| `intlayerCollapseIdenticalTranslations` | `true`   | `*.content.*` 파일에서 모든 로케일이 같은 문자열을 가진 `t()`를 그 문자열로 바꿉니다.     |

## 변경되지 않는 대상

- 스프레드(`...base`), 계산된 키(`[key]`), 메서드 또는 중복 키가 포함된 객체.
- CLDR 카테고리가 아닌 키를 가진 `plural()` 맵.
- 새로운 순서 적용 시 확인되는 콘텐츠가 달라질 수 있는 `enu()` 맵.
- 헬퍼와 이름은 같지만 객체가 아닌 인수가 전달된 함수 호출.

주석은 해당 주석이 속한 키와 함께 이동합니다.

## 지원되는 파서

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5`, `jsonc`. Vue, Svelte, Astro 파일의 `<script>` 블록도 이 파서들을 통해 포맷됩니다.

> **알려진 제한 사항.** Prettier는 파서당 단 하나의 플러그인만 실행합니다. 다른 플러그인도 JavaScript/TypeScript 파서를 대체하는 경우(예: `prettier-plugin-tailwindcss`), 마지막에 나열된 플러그인만 해당 파일에 적용됩니다. 충돌을 피하려면 override를 사용하여 `prettier-plugin-intlayer`의 범위를 `*.content.*` 파일로 한정하세요. oxfmt에서는 Tailwind 클래스가 내장 `sortTailwindcss` 옵션으로 정렬되므로 이 충돌이 발생하지 않습니다.
