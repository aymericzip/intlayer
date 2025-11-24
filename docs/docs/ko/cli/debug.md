---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Intlayer 명령어 디버깅
description: Intlayer CLI 문제를 디버깅하고 문제를 해결하는 방법을 알아보세요.
keywords:
  - 디버깅
  - 문제해결
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Intlayer 명령어 디버깅

## 1. **최신 버전을 사용하고 있는지 확인하세요**

다음 명령어를 실행하세요:

```bash
npx intlayer --version                  # 현재 로컬 Intlayer 버전
npx intlayer@latest --version           # 최신 Intlayer 버전
```

## 2. **명령어가 등록되어 있는지 확인하세요**

다음 명령어로 확인할 수 있습니다:

```bash
npx intlayer --help                     # 사용 가능한 명령어 목록과 사용법 정보 표시
npx intlayer dictionary build --help    # 특정 명령어에 대한 사용 가능한 옵션 목록 표시
```

## 3. **터미널을 재시작하세요**

새로운 명령어를 인식하려면 때때로 터미널 재시작이 필요합니다.

## 4. **npx 캐시를 삭제하세요 (이전 버전에 갇힌 경우)**

```bash
npx clear-npx-cache
```
