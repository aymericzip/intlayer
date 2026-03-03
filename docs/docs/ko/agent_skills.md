---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: 에이전트 스킬
description: 메타데이터, 사이트맵 및 서버 액션에 대한 포괄적인 설정 가이드를 포함하여 Intlayer 에이전트 스킬을 사용하여 AI 에이전트의 프로젝트 이해도를 높이는 방법을 배워보세요.
keywords:
  - Intlayer
  - 에이전트 스킬
  - AI 에이전트
  - 국제화
  - 문서
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: 초기 내역
---

# 에이전트 스킬

## 설정

### CLI 사용하기

`intlayer init skills` 명령어는 프로젝트에 에이전트 스킬을 설정하는 가장 쉬운 방법입니다. 사용자 환경을 감지하고 선호하는 플랫폼에 필요한 구성 파일을 설치합니다.

```bash
npx intlayer init skills
```

### Vercel Skill SDK 사용하기

```bash
npx skills add aymericzip/intlayer-skills
```

### VS Code 확장 프로그램 사용하기

1. 명령 팔레트를 엽니다 (Ctrl+Shift+P 또는 Cmd+Shift+P).
2. `Intlayer: Setup AI Agent Skills`을 입력합니다.
3. 사용하는 플랫폼을 선택합니다 (예: `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` 등).
4. 설치하려는 스킬을 선택합니다 (예: `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Enter를 누릅니다.

## 스킬 목록

**intlayer-config**

- 사용자의 프로젝트에서 특정 i18n 설정을 이해하여 로케일, 라우팅 패턴, 폴백 전략을 정확하게 구성할 수 있도록 에이전트에게 기능을 부여합니다.

**intlayer-cli**

- 누락된 번역 감사, 사전 구축, 명령줄을 통한 콘텐츠 동기화 등 번역 수명 주기를 에이전트가 자율적으로 관리할 수 있게 합니다.

**intlayer-angular**

- Angular의 모범 사례에 따라 반응형 i18n 패턴과 시그널을 올바르게 구현할 수 있도록 프레임워크 전용 전문 지식을 에이전트에게 제공합니다.

**intlayer-astro**

- 에이전트가 Astro 에코시스템 특유의 서버 사이드 번역과 로컬라이즈된 라우팅 패턴을 처리할 수 있는 지식을 제공합니다.

**intlayer-content**

- 복수형, 조건부, 마크다운과 같은 고급 콘텐츠 노드를 활용하여 풍부하고 동적이며 로컬라이즈된 사전을 구축하는 방법을 에이전트에게 가르칩니다.

**intlayer-next-js**

- Next.js 서버 및 클라이언트 컴포넌트 전체에서 i18n을 구현할 수 있도록 에이전트에게 전문 지식을 제공하여 SEO 최적화와 원활한 로컬라이즈 라우팅을 보장합니다.

**intlayer-react**

- 모든 React 기반 환경에서 선언적인 i18n 컴포넌트와 훅을 효율적으로 구현할 수 있도록 에이전트에게 전용 지식을 제공합니다.

**intlayer-preact**

- Preact를 위한 i18n 구현 능력을 최적화하여 시그널과 효율적인 반응형 패턴을 사용하는 가벼운 로컬라이즈 컴포넌트를 작성할 수 있게 합니다.

**intlayer-solid**

- 고성능 로컬라이즈 콘텐츠 관리를 위해 SolidJS의 세밀한 반응형 기능을 에이전트가 활용할 수 있게 합니다.

**intlayer-svelte**

- Svelte 및 SvelteKit 앱 전체에서 반응형이고 타입 안전한 로컬라이즈 콘텐츠를 위해 Svelte 스토어와 관용적인 구문을 사용하는 방법을 에이전트에게 가르칩니다.

**intlayer-cms**

- 원격 콘텐츠를 통합하고 관리할 수 있게 하여 에이전트가 Intlayer CMS를 통해 라이브 동기화 및 원격 번역 워크플로우를 처리할 수 있게 합니다.

**intlayer-usage**

- 프로젝트 구조와 콘텐츠 선언에 대한 에이전트의 접근 방식을 표준화하여 i18n 프로젝트에서 가장 효율적인 워크플로우를 따르도록 합니다.

**intlayer-vue**

- 컴포저블(Composables) 및 Nuxt 지원을 포함한 Vue 전용 패턴을 제공하여 현대적인 로컬라이즈 웹 애플리케이션을 구축할 수 있게 합니다.

**intlayer-compiler**

- 자동 콘텐츠 추출 기능을 활성화하여 수동 사전 파일 없이 코드에 번역 가능한 문자열을 직접 작성할 수 있게 하여 에이전트의 워크플로우를 단순화합니다.
