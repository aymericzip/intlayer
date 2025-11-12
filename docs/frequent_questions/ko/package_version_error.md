---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 서브 패키지 @intlayer/* 관련 오류가 발생합니다
description: 서브 패키지 @intlayer/* 관련 오류 해결 방법입니다.
keywords:
  - @intlayer/*
  - 서브 패키지
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# 서브 패키지 `@intlayer/*` 관련 오류가 발생합니다

이 문제는 보통 Intlayer 패키지 업데이트 후에 발생합니다.

오류 메시지 예시:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  "node_modules/@intlayer/config/dist/esm/client.mjs"에서 "configESMxCJSRequire"를 위한 일치하는 export를 찾을 수 없습니다.

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## 원인

`intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer`와 같은 기본 패키지들은 코드 중복을 피하기 위해 `@intlayer/config`, `@intlayer/core`, `@intlayer/types`와 같은 동일한 서브 패키지를 재사용하고 있습니다.

두 버전 사이에서 서브 패키지의 exports가 동일하다는 보장이 없습니다. 이 문제를 제한하기 위해, intlayer는 서브 패키지의 버전을 메인 패키지의 버전에 고정합니다.

> 예: `intlayer@1.0.0`은 `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`을 사용합니다.

> (`@intlayer/swc`를 제외하고) `@intlayer/*` 서브 패키지는 직접 사용하도록 설계되지 않았습니다. 따라서 직접 설치하지 않는 것을 권장합니다.

## 해결 방법

1. 메인 패키지와 서브 패키지의 버전이 동일한지 확인하세요.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // 잘못된 버전입니다. 7.0.1이어야 합니다.
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. lockfile과 node_modules 폴더를 제거하고 의존성을 다시 설치해 보세요.

때때로 패키지 매니저가 캐시에 있는 lockfile에 서브 패키지의 오래된 버전을 유지할 수 있습니다. 이를 해결하려면 lockfile과 node_modules 폴더를 제거하고 의존성을 다시 설치해 보세요.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. 전역 설치 확인

CLI 명령어에 접근하기 위해 `intlayer` 또는 `intlayer-cli`를 전역으로 설치하는 것을 권장합니다. 전역 버전이 로컬 버전과 다르면 패키지 매니저가 잘못된 버전을 인식할 수 있습니다.

**패키지가 전역에 설치되어 있는지 확인하기**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**잠재적인 전역 의존성 충돌 해결하기**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. 캐시 정리 시도하기

Docker, GitHub Actions, 또는 Vercel과 같은 웹 호스팅 플랫폼과 같은 일부 환경에서는 캐시가 존재할 수 있습니다. 캐시를 정리한 후 설치를 다시 시도해 볼 수 있습니다.

또한 다음 명령어로 패키지 매니저의 캐시를 정리해 볼 수 있습니다:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
