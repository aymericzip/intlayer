---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 함수 문서 | react-intlayer
description: react-intlayer 패키지에서 t 함수 사용법 보기
keywords:
  - t
  - 번역
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
---

# 문서: `react-intlayer`의 `t` 함수

`react-intlayer` 패키지의 `t` 함수는 React 애플리케이션 내에서 인라인 국제화를 위한 기본 도구입니다. 이 함수는 컴포넌트 내에서 직접 번역을 정의할 수 있게 하여, 현재 로케일에 따라 현지화된 콘텐츠를 간편하게 표시할 수 있도록 합니다.

---

## 개요

`t` 함수는 컴포넌트 내에서 직접 다양한 로케일에 대한 번역을 제공하는 데 사용됩니다. 지원되는 각 로케일에 대한 번역을 포함하는 객체를 전달하면, `t`는 React 애플리케이션의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 기능

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠른 인라인 텍스트에 이상적입니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **TypeScript 지원**: TypeScript 사용 시 타입 안전성과 자동 완성을 제공합니다.
- **간편한 통합**: React 컴포넌트 내에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키는 로케일 코드(예: `en`, `fr`, `es`)이고 값은 해당 번역 문자열인 객체입니다.

### 반환값

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예제

### 컴포넌트 내 `t` 기본 사용법

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### 속성 내 인라인 번역

`t` 함수는 JSX 속성 내 인라인 번역에 특히 유용합니다. `alt`, `title`, `href`, 또는 `aria-label` 같은 속성을 현지화할 때, 속성 내에서 직접 `t`를 사용할 수 있습니다.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "아름다운 풍경",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 고급 주제

### TypeScript 통합

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성을 제공하여, 모든 필수 로케일이 제공되었는지 보장합니다.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
// 번역 문자열 정의
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`react-intlayer`에서는 현재 로케일이 `IntlayerProvider`를 통해 관리됩니다. 이 프로바이더가 컴포넌트를 감싸고 `locale` 속성이 올바르게 전달되었는지 확인하세요.

#### 예시:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기에 컴포넌트를 작성하세요 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기에 컴포넌트를 작성하세요 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기에 컴포넌트를 작성하세요 */}
  </IntlayerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t`가 undefined 또는 잘못된 번역을 반환하는 경우

- **원인**: 현재 로케일이 올바르게 설정되지 않았거나, 현재 로케일에 대한 번역이 누락되었습니다.
- **해결 방법**:
  - `IntlayerProvider`가 적절한 `locale`로 올바르게 설정되었는지 확인하세요.
  - 번역 객체에 필요한 모든 로케일이 포함되어 있는지 확인하세요.

### TypeScript에서 번역 누락

- **원인**: 번역 객체가 필요한 로케일을 모두 만족하지 않아 TypeScript 오류가 발생합니다.
- **해결 방법**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 강제하세요.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다

const text = t(translations);
```

- **원인**: 현재 로케일이 제대로 설정되지 않았거나, 현재 로케일에 대한 번역이 누락된 경우입니다.
- **해결책**:
  - `IntlayerProvider`가 적절한 `locale`과 함께 올바르게 설정되었는지 확인하세요.
  - 번역 객체에 필요한 모든 로케일이 포함되어 있는지 확인하세요.

### TypeScript에서 번역 누락 문제

- **원인**: 번역 객체가 요구되는 모든 로케일을 충족하지 않아 TypeScript 오류가 발생합니다.
- **해결책**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 강제하세요.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류가 발생합니다
};

const text = t(translations);
```

---

## 효과적인 사용을 위한 팁

1. **간단한 인라인 번역에는 `t` 사용**: 컴포넌트 내에서 작은 텍스트 조각을 직접 번역할 때 이상적입니다.
2. **구조화된 콘텐츠에는 `useIntlayer` 선호**: 더 복잡한 번역과 콘텐츠 재사용을 위해 선언 파일에 콘텐츠를 정의하고 `useIntlayer`를 사용하세요.
3. **일관된 로케일 제공**: `IntlayerProvider`를 통해 애플리케이션 전반에 걸쳐 로케일이 일관되게 제공되도록 하세요.
4. **TypeScript 활용**: TypeScript 타입을 사용하여 누락된 번역을 잡아내고 타입 안전성을 보장하세요.

---

## 결론

`react-intlayer`의 `t` 함수는 React 애플리케이션에서 인라인 번역을 관리하기 위한 강력하고 편리한 도구입니다. 이를 효과적으로 통합함으로써 앱의 국제화 기능을 향상시키고 전 세계 사용자에게 더 나은 경험을 제공할 수 있습니다.

더 자세한 사용법과 고급 기능은 [react-intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 참조하세요.

---

**참고**: 현재 로케일이 컴포넌트에 올바르게 전달되도록 `IntlayerProvider`를 적절히 설정하는 것을 잊지 마세요. 이는 `t` 함수가 올바른 번역을 반환하는 데 매우 중요합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
