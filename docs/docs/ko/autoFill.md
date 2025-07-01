---
---

docName: autoFill  
url: https://intlayer.org/doc/concept/auto-fill  
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md  
createdAt: 2025-03-13  
updatedAt: 2025-06-29  
title: 자동 채우기  
description: Intlayer에서 미리 정의된 패턴을 기반으로 콘텐츠를 자동으로 채우는 자동 채우기 기능을 사용하는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 자동 채우기 기능을 효율적으로 구현할 수 있습니다.  
keywords:

- 자동 채우기
- 콘텐츠 자동화
- 동적 콘텐츠
- Intlayer
- Next.js
- JavaScript
- React

---

# 자동 채우기 콘텐츠 선언 파일 번역

**자동 채우기 콘텐츠 선언 파일**은 개발 워크플로우를 가속화하는 방법입니다.  
자동 채우기 메커니즘은 콘텐츠 선언 파일 간의 _마스터-슬레이브_ 관계를 통해 작동합니다. 메인(마스터) 파일이 업데이트되면 Intlayer는 해당 변경 사항을 파생(자동 채우기) 선언 파일에 자동으로 적용합니다.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "이것은 콘텐츠 예시입니다",
  },
} satisfies Dictionary;

export default exampleContent;
```

다음은 `autoFill` 지시어를 사용하는 [로케일별 콘텐츠 선언 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)입니다.

그런 다음, 다음 명령어를 실행하면:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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

그 후, 두 선언 파일은 단일 사전으로 병합되어 표준 `useIntlayer("example")` 훅(react) / 컴포저블(vue)을 사용하여 접근할 수 있습니다.

## 자동 채워진 파일 형식

자동 채워진 선언 파일에 권장되는 형식은 **JSON**이며, 이는 형식 제약을 피하는 데 도움이 됩니다. 그러나 Intlayer는 `.ts`, `.js`, `.mjs`, `.cjs` 및 기타 형식도 지원합니다.

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

> `.js`, `.ts` 및 유사한 파일의 생성 방식은 다음과 같습니다:
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

`autoFill` 필드는 **로케일별** 콘텐츠 선언 파일 생성도 지원합니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이렇게 하면 두 개의 별도 파일이 생성됩니다:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## 특정 로케일 자동 채우기 필터

`autoFill` 필드에 객체를 사용하면 필터를 적용하여 특정 로케일 파일만 생성할 수 있습니다.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이렇게 하면 프랑스어 번역 파일만 생성됩니다.

## 경로 변수

`autoFill` 경로 내에서 변수를 사용하여 생성된 파일의 대상 경로를 동적으로 해결할 수 있습니다.

**사용 가능한 변수:**

- `{{locale}}` – 로케일 코드 (예: `fr`, `es`)
- `{{key}}` – 사전 키 (예: `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // 여기에 내용을 작성하세요
  },
};
```

이것은 다음을 생성합니다:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력 생성
