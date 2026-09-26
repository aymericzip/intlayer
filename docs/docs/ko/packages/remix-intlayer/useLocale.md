---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useLocale 훅 문서 | remix-intlayer
description: Remix 3 애플리케이션에서 useLocale 훅을 사용하여 현재 요청 로케일, 기본 로케일 및 사용 가능한 로케일을 가져오는 방법을 살펴봅니다.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useLocale 훅 초기 문서"
author: aymericzip
---

# useLocale 훅 문서

`remix-intlayer`의 `useLocale` 훅은 현재 처리 중인 HTTP 요청의 로케일과 함께 프로젝트에 구성된 기본 로케일 및 사용 가능한 로케일에 대한 접근을 제공합니다.

## 사용법

Remix 컴포넌트 내(예: 언어 전환기):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

라우트 핸들러 내에서:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## 반환값

이 훅은 `UseLocaleResult` 타입의 객체를 반환합니다.

| 속성               | 타입                | 설명                                                                |
| ------------------ | ------------------- | ------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | 현재 요청에 대해 확인된 로케일입니다.                               |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts`에 구성된 기본 대체 로케일입니다.               |
| `availableLocales` | `DeclaredLocales[]` | `intlayer.config.ts`에 구성된 사용 가능한 모든 로케일의 배열입니다. |

## 설명

1. **요청 범위 해결**: `intlayer()` 미들웨어에서 처리하는 활성 요청에서 `useLocale`은 요청 저장소에서 확인된 로케일을 읽습니다.
2. **원활한 대체(Fallback)**: 요청 컨텍스트 외부(예: 초기화 스크립트 또는 테스트 제품군)에서 호출되면 구성된 `defaultLocale`로 대체됩니다.

## 관련 문서

- [`intlayer` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useDictionary.md)
