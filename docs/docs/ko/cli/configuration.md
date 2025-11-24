---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 구성 관리
description: Intlayer 구성을 CMS에 가져오고 푸시하는 방법을 알아보세요.
keywords:
  - 구성
  - 설정
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# 구성 관리

## 구성 가져오기

`configuration get` 명령어는 Intlayer의 현재 구성을, 특히 로케일 설정을 가져옵니다. 이는 설정을 확인하는 데 유용합니다.

```bash
npx intlayer configuration get
```

## 별칭:

- `npx intlayer config get`
- `npx intlayer conf get`

## 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수 로드를 위한 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위한 자세한 로깅을 활성화합니다. (CLI에서 기본값은 true)
- **`--no-cache`**: 캐시를 비활성화합니다.

## 구성 푸시

`configuration push` 명령어는 구성을 Intlayer CMS 및 에디터에 업로드합니다. 이 단계는 Intlayer Visual Editor에서 원격 사전을 사용할 수 있도록 하는 데 필요합니다.

```bash
npx intlayer configuration push
```

## 별칭:

- `npx intlayer config push`
- `npx intlayer conf push`

## 인수:

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file`**: 변수 로드를 위한 사용자 정의 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다.
- **`--verbose`**: 디버깅을 위해 자세한 로깅을 활성화합니다. (CLI에서 기본값은 true입니다)
- **`--no-cache`**: 캐시를 비활성화합니다.

구성을 푸시하면 프로젝트가 Intlayer CMS와 완전히 통합되어 팀 간 원활한 사전 관리를 가능하게 합니다.
