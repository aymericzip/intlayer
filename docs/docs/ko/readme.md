<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer 로고" />
  </a>
</p>

<h1 align="center">
  <strong>컴포넌트별 i18n</strong>
</h1>
<h2 align="center">
  <strong>AI 기반 번역. 시각적 편집기. 다국어 CMS.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm 버전" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub 스타" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="월간 다운로드" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="라이선스"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="마지막 커밋"/>
  </a>
</p>

![비디오 시청하기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/시작하기-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer란 무엇인가요?

대부분의 i18n 라이브러리는 너무 복잡하거나, 너무 경직되어 있거나, 최신 프레임워크를 위해 설계되지 않았습니다.

Intlayer는 웹 및 모바일 애플리케이션을 위한 **최신 i18n 솔루션**입니다.  
프레임워크에 구애받지 않으며, **AI 기반**이고, 무료 **CMS 및 시각적 편집기**를 포함합니다.

**로케일별 콘텐츠 파일**, **TypeScript 자동 완성**, **트리 쉐이킹 가능한 사전**, **CI/CD 통합**을 통해 Intlayer는 국제화를 **더 빠르고, 깔끔하며, 스마트하게** 만듭니다.

## Intlayer의 주요 장점:

| 기능                                                                                                                                                | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **멀티 프레임워크 지원**<br><br>Intlayer는 Next.js, React, Vite, Vue.js, Nuxt, Preact, Express 등을 포함한 모든 주요 프레임워크 및 라이브러리와 호환됩니다.                                                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **JavaScript 기반 콘텐츠 관리**<br><br>JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리하세요. <br><br> - [콘텐츠 선언](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **로케일별 콘텐츠 선언 파일**<br><br>자동 생성 전에 콘텐츠를 한 번만 선언하여 개발 속도를 높이세요.<br><br> - [로케일별 콘텐츠 선언 파일](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **컴파일러**<br><br>Intlayer 컴파일러는 컴포넌트에서 콘텐츠를 자동으로 추출하고 사전 파일을 생성합니다.<br><br> - [컴파일러](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **타입 안전 환경**<br><br>TypeScript를 활용하여 콘텐츠 정의와 코드가 오류가 없음을 보장하며, IDE 자동 완성의 혜택을 누릴 수 있습니다.<br><br> - [TypeScript 구성](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **바이패스된 설정**<br><br>최소한의 설정으로 빠르게 시작하세요. 국제화, 라우팅, AI, 빌드 및 콘텐츠 관리 설정을 쉽게 조정할 수 있습니다. <br><br> - [Next.js 통합 탐색](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **간소화된 콘텐츠 검색**<br><br>모든 콘텐츠 요소에 대해 `t` 함수를 호출할 필요가 없습니다. 단일 hook을 사용하여 모든 콘텐츠를 직접 가져오세요.<br><br> - [React 통합](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **일관된 서버 컴포넌트 구현**<br><br>Next.js 서버 컴포넌트에 완벽하게 적합하며, 클라이언트와 서버 컴포넌트 모두에서 동일한 구현을 사용하세요. 각 서버 컴포넌트에 `t` 함수를 전달할 필요가 없습니다. <br><br> - [서버 컴포넌트](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **정리된 코드베이스**<br><br>코드베이스를 더 체계적으로 유지하세요: 1 컴포넌트 = 동일 폴더 내 1 사전. 컴포넌트 근처의 번역은 유지 관리성과 명확성을 높여줍니다. <br><br> - [Intlayer 작동 방식](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **향상된 라우팅**<br><br>Next.js, React, Vite, Vue.js 등을 위한 복잡한 애플리케이션 구조에 완벽하게 적응하는 앱 라우팅을 완전 지원합니다.<br><br> - [Next.js 통합 탐색](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **마크다운 지원**<br><br>개인정보 보호 정책, 문서 등과 같은 다국어 콘텐츠를 위해 로컬 파일 및 원격 마크다운을 가져오고 해석합니다. 마크다운 메타데이터를 해석하고 코드에서 액세스할 수 있도록 합니다.<br><br> - [콘텐츠 파일](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **무료 시각적 편집기 및 CMS**<br><br>콘텐츠 작성자를 위한 무료 시각적 편집기와 CMS가 제공되어 현지화 플랫폼이 필요하지 않습니다. Git을 사용하여 콘텐츠를 동기화된 상태로 유지하거나 CMS를 통해 전체 또는 일부를 외부화하세요.<br><br> - [Intlayer 편집기](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **트리 쉐이킹 가능한 콘텐츠**<br><br>최종 번들 크기를 줄이는 트리 쉐이킹 가능한 콘텐츠입니다. 컴포넌트별로 콘텐츠를 로드하여 번들에서 사용하지 않는 콘텐츠를 제외합니다. 앱 로딩 효율성을 높이기 위해 지연 로딩을 지원합니다. <br><br> - [앱 빌드 최적화](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **정적 렌더링**<br><br>정적 렌더링을 차단하지 않습니다. <br><br> - [Next.js 통합](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI 기반 번역**<br><br>자체 AI 제공자 / API 키를 사용하는 Intlayer의 고급 AI 기반 번역 도구를 사용하여 한 번의 클릭으로 웹사이트를 231개 언어로 변환하세요. <br><br> - [CI/CD 통합](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [자동 완성](https://intlayer.org/doc/concept/auto-fill)                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP 서버 통합**<br><br>IDE 자동화를 위한 MCP(Model Context Protocol) 서버를 제공하여 개발 환경 내에서 원활한 콘텐츠 관리 및 i18n 워크플로우를 가능하게 합니다. <br><br> - [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode 확장 프로그램**<br><br>Intlayer는 콘텐츠 및 번역 관리, 사전 구축, 콘텐츠 번역 등을 도와주는 VSCode 확장 프로그램을 제공합니다. <br><br> - [VSCode 확장 프로그램](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **상호 운용성**<br><br>react-i18next, next-i18next, next-intl, react-intl, vue-i18n과의 상호 운용성을 허용합니다. <br><br> - [Intlayer 및 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 및 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 및 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer 및 vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 설치

오늘 바로 Intlayer와 함께 여정을 시작하고 더 원활하고 강력한 국제화 접근 방식을 경험해 보세요.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/시작하기-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
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

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> 전체 가이드 받기 → </a>

## 🎥 YouTube 라이브 튜토리얼

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/시작하기-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 목차

Intlayer를 시작하고 프로젝트에 통합하는 방법을 배우려면 종합 문서를 살펴보세요.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 시작하기</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>왜 Intlayer인가요?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>소개</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ 개념</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Intlayer 작동 방식</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>구성</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>컴파일러</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer 편집기</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>사전</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>로케일별 콘텐츠 선언 파일</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>번역</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>열거</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>조건</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>중첩</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>마크다운</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>함수 가져오기</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>삽입</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>파일</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 환경</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Next.js 16과 Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>컴파일러를 사용한 Next.js</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>컴파일러를 사용한 Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start" rel=''>Tanstack start</a></li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>백엔드</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 블로그</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/what_is_internationalization.md" rel=''>i18n이란 무엇인가요?</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n 및 SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer 및 i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer 및 react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer 및 next-intl</a></li>
</ul>
</details>

## 🌐 다른 언어로 된 Readme

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 커뮤니티

Intlayer는 커뮤니티와 함께, 커뮤니티를 위해 만들어졌으며 여러분의 피드백을 환영합니다!

- 제안이 있으신가요? [이슈 열기](https://github.com/aymericzip/intlayer/issues)
- 버그나 개선 사항을 발견하셨나요? [PR 제출](https://github.com/aymericzip/intlayer/pulls)
- 도움이 필요하거나 연결하고 싶으신가요? [Discord 참여하기](https://discord.gg/7uxamYVeCk)

다음 채널에서도 팔로우하실 수 있습니다:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### 기여하기

프로젝트 기여에 대한 자세한 가이드는 [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) 파일을 참조하세요. 개발 프로세스, 커밋 메시지 컨벤션, 릴리스 절차에 대한 필수 정보가 들어 있습니다. 여러분의 기여는 매우 소중하며, 프로젝트 개선을 위한 노력을 높이 평가합니다!

[GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) 또는 [Bitbucket](https://bitbucket.org/intlayer/intlayer/)에서 기여해 보세요.

### 지원해 주셔서 감사합니다

Intlayer가 마음에 드신다면 GitHub에서 ⭐을 주세요. 다른 사람들이 프로젝트를 발견하는 데 도움이 됩니다! [왜 GitHub 스타가 중요한지 확인해 보세요](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
