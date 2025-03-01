# Intlayer 문서

공식 **Intlayer** 문서에 오신 것을 환영합니다! 여기에서 **Next.js**, **React**, **Vite**, **Express** 또는 기타 JavaScript 환경에서 국제화(i18n)를 통합, 구성 및 마스터하는 데 필요한 모든 정보를 찾을 수 있습니다.

Intlayer는 애플리케이션 번역을 위한 유연하고 현대적인 접근 방식을 제공합니다. 설치 및 설정부터 **AI 기반 번역**, **TypeScript** 정의 및 **서버 컴포넌트** 지원과 같은 고급 기능에 이르기까지 모든 것을 안내하여 원활하고 다국어 환경을 만들 수 있도록 지원합니다.

---

## 시작하기

- **[소개](https://github.com/aymericzip/intlayer/blob/main/docs/ko/introduction.md)**  
  Intlayer가 작동하는 방식, 핵심 기능 및 i18n의 게임 체인저인 이유에 대한 개요를 확인하세요.

- **[Intlayer 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/ko/how_works_intlayer.md)**  
  아키텍처 설계를 깊이 이해하고 Intlayer가 콘텐츠 선언부터 번역 제공까지 모든 것을 처리하는 방법을 배우세요.

- **[구성](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)**  
  프로젝트 요구 사항에 맞게 Intlayer를 사용자 정의하세요. 미들웨어 옵션, 디렉토리 구조 및 고급 설정을 탐색하세요.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)**  
  명령줄 도구를 사용하여 콘텐츠와 번역을 관리하세요. 콘텐츠 푸시 및 풀, 번역 자동화 등을 수행하는 방법을 알아보세요.

- **[Intlayer 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)**  
  비개발자와의 협업을 간소화하고 AI를 활용하여 번역을 강화하세요. 무료이고 직관적인 CMS에서 바로 가능합니다.

---

## 핵심 개념

### 사전(Dictionary)

다국어 콘텐츠를 코드와 가까운 곳에 정리하여 모든 것을 일관되고 유지 관리 가능하게 유지하세요.

- **[시작하기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)**  
  Intlayer에서 콘텐츠를 선언하는 기본 사항을 배우세요.

- **[번역](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/translation.md)**  
  번역이 생성, 저장 및 애플리케이션에서 활용되는 방식을 이해하세요.

- **[열거형](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/enumeration.md)**  
  다양한 언어에서 반복되거나 고정된 데이터 세트를 쉽게 관리하세요.

- **[함수 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/function_fetching.md)**  
  프로젝트 워크플로우에 맞는 사용자 정의 로직으로 콘텐츠를 동적으로 가져오는 방법을 확인하세요.

---

## 환경 및 통합

Intlayer는 유연성을 염두에 두고 설계되어 인기 있는 프레임워크 및 빌드 도구와 원활하게 통합됩니다:

- **[Next.js 15과 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)**
- **[Next.js 14(App Router)과 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)**
- **[Next.js 페이지 라우터와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_page_router.md)**
- **[React CRA와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)**
- **[Vite + React와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)**
- **[Express와 함께하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_express.md)**

각 통합 가이드는 **서버 사이드 렌더링**, **동적 라우팅** 또는 **클라이언트 사이드 렌더링**과 같은 Intlayer의 기능을 사용하는 모범 사례를 포함하고 있어 빠르고 SEO 친화적이며 확장성이 높은 애플리케이션을 유지할 수 있습니다.

---

## 패키지

Intlayer의 모듈식 설계는 특정 환경 및 요구 사항에 맞는 전용 패키지를 제공합니다:

### `intlayer`

i18n 설정을 구성하고 관리하기 위한 핵심 유틸리티 함수.

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

**Express** 기반 앱에서 Intlayer 활용:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/express-intlayer/t.md)**  
  서버 라우트 및 뷰를 위한 간단하고 직관적인 번역 도우미.

### `react-intlayer`

강력한 훅으로 **React** 애플리케이션을 강화하세요:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**와 원활하게 통합:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useLocale.md)**

---

## 추가 자료

- **[블로그: Intlayer와 i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_i18next.md)**  
  Intlayer가 인기 있는 **i18next** 라이브러리를 어떻게 보완하고 비교되는지 알아보세요.

- **[YouTube 라이브 튜토리얼](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  종합적인 데모를 보고 실시간으로 Intlayer를 통합하는 방법을 배우세요.

---

## 기여 및 피드백

우리는 오픈 소스와 커뮤니티 주도의 개발의 힘을 소중히 여깁니다. 개선 사항을 제안하거나 새로운 가이드를 추가하거나 문서의 문제를 수정하려면 [GitHub 저장소](https://github.com/aymericzip/intlayer/blob/main/docs)에 Pull Request를 제출하거나 문제를 열어주세요.

**애플리케이션을 더 빠르고 효율적으로 번역할 준비가 되셨나요?** Intlayer 문서를 탐색하여 지금 바로 사용을 시작하세요. 콘텐츠를 체계적으로 유지하고 팀의 생산성을 높이는 강력하고 간소화된 국제화 접근 방식을 경험하세요.

행복한 번역 되세요!  
— Intlayer 팀
