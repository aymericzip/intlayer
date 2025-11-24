---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 사전 채우기
description: AI를 사용하여 사전을 채우고, 감사하며, 번역하는 방법을 알아보세요.
keywords:
  - 채우기
  - 감사
  - 번역
  - 사전
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# 사전 채우기 / 감사 / 번역

```bash
npx intlayer fill
```

이 명령어는 누락된 번역, 구조적 불일치 또는 타입 불일치와 같은 잠재적인 문제를 찾기 위해 콘텐츠 선언 파일을 분석합니다. 문제가 발견되면, **intlayer fill**은 사전을 일관되고 완전하게 유지하기 위해 업데이트를 제안하거나 적용합니다.

## 별칭:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## 인자:

**파일 목록 옵션:**

- **`-f, --file [files...]`**: 감사할 특정 콘텐츠 선언 파일 목록입니다. 제공하지 않으면 구성 파일 설정에 따라 발견된 모든 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 파일이 감사됩니다.

  > 예시: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: 키를 기준으로 사전을 필터링합니다. 제공하지 않으면 모든 사전이 감사됩니다.

  > 예시: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: 키를 기준으로 사전을 필터링합니다 (--keys의 별칭).

  > 예시: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: 키를 기준으로 사전을 제외합니다. 제공하지 않으면 모든 사전이 감사됩니다.

  > 예시: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: 키를 기준으로 사전을 제외합니다 (--excluded-keys의 별칭).

  > 예시: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: 파일 경로에 대한 glob 패턴을 기준으로 사전을 필터링합니다.

  > 예시: `npx intlayer dictionary fill --path-filter "src/home/**"`

**엔트리 출력 옵션:**

- **`--source-locale [sourceLocale]`**: 번역할 소스 로케일입니다. 지정하지 않으면 구성 파일의 기본 로케일이 사용됩니다.

- **`--output-locales [outputLocales...]`**: 번역 대상 로케일입니다. 지정하지 않으면 소스 로케일을 제외한 구성 파일의 모든 로케일이 사용됩니다.

- **`--mode [mode]`**: 번역 모드: `complete`, `review`. 기본값은 `complete`입니다. `complete`는 누락된 모든 내용을 채우고, `review`는 누락된 내용을 채우고 기존 키를 검토합니다.

**Git 옵션:**

- **`--git-diff`**: 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)로 변경된 사전만 실행합니다.
- **`--git-diff-base`**: git diff의 기준 참조를 지정합니다 (기본값 `origin/main`).
- **`--git-diff-current`**: git diff의 현재 참조를 지정합니다 (기본값 `HEAD`).
- **`--uncommitted`**: 커밋되지 않은 변경 사항을 포함합니다.
- **`--unpushed`**: 푸시되지 않은 변경 사항을 포함합니다.
- **`--untracked`**: 추적되지 않은 파일을 포함합니다.

  > 예시: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 예시: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI 옵션:**

- **`--model [model]`**: 번역에 사용할 AI 모델 (예: `gpt-3.5-turbo`).
- **`--provider [provider]`**: 번역에 사용할 AI 제공자.
- **`--temperature [temperature]`**: AI 모델의 온도 설정.
- **`--api-key [apiKey]`**: AI 서비스에 사용할 API 키 제공.
- **`--custom-prompt [prompt]`**: 번역 지침을 위한 커스텀 프롬프트 제공.
- **`--application-context [applicationContext]`**: AI 번역에 추가 컨텍스트 제공.

  > 예시: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**환경 변수 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file [envFile]`**: 변수를 로드할 사용자 정의 환경 파일을 제공합니다.

  > 예시: `npx intlayer fill --env-file .env.production.local`

  > 예시: `npx intlayer fill --env production`

**구성 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.

  > 예시: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer build --no-cache`

**준비 옵션:**

- **`--build`**: 푸시 전에 사전을 빌드하여 콘텐츠가 최신 상태인지 확인합니다. true는 빌드를 강제 실행하며, false는 빌드를 건너뛰고, undefined는 빌드 캐시를 사용할 수 있도록 합니다.

- **`--skip-metadata`**: 사전의 누락된 메타데이터(설명, 제목, 태그) 채우기를 건너뜁니다.

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 상세 로그를 활성화합니다. (CLI 기본값은 true)

## 예시:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

이 명령어는 `src/home/` 디렉토리 내 모든 콘텐츠 선언 파일에 대해 GPT-3.5 Turbo 모델을 사용하여 영어에서 프랑스어 및 스페인어로 콘텐츠를 번역합니다.
