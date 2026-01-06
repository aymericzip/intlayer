---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Intlayer 프로젝트 목록
description: 디렉터리 또는 Git 저장소에서 모든 Intlayer 프로젝트를 나열하는 방법을 알아봅니다.
keywords:
  - List
  - Projects
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Intlayer 프로젝트 목록

```bash
npx intlayer projects list
```

이 명령은 Intlayer 구성 파일을 포함하는 디렉터리를 찾아 모든 Intlayer 프로젝트를 검색하고 나열합니다. 모노레포, 워크스페이스 또는 Git 저장소에서 모든 Intlayer 프로젝트를 발견하는 데 유용합니다.

## 별칭:

- `npx intlayer projects-list`
- `npx intlayer pl`

## 인수:

- **`--base-dir [path]`**: 검색을 시작할 기준 디렉터리를 지정합니다. 기본값은 현재 작업 디렉터리입니다.

  > 예: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: 기준 디렉터리 대신 git 루트 디렉터리에서 검색합니다. 모노레포나 git 저장소에서 모든 Intlayer 프로젝트를 찾을 때 유용합니다.

  > 예: `npx intlayer projects list --git-root`

- **`--json`**: 결과를 포맷된 텍스트 대신 JSON으로 출력합니다. 스크립팅 및 프로그래밍 방식 접근에 유용합니다.

  > 예: `npx intlayer projects list --json`

## 작동 방식:

이 명령은 지정한 디렉터리(또는 `--git-root` 사용 시 git 루트)에서 Intlayer 구성 파일을 검색합니다. 다음 구성 파일 패턴을 찾습니다:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

이 파일들 중 하나를 포함하는 각 디렉터리는 Intlayer 프로젝트로 간주되어 출력에 나열됩니다.

## 예시:

### 현재 디렉터리에서 프로젝트 목록:

```bash
npx intlayer projects list
```

### 특정 디렉터리에서 프로젝트 목록:

```bash
npx intlayer projects list --base-dir ./packages
```

### git 저장소의 모든 프로젝트 목록:

```bash
npx intlayer projects list --git-root
```

### 단축 별칭 사용:

```bash
npx intlayer pl --git-root
```

### JSON으로 출력:

```bash
npx intlayer projects list --json
```

## 예시 출력:

### 포맷된 출력:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON 출력:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## 사용 사례:

- **Monorepo 관리**: 모노레포 구조에서 모든 Intlayer 프로젝트를 발견
- **프로젝트 검색**: 워크스페이스 내 Intlayer 사용 프로젝트 찾기
- **CI/CD**: 자동화된 워크플로우에서 Intlayer 프로젝트를 검증
- **Documentation**: Intlayer를 사용하는 모든 프로젝트를 나열하는 문서를 생성

출력은 각 프로젝트 디렉터리에 대한 절대 경로를 제공하므로 여러 Intlayer 프로젝트로 이동하거나 여러 프로젝트에 대해 스크립트를 실행하기 쉽습니다.
