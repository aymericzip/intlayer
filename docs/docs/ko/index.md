---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Intlayer 문서 - JavaScript를 위한 완벽한 i18n 가이드
description: JavaScript, React, Next.js, Express 등 다양한 프레임워크를 위한 현대적인 국제화 라이브러리 Intlayer의 완벽한 문서입니다.
keywords:
  - intlayer
  - 국제화
  - i18n
  - JavaScript
  - React
  - Next.js
  - 문서
  - 번역
  - 다국어
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# Intlayer 문서

공식 **Intlayer** 문서에 오신 것을 환영합니다! 여기에서는 **Next.js**, **React**, **Vite**, **Express** 또는 기타 JavaScript 환경에서 작업하든, 모든 국제화(i18n) 요구 사항에 맞게 Intlayer를 통합하고 구성하며 완벽하게 활용하는 데 필요한 모든 정보를 찾을 수 있습니다.

Intlayer는 애플리케이션 번역을 위한 유연하고 현대적인 접근 방식을 제공합니다. 이 문서는 설치 및 설정부터 **AI 기반 번역**, **TypeScript** 정의, **서버 컴포넌트** 지원과 같은 고급 기능까지 안내하여 원활하고 다국어 환경을 구축할 수 있도록 도와줍니다.

---

## 시작하기

- **[소개](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/introduction.md)**  
  Intlayer가 어떻게 작동하는지, 핵심 기능은 무엇인지, 그리고 왜 i18n 분야에서 혁신적인 솔루션인지 개요를 제공합니다.

- **[Intlayer 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/how_works_intlayer.md)**  
  아키텍처 설계에 대해 깊이 살펴보고, Intlayer가 콘텐츠 선언부터 번역 전달까지 모든 과정을 어떻게 처리하는지 배워보세요.

- **[구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)**  
  프로젝트 요구에 맞게 Intlayer를 맞춤 설정하세요. 미들웨어 옵션, 디렉터리 구조, 고급 설정을 탐색할 수 있습니다.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)**  
  명령줄 도구를 사용하여 콘텐츠와 번역을 관리하세요. 콘텐츠를 푸시하고 풀하는 방법, 번역 자동화 등 다양한 기능을 알아보세요.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**  
  비개발자와의 협업을 간소화하고, 무료이면서 직관적인 CMS에서 AI를 활용해 번역 작업을 강화하세요.

---

## 핵심 개념

### 사전(Dictionary)

코드와 가까운 곳에 다국어 콘텐츠를 조직하여 모든 것을 일관되고 유지 관리하기 쉽게 만드세요.

- **[시작하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)**  
  Intlayer에서 콘텐츠를 선언하는 기본을 배워보세요.

- **[번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)**

번역이 어떻게 생성되고 저장되며 애플리케이션에서 활용되는지 이해하세요.

- **[열거형(Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)**  
  여러 언어에 걸쳐 반복되거나 고정된 데이터 집합을 쉽게 관리하세요.

- **[조건(Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/conditional.md)**  
  Intlayer에서 조건 논리를 사용하여 동적 콘텐츠를 만드는 방법을 배우세요.

- **[삽입(Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)**  
  삽입 자리 표시자를 사용하여 문자열에 값을 삽입하는 방법을 알아보세요.

- **[함수 호출(Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)**  
  프로젝트의 워크플로우에 맞게 사용자 정의 로직으로 콘텐츠를 동적으로 가져오는 방법을 확인하세요.

- **[마크다운](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)**  
  Intlayer에서 마크다운을 사용하여 풍부한 콘텐츠를 만드는 방법을 배우세요.

- **[파일 임베딩](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file_embeddings.md)**  
  Intlayer에서 외부 파일을 임베딩하여 콘텐츠 편집기에서 사용하는 방법을 알아보세요.

- **[중첩](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/nesting.md)**  
  Intlayer에서 콘텐츠를 중첩하여 복잡한 구조를 만드는 방법을 이해하세요.

---

## 환경 및 통합

우리는 Intlayer를 유연성을 염두에 두고 구축하여, 인기 있는 프레임워크와 빌드 도구 전반에 걸쳐 원활한 통합을 제공합니다:

- **[Next.js 15와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (앱 라우터)와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_14.md)**
- **[Next.js 페이지 라우터와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_page_router.md)**
- **[React CRA와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)**
- **[Vite + React와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)**
- **[React Native 및 Expo와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_native+expo.md)**
- **[Lynx 및 React와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_lynx+react.md)**
- **[Express와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_express.md)**

각 통합 가이드에는 **서버 사이드 렌더링**, **동적 라우팅**, 또는 **클라이언트 사이드 렌더링**과 같은 Intlayer 기능을 사용하는 모범 사례가 포함되어 있어 빠르고 SEO 친화적이며 매우 확장 가능한 애플리케이션을 유지할 수 있습니다.

---

## 패키지

Intlayer의 모듈식 설계는 특정 환경과 요구에 맞춘 전용 패키지를 제공합니다:

### `intlayer`

i18n 설정을 구성하고 관리하기 위한 핵심 유틸리티 함수들입니다.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express** 기반 앱에서 Intlayer 활용하기:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/express-intlayer/t.md)**  
  서버 라우트와 뷰를 위한 최소한의 간단한 번역 도우미입니다.

### `react-intlayer`

강력한 훅으로 **React** 애플리케이션을 향상하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**와 원활하게 통합하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)**

---

## 추가 자료

- **[블로그: Intlayer와 i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_i18next.md)**  
  Intlayer가 인기 있는 **i18next** 라이브러리와 어떻게 보완하고 비교되는지 알아보세요.

- **[YouTube 라이브 튜토리얼](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  종합적인 데모를 시청하고 실시간으로 Intlayer를 통합하는 방법을 배우세요.

---

## 기여 및 피드백

우리는 오픈 소스와 커뮤니티 주도 개발의 힘을 소중히 여깁니다. 개선 사항을 제안하거나, 새로운 가이드를 추가하거나, 문서의 문제를 수정하고 싶다면 언제든지 [GitHub 저장소](https://github.com/aymericzip/intlayer/blob/main/docs/docs)에서 풀 리퀘스트를 제출하거나 이슈를 열어주세요.

**더 빠르고 효율적으로 애플리케이션을 번역할 준비가 되셨나요?** 지금 바로 문서를 탐색하여 Intlayer 사용을 시작하세요. 콘텐츠를 체계적으로 관리하고 팀의 생산성을 높이는 강력하고 간소화된 국제화 방식을 경험해 보세요.
