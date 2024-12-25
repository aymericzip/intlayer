# Documentation: `t` 함수 in `react-intlayer`

`react-intlayer` 패키지의 `t` 함수는 React 애플리케이션 내에서 인라인 국제화를 위한 기본 도구입니다. 이 함수는 컴포넌트 내에서 직접 번역을 정의할 수 있도록 하여, 현재 로케일에 따라 지역화된 콘텐츠를 쉽게 표시할 수 있습니다.

---

## 개요

`t` 함수는 다른 로케일에 대한 번역을 컴포넌트 내에서 직접 제공하는 데 사용됩니다. 지원되는 각 로케일에 대한 번역을 포함하는 객체를 전달함으로써, `t`는 React 애플리케이션 내의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 특징

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠르고 인라인 텍스트에 이상적입니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **타입스크립트 지원**: 타입스크립트와 함께 사용할 때 타입 안전성과 자동 완성을 제공합니다.
- **쉬운 통합**: React 컴포넌트 내에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es`)이고 값이 해당 번역 문자열인 객체입니다.

### 반환값

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예시

### 컴포넌트에서의 `t` 기본 사용법

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

### 속성에서의 인라인 번역

`t` 함수는 JSX 속성에서 인라인 번역에 특히 유용합니다. `alt`, `title`, `href`, `aria-label`와 같은 속성을 로컬라이징할 때는 속성 내에서 직접 `t`를 사용할 수 있습니다.

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
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 고급 주제

### 타입스크립트 통합

`t` 함수는 타입스크립트와 함께 사용할 때 타입 안전성을 보장하여 모든 필수 로케일이 제공되도록 합니다.

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
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`react-intlayer`에서 현재 로케일은 `IntlayerProvider`를 통해 관리됩니다. 이 프로바이더가 컴포넌트를 감싸고 `locale` 속성이 올바르게 전달되도록 해야 합니다.

#### 예시:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기서 컴포넌트를 추가하세요 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기서 컴포넌트를 추가하세요 */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기서 컴포넌트를 추가하세요 */}
  </IntlayerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t`가 정의되지 않거나 잘못된 번역을 반환함

- **원인**: 현재 로케일이 제대로 설정되지 않았거나, 현재 로케일에 대한 번역이 누락되었습니다.
- **해결책**:
  - `IntlayerProvider`가 적절한 `locale`로 올바르게 설정되어 있는지 확인하세요.
  - 번역 객체가 모든 필요한 로케일을 포함하고 있는지 확인하세요.

### 타입스크립트에서의 누락된 번역

- **원인**: 번역 객체가 요구되는 로케일을 충족하지 않아 타입스크립트 오류가 발생했습니다.
- **해결책**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 확보하세요.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 타입스크립트 오류가 발생합니다.
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 타입스크립트 오류가 발생합니다.
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 타입스크립트 오류가 발생합니다.
};

const text = t(translations);
```

---

## 효과적인 사용을 위한 팁

1. **단순 인라인 번역에 `t` 사용**: 컴포넌트 내에서 작은 텍스트 조각을 직접 번역하는 데 이상적입니다.
2. **구조화된 콘텐츠에 `useIntlayer` 선호**: 더 복잡한 번역 및 콘텐츠 재사용의 경우, 선언 파일에 내용을 정의하고 `useIntlayer`를 사용하세요.
3. **일관된 로케일 제공**: 애플리케이션 전반에 걸쳐 `IntlayerProvider`를 통해 일관되게 로케일이 제공되도록 하세요.
4. **타입스크립트 활용**: 타입스크립트 타입을 사용하여 누락된 번역을 포착하고 타입 안전성을 확보하세요.

---

## 결론

`react-intlayer`의 `t` 함수는 React 애플리케이션 내에서 인라인 번역을 관리하기 위한 강력하고 편리한 도구입니다. 이를 효과적으로 통합함으로써 애플리케이션의 국제화 능력을 향상시켜, 전 세계 사용자에게 더 나은 경험을 제공합니다.

자세한 사용법과 고급 기능은 [react-intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)를 참조하세요.

---

**참고**: `IntlayerProvider`를 적절하게 설정하여 현재 로케일이 컴포넌트에 올바르게 전달되도록 하는 것을 잊지 마세요. 이는 `t` 함수가 올바른 번역을 반환하는 데 필수적입니다.
