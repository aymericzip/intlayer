---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale 훅 문서 | solid-intlayer
description: solid-intlayer 패키지의 useLocale 훅 사용 방법 보기
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서를 통합함
---

# useLocale 훅 문서

`useLocale` 훅은 Solid 애플리케이션에서 현재 로케일을 관리할 수 있게 해줍니다. 이 훅은 현재 로케일(accessor로 제공), 기본 로케일, 사용 가능한 로케일 목록, 그리고 로케일을 업데이트하는 함수를 제공합니다.

## 사용법

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## 설명

이 훅은 다음 속성을 가진 객체를 반환합니다:

1. **locale**: Solid accessor (`() => string`)로 현재 로케일을 반환합니다.
2. **defaultLocale**: `intlayer.config.ts`에 정의된 기본 로케일입니다.
3. **availableLocales**: 애플리케이션에서 지원하는 모든 로케일의 배열입니다.
4. **setLocale**: 애플리케이션의 로케일을 업데이트하는 함수입니다. 활성화된 경우 지속성(쿠키/로컬 스토리지)도 처리합니다.

## 매개변수

- **props** (선택 사항):
  - **onLocaleChange**: 로케일이 변경될 때마다 호출되는 콜백 함수.
  - **isCookieEnabled**: 로케일을 쿠키에 유지할지 여부.
