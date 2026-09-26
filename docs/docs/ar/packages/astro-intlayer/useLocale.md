---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: توثيق خطاف useLocale | astro-intlayer
description: تعرّف على كيفية استخدام خطاف useLocale في تطبيقات Astro للوصول إلى اللغة الحالية وإدارتها.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي"
author: aymericzip
---

# توثيق خطاف useLocale

يوفر خطاف `useLocale` من `astro-intlayer` إمكانية الوصول إلى لغة الطلب الحالية واللغة الافتراضية المكونة وجميع اللغات المتاحة في تطبيقات Astro.

وهو يعمل بشكل متسق عبر واجهة مكونات `.astro` المعروضة على الخادم وكتل `<script>` على جانب العميل.

## الاستخدام

### في Frontmatter المكون (معروض على الخادم)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>الحالية: {locale}</span>
      <span>الافتراضية: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### في `<script>` العميل (تفاعلي)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## القيم المرجعة

يُرجع الخطاف كائنًا من النوع `UseLocaleResult`:

| الخاصية            | النوع                                  | الوصف                                                                            |
| ------------------ | -------------------------------------- | -------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | اللغة النشطة.                                                                    |
| `defaultLocale`    | `DeclaredLocales`                      | اللغة الاحتياطية الافتراضية المكونة في `intlayer.config.ts`.                     |
| `availableLocales` | `DeclaredLocales[]`                    | مصفوفة بجميع اللغات المدعومة المكونة للمشروع.                                    |
| `setLocale`        | `(locale: LocalesValues) => void`      | دالة لتحديث اللغة. (تفاعلية في كود `<script>` للعميل، وتُصدر تحذيرًا أثناء SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | يشترك في تغييرات اللغة من جانب العميل.                                           |

## سلوك الخادم مقابل العميل

- **أثناء SSR / العرض على الخادم**: يتم عرض الطلب مرة واحدة بمعلمات ثابتة. استدعاء `setLocale()` أثناء العرض على الخادم ليس له أي تأثير ويصدر تحذيرًا؛ يجب إجراء تبديل اللغة على العميل أو عن طريق الانتقال إلى عنوان URL الخاص باللغة المستهدفة.
- **في سكربتات العميل**: تقوم `setLocale` بتحديث متجر العميل وتحديث ملفات تعريف الارتباط المحفوظة أو التخزين المحلي وفقًا لتكوين Intlayer الخاص بك.

## المستندات ذات الصلة

- [تكامل `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/intlayer.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useIntlayer.md)
- [خطاف `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useDictionary.md)
