---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 컴포넌트 변환
description: 기존 컴포넌트를 Intlayer로 변환하는 방법을 알아보세요.
keywords:
  - 변환
  - 컴포넌트
  - 마이그레이션
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# 컴포넌트 변환

```bash
npx intlayer transform
```

이 명령어는 코드 파일을 분석하여 기존 컴포넌트를 Intlayer로 마이그레이션하는 데 도움을 줍니다. 대화형 파일 선택 또는 특정 파일 지정 방식을 지원합니다.

## 별칭:

- `npx intlayer trans`

## 인수:

**파일 선택 옵션:**

- **`-f, --file [files...]`**: 변환할 특정 파일 목록입니다. 지정하지 않으면 CLI가 일치하는 파일(`**/*.{tsx,jsx,vue,svelte,ts,js}`)을 검색하고 변환할 파일을 선택하도록 안내합니다.

> 예시: `npx intlayer transform -f src/components/MyComponent.tsx`

**출력 옵션:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: 생성된 콘텐츠 선언 파일을 저장할 디렉토리입니다.

  > 예시: `npx intlayer transform -o src/content`

- **`--code-only`**: 컴포넌트 코드만 변환합니다 (콘텐츠 선언은 작성하지 않음).

  > 예시: `npx intlayer transform --code-only`

- **`--declaration-only`**: 콘텐츠 선언만 생성합니다 (컴포넌트는 다시 작성하지 않음).

  > 예시: `npx intlayer transform --declaration-only`

**구성 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--env`**: 환경을 지정합니다.
- **`--env-file`**: 사용자 정의 환경 파일을 제공합니다.
- **`--verbose`**: 자세한 로깅을 활성화합니다.

**필수 플러그인:**

transform 명령어는 TypeScript / JSX 파일에서는 추가 플러그인 없이 작동합니다. 그러나 Vue 및 Svelte 프로젝트에서는 다음 플러그인들이 설치되어 있어야 합니다:

- **`@intlayer/vue-transformer`**: Vue 파일용.
- **`@intlayer/svelte-transformer`**: Svelte 파일용.
