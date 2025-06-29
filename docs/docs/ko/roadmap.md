---
docName: roadmap
url: https://intlayer.org/doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-03-01
title: 로드맵
description: Intlayer의 로드맵을 발견하세요. 모든 기능을 알아보세요. Intlayer가 구현한 모든 기능을 검토하고 구현할 계획을 검토하세요.
keywords:
  - Roadmap
  - Intlayer
  - 국제화
  - CMS
  - 콘텐츠 관리 시스템
  - 비주얼 편집기
---

# Intlayer: 기능 개요 및 로드맵

Intlayer는 애플리케이션 전반에서 콘텐츠를 선언, 관리 및 업데이트하는 방식을 간소화하도록 설계된 콘텐츠 관리 및 국제화 솔루션입니다. 중앙 집중식 또는 분산형 콘텐츠 선언, 광범위한 국제화 옵션, Markdown 지원, 조건부 렌더링, TypeScript/JavaScript/JSON 통합 등 강력한 기능을 제공합니다. 아래는 Intlayer의 현재 제공 기능에 대한 종합적인 개요와 향후 로드맵 기능입니다.

---

## 현재 기능

### 1. 콘텐츠 선언

#### 중앙 집중식 또는 분산형

- **중앙 집중식**: i18next와 유사하게 애플리케이션의 기본 위치에 모든 콘텐츠를 단일 대형 파일로 선언하여 한 곳에서 모든 것을 관리할 수 있습니다.
- **분산형**: 또는 콘텐츠를 컴포넌트나 기능 수준에서 별도의 파일로 나누어 유지 관리성을 향상시킬 수 있습니다. 이를 통해 관련 코드(컴포넌트, 테스트, Storybook 등)와 가까운 위치에 콘텐츠를 유지할 수 있습니다. 컴포넌트를 제거하면 관련 콘텐츠도 제거되어 코드베이스에 남아 있는 데이터를 방지합니다.

> 리소스:
>
> - [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)

### 2. 국제화

- **230개 언어 및 로케일**(프랑스어(프랑스), 영어(캐나다), 영어(영국), 포르투갈어(포르투갈) 등 지역 변형 포함)을 지원합니다.
- 한 곳에서 이러한 모든 로케일의 번역을 쉽게 관리할 수 있습니다.

> 리소스:
>
> - [국제화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)

### 3. Markdown 지원

- **Markdown**을 사용하여 콘텐츠를 선언할 수 있으며, 이를 통해 단락, 제목, 링크 등으로 텍스트를 자동으로 서식화할 수 있습니다.
- 블로그 게시물, 기사, 문서 페이지 또는 리치 텍스트 서식이 필요한 모든 시나리오에 이상적입니다.

> 리소스:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)

### 4. 조건부 렌더링

- 사용자 언어, 로그인 상태 또는 기타 컨텍스트 관련 변수와 같은 특정 조건에 따라 적응하는 콘텐츠를 정의합니다.
- 여러 파일에 콘텐츠를 중복하지 않고 개인화된 경험을 제공합니다.

> 리소스:
>
> - [조건부 렌더링](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/condition.md)

### 5. 콘텐츠 선언 형식

Intlayer는 콘텐츠 선언을 위해 **TypeScript**(JavaScript도 포함) 및 **JSON**을 지원합니다.

- **TypeScript**:

  - 콘텐츠 구조가 올바른지 확인하고 번역이 누락되지 않도록 보장합니다.
  - 엄격하거나 더 유연한 검증 모드를 제공합니다.
  - 변수, 함수 또는 외부 API에서 동적 데이터 가져오기를 허용합니다.

- **JSON**:

  - 표준화된 형식으로 인해 외부 도구(예: 시각적 편집기)와 쉽게 통합할 수 있습니다.

  > 리소스:
  >
  > - [콘텐츠 선언 형식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_extention_customization.md)

---

## 프레임워크 및 환경과의 통합

### 1. Next.js

#### a. 서버 및 클라이언트 컴포넌트

- 서버 및 클라이언트 컴포넌트 모두에 대해 **통합된 콘텐츠 관리 접근 방식**을 제공합니다.
- 서버 컴포넌트에 내장된 컨텍스트를 제공하여 다른 솔루션과 비교해 구현을 간소화합니다.

#### b. 메타데이터, 사이트맵 및 robots.txt

- 메타데이터, 사이트맵 또는 `robots.txt` 파일을 생성하기 위해 콘텐츠를 동적으로 가져오고 삽입합니다.

#### c. 미들웨어

- 사용자의 선호 언어에 따라 콘텐츠로 **리디렉션**하는 미들웨어를 추가합니다.

#### d. Turbopack 및 Webpack 호환성

- 새로운 Next.js Turbopack뿐만 아니라 기존 Webpack과도 완벽히 호환됩니다.

> 리소스:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

### 2. Vite

- Next.js와 유사하게 Intlayer를 Vite와 통합하고 사용자의 선호 언어에 따라 콘텐츠로 리디렉션하는 **미들웨어**를 사용할 수 있습니다.

> 리소스:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)

### 3. Express

- Express를 기반으로 구축된 백엔드 서비스의 콘텐츠를 관리하고 국제화합니다.
- 이메일, 오류 메시지, 푸시 알림 등을 로컬라이즈된 텍스트로 개인화합니다.

> 리소스:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_express.md)

---

## 시각적 편집기 및 CMS

### 1. 로컬 시각적 편집기

- 페이지의 요소를 직접 선택하여 애플리케이션 콘텐츠를 편집할 수 있는 **무료 로컬 시각적 편집기**입니다.
- AI 기능을 통합하여 다음을 지원합니다:
  - 번역 생성 또는 수정
  - 구문 및 철자 검사
  - 개선 사항 제안
- 로컬에서 호스팅하거나 원격 서버에 배포할 수 있습니다.

> 리소스:
>
> - [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)

### 2. Intlayer CMS (원격)

- 코드베이스를 수정하지 않고 온라인에서 애플리케이션 콘텐츠를 관리할 수 있는 **호스팅 CMS** 솔루션입니다.
- 콘텐츠 선언, 번역 관리 및 구문 또는 철자 오류 수정을 위한 AI 지원 기능을 제공합니다.
- 라이브 애플리케이션 인터페이스를 통해 콘텐츠와 상호작용합니다.

> 리소스:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

---

## Intlayer CLI

- **감사 및 번역 생성**: 콘텐츠 파일을 감사하여 누락된 번역을 생성하거나 사용되지 않는 번역을 식별합니다.
- **원격 상호작용**: 로컬 콘텐츠를 원격 CMS에 게시하거나 원격 콘텐츠를 가져와 로컬 애플리케이션에 통합합니다.
- **CI/CD 파이프라인**에 유용하며 콘텐츠가 항상 코드와 동기화되도록 보장합니다.

> 리소스:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)

---

## 환경

- **환경 변수**를 사용하여 프로덕션, 테스트 및 로컬 환경 전반에서 Intlayer를 다르게 구성합니다.
- 환경에 따라 타겟팅할 시각적 편집기 또는 원격 CMS 프로젝트를 정의합니다.

---

## 실시간 콘텐츠 업데이트

- 원격 사전 및 Intlayer CMS를 사용할 때 애플리케이션의 콘텐츠를 **실시간으로 업데이트**할 수 있으며, 재배포가 필요하지 않습니다.

> 리소스:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

---

## 로드맵: 예정된 기능

### 1. A/B 테스트 및 개인화

- **다변량 테스트**: 특정 콘텐츠의 여러 버전을 테스트하여 가장 성능이 좋은 버전을 확인합니다(예: 클릭률 증가).
- **데이터 기반 개인화**: 사용자 인구 통계(성별, 연령, 위치 등) 또는 기타 행동 패턴에 따라 다른 콘텐츠를 표시합니다.
- **자동 반복**: AI가 여러 버전을 자동으로 테스트하고 최상의 성능을 보이는 버전을 선택하거나 관리자 승인을 위한 옵션을 추천합니다.

### 2. 버전 관리

- **콘텐츠 버전 관리**를 통해 이전 버전의 콘텐츠를 복원합니다.
- 시간 경과에 따른 변경 사항을 추적하고 필요 시 이전 상태로 되돌릴 수 있습니다.

### 3. 자동 번역

- 원격 CMS 사용자를 위해 **원클릭 번역 생성**을 제공합니다.
- 시스템이 백그라운드에서 번역을 생성한 후 검증 또는 편집을 요청합니다.

### 4. SEO 향상

- **키워드 분석**, 사용자 검색 의도 및 새로운 트렌드를 분석하는 도구를 제공합니다.
- 더 나은 순위를 위해 개선된 콘텐츠를 제안하고 장기적인 성과를 추적합니다.

### 5. 더 많은 프레임워크와의 호환성

- **Vue, Solid, Svelte, Angular** 등과의 호환성을 지원하기 위한 노력이 진행 중입니다.
- **JavaScript 기반 애플리케이션**과 호환되도록 목표를 설정합니다.

### 6. IDE 확장

- 주요 IDE용 확장을 통해 로컬 및 원격 번역을 관리하기 위한 **그래픽 인터페이스**를 제공합니다.
- 컴포넌트용 콘텐츠 선언 파일을 자동 생성하고, Intlayer CMS와 직접 통합하며, 실시간 검증을 포함할 수 있습니다.

---

## 결론

Intlayer는 콘텐츠 관리 및 국제화를 위한 원스톱 솔루션이 되는 것을 목표로 합니다. 중앙 집중식 또는 분산형 파일, 광범위한 언어 지원, 현대적인 프레임워크 및 번들러와의 쉬운 통합, 강력한 AI 기반 기능에 중점을 둡니다. A/B 테스트, 버전 관리 및 자동 번역과 같은 새로운 기능이 제공됨에 따라 Intlayer는 콘텐츠 워크플로를 간소화하고 다양한 플랫폼에서 사용자 경험을 향상시키는 데 계속 기여할 것입니다.

다가오는 릴리스를 기대해 주시고, Intlayer가 오늘날 콘텐츠 관리 프로세스를 중앙 집중화하고 최적화하는 데 어떻게 도움이 되는지 확인해 보세요!
