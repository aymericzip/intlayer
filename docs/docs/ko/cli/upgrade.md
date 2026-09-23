---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Intlayer 패키지 업그레이드
description: Intlayer CLI upgrade 명령어를 사용하여 프로젝트 또는 모노레포의 모든 Intlayer 패키지를 나열하고 최신 버전으로 업그레이드하는 방법을 알아봅니다.
keywords:
  - CLI
  - Upgrade
  - 업그레이드
  - Packages
  - 패키지
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade 명령어 추가"
author: aymericzip
---

# Intlayer 패키지 업그레이드

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

`upgrade` 명령어는 모노레포 워크스페이스를 포함하여 프로젝트의 모든 `package.json`에 선언된 Intlayer 패키지를 나열하고 최신 배포 버전으로 업그레이드합니다. `intlayer init`과 동일한 패키지 업그레이드 단계를 독립적으로 실행합니다.

## 인수:

- `--project-root [projectRoot]` - 선택 사항. 프로젝트 루트 디렉터리입니다. 기본적으로 현재 작업 디렉터리 상위의 가장 가까운 `package.json`부터 시작합니다.
- `--dry-run` - 선택 사항. 파일을 수정하지 않고 패키지와 대상 버전을 나열합니다.
- `--tag <tag>` - 선택 사항. 업그레이드할 npm dist-tag입니다(예: `canary`). 기본값은 `latest`입니다.

## 동작 방식:

1. **Intlayer 패키지 나열** - 프로젝트의 각 `package.json`(`node_modules` 및 빌드 출력 제외)을 스캔하여 `intlayer`, `@intlayer/*`, `*-intlayer`, `intlayer-*` 종속성 및 devDependencies를 찾습니다.
2. **대상 버전 가져오기** - npm 레지스트리에서 각 패키지의 선택된 dist-tag(기본값: `latest`) 버전을 읽어옵니다.
3. **버전 범위 재작성** - 각 오래된 범위를 파일 내에서 직접 업데이트하며, 연산자(`^`, `~` 또는 없음) 및 파일 들여쓰기를 유지합니다.
4. **한 번만 설치** - 잠금 파일(lock file)을 소유한 패키지 관리자를 사용하여 워크스페이스 루트(잠금 파일이 있는 가장 가까운 디렉터리)에서 단일 설치를 실행합니다:

| 잠금 파일                     | 명령어         |
| ----------------------------- | -------------- |
| `bun.lock` / `bun.lockb`      | `bun install`  |
| `pnpm-lock.yaml`              | `pnpm install` |
| `yarn.lock`                   | `yarn install` |
| `package-lock.json` 또는 없음 | `npm install`  |

잠금 파일이 없는 경우 npm으로 대체하기 전에 `package.json`의 `packageManager` 필드(예: `"bun@1.2.0"`)가 사용됩니다.

`workspace:*`, `file:`, `link:`, `catalog:` 또는 git URL과 같이 레지스트리를 가리키지 않는 범위는 수정되지 않습니다.

## 예제:

### 변경 사항을 적용하지 않고 사용 가능한 업그레이드 나열:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### canary 릴리스로 업그레이드:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## 출력 예시:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## 참고:

- 리포지토리 루트에서 명령어를 실행하면 모든 워크스페이스가 업그레이드됩니다. 특정 워크스페이스에서 실행하면 해당 워크스페이스만 업그레이드됩니다.
- 버전을 가져올 수 없는 패키지(오프라인, 비공개 또는 미게시 패키지)는 목록에 표시되지만 변경되지 않습니다.
- 설치에 실패하더라도 업그레이드된 범위는 `package.json`에 유지됩니다. 패키지 관리자의 설치 명령어를 수동으로 실행하세요.
