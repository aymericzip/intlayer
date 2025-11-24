---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 문서 번역
description: AI 번역 서비스를 사용하여 문서 파일을 자동으로 번역하는 방법을 알아보세요.
keywords:
  - 번역
  - 문서
  - 문서화
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# 문서 번역

`doc translate` 명령어는 AI 번역 서비스를 사용하여 기본 로케일에서 대상 로케일로 문서 파일을 자동으로 번역합니다.

```bash
npx intlayer doc translate
```

## 인수:

**파일 목록 옵션:**

- **`--doc-pattern [docPattern...]`**: 번역할 문서 파일과 일치하는 Glob 패턴입니다.

  > 예시: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: 번역에서 제외할 Glob 패턴입니다.

  > 예시: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: 지정된 시간 이전에 수정된 파일은 건너뜁니다.
  - "2025-12-05"와 같은 절대 시간 (문자열 또는 Date)일 수 있습니다.
  - `1 * 60 * 60 * 1000` (1시간)과 같은 상대 시간(ms)일 수 있습니다.
  - 이 옵션은 `fs.stat` 메서드를 사용하여 파일의 수정 시간을 확인합니다. 따라서 Git이나 파일을 수정하는 다른 도구의 영향을 받을 수 있습니다.

  > 예시: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: 지정된 시간 이내에 수정된 파일은 건너뜁니다.
  - "2025-12-05"와 같은 절대 시간(문자열 또는 Date)일 수 있습니다.
  - `1 * 60 * 60 * 1000` (1시간)과 같은 상대 시간(ms)일 수 있습니다.
  - 이 옵션은 `fs.stat` 메서드를 사용하여 파일의 수정 시간을 확인합니다. 따라서 Git이나 파일을 수정하는 다른 도구의 영향을 받을 수 있습니다.

  > 예시: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: 파일이 이미 존재하면 건너뜁니다.

  > 예시: `npx intlayer doc translate --skip-if-exists`

**출력 옵션:**

- **`--locales [locales...]`**: 문서를 번역할 대상 로케일입니다.

  > 예시: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: 번역할 원본 로케일입니다.

  > 예시: `npx intlayer doc translate --base-locale en`

**파일 처리 옵션:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: 동시에 번역할 파일 수입니다.

  > 예시: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AI 옵션:**

- **`--model [model]`**: 번역에 사용할 AI 모델 (예: `gpt-3.5-turbo`).
- **`--provider [provider]`**: 번역에 사용할 AI 제공자.
- **`--temperature [temperature]`**: AI 모델의 온도 설정.
- **`--api-key [apiKey]`**: AI 서비스에 사용할 API 키를 제공합니다.
- **`--application-context [applicationContext]`**: AI 번역에 추가 컨텍스트를 제공합니다.
- **`--custom-prompt [prompt]`**: 번역에 사용되는 기본 프롬프트를 사용자 정의합니다. (참고: 대부분의 사용 사례에서는 번역 동작을 더 잘 제어할 수 있는 `--custom-instructions` 옵션을 사용하는 것이 권장됩니다.)

  > 예시: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**환경 변수 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file [envFile]`**: 변수를 로드할 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--no-cache`**: 캐시를 비활성화합니다.

> 예시: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 상세 로그 활성화. (CLI에서 기본값은 true)

  > 예시: `npx intlayer doc translate --verbose`

**사용자 지정 지침 옵션:**

- **`--custom-instructions [customInstructions]`**: 프롬프트에 추가되는 사용자 지정 지침. 포맷팅, URL 번역 등 특정 규칙을 적용할 때 유용합니다.
  - "2025-12-05"와 같은 절대 시간 (문자열 또는 Date 객체)일 수 있습니다.
  - `1 * 60 * 60 * 1000` (1시간)과 같은 밀리초 단위의 상대 시간일 수 있습니다.
  - 이 옵션은 `fs.stat` 메서드를 사용하여 파일의 수정 시간을 확인합니다. 따라서 Git이나 파일을 수정하는 다른 도구의 영향을 받을 수 있습니다.

> 예시: `npx intlayer doc translate --custom-instructions "URL 번역을 피하고, 마크다운 형식을 유지하세요"`

> 예시: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git 옵션:**

- **`--git-diff`**: 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)로 변경된 사전만 실행합니다.
- **`--git-diff-base`**: git diff의 기준 참조를 지정합니다 (기본값 `origin/main`).
- **`--git-diff-current`**: git diff의 현재 참조를 지정합니다 (기본값 `HEAD`).
- **`--uncommitted`**: 커밋되지 않은 변경사항을 포함합니다.
- **`--unpushed`**: 푸시되지 않은 변경사항을 포함합니다.
- **`--untracked`**: 추적되지 않은 파일을 포함합니다.

> 예시: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

> 예시: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> 출력 파일 경로는 다음 패턴을 대체하여 결정됩니다.
>
> - `/{{baseLocale}}/` 는 `/{{locale}}/` 로 대체 (Unix)
> - `\{{baseLocale}}\` 는 `\{{locale}}\` 로 대체 (Windows)
> - `_{{baseLocale}}.` 는 `_{{locale}}.` 로 대체
> - `{{baseLocale}}_` 는 `{{locale}}_` 로 대체
> - `.{{baseLocaleName}}.` 는 `.{{localeName}}.` 로 대체
>
> 만약 패턴이 발견되지 않으면, 출력 파일은 파일 확장자에 `.{{locale}}` 를 추가합니다. 예를 들어 `./my/file.md` 는 프랑스어 로케일의 경우 `./my/file.fr.md` 로 번역됩니다.
