# Intlayer Documentation

Intlayer 공식 문서에 오신 것을 환영합니다! 여기에서 **Next.js**, **React**, **Vite**, **Express** 또는 기타 JavaScript 환경에서 국제화(i18n) 요구 사항을 통합, 구성 및 마스터하는 데 필요한 모든 정보를 찾을 수 있습니다.

Intlayer는 애플리케이션을 번역하는 데 유연하고 현대적인 접근 방식을 제공합니다. 우리의 문서는 설치 및 설정부터 **AI 기반 번역**, **TypeScript** 정의 및 **서버 컴포넌트** 지원과 같은 고급 기능까지 안내하여 원활하고 다국어 지원 경험을 만들 수 있도록 합니다.

---

## Getting Started

- **[Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/ko/introduction.md)**  
  Intlayer의 작동 방식, 핵심 기능 및 i18n에 대한 게임 체인저인 이유를 간략히 살펴보세요.

- **[How Intlayer Works](https://github.com/aymericzip/intlayer/blob/main/docs/ko/how_works_intlayer.md)**  
  아키텍처 디자인을 살펴보고 Intlayer가 콘텐츠 선언에서 번역 전달까지 모든 것을 처리하는 방법을 알아보세요.

- **[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)**  
  Intlayer를 프로젝트의 요구에 맞게 사용자화하세요. 미들웨어 옵션, 디렉토리 구조 및 고급 설정을 탐색해 보세요.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)**  
  명령줄 도구를 사용하여 콘텐츠와 번역을 관리하세요. 콘텐츠 푸시 및 풀, 번역 자동화 등을 발견하세요.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)**  
  비개발자와의 협업을 간소화하고 AI로 번역을 지원하세요—무료이고 직관적인 CMS에서 직접 가능합니다.

---

## Core Concepts

### Dictionary

다국어 콘텐츠를 코드에 가까이 조직하여 모든 것이 일관되고 유지 관리가 용이하도록 합니다.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)**  
  Intlayer에서 콘텐츠를 선언하는 기본 개념을 배우세요.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/translation.md)**  
  번역이 생성, 저장 및 애플리케이션에서 어떻게 사용되는지 이해하세요.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/enumeration.md)**  
  다양한 언어에서 반복되거나 고정된 데이터 세트를 쉽게 관리하세요.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/function_fetching.md)**  
  프로젝트의 워크플로우에 맞는 사용자 정의 논리로 콘텐츠를 동적으로 가져오는 방법을 확인하세요.

---

## Environments & Integrations

우리는 Intlayer를 유연성을 염두에 두고 구축하여 인기 있는 프레임워크 및 빌드 도구와의 원활한 통합을 제공합니다:

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_express.md)**

각 통합 가이드에는 **서버 측 렌더링**, **동적 라우팅** 또는 **클라이언트 측 렌더링**과 같은 Intlayer의 기능을 사용하는 모범 사례가 포함되어 있어 빠르고 SEO 친화적이며 고도로 확장 가능한 애플리케이션을 유지할 수 있습니다.

---

## Packages

Intlayer의 모듈 디자인은 특정 환경 및 요구를 위한 전용 패키지를 제공합니다:

### `intlayer`

i18n 설정을 구성하고 관리하는 핵심 유틸리티 함수입니다.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express** 기반 앱 내에서 Intlayer를 활용하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/express-intlayer/t.md)**  
  서버 라우트 및 뷰를 위한 최소한의 간단한 번역 도우미입니다.

### `react-intlayer`

강력한 훅으로 **React** 애플리케이션을 향상하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**와 원활하게 통합하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useLocale.md)**

---

## Additional Resources

- **[Blog: Intlayer and i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_i18next.md)**  
  Intlayer가 인기 있는 **i18next** 라이브러리와 어떻게 보완되고 비교되는지 알아보세요.

- **[Live Tutorial on YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  포괄적인 데모를 시청하고 Intlayer를 실시간으로 통합하는 방법을 배우세요.

---

## Contributing & Feedback

우리는 오픈 소스와 커뮤니티 기반 개발의 힘을 소중히 여깁니다. 개선을 제안하거나 새로운 가이드를 추가하거나 문서에서 문제를 수정하고 싶다면, Pull Request를 제출하거나 [GitHub 저장소](https://github.com/aymericzip/intlayer/blob/main/docs)를 열어 문제를 제기하세요.

**애플리케이션을 더 빠르고 효율적으로 번역할 준비가 되셨나요?** 오늘 Intlayer 사용을 시작하기 위해 우리의 문서를 Dive 하세요. 콘텐츠를 정리하고 팀의 생산성을 높이는 견고하고 간소화된 국제화 접근 방식을 경험하세요.

행복한 번역하세요!  
— Intlayer 팀
