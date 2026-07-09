---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: 라이브 동기화 | CMS 콘텐츠 변경 사항을 실시간으로 반영
description: 재빌드나 재배포 없이 Intlayer CMS 콘텐츠 변경 사항을 앱에 실시간으로 반영하세요.
keywords:
  - 라이브 동기화
  - Live Sync
  - CMS
  - 비주얼 에디터
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Intlayer CMS 문서에서 별도의 페이지로 이동"
  - version: 6.0.1
    date: 2025-09-22
    changes: "라이브 동기화 문서 추가"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` 필드를 `liveSync`로 교체"
author: aymericzip
---

# 라이브 동기화

라이브 동기화는 앱이 런타임에 CMS 콘텐츠 변경 사항을 반영할 수 있게 합니다. 재빌드나 재배포가 필요 없습니다. 활성화되면 업데이트가 라이브 동기화 서버로 스트리밍되어 애플리케이션이 읽는 사전을 갱신합니다.

## 목차

<TOC/>

---

> Live Sync는 지속적인 서버 연결이 필요하며 엔터프라이즈 플랜에서만 사용할 수 있습니다.

Intlayer 구성을 업데이트하여 Live Sync를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    /**
     * 변경 사항이 감지되면 로케일 구성을 핫 리로딩할 수 있도록 활성화합니다.
     * 예를 들어, 사전이 추가되거나 업데이트되면 애플리케이션이
     * 페이지에 표시되는 콘텐츠를 업데이트합니다.
     *
     * 핫 리로딩은 서버와의 지속적인 연결이 필요하기 때문에,
     * `enterprise` 플랜 고객에게만 제공됩니다.
     *
     * 기본값: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * 사전이 어떻게 가져오는지를 제어합니다:
     *
     * - "fetch": 사전은 Live Sync API를 사용하여 동적으로 가져옵니다.
     *   useIntlayer를 useDictionaryDynamic으로 대체합니다.
     *
     * 참고: 라이브 모드는 Live Sync API를 사용하여 사전을 가져옵니다. API 호출이
     * 실패하면 사전은 동적으로 가져옵니다.
     * 참고: 원격 콘텐츠가 있고 "live" 플래그가 있는 사전만 라이브 모드를 사용합니다.
     * 나머지는 성능을 위해 동적 모드를 사용합니다.
     */
    importMode: "fetch",
  },
};

export default config;
```

애플리케이션을 감싸기 위해 Live Sync 서버를 시작하세요:

독립형 서버 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "live:start": "npx intlayer live",
  },
}
```

`--process` 인수를 사용하여 애플리케이션 서버를 병렬로 사용할 수도 있습니다.

Next.js 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Vite 사용 예시:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트들
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync 서버는 애플리케이션을 감싸고 도착하는 업데이트된 콘텐츠를 자동으로 적용합니다.

CMS로부터 변경 알림을 받기 위해, Live Sync 서버는 백엔드와 SSE 연결을 유지합니다. CMS에서 콘텐츠가 변경되면, 백엔드는 업데이트를 Live Sync 서버로 전달하고, Live Sync 서버는 새로운 사전을 기록합니다. 애플리케이션은 다음 탐색 또는 브라우저 새로고침 시 업데이트를 반영하며, 재빌드가 필요하지 않습니다.

플로우 차트 (CMS/백엔드 -> Live Sync 서버 -> 애플리케이션 서버 -> 프론트엔드):

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

작동 방식:

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## 개발 워크플로우 (로컬)

- 개발 중에는 애플리케이션이 시작될 때 모든 원격 사전을 가져오므로 업데이트를 빠르게 테스트할 수 있습니다.
- Next.js로 로컬에서 Live Sync를 테스트하려면 개발 서버를 래핑하세요:

```json5 fileName="package.json"
{
  "scripts": {
    // ... 다른 스크립트
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite용
  },
}
```

개발 중에 Intlayer가 Live import 변환을 적용하도록 최적화를 활성화하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // 기본값: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

이 설정은 개발 서버를 Live Sync 서버와 래핑하고, 시작 시 원격 사전을 가져오며, CMS에서 SSE를 통해 업데이트를 스트리밍합니다. 변경 사항을 보려면 페이지를 새로 고치세요.

참고 사항 및 제약 조건:

- 라이브 싱크 출처를 사이트 보안 정책(CSP)에 추가하세요. 라이브 싱크 URL이 `connect-src`(및 관련이 있다면 `frame-ancestors`)에 허용되어 있는지 확인하세요.
- 라이브 싱크는 정적 출력과 함께 작동하지 않습니다. Next.js의 경우, 런타임에 업데이트를 받으려면 페이지가 동적이어야 합니다(예: 전체 정적 전용 제약을 피하기 위해 `generateStaticParams`, `generateMetadata`, `getServerSideProps` 또는 `getStaticProps`를 적절히 사용).
- CMS에서 각 사전에는 `live` 플래그가 있습니다. `live=true`인 사전만 라이브 싱크 API를 통해 가져오며, 나머지는 동적으로 가져와 런타임에 변경되지 않습니다.
- `live` 플래그는 빌드 시 각 사전에 대해 평가됩니다. 빌드 시 원격 콘텐츠가 `live=true`로 표시되지 않았다면, 해당 사전에 대해 라이브 싱크를 활성화하려면 다시 빌드해야 합니다.
- 라이브 싱크 서버는 `.intlayer`에 쓸 수 있어야 합니다. 컨테이너 환경에서는 `/.intlayer`에 쓰기 권한이 있는지 확인하세요.

## 유용한 링크

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- [구성 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [자체 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)
