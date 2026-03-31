---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer 초기화
description: 프로젝트에서 Intlayer를 초기화하는 방법을 알아봅니다.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore 옵션 추가"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
---

# Intlayer 초기화

```bash
npx intlayer init
```

`init` 명령어는 필요한 파일과 설정을 구성하여 프로젝트에서 Intlayer를 자동으로 설정합니다. Intlayer를 시작하는 데 권장되는 방법입니다.

## 별칭:

- `npx intlayer init`

## 인수:

- `--project-root [projectRoot]` - 선택 사항. 프로젝트 루트 디렉토리를 지정합니다. 제공되지 않으면 명령어는 현재 작업 디렉토리부터 프로젝트 루트를 검색합니다.
- `--no-gitignore` - 선택 사항. `.gitignore` 파일의 자동 업데이트를 건너뜁니다. 이 플래그가 설정되면 `.intlayer`가 `.gitignore`에 추가되지 않습니다.

## 작동 원리:

`init` 명령어는 다음과 같은 설정 작업을 수행합니다:

1. **프로젝트 구조 유효성 검사** - `package.json` 파일이 있는 유효한 프로젝트 디렉토리에 있는지 확인합니다.
2. **`.gitignore` 업데이트** - 생성된 파일을 버전 관리에서 제외하기 위해 `.gitignore` 파일에 `.intlayer`를 추가합니다 (`--no-gitignore`로 건너뛸 수 있음).
3. **TypeScript 구성** - Intlayer 타입 정의(`.intlayer/**/*.ts`)를 포함하도록 모든 `tsconfig.json` 파일을 업데이트합니다.
4. **설정 파일 생성** - 기본 설정을 사용하여 `intlayer.config.ts`(TypeScript 프로젝트용) 또는 `intlayer.config.mjs`(JavaScript 프로젝트용)를 생성합니다.
5. **Vite 설정 업데이트** - Vite 설정 파일이 감지되면 `vite-intlayer` 플러그인 임포트를 추가합니다.
6. **Next.js 설정 업데이트** - Next.js 설정 파일이 감지되면 `next-intlayer` 플러그인 임포트를 추가합니다.

## 예시:

### 기본 초기화:

```bash
npx intlayer init
```

이 명령어는 현재 디렉토리에서 Intlayer를 초기화하며 프로젝트 루트를 자동으로 감지합니다.

### 사용자 정의 프로젝트 루트로 초기화:

```bash
npx intlayer init --project-root ./my-project
```

이 명령어는 지정된 디렉토리에서 Intlayer를 초기화합니다.

### .gitignore를 업데이트하지 않고 초기화:

```bash
npx intlayer init --no-gitignore
```

이 명령어는 모든 설정 파일을 구성하지만 `.gitignore`는 수정하지 않습니다.

## 출력 예시:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## 참고 사항:

- 이 명령어는 멱등성(idempotent)이 있습니다. 여러 번 실행해도 안전하며 이미 구성된 단계는 건너뜁니다.
- 설정 파일이 이미 존재하는 경우 덮어쓰지 않습니다.
- `include` 배열이 없는 TypeScript 구성(예: 참조가 있는 솔루션 스타일 구성)은 건너뜁니다.
- 프로젝트 루트에서 `package.json`을 찾을 수 없으면 명령어가 오류와 함께 종료됩니다.
