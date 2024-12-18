# Translation

## Defining Translations

`intlayer`의 `t` 함수는 여러 언어로 콘텐츠를 선언할 수 있도록 해줍니다. 이 함수는 타입 안전성을 보장하며, 번역이 누락된 경우 오류를 발생시켜 TypeScript 환경에서 특히 유용합니다.

### Using TypeScript

TypeScript 파일에서 번역과 함께 콘텐츠를 선언하는 방법의 예는 다음과 같습니다:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      ko: "우리 애플리케이션에 오신 것을 환영합니다",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Using ECMAScript Modules

ECMAScript 모듈을 사용하는 경우 선언은 다음과 같이 보입니다:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      ko: "우리 애플리케이션에 오신 것을 환영합니다",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using CommonJS Modules

CommonJS 설정에서는 다음과 같이 번역을 선언할 수 있습니다:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      ko: "우리 애플리케이션에 오신 것을 환영합니다",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using JSON

JSON 기반 선언을 위해 번역을 다음과 같이 정의할 수 있습니다:

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "ko": "우리 애플리케이션에 오신 것을 환영합니다",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configuration for Locales

적절한 번역 처리를 보장하기 위해 `intlayer.config.ts`에서 허용되는 로케일을 구성할 수 있습니다. 이 구성은 애플리케이션에서 지원하는 언어를 정의할 수 있게 해줍니다:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.KOREAN, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Using Translations in React Components

`react-intlayer`를 사용하여 React 컴포넌트에서 번역을 사용할 수 있습니다. 예시는 다음과 같습니다:

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

이 컴포넌트는 애플리케이션에 설정된 현재 로케일에 따라 해당 번역을 가져옵니다.

## Custom Content Objects

`intlayer`는 번역을 위해 사용자 정의 콘텐츠 객체를 지원하여, 타입 안전성을 보장하면서 더 복잡한 구조를 정의할 수 있게 해줍니다. 사용자 정의 객체의 예는 다음과 같습니다:

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
      ko: {
        title: "페이지 제목",
        content: "페이지 내용",
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
