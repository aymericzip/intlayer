# 번역

## 번역 정의

`intlayer`의 `t` 함수는 여러 언어로 콘텐츠를 선언할 수 있게 해줍니다. 이 함수는 타입 안전성을 보장하며, 번역이 누락된 경우 오류를 발생시키므로 TypeScript 환경에서 특히 유용합니다.

### TypeScript 사용

TypeScript 파일에서 번역으로 콘텐츠를 선언하는 방법의 예는 다음과 같습니다:

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### ECMAScript 모듈 사용

ECMAScript 모듈을 사용하는 경우, 선언은 다음과 같이 보입니다:

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### CommonJS 모듈 사용

CommonJS 환경에서는 번역을 다음과 같이 선언할 수 있습니다:

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### JSON 사용

JSON 기반의 선언에서는 번역을 다음과 같이 정의할 수 있습니다:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## 지역 설정 구성

올바른 번역 처리를 보장하기 위해, `intlayer.config.ts`에서 수락할 로케일을 구성할 수 있습니다. 이 구성은 애플리케이션이 지원하는 언어를 정의할 수 있게 해줍니다:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## React 컴포넌트에서 번역 사용

`react-intlayer`를 통해 React 컴포넌트에서 번역을 사용할 수 있습니다. 예시는 다음과 같습니다:

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

이 컴포넌트는 애플리케이션에서 설정된 현재 로케일에 따라 해당 번역을 가져옵니다.

## 사용자 정의 콘텐츠 객체

`intlayer`는 번역을 위한 사용자 정의 콘텐츠 객체를 지원하여 타입 안전성을 보장하면서 더 복잡한 구조를 정의할 수 있게 해줍니다. 사용자 정의 객체의 예는 다음과 같습니다:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
