---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: lynx-intlayer 패키지 문서
description: Intlayer를 위한 Lynx 지원으로 로케일 지원을 위한 폴리필을 제공합니다.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기(exports)에 대한 문서 통합
---

# lynx-intlayer 패키지

`lynx-intlayer` 패키지는 Intlayer를 Lynx 애플리케이션에 통합하기 위한 필수 도구를 제공합니다.

## 설치

```bash
npm install lynx-intlayer
```

## 내보내기

### 폴리필

Import:

```tsx
import "lynx-intlayer";
```

| 함수               | 설명                                                        |
| ------------------ | ----------------------------------------------------------- |
| `intlayerPolyfill` | Lynx가 Intlayer를 지원하도록 필요한 폴리필을 적용하는 함수. |

### Rsbuild 플러그인

`lynx-intlayer` 패키지는 Intlayer를 Lynx 빌드 프로세스에 통합하기 위한 Rsbuild 플러그인을 제공합니다.

가져오기:

```tsx
import "lynx-intlayer";
```

| 함수                 | 설명                                                       |
| -------------------- | ---------------------------------------------------------- |
| `pluginIntlayerLynx` | Intlayer를 Lynx 빌드 프로세스에 통합하는 Rsbuild 플러그인. |
