---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: 자동 채우기
description: Intlayer에서 자동 채우기 기능을 사용하여 미리 정의된 패턴에 따라 콘텐츠를 자동으로 채우는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 자동 채우기 기능을 효율적으로 구현할 수 있습니다.
keywords:
  - 자동 채우기
  - 콘텐츠 자동화
  - 동적 콘텐츠
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "전역 구성 추가"
  - version: 6.0.0
    date: 2025-09-17
    changes: "`{{fileName}}` 변수 추가"
  - version: 5.5.10
    date: 2025-06-29
    changes: "이력 초기화"
author: aymericzip
---

# 콘텐츠 선언 파일 번역 채우기

**CI에서 콘텐츠 선언 파일 자동 채우기**는 개발 워크플로우를 가속화하는 방법입니다.

## 동작 이해하기

`fill` 명령은 두 가지 모드를 포함합니다:

- **Complete**: 각 로케일에 대해 누락된 모든 콘텐츠를 자동으로 채우고 현재 파일을 편집하거나, 지정된 경우 다른 파일을 편집합니다. 즉, complete 모드는 이미 번역된 경우 기존 콘텐츠의 번역을 건너뜁니다.
- **Review**: 각 로케일에 대해 **모든** 콘텐츠를 자동으로 채우고 특정 파일에 대해 생성하거나, 지정된 경우 다른 파일을 생성합니다.

`fill` 명령은 모든 로케일 콘텐츠 선언 파일을 처리합니다. 즉, CMS의 원격 콘텐츠는 처리하지 않습니다. CMS는 자체 번역 관리를 포함합니다.
`@intlayer/sync-json-plugin`과 같은 플러그인을 사용하는 경우, Intlayer는 JSON 파일을 로케일 콘텐츠 선언 파일로 변환합니다. 즉, `fill` 명령으로 처리됩니다.

새로 생성된 파일에는 사전 메타데이터로 `filled` 지시사항이 포함됩니다. 이 지시사항은 Intlayer가 파일이 자동으로 채워졌는지 여부를 알고, 존재하는 경우 이 파일을 다시 번역하지 않도록 건너뛰는 데 사용됩니다.

Intlayer는 자동 채우기를 위해 다음 지시사항도 고려합니다:

- `.content.{ts|js|json}` → `fill` 지시사항
- 구성 파일 `.intlayer.config.ts` → `dictionary.fill` 지시사항
- 그 외의 경우 기본값으로 `true`로 설정됨

로케일별 콘텐츠 선언 파일의 경우, `true` 지시사항은 `./{{fileName}}.fill.content.json`으로 대체됩니다. 이는 로케일별 콘텐츠 선언 파일이 추가 지역화된 콘텐츠를 받을 수 없기 때문입니다. 따라서 기존 파일을 덮어쓰지 않기 위해 새 파일을 생성합니다.

## Default Behavior

기본적으로 `fill`은 전역적으로 `true`로 설정되어 있으며, 이는 Intlayer가 모든 콘텐츠 파일을 자동으로 채우고 파일 자체를 편집한다는 의미입니다. 이 동작은 여러 방법으로 사용자 정의할 수 있습니다:

### 글로벌 구성 옵션

1. **`fill: true` (기본값)** - 모든 로케일을 자동으로 채우고 현재 파일을 편집합니다
2. **`fill: false`** - 이 콘텐츠 파일에 대한 자동 채우기를 비활성화합니다
3. **`fill: "./relative/path/to/file"`** - 현재 파일을 편집하지 않고 현재 파일의 위치를 기반으로 해석되는 상대 경로를 가리켜 지정된 파일을 만들거나 업데이트합니다
4. **`fill: "/absolute/path/to/file"`** - 현재 파일을 편집하지 않고 기본 디렉토리의 위치를 기반으로 해석되는 상대 경로를 가리켜 지정된 파일을 만들거나 업데이트합니다 (구성 파일 `.intlayer.config.ts`의 `baseDir` 필드)
5. **`fill: "C:\\absolute\path\to\file"`** - 현재 파일을 편집하지 않고 운영 체제를 기반으로 해석되는 절대 경로를 가리켜 지정된 파일을 만들거나 업데이트합니다
6. **`fill: { [key in Locales]?: string }`** - 각 로케일에 대해 지정된 파일을 만들거나 업데이트합니다

### v7 동작 변경 사항

v7에서는 `fill` 명령 동작이 업데이트되었습니다:

- **`fill: true`** - 현재 파일을 모든 로케일의 채워진 콘텐츠로 다시 작성합니다
- **`fill: "path/to/file"`** - 현재 파일을 수정하지 않고 지정된 파일을 채웁니다
- **`fill: false`** - 자동 채우기를 완전히 비활성화합니다

다른 파일에 쓰기 위해 경로 옵션을 사용할 때, fill 메커니즘은 콘텐츠 선언 파일 간의 _master-slave_ 관계를 통해 작동합니다. 메인(master) 파일이 소스 오브 트루스 역할을 하며, 업데이트될 때 Intlayer는 경로로 지정된 파생(filled) 선언 파일에 자동으로 그 변경 사항을 적용합니다.

# 자동 채우기 콘텐츠 선언 파일 번역

**자동 채우기 콘텐츠 선언 파일**은 개발 워크플로우를 가속화하는 방법입니다.

자동 채우기 메커니즘은 콘텐츠 선언 파일 간의 _마스터-슬레이브_ 관계를 통해 작동합니다. 메인(마스터) 파일이 업데이트되면 Intlayer가 파생(자동 채우기된) 선언 파일에 해당 변경 사항을 자동으로 적용합니다.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "이것은 콘텐츠의 예시입니다",
  },
} satisfies Dictionary;

export default exampleContent;
```

다음은 `autoFill` 지시어를 사용한 [로케일별 콘텐츠 선언 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)입니다.

그런 다음, 다음 명령어를 실행하면:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer는 메인 파일에 아직 선언되지 않은 모든 로케일을 채워 `src/components/example/example.content.json`에 파생 선언 파일을 자동으로 생성합니다.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

그 후, 두 선언 파일은 단일 사전으로 병합되어 표준 `useIntlayer("example")` 훅(react) / 컴포저블(vue)을 통해 접근할 수 있습니다.

## 글로벌 설정

`intlayer.config.ts` 파일에서 글로벌 자동 채우기 설정을 구성할 수 있습니다.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // 모든 사전에 대해 누락된 번역 자동 생성
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // "./{{fileName}}.content.json"을 사용하는 것처럼 모든 사전에 대해 누락된 번역 자동 생성
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

content 파일의 `fill` 필드를 사용하여 사전별로 세부 조정할 수 있습니다. Intlayer는 먼저 사전별 구성을 고려한 후 글로벌 구성으로 돌아갑니다.

## 자동 채워진 파일 형식

자동 채워진 선언 파일에 권장되는 형식은 **JSON**으로, 형식 제약을 피하는 데 도움이 됩니다. 그러나 Intlayer는 `.ts`, `.js`, `.mjs`, `.cjs` 및 기타 형식도 지원합니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이렇게 하면 다음 위치에 파일이 생성됩니다:

```
src/components/example/example.filled.content.ts
```

> `.js`, `.ts` 및 유사한 파일 생성은 다음과 같이 작동합니다:
>
> - 파일이 이미 존재하는 경우, Intlayer는 AST(추상 구문 트리)를 사용하여 각 필드를 찾아 누락된 번역을 삽입합니다.
> - 파일이 존재하지 않는 경우, Intlayer는 기본 콘텐츠 선언 파일 템플릿을 사용하여 파일을 생성합니다.

## 절대 경로

`autoFill` 필드는 절대 경로도 지원합니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // 여기에 콘텐츠 작성
  },
};
```

이렇게 하면 다음 위치에 파일이 생성됩니다:

```
/messages/example.content.json
```

## 로케일별 콘텐츠 선언 파일 자동 생성

`autoFill` 필드는 **로케일별** 콘텐츠 선언 파일 생성을 지원합니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // 귀하의 콘텐츠
  },
};
```

이렇게 하면 두 개의 별도 파일이 생성됩니다:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> 이 경우, 객체에 모든 로케일이 포함되어 있지 않으면 Intlayer는 나머지 로케일의 생성을 건너뜁니다.

## 특정 로케일 자동 채우기 필터링

`autoFill` 필드에 객체를 사용하면 필터를 적용하여 특정 로케일 파일만 생성할 수 있습니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // 귀하의 콘텐츠
  },
};
```

이렇게 하면 프랑스어 번역 파일만 생성됩니다.

## 경로 변수

`autoFill` 경로 내에서 변수를 사용하여 생성된 파일의 대상 경로를 동적으로 해결할 수 있습니다.

**사용 가능한 변수:**

- `{{locale}}` – 로케일 코드 (예: `fr`, `es`)
- `{{fileName}}` – 파일 이름 (예: `index`)
- `{{key}}` – 사전 키 (예: `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이 코드는 다음 파일들을 생성합니다:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이 코드는 다음 파일들을 생성합니다:

- `./index.content.json`
- `./index.content.json`
