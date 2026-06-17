---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: 문서 검토
description: 다양한 로케일에서 문서 파일의 품질, 일관성 및 완전성을 검토하는 방법을 알아보세요.
keywords:
  - 검토
  - 문서
  - 문서화
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "--log 옵션 추가"
author: aymericzip
---

# 문서 검토

`doc review` 명령어는 다양한 로케일에서 문서 파일의 품질, 일관성 및 완전성을 분석합니다.

## 주요 사항:

- AI 모델의 컨텍스트 창 제한 내에서 유지하기 위해 큰 마크다운 파일을 청크로 분할합니다.
- 검토할 청크를 최적화하고 이미 번역되었으며 변경되지 않은 부분을 건너뜁니다.
- 큐 시스템을 사용하여 파일, 청크 및 로케일을 병렬로 처리하여 속도를 높입니다.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

이미 번역된 파일을 검토하거나 번역이 올바른지 확인하는 데 사용할 수 있습니다.

대부분의 사용 사례에서,

- 이 파일의 번역본이 없는 경우 `doc translate`를 사용하는 것이 좋습니다.
- 이 파일의 번역본이 이미 존재하는 경우 `doc review`를 사용하는 것이 좋습니다.

> 검토 프로세스는 동일한 파일을 완전히 검토하기 위해 번역 프로세스보다 더 많은 입력 토큰을 소비한다는 점에 유의하세요. 그러나 검토 프로세스는 검토할 청크를 최적화하고 변경되지 않은 부분은 건너뜁니다.

## 인수:

**파일 목록 옵션:**

- **`--doc-pattern [docPattern...]`**: 검토할 문서 파일과 일치하는 Glob 패턴입니다.

  > 예시: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 검토에서 제외할 Glob 패턴입니다.

  > 예시: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: 지정된 시간 이전에 수정된 파일은 건너뜁니다.
  - "2025-12-05"와 같은 절대 시간 (문자열 또는 Date)일 수 있습니다.
  - `1 * 60 * 60 * 1000` (1시간)과 같은 상대 시간(ms)일 수 있습니다.
  - 이 옵션은 `fs.stat` 메서드를 사용하여 파일의 수정 시간을 확인합니다. 따라서 Git이나 파일을 수정하는 다른 도구의 영향을 받을 수 있습니다.

  > 예시: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: 지정된 시간 이내에 수정된 파일은 건너뜁니다.
  - "2025-12-05"와 같은 절대 시간(문자열 또는 Date)일 수 있습니다.
  - `1 * 60 * 60 * 1000` (1시간)과 같은 상대 시간(ms)일 수 있습니다.
  - 이 옵션은 `fs.stat` 메서드를 사용하여 파일의 수정 시간을 확인합니다. 따라서 Git이나 파일을 수정하는 다른 도구의 영향을 받을 수 있습니다.

  > 예시: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: 파일이 이미 존재하면 건너뜁니다.

  > 예시: `npx intlayer doc review --skip-if-exists`

**검토 모드 옵션:**

- **`--log`**: 로그 전용 모드. AI로 번역하지 않고, 대신 다른 에이전트가 번역을 생성할 수 있도록 기본 및 대상 로케일에 대해 주의가 필요한 블록(줄 번호 및 내용 포함)을 기록합니다.

  > 예시: `npx intlayer doc review --log`

**출력 옵션:**

- **`--locales [locales...]`**: 문서를 검토할 대상 로케일입니다.

  > 예시: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: 비교할 원본 로케일(기본 문서)입니다.

  > 예시: `npx intlayer doc review --base-locale en`

**파일 처리 옵션:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 동시에 검토할 파일 수입니다.

  > 예시: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**AI 옵션:**

- **`--model [model]`**: 검토에 사용할 AI 모델 (예: `gpt-3.5-turbo`).
- **`--provider [provider]`**: 검토에 사용할 AI 제공자.
- **`--temperature [temperature]`**: AI 모델의 온도 설정.
- **`--api-key [apiKey]`**: AI 서비스에 사용할 API 키를 제공합니다.
- **`--application-context [applicationContext]`**: AI 검토에 추가 컨텍스트를 제공합니다.
- **`--data-serialization [dataSerialization]`**: Intlayer의 AI 기능에 사용할 데이터 직렬화 형식. 옵션: `json` (표준, 신뢰할 수 있음), `toon` (토큰 적음, 일관성 낮음).
- **`--custom-prompt [prompt]`**: 검토에 사용되는 기본 프롬프트를 사용자 정의합니다. (참고: 대부분의 사용 사례에서는 동작을 더 잘 제어할 수 있는 `--custom-instructions` 옵션을 사용하는 것이 권장됩니다.)

  > 예시: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**환경 변수 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file [envFile]`**: 변수를 로드할 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 상세 로그 활성화. (CLI에서 기본값은 true)

  > 예시: `npx intlayer doc review --verbose`

**사용자 지정 지침 옵션:**

- **`--custom-instructions [customInstructions]`**: 프롬프트에 추가되는 사용자 지정 지침. 포맷팅, URL 번역 등 특정 규칙을 적용할 때 유용합니다.

  > 예시: `npx intlayer doc review --custom-instructions "URL 번역을 피하고, 마크다운 형식을 유지하세요"`

  > 예시: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git 옵션:**

- **`--git-diff`**: 기준(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)로 변경된 파일만 실행합니다.
- **`--git-diff-base`**: git diff의 기준 참조를 지정합니다 (기본값 `origin/main`).
- **`--git-diff-current`**: git diff의 현재 참조를 지정합니다 (기본값 `HEAD`).
- **`--uncommitted`**: 커밋되지 않은 변경사항을 포함합니다.
- **`--unpushed`**: 푸시되지 않은 변경사항을 포함합니다.
- **`--untracked`**: 추적되지 않은 파일을 포함합니다.

  > 예시: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 예시: `npx intlayer doc review --uncommitted --unpushed --untracked`

> 출력 파일 경로는 다음 패턴을 대체하여 결정됩니다:
>
> - `/{{baseLocale}}/` 는 `/{{locale}}/` 로 대체 (Unix)
> - `\{{baseLocale}}\` 는 `\{{locale}}\` 로 대체 (Windows)
> - `_{{baseLocale}}.` 는 `_{{locale}}.` 로 대체
> - `{{baseLocale}}_` 는 `{{locale}}_` 로 대체
> - `.{{baseLocaleName}}.` 는 `.{{localeName}}.` 로 대체
>
> 만약 패턴이 발견되지 않으면, 출력 파일은 파일 확장자에 `.{{locale}}` 를 추가합니다. 예를 들어 `./my/file.md` 는 검토되고, 프랑스어 로케일의 경우 `./my/file.fr.md` 로 업데이트됩니다.
