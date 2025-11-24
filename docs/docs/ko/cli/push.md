---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 사전 푸시하기
description: Intlayer 에디터와 CMS에 사전을 푸시하는 방법을 알아보세요.
keywords:
  - 푸시
  - 사전
  - CLI
  - Intlayer
  - 에디터
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# 사전 푸시하기

```bash
npx intlayer dictionary push
```

[intlayer 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)가 설치되어 있다면, 사전을 에디터로도 푸시할 수 있습니다. 이 명령어는 사전을 [에디터](https://intlayer.org/dashboard)에서 사용할 수 있도록 합니다. 이를 통해 팀과 사전을 공유하고 애플리케이션 코드를 수정하지 않고도 콘텐츠를 편집할 수 있습니다.

## 별칭:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## 인수:

**사전 옵션:**

- **`-d`, `--dictionaries`**: 가져올 사전의 ID들입니다. 지정하지 않으면 모든 사전이 푸시됩니다.

  > 예시: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: 가져올 사전의 ID들 (--dictionaries의 별칭).

  > 예시: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**설정 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다. intlayer 설정을 가져오기 위해, 이 명령어는 기본 디렉토리에서 `intlayer.config.{ts,js,json,cjs,mjs}` 파일을 찾습니다.

  > 예시: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer build --no-cache`

**환경 변수 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`). intlayer 설정 파일에서 환경 변수를 사용하는 경우에 유용합니다.
- **`--env-file`**: 변수를 로드할 사용자 지정 환경 파일을 제공합니다. intlayer 설정 파일에서 환경 변수를 사용하는 경우에 유용합니다.

  > 예시: `npx intlayer dictionary push --env-file .env.production.local`

  > 예시: `npx intlayer dictionary push --env production`

**출력 옵션:**

- **`-r`, `--delete-locale-dictionary`**: 사전이 푸시된 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 해당 디렉토리를 삭제합니다. 기본적으로 사전이 로컬에 정의되어 있으면 원격 사전 내용을 덮어씁니다.

  > 예시: `npx intlayer dictionary push -r`

  > 예시: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: 사전이 푸시된 후 로케일 디렉토리를 삭제할지 묻는 질문을 건너뛰고 해당 디렉토리를 유지합니다. 기본적으로 사전이 로컬에 정의되어 있으면 원격 사전 내용을 덮어씁니다.

  > 예시: `npx intlayer dictionary push -k`

  > 예시: `npx intlayer dictionary push --keep-locale-dictionary`

**준비 옵션:**

- **`--build`**: 푸시하기 전에 사전을 빌드하여 내용이 최신 상태인지 확인합니다. true는 빌드를 강제로 수행하고, false는 빌드를 건너뛰며, undefined는 빌드 캐시를 사용하도록 허용합니다.

**로그 옵션:**

- **`--verbose`**: 디버깅을 위해 자세한 로깅을 활성화합니다. (CLI 기본값은 true)

**Git 옵션:**

- **`--git-diff`**: 기본 브랜치(기본값 `origin/main`)에서 현재 브랜치(기본값 `HEAD`)로 변경된 사전에 대해서만 실행합니다.
- **`--git-diff-base`**: git diff의 기준 참조를 지정합니다 (기본값 `origin/main`).
- **`--git-diff-current`**: git diff의 현재 참조를 지정합니다 (기본값 `HEAD`).
- **`--uncommitted`**: 커밋되지 않은 변경 사항을 포함합니다.
- **`--unpushed`**: 푸시되지 않은 변경 사항을 포함합니다.
- **`--untracked`**: 추적되지 않은 파일을 포함합니다.

- **`--build`**: 푸시 전에 사전을 빌드하여 콘텐츠가 최신 상태인지 확인합니다. true는 빌드를 강제 실행하고, false는 빌드를 건너뛰며, undefined는 빌드 캐시를 사용하도록 허용합니다.

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다. (기본값은 CLI에서 true)

**Git 옵션:**

- **`--git-diff`**: 기본 브랜치(기본값: `origin/main`)와 현재 브랜치(기본값: `HEAD`) 간의 변경 사항이 포함된 사전에만 실행합니다.
- **`--git-diff-base`**: git diff의 기준 참조를 지정합니다. (기본값: `origin/main`)
- **`--git-diff-current`**: git diff의 현재 참조를 지정합니다. (기본값: `HEAD`)
- **`--uncommitted`**: 커밋되지 않은 변경 사항을 포함합니다.
- **`--unpushed`**: 푸시되지 않은 변경 사항을 포함합니다.
- **`--untracked`**: 추적되지 않은 파일을 포함합니다.

  > 예시: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 예시: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
