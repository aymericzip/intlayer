---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer 초기화
description: 프로젝트에서 Intlayer를 초기화하는 방법을 알아보세요.
keywords:
  - 초기화
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령 추가
---

# Intlayer 초기화

```bash
npx intlayer init
```

`init` 명령은 필요한 파일과 설정을 구성하여 프로젝트에 Intlayer를 자동으로 설정합니다. Intlayer를 시작하는 권장 방법입니다.

## 별칭:

- `npx intlayer init`

## 인수:

- `--project-root [projectRoot]` - 선택 사항. 프로젝트 루트 디렉터리를 지정합니다. 제공하지 않으면 명령은 현재 작업 디렉터리에서 시작하여 프로젝트 루트를 검색합니다.

## 수행 작업:

`init` 명령은 다음 설정 작업을 수행합니다:

1. **프로젝트 구조 검증** - `package.json` 파일이 있는 유효한 프로젝트 디렉터리에 있는지 확인합니다
2. **`.gitignore` 업데이트** - 생성된 파일을 버전 관리에서 제외하도록 `.gitignore`에 `.intlayer`를 추가합니다
3. **TypeScript 구성** - 모든 `tsconfig.json` 파일을 업데이트하여 Intlayer 타입 정의(`.intlayer/**/*.ts`)를 포함합니다
4. **설정 파일 생성** - 기본 설정으로 `intlayer.config.ts`(TypeScript 프로젝트용) 또는 `intlayer.config.mjs`(JavaScript 프로젝트용)를 생성합니다
5. **Vite 설정 업데이트** - Vite 구성 파일이 감지되면 `vite-intlayer` 플러그인 import를 추가합니다

`init` 명령은 다음 설정 작업을 수행합니다:

1. **프로젝트 구조 검증** - `package.json` 파일이 있는 유효한 프로젝트 디렉터리에 있는지 확인합니다
2. **`.gitignore` 업데이트** - 생성된 파일을 버전 관리에서 제외하기 위해 `.gitignore` 파일에 `.intlayer`를 추가합니다
3. **TypeScript 구성** - 모든 `tsconfig.json` 파일을 업데이트하여 Intlayer 타입 정의(`.intlayer/**/*.ts`)를 포함합니다
4. **구성 파일 생성** - 기본 설정으로 TypeScript 프로젝트의 경우 `intlayer.config.ts`, JavaScript 프로젝트의 경우 `intlayer.config.mjs` 파일을 생성합니다
5. **Vite 구성 업데이트** - Vite 구성 파일이 감지되면 `vite-intlayer` 플러그인 임포트를 추가합니다
6. **Next.js 설정 업데이트** - Next.js 구성 파일이 감지되면 `next-intlayer` 플러그인 import를 추가합니다

## 예제:

### 기본 초기화:

```bash
npx intlayer init
```

이 명령은 현재 디렉터리에 Intlayer를 초기화하며 프로젝트 루트를 자동으로 감지합니다.

### 사용자 지정 프로젝트 루트로 초기화:

```bash
npx intlayer init --project-root ./my-project
```

지정된 디렉터리에 Intlayer를 초기화합니다.

## 예시 출력:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ .gitignore에 .intlayer 추가됨
✓ intlayer 타입을 포함하도록 tsconfig.json 업데이트됨
intlayer.config.ts 생성됨
✓ vite.config.ts에 import 주입됨
✓ Intlayer 초기화 설정 완료.
```

## 참고:

- 명령은 멱등(idempotent)입니다 — 여러 번 안전하게 실행할 수 있습니다. 이미 구성된 단계는 건너뜁니다.
- 구성 파일이 이미 존재하는 경우 덮어쓰지 않습니다.
- `include` 배열이 없는 TypeScript 구성 파일(예: references를 사용하는 솔루션 스타일 구성)은 건너뜁니다.
- 프로젝트 루트에서 `package.json`을 찾을 수 없으면 명령은 오류와 함께 종료합니다.
