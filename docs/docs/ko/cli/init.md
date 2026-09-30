---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: 프로젝트에 Intlayer 설정"
description: "intlayer init으로 기존 프로젝트에 Intlayer를 추가하세요. 프레임워크를 감지하고 패키지를 설치하며 설정 파일을 작성합니다."
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init는 패키지 설치와 프레임워크 설정만 수행; 단계별 전용 하위 명령 추가; 터미널이 없으면 --interactive가 실패"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra 하위 명령어 추가"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore 옵션 추가"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
author: aymericzip
---

# Intlayer 초기화

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` 명령은 Intlayer 패키지를 설치하고 프레임워크를 설정합니다(설정 파일, TypeScript, 번들러 플러그인, 미들웨어/프록시, 프로바이더). Intlayer를 시작하는 권장 방법입니다.

그 밖의 모든 것(CI 워크플로, AI 스킬, MCP 서버, 에디터 도구, 린트 규칙, CMS, 인프라)은 선택 사항입니다. `--interactive` 체크리스트에서 고르거나 전용 하위 명령을 실행하세요(아래 참고).

## 별칭:

- `npx intlayer init`

## 인수:

- `--project-root [projectRoot]` - 선택 사항. 프로젝트 루트 디렉토리를 지정합니다. 제공되지 않으면 명령어는 현재 작업 디렉토리부터 프로젝트 루트를 검색합니다.
- `--no-gitignore` - 선택 사항. `.gitignore` 파일의 자동 업데이트를 건너뜁니다. 이 플래그가 설정되면 `.intlayer`가 `.gitignore`에 추가되지 않습니다.
- `--no-framework-setup` - 선택 사항. 프로젝트 파일은 건드리지 않고 패키지만 설치합니다.
- `--routing <routing>` - 선택 사항. 로케일 라우팅: `prefix-no-default`(기본값), `prefix-all`, `no-prefix`, `search-params` 또는 `none`.
- `-i, --interactive` - 선택 사항. 기본 세트 대신 체크리스트(패키지, CI, 스킬, MCP, VS Code, LSP, 린트, CMS, 인프라, …)에서 설정 단계를 고릅니다. 터미널이 필요합니다. 터미널이 없으면(AI 에이전트, CI) 명령이 실패하고 대신 실행할 하위 명령 목록을 보여 줍니다.
- `--no-github-actions` - 선택 사항. `--interactive`와 함께 쓰면 선택되어 있어도 GitHub Actions 워크플로를 만들지 않습니다.

## 작동 원리:

`init` 명령어는 다음과 같은 설정 작업을 수행합니다:

1. **프로젝트 구조 유효성 검사** - `package.json` 파일이 있는 유효한 프로젝트 디렉토리에 있는지 확인합니다.
2. **패키지 설치** - 스택에 없는 Intlayer 패키지(예: `react-intlayer`, `vite-intlayer`)를 설치하고 오래된 패키지를 업그레이드합니다.
3. **`.gitignore` 업데이트** - 생성된 파일을 버전 관리에서 제외하기 위해 `.gitignore` 파일에 `.intlayer`를 추가합니다 (`--no-gitignore`로 건너뛸 수 있음).
4. **TypeScript 구성** - Intlayer 타입 정의(`.intlayer/**/*.ts`)를 포함하도록 모든 `tsconfig.json` 파일을 업데이트합니다.
5. **설정 파일 생성** - 기본 설정을 사용하여 `intlayer.config.ts`(TypeScript 프로젝트용) 또는 `intlayer.config.mjs`(JavaScript 프로젝트용)를 생성합니다.
6. **번들러 / 프레임워크 설정 업데이트** - Vite, Next.js, Nuxt, Astro 등의 설정에 Intlayer 플러그인을 추가하고, 프레임워크가 지원하면 미들웨어/프록시와 프로바이더를 생성합니다.

## 한 단계씩 설정하기

`--interactive` 체크리스트의 모든 단계에는 전용 하위 명령이 있습니다. 값을 플래그로 넘기면 아무것도 묻지 않으므로 AI 에이전트나 CI 작업에서 안전하게 실행할 수 있습니다.

| 명령                                                                  | 설정하는 내용                                                                     |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | 없는 Intlayer 패키지를 설치하고 오래된 패키지를 업그레이드                        |
| `intlayer init project [--routing <routing>]`                         | 설정 파일, TypeScript, 번들러 플러그인, 미들웨어/프록시, 프로바이더, `.gitignore` |
| `intlayer init github-actions`                                        | `fill` 및 `test` GitHub Actions 워크플로                                          |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json`에 Intlayer 확장 프로그램 추천                           |
| `intlayer init lsp`                                                   | `.vscode/settings.json`의 Intlayer 언어 서버                                      |
| `intlayer init eslint`                                                | 프로젝트가 이미 린트를 사용할 때 Intlayer 린트 규칙(ESLint / oxlint)              |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI 에이전트용 스킬 형태의 Intlayer 문서                                           |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP 서버                                                                 |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer 브라우저 확장 프로그램의 스토어 페이지 열기                              |
| `intlayer init cms`                                                   | 브라우저로 Intlayer CMS에 로그인하고 자격 증명을 `.env`에 저장                    |
| `intlayer init infra --mode <desktop/docker/compose>`                 | 데스크톱 앱 또는 셀프 호스팅 스택                                                 |

### AI 에이전트나 CI 작업에서 실행하기

AI 에이전트의 셸에는 터미널이 없어서 질문에 답할 수 없습니다. 기본 명령을 실행한 다음 필요한 하위 명령을 실행하세요:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

터미널이 없을 때:

- `init skills`는 `--skills`가 설정되지 않으면 스택에 맞는 스킬을 설치합니다(예: `--skills Usage Content React`).
- `init skills`와 `init mcp`는 `--platform`이 설정되지 않으면 감지된 AI 플랫폼(Claude Code, Cursor, VS Code, Windsurf, …)을 사용하고, 아무것도 감지되지 않으면 플랫폼 목록과 함께 실패합니다.
- `init mcp`는 `--transport`가 설정되지 않으면 `stdio` 트랜스포트를 사용합니다.
- `init infra`에는 `--mode`가 필요하며, `init extension`은 `--browser`가 설정되지 않으면 스토어 링크만 출력합니다.

MCP 서버는 항상 프로젝트 안에 설정됩니다(Claude Code의 경우 `.mcp.json`).

## 예시:

### 기본 초기화:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

이 명령어는 현재 디렉토리에서 Intlayer를 초기화하며 프로젝트 루트를 자동으로 감지합니다.

### 사용자 정의 프로젝트 루트로 초기화:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

이 명령어는 지정된 디렉토리에서 Intlayer를 초기화합니다.

### .gitignore를 업데이트하지 않고 초기화:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

이 명령어는 모든 설정 파일을 구성하지만 `.gitignore`는 수정하지 않습니다.

### 인프라 설정 (데스크톱 앱 또는 셀프 호스팅):

```bash
npx intlayer init infra
```

호스팅된 설치 프로그램(macOS / Linux의 `https://intlayer.org/install.sh`, Windows의 `install.ps1`)을 다운로드하고 실행하여 Intlayer 실행 방법을 선택하도록 안내합니다:

- **데스크톱 앱** - Intlayer Cloud에 연결된 네이티브 대시보드를 로컬 머신에 설치합니다.
- **올인원 Docker** - 단일 컨테이너 내에 대시보드 + API + MongoDB + Redis + MinIO가 모두 포함됩니다.
- **Docker Compose** - 확장 가능한 셀프 호스팅을 위한 서비스당 하나의 컨테이너 구성입니다.

`--mode` 옵션으로 메뉴를 건너뛸 수 있습니다:

```bash
npx intlayer init infra --mode compose
```

`npx intlayer init --interactive`에서도 동일한 단계가 제공됩니다. 설치 프로그램 설정은 [`init infra` 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/infra.md)를, 각 모드가 설정하는 세부 내용은 [셀프 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)를 참조하세요.

- [`init infra` 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/infra.md)
- [셀프 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)

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
