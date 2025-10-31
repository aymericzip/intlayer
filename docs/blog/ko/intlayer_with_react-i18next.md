---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer를 사용하여 react-i18next JSON 번역 자동화하는 방법
description: React 애플리케이션에서 향상된 국제화를 위해 Intlayer와 react-i18next를 사용하여 JSON 번역을 자동화하세요.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - 국제화
  - i18n
  - 블로그
  - React
  - JavaScript
  - TypeScript
  - 콘텐츠 관리
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON 플러그인으로 변경
---

# Intlayer를 사용하여 react-i18next JSON 번역 자동화하는 방법

## Intlayer란 무엇인가요?

**Intlayer**는 전통적인 i18n 솔루션의 한계를 극복하기 위해 설계된 혁신적이고 오픈 소스인 국제화 라이브러리입니다. React 애플리케이션에서 콘텐츠 관리를 위한 현대적인 접근 방식을 제공합니다.

react-i18next와의 구체적인 비교는 저희 [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md) 블로그 게시물을 참고하세요.

## 왜 Intlayer를 react-i18next와 결합해야 하나요?

Intlayer는 훌륭한 독립형 i18n 솔루션을 제공하지만(자세한 내용은 저희 [React 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)를 참조), 다음과 같은 여러 이유로 react-i18next와 결합하여 사용하고자 할 수 있습니다:

1. **기존 코드베이스**: 이미 구축된 react-i18next 구현이 있으며 Intlayer의 향상된 개발자 경험으로 점진적으로 이전하고자 할 때.
2. **레거시 요구사항**: 프로젝트가 기존 react-i18next 플러그인 또는 워크플로우와의 호환성을 필요로 할 때.
3. **팀 친숙도**: 팀이 react-i18next에 익숙하지만 더 나은 콘텐츠 관리를 원할 때.

**이를 위해 Intlayer는 react-i18next의 어댑터로 구현되어 CLI 또는 CI/CD 파이프라인에서 JSON 번역 자동화, 번역 테스트 등 다양한 작업을 지원할 수 있습니다.**

이 가이드는 react-i18next와의 호환성을 유지하면서 Intlayer의 우수한 콘텐츠 선언 시스템을 활용하는 방법을 보여줍니다.

## 목차

<TOC/>

## react-i18next와 함께 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**패키지 설명:**

- **intlayer**: 국제화 관리, 콘텐츠 선언 및 빌드를 위한 핵심 라이브러리
- **@intlayer/sync-json-plugin**: Intlayer 콘텐츠 선언을 react-i18next 호환 JSON 형식으로 내보내는 플러그인

### 2단계: JSON을 감싸는 Intlayer 플러그인 구현

지원하는 로케일을 정의하는 Intlayer 구성 파일을 만드세요:

**react-i18next용 JSON 사전도 내보내고 싶다면**, `syncJSON` 플러그인을 추가하세요:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 플러그인은 JSON을 자동으로 래핑합니다. 콘텐츠 구조를 변경하지 않고 JSON 파일을 읽고 씁니다.

만약 JSON과 intlayer 콘텐츠 선언 파일(`.content` 파일)을 공존시키고 싶다면, Intlayer는 다음과 같이 처리합니다:

1. JSON과 콘텐츠 선언 파일을 모두 로드하여 Intlayer 사전으로 변환합니다.
2. JSON과 콘텐츠 선언 파일 간에 충돌이 있을 경우, Intlayer는 모든 사전을 병합합니다. 이 과정은 플러그인의 우선순위와 콘텐츠 선언 파일의 우선순위에 따라 결정됩니다(모두 구성 가능).

CLI를 사용하여 JSON을 번역하거나 CMS를 통해 변경 사항이 발생하면, Intlayer는 새로운 번역으로 JSON 파일을 업데이트합니다.

`syncJSON` 플러그인에 대한 자세한 내용은 [syncJSON 플러그인 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)를 참조하세요.

## Git 구성

자동 생성된 Intlayer 파일은 무시하는 것이 권장됩니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시하기
.intlayer
```

이 파일들은 빌드 과정에서 다시 생성될 수 있으므로 버전 관리에 커밋할 필요가 없습니다.

### VS Code 확장 프로그램

개발자 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치하세요:

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
