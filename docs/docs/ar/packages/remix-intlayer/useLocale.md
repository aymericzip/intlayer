---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: توثيق خطاف useLocale | remix-intlayer
description: تعرّف على كيفية استخدام خطاف useLocale في تطبيقات Remix 3 للحصول على لغة الطلب الحالية واللغة الافتراضية واللغات المتاحة.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي لخطاف useLocale"
author: aymericzip
---

# توثيق خطاف useLocale

يوفر خطاف `useLocale` من `remix-intlayer` إمكانية الوصول إلى لغة طلب HTTP قيد المعالجة حاليًا، بالإضافة إلى اللغة الافتراضية واللغات المتاحة التي تم تكوينها في المشروع.

## الاستخدام

في مكون Remix (على سبيل المثال محول اللغة):

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

في معالج المسار:

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

## القيم المرجعة

يُرجع الخطاف كائنًا من النوع `UseLocaleResult`:

| الخاصية            | النوع               | الوصف                                                                |
| ------------------ | ------------------- | -------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | اللغة المحددة للطلب الحالي.                                          |
| `defaultLocale`    | `DeclaredLocales`   | اللغة الافتراضية الاحتياطية التي تم تكوينها في `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | مصفوفة بجميع اللغات المتاحة المكونة في `intlayer.config.ts`.         |

## الوصف

1. **التعيين على مستوى الطلب**: في طلب نشط تديره البرمجية الوسيطة `intlayer()`، يقرأ `useLocale` اللغة المحددة من وحدة تخزين الطلب.
2. **الاحتياط السلس (Fallback)**: إذا تم استدعاؤه خارج سياق الطلب (كما هو الحال أثناء نصوص التهيئة البرمجية أو مجموعات الاختبار)، فإنه يرجع افتراضيًا إلى `defaultLocale` المكون.

## المستندات ذات الصلة

- [البرمجية الوسيطة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)
- [خطاف `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useDictionary.md)
