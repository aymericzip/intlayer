# vite-intlayer: NPM 패키지로 Vite 애플리케이션 국제화(i18n)

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`vite-intlayer` 패키지**는 Vite 애플리케이션을 국제화할 수 있게 해줍니다. 이는 환경 변수를 통해 [Vite 번들러](https://vitejs.dev/guide/why.html#why-bundle-for-production)에 설정을 추가할 수 있는 Vite 플러그인을 포함하고 있습니다. 또한 사용자의 선호하는 로케일을 감지하고 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 지정한 적절한 URL로 사용자를 리디렉션하는 미들웨어를 제공합니다.

## 왜 Vite 애플리케이션을 국제화해야 할까요?

Vite 애플리케이션을 국제화하는 것은 전 세계의 청중에게 효과적으로 서비스를 제공하는 데 필수적입니다. 사용자가 선호하는 언어로 콘텐츠와 메시지를 제공할 수 있는 기능을 통해 애플리케이션의 사용자 경험을 향상시키고, 다양한 언어적 배경을 가진 사람들에게 더욱 접근 가능하고 관련성이 높아짐으로써 애플리케이션의 범위를 넓힐 수 있습니다.

## 구성

`vite-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 더 많은 정보를 위해 관련 문서를 확인하세요.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 사용 예제

Vite 구성에 플러그인을 포함하는 방법의 예를 확인하세요.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일을 구축하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능을 최적화하기 위해 별칭을 제공합니다.

> `intLayerMiddlewarePlugin()`은 애플리케이션에 서버 측 라우팅을 추가합니다. 이 플러그인은 URL에 따라 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 선호에 따라 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않은 경우 기본 로케일로 리디렉션됩니다.

## Vite 애플리케이션의 국제화를 마스터하기

Intlayer는 Vite 애플리케이션을 국제화하는 데 도움이 되는 많은 기능을 제공합니다.

**이 기능에 대해 더 알아보려면 [Vite 및 React로 Intlayer와 함께하는 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md) 가이드를 참조하세요.**
