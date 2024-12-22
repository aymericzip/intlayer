# Intlayer와 Express로 국제화(i18n) 시작하기

`express-intlayer`는 Express 애플리케이션을 위한 강력한 국제화(i18n) 미들웨어로, 클라이언트의 선호도에 따라 로컬화된 응답을 제공하여 백엔드 서비스가 전 세계적으로 접근 가능하도록 설계되었습니다.

## 왜 백엔드를 국제화해야 할까요?

백엔드를 국제화하는 것은 전 세계 청중에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고 다양한 언어적 배경을 가진 사람들에게 더 접근 가능하고 관련성 있는 애플리케이션으로 만듭니다.

### 실용적인 사용 사례

- **사용자 언어로 백엔드 오류 표시**: 오류가 발생했을 때 사용자의 모국어로 메시지를 표시하면 이해도를 높이고 불만을 줄일 수 있습니다. 이는 특히 토스트나 모달과 같은 프런트엔드 구성 요소에 표시될 수 있는 동적 오류 메시지에 유용합니다.

- **다국어 콘텐츠 검색**: 데이터베이스에서 콘텐츠를 가져오는 애플리케이션의 경우, 국제화는 여러 언어로 이 콘텐츠를 제공할 수 있도록 보장합니다. 이는 사용자 선호 언어로 제품 설명, 기사 및 기타 콘텐츠를 표시해야 하는 전자 상거래 사이트나 콘텐츠 관리 시스템과 같은 플랫폼에 매우 중요합니다.

- **다국어 이메일 발송**: 거래 이메일이든 마케팅 캠페인이든 알림이든, 수신자의 언어로 이메일을 보내면 참여도와 효과를 크게 높일 수 있습니다.

- **다국어 푸시 알림**: 모바일 애플리케이션의 경우, 사용자가 선호하는 언어로 푸시 알림을 보내면 상호 작용과 유지율을 향상시킬 수 있습니다. 이러한 개인적인 터치는 알림을 더 관련성 있고 실행 가능하게 만듭니다.

- **기타 커뮤니케이션**: SMS 메시지, 시스템 경고 또는 사용자 인터페이스 업데이트와 같은 백엔드에서 오는 모든 형태의 커뮤니케이션은 사용자의 언어로 이루어짐으로써 명확성을 보장하고 전반적인 사용자 경험을 향상시킬 수 있습니다.

백엔드를 국제화함으로써 애플리케이션은 문화적 차이를 존중할 뿐 아니라 글로벌 시장의 요구와 더 잘 일치하게 되며, 이는 서비스가 전 세계로 확장하는 데 핵심 단계가 됩니다.

## 시작하기

### 설치

`express-intlayer`를 사용하려면 npm을 사용하여 패키지를 설치하십시오:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### 설정

프로젝트 루트에 `intlayer.config.ts` 파일을 생성하여 국제화 설정을 구성하십시오:

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Express 애플리케이션 설정

`express-intlayer`를 사용하도록 Express 애플리케이션을 설정하십시오:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 경로
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// 서버 시작
app.listen(3000, () => console.log(`포트 3000에서 수신 대기 중`));
```

### 호환성

`express-intlayer`는 다음과 완벽하게 호환됩니다:

- React 애플리케이션의 경우 `react-intlayer`
- Next.js 애플리케이션의 경우 `next-intlayer`

또한 브라우저 및 API 요청을 포함한 다양한 환경에서 모든 국제화 솔루션과 원활히 작동합니다. 미들웨어를 사용자 정의하여 헤더나 쿠키를 통해 로케일을 감지하도록 설정할 수 있습니다:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // 기타 구성 옵션
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

기본적으로 `express-intlayer`는 클라이언트의 선호 언어를 결정하기 위해 `Accept-Language` 헤더를 해석합니다.

> 구성 및 고급 주제에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 방문하십시오.

## TypeScript로 구동

`express-intlayer`는 TypeScript의 강력한 기능을 활용하여 국제화 프로세스를 향상시킵니다. TypeScript의 정적 타입 지정은 모든 번역 키가 고려되고 있음을 보장하여 누락된 번역의 위험을 줄이고 유지 관리성을 향상시킵니다.

> 생성된 타입(기본적으로 ./types/intlayer.d.ts에 위치)이 tsconfig.json 파일에 포함되어 있는지 확인하세요.
