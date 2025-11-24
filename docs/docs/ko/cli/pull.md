---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 사전 가져오기
description: Intlayer 에디터와 CMS에서 사전을 가져오는 방법을 알아보세요.
keywords:
  - 가져오기
  - 사전
  - CLI
  - Intlayer
  - 에디터
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# 원격 사전 가져오기

```bash
npx intlayer pull
```

[intlayer 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)가 설치되어 있으면, 에디터에서 사전을 가져올 수도 있습니다. 이렇게 하면 애플리케이션의 필요에 따라 사전 내용을 덮어쓸 수 있습니다.

## 별칭:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## 인수:

**사전 옵션:**

- **`-d, --dictionaries`**: 가져올 사전의 ID입니다. 지정하지 않으면 모든 사전이 가져와집니다.

  > 예시: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: 가져올 사전의 ID입니다 (--dictionaries의 별칭).

  > 예시: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**구성 옵션:**

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다. intlayer 구성을 가져오기 위해 명령어는 기본 디렉토리에서 `intlayer.config.{ts,js,json,cjs,mjs}` 파일을 찾습니다.

  > 예시: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer build --no-cache`

**환경 변수 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수를 로드할 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다. intlayer 구성을 가져오기 위해 명령어는 기본 디렉토리에서 `intlayer.config.{ts,js,json,cjs,mjs}` 파일을 찾습니다.

  > 예시: `npx intlayer dictionary push --env-file .env.production.local`

  > 예시: `npx intlayer dictionary push --env production`

**출력 옵션:**

- **`--new-dictionaries-path`** : 새 사전이 저장될 디렉토리 경로입니다. 지정하지 않으면 새 사전은 프로젝트의 `./intlayer-dictionaries` 디렉토리에 저장됩니다. 사전 내용에 `filePath` 필드가 지정된 경우, 사전은 이 인수를 무시하고 지정된 `filePath` 디렉토리에 저장됩니다.

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 상세 로그를 활성화합니다. (CLI에서 기본값은 true입니다)

## 예시:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
