---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 알 수 없는 명령어
description: 알 수 없는 명령어 오류를 해결하는 방법을 알아보세요.
keywords:
  - 알 수 없음
  - 명령어
  - 오류
  - intlayer
  - fill
  - build
  - verbose
  - 터미널
  - 재시작
  - 로컬
slugs:
  - frequent-questions
  - unknown-command
---

# 오류: 알 수 없는 명령어 fill / build / 기타

`npx intlayer fill --verbose` 명령어 실행 시 다음과 같은 메시지가 나타난다면:

```
error: unknown command 'fill'
```

하지만 `fill` 명령어가 _존재해야 한다고_ 확신한다면, 다음 단계들을 따라 문제를 해결할 수 있습니다:

## 1. **최신 버전을 사용하고 있는지 확인하세요**

다음 명령어를 실행하세요:

```bash
npx intlayer --version                  # 현재 로컬 intlayer 버전 확인
npx intlayer@latest --version           # 최신 intlayer 버전 확인
```

이 명령어는 `npx`가 최신 버전을 가져오도록 강제합니다. 그런 다음 다시 시도해 보세요:

```bash
npx intlayer@latest build --verbose
```

## 2. **명령어가 등록되어 있는지 확인하세요**

다음 명령어로 확인할 수 있습니다:

```bash
npx intlayer --help                     # 명령어 관련 정보를 제공합니다
```

명령어 목록에 해당 명령어가 나타나는지 확인하세요.

레포지토리로 가서, 명령어가 CLI 진입점에 내보내지고 등록되어 있는지 확인하세요. Intlayer는 `commander` 프레임워크를 사용합니다.

CLI 관련 코드:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **터미널을 재시작하세요**

새 명령어를 인식하려면 터미널을 재시작해야 할 때가 있습니다.

## 5. **`intlayer`를 개발 중이라면, 다시 빌드하고 링크하세요**

로컬에서 `intlayer`를 개발 중이라면:

```bash
# intlayer 디렉토리에서
npm install
npm run build
npm link
```

그런 다음 다른 터미널에서:

```bash
intlayer fill --verbose
```

이 명령어는 현재 작업 중인 로컬 버전을 사용합니다.

## 6. **npx 캐시를 삭제하세요 (이전 버전에 갇힌 경우)**

```bash
npx clear-npx-cache
```

또는 캐시된 intlayer 패키지를 수동으로 삭제하세요:

```bash
rm -rf ~/.npm/_npx
```

pnpm, yarn, bun 또는 다른 패키지 관리자를 사용하는 경우 해당하는 명령어를 확인하세요.
