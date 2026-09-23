---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome 확장 프로그램, i18n & SEO 스캐너
description: Intlayer Chrome 확장 프로그램을 사용하여 모든 웹사이트의 i18n 설정을 검사하세요. 프레임워크, i18n 라이브러리, 로케일, hreflang 및 SEO 태그를 감지하고 전체 i18n SEO 감사를 실행합니다.
keywords:
  - Chrome 확장 프로그램
  - i18n 스캐너
  - hreflang 검사기
  - 다국어 SEO
  - Intlayer
  - 현지화
  - 개발 도구
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "초기 이력"
author: aymericzip
---

# Chrome 확장 프로그램: i18n & SEO 스캐너

## 개요

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)는 **Intlayer**의 공식 Chrome 확장 프로그램입니다. 웹사이트에서 실행하여 사이트가 국제화를 어떻게 처리하는지 확인할 수 있습니다. 어떤 프레임워크와 i18n 라이브러리를 사용하는지, 어떤 로케일을 제공하는지, 다국어 SEO 태그가 올바르게 설정되었는지 즉시 점검할 수 있습니다.

Intlayer 사용 여부와 상관없이 모든 웹사이트에서 작동합니다.

![Intlayer Chrome 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

확장 프로그램 링크: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## 주요 기능

- **기술 감지**: 프레임워크(Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) 및 i18n 라이브러리(Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang)를 식별합니다. 각 감지 항목은 전역 변수, 쿠키, DOM 마커 등 이를 유발한 증거를 보여줍니다.
- **로케일**: `lang` 속성, hreflang 및 `og:locale` 태그, URL 로케일 접두사, 로케일 쿠키 또는 스토리지 항목에서 찾은 로케일을 나열합니다.
- **SEO i18n 태그**: `html lang`, `html dir`, 표준(canonical) 링크, hreflang 태그, `x-default`, `og:locale` 및 현지화된 내부 링크 비율을 검사합니다.
- **전체 감사**: [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner)와 동일한 감사를 실행하고 실시간 점수를 표시합니다.

## 설치

Chrome 웹 스토어에서 [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)를 설치한 후 툴바에 고정하세요.

이 확장 프로그램은 Chrome 및 Chrome 웹 스토어 확장을 지원하는 모든 Chromium 기반 브라우저(Edge, Brave, Arc, Opera)에서 작동합니다.

## 사용법

### 페이지 검사

1. 검사하려는 웹사이트를 엽니다.
2. 툴바의 **Intlayer i18n Scanner** 아이콘을 클릭합니다.
3. 팝업에 현재 페이지에 대한 **감지된 기술**, **로케일**, **SEO i18n 태그** 섹션이 표시됩니다.

감지는 브라우저에서 로컬로 실행되며, 현재 활성 탭에서만 동작합니다.

### 전체 감사 실행

![Intlayer Chrome 확장 프로그램 감사 점수](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

**전체 감사** 섹션으로 스크롤하고 **전체 i18n 감사 실행**을 클릭합니다. 각 검사가 완료될 때마다 결과가 실시간으로 스트리밍되며 다음 그룹으로 분류됩니다.

- **페이지**: `html lang` 및 `dir` 속성, 현재 로케일, hreflang 태그, `x-default`, 표준 링크, 현지화된 내부 링크, 언어 선택기, 국기 아이콘 및 JavaScript 번들에 포함된 미사용 로케일 콘텐츠.
- **Robots.txt**: 존재 여부 및 로케일 경로가 크롤링 가능하게 유지되는지 여부.
- **사이트맵**: 존재 여부, 나열된 모든 로케일, 대체 링크 및 `x-default`.
- **도메인**: 사이트 전체에서 발견된 로케일 수.

각 검사는 통과, 경고 또는 실패로 표시되며, 점수는 페이지의 전반적인 i18n SEO 상태를 요약합니다.

## 개인정보 보호 및 권한

확장 프로그램은 최소한의 권한만 요청합니다.

- **activeTab** 및 **scripting**: 감지기는 사용자가 보고 있는 탭에서 팝업을 열 때만 실행됩니다.
- **back.intlayer.org**: 전체 감사를 실행할 때만 사용됩니다. 현재 페이지의 URL이 검사를 위해 Intlayer API로 전송됩니다.

브라우징 기록은 수집되지 않으며 백그라운드에서 실행되는 항목이 없습니다.

## FAQ

<FAQ>

<Question title="웹사이트에서 Intlayer를 사용해야 하나요?">

아닙니다. 어떤 프레임워크나 i18n 라이브러리를 사용하든 상관없이 모든 웹사이트를 검사할 수 있습니다.

</Question>
<Question title="기술이 감지되지 않는 이유는 무엇인가요?">

감지는 전역 변수, 쿠키, 메타 태그, DOM 마커 등 페이지가 브라우저에 노출하는 정보에 의존합니다. 일부 프로덕션 빌드는 이러한 마커를 제거하므로 라이브러리를 사용 중이더라도 흔적이 남지 않을 수 있습니다.

</Question>
<Question title="감사에서 발견된 문제를 어떻게 해결하나요?">

대부분의 검사는 라우팅 또는 메타데이터 설정과 관련이 있습니다. Intlayer를 사용하면 hreflang, 표준 링크, `x-default`, 현지화된 링크, 사이트맵 및 robots.txt가 [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 자동으로 생성됩니다. 사용 중인 프레임워크(예: [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md))의 통합 가이드를 참조하세요.

</Question>

</FAQ>

## 관련 도구

- [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)
- [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)
- [LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)
