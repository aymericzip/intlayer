<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer 로고" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : AI 기반 번역 및 CMS를 갖춘 오픈 소스, 유연한 i18n 툴킷입니다.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">문서</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm 버전" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub 스타" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="월간 다운로드" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="라이선스"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="마지막 커밋"/>
  </a>
</p>

![비디오 시청하기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/시작하기-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer란 무엇인가요?

대부분의 i18n 라이브러리는 너무 복잡하거나 너무 경직되어 있거나 최신 프레임워크에 맞게 만들어지지 않았습니다.

Intlayer는 웹 및 모바일 앱을 위한 **최신 i18n 솔루션**입니다.  
프레임워크에 구애받지 않으며, **AI 기반**이고 무료 **CMS 및 시각적 편집기**를 포함합니다.

**로케일별 콘텐츠 파일**, **TypeScript 자동완성**, **트리 쉐이커 가능한 사전**, 그리고 **CI/CD 통합**을 통해 Intlayer는 국제화를 **더 빠르고, 더 깔끔하며, 더 스마트하게** 만듭니다.

## Intlayer의 주요 이점:

| 기능                                                                                                                                                | 설명                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="기능" width="700">                             | **크로스 프레임워크 지원**<br><br>Intlayer는 Next.js, React, Vite, Vue.js, Nuxt, Preact, Express 등 주요 프레임워크와 라이브러리를 모두 지원합니다.                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **JavaScript 기반 콘텐츠 관리**<br><br>JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리하세요. <br><br> - [콘텐츠 선언](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **로케일별 콘텐츠 선언 파일**<br><br>자동 생성 전에 콘텐츠를 한 번 선언하여 개발 속도를 높이세요.<br><br> - [로케일별 콘텐츠 선언 파일](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **타입 안전 환경**<br><br>TypeScript를 활용하여 콘텐츠 정의와 코드가 오류 없이 작성되도록 보장하고, IDE 자동 완성 기능의 이점도 누리세요.<br><br> - [TypeScript 설정](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="기능" width="700">                            | **간편한 설정**<br><br>최소한의 구성으로 빠르게 시작하세요. 국제화, 라우팅, AI, 빌드 및 콘텐츠 처리 설정을 손쉽게 조정할 수 있습니다. <br><br> - [Next.js 통합 탐색](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **간소화된 콘텐츠 조회**<br><br>각 콘텐츠마다 `t` 함수를 호출할 필요가 없습니다. 단일 훅을 사용하여 모든 콘텐츠를 직접 조회하세요.<br><br> - [React 통합](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **일관된 서버 컴포넌트 구현**<br><br>Next.js 서버 컴포넌트에 완벽하게 적합하며, 클라이언트와 서버 컴포넌트 모두에 동일한 구현을 사용하세요. 각 서버 컴포넌트마다 `t` 함수를 전달할 필요가 없습니다. <br><br> - [서버 컴포넌트](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **체계적인 코드베이스**<br><br>코드베이스를 더 체계적으로 유지하세요: 1 컴포넌트 = 같은 폴더 내 1 사전. 각 컴포넌트에 가까운 번역으로 유지보수성과 명확성을 향상시킵니다. <br><br> - [Intlayer 작동 방식](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **향상된 라우팅**<br><br>Next.js, React, Vite, Vue.js 등 복잡한 애플리케이션 구조에 원활하게 적응하는 앱 라우팅을 완벽하게 지원합니다.<br><br> - [Next.js 통합 탐색](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **마크다운 지원**<br><br>개인정보 처리방침, 문서 등 다국어 콘텐츠를 위해 로케일 파일과 원격 마크다운을 가져와 해석합니다. 마크다운 메타데이터를 해석하여 코드 내에서 접근할 수 있도록 합니다.<br><br> - [콘텐츠 파일](https://intlayer.org/doc/concept/content/file)                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **무료 비주얼 에디터 및 CMS**<br><br>콘텐츠 작성자를 위한 무료 비주얼 에디터와 CMS가 제공되어 로컬라이제이션 플랫폼이 필요 없습니다. Git을 사용하여 콘텐츠를 동기화 상태로 유지하거나 CMS를 통해 콘텐츠를 완전히 또는 부분적으로 외부화할 수 있습니다.<br><br> - [Intlayer 에디터](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **트리 쉐이커블 콘텐츠**<br><br>최종 번들의 크기를 줄이는 트리 쉐이커블 콘텐츠입니다. 각 컴포넌트별로 콘텐츠를 로드하여 사용하지 않는 콘텐츠는 번들에서 제외합니다. 앱 로딩 효율을 높이기 위해 지연 로딩도 지원합니다. <br><br> - [앱 빌드 최적화](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **정적 렌더링**<br><br>정적 렌더링을 차단하지 않습니다. <br><br> - [Next.js 통합](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI 기반 번역**<br><br>Intlayer의 고급 AI 기반 번역 도구를 사용하여 단 한 번의 클릭으로 웹사이트를 231개 언어로 변환하세요. 자체 AI 제공자 / API 키를 사용할 수 있습니다. <br><br> - [CI/CD 통합](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [자동 채우기](https://intlayer.org/doc/concept/auto-fill)                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="기능" width="700">                                    | **MCP 서버 통합**<br><br>IDE 자동화를 위한 MCP(모델 컨텍스트 프로토콜) 서버를 제공하여 개발 환경 내에서 원활한 콘텐츠 관리 및 국제화(i18n) 워크플로우를 가능하게 합니다. <br><br> - [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode 확장 기능**<br><br>Intlayer는 콘텐츠 및 번역 관리를 돕기 위해 VSCode 확장 기능을 제공합니다. 사전 구축, 콘텐츠 번역 등 다양한 기능을 지원합니다. <br><br> - [VSCode 확장 기능](https://intlayer.org/doc/ko/vs-code-extension)                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **상호 운용성**<br><br>react-i18next, next-i18next, next-intl, react-intl과의 상호 운용성을 지원합니다. <br><br> - [Intlayer와 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer와 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer와 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                  |

---

## 📦 설치

오늘부터 Intlayer와 함께 여정을 시작하고, 더 원활하고 강력한 국제화 방식을 경험해 보세요.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ 빠른 시작 (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> 전체 가이드 보기 → </a>

## 🎥 YouTube 라이브 튜토리얼

[![Intlayer를 사용하여 애플리케이션을 국제화하는 방법](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 목차

Intlayer를 시작하고 프로젝트에 통합하는 방법을 배우기 위해 종합적인 문서를 탐색하세요.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 시작하기</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">왜 Intlayer인가?</a></li>
  <li><a href="https://intlayer.org/doc">소개</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ 개념</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Intlayer 작동 방식</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">구성</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">AI 제공자</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer 에디터</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">사전</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">로케일별 콘텐츠 선언 파일</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">번역</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">열거형</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">조건</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">중첩</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">마크다운</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">함수 호출</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">삽입</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">파일</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 환경</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Next.js 15와 함께하는 Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (앱 라우터)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js 페이지 라우터</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Tanstack 시작</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">앵귤러 (Angular)</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">익스프레스 (Express)</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">네스트JS (NestJS)</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 블로그</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md">i18n이란 무엇인가</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n과 SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer와 i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer와 react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer와 next-intl</a></li>
</ul>
</details>

## 🌐 다른 언어로 된 Readme

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[독일어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[아랍어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[이탈리아어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[영국 영어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[포르투갈어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[힌디어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[터키어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 커뮤니티

Intlayer는 커뮤니티와 함께, 그리고 커뮤니티를 위해 만들어졌으며 여러분의 의견을 기다립니다!

- 제안이 있으신가요? [이슈 열기](https://github.com/aymericzip/intlayer/issues)
- 버그나 개선 사항을 발견하셨나요? [PR 제출하기](https://github.com/aymericzip/intlayer/pulls)
- 도움이 필요하거나 소통하고 싶으신가요? [디스코드에 참여하기](https://discord.gg/7uxamYVeCk)

다음 채널에서도 저희를 팔로우할 수 있습니다:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer 페이스북" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer 인스타그램" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer 유튜브" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer 틱톡" height="30"/></a>
      <br>
    </p>
</div>

### 기여하기

이 프로젝트에 기여하기 위한 보다 자세한 지침은 [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) 파일을 참조하세요. 이 파일에는 개발 프로세스, 커밋 메시지 규칙, 릴리스 절차에 관한 필수 정보가 포함되어 있습니다. 여러분의 기여는 저희에게 매우 소중하며, 이 프로젝트를 더 나아지게 만드는 여러분의 노력에 감사드립니다!

### 지원해 주셔서 감사합니다

Intlayer가 마음에 드신다면 GitHub에서 ⭐를 눌러주세요. 이는 다른 사람들이 이 프로젝트를 발견하는 데 도움이 됩니다!

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
