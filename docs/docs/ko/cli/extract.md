---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 문자열 추출
description: 컴포넌트 근처에 .content 파일로 컴포넌트의 문자열을 추출하는 방법을 알아보세요.
keywords:
  - 추출
  - 컴포넌트
  - 마이그레이션
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# 문자열 추출

```bash
npx intlayer extract
```

이 명령은 코드 파일을 분석하여 컴포넌트의 문자열을 컴포넌트 근처의 .content 파일로 추출합니다. 대화형 파일 선택 또는 특정 파일 지정 방식을 지원합니다.

## 별칭:

- `npx intlayer ext`

## 인수:

**파일 선택 옵션:**

- **`-f, --file [files...]`**: 추출할 특정 파일들의 목록입니다. 제공하지 않으면 CLI가 일치하는 파일들을 스캔한 후(`**/*.{tsx,jsx,vue,svelte,ts,js}`) 어떤 파일을 추출할지 선택하도록 프롬프트를 표시합니다.

  > 예시: `npx intlayer extract -f src/components/MyComponent.tsx`

**출력 옵션:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: 생성된 content declaration 파일을 저장할 디렉터리입니다.

  > 예시: `npx intlayer extract -o src/content`

- **`--code-only`**: 컴포넌트 코드만 추출합니다 (content declaration을 작성하지 않습니다).

  > 예시: `npx intlayer extract --code-only`

- **`--declaration-only`**: content declaration만 생성합니다 (컴포넌트를 다시 쓰지 않습니다).

  > 예시: `npx intlayer extract --declaration-only`

**구성 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉터리를 지정합니다.
- **`--env`**: 환경을 지정합니다.
- **`--env-file`**: 사용자 지정 환경 파일을 제공합니다.
- **`--verbose`**: 자세한 로깅을 활성화합니다.

**필수 플러그인:**

extract 명령은 TypeScript / JSX 파일에서는 추가 플러그인 없이 동작합니다. 그러나 Vue 및 Svelte 프로젝트에서는 다음 플러그인들이 설치되어 있어야 합니다:

- **`@intlayer/vue-transformer`**: Vue 파일용.
- **`@intlayer/svelte-transformer`**: Svelte 파일용.
